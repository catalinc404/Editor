
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyView( eventDispatcher, element ) 
{
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    this.element = element;
    this.scrollbarVVisible = false;
   
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectSelected",         this.onSceneObjectSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeselected",       this.onSceneObjectDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialSelected",       this.onSceneMaterialSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialDeselected",     this.onSceneMaterialDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometrySelected",       this.onSceneGeometrySelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometryDeselected",     this.onSceneGeometryDeselected.bind( this ) );
    
    this.eventDispatcher.addEventListener( "onComponentPropertyChanged",    this.onComponentPropertyChanged.bind( this ) );

    //////////////////////////////////////////////////////////////////////////////
    this.fnRequestRender = this.requestRender.bind( this );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
PropertyView.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: PropertyView,
} );

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onresize = function()
{
    var rectangle = {};

    rectangle.left    = parseInt( this.element.style.left,   10 ) || 0;
    rectangle.top     = parseInt( this.element.style.top,    10 ) || 0;
    rectangle.width   = parseInt( this.element.style.width,  10 ) || 0;
    rectangle.height  = parseInt( this.element.style.height, 10 ) || 0;
    if( this.element.parentElement != null )
    {
        rectangle.width = parseInt( this.element.parentElement.style.width,  10 ) || rectangle.width;
    }

    setElementSize(  this.element, rectangle.left, rectangle.top, rectangle.width, rectangle.height );

    if( this.gui !== undefined )
    {
        this.gui.width =  rectangle.width; 
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onPropertiesPanelResize = function()
{
    if( this.gui !== undefined )
    {
        if( this.gui.domElement.scrollHeight > this.gui.domElement.clientHeight )
        {
            if( this.scrollbarVVisible = true )
            {
                this.gui.width = this.gui.width - 16;
                this.scrollbarVVisible = true;
            }
        }
        else
        {
            if( this.scrollbarVVisible == true )
            {
                this.gui.width = this.gui.width + 16;
                this.scrollbarVVisible = false;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneObjectSelected = function( objectId )
{
    var propertiesSet = false;    
    if( objectId != null )
    {
        var object = this.eventDispatcher.runCommand( "getObjectFromEditorId", objectId );
        if( object != null )
        {
            propertiesSet = this.setProperties( { id: objectId, object: object } );
        }
    }

    if( propertiesSet == false )
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneObjectDeselected = function( objectId )
{
    this.clearProperties();
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneMaterialSelected = function( materialId )
{
    var propertiesSet = false;
    if( materialId != null )
    {
        var material = this.eventDispatcher.runCommand( "getMaterialFromEditorId", materialId );
        if( material != null )
        {
            propertiesSet = this.setProperties( { id: materialId, material: material } );
        }
    }

    if( propertiesSet == false )
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneMaterialDeselected = function( materialId )
{
    this.clearProperties();
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneGeometrySelected = function( geometryId )
{
    var propertiesSet = false;
    if( geometryId != null )
    {
        var geometry = this.eventDispatcher.runCommand( "getGeometryFromEditorId", geometryId );
        if( geometry != null )
        {
            propertiesSet = this.setProperties( { id: geometryId, geometry: geometry } );
        }
    }

    if( propertiesSet == false )
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneGeometryDeselected = function( geometryId )
{
    this.clearProperties();
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onComponentPropertyChanged = function( data )
{
    if( ( this.objectData != null ) && ( this.objectData.id === data.id ) )
    {
        this.setProperties( this.objectData );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setProperties = function( objectData )
{
    this.objectData = objectData;

    if( objectData.object != null )
    {
        this.setObjectProperties( objectData.id, objectData.object );
    }
    else
    if( objectData.material != null )
    {
        this.setMaterialProperties( objectData.id, objectData.material );
    }
    else
    if( objectData.geometry != null )
    {
        this.setGeometryProperties( objectData.id, objectData.geometry );
    }
    else
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.clearProperties = function()
{
    if( this.gui != null )
    {
        for( var i = 0; i < this.element.childNodes.length; ++i )
        {
            this.element.removeChild( this.element.childNodes[i] );
        }

        this.gui.destroy();
        this.gui = undefined;
    }

    this.objectData = null;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMapGUI = function( gui, map, callback )
{
    if( map != null )
    {
        gui.add( map, "name" );
        if( map.image != null )
        {
            gui.add( map.image, "src" ).onChange( callback );
        }
        else
        {
            gui.add( { image: "none" }, "image" );
        }
    }
    else
    {
        gui.add( { map: "none" }, "map" );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createTextureGUI = function( gui, material, textureName, callback, folderName )
{
    var _this = this;

    //TODO: remove this and add it to Editor_scene
    var textureGUIButtons =
    [ 
        { 
            name : "Remove",
            class : "",
            style: "float: right; margin-right: 16px; margin-top: 3px;",
            span: 
            { 
                class: "icon-trash icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() 
            { 
                console.log( "PropertyView.createTextureGUI.remove" );

                material[ textureName ] = undefined;
                callback();

                return true;
            }
        },
        { 
            name : "Open",
            class : "",
            style: "float: right; margin-right: 6px; margin-top: 3px;",
            span: 
            { 
                class: "icon-file-directory icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() 
            { 
                console.log( "PropertyView.createTextureGUI.open" );

                var fileSelector = document.createElement( "input" );
                fileSelector.type = 'file';
                fileSelector.addEventListener('change', function( event ) 
                                                        {
                                                            if( event.target.files.length > 0 )
                                                            {
                                                                //TODO: use Editor_Scene
                                                                var file = event.target.files[0];
                                                                if( file.name.match(/\.(png|jpg|tga|TGA)$/) ) 
                                                                {
                                                                    var name = file.name.substr( file.name.lastIndexOf( "/" ) + 1 )
                                                                    name = name.substr(0, name.lastIndexOf( "." ));

                                                                    var tmpPath = URL.createObjectURL( file );
                                                                    var texture = new THREE.TextureLoader().load( tmpPath, function()
                                                                                                                            {
                                                                                                                                texture.name = name;
                                                                                                                                material[ textureName ] = texture;
                                                                                                                                _this.createTextureGUI( gui, material, textureName, callback );
                                                                                                                                
                                                                                                                                callback();
                                                                                                                            } );
                                                                }
                                                            }
                                                        } );
                fileSelector.click();

                return true;
            }
        },
    ]

    var beforeElement = null;
    if( gui.__folders[ "Texture" ] != null )
    {
        var folder = gui.__folders[ "Texture" ];

        var length = gui.domElement.children[0].children.length;
        for( var i = 0; i < length; ++i )
        {
            if( gui.domElement.children[ 0 ].children[ i ] === folder.domElement.parentElement )
            {
                beforeElement = ( i + 1 < length ) ? gui.domElement.children[ 0 ].children[ i + 1 ] : null;
            }
        }

        gui.removeFolder( folder );
    }

    var textureGUI = gui.addFolder( folderName || "Texture", textureGUIButtons, beforeElement );
    var texture = material[ textureName ];

    if( texture != null )
    {
        textureGUI.add( texture, "name" );
        if( texture.image != null )
        {
            textureGUI.add( texture.image, "src" ).onChange( callback );
        }
        else
        {
            textureGUI.add( { image: "none" }, "image" );
        }

        textureGUI.add( texture, "mapping",  { UVMapping: 300, CubeReflectionMapping: 301, CubeRefractionMapping: 302, 
                                               EquirectangularReflectionMapping: 303, EquirectangularRefractionMapping: 304, 
                                               SphericalReflectionMapping: 305, CubeUVReflectionMapping: 306, 
                                               CubeUVRefractionMapping: 307
                                             } ).onChange( function( newValue ) { texture.mapping = parseInt( newValue); callback(); } );

        textureGUI.add( texture, "wrapS",  {  Repeat: 1000, ClampToEdge: 1001, MirroredRepeat: 1002 } ).onChange( function( newValue ) 
                                                                                                                  {
                                                                                                                       texture.wrapS = parseInt( newValue); 
                                                                                                                       callback();
                                                                                                                  } );
        textureGUI.add( texture, "wrapT",  {  Repeat: 1000, ClampToEdge: 1001, MirroredRepeat: 1002 } ).onChange( function( newValue ) 
                                                                                                                  {
                                                                                                                      texture.wrapT = parseInt( newValue); 
                                                                                                                      callback();
                                                                                                                  } );

        textureGUI.add( texture, "magFilter",  { Nearest: 1003, Linear: 1006 } ).onChange( function( newValue ) { texture.magFilter = parseInt( newValue); callback(); } );
        textureGUI.add( texture, "minFilter",  { Nearest: 1003, NearestMipMapNearest: 1004, NearestMipMapLinear: 1005, Linear: 1006, 
                                                LinearMipMapNearest: 1007, LinearMipMapLinearNearest: 1008 } ).onChange( function( newValue ) { texture.minFilter = parseInt( newValue); callback(); } );

        textureGUI.add( texture, "anisotropy" ).min( 1 ).onChange( callback );

        textureGUI.add( texture, "format", { Alpha: 1021, RGB: 1022, RGBA: 1023, Luminance: 1024, LuminanceAlpha: 1025, 
                                             RGBE: 1026, Depth: 1027, DepthStencil: 1028 } ).onChange( function( newValue ) { texture.format = parseInt( newValue); callback(); } );
        textureGUI.add( texture, "type", { UnsignedByte: 1009, Byte: 1009, Short: 1009, UnsignedShort: 1009, Int: 1009,
                                           UnsignedInt: 1009, Float: 1009, HalfFloat: 1009, UnsignedShort4444: 1009,
                                           UnsignedShort5551: 1009, UnsignedShort565: 1009, UnsignedInt248: 1009 } ).onChange( function( newValue ) { texture.type = parseInt( newValue); callback(); } );

        var offsetGUI = textureGUI.addFolder( "Offset" );
        offsetGUI.add( texture.offset, "x" ).onChange( callback );
        offsetGUI.add( texture.offset, "y" ).onChange( callback );

        var repeatGUI = textureGUI.addFolder( "Repeat" );
        repeatGUI.add( texture.repeat, "x" ).onChange( callback );
        repeatGUI.add( texture.repeat, "y" ).onChange( callback );

        textureGUI.add( texture, "rotation" ).min( -3.1417 ).max( 3.1417 ).onChange( callback );

        var centerGUI = textureGUI.addFolder( "Center" );
        centerGUI.add( texture.center, "x" ).min( 0 ).max( 1.0 ).onChange( callback );
        centerGUI.add( texture.center, "y" ).min( 0 ).max( 1.0 ).onChange( callback );

        textureGUI.add( texture, "matrixAutoUpdate" ).onChange( callback );
        textureGUI.add( texture, "generateMipmaps" ).onChange( callback );
        textureGUI.add( texture, "premultiplyAlpha" ).onChange( callback );
        textureGUI.add( texture, "flipY" ).onChange( callback );
        textureGUI.add( texture, "unpackAlignment" ).min( 1 ).onChange( callback );

        textureGUI.add( texture, "encoding", { LinearEncoding: 3000, sRGBEncoding: 3001, GammaEncoding: 3002, RGBEEncoding: 3003,
                                               LogLuvEncoding: 3004, RGBM7Encoding: 3005, RGBM16Encoding: 3006, RGBDEncoding: 3007,
                                               BasicDepthPacking: 3008, RGBADepthPacking: 3009 } ).onChange( function( newValue ) 
                                                                                                             { 
                                                                                                                texture.encoding = parseInt( newValue );
                                                                                                                callback();
                                                                                                             } );
        textureGUI.add( { refresh : function() { texture.needsUpdate = true; callback(); } }, "refresh" );
    }
    else
    {
        textureGUI.add( { image: "none" }, "image" );
    }

    return textureGUI;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createNodeTextureGUI = function( gui, nodeTexture, callback, textureName )
{
    var _this = this;

    //TODO: remove this and add it to Editor_scene
    var textureGUIButtons =
    [ 
        { 
            name : "Remove",
            class : "",
            style: "float: right; margin-right: 16px; margin-top: 3px;",
            span: 
            { 
                class: "icon-trash icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() 
            { 
                console.log( "PropertyView.createNodeTextureGUI.remove" );

                nodeTexture.value = undefined;
                callback();

                return true;
            }
        },
        { 
            name : "Open",
            class : "",
            style: "float: right; margin-right: 6px; margin-top: 3px;",
            span: 
            { 
                class: "icon-file-directory icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() 
            { 
                console.log( "PropertyView.createNodeTextureGUI.open" );

                var fileSelector = document.createElement( "input" );
                fileSelector.type = 'file';
                fileSelector.addEventListener('change', function( event ) 
                                                        {
                                                            if( event.target.files.length > 0 )
                                                            {
                                                                //TODO: use Editor_Scene
                                                                var file = event.target.files[0];
                                                                if( file.name.match(/\.(png|jpg|tga|TGA)$/) ) 
                                                                {
                                                                    var name = file.name.substr( file.name.lastIndexOf( "/" ) + 1 )
                                                                    name = name.substr(0, name.lastIndexOf( "." ));

                                                                    var tmpPath = URL.createObjectURL( file );
                                                                    var texture = new THREE.TextureLoader().load( tmpPath, function()
                                                                                                                            {
                                                                                                                                texture.name = name;
                                                                                                                                nodeTexture.value = texture;
                                                                                                                                _this.createNodeTextureGUI( gui, nodeTexture, textureName, callback );
                                                                                                                                
                                                                                                                                callback();
                                                                                                                            } );
                                                                }
                                                            }
                                                        } );
                fileSelector.click();

                return true;
            }
        },
    ]

    var beforeElement = null;
    if( gui.__folders[ "Texture" ] != null )
    {
        var folder = gui.__folders[ "Texture" ];

        var length = gui.domElement.children[0].children.length;
        for( var i = 0; i < length; ++i )
        {
            if( gui.domElement.children[ 0 ].children[ i ] === folder.domElement.parentElement )
            {
                beforeElement = ( i + 1 < length ) ? gui.domElement.children[ 0 ].children[ i + 1 ] : null;
            }
        }

        gui.removeFolder( folder );
    }

    var textureGUI = gui.addFolder( textureName || "Texture", textureGUIButtons, beforeElement );
    var texture = nodeTexture.value;

    if( texture != null )
    {
        textureGUI.add( texture, "name" );
        if( texture.image != null )
        {
            textureGUI.add( texture.image, "src" ).onChange( callback );
        }
        else
        {
            textureGUI.add( { image: "none" }, "image" );
        }

        textureGUI.add( texture, "mapping",  { 
                                               UVMapping: 300, CubeReflectionMapping: 301, CubeRefractionMapping: 302, 
                                               EquirectangularReflectionMapping: 303, EquirectangularRefractionMapping: 304, 
                                               SphericalReflectionMapping: 305, CubeUVReflectionMapping: 306, 
                                               CubeUVRefractionMapping: 307
                                              } ).onChange( function( newValue ) { texture.mapping = parseInt( newValue); callback(); } );

        textureGUI.add( texture, "wrapS",  {  Repeat: 1000, ClampToEdge: 1001, MirroredRepeat: 1002 } ).onChange( function( newValue ) 
                                                                                                                {
                                                                                                                    texture.wrapS = parseInt( newValue); 
                                                                                                                    callback();
                                                                                                                } );
        textureGUI.add( texture, "wrapT",  {  Repeat: 1000, ClampToEdge: 1001, MirroredRepeat: 1002 } ).onChange( function( newValue ) 
                                                                                                                {
                                                                                                                    texture.wrapT = parseInt( newValue); 
                                                                                                                    callback();
                                                                                                                } );

        textureGUI.add( texture, "magFilter",  { Nearest: 1003, Linear: 1006 } ).onChange( function( newValue ) { texture.magFilter = parseInt( newValue); callback(); } );
        textureGUI.add( texture, "minFilter",  { Nearest: 1003, NearestMipMapNearest: 1004, NearestMipMapLinear: 1005, Linear: 1006, 
                                                LinearMipMapNearest: 1007, LinearMipMapLinearNearest: 1008 } ).onChange( function( newValue ) { texture.minFilter = parseInt( newValue); callback(); } );

        textureGUI.add( texture, "anisotropy" ).min( 1 ).onChange( callback );

        textureGUI.add( texture, "format", { Alpha: 1021, RGB: 1022, RGBA: 1023, Luminance: 1024, LuminanceAlpha: 1025, 
                                            RGBE: 1026, Depth: 1027, DepthStencil: 1028 } ).onChange( function( newValue ) { texture.format = parseInt( newValue); callback(); } );
        textureGUI.add( texture, "type", { UnsignedByte: 1009, Byte: 1009, Short: 1009, UnsignedShort: 1009, Int: 1009,
                                        UnsignedInt: 1009, Float: 1009, HalfFloat: 1009, UnsignedShort4444: 1009,
                                        UnsignedShort5551: 1009, UnsignedShort565: 1009, UnsignedInt248: 1009 } ).onChange( function( newValue ) { texture.type = parseInt( newValue); callback(); } );

        var  updateUVTansformCallback = callback;                                       
        if( nodeTexture.uv instanceof THREE.UVTransformNode )
        {
            updateUVTansformCallback = function()
            {
                nodeTexture.uv.setUvTransform( texture.offset.x, texture.offset.y, texture.repeat.x, texture.repeat.y, texture.rotation, texture.center.x, texture.center.y );
                callback();
            }
        }

        var offsetGUI = textureGUI.addFolder( "Offset" );
        offsetGUI.add( texture.offset, "x" ).min( -1.0 ).max( 1.0 ).step( 0.00001 ).onChange( updateUVTansformCallback );
        offsetGUI.add( texture.offset, "y" ).min( -1.0 ).max( 1.0 ).step( 0.00001 ).onChange( updateUVTansformCallback );

        var repeatGUI = textureGUI.addFolder( "Repeat" );
        repeatGUI.add( texture.repeat, "x" ).onChange( updateUVTansformCallback );
        repeatGUI.add( texture.repeat, "y" ).onChange( updateUVTansformCallback );

        var proxyRotation = { rotation: THREE.Math.radToDeg( texture.rotation ) };
        textureGUI.add( proxyRotation, "rotation" ).min( -360 ).max( 360 ).onChange( function( newValue )
        {
            texture.rotation = THREE.Math.degToRad( newValue );
            nodeTextureUVUpdater();
        } );

        var centerGUI = textureGUI.addFolder( "Center" );
        centerGUI.add( texture.center, "x" ).min( 0 ).max( 1.0 ).onChange( updateUVTansformCallback );
        centerGUI.add( texture.center, "y" ).min( 0 ).max( 1.0 ).onChange( updateUVTansformCallback );

        textureGUI.add( texture, "matrixAutoUpdate" ).onChange( callback );
        textureGUI.add( texture, "generateMipmaps" ).onChange( callback );
        textureGUI.add( texture, "premultiplyAlpha" ).onChange( callback );
        textureGUI.add( texture, "flipY" ).onChange( callback );
        textureGUI.add( texture, "unpackAlignment" ).min( 1 ).onChange( callback );

        textureGUI.add( texture, "encoding", { LinearEncoding: 3000, sRGBEncoding: 3001, GammaEncoding: 3002, RGBEEncoding: 3003,
                                            LogLuvEncoding: 3004, RGBM7Encoding: 3005, RGBM16Encoding: 3006, RGBDEncoding: 3007,
                                            BasicDepthPacking: 3008, RGBADepthPacking: 3009 } ).onChange( function( newValue ) 
                                                                                                            { 
                                                                                                                texture.encoding = parseInt( newValue );
                                                                                                                callback();
                                                                                                            } );
        textureGUI.add( { refresh : function() { texture.needsUpdate = true; callback(); } }, "refresh" );
    }
    else
    {
        textureGUI.add( { image: "none" }, "image" );
    }

    return textureGUI;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createNodeMaterialGUI = function( gui, material, properties, callback )
{
    if( properties.type == "folder" )
    {
        var nodeMaterialGUI = gui.addFolder( properties.name );

        var propertiesLength = properties.properties.length;
        for( var i = 0; i < propertiesLength; ++i )
        {
            let property = properties.properties[ i ];

            switch( property.type )
            {
                case "float":
                case "int":
                case "bool":
                case "text":
                {
                    nodeMaterialGUI.add( property.object, property.field ).name( property.name ).onChange( callback );
                }
                break;
                case "nodeTexture":
                {
                    this.createNodeTextureGUI( nodeMaterialGUI, property.object, callback, property.name );
                }
                break;
                case "boolFloat":
                {
                    var propertyValue = ( property.object[ property.field ] > 0.0 ) ? true : false;
                    var propertyName = property.name;

                    var proxyObject = {};
                    proxyObject[ propertyName ] = propertyValue;

                    nodeMaterialGUI.add( proxyObject, propertyName ).onChange( 
                        function( newValue )
                        {
                            property.object[ property.field ] = ( newValue == false ) ? 0.0 : 1.0;
                            callback();
                        } );
                }
                break;
                case "color":
                {
                    nodeMaterialGUI.addColor( property.object, property.field ).name( property.name ).onChange( callback );
                }
                break;
                case "folder":
                {
                    this.createNodeMaterialGUI( nodeMaterialGUI, material, property, callback );
                }
                break;
                default:
                {
                    console.log( "undefined property type" );
                }
                break;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMeshStandardMaterialGUI = function( gui, material, callback )
{
    var standardMaterialGUI = gui.addFolder( "Mesh Standard Material" );

    var diffuseMapGUI = standardMaterialGUI.addFolder( "diffuse" );
    diffuseMapGUI.addColor( material, "color" ).onChange( callback );
    this.createTextureGUI( diffuseMapGUI, material, "map", callback );

    var alphaMapGUI = standardMaterialGUI.addFolder( "alphaMap" );
    this.createTextureGUI( alphaMapGUI, material, "alphaMap", callback );

    var aoMapGUI = standardMaterialGUI.addFolder( "aoMap" );
    aoMapGUI.add( material, "aoMapIntensity" ).min( 0 ).onChange( callback );            
    this.createTextureGUI( aoMapGUI, material, "aoMap", callback );

    var bumpMapGUI = standardMaterialGUI.addFolder( "bumpMap" );
    bumpMapGUI.add( material, "bumpScale" ).min( 0 ).max( 1 ).onChange( callback );
    this.createTextureGUI( bumpMapGUI, material, "bumpMap", callback );

    var displacementMapGUI = standardMaterialGUI.addFolder( "displacementMap" );
    displacementMapGUI.add( material, "displacementScale" ).onChange( callback ); 
    displacementMapGUI.add( material, "displacementBias" ).onChange( callback ); 
    this.createTextureGUI( displacementMapGUI, material, "displacementMap", callback );

    var emissiveGUI = standardMaterialGUI.addFolder( "emissive" );
    emissiveGUI.addColor( material, "emissive" ).onChange( callback ); 
    emissiveGUI.add( material, "emissiveIntensity" ).onChange( callback );
    this.createTextureGUI( emissiveGUI, material, "emissiveMap", callback );

    var envMapGUI = standardMaterialGUI.addFolder( "envMap" );
    envMapGUI.add( material, "envMapIntensity" ).onChange( callback );
    this.createTextureGUI( envMapGUI, material, "envMap", callback );

    var lightMapGUI = standardMaterialGUI.addFolder( "lightMap" );
    lightMapGUI.add( material, "lightMapIntensity" ).onChange( callback );
    this.createTextureGUI( lightMapGUI, material, "lightMap", callback );

    var metalnessMapGUI = standardMaterialGUI.addFolder( "metalnessMap" );
    metalnessMapGUI.add( material, "metalness" ).onChange( callback );
    this.createTextureGUI( metalnessMapGUI, material, "metalnessMap", callback );

    var roughnessMapGUI = standardMaterialGUI.addFolder( "roughnessMap" );
    roughnessMapGUI.add( material, "roughness" ).onChange( callback );
    this.createTextureGUI( roughnessMapGUI, material, "roughnessMap", callback );

    var normalMapGUI = standardMaterialGUI.addFolder( "normalMap" );
    var normalScaleGUI = normalMapGUI.addFolder( "normalScale" );
    normalScaleGUI.add( material.normalScale, "x" ).onChange( callback );
    normalScaleGUI.add( material.normalScale, "y" ).onChange( callback );
    this.createTextureGUI( normalMapGUI, material, "normalMap", callback );

    standardMaterialGUI.add( material, "refractionRatio" ).max( 1 ).onChange( callback );

    var wireframeGUI = standardMaterialGUI.addFolder( "wireframe" );
    wireframeGUI.add( material, "wireframe" ).onChange( callback );
    wireframeGUI.add( material, "wireframeLinecap", ["butt", "round", "square"] ).onChange( callback );
    wireframeGUI.add( material, "wireframeLinejoin", ["round", "bevel", "miter"] ).onChange( callback );
    wireframeGUI.add( material, "wireframeLinewidth" ).onChange( callback );

    standardMaterialGUI.add( material, "skinning" ).onChange( callback );

    standardMaterialGUI.add( material, "morphNormals" ).onChange( callback );
    standardMaterialGUI.add( material, "morphTargets" ).onChange( callback );
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMeshPhysicalMaterialGUI = function( gui, material, callback )
{
    var physicallMaterialGUI = gui.addFolder( "Mesh Physical Material Material" );

    physicallMaterialGUI.add( material, "clearCoat" ).min( 0 ).max( 1 ).onChange( callback );
    physicallMaterialGUI.add( material, "clearCoatRoughness" ).min( 0 ).max( 1 ).onChange( callback );
    physicallMaterialGUI.add( material, "reflectivity" ).min( 0 ).max( 1 ).onChange( callback );

    this.createMeshStandardMaterialGUI( gui, material, callback );
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createStandardNodeMaterialGUI = function( gui, material, callback )
{
    var standardNodeMaterialGUI = gui.addFolder( "Standard Node Material" );
    this.createNodeMaterialGUI( standardNodeMaterialGUI, material, material.userData["properties"], callback ); 
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createCommonMaterialGUI = function( gui, material, callback )
{
    gui.add( material, "fog" ).onChange( callback );
    gui.add( material, "lights" ).onChange( callback );

    gui.add( material, "blending",  { 
                                        NoBlending: THREE.NoBlending, 
                                        NormalBlending: THREE.NormalBlending, 
                                        AdditiveBlending: THREE.AdditiveBlending,
                                        SubtractiveBlending: THREE.SubtractiveBlending,
                                        MultiplyBlending: THREE.MultiplyBlending,
                                        CustomBlending: THREE.CustomBlending 
                                    } ).onChange( callback );

    gui.add( material, "side", { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide } ).onChange( callback );
    gui.add( material, "flatShading" ).onChange( callback );
    gui.add( material, "vertexColors", { NoColors: THREE.NoColors, VertexColors: THREE.VertexColors, FaceColors: THREE.FaceColors } ).onChange( callback );

    gui.add( material, "opacity" ).min( 0.0 ).max( 1.0 ).onChange( callback );
    gui.add( material, "transparent" ).onChange( callback );
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMaterialGUI = function( gui, id, material )
{
    if( material !== undefined )
    {
        var renderFunction = this.fnRequestRender;
        var requestMateriaUpdate = function()
        {
            material.needsUpdate = true;
            renderFunction();
        };
        var requestNodeMateriaUpdate = function()
        {
            renderFunction();
        };

        var _this = this;
        var materialGUI = gui;

        materialGUI.add( material, "name" ).onChange( function( newValue ) 
                                                      { 
                                                          _this.eventDispatcher.dispatchEvent( "onSceneMaterialPropertyChanged", 
                                                                                               { id: id, property: "name", value: newValue } );
                                                      } );

        var materialGUI = gui;                                                      
        
        if( material instanceof THREE.MeshPhysicalMaterial )
        {
            this.createMeshPhysicalMaterialGUI( materialGUI, material, requestMateriaUpdate );
        }
        else
        if( material instanceof THREE.MeshStandardMaterial )
        {
            this.createMeshStandardMaterialGUI( materialGUI, material, requestMateriaUpdate );
        }
        else
        if( material instanceof THREE.StandardNodeMaterial )
        {
            this.createStandardNodeMaterialGUI( materialGUI, material, requestNodeMateriaUpdate );
        }
        else
        {
            console.log("unknown material type for: " + material );
        }

        //////////////////////////////////////////////////////////////////////////////
        //Base Material
        this.createCommonMaterialGUI( materialGUI, material, requestMateriaUpdate );

        //////////////////////////////////////////////////////////////////////////////
        //Defines 
        //this.createMaterialDefinesGUI( materialGUI, material, requestMateriaUpdate );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMaterialsGUI = function( gui, materials )
{
    if( materials instanceof Array )
    {
        var materialsGUI = gui.addFolder( "Materials" );

        var length = materials.length
        for( var i = 0; i < length; ++i ) 
        {
            var materialGUI = materialsGUI.addFolder( "Material" + ( i + 1 ) );

            var material = materials[i];
            var materialId = this.eventDispatcher.runCommand( "getEditorIdFromMaterial", material );

            this.createMaterialGUI( materialGUI, materialId, material );
        }
    }
    else
    if( materials instanceof THREE.Material )
    {
        var materialGUI = gui.addFolder( "Material" );

        var material = materials;
        var materialId = this.eventDispatcher.runCommand( "getEditorIdFromMaterial", material );

        this.createMaterialGUI( materialGUI, materialId, material );
    }
    else
    {
        console.log( "unknown type of material" );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createGeometryGUI = function( gui, id, geometry )
{
    if( geometry !== undefined )
    {
        var _this = this;
        var geometryGUI = gui;

        geometryGUI.add( geometry, "name" ).onChange( function( newValue ) 
                                                      { 
                                                          _this.eventDispatcher.dispatchEvent( "onSceneGeometryPropertyChanged", 
                                                                                               { id: id, property: "name", value: newValue } );
                                                      } );

        if( geometry instanceof THREE.Mesh )
        {
            //TODO:
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createLightGUI = function( gui, object )
{
    var lightGUI = gui.addFolder( "Light" );
    lightGUI.addColor( object, "color" ).onChange( this.fnColorChange );
    lightGUI.add( object, "intensity" ).onChange( this.fnRequestRender );

    if( object instanceof THREE.AmbientLight )
    {
        //No specific parameters
    }
    else
    if( object instanceof THREE.DirectionalLight )
    {
        var directionalLightGUI = lightGUI.addFolder( "Directional Light" );
        var targetGUI = directionalLightGUI.addFolder( "Target" );
        targetGUI.add( object.target.position, "x" ).onChange( this.fnRequestRender );
        targetGUI.add( object.target.position, "y" ).onChange( this.fnRequestRender );
        targetGUI.add( object.target.position, "z" ).onChange( this.fnRequestRender );
    }
    else
    if( object instanceof THREE.HemisphereLight )
    {
        var hemisphereLightGUI = lightGUI.addFolder( "Hemisphere Light" );
        hemisphereLightGUI.addColor( object, "groundColor" ).onChange( this.fnColorChange );                
    }
    else
    if( object instanceof THREE.PointLight )
    {
        var pointLightGUI = lightGUI.addFolder( "Point Light" );
        pointLightGUI.add( object, "power" ).onChange( this.fnRequestRender );
        pointLightGUI.add( object, "distance" ).onChange( this.fnRequestRender );
        pointLightGUI.add( object, "decay" ).onChange( this.fnRequestRender );
    }
    else          
    if( object instanceof THREE.SpotLight )
    {
        var spotLightGUI = lightGUI.addFolder( "Spot Light" );
        spotLightGUI.add( object, "power" ).onChange( this.fnRequestRender );
        spotLightGUI.add( object, "distance" ).onChange( this.fnRequestRender );
        spotLightGUI.add( object, "angle" ).onChange( this.fnRequestRender );
        spotLightGUI.add( object, "penumbra" ).onChange( this.fnRequestRender );
        spotLightGUI.add( object, "decay" ).onChange( this.fnRequestRender );
    }
    else
    if( object instanceof THREE.RectAreaLight )
    {
        var rectAreaLightGUI = lightGUI.addFolder( "RectArea Light" );
        rectAreaLightGUI.add( object, "width" ).onChange( this.fnRequestRender );
        rectAreaLightGUI.add( object, "height" ).onChange( this.fnRequestRender );
    }
    else
    {
        console.log("unknown light type for: " + object );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setObjectProperties = function( id, object )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    var _this = this;

    gui.add( object, "name" ).onChange( function( newValue ) 
                                        { 
                                            _this.eventDispatcher.dispatchEvent( "onSceneObjectPropertyChanged", 
                                                                                 { id: id, property: "name", value: newValue } );
                                        } );

    var controllerType = gui.add( object, "type" );
    controllerType.__input.readOnly = true;

    if( object instanceof THREE.Scene )
    {
    }
    else
    if( object instanceof THREE.Object3D )
    {
        if( object.visible !== undefined ) gui.add( object, "visible" ).onChange( this.fnRequestRender );
        if( object.castShadow !== undefined ) gui.add( object, "castShadow" ).onChange( this.fnRequestRender );
        if( object.receiveShadow !== undefined ) gui.add( object, "receiveShadow" ).onChange( this.fnRequestRender );

        
        var fnTransformChange = function() 
                                { 
                                    _this.eventDispatcher.dispatchEvent( "onSceneObjectPropertyChanged", { id: id, property: "transform", value: undefined } );
                                    _this.requestRender();
                                }
        var transformGUI = gui.addFolder( "Transform" );                                

        var positionGUI = transformGUI.addFolder( "Position" );
        positionGUI.add( object.position, "x" ).onChange( fnTransformChange );
        positionGUI.add( object.position, "y" ).onChange( fnTransformChange );
        positionGUI.add( object.position, "z" ).onChange( fnTransformChange );

        var rotationGUI = transformGUI.addFolder( "Rotation" );
        rotationGUI.add( object.rotation, "x" ).step( 0.001 ).onChange( fnTransformChange );
        rotationGUI.add( object.rotation, "y" ).step( 0.001 ).onChange( fnTransformChange );
        rotationGUI.add( object.rotation, "z" ).step( 0.001 ).onChange( fnTransformChange );

        var scaleGUI = transformGUI.addFolder( "Scale" );
        scaleGUI.add( object.scale, "x" ).min( Epsilon ).onChange( fnTransformChange );
        scaleGUI.add( object.scale, "y" ).min( Epsilon ).onChange( fnTransformChange );
        scaleGUI.add( object.scale, "z" ).min( Epsilon ).onChange( fnTransformChange );

        if( object instanceof THREE.Mesh )
        {
            this.createMaterialsGUI( gui, object.material );

            var geometry = object.geometry;
            var geometryId = this.eventDispatcher.runCommand( "getEditorIdFromGeometry", geometry );

            var geometryGUI = gui.addFolder( "Geometry" );
            this.createGeometryGUI( geometryGUI, geometryId, geometry );
        }
        else
        if( object instanceof THREE.Light )
        {
            this.createLightGUI( gui, object );
        }
    }
    else
    {
        console.log( "Cannot set properties for object wit id=" + id );
    }

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setMaterialProperties = function( id, material )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    this.createMaterialGUI( gui, id, material );

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setGeometryProperties = function( id, geometry )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    this.createGeometryGUI( gui, id, geometry );

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestRender = function()
{
    this.eventDispatcher.runCommand( "render" ); 
}

//////////////////////////////////////////////////////////////////////////////
// Material defines
//////////////////////////////////////////////////////////////////////////////

//TODO: Discard this?

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.addMaterialDefine = function( gui, material, key, callback )
{
    if( key == "DIFFUSE_MODEL" )
    {
        gui.add( material.defines, key, { Lambert: 0, Disney: 1, DisneyNorm:2, OrenNayar: 3, Gotanda: 4 } ).onChange( callback );                
    }
    else
    {
        gui.add( material.defines, key ).onChange( callback );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMaterialDefinesGUI = function( gui, material, callback )
{
    var stringPairAddBoxParameters = 
    {
        title: "Enter new key value",
        first_text: "Key",
        second_text: "Value",
    }
    var stringPairRemoveBoxParameters = 
    {
        title: "Enter key name to delete",
        first_text: "Key",
    }

    var materialDefinesGUIButtons =
    [ 
        { 
            name : "Remove",
            class : "",
            style: "float: right; margin-right: 16px; margin-top: 3px;",
            span: 
            { 
                class: "icon-trash icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() { stringBox( stringPairRemoveBoxParameters ); return true;  }
        },
        { 
            name : "Add",
            class : "",
            style: "float: right; margin-right: 6px; margin-top: 3px;",
            span: 
            { 
                class: "icon-plus icon-hover",
                style: "width: 24px; height: 24px; zorder:10; padding-top: 6px;",
            },
            
            callback: function() { stringPairBox( stringPairAddBoxParameters ); return true;  }
        },
    ]

    var materialDefinesGUI = gui.addFolder( "Defines", materialDefinesGUIButtons );

    stringPairAddBoxParameters.onOK = function( define )
    {
        if( define !== undefined )
        {
            if( ( define.first !== undefined ) && ( define.first != "" ) )
            {
                var existingItem = false;
                if( material.defines[ define.first ] !== undefined )
                {
                    existingItem = true;
                }

                if( define.second == "true" || define.second == "True" || define.second == "TRUE" )
                {
                    material.defines[ define.first ] = true;
                }
                else
                if( define.second == "false" || define.second == "False" || define.second == "FALSE" )
                {
                    material.defines[ define.first ] = false;
                }
                else
                if( Number( define.second ) != Number.NaN )
                {
                    material.defines[ define.first ] = Number( define.second );
                }
                else
                {
                    material.defines[ define.first ] = define.second;
                }

                if( existingItem == false )
                {
                    if( define.first == "DIFFUSE_MODEL" )
                    {
                        materialDefinesGUI.add( material.defines, define.first, { Lambert: 0, Disney: 1, DisneyNorm:2, OrenNayar: 3, Gotanda: 4 } ).onChange( callback );                
                    }
                    else
                    {
                        materialDefinesGUI.add( material.defines, define.first ).onChange( callback );
                    }
                }
            }

            callback();            
        }
    }

    stringPairRemoveBoxParameters.onOK = function( key )
    {
        if( key !== undefined && key != "PHYSICAL" && key != "STANDARD" )
        {
            if( material.defines[ key ] !== undefined )
            {
                for( var i = 0; i < materialDefinesGUI.__controllers.length; ++i )
                {
                    if( materialDefinesGUI.__controllers[i].property == key )
                    {
                        materialDefinesGUI.remove( materialDefinesGUI.__controllers[i] );
                    }
                }
            }

            callback();            
        }
    }    

    if( material.defines !== undefined && material.defines != null )
    {
        for (var key in material.defines)
        {
            if( key == "DIFFUSE_MODEL" )
            {
                materialDefinesGUI.add( material.defines, key, { Lambert: 0, Disney: 1, DisneyNorm:2, OrenNayar: 3, Gotanda: 4 } ).onChange( callback );                
            }
            else
            {
                materialDefinesGUI.add( material.defines, key ).onChange( callback );
            }
        }
    }
}