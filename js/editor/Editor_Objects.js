//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getSelection = function()
{   
    var selection = {};
    selection.objectId = this.getEditorIdFromEditorObject( editor.selection.object );
    selection.materialId = this.selection.materialId;
    selection.geometryId = this.selection.geometryId;

    //console.log( "Editor.GetCurrentSelection: objectId:" + selection.objectId + ", materialId: " + selection.materialId + ", geometryId: " + selection.geometryId );

    return selection;
};

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.select = function( componentData )
{
    //console.log( "Editor.Select: objectId:" + componentData.objectId + ", materialId: " + componentData.materialId + ", geometryId: " + componentData.geometryId );

    if( componentData.objectId != null )
    {
        var object = this.getEditorObjectFromEditorId( componentData.objectId );
        if( object != null )
        {
            this.selection.object = object;
            this.eventDispatcher.dispatchEvent( "onSceneObjectSelected", componentData.objectId );
        }
    }
    else
    if( componentData.materialId != null )
    {
        var material = this.getMaterial( componentData.materialId );
        if( material != null )
        {
            this.selection.materialId = componentData.materialId;
            this.eventDispatcher.dispatchEvent( "onSceneMaterialSelected", componentData.materialId );
        }
    }
    else
    if( componentData.geometryId != null )
    {
        var geometry = this.getGeometry( componentData.geometryId );
        if( geometry != null )
        {
            this.selection.geometryId = componentData.geometryId;
            this.eventDispatcher.dispatchEvent( "onSceneGeometrySelected", componentData.geometryId );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.deselect = function( componentData )
{
    //console.log( "Editor.Deselect: objectId:" + componentData.objectId + ", materialId: " + componentData.materialId + ", geometryId: " + componentData.geometryId );

    if( componentData.objectId != null )
    {
        this.selection.object = null;
        this.eventDispatcher.dispatchEvent( "onSceneObjectDeselected", componentData.objectId );
    }
    else
    if( componentData.materialId != null )
    {
        this.selection.materialId = null;
        this.eventDispatcher.dispatchEvent( "onSceneMaterialDeselected", componentData.materialId );
    }
    else
    if( componentData.geometryId != null )
    {
        this.selection.geometryId = null;
        this.eventDispatcher.dispatchEvent( "onSceneGeometryDeselected", componentData.geometryId );
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.objectTransformGet = function( object )
{
    var transform = { position: new THREE.Vector3(), rotation: new THREE.Euler(), scale: new THREE.Vector3() };

    transform.position.copy( object.position );
    transform.rotation.copy( object.rotation );
    transform.scale.copy( object.scale );

    return transform;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.objectTransformSet = function( object, transform )
{
    object.position.copy( transform.position );
    object.rotation.copy( transform.rotation );
    object.scale.copy( transform.scale );

    object.updateMatrixWorld( true );
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.objectTransformReset = function( object )
{
    object.position.set( 0.0, 0.0, 0.0 );
    object.rotation.set( 0.0, 0.0, 0.0 );
    object.scale.set( 1.0, 1.0, 1.0 );

    object.updateMatrixWorld( true );
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectAdd = function( object, parameters  )
{
    var length = 0;

    var editorObject = {}
    parameters = parameters || {};

    editorObject.id = parameters.objectId || ++this.sceneObjectsId;
    object.name = object.name || "object_" + editorObject.id;

    var transform = this.objectTransformGet( object );
    this.objectTransformReset( object );

    if( parameters.dontAddToScene !== true )
    {
        if( parameters.parentId !== undefined )
        {
            var parent = this.getObjectFromEditorId( parameters.parentId )
            parent.add( object );
        }
        else
        {
            this.scene.add( object );
        }
    }

    editorObject.object = object;
    editorObject.helpers = [];
    editorObject.gizmos  = [];

    if( object instanceof THREE.Scene )
    {
    }
    else
    if( object instanceof THREE.Group )
    {
        var selectionHelper = new THREE.BoxHelper( object, undefined, { local: true } );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        /*
        var objectPicking = object.clone( false );
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
        */
    }
    else
    if( object instanceof THREE.Mesh )
    {
        var selectionHelper = new THREE.BoxHelper( object, undefined, { withoutChildren: true, local: true } );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        var objectPicking = object.clone( false );
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        if( object.material instanceof Array )
        {
            var materials = object.material;
           
            length = materials.length;
            for( var i = 0; i < length; ++i )
            {
                var material = materials[i];
                material.name = material.name || object.name + "_material";
                this.addMaterial( material );
            }
        }
        else
        if( object.material instanceof THREE.Material )
        {
            var material = object.material;
            material.name = material.name || object.name + "_material";
            this.addMaterial( material );
        }

        var geometry = object.geometry;
        geometry.name = geometry.name || object.name + "_geometry";
        this.addGeometry( geometry );
    }
    else
    if( object instanceof THREE.Camera )
    {
        editorObject.helpers.push( new THREE.CameraHelper( object ) );
    }
    else
    if( object instanceof THREE.AmbientLight )
    {
    }
    else
    if( object instanceof THREE.PointLight )
    {
        //editorObject.helpers.push( new THREE.PointLightHelper( object ) );
    }
    else
    if( object instanceof THREE.DirectionalLight )
    {
        editorObject.helpers.push( new THREE.DirectionalLightHelper( object ) );
    }
    else
    if( object instanceof THREE.SpotLight )
    {
        var objectPickingMaterial = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        var objectPicking = new THREE.Mesh( new THREE.TetrahedronGeometry( 0.6, 0 ), objectPickingMaterial );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        var selectionHelper = new THREE.BoxHelper( objectPicking, undefined, { withoutChildren: true } );
        selectionHelper.visible = false;
        editorObject.gizmos.push( selectionHelper );

        var spotLightHelper1 = new THREE.Mesh(  new THREE.TetrahedronGeometry( 0.6, 0 ), new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
        spotLightHelper1.matrixWorld = object.matrixWorld;
        spotLightHelper1.matrixAutoUpdate = false;
        editorObject.helpers.push( spotLightHelper1 );

        var spotLightHelper2 = new THREE.SpotLightHelper( object );
        editorObject.helpers.push( spotLightHelper2 );
     }
    else
    if( object instanceof THREE.HemisphereLight )
    {
        editorObject.helpers.push( new THREE.HemisphereLightHelper( object ) );
    }
    else
    if( object instanceof THREE.RectAreaLight )
    {
        editorObject.helpers.push( new THREE.RectAreaLightHelper( object ) );
    }    
    else
    if( object instanceof THREE.SkinnedMesh )
    {
        editorObject.helpers.push( new THREE.SkeletonHelper( object ) );
    }
    else
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        var objectPicking = object.clone( false );
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }

    length = editorObject.helpers.length;
    for( var i = 0; i < length; ++i )
    {
        this.sceneHelpers.add( editorObject.helpers[i] );
    }

    length = editorObject.gizmos.length;
    for( var i = 0; i < length; ++i )
    {
        this.sceneGizmos.add( editorObject.gizmos[i] );
    }
     
    this.sceneObjects.push( editorObject );

    var parentId = ( object.parent !== undefined ) ? this.getEditorIdFromObject( object.parent ) : undefined;
    this.eventDispatcher.dispatchEvent( "onSceneObjectAdded", { objectId: editorObject.id, parentId: parentId, name: editorObject.object.name } );
  
    length = object.children.length
    for( var i = 0; i < length; ++i )
    {
        this.sceneObjectAdd( object.children[i], { dontAddToScene : true } );
    }

    this.objectTransformSet( object, transform );

    return editorObject.id;
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectAdded = function( objectId )
{
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectRemove = function( object )
{
    if( object != null )
    {
        var length = this.sceneObjects.length;
        for( var i = 0; i < length; ++i )
        {
            var editorObject = this.sceneObjects[i];

            if( editorObject.object === object )
            {
                if( ( this.selection.object != null ) && ( editorObject.id == this.selection.object.id ) )
                {
                    this.deselect( { objectId: editorObject.id } );
                }

                var helpersLength = editorObject.helpers.length;
                for( var j = 0 ; j < helpersLength; ++j )
                {
                    var helper = editorObject.helpers[ j ];
                    if( helper.parent != null )
                    {
                        helper.parent.remove( helper );
                    }
                }

                var gizmosLength = editorObject.gizmos.length;
                for( var j = 0 ; j < gizmosLength; ++j )
                {
                    var gizmo = editorObject.gizmos[ j ];
                    if( gizmo.parent != null )
                    {
                        gizmo.parent.remove( gizmo );
                    }
                }

                if( editorObject.objectPicking != null )
                {
                    editorObject.objectPicking.parent.remove( editorObject.objectPicking );
                }

                this.eventDispatcher.dispatchEvent( "onSceneObjectRemoved", this.sceneObjects[i].id );
                if( this.sceneObjects[i].object.parent != null )
                {
                    this.sceneObjects[i].object.parent.remove( this.sceneObjects[i].object );
                }

                this.sceneObjects.splice( i, 1 );

                break;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectRemoved = function( objectId )
{
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectSelect = function( objectId )
{
    /*
    if( this.selection.object != null )
    {
        this.doUndoManager.addCommand( new DeselectObjectCommand( this, this.selection.object.id ) );
        this.doUndoManager.do();
    }
    */

    var select = true;

    if( objectId != null )
    {
        var object = this.getEditorObjectFromEditorId( objectId );
        if( object !== undefined )
        {
            if( object.object.visible === false )
            {
                select = false;
            }
        }
    }

    if( select == true )
    {
        this.doUndoManager.addCommand( new SelectObjectCommand( this, objectId ) );
        this.doUndoManager.do();
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectSelected = function( objectId )
{
    if( objectId != null )
    {
        var editorObject = this.getEditorObjectFromEditorId( objectId );
        if( editorObject !== undefined )
        {
            if( editorObject.gizmos.length > 0 )
            {
                editorObject.gizmos[ EHelperSlots.SELECTION ].visible = true;
            }
        }
    }

    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectDeselect = function( editorObjectId )
{
    if( this.selection.object != null )
    {
        this.doUndoManager.addCommand( new DeselectObjectCommand( this, this.selection.object.id ) );
        this.doUndoManager.do();
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectDeselected = function( objectId )
{
    if( objectId != null )
    {
        var editorObject = this.getEditorObjectFromEditorId( objectId );
        if( editorObject != null )
        {
            if( editorObject.gizmos.length > 0 )
            {
                if( editorObject.gizmos.length > 0 )
                {
                    editorObject.gizmos[ EHelperSlots.SELECTION ].visible = false;
                }
            }
        }
    }

    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectCreate = function( data )
{
    this.doUndoManager.addCommand( new CreateObjectCommand( this, data ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectCreated = function( data )
{
    this.render();    
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectDelete = function( data )
{
    if( data.objectId > 1 )
    {
        this.doUndoManager.addCommand( new DeleteObjectCommand( this, data ) );
        this.doUndoManager.do();
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectDeleted = function( data )
{
    //this.render();    
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectTranslate = function( objectId, oldPosition, newPosition )
{
    this.doUndoManager.addCommand( new TranslateObjectCommand( this, objectId, oldPosition, newPosition ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectTranslated = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectScale = function( objectId, oldScale, newScale )
{
    this.doUndoManager.addCommand( new ScaleObjectCommand( this, objectId, oldScale, newScale ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectScaled = function( objectId )
{
    var editorObject = this.getEditorObjectFromEditorId( objectId );
    var object = editorObject.object;

    object.updateMatrixWorld();


    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectRotate = function( objectId, oldRotation, newRotation )
{
    this.doUndoManager.addCommand( new RotateObjectCommand( this, objectId, oldRotation, newRotation ) );
    this.doUndoManager.do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectRotated = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectPropertyChanged = function( data )
{
    switch( data.property )
    {
        case "transform":
        {
            this.sceneObjectUpdateSelectionHelpers( data.id );
        }
        break;

        default:
        break;
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectUpdateSelectionHelpers = function( id, fromChild )
{
    var editorObject = this.getEditorObjectFromEditorId( id );
    if( editorObject != null )
    {
        if( ( editorObject.object instanceof THREE.Group ) && ( fromChild == false ) ) {}
        else
        if( ( editorObject.object instanceof THREE.Scene ) && ( fromChild == false ) ) {}
        else
        {
            if( editorObject.gizmos.length > 0 )
            {
                var boxHelper = editorObject.gizmos[ EHelperSlots.SELECTION ];
                if( boxHelper instanceof THREE.BoxHelper )
                {
                    boxHelper.update();
                }
            }

            var parent = editorObject.object.parent;
            if( parent instanceof THREE.Group )
            {
                var parentId = this.getEditorIdFromObject( parent );
                this.sceneObjectUpdateSelectionHelpers( parentId, true );
            }
        }
    }
}
