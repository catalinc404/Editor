////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function View( eventDispatcher, element, configuration ) 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher = eventDispatcher;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas  = element;
    this.context = element.getContext( "2d" );
    this.viewId  = element.id;

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
View.prototype.handleMouseDown = function( event ) 
{
    //console.log( "View.prototype.handleMouseDown, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.handleMouseMove = function( event ) 
{
    //console.log( "View.prototype.handleMouseMove, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.handleMouseUp = function( event ) 
{
    //console.log( "View.prototype.handleMouseUp, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.handleMouseLeave = function( event ) 
{
    //console.log( "View.prototype.handleMouseLeave, viewId = " + this.viewId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype.handleParentResize = function()
{
    //console.log( "View.prototype.handleResize, viewId = " + this.viewId );
    
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
    this.handleParentResize();
}

