////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UI( UIData )
{
    this.UIData = UIData;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: UI
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutClasses = function( uiData )
{
    if( uiData.rows !== undefined )
    {
        for( var i = 0; i < uiData.rows.length; ++i) 
        {
            this.setupLayoutClasses( uiData.rows[i] );

            if( ( uiData.rows[i].class !== undefined ) && ( uiData.rows[i].id !== undefined ) )
            {
                var element = document.getElementById( uiData.rows[i].id );
                if( element != null )
                {
                    this.setupElementClass( element, uiData.rows[i].class );
                }
            }
        }
    }
    if( uiData.colons !== undefined )
    {
        for( var i = 0; i < uiData.colons.length; ++i) 
        {
            this.setupLayoutClasses( uiData.colons[i] );

            if( ( uiData.colons[i].class !== undefined ) && ( uiData.colons[i].id !== undefined ) )
            {
                var element = document.getElementById( uiData.colons[i].id );
                if( element != null )
                {
                    this.setupElementClass( element, uiData.colons[i].class );
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.onresize = function()
{
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if( this.parent !== undefined && this.parent != null )
    {
        width  = parseInt( this.parent.style.width,  10 ) || width;
        height = parseInt( this.parent.style.height, 10 ) || geight;
    }
    var area = { left: 0, top: 0, width: width, height: height };
    
    this.setupLayout( area, this.UIData );
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayout = function( area, uiData )
{
    if( uiData.rows !== undefined )
    {
        this.setupLayoutRows( area, uiData.rows );
    }
    else
    if( uiData.colons !== undefined )
    {
        this.setupLayoutColons( area, uiData.colons );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutRows = function( area, rows )
{
    var heightRows = 0;
    var heights = [];

    var countUndefinedRows = 0;
    var countRows = rows.length;
    for( var i = 0; i < countRows; ++i ) 
    {
        var height = this.getHeight( rows[i] );
        heights[i] = height;
        if( height !== undefined )
        {
            heightRows += height;
        }
        else
        {
            countUndefinedRows = countUndefinedRows + 1;
        }
    }

    if( countUndefinedRows > 0 )
    {
        var crtUndefinedRow = 0;
        var totalHeight = Math.max( area.height - heightRows, 0 );
        var heightDefault = Math.floor( totalHeight / countUndefinedRows );
        for( var i = 0; i < countRows; ++i ) 
        {
            if( heights[i] === undefined )
            {
                crtUndefinedRow += 1;
                if( crtUndefinedRow == countUndefinedRows - 1 )
                {
                    heights[i] = totalHeight - ( heightDefault * crtUndefinedRow );
                }
                else
                {
                    heights[i] = heightDefault;
                }
            }
        }
    }

    var currentTop = area.top;
    for( var i = 0; i < countRows; ++i) 
    {
        var newArea = { left: area.left, top: currentTop, width: area.width, height: heights[i] }
        var element = document.getElementById( rows[i].id );
        if( element != null )
        {
            setElementDimensions( element , newArea.left, newArea.top, newArea.width, newArea.height );
        }
        currentTop += heights[i];

        this.setupLayout( newArea, rows[i] );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutColons = function( area, colons )
{
    var widthColons = 0;
    var widths = [];

    var countUndefinedColons = 0;
    var countColons = colons.length;
    for( var i = 0; i < countColons; ++i ) 
    {
        var width = this.getWidth( colons[i] );
        widths[i] = width;
        if( width !== undefined )
        {
            widthColons += width;
        }
        else
        {
            countUndefinedColons = countUndefinedColons + 1;
        }
    }

    if( countUndefinedColons > 0 )
    {
        var widthDefault = Math.floor( Math.max( area.width -  widthColons, 0 ) / countUndefinedColons );
        for( var i = 0; i < countColons; ++i) 
        {
            if( widths[i] === undefined )
            {
                widths[i] = widthDefault;
            }
        }
    }

    var currentLeft = area.left;
    for( var i = 0; i < countColons; ++i) 
    {
        var newArea = { left: currentLeft, top: area.top, width: widths[i], height: area.height };
        var element = document.getElementById( colons[i].id );
        if( element != null )
        {
            setElementDimensions( element , newArea.left, newArea.top, newArea.width, newArea.height );
        }
        currentLeft += widths[i];

        this.setupLayout( newArea, colons[i] );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.getHeight = function( row )
{
    if( row === undefined )
    {
        return undefined;
    }
    if( row.height !== undefined )
    {
        return row.height;
    }

    if( row.rows !== undefined )
    {
        var totalHeight = 0;
        var countRows = row.rows.length;

        for( var i = 0; i < countRows; ++i )
        {
            var height = this.getHeight( row.rows[i] );
            if( height === undefined )
            {
                return undefined;
            }
            totalHeight += height;
        }

        return totalHeight;
    }
    else
    if( row.colons !== undefined )
    {
        var totalHeight = 0;
        var countColons = row.colons.length;

        for( var i = 0; i < countColons; ++i )
        {
            var height = this.getHeight( row.colons[i] );
            if( height === undefined )
            {
                return undefined;
            }
            totalHeight += height;
        }

        return totalHeight;
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.getWidth = function( colon )
{
    if( colon === undefined )
    {
        return undefined;
    }
    if( colon.width !== undefined )
    {
        return colon.width;
    }

    if( colon.colons !== undefined )
    {
        var totalWidth = 0;
        var countColons = colon.colons.length;

        for( var i = 0; i < countColons; ++i )
        {
            var width = this.getWidth( colon.colonss[i] );
            if( width === undefined )
            {
                return undefined;
            }
            totalWidth += width;
        }

        return totalWidth;
    }
    else
    if( colon.rows !== undefined )
    {
        var totalWidth = 0;
        var countRows = colon.rows.length;

        for( var i = 0; i < countRows; ++i )
        {
            var width = this.getWidth( colon.rows[i] );
            if( width === undefined )
            {
                return undefined;
            }
            totalWidth += width;
        }

        return totalWidth;
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupResizerData = function( uiClass )
{
    var elementsPrev = [];
    for( var i = 0; i < uiClass.prev.length; ++i )
    {
        var size_min = 0;
        var elementUIData = this.findUIDatabyId( this.UIData, uiClass.prev[i] )
        if( elementUIData !== undefined &&  elementUIData.size_min !== undefined )
        {
            size_min = elementUIData.size_min;
        }
        elementsPrev.push( { element: document.getElementById( uiClass.prev[i] ), size_min: size_min } );
    }
    var elementsNext = [];
    for( var i = 0; i < uiClass.next.length; ++i )
    {
        var size_min = 0;
        var elementUIData = this.findUIDatabyId( this.UIData, uiClass.next[i] );
        if( elementUIData !== undefined &&  elementUIData.size_min !== undefined )
        {
            size_min = elementUIData.size_min;
        }
        elementsNext.push( { element: document.getElementById( uiClass.next[i] ), size_min: size_min } );
    }

    return [ elementsPrev, elementsNext ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupElementClass = function( element, uiClass )
{
    if( uiClass.type === undefined )
    {
        return;
    }

    switch( uiClass.type )
    {
        case "resizerX":
        {
            var resizerData = this.setupResizerData( uiClass );
            this.setupResizerX( element, resizerData[0], resizerData[1] );
        }
        break;
        case "resizerY":
        {
            var resizerData = this.setupResizerData( uiClass );
            this.setupResizerY( element, resizerData[0], resizerData[1] );
        }
        break;
        case "layoutContainer":
        {
            element.ui = new UI( uiClass.layout );
            element.ui.setupLayoutClasses( element.ui.UIData );
            element.ui.parent = element;
            element.onresize = element.ui.onresize.bind( element.ui );
        }
        break;
        default:
        {}
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.findUIDatabyId = function( uiData, id )
{
    if( uiData.id === id )
    {
        return uiData;
    }
    if( uiData.colons !== undefined )
    {
        for( var i = 0; i < uiData.colons.length; ++i )
        {
            var result = this.findUIDatabyId( uiData.colons[i], id );
            if( result !== undefined )
            {
                return result;
            }
        }
    }
    if( uiData.rows !== undefined )
    {
        for( var i = 0; i < uiData.rows.length; ++i )
        {
            var result = this.findUIDatabyId( uiData.rows[i], id );
            if( result !== undefined )
            {
                return result;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupResizerX = function( element, elementsPrev, elementsNext )
{
    resizerX(   element.id, 
                function( e ) 
                {
                    var x = e.pageX;
                    if( element.parentElement != null )
                    {
                        x = x - ( parseInt( element.parentElement.style.left, 10 ) || 0); 
                    }

                    var elementWidth = parseInt( element.style.width, 10 );

                    var limitPrev = 0;
                    var crtLimitPrev = 0;
                    for( var i = 0; i < elementsPrev.length; ++i )
                    {
                        crtLimitPrev = parseInt( elementsPrev[i].element.style.left, 10 ) + elementsPrev[i].size_min;
                        if( crtLimitPrev > limitPrev )
                        {
                            limitPrev = crtLimitPrev;
                        }
                    }

                    var limitNext = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    var crtLimitNext = 0;
                    for( var i = 0; i < elementsNext.length; ++i )
                    {
                        crtLimitNext = parseInt( elementsNext[i].element.style.left, 10 ) + 
                                       parseInt( elementsNext[i].element.style.width, 10 ) - elementsNext[i].size_min;
                        if( crtLimitNext < limitNext )
                        {
                            limitNext = crtLimitNext;
                        }
                    }

                    if( x <= limitPrev )
                    {
                        x = limitPrev;
                    }
                    if( x >= limitNext )
                    {
                        x = limitNext;
                    }

                    for( var i = 0; i < elementsPrev.length; ++i )
                    {
                        elementPrev = elementsPrev[i].element;

                        var crtLeft = parseInt( elementPrev.style.left, 10 );
                        setElementDimensions( elementPrev,  crtLeft, 
                                                            parseInt( elementPrev.style.top,    10 ), 
                                                            x - crtLeft,
                                                            parseInt( elementPrev.style.height, 10 ) );
                    }

                    setElementDimensions( element, x, 
                                                   parseInt( element.style.top,    10 ), 
                                                   elementWidth, 
                                                   parseInt( element.style.height, 10 ) );
                                        
                    for( var i = 0; i < elementsNext.length; ++i )
                    {
                        elementNext = elementsNext[i].element;

                        var crtRight = parseInt( elementNext.style.left, 10 ) + parseInt( elementNext.style.width, 10 );
                        setElementDimensions( elementNext,  x + elementWidth, 
                                                            parseInt( elementNext.style.top,    10 ), 
                                                            crtRight - (x + elementWidth), 
                                                            parseInt( elementNext.style.height, 10 ) );
                    }
                } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupResizerY = function( element, elementsPrev, elementsNext )
{
    resizerY(   element.id, 
                function( e ) 
                {
                    var y = e.pageY;
                    if( element.parentElement != null )
                    {
                        y = y - ( parseInt( element.parentElement.style.top, 10 ) || 0); 
                    }

                    var elementHeight = parseInt( element.style.height, 10 );

                    var limitPrev = 0;
                    var crtLimitPrev = 0;
                    for( var i = 0; i < elementsPrev.length; ++i )
                    {
                        crtLimitPrev = parseInt( elementsPrev[i].element.style.top, 10 ) + elementsPrev[i].size_min;
                        if( crtLimitPrev > limitPrev )
                        {
                            limitPrev = crtLimitPrev;
                        }
                    }

                    var limitNext = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    var crtLimitNext = 0;
                    for( var i = 0; i < elementsNext.length; ++i )
                    {
                        crtLimitNext = parseInt( elementsNext[i].element.style.top, 10 ) + 
                                       parseInt( elementsNext[i].element.style.height, 10 ) - elementsNext[i].size_min;
                        if( crtLimitNext < limitNext )
                        {
                            limitNext = crtLimitNext;
                        }
                    }

                    if( ( y <= limitPrev ) || ( y >= limitNext ) )
                    {
                        return;
                    }

                    for( var i = 0; i < elementsPrev.length; ++i )
                    {
                        elementPrev = elementsPrev[i].element;

                        var crtTop = parseInt( elementPrev.style.top, 10 );
                        setElementDimensions( elementPrev, parseInt( elementPrev.style.left,   10 ),
                                                           crtTop, 
                                                           parseInt( elementPrev.style.width, 10 ),
                                                           y - crtTop );
                    }

                    setElementDimensions( element, parseInt( element.style.left, 10 ),
                                                   y, 
                                                   parseInt( element.style.width,    10 ), 
                                                   elementHeight );
                                        
                    for( var i = 0; i < elementsNext.length; ++i )
                    {
                        elementNext = elementsNext[i].element;

                        var crtBottom = parseInt( elementNext.style.top, 10 ) + parseInt( elementNext.style.height, 10 );
                        setElementDimensions( elementNext,  parseInt( elementNext.style.left,  10 ), 
                                                            y + elementHeight, 
                                                            parseInt( elementNext.style.width, 10 ), 
                                                            crtBottom - (y + elementHeight) );
                    }
                } );
}

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
