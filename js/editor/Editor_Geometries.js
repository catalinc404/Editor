////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addGeometry = function( geometry )
{
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

