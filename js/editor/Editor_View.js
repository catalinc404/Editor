////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function View( eventDispatcher, element, configuration ) 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas  = element;
    this.viewId  = configuration.viewId;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.configuration = configuration;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.editor  = undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: View
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.init = function( editor )
{
    //console.log( "View.prototype.init, viewId = " + this.viewId );        

    this.editor = editor;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.getId = function()
{
    return this.viewId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.render = function()
{
    //console.log( "View.prototype.render, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.requestRender = function()
{
    //console.log( "View.prototype.requestRender, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.setView = function( position, lookAt )
{
    //console.log( "View.prototype.setView, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.resize = function( width, height )
{
    //console.log( "View.prototype.resize, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onMouseDown = function( event ) 
{
    //console.log( "View.prototype.onMouseDown, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onMouseMove = function( event ) 
{
    //console.log( "View.prototype.onMouseMove, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onMouseUp = function( event ) 
{
    //console.log( "View.prototype.onMouseUp, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onMouseLeave = function( event ) 
{
    //console.log( "View.prototype.onMouseLeave, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onParentResize = function()
{
    //console.log( "View.prototype.onResize, viewId = " + this.viewId );
    
    var width  = parseInt( this.canvas.style.width,  10 ) || 0;
    var height = parseInt( this.canvas.style.height, 10 ) || 0;

    var element = this.canvas.parentElement;
    if( element != null )
    {
        width  = parseInt( element.style.width,  10 ) || width;
        height = parseInt( element.style.height, 10 ) || height;
    }

    setElementSize( this.canvas, 0, 0, width, height );

    this.resize( width, height );

    this.requestRender();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.onResize = function()
{
    this.onParentResize();
}

