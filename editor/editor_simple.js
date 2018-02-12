var screen_left;
var screen_top;
var screen_width;
var screen_height;

var screen_aspect_ratio;

var textureLoader;
var defaultTexture;

var renderer;

var camera;
var scene;
var sceneHelpers;

var scenePicking;
var pickingRenderTarget;
var pickingTextureScene;
var pickingTextureSelection;

var sceneObjectsId = 1;
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
function addObject( object, dontAddToScene  )
{
    var editorObject = { id: sceneObjectsId++ };

    object.updateMatrixWorld();

    if( !dontAddToScene )
    {
        scene.add( object );
    }

    editorObject.object = object;
    editorObject.helpers = [];
    
    if( object instanceof THREE.Mesh )
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        editorObject.helpers.push( selectionHelper );

        var objectPicking = object.clone();
        //objectPicking.material = new THREE.MeshBasicMaterial( { color: colors[editorObject.id] } );
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
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
        //var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: colors[editorObject.id] } );
        var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: editorObject.id } );
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
  
    for( var i = 0; i < object.children.length; ++i )
    {
        addObject( object.children[i], true );
    }

    uiPage.dispatchEvent( "objectAdded", object );
}

//////////////////////////////////////////////////////////////////////////////
function setupEditor()
{  
    var editor = document.getElementById( "editor" );
    screen_left   = parseInt( editor.style.left, 10 );
    screen_top    = parseInt( editor.style.top, 10 );
    screen_width  = parseInt( editor.style.width, 10 );
    screen_height = parseInt( editor.style.height, 10 );
    screen_aspect_ratio  = (screen_width / screen_height);

    textureLoader = new THREE.TextureLoader();
    defaultTexture = textureLoader.load( "textures/UV_Grid_Sm.jpg", render );

    scene = new THREE.Scene( { name: "Scene" } );
    uiPage.dispatchEvent( "sceneCreated", scene );

    sceneHelpers = new THREE.Scene();
    scenePicking = new THREE.Scene();
    sceneHUD = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, screen_aspect_ratio, 0.1, 1000 );
    camera.position.x = -28.23;
    camera.position.y = 14.34;
    camera.position.z = 31.06;
    camera.lookAt( scene.position );  
   
    initPickingScene();
    initScene();
    initHUDScene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( screen_width, screen_height );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;

    transformControls = new THREE.TransformControls( camera, renderer.domElement );
    transformControls.addEventListener( 'change', render );
    scene.add( transformControls );
    
    document.getElementById("editor").appendChild( renderer.domElement );
    document.getElementById("editor").addEventListener( 'mousedown',  handleMouseDown,  false );
    document.getElementById("editor").addEventListener( 'mousemove',  handleMouseMove,  false );
    document.getElementById("editor").addEventListener( 'mouseup',    handleMouseUp,    false );

    uiPage.addEventListener( "objectSelected",   onObjectSelected );
    uiPage.addEventListener( "objectDeselected", onObjectDeselected );

    selectionRectangleElement = document.getElementById( "Select-rectangle" );

    editor.onresize = resizeEditor;
 
    requestAnimationFrame( render );
}

//////////////////////////////////////////////////////////////////////////////
function initScene() 
{
    var ambientLight = new THREE.AmbientLight( 0x222222 );
    ambientLight.name = "ambientLight";
    scene.add( ambientLight );

    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );
       
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
    spotLight.castShadow = true;    
    addObject( spotLight );
      
    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: defaultTexture } );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube1";
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    addObject( cube );

    /*
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
    */

    /*
    // collada
    var test = LoaderUtils.extractUrlBase( "./test1/test2" ); 

    var dae;
    var loadingManager = new THREE.LoadingManager( function() 
    { 
        dae.scale.x = 10;
        dae.scale.y = 10;
        dae.scale.z = 10;

        addObject( dae ); } );
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './data/g4jmqcp3hjwg-Sofa/sofa.dae', function ( collada ) { dae = collada.scene; } );
    */

    /*
    //3ds files dont store normal maps
    var loader = new THREE.TextureLoader();
    var normal = loader.load( './data/g4jmqcp3hjwg-Sofa/WoolNM.jpg' );
    var loader = new THREE.TDSLoader( );
    loader.setPath( './data/g4jmqcp3hjwg-Sofa/' );
    loader.load( './data/g4jmqcp3hjwg-Sofa/sofa.3ds', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.normalMap = normal;
            }
        } );

        object.scale.x = 10;
        object.scale.y = 10;
        object.scale.z = 10;

        addObject( object );
    });
    */
    var loader = new THREE.TextureLoader();
    var normal = loader.load( './data/portalgun/normal.jpg' );
    var loader = new THREE.TDSLoader( );
    loader.setPath( './data/portalgun/' );
    loader.load( './data/portalgun/portalgun.3ds', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.normalMap = normal;
            }
        } );

        var object = object.children[0];

        object.scale.x = 10;
        object.scale.y = 10;
        object.scale.z = 10;

        addObject( object );
    });

    /*
    var onProgress = function ( xhr ) 
    {
        if ( xhr.lengthComputable ) 
        {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {};

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( './data/g4jmqcp3hjwg-Sofa/' );
    mtlLoader.load( 'sofa.mtl', 
                    function( materials ) 
                    {
                        materials.preload();
                        var objLoader = new THREE.OBJLoader();
                        objLoader.setMaterials( materials );
                        objLoader.setPath( './data/g4jmqcp3hjwg-Sofa/' );
                        objLoader.load( 'sofa.obj', function ( object ) 
                        {
                            //object.scale.x = 0.1;
                            //object.scale.y = 0.1;
                            //object.scale.z = 0.1;

                            //object.position.y = -9.5;
                            addObject( object );
                        }, onProgress, onError );
                    });
    */
}

//////////////////////////////////////////////////////////////////////////////
function initPickingScene()
{
    pickingRenderTarget = new THREE.WebGLRenderTarget( screen_width, screen_height );
    pickingRenderTarget.texture.minFilter = THREE.LinearFilter;
    pickingRenderTarget.texture.maxFilter = THREE.NearestFilter;

    var pickingTextureSceneData = new Uint8Array( screen_width * screen_height * 4 );
    pickingTextureScene = new THREE.DataTexture( pickingTextureSceneData, screen_width, screen_height, THREE.RGBAFormat );
    pickingTextureScene.needsUpdate = true;

    var pickingTextureSelectionData = new Uint8Array( screen_width * screen_height * 4 );
    pickingTextureSelection = new THREE.DataTexture( pickingTextureSelectionData, screen_width, screen_height, THREE.RGBAFormat );
    pickingTextureSelection.needsUpdate = true;
}

//////////////////////////////////////////////////////////////////////////////
function initHUDScene()
{
    cameraHUD = new THREE.OrthographicCamera( -screen_width/2, screen_width/2, screen_height/2, -screen_height/2, -100, 100 );

    var textureGizmoMaterial1 = new THREE.SpriteMaterial( { map: pickingTextureScene } );
    textureGizmo1 = new THREE.Sprite( textureGizmoMaterial1 );
    textureGizmo1.scale.set( 100, 100, 1 );
    textureGizmo1.position.set( 0, 0, 1 );
    sceneHUD.add( textureGizmo1 );

    var textureGizmoMaterial2 = new THREE.SpriteMaterial( { map: pickingTextureSelection } );
    textureGizmo2 = new THREE.Sprite( textureGizmoMaterial2 );
    textureGizmo2.scale.set( 100, 100, 1 );
    textureGizmo2.position.set( 0, 0, 1 );
    sceneHUD.add( textureGizmo2 );

    updateHUDScene();
}

//////////////////////////////////////////////////////////////////////////////
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
    //renderHUDScene();
}

//////////////////////////////////////////////////////////////////////////////
function renderPickingScene() 
{
    if( currentControlMode == EControlMode.SELECT )
    {
    }
}

//////////////////////////////////////////////////////////////////////////////
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

                    var rect = renderer.domElement.getBoundingClientRect();
                    selectionRectangleElement.style.left   = rect.left + selectionRectangle.left   + 'px';
                    selectionRectangleElement.style.top    = rect.top  + selectionRectangle.top    + 'px';
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

//////////////////////////////////////////////////////////////////////////////
function renderHUDScene()
{
    //renderer.setViewport( 0, 100, 0, 100 );
    //renderer.clearDepth();

    renderer.render( sceneHUD, cameraHUD );
}

//////////////////////////////////////////////////////////////////////////////
function onObjectSelected( objects )
{
    for( var i = 0; i < sceneObjects.length; ++i ) 
    {
        if( sceneObjects[i].object == objects[0] )
        {
            selection.push( sceneObjects[i] );
            break;
        }
    }

    for( var i = 0; i < selection.length; ++i )
    {
        selection[i].helpers[0].visible = true;
    }

    if( selection.length == 1 )
    {
        var object = selection[0].object
        transformControls.attach( object );
    }

    requestAnimationFrame( render );    
}

//////////////////////////////////////////////////////////////////////////////
function onObjectDeselected()
{
    transformControls.detach();

    for( var i = 0; i < selection.length; ++i )
    {
        selection[i].helpers[0].visible = false;
    }

    selection.length = 0;
    
    requestAnimationFrame( render );
}

//////////////////////////////////////////////////////////////////////////////
function selectObjects()
{
    if( selectionRectangle.width >= 0 && selectionRectangle.height >= 0 )
    {
        renderer.setClearColor( 0x000000 );
        renderer.render( scenePicking, camera, pickingRenderTarget, true );

        var pixelBuffer = new Uint8Array( pickingRenderTarget.width * pickingRenderTarget.height * 4 );
        renderer.readRenderTargetPixels( pickingRenderTarget, 
                                         0,
                                         0, 
                                         pickingRenderTarget.width,
                                         pickingRenderTarget.height,
                                         pixelBuffer );
        

        pickingTextureScene.image.data = pixelBuffer;
        pickingTextureScene.image.width = pickingRenderTarget.width;
        pickingTextureScene.image.height = pickingRenderTarget.height;
        pickingTextureScene.needsUpdate = true;
        
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
       
        pickingTextureSelection.image.data = pixelBuffer;
        pickingTextureSelection.image.width = w;
        pickingTextureSelection.image.height = h;
        pickingTextureSelection.needsUpdate = true;

        if( selection.length > 0 )
        {
            uiPage.dispatchEvent( "objectDeselected", [selection[0].object] );
        }
        else
        {
            uiPage.dispatchEvent( "objectDeselected", [] );
        }
       
        var ids = {};
        var count = w * h * 4;
        for( var i = 0; i < count; i += 4 )
        {
            var id = ( pixelBuffer[i + 0] << 16 ) | ( pixelBuffer[i + 1] << 8 ) | ( pixelBuffer[i + 2 ] );
            ids[id] = id;
        }

        var objects = [];
        for( var idText in ids ) 
        { 
            var id = ids[idText];
            for( var i = 0; i < sceneObjects.length; ++i ) 
            {
                if( sceneObjects[i].id == id )
                {
                    objects.push( sceneObjects[i].object );
                    break;
                }
            }
        }

        if( objects.length > 0 )
        {
            uiPage.dispatchEvent( "objectSelected", objects );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
function updateHUDScene() 
{
    textureGizmo1.position.set( -screen_width/2 + 50 + 5, screen_height/2 - 50 - 5, 1 ); 
    textureGizmo2.position.set( -screen_width/2 + 50 + 5 + 100 + 5, screen_height/2 - 50 - 5, 1 ); 
}

//////////////////////////////////////////////////////////////////////////////
function resizeEditor()
{
    var editor = document.getElementById( "editor" );
    screen_left   = parseInt( editor.style.left, 10 );
    screen_top    = parseInt( editor.style.top, 10 );
    screen_width  = parseInt( editor.style.width, 10 );
    screen_height = parseInt( editor.style.height, 10 );
    screen_aspect_ratio  = (screen_width / screen_height);
        
    camera.aspect = screen_aspect_ratio;
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

//////////////////////////////////////////////////////////////////////////////
function handleMouseMove( event ) 
{
    if( currentControlMode != EControlMode.NONE )
    {
        var rect = renderer.domElement.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }

    requestAnimationFrame( render );
}

//////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
function init() 
{
    setupPage();
    setupEditor();
}

//////////////////////////////////////////////////////////////////////////////
function resize() 
{
    resizePage();
    resizeEditor();
}

