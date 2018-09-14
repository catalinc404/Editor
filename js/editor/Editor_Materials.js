////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addMaterial = function( material )
{
    for( var materialId in this.materials )
    {
        if( this.materials[materialId].uuid == material.uuid )
        {
            return materialId;
        }
    }

    var materialId = ++this.materialsId; 
    this.materials[ materialId ] = material;

    this.eventDispatcher.dispatchEvent( "onSceneMaterialAdded", { materialId: materialId, parentId: this.materialsParentId, name: material.name } );

    return materialId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.removeMaterial = function( materialId )
{
    this.eventDispatcher.dispatchEvent( "onSceneMaterialRemoved", { materialId: materialId } );

    var material = this.materials[ materialId ];
    this.materials[ materialId ] = undefined;

    return material;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterial = function( materialId )
{
    return this.materials[ materialId ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterialFromEditorId = function( materialId )
{
    return this.getMaterial( materialId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneMaterialSelect = function( materialId )
{
    this.doUndoManager.addCommand( new SelectMaterialCommand( this, materialId ) );
    this.doUndoManager.do();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneMaterialDeselect = function( materialId )
{
    this.doUndoManager.addCommand( new DeselectMaterialCommand( this, materialId ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneMaterialSelected = function( materialId )
{
    //Nothing to do...
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneMaterialDeselected = function( materialId )
{
    //Nothing to do...
}
