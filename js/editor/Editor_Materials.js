////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addMaterial = function( material )
{
    var materialId = ++this.materialsId; 
    this.materials[ materialId ] = material;

    this.eventDispatcher.dispatchEvent( "onSceneMaterialAdded", { materialId: materialId, parentId: this.materialsParentId, name: material.name } );

    return materialId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.removeMaterial = function( materialId )
{
    var material = this.material[ materialId ];
    this.materials[ materialId ] = undefined;

    return material;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterial = function( materialId )
{
    return this.materials[ materialId ];
}

