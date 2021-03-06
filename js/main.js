////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ui = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setup()
{
    if( ui == null )
    {
        ui = new UI( editorPageLayout );

        __UI = new _UI( eventDispatcher );
    
        ui.setupLayoutClasses( ui.UIData );
        eventDispatcher.dispatchEvent( "onUISetup" );

        resize();

        eventDispatcher.dispatchEvent( "onUIReady" );

        window.addEventListener( "keydown", editor.onKeyDown.bind( editor ), false );

        createInitialScene( editor );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resize()
{
    if( ui == null )
    {
        setup();
    }
    else
    {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var area = { left: 0, top: 0, width: width, height: height };

        ui.setupLayout( area, ui.UIData );

        eventDispatcher.dispatchEvent( "onUIResize" );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeTheme( theme )
{
    eventDispatcher.runCommand( "themeChange", theme );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function about()
{
    messageBox( { width: 300, height: 200, title: "About", contents: "<br>WebGL Editor<br>version 0.0.1<br><br>", type: EMessageBox.OK });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeViewHelpersRender( id, viewId, helper )
{
    var view = editor.getView( viewId )
    if( view !== undefined && view != null )
    {
        var renderHelpersMode = view.getRenderHelpersMode();
        renderHelpersMode ^= helper;
        view.setRenderHelpersMode( renderHelpersMode );

        var element = document.getElementById( id );
        if( element !== undefined && element != null )
        {
            if( (renderHelpersMode & helper) != 0 )
            {
                element.classList.add( "icon-checked" );
            }
            else
            {
                element.classList.remove( "icon-checked" );
            }
        }

        view.requestRender();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = setup;
window.onresize = resize;
