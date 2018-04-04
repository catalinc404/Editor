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
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
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
    this.oldScale = oldScale;
    this.newScale = newScale;
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
    this.object.matrixNeedUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.object );
}

//////////////////////////////////////////////////////////////////////////////
ScaleObjectCommand.prototype.Redo = function()
{
    this.object.scale.x = this.newScale.x;
    this.object.scale.y = this.newScale.y;
    this.object.scale.z = this.newScale.z;
    this.object.matrixNeedUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectScaled", this.object );
}


//////////////////////////////////////////////////////////////////////////////
function RotateObjectCommand( editor, object, oldRotation, newRotation )
{
    this.editor = editor;
    this.object = object;
    this.oldRotation = oldRotation;
    this.newRotation = newRotation;
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
    this.object.matrixNeedUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.object );
}

//////////////////////////////////////////////////////////////////////////////
RotateObjectCommand.prototype.Redo = function()
{
    this.object.quaternion.x = this.newRotation.x;
    this.object.quaternion.y = this.newRotation.y;
    this.object.quaternion.z = this.newRotation.z;
    this.object.quaternion.w = this.newRotation.w;
    this.object.matrixNeedUpdate = true;

    this.editor.eventDispatcher.dispatchEvent( "onSceneObjectRotated", this.object );
}

