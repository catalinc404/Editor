
(function (root, factory) {
	if (typeof define == 'function' && define.amd)
	{
        define( factory );
	}
	else 
	if( typeof exports === 'object' && typeof module !== 'undefined' )
	{
        module.exports = factory();
	} 
	else
	{
        root.VanillaTree = factory();
    }
}(this, function ()
{
	"use strict";
	// Look at the Balalaika https://github.com/finom/balalaika
	var $=function(n,e,k,h,p,m,l,b,d,g,f,c){c=function(a,b){return new c.i(a,b)};c.i=function(a,d){k.push.apply(this,a?a.nodeType||a==n?[a]:""+a===a?/</.test(a)?((b=e.createElement(d||"q")).innerHTML=a,b.children):(d&&c(d)[0]||e).querySelectorAll(a):/f/.test(typeof a)?/c/.test(e.readyState)?a():c(e).on("DOMContentLoaded",a):a:k)};c.i[f="prototype"]=(c.extend=function(a){g=arguments;for(b=1;b<g.length;b++)if(f=g[b])for(d in f)a[d]=f[d];return a})(c.fn=c[f]=k,{on:function(a,d){a=a.split(h);this.map(function(c){(h[b=a[0]+(c.b$=c.b$||++p)]=h[b]||[]).push([d,a[1]]);c["add"+m](a[0],d)});return this},off:function(a,c){a=a.split(h);f="remove"+m;this.map(function(e){if(b=(g=h[a[0]+e.b$])&&g.length)for(;d=g[--b];)c&&c!=d[0]||a[1]&&a[1]!=d[1]||(e[f](a[0],d[0]),g.splice(b,1));else!a[1]&&e[f](a[0],c)});return this},is:function(a){d=(b=this[0])&&(b.matches||b["webkit"+l]||b["moz"+l]||b["ms"+l]);return!!d&&d.call(b,a)}});return c}(window,document,[],/\.(.+)/,0,"EventListener","MatchesSelector");

	var create = 
	function( tagName, props ) 
	{
		return $.extend( document.createElement( tagName ), props );
	},
	Tree = function( s, options )
	{
		var _this = this,
		container = _this.container = $( s )[ 0 ],
		tree = _this.tree = container.appendChild( create( 'ul', { className: 'vtree' } ) );

		_this.placeholder = options && options.placeholder;
		_this._placeholder();
		_this.leafs = {};
		tree.addEventListener( 'click', function( evt )
		{
			if( $( evt.target ).is( '.vtree-leaf-label' ) )
			{
				_this.select( evt.target.parentNode.getAttribute( 'data-vtree-id' ) );
			}
			else 
			if( $( evt.target ).is( '.vtree-toggle' ) )
			{
				_this.toggle( evt.target.parentNode.getAttribute( 'data-vtree-id' ) );
			}
		} );

		if( options && options.contextmenu )
		{
			tree.addEventListener( 'contextmenu', 	function( evt )
													{
														if( $( evt.target ).is( '.vtree-leaf-label' ) )
														{
															if( _this.hasContextMenu( evt.target ) )
															{
																evt.preventDefault();
																evt.stopPropagation();
										
																_this.clearContextMenu();
																_this.buildContextMenu( evt.target, options.contextmenu.callback );
															}
														}
													} );

				document.addEventListener( 'click',	function( evt ) 
													{  
														if( evt.button === 2 ) return; 
														_this.clearContextMenu();
													} );
		}
	};

	Tree.prototype =
	{
		constructor: Tree,
		
		_dispatch: function( name, id ) 
		{
			var event;
			try
			{
				event = new CustomEvent( 'vtree-' + name, {	bubbles: true, cancelable: true, detail: { id: id }	} );
			} 
			catch(e)
			{
				event = document.createEvent( 'CustomEvent' );
				event.initCustomEvent( 'vtree-' + name, true, true, { id: id });
			}
			
			( this.getLeaf( id, true ) || this.tree ).dispatchEvent( event );

			return this;
		},
		_placeholder: function()
		{
			var p;
			if( !this.tree.children.length && this.placeholder )
			{
				this.tree.innerHTML = '<li class="vtree-placeholder">' + this.placeholder + '</li>'
			}
			else
			if( p = this.tree.querySelector( '.vtree-placeholder' ) )
			{
				this.tree.removeChild( p );
			}
			
			return this;
		},

		getLeaf: function( id, notThrow )
		{
			var leaf = $( '[data-vtree-id="' + id + '"]', this.tree )[ 0 ];
			
			if( !notThrow && !leaf ) 
				throw Error( 'No VanillaTree leaf with id "' + id + '"' )

			return leaf;
		},

		getChildList: function( id )
		{
			var list, parent;
			
			if( id )
			{
				parent = this.getLeaf( id );
				if( !( list = $( 'ul', parent )[ 0 ] ) )
				{
					list = parent.appendChild( create( 'ul', { className: 'vtree-subtree' } ) );
				}
			} 
			else
			{
				list = this.tree;
			}

			return list;
		},

		add: function( options )
		{
			var id,
				leaf = create( 'li', { className: 'vtree-leaf' } ),
				parentList = this.getChildList( options.parent ),
				_this = this;

			leaf.setAttribute( 'data-vtree-id', id = options.id || Math.random() );

			leaf.appendChild( create( 'span', {	className: 'vtree-toggle', innerHTML: '' } ) );

			var label = create( 'a', { className: 'vtree-leaf-label',	innerHTML: options.label } );
			if( options.draggable )
			{
				label.draggable = true;
				label.ondragstart = function( event )
				{
					event.dataTransfer.setData("text/item", id.toString() );
				};
				label.ondrop = function( event )
				{
					var draggedItems = [];
					var data = event.dataTransfer;

					if( data.items.length > 0 )
					{
						for( var i = 0, size = data.items.length; i < size; ++i )
						{
							if( data.items[i].kind === "string" )
							{
								if( data.items[i].type === "text/item" )
								{
									draggedItems.push( { source: { id: parseInt( data.getData( "text/item" ) ) }, destination: { id: id } } );
								}
								else
								{
									console.log( "unhandled transfer type: " + data.items[i].type );
								}
							}
							else
							if( data.items[i].kind === "file" )
							{
								draggedItems.push( { source: { file: data.items[i].getAsFile(), type: data.items[i].type }, destination: { id: id } } );
							}
						}
					}

					_this._placeholder()._dispatch( 'drag', draggedItems );

					event.preventDefault();
				};
				label.ondragover = function( event )
				{
					event.preventDefault();
				};
			}
			leaf.appendChild( label );

			parentList.appendChild( leaf );

			if( parentList !== this.tree )
			{
				parentList.parentNode.classList.add( 'vtree-has-children' );
			}

			this.leafs[ id ] = options;

			if( !options.opened )
			{
				this.close( id );
			}

			if( options.selected )
			{
				this.select( id );
			}

			return this._placeholder()._dispatch( 'add', id );
		},

		move: function( id, parentId )
		{
			var leaf = this.getLeaf( id ),
				oldParent = leaf.parentNode,
				newParent = this.getLeaf( parentId, true );

			if( newParent )
			{
				newParent.classList.add( 'vtree-has-children' );
			}

			this.getChildList( parentId ).appendChild( leaf );
			oldParent.parentNode.classList.toggle( 'vtree-has-children', !!oldParent.children.length );

			return this._dispatch( 'move', id );
		},

		remove: function( id )
		{
			var leaf = this.getLeaf( id ),
				oldParent = leaf.parentNode;
		
			oldParent.removeChild( leaf );
			oldParent.parentNode.classList.toggle( 'vtree-has-children', !!oldParent.children.length );

			return this._placeholder()._dispatch( 'remove', id );
		},

		open: function( id )
		{
			var leaf  = this.getLeaf( id );
			
			leaf.classList.remove( 'closed' );

			return this._dispatch( 'open', id );
		},

		close: function( id )
		{
			var leaf  = this.getLeaf( id );
		
			leaf.classList.add( 'closed' );
		
			return this._dispatch( 'close', id );
		},
		
		toggle: function( id )
		{
			return this[ this.getLeaf( id ).classList.contains( 'closed' ) ? 'open' : 'close' ]( id );
		},

		select: function( id )
		{
			if( id == -1)
			{
				var prevSelectedLeaf = undefined;
				$( 'li.vtree-leaf', this.tree ).forEach( function( leaf ) 
				{
					if( leaf.classList.contains( 'vtree-selected' ) )
					{
						prevSelectedLeaf = leaf;
					}
					leaf.classList.remove( 'vtree-selected' );
				});

				if( prevSelectedLeaf !== undefined )
				{
					this._dispatch( 'deselect', prevSelectedLeaf.getAttribute( 'data-vtree-id' ) );
				}
				
				return this;
			}

			var leaf = this.getLeaf( id );
			var prevSelectedLeaf = undefined;
			
			if( !leaf.classList.contains( 'vtree-selected' ) ) 
			{
				$( 'li.vtree-leaf', this.tree ).forEach( function( leaf ) 
				{
					if( leaf.classList.contains( 'vtree-selected' ) )
					{
						prevSelectedLeaf = leaf;
					}
					leaf.classList.remove( 'vtree-selected' );
				});

				if( prevSelectedLeaf !== undefined )
				{
					this._dispatch( 'deselect', prevSelectedLeaf.getAttribute( 'data-vtree-id' ) );
				}
				
				leaf.classList.add( 'vtree-selected' );
				this._dispatch( 'select', id );
			}
			else
			{
				leaf.classList.remove( 'vtree-selected' );
				this._dispatch( 'deselect', id );
			}

			return this;
		},

		rename: function( id, name )
		{
			var leaf = this.getLeaf( id ), label;
			if( ( label = $( 'a.vtree-leaf-label', leaf )[ 0 ] ) )
			{
				label.innerHTML = name;
			}
			
			return this;
		},

		setWidth: function( width )
		{
			this.tree.style.width = width + "px"; 
		},

		clearContextMenu: function()
		{
			$( '.vtree-contextmenu' ).forEach( 
				function( menu )
			 	{
					menu.parentNode.removeChild( menu );
				} );
		},
		
		hasContextMenu: function( node )
		{
			var id = node.parentNode.getAttribute('data-vtree-id');

			return ( this.leafs[ id ].contextmenu != null );
		},
		
		buildContextMenu: function( node, callback )
		{
			if( callback != null )
			{
				var menu = create( 'menu', { className: 'vtree-contextmenu' } );
				var id = node.parentNode.getAttribute('data-vtree-id');

				var rect = node.getBoundingClientRect();
				$.extend(menu.style, {
										top: (node.offsetTop + rect.height).toString() + "px",
										left: node.offsetLeft.toString() + "px",
										display: 'block'
									});
				
				var contextmenu = this.leafs[ id ].contextmenu;
				contextmenu.forEach( function( item )
				{
					var child = menu.appendChild( create( 'li', { className: 'vtree-contextmenu-item', innerHTML: item.name } ) );
					child.addEventListener( 'click', function() { callback( id, item.command ); } );
				});

				node.parentNode.appendChild( menu );
			}
		}
	};

	return Tree;
	// Look at the Balalaika https://github.com/finom/balalaika
}));
