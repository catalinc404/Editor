//////////////////////////////////////////////////////////////////////////////
function SelectObjectsCommand( editor, objects )
{
    this.editor = editor;
    this.objects = objects;
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
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objects );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objects );
}

//////////////////////////////////////////////////////////////////////////////
SelectObjectsCommand.prototype.Redo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objects );
}


//////////////////////////////////////////////////////////////////////////////
function DeselectObjectsCommand( editor, objects )
{
    this.editor = editor;
    this.objects = objects;
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
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objects );
}

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype.Undo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", this.objects );
}

//////////////////////////////////////////////////////////////////////////////
DeselectObjectsCommand.prototype.Redo = function()
{
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", this.objects );
}


//////////////////////////////////////////////////////////////////////////////
function TranslateObjectCommand( editor, object, oldPosition, newPosition )
{
    this.editor = editor;
    this.object = object;

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
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Undo = function()
{
    this.object.position.x = this.oldPosition.x;
    this.object.position.y = this.oldPosition.y;
    this.object.position.z = this.oldPosition.z;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
TranslateObjectCommand.prototype.Redo = function()
{
    this.object.position.x = this.newPosition.x;
    this.object.position.y = this.newPosition.y;
    this.object.position.z = this.newPosition.z;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectTranslated", this.object );
}


//////////////////////////////////////////////////////////////////////////////
function ScaleObjectCommand( editor, object, oldScale, newScale )
{
    this.editor = editor;
    this.object = object;

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
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.object );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Undo = function()
{
    this.object.scale.x = this.oldScale.x;
    this.object.scale.y = this.oldScale.y;
    this.object.scale.z = this.oldScale.z;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.object );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Redo = function()
{
    this.object.scale.x = this.newScale.x;
    this.object.scale.y = this.newScale.y;
    this.object.scale.z = this.newScale.z;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.object );
}


//////////////////////////////////////////////////////////////////////////////
function RotateObjectCommand( editor, object, oldRotation, newRotation )
{
    this.editor = editor;
    this.object = object;

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
    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Undo = function()
{
    this.object.quaternion.x = this.oldRotation.x;
    this.object.quaternion.y = this.oldRotation.y;
    this.object.quaternion.z = this.oldRotation.z;
    this.object.quaternion.w = this.oldRotation.w;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Redo = function()
{
    this.object.quaternion.x = this.newRotation.x;
    this.object.quaternion.y = this.newRotation.y;
    this.object.quaternion.z = this.newRotation.z;
    this.object.quaternion.w = this.newRotation.w;
    this.object.matrixWorldNeedsUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
ViewCameraTransformedCommand

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
    this.editor.eventDispatcher.dispatchEvent( "onViewCameraTransformed", this.object );
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
