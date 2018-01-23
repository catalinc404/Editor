
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
UI.prototype.setupPageLayout = function( area )
{
    if( this.UIData === undefined )
    {
        console.log( "UI.prototype.setupPageLayout: undefined layout!" );

        return;
    }

    if( this.UIData.rows === undefined || this.UIData.colons === undefined )
    {
        console.log( "UI.prototype.setupPageLayout: layout contains no colons or rows!" );

        return;
    }

    this.setupLayout( area, this.UIData );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayout = function( area, uiData )
{
    if( uiData.rows !== undefined )
    {
        setupLayoutRows( area, uiData.rows );
    }
    else
    if( uiData.colons !== undefined )
    {
        setupLayoutcolons( area, uiData.colons );
    }
    else
    {
        console.log( "" );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutRows = function( area, uiData )
{

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UI.prototype.setupLayoutColons = function( area, uiData )
{
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


