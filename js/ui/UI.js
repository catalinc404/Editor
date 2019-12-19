////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function _UI( eventDispatcher )
{
    this.eventDispatcher = eventDispatcher; 
    this.eventDispatcher.addEventListener( "onThemeChanged",                this.onThemeChanged.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: _UI
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMNS       = [ "http://www.w3.org/1999/xhtml", "http://www.w3.org/2000/svg" ];
_UI.DOMSVG      = [ "svg", "rect", "circle", "ellipse", "line", "polyline", "polygon", "path", "polyline" ];
_UI.COLORS      = {};
_UI.FONT        = { sizeDefault: 13, colorDefault: "#000" };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMGetNSFromTag = function( tag )
{
    return ( _UI.DOMSVG.indexOf( tag ) != -1 ) ? 1 : 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMCreateElement = function( tag, ns )
{
    return document.createElementNS( ns, tag );
    //return document.createElement( tag );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMExtendElement = function( element )
{
    var _arguments = arguments;

    for( var i = 1, length = _arguments.length; i < length; ++i )
    {
        var attributes = _arguments[i];

        for( attribute in attributes )
        {
            element[attribute] = attributes[attribute];
        }
    }

    return element;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMSetSVG = function( element, svg )
{
    if( svg )
    {
        for( property in svg )
        {
            element.setAttributeNS( null, property, svg[property] );
        }
    }

    return element;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMCreate = function( tag, parameters, parent )
{
    tag = tag || "div";

    var nsIndex = _UI.DOMGetNSFromTag( tag );

    element = _UI.DOMCreateElement( (nsIndex === 1 ? "svg" : tag ), _UI.DOMNS[nsIndex] );
    element = _UI.DOMExtendElement( element, parameters.properties );    

    if( nsIndex === 1 )
    {
        var innerElement = _UI.DOMCreateElement( tag, _UI.DOMNS[nsIndex] );
        _UI.DOMSetSVG( innerElement, parameters.svg );
        element.appendChild( innerElement );
        if( parameters.properties.className )
        {
            element.setAttributeNS ( null, "class", parameters.properties.className );
        } 
    }

    parent = parent || document.body;
    parent.appendChild( element );

    return element;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMCenterElement = function( width, height )
{
    width = width || 0;
    height = height || 0;
    
    var result = {};

    result.left = "calc(50% - " + Math.floor( width / 2 ) + "px)";
    result.top  = "calc(50% - " + Math.floor( height / 2 ) + "px)";

    result.width  = Math.floor( width ) + "px";
    result.height = Math.floor( height ) + "px";

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMDimensionToCSS = function( dimension )
{
    var result;

    if( typeof dimension === "number" )
    {
        result = "" + dimension + "px";
    }
    else
    {
        result = dimension;
    }

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.DOMHalfDimension = function( dimension )
{
    var result;

    if( typeof dimension === "number" )
    {
        result = "" + Math.floor( dimension / 2 ) + "px";
    }
    else
    if( typeof dimension === "string" )
    {
        result = parseInt( dimension ) / 2;
        if( dimension.search( "%" ) !== -1 )
        {
            result += "%";
        }
        if( dimension.search( "px" ) !== -1 )
        {
            result += "px";
        }
    }

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.RGBA = function( intColor )
{
    return "rgba(" + (intColor >> 16) / 255.0 + ", " + ((intColor >> 8) & 0xff ) / 255.0 + ", " + (intColor & 0xff) / 255.0 + ", 1.0)";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_UI.prototype.onThemeChanged = function( colors )
{
    _UI.COLORS = colors; 
    _UI.FONT.colorDefault = _UI.COLORS["font_color"];
}