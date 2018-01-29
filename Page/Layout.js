
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
UI.prototype.setupPage = function()
{
    console.log( "UI.prototype.setupPage:" );

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var area = { left: 0, top: 0, width: width, height: height };

    this.setupPageLayout( area, this.UIData );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.resizePage = function()
{
    console.log( "UI.prototype.resizePage:" );

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var area = { left: 0, top: 0, width: width, height: height };

    this.setupPageLayout( area, this.UIData );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupPageLayout = function( area )
{
    console.log( "UI.prototype.setupPageLayout: left=" + area.left + ", top=" + area.top + ", width=" + area.width + ", height=" + area.height );

    if( this.UIData === undefined )
    {
        console.log( "UI.prototype.setupPageLayout: undefined layout!" );

        return;
    }

    if( this.UIData.rows === undefined && this.UIData.colons === undefined )
    {
        console.log( "UI.prototype.setupPageLayout: layout contains no colons or rows!" );

        return;
    }

    this.setupLayout( area, this.UIData );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayout = function( area, uiData )
{
    console.log( "UI.prototype.setupLayout:" );

    if( uiData.rows !== undefined )
    {
        this.setupLayoutRows( area, uiData.rows );
    }
    else
    if( uiData.colons !== undefined )
    {
        this.setupLayoutColons( area, uiData.colons );
    }
    else
    {
        console.log( "UI.prototype.setupLayout: no rows or colons defined!" );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutRows = function( area, rows )
{
    console.log( "UI.prototype.setupLayoutRows:" );

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
            if( rows[i].type !== undefined )
            {
                this.setupElementType( element, rows[i], this.getElementsTop( rows[i-1] ), this.getElementsBottom( rows[i+1] ) );
            }
            setElementDimensions( element , newArea.left, newArea.top, newArea.width, newArea.height );

        }
        currentTop += heights[i];

        this.setupLayout( newArea, rows[i] );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutColons = function( area, colons )
{
    console.log( "UI.prototype.setupLayoutColons:" );

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
            if( colons[i].type !== undefined )
            {
                this.setupElementType( element, colons[i], this.getElementsLeft( colons[i-1] ), this.getElementsRight( colons[i+1] ) );
            }
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
UI.prototype.getElementsLeft = function( uiElement )
{
    if( uiElement.id !== undefined )
    {
        return [uiElement];
    }
    else
    if( uiElement.rows !== undefined )
    {
        return uiElement.rows;
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.getElementsRight = function( uiElement )
{
    if( uiElement.id !== undefined )
    {
        return [uiElement];
    }
    else
    if( uiElement.rows !== undefined )
    {
        return uiElement.rows;
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.getElementsTop = function( uiElement )
{
    if( uiElement.id !== undefined )
    {
        return [uiElement];
    }
    else
    if( uiElement.colons !== undefined )
    {
        return uiElement.colons;
    }

    return undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.getElementsBottom = function( uiElement )
{
    if( uiElement.id !== undefined )
    {
        return [uiElement];
    }
    else
    if( uiElement.colons !== undefined )
    {
        return uiElement.colons;
    }

    return undefined;
   
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupElementType = function( element, uiElement, uiElementsLeft, uiElementsRight )
{
    console.log( "UI.prototype.setupElementType" );
    
    if( uiElement.type === undefined )
    {
        return;
    }

    switch( uiElement.type )
    {
        case "resizerX":
        {
            resizerX(   uiElement.id, 
                        function( e ) 
                        {
                            var element = document.getElementById( uiElement.id );
                            var elementLeft  = document.getElementById( uiElementsLeft[0].id );
                            var elementRight = document.getElementById( uiElementsRight[0].id );
                           
                            var elementWidth       = parseInt( element.style.width,        10 );
                            var elementsLeftWidth  = parseInt( elementLeft.style.width,    10 );
                            var elementsRightWidth = parseInt( elementRight.style.width,    10 );

                            var left  = parseInt( elementLeft.style.left, 10 );
                            var right = left + elementsLeftWidth + elementWidth + elementsRightWidth;

                            var elementLeftMinWidth  = ( uiElementsLeft[0].width_min  !== undefined ) ? uiElementsLeft[0].width_min  : 0;
                            var elementRightMinWidth = ( uiElementsRight[0].width_min !== undefined ) ? uiElementsRight[0].width_min : 0;

                            var x = e.pageX;
                            if( ((left + elementLeftMinWidth ) >= x) || (x >= (right - elementRightMinWidth)) )
                            {
                                return;
                            }

                            setElementDimensions( elementLeft,  parseInt( elementLeft.style.left,   10 ), 
                                                                parseInt( elementLeft.style.top,    10 ), 
                                                                x - left,
                                                                parseInt( elementLeft.style.height, 10 ) 
                                                );

                            for( var i = 1; i < uiElementsLeft.length; ++i )
                            {
                                elementLeft = document.getElementById( uiElementsLeft[i].id );

                                setElementDimensions( elementLeft,  parseInt( elementLeft.style.left,   10 ), 
                                                                    parseInt( elementLeft.style.top,    10 ), 
                                                                    x - left,
                                                                    parseInt( elementLeft.style.height, 10 ) 
                                                    );
                            }

                            setElementDimensions( element,      x, 
                                                                parseInt( element.style.top,        10 ), 
                                                                elementWidth, 
                                                                parseInt( element.style.height,     10 )
                                                );
                                                
                            setElementDimensions( elementRight,  x + elementWidth, 
                                                                parseInt( elementRight.style.top,    10 ), 
                                                                right - (x + elementWidth), 
                                                                parseInt( elementRight.style.height, 10 )
                                                );

                            for( var i = 1; i < uiElementsRight.length; ++i )
                            {
                                elementRight = document.getElementById( uiElementsRight[i].id );

                                setElementDimensions( elementRight,  x + elementWidth, 
                                                                    parseInt( elementRight.style.top,    10 ), 
                                                                    right - (x + elementWidth), 
                                                                    parseInt( elementRight.style.height, 10 )
                                                    );
                            }
                        }
                    );
        }
        break;
        case "resizerY":
        {
            resizerX( uiElement.id, 
                        function( e ) 
                        {
                            
                            var element = document.getElementById( uiElement.id );
                            var element = document.getElementById( uiElementPrev.id );
                            var elementNext = document.getElementById( uiElementNext.id );
                        
                            var elementHeight     = parseInt( element.style.height,     10 );
                            var elementPrevHeight = parseInt( elementPrev.style.height, 10 );
                            var elementNextHeight = parseInt( elementNext.style.height, 10 );

                            var top    = parseInt( elementPrev.style.top, 10 );
                            var bottom = top + elementPrevHeight + elementHeight + elementNextHeight;

                            var elementPrevMinHeight = ( uiElementPrev.height_min !== undefined ) ? uiElementPrev.height_min : 0;
                            var elementNextMinHeight = ( uiElementNext.height_min !== undefined ) ? uiElementNext.height_min : 0;

                            var y = e.pageY;
                            if( ((top + elementPrevMinHeight ) >= y) || (y >= (bottom - elementNextMinHeight)) )
                            {
                                return;
                            }

                            setElementDimensions( elementPrev,  parseInt( elementPrev.style.left,   10 ), 
                                                                parseInt( elementPrev.style.top,    10 ), 
                                                                parseInt( elementPrev.style.width,  10 ), 
                                                                y - top 
                                                );

                            setElementDimensions( element,      parseInt( element.style.left,       10 ),  
                                                                y - top, 
                                                                parseInt( element.style.width,      10 ),
                                                                elementHeight, 
                                                );
                                                                
                            setElementDimensions( elementNext,  parseInt( elementNext.style.top,    10 ), 
                                                                y + elementHeight, 
                                                                parseInt( elementNext.style.width,  10 ), 
                                                                bottom - (y + elementHeight)
                                                );
                        }
                    );
        }
        break;
        default:
        {

        }
        break;
    }
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
                    height_min: 52
                },
                { 
                    name: "header_toolbar",
                    id: "header-tabs",
                    height: 70,
                    height_min: 70
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
                    width_min: 200
                },
                {
                    name: "resizer_left",
                    id: "resizerLeft",
                    type: "resizerX",
                    width: 5,
                    width_min: 5
                },                
                {
                    name: "body_middle",
                    rows:
                    [
                        {
                            id: "editorTop",
                            width_min: 200
                        },
                        {
                            id: "editorTopBottomSeparator",
                            height: 5,
                            width_min: 200
                        },
                        {
                            id: "editorBottom",
                            width_min: 200
                        },
                    ]
                },
                {
                    name: "resizer_right",
                    id: "resizerRight",
                    type: "resizerX",
                    width: 5,
                    width_min: 5
                },                
                {
                    name: "body_right",
                    id: "right",
                    width: 200,
                    width_min: 200
                }
            ]
        },
        {
            name: "resizer_bottom",
            id: "resizerBottom",
            type: "resizerY",
            height: 5,
            height_min: 5
        },                
        {
            name: "footer",
            id: "footer",
            height: 100,
            height_min: 100
        },
    ] 
}

var ui = new UI( pageLayout );


