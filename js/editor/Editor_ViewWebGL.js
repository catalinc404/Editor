////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EControlMode = { NONE : 0, ORBIT: 1, TRACKBALL :  2, PAN : 3, ZOOM : 4, SELECT : 5 };
var Control_ORBIT_pixel2world_ratio = 0.005;
var Control_PAN_pixel2world_ratio = 0.05;
var Control_ZOOM_pixel2world_ratio= 0.05;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ERenderMode = { COLOR : 0, DEPTH: 1, PICKING : 2 };
var ERenderHelpersMode = { HELPERS: 1, GIZMOS : 2 };

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

    this.renderMode = ERenderMode.COLOR;
    this.renderHelpersMode = ERenderHelpersMode.HELPERS | ERenderHelpersMode.GIZMOS;
    this.clearColor = 0xaaaaaa;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneGizmos = new THREE.Scene();    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.fnRender = this.render.bind( this );
    this.fnRequestRender = this.requestRender.bind( this );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",        this.handleSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected",      this.handleSceneObjectsDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onObjectTransformModeChanged",  this.handleObjectTransformModeChanged.bind( this ) );
    this.eventDispatcher.addEventListener( "themeChanged",                  this.handleThemeChanged.bind( this ) );

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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.setDimensions( parseInt( this.canvas.style.width,  10 ), parseInt( this.canvas.style.height, 10 ) );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 1000 );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    this.transformCameraData = { position : new THREE.Vector3(), quaternion : new THREE.Quaternion() };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true, devicePixelRatio: window.devicePixelRatio } );
    this.renderer.setSize( this.width, this.height, false );

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.autoClear = false;
    this.renderer.setClearColor( this.clearColor );

    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.pickingRenderTarget = new THREE.WebGLRenderTarget( this.width, this.height );
    this.pickingRenderTarget.texture.minFilter = THREE.LinearFilter;
    this.pickingRenderTarget.texture.maxFilter = THREE.NearestFilter;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.transformControls = new THREE.TransformControls( this.camera, this.canvas );
    this.transformControls.addEventListener( "change",      this.handleObjectTransformChange.bind( this )    );
    this.transformControls.addEventListener( "mouseDown",   this.handleObjectTransformMouseDown.bind( this ) );
    this.transformControls.addEventListener( "mouseUp",     this.handleObjectTransformMouseUp.bind( this )   );
    this.sceneGizmos.add( this.transformControls );

    this.transformControlsData = { position : new THREE.Vector3(), scale : new THREE.Vector3(), quaternion : new THREE.Quaternion() };

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

    this.renderer.setClearColor( this.clearColor );
    this.renderer.clear( true, true, true );

    //Debug
    var position = this.camera.position;
    var lookAt = new THREE.Vector3;
    lookAt = this.camera.getWorldDirection( lookAt );
    lookAt.add( position );
   
    this.renderer.render( this.editor.scene, this.camera );

    if( this.renderHelpersMode & ERenderHelpersMode.HELPERS )
    {
        this.renderer.render( this.editor.sceneHelpers, this.camera );
    }
    if( this.renderHelpersMode & ERenderHelpersMode.GIZMOS )
    {
        this.renderer.render( editor.sceneGizmos, this.camera );
        this.renderer.render( this.sceneGizmos, this.camera );
    }
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

    this.setDimensions( width, height );
    this.renderer.setSize( this.width, this.height, false );
    
    if( this.camera.isPerspectiveCamera )
    {
        this.camera.aspect = this.width / this.height;
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

    this.pickingRenderTarget.setSize( this.width, this.height );
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
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.updateView = function()
{
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

                    var invDevicePixelRatio = 1.0 / ( window.devicePixelRatio || 1 );
                    var position = 
                    { 
                        x: this.selectionRectangle.left * invDevicePixelRatio, 
                        y: this.selectionRectangle.top  * invDevicePixelRatio
                    };
                    position = getRelativePositionForElement( document.getElementById( "editor" ), this.canvas, position )

                    this.selectionRectangleElement.style.left   = position.x + 'px';
                    this.selectionRectangleElement.style.top    = position.y + 'px';
                    this.selectionRectangleElement.style.width  = this.selectionRectangle.width  * invDevicePixelRatio + 'px';
                    this.selectionRectangleElement.style.height = this.selectionRectangle.height * invDevicePixelRatio + 'px';
                }
                break;                    
        
                default:
                {}
                break;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.setDimensions = function( width, height )
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.width  = ( width  || 1 ) * ( window.devicePixelRatio || 1 );
    this.height = ( height || 1 ) * ( window.devicePixelRatio || 1 );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.getRenderHelpersMode = function()
{
    return this.renderHelpersMode;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.setRenderHelpersMode = function( renderHelpersMode )
{
    return this.renderHelpersMode = renderHelpersMode;
}

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
        var devicePixelRatio = window.devicePixelRatio || 1;
        this.mouseX = position.x * devicePixelRatio;
        this.mouseY = position.y * devicePixelRatio;

        this.mousePrevX = this.mouseX;
        this.mousePrevY = this.mouseY;

        if( this.currentControlMode == EControlMode.SELECT )
        {
            this.selectionRectangle.left = this.mouseX;
            this.selectionRectangle.top  = this.mouseY;
            this.selectionRectangle.width  = 0; 
            this.selectionRectangle.height = 0; 
        }
        else
        {
            this.beginCameraTransform();
        }

        this.updateView();
        this.requestRender();
    }
}

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

        this.updateView();
        this.requestRender();        
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleMouseUp = function( event ) 
{
    View.prototype.handleMouseUp.call( this, event );

    //console.log( "ViewWebGL2.prototype.handleMouseUp, viewId = " + this.viewId );

    if( this.currentControlMode != EControlMode.NONE )
    {
        if( this.currentControlMode == EControlMode.SELECT )
        {
            this.selectObjects();
        }
        else
        {
            this.endCameraTransform();
        }
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
    
    this.updateView();            
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
        this.setObjectTransformMode( this.editor.objectTransformMode );

        this.transformControlsData.object = object;
    }

    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleSceneObjectsDeselected = function( objects )
{
    this.transformControls.detach();
    this.transformControlsData.object = undefined;

    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleObjectTransformChange = function(  )
{
    this.eventDispatcher.dispatchEvent( "render" );
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleObjectTransformMouseDown = function( event )
{
    this.transformControlsData.position.x = this.transformControls.object.position.x;
    this.transformControlsData.position.y = this.transformControls.object.position.y;
    this.transformControlsData.position.z = this.transformControls.object.position.z;

    this.transformControlsData.scale.x = this.transformControls.object.scale.x;
    this.transformControlsData.scale.y = this.transformControls.object.scale.y;
    this.transformControlsData.scale.z = this.transformControls.object.scale.z;
        
    this.transformControlsData.quaternion.x = this.transformControls.object.quaternion.x;
    this.transformControlsData.quaternion.y = this.transformControls.object.quaternion.y;
    this.transformControlsData.quaternion.z = this.transformControls.object.quaternion.z;
    this.transformControlsData.quaternion.w = this.transformControls.object.quaternion.w;
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleObjectTransformMouseUp = function( event )
{
    if( event.mode == "translate" )
    {
        editor.sceneObjectTranslated( this.transformControlsData.object, this.transformControlsData.position, this.transformControls.object.position );
    }
    else
    if( event.mode == "rotate" )    
    {
        editor.sceneObjectRotated( this.transformControlsData.object, this.transformControlsData.quaternion, this.transformControls.object.quaternion );
    }
    else
    if( event.mode == "scale" )    
    {
        editor.sceneObjectScaled( this.transformControlsData.object, this.transformControlsData.scale, this.transformControls.object );
    }
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleThemeChanged = function( colors )
{
    this.clearColor = colors.editor_view_background;
    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.handleObjectTransformModeChanged = function( mode )
{
    this.setObjectTransformMode( mode );
    this.requestRender();
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.selectObjects = function()
{
    if( this.selectionRectangle.width >= 0 && this.selectionRectangle.height >= 0 )
    {
        this.renderer.physicallyCorrectLights = false;
        this.renderer.gammaInput = false;
        this.renderer.gammaOutput = false;

        this.renderer.setClearColor( 0x000000, 0 );
        this.renderer.render( this.editor.scenePicking, this.camera, this.pickingRenderTarget, true );
        
        var x = this.selectionRectangle.left;
        var y = this.selectionRectangle.top;
        var w = this.selectionRectangle.width || 1;
        var h = this.selectionRectangle.height || 1;

        //create buffer for reading pixels
        var pixelBuffer = new Uint8Array( w * h * 4 );
        this.renderer.readRenderTargetPixels(   this.pickingRenderTarget, 
                                                x,
                                                this.pickingRenderTarget.height - y - h, 
                                                w,
                                                h,
                                                pixelBuffer );
    
        var ids = {};
        var count = w * h * 4;
        for( var i = 0; i < count; i += 4 )
        {
            var id = ( pixelBuffer[i + 0] << 16 ) | ( pixelBuffer[i + 1] << 8 ) | ( pixelBuffer[i + 2 ]  << 0 );
            ids[id] = id;
        }

        var editorObjectsIds = [];
        for( var idText in ids ) 
        { 
            var id = ids[idText];
            editorObjectsIds.push( id );
        }

        this.editor.selectObjectsFromEditorIds( editorObjectsIds );

        this.renderer.physicallyCorrectLights = true;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.requestRender();
    }
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.setObjectTransformMode = function()
{
    var mode = "translate";
    
    switch( this.editor.objectTransformMode )
    {
        case ETransformMode.TRANSLATE:  mode = "translate"; break;
        case ETransformMode.ROTATE:     mode = "rotate"; break;
        case ETransformMode.SCALE:      mode = "scale"; break;
    }

    this.transformControls.setMode( mode );
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.beginCameraTransform = function()
{
    this.transformCameraData.position.x = this.camera.position.x;
    this.transformCameraData.position.y = this.camera.position.y;
    this.transformCameraData.position.z = this.camera.position.z;

    this.transformCameraData.quaternion.x = this.camera.quaternion.x;
    this.transformCameraData.quaternion.y = this.camera.quaternion.y;
    this.transformCameraData.quaternion.z = this.camera.quaternion.z;
    this.transformCameraData.quaternion.w = this.camera.quaternion.w;
}

//////////////////////////////////////////////////////////////////////////////
ViewWebGL.prototype.endCameraTransform = function()
{
    editor.viewCameraTransformed( this.viewId, 
                                  this.transformCameraData.position, 
                                  this.transformCameraData.quaternion,
                                  this.camera.position, 
                                  this.camera.quaternion );

}

