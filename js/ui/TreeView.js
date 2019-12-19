
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeView( eventDispatcher, element ) 
{
    //console.log( "TreeView" );

    this.eventDispatcher = eventDispatcher;
    this.element = element;

    var _this = this;

    if(  this.element !== undefined )
    {
        this.tree = new VanillaTree( this.element, { contextmenu: { callback: this.onTreeElementContextMenu.bind( this ) } } );

        this.element.addEventListener( "vtree-select", this.onTreeElementSelected.bind( this ) );
        this.element.addEventListener( "vtree-deselect", this.onTreeElementDeselected.bind( this ) );
        this.element.addEventListener( "vtree-drag", this.onTreeElementDragged.bind( this ) );
    }
    
    this.eventDispatcher.addEventListener( "onSceneObjectAdded",                this.onSceneObjectAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectRemoved",              this.onSceneObjectRemoved.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectSelected",             this.onSceneObjectSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectDeselected",           this.onSceneObjectDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectPropertyChanged",      this.onSceneObjectPropertyChanged.bind( this ) );
    
    this.eventDispatcher.addEventListener( "onSceneGeometryAdded",              this.onSceneGeometryAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometryRemoved",            this.onSceneGeometryRemoved.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometrySelected",           this.onSceneGeometrySelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometryDeselected",         this.onSceneGeometryDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneGeometryPropertyChanged",    this.onSceneGeometryPropertyChanged.bind( this ) );

    this.eventDispatcher.addEventListener( "onSceneMaterialAdded",              this.onSceneMaterialAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialRemoved",            this.onSceneMaterialRemoved.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialSeleted",            this.onSceneMaterialSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialDeselected",         this.onSceneMaterialDeselected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneMaterialPropertyChanged",    this.onSceneMaterialPropertyChanged.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: TreeView,
} );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onresize = function()
{
    //console.log( "TreeView.prototype.onResize" );

    var rectangle = {};

    rectangle.left    = parseInt( this.element.style.left,   10 ) || 0;
    rectangle.top     = parseInt( this.element.style.top,    10 ) || 0;
    rectangle.width   = parseInt( this.element.style.width,  10 ) || 0;
    rectangle.height  = parseInt( this.element.style.height, 10 ) || 0;
    if( this.element.parentElement != null )
    {
        rectangle.width = parseInt( this.element.parentElement.style.width,  10 ) || rectangle.width;
    }

    setElementSize(  this.element, rectangle.left, rectangle.top, rectangle.width, rectangle.height );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectAdded = function( data )
{
    var contextMenu = this.eventDispatcher.runCommand( "getTypeInfoFromId", data.objectId ).commands;

    this.addElement( data.name, data.objectId, ( data.parentId !== undefined ) ? data.parentId : null, contextMenu );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectRemoved = function( id )
{
    this.removeElement( id );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectSelected = function( objectId )
{
    if( this.disableEvents != null )
    {
        return;
    }

    this.disableEvents = true;
    this.setSelectedElement( objectId )
    this.disableEvents = undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectDeselected = function( objectId )
{
    if( this.disableEvents != null  )
    {
        return;
    }

    this.disableEvents = true;
    this.setSelectedElement( objectId )
    this.disableEvents = undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectPropertyChanged = function( data )
{
    this.onSceneComponentPropertyChanged( data );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneGeometryAdded = function( data )
{
    var contextMenu = this.eventDispatcher.runCommand( "getTypeInfoFromId", data.geometryId ).commands;

    this.addElement( data.name, data.geometryId, ( data.parentId !== undefined ) ? data.parentId : null, contextMenu );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneGeometryRemoved = function( data )
{
    this.removeElement( data.geometryId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneGeometrySelected = function( data )
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneGeometryDeselected = function( data )
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneGeometryPropertyChanged = function( data )
{
    this.onSceneComponentPropertyChanged( data );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneMaterialAdded = function( data )
{
    var contextMenu = this.eventDispatcher.runCommand( "getTypeInfoFromId", data.materialId ).commands;

    this.addElement( data.name, data.materialId, ( data.parentId !== undefined ) ? data.parentId : null, contextMenu );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneMaterialRemoved = function( data )
{
    this.removeElement( data.materialId );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneMaterialSelected = function( data )
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneMaterialDeselected = function( data )
{
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneMaterialPropertyChanged = function( data )
{
    this.onSceneComponentPropertyChanged( data );    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneComponentPropertyChanged = function( data )
{
    if( data.property === "name" )
    {
        this.renameElement( data.id, data.value );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.resizeTree = function( rectangle )
{
    if( this.tree !== undefined )
    {
        this.tree.setWidth( rectangle.width );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.addElement = function( name, id, parentId, contextMenu )
{
    this.tree.add( { label: name, parent: parentId, id: id, contextmenu: contextMenu, opened: true, draggable: true });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.removeElement = function( id )
{
    this.tree.remove( id );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.renameElement = function( id, name )
{
    this.tree.rename( id, name );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.setSelectedElement = function( id )
{
    if( this.tree !== undefined )
    {
        this.tree.select( id );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeElementSelected = function( event )
{
    if( event === undefined || this.disableEvents )
    {
        return;
    }

    this.disableEvents = true;

    var id = parseInt( event.detail.id );
    this.eventDispatcher.runCommand( "executeCommand", { id: id, command: "select" } );

    this.disableEvents = undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeElementDeselected = function( event )
{
    if( event === undefined || this.disableEvents )
    {
        return;
    }

    this.disableEvents = true;

    var id = parseInt( event.detail.id );
    this.eventDispatcher.runCommand( "executeCommand", { id: id, command: "deselect" } );

    this.disableEvents = undefined;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeElementContextMenu = function( id, command )
{
    this.eventDispatcher.runCommand( "executeCommand", { id: parseInt( id ), command: command } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeElementDragged = function( event )
{
    this.eventDispatcher.dispatchEvent( "onComponentDragged", event.detail.id );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

