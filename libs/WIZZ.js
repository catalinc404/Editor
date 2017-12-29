"use strict";

//////////////////////////////////////////////////////////////////////////////
// View
//////////////////////////////////////////////////////////////////////////////
var viewId = 0;

var EViewType = { DEFAULT : 0 };


function View( scene, camera, type, name ) 
{
    Object.defineProperty( this, 'id', { value: viewId += 1 } );

    this.name   = name;

    this.type   = type   !== undefined ? type   : EViewType.DEFAULT;
    this.scene  = scene  !== undefined ? scene  : new THREE.Scene();
    this.camera = camera !== undefined ? camera : new THREE.PerspectiveCamera( 45, 1, 0.1, 1000 );

    this.sceneHUD = new THREE.Scene();
  
    this.selection = [];

    function render( renderer )
    {
        renderer.render( this.scene, this.camera );
    }
}

Object.assign( View.prototype, 
    {
        clone: function()
        {
            return new View( this.scene, this.camera );
        }
    } );


//////////////////////////////////////////////////////////////////////////////
// WIZ
//////////////////////////////////////////////////////////////////////////////
function WIZZ() 
{
    this.views = [];

    this.renderer = new THREE.WebGLRenderer( { antialias:true } );

    this.scene = new THREE.Scene();
    this.scenePicking = new THREE.Scene();
 
    this.textureLoader = new THREE.TextureLoader();
    this.defaultTexture = this.textureLoader.load( "textures/UV_Grid_Sm.jpg"/*, this.draw*/ );

    this.width = 0;
    this.height = 0;
    this.aspectRatio = 1;
 };

Object.assign( WIZZ.prototype, 
{
        createView: function( scene, camera )
        {
            var view = new View( scene, camera );
            this.views.push( view );

            return view;
        },

        findViewByName: function( name )
        {
           var view = undefined;

           for( var viewIt in this.views )
           {
               if( viewIt.name === name )
               {
                   view = viewIt;
                   break;
               }
           }

           return view;
        },

        findViewById: function( id )
        {
           var view = undefined;

           for( var viewIt in this.views )
           {
               if( viewIt.id === id )
               {
                   view = viewIt;
                   break;
               }
           }

           return view;
        },

        initialize: function( )
        {
            //this.renderer.setPixelRatio( window.devicePixelRatio );
            //this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.autoClear = false;
    
            document.getElementById( "WebGL-output" /*elementId*/ ).appendChild( this.renderer.domElement );
    
            this.initScene();
    
            //requestAnimationFrame( this.render );
        },
        
        initScene: function()
        {
            var ambientLight = new THREE.AmbientLight( 0x333333 );

            this.scene.add( ambientLight );
    
            var grid = new THREE.GridHelper( 100, 40 );
            grid.position.x = 0;
            grid.position.y = -1;
            grid.position.z = 0;
            grid.material.opacity = 0.25;
            grid.material.transparent = true;

            this.scene.add( grid );
        },
    
        draw: function()
        {
            this.renderer.clear();
    
            for( var viewIt in this.views )
            {
                viewIt.render( this.renderer )
            }
        },
    
        resize: function( width, height, devicePixelRatio )
        {
            this.width = width;
            this.height = height;
            this.aspectRatio = width / height;
            this.devicePixelRatio = devicePixelRatio;

            this.renderer.setPixelRatio( devicePixelRatio );
            this.renderer.setSize( width, height );
        },
    
        addObject: function( object )
        {
            this.scene.add( object );
        },

        handleMouseDown: function( event ) {},
        handleMouseUp: function( event ) {},
        handleMouseMove: function( event ) {}
    } );

    var wizz = new WIZZ();
    
    wizz.createView( undefined, undefined, "VIEW-1" );
    
    ///////////////////////////////////////////////////////////////////////////////////
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
    
    wizz.addObject( spotLight );
    
    var spotLightHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    wizz.addObject( spotLightHelper );
    
    ///////////////////////////////////////////////////////////////////////////////////
    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: wizz.defaultTexture } );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    
    wizz.addObject( cube );
    
    ///////////////////////////////////////////////////////////////////////////////////
    var sphereGeometry = new THREE.SphereGeometry( 4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: wizz.defaultTexture } );
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    
    wizz.addObject( sphere );
    
    ///////////////////////////////////////////////////////////////////////////////////
    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff } );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    
    wizz.addObject( plane );
    
///////////////////////////////////////////////////////////////////////////////////
function wizzInitialize() {  wizz.initialize(); }
function wizzResize() { wizz.resize( window.width, window.height, window.devicePixelRatio ); }
function wizzRender() { wizz.renderer(); }
function wizzHandleMouseDown( event ) { wizz.handleMouseDown( event ); }
function wizzHandleMouseUp( event ) { wizz.handleMouseUp( event ); }
function wizzHandleMouseMove( event ) { wizz.handleMouseMove( event ); }

///////////////////////////////////////////////////////////////////////////////////
window.onload       = wizzInitialize;
window.onresize     = wizzResize;
window.onmousemove  = wizzHandleMouseMove;
window.onmousedown  = wizzHandleMouseDown;
window.onmouseup    = wizzHandleMouseUp;
