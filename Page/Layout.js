
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
    var area = { left: 0, top: 0, width: 1280, height: 960 };
    this.setupPageLayout( area, this.UIData );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.resizePage = function()
{
    console.log( "UI.prototype.resizePage:" );
    var area = { left: 0, top: 0, width: 1280, height: 960 };
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
        var heightDefault = Math.max( area.height -  heightRows, 0 ) / countUndefinedRows;
        for( var i = 0; i < countRows; ++i) 
        {
            if( heights[i] === undefined )
            {
                heights[i] = heightDefault;
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
        var widthDefault = Math.max( area.width -  widthColons, 0 ) / countUndefinedColons;
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
        var countColons = row.colons.length;

        for( var i = 0; i < countColons; ++i )
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
                },
                { 
                    name: "header_toolbar",
                    id: "header-tabs",
                    height: 70
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
                    width: 200
                },
                {
                    name: "resizer_left",
                    id: "resizerLeft",
                    width: 50
                },                
                {
                    name: "body_middle",
                    id: "editor",
                },
                {
                    name: "resizer_right",
                    id: "resizerRight",
                    width: 50
                },                
                {
                    name: "body_right",
                    id: "right",
                    width: 200
                }
            ]
        },
        {
            name: "footer",
            id: "footer",
            height: 100,
        },
    ] 
}


var ui = new UI( pageLayout );


