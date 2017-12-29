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
    
            requestAnimationFrame( this.render.bind( this ) );
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
    
            requestAnimationFrame( this.render.bind( this ) );
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
       
        requestAnimationFrame( this.render.bind( this ) );
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.editor_view_object = this;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.addEventListener( 'mousedown',  this.handleMouseDown.bind( this ), false );
    canvas.addEventListener( 'mousemove',  this.handleMouseMove.bind( this ), false );    
    canvas.addEventListener( 'mouseup',    this.handleMouseUp.bind( this ),   false );
    canvas.addEventListener( 'mouseleave', this.handleMouseUp.bind( this ),   false );    

}
