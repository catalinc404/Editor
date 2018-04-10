//////////////////////////////////////////////////////////////////////////////
function Tabs( eventDispatcher, element, parameters )
{
    this.eventDispatcher = eventDispatcher;
    this.element = element;
    this.parameters = parameters;
    this.activeTab = "";

    this.eventDispatcher.addEventListener( "onUIReady",  this.onUIReady.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Tabs.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: Tabs,
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Tabs.prototype.onUIReady = function()
{
    for (var key in this.parameters.tabs ) 
    {
        var element = document.getElementById( key );
        element.addEventListener( "click", this.onTabClick.bind( this ), false );
    }

    if( this.parameters.default !== undefined )
    {
        this.openTab( this.parameters.default );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Tabs.prototype.onTabClick = function( event )
{
    this.openTab( event.currentTarget.id );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Tabs.prototype.openTab = function( tabName )
{
    if( tabName == this.activeTab )
    {
        //return;
    }

    var element;

    this.eventDispatcher.dispatchEvent( "onTabDeactivated", { tab: this.activeTab, parent: this.element.id } );

    for (var key in this.parameters.tabs ) 
    {
        element = document.getElementById( key );
        element.className = element.className.replace( " active", "" );        

        element = document.getElementById( this.parameters.tabs[key] );
        element.style.display = "none";
    }

    element = document.getElementById( tabName );
    element.className += " active";

    element = document.getElementById( this.parameters.tabs[tabName] );
    element.style.display = "block";

    this.activeTab = tabName;

    this.eventDispatcher.dispatchEvent( "onTabActivated", { tab: tabName, parent: this.element.id } );
}

