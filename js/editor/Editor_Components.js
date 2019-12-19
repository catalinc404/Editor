//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onComponentDragged = function( event )
{   
    for( var i = 0, size = event.length; i < size; ++i )
    {
        var sourceType = "unknown";
        var destinationType = "unknown";

        if( event[i].source.id )
        {
            sourceType = this.getTypeInfoFromId( event[i].source.id ).type;
        }
        else
        if( event[i].source.file )
        {
            sourceType = "file";
        }
        
        if( event[i].destination.id )
        {
            destinationType = this.getTypeInfoFromId( event[i].destination.id ).type;
        }

        var command = sourceType + "_on_" + destinationType;
        console.log( command );

        switch( command )
        {
            case "material_on_object":
            {
                //Material dropped on object
                var object = this.getObjectFromEditorId( event[i].destination.id );
                var material = this.getMaterial( event[i].source.id );

                if( ( object instanceof THREE.Object3D ) && (material != null ) )
                {
                    this.doUndoManager.addCommand( new SetMaterialCommand( this, event[i].destination.id, event[i].source.id ) );
                    this.doUndoManager.do();
                }
            }
            break;
            case "file_on_material":
            case "file_on_materialsManager":
            {
                var loader = new THREE.FileLoader();
                let fileObject = fileToFileObject( event[i].source.file );

                var onLoad = function( data )
                {
                    var json = JSON.parse( data );
                    editor.loadMaterial( json );
                }
                    
                var onError = function( error )
                {
                    console.log( error );
                };

                loader.load( fileObject.url, onLoad, null, onError );
            }
            break;
            default:
            {
                console.log( "Unhandled drop type: " + command );
            }
            break;
        }
    }
};

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onComponentPropertyChanged = function( data )
{
    switch( data.property )
    {
        case "material":
        {
            var editorObject = this.getEditorObjectFromEditorId( data.id );
            if( editorObject != null )
            {
                if( editorObject.object.visible === true )
                {
                    this.render();
                }
            }
        }
        break;

        default:
        {}
        break;
    }
}

//////////////////////////////////////////////////////////////////////////////
