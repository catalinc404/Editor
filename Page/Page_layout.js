////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pageLayout = { header: 52, header_tabs: 70, left: 200, right: 200, footer: 100 };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setElementDimensions( element, left, top, width, height, visibility )
{
    //console.log( "setElementDimensions: element=" + element.id + ", left=" + left + ", top=" + top + ", width=" + width + ", height=" + height );

    element.style.visibility = ( visibility !== undefined ) ? visibility : "visible";
    element.style.left = left + "px";
    element.style.top = top + "px";
    element.style.width = width + "px";
    element.style.height = height + "px";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupPageLayout()
{
    var width  = document.body.clientWidth;
    var height = Math.max( window.innerHeight, document.body.clientHeight );

    var element = document.getElementById("header");
    setElementDimensions( element, 0, 0, width, pageLayout.header );

    var element = document.getElementById("header-tabs");
    setElementDimensions( element, 0, pageLayout.header, width, pageLayout.header_tabs );


    var element = document.getElementById("left");
    setElementDimensions( element, 0, pageLayout.header + pageLayout.header_tabs, pageLayout.left, height - (pageLayout.header + pageLayout.footer) );

    var element = document.getElementById("editor");
    setElementDimensions( element, pageLayout.left, pageLayout.header + pageLayout.header_tabs, width - (pageLayout.left + pageLayout.right ), height - (pageLayout.header + pageLayout.footer) );
    
    var element = document.getElementById("right");
    setElementDimensions( element, width - pageLayout.right, pageLayout.header + pageLayout.header_tabs, pageLayout.right, height - (pageLayout.header + pageLayout.footer) );

    var element = document.getElementById("footer");
    setElementDimensions( element, 0, height - pageLayout.footer, width, pageLayout.footer );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setupPageElements()
{
    setupPageLayout();
    setupPanels();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resizePageElements()
{
    setupPageLayout();
    resizePanels();
}
