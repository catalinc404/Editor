////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EventDispatcher() 
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
EventDispatcher.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: EventDispatcher,

    addEventListener : function( event, listener )
    {
        if( this.listeners === undefined )
        {
            this.listeners = {};
        }

        var listeners = this.listeners;
        if( listeners[event] === undefined )
        {
            listeners[event] = [];
        }

        if( listeners[event].indexOf( listener ) === -1 )
        {
            listeners[event].push( listener );
        }
    },

    removeEventListener : function( event, listener )
    {
        if( this.listeners === undefined )
        {
            return;
        }

        var eventListeners = this.listeners[event];
        if( eventListeners === undefined )
        {
            return;
        }

        var eventIndex = eventListeners.indexOf( listener );
        if ( eventIndex !== - 1 ) 
        {
    		eventListeners.splice( eventIndex, 1 );
		}
    },

    getListeners : function()
    {
        return this.listeners;
    },

    dispatchEvent : function( event, data )
    {
        //console.log( "dispatch event -----------------------------------" )
        //console.log( "event = " + event );
        //console.log( data );
        //console.log( "--------------------------------------------------" )

        if( this.listeners === undefined )
        {
            return;
        }

        var eventListeners = this.listeners[event];
        if( eventListeners === undefined )
        {
            return;
        }

        for( var index = 0; index < eventListeners.length; ++index )
        {
            eventListeners[index]( data );
        }
    },

    addRequestListener : function( request, listener )
    {
        if( this.requestListeners === undefined )
        {
            this.requestListeners = {};
        }

        this.requestListeners[ request ] = listener;
    },

    removeRequestListener : function( request, listener )
    {
        if( this.requestListeners === undefined )
        {
            return;
        }

        var eventListeners = this.listeners[event];
        if( eventListeners === undefined )
        {
            return;
        }

        var requestIndex = requestListeners.indexOf( listener );
        if ( requestIndex !== - 1 ) 
        {
    		requestListeners.splice( requestIndex, 1 );
		}
    },

    getRequestListeners : function()
    {
        return this.requestListeners;
    },
    
    dispatchRequest : function( request, data )
    {
        if( this.requestListeners === undefined )
        {
            return;
        }

        var requestListener = this.requestListeners[request];
        if( requestListener === undefined )
        {
            return;
        }

        return requestListener( data );
    }
    
} )

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
eventDispatcher = new EventDispatcher();
