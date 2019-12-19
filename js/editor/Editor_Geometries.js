////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addGeometry = function( geometry )
{
    for( var geometryId in this.geometries )
    {
        if( this.geometries[geometryId].uuid == geometry.uuid )
        {
            return geometryId;
        }
    }
    
    var geometryId = ++this.geometriesId;
    this.geometries[ geometryId ] = geometry;

    this.eventDispatcher.dispatchEvent( "onSceneGeometryAdded", { geometryId: geometryId, parentId: this.geometriesParentId, name: geometry.name } );

    return geometryId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.removeGeometry = function( geometryId )
{
    this.eventDispatcher.dispatchEvent( "onSceneGeometryRemoved", { geometryId: geometryId } );

    var geometry = this.geometries[ geometryId ];
    this.geometries[ geometryId ] = undefined;

    return geometry;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getGeometry = function( geometryId )
{
    return this.geometries[ geometryId ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getGeometryId = function( geometry )
{
    var geometryId = undefined;
    for (var id in this.geometries )
    {
        if( this.geometries[ id ] === geometry )
        {
            geometryId = id;

            break;
        }
    }

    return geometryId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getGeometryFromEditorId = function( geometryId )
{
    return this.getGeometry( geometryId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdFromGeometry = function( geometry )
{
    return this.getGeometryId( geometry );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneGeometrySelect = function( geometryId )
{
    this.doUndoManager.addCommand( new SelectGeometryCommand( this, geometryId ) );
    this.doUndoManager.do();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneGeometryDeselect = function( geometryId )
{
    this.doUndoManager.addCommand( new DeselectGeometryCommand( this, geometryId ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneGeometrySelected = function( geometryId )
{
    //Nothing to do...
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneGeometryDeselected = function( geometryId )
{
    //Nothing to do...
}
