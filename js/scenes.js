////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createInitialScene( editor )
{
    //createDemoScene( editor );
    createPBRTScene( editor );
    //createPBRTScene2( editor );
    //createUnrealArchDemoScene( editor );
}

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
    spotLight.power = 1700;
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
    cube.receiveShadow = true;
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
        sphere.receiveShadow = true;
        groupSpeheres.add( sphere );
    }
    groupSpeheres.castShadow = true;
    groupSpeheres.receiveShadow = true;
    editor.addSceneObject( groupSpeheres );    

    var planeGeometry = new THREE.PlaneGeometry( 60, 20 );
    var planeMaterial = new THREE.MeshPhongMaterial( {  color:0xffffff, map: editor.loadTexture( "textures/grid.png") } );
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.name = "plane1";
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.castShadow = true;
    plane.receiveShadow = true;
    editor.addSceneObject( plane );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPBRTScene()
{
    var lightMaterial = new THREE.MeshStandardMaterial(
        {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });

    var light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.power = 1700;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.heigth = 1024;
    light.shadow.radius = 1.5;
    light.position.set(0, 5, 3);

    var lightGeometry = new THREE.SphereGeometry(0);
    var lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
    lightMesh.name = "light geometry";
    light.add( lightMesh );
    light.name = "light";
    editor.addSceneObject( light );

    var hemisphereLight = new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
    hemisphereLight.name = "hemisphereLight";
    editor.addSceneObject( hemisphereLight );

    editor.loadPLYMesh( "data/lucy.ply", undefined, function( geometry )
    {
        var material = new THREE.MeshPhysicalMaterial( 
            {
                color: 0x3F51B5,
                roughness: 0.5,
                metalness: 0.7,
                clearCoat: 0.5,
                clearCoatRoughness: 0.5,
                reflectivity: 0.7
            } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = "lucy";
        mesh.position.set( 3, 0, 0 );
        mesh.rotation.set( 0, -Math.PI / 3.0, 0 );
        mesh.castShadow = true;
        mesh.updateMatrix();

        editor.addSceneObject( mesh );
    });

    editor.loadPLYMesh( "data/dragon.ply", undefined, function( geometry )
    {
        var material = new THREE.MeshPhysicalMaterial( 
            {
                color: 0x448AFF,
                roughness: 0.1,
                metalness: 0.9,
                clearCoat: 0.0,
                clearCoatRoughness: 0.2,
                reflectivity: 1
            } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = "dragon";
        mesh.position.set( -3, 0, 0 );
        mesh.rotation.set( 0, -Math.PI, 0 );
        mesh.castShadow = true;
        mesh.updateMatrix();

        editor.addSceneObject( mesh );
    });

    editor.loadPLYMesh( "data/bunny.ply", undefined, function( geometry )
    {
        var material = new THREE.MeshPhysicalMaterial( 
            {
                color: 0xCCFFFF,
                roughness: 0.9,
                metalness: 0.1,
                clearCoat: 0.0,
                clearCoatRoughness: 0.5,
                reflectivity: 0.1
            } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = "bunny";
        mesh.position.set( 0, 0, -1.5 );
        mesh.rotation.set( 0, -Math.PI, 0 );
        mesh.castShadow = true;
        mesh.updateMatrix();

        editor.addSceneObject( mesh );
    });

    editor.loadTexture( "textures/marble.jpg", function( texture )
    {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 100, 100 );
        
        var material = new THREE.MeshStandardMaterial(
            {
                roughness: 0.7,
                metalness: 0.1,
                map: texture
            });

        var geometry = new THREE.PlaneGeometry( 1000, 1000 );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = "floor";
        mesh.receiveShadow = true;
        mesh.rotation.x = -Math.PI / 2.0;
        mesh.position.y = 0;
        mesh.updateMatrix();

        editor.addSceneObject( mesh );
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPBRTScene2()
{
    var lightMaterial = new THREE.MeshStandardMaterial(
        {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });

    var light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.power = 1700;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.heigth = 1024;
    light.shadow.radius = 1.5;
    light.position.set(0, 5, 3);

    var lightGeometry = new THREE.SphereGeometry(0);
    var lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
    lightMesh.name = "light geometry";
    light.add( lightMesh );
    light.name = "light";
    editor.addSceneObject( light );

    var hemisphereLight = new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
    hemisphereLight.name = "hemisphereLight";
    editor.addSceneObject( hemisphereLight );

    var groupSpheres = new THREE.Group();
    groupSpheres.name = "spheres";
    var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20 );
    for( var i = -10; i < 10; ++i )
    {
        for( var j = -10; j < 10; ++j )
        {
            var sphereMaterial = new THREE.MeshPhysicalMaterial( 
                {
                    color: 0x3F51B5,
                    roughness: i/20.0 + 0.5,
                    metalness: j/20.0 + 0.5,
                    clearCoat: 0.5,
                    clearCoatRoughness: 0.5,
                    reflectivity: 0.7
                } );

            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.name = "sphere<" + i + "," + j+">";
            sphere.position.x = i * 2;
            sphere.position.y = 2;
            sphere.position.z = j *2;
            sphere.castShadow = true;
            sphere.receiveShadow = true;

            groupSpheres.add( sphere );
        }
    }
    groupSpheres.castShadow = true;
    groupSpheres.receiveShadow = true;
    editor.addSceneObject( groupSpheres );    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createUnrealArchDemoScene()
{
    editor.loadOBJ( "../../Room/Room.obj", undefined, function( object ) { object.scale.x = 0.01; object.scale.y = 0.01; object.scale.z = 0.01; } );
    editor.loadOBJ( "../../Room/Room.obj" );
}
