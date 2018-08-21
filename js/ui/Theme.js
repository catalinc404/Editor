////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ThemeManager( eventDispatcher )
{
    this.currentTheme = "default";
    this.eventDispatcher = eventDispatcher;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addCommandHandler( "themeChange",   this.themeChange.bind( this ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.eventDispatcher.addEventListener( "onThemeUpdated", this.onThemeUpdated.bind( this ) );
    this.eventDispatcher.addEventListener( "onUISetup",      this.onThemeUpdated.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ThemeManager.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: ThemeManager
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ThemeManager.prototype.parseRGBColor = function( color )
{
    var rgbArray = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    return (rgbArray[1] << 16 | rgbArray[2] << 8 | rgbArray[3] << 0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ThemeManager.prototype.themeChange = function( theme )
{
    if( theme === undefined || theme === this.currentTheme )
    {
        return;
    }    

    this.currentTheme = theme;

    var lessModifiers =
    {
        "@font-color":                    "@" + this.currentTheme + "-color-font",
        "@font-color-shadow":             "@" + this.currentTheme + "-color-font-shadow",
        "@font-shadow":                   "@" + this.currentTheme + "-font-shadow",
        
        "@font-color-selected":           "@" + this.currentTheme + "-color-font-selected",
        "@font-color-shadow-selected":    "@" + this.currentTheme + "-color-font-shadow-selected",
        
        "@element-color-background":      "@" + this.currentTheme + "-color-background",
        "@element-color-border":          "@" + this.currentTheme + "-color-border",
        "@element-color-highlight":       "@" + this.currentTheme + "-color-highlight",
        "@element-color-selected":        "@" + this.currentTheme + "-color-selected",

        "@icon-color":                    "@" + this.currentTheme + "-color-icon",
        
        "@resizer-color":                 "@" + this.currentTheme + "-color-resizer-color",
        "@resizer-color-background":      "@" + this.currentTheme + "-color-resizer-color-background",
        
        "@editor-view-background":        "@" + this.currentTheme + "-color-editor-view-color-background"
    }

    less.refresh( false, lessModifiers ).then( function() { this.eventDispatcher.dispatchEvent( "onThemeUpdated" ); } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ThemeManager.prototype.onThemeUpdated = function()
{
    var colors = {};

    var styleSheetList = document.styleSheets;
    for(var i = 0; i < styleSheetList.length; i++)
    {
        var sheet = styleSheetList[i];

        if( sheet.ownerNode !== undefined && sheet.ownerNode != null && sheet.ownerNode.id.search("less") != -1 )
        {
            for( var i = 0; i < sheet.cssRules.length; ++i )
            {
                var rule = sheet.cssRules[i];

                if( rule.selectorText == ".font-color" )                 colors.font_color                 = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".font-color-shadow" )          colors.font_color_shadow          = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".font-color-selected" )        colors.font_color_selected        = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".font-color-shadow-selected" ) colors.font_color_shadow_selected = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".element-color-background" )   colors.element_color_background   = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".element-color-border" )       colors.element_color_border       = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".element-color-highlight" )    colors.element_color_highlight    = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".element-color-selected" )     colors.element_color_selected     = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".icon-color" )                 colors.icon_color                 = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".resizer-color" )              colors.resizer_color              = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".resizer-color-background" )   colors.resizer_color_background   = this.parseRGBColor( rule.style.color );
                if( rule.selectorText == ".editor-view-background" )     colors.editor_view_background     = this.parseRGBColor( rule.style.color );
            }
        }
    }

    this.eventDispatcher.dispatchEvent( "onThemeChanged", colors );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var themeManager = new ThemeManager( eventDispatcher );


