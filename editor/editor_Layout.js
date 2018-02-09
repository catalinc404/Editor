////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var editorLayout = 
{
    rows: 
    [
        {
            name: "top",
            colons:
            [
                { 
                    name: "panelView1",
                    id: "panelView1",
                    size_min: 128
                },
                { 
                    name: "resizerX1",
                    id: "resizerX1",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "panelView1" ],
                        next: [ "panelView2" ]
                    },
                    width: 5,
                },
                { 
                    name: "panelView2",
                    id: "panelView2",
                    size_min: 128
                }
            ]
        },
        {
            name: "resizerY",
            id: "resizerY",
            class:
            {
                type: "resizerY",
                prev: [ "panelView1", "resizerX1", "panelView2" ],
                next: [ "panelView3", "resizerX2", "panelView4" ]
            },
            height: 5
        },
        {
            name: "bottom",
            colons:
            [
                { 
                    name: "panelView3",
                    id: "panelView3",
                    size_min: 128
                },
                { 
                    name: "resizerX2",
                    id: "resizerX2",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "panelView3" ],
                        next: [ "panelView4" ]
                    },
                    width: 5,
                },
                { 
                    name: "panelView4",
                    id: "panelView4",
                    size_min: 128
                }
            ]
        }
    ] 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pageLayout = 
{
    rows: 
    [
        {
            name: "header",
            rows:
            [
                { 
                    name: "header_menu",
                    id: "header",
                    height: 52,
                    size_min: 52
                },
                { 
                    name: "header_toolbar",
                    id: "header-tabs",
                    height: 70,
                    size_min: 70
                }
            ]
        },
        {
            name: "body",
            colons:
            [
                {
                    name: "body_left",
                    id: "left",
                    width: 200,
                    size_min: 200
                },
                {
                    name: "resizer_left",
                    id: "resizerLeft",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "left" ],
                        next: [ "editor" ]
                    },
                    width: 5,
                    size_min: 5
                },                
                {
                    name: "body_middle",
                    id: "editor",
                    class:
                    {
                        type: "layoutContainer",
                        layout: editorLayout,
                    },
                    size_min: 200
                },
                {
                    name: "resizer_right",
                    id: "resizerRight",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "editor" ],
                        next: [ "right" ]
                    },
                    width: 5,
                },                
                {
                    name: "body_right",
                    id: "right",
                    width: 200,
                    size_min: 200
                }
            ]
        },
        {
            name: "resizer_bottom",
            id: "resizerBottom",
            class:
            {
                type: "resizerY",
                prev: [ "left", "resizerLeft", "editor", "resizerRight", "right" ],
                next: [ "footer" ]
            },
            height: 5,
        },                
        {
            name: "footer",
            id: "footer",
            height: 100,
            size_min: 100
        },
    ] 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var uiPage = new UI( pageLayout );

function setupPage()
{
    uiPage.setupLayoutClasses( uiPage.UIData );
    resizePage();
}

function resizePage()
{
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var area = { left: 0, top: 0, width: width, height: height };
    
    uiPage.setupLayout( area, uiPage.UIData );
}
