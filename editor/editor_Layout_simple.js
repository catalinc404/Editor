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
                    height: 50,
                    size_min: 50
                },
                { 
                    name: "header_toolbar",
                    id: "header-tabs",
                    height: 30,
                    size_min: 30
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
                    size_min: 100,
                    rows:
                    [
                        {
                            name: "tree_view_menu",
                            id: "tree-view-menu",
                            height: 30,
                            size_min: 30,
                        },
                        {
                            name: "tree_view",
                            id: "tree-view",
                            class:
                            {
                                type: "treeView",
                            },
                        }
                    ]
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
                    width: 260,
                    size_min: 260,
                    class:
                    {
                        type: "propertyView",
                    },
                }
            ]
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
