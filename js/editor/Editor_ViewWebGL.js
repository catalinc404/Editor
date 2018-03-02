////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ViewWebGL( eventDispatcher, element, configuration ) 
{
    View.call( this, eventDispatcher, element, configuration );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.camera = undefined;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.mousePrevX = null;
    this.mousePrevY = null;
    this.mouseX = null;
    this.mouseY = null;

    this.selectionRectangle = { left: 0, top: 0, width: 0, height: 0 };
    this.selectionRectangleElement = document.getElementById( "viewSelect" );

    this.currentControlMode = EControlMode.NONE;    

    this.clearColor = 0xaaaaaa;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneGizmos = new THREE.Scene();    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.fnRender = this.render.bind( this );
    this.fnRequestRender = this.requestRender.bind( this );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",   this.handleSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected", this.handleSceneObjectsDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "themeChanged",             this.handleThemeChanged.bind( this ) );

    this.eventDispatcher.dispatchEvent( "onViewCreated", this );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype = Object.assign( Object.create( View.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: ViewWebGL,
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.init = function( editor )
{
    View.prototype.init.call( this, editor );

    //console.log( "ViewWebGL.prototype.init, viewId = " + this.viewId );

    var width  = parseInt( this.canvas.style.width,  10 ) || 0;
    var height = parseInt( this.canvas.style.height, 10 ) || 0;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas.width  = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );

    if( this.configuration !== undefined )
    {
        if( this.configuration.cameraPosition !== undefined )
        {
            this.camera.position.x = this.configuration.cameraPosition.x;
            this.camera.position.y = this.configuration.cameraPosition.y;
            this.camera.position.z = this.configuration.cameraPosition.z;
        }
        if( this.configuration.cameraLookat !== undefined )
        {
            var lookAt = new THREE.Vector3( this.configuration.cameraLookat.x, this.configuration.cameraLookat.y, this.configuration.cameraLookat.z );
            this.camera.lookAt( lookAt );        
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.autoClear = false;
    this.renderer.setClearColor( 0xaaaaaa );
    this.canvas.appendChild( this.renderer.domElement );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.pickingRenderTarget = new THREE.WebGLRenderTarget( width, height );
    this.pickingRenderTarget.texture.minFilter = THREE.LinearFilter;
    this.pickingRenderTarget.texture.maxFilter = THREE.NearestFilter;

    this.pickingTextureSelection = new THREE.DataTexture( this.pickingTextureSelectionData, width, height, THREE.RGBAFormat );
    this.pickingTextureSelection.needsUpdate = true;

    this.transformControls = new THREE.TransformControls( this.camera, this.canvas );
    this.transformControls.addEventListener( "change", this.handleObjectTransformChange.bind( this ) );
    this.sceneGizmos.add( this.transformControls );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas.addEventListener( "mousedown",  this.handleMouseDown.bind( this ),  false );
    this.canvas.addEventListener( "mousemove",  this.handleMouseMove.bind( this ),  false );    
    this.canvas.addEventListener( "mouseup",    this.handleMouseUp.bind( this ),    false );
    this.canvas.addEventListener( "mouseleave", this.handleMouseLeave.bind( this ), false );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.render = function()
{
    View.prototype.render.call( this );

    //console.log( "ViewWebGL2.prototype.render, viewId = " + this.viewId );         

    this.transformControls.update();

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
                    this.selectionRectangle.left = Math.min( this.mouseX, this.mousePrevX );
                    this.selectionRectangle.left = Math.max( this.selectionRectangle.left, 0 );
                    this.selectionRectangle.top  = Math.min( this.mouseY, this.mousePrevY );
                    this.selectionRectangle.top  = Math.max( this.selectionRectangle.top, 0 );

                    var right   = Math.max( this.mouseX, this.mousePrevX );
                    right       = Math.min( right, this.width );
                    var bottom  = Math.max( this.mouseY, this.mousePrevY );
                    bottom      = Math.min( bottom, this.height );

                    this.selectionRectangle.width  = right  - this.selectionRectangle.left;
                    this.selectionRectangle.height = bottom - this.selectionRectangle.top; 
                    
                    var position = { x: this.selectionRectangle.left, y: this.selectionRectangle.top };
                    position = getRelativePositionForElement( document.getElementById( "editor" ), this.canvas, position )

                    this.selectionRectangleElement.style.left   = position.x + 'px';
                    this.selectionRectangleElement.style.top    = position.y + 'px';
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

    this.renderer.setClearColor( this.clearColor );
    this.renderer.clear();

    this.renderer.render( this.editor.scene, this.camera );
    this.renderer.render( this.editor.sceneHelpers, this.camera );
    this.renderer.render( this.sceneGizmos, this.camera );
    
    this.context.drawImage( this.renderer.domElement, 0, 0 );
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.requestRender = function()
{
    View.prototype.requestRender.call( this );

    //console.log( "ViewWebGL2.prototype.requestRender, viewId = " + this.viewId );

    requestAnimationFrame( this.fnRender );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.resize = function( width, height )
{
    View.prototype.resize.call( this, width, height );

    //console.log( "ViewWebGL2.prototype.resize, viewId = " + this.viewId );

    this.width  = width;
    this.height = height;

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

    this.pickingRenderTarget.setSize( width, height );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.setView = function( position, lookAt )
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
ViewWebGL.prototype.handleMouseDown = function( event ) 
{
    View.prototype.handleMouseDown.call( this, event );

    //console.log( "ViewWebGL2.prototype.handleMouseDown, viewId = " + this.viewId );

    if( event.cancelBubble )
    {
        return;
    }

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
        var position = getRelativePosition( event );
        this.mouseX = position.x;
        this.mouseY = position.y;

        this.mousePrevX = this.mouseX;
        this.mousePrevY = this.mouseY;

        if( this.currentControlMode == EControlMode.SELECT )
        {
            this.selectionRectangle.left = this.mouseX;
            this.selectionRectangle.top  = this.mouseY;
            this.selectionRectangle.width  = 0; 
            this.selectionRectangle.height = 0; 
        }

        this.requestRender();
    }
        
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleMouseMove = function( event ) 
{
    View.prototype.handleMouseMove.call( this, event );

    //console.log( "ViewWebGL2.prototype.handleMouseMove, viewId = " + this.viewId );

    if( this.currentControlMode != EControlMode.NONE )
    {
        var position = getRelativePosition( event );
        this.mouseX = position.x;
        this.mouseY = position.y;
    }

    this.requestRender();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleMouseUp = function( event ) 
{
    View.prototype.handleMouseUp.call( this, event );

    //console.log( "ViewWebGL2.prototype.handleMouseUp, viewId = " + this.viewId );

    if( this.currentControlMode == EControlMode.SELECT )
    {
        this.selectObjects();
    }

    this.currentControlMode = EControlMode.NONE;

    this.selectionRectangleElement.style.left   = '0px';
    this.selectionRectangleElement.style.top    = '0px';
    this.selectionRectangleElement.style.width  = '0px';
    this.selectionRectangleElement.style.height = '0px';

    this.mousePrevX = null;
    this.mousePrevY = null;
    
    this.mouseX = null;
    this.mouseY = null;
    
    this.requestRender();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleMouseLeave = function( event ) 
{
    View.prototype.handleMouseLeave.call( this, event );

    //console.log( "ViewWebGL2.prototype.handleMouseLeave, viewId = " + this.viewId );

    ViewWebGL.prototype.handleMouseUp.call( this, event );
},

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleSceneObjectsSelected = function( objects )
{
    if( objects.length == 1 )
    {
        var object = objects[0];
        this.transformControls.attach( object );
    }

    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleSceneObjectsDeselected = function( objects )
{
    this.transformControls.detach();

    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleObjectTransformChange = function(  )
{
    this.eventDispatcher.dispatchEvent( "render" );
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleThemeChanged = function( colors )
{
    this.clearColor = colors.editor_view_background;
    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.selectObjects = function()
{
    if( this.selectionRectangle.width >= 0 && this.selectionRectangle.height >= 0 )
    {
        this.renderer.setClearColor( 0x000000 );
        this.renderer.render( this.editor.scenePicking, this.camera, this.pickingRenderTarget, true );
        
        var x = this.selectionRectangle.left;
        var y = this.selectionRectangle.top;
        var w = this.selectionRectangle.width || 1;
        var h = this.selectionRectangle.height || 1;

        //create buffer for reading pixels
        var pixelBuffer = new Uint8Array( w * h * 4 );
        this.renderer.readRenderTargetPixels( this.pickingRenderTarget, 
                                        x,
                                        this.pickingRenderTarget.height - y - h, 
                                        w,
                                        h,
                                        pixelBuffer );
    
        this.pickingTextureSelection.image.data = pixelBuffer;
        this.pickingTextureSelection.image.width = w;
        this.pickingTextureSelection.image.height = h;
        this.pickingTextureSelection.needsUpdate = true;

    
        var ids = {};
        var count = w * h * 4;
        for( var i = 0; i < count; i += 4 )
        {
            var id = ( pixelBuffer[i + 0] << 16 ) | ( pixelBuffer[i + 1] << 8 ) | ( pixelBuffer[i + 2 ] );
            ids[id] = id;
        }

        var editorObjectsIds = [];
        for( var idText in ids ) 
        { 
            var id = ids[idText];
            editorObjectsIds.push( id );
        }

        this.editor.selectObjectsFromEditorIds( editorObjectsIds );
    }
}



