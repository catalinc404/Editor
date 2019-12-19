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
                onresize: genericResizeNotifier( "panelViewTL" )
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
                            cameraPosition: { x: -6.199374029053649, y: 9.487225627221422, z: 22.590624194064613 },
                            cameraLookat: { x: 0, y: 0, z: 0 },
                            viewId: EView.TL,
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
                                    cameraLookat: { x: 0, y: 0, z: 0 },
                                    viewId: EView.TL,
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
                        onresize: genericResizeNotifier( "panelViewTR" )
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
                                    cameraLookat: { x: 0, y: 0, z: 0 },
                                    viewId: EView.TR,
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
                        onresize: genericResizeNotifier( "panelViewBL" )
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
                                    cameraLookat: { x: 0, y: 0, z: 0 },
                                    viewId: EView.BL,
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
                        onresize: genericResizeNotifier( "panelViewBR" )
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
                                    cameraLookat: { x: 0, y: 0, z: 0 },
                                    viewId: EView.BR,
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
                    name: "header_tabs",
                    id: "header-tabs",
                    height: 30,
                    size_min: 30,
                    class:
                    {
                        type: "tabs",
                        config:
                        {
                            tabs: { TabGeneral: "ToolbarGeneral", TabObjects: "ToolbarObjects", TabLights: "ToolbarLights", TabGeometries: "ToolbarGeometries", TabMaterials: "ToolbarMaterials" },
                            default: "TabGeneral",
                        },
                    },
                },
                { 
                    name: "header_toolbar",
                    id: "header-toolbar",
                    height: 32,
                    size_min: 32,
                    class:
                    {
                        type: "forward",
                        config:
                        {
                            ToolbarGeneralTransformSpace: 
                            {
                                id: "ToolbarGeneralTransformSpace",
                                class:
                                {
                                    type: "toolbar",
                                    config:
                                    {
                                        buttons: 
                                        [ 
                                            "ToolbarGeneralTransformSpace-global",
                                            "ToolbarGeneralTransformSpace-local",
                                        ],

                                        mode: "exclusive",
                                        default: "ToolbarGeneralTransformSpace-global",
                                    },
                                },                            
                            },
                            ToolbarGeneralTransformMode: 
                            {
                                id: "ToolbarGeneralTransformMode",
                                class:
                                {
                                    type: "toolbar",
                                    config:
                                    {
                                        buttons: 
                                        [ 
                                            "ToolbarGeneralTransformMode-translate",
                                            "ToolbarGeneralTransformMode-rotate",
                                            "ToolbarGeneralTransformMode-scale",
                                        ],

                                        mode: "exclusive",
                                        default: "ToolbarGeneralTransformMode-translate",
                                    },
                                },                            
                            },
                        },
                    },
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
                            name: "tree_view_header",
                            id: "tree-view-header",
                            height: 22,
                            size_min: 22,
                            class:
                            {
                                onresize : genericResizeableElementWidth( "tree-view-header" )
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
                            height: 11,
                            size_min: 11,
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
                        layout: editorLayout4Views,
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
                    rows:
                    [
                        {
                            name: "properties-view_header",
                            id: "properties-view-header",
                            height: 22,
                            size_min: 22,
                            class:
                            {
                                onresize : genericResizeableElementWidth( "properties-view-header" )
                            }
                        },
                        {
                            name: "properties_view",
                            id: "properties-view",
                            class:
                            {
                                type: "propertyView",
                                //onresize : genericResizeableElementWidth( "propertyView" )
                            }
                        },
                        {
                            name: "tree_view_padding",
                            id: "tree-view-padding",
                            height: 11,
                            size_min: 11,
                        },
                    ]
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

