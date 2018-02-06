///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Editor( vieMode, editorData )
{
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.resizerDimensions = editorData.resizerDimensions;
    this.panelMenubarHeight = editorData.panelMenubarHeight;

    this.panelsDimensions = editorData.panelsDimensions;
    this.panelsLimitDimensions = editorData.panelsLimitDimensions;
    this.currentViewMode = vieMode;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scene = new THREE.Scene();
    this.textureLoader = new THREE.TextureLoader();
    this.defaultTexture = undefined;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scenePicking = new THREE.Scene();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: Editor
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.setPanelDimensions = function( panel, left, top, width, height, visibility )
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

    var view = this.getViewFromPanel( viewElement );
    if( view !== undefined && visibility !== undefined && visibility === "visible" )
    {
        view.resize( width, _height );
        view.render();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.setupPanels = function()
{
    var fnResizePanelsXTop = this.resizePanelsXTop.bind( this );
    resizerX( "resizerX1", function( e ) { fnResizePanelsXTop( e.pageX ); } );
    var fnResizePanelsXBottom = this.resizePanelsXBottom.bind( this );
    resizerX( "resizerX2", function( e ) { fnResizePanelsXBottom( e.pageX ); } );
    var fnResizePanelsY = this.resizePanelsY.bind( this );
    resizerY( "resizerY",  function( e ) { fnResizePanelsY( e.pageY ); } );
    
    this.resizePanels();

    this.init();
    this.render();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.resizePanels = function()
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
    
    switch( this.currentViewMode )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            width  = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.TL_TR_BL_BR][0][2] - this.resizerDimensions.width );
            height = Math.floor( editorHeight * this.panelsDimensions[EViewMode.TL_TR_BL_BR][0][3] - this.resizerDimensions.height );
            width  = Math.max( width,  this.panelsLimitDimensions[EView.TL].minWidth  );
            height = Math.max( height, this.panelsLimitDimensions[EView.TL].minHeight );
            this.setPanelDimensions( view1, x, y, width, height );

            x += width;
            this.setPanelDimensions( resizerX1, x, y, this.resizerDimensions.width * 2, height );

            x += this.resizerDimensions.width * 2;
            width  = Math.max( editorWidth - x, this.panelsLimitDimensions[EView.TR].minWidth  );
            this.setPanelDimensions( view2, x, y, width, height );

            x = 0;
            y += height;
            this.setPanelDimensions( resizerY, x, y, editorWidth, this.resizerDimensions.height * 2 );

            width = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.TL_TR_BL_BR][2][2] - this.resizerDimensions.width ); 
            width = Math.max( width, this.panelsLimitDimensions[EView.BL].minWidth  );
            y += this.resizerDimensions.height * 2;
            height = Math.floor( editorHeight - y );
            height = Math.max( height, this.panelsLimitDimensions[EView.BL].minHeight );
            this.setPanelDimensions( view3, x, y, width, height );

            x += width;
            this.setPanelDimensions( resizerX2, x, y, this.resizerDimensions.width * 2, height );

            x += this.resizerDimensions.width * 2;
            width  = Math.max( editorWidth - x, this.panelsLimitDimensions[EView.BR].minWidth  );
            this.setPanelDimensions( view4, x, y, width, height );
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
            this.setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.TL][0][2] );
            height = Math.floor( editorHeight * this.panelsDimensions[EViewMode.TL][0][3] );
            width  = Math.max( width,  this.panelsLimitDimensions[EView.TL].minWidth  );
            height = Math.max( height, this.panelsLimitDimensions[EView.TL].minHeight );
            this.setPanelDimensions( view1, x, y, width, height );
        }
        break;
        case EViewMode.TR:
        {
            this.setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.TR][0][2] );
            height = Math.floor( editorHeight * this.panelsDimensions[EViewMode.TR][0][3] );
            width  = Math.max( width,  this.panelsLimitDimensions[EView.TR].minWidth  );
            height = Math.max( height, this.panelsLimitDimensions[EView.TR].minHeight );
            this.setPanelDimensions( view2, x, y, width, height );
        }
        break;
        case EViewMode.BL:
        {
            this.setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view4, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.BL][0][2] );
            height = Math.floor( editorHeight * this.panelsDimensions[EViewMode.BL][0][3] );
            width  = Math.max( width,  this.panelsLimitDimensions[EView.BL].minWidth  );
            height = Math.max( height, this.panelsLimitDimensions[EView.BL].minHeight );
            this.setPanelDimensions( view3, x, y, width, height );
        }
        break;
        case EViewMode.BR:
        {
            this.setPanelDimensions( view1, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view2, 0, 0, 0, 0, "hidden" );
            this.setPanelDimensions( view3, 0, 0, 0, 0, "hidden" );

            setElementDimensions( resizerX1, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerX2, 0, 0, 0, 0, "hidden" );
            setElementDimensions( resizerY,  0, 0, 0, 0, "hidden" );

            width  = Math.floor( editorWidth  * this.panelsDimensions[EViewMode.BR][0][2] );
            height = Math.floor( editorHeight * this.panelsDimensions[EViewMode.BR][0][3] );
            width  = Math.max( width,  this.panelsLimitDimensions[EView.BR].minWidth  );
            height = Math.max( height, this.panelsLimitDimensions[EView.BR].minHeight );
            this.setPanelDimensions( view4, x, y, width, height );
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.resizePanelsXTop = function( x ) 
{
    var editor = document.getElementById("editor");
    var editorLeft   = parseInt( editor.style.left, 10);
    var editorWidth  = parseInt( editor.style.width,  10); //document.body.clientWidth;
    x = x - editorLeft;

    switch( this.currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            x = Math.max( x, this.panelsLimitDimensions[EView.TL].minWidth );
            x = Math.min( x, ( editorWidth - this.panelsLimitDimensions[EView.TR].minWidth ) );

            var view1 = document.getElementById("panelView1");
            this.setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                            parseInt( view1.style.top, 10 ), 
                                            x, 
                                            parseInt( view1.style.height, 10 ) );
            
            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.left = x + 'px';
            
            var view2 = document.getElementById("panelView2");
            var resizerWidth = parseInt( resizerX1.style.width, 10 );
            x += resizerWidth;
            this.setPanelDimensions( view2, x, 
                                            parseInt( view2.style.top, 10), 
                                            editorWidth -x,
                                            parseInt( view2.style.height, 10 ) );

            var ratio = (x - resizerWidth/2) / editorWidth;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][0][2] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][1][0] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][1][2] = 1.0 - ratio;
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
Editor.prototype.resizePanelsXBottom = function( x ) 
{
    var editor = document.getElementById("editor");
    var editorLeft   = parseInt( editor.style.left, 10);
    var editorWidth  = parseInt( editor.style.width,  10); //document.body.clientWidth;
    x = x - editorLeft;

    switch( this.currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            x = Math.max( x, this.panelsLimitDimensions[EView.BL].minWidth );
            x = Math.min( x, ( editorWidth - this.panelsLimitDimensions[EView.BR].minWidth ) );

            var view3 = document.getElementById("panelView3");
            this.setPanelDimensions( view3, parseInt( view3.style.left, 10 ), 
                                            parseInt( view3.style.top, 10 ), 
                                            x, 
                                            parseInt( view3.style.height, 10 ) );
          
            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.left = x + 'px';
            
            var view4 = document.getElementById("panelView4");
            var resizerWidth = parseInt( resizerX2.style.width, 10 );
            x += resizerWidth;

            this.setPanelDimensions( view4, x, 
                                            parseInt( view4.style.top, 10), 
                                            editorWidth - x, 
                                            parseInt( view4.style.height, 10 ) );

            var ratio = (x - resizerWidth/2) / editorWidth;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][2][2] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][3][0] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][3][2] = 1.0 - ratio;
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
Editor.prototype.resizePanelsY = function( y ) 
{
    var editor = document.getElementById("editor");
    var editorTop    = parseInt( editor.style.top,  10);            
    var editorHeight = parseInt( editor.style.height, 10);
    y = y - editorTop;

    switch( this.currentViewMode  )
    {
        default:
        case EViewMode.TL_TR_BL_BR:
        {
            y = Math.max( y, this.panelsLimitDimensions[EView.TL].minHeight );
            y = Math.min( y, ( editorHeight - this.panelsLimitDimensions[EView.BL].minHeight ) );
            
            var view1 = document.getElementById("panelView1");
            this.setPanelDimensions( view1, parseInt( view1.style.left, 10 ), 
                                            parseInt( view1.style.top, 10 ), 
                                            parseInt( view1.style.width, 10 ), 
                                            y );

            var resizerX1 = document.getElementById("resizerX1");
            resizerX1.style.height = y + 'px';
            
            var view2 = document.getElementById("panelView2");
            this.setPanelDimensions( view2, parseInt( view2.style.left, 10 ),
                                            parseInt( view2.style.top, 10 ), 
                                            parseInt( view2.style.width, 10 ), 
                                            y );

            var resizerY = document.getElementById("resizerY");
            resizerY.style.top = y + "px";
            var resizerYHeight = parseInt( resizerY.style.height, 10 );
            
            var top = y + parseInt( resizerY.style.height );
            var height = editorHeight - top;

            var view3 = document.getElementById("panelView3");
            this.setPanelDimensions( view3, parseInt( view3.style.left, 10 ), 
                                            top, 
                                            parseInt( view3.style.width, 10 ), 
                                            height );

            var resizerX2 = document.getElementById("resizerX2");
            resizerX2.style.top = top + 'px';
            resizerX2.style.height = height + 'px';
            
            var view4 = document.getElementById("panelView4");
            this.setPanelDimensions( view4, parseInt( view4.style.left, 10 ), 
                                            top, 
                                            parseInt( view4.style.width, 10 ),
                                            height );

            var ratio = (y - resizerYHeight/2) / editorHeight;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][0][3] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][1][3] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][2][1] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][2][3] = 1.0 - ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][3][1] = ratio;
            this.panelsDimensions[EViewMode.TL_TR_BL_BR][3][3] = 1.0 - ratio;
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.setPanelsLayout = function( mode )
{
    if( (mode !== undefined) && (mode != this.currentViewMode) )
    {
        this.currentViewMode = mode;

        this.resizePanels();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.init = function() 
{
    this.initScene();

    var canvas;
    var view;
    
    canvas = document.getElementById( "view1" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 0, this.scene );
        view.setView( new THREE.Vector3( -28.23, 14.34, 31.06 ), Zero );
    }

    canvas = document.getElementById( "view2" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 1, this.scene );
        view.setView( new THREE.Vector3( -50, 5, 0 ), Zero );
    }

    canvas = document.getElementById( "view3" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 2, this.scene );
        view.setView( new THREE.Vector3( 0, 5, -50 ), Zero );
    }

    canvas = document.getElementById( "view4" );
    if( canvas != null )
    {
        view = new ViewWebGL( canvas, parseInt( canvas.style.width, 10), parseInt( canvas.style.height, 10 ), 3, this.scene );
        view.setView( new THREE.Vector3( 0, 55, 0 ), Zero );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addSceneObject = function( object )
{
    this.scene.add( object );

    switch( object.type )
    {
        case "Mesh" :
        {
            var pickingObject = object.clone();
            var pickingMaterial = new THREE.MeshBasicMaterial( { color: object.id } );
            pickingObject.material = pickingMaterial;

            this.scenePicking.add( pickingObject );
        }
        break;
        default:
        {
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.initScene = function()
{
    this.defaultTexture = this.textureLoader.load( "textures/UV_Grid_Sm.jpg", this.render.bind( this ) );

    this.scene.add( new THREE.AmbientLight( 0x333333 ) );
    
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
    this.addSceneObject( spotLight );

    var spotLightHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    this.addSceneObject( spotLightHelper );
              
    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.addSceneObject( helper );

    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: this.defaultTexture } );
    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    this.addSceneObject( cube );

    var sphereGeometry = new THREE.SphereGeometry( 4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: this.defaultTexture } );
    sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    this.addSceneObject( sphere );

    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff } );
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    this.addSceneObject( plane );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getViewFromPanel = function( panel )
{
    if( panel != null )
    {
        return panel.editor_view_object;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.render = function()
{
    var view;
    
    view = this.getViewFromPanel( document.getElementById( "view1" ) );
    if(view !== undefined)
    {
        view.render();
    }
    view = this.getViewFromPanel( document.getElementById( "view2" ) );
    if( view !== undefined )
    {
        view.render();
    }
    view = this.getViewFromPanel( document.getElementById( "view3" ) );
    if( view !== undefined )
    {
        view.render();
    }
    view = this.getViewFromPanel( document.getElementById( "view4" ) );
    if( view !== undefined )
    {
        view.render();
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var editor = new Editor( EViewMode.TL, editorData );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupPageElements()
{
    setupPageLayout();
    editor.setupPanels();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePageElements()
{
    setupPageLayout();
    editor.resizePanels();
}

