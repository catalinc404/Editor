////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EventDispatcher() 
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
EventDispatcher.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: EventDispatcher,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addCommandHandler : function( command, handler )
    {
        if( this.commandHandlers === undefined )
        {
            this.commandHandlers = {};
        }

        this.commandHandlers[ command ] = handler;
    },

    removeCommandHandler : function( command, handler )
    {
        if( this.commandHandlers === undefined )
        {
            return;
        }

        var commandHandler = this.commandHandlers[command];
        if( commandHandler === undefined )
        {
            return;
        }

        var commandIndex = commandHandlers.indexOf( handler );
        if ( commandIndex !== - 1 ) 
        {
    		commandHandlers.splice( commandIndex, 1 );
		}
    },

    getCommandHandlers : function()
    {
        return this.commandHandlers;
    },
    
    dispatchCommand : function( command, data )
    {
        if( this.commandHandlers === undefined )
        {
            return;
        }

        var commandHandler = this.commandHandlers[command];
        if( commandHandler === undefined )
        {
            return;
        }

        return commandHandler( data );
    },

    runCommand : function( command, data )
    {
        return this.dispatchCommand( command, data );
    }
} )

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
eventDispatcher = new EventDispatcher();
