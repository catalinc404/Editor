//////////////////////////////////////////////////////////////////////////////
function sceneOpen() 
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var file = event.target.files[0];
                                                    if( file.name.match(/\.(json|js)$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        var loader = new THREE.ObjectLoader();
                                                        loader.load( tmpPath, function ( obj ) { editor.addSceneObject( obj ); } );
                                                    }
                                                    else
                                                    if( file.name.match(/\.dae$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        editor.loadDAE( tmpPath, file.name );
                                                    }
                                                }
                                            } );
    fileSelector.click();
}

//////////////////////////////////////////////////////////////////////////////
function sceneSave() 
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.click();

    if( fileSelector.files.length > 0 )
    {
        var exporter = new THREE.FileLoader();
        var sceneJson = JSON.stringify( scene.toJSON() );
    }
}

//////////////////////////////////////////////////////////////////////////////
function sceneNew() 
{

}

//////////////////////////////////////////////////////////////////////////////
function sceneImport()
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var file = event.target.files[0];
                                                    if( file.name.match(/\.(json|js)$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        var loader = new THREE.ObjectLoader();
                                                        loader.load(  tmpPath, function ( obj ) { editor.addSceneObject( obj ); } );
                                                    }
                                                    else
                                                    if( file.name.match(/\.dae$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        editor.loadDAE( tmpPath, file.name );
                                                    }
                                                }
                                            } );
    fileSelector.click();
}
