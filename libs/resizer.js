function resizer( resizerID, mousemoveCallback ) 
{
    var resizer = document.getElementById( resizerID );
    resizer.mousemoveCallback = mousemoveCallback;

    resizer.onmousedown = function( e ) 
    {
        document.documentElement.addEventListener( 'mousemove', resizer.doDrag, false );
        document.documentElement.addEventListener( 'mouseup', resizer.stopDrag, false );
    }

    resizer.doDrag = function( e ) 
    {
        if( e.which != 1 )
        {
            resizer.stopDrag( e );
            return;
        }
        resizer.mousemoveCallback( e );
    }

    resizer.stopDrag = function( e ) 
    {
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