
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeView( eventDispatcher, element ) 
{
    //console.log( "TreeView" );

    this.eventDispatcher = eventDispatcher;
    this.element = element;

    var _this = this;

    if(  this.element !== undefined )
    {
        this.tree = new VanillaTree( this.element, 
            {
                contextmenu: 
                [
                    {
                        label: 'Add Group',
                        action: function( id )
                        {
                            _this.onTreeConetxtMenuCreateObjectGroup( { id: id } );
                        }
                    },
                    {
                        label: 'Create Box',
                        action: function( id )
                        {
                            _this.onTreeConetxtMenuCreateObjectBox( { id: id } );
                        }
                    },
                    {
                        label: 'Create Quad',
                        action: function( id )
                        {
                            _this.onTreeConetxtMenuCreateObjectQuad( { id: id } );
                        }
                    },
                    {
                        label: 'Remove',
                        action: function( id )
                        {
                            _this.onTreeConetxtMenuRemoveObject( { id: id } );
                        }
                    },
                ]
            });

        this.element.addEventListener( "vtree-select", this.onTreeElementSelected.bind( this ) );
        this.element.addEventListener( "vtree-deselect", this.onTreeElementDeselected.bind( this ) );
    }
    
    this.eventDispatcher.addEventListener( "onEditorCreated",          this.onEditorCreated.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectAdded",       this.onSceneObjectAdded.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsSelected",   this.onSceneObjectsSelected.bind( this ) );
    this.eventDispatcher.addEventListener( "onSceneObjectsDeselected", this.onSceneObjectsDeselected.bind( this ) );
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
TreeView.prototype.onEditorCreated = function()
{
    this.clearTree();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectAdded = function( data )
{
    this.addObject( data.name, data.objectId, ( data.parentId !== undefined ) ? data.parentId : null );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectsSelected = function( selection )
{
    if( this.disableEvents !== undefined  )
    {
        return;
    }

    if( selection instanceof Array )
    {
        this.disableEvents = true;
        this.setSelection( selection[0] )
        this.disableEvents = undefined;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectsDeselected = function( selection )
{
    if( this.disableEvents !== undefined  )
    {
        return;
    }

    if( selection instanceof Array )
    {
        this.disableEvents = true;
        this.setSelection( selection[0] )
        this.disableEvents = undefined;
    }
}
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.clearTree = function()
{
    if( this.tree !== undefined )
    {
        //todo
    }        
}

TreeView.prototype.resizeTree = function( rectangle )
{
    if( this.tree !== undefined )
    {
        this.tree.setWidth( rectangle.width );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.addObject = function( name, objectId, parentId )
{
    this.tree.add( { label: name, parent: parentId, id: objectId, opened: true });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.setSelection = function( id )
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

    var objectId = parseInt( event.detail.id );
    this.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", [objectId] );
    
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

    var objectId = parseInt( event.detail.id );
    this.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", [objectId] );

    this.disableEvents = undefined;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeConetxtMenuCreateObjectGroup = function( event )
{
    var objectId = parseInt( event.id );
    this.eventDispatcher.dispatchEvent( "sceneCreateObject", { parentId: objectId, type: "group" } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeConetxtMenuCreateObjectBox = function( event )
{
    var objectId = parseInt( event.id );
    this.eventDispatcher.dispatchEvent( "sceneCreateObject", { parentId: objectId, type: "box" } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeConetxtMenuCreateObjectQuad = function( event )
{
    var objectId = parseInt( event.id );
    this.eventDispatcher.dispatchEvent( "sceneCreateObject", { parentId: objectId, type: "quad" } );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onTreeConetxtMenuRemoveObject = function( event )
{
    var objectId = parseInt( event.detail.id );
    this.eventDispatcher.dispatchEvent( "sceneRemoveObject", { objectId: objectId } );
}

