var editor = undefined;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Editor( eventDispatcher, UIData )
{
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    this.eventDispatcher = eventDispatcher;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    UI.call( this, UIData );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scene = undefined;
    this.textureLoader = new THREE.TextureLoader();
    this.defaultTexture = undefined;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.scenePicking = undefined;
    this.sceneHelpers = undefined;
    this.scenePicking = undefined;
    this.sceneHUD     = undefined;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.views = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.sceneObjectsId = 1;
    this.sceneObjects = [];
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.selection = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "render",                   this.render.bind( this ) );

    this.eventDispatcher.addEventListener( "onViewCreated",            this.onViewCreated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",   this.onSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected", this.onSceneObjectsDeselected.bind( this ) );

    editor = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype = Object.assign( Object.create( UI.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: Editor
} );


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.init = function() 
{
    this.defaultTexture = this.textureLoader.load( "textures/UV_Grid_Sm.jpg", this.render.bind( this ) );

    this.scene = new THREE.Scene( { name: "Scene" } );
    this.sceneHelpers = new THREE.Scene();
    this.scenePicking = new THREE.Scene();

    this.sceneHUD = new THREE.Scene();
    this.eventDispatcher.dispatchEvent( "onSceneCreated", this.scene );

    this.initDefaultScene();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.initDefaultScene = function()
{
    var helper = new THREE.GridHelper( 100, 40 );
    helper.position.x = 0;
    helper.position.y = -1;
    helper.position.z = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.sceneHelpers.add( helper );

    var ambientLight = new THREE.AmbientLight( 0x222222 );
    ambientLight.name = "ambientLight";
    this.addSceneObject( ambientLight );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.render = function()
{
    for( var i = 0; i < this.selection.length; ++i )
    {
        for( var j = 0; j < this.selection[i].helpers.length; ++j )
        {
            var helper = this.selection[i].helpers[j];
            if( helper instanceof THREE.BoxHelper )
            {
                helper.update();
            }
        }
    }

    this.scene.updateMatrixWorld();
    this.sceneHelpers.updateMatrixWorld();

    var view;
    for( var i = 0; i < this.views.length; ++i )
    {
        var view = this.views[i];
        if( view != null )
        {
            view.requestRender();
        }        
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.addSceneObject = function( object, dontAddToScene  )
{
    var editorObject = { id: this.sceneObjectsId++ };

    object.updateMatrixWorld();

    if( !dontAddToScene )
    {
        this.scene.add( object );
    }

    editorObject.object = object;
    editorObject.helpers = [];
    
    if( object instanceof THREE.Mesh )
    {
        object.castShadow = true;
        object.receiveShadow = true;

        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        editorObject.helpers.push( selectionHelper );

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrix = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }
    else
    if( object instanceof THREE.Camera )
    {
        editorObject.helpers.push( new THREE.CameraHelper( object ) );
    }
    else
    if( object instanceof THREE.PointLight )
    {
        object.castShadow = true;

        editorObject.helpers.push( new THREE.PointLightHelper( object ) );
    }
    else
    if( object instanceof THREE.DirectionalLight )
    {
        object.castShadow = true;
        
        editorObject.helpers.push( new THREE.DirectionalLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SpotLight )
    {
        object.castShadow = true;

        var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        var objectPicking = new THREE.Mesh( new THREE.TetrahedronGeometry( 0.6, 0 ), objectPickingMaterial );
        objectPicking.matrix = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        var selectionHelper = new THREE.BoxHelper( objectPicking );
        selectionHelper.visible = false;
        editorObject.helpers.push( selectionHelper );

        var spotLightHelper1 = new THREE.Mesh(  new THREE.TetrahedronGeometry( 0.6, 0 ), new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
        spotLightHelper1.matrix = object.matrixWorld;
        spotLightHelper1.matrixAutoUpdate = false;
        editorObject.helpers.push( spotLightHelper1 );

        var spotLightHelper2 = new THREE.SpotLightHelper( object );
        editorObject.helpers.push( spotLightHelper2 );
     }
    else
    if( object instanceof THREE.HemisphereLight )
    {
        object.castShadow = true;

        editorObject.helpers.push( THREE.HemisphereLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SkinnedMesh )
    {
        object.castShadow = true;
        object.receiveShadow = true;

        editorObject.helpers.push( new THREE.SkeletonHelper( object ) );
    }

    if( editorObject.helpers.length > 0 )
    {
        for( var i = 0; i < editorObject.helpers.length; ++i )
        {
            this.sceneHelpers.add( editorObject.helpers[i] );
        }
    }
 
    this.sceneObjects.push( editorObject );

    this.eventDispatcher.dispatchEvent( "onSceneObjectAdded", object );
  
    for( var i = 0; i < object.children.length; ++i )
    {
        this.addSceneObject( object.children[i], true );
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getEditorObjectsfromEditorIds = function ( editorObjectsIds )
{
    var editorObjects = [];
    for( var i = 0; i < editorObjectsIds.length; ++i ) 
    {
        for( var j = 0; j < this.sceneObjects.length; ++j ) 
        {
            if( this.sceneObjects[j].id == editorObjectsIds[i] )
            {
                editorObjects.push( this.sceneObjects[j] );
                break;
            }
        }
    }

    return editorObjects;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.selectObjects = function ( editorObjects )
{
    if( this.selection.length > 0 )
    {
        this.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", [this.selection[0].object] );
    }

    if( editorObjects.length > 0 )
    {
        this.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", [editorObjects[0].object] );
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.selectObjectsFromEditorIds = function ( editorObjectsIds )
{
    var editorObjects = this.getEditorObjectsfromEditorIds( editorObjectsIds )
    this.selectObjects( (editorObjects.length > 0) ? editorObjects : [] );
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsSelected = function( objects )
{
    var selectedObject = objects[0];

    for( var i = 0; i < this.sceneObjects.length; ++i ) 
    {
        if( this.sceneObjects[i].object == selectedObject )
        {
            this.selection.push( this.sceneObjects[i] );
            break;
        }
    }

    for( var i = 0; i < this.selection.length; ++i )
    {
        if( this.selection[i].helpers.length > 0 )
        {
            this.selection[i].helpers[0].visible = true;
        }
    }

    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsDeselected = function( objects )
{
    for( var i = 0; i < this.selection.length; ++i )
    {
        if( this.selection[i].helpers.length > 0 )
        {
            this.selection[i].helpers[0].visible = false;
        }
    }

    this.selection.length = 0;
    
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onViewCreated = function( view )
{
    this.views.push( view );
    if( view instanceof View )
    {
        view.init( this );
    }
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

                                editor.addSceneObject( object );
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
                                editor.addSceneObject( object );
                            } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Editor.prototype.loadOBJ = function ( path, objectName )
{
    var basePath = path.substr(0, path.lastIndexOf( "/" ) + 1 );
    var name = path.substr( path.lastIndexOf( "/" ) + 1 )
    name = name.substr(0, name.lastIndexOf( "." ));

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( basePath );
    mtlLoader.load( name + ".mtl", function( materials ) 
    {
		materials.preload();

        var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( basePath );
        objLoader.load( name + ".obj", function ( object ) 
        {
            object.name = name;
            editor.addSceneObject( object );
        } );
	} );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////