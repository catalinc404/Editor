
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
        this.setupLayoutcolons( area, uiData.colons );
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

    var heightRows = 0
    for( var i = 0; i < rows.length; ++i) 
    {
        heightRows += this.getHeight( rows[i] );
    }

    

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutColons = function( area, colons )
{
    console.log( "UI.prototype.setupLayoutColons:" );
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
                    id: "",
                    height: 52,
                },
                { 
                    name: "header_toolbar",
                    id: "",
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
                    name: "body_middle",
                    id: "editor",
                },
                {
                    name: "body_right",
                    id: "editor",
                    width: 200
                }
            ]
        },
        {
            name: "footer",
            cols:
            [
                {
                    name: "footer",
                    id : "footer",
                }
            ]
        },
    ] 
}


var ui = new UI( pageLayout );


