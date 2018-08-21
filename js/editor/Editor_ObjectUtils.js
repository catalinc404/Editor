//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorObjectFromEditorId = function( editorObjectId )
{
    console.log( "Editor.getEditorObjectFromEditorId: editorObjectId: " + editorObjectId );

    var editorObject;
    for( var j = 0; j < this.sceneObjects.length; ++j ) 
    {
        if( this.sceneObjects[j].id == editorObjectId )
        {
            editorObject = this.sceneObjects[j];
            break;
        }
    }

    return editorObject;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorObjectsFromEditorIds = function( editorObjectsIds )
{
    console.log( "Editor.getEditorObjectsFromEditorIds: editorObjectsIds: " + editorObjectsIds );

    var editorObjects = [];
    for( var i = 0; i < editorObjectsIds.length; ++i ) 
    {
        for( var j = 0; j < this.sceneObjects.length; ++j ) 
        {
            if( this.sceneObjects[j].id == editorObjectsIds[i] )
            {
                editorObjects.push( this.sceneObjects[j] );
                break;
            }
        }
    }

    return editorObjects;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getObjectFromEditorId = function( editorObjectId )
{
    console.log( "Editor.getObjectFromEditorId: editorObjectId: " + editorObjectId );

    var object;
    for( var i = 0; i < this.sceneObjects.length; ++i ) 
    {
        if( this.sceneObjects[i].id == editorObjectId )
        {
            object = this.sceneObjects[i].object;
            break;
        }
    }

    return object;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getObjectsFromEditorIds = function( editorObjectsIds )
{
    console.log( "Editor.getObjectsFromEditorIds: editorObjectsIds: " + editorObjectsIds );

    var objects = [];
    for( var i = 0; i < editorObjectsIds.length; ++i ) 
    {
        for( var j = 0; j < this.sceneObjects.length; ++j ) 
        {
            if( this.sceneObjects[j].id == editorObjectsIds[i] )
            {
                objects.push( this.sceneObjects[j].object );
                break;
            }
        }
    }

    return objects;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdFromObject = function( object )
{
    console.log( "Editor.getEditorIdFromObject: object: " + object );

    var objectId = undefined;
    for( var i = 0; i < this.sceneObjects.length; ++i ) 
    {
        if( this.sceneObjects[i].object === object )
        {
            objectId = this.sceneObjects[i].id;
            break;
        }
    }

    return objectId;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdsFromObjects = function( objects )
{
    console.log( "Editor.getEditorIdsFromObjects: objects: " + objects );    

    var objectIds = [];
    for( var i = 0; i < objects.length; ++i ) 
    {
        for( var j = 0; j < this.sceneObjects.length; ++j ) 
        {
            if( this.sceneObjects[j].object === objects[i] )
            {
                objectIds.push( this.sceneObjects[j].id );
                break;
            }
        }
    }

    return objectIds;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdFromObjectId = function( objectId )
{
    console.log( "Editor.getEditorIdFromObjectId: objectId: " + objectId );    

    var editorObjectId = -1;
    for( var i = 0; i < this.sceneObjects.length; ++i ) 
    {
        if( this.sceneObjects[i].object.id == objectId )
        {
            editorObjectId = this.sceneObjects[i].id;
            break;
        }
    }

    return editorObjectId;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdsFromObjectIds = function( objectIds )
{
    console.log( "Editor.getEditorIdsFromObjectIds: objectIds: " + objectIds );    

    var editorObjectIds = [];
    for( var i = 0; i < objectIds.length; ++i ) 
    {
        for( var j = 0; j < this.sceneObjects.length; ++j ) 
        {
            if( this.sceneObjects[j].object.id === objectIds[i] )
            {
                editorObjectIds.push( this.sceneObjects[j].id );
                break;
            }
        }
    }

    return editorObjectIds;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorObjectFromObject = function( object )
{
    console.log( "Editor.getEditorObjectFromObject: object: " + object );    

    var editorObject;
    for( var j = 0; j < this.sceneObjects.length; ++j ) 
    {
        if( this.sceneObjects[j].object == object )
        {
            editorObject = this.sceneObjects[j];
            break;
        }
    }

    return editorObject;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdFromEditorObject = function( object )
{
    console.log( "Editor.getEditorIdFromEditorObject: object: " + object );    

    var editorObjectId = null;
    if( object != null )
    { 
        editorObjectId = object.id;
    }

    return editorObjectId;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdsFromEditorObjects = function( objects )
{
    console.log( "Editor.getEditorIdsFromEditorObjects: objects: " + objects );    

    var editorObjectIds = [];
    for( var i = 0; i < objects.length; ++i ) 
    {
        editorObjectIds.push( objects[i].id );
    }

    return editorObjectIds;
}
