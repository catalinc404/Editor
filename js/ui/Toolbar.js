//////////////////////////////////////////////////////////////////////////////
function Toolbar( eventDispatcher, element, parameters )
{
    this.eventDispatcher = eventDispatcher;
    this.element = element;
    this.parameters = parameters;
    this.activeButton = "";

    this.eventDispatcher.addEventListener( "onUIReady",  this.onUIReady.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Toolbar.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: Toolbar,
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Toolbar.prototype.onUIReady = function()
{
    for (var i = 0; i < this.parameters.buttons.length; ++i )
    {
        var element = document.getElementById( this.parameters.buttons[i] );
        element.addEventListener( "click", this.onButtonClick.bind( this ), false );
    }

    this.activateButton( this.parameters.default );

    if( this.parameters.mode == "exclusive" && this.activeButton == "" )
    {
        this.activeButton = this.parameters.default;
    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Toolbar.prototype.onButtonClick = function( event )
{
    if( event.currentTarget.id == this.activeButton )
    {
        return;
    }

    if( this.parameters.mode == "exclusive" && this.activeButton != "" )
    {
        this.deactivateButton( this.activeButton );
        this.activeButton = "";
    }
    
    this.activateButton( event.currentTarget.id );

    if( this.parameters.mode == "exclusive" && this.activeButton == "" )
    {
        this.activeButton = event.currentTarget.id;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Toolbar.prototype.activateButton = function( button )
{
    var element;

    element = document.getElementById( button );
    element.className += " active";

    this.eventDispatcher.dispatchEvent( "onToolbarButtonActivated", { button: button, parent: this.element.id } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Toolbar.prototype.deactivateButton = function( button )
{
    var element;

    element = document.getElementById( button );
    element.className = element.className.replace( " active", "" );    

    this.eventDispatcher.dispatchEvent( "onToolbarButtonDeactivated", { button: button, parent: this.element.id } );
}

