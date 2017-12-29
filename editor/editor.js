///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EView       = { TL: 0, TR: 1, BL: 2, BR: 3  };
var EViewMode   = { TL_TR_BL_BR: 0, TL_TR_BL: 1, TL_TR: 2, TL_BL_BR: 3, TL_BL: 4, TL: 5  };

var resizerDimensions = { width: 5, height: 5 };
var panelsDimensions = [ [[ 0, 0, 0.5, 0.5 ], [ 0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]] ];
var currentViewMode = EViewMode.TL_TR_BL_BR;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setPanelDimensions( panel, left, top, width, height )
{
    panel.style.visibility = "visible";
    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.width = width + "px";
    panel.style.height = height + "px";

    var view = getView( panel );
    if( view != undefined )
    {
        view.resize( width, height );
        view.render();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupPanels()
{
    resizePanels();
    init();
    render();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanels()
{
    var view1 = document.getElementById("view1");
    var view2 = document.getElementById("view2");
    var view3 = document.getElementById("view3");
    var view4 = document.getElementById("view4");

    var resizerX1 = document.getElementById("resizerX1");
    var resizerX2 = document.getElementById("resizerX2");
    var resizerY = document.getElementById("resizerY");

    var docWidth = document.body.clientWidth;
    var docHeight = Math.max( window.innerHeight, document.body.clientHeight );

    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;
    
    switch( currentViewMode )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            width  = docWidth  * panelsDimensions[EViewMode.TL_TR_BL_BR][0][2];
            height = docHeight * panelsDimensions[EViewMode.TL_TR_BL_BR][0][3];
            setPanelDimensions( view1, x, y, (width - resizerDimensions.width), (height - resizerDimensions.height) );

            x += width - resizerDimensions.width;
            setPanelDimensions( resizerX1, x, y, resizerDimensions.width * 2, (height - resizerDimensions.height) );

            x += resizerDimensions.width * 2;
            width = docWidth * panelsDimensions[EViewMode.TL_TR_BL_BR][1][2];
            setPanelDimensions( view2, x, y, (width - resizerDimensions.width), (height - resizerDimensions.height) );

            x = 0;
            y += height;
            setPanelDimensions( resizerY, x, (y - resizerDimensions.width), docWidth, resizerDimensions.height * 2 );

            width = docWidth  * panelsDimensions[EViewMode.TL_TR_BL_BR][2][2]; 
            height = docHeight - y;
            y += resizerDimensions.height;
            setPanelDimensions( view3, x, y, (width - resizerDimensions.width), (height - resizerDimensions.height) );

            x += width - resizerDimensions.width;
            setPanelDimensions( resizerX2, x, y, resizerDimensions.width * 2, height );

            x += resizerDimensions.width * 2;
            setPanelDimensions( view4, x, y, docWidth - x, height );
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanelsXTop( x ) 
{
    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            var view1 = document.getElementById("view1");
            setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                       parseInt( view1.style.top, 10 ), 
                                       x, 
                                       parseInt( view1.style.height, 10 ) );
          
            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.left = x + 'px';
            
            var view2 = document.getElementById("view2");
            var resizerWidth = parseInt( resizerX1.style.width, 10 );
            setPanelDimensions( view2, (x + resizerWidth ), 
                                       parseInt( view2.style.top, 10), 
                                       (document.body.clientWidth - ( parseInt( resizerX1.style.left, 10) + resizerWidth ) ), 
                                       parseInt( view1.style.height, 10 ) );

            var width = x / document.body.clientWidth;
            panelsDimensions[EViewMode.TL_TR_BL_BR][0][2] = width;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][0] = width;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][2] = 1.0 - width;
        }
        break;
    } 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanelsXBottom( x ) 
{
    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            var view3 = document.getElementById("view3");
            setPanelDimensions( view3, parseInt( view3.style.left, 10 ),  
                                       parseInt( view3.style.top, 10 ), 
                                       x, 
                                       parseInt( view3.style.height, 10 ) );


            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.left = x + 'px';
            
            var view4 = document.getElementById("view4");
            var resizerWidth = parseInt( resizerX2.style.width, 10 );
            setPanelDimensions( view4, (x + resizerWidth ), 
                                       parseInt( view4.style.top, 10 ), 
                                       (document.body.clientWidth - ( parseInt( resizerX2.style.left, 10) + resizerWidth ) ), 
                                       parseInt( view4.style.height, 10 ) );

            var width = x / document.body.clientWidth;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][2] = width;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][0] = width;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][2] = 1.0 - width;
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanelsY( y ) 
{
    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            var docHeight = Math.floor( Math.max( window.innerHeight, document.body.clientHeight ) );

            var view1 = document.getElementById("view1");
            setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                       parseInt( view1.style.top, 10 ), 
                                       parseInt( view1.style.width, 10 ), 
                                       y );

            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.height = y + 'px';
            
            var view2 = document.getElementById("view2");
            setPanelDimensions( view2, parseInt( view2.style.left, 10 ),
                                       parseInt( view2.style.top, 10 ), 
                                       parseInt( view2.style.width, 10 ), 
                                       y );


            var resizerY = document.getElementById("resizerY");
            resizerY.style.top = y + "px";
            
            var top = ( y + parseInt( resizerY.style.height ) );
            var height = docHeight - top;

            var view3 = document.getElementById("view3");
            setPanelDimensions( view3, parseInt( view3.style.left, 10 ), 
                                       top, 
                                       parseInt( view3.style.width, 10 ), 
                                       height );

            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.top = top + 'px';
            resizerX2.style.height = height + 'px';
            
            var view4 = document.getElementById("view4");
            setPanelDimensions( view4, parseInt( view4.style.left, 10 ), 
                                       top, 
                                       parseInt( view4.style.width, 10 ),
                                       height );

            var height = y / docHeight;
            
            panelsDimensions[EViewMode.TL_TR_BL_BR][0][3] = height;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][3] = height;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][1] = height;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][3] = 1.0 - height;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][1] = height;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][3] = 1.0 - height;
        }
        break;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var views = [];
var scene;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var textureLoader;
var defaultTexture;

var AxisX = new THREE.Vector3( 1, 0, 0 );
var AxisY = new THREE.Vector3( 0, 1, 0 );
var AxisZ = new THREE.Vector3( 0, 0, 1 );

//////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

//////////////////////////////////////////////////////////////////////////////
var Epsilon = 0.001;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function View( canvas, width, height, viewId ) 
{
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    var context = canvas.getContext( '2d' );
    var camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
    camera.position.x = -28.23;
    camera.position.y =  14.34; 
    camera.position.z =  31.06;
    camera.lookAt( new THREE.Vector3( 0.0, 0.0, 0.0 ) );

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;
    renderer.setClearColor( 0xaaaaaa );

    var mousePrevX = null;
    var mousePrevY = null;
    var mouseX = null;
    var mouseY = null;

    var viewId = viewId;
   
    var selectionRectangle = { left: 0, top: 0, width: 0, height: 0 };
    var selectionRectangleElement = document.getElementById( "viewSelect" );
        
    var currentControlMode = EControlMode.NONE;    

    canvas.addEventListener( 'mousemove',  function( event ){ views[ viewId ].handleMouseMove ( event ); }, false );
    canvas.addEventListener( 'mousedown',  function( event ){ views[ viewId ].handleMouseDown ( event ); }, false );
    canvas.addEventListener( 'mouseup',    function( event ){ views[ viewId ].handleMouseUp   ( event ); }, false );
    canvas.addEventListener( 'mouseleave', function( event ){ views[ viewId ].handleMouseUp   ( event ); }, false );    

    this.render = function () 
    {
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
                        //right       = Math.min( right, screen_width );
                        var bottom  = Math.max( mouseY, mousePrevY );
                        //bottom      = Math.min( bottom, screen_height );
    
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
        renderer.clear();
        renderer.render( scene, camera );
        
        context.drawImage( renderer.domElement, 0, 0 );
    };

    this.resize = function( width, height )
    {
        renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );

        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    this.handleMouseMove = function( event ) 
    {
        if( currentControlMode != EControlMode.NONE )
        {
            mouseX = event.pageX;
            mouseY = event.pageY;
    
            requestAnimationFrame( function(){ views[ viewId ].render(); } );
        }
    };
    
    this.handleMouseDown = function( event ) 
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
    
            requestAnimationFrame( function(){ views[ viewId ].render(); } );
        }
    };
    
    this.handleMouseUp = function( event ) 
    {
        currentControlMode = EControlMode.NONE;

        selectionRectangleElement.style.left   = '0px';
        selectionRectangleElement.style.top    = '0px';
        selectionRectangleElement.style.width  = '0px';
        selectionRectangleElement.style.height = '0px';
    
        mousePrevX = null;
        mousePrevY = null;
        
        mouseX = null;
        mouseY = null;
       
        requestAnimationFrame( function(){ views[ viewId ].render(); } );
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function init() 
{
    var canvas1 = document.getElementById( 'view1' );
    var canvas2 = document.getElementById( 'view2' );
    var canvas3 = document.getElementById( 'view3' );
    var canvas4 = document.getElementById( 'view4' );

    views.push( new View( canvas1, parseInt( canvas1.style.width, 10), parseInt( canvas1.style.height, 10 ), 0 ) );
    views.push( new View( canvas2, parseInt( canvas2.style.width, 10), parseInt( canvas2.style.height, 10 ), 1 ) );
    views.push( new View( canvas3, parseInt( canvas3.style.width, 10), parseInt( canvas3.style.height, 10 ), 2 ) );
    views.push( new View( canvas4, parseInt( canvas4.style.width, 10), parseInt( canvas4.style.height, 10 ), 3 ) );

    initScene();
}

function initScene()
{
    textureLoader = new THREE.TextureLoader();
    defaultTexture = textureLoader.load( "textures/UV_Grid_Sm.jpg", render );

    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x333333 ) );
    
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
    scene.add( spotLight );

    var spotLightHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    scene.add( spotLightHelper );
              
    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );

    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: defaultTexture } );
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry( 4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: defaultTexture } );
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add( sphere );

    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff } );
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add( plane );
}

function onViewMouseDown( event, viewIndex ) 
{
    views[ viewIndex ].handleMouseDown( event );
}

function onViewMouseMove( event, viewIndex ) 
{
    views[ viewIndex ].handleMouseMove( event );
}

function onViewMouseUp( event, viewIndex ) 
{
    views[ viewIndex ].handleMouseUp( event );
}

function getView( panel )
{
    var panelId = panel.id;

    if( panelId == "view1" ) return views[ EView.TL ];
    if( panelId == "view2" ) return views[ EView.TR ];
    if( panelId == "view3" ) return views[ EView.BL ];
    if( panelId == "view4" ) return views[ EView.BR ];

    return undefined;
}

function render()
{
    for( var i = 0; i < views.length; ++i )
    {
        views[ i ].render();
    }
    renderView1();


}

function renderView1() { views[ EView.TL ].render(); }
function renderView2() { views[ EView.TR ].render(); }
function renderView3() { views[ EView.BL ].render(); }
function renderView4() { views[ EView.BR ].render(); }
