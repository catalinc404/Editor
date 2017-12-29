function resizer( resizerID, mousemove, cursor ) 
{
    var resizer = document.getElementById( resizerID );
    resizer.style.cursor = cursor;
    resizer.mousemove = mousemove;

    resizer.onmousedown = function( e ) 
    {
        try
        {
            document.documentElement.addEventListener( 'mousemove', resizer.doDrag, false );
            document.documentElement.addEventListener( 'mouseup', resizer.stopDrag, false );
        } 
        catch (e) 
        {
            console.log( "resizer.onmousedown(...) failed! Your browser does not support this feature. " + e.message );
        }
    }

    resizer.doDrag = function( e ) 
    {
        if( e.which != 1 )
        {
            resizer.stopDrag( e );
            return;
        }
        resizer.mousemove( e );
    }

    resizer.stopDrag = function( e ) 
    {
        document.documentElement.removeEventListener( 'mousemove', resizer.doDrag, false );
        document.documentElement.removeEventListener( 'mouseup', resizer.stopDrag, false );
    }
}

function resizerX( resizerID, mousemoveCallback ) 
{
    resizer( resizerID, mousemoveCallback, "e-resize");
}

function resizerY( resizerID, mousemoveCallback ) 
{
    resizer( resizerID, mousemoveCallback, "n-resize" );
}