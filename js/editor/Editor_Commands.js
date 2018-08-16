//////////////////////////////////////////////////////////////////////////////
function GetCurrentSelection( editor )
{   
    var selection = {};
    selection.objectId = editor.getEditorIdFromEditorObject( editor.selection.object );
    selection.materialId = editor.selection.materialId;
    selection.geometryId = editor.selection.geometryId;

    return selection;
};

//////////////////////////////////////////////////////////////////////////////
function SelectSceneComponent( editor, componentData )
{
    if( componentData.objectId != null )
    {
        editor.selection.object = editor.getEditorObjectFromEditorId( componentData.objectId )
        editor.eventDispatcher.dispatchEvent( "onSceneObjectDeselected", componentData.objectId );
    }
    if( componentData.materialId != null )
    {
        editor.selection.materialId = materialId;
        editor.eventDispatcher.dispatchEvent( "onSceneMaterialDeselected", componentData.materialId );
    }
    if( componentData.geometryId != null )
    {
        editor.selection.geometryId = geometryId;
        editor.eventDispatcher.dispatchEvent( "onSceneGeometryDeselected", componentData.geometryId );
    }
}

//////////////////////////////////////////////////////////////////////////////
function DeselectSceneComponent( editor, componentData )
{
    if( componentData.objectId != null )
    {
        editor.selection.object = null;
        editor.eventDispatcher.dispatchEvent( "onSceneObjectDeselected", componentData.objectId );
    }
    if( componentData.materialId != null )
    {
        editor.selection.materialId = null;
        editor.eventDispatcher.dispatchEvent( "onSceneMaterialDeselected", componentData.materialId );
    }
    if( componentData.geometryId != null )
    {
        editor.selection.geometryId = null;
        editor.eventDispatcher.dispatchEvent( "onSceneGeometryDeselected", componentData.geometryId );
    }
}


//////////////////////////////////////////////////////////////////////////////
function SelectObjectCommand( editor, objectId )
{
    this.editor = editor;
    this.objectId = objectId;
    this.oldSelection = GetCurrentSelection( editor );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: SelectObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype.Do = function()
{
    //Deselect old stuff
    DeselectSceneComponent( this.editor, this.oldSelection );

    //Select new stuff
    if( this.objectId != null )
    {
        this.editor.selection.object = this.editor.getEditorObjectFromEditorId( this.objectId )   
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectSelected", this.objectId );
    }
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype.Undo = function()
{
    //Deselect new stuff
    if( this.objectId != null )
    {
        this.editor.selection.object = null;
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeselected", this.objectId );
    }

    //Select old stuff
    SelectSceneComponent( this.editor, this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype.Redo = function()
{
    //Deselect old stuff
    DeselectSceneComponent( this.editor, this.oldSelection );

    //Select new stuff
    if( this.objectId != null )
    {
        this.editor.selection.object = this.editor.getEditorObjectFromEditorId( this.objectId );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectSelected", this.objectId );
    }
}

//////////////////////////////////////////////////////////////////////////////
function TranslateObjectCommand( editor, objectId, oldPosition, newPosition )
{
    this.editor = editor;
    this.objectId = objectId;

    this.oldPosition = new THREE.Vector3();
    this.oldPosition.x = oldPosition.x;
    this.oldPosition.y = oldPosition.y;
    this.oldPosition.z = oldPosition.z;

    this.newPosition = new THREE.Vector3();
    this.newPosition.x = newPosition.x;
    this.newPosition.y = newPosition.y;
    this.newPosition.z = newPosition.z;
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: TranslateObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Undo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )

    object.position.x = this.oldPosition.x;
    object.position.y = this.oldPosition.y;
    object.position.z = this.oldPosition.z;
    object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Redo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )

    object.position.x = this.newPosition.x;
    object.position.y = this.newPosition.y;
    object.position.z = this.newPosition.z;
    object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.objectId );
}


//////////////////////////////////////////////////////////////////////////////
function ScaleObjectCommand( editor, objectId, oldScale, newScale )
{
    this.editor = editor;
    this.objectId = objectId;

    this.oldScale = new THREE.Vector3();
    this.oldScale.x = oldScale.x;
    this.oldScale.y = oldScale.y;
    this.oldScale.z = oldScale.z;

    this.newScale = new THREE.Vector3();
    this.newScale.x = newScale.x;
    this.newScale.y = newScale.y;
    this.newScale.z = newScale.z;
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: ScaleObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Undo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )
    
    object.scale.x = this.oldScale.x;
    object.scale.y = this.oldScale.y;
    object.scale.z = this.oldScale.z;
    object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Redo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )

    this.object.scale.x = this.newScale.x;
    this.object.scale.y = this.newScale.y;
    this.object.scale.z = this.newScale.z;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.objectId );
}


