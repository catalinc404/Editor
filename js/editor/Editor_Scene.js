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

                                if( callback != null )
                                {
                                    callback( object );
                                }
                            } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.postLoadFBX = function ( object )
{
    editor.resetObjectXForm( object );

    if( object.children.length > 0 )
    {
        var child = object.children[0];
        if( child instanceof THREE.Mesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;

            

            //TODO
            var materialParameters = 
            {
                color: 0xFFFFFF,
                roughness: 0.5,
                metalness: 0.5,
            }

            child.material = new THREE.MeshStandardMaterial( materialParameters );
            child.material.name = child.name + "_StandardMaterial";
        }
    }

    editor.sceneObjectAdd( object );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadPLYMesh = function ( path, objectName, callback )
{
    var plyLoader = new THREE.PLYLoader();
    plyLoader.load( path, callback );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadGLTF = function ( path, objectName, callback )
{
    var gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load( path,  function( gltf ) 
                            { 
                                if( callback != null )
                                {
                                    callback( gltf );
                                }
                            },
                            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
                            function ( error ) { messageBox( { title: "loadGLTF", contents: "<br>ERROR: Failed to load object<br><br>", type: EMessageBox.OK }); } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.postLoadGLTF = function ( object )
{
    if( object.scene.children.length > 0 )
    {
        var child = object.scene.children[0];
        if( child instanceof THREE.Mesh )
        {
            child.castShadow = true;
            child.receiveShadow = true;

            if( child.material instanceof THREE.MeshStandardMaterial )
            {
                child.material.normalScale.y = -child.material.normalScale.y;
            }
            else
            {
                if( child.material instanceof Array )
                {
                    var length = child.material.length;
                    for( var i = 0; i < length; ++i )
                    {
                        if( child.material[ i ] instanceof THREE.MeshStandardMaterial )
                        {
                            child.material[ i ].normalScale.y = -child.material[ i ].normalScale.y;
                        }
                    }
                }
            }
        }

        editor.sceneObjectAdd( object.scene.children[0] );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadPLYMesh = function ( path, objectName, callback )
{
    var plyLoader = new THREE.PLYLoader();
    plyLoader.load( path, callback );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveGLB = function ( object, fileName )
{
    var GLTFExporter = new THREE.GLTFExporter();
    GLTFExporter.parse( this.selection.object.object,   function( result )
                                                        {
                                                            var blob = new Blob( [result], { type: "application/octet-stream" } );
                                                            saveAs( blob, fileName );
                                                        }, { binary: true } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.saveGLTF = function ( object, fileName )
{
    var GLTFExporter = new THREE.GLTFExporter();
    GLTFExporter.parse( this.selection.object.object,   function( result )
                                                        {
                                                            var output = stringify( result, null, 2 );
                                                            var blob = new Blob( [ output ], { type: "text/plain" } );
                                                            console.log( "blob size: " + blob.size );
                                                            saveAs( blob, fileName );
                                                            console.log( "Saved!" );
                                                        }, { binary: true } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneNew = function ()
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.deselect( this.getSelection() );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.selection = {  object: null, material: null, geometry: null };
    this.objectTransformMode  = ETransformMode.TRANSLATE;
    this.objectTransformSpace = ETransformSpace.GLOBAL;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var objectsCount = this.sceneObjects.length;
    var objects = [];
    for( var i = 0; i < objectsCount; ++i )
    {
        objects.push( this.sceneObjects[ i ].object );
    }
    for( var i = objectsCount - 1; i >= 0; --i )
    {
        this.sceneObjectRemove( objects[ i ] );
    }
    this.sceneObjects = [];
    this.sceneObjectsId = 0;
    this.sceneObjectCreationId = 0;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(var materialId in this.materials )
    {
        if( this.materials.hasOwnProperty( materialId ) )
        {
            this.removeMaterial( parseInt( materialId ) );
        }
    }

    this.eventDispatcher.dispatchEvent( "onSceneMaterialRemoved", { materialId: this.materialsParentId } );
    
    this.materials = {};
    this.materialsId = 200000;
    this.materialsParentId = 200000;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(var geometryId in this.geometries )
    {
        if( this.geometries.hasOwnProperty( geometryId ) )
        {
            this.removeGeometry( parseInt( geometryId ) );
        }
    }
    
    this.eventDispatcher.dispatchEvent( "onSceneGeometryRemoved", { geometryId: this.geometriesParentId } );

    this.geometries = {};
    this.geometriesId = 100000;
    this.geometriesParentId = 100000;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.doUndoManager.clearCommands();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.init();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneNewDefault = function ()
{
    this.sceneNew();
    createDefaultScene( this );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.exportSelected = function()
{
    if( this.selection.object != null )
    {
        this.saveGLB( this.selection.object.object, this.selection.object.object.name + ".glb" );
    }
    else
    {
        messageBox( { title: "Export object", contents: "<br>ERROR: No object selected<br><br>", type: EMessageBox.OK });
    }
}

//////////////////////////////////////////////////////////////////////////////
function sceneOpen() 
{
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
                                                        if( file.name.match(/\.(fbx|FBX)$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadFBX( tmpPath, file.name, editor.postLoadFBX );
                                                        }
                                                        else
                                                        if( file.name.match(/\.obj$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadOBJ( tmpPath, file.name  );
                                                        }
                                                        else
                                                        if( file.name.match(/\.(gltf|glb)$/) ) 
                                                        {
                                                            var tmpPath = URL.createObjectURL( file );
                                                            editor.loadGLTF( tmpPath, file.name, editor.postLoadGLTF );
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
