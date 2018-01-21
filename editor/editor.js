///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EView       = { TL: 0, TR: 1, BL: 2, BR: 3  };
var EViewMode   = { TL_TR_BL_BR: 0, TL_TR_BL: 1, TL_BL_BR: 2, TL_TR: 3, TL_BL_BR: 4, TL_BL: 5, TL: 6, TR: 7, BL: 8, BR: 9  };

var resizerDimensions = { width: 2.5, height: 2.5 };
var panelMenubarHeight = 20;

var panelsDimensions = 
[ 
    [[ 0, 0, 0.5, 0.5 ], [ 0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]],
    [[ 0, 0, 0, 0]],
    [[ 0, 0, 0, 0]],
    [[ 0, 0, 0, 0]],
    [[ 0, 0, 0, 0]],
    [[ 0, 0, 0, 0]],
    [[0.0, 0.0, 1.0, 1.0]],
    [[0.0, 0.0, 1.0, 1.0]],
    [[0.0, 0.0, 1.0, 1.0]],
    [[0.0, 0.0, 1.0, 1.0]]
];

var panelsLimitDimensions = 
[ 
    { minWidth: 128, minHeight: 128 },
    { minWidth: 128, minHeight: 128 },
    { minWidth: 128, minHeight: 128 },
    { minWidth: 128, minHeight: 128 }
]


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
function setPanelDimensions( panel, left, top, width, height, visibility )
{
    //console.log( "setPanelDimensions: panel=" + panel.id + ", left=" + left + ", top=" + top + ", width=" + width + ", height=" + height );

    visibility = (visibility === undefined) ? "visible" : visibility;

    setElementDimensions( panel, left, top, width, height, visibility );

    var _top = 0;
    var _height = height;

    var menuElement = panel.getElementsByClassName( "horizontalmenu" )[0];
    if( menuElement !== undefined )
    {
        setElementDimensions( menuElement, left, top, width, panelMenubarHeight, visibility );

        //_top = panelMenubarHeight;
        //_height = height - panelMenubarHeight;
    }
    
    var viewElement = panel.getElementsByClassName( "element" )[0];
    if( viewElement !== undefined )
    {
        setElementDimensions( viewElement, 0, _top, width, _height, visibility );
    }

    var view = getViewFromPanel( viewElement );
    if( view !== undefined && visibility !== undefined && visibility === "visible" )
    {
        view.resize( width, _height );
        view.render();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupPanels()
{
    resizerX( "resizerX1", function( e ) { resizePanelsXTop( e.pageX ); console.log("resizerX1 x=" + e.pageX ); } );
    resizerX( "resizerX2", function( e ) { resizePanelsXBottom( e.pageX ); } );
    resizerY( "resizerY",  function( e ) { resizePanelsY( e.pageY ); } );
    
    resizePanels();

    init();
    render();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanels()
{
    var editor = document.getElementById("editor");

    var view1 = document.getElementById("panelView1");
    var view2 = document.getElementById("panelView2");
    var view3 = document.getElementById("panelView3");
    var view4 = document.getElementById("panelView4");

    var resizerX1 = document.getElementById("resizerX1");
    var resizerX2 = document.getElementById("resizerX2");
    var resizerY = document.getElementById("resizerY");

    var editorLeft   = parseInt( editor.style.left, 10);
    var editorTop    = parseInt( editor.style.top,  10);
    var editorWidth  = parseInt( editor.style.width,  10); //document.body.clientWidth;
    var editorHeight = parseInt( editor.style.height, 10); //Math.max( window.innerHeight, document.body.clientHeight );

    var x = 0; //editorLeft;
    var y = 0; //editorTop;
    var width = 0;
    var height = 0;

    //TODO: min dimensions
    
    switch( currentViewMode )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            width  = Math.floor( editorWidth  * panelsDimensions[EViewMode.TL_TR_BL_BR][0][2] - resizerDimensions.width );
            height = Math.floor( editorHeight * panelsDimensions[EViewMode.TL_TR_BL_BR][0][3] - resizerDimensions.height );
            width  = Math.max( width,  panelsLimitDimensions[EView.TL].minWidth  );
            height = Math.max( height, panelsLimitDimensions[EView.TL].minHeight );
            setPanelDimensions( view1, x, y, width, height );

            x += width;
            setPanelDimensions( resizerX1, x, y, resizerDimensions.width * 2, height );

            x += resizerDimensions.width * 2;
            width  = Math.max( editorWidth - x, panelsLimitDimensions[EView.TR].minWidth  );
            setPanelDimensions( view2, x, y, width, height );

            x = 0;
            y += height;
            setPanelDimensions( resizerY, x, y, editorWidth, resizerDimensions.height * 2 );

            width = Math.floor( editorWidth  * panelsDimensions[EViewMode.TL_TR_BL_BR][2][2] - resizerDimensions.width ); 
            width = Math.max( width, panelsLimitDimensions[EView.BL].minWidth  );
            y += resizerDimensions.height * 2;
            height = Math.floor( editorHeight - y );
            height = Math.max( height, panelsLimitDimensions[EView.BL].minHeight );
            setPanelDimensions( view3, x, y, width, height );

            x += width;
            setPanelDimensions( resizerX2, x, y, resizerDimensions.width * 2, height );

            x += resizerDimensions.width * 2;
            width  = Math.max( editorWidth - x, panelsLimitDimensions[EView.BR].minWidth  );
            setPanelDimensions( view4, x, y, width, height );
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
            setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * panelsDimensions[EViewMode.TL][0][2] );
            height = Math.floor( editorHeight * panelsDimensions[EViewMode.TL][0][3] );
            width  = Math.max( width,  panelsLimitDimensions[EView.TL].minWidth  );
            height = Math.max( height, panelsLimitDimensions[EView.TL].minHeight );
            setPanelDimensions( view1, x, y, width, height );
        }
        break;
        case EViewMode.TR:
        {
            setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * panelsDimensions[EViewMode.TR][0][2] );
            height = Math.floor( editorHeight * panelsDimensions[EViewMode.TR][0][3] );
            width  = Math.max( width,  panelsLimitDimensions[EView.TR].minWidth  );
            height = Math.max( height, panelsLimitDimensions[EView.TR].minHeight );
            setPanelDimensions( view2, x, y, width, height );
        }
        break;
        case EViewMode.BL:
        {
            setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * panelsDimensions[EViewMode.BL][0][2] );
            height = Math.floor( editorHeight * panelsDimensions[EViewMode.BL][0][3] );
            width  = Math.max( width,  panelsLimitDimensions[EView.BL].minWidth  );
            height = Math.max( height, panelsLimitDimensions[EView.BL].minHeight );
            setPanelDimensions( view3, x, y, width, height );
        }
        break;
        case EViewMode.BR:
        {
            setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * panelsDimensions[EViewMode.BR][0][2] );
            height = Math.floor( editorHeight * panelsDimensions[EViewMode.BR][0][3] );
            width  = Math.max( width,  panelsLimitDimensions[EView.BR].minWidth  );
            height = Math.max( height, panelsLimitDimensions[EView.BR].minHeight );
            setPanelDimensions( view4, x, y, width, height );
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanelsXTop( x ) 
{
    var editor = document.getElementById("editor");
    var editorLeft   = parseInt( editor.style.left, 10);
    var editorWidth  = parseInt( editor.style.width,  10); //document.body.clientWidth;
    x = x - editorLeft;

    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            x = Math.max( x, panelsLimitDimensions[EView.TL].minWidth );
            x = Math.min( x, ( editorWidth - panelsLimitDimensions[EView.TR].minWidth ) );

            var view1 = document.getElementById("panelView1");
            setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                       parseInt( view1.style.top, 10 ), 
                                       x, 
                                       parseInt( view1.style.height, 10 ) );
          
            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.left = x + 'px';
            
            var view2 = document.getElementById("panelView2");
            var resizerWidth = parseInt( resizerX1.style.width, 10 );
            x += resizerWidth;
            setPanelDimensions( view2, x, 
                                       parseInt( view2.style.top, 10), 
                                       editorWidth -x,
                                       parseInt( view2.style.height, 10 ) );

            var ratio = (x - resizerWidth/2) / editorWidth;
            panelsDimensions[EViewMode.TL_TR_BL_BR][0][2] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][0] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][2] = 1.0 - ratio;
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
        case EViewMode.TR:
        case EViewMode.BL:
        case EViewMode.BR:
        {
        }
        break;
    } 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePanelsXBottom( x ) 
{
    var editor = document.getElementById("editor");
    var editorLeft   = parseInt( editor.style.left, 10);
    var editorWidth  = parseInt( editor.style.width,  10); //document.body.clientWidth;
    x = x - editorLeft;

    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            x = Math.max( x, panelsLimitDimensions[EView.BL].minWidth );
            x = Math.min( x, ( editorWidth - panelsLimitDimensions[EView.BR].minWidth ) );

            var view3 = document.getElementById("panelView3");
            setPanelDimensions( view3, parseInt( view3.style.left, 10 ), 
                                       parseInt( view3.style.top, 10 ), 
                                       x, 
                                       parseInt( view3.style.height, 10 ) );
          
            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.left = x + 'px';
            
            var view4 = document.getElementById("panelView4");
            var resizerWidth = parseInt( resizerX2.style.width, 10 );
            x += resizerWidth;

            setPanelDimensions( view4, x, 
                                       parseInt( view4.style.top, 10), 
                                       editorWidth - x, 
                                       parseInt( view4.style.height, 10 ) );

            var ratio = (x - resizerWidth/2) / editorWidth;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][2] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][0] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][2] = 1.0 - ratio;
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
    var editor = document.getElementById("editor");
    var editorTop    = parseInt( editor.style.top,  10);            
    var editorHeight = parseInt( editor.style.height, 10);
    y = y - editorTop;

    switch( currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            y = Math.max( y, panelsLimitDimensions[EView.TL].minHeight );
            y = Math.min( y, ( editorHeight - panelsLimitDimensions[EView.BL].minHeight ) );
            
            var view1 = document.getElementById("panelView1");
            setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                       parseInt( view1.style.top, 10 ), 
                                       parseInt( view1.style.width, 10 ), 
                                       y );

            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.height = y + 'px';
            
            var view2 = document.getElementById("panelView2");
            setPanelDimensions( view2, parseInt( view2.style.left, 10 ),
                                       parseInt( view2.style.top, 10 ), 
                                       parseInt( view2.style.width, 10 ), 
                                       y );

            var resizerY = document.getElementById("resizerY");
            resizerY.style.top = y + "px";
            var resizerYHeight = parseInt( resizerY.style.height, 10 );
            
            var top = y + parseInt( resizerY.style.height );
            var height = editorHeight - top;

            var view3 = document.getElementById("panelView3");
            setPanelDimensions( view3, parseInt( view3.style.left, 10 ), 
                                       top, 
                                       parseInt( view3.style.width, 10 ), 
                                       height );

            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.top = top + 'px';
            resizerX2.style.height = height + 'px';
            
            var view4 = document.getElementById("panelView4");
            setPanelDimensions( view4, parseInt( view4.style.left, 10 ), 
                                       top, 
                                       parseInt( view4.style.width, 10 ),
                                       height );

            var ratio = (y - resizerYHeight/2) / editorHeight;
            panelsDimensions[EViewMode.TL_TR_BL_BR][0][3] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][1][3] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][1] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][2][3] = 1.0 - ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][1] = ratio;
            panelsDimensions[EViewMode.TL_TR_BL_BR][3][3] = 1.0 - ratio;
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setPanelsLayout( mode )
{
    if( (mode !== undefined) && (mode != currentViewMode) )
    {
        currentViewMode = mode;

        resizePanels();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var scene;
var textureLoader;
var defaultTexture;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function init() 
{
    initScene();

    var canvas;
    var view;
    
    canvas = document.getElementById( "view1" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 0, scene );
        view.setView( new THREE.Vector3( -28.23, 14.34, 31.06 ), Zero );
    }

    canvas = document.getElementById( "view2" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 1, scene );
        view.setView( new THREE.Vector3( -50, 5, 0 ), Zero );
    }

    canvas = document.getElementById( "view3" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 2, scene );
        view.setView( new THREE.Vector3( 0, 5, -50 ), Zero );
    }

    canvas = document.getElementById( "view4" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 3, scene );
        view.setView( new THREE.Vector3( 0, 55, 0 ), Zero );
    }
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
    if( panel != null )
    {
        return panel.editor_view_object;
    }
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