//////////////////////////////////////////////////////////////////////////////
function RotateObjectCommand( editor, objectId, oldRotation, newRotation )
{
    this.editor = editor;
    this.objectId = objectId;

    this.oldRotation = new THREE.Quaternion();
    this.oldRotation.x = oldRotation.x;
    this.oldRotation.y = oldRotation.y;
    this.oldRotation.z = oldRotation.z;
    this.oldRotation.w = oldRotation.w;

    this.newRotation =  new THREE.Quaternion();
    this.newRotation.x = newRotation.x;
    this.newRotation.y = newRotation.y;
    this.newRotation.z = newRotation.z;
    this.newRotation.w = newRotation.w;
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: RotateObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Undo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )

    object.quaternion.x = this.oldRotation.x;
    object.quaternion.y = this.oldRotation.y;
    object.quaternion.z = this.oldRotation.z;
    object.quaternion.w = this.oldRotation.w;
    object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Redo = function()
{
    var object = this.editor.getObjectFromEditorId( this.objectId )

    this.object.quaternion.x = this.newRotation.x;
    this.object.quaternion.y = this.newRotation.y;
    this.object.quaternion.z = this.newRotation.z;
    this.object.quaternion.w = this.newRotation.w;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
function ViewCameraTransformedCommand( editor, viewId, oldPosition, oldRotation, newPosition, newRotation )
{
    this.editor = editor;
    this.viewId = viewId;

    this.oldPosition = new THREE.Vector3();
    this.oldPosition.x = oldPosition.x;
    this.oldPosition.y = oldPosition.y;
    this.oldPosition.z = oldPosition.z;

    this.oldRotation = new THREE.Quaternion();
    this.oldRotation.x = oldRotation.x;
    this.oldRotation.y = oldRotation.y;
    this.oldRotation.z = oldRotation.z;
    this.oldRotation.w = oldRotation.w;

    this.newPosition = new THREE.Vector3();
    this.newPosition.x = newPosition.x;
    this.newPosition.y = newPosition.y;
    this.newPosition.z = newPosition.z;
        
    this.newRotation =  new THREE.Quaternion();
    this.newRotation.x = newRotation.x;
    this.newRotation.y = newRotation.y;
    this.newRotation.z = newRotation.z;
    this.newRotation.w = newRotation.w;
}

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: ViewCameraTransformedCommand
} );

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onViewCameraTransformed", this.viewId );
}

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand.prototype.Undo = function()
{
    var camera = this.editor.getView( this.viewId ).camera;
    
    camera.position.x = this.oldPosition.x;
    camera.position.y = this.oldPosition.y;
    camera.position.z = this.oldPosition.z;

    camera.quaternion.x = this.oldRotation.x;
    camera.quaternion.y = this.oldRotation.y;
    camera.quaternion.z = this.oldRotation.z;
    camera.quaternion.w = this.oldRotation.w;

    camera.matrixWorldNeedsUpdate = true;
    
    this.editor.eventDispatcher.dispatchEvent( "onViewCameraTransformed", this.viewId );
}

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand.prototype.Redo = function()
{
    var camera = this.editor.getView( this.viewId ).camera;

    camera.position.x = this.newPosition.x;
    camera.position.y = this.newPosition.y;
    camera.position.z = this.newPosition.z;

    camera.quaternion.x = this.newRotation.x;
    camera.quaternion.y = this.newRotation.y;
    camera.quaternion.z = this.newRotation.z;
    camera.quaternion.w = this.newRotation.w;

    camera.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onViewCameraTransformed", this.viewId );
}

//////////////////////////////////////////////////////////////////////////////
function CreateObjectCommand( editor, data )
{
    this.editor = editor;
    this.data = data;
}

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: CreateObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype.Do = function()
{
    var object;
    var color = Math.random() * 0xffffff;

    switch( this.data.type )
    {
        case "group":
        {
            object = new THREE.Object();
            object.name = "Group" + (++this.editor.sceneObjectCreationId);
        }
        break;
        case "box":
        {
            var boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
            var boxMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: color,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( boxGeometry, boxMaterial );
            object.name = "Box" + (++this.editor.sceneObjectCreationId);
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "quad":
        {
            var quadGeometry = new THREE.PlaneGeometry( 1.0, 1.0 );
            var quadMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: color,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( quadGeometry, quadMaterial );
            object.name = "Quad" + (++this.editor.sceneObjectCreationId);
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "sphere":
        {
            var sphereGeometry = new THREE.SphereGeometry( 1.0, 20, 20);
            var spehereMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: color,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( sphereGeometry, sphereMaterial );
            object.name = "Sphere" + (++this.editor.sceneObjectCreationId);
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "mesh":
        {
            this.geometryId = ( this.data.geometryId !== undefined ) ? this.data.geometryId : this.editor.defaultGeometryId;
            this.materialId = ( this.data.materialId !== undefined ) ? this.data.materialId : this.editor.defaultMaterialId;

            var geometry = this.editor.getGeometry( this.geometryId );
            var material = this.editor.getMaterial( this.materialId );

            object = new THREE.Mesh( geometry, material );
            object.name = "Mesh" + (++this.editor.sceneObjectCreationId);
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;

        default:
        {}
        break;
    }

    if( object !== undefined )
    {
        this.objectId = ++this.editor.sceneObjectsId;
        this.objectCreationId = this.editor.sceneObjectCreationId;
        this.objectColor = color;
        this.editor.sceneObjectAdd( object, { objectId:  this.objectId, parentObjectId: this.data.parentId } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.objectId );
    this.editor.sceneObjectRemove( this.editor.getObjectFromEditorId( this.objectId ) );
}

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype.Redo = function()
{
    var object;
    switch( this.data.type )
    {
        case "group":
        {
            object = new THREE.Object();
            object.name = "Group" + this.objectCreationId;
        }
        break;
        case "box":
        {
            var boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
            var boxMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: this.objectColor,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( boxGeometry, boxMaterial );
            object.name = "Box" + this.objectCreationId;
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "quad":
        {
            var quadGeometry = new THREE.PlaneGeometry( 1.0, 1.0 );
            var quadMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: this.objectColor,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( quadGeometry, quadMaterial );
            object.name = "Quad" + this.objectCreationId;
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "sphere":
        {
            var sphereGeometry = new THREE.SphereGeometry( 1.0, 20, 20);
            var spehereMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: this.objectColor,
                    roughness: 0.7,
                    metalness: 0.5,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.2
                } );

            object = new THREE.Mesh( sphereGeometry, sphereMaterial );
            object.name = "Sphere" + this.objectCreationId;
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;
        case "mesh":
        {
            var geometry = this.editor.getGeometry( this.geometryId );
            var material = this.editor.getMaterial( this.materialId );

            object = new THREE.Mesh( geometry, material );
            object.name = "Mesh" + this.objectCreationId;;
            object.castShadow = true;
            object.receiveShadow = true;
        }
        break;

        default:
        {}
        break;
    }

    if( object !== undefined )
    {
        this.editor.sceneObjectAdd( object, { objectId:  this.objectId, parentId: this.data.parentId,  } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
function DeleteObjectCommand( editor, data )
{
    this.editor = editor;
    this.data = data;
}

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: DeleteObjectCommand
} );

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype.Do = function()
{
    this.object = this.editor.getObjectFromEditorId( this.data.objectId );
    if( this.object !== undefined )
    {
        this.objectParentId = this.editor.getEditorIdFromObject( this.object.parent );

        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.data.objectId );
        this.editor.removeSceneObject( this.object );
    }
}

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype.Undo = function()
{
    if( this.object !== undefined )
    {
        this.editor.sceneObjectAdd( this.object, { parentId: this.objectParentId, objectId:  this.data.objectId } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.data.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype.Redo = function()
{
    if( this.object !== undefined )
    {
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.data.objectId );
        this.editor.sceneObjectRemove( this.object );
    }
}

//////////////////////////////////////////////////////////////////////////////
function SelectMaterialCommand( editor, materialId )
{
    this.editor = editor;
    this.materialId = materialId;
    this.oldSelection = GetCurrentSelection( editor );
}

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: SelectMaterialCommand
} );

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype.Do = function()
{
    //Deselect old stuff
    DeselectSceneComponent( this.editor, this.oldSelection );

    //Select new stuff
    if( this.materialId != null )
    {
        this.editor.selection.materialId = this.materialId;
        this.editor.eventDispatcher.dispatchEvent( "onSceneMaterialSelected", this.materialId );
    }
}

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype.Undo = function()
{
    //Deselect new stuff
    if( this.objectId != null )
    {
        this.editor.selection.object = null;
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeselected", this.objectId );
    }

    //Select old stuff
    SelectSceneComponent( this.editor, this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype.Redo = function()
{
    //Deselect old stuff
    DeslectSceneComponent( this.editor, this.oldSelection );

    if( this.materialId != null )
    {
        this.editor.selection,materialId = this.materialId;
        this.editor.eventDispatcher.dispatchEvent( "onSceneMaterialSelected", this.materialId );
    }
}

//////////////////////////////////////////////////////////////////////////////
function SelectGeometryCommand( editor, geometryId )
{
    this.editor = editor;
    this.geometryId = geometryId;
    this.oldSelection = GetCurrentSelection( editor );
}

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: SelectGeometryCommand
} );

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype.Do = function()
{
    //Deselect old stuff
    DeselectSceneComponent( this.editor, this.oldSelection );

    //Select new stuff
    if( this.geometryId != null )
    {
        this.editor.selection.geometryId = this.geometryId;
        this.editor.eventDispatcher.dispatchEvent( "onSceneGeometrySelected", this.geometryId );
    }
}

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype.Undo = function()
{
    //Deselect new stuff
    if( this.geometryId != null )
    {
        this.editor.selection.geometryId = null;
        this.editor.eventDispatcher.dispatchEvent( "onSceneGeometryDeselected", this.geometryId );
    }

    //Select old stuff
    SelectSceneComponent( this.editor, this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype.Redo = function()
{
    //Deselect old stuff
    DeslectSceneComponent( this.editor, this.oldSelection );

    if( this.geometryId != null )
    {
        this.editor.selection.geometryId = this.geometryId;
        this.editor.eventDispatcher.dispatchEvent( "onSceneGeometrySelected", this.geometryId );
    }
}
