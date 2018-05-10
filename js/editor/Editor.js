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
    this.sceneObjects = [];
    this.sceneObjectsId = 0;
    this.sceneObjectCreationId = 0;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.geometries = {};
    this.geometriesId = 100000;
    this.geometriesParentId = 100000;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.materials = {};
    this.materialsId = 200000;
    this.materialsParentId = 200000;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.selection = [];
    this.objectTransformMode  = ETransformMode.TRANSLATE;
    this.objectTransformSpace = ETransformSpace.GLOBAL;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.doUndoManager = new DoUndoManager( eventDispatcher );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onViewCreated",                 this.onViewCreated.bind( this ) );
    this.eventDispatcher.addEventListener( "onViewCameraTransformed",       this.onViewCameraTransformed.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectCreated",          this.onSceneObjectCreated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeleted",          this.onSceneObjectDeleted.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectAdded",            this.onSceneObjectAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectRemoved",          this.onSceneObjectAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectSelected",         this.onSceneObjectSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeselected",       this.onSceneObjectDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectTranslated",       this.onSceneObjectsTranslated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectScaled",           this.onSceneObjectsScaled.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectRotated",          this.onSceneObjectsRotated.bind( this ) );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onToolbarButtonActivated",      this.onToolbarButtonActivated.bind( this ) );
    this.eventDispatcher.addEventListener( "onToolbarButtonDeactivated",    this.onToolbarButtonDeactivated.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addCommandHandler( "render",                       this.render.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectCreate",            this.sceneObjectCreate.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectDelete",            this.sceneObjectDelete.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectSelect",            this.sceneObjectSelect.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectDeselect",          this.sceneObjectDeselect.bind( this ) );

    this.eventDispatcher.addCommandHandler( "getObjectFromEditorId",        this.getObjectFromEditorId.bind( this ) );
    this.eventDispatcher.addCommandHandler( "getTypeFromId",                this.getTypeFromId.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    editor = this;
    this.eventDispatcher.dispatchEvent( "onEditorCreated", this );
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
    this.sceneHelpers = new THREE.Scene();
    this.sceneGizmos  = new THREE.Scene();
    this.sceneGizmos.autoUpdate = false;
    this.scenePicking = new THREE.Scene();
    this.scenePicking.autoUpdate = false;
    this.sceneHUD     = new THREE.Scene();

    this.scene = new THREE.Scene();
    this.scene.name = "Scene";
    this.sceneObjectAdd( this.scene, { dontAddToScene: true } );
    this.eventDispatcher.dispatchEvent( "onSceneCreated", this.scene );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.defaultTexture = this.loadTexture( "textures/UV_Grid_Sm.jpg" );

    this.eventDispatcher.dispatchEvent( "onSceneMaterialAdded", { materialId: this.materialsParentId, parentMaterialId: -1, name: "Materials" } );
    this.eventDispatcher.dispatchEvent( "onSceneGeometryAdded", { geometryId: this.geometriesParentId, parentMaterialId: -1, name: "Geoemtries" } );

    var defaultGeoemtry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    defaultGeoemtry.name = "default geometry";
    this.defaultGeometryId = this.addGeometry( defaultGeoemtry );

    var defaultMaterial = new THREE.MeshPhysicalMaterial(  {
                                                                color: 0x3F51B5,
                                                                roughness: 0.7,
                                                                metalness: 0.5,
                                                                clearCoat: 0.0,
                                                                clearCoatRoughness: 0.0,
                                                                reflectivity: 0.2
                                                            } );
    defaultMaterial.name = "default material";
    this.defaultMaterialId = this.addMaterial( defaultMaterial );


    this.eventDispatcher.dispatchEvent( "onEditorInitialized", this );

    this.initDefaultScene();
    this.eventDispatcher.dispatchEvent( "onSceneInitialized", this.scene );
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

    var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    ambientLight.name = "ambientLight";
    this.sceneObjectAdd( ambientLight );
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
Editor.prototype.viewCameraTransform = function( viewId, oldPosition, oldRotation, newPosition, newRotation )
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
Editor.prototype.getTypeFromId = function( id )
{
    var type;

    if( id >= this.materialsParentId )
        type = "material";
    else
    if( id >= this.geometriesParentId )
        type = "geometry";
    else
    if( id > 1 )
        type = "object";
    else
        type = "scene";

    return type;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////