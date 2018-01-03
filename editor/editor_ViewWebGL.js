/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Epsilon = 0.001;

var AxisX = new THREE.Vector3( 1, 0, 0 );
var AxisY = new THREE.Vector3( 0, 1, 0 );
var AxisZ = new THREE.Vector3( 0, 0, 1 );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewWebGL( canvas, width, height, viewId ) 
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

    var viewId = viewId;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    var currentControlMode = EControlMode.NONE;    

    var mousePrevX = null;
    var mousePrevY = null;
    var mouseX = null;
    var mouseY = null;

    var selectionRectangle = { left: 0, top: 0, width: 0, height: 0 };
    var selectionRectangleElement = document.getElementById( "viewSelect" );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    var fnRender = this.render.bind( this );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.resize = function( width, height )
    {
        renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );

        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.handleMouseMove = function( event ) 
    {
        if( currentControlMode != EControlMode.NONE )
        {
            mouseX = event.pageX;
            mouseY = event.pageY;
    
            requestAnimationFrame( fnRender );
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
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
    
            requestAnimationFrame( fnRender );
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
       
        requestAnimationFrame( fnRender );
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.editor_view_object = this;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.addEventListener( 'mousedown',  this.handleMouseDown.bind( this ), false );
    canvas.addEventListener( 'mousemove',  this.handleMouseMove.bind( this ), false );    
    canvas.addEventListener( 'mouseup',    this.handleMouseUp.bind( this ),   false );
    canvas.addEventListener( 'mouseleave', this.handleMouseUp.bind( this ),   false );    

}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Epsilon = 0.001;

var AxisX = new THREE.Vector3( 1, 0, 0 );
var AxisY = new THREE.Vector3( 0, 1, 0 );
var AxisZ = new THREE.Vector3( 0, 0, 1 );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewWebGL( canvas, width, height, viewId ) 
{
    View.call( this, canvas, width, height, viewId );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.context = canvas.getContext( '2d' );

    this.camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
    this.camera.position.x = -28.23;
    this.camera.position.y =  14.34; 
    this.camera.position.z =  31.06;
    this.camera.lookAt( new THREE.Vector3( 0.0, 0.0, 0.0 ) );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.autoClear = false;
    this.renderer.setClearColor( 0xaaaaaa );

    this.fnRender = this.render.bind( this );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.currentControlMode = EControlMode.NONE;    

    this.mousePrevX = null;
    this.mousePrevY = null;
    this.mouseX = null;
    this.mouseY = null;

    this.selectionRectangle = { left: 0, top: 0, width: 0, height: 0 };
    this.selectionRectangleElement = document.getElementById( "viewSelect" );
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype = Object.assign( Object.create( View.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: ViewWebGL,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render : function()
    {
        View.prototype.render.call( this );

        //console.log( "ViewWebGL2.prototype.render, viewId = " + this.viewId );

        if( this.currentControlMode != EControlMode.NONE )
        {
            var deltaMouseX = this.mouseX - this.mousePrevX;
            var deltaMouseY = this.mouseY - this.mousePrevY;
    
            if( deltaMouseX != 0 || deltaMouseY != 0 )
            {
                switch( this.currentControlMode )
                {
                    case EControlMode.ORBIT:
                    {
                        //TODO:
                    }
                    break;
    
                    case EControlMode.TRACKBALL:
                    {
                        this.camera.rotateOnWorldAxis( AxisY,  deltaMouseX * Control_ORBIT_pixel2world_ratio );
                        this.camera.rotateOnAxis( AxisX,  deltaMouseY * Control_ORBIT_pixel2world_ratio );
    
                        this.mousePrevX = this.mouseX;
                        this.mousePrevY = this.mouseY;
                    }
                    break;
                    
                    case EControlMode.PAN:
                    {
                        var translation = new THREE.Vector3();
                        translation.copy( AxisY );
                        translation.multiplyScalar( deltaMouseY * Control_PAN_pixel2world_ratio );
                        translation.add( this.camera.position );
    
                        var translationLocal = this.camera.worldToLocal( translation );
                        translationLocal.addScaledVector( AxisX, deltaMouseX * -Control_PAN_pixel2world_ratio );
    
                        var distance = translationLocal.length();
                        if( distance >= Epsilon )
                        {
                            translationLocal.multiplyScalar( 1.0 / distance );
    
                            this.camera.translateOnAxis( translationLocal, distance );
                        }
    
                        this.mousePrevX = this.mouseX;
                        this.mousePrevY = this.mouseY;
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
    
                            this.camera.translateOnAxis( translationLocal, distance );
                        }
    
                        this.mousePrevX = this.mouseX;
                        this.mousePrevY = this.mouseY;
                    }
                    break;
    
                    case EControlMode.SELECT:
                    {
                        this.selectionRectangle.left    = Math.min( this.mouseX, this.mousePrevX );
                        this.selectionRectangle.left    = Math.max( this.selectionRectangle.left, 0 );
                        this.selectionRectangle.top     = Math.min( this.mouseY, this.mousePrevY );
                        this.selectionRectangle.top     = Math.max( this.selectionRectangle.top, 0 );
    
                        var right   = Math.max( this.mouseX, this.mousePrevX );
                        //right       = Math.min( right, screen_width );
                        var bottom  = Math.max( this.mouseY, this.mousePrevY );
                        //bottom      = Math.min( bottom, screen_height );
    
                        this.selectionRectangle.width  = right  - this.selectionRectangle.left;
                        this.selectionRectangle.height = bottom - this.selectionRectangle.top; 
    
                        this.selectionRectangleElement.style.left   = this.selectionRectangle.left   + 'px';
                        this.selectionRectangleElement.style.top    = this.selectionRectangle.top    + 'px';
                        this.selectionRectangleElement.style.width  = this.selectionRectangle.width  + 'px';
                        this.selectionRectangleElement.style.height = this.selectionRectangle.height + 'px';
                    }
                    break;                    
            
                    default:
                    {}
                    break;
                }
            }
        }
    
        this.renderer.setClearColor( 0xaaaaaa );
        this.renderer.clear();
        this.renderer.render( scene, this.camera );
        
        this.context.drawImage( this.renderer.domElement, 0, 0 );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseDown : function( event ) 
    {
        View.prototype.handleMouseDown.call( this, event );

        //console.log( "ViewWebGL2.handleMouseDown, viewId = " + this.viewId );

        switch( event.button )
        {
            case 0:  
            { 
                if( event.shiftKey == true )
                {
                    this.currentControlMode = EControlMode.TRACKBALL;
                }
                else
                if( event.altKey == true )
                {
                    this.currentControlMode = EControlMode.PAN;
                }
                else
                {
                    this.currentControlMode = EControlMode.SELECT;
                }
            }
            break;
    
            case 1:  
            { 
                this.currentControlMode = EControlMode.ZOOM;
            }
            break;
    
            case 2:
            default: {} break;
        }
    
        if( this.currentControlMode != EControlMode.NONE )
        {
            var rect = this.renderer.domElement.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
    
            this.mousePrevX = this.mouseX;
            this.mousePrevY = this.mouseY;
    
            requestAnimationFrame( this.fnRender );
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseMove : function( event ) 
    {
        View.prototype.handleMouseMove.call( this, event );

        //console.log( "ViewWebGL2.handleMouseMove, viewId = " + this.viewId );

        if( this.currentControlMode != EControlMode.NONE )
        {
            this.mouseX = event.pageX;
            this.mouseY = event.pageY;
    
            requestAnimationFrame( this.fnRender );
        }        
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseUp : function( event ) 
    {
        View.prototype.handleMouseUp.call( this, event );

        //console.log( "ViewWebGL2.handleMouseUp, viewId = " + this.viewId );

        this.currentControlMode = EControlMode.NONE;

        this.selectionRectangleElement.style.left   = '0px';
        this.selectionRectangleElement.style.top    = '0px';
        this.selectionRectangleElement.style.width  = '0px';
        this.selectionRectangleElement.style.height = '0px';
    
        this.mousePrevX = null;
        this.mousePrevY = null;
        
        this.mouseX = null;
        this.mouseY = null;
       
        requestAnimationFrame( this.fnRender );        
    },

} )



