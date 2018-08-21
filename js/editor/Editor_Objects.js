//////////////////////////////////////////////////////////////////////////////
Editor.prototype.getSelection = function()
{   
    var selection = {};
    selection.objectId = this.getEditorIdFromEditorObject( editor.selection.object );
    selection.materialId = this.selection.materialId;
    selection.geometryId = this.selection.geometryId;

    console.log( "Editor.GetCurrentSelection: objectId:" + selection.objectId + ", materialId: " + selection.materialId + ", geometryId: " + selection.geometryId );

    return selection;
};

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.select = function( componentData )
{
    console.log( "Editor.Select: objectId:" + componentData.objectId + ", materialId: " + componentData.materialId + ", geometryId: " + componentData.geometryId );

    if( componentData.objectId != null )
    {
        var object = this.getEditorObjectFromEditorId( componentData.objectId );
        if( object != null )
        {
            this.selection.object = this.getEditorObjectFromEditorId( componentData.objectId )
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
    console.log( "Editor.Deselect: objectId:" + componentData.objectId + ", materialId: " + componentData.materialId + ", geometryId: " + componentData.geometryId );

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
Editor.prototype.sceneObjectAdd = function( object, parameters  )
{
    var editorObject = {}
    parameters = parameters || {};

    editorObject.id = ( parameters.objectId !== undefined ) ?  parameters.objectId : ++this.sceneObjectsId;

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

    object.updateMatrixWorld();

    editorObject.object = object;
    editorObject.helpers = [];
    editorObject.gizmos  = [];

    var position = new THREE.Vector3();
    position.copy( object.position );
    object.position.set( 0, 0, 0 );
    object.updateMatrixWorld();

    if( object instanceof THREE.Scene )
    {
    }
    else
    if( object instanceof THREE.Mesh )
    {
        var selectionHelper = new THREE.BoxHelper( object );
        selectionHelper.visible = false;
        selectionHelper.matrixWorld = object.matrixWorld;
        selectionHelper.matrixAutoUpdate = false;
        editorObject.gizmos.push( selectionHelper );

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;

        var material = object.material;
        if( material.name == '' )
        {
            material.name = object.name + "_material";
        } 
        this.addMaterial( material );

        var geometry = object.geometry;
        if( geometry.name == '' )
        {
            geometry.name = object.name + "_geometry";
        } 
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
        editorObject.helpers.push( new THREE.PointLightHelper( object ) );
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

        var selectionHelper = new THREE.BoxHelper( objectPicking );
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

        var objectPicking = object.clone();
        objectPicking.material = new THREE.MeshBasicMaterial( { color: editorObject.id } );
        objectPicking.matrixWorld = object.matrixWorld;
        objectPicking.matrixAutoUpdate = false;
        this.scenePicking.add( objectPicking );
        editorObject.objectPicking = objectPicking;
    }

    object.position.set( position.x, position.y, position.z );
    object.updateMatrixWorld();

    if( editorObject.helpers.length > 0 )
    {
        for( var i = 0; i < editorObject.helpers.length; ++i )
        {
            this.sceneHelpers.add( editorObject.helpers[i] );
        }
    }

    for( var i = 0; i < editorObject.gizmos.length; ++i )
    {
        this.sceneGizmos.add( editorObject.gizmos[i] );
    }
     
    this.sceneObjects.push( editorObject );

    var parentId = ( object.parent !== undefined ) ? this.getEditorIdFromObject( object.parent ) : undefined;
    this.eventDispatcher.dispatchEvent( "onSceneObjectAdded", { objectId: editorObject.id, parentId: parentId, name: editorObject.object.name } );
  
    for( var i = 0; i < object.children.length; ++i )
    {
        this.sceneObjectAdd( object.children[i], { dontAddToScene : true } );
    }

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
        for( var i = 0; i < this.sceneObjects.length; ++i )
        {
            if( this.sceneObjects[i].object === object )
            {
                if( this.sceneObjects[i].id === this.selection.objectId )
                {
                    this.deselect( { objectId: this.sceneObjects[i].id } );

                    break;
                }

                this.eventDispatcher.dispatchEvent( "onSceneObjectRemoved", this.sceneObjects[i].id );
                this.sceneObjects[i].object.parent.remove( this.sceneObjects[i].object );
                this.sceneObjects.splice( i, 1 );
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
        this.doUndoManager.AddCommand( new DeselectObjectCommand( this, this.selection.object.id ) );
        this.doUndoManager.Do();
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
        this.doUndoManager.AddCommand( new SelectObjectCommand( this, objectId ) );
        this.doUndoManager.Do();
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
                editorObject.gizmos[0].visible = true;
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
        this.doUndoManager.AddCommand( new DeselectObjectCommand( this, this.selection.object.id ) );
        this.doUndoManager.Do();
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
                editorObject.gizmos[0].visible = false;
            }
        }
    }

    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectCreate = function( data )
{
    this.doUndoManager.AddCommand( new CreateObjectCommand( this, data ) );
    this.doUndoManager.Do();
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
        this.doUndoManager.AddCommand( new DeleteObjectCommand( this, data ) );
        this.doUndoManager.Do();
    }
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectDeleted = function( data )
{
    this.render();    
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectTranslate = function( objectId, oldPosition, newPosition )
{
    this.doUndoManager.AddCommand( new TranslateObjectCommand( this, objectId, oldPosition, newPosition ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsTranslated = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectScale = function( objectId, oldScale, newScale )
{
    this.doUndoManager.AddCommand( new ScaleObjectCommand( this, objectId, oldScale, newScale ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsScaled = function( objectId )
{
    this.render();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.sceneObjectRotate = function( objectId, oldRotation, newRotation )
{
    this.doUndoManager.AddCommand( new RotateObjectCommand( this, objectId, oldRotation, newRotation ) );
    this.doUndoManager.Do();
}

//////////////////////////////////////////////////////////////////////////////
Editor.prototype.onSceneObjectsRotated = function( objectId )
{
    this.render();
}
