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
Editor.prototype.getGeometryFromEditorId = function( geometryId )
{
    return this.getGeometry( geometryId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneGeometrySelect = function( geometryId )
{
    this.doUndoManager.AddCommand( new SelectGeometryCommand( this, geometryId ) );
    this.doUndoManager.Do();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneGeometryDeselect = function( geometryId )
{
    this.doUndoManager.AddCommand( new DeselectGeometryCommand( this, geometryId ) );
    this.doUndoManager.Do();
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
