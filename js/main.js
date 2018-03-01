////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ui = new UI( editorPageLayout );

function setup()
{
    ui.setupLayoutClasses( ui.UIData );
    resize();

    //createDemoScene( editor );
}

function resize()
{
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var area = { left: 0, top: 0, width: width, height: height };
    
    ui.setupLayout( area, ui.UIData );
}

//less.watch();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createDemoScene( editor )
{
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.name = "spotlight1";
    spotLight.position.set( -10, 15, -5 );
    spotLight.angle = Math.PI/4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    spotLight.castShadow = true;    
    editor.addSceneObject( spotLight );

    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: editor.defaultTexture } );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube1";
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    editor.addSceneObject( cube );

    var groupSpeheres = new THREE.Group();
    groupSpeheres.name = "spheres";
    var sphereGeometry = new THREE.SphereGeometry( 1, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: editor.defaultTexture } );
    for( var i = 1; i < 100; ++i )
    {
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.name = "sphere" + i;
        sphere.position.x = (Math.random() * 40);
        sphere.position.y = (Math.random() * 40) - 20;
        sphere.position.z = (Math.random() * 40) - 20;
        sphere.castShadow = true;
        groupSpeheres.add( sphere );
    }
    editor.addSceneObject( groupSpeheres );    

    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff } );
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.name = "plane1";
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    editor.addSceneObject( plane );
}


//////////////////////////////////////////////////////////////////////////////
function sceneOpen() 
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var file = event.target.files[0];
                                                    if( file.name.match(/\.(json|js)$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        var loader = new THREE.ObjectLoader();
                                                        loader.load( tmpPath, function ( obj ) { editor.addSceneObject( obj ); } );
                                                    }
                                                    else
                                                    if( file.name.match(/\.dae$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        editor.loadDAE( tmpPath, file.name );
                                                    }
                                                }
                                            } );
    fileSelector.click();
}

//////////////////////////////////////////////////////////////////////////////
function sceneSave() 
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.click();

    if( fileSelector.files.length > 0 )
    {
        var exporter = new THREE.FileLoader();
        var sceneJson = JSON.stringify( scene.toJSON() );
    }
}

//////////////////////////////////////////////////////////////////////////////
function sceneNew() 
{

}

//////////////////////////////////////////////////////////////////////////////
function sceneImport()
{
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var file = event.target.files[0];
                                                    if( file.name.match(/\.(json|js)$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        var loader = new THREE.ObjectLoader();
                                                        loader.load(  tmpPath, function ( obj ) { editor.addSceneObject( obj ); } );
                                                    }
                                                    else
                                                    if( file.name.match(/\.dae$/) ) 
                                                    {
                                                        var tmpPath = URL.createObjectURL( file );
                                                        editor.loadDAE( tmpPath, file.name );
                                                    }
                                                }
                                            } );
    fileSelector.click();
}

//////////////////////////////////////////////////////////////////////////////
var currentTheme = "default";

function parseRGBColor( color )
{
    var rgbArray = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    return (rgbArray[1] << 16 | rgbArray[2] << 8 | rgbArray[3] << 0);
}

function changeTheme( theme )
{
    if( theme === undefined || theme === currentTheme )
    {
        return;
    }

    currentTheme = theme;

    var newColor = "#111111";
    switch( theme )
    {
        case "blue":    newColor = "@basecolor-blue";  break;
        case "red":     newColor = "@basecolor-red";   break;
        case "green":   newColor = "@basecolor-green"; break;
        case "light":   newColor = "@basecolor-light"; break;
        default:
        break;
    }

    less.refresh( false, { "@basecolor" : newColor } ).then(
        function()
        {
            var colors = [];

            var styleSheetList = document.styleSheets;
            for(var i = 0; i < styleSheetList.length; i++)
            {
                var sheet = styleSheetList[i];
                for( var i = 0; i < sheet.rules.length; ++i )
                {
                    var rule = sheet.rules[i];
                    if( rule.selectorText == ".color1" ) colors[0] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color2" ) colors[1] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color3" ) colors[2] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color4" ) colors[3] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color5" ) colors[4] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color6" ) colors[5] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color7" ) colors[6] = parseRGBColor( rule.style.color );
                    if( rule.selectorText == ".color8" ) colors[7] = parseRGBColor( rule.style.color );
                }
            }
        
            eventDispatcher.dispatchEvent( "themeChanged", colors );
        }
      );
}

//////////////////////////////////////////////////////////////////////////////
function about()
{
    messageBox( { title: "About", contents: "<br>WebGL Editor<br>version 0.0.1<br><br>", type: EMessageBox.OK });
}

