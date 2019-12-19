////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.addMaterial = function( material )
{
    var materialId = INVALID_COMPONENT;

    if( material )
    {
        for( var materialId in this.materials )
        {
            if( this.materials[materialId].uuid == material.uuid )
            {
                return materialId;
            }
        }

        materialId = ++this.materialsId; 
        this.materials[ materialId ] = material;

        this.eventDispatcher.dispatchEvent( "onSceneMaterialAdded", { materialId: materialId, parentId: this.materialsParentId, name: material.name } );
    }

    return materialId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.removeMaterial = function( materialId )
{
    var material = null;

    if( materialId !== INVALID_COMPONENT )
    {
        this.eventDispatcher.dispatchEvent( "onSceneMaterialRemoved", { materialId: materialId } );

        material = this.materials[ materialId ];
        this.materials[ materialId ] = undefined;
    }

    return material;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterial = function( materialId )
{
    var material = null;

    if( materialId !== INVALID_COMPONENT )
    {
        material = this.materials[ materialId ];
    }

    return material;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterialId = function( material )
{
    var materialId = INVALID_COMPONENT;
    for (var id in this.materials )
    {
        if( this.materials[ id ] === material )
        {
            materialId = id;

            break;
        }
    }

    return materialId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getMaterialFromEditorId = function( materialId )
{
    return this.getMaterial( materialId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorIdFromMaterial = function( material )
{
    return this.getMaterialId( material );
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneMaterialSelected = function( materialId )
{
    //Nothing to do...
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneMaterialDeselected = function( materialId )
{
    //Nothing to do...
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.convertMaterial = function ( material )
{
    //TODO:...
    var materialParameters = 
    {
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0.5,
    }

    return new THREE.MeshStandardMaterial( materialParameters );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadMaterial = function ( materialJSON )
{
    var materialId = INVALID_COMPONENT;

    if( materialJSON.nodes )
    {
        var material = this.deserializeNodeMaterial( materialJSON );
        materialId = this.addMaterial( material );
    }
    else
    {
        //TODO:...
        console.log( "failed to load: " + materialJSON );
    }

    return materialId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.deserializeNodeMaterial = function ( materialJSON )
{
    var library = {};
    for( var key in materialJSON.nodes )
    {
        var jsonNode = materialJSON.nodes[ key ];
        if( jsonNode.nodeType === "Texture" )
        {
            if( jsonNode.editor && jsonNode.editor.path )
            {
                var texture = editor.loadTexture( jsonNode.editor.path, function( _texture )
                                                                        {
                                                                            _texture.wrapS = _texture.wrapT = THREE.RepeatWrapping;
                                                                            _texture.flipY = false;
                                                                            _texture.needsUpdate = true;                                
                                                                        } );

                texture.uuid = jsonNode.value;
                library[ texture.uuid ] = texture;
            }
        }
        else
        if( jsonNode.nodeType === "Float" )
        {
            jsonNode.value = parseInt( jsonNode.value );
        }
    }

    var mainMaterialUUID = materialJSON.material;
    var loader = new THREE.NodeMaterialLoader( null, library );

    var material = loader.parse( materialJSON );
    if( material )
    {
        var properties =
        {
            type: "folder",
            name: materialJSON.materials[ mainMaterialUUID ].editor.name,
            properties: [],
        };

        material.uuid = mainMaterialUUID;
        material.name = properties.name; 

        for( var key in materialJSON.nodes )
        {
            var node = materialJSON.nodes[ key ];
            if( node.editor != null )
            {
                var editorData = node.editor;
                if( editorData.name )
                {
                    var property = { name: editorData.name };
                    
                    switch( node.nodeType )
                    {
                        case "Texture":
                        {
                            property.type = "nodeTexture";
                            property.object = loader.nodes[ node.uuid];
                            property.field = "value";
                        }
                        break;

                        case "Float":
                        {
                            property.type = "float";
                            property.object = loader.nodes[ node.uuid];
                            property.field = "value";
                        }

                        default:
                        {}
                        break;
                    }

                    properties.properties.push( property );
                }

            }
        }

        material.userData = {};
        material.userData[ "properties" ] = properties;

        material.build();
    }

    return material;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
