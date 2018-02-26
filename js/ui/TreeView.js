
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeView( eventDispatcher, element ) 
{
    //console.log( "TreeView" );

    this.eventDispatcher = eventDispatcher;
    this.element = element;

    if(  this.element !== undefined )
    {
        this.tree = new VanillaTree( this.element, 
            {
              contextmenu: [{
                  label: 'Menu 1',
                  action: function(id) {
                    alert('Menu 1 ' + id);
                  }
                }, {
                  label: 'Menu 2',
                  action: function(id) {
                    alert('Menu 2 ' + id);
                  }
                }]
            });

        this.element.addEventListener( "vtree-select", this.onTreeElementSelected.bind( this ) );
        this.element.addEventListener( "vtree-deselect", this.onTreeElementDeselected.bind( this ) );
    }
       
    this.eventDispatcher.addEventListener( "onSceneCreated",           this.onSceneCreated.bind( this ) );
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
TreeView.prototype.onSceneCreated = function( scene )
{
    this.clearTree();

    this.scene = scene;
    this.createTree()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.onSceneObjectAdded = function( object )
{
    if( object === undefined )
    {
        return;
    }

    this.addObject( object, object.parent.id );
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
        this.setSelection( selection[0].id )
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
        this.setSelection( (selection.length > 0) ? selection[0].id : -1 );
        this.disableEvents = undefined;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype.createTree = function()
{
    if( this.tree !== undefined && this.scene !== undefined )
    {
        var name = this.scene.name != "" ? this.scene.name : "untitled scene"; 
        this.tree.add( { label: name, parent: null, id: this.scene.id, opened: (this.scene.children.length > 0) });
        
        for( var i = 0; i < this.scene.children.length; ++i )
        {
            this.addObject( this.scene.children[i], this.scene.id );
        }
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
TreeView.prototype.addObject = function( object, parentId )
{
    var name = object.name != "" ? object.name : "untitled object"; 
    this.tree.add( { label: name, parent: parentId, id: object.id, opened: (object.children.length > 0) });
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
    var object = this.scene.getObjectById( parseInt( event.detail.id ) );
    this.eventDispatcher.dispatchEvent( "onSceneObjectsSelected", [object] );
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
    var object = this.scene.getObjectById( parseInt( event.detail.id ) );
    this.eventDispatcher.dispatchEvent( "onSceneObjectsDeselected", [object] );
    this.disableEvents = undefined;
}
