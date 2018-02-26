////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var editorLayout1View = 
{
    rows: 
    [
        { 
            name: "panelViewTL",
            id: "panelViewTL",
            size_min: 128,
            class:
            {
                onresize : genericResizeNotifier( "panelViewTL" )
            },
            rows:
            [
                {
                    name: "viewTL",
                    id: "viewTL",
                    class:
                    {
                        type: "viewWebGL",
                        config:
                        {
                            cameraPosition: { x: -28.23, y: 14.34, z: 31.06 },
                            cameraLookat : { x: 0, y: 0, z: 0 },
                        },
                    },
                }
            ]
        }
    ] 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var editorLayout4Views = 
{
    rows: 
    [
        {
            name: "top",
            colons:
            [
                { 
                    name: "panelViewTL",
                    id: "panelViewTL",
                    size_min: 128,
                    class:
                    {
                        onresize : genericResizeNotifier( "panelViewTL" )
                    },
                    rows:
                    [
                        {
                            name: "viewTL",
                            id: "viewTL",
                            class:
                            {
                                type: "viewWebGL",
                                config:
                                {
                                    cameraPosition: { x: -28.23, y: 14.34, z: 31.06 },
                                    cameraLookat : { x: 0, y: 0, z: 0 },
                                },
                            },                            
                        }
                    ]
                },
                { 
                    name: "resizerXTop",
                    id: "resizerXTop",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "panelViewTL" ],
                        next: [ "panelViewTR" ]
                    },
                    width: 5,
                },
                { 
                    name: "panelViewTR",
                    id: "panelViewTR",
                    size_min: 128,
                    class:
                    {
                        onresize : genericResizeNotifier( "panelViewTR" )
                    },
                    rows:
                    [
                        {
                            name: "viewTR",
                            id: "viewTR",
                            class:
                            {
                                type: "viewWebGL",
                                config:
                                {
                                    cameraPosition: { x: -50, y: 5, z: 0 },
                                    cameraLookat : { x: 0, y: 0, z: 0 },
                                },
                            },                            
                        }
                    ]
                }
            ]
        },
        {
            name: "resizerY",
            id: "resizerY",
            class:
            {
                type: "resizerY",
                prev: [ "panelViewTL", "resizerXTop",    "panelViewTR" ],
                next: [ "panelViewBL", "resizerXBottom", "panelViewBR" ]
            },
            height: 5
        },
        {
            name: "bottom",
            colons:
            [
                { 
                    name: "panelViewBL",
                    id: "panelViewBL",
                    size_min: 128,
                    class:
                    {
                        onresize : genericResizeNotifier( "panelViewBL" )
                    },
                    rows:
                    [
                        {
                            name: "viewBL",
                            id: "viewBL",
                            class:
                            {
                                type: "viewWebGL",
                                config:
                                {
                                    cameraPosition: { x: 0, y: 5, z: -50 },
                                    cameraLookat : { x: 0, y: 0, z: 0 },
                                },
                            },                            
                        }
                    ]
                },
                { 
                    name: "resizerXBottom",
                    id: "resizerXBottom",
                    class:
                    {
                        type: "resizerX",
                        prev: [ "panelViewBL" ],
                        next: [ "panelViewBR" ]
                    },
                    width: 5,
                },
                { 
                    name: "panelViewBR",
                    id: "panelViewBR",
                    size_min: 128,
                    class:
                    {
                        onresize : genericResizeNotifier( "panelViewBR" )
                    },
                    rows:
                    [
                        {
                            name: "viewBR",
                            id: "viewBR",
                            class:
                            {
                                type: "viewWebGL",
                                config:
                                {
                                    cameraPosition: { x: 0, y: 55, z: 0 },
                                    cameraLookat : { x: 0, y: 0, z: 0 },
                                },
                            },
                        }
                    ]
                }
            ]
        }
    ] 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var editorPageLayout = 
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
                    height: 30,
                    size_min: 30
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
                    width: 220,
                    size_min: 220,
                    rows:
                    [
                        {
                            name: "tree_view_menu",
                            id: "tree-view-menu",
                            height: 30,
                            size_min: 30,
                            class:
                            {
                                onresize : genericResizeableElementWidth( "tree-view-menu" )
                            }
                        },
                        {
                            name: "tree_view",
                            id: "tree-view",
                            class:
                            {
                                type: "treeView",
                                //onresize : genericResizeableElementWidth( "tree-view" )
                            }
                        },
                        {
                            name: "tree_view_padding",
                            id: "tree-view-padding",
                            height: 9,
                            size_min: 9,
                        },
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
                    class:
                    {
                        type: "editorContainer",
                        //layout: editorLayout4Views,
                        layout: editorLayout1View,
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
                    width: 260,
                    size_min: 260,
                    class:
                    {
                        type: "propertyView",
                        //onresize : genericResizeableElementWidth( "right" )
                    },                    
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

