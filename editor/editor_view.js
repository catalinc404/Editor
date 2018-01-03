////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function View( canvas, width, height, viewId ) 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.canvas = canvas;
    this.viewId = viewId;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.editor_view_object = this;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.addEventListener( 'mousedown',  this.handleMouseDown.bind( this ), false );
    canvas.addEventListener( 'mousemove',  this.handleMouseMove.bind( this ), false );    
    canvas.addEventListener( 'mouseup',    this.handleMouseUp.bind( this ),   false );
    canvas.addEventListener( 'mouseleave', this.handleMouseUp.bind( this ),   false );    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
View.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: View,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    render : function()
    {
        //console.log( "View.prototype.render, viewId = " + this.viewId );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    resize : function( width, height )
    {
        //console.log( "View.prototype.resize, viewId = " + this.viewId );
    },    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseDown : function( event ) 
    {
        //console.log( "View.handleMouseDown, viewId = " + this.viewId );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseMove : function( event ) 
    {
        //console.log( "View.handleMouseMove, viewId = " + this.viewId );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleMouseUp : function( event ) 
    {
        //console.log( "View.handleMouseUp, viewId = " + this.viewId );
    },

} )

