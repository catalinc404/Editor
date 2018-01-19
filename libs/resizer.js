function resizer( resizerID, mousemoveCallback ) 
{
    var resizer = document.getElementById( resizerID );
    resizer.mousemoveCallback = mousemoveCallback;

    resizer.onmousedown = function( e ) 
    {
        console.log( "resizer onmousedown" );
        document.documentElement.addEventListener( 'mousemove', resizer.doDrag, false );
        document.documentElement.addEventListener( 'mouseup', resizer.stopDrag, false );
    }

    resizer.doDrag = function( e ) 
    {
        console.log( "resizer doDrag" );
        if( e.which != 1 )
        {
            console.log( "resizer doDrag stop" );
            resizer.stopDrag( e );
            return;
        }
        
        resizer.mousemoveCallback( e );
    }

    resizer.stopDrag = function( e ) 
    {
        console.log( "resizer stopDrag" );
        document.documentElement.removeEventListener( 'mousemove', resizer.doDrag, false );
        document.documentElement.removeEventListener( 'mouseup', resizer.stopDrag, false );
    }
}

function resizerX( resizerID, mousemoveCallback ) 
{
    resizer( resizerID, mousemoveCallback );
}

function resizerY( resizerID, mousemoveCallback ) 
{
    resizer( resizerID, mousemoveCallback );
}