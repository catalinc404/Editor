function resizer( resizerID, mousemoveCallback ) 
{
    var resizer = document.getElementById( resizerID );
    resizer.mousemoveCallback = mousemoveCallback;
    var initialDrag = false;

    resizer.onmousedown = function( e ) 
    {
        //console.log( "resizer onmousedown" );
        
        initialDrag = true;
        document.documentElement.addEventListener( 'mousemove', resizer.doDrag, false );
        document.documentElement.addEventListener( 'mouseup', resizer.stopDrag, false );
    }

    resizer.doDrag = function( e ) 
    {
        //console.log( "resizer doDrag" );

        if( e !== undefined )
        {
            
            //seems to be nonstandard
            //if( e.which != 1 )
            if( e.buttons & 1 == 0 )
            {
                //console.log( "resizer doDrag stop" );
                resizer.stopDrag( e );
                return;
            }
            
            if( initialDrag == false )
            {
                resizer.mousemoveCallback( e );
            }
            else
            {
                initialDrag = false;
            }
        }
    }

    resizer.stopDrag = function( e ) 
    {
        //console.log( "resizer stopDrag" );
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