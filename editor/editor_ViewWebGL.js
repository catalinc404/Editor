////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewWebGL( canvas, width, height, viewId, scene, camera ) 
{
    View.call( this, canvas, width, height, viewId );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.context = canvas.getContext( '2d' );
    this.scene = scene;

    if( camera === undefined )
    {
        this.camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
        this.camera.position.x = -30;
        this.camera.position.y =   0 
        this.camera.position.z =   0;
        this.camera.lookAt( Zero );
    }
    else
    {
        this.camera = camera;
    }

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
        this.renderer.render( this.scene, this.camera );
        
        this.context.drawImage( this.renderer.domElement, 0, 0 );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    resize : function( width, height )
    {
        View.prototype.resize.call( this, width, height );

        //console.log( "ViewWebGL2.prototype.resize, viewId = " + this.viewId );

        this.renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );

        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;

        if( this.camera.isPerspectiveCamera )
        {
            this.camera.aspect = width / height;
        }
        else
        if( this.camera.isOrthographicCamera )
        {
            //TODO
        }
        else
        {
            console.log( "ViewWebGL.prototype.resize: invalid camera type!" );
        }

        this.camera.updateProjectionMatrix();
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setView : function( position, lookAt )
    {
        View.prototype.setView.call( this, position, lookAt );

        //console.log( "View.prototype.setView, viewId = " + this.viewId );

        this.camera.position.x = position.x;
        this.camera.position.y = position.y;
        this.camera.position.z = position.z;
        this.camera.lookAt( lookAt );

        this.camera.updateProjectionMatrix();
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseDown : function( event ) 
    {
        View.prototype.handleMouseDown.call( this, event );

        //console.log( "ViewWebGL2.prototype.handleMouseDown, viewId = " + this.viewId );

        switch( event.button )
        {
            case 0:  
            { 
                this.currentControlMode = EControlMode.SELECT;
            }
            break;
    
            case 1:  
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
                    this.currentControlMode = EControlMode.ZOOM;
                }
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

        //console.log( "ViewWebGL2.prototype.handleMouseMove, viewId = " + this.viewId );

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

        //console.log( "ViewWebGL2.prototype.handleMouseUp, viewId = " + this.viewId );

        if( this.currentControlMode != EControlMode.NONE )
        {
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
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseLeave : function( event ) 
    {
        View.prototype.handleMouseLeave.call( this, event );

        //console.log( "ViewWebGL2.prototype.handleMouseLeave, viewId = " + this.viewId );

        ViewWebGL.prototype.handleMouseUp.call( this, event );
    },
    

} )



