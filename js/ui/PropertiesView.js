
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
PropertyView.prototype.createMapGUI = function( gui, map )
{
    if( map !== undefined && map != null )
    {
        gui.add( map, "name" );
        if( map.image !== undefined )
        {
            gui.add( map.image, "src" );
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
PropertyView.prototype.setProperties = function( object )
{
    var width = parseInt( this.element.style.width, 10 ) - 1;
    gui = new dat.GUI( { closeOnTop: false, autoPlace: false, hideable: false, width: width } );
    this.element.appendChild( gui.domElement );
    this.gui = gui;

    gui.add( object, "name" );
    gui.add( object, "type" );

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
        rotationGUI.add( object.rotation, "x" ).step( 0.100 ).onChange( this.fnRequestRender );
        rotationGUI.add( object.rotation, "y" ).step( 0.100 ).onChange( this.fnRequestRender );
        rotationGUI.add( object.rotation, "z" ).step( 0.100 ).onChange( this.fnRequestRender );
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
        if( object.material !== undefined )
        {
            if( object.material instanceof THREE.MeshPhongMaterial )
            {
                var materialGUI = gui.addFolder( "Phong Material" );
                
                materialGUI.add( object.material, "name" );
                materialGUI.addColor( object.material, "color" );
                
                materialGUI.addColor( object.material, "specular" );
                materialGUI.add( object.material, "shininess" );

                var mapGUI = materialGUI.addFolder( "map" );
                this.createMapGUI( mapGUI, object.material.map );

                var lightMapGUI = materialGUI.addFolder( "lightMap" );
                lightMapGUI.add( object.material, "lightMapIntensity" );
                this.createMapGUI( lightMapGUI, object.material.lightMap );

                var aoMapGUI = materialGUI.addFolder( "aoMap" );
                aoMapGUI.add( object.material, "lightMapIntensity" );
                this.createMapGUI( aoMapGUI, object.material.lightMap );
            
                var emmisiveMapGUI = materialGUI.addFolder( "emmissiveMap" );
                emmisiveMapGUI.addColor( object.material, "emissive" );
                emmisiveMapGUI.add( object.material, "emissiveIntensity" );
                this.createMapGUI( emmisiveMapGUI, object.material.emissiveMap );

                var bumpMapGUI = materialGUI.addFolder( "bumpMap" );
                bumpMapGUI.add( object.material, "bumpScale" );
                this.createMapGUI( bumpMapGUI, object.material.bumpMap );

                var normalMapGUI = materialGUI.addFolder( "normalMap" );
                var normalMapScaleGUI = normalMapGUI.addFolder( "scale" );
                normalMapScaleGUI.add( object.material.normalScale, "x" );
                normalMapScaleGUI.add( object.material.normalScale, "y" );
                this.createMapGUI( normalMapGUI, object.material.normalMap );

                var displacementMapGUI = materialGUI.addFolder( "displacementMap" );
                displacementMapGUI.add( object.material, "displacementScale" );
                displacementMapGUI.add( object.material, "displacementBias" );
                this.createMapGUI( displacementMapGUI, object.material.displacementMap );

                var specularMapGUI = materialGUI.addFolder( "specularMap" );
                this.createMapGUI( specularMapGUI, object.material.specularMap );

                var alphaMapGUI = materialGUI.addFolder( "alphaMap" );
                this.createMapGUI( alphaMapGUI, object.material.alphaMap );

                var envMapGUI = materialGUI.addFolder( "envMap" );
                this.createMapGUI( envMapGUI, object.material.envMap );

                materialGUI.add( object.material, "combine", { MultiplyOperation: 0, MixOperation: 1, AddOperation: 2 } );

                materialGUI.add( object.material, "reflectivity" );
                materialGUI.add( object.material, "refractionRatio" );

                materialGUI.add( object.material, "wireframe" );
                materialGUI.add( object.material, "wireframeLinewidth" );
                materialGUI.add( object.material, "wireframeLinecap" );
                materialGUI.add( object.material, "wireframeLinejoin" );
                
                materialGUI.add( object.material, "skinning" );
                materialGUI.add( object.material, "morphTargets" );
                materialGUI.add( object.material, "morphNormals" );
            }
        }
        if( object.geometry !== undefined )
        {
            var geometryGUI = gui.addFolder( "Geometry" );
            geometryGUI.add( object.geometry, "name" );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
PropertyView.prototype.requestRender = function()
{
    this.eventDispatcher.dispatchEvent( "render" ); 
}
