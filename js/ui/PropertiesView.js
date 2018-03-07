
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PropertyView( eventDispatcher, element ) 
{
    //////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    this.element = element;
   
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
PropertyView.prototype.onSceneObjectsSelected = function( selection )
{
    if( selection === undefined )
    {
        this.clearProperties();
    }

    if( selection instanceof Array && selection.length > 0 )
    {
        this.setProperties( selection[0] )
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

        if( material instanceof THREE.MeshPhongMaterial )
        {
            var materialGUI = gui.addFolder( "Phong Material" );
            
            materialGUI.add( material, "name" );
            materialGUI.addColor( material, "color" ).onChange( requestMateriaUpdate );
            
            materialGUI.addColor( material, "specular" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "shininess" ).onChange( requestMateriaUpdate );

            var mapGUI = materialGUI.addFolder( "map" );
            this.createMapGUI( mapGUI, material.map, requestMateriaUpdate );

            var lightMapGUI = materialGUI.addFolder( "lightMap" );
            lightMapGUI.add( material, "lightMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( lightMapGUI, material.lightMap, requestMateriaUpdate );

            var aoMapGUI = materialGUI.addFolder( "aoMap" );
            aoMapGUI.add( material, "lightMapIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( aoMapGUI, material.lightMap, requestMateriaUpdate );
        
            var emmisiveMapGUI = materialGUI.addFolder( "emmissiveMap" );
            emmisiveMapGUI.addColor( material, "emissive" ).onChange( requestMateriaUpdate );
            emmisiveMapGUI.add( material, "emissiveIntensity" ).onChange( requestMateriaUpdate );
            this.createMapGUI( emmisiveMapGUI, material.emissiveMap, requestMateriaUpdate );

            var bumpMapGUI = materialGUI.addFolder( "bumpMap" );
            bumpMapGUI.add( material, "bumpScale" ).onChange( requestMateriaUpdate );;
            this.createMapGUI( bumpMapGUI, material.bumpMap, requestMateriaUpdate );

            var normalMapGUI = materialGUI.addFolder( "normalMap" );
            var normalMapScaleGUI = normalMapGUI.addFolder( "scale" );
            normalMapScaleGUI.add( material.normalScale, "x" ).onChange( requestMateriaUpdate );
            normalMapScaleGUI.add( material.normalScale, "y" ).onChange( requestMateriaUpdate );
            this.createMapGUI( normalMapGUI, material.normalMap, requestMateriaUpdate );

            var displacementMapGUI = materialGUI.addFolder( "displacementMap" );
            displacementMapGUI.add( material, "displacementScale" ).onChange( requestMateriaUpdate );
            displacementMapGUI.add( material, "displacementBias" ).onChange( requestMateriaUpdate );
            this.createMapGUI( displacementMapGUI, material.displacementMap, requestMateriaUpdate );

            var specularMapGUI = materialGUI.addFolder( "specularMap" );
            this.createMapGUI( specularMapGUI, material.specularMap, requestMateriaUpdate );

            var alphaMapGUI = materialGUI.addFolder( "alphaMap" )
            this.createMapGUI( alphaMapGUI, material.alphaMap, requestMateriaUpdate );

            var envMapGUI = materialGUI.addFolder( "envMap" )
            this.createMapGUI( envMapGUI, material.envMap, requestMateriaUpdate );

            materialGUI.add( material, "combine", { MultiplyOperation: 0, MixOperation: 1, AddOperation: 2 } ).onChange( requestMateriaUpdate );

            materialGUI.add( material, "reflectivity" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "refractionRatio" ).onChange( requestMateriaUpdate );

            materialGUI.add( material, "wireframe" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "wireframeLinewidth" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "wireframeLinecap" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "wireframeLinejoin" ).onChange( requestMateriaUpdate );
            
            materialGUI.add( material, "skinning" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "morphTargets" ).onChange( requestMateriaUpdate );
            materialGUI.add( material, "morphNormals" ).onChange( requestMateriaUpdate );
        }
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
PropertyView.prototype.setProperties = function( object )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width } );
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
            gui.addColor( object, "color" ).onChange( this.fnColorChange );
            gui.add( object, "intensity" ).onChange( this.fnRequestRender );

            if( object instanceof THREE.SpotLight )
            {
                var spotLightGUI = gui.addFolder( "Spot Light" );
                spotLightGUI.add( object, "power" ).onChange( this.fnRequestRender );
                spotLightGUI.add( object, "distance" ).onChange( this.fnRequestRender );
                spotLightGUI.add( object, "angle" ).onChange( this.fnRequestRender );
                spotLightGUI.add( object, "penumbra" ).onChange( this.fnRequestRender );
                spotLightGUI.add( object, "decay" ).onChange( this.fnRequestRender );
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestRender = function()
{
    this.eventDispatcher.dispatchEvent( "render" ); 
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestMaterialUpdate = function()
{
    this.eventDispatcher.dispatchEvent( "render" ); 
}
