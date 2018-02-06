var screen_width  = window.innerWidth;
var screen_height = window.innerHeight;
var aspect_ratio  = window.innerWidth / window.innerHeight;

var textureLoader;
var defaultTexture;

var renderer;

var camera;
var scene;
var sceneHelpers;

var scenePicking;
var pickingRenderTarget;
var pickingTextureSelection;
var pickingTextureSelectionData = new Uint8Array( screen_width * screen_height * 4 );

var sceneObjectsId = 0;
var sceneObjects = []; 

var transformControls;

var sceneHUD;
var cameraHUD;

var textureGizmo;
var textureGizmo2;

var colors = [ 0xff00f0, 0xfffff0, 0xffff00, 0x000ff0, 0xff0f00, 0x888880, 0x8800f0, 0x880080, 0x88ff00,
               0xff00f1, 0xfffff1, 0xffff00, 0x000ff1, 0xffff01, 0x888881, 0x8800f1, 0x880081, 0x88ff01,
               0xff00f2, 0xfffff2, 0xffff00, 0x000ff2, 0xffff02, 0x888882, 0x8800f2, 0x880082, 0x88ff02,
               0xff00f3, 0xfffff3, 0xffff00, 0x000ff1, 0xffff03, 0x888883, 0x8800f3, 0x880083, 0x88ff03, ];

var stats;

var mousePrevX = null;
var mousePrevY = null;
var mouseX = null;
var mouseY = null;

var AxisX = new THREE.Vector3( 1, 0, 0 );
var AxisY = new THREE.Vector3( 0, 1, 0 );
var AxisZ = new THREE.Vector3( 0, 0, 1 );

var selection = [];
var selectionRectangle = { left:0, top:0, width:0, height:0 };
var selectionRectangleElement;

//////////////////////////////////////////////////////////////////////////////
EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
Control_ORBIT_pixel2world_ratio = 0.005;
Control_PAN_pixel2world_ratio = 0.05;
Control_ZOOM_pixel2world_ratio= 0.05;

var currentControlMode = EControlMode.NONE;

//////////////////////////////////////////////////////////////////////////////

Epsilon = 0.001;

//////////////////////////////////////////////////////////////////////////////
function addObject( object )
{
    var editorObject = { id: sceneObjectsId++ };

    object.updateMatrixWorld();
    scene.add( object );

    editorObject.object = object;
    editorObject.helpers = [];
    
    if( object instanceof THREE.Mesh )
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        editorObject.helpers.push( selectionHelper );

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: colors[editorObject.id] } );
        objectPicking.matrix = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }
    else
    if( object instanceof THREE.Camera )
    {
        editorObject.helpers.push( new THREE.CameraHelper( object ) );
    }
    else
    if( object instanceof THREE.PointLight )
    {
        editorObject.helpers.push( new THREE.PointLightHelper( object ) );
    }
    else
    if( object instanceof THREE.DirectionalLight )
    {
        editorObject.helpers.push( new THREE.DirectionalLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SpotLight )
    {
        var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: colors[editorObject.id] } );
        var objectPicking = new THREE.Mesh( new THREE.TetrahedronGeometry( 0.6, 0 ), objectPickingMaterial );
        objectPicking.matrix = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        var selectionHelper = new THREE.BoxHelper( objectPicking );
        selectionHelper.visible = false;
        editorObject.helpers.push( selectionHelper );

        var spotLightHelper1 = new THREE.Mesh(  new THREE.TetrahedronGeometry( 0.6, 0 ), new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
        spotLightHelper1.matrix = object.matrixWorld;
        spotLightHelper1.matrixAutoUpdate = false;
        editorObject.helpers.push( spotLightHelper1 );

        var spotLightHelper2 = new THREE.SpotLightHelper( object );
        editorObject.helpers.push( spotLightHelper2 );
     }
    else
    if( object instanceof THREE.HemisphereLight )
    {
        editorObject.helpers.push( THREE.HemisphereLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SkinnedMesh )
    {
        editorObject.helpers.push( new THREE.SkeletonHelper( object ) );
    }

    if( editorObject.helpers.length > 0 )
    {
        for( var i = 0; i < editorObject.helpers.length; ++i )
        {
            sceneHelpers.add( editorObject.helpers[i] );
        }
    }
 
    sceneObjects.push( editorObject );
} 

//////////////////////////////////////////////////////////////////////////////
function init() 
{
    textureLoader = new THREE.TextureLoader();
    defaultTexture = textureLoader.load( "textures/UV_Grid_Sm.jpg", render );

    scene = new THREE.Scene();
    sceneHelpers = new THREE.Scene();
    scenePicking = new THREE.Scene();
    sceneHUD = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, aspect_ratio, 0.1, 1000 );
    camera.position.x = -28.23;
    camera.position.y = 14.34;
    camera.position.z = 31.06;
    camera.lookAt( scene.position );  
   
    initPickingScene();
    initScene();
    initHUDScene();

    //stats = initSceneStats();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;

    transformControls = new THREE.TransformControls( camera, renderer.domElement );
    transformControls.addEventListener( 'change', render );
    scene.add( transformControls );
    
    document.getElementById("WebGL-output").appendChild( renderer.domElement );
    document.getElementById("WebGL-output").addEventListener( 'mousedown',  handleMouseDown,  false );
    document.getElementById("WebGL-output").addEventListener( 'mousemove',  handleMouseMove,  false );
    document.getElementById("WebGL-output").addEventListener( 'mouseup',    handleMouseUp,    false );

    selectionRectangleElement = document.getElementById( "Select-rectangle" );
    
    requestAnimationFrame( render );
}

//////////////////////////////////////////////////////////////////////////////
function initScene() 
{
    addObject( new THREE.AmbientLight( 0x222222 ) );
    
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -10, 15, -5 );
    spotLight.angle = Math.PI/4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    spotLight.castShadow = true;    addObject( spotLight );
      
    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );

    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: defaultTexture } );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube1";
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    addObject( cube );

    var sphereGeometry = new THREE.SphereGeometry( 4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: defaultTexture } );
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = "sphere1";
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    addObject( sphere );

    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff } );
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.name = "plane1";
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    addObject( plane );
};

function initSceneStats() 
{
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild( stats.domElement );

    return stats;
}

function initPickingScene()
{
    pickingRenderTarget = new THREE.WebGLRenderTarget( screen_width, screen_height );
    pickingRenderTarget.texture.minFilter = THREE.LinearFilter;
    pickingRenderTarget.texture.maxFilter = THREE.NearestFilter;

    pickingTextureSelection = new THREE.DataTexture( pickingTextureSelectionData, screen_width, screen_height, THREE.RGBAFormat );
    pickingTextureSelection.needsUpdate = true;

    /*
    var planeMaterialPicking = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var planePicking = new THREE.Mesh( plane.geometry, planeMaterialPicking );
    planePicking.rotation.x = -0.5 * Math.PI;
    planePicking.position.x = 15;
    planePicking.position.y = 0;
    planePicking.position.z = 0;
    scenePicking.add( planePicking );    

    var cubeMaterialPicking = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    cubePicking = new THREE.Mesh( cube.geometry, cubeMaterialPicking);
    cubePicking.position.x = -4;
    cubePicking.position.y = 3;
    cubePicking.position.z = 0;
    cubePicking.castShadow = true;
    scenePicking.add( cubePicking );

    var sphereMaterialPicking = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    spherePicking = new THREE.Mesh( sphere.geometry, sphereMaterialPicking );
    spherePicking.position.x = 20;
    spherePicking.position.y = 4;
    spherePicking.position.z = 2;
    spherePicking.castShadow = true;
    scenePicking.add( spherePicking );
    */
}

function initHUDScene()
{
    cameraHUD = new THREE.OrthographicCamera( -screen_width/2, screen_width/2, screen_height/2, -screen_height/2, -100, 100 );

    var textureGizmoMaterial = new THREE.SpriteMaterial( { map: pickingRenderTarget.texture } );

    textureGizmoMaterial.depthFunc = THREE.AlwaysDepth;
    //textureGizmoMaterial.depthTest = false;
    textureGizmoMaterial.depthWrite = false;
    
    textureGizmo = new THREE.Sprite( textureGizmoMaterial );
    textureGizmo.scale.set( 100, 100, 1 );
    textureGizmo.position.set( 0, 0, 1 );
    sceneHUD.add( textureGizmo );

    var textureGizmoMaterial2 = new THREE.SpriteMaterial( { map: pickingTextureSelection } );
    textureGizmo2 = new THREE.Sprite( textureGizmoMaterial2 );
    textureGizmo2.scale.set( 100, 100, 1 );
    textureGizmo2.position.set( 0, 0, 1 );
    sceneHUD.add( textureGizmo2 );

    updateHUDScene();
}

function render()
{
    transformControls.update();

    for( var i = 0; i < selection.length; ++i )
    {
        for( var j = 0; j < selection[i].helpers.length; ++j )
        {
            var helper = selection[i].helpers[j];
            if( helper instanceof THREE.BoxHelper )
            {
                helper.update();
            }
        }
    }

    scene.updateMatrixWorld();
    sceneHelpers.updateMatrixWorld();
        
    renderer.clear();
    
    renderPickingScene();
    renderScene();
    renderHUDScene();
}

function renderPickingScene() 
{
    if( currentControlMode == EControlMode.SELECT )
    {
    }
}

function renderScene() 
{
    //stats.update();

    if( currentControlMode != EControlMode.NONE )
    {
        var deltaMouseX = mouseX - mousePrevX;
        var deltaMouseY = mouseY - mousePrevY;

        if( deltaMouseX != 0 || deltaMouseY != 0 )
        {
            switch( currentControlMode )
            {
                case EControlMode.ORBIT:
                {
                    //TODO:
                }
                break;

                case EControlMode.TRACKBALL:
                {
                    camera.rotateOnWorldAxis( AxisY,  deltaMouseX * Control_ORBIT_pixel2world_ratio );
                    camera.rotateOnAxis( AxisX,  deltaMouseY * Control_ORBIT_pixel2world_ratio );

                    mousePrevX = mouseX;
                    mousePrevY = mouseY;
                }
                break;
                
                case EControlMode.PAN:
                {
                    var translation = new THREE.Vector3();
                    translation.copy( AxisY );
                    translation.multiplyScalar( deltaMouseY * Control_PAN_pixel2world_ratio );
                    translation.add( camera.position );

                    var translationLocal = camera.worldToLocal( translation );
                    translationLocal.addScaledVector( AxisX, deltaMouseX * -Control_PAN_pixel2world_ratio );

                    var distance = translationLocal.length();
                    if( distance >= Epsilon )
                    {
                        translationLocal.multiplyScalar( 1.0 / distance );

                        camera.translateOnAxis( translationLocal, distance );
                    }

                    mousePrevX = mouseX;
                    mousePrevY = mouseY;
                }
                break;
        
                case EControlMode.ZOOM:
                {
                    var translationLocal = new THREE.Vector3();
                    translationLocal.copy( AxisZ );
                    translationLocal.multiplyScalar( deltaMouseY * Control_ZOOM_pixel2world_ratio );

                    var distance = translationLocal.length();
                    if( distance >= Epsilon )
                    {
                        translationLocal.multiplyScalar( 1.0 / distance );

                        camera.translateOnAxis( translationLocal, distance );
                    }

                    mousePrevX = mouseX;
                    mousePrevY = mouseY;
                }
                break;

                case EControlMode.SELECT:
                {
                    selectionRectangle.left    = Math.min( mouseX, mousePrevX );
                    selectionRectangle.left    = Math.max( selectionRectangle.left, 0 );
                    selectionRectangle.top     = Math.min( mouseY, mousePrevY );
                    selectionRectangle.top     = Math.max( selectionRectangle.top, 0 );

                    var right   = Math.max( mouseX, mousePrevX );
                    right       = Math.min( right, screen_width );
                    var bottom  = Math.max( mouseY, mousePrevY );
                    bottom      = Math.min( bottom, screen_height );

                    selectionRectangle.width  = right  - selectionRectangle.left;
                    selectionRectangle.height = bottom - selectionRectangle.top; 

                    selectionRectangleElement.style.left   = selectionRectangle.left   + 'px';
                    selectionRectangleElement.style.top    = selectionRectangle.top    + 'px';
                    selectionRectangleElement.style.width  = selectionRectangle.width  + 'px';
                    selectionRectangleElement.style.height = selectionRectangle.height + 'px';
                }
                break;                    
        
                default:
                {}
                break;
            }
        }
    }

    renderer.setClearColor( 0xaaaaaa );

    renderer.render( scene, camera );
    renderer.render( sceneHelpers, camera );
}

function renderHUDScene()
{
    //renderer.setViewport( 0, 100, 0, 100 );
    //renderer.clearDepth();

    renderer.render( sceneHUD, cameraHUD );
}

function selectObjects()
{
    if( selectionRectangle.width >= 0 && selectionRectangle.height >= 0 )
    {
        renderer.setClearColor( 0x000000 );
        renderer.render( scenePicking, camera, pickingRenderTarget, true );

        var x = selectionRectangle.left;
        var y = selectionRectangle.top;
        var w = selectionRectangle.width || 1;
        var h = selectionRectangle.height || 1;

        //create buffer for reading pixels
        var pixelBuffer = new Uint8Array( w * h * 4 );
        
        renderer.readRenderTargetPixels( pickingRenderTarget, 
                                        x,
                                        pickingRenderTarget.height - y - h, 
                                        w,
                                        h,
                                        pixelBuffer );
        
        pickingTextureSelectionData.set( pixelBuffer );
        
        pickingTextureSelection.image.data = pixelBuffer;
        pickingTextureSelection.image.width = w;
        pickingTextureSelection.image.height = h;
        pickingTextureSelection.needsUpdate = true;

        for( var i = 0; i < selection.length; ++i )
        {
            selection[i].helpers[0].visible = false;
        }
        selection.length = 0;
        
        var ids = {};
        var count = w * h * 4;
        for( var i = 0; i < count; i += 4 )
        {
            var id = ( pixelBuffer[i + 0] << 16 ) | ( pixelBuffer[i + 1] << 8 ) | ( pixelBuffer[i + 2 ] );

            for( var j = 0; j < colors.length; ++j )
            {
                if( colors[j] == id )
                {
                    ids[ j ] = j;
                    break;
                }
            }
        }

        for( var idText in ids ) 
        { 
            var id = ids[idText];
            for( var i = 0; i < sceneObjects.length; ++i ) 
            {
                if( sceneObjects[i].id == id )
                {
                    selection.push( sceneObjects[i] );
                    break;
                }
            }
        }

        for( var i = 0; i < selection.length; ++i )
        {
            selection[i].helpers[0].visible = true;
        }

        if( selection.length == 1 )
        {
            transformControls.attach( selection[0].object );
        }
        else
        {
            transformControls.detach();
        }

        requestAnimationFrame( render );
    }
}

function updateHUDScene() 
{
    textureGizmo.position.set( -screen_width/2 + 50 + 5, screen_height/2 - 50 - 5, 1 ); 
    textureGizmo2.position.set( -screen_width/2 + 50 + 5 + 100 + 5, screen_height/2 - 50 - 5, 1 ); 
}

function resize() 
{
    screen_width  = window.innerWidth;
    screen_height = window.innerHeight;
    aspect_ratio  = (window.innerWidth / window.innerHeight);
        
    camera.aspect = aspect_ratio;
    camera.updateProjectionMatrix();
    
    cameraHUD.left    = -screen_width/2;
    cameraHUD.right   =  screen_width/2;
    cameraHUD.top     =  screen_height/2;
    cameraHUD.bottom  = -screen_height/2;
    cameraHUD.updateProjectionMatrix();

    updateHUDScene();
        
    renderer.setSize( screen_width, screen_height );
    pickingRenderTarget.setSize( screen_width, screen_height );

    requestAnimationFrame( render );
}

function handleMouseMove( event ) 
{
    if( currentControlMode != EControlMode.NONE )
    {
        mouseX = event.pageX;
        mouseY = event.pageY;
    }

    requestAnimationFrame( render );
}

function handleMouseDown( event ) 
{
    switch( event.button )
    {
        case 0:  
        { 
            if( event.shiftKey == true )
            {
                currentControlMode = EControlMode.TRACKBALL;
            }
            else
            if( event.altKey == true )
            {
                currentControlMode = EControlMode.PAN;
            }
            else
            {
                currentControlMode = EControlMode.SELECT;
            }
        }
        break;

        case 1:  { currentControlMode = EControlMode.ZOOM;  } break;

        case 2:
        default: {} break;
    }

    if( currentControlMode != EControlMode.NONE )
    {
        var rect = renderer.domElement.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        mousePrevX = mouseX;
        mousePrevY = mouseY;

        if( currentControlMode == EControlMode.SELECT )
        {
            selectionRectangle.left = mouseX;
            selectionRectangle.top  = mouseY;
            selectionRectangle.width  = 0; 
            selectionRectangle.height = 0; 
        }

        requestAnimationFrame( render);
    }
}

function handleMouseUp( event ) 
{
    if( currentControlMode == EControlMode.SELECT )
    {
        selectObjects();
    }

    currentControlMode = EControlMode.NONE;

    selectionRectangleElement.style.left   = '0px';
    selectionRectangleElement.style.top    = '0px';
    selectionRectangleElement.style.width  = '0px';
    selectionRectangleElement.style.height = '0px';

    mousePrevX = null;
    mousePrevY = null;
    
    mouseX = null;
    mouseY = null;
   
    requestAnimationFrame( render );
}
