//////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadTexture = function ( path, callback )
{
    var _callback = callback;
    if( callback === undefined )
    {
        callback = this.render.bind( this );
    }
    return this.textureLoader.load( path, callback );
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadTDS = function ( path, normalMapPath )
{
    var normalMap = undefined;
    if( normalMapPath !== undefined )
    {
        normalMap = this.textureLoader.load( normalMapPath );
    }

    var basePath = path.substr(0, path.lastIndexOf( "/" ) + 1 );
    var name = path.substr( path.lastIndexOf( "/" ) + 1 );

    var TDSLoader = new THREE.TDSloader();
    TDSLoader.setPath( basePath );
    TDSLoader.load( path,   function ( object ) 
                            {
                                if( normalMap !== undefined )
                                {
                                    object.traverse(    function ( child ) 
                                                        {
                                                            if ( child instanceof THREE.Mesh ) 
                                                            {
                                                                child.material.normalMap = normalMap;
                                                            }
                                                        }
                                                    );
                                }

                                object.name = object.name || name;

                                editor.sceneObjectAdd( object );
                            }
                  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadDAE = function ( path, objectName )
{
    var basePath = path.substr(0, path.lastIndexOf( "/" ) + 1 );
    var name = path.substr( path.lastIndexOf( "/" ) + 1 );

    var DAELoader = new THREE.ColladaLoader( );
    DAELoader.setPath( basePath );
    DAELoader.load( path,   function ( collada ) 
                            {
                                var object = collada.scene 
                                object.name = object.name || objectName;
                                editor.sceneObjectAdd( object );
                            } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadOBJ = function ( path, objectName, callback )
{
    var basePath = path.substr(0, path.lastIndexOf( "/" ) + 1 );
    var fileName = path.substr( path.lastIndexOf( "/" ) + 1 );

    var name = objectName.substr( objectName.lastIndexOf( "/" ) + 1 )
    name = name.substr(0, name.lastIndexOf( "." ));

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( basePath );
    mtlLoader.load( name + ".mtl", function( materials ) 
    {
        materials.preload();
    } );

    var objLoader = new THREE.OBJLoader();
    //objLoader.setMaterials( materials );
    objLoader.setPath( basePath );
    objLoader.load( fileName, function ( object ) 
    {
        object.name = objectName || name;

        if( callback !== undefined )
        {
            callback( object );
        }

        editor.sceneObjectAdd( object );
    } );

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadFBX = function ( path, objectName, callback )
{
    var name = objectName.substr( objectName.lastIndexOf( "/" ) + 1 )
    name = name.substr(0, name.lastIndexOf( "." ));

    var objLoader = new THREE.FBXLoader();
    objLoader.load( path,   function ( object ) 
                            {
                                object.name = object.name || name;

                                editor.resetObjectXForm( object );

                                if( callback !== undefined )
                                {
                                    callback( object );
                                }

                                object.children[0].material = new THREE.MeshStandardMaterial( 
                                                                                                {
                                                                                                    color: 0xFFFFFF,
                                                                                                    roughness: 0.5,
                                                                                                    metalness: 0.7,
                                                                                                } );

                                object.children[0].material.name = object.children[0].name + "_StandardMaterial";

                                editor.sceneObjectAdd( object );
                            } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadPLYMesh = function ( path, objectName, callback )
{
    var plyLoader = new THREE.PLYLoader();
    plyLoader.load( path, callback );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneNew = function ()
{
    //TODO
    messageBox( { title: "New scene", contents: "<br>TODO<br><br>", type: EMessageBox.OK });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //this.sceneObjects = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //this.geometries = {};
   
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //this.materials = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneNewDefault = function ()
{
    this.sceneNew();
    //createDefaultScene( this );
}

function downloadObjectAsJson( object, name )
{
    var output = JSON.stringify( object, null, 2 );
    console.log( output );

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent( output );
    var downloadAnchorNode = document.createElement( "a" );
    downloadAnchorNode.setAttribute( "href", dataStr);
    downloadAnchorNode.setAttribute( "download", name );
    document.body.appendChild( downloadAnchorNode ); // required for firefox

    downloadAnchorNode.click( );
    
    downloadAnchorNode.remove( );
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.exportSelected = function()
{
    if( this.selection.object != null )
    {
        var name = this.selection.object.object.name + ".gltf";
        var GLTFExporter = new THREE.GLTFExporter();
        GLTFExporter.parse( this.selection.object.object,  function( result )
                                                    {
                                                        downloadObjectAsJson( result, name );
                                                    } );
    }
    else
    {
        messageBox( { title: "Export object", contents: "<br>ERROR: No object selected<br><br>", type: EMessageBox.OK });
    }
}

//////////////////////////////////////////////////////////////////////////////
function sceneOpen() 
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.multiple = true;
    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var length = event.target.files.length;
                                                    for( var i = 0; i < length; ++i )
                                                    {
                                                        var file = event.target.files[i];
                                                        
                                                        if( file.name.match(/\.(json|js)$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            var loader = new THREE.ObjectLoader();
                                                            loader.load( tmpPath, function ( obj ) { editor.sceneObjectAdd( obj ); } );
                                                        }
                                                        else
                                                        if( file.name.match(/\.dae$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadDAE( tmpPath, file.name );
                                                        }
                                                        else
                                                        if( file.name.match(/\.fbx$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadFBX( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.obj$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadOBJ( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.mtl$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadMTL( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.png$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadPNG( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.bmp$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadBMP( tmpPath, file.name,  );
                                                        }
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
    editor.sceneNew();
}

//////////////////////////////////////////////////////////////////////////////
function sceneNewDefault() 
{
    editor.sceneNewDefault();
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
                                                    var length = event.target.files.length;
                                                    for( var i = 0; i < length; ++i )
                                                    {
                                                        var file = event.target.files[i];
                                                        
                                                        if( file.name.match(/\.(json|js)$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            var loader = new THREE.ObjectLoader();
                                                            loader.load( tmpPath, function ( obj ) { editor.sceneObjectAdd( obj ); } );
                                                        }
                                                        else
                                                        if( file.name.match(/\.dae$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadDAE( tmpPath, file.name );
                                                        }
                                                        else
                                                        if( file.name.match(/\.fbx$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadFBX( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.obj$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadOBJ( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.mtl$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadMTL( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.png$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadPNG( tmpPath, file.name,  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.bmp$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadBMP( tmpPath, file.name,  );
                                                        }
                                                    }
                                                }
                                            } );
    fileSelector.click();
}

//////////////////////////////////////////////////////////////////////////////
function sceneExportSelected()
{
    editor.exportSelected();
}
