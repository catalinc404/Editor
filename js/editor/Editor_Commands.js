//////////////////////////////////////////////////////////////////////////////
function SelectObjectsCommand( editor, objectIds )
{
    this.editor = editor;
    this.objectIds = objectIds;
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: SelectObjectsCommand
} );

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objectIds );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objectIds );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype.Redo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objectIds );
}


//////////////////////////////////////////////////////////////////////////////
function DeselectObjectsCommand( editor, objectIds )
{
    this.editor = editor;
    this.objectIds = objectIds;
}

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: DeselectObjectsCommand
} );

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype.Do = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objectIds );
}

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objectIds );
}

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype.Redo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objectIds );
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
                    color: Math.random() * 0xffffff,
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
                    color: Math.random() * 0xffffff,
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

        default:
        {}
        break;
    }

    if( object !== undefined )
    {
        this.objectId = ++this.editor.sceneObjectsId;
        this.editor.addSceneObject( object, { parentId: this.data.parentId, objectId:  this.objectId } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.objectId );        
    }
}

//////////////////////////////////////////////////////////////////////////////
CreateObjectCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsRemoved", this.objectId );
    this.editor.removeSceneObject( this.editor.getObjectFromEditorId( this.objectId ) );
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
            object.name = "Group" + (++this.editor.sceneObjectCreationId);
        }
        break;
        case "box":
        {
            var boxGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
            var boxMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: Math.random() * 0xffffff,
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
                    color: Math.random() * 0xffffff,
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

        default:
        {}
        break;
    }

    if( object !== undefined )
    {
        this.editor.addSceneObject( object, { parentId: data.parentId, id:  this.objectId } );
        this.editor.eventDispatcher.dispatchEvent( "onSceneObjectCreated", this.objectId );        
    }
}
