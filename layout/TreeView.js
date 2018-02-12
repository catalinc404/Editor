
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeView( dispatcher, element ) 
{
    this.dispatcher = dispatcher;
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
       
    this.dispatcher.addEventListener( "sceneCreated",     this.onSceneCreated.bind( this ) );
    this.dispatcher.addEventListener( "objectAdded",      this.onObjectAdded.bind( this ) );
    this.dispatcher.addEventListener( "objectSelected",   this.onObjectSelected.bind( this ) );
    this.dispatcher.addEventListener( "objectDeselected", this.onObjectDeselected.bind( this ) );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TreeView.prototype = Object.assign( Object.create( Object.prototype ), 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor: TreeView,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onSceneCreated: function( scene )
    {
        this.clearTree();

        this.scene = scene;
        this.createTree()
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onObjectAdded : function( object )
    {
        if( object === undefined )
        {
            return;
        }

        this.addObject( object, object.parent.id );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onObjectSelected : function( selection )
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
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onObjectDeselected : function( selection )
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
    },
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clearTree: function()
    {        
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createTree: function()
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
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addObject: function( object, parentId )
    {
        var name = object.name != "" ? object.name : "untitled object"; 
        this.tree.add( { label: name, parent: parentId, id: object.id, opened: (object.children.length > 0) });
       
        for( var i = 0; i < object.children.length; ++i )
        {
            this.addObject( object.children[i], object.id );
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setSelection: function( id )
    {
        if( this.tree !== undefined )
        {
            this.tree.select( id );
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onTreeElementSelected: function( event )
    {
        if( event === undefined || this.disableEvents )
        {
            return;
        }

        this.disableEvents = true;
        var object = this.scene.getObjectById( parseInt( event.detail.id ) );
        this.dispatcher.dispatchEvent( "objectSelected", [object] );
        this.disableEvents = undefined;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onTreeElementDeselected: function( event )
    {
        if( event === undefined || this.disableEvents )
        {
            return;
        }

        this.disableEvents = true;
        var object = this.scene.getObjectById( parseInt( event.detail.id ) );
        this.dispatcher.dispatchEvent( "objectDeselected", [object] );
        this.disableEvents = undefined;
    }
    
} )