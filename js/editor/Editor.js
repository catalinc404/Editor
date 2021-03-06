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
    this.selection = {  object: null, material: null, geometry: null };
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
    this.eventDispatcher.addEventListener( "onSceneObjectRemoved",          this.onSceneObjectRemoved.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectSelected",         this.onSceneObjectSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeselected",       this.onSceneObjectDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectTranslated",       this.onSceneObjectTranslated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectScaled",           this.onSceneObjectScaled.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectRotated",          this.onSceneObjectRotated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectPropertyChanged",  this.onSceneObjectPropertyChanged.bind( this ) );
    
    this.eventDispatcher.addEventListener( "onComponentDragged",            this.onComponentDragged.bind( this ) );
    this.eventDispatcher.addEventListener( "onComponentPropertyChanged",    this.onComponentPropertyChanged.bind( this ) );
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onToolbarButtonActivated",      this.onToolbarButtonActivated.bind( this ) );
    this.eventDispatcher.addEventListener( "onToolbarButtonDeactivated",    this.onToolbarButtonDeactivated.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addCommandHandler( "render",                       this.render.bind( this ) );

    this.eventDispatcher.addCommandHandler( "sceneObjectCreate",            this.sceneObjectCreate.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectDelete",            this.sceneObjectDelete.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectSelect",            this.sceneObjectSelect.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneObjectDeselect",          this.sceneObjectDeselect.bind( this ) );
    
    this.eventDispatcher.addCommandHandler( "sceneMaterialSelect",          this.sceneMaterialSelect.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneMaterialDeselect",        this.sceneMaterialDeselect.bind( this ) );
    
    this.eventDispatcher.addCommandHandler( "sceneGeometrySelect",          this.sceneGeometrySelect.bind( this ) );
    this.eventDispatcher.addCommandHandler( "sceneGeometryDeselect",        this.sceneGeometryDeselect.bind( this ) );
    this.eventDispatcher.addCommandHandler( "getObjectFromEditorId",        this.getObjectFromEditorId.bind( this ) );

    this.eventDispatcher.addCommandHandler( "getMaterialFromEditorId",      this.getMaterialFromEditorId.bind( this ) );
    this.eventDispatcher.addCommandHandler( "getEditorIdFromMaterial",      this.getEditorIdFromMaterial.bind( this ) );
    this.eventDispatcher.addCommandHandler( "getGeometryFromEditorId",      this.getGeometryFromEditorId.bind( this ) );
    this.eventDispatcher.addCommandHandler( "getEditorIdFromGeometry",      this.getEditorIdFromGeometry.bind( this ) );    
    this.eventDispatcher.addCommandHandler( "getTypeInfoFromId",            this.getTypeInfoFromId.bind( this ) );

    this.eventDispatcher.addCommandHandler( "executeCommand",               this.executeCommand.bind( this ) );

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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneHelpers = new THREE.Scene();
    this.sceneGizmos  = new THREE.Scene();
    this.sceneGizmos.autoUpdate = false;
    this.scenePicking = new THREE.Scene();
    this.scenePicking.autoUpdate = false;
    this.sceneHUD     = new THREE.Scene();
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scene = new THREE.Scene();
    this.scene.name = "Scene";
    this.sceneObjectAdd( this.scene, { dontAddToScene: true } );
    this.eventDispatcher.dispatchEvent( "onSceneCreated", this.scene );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.dispatchEvent( "onSceneMaterialAdded", { materialId: this.materialsParentId, parentMaterialId: -1, name: "Materials" } );
    this.eventDispatcher.dispatchEvent( "onSceneGeometryAdded", { geometryId: this.geometriesParentId, parentMaterialId: -1, name: "Geometries" } );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.defaultTexture = this.loadTexture( "textures/UV_Grid_Sm.jpg" );
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var defaultGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    defaultGeometry.name = "default geometry";
    this.defaultGeometryId = this.addGeometry( defaultGeometry );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.dispatchEvent( "onEditorInitialized", this );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    ambientLight.name = "Ambient Light";
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
    if( this.selection.object != null )
    {
        for( var i = 0; i < this.selection.object.helpers.length; ++i )
        {
            var helper = this.selection.object.helpers[i];
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
    this.doUndoManager.addCommand( new ViewCameraTransformedCommand( this, viewId, oldPosition, oldRotation, newPosition, newRotation ) );
    this.doUndoManager.do();
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
        this.doUndoManager.undo();
    }

    if( (event.key == "y" ) && (event.ctrlKey == true) )
    {
        this.doUndoManager.redo();
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
    if( event.parent == "ToolbarGeneralTransformMode" )
    {
        this.objectTransformMode = ETransformMode.NONE;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getTypeInfoFromId = function( id )
{
    var info;

    if( id > this.materialsParentId )
    {
        //TODO: material type
        info = { type: "material", detail: "", commands: [ { command: "clone", name: "Clone" }, { command: "deleteMaterial", name: "Delete" } ] };
    }
    else
    if( id == this.materialsParentId )
    {
        info = { type: "materialsManager", detail: "", commands: [ { command: "addMaterial", name: "Add material" }, { command: "deleteAllMaterials", name: "Delete all materials" } ] };
    }
    else
    if( id > this.geometriesParentId )
    {
        //TODO: geometry type
        info = { type: "geometry", detail: "", commands: [ { command: "clone", name: "Clone" }, { command: "deleteGeometry", name: "Delete" } ] };
    }
    else
    if( id == this.geometriesParentId )
    {
        info = { type: "geometriesManager", detail: "", commands: [ { command: "addGeometry", name: "Add geometry " }, { command: "deleteAllGeometries", name: "Delete all geometries" } ] };
    }
    else
    if( id > 1 )
    {
        info = { type: "object", detail: "", commands: [ { command: "clone", name: "Clone" }, { command: "deleteObject", name: "Delete" } ] };
    }
    else
    {
        info = { type: "scene", detail: "root", commands: [ { command: "addGroup", name: "Add group" } ] };
    }

    return info;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.executeCommand = function( commandData )
{
    var id = commandData.id;

    switch( commandData.command )
    {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "select" : 
        {
            var type = this.getTypeInfoFromId( id ).type;
            switch( type )
            {
                case "scene":
                case "object":
                {
                    this.sceneObjectSelect( id );
                }
                break;
                case "material":
                {
                    this.sceneMaterialSelect( id );
                }
                break;
                case "geometry":
                {
                    this.sceneGeometrySelect( id );
                }
                break;
                default:
                break;
            }
        }
        break;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "deselect" : 
        {
        }
        break;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "deleteObject" : 
        {
            this.sceneObjectDelete( { objectId: id } );
        }
        break;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        default:
        {
            //console.log( "unknown command: " + commandData.command + ", id: " + id );
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////