///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EView       = { TL: 0, TR: 1, BL: 2, BR: 3  };
var EViewMode   = { TL_TR_BL_BR: 0, TL_TR_BL: 1, TL_TR: 2, TL_BL_BR: 3, TL_BL: 4, TL: 5  };

var resizerDimensions = { width: 5, height: 5 };

var panelsDimensions = [ [[ 0, 0, 0.5, 0.5 ], [ 0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]] ];
var currentViewMode = EViewMode.TL_TR_BL_BR;

function Editor()
{
    var EView       = { TL: 0, TR: 1, BL: 2, BR: 3  };
    var EViewMode   = { TL_TR_BL_BR: 0, TL_TR_BL: 1, TL_TR: 2, TL_BL_BR: 3, TL_BL: 4, TL: 5  };

    var resizerDimensions = { width: 5, height: 5 };

    var panelsDimensions = [ [[ 0, 0, 0.5, 0.5 ], [ 0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]] ];
    var currentViewMode = EViewMode.TL_TR_BL_BR;

    var views = [];

    this.init = function()
    {
    };

    this.setPanelDimensions = function( panel, left, top, width, height )
    {
    };

    this.setupPanels = function()
    {};

    this.resizePanels = function()
    {};

    this.resizePanelsXTop = function( x )
    {};

    this.resizePanelsXBottom = function( x )
    {};

    this.resizePanelsY = function( y )
    {};
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setPanelDimensions( panel, left, top, width, height )
{
    panel.style.visibility = "visible";
    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.width = width + "px";
    panel.style.height = height + "px";

    var view = getViewFromPanel( panel );
    if( view !== undefined )
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
        case EViewMode.TL_TR_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL_TR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL_BR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL:
        {
            //TODO
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
        case EViewMode.TL_TR_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL_TR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL_BR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL:
        {
            //TODO
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
        case EViewMode.TL_TR_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL_TR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL_BR:
        {
            //TODO
        }
        break;
        case EViewMode.TL_BL:
        {
            //TODO
        }
        break;
        case EViewMode.TL:
        {
            //TODO
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
var scene;
var textureLoader;
var defaultTexture;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function init() 
{
    var canvas;
    
    canvas = document.getElementById( 'view1' );
    new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 0 );
    canvas = document.getElementById( 'view2' );
    new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 1 );
    canvas = document.getElementById( 'view3' );
    new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 2 );
    canvas = document.getElementById( 'view4' );
    //new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 3 );
    new View( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 3 );

    initScene();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getViewFromPanel( panel )
{
    return panel.editor_view_object;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function render()
{
    var view;
    
    view = getViewFromPanel( document.getElementById( "view1" ) );
    if(view !== undefined)
    {
        view.render();
    }
    view = getViewFromPanel( document.getElementById( "view2" ) );
    if( view !== undefined )
    {
        view.render();
    }
    view = getViewFromPanel( document.getElementById( "view3" ) );
    if( view !== undefined )
    {
        view.render();
    }
    view = getViewFromPanel( document.getElementById( "view4" ) );
    if( view !== undefined )
    {
        view.render();
    }
}