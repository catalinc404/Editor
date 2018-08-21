//////////////////////////////////////////////////////////////////////////////
function CreateObjectCommand( editor, data )
{
    console.log( "CreateObjectCommand" );
    
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
    console.log( "CreateObjectCommand.Do" );

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

    if( object != null )
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
    console.log( "CreateObjectCommand.Undo" );

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.objectId );
    this.editor.sceneObjectRemove( this.editor.getObjectFromEditorId( this.objectId ) );
}

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype.Redo = function()
{
    console.log( "CreateObjectCommand.Redo" );

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

    if( object != null )
    {
        this.editor.sceneObjectAdd( object, { objectId:  this.objectId, parentId: this.data.parentId,  } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
function DeleteObjectCommand( editor, data )
{
    console.log( "DeleteObjectCommand: objectId: " + data.objectId );

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
    console.log( "DeleteObjectCommand.Do: objectId: " + this.data.objectId );

    this.object = this.editor.getObjectFromEditorId( this.data.objectId );
    if( this.object != null )
    {
        this.objectParentId = this.editor.getEditorIdFromObject( this.object.parent );

        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.data.objectId );
        this.editor.sceneObjectRemove( this.object );
    }
}

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype.Undo = function()
{
    console.log( "DeleteObjectCommand.Do: objectId: " + this.data.objectId );

    if( this.object != null )
    {
        this.editor.sceneObjectAdd( this.object, { parentId: this.objectParentId, objectId:  this.data.objectId } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.data.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
DeleteObjectCommand.prototype.Redo = function()
{
    console.log( "DeleteObjectCommand.Redo: objectId: " + this.data.objectId );

    if( this.object != null )
    {
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectDeleted", this.data.objectId );
        this.editor.sceneObjectRemove( this.object );
    }
}

//////////////////////////////////////////////////////////////////////////////
function SelectObjectCommand( editor, objectId )
{
    console.log( "SelectObjectCommand: objectId:" + objectId );
    
    this.editor = editor;
    this.objectId = objectId;

    this.oldSelection = this.editor.getSelection();
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
    console.log( "SelectObjectCommand.Do: objectId:" + this.objectId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { objectId: this.objectId } );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype.Undo = function()
{
    console.log( "SelectObjectCommand.Undo: objectId:" + this.objectId );

    //Deselect new stuff
    this.editor.deselect( { objectId: this.objectId } );

    //Select old stuff
    this.editor.select( this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectCommand.prototype.Redo = function()
{
    console.log( "SelectObjectCommand.Redo: objectId:" + this.objectId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { objectId: this.objectId } );
}

//////////////////////////////////////////////////////////////////////////////
function TranslateObjectCommand( editor, objectId, oldPosition, newPosition )
{
    console.log( "TranslateObjectCommand: objectId:" + objectId );

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
    console.log( "TranslateObjectCommand.Do: objectId:" + this.objectId );

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Undo = function()
{
    console.log( "TranslateObjectCommand.Undo: objectId:" + this.objectId );

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
    console.log( "TranslateObjectCommand.Redo: objectId:" + this.objectId );

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
    console.log( "ScaleObjectCommand: objectId:" + objectId );

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
    console.log( "ScaleObjectCommand.Do: objectId:" + this.objectId );

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Undo = function()
{
    console.log( "ScaleObjectCommand.Undo: objectId:" + this.objectId );

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
    console.log( "ScaleObjectCommand.Redo: objectId:" + this.objectId );

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
    console.log( "RotateObjectCommand: objectId:" + objectId );

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
    console.log( "RotateObjectCommand.Do: objectId:" + this.objectId );

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.objectId );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Undo = function()
{
    console.log( "RotateObjectCommand.Undo: objectId:" + this.objectId );

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
    console.log( "RotateObjectCommand.Redo: objectId:" + this.objectId );

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
    console.log( "ViewCameraTransformedCommand: viewId:" + viewId );

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
    console.log( "ViewCameraTransformedCommand.Do: viewId:" + this.viewId );

    this.editor.eventDispatcher.dispatchEvent( "onViewCameraTransformed", this.viewId );
}

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand.prototype.Undo = function()
{
    console.log( "ViewCameraTransformedCommand.Undo: viewId:" + this.viewId );

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
    console.log( "ViewCameraTransformedCommand.Redo: viewId:" + this.viewId );

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
function SelectMaterialCommand( editor, materialId )
{
    console.log( "SelectMaterialCommand: materialId: " + materialId );

    this.editor = editor;
    this.materialId = materialId;
    this.oldSelection = editor.getSelection();
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
    console.log( "SelectMaterialCommand.Do: materialId: " + this.materialId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { materialId: this.materialId } );
}

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype.Undo = function()
{
    console.log( "SelectMaterialCommand.Undo: materialId: " + this.materialId );

    //Deselect new stuff
    this.editor.deselect( { materialId: this.materialId } );
    
    //Select old stuff
    this.editor.select( this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectMaterialCommand.prototype.Redo = function()
{
    console.log( "SelectMaterialCommand.Redo: materialId: " + this.materialId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { materialId: this.materialId } );
}

//////////////////////////////////////////////////////////////////////////////
function SelectGeometryCommand( editor, geometryId )
{
    console.log( "SelectGeometryCommand: geometryId: " + geometryId );

    this.editor = editor;
    this.geometryId = geometryId;
    this.oldSelection = this.editor.getSelection();
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
    console.log( "SelectGeometryCommand.Do: geometryId: " + this.geometryId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { geometryId: this.geometryId } );
}

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype.Undo = function()
{
    console.log( "SelectGeometryCommand.Undo: geometryId: " + this.geometryId );

    //Deselect new stuff
    this.editor.select( { geometryId: this.geometryId } )

    //Select old stuff
    this.editor.select( this.oldSelection );
}

//////////////////////////////////////////////////////////////////////////////
SelectGeometryCommand.prototype.Redo = function()
{
    console.log( "SelectGeometryCommand.Redo: geometryId: " + this.geometryId );

    //Deselect old stuff
    this.editor.deselect( this.oldSelection );

    //Select new stuff
    this.editor.select( { geometryId: this.geometryId } );
}
