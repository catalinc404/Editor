
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyView( eventDispatcher, element ) 
{
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    this.element = element;
    this.scrollbarVVisible = false;
   
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectSelected",     this.onSceneObjectSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeselected",   this.onSceneObjectDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialSelected",   this.onSceneMaterialSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialDeselected", this.onSceneMaterialDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometrySelected",   this.onSceneGeometrySelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometryDeselected", this.onSceneGeometryDeselected.bind( this ) );

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
            propertiesSet = this.setObjectProperties( object );
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
            propertiesSet = this.setMaterialProperties( material );
        }
    }

    if( propertiesSet == false )
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneMaterialDeselected = function( objectId )
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
            propertiesSet = this.setGeometryProperties( geometry );
        }
    }

    if( propertiesSet == false )
    {
        this.clearProperties();
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneGeometryDeselected = function( objectId )
{
    this.clearProperties();
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
PropertyView.prototype.createTextureGUI = function( gui, material, textureName, callback )
{
    var _this = this;
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
                                                                var file = event.target.files[0];
                                                                if( file.name.match(/\.png$/) ) 
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

    var textureGUI = gui.addFolder( "Texture", textureGUIButtons, beforeElement );
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
                                             } ).onChange( callback );

        textureGUI.add( texture, "wrapS",  {  RepeatWrapping: 1000 ,ClampToEdgeWrapping: 1001, MirroredRepeatWrapping: 1002 } ).onChange( callback );
        textureGUI.add( texture, "wrapT",  {  RepeatWrapping: 1000 ,ClampToEdgeWrapping: 1001, MirroredRepeatWrapping: 1002 } ).onChange( callback );
        textureGUI.add( texture, "magFilter",  { NearestFilter: 1003, LinearFilter: 1006 } ).onChange( callback );
        textureGUI.add( texture, "minFilter",  { NearestFilter: 1003, NearestMipMapNearestFilter: 1004, NearestMipMapLinearFilter: 1005, LinearFilter: 1006, 
                                                LinearMipMapNearestFilter: 1007, LinearMipMapLinearFilterNearestFilter: 1008 } ).onChange( callback );
        textureGUI.add( texture, "anisotropy" ).min( 1 ).onChange( callback ); 
        textureGUI.add( texture, "format", { AlphaFormat: 1021, RGBFormat: 1022, RGBAFormat: 1023, 
                                             LuminanceFormat: 1024, LuminanceAlphaFormat: 1025, 
                                             RGBEFormat: 1026, DepthFormat: 1027, DepthStencilFormat: 1028 } ).onChange( callback );
        textureGUI.add( texture, "type", { UnsignedByteType: 1009, ByteType: 1009, ShortType: 1009, UnsignedShortType: 1009, IntType: 1009,
                                           UnsignedIntType: 1009, FloatType: 1009, HalfFloatType: 1009, UnsignedShort4444Type: 1009,
                                           UnsignedShort5551Type: 1009, UnsignedShort565Type: 1009, UnsignedInt248Type: 1009 } ).onChange( callback );

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
                                               BasicDepthPacking: 3008, RGBADepthPacking: 3009 } ).onChange( function() 
                                                                                                             { 
                                                                                                                material.needsUpdate = true; 
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

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createMaterialGUI = function( gui, material )
{
    if( material !== undefined )
    {
        var renderFunction = this.fnRequestRender;
        var requestMateriaUpdate = function()
        {
            material.needsUpdate = true;
            renderFunction();
        }

        var materialGUI = gui;
        materialGUI.add( material, "name" );
        
        if( material instanceof THREE.LineBasicMaterial )
        {
            var lineBasicMaterialGUI = materialGUI.addFolder( "LineBasic Material" );
        }
        else
        if( material instanceof THREE.LineDashedMaterial )
        {
            var lineDashedMaterialGUI = materialGUI.addFolder( "LineDashed Material" );
        }
        else
        if( material instanceof THREE.MeshBasicMaterial )
        {
            var basicMaterialGUI = materialGUI.addFolder( "MeshBasic Material" );
        }
        else
        if( material instanceof THREE.MeshDepthMaterial )
        {
            var depthMaterialGUI = materialGUI.addFolder( "MeshDepth Material" );
        }
        else
        if( material instanceof THREE.MeshLambertMaterial )
        {
            var lambertMaterialGUI = materialGUI.addFolder( "MeshLambert Material" );
        }
        else
        if( material instanceof THREE.MeshNormalMaterial )
        {
            var normalMaterialGUI = materialGUI.addFolder( "MeshNormal Material" );
        }
        else
        if( material instanceof THREE.MeshPhongMaterial )
        {
            var phongMaterialGUI = materialGUI.addFolder( "MeshPhong Material" );
            
            phongMaterialGUI.addColor( material, "color" ).onChange( requestMateriaUpdate );
            
            phongMaterialGUI.addColor( material, "specular" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "shininess" ).onChange( requestMateriaUpdate );

            var mapGUI = phongMaterialGUI.addFolder( "map" );
            this.createMapGUI( mapGUI, material.map, requestMateriaUpdate );

            var lightMapGUI = phongMaterialGUI.addFolder( "lightMap" );
            lightMapGUI.add( material, "lightMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( lightMapGUI, material.lightMap, requestMateriaUpdate );

            var aoMapGUI = phongMaterialGUI.addFolder( "aoMap" );
            aoMapGUI.add( material, "lightMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( aoMapGUI, material.lightMap, requestMateriaUpdate );
        
            var emmisiveMapGUI = phongMaterialGUI.addFolder( "emmissiveMap" );
            emmisiveMapGUI.addColor( material, "emissive" ).onChange( requestMateriaUpdate );
            emmisiveMapGUI.add( material, "emissiveIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( emmisiveMapGUI, material.emissiveMap, requestMateriaUpdate );

            var bumpMapGUI = phongMaterialGUI.addFolder( "bumpMap" );
            bumpMapGUI.add( material, "bumpScale" ).onChange( requestMateriaUpdate );;
            this.createMapGUI( bumpMapGUI, material.bumpMap, requestMateriaUpdate );

            var normalMapGUI = phongMaterialGUI.addFolder( "normalMap" );
            var normalMapScaleGUI = normalMapGUI.addFolder( "scale" );
            normalMapScaleGUI.add( material.normalScale, "x" ).onChange( requestMateriaUpdate );
            normalMapScaleGUI.add( material.normalScale, "y" ).onChange( requestMateriaUpdate );
            this.createMapGUI( normalMapGUI, material.normalMap, requestMateriaUpdate );

            var displacementMapGUI = phongMaterialGUI.addFolder( "displacementMap" );
            displacementMapGUI.add( material, "displacementScale" ).onChange( requestMateriaUpdate );
            displacementMapGUI.add( material, "displacementBias" ).onChange( requestMateriaUpdate );
            this.createMapGUI( displacementMapGUI, material.displacementMap, requestMateriaUpdate );

            var specularMapGUI = phongMaterialGUI.addFolder( "specularMap" );
            this.createMapGUI( specularMapGUI, material.specularMap, requestMateriaUpdate );

            var alphaMapGUI = phongMaterialGUI.addFolder( "alphaMap" )
            this.createMapGUI( alphaMapGUI, material.alphaMap, requestMateriaUpdate );

            var envMapGUI = phongMaterialGUI.addFolder( "envMap" )
            this.createMapGUI( envMapGUI, material.envMap, requestMateriaUpdate );

            phongMaterialGUI.add( material, "combine", { MultiplyOperation: 0, MixOperation: 1, AddOperation: 2 } ).onChange( requestMateriaUpdate );

            phongMaterialGUI.add( material, "reflectivity" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "refractionRatio" ).onChange( requestMateriaUpdate );

            phongMaterialGUI.add( material, "wireframe" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "wireframeLinewidth" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "wireframeLinecap" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "wireframeLinejoin" ).onChange( requestMateriaUpdate );
            
            phongMaterialGUI.add( material, "skinning" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "morphTargets" ).onChange( requestMateriaUpdate );
            phongMaterialGUI.add( material, "morphNormals" ).onChange( requestMateriaUpdate );
        }
        else
        if( material instanceof THREE.MeshStandardMaterial )
        {
            if( material instanceof THREE.MeshPhysicalMaterial )
            {
                var physicallMaterialGUI = materialGUI.addFolder( "Physical Material" );
                physicallMaterialGUI.add( material, "clearCoat" ).min( 0 ).max( 1 ).onChange( requestMateriaUpdate );
                physicallMaterialGUI.add( material, "clearCoatRoughness" ).min( 0 ).max( 1 ).onChange( requestMateriaUpdate );
                physicallMaterialGUI.add( material, "reflectivity" ).min( 0 ).max( 1 ).onChange( requestMateriaUpdate );
            }

            var standardMaterialGUI = materialGUI.addFolder( "Standard Material" );

            var diffuseMapGUI = standardMaterialGUI.addFolder( "diffuse" );
            this.createTextureGUI( diffuseMapGUI, material, "map", requestMateriaUpdate );
            diffuseMapGUI.addColor( material, "color" ).onChange( requestMateriaUpdate );

            var alphaMapGUI = standardMaterialGUI.addFolder( "alphaMap" );
            this.createMapGUI( alphaMapGUI, material.alphaMap, requestMateriaUpdate );

            var aoMapGUI = standardMaterialGUI.addFolder( "aoMap" );
            aoMapGUI.add( material, "aoMapIntensity" ).min( 0 ).onChange( requestMateriaUpdate );
            this.createMapGUI( aoMapGUI, material.aoMap, requestMateriaUpdate );

            var bumpMapGUI = standardMaterialGUI.addFolder( "bumpMap" );
            bumpMapGUI.add( material, "bumpScale" ).min( 0 ).max( 1 ).onChange( requestMateriaUpdate );
            this.createMapGUI( bumpMapGUI, material.bumpMap, requestMateriaUpdate );
            
            var displacementMapGUI = standardMaterialGUI.addFolder( "displacementMap" );
            displacementMapGUI.add( material, "displacementScale" ).onChange( requestMateriaUpdate ); 
            displacementMapGUI.add( material, "displacementBias" ).onChange( requestMateriaUpdate ); 
            this.createMapGUI( displacementMapGUI, material.displacementMap, requestMateriaUpdate );

            var emissiveGUI = standardMaterialGUI.addFolder( "emissive" );
            emissiveGUI.addColor( material, "emissive" ).onChange( requestMateriaUpdate ); 
            emissiveGUI.add( material, "emissiveIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( emissiveGUI, material.emissiveMap, requestMateriaUpdate );

            var envMapGUI = standardMaterialGUI.addFolder( "envMap" );
            envMapGUI.add( material, "envMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( envMapGUI, material.envMap, requestMateriaUpdate );

            var lightMapGUI = standardMaterialGUI.addFolder( "lightMap" );
            lightMapGUI.add( material, "lightMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( lightMapGUI, material.lightMap, requestMateriaUpdate );
          
            var metalnessMapGUI = standardMaterialGUI.addFolder( "metalnessMap" );
            metalnessMapGUI.add( material, "metalness" ).onChange( requestMateriaUpdate );
            this.createMapGUI( metalnessMapGUI, material.metalnessMap, requestMateriaUpdate );
            
            var roughnessMapGUI = standardMaterialGUI.addFolder( "roughnessMap" );
            roughnessMapGUI.add( material, "roughness" ).onChange( requestMateriaUpdate );
            this.createMapGUI( roughnessMapGUI, material.roughnessMap, requestMateriaUpdate );

            var normalMapGUI = standardMaterialGUI.addFolder( "normalMap" );
            this.createTextureGUI( normalMapGUI, material, "normalMap", requestMateriaUpdate );
            var normalScaleGUI = normalMapGUI.addFolder( "normalScale" );
            normalScaleGUI.add( material.normalScale, "x" ).onChange( requestMateriaUpdate );
            normalScaleGUI.add( material.normalScale, "y" ).onChange( requestMateriaUpdate );

            standardMaterialGUI.add( material, "refractionRatio" ).max( 1 ).onChange( requestMateriaUpdate );

            var wireframeGUI = standardMaterialGUI.addFolder( "wireframe" );
            wireframeGUI.add( material, "wireframe" ).onChange( requestMateriaUpdate );
            wireframeGUI.add( material, "wireframeLinecap", ["butt", "round", "square"] ).onChange( requestMateriaUpdate );
            wireframeGUI.add( material, "wireframeLinejoin", ["round", "bevel", "miter"] ).onChange( requestMateriaUpdate );
            wireframeGUI.add( material, "wireframeLinewidth" ).onChange( requestMateriaUpdate );

            standardMaterialGUI.add( material, "skinning" ).onChange( requestMateriaUpdate );

            standardMaterialGUI.add( material, "morphNormals" ).onChange( requestMateriaUpdate );
            standardMaterialGUI.add( material, "morphTargets" ).onChange( requestMateriaUpdate );
        }
        else
        if( material instanceof THREE.MeshToonMaterial )
        {
            var toonMaterialGUI = materialGUI.addFolder( "MeshToon Material" );
        }
        else
        if( material instanceof THREE.PointsMaterial )
        {
            var pointsMaterialGUI = materialGUI.addFolder( "Points Material" );
        }
        else
        if( material instanceof THREE.RawShaderMaterial )
        {
            var rawShaderMaterialGUI = materialGUI.addFolder( "RawShader Material" );
        }
        else
        if( material instanceof THREE.ShaderMaterial )
        {
            var shaderMaterialGUI = materialGUI.addFolder( "Shader Material" );
        }
        else
        if( material instanceof THREE.ShadowMaterial )
        {
            var shadowMaterialGUI = materialGUI.addFolder( "Shadow Material" );
        }
        else
        if( material instanceof THREE.SpriteMaterial )
        {
            var spriteMaterialGUI = materialGUI.addFolder( "Sprite Material" );            
        }
        else
        {
            console.log("unknown material type for: " + material );
        }

        //////////////////////////////////////////////////////////////////////////////
        //Base Material
        materialGUI.add( material, "fog" ).onChange( requestMateriaUpdate );
        materialGUI.add( material, "lights" ).onChange( requestMateriaUpdate );

        materialGUI.add( material, "blending",  { 
                                                    NoBlending: THREE.NoBlending, 
                                                    NormalBlending: THREE.NormalBlending, 
                                                    AdditiveBlending: THREE.AdditiveBlending,
                                                    SubtractiveBlending: THREE.SubtractiveBlending,
                                                    MultiplyBlending: THREE.MultiplyBlending,
                                                    CustomBlending: THREE.CustomBlending 
                                                } ).onChange( requestMateriaUpdate );
        
        materialGUI.add( material, "side", { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide } ).onChange( requestMateriaUpdate );
        materialGUI.add( material, "flatShading" ).onChange( requestMateriaUpdate );
        materialGUI.add( material, "vertexColors", { NoColors: THREE.NoColors, VertexColors: THREE.VertexColors, FaceColors: THREE.FaceColors } ).onChange( requestMateriaUpdate );

        materialGUI.add( material, "opacity" ).min( 0.0 ).max( 1.0 ).onChange( requestMateriaUpdate );
        materialGUI.add( material, "transparent" ).onChange( requestMateriaUpdate );

        //////////////////////////////////////////////////////////////////////////////
        this.createMaterialDefinesGUI( materialGUI, material, requestMateriaUpdate );
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
            this.createMaterialGUI( materialGUI, materials[i] );
        }
    }
    else
    if( materials instanceof THREE.Material )
    {
        var materialGUI = gui.addFolder( "Material" );

        this.createMaterialGUI( materialGUI, materials );
    }
    else
    {
        gui.addFolder( "Materials" );
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.createGeometryGUI = function( gui, geometry, createChildGUI )
{
    if( geometry !== undefined )
    {
        var geometryGUI = ( createChildGUI === false ) ? gui : gui.addFolder( "Geometry" );
        geometryGUI.add( geometry, "name" );

        if( geometry instanceof THREE.Mesh )
        {
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
PropertyView.prototype.setObjectProperties = function( object )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    gui.add( object, "name" );
    var controllerType = gui.add( object, "type" );
    controllerType.__input.readOnly = true;

    if( object instanceof THREE.Scene )
    {
    }
    else
    {
        if( object.visible !== undefined ) gui.add( object, "visible" ).onChange( this.fnRequestRender );
        if( object.castShadow !== undefined ) gui.add( object, "castShadow" ).onChange( this.fnRequestRender );
        if( object.receiveShadow !== undefined ) gui.add( object, "receiveShadow" ).onChange( this.fnRequestRender );

        if( object.position !== undefined )
        {
            var positionGUI = gui.addFolder( "Position" );
            positionGUI.add( object.position, "x" ).onChange( this.fnRequestRender );
            positionGUI.add( object.position, "y" ).onChange( this.fnRequestRender );
            positionGUI.add( object.position, "z" ).onChange( this.fnRequestRender );
        }

        if( object.rotation !== undefined  )
        {
            var rotationGUI = gui.addFolder( "Rotation" );
            rotationGUI.add( object.rotation, "x" ).step( 0.010 ).onChange( this.fnRequestRender );
            rotationGUI.add( object.rotation, "y" ).step( 0.010 ).onChange( this.fnRequestRender );
            rotationGUI.add( object.rotation, "z" ).step( 0.010 ).onChange( this.fnRequestRender );
        }

        if( object.scale !== undefined  )
        {
            var scaleGUI = gui.addFolder( "Scale" );
            scaleGUI.add( object.scale, "x" ).min( Epsilon ).onChange( this.fnRequestRender );
            scaleGUI.add( object.scale, "y" ).min( Epsilon ).onChange( this.fnRequestRender );
            scaleGUI.add( object.scale, "z" ).min( Epsilon ).onChange( this.fnRequestRender );
        }

        if( object instanceof THREE.Mesh )
        {
            this.createMaterialsGUI( gui, object.material );
            this.createGeometryGUI( gui, object.geometry );
        }
        else
        if( object instanceof THREE.Light )
        {
            this.createLightGUI( gui, object );
        }
    }

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setMaterialProperties = function( material )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    this.createMaterialGUI( gui, material );

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.setGeometryProperties = function( geometry )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width, resizeCallback: this.onPropertiesPanelResize.bind(this) } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    this.createGeometryGUI( gui, geometry, false );

    return true;
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestRender = function()
{
    this.eventDispatcher.runCommand( "render" ); 
}