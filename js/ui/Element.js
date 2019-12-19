//////////////////////////////////////////////////////////////////////////////
_UI.Element = function( parent, parameters )
{
    parameters = parameters || {};

    this.parent = ( parent instanceof _UI.Element ) ? parent : { dom: parent, getDOM: function() { return this.dom; } };    
    this.dom = _UI.DOMCreate( parameters.tag, parameters, this.getParent().getDOM() );
    this.style = this.dom.style;

    var bounds = { left: this.style.left || 0, top: this.style.top || 0, width: this.style.width, height: this.style.height || 0 };
    if( parameters.bounds )
    {
        bounds.left   = parameters.bounds.left   != null ? parameters.bounds.left   : this.position.left;
        bounds.top    = parameters.bounds.top    != null ? parameters.bounds.top    : this.position.top;
        bounds.width  = parameters.bounds.width  != null ? parameters.bounds.width  : this.dimensions.width;
        bounds.height = parameters.bounds.height != null ? parameters.bounds.height : this.dimensions.height;
    }
    this.setBounds( bounds );
}

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype = Object.assign( Object.create( Object.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: _UI.Element,
} );

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype.getDOM = function()
{
    return this.dom;
};

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype.getParent = function()
{
    return this.parent;
};

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype.visible = function( value )
{
    value = value || false;
    this.style.visibility = value ? "hidden" : "visible";

    return this;
};

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype.display = function( value )
{
    value = value || false;
    this.style.display = value ? "block" : "none";

    return this;
};

//////////////////////////////////////////////////////////////////////////////
_UI.Element.prototype.setBounds = function( bounds )
{
    this.bounds = bounds;
    
    var css = { width : _UI.DOMDimensionToCSS( bounds.width ), height: _UI.DOMDimensionToCSS( bounds.height ) };
    css.left  = ( bounds.left === "center" ) ? "calc(50% - " + _UI.DOMHalfDimension( css.width  ) : _UI.DOMDimensionToCSS( bounds.left );
    css.top   = ( bounds.top  === "center" ) ? "calc(50% - " + _UI.DOMHalfDimension( css.height ) : _UI.DOMDimensionToCSS( bounds.top ) ;

    this.style.left   = css.left;
    this.style.top    = css.top;
    this.style.width  = css.width;
    this.style.height = css.height;

    return this;
};



//////////////////////////////////////////////////////////////////////////////
_UI.HLineElement = function( parent, id, bounds, color )
{

    var parameters = {};
    parameters.tag = "line";
    parameters.properties = { id: id, className: "svg_element" };
    parameters.bounds = bounds;
    parameters.bounds.width  = parameters.bounds.width  || "100%";
    parameters.bounds.height = parameters.bounds.height || 1;
    parameters.svg = { 
                        x1: 0, 
                        y1: 0, 
                        x2: '100%', 
                        y2: 0, 
                        stroke: _UI.RGBA( color || _UI.COLORS.element_color_border ), 
                        'stroke-width': parameters.bounds.height, 
                        'stroke-linecap': 'butt'
                     }

    _UI.Element.call( this, parent, parameters );
}

//////////////////////////////////////////////////////////////////////////////
_UI.HLineElement.prototype = Object.assign( Object.create( _UI.Element.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: _UI.HLineElement,
} );



//////////////////////////////////////////////////////////////////////////////
_UI.TextElement = function( parent, id, bounds, text, fontSize, fontColor )
{
    var parameters = {};
    parameters.tag = "div";
    parameters.properties = { id: id, className: "page_element text", innerHTML: text };

    fontSize = fontSize || _UI.FONT.sizeDefault;
    parameters.properties.style = "font-size: " + fontSize + "px;";

    fontColor = fontColor || _UI.FONT.colorDefault;
    parameters.properties.style += "color: " + fontColor + ";";

    parameters.bounds = bounds;
    parameters.bounds.width  = parameters.bounds.width  || "100%";
    parameters.bounds.height = parameters.bounds.height || fontSize;

    _UI.Element.call( this, parent, parameters );
}

//////////////////////////////////////////////////////////////////////////////
_UI.TextElement.prototype = Object.assign( Object.create( _UI.Element.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: _UI.TextElement,
} );

//////////////////////////////////////////////////////////////////////////////
_UI.WindowElement = function( parent, id, bounds, backgroundColor )
{
    var parameters = {};
    parameters.tag = "div";
    parameters.properties = { id: id, className: "page_element" };

    if( backgroundColor )
    {
        parameters.properties.style = "background-color:" + backgroundColor + ";";
    }

    parameters.bounds = bounds;
    parameters.bounds.width  = parameters.bounds.width  || "100%";
    parameters.bounds.height = parameters.bounds.height || "100%";

    _UI.Element.call( this, parent, parameters );
}

//////////////////////////////////////////////////////////////////////////////
_UI.WindowElement.prototype = Object.assign( Object.create( _UI.Element.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: _UI.WindowElement,
} );

//////////////////////////////////////////////////////////////////////////////
_UI.ButtonElement = function( parent, id, bounds, text, callback )
{
    var parameters = {};
    parameters.tag = "button";
    parameters.properties = { id: id, className: "element", innerHTML: text };

    parameters.bounds = bounds;
    parameters.bounds.width  = parameters.bounds.width  || "100%";
    parameters.bounds.height = parameters.bounds.height || "100%";

    _UI.Element.call( this, parent, parameters );

    if( callback )
    {
        this.getDOM().addEventListener( "click", callback );
    }
}

//////////////////////////////////////////////////////////////////////////////
_UI.ButtonElement.prototype = Object.assign( Object.create( _UI.Element.prototype ), 
{
    //////////////////////////////////////////////////////////////////////////////
    constructor: _UI.ButtonElement,
} );





