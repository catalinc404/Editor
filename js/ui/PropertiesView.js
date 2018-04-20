
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyView( eventDispatcher, element ) 
{
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    this.element = element;
    this.scrollbarVVisible = false;
   
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",   this.onSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected", this.onSceneObjectsDeselected.bind( this ) );

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
PropertyView.prototype.onSceneObjectsSelected = function( selection )
{
    if( selection === undefined )
    {
        this.clearProperties();
    }

    if( ( selection instanceof Array ) && ( selection.length > 0 ) )
    {
        var object = this.eventDispatcher.dispatchRequest( "getObjectFromEditorId", selection[0] );
        if( object !== undefined )
        {
            this.setProperties( object );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.onSceneObjectsDeselected = function( selection )
{
    this.clearProperties();
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.clearProperties = function()
{
    if( this.gui !== undefined )
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
    if( map !== undefined && map != null )
    {
        gui.add( map, "name" );
        if( map.image !== undefined )
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

        var materialGUI = gui.addFolder( "Material" );
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

            var mapGUI = standardMaterialGUI.addFolder( "diffuse" );
            mapGUI.addColor( material, "color" ).onChange( requestMateriaUpdate );
            this.createMapGUI( mapGUI, material.lightMap, requestMateriaUpdate );

            var alphaMapGUI = standardMaterialGUI.addFolder( "alphaMap" )
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
            var normalScaleGUI = normalMapGUI.addFolder( "normalScale" );
            normalScaleGUI.add( material.normalScale, "x" ).onChange( requestMateriaUpdate );
            normalScaleGUI.add( material.normalScale, "y" ).onChange( requestMateriaUpdate );
            this.createMapGUI( normalMapGUI, material.normalMap, requestMateriaUpdate );

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
PropertyView.prototype.createGeometryGUI = function( gui, geometry )
{
    if( geometry !== undefined )
    {
        var geometryGUI = gui.addFolder( "Geometry" );
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
PropertyView.prototype.setProperties = function( object )
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
            this.createMaterialGUI( gui, object.material );
            this.createGeometryGUI( gui, object.geometry );
        }
        else
        if( object instanceof THREE.Light )
        {
            this.createLightGUI( gui, object );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestRender = function()
{
    this.eventDispatcher.dispatchCommand( "render" ); 
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestMaterialUpdate = function()
{
    this.eventDispatcher.dispatchCommand( "render" ); 
}
