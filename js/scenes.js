////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createInitialScene( editor )
{
    //createDefaultScene( editor );
    //createDemoScene( editor );
    //createPBRTScene( editor );
    //createPBRTScene2( editor );
    //createUnrealArchDemoScene( editor );
    //createCornellBoxScene( editor );
    //createCornellBoxScene2( editor );
    //createMaterialNodeScene( editor );
    createMaterialNodeScene2( editor );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createDefaultScene( editor )
{
    var lightMaterial = new THREE.MeshStandardMaterial(
        {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });

    var light = new THREE.PointLight( 0xffffff, 1, 20, 2 );
    light.power = 1700;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.heigth = 1024;
    light.shadow.radius = 15;

    var lightGeometry = new THREE.SphereGeometry( 0 );
    var lightMesh = new THREE.Mesh( lightGeometry, lightMaterial );
    lightMesh.name = "light geometry";
    lightMesh.add( light );
    lightMesh.position.set( 0, 5, 0 );
    light.name = "light";
    editor.sceneObjectAdd( lightMesh );

    var hemisphereLight = new THREE.HemisphereLight( 0x303F9F, 0x000000, 1 );
    hemisphereLight.name = "hemisphereLight";
    hemisphereLight.position.set( 0, 8, 0 );
    editor.sceneObjectAdd( hemisphereLight );

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
    editor.sceneObjectAdd( spotLight );

    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 )
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: editor.defaultTexture } );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube1";
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    cube.receiveShadow = true;
    editor.sceneObjectAdd( cube );

    var groupSpeheres = new THREE.Group();
    groupSpeheres.name = "spheres";
    var sphereGeometry = new THREE.SphereGeometry( 1, 20, 20 );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: editor.defaultTexture } );
    for( var i = 1; i < 100; ++i )
    {
        var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
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
    editor.sceneObjectAdd( groupSpeheres );    

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
    editor.sceneObjectAdd( plane );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPBRTScene( editor )
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
    editor.sceneObjectAdd( light );

    var hemisphereLight = new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
    hemisphereLight.name = "hemisphereLight";
    editor.sceneObjectAdd( hemisphereLight );

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

        editor.sceneObjectAdd( mesh );
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

        editor.sceneObjectAdd( mesh );
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

        editor.sceneObjectAdd( mesh );
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

        editor.sceneObjectAdd( mesh );
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPBRTScene2( editor )
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
    editor.sceneObjectAdd( light );

    var hemisphereLight = new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
    hemisphereLight.name = "hemisphereLight";
    editor.sceneObjectAdd( hemisphereLight );

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
    editor.sceneObjectAdd( groupSpheres );    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createUnrealArchDemoScene( editor )
{
    editor.loadOBJ( "../Data/Room/Room.obj", "../Data/Room/Room.obj", editor.postLoadOBJ.bind( editor ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createCornellBoxScene( editor )
{
    var view = editor.getView( EView.TL );
    view.setView( new THREE.Vector3( -0.2758176499040841, 1.0747734896927836, 3.1026880324612622 ),
                  new THREE.Vector3( -0.15737317350893537, 1.0302500654463793, 2.1107260519877897 ) );

    editor.loadOBJ( "../Data/CornellBox/CornellBox-Original.obj", "CornellBox", function( object )
    {
        for( var i = 0, count = object.children.length; i < count; ++i )
        {
            var childObject = object.children[i];
            if( childObject.name == "light" )
            {
                continue;
            }

            var oldMaterial = childObject.material;
            childObject.material = new THREE.MeshPhysicalMaterial( 
                {
                    color: oldMaterial.color,
                    roughness: 0.5,
                    metalness: 0.5,
                    clearCoat: 0.5,
                    clearCoatRoughness: 0.5,
                    reflectivity: 0.7
                } );

            childObject.material.defines["DIFFUSE_DISNEY"] = 1;

            childObject.castShadow = true;
            childObject.receiveShadow = true;
        }
    } );

    var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhysicalMaterial( 
        {
            color: 0x3F51B5,
            roughness: 0.5,
            metalness: 0.5,
            clearCoat: 0.5,
            clearCoatRoughness: 0.5,
            reflectivity: 0.7
        } );
    sphereMaterial.defines["DIFFUSE_DISNEY"] = 1;

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = "sphere";
    sphere.position.x = -0.57;
    sphere.position.y = 0.33;
    sphere.position.z = 0;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    editor.sceneObjectAdd( sphere );


    var rectLight = new THREE.RectAreaLight( 0xffffff, 1, 1, 1 );
    rectLight.name = "rectLight";
    rectLight.intensity = 10;
    rectLight.position.set( 0, 1.9, 0 );
    rectLight.rotation.x = Math.PI/2.0;
    rectLight.castShadow = true;

    var lightMaterial = new THREE.MeshStandardMaterial(
    {
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
    });

    var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), lightMaterial );
    rectLightMesh.name = "rectLightMeshFace";
    rectLightMesh.scale.x = rectLight.width;
    rectLightMesh.scale.y = rectLight.height;
    rectLight.add( rectLightMesh );

    var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), lightMaterial );
    rectLightMeshBack.name = "rectLightMeshFaceBack";
    rectLightMeshBack.rotation.y = Math.PI;
    rectLightMesh.add( rectLightMeshBack );

    editor.sceneObjectAdd( rectLight );

    /*
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
    editor.sceneObjectAdd( light );
    */
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createCornellBoxScene2( editor )
{
    var view = editor.getView( EView.TL );
    view.setView( new THREE.Vector3( -0.2758176499040841, 1.0747734896927836, 3.1026880324612622 ),
                  new THREE.Vector3( -0.15737317350893537, 1.0302500654463793, 2.1107260519877897 ) );

    var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20 );
    var sphereMaterial = new THREE.MeshPhysicalMaterial( 
        {
            color: 0x3F51B5,
            roughness: 1.0,
            metalness: 0.0,
            clearCoat: 0.0,
            clearCoatRoughness: 0.0,
            reflectivity: 0.7
        } );
    //sphereMaterial.defines["DIFFUSE_MODEL"] = 1;
    sphereMaterial.needsUpdate = true;
    sphereMaterial.name = "sph1";

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = "sphere";
    sphere.position.x = -0.5;
    sphere.position.y = 0.3;
    sphere.position.z = 0.2;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    editor.sceneObjectAdd( sphere );

    var sphereGeometry2 = new THREE.SphereGeometry( 0.4, 20, 20 );
    var sphereMaterial2 = new THREE.MeshPhysicalMaterial( 
        {
            color: 0x3F51B5,
            roughness: 1.0,
            metalness: 0.0,
            clearCoat: 0.0,
            clearCoatRoughness: 0.0,
            reflectivity: 0.7
        } );
    //sphereMaterial2.defines["DIFFUSE_MODEL"] = 0;

    var sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    sphere2.name = "sphere";
    sphere2.position.x = 0.5;
    sphere2.position.y = 0.3;
    sphere2.position.z = 0.2;
    sphere2.castShadow = true;
    sphere2.receiveShadow = true;
    editor.sceneObjectAdd( sphere2 );
              

    var cornellBox = editor.loadOBJ( "../Data/CornellBox/CornellBox-Original.obj", "CornellBox", function( object )
    {
        for( var i = 0, count = object.children.length; i < count; ++i )
        {
            var childObject = object.children[i];
            if( childObject.name == "light" )
            {
                continue;
            }

            var oldMaterial = childObject.material;
            childObject.material = new THREE.MeshPhysicalMaterial( 
                {
                    color: oldMaterial.color,
                    roughness: 1.0,
                    metalness: 0.0,
                    clearCoat: 0.0,
                    clearCoatRoughness: 0.0,
                    reflectivity: 0.7
                } );

            if( childObject.name != "ceiling" )
            {
                childObject.castShadow = true;
                childObject.receiveShadow = true;
            }
        }
    } );

    editor.sceneObjectAdd( cornellBox );
    
    var lightMaterial = new THREE.MeshStandardMaterial(
    {
        emissive: 0xffffff,
        emissiveIntensity: 1,
        color: 0xffffff
    });

    lightMaterial.needsUpdate = true;

    var light = new THREE.PointLight(0xffffff, 1, 20, 2);
    light.power = 100;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.heigth = 1024;
    light.shadow.radius = 1.5;
    light.position.set( 0.11, 2.7, 0 );

    var lightGeometry = new THREE.SphereGeometry(0.1)
    var lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
    lightMesh.name = "light geometry";
    light.add( lightMesh );
    light.name = "light";
    editor.sceneObjectAdd( light );

    var hemisphereLight = new THREE.HemisphereLight(0x303F9F, 0x000000, 1);
    hemisphereLight.name = "hemisphereLight";
    editor.sceneObjectAdd( hemisphereLight );

    editor.render();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createMaterialNodeScene( editor )
{
    /*
    var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    ambientLight.name = "ambientLight";
    editor.sceneObjectAdd( ambientLight );
    */

    /*
    var hemisphereLight = new THREE.HemisphereLight( 0x303F9F, 0x000000, 1 );
    hemisphereLight.name = "hemisphereLight";
    hemisphereLight.position.set( 0, 8, 0 );
    editor.sceneObjectAdd( hemisphereLight );
    */

    /*
    var lightMaterial = new THREE.MeshStandardMaterial(
        {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });
    */

    var light1 = new THREE.PointLight( 0xffffff, 1, 20, 2 );
    light1.power = 1700;
    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.heigth = 1024;
    light1.shadow.radius = 15;
    light1.name = "light1";
    light1.position.set( 0, 5, 0 );

    editor.sceneObjectAdd( light1 );

    /*
    var lightGeometry = new THREE.SphereGeometry( 0 );

    var lightMesh1 = new THREE.Mesh( lightGeometry, lightMaterial );
    lightMesh1.name = "light geometry1";
    lightMesh1.add( light1 );
    lightMesh1.position.set( 0, 5, 0 );

    editor.sceneObjectAdd( lightMesh1 );
    */

    /*
    var light2 = new THREE.PointLight( 0xffffff, 1, 20, 2 );
    light2.power = 1700;
    light2.castShadow = true;
    light2.shadow.mapSize.width = 1024;
    light2.shadow.mapSize.heigth = 1024;
    light2.shadow.radius = 15;
    light2.name = "light2";
    light2.position.set( 0, 6, 0 );
    editor.sceneObjectAdd( light2 );
    */

    /*
    var lightMesh2 = new THREE.Mesh( lightGeometry, lightMaterial );
    lightMesh2.name = "light geometry1";
    lightMesh2.add( light2 );
    lightMesh2.position.set( 10, 5, 0 );

    editor.sceneObjectAdd( lightMesh2 );
    */

    var textureDiffuse     = editor.loadTexture( "textures/AI39_003_wood_floor_diff_1k.png" );
    var textureNormal      = editor.loadTexture( "textures/AIUE_V02_001_bathroom_floor_normal_original.png" );
    var textureRoughness   = editor.loadTexture( "textures/dirt_019_1k.png" );

    var mtl = new THREE.MeshStandardNodeMaterial();

    mtl.map = textureDiffuse;
    mtl.color = new THREE.ColorNode( 0xFFFFFF );

    /*
    mtl.map = new THREE.ColorAdjustmentNode(
        new THREE.TextureNode( textureDiffuse ),
        new THREE.FloatNode( 0.2 ),
        THREE.ColorAdjustmentNode.SATURATION
    );
    */
       
    mtl.normalMap = textureNormal;
    mtl.normalScale = new THREE.Vector2( 1.0, 1.0 );

    mtl.roughness = .5;
    mtl.roughnessMap = new THREE.TextureNode( textureRoughness );

    mtl.metalness = .5;

    /*
    var roughnessMetallicTextureNode = new THREE.TextureNode( textureRoughness );
    roughnessMetallicTextureNode.uv = new THREE.UVTransformNode();
    roughnessMetallicTextureNode.uv.setUvTransform( textureRoughness.offset.x, textureRoughness.offset.y, textureRoughness.repeat.x, textureRoughness.repeat.y, textureRoughness.rotation, textureRoughness.center.x, textureRoughness.center.y );
    roughnessMetallicTextureNode.name = "roughnessMetallicTextureNode"; 
    
    var roughnessTextureComponentNode = new THREE.SwitchNode( roughnessMetallicTextureNode, 'r' );
    roughnessTextureComponentNode.name = "roughnessTextureComponentNode";

    var roughnessTextureInvertedNode = new THREE.Math1Node( roughnessTextureComponentNode, THREE.Math1Node.INVERT );
    roughnessTextureInvertedNode.name = "roughnessTextureInvertedNode";

    var roughnessTextureInvertedSelectorNode = new THREE.FloatNode( 0.99 );
    roughnessTextureInvertedSelectorNode.name = "roughnessTextureInvertedSelectorNode";

    var roughnessTextureStage1Node = new THREE.Math3Node( roughnessTextureComponentNode, roughnessTextureInvertedNode, roughnessTextureInvertedSelectorNode, THREE.Math3Node.MIX );
    roughnessTextureStage1Node.name = "roughnessTextureStage1Node";
    var roughnessTextureContrastNode = new THREE.FloatNode( 1.0 );
    roughnessTextureContrastNode.name = "roughnessTextureContrastNode";

    var roughnessTextureStage2Node = new THREE.Math2Node( roughnessTextureStage1Node, roughnessTextureContrastNode, THREE.Math2Node.POW );
    roughnessTextureStage2Node.name = "roughnessTextureStage2Node";

    var roughnessConstantNode = new THREE.FloatNode( 0.2 );
    roughnessConstantNode.name = "roughnessConstantNode";

    var roughnessConstantVsTextureNode = new THREE.FloatNode( 0.8 );
    roughnessConstantVsTextureNode.name = "roughnessConstantVsTextureNode";

    var roughnessNode = new THREE.Math3Node( roughnessConstantNode, roughnessTextureStage2Node, roughnessConstantVsTextureNode, THREE.Math3Node.MIX );

    mtl.roughness = roughnessNode;

    mtl.userData = mtl.userData || {};
    mtl.userData[ "properties" ] = 
    { 
        pro
        type: "folder",
        name: "StandardNodeMaterial_UE",
        properties:
        [
            {
                type: "folder",
                name: "diffuse",
                properties:
                [
                    //TODO: UVTransform separate, dont use Texture 
                    { type: "nodeTexture",  name: "diffuseTexture",              object: diffuseTextureNode,         field: "value" },
                ]
            },
            {
                type: "folder",
                name: "roughness",
                properties:
                [
                    //TODO: UVTransform separate, dont use Texture 
                    { type: "nodeTexture",  name: "roughnessTexture",              object: roughnessMetallicTextureNode,         field: "value" },
                    { type: "text",         name: "roughnessTextureChannels",      object: roughnessTextureComponentNode,        field: "components" },
                    { type: "boolFloat",    name: "roughnessTextureInvert",        object: roughnessTextureInvertedSelectorNode, field: "value" },
                    { type: "float",        name: "roughnessTextureContrast",      object: roughnessTextureContrastNode,         field: "value" },
                    { type: "float",        name: "roughnessTextureConstantNode",  object: roughnessConstantNode,                field: "value" },
                    { type: "float",        name: "roughnessTextureConstantBlend", object: roughnessConstantVsTextureNode,       field: "value" },
                ]
            },
            {
                type: "folder",
                name: "normal",
                properties:
                [
                    //TODO: UVTransform separate, dont use Texture 
                    { type: "nodeTexture",  name: "normalTexture",              object: normalTextureNode,         field: "value" },
                ]
            },
        ],
    };
    */    

   var materialParameters = 
   {
       color: 0xFFFFFF,
       roughness: 0.5,
       metalness: 0.5,
   }
   var stdMaterial = new THREE.MeshStandardMaterial( materialParameters );

   stdMaterial.map = textureDiffuse;
   stdMaterial.roughnessMap = textureRoughness;
   stdMaterial.normalMap = textureNormal;

   stdMaterial.needsUpdate = true;

    var mesh = editor.loadOBJ( "textures/arch_floor_04_UV1.OBJ", "Test", function( obj ) 
    { 
        var child = obj.children[0];
        obj.remove( child );

        child.castShadow = true;
        child.receiveShadow = true;

        var childWithNodeMaterial = child;
        var childWithStdMaterial = child.clone();

        childWithNodeMaterial.name = "TestNodeMaterial"
        childWithNodeMaterial.material = mtl;
        childWithNodeMaterial.scale.set( 0.02, 0.02, 0.02 );
        childWithNodeMaterial.position.set( 0.0, 0.0, 0.0 );

        editor.sceneObjectAdd( childWithNodeMaterial );

        childWithStdMaterial.name = "TestStandardMaterial"
        childWithStdMaterial.material = stdMaterial;
        childWithStdMaterial.scale.set( 0.02, 0.02, 0.02 );
        childWithStdMaterial.position.set( 8.0, 0.0, 0.0 );

        editor.sceneObjectAdd( childWithStdMaterial );
    } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createMaterialNodeScene2( editor )
{
    var light1 = new THREE.PointLight( 0xffffff, 1, 20, 2 );
    light1.power = 1700;
    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.heigth = 1024;
    light1.shadow.radius = 15;
    light1.name = "light1";
    light1.position.set( 0, 5, 0 );

    editor.sceneObjectAdd( light1 );

    var textureDiffuse     = editor.loadTexture( "textures/AI39_003_wood_floor_diff_1k.png" );
    var textureNormal      = editor.loadTexture( "textures/AIUE_V02_001_bathroom_floor_normal_original.png" );
    var textureRoughness   = editor.loadTexture( "textures/dirt_019_1k.png" );

    var standardNodeMaterial = new THREE.StandardNodeMaterial();
    
    var diffuseTexture = new THREE.TextureNode( textureDiffuse ); diffuseTexture.name = "diffuseTexture";
    var diffuseTextureContrast = new THREE.FloatNode( 1.0 ); diffuseTextureContrast.name = "diffuseTextureContrast";
    var diffuse1 = new THREE.Math2Node( diffuseTexture, diffuseTextureContrast, THREE.Math2Node.POW );

    var diffuseColor = new THREE.ColorNode( 0xffffff ); diffuseColor.name = "diffuseColor";
    var diffuseTextureAmount = new THREE.FloatNode( 1.0 ); diffuseTextureAmount.name = "diffuseTextureAmount";
    var diffuse2 = new THREE.Math3Node( diffuseColor, diffuse1, diffuseTextureAmount, THREE.Math3Node.MIX );

    var diffuseColorOverlay = new THREE.ColorNode( 0xffffff ); diffuseColorOverlay.name = "diffuseColorOverlay";
    var diffuse3 = new THREE.OperatorNode( diffuse2, diffuseColorOverlay, THREE.OperatorNode.MUL );

    var diffuseMultiplier = new THREE.FloatNode( 1.0 ); diffuseMultiplier.name = "diffuseMultiplier";
    var diffuse4 = new THREE.OperatorNode( diffuse3, diffuseMultiplier, THREE.OperatorNode.MUL );
    
    standardNodeMaterial.color = diffuse4;

    var roughnessTexture = new THREE.TextureNode( textureRoughness ); roughnessTexture.name = "roughnessTexture";
    var roughnessMultiplier = new THREE.FloatNode( 0.5 ); roughnessMultiplier.name = "roughnessMultiplier";
    var roughness1 = new THREE.OperatorNode( roughnessTexture, roughnessMultiplier, THREE.OperatorNode.MUL );
    
    standardNodeMaterial.roughness = roughness1;
    
    standardNodeMaterial.normal = new THREE.NormalMapNode( new THREE.TextureNode( textureNormal ) );
 
    standardNodeMaterial.build();

    standardNodeMaterial.userData = standardNodeMaterial.userData || {};
    standardNodeMaterial.userData[ "properties" ] = 
    { 
        type: "folder",
        name: "StandardNodeMaterial_UE1",
        properties:
        [
            {
                type: "folder",
                name: "diffuse",
                properties:
                [
                    { type: "nodeTexture",   name: "diffuseTexture",            object: diffuseTexture,             field: "value" },
                    { type: "float",         name: "diffuseTextureContrast",    object: diffuseTextureContrast,     field: "value" },
                    
                    { type: "color",         name: "diffuseColor",              object: diffuseColor,               field: "value" },
                    { type: "float",         name: "diffuseTextureAmount",      object: diffuseTextureAmount,       field: "value" },

                    { type: "color",         name: "diffuseColorOverlay",       object: diffuseColorOverlay,        field: "value" },
                    
                    { type: "float",         name: "diffuseMultiplier",         object: diffuseMultiplier,          field: "value" },
                ]
            },
        ]
    }

   var standardMaterialParameters = 
   {
       color: 0xFFFFFF,
       roughness: 0.5,
       metalness: 0.5,
   }
   var stdandardMaterial = new THREE.MeshStandardMaterial( standardMaterialParameters );

   stdandardMaterial.color.setRGB( 1, 1, 1 );
   stdandardMaterial.map = textureDiffuse;
   stdandardMaterial.roughnessMap = textureRoughness;
   stdandardMaterial.normalMap = textureNormal;

   stdandardMaterial.needsUpdate = true;

    var mesh = editor.loadOBJ( "textures/arch_floor_04_UV1.OBJ", "Test", function( obj ) 
    { 
        var child = obj.children[0];
        obj.remove( child );

        child.castShadow = true;
        child.receiveShadow = true;

        var childWithStandardNodeMaterial = child;
        var childWithStdandardMaterial = child.clone();

        childWithStandardNodeMaterial.name = "TestNodeMaterial"
        childWithStandardNodeMaterial.material = standardNodeMaterial;
        childWithStandardNodeMaterial.scale.set( 0.02, 0.02, 0.02 );
        childWithStandardNodeMaterial.position.set( 0.0, 0.0, 0.0 );
        editor.sceneObjectAdd( childWithStandardNodeMaterial );

        childWithStdandardMaterial.name = "TestStandardMaterial"
        childWithStdandardMaterial.material = stdandardMaterial;
        childWithStdandardMaterial.scale.set( 0.02, 0.02, 0.02 );
        childWithStdandardMaterial.position.set( 8.0, 0.0, 0.0 );

        editor.sceneObjectAdd( childWithStdandardMaterial );
    } );
}