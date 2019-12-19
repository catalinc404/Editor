//////////////////////////////////////////////////////////////////////////////
function fileToFileObject( file )
{
    return { name: file.name, path: file.path, url: URL.createObjectURL( file ), data: null };
}


function loadFile( parameters )
{
    if( parameters != null )
    {
        var fileSelector = document.createElement( "input" );
        fileSelector.type = 'file';
        fileSelector.multiple = parameters.multiple || false;
        fileSelector.accept = parameters.filter || '.*';

        fileSelector.addEventListener('change', function( event )
                                                {
                                                    var loader = new THREE.FileLoader();

                                                    for( var i = 0, size = event.target.files.length; i < size; ++i )
                                                    {
                                                        let fileObject = fileToFileObject( event.target.files[i] );

                                                        var onLoad = function( data )
                                                        {
                                                            fileObject.data = data;

                                                            if( parameters.callback )
                                                            {
                                                                parameters.callback( fileObject );
                                                            }
                                                        };
                                                        
                                                        var onError = function( error )
                                                        {
                                                            console.log( error );
                                                        };

                                                        loader.load( fileObject.url, onLoad, null, onError );
                                                    }
                                                } );

        fileSelector.click();
    }
}

//////////////////////////////////////////////////////////////////////////////
function saveFile( parameters )
{
    if( parameters )
    {
        var blob = null;

        if( parameters.binary === true )
        {
            blob = new Blob( [parameters.data], { type: "application/octet-stream" } );
        }
        else
        {
            var output = JSON.stringify( parameters.data );
            blob = new Blob( [ output ], { type: "application/json" } );
        }

        if( ( parameters.chooseFile === true ) && isElectron() )
        {
            const { dialog } = require( 'electron' ).remote;
            const fs = require( 'fs' );

            var savePath = dialog.showSaveDialog( { defaultPath: parameters.fileObject.path } );
            if( savePath != null )
            {
                fs.writeFile( savePath, blob,   function( error )
                                                {
                                                    if( error )
                                                    {
                                                        console.log( "writeFile error:" + error );
                                                    }
                                                });
            }
        }
        //Save
        else
        {
            saveAs( blob, parameters.fileObject.name );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
