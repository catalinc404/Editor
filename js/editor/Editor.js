var editor = undefined;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Editor( eventDispatcher, UIData )
{
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.eventDispatcher = eventDispatcher;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    UI.call( this, UIData );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scene = null;
    this.textureLoader = new THREE.TextureLoader();
    this.defaultTexture = null;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneHelpers = null;
    this.sceneGizmos  = null;
    this.scenePicking = null;
    this.sceneHUD     = null;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.views = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneObjectsId = 0;
    this.sceneObjectCreationId = 0;
    this.sceneObjects = [];
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.selection = [];
    this.objectTransformMode  = ETransformMode.TRANSLATE;
    this.objectTransformSpace = ETransformSpace.GLOBAL;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.doUndoManager = new DoUndoManager( eventDispatcher );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "render",                        this.render.bind( this ) );
    this.eventDispatcher.addEventListener( "sceneCreateObject",             this.sceneCreateObject.bind( this ) );
    this.eventDispatcher.addEventListener( "sceneDeleteObject",             this.sceneDeleteObject.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onViewCreated",                 this.onViewCreated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",        this.onSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected",      this.onSceneObjectsDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectTranslated",       this.onSceneObjectsTranslated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectScaled",           this.onSceneObjectsScaled.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectRotated",          this.onSceneObjectsRotated.bind( this ) );
    this.eventDispatcher.addEventListener( "onViewCameraTransformed",       this.onViewCameraTransformed.bind( this ) );
    this.eventDispatcher.addEventListener( "onToolbarButtonActivated",      this.onToolbarButtonActivated.bind( this ) );
    this.eventDispatcher.addEventListener( "onToolbarButtonDeactivated",    this.onToolbarButtonDeactivated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneCreateObject",           this.onSceneCreateObject.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneDeleteObject",           this.onSceneDeleteObject.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addRequestListener( "getObjectFromEditorId",       this.getObjectFromEditorId.bind( this ) );
    this.eventDispatcher.addRequestListener( "getEditorIdFromObjectId",     this.getEditorIdFromObjectId.bind( this ) );
    
    editor = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype = Object.assign( Object.create( UI.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: Editor
} );


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.init = function() 
{
    this.eventDispatcher.dispatchEvent( "onEditorCreated", this );

    this.defaultTexture = this.loadTexture( "textures/UV_Grid_Sm.jpg" );

    this.sceneHelpers = new THREE.Scene();
    this.sceneGizmos  = new THREE.Scene();
    this.sceneGizmos.autoUpdate = false;
    this.scenePicking = new THREE.Scene();
    this.scenePicking.autoUpdate = false;
    this.sceneHUD     = new THREE.Scene();

    this.scene = new THREE.Scene();
    this.scene.name = "Scene";
    this.eventDispatcher.dispatchEvent( "onSceneCreated", this.scene );
    this.addSceneObject( this.scene, { dontAddToScene: true } );

    this.initDefaultScene();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.initDefaultScene = function()
{
    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.sceneHelpers.add( helper );

    var ambientLight = new THREE.AmbientLight( 0x222222 );
    ambientLight.name = "ambientLight";
    this.addSceneObject( ambientLight );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getView = function( viewId )
{
    for( var i = 0; i < this.views.length; ++i )
    {
        if( this.views[i].getId() == viewId )
        {
            return this.views[i];
        }
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.render = function()
{
    for( var i = 0; i < this.selection.length; ++i )
    {
        for( var j = 0; j < this.selection[i].helpers.length; ++j )
        {
            var helper = this.selection[i].helpers[j];
            if( helper instanceof THREE.BoxHelper )
            {
                helper.update();
            }
        }
    }

    this.scene.updateMatrixWorld();
    this.sceneHelpers.updateMatrixWorld();

    var view;
    for( var i = 0; i < this.views.length; ++i )
    {
        var view = this.views[i];
        if( view != null )
        {
            view.requestRender();
        }        
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.addSceneObject = function( object, parameters  )
{
    var editorObject = {}
    parameters = parameters || {};

    editorObject.id = ( parameters.objectId !== undefined ) ?  parameters.objectId : ++this.sceneObjectsId;

    if( parameters.dontAddToScene !== true )
    {
        if( parameters.parentId !== undefined )
        {
            var parent = this.getObjectFromEditorId( parameters.parentId )
            parent.add( object );
        }
        else
        {
            this.scene.add( object );
        }
    }

    object.updateMatrixWorld();

    editorObject.object = object;
    editorObject.helpers = [];
    editorObject.gizmos  = [];

    var position = new THREE.Vector3();
    position.copy( object.position );
    object.position.set( 0, 0, 0 );
    object.updateMatrixWorld();

    if( object instanceof THREE.Scene )
    {
    }
    else
    if( object instanceof THREE.Mesh )
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }
    else
    if( object instanceof THREE.Camera )
    {
        editorObject.helpers.push( new THREE.CameraHelper( object ) );
    }
    else
    if( object instanceof THREE.AmbientLight )
    {
    }
    else
    if( object instanceof THREE.PointLight )
    {
        editorObject.helpers.push( new THREE.PointLightHelper( object ) );
    }
    else
    if( object instanceof THREE.DirectionalLight )
    {
        editorObject.helpers.push( new THREE.DirectionalLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SpotLight )
    {
        var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        var objectPicking = new THREE.Mesh( new THREE.TetrahedronGeometry( 0.6, 0 ), objectPickingMaterial );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        var selectionHelper = new THREE.BoxHelper( objectPicking );
        selectionHelper.visible = false;
        editorObject.gizmos.push( selectionHelper );

        var spotLightHelper1 = new THREE.Mesh(  new THREE.TetrahedronGeometry( 0.6, 0 ), new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
        spotLightHelper1.matrixWorld = object.matrixWorld;
        spotLightHelper1.matrixAutoUpdate = false;
        editorObject.helpers.push( spotLightHelper1 );

        var spotLightHelper2 = new THREE.SpotLightHelper( object );
        editorObject.helpers.push( spotLightHelper2 );
     }
    else
    if( object instanceof THREE.HemisphereLight )
    {
        editorObject.helpers.push( new THREE.HemisphereLightHelper( object ) );
    }
    else
    if( object instanceof THREE.RectAreaLight )
    {
        editorObject.helpers.push( new THREE.RectAreaLightHelper( object ) );
    }    
    else
    if( object instanceof THREE.SkinnedMesh )
    {
        editorObject.helpers.push( new THREE.SkeletonHelper( object ) );
    }
    else
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }

    object.position.set( position.x, position.y, position.z );
    object.updateMatrixWorld();

    if( editorObject.helpers.length > 0 )
    {
        for( var i = 0; i < editorObject.helpers.length; ++i )
        {
            this.sceneHelpers.add( editorObject.helpers[i] );
        }
    }

    for( var i = 0; i < editorObject.gizmos.length; ++i )
    {
        this.sceneGizmos.add( editorObject.gizmos[i] );
    }
     
    this.sceneObjects.push( editorObject );

    var parentId = ( object.parent !== undefined ) ? this.getEditorIdFromObject( object.parent ) : undefined;
    this.eventDispatcher.dispatchEvent( "onSceneObjectAdded", { objectId: editorObject.id, parentId: parentId, name: editorObject.object.name } );
  
    for( var i = 0; i < object.children.length; ++i )
    {
        this.addSceneObject( object.children[i], { dontAddToScene : true } );
    }

    return editorObject.id;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.removeSceneObject = function( object )
{
    for( var i = 0; i < this.editorObjects.length; ++i )
    {
        if( this.editorObjects[i].object === object )
        {
            for( var j = 0; j < this.selection.length; ++j )
            {
                if( this.editorObjects[i] === this.selection[j] )
                {
                    this.deselectObjects( this.editorObjects[i].id );
                    break;
                }
            }

            this.eventDispatcher.dispatchEvent( "onSceneObjectRemoved", this.editorObjects[i].id );
            this.editorObjects[i].object.parent.remove( this.editorObjects[i].object );
            this.editorObjects.splice( i, 1 );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.selectObjects = function( editorObjectIds )
{
    if( this.selection.length > 0 )
    {
        this.doUndoManager.AddCommand( new DeselectObjectsCommand( this, [ this.selection[0].id ] ) );
        this.doUndoManager.Do();
    }

    if( editorObjectIds.length > 0 )
    {
        var editorObject = this.getEditorObjectFromEditorId( editorObjectIds[0] );
        if( editorObject !== undefined )
        {
            if( editorObject.object.visible !== false )
            {
                this.doUndoManager.AddCommand( new SelectObjectsCommand( this, [ editorObjectIds[0] ] ) );
                this.doUndoManager.Do();
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsSelected = function( objectIds )
{
    var selectedObject = this.getEditorObjectFromEditorId( objectIds[0] );
    this.selection.push( selectedObject );

    for( var i = 0; i < this.selection.length; ++i )
    {
        if( this.selection[i].gizmos.length > 0 )
        {
            this.selection[i].gizmos[0].visible = true;
        }
    }

    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.deselectObjects = function( editorObjectIds )
{
    if( this.selection.length > 0 )
    {
        this.doUndoManager.AddCommand( new DeselectObjectsCommand( this, [ this.selection[0].id ] ) );
        this.doUndoManager.Do();
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsDeselected = function( objectIds )
{
    for( var i = 0; i < this.selection.length; ++i )
    {
        if( this.selection[i].gizmos.length > 0 )
        {
            this.selection[i].gizmos[0].visible = false;
        }
    }

    this.selection.length = 0;
    
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneCreateObject = function( data )
{
    this.doUndoManager.AddCommand( new CreateObjectCommand( this, data ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneCreateObject = function( data )
{
    this.render();    
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneDeleteObject = function( data )
{
    this.doUndoManager.AddCommand( new DeleteObjectCommand( this, data ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneDeleteObject = function( data )
{
    this.render();    
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectTranslated = function( objectId, oldPosition, newPosition )
{
    this.doUndoManager.AddCommand( new TranslateObjectCommand( this, objectId, oldPosition, newPosition ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsTranslated = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectScaled = function( objectId, oldScale, newScale )
{
    this.doUndoManager.AddCommand( new ScaleObjectCommand( this, objectId, oldScale, newScale ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsScaled = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsRotated = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectRotated = function( objectId, oldRotation, newRotation )
{
    this.doUndoManager.AddCommand( new RotateObjectCommand( this, objectId, oldRotation, newRotation ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.viewCameraTransformed = function( viewId, oldPosition, oldRotation, newPosition, newRotation )
{
    this.doUndoManager.AddCommand( new ViewCameraTransformedCommand( this, viewId, oldPosition, oldRotation, newPosition, newRotation ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onViewCameraTransformed = function( viewId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onViewCreated = function( view )
{
    this.views.push( view );
    if( view instanceof View )
    {
        view.init( this );
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onKeyDown = function( event )
{
    if( (event.key == "z" ) && (event.ctrlKey == true) )
    {
        this.doUndoManager.Undo();
    }

    if( (event.key == "y" ) && (event.ctrlKey == true) )
    {
        this.doUndoManager.Redo();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.onToolbarButtonActivated = function( event )
{
    if( event.parent === "ToolbarGeneralTransformSpace" )
    {
        switch( event.button )
        {
            case "ToolbarGeneralTransformSpace-global":
            {
                this.objectTransformSpace = ETransformSpace.GLOBAL;
            }
            break;
            case "ToolbarGeneralTransformSpace-local":
            {
                this.objectTransformSpace = ETransformSpace.LOCAL;
            }
            break;
            default:
            {}
            break;
        }

        this.eventDispatcher.dispatchEvent( "onObjectTransformSpaceChanged", this.objectTransformSpace );
    }

    if( event.parent === "ToolbarGeneralTransformMode" )
    {
        switch( event.button )
        {
            case "ToolbarGeneralTransformMode-translate":
            {
                this.objectTransformMode = ETransformMode.TRANSLATE;
            }
            break;
            case "ToolbarGeneralTransformMode-rotate":
            {
                this.objectTransformMode = ETransformMode.ROTATE;
            }
            break;
            case "ToolbarGeneralTransformMode-scale":
            {
                this.objectTransformMode = ETransformMode.SCALE;
            }
            break;
            default:
            {}
            break;
        }

        this.eventDispatcher.dispatchEvent( "onObjectTransformModeChanged", this.objectTransformMode );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.onToolbarButtonDeactivated = function( event )
{
    if( event.parent == "ToolbarGeneralTranformMode" )
    {
        this.objectTransformMode = ETransformMode.NONE;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////