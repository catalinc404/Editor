(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Node( type ) {

		this.uuid = THREE.Math.generateUUID();

		this.name = "";

		this.type = type;

		this.userData = {};

	}

	Node.prototype = {

		constructor: Node,

		isNode: true,

		parse: function ( builder, settings ) {

			settings = settings || {};

			builder.parsing = true;

			this.build( builder.addFlow( settings.slot, settings.cache, settings.context ), 'v4' );

			builder.clearVertexNodeCode();
			builder.clearFragmentNodeCode();

			builder.removeFlow();

			builder.parsing = false;

		},

		parseAndBuildCode: function ( builder, output, settings ) {

			settings = settings || {};

			this.parse( builder, settings );

			return this.buildCode( builder, output, settings );

		},

		buildCode: function ( builder, output, settings ) {

			settings = settings || {};

			var data = { result: this.build( builder.addFlow( settings.slot, settings.cache, settings.context ), output ) };

			data.code = builder.clearNodeCode();

			builder.removeFlow();

			return data;

		},

		build: function ( builder, output, uuid ) {

			output = output || this.getType( builder, output );

			var data = builder.getNodeData( uuid || this );

			if ( builder.parsing ) {

				this.appendDepsNode( builder, data, output );

			}

			if ( builder.nodes.indexOf( this ) === - 1 ) {

				builder.nodes.push( this );

			}

			if ( this.updateFrame !== undefined && builder.updaters.indexOf( this ) === - 1 ) {

				builder.updaters.push( this );

			}

			return this.generate( builder, output, uuid );

		},

		appendDepsNode: function ( builder, data, output ) {

			data.deps = ( data.deps || 0 ) + 1;

			var outputLen = builder.getTypeLength( output );

			if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

				data.outputMax = outputLen;
				data.output = output;

			}

		},

		setName: function ( name ) {

			this.name = name;

			return this;

		},

		getName: function ( builder ) {

			return this.name;

		},

		getType: function ( builder, output ) {

			return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

		},

		getJSONNode: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.nodes[ this.uuid ] !== undefined ) {

				return meta.nodes[ this.uuid ];

			}

		},

		copy: function ( source ) {

			if ( source.name !== undefined ) this.name = source.name;

			if ( source.userData !== undefined ) this.userData = JSON.parse( JSON.stringify( source.userData ) );

		},

		createJSONNode: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			var data = {};

			if ( typeof this.nodeType !== "string" ) throw new Error( "Node does not allow serialization." );

			data.uuid = this.uuid;
			data.nodeType = this.nodeType;

			if ( this.name !== "" ) data.name = this.name;

			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			if ( ! isRootObject ) {

				meta.nodes[ this.uuid ] = data;

			}

			return data;

		},

		toJSON: function ( meta ) {

			return this.getJSONNode( meta ) || this.createJSONNode( meta );

		}

	};

	/**
	 * Automatic node cache
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TempNode( type, params ) {

		Node.call( this, type );

		params = params || {};

		this.shared = params.shared !== undefined ? params.shared : true;
		this.unique = params.unique !== undefined ? params.unique : false;

	}

	TempNode.prototype = Object.create( Node.prototype );
	TempNode.prototype.constructor = TempNode;

	TempNode.prototype.build = function ( builder, output, uuid, ns ) {

		output = output || this.getType( builder );

		if ( this.isShared( builder, output ) ) {

			var isUnique = this.isUnique( builder, output );

			if ( isUnique && this.constructor.uuid === undefined ) {

				this.constructor.uuid = THREE.Math.generateUUID();

			}

			uuid = builder.getUuid( uuid || this.getUuid(), ! isUnique );

			var data = builder.getNodeData( uuid ),
				type = data.output || this.getType( builder );

			if ( builder.parsing ) {

				if ( ( data.deps || 0 ) > 0 ) {

					this.appendDepsNode( builder, data, output );

					return this.generate( builder, output, uuid );

				}

				return Node.prototype.build.call( this, builder, output, uuid );

			} else if ( isUnique ) {

				data.name = data.name || Node.prototype.build.call( this, builder, output, uuid );

				return data.name;

			} else if ( ! this.isShared( builder, type ) || ( ! builder.optimize || data.deps == 1 ) ) {

				return Node.prototype.build.call( this, builder, output, uuid );

			}

			uuid = this.getUuid( false );

			var name = this.getTemp( builder, uuid );

			if ( name ) {

				return builder.format( name, type, output );

			} else {

				name = TempNode.prototype.generate.call( this, builder, output, uuid, data.output, ns );

				var code = this.generate( builder, type, uuid );

				builder.addNodeCode( name + ' = ' + code + ';' );

				return builder.format( name, type, output );

			}

		}

		return Node.prototype.build.call( this, builder, output, uuid );

	};

	TempNode.prototype.isShared = function ( builder, output ) {

		return output !== 'sampler2D' && output !== 'samplerCube' && this.shared;

	};

	TempNode.prototype.isUnique = function ( builder, output ) {

		return this.unique;

	};

	TempNode.prototype.getUuid = function ( unique ) {

		var uuid = unique || unique == undefined ? this.constructor.uuid || this.uuid : this.uuid;

		if ( typeof this.scope == "string" ) uuid = this.scope + '-' + uuid;

		return uuid;

	};

	TempNode.prototype.getTemp = function ( builder, uuid ) {

		uuid = uuid || this.uuid;

		var tempVar = builder.getVars()[ uuid ];

		return tempVar ? tempVar.name : undefined;

	};

	TempNode.prototype.generate = function ( builder, output, uuid, type, ns ) {

		if ( ! this.isShared( builder, output ) ) console.error( "THREE.TempNode is not shared!" );

		uuid = uuid || this.uuid;

		return builder.getTempVar( uuid, type || this.getType( builder ), ns ).name;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function InputNode$1( type, params ) {

		params = params || {};
		params.shared = params.shared !== undefined ? params.shared : false;

		TempNode.call( this, type, params );

		this.readonly = false;

	}

	InputNode$1.prototype = Object.create( TempNode.prototype );
	InputNode$1.prototype.constructor = InputNode$1;

	InputNode$1.prototype.isReadonly = function ( builder ) {

		return this.readonly;

	};

	InputNode$1.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		if ( source.readonly !== undefined ) this.readonly = source.readonly;

	};

	InputNode$1.prototype.createJSONNode = function ( meta ) {

		var data = TempNode.prototype.createJSONNode.call( this, meta );

		if ( this.readonly === true ) data.readonly = this.readonly;

		return data;

	};

	InputNode$1.prototype.generate = function ( builder, output, uuid, type, ns, needsUpdate ) {

		uuid = builder.getUuid( uuid || this.getUuid() );
		type = type || this.getType( builder );

		var data = builder.getNodeData( uuid ),
			readonly = this.isReadonly( builder ) && this.generateReadonly !== undefined;

		if ( readonly ) {

			return this.generateReadonly( builder, output, uuid, type, ns, needsUpdate );

		} else {

			if ( builder.isShader( 'vertex' ) ) {

				if ( ! data.vertex ) {

					data.vertex = builder.createVertexUniform( type, this, ns, needsUpdate );

				}

				return builder.format( data.vertex.name, type, output );

			} else {

				if ( ! data.fragment ) {

					data.fragment = builder.createFragmentUniform( type, this, ns, needsUpdate );

				}

				return builder.format( data.fragment.name, type, output );

			}

		}

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var declarationRegexp = /^([a-z_0-9]+)\s([a-z_0-9]+)\s?\=?\s?(.*?)(\;|$)/i;

	function ConstNode( src, useDefine ) {

		TempNode.call( this );

		this.eval( src || ConstNode.PI, useDefine );

	}

	ConstNode.PI = 'PI';
	ConstNode.PI2 = 'PI2';
	ConstNode.RECIPROCAL_PI = 'RECIPROCAL_PI';
	ConstNode.RECIPROCAL_PI2 = 'RECIPROCAL_PI2';
	ConstNode.LOG2 = 'LOG2';
	ConstNode.EPSILON = 'EPSILON';

	ConstNode.prototype = Object.create( TempNode.prototype );
	ConstNode.prototype.constructor = ConstNode;
	ConstNode.prototype.nodeType = "Const";

	ConstNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	ConstNode.prototype.eval = function ( src, useDefine ) {

		this.src = src || '';

		var name, type, value = "";

		var match = this.src.match( declarationRegexp );

		this.useDefine = useDefine || this.src.charAt( 0 ) === '#';

		if ( match && match.length > 1 ) {

			type = match[ 1 ];
			name = match[ 2 ];
			value = match[ 3 ];

		} else {

			name = this.src;
			type = 'f';

		}

		this.name = name;
		this.type = type;
		this.value = value;

	};

	ConstNode.prototype.build = function ( builder, output ) {

		if ( output === 'source' ) {

			if ( this.value ) {

				if ( this.useDefine ) {

					return '#define ' + this.name + ' ' + this.value;

				}

				return 'const ' + this.type + ' ' + this.name + ' = ' + this.value + ';';

			} else if ( this.useDefine ) {

				return this.src;

			}

		} else {

			builder.include( this );

			return builder.format( this.name, this.getType( builder ), output );

		}

	};

	ConstNode.prototype.generate = function ( builder, output ) {

		return builder.format( this.name, this.getType( builder ), output );

	};

	ConstNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.eval( source.src, source.useDefine );

	};

	ConstNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;

			if ( data.useDefine === true ) data.useDefine = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function VarNode( type, value ) {

		Node.call( this, type );

		this.value = value;

	}

	VarNode.prototype = Object.create( Node.prototype );
	VarNode.prototype.constructor = VarNode;
	VarNode.prototype.nodeType = "Var";

	VarNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	VarNode.prototype.generate = function ( builder, output ) {

		var varying = builder.getVar( this.uuid, this.type );

		if ( this.value && builder.isShader( 'vertex' ) ) {

			builder.addNodeCode( varying.name + ' = ' + this.value.build( builder, this.getType( builder ) ) + ';' );

		}

		return builder.format( varying.name, this.getType( builder ), output );

	};

	VarNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.type = source.type;
		this.value = source.value;

	};

	VarNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.type = this.type;

			if ( this.value ) data.value = this.value.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var declarationRegexp$1 = /^struct\s*([a-z_0-9]+)\s*{\s*((.|\n)*?)}/img,
		propertiesRegexp = /\s*(\w*?)\s*(\w*?)(\=|\;)/img;

	function StructNode( src ) {

		TempNode.call( this );

		this.eval( src );

	}

	StructNode.prototype = Object.create( TempNode.prototype );
	StructNode.prototype.constructor = StructNode;
	StructNode.prototype.nodeType = "Struct";

	StructNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.name );

	};

	StructNode.prototype.getInputByName = function ( name ) {

		var i = this.inputs.length;

		while ( i -- ) {

			if ( this.inputs[ i ].name === name ) {

				return this.inputs[ i ];

			}

		}

	};

	StructNode.prototype.generate = function ( builder, output ) {

		if ( output === 'source' ) {

			return this.src + ';';

		} else {

			return builder.format( '( ' + src + ' )', this.getType( builder ), output );

		}

	};

	StructNode.prototype.eval = function ( src ) {

		this.src = src || '';

		this.inputs = [];

		var declaration = declarationRegexp$1.exec( this.src );

		if ( declaration ) {

			var properties = declaration[ 2 ], match;

			while ( match = propertiesRegexp.exec( properties ) ) {

				this.inputs.push( {
					type: match[ 1 ],
					name: match[ 2 ]
				} );

			}

			this.name = declaration[ 1 ];

		} else {

			this.name = '';

		}

		this.type = this.name;

	};

	StructNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function AttributeNode( name, type ) {

		Node.call( this, type );

		this.name = name;

	}

	AttributeNode.prototype = Object.create( Node.prototype );
	AttributeNode.prototype.constructor = AttributeNode;
	AttributeNode.prototype.nodeType = "Attribute";

	AttributeNode.prototype.getAttributeType = function ( builder ) {

		return typeof this.type === 'number' ? builder.getConstructorFromLength( this.type ) : this.type;

	};

	AttributeNode.prototype.getType = function ( builder ) {

		var type = this.getAttributeType( builder );

		return builder.getTypeByFormat( type );

	};

	AttributeNode.prototype.generate = function ( builder, output ) {

		var type = this.getAttributeType( builder );

		var attribute = builder.getAttribute( this.name, type ),
			name = builder.isShader( 'vertex' ) ? this.name : attribute.varying.name;

		console.log( attribute );

		return builder.format( name, this.getType( builder ), output );

	};

	AttributeNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.type = source.type;

	};

	AttributeNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.type = this.type;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var NodeLib = {

		nodes: {},
		keywords: {},

		add: function ( node ) {

			this.nodes[ node.name ] = node;

		},

		addKeyword: function ( name, callback, cache ) {

			cache = cache !== undefined ? cache : true;

			this.keywords[ name ] = { callback: callback, cache: cache };

		},

		remove: function ( node ) {

			delete this.nodes[ node.name ];

		},

		removeKeyword: function ( name ) {

			delete this.keywords[ name ];

		},

		get: function ( name ) {

			return this.nodes[ name ];

		},

		getKeyword: function ( name, material ) {

			return this.keywords[ name ].callback.call( this, material );

		},

		getKeywordData: function ( name ) {

			return this.keywords[ name ];

		},

		contains: function ( name ) {

			return this.nodes[ name ] != undefined;

		},

		containsKeyword: function ( name ) {

			return this.keywords[ name ] != undefined;

		}

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 * @thanks bhouston / https://clara.io/
	 */

	var declarationRegexp$2 = /^([a-z_0-9]+)\s([a-z_0-9]+)\s*\((.*?)\)/i,
		propertiesRegexp$1 = /[a-z_0-9]+/ig;

	function FunctionNode( src, includes, extensions, keywords, type ) {

		this.isMethod = type === undefined;

		TempNode.call( this, type );

		this.eval( src, includes, extensions, keywords );

	}

	FunctionNode.prototype = Object.create( TempNode.prototype );
	FunctionNode.prototype.constructor = FunctionNode;
	FunctionNode.prototype.nodeType = "Function";

	FunctionNode.prototype.useKeywords = true;

	FunctionNode.prototype.isShared = function ( builder, output ) {

		return ! this.isMethod;

	};

	FunctionNode.prototype.getType = function ( builder ) {

		return builder.getTypeByFormat( this.type );

	};

	FunctionNode.prototype.getInputByName = function ( name ) {

		var i = this.inputs.length;

		while ( i -- ) {

			if ( this.inputs[ i ].name === name ) {

				return this.inputs[ i ];

			}

		}

	};

	FunctionNode.prototype.getIncludeByName = function ( name ) {

		var i = this.includes.length;

		while ( i -- ) {

			if ( this.includes[ i ].name === name ) {

				return this.includes[ i ];

			}

		}

	};

	FunctionNode.prototype.generate = function ( builder, output ) {

		var match, offset = 0, src = this.src;

		for ( var i = 0; i < this.includes.length; i ++ ) {

			builder.include( this.includes[ i ], this );

		}

		for ( var ext in this.extensions ) {

			builder.extensions[ ext ] = true;

		}

		while ( match = propertiesRegexp$1.exec( this.src ) ) {

			var prop = match[ 0 ],
				isGlobal = this.isMethod ? ! this.getInputByName( prop ) : true,
				reference = prop;

			if ( this.keywords[ prop ] || ( this.useKeywords && isGlobal && NodeLib.containsKeyword( prop ) ) ) {

				var node = this.keywords[ prop ];

				if ( ! node ) {

					var keyword = NodeLib.getKeywordData( prop );

					if ( keyword.cache ) node = builder.keywords[ prop ];

					node = node || NodeLib.getKeyword( prop, builder );

					if ( keyword.cache ) builder.keywords[ prop ] = node;

				}

				reference = node.build( builder );

			}

			if ( prop != reference ) {

				src = src.substring( 0, match.index + offset ) + reference + src.substring( match.index + prop.length + offset );

				offset += reference.length - prop.length;

			}

			if ( this.getIncludeByName( reference ) === undefined && NodeLib.contains( reference ) ) {

				builder.include( NodeLib.get( reference ) );

			}

		}

		if ( output === 'source' ) {

			return src;

		} else if ( this.isMethod ) {

			builder.include( this, false, src );

			return this.name;

		} else {

			return builder.format( '( ' + src + ' )', this.getType( builder ), output );

		}

	};

	FunctionNode.prototype.eval = function ( src, includes, extensions, keywords ) {

		this.src = src || '';

		this.includes = includes || [];
		this.extensions = extensions || {};
		this.keywords = keywords || {};

		if ( this.isMethod ) {

			var match = this.src.match( declarationRegexp$2 );

			this.inputs = [];

			if ( match && match.length == 4 ) {

				this.type = match[ 1 ];
				this.name = match[ 2 ];

				var inputs = match[ 3 ].match( propertiesRegexp$1 );

				if ( inputs ) {

					var i = 0;

					while ( i < inputs.length ) {

						var qualifier = inputs[ i ++ ];
						var type, name;

						if ( qualifier == 'in' || qualifier == 'out' || qualifier == 'inout' ) {

							type = inputs[ i ++ ];

						} else {

							type = qualifier;
							qualifier = '';

						}

						name = inputs[ i ++ ];

						this.inputs.push( {
							name: name,
							type: type,
							qualifier: qualifier
						} );

					}

				}

			} else {

				this.type = '';
				this.name = '';

			}

		}

	};

	FunctionNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.isMethod = source.isMethod;
		this.useKeywords = source.useKeywords;

		this.eval( source.src, source.includes, source.extensions, source.keywords );

		if ( source.type !== undefined ) this.type = source.type;

	};

	FunctionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.src = this.src;
			data.isMethod = this.isMethod;
			data.useKeywords = this.useKeywords;

			if ( ! this.isMethod ) data.type = this.type;

			data.extensions = JSON.parse( JSON.stringify( this.extensions ) );
			data.keywords = {};

			for ( var keyword in this.keywords ) {

				data.keywords[ keyword ] = this.keywords[ keyword ].toJSON( meta ).uuid;

			}

			if ( this.includes.length ) {

				data.includes = [];

				for ( var i = 0; i < this.includes.length; i ++ ) {

					data.includes.push( this.includes[ i ].toJSON( meta ).uuid );

				}

			}

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ExpressionNode( src, type, keywords, extensions, includes ) {

		FunctionNode.call( this, src, includes, extensions, keywords, type );

	}

	ExpressionNode.prototype = Object.create( FunctionNode.prototype );
	ExpressionNode.prototype.constructor = ExpressionNode;
	ExpressionNode.prototype.nodeType = "Expression";

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function FunctionCallNode( func, inputs ) {

		TempNode.call( this );

		this.setFunction( func, inputs );

	}

	FunctionCallNode.prototype = Object.create( TempNode.prototype );
	FunctionCallNode.prototype.constructor = FunctionCallNode;
	FunctionCallNode.prototype.nodeType = "FunctionCall";

	FunctionCallNode.prototype.setFunction = function ( func, inputs ) {

		this.value = func;
		this.inputs = inputs || [];

	};

	FunctionCallNode.prototype.getFunction = function () {

		return this.value;

	};

	FunctionCallNode.prototype.getType = function ( builder ) {

		return this.value.getType( builder );

	};

	FunctionCallNode.prototype.generate = function ( builder, output ) {

		var type = this.getType( builder ),
			func = this.value;

		var code = func.build( builder, output ) + '( ',
			params = [];

		for ( var i = 0; i < func.inputs.length; i ++ ) {

			var inpt = func.inputs[ i ],
				param = this.inputs[ i ] || this.inputs[ inpt.name ];

			params.push( param.build( builder, builder.getTypeByFormat( inpt.type ) ) );

		}

		code += params.join( ', ' ) + ' )';

		return builder.format( code, type, output );

	};

	FunctionCallNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		for ( var prop in source.inputs ) {

			this.inputs[ prop ] = source.inputs[ prop ];

		}

		this.value = source.value;

	};

	FunctionCallNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			var func = this.value;

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;

			if ( func.inputs.length ) {

				data.inputs = {};

				for ( var i = 0; i < func.inputs.length; i ++ ) {

					var inpt = func.inputs[ i ],
						node = this.inputs[ i ] || this.inputs[ inpt.name ];

					data.inputs[ inpt.name ] = node.toJSON( meta ).uuid;

				}

			}

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var NodeUtils = {

		elements: [ 'x', 'y', 'z', 'w' ],

		addShortcuts: function () {

			function applyShortcut( proxy, property, subProperty ) {

				if ( subProperty ) {

					return {

						get: function () {

							return this[ proxy ][ property ][ subProperty ];

						},

						set: function ( val ) {

							this[ proxy ][ property ][ subProperty ] = val;

						}

					};

				} else {

					return {

						get: function () {

							return this[ proxy ][ property ];

						},

						set: function ( val ) {

							this[ proxy ][ property ] = val;

						}

					};

				}

			}

			return function addShortcuts( proto, proxy, list ) {

				var shortcuts = {};

				for ( var i = 0; i < list.length; ++ i ) {

					var data = list[ i ].split( "." ),
						property = data[ 0 ],
						subProperty = data[ 1 ];

					shortcuts[ property ] = applyShortcut( proxy, property, subProperty );

				}

				Object.defineProperties( proto, shortcuts );

			};

		}()

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NodeFrame( time ) {

		this.time = time !== undefined ? time : 0;

		this.id = 0;

	}

	NodeFrame.prototype = {

		constructor: NodeFrame,

		update: function ( delta ) {

			++ this.id;

			this.time += delta;
			this.delta = delta;

			return this;

		},

		setRenderer: function ( renderer ) {

			this.renderer = renderer;

			return this;

		},

		setRenderTexture: function ( renderTexture ) {

			this.renderTexture = renderTexture;

			return this;

		},

		updateNode: function ( node ) {

			if ( node.frameId === this.id ) return this;

			node.updateFrame( this );

			node.frameId = this.id;

			return this;

		}

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NodeUniform( params ) {

		params = params || {};

		this.name = params.name;
		this.type = params.type;
		this.node = params.node;
		this.needsUpdate = params.needsUpdate;

	}

	Object.defineProperties( NodeUniform.prototype, {

		value: {

			get: function () {

				return this.node.value;

			},

			set: function ( val ) {

				this.node.value = val;

			}

		}

	} );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Vector2Node( x, y ) {

		InputNode$1.call( this, 'v2' );

		this.value = x instanceof THREE.Vector2 ? x : new THREE.Vector2( x, y );

	}

	Vector2Node.prototype = Object.create( InputNode$1.prototype );
	Vector2Node.prototype.constructor = Vector2Node;
	Vector2Node.prototype.nodeType = "Vector2";

	NodeUtils.addShortcuts( Vector2Node.prototype, 'value', [ 'x', 'y' ] );

	Vector2Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec2( " + this.x + ", " + this.y + " )", type, output );

	};

	Vector2Node.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector2Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Vector3Node( x, y, z ) {

		InputNode$1.call( this, 'v3' );

		this.value = x instanceof THREE.Vector3 ? x : new THREE.Vector3( x, y, z );

	}

	Vector3Node.prototype = Object.create( InputNode$1.prototype );
	Vector3Node.prototype.constructor = Vector3Node;
	Vector3Node.prototype.nodeType = "Vector3";

	NodeUtils.addShortcuts( Vector3Node.prototype, 'value', [ 'x', 'y', 'z' ] );

	Vector3Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec3( " + this.x + ", " + this.y + ", " + this.z + " )", type, output );

	};

	Vector3Node.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector3Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;
			data.z = this.z;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Vector4Node( x, y, z, w ) {

		InputNode$1.call( this, 'v4' );

		this.value = x instanceof THREE.Vector4 ? x : new THREE.Vector4( x, y, z, w );

	}

	Vector4Node.prototype = Object.create( InputNode$1.prototype );
	Vector4Node.prototype.constructor = Vector4Node;
	Vector4Node.prototype.nodeType = "Vector4";

	NodeUtils.addShortcuts( Vector4Node.prototype, 'value', [ 'x', 'y', 'z', 'w' ] );

	Vector4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec4( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )", type, output );

	};

	Vector4Node.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	Vector4Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.x = this.x;
			data.y = this.y;
			data.z = this.z;
			data.w = this.w;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var vertexDict = [ 'uv', 'uv2' ],
		fragmentDict = [ 'vUv', 'vUv2' ];

	function UVNode( index ) {

		TempNode.call( this, 'v2', { shared: false } );

		this.index = index || 0;

	}

	UVNode.prototype = Object.create( TempNode.prototype );
	UVNode.prototype.constructor = UVNode;
	UVNode.prototype.nodeType = "UV";

	UVNode.prototype.generate = function ( builder, output ) {

		builder.requires.uv[ this.index ] = true;

		var result = builder.isShader( 'vertex' ) ? vertexDict[ this.index ] : fragmentDict[ this.index ];

		return builder.format( result, this.getType( builder ), output );

	};

	UVNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.index = source.index;

	};

	UVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.index = this.index;

		}

		return data;

	};

	NodeLib.addKeyword( 'uv', function () {

		return new UVNode();

	} );

	NodeLib.addKeyword( 'uv2', function () {

		return new UVNode( 1 );

	} );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ColorSpaceNode( input, method ) {

		TempNode.call( this, 'v4' );

		this.input = input;

		this.method = method || ColorSpaceNode.LINEAR;

	}

	ColorSpaceNode.Nodes = ( function () {

		// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/

		var LinearToLinear = new FunctionNode( [
			"vec4 LinearToLinear( in vec4 value ) {",

			"	return value;",

			"}"
		].join( "\n" ) );

		var GammaToLinear = new FunctionNode( [
			"vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {",

			"	return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );",

			"}"
		].join( "\n" ) );

		var LinearToGamma = new FunctionNode( [
			"vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {",

			"	return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );",

			"}"
		].join( "\n" ) );

		var sRGBToLinear = new FunctionNode( [
			"vec4 sRGBToLinear( in vec4 value ) {",

			"	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );",

			"}"
		].join( "\n" ) );

		var LinearTosRGB = new FunctionNode( [
			"vec4 LinearTosRGB( in vec4 value ) {",

			"	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );",

			"}"
		].join( "\n" ) );

		var RGBEToLinear = new FunctionNode( [
			"vec4 RGBEToLinear( in vec4 value ) {",

			"	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );",

			"}"
		].join( "\n" ) );

		var LinearToRGBE = new FunctionNode( [
			"vec4 LinearToRGBE( in vec4 value ) {",

			"	float maxComponent = max( max( value.r, value.g ), value.b );",
			"	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );",
			"	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );",
			//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );

			"}"
		].join( "\n" ) );

		// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html

		var RGBMToLinear = new FunctionNode( [
			"vec3 RGBMToLinear( in vec4 value, in float maxRange ) {",

			"	return vec4( value.xyz * value.w * maxRange, 1.0 );",

			"}"
		].join( "\n" ) );

		var LinearToRGBM = new FunctionNode( [
			"vec3 LinearToRGBM( in vec4 value, in float maxRange ) {",

			"	float maxRGB = max( value.x, max( value.g, value.b ) );",
			"	float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );",
			"	M            = ceil( M * 255.0 ) / 255.0;",
			"	return vec4( value.rgb / ( M * maxRange ), M );",

			"}"
		].join( "\n" ) );

		// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html

		var RGBDToLinear = new FunctionNode( [
			"vec3 RGBDToLinear( in vec4 value, in float maxRange ) {",

			"	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );",

			"}"
		].join( "\n" ) );


		var LinearToRGBD = new FunctionNode( [
			"vec3 LinearToRGBD( in vec4 value, in float maxRange ) {",

			"	float maxRGB = max( value.x, max( value.g, value.b ) );",
			"	float D      = max( maxRange / maxRGB, 1.0 );",
			"	D            = min( floor( D ) / 255.0, 1.0 );",
			"	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );",

			"}"
		].join( "\n" ) );

		// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html

		// M matrix, for encoding

		var cLogLuvM = new ConstNode( "const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );" );

		var LinearToLogLuv = new FunctionNode( [
			"vec4 LinearToLogLuv( in vec4 value ) {",

			"	vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;",
			"	Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));",
			"	vec4 vResult;",
			"	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;",
			"	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;",
			"	vResult.w = fract(Le);",
			"	vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;",
			"	return vResult;",

			"}"
		].join( "\n" ), [ cLogLuvM ] );

		// Inverse M matrix, for decoding

		var cLogLuvInverseM = new ConstNode( "const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );" );

		var LogLuvToLinear = new FunctionNode( [
			"vec4 LogLuvToLinear( in vec4 value ) {",

			"	float Le = value.z * 255.0 + value.w;",
			"	vec3 Xp_Y_XYZp;",
			"	Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);",
			"	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;",
			"	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;",
			"	vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;",
			"	return vec4( max(vRGB, 0.0), 1.0 );",

			"}"
		].join( "\n" ), [ cLogLuvInverseM ] );

		return {
			LinearToLinear: LinearToLinear,
			GammaToLinear: GammaToLinear,
			LinearToGamma: LinearToGamma,
			sRGBToLinear: sRGBToLinear,
			LinearTosRGB: LinearTosRGB,
			RGBEToLinear: RGBEToLinear,
			LinearToRGBE: LinearToRGBE,
			RGBMToLinear: RGBMToLinear,
			LinearToRGBM: LinearToRGBM,
			RGBDToLinear: RGBDToLinear,
			LinearToRGBD: LinearToRGBD,
			cLogLuvM: cLogLuvM,
			LinearToLogLuv: LinearToLogLuv,
			cLogLuvInverseM: cLogLuvInverseM,
			LogLuvToLinear: LogLuvToLinear
		};

	} )();

	ColorSpaceNode.LINEAR_TO_LINEAR = 'LinearToLinear';

	ColorSpaceNode.GAMMA_TO_LINEAR = 'GammaToLinear';
	ColorSpaceNode.LINEAR_TO_GAMMA = 'LinearToGamma';

	ColorSpaceNode.SRGB_TO_LINEAR = 'sRGBToLinear';
	ColorSpaceNode.LINEAR_TO_SRGB = 'LinearTosRGB';

	ColorSpaceNode.RGBE_TO_LINEAR = 'RGBEToLinear';
	ColorSpaceNode.LINEAR_TO_RGBE = 'LinearToRGBE';

	ColorSpaceNode.RGBM_TO_LINEAR = 'RGBMToLinear';
	ColorSpaceNode.LINEAR_TO_RGBM = 'LinearToRGBM';

	ColorSpaceNode.RGBD_TO_LINEAR = 'RGBDToLinear';
	ColorSpaceNode.LINEAR_TO_RGBD = 'LinearToRGBD';

	ColorSpaceNode.LINEAR_TO_LOG_LUV = 'LinearToLogLuv';
	ColorSpaceNode.LOG_LUV_TO_LINEAR = 'LogLuvToLinear';

	ColorSpaceNode.prototype = Object.create( TempNode.prototype );
	ColorSpaceNode.prototype.constructor = ColorSpaceNode;
	ColorSpaceNode.prototype.nodeType = "ColorAdjustment";

	ColorSpaceNode.prototype.generate = function ( builder, output ) {

		var input = builder.context.input || this.input.build( builder, 'v4' ),
			encodingMethod = builder.context.encoding !== undefined ? this.getEncodingMethod( builder.context.encoding ) : [ this.method ],
			factor = this.factor ? this.factor.build( builder, 'f' ) : encodingMethod[ 1 ];

		var method = builder.include( ColorSpaceNode.Nodes[ encodingMethod[ 0 ] ] );

		if ( factor ) {

			return builder.format( method + '( ' + input + ', ' + factor + ' )', this.getType( builder ), output );

		} else {

			return builder.format( method + '( ' + input + ' )', this.getType( builder ), output );

		}

	};

	ColorSpaceNode.prototype.getDecodingMethod = function ( encoding ) {

		var components = this.getEncodingComponents( encoding );

		components[ 0 ] += 'ToLinear';

		return components;

	};

	ColorSpaceNode.prototype.getEncodingMethod = function ( encoding ) {

		var components = this.getEncodingComponents( encoding );

		components[ 0 ] = 'LinearTo' + components[ 0 ];

		return components;

	};

	ColorSpaceNode.prototype.getEncodingComponents = function ( encoding ) {

		switch ( encoding ) {

			case THREE.LinearEncoding:
				return [ 'Linear' ];
			case THREE.sRGBEncoding:
				return [ 'sRGB' ];
			case THREE.RGBEEncoding:
				return [ 'RGBE' ];
			case THREE.RGBM7Encoding:
				return [ 'RGBM', '7.0' ];
			case THREE.RGBM16Encoding:
				return [ 'RGBM', '16.0' ];
			case THREE.RGBDEncoding:
				return [ 'RGBD', '256.0' ];
			case THREE.GammaEncoding:
				return [ 'Gamma', 'float( GAMMA_FACTOR )' ];

		}

	};

	ColorSpaceNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.input = source.input;
		this.method = source.method;

	};

	ColorSpaceNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.input = this.input.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TextureNode( value, uv, bias, project ) {

		InputNode$1.call( this, 'v4', { shared: true } );

		this.value = value;
		this.uv = uv || new UVNode();
		this.bias = bias;
		this.project = project !== undefined ? project : false;

	}

	TextureNode.prototype = Object.create( InputNode$1.prototype );
	TextureNode.prototype.constructor = TextureNode;
	TextureNode.prototype.nodeType = "Texture";

	TextureNode.prototype.getTexture = function ( builder, output ) {

		return InputNode$1.prototype.generate.call( this, builder, output, this.value.uuid, 't' );

	};

	TextureNode.prototype.generate = function ( builder, output ) {

		if ( output === 'sampler2D' ) {

			return this.getTexture( builder, output );

		}

		var tex = this.getTexture( builder, output ),
			uv = this.uv.build( builder, this.project ? 'v4' : 'v2' ),
			bias = this.bias ? this.bias.build( builder, 'f' ) : undefined;

		if ( bias == undefined && builder.context.bias ) {

			bias = new builder.context.bias( this ).build( builder, 'f' );

		}

		var method, code;

		if ( this.project ) method = 'texture2DProj';
		else method = bias ? 'tex2DBias' : 'tex2D';

		if ( bias ) code = method + '( ' + tex + ', ' + uv + ', ' + bias + ' )';
		else code = method + '( ' + tex + ', ' + uv + ' )';

		// add this context to replace ColorSpaceNode.input to code

		builder.addContext( { input: code, encoding: builder.getTextureEncodingFromMap( this.value ), include: builder.isShader( 'vertex' ) } );

		this.colorSpace = this.colorSpace || new ColorSpaceNode( this );
		code = this.colorSpace.build( builder, this.type );

		builder.removeContext();

		return builder.format( code, this.type, output );

	};

	TextureNode.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		if ( source.value ) this.value = source.value;

		this.uv = source.uv;

		if ( source.bias ) this.bias = source.bias;
		if ( source.project !== undefined ) this.project = source.project;

	};

	TextureNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			if ( this.value ) data.value = this.value.uuid;

			data.uv = this.uv.toJSON( meta ).uuid;
			data.project = this.project;

			if ( this.bias ) data.bias = this.bias.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ReflectNode( scope ) {

		TempNode.call( this, 'v3', { unique: true } );

		this.scope = scope || ReflectNode.CUBE;

	}

	ReflectNode.CUBE = 'cube';
	ReflectNode.SPHERE = 'sphere';
	ReflectNode.VECTOR = 'vector';

	ReflectNode.prototype = Object.create( TempNode.prototype );
	ReflectNode.prototype.constructor = ReflectNode;
	ReflectNode.prototype.nodeType = "Reflect";

	ReflectNode.prototype.getType = function ( builder ) {

		switch ( this.scope ) {

			case ReflectNode.SPHERE:

				return 'v2';

		}

		return this.type;

	};

	ReflectNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var result;

			switch ( this.scope ) {

				case ReflectNode.VECTOR:

					builder.addNodeCode( 'vec3 reflectVec = inverseTransformDirection( reflect( -normalize( vViewPosition ), normal ), viewMatrix );' );

					result = 'reflectVec';

					break;

				case ReflectNode.CUBE:

					var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

					builder.addNodeCode( 'vec3 reflectCubeVec = vec3( -1.0 * ' + reflectVec + '.x, ' + reflectVec + '.yz );' );

					result = 'reflectCubeVec';

					break;

				case ReflectNode.SPHERE:

					var reflectVec = new ReflectNode( ReflectNode.VECTOR ).build( builder, 'v3' );

					builder.addNodeCode( 'vec2 reflectSphereVec = normalize( ( viewMatrix * vec4( ' + reflectVec + ', 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) ).xy * 0.5 + 0.5;' );

					result = 'reflectSphereVec';

					break;

			}

			return builder.format( result, this.getType( builder ), output );

		} else {

			console.warn( "THREE.ReflectNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec3( 0.0 )', this.type, output );

		}

	};

	ReflectNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function CubeTextureNode( value, uv, bias ) {

		InputNode$1.call( this, 'v4', { shared: true } );

		this.value = value;
		this.uv = uv || new ReflectNode();
		this.bias = bias;

	}

	CubeTextureNode.prototype = Object.create( InputNode$1.prototype );
	CubeTextureNode.prototype.constructor = CubeTextureNode;
	CubeTextureNode.prototype.nodeType = "CubeTexture";

	CubeTextureNode.prototype.getTexture = function ( builder, output ) {

		return InputNode$1.prototype.generate.call( this, builder, output, this.value.uuid, 'tc' );

	};

	CubeTextureNode.prototype.generate = function ( builder, output ) {

		if ( output === 'samplerCube' ) {

			return this.getTexture( builder, output );

		}

		var cubetex = this.getTexture( builder, output );
		var uv = this.uv.build( builder, 'v3' );
		var bias = this.bias ? this.bias.build( builder, 'f' ) : undefined;

		if ( bias === undefined && builder.context.bias ) {

			bias = new builder.context.bias( this ).build( builder, 'f' );

		}

		var code;

		if ( bias ) code = 'texCubeBias( ' + cubetex + ', ' + uv + ', ' + bias + ' )';
		else code = 'texCube( ' + cubetex + ', ' + uv + ' )';

		// add this context to replace ColorSpaceNode.input to code

		builder.addContext( { input: code, encoding: builder.getTextureEncodingFromMap( this.value ), include: builder.isShader( 'vertex' ) } );

		this.colorSpace = this.colorSpace || new ColorSpaceNode( this );
		code = this.colorSpace.build( builder, this.type );

		builder.removeContext();

		return builder.format( code, this.type, output );

	};

	CubeTextureNode.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		if ( source.value ) this.value = source.value;

		this.uv = source.uv;

		if ( source.bias ) this.bias = source.bias;

	};

	CubeTextureNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.uuid;
			data.uv = this.uv.toJSON( meta ).uuid;

			if ( this.bias ) data.bias = this.bias.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var elements = NodeUtils.elements,
		constructors = [ 'float', 'vec2', 'vec3', 'vec4' ],
		convertFormatToType = {
			float: 'f',
			vec2: 'v2',
			vec3: 'v3',
			vec4: 'v4',
			mat4: 'v4',
			int: 'i'
		},
		convertTypeToFormat = {
			t: 'sampler2D',
			tc: 'samplerCube',
			b: 'bool',
			i: 'int',
			f: 'float',
			c: 'vec3',
			v2: 'vec2',
			v3: 'vec3',
			v4: 'vec4',
			m3: 'mat3',
			m4: 'mat4'
		};

	function NodeBuilder() {

		this.slots = [];
		this.caches = [];
		this.contexts = [];

		this.keywords = {};

		this.nodeData = {};

		this.requires = {
			uv: [],
			color: [],
			lights: false,
			fog: false
		};

		this.includes = {
			consts: [],
			functions: [],
			structs: []
		};

		this.attributes = {};

		this.prefixCode = [
			"#ifdef TEXTURE_LOD_EXT",

			"	#define texCube(a, b) textureCube(a, b)",
			"	#define texCubeBias(a, b, c) textureCubeLodEXT(a, b, c)",

			"	#define tex2D(a, b) texture2D(a, b)",
			"	#define tex2DBias(a, b, c) texture2DLodEXT(a, b, c)",

			"#else",

			"	#define texCube(a, b) textureCube(a, b)",
			"	#define texCubeBias(a, b, c) textureCube(a, b, c)",

			"	#define tex2D(a, b) texture2D(a, b)",
			"	#define tex2DBias(a, b, c) texture2D(a, b, c)",

			"#endif",

			"#include <packing>",
			"#include <common>"

		].join( "\n" );

		this.parsCode = {
			vertex: '',
			fragment: ''
		};

		this.code = {
			vertex: '',
			fragment: ''
		};

		this.nodeCode = {
			vertex: '',
			fragment: ''
		};

		this.resultCode = {
			vertex: '',
			fragment: ''
		};

		this.finalCode = {
			vertex: '',
			fragment: ''
		};

		this.inputs = {
			uniforms: {
				list: [],
				vertex: [],
				fragment: []
			},
			vars: {
				varying: [],
				vertex: [],
				fragment: []
			}
		};

		// send to material

		this.defines = {};

		this.uniforms = {};

		this.extensions = {};

		this.updaters = [];

		this.nodes = [];

		// --

		this.parsing = false;
		this.optimize = true;

	}

	NodeBuilder.prototype = {

		constructor: NodeBuilder,

		build: function ( vertex, fragment ) {

			this.buildShader( 'vertex', vertex );
			this.buildShader( 'fragment', fragment );

			if ( this.requires.uv[ 0 ] ) {

				this.addVaryCode( 'varying vec2 vUv;' );

				this.addVertexFinalCode( 'vUv = uv;' );

			}

			if ( this.requires.uv[ 1 ] ) {

				this.addVaryCode( 'varying vec2 vUv2;' );
				this.addVertexParsCode( 'attribute vec2 uv2;' );

				this.addVertexFinalCode( 'vUv2 = uv2;' );

			}

			if ( this.requires.color[ 0 ] ) {

				this.addVaryCode( 'varying vec4 vColor;' );
				this.addVertexParsCode( 'attribute vec4 color;' );

				this.addVertexFinalCode( 'vColor = color;' );

			}

			if ( this.requires.color[ 1 ] ) {

				this.addVaryCode( 'varying vec4 vColor2;' );
				this.addVertexParsCode( 'attribute vec4 color2;' );

				this.addVertexFinalCode( 'vColor2 = color2;' );

			}

			if ( this.requires.position ) {

				this.addVaryCode( 'varying vec3 vPosition;' );

				this.addVertexFinalCode( 'vPosition = transformed;' );

			}

			if ( this.requires.worldPosition ) {

				this.addVaryCode( 'varying vec3 vWPosition;' );

				this.addVertexFinalCode( 'vWPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;' );

			}

			if ( this.requires.normal ) {

				this.addVaryCode( 'varying vec3 vObjectNormal;' );

				this.addVertexFinalCode( 'vObjectNormal = normal;' );

			}

			if ( this.requires.worldNormal ) {

				this.addVaryCode( 'varying vec3 vWNormal;' );

				this.addVertexFinalCode( 'vWNormal = ( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz;' );

			}

			return this;

		},

		buildShader: function ( shader, node ) {

			this.resultCode[ shader ] = node.build( this.setShader( shader ), 'v4' );

		},

		setMaterial: function ( material, renderer ) {

			this.material = material;
			this.renderer = renderer;

			this.requires.lights = material.lights;
			this.requires.fog = material.fog;

			this.mergeDefines( material.defines );

			return this;

		},

		addFlow: function ( slot, cache, context ) {

			return this.addSlot( slot ).addCache( cache ).addContext( context );

		},

		removeFlow: function () {

			return this.removeSlot().removeCache().removeContext();

		},

		addCache: function ( name ) {

			this.cache = name || '';
			this.caches.push( this.cache );

			return this;

		},

		removeCache: function () {

			this.caches.pop();
			this.cache = this.caches[ this.caches.length - 1 ] || '';

			return this;

		},

		addContext: function ( context ) {

			this.context = Object.assign( {}, this.context, context );
			this.contexts.push( this.context );

			return this;

		},

		removeContext: function () {

			this.contexts.pop();
			this.context = this.contexts[ this.contexts.length - 1 ] || {};

			return this;

		},

		addSlot: function ( name ) {

			this.slot = name || '';
			this.slots.push( this.slot );

			return this;

		},

		removeSlot: function () {

			this.slots.pop();
			this.slot = this.slots[ this.slots.length - 1 ] || '';

			return this;

		},


		addVertexCode: function ( code ) {

			this.addCode( code, 'vertex' );

		},

		addFragmentCode: function ( code ) {

			this.addCode( code, 'fragment' );

		},

		addCode: function ( code, shader ) {

			this.code[ shader || this.shader ] += code + '\n';

		},


		addVertexNodeCode: function ( code ) {

			this.addNodeCode( code, 'vertex' );

		},

		addFragmentNodeCode: function ( code ) {

			this.addNodeCode( code, 'fragment' );

		},

		addNodeCode: function ( code, shader ) {

			this.nodeCode[ shader || this.shader ] += code + '\n';

		},

		clearNodeCode: function ( shader ) {

			shader = shader || this.shader;

			var code = this.nodeCode[ shader ];

			this.nodeCode[ shader ] = '';

			return code;

		},

		clearVertexNodeCode: function ( ) {

			return this.clearNodeCode( 'vertex' );

		},

		clearFragmentNodeCode: function ( ) {

			return this.clearNodeCode( 'fragment' );

		},

		addVertexFinalCode: function ( code ) {

			this.addFinalCode( code, 'vertex' );

		},

		addFragmentFinalCode: function ( code ) {

			this.addFinalCode( code, 'fragment' );

		},

		addFinalCode: function ( code, shader ) {

			this.finalCode[ shader || this.shader ] += code + '\n';

		},


		addVertexParsCode: function ( code ) {

			this.addParsCode( code, 'vertex' );

		},

		addFragmentParsCode: function ( code ) {

			this.addParsCode( code, 'fragment' );

		},

		addParsCode: function ( code, shader ) {

			this.parsCode[ shader || this.shader ] += code + '\n';

		},


		addVaryCode: function ( code ) {

			this.addVertexParsCode( code );
			this.addFragmentParsCode( code );

		},


		isCache: function ( name ) {

			return this.caches.indexOf( name ) !== - 1;

		},

		isSlot: function ( name ) {

			return this.slots.indexOf( name ) !== - 1;

		},

		define: function ( name, value ) {

			this.defines[ name ] = value === undefined ? 1 : value;

		},

		isDefined: function ( name ) {

			return this.defines[ name ] !== undefined;

		},

		getVar: function ( uuid, type, ns, shader ) {

			shader = shader || 'varying';

			var vars = this.getVars( shader ),
				data = vars[ uuid ];

			if ( ! data ) {

				var index = vars.length,
					name = ns ? ns : 'nVv' + index;

				data = { name: name, type: type };

				vars.push( data );
				vars[ uuid ] = data;

			}

			return data;

		},

		getTempVar: function ( uuid, type, ns ) {

			return this.getVar( uuid, type, ns, this.shader );

		},

		getAttribute: function ( name, type ) {

			if ( ! this.attributes[ name ] ) {

				var varying = this.getVar( name, type );

				this.addVertexParsCode( 'attribute ' + type + ' ' + name + ';' );
				this.addVertexFinalCode( varying.name + ' = ' + name + ';' );

				this.attributes[ name ] = { varying: varying, name: name, type: type };

			}

			return this.attributes[ name ];

		},

		getCode: function ( shader ) {

			return [
				this.prefixCode,
				this.parsCode[ shader ],
				this.getVarListCode( this.getVars( 'varying' ), 'varying' ),
				this.getVarListCode( this.inputs.uniforms[ shader ], 'uniform' ),
				this.getIncludesCode( 'consts', shader ),
				this.getIncludesCode( 'structs', shader ),
				this.getIncludesCode( 'functions', shader ),
				'void main() {',
				this.getVarListCode( this.getVars( shader ) ),
				this.code[ shader ],
				this.resultCode[ shader ],
				this.finalCode[ shader ],
				'}'
			].join( "\n" );

		},

		getVarListCode: function ( vars, prefix ) {

			prefix = prefix || '';

			var code = '';

			for ( var i = 0, l = vars.length; i < l; ++ i ) {

				var nVar = vars[ i ],
					type = nVar.type,
					name = nVar.name;

				var formatType = this.getFormatByType( type );

				if ( formatType === undefined ) {

					throw new Error( "Node pars " + formatType + " not found." );

				}

				code += prefix + ' ' + formatType + ' ' + name + ';\n';

			}

			return code;

		},

		getVars: function ( shader ) {

			return this.inputs.vars[ shader || this.shader ];

		},

		getNodeData: function ( node ) {

			var uuid = node.isNode ? node.uuid : node;

			return this.nodeData[ uuid ] = this.nodeData[ uuid ] || {};

		},

		createUniform: function ( shader, type, node, ns, needsUpdate ) {

			var uniforms = this.inputs.uniforms,
				index = uniforms.list.length;

			var uniform = new NodeUniform( {
				type: type,
				name: ns ? ns : 'nVu' + index,
				node: node,
				needsUpdate: needsUpdate
			} );

			uniforms.list.push( uniform );

			uniforms[ shader ].push( uniform );
			uniforms[ shader ][ uniform.name ] = uniform;

			this.uniforms[ uniform.name ] = uniform;

			return uniform;

		},

		createVertexUniform: function ( type, node, ns, needsUpdate ) {

			return this.createUniform( 'vertex', type, node, ns, needsUpdate );

		},

		createFragmentUniform: function ( type, node, ns, needsUpdate ) {

			return this.createUniform( 'fragment', type, node, ns, needsUpdate );

		},

		include: function ( node, parent, source ) {

			var includesStruct;

			node = typeof node === 'string' ? NodeLib.get( node ) : node;

			if ( this.context.include === false ) {

				return node.name;

			}


			if ( node instanceof FunctionNode ) {

				includesStruct = this.includes.functions;

			} else if ( node instanceof ConstNode ) {

				includesStruct = this.includes.consts;

			} else if ( node instanceof StructNode ) {

				includesStruct = this.includes.structs;

			}

			var includes = includesStruct[ this.shader ] = includesStruct[ this.shader ] || [];

			if ( node ) {

				var included = includes[ node.name ];

				if ( ! included ) {

					included = includes[ node.name ] = {
						node: node,
						deps: []
					};

					includes.push( included );

					included.src = node.build( this, 'source' );

				}

				if ( node instanceof FunctionNode && parent && includes[ parent.name ] && includes[ parent.name ].deps.indexOf( node ) == - 1 ) {

					includes[ parent.name ].deps.push( node );

					if ( node.includes && node.includes.length ) {

						var i = 0;

						do {

							this.include( node.includes[ i ++ ], parent );

						} while ( i < node.includes.length );

					}

				}

				if ( source ) {

					included.src = source;

				}

				return node.name;

			} else {

				throw new Error( "Include not found." );

			}

		},

		colorToVectorProperties: function ( color ) {

			return color.replace( 'r', 'x' ).replace( 'g', 'y' ).replace( 'b', 'z' ).replace( 'a', 'w' );

		},

		colorToVector: function ( color ) {

			return color.replace( /c/g, 'v3' );

		},

		getIncludes: function ( type, shader ) {

			return this.includes[ type ][ shader || this.shader ];

		},

		getIncludesCode: function () {

			function sortByPosition( a, b ) {

				return a.deps.length - b.deps.length;

			}

			return function getIncludesCode( type, shader ) {

				var includes = this.getIncludes( type, shader );

				if ( ! includes ) return '';

				var code = '',
					includes = includes.sort( sortByPosition );

				for ( var i = 0; i < includes.length; i ++ ) {

					if ( includes[ i ].src ) code += includes[ i ].src + '\n';

				}

				return code;

			};

		}(),

		getConstructorFromLength: function ( len ) {

			return constructors[ len - 1 ];

		},

		isTypeMatrix: function ( format ) {

			return /^m/.test( format );

		},

		getTypeLength: function ( type ) {

			if ( type === 'f' ) return 1;

			return parseInt( this.colorToVector( type ).substr( 1 ) );

		},

		getTypeFromLength: function ( len ) {

			if ( len === 1 ) return 'f';

			return 'v' + len;

		},

		findNode: function () {

			for ( var i = 0; i < arguments.length; i ++ ) {

				var nodeCandidate = arguments[ i ];

				if ( nodeCandidate !== undefined && nodeCandidate.isNode ) {

					return nodeCandidate;

				}

			}

		},

		resolve: function () {

			for ( var i = 0; i < arguments.length; i ++ ) {

				var nodeCandidate = arguments[ i ];

				if ( nodeCandidate !== undefined ) {

					if ( nodeCandidate.isNode ) {

						return nodeCandidate;

					} else if ( nodeCandidate.isTexture ) {

						switch ( nodeCandidate.mapping ) {

							case THREE.CubeReflectionMapping:
							case THREE.CubeRefractionMapping:

								return new CubeTextureNode( nodeCandidate );

								break;

							case THREE.CubeUVReflectionMapping:
							case THREE.CubeUVRefractionMapping:

								return new TextureCubeNode( new TextureNode( nodeCandidate ) );

								break;

							default:

								return new TextureNode( nodeCandidate );

						}

					} else if ( nodeCandidate.isVector2 ) {

						return new Vector2Node( nodeCandidate );

					} else if ( nodeCandidate.isVector3 ) {

						return new Vector3Node( nodeCandidate );

					} else if ( nodeCandidate.isVector4 ) {

						return new Vector4Node( nodeCandidate );

					}

				}

			}

		},

		format: function ( code, from, to ) {

			var typeToType = this.colorToVector( to + ' <- ' + from );

			switch ( typeToType ) {

				case 'f <- v2' : return code + '.x';
				case 'f <- v3' : return code + '.x';
				case 'f <- v4' : return code + '.x';
				case 'f <- i' : return 'float( ' + code + ' )';

				case 'v2 <- f' : return 'vec2( ' + code + ' )';
				case 'v2 <- v3': return code + '.xy';
				case 'v2 <- v4': return code + '.xy';
				case 'v2 <- i' : return 'vec2( float( ' + code + ' ) )';

				case 'v3 <- f' : return 'vec3( ' + code + ' )';
				case 'v3 <- v2': return 'vec3( ' + code + ', 0.0 )';
				case 'v3 <- v4': return code + '.xyz';
				case 'v3 <- i' : return 'vec2( float( ' + code + ' ) )';

				case 'v4 <- f' : return 'vec4( ' + code + ' )';
				case 'v4 <- v2': return 'vec4( ' + code + ', 0.0, 1.0 )';
				case 'v4 <- v3': return 'vec4( ' + code + ', 1.0 )';
				case 'v4 <- i' : return 'vec4( float( ' + code + ' ) )';

				case 'i <- f' : return 'int( ' + code + ' )';
				case 'i <- v2' : return 'int( ' + code + '.x )';
				case 'i <- v3' : return 'int( ' + code + '.x )';
				case 'i <- v4' : return 'int( ' + code + '.x )';

			}

			return code;

		},

		getTypeByFormat: function ( format ) {

			return convertFormatToType[ format ] || format;

		},

		getFormatByType: function ( type ) {

			return convertTypeToFormat[ type ] || type;

		},

		getUuid: function ( uuid, useCache ) {

			useCache = useCache !== undefined ? useCache : true;

			if ( useCache && this.cache ) uuid = this.cache + '-' + uuid;

			return uuid;

		},

		getElementByIndex: function ( index ) {

			return elements[ index ];

		},

		getIndexByElement: function ( elm ) {

			return elements.indexOf( elm );

		},

		isShader: function ( shader ) {

			return this.shader === shader;

		},

		setShader: function ( shader ) {

			this.shader = shader;

			return this;

		},

		mergeDefines: function ( defines ) {

			for ( var name in defines ) {

				this.defines[ name ] = defines[ name ];

			}

			return this.defines;

		},

		mergeUniform: function ( uniforms ) {

			for ( var name in uniforms ) {

				this.uniforms[ name ] = uniforms[ name ];

			}

			return this.uniforms;

		},

		getTextureEncodingFromMap: function ( map, gammaOverrideLinear ) {

			gammaOverrideLinear = gammaOverrideLinear !== undefined ? gammaOverrideLinear : this.context.gamma && ( this.renderer ? this.renderer.gammaInput : false );

			var encoding;

			if ( ! map ) {

				encoding = THREE.LinearEncoding;

			} else if ( map.isTexture ) {

				encoding = map.encoding;

			} else if ( map.isWebGLRenderTarget ) {

				console.warn( "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead." );
				encoding = map.texture.encoding;

			}

			// add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
			if ( encoding === THREE.LinearEncoding && gammaOverrideLinear ) {

				encoding = THREE.GammaEncoding;

			}

			return encoding;

		}

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function IntNode( value ) {

		InputNode$1.call( this, 'i' );

		this.value = Math.floor( value || 0 );

	}

	IntNode.prototype = Object.create( InputNode$1.prototype );
	IntNode.prototype.constructor = IntNode;
	IntNode.prototype.nodeType = "Int";

	IntNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( this.value, type, output );

	};

	IntNode.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value = source.value;

	};

	IntNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function FloatNode( value ) {

		InputNode$1.call( this, 'f' );

		this.value = value || 0;

	}

	FloatNode.prototype = Object.create( InputNode$1.prototype );
	FloatNode.prototype.constructor = FloatNode;
	FloatNode.prototype.nodeType = "Float";

	FloatNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( this.value + ( this.value % 1 ? '' : '.0' ), type, output );

	};

	FloatNode.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value = source.value;

	};

	FloatNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ColorNode( color, g, b ) {

		InputNode$1.call( this, 'c' );

		this.value = color instanceof THREE.Color ? color : new THREE.Color( color || 0, g, b );

	}

	ColorNode.prototype = Object.create( InputNode$1.prototype );
	ColorNode.prototype.constructor = ColorNode;
	ColorNode.prototype.nodeType = "Color";

	NodeUtils.addShortcuts( ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

	ColorNode.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "vec3( " + this.r + ", " + this.g + ", " + this.b + " )", type, output );

	};

	ColorNode.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value.copy( source );

	};

	ColorNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.r = this.r;
			data.g = this.g;
			data.b = this.b;

			if ( this.readonly === true ) data.readonly = true;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Matrix3Node( matrix ) {

		InputNode$1.call( this, 'm3' );

		this.value = matrix || new THREE.Matrix3();

	}

	Matrix3Node.prototype = Object.create( InputNode$1.prototype );
	Matrix3Node.prototype.constructor = Matrix3Node;
	Matrix3Node.prototype.nodeType = "Matrix3";

	Object.defineProperties( Matrix3Node.prototype, {

		elements: {

			set: function ( val ) {

				this.value.elements = val;

			},

			get: function () {

				return this.value.elements;

			}

		}

	} );

	Matrix3Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "mat3( " + this.value.elements.join( ", " ) + " )", type, output );

	};


	Matrix3Node.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.value.fromArray( source.elements );

	};

	Matrix3Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.elements = this.value.elements.concat();

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Matrix4Node( matrix ) {

		InputNode$1.call( this, 'm4' );

		this.value = matrix || new THREE.Matrix4();

	}

	Matrix4Node.prototype = Object.create( InputNode$1.prototype );
	Matrix4Node.prototype.constructor = Matrix4Node;
	Matrix4Node.prototype.nodeType = "Matrix4";

	Object.defineProperties( Matrix4Node.prototype, {

		elements: {

			set: function ( val ) {

				this.value.elements = val;

			},

			get: function () {

				return this.value.elements;

			}

		}

	} );

	Matrix4Node.prototype.generateReadonly = function ( builder, output, uuid, type, ns, needsUpdate ) {

		return builder.format( "mat4( " + this.value.elements.join( ", " ) + " )", type, output );

	};

	Matrix4Node.prototype.copy = function ( source ) {

		InputNode$1.prototype.copy.call( this, source );

		this.scope.value.fromArray( source.elements );

	};

	Matrix4Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.elements = this.value.elements.concat();

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ScreenNode( uv ) {

		TextureNode.call( this, undefined, uv );

	}

	ScreenNode.prototype = Object.create( TextureNode.prototype );
	ScreenNode.prototype.constructor = ScreenNode;
	ScreenNode.prototype.nodeType = "Screen";

	ScreenNode.prototype.isUnique = function () {

		return true;

	};

	ScreenNode.prototype.getTexture = function ( builder, output ) {

		return InputNode$1.prototype.generate.call( this, builder, output, this.getUuid(), 't', 'renderTexture' );

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function PositionNode( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || PositionNode.LOCAL;

	}

	PositionNode.LOCAL = 'local';
	PositionNode.WORLD = 'world';
	PositionNode.VIEW = 'view';
	PositionNode.PROJECTION = 'projection';

	PositionNode.prototype = Object.create( TempNode.prototype );
	PositionNode.prototype.constructor = PositionNode;
	PositionNode.prototype.nodeType = "Position";

	PositionNode.prototype.getType = function ( ) {

		switch ( this.scope ) {

			case PositionNode.PROJECTION:

				return 'v4';

		}

		return this.type;

	};

	PositionNode.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case PositionNode.LOCAL:
			case PositionNode.WORLD:

				return false;

		}

		return true;

	};

	PositionNode.prototype.generate = function ( builder, output ) {

		var result;

		switch ( this.scope ) {

			case PositionNode.LOCAL:

				builder.requires.position = true;

				result = builder.isShader( 'vertex' ) ? 'transformed' : 'vPosition';

				break;

			case PositionNode.WORLD:

				builder.requires.worldPosition = true;

				result = 'vWPosition';

				break;

			case PositionNode.VIEW:

				result = builder.isShader( 'vertex' ) ? '-mvPosition.xyz' : 'vViewPosition';

				break;

			case PositionNode.PROJECTION:

				result = builder.isShader( 'vertex' ) ? '( projectionMatrix * modelViewMatrix * vec4( position, 1.0 ) )' : 'vec4( 0.0 )';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	PositionNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.scope = source.scope;

	};

	PositionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	NodeLib.addKeyword( 'position', function () {

		return new PositionNode();

	} );

	NodeLib.addKeyword( 'worldPosition', function () {

		return new PositionNode( PositionNode.WORLD );

	} );

	NodeLib.addKeyword( 'viewPosition', function () {

		return new PositionNode( NormalNode.VIEW );

	} );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function OperatorNode( a, b, op ) {

		TempNode.call( this );

		this.a = a;
		this.b = b;
		this.op = op;

	}

	OperatorNode.ADD = '+';
	OperatorNode.SUB = '-';
	OperatorNode.MUL = '*';
	OperatorNode.DIV = '/';

	OperatorNode.prototype = Object.create( TempNode.prototype );
	OperatorNode.prototype.constructor = OperatorNode;
	OperatorNode.prototype.nodeType = "Operator";

	OperatorNode.prototype.getType = function ( builder ) {

		var a = this.a.getType( builder ),
			b = this.b.getType( builder );

		if ( builder.isTypeMatrix( a ) ) {

			return 'v4';

		} else if ( builder.getTypeLength( b ) > builder.getTypeLength( a ) ) {

			// use the greater length vector

			return b;

		}

		return a;

	};

	OperatorNode.prototype.generate = function ( builder, output ) {

		var data = builder.getNodeData( this ),
			type = this.getType( builder );

		var a = this.a.build( builder, type ),
			b = this.b.build( builder, type );

		return builder.format( '( ' + a + ' ' + this.op + ' ' + b + ' )', type, output );

	};

	OperatorNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.a = source.a;
		this.b = source.b;
		this.op = source.op;

	};

	OperatorNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.a = this.a.toJSON( meta ).uuid;
			data.b = this.b.toJSON( meta ).uuid;
			data.op = this.op;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ReflectorNode( mirror ) {

		TempNode.call( this, 'v4' );

		if ( mirror ) this.setMirror( mirror );

	}

	ReflectorNode.prototype = Object.create( TempNode.prototype );
	ReflectorNode.prototype.constructor = ReflectorNode;
	ReflectorNode.prototype.nodeType = "Reflector";

	ReflectorNode.prototype.setMirror = function ( mirror ) {

		this.mirror = mirror;

		this.textureMatrix = new Matrix4Node( this.mirror.material.uniforms.textureMatrix.value );

		this.localPosition = new PositionNode( PositionNode.LOCAL );

		this.uv = new OperatorNode( this.textureMatrix, this.localPosition, OperatorNode.MUL );
		this.uvResult = new OperatorNode( null, this.uv, OperatorNode.ADD );

		this.texture = new TextureNode( this.mirror.material.uniforms.tDiffuse.value, this.uv, null, true );

	};

	ReflectorNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			this.uvResult.a = this.offset;
			this.texture.uv = this.offset ? this.uvResult : this.uv;

			if ( output === 'sampler2D' ) {

				return this.texture.build( builder, output );

			}

			return builder.format( this.texture.build( builder, this.type ), this.type, output );

		} else {

			console.warn( "THREE.ReflectorNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.type, output );

		}

	};

	ReflectorNode.prototype.copy = function ( source ) {

		InputNode.prototype.copy.call( this, source );

		this.scope.mirror = source.mirror;

	};

	ReflectorNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.mirror = this.mirror.uuid;

			if ( this.offset ) data.offset = this.offset.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function PropertyNode( object, property, type ) {

		InputNode$1.call( this, type );

		this.object = object;
		this.property = property;

	}

	PropertyNode.prototype = Object.create( InputNode$1.prototype );
	PropertyNode.prototype.constructor = PropertyNode;
	PropertyNode.prototype.nodeType = "Property";

	Object.defineProperties( PropertyNode.prototype, {

		value: {

			get: function () {

				return this.object[ this.property ];

			},

			set: function ( val ) {

				this.object[ this.property ] = val;

			}

		}

	} );

	PropertyNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value;
			data.property = this.property;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function RawNode( value ) {

		Node.call( this, 'v4' );

		this.value = value;

	}

	RawNode.prototype = Object.create( Node.prototype );
	RawNode.prototype.constructor = RawNode;
	RawNode.prototype.nodeType = "Raw";

	RawNode.prototype.generate = function ( builder ) {

		var data = this.value.parseAndBuildCode( builder, this.type ),
			code = data.code + '\n';

		if ( builder.isShader( 'vertex' ) ) {

			code += 'gl_Position = ' + data.result + ';';

		} else {

			code += 'gl_FragColor = ' + data.result + ';';

		}

		return code;

	};

	RawNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.value = source.value;

	};

	RawNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NodeMaterial( vertex, fragment ) {

		THREE.ShaderMaterial.call( this );

		this.vertex = vertex || new RawNode( new PositionNode( PositionNode.PROJECTION ) );
		this.fragment = fragment || new RawNode( new ColorNode( 0xFF0000 ) );

		this.updaters = [];

	}

	NodeMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );
	NodeMaterial.prototype.constructor = NodeMaterial;
	NodeMaterial.prototype.type = "NodeMaterial";

	NodeMaterial.prototype.isNodeMaterial = true;

	Object.defineProperties( NodeMaterial.prototype, {

		properties: {

			get: function () {

				return this.fragment.properties;

			}

		}

	} );

	NodeMaterial.prototype.updateFrame = function ( frame ) {

		for ( var i = 0; i < this.updaters.length; ++ i ) {

			frame.updateNode( this.updaters[ i ] );

		}

	};

	NodeMaterial.prototype.onBeforeCompile = function ( shader, renderer ) {

		if ( this.needsUpdate ) {

			this.build( { renderer: renderer } );

			shader.uniforms = this.uniforms;
			shader.vertexShader = this.vertexShader;
			shader.fragmentShader = this.fragmentShader;

		}

	};

	NodeMaterial.prototype.build = function ( params ) {

		params = params || {};

		var builder = params.builder || new NodeBuilder();

		builder.setMaterial( this, params.renderer );
		builder.build( this.vertex, this.fragment );

		this.vertexShader = builder.getCode( 'vertex' );
		this.fragmentShader = builder.getCode( 'fragment' );

		this.defines = builder.defines;
		this.uniforms = builder.uniforms;
		this.extensions = builder.extensions;
		this.updaters = builder.updaters;

		this.fog = builder.requires.fog;
		this.lights = builder.requires.lights;

		this.transparent = builder.requires.transparent || this.blending > THREE.NormalBlending;

		this.needsUpdate = false;

		return this;

	};

	NodeMaterial.prototype.copy = function ( source ) {

		var uuid = this.uuid;

		for ( var name in source ) {

			this[ name ] = source[ name ];

		}

		this.uuid = uuid;

		if ( source.userData !== undefined ) {

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

		}

	};

	NodeMaterial.prototype.toJSON = function ( meta ) {

		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( isRootObject ) {

			meta = {
				nodes: {}
			};

		}

		if ( meta && ! meta.materials ) meta.materials = {};

		if ( ! meta.materials[ this.uuid ] ) {

			var data = {};

			data.uuid = this.uuid;
			data.type = this.type;

			meta.materials[ data.uuid ] = data;

			if ( this.name !== "" ) data.name = this.name;

			if ( this.size !== undefined ) data.size = this.size;
			if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

			if ( this.blending !== THREE.NormalBlending ) data.blending = this.blending;
			if ( this.flatShading === true ) data.flatShading = this.flatShading;
			if ( this.side !== THREE.FrontSide ) data.side = this.side;
			if ( this.vertexColors !== THREE.NoColors ) data.vertexColors = this.vertexColors;

			if ( this.depthFunc !== THREE.LessEqualDepth ) data.depthFunc = this.depthFunc;
			if ( this.depthTest === false ) data.depthTest = this.depthTest;
			if ( this.depthWrite === false ) data.depthWrite = this.depthWrite;

			if ( this.linewidth !== 1 ) data.linewidth = this.linewidth;
			if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
			if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
			if ( this.scale !== undefined ) data.scale = this.scale;

			if ( this.dithering === true ) data.dithering = true;

			if ( this.wireframe === true ) data.wireframe = this.wireframe;
			if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
			if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
			if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

			if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
			if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

			if ( this.morphTargets === true ) data.morphTargets = true;
			if ( this.skinning === true ) data.skinning = true;

			if ( this.visible === false ) data.visible = false;
			if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

			data.fog = this.fog;
			data.lights = this.lights;

			data.vertex = this.vertex.toJSON( meta ).uuid;
			data.fragment = this.fragment.toJSON( meta ).uuid;

		}

		meta.material = this.uuid;

		return meta;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function RTTNode( width, height, input, options ) {

		options = options || {};

		this.input = input;

		this.clear = options.clear !== undefined ? options.clear : true;

		this.renderTarget = new THREE.WebGLRenderTarget( width, height, options );

		this.material = new NodeMaterial();

		this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add( this.quad );

		this.render = true;

		TextureNode.call( this, this.renderTarget.texture );

	}

	RTTNode.prototype = Object.create( TextureNode.prototype );
	RTTNode.prototype.constructor = RTTNode;
	RTTNode.prototype.nodeType = "RTT";

	RTTNode.prototype.build = function ( builder, output, uuid ) {

		var rttBuilder = new THREE.NodeBuilder();
		rttBuilder.nodes = builder.nodes;
		rttBuilder.updaters = builder.updaters;

		this.material.fragment.value = this.input;
		this.material.build( { builder: rttBuilder } );

		return TextureNode.prototype.build.call( this, builder, output, uuid );

	};

	RTTNode.prototype.updateFramesaveTo = function ( frame ) {

		this.saveTo.render = false;

		if ( this.saveTo !== this.saveToCurrent ) {

			if ( this.saveToMaterial ) this.saveToMaterial.dispose();

			var material = new NodeMaterial();
			material.fragment.value = this;
			material.build();

			var scene = new THREE.Scene();

			var quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), material );
			quad.frustumCulled = false; // Avoid getting clipped
			scene.add( quad );

			this.saveToScene = scene;
			this.saveToMaterial = material;

		}

		this.saveToCurrent = this.saveTo;

		frame.renderer.render( this.saveToScene, this.camera, this.saveTo.renderTarget, this.saveTo.clear );

	};

	RTTNode.prototype.updateFrame = function ( frame ) {

		if ( frame.renderer ) {

			// from the second frame

			if ( this.saveTo && this.saveTo.render === false ) {

				this.updateFramesaveTo( frame );

			}

			if ( this.render ) {

				if ( this.material.uniforms.renderTexture ) {

					this.material.uniforms.renderTexture.value = frame.renderTexture;

				}

				frame.renderer.render( this.scene, this.camera, this.renderTarget, this.clear );

			}

			// first frame

			if ( this.saveTo && this.saveTo.render === true ) {

				this.updateFramesaveTo( frame );

			}

		} else {

			console.warn( "RTTNode need a renderer in NodeFrame" );

		}

	};

	RTTNode.prototype.copy = function ( source ) {

		TextureNode.prototype.copy.call( this, source );

		this.saveTo = source.saveTo;

	};

	RTTNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = THREE.TextureNode.prototype.toJSON.call( this, meta );

			if ( this.saveTo ) data.saveTo = this.saveTo.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var vertexDict$1 = [ 'color', 'color2' ],
		fragmentDict$1 = [ 'vColor', 'vColor2' ];

	function ColorsNode( index ) {

		TempNode.call( this, 'v4', { shared: false } );

		this.index = index || 0;

	}

	ColorsNode.prototype = Object.create( TempNode.prototype );
	ColorsNode.prototype.constructor = ColorsNode;

	ColorsNode.prototype.generate = function ( builder, output ) {

		builder.requires.color[ this.index ] = true;

		var result = builder.isShader( 'vertex' ) ? vertexDict$1[ this.index ] : fragmentDict$1[ this.index ];

		return builder.format( result, this.getType( builder ), output );

	};

	ColorsNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.index = source.index;

	};

	ColorsNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.index = this.index;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NormalNode$1( scope ) {

		TempNode.call( this, 'v3' );

		this.scope = scope || NormalNode$1.LOCAL;

	}

	NormalNode$1.LOCAL = 'local';
	NormalNode$1.WORLD = 'world';
	NormalNode$1.VIEW = 'view';

	NormalNode$1.prototype = Object.create( TempNode.prototype );
	NormalNode$1.prototype.constructor = NormalNode$1;
	NormalNode$1.prototype.nodeType = "Normal";

	NormalNode$1.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case NormalNode$1.WORLD:

				return true;

		}

		return false;

	};

	NormalNode$1.prototype.generate = function ( builder, output ) {

		var result;

		switch ( this.scope ) {

			case NormalNode$1.LOCAL:

				builder.requires.normal = true;

				result = 'normal';

				break;

			case NormalNode$1.WORLD:

				builder.requires.worldNormal = true;

				result = builder.isShader( 'vertex' ) ? '( modelMatrix * vec4( objectNormal, 0.0 ) ).xyz' : 'vWNormal';

				break;

			case NormalNode$1.VIEW:

				result = 'vNormal';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	NormalNode$1.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.scope = source.scope;

	};

	NormalNode$1.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	NodeLib.addKeyword( 'normal', function () {

		return new NormalNode$1();

	} );

	NodeLib.addKeyword( 'worldNormal', function () {

		return new NormalNode$1( NormalNode$1.WORLD );

	} );

	NodeLib.addKeyword( 'viewNormal', function () {

		return new NormalNode$1( NormalNode$1.VIEW );

	} );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function CameraNode( scope, camera ) {

		TempNode.call( this, 'v3' );

		this.setScope( scope || CameraNode.POSITION );
		this.setCamera( camera );

	}

	CameraNode.Nodes = ( function () {

		var depthColor = new FunctionNode( [
			"float depthColor( float mNear, float mFar ) {",

			"	#ifdef USE_LOGDEPTHBUF_EXT",

			"		float depth = gl_FragDepthEXT / gl_FragCoord.w;",

			"	#else",

			"		float depth = gl_FragCoord.z / gl_FragCoord.w;",

			"	#endif",

			"	return 1.0 - smoothstep( mNear, mFar, depth );",

			"}"
		].join( "\n" ) );

		return {
			depthColor: depthColor
		};

	} )();

	CameraNode.POSITION = 'position';
	CameraNode.DEPTH = 'depth';
	CameraNode.TO_VERTEX = 'toVertex';

	CameraNode.prototype = Object.create( TempNode.prototype );
	CameraNode.prototype.constructor = CameraNode;
	CameraNode.prototype.nodeType = "Camera";

	CameraNode.prototype.setCamera = function ( camera ) {

		this.camera = camera;
		this.updateFrame = camera !== undefined ? this.onUpdateFrame : undefined;

	};

	CameraNode.prototype.setScope = function ( scope ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:

				delete this.near;
				delete this.far;

				break;

		}

		this.scope = scope;

		switch ( scope ) {

			case CameraNode.DEPTH:

				var camera = this.camera;

				this.near = new FloatNode( camera ? camera.near : 1 );
				this.far = new FloatNode( camera ? camera.far : 1200 );

				break;

		}

	};

	CameraNode.prototype.getType = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:

				return 'f';

		}

		return this.type;

	};

	CameraNode.prototype.isUnique = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:
			case CameraNode.TO_VERTEX:

				return true;

		}

		return false;

	};

	CameraNode.prototype.isShared = function ( builder ) {

		switch ( this.scope ) {

			case CameraNode.POSITION:

				return false;

		}

		return true;

	};

	CameraNode.prototype.generate = function ( builder, output ) {

		var result;

		switch ( this.scope ) {

			case CameraNode.POSITION:

				result = 'cameraPosition';

				break;

			case CameraNode.DEPTH:

				var depthColor = builder.include( CameraNode.Nodes.depthColor );

				result = depthColor + '( ' + this.near.build( builder, 'f' ) + ', ' + this.far.build( builder, 'f' ) + ' )';

				break;

			case CameraNode.TO_VERTEX:

				result = 'normalize( ' + new PositionNode( PositionNode.WORLD ).build( builder, 'v3' ) + ' - cameraPosition )';

				break;

		}

		return builder.format( result, this.getType( builder ), output );

	};

	CameraNode.prototype.onUpdateFrame = function ( frame ) {

		switch ( this.scope ) {

			case CameraNode.DEPTH:

				var camera = this.camera;

				this.near.value = camera.near;
				this.far.value = camera.far;

				break;

		}

	};

	CameraNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.setScope( source.scope );

		if ( source.camera ) {

			this.setCamera( source.camera );

		}

		switch ( source.scope ) {

			case CameraNode.DEPTH:

				this.near.number = source.near;
				this.far.number = source.far;

				break;

		}

	};

	CameraNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

			if ( this.camera ) data.camera = this.camera.uuid;

			switch ( this.scope ) {

				case CameraNode.DEPTH:

					data.near = this.near.value;
					data.far = this.far.value;

					break;

			}

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function LightNode( scope ) {

		TempNode.call( this, 'v3', { shared: false } );

		this.scope = scope || LightNode.TOTAL;

	}

	LightNode.TOTAL = 'total';

	LightNode.prototype = Object.create( TempNode.prototype );
	LightNode.prototype.constructor = LightNode;
	LightNode.prototype.nodeType = "Light";

	LightNode.prototype.generate = function ( builder, output ) {

		if ( builder.isCache( 'light' ) ) {

			return builder.format( 'reflectedLight.directDiffuse', this.type, output );

		} else {

			console.warn( "THREE.LightNode is only compatible in \"light\" channel." );

			return builder.format( 'vec3( 0.0 )', this.type, output );

		}

	};

	LightNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.scope = source.scope;

	};

	LightNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ResolutionNode() {

		Vector2Node.call( this );

	}

	ResolutionNode.prototype = Object.create( Vector2Node.prototype );
	ResolutionNode.prototype.constructor = ResolutionNode;
	ResolutionNode.prototype.nodeType = "Resolution";

	ResolutionNode.prototype.updateFrame = function ( frame ) {

		if ( frame.renderer ) {

			var size = frame.renderer.getSize(),
				pixelRatio = frame.renderer.getPixelRatio();

			this.x = size.width * pixelRatio;
			this.y = size.height * pixelRatio;

		} else {

			console.warn( "ResolutionNode need a renderer in NodeFrame" );

		}

	};

	ResolutionNode.prototype.copy = function ( source ) {

		Vector2Node.prototype.copy.call( this, source );

		this.renderer = source.renderer;

	};

	ResolutionNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.renderer = this.renderer.uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ScreenUVNode( resolution ) {

		TempNode.call( this, 'v2' );

		this.resolution = resolution || new ResolutionNode();

	}

	ScreenUVNode.prototype = Object.create( TempNode.prototype );
	ScreenUVNode.prototype.constructor = ScreenUVNode;
	ScreenUVNode.prototype.nodeType = "ScreenUV";

	ScreenUVNode.prototype.generate = function ( builder, output ) {

		var result;

		if ( builder.isShader( 'fragment' ) ) {

			result = '( gl_FragCoord.xy / ' + this.resolution.build( builder, 'v2' ) + ')';

		} else {

			console.warn( "THREE.ScreenUVNode is not compatible with " + builder.shader + " shader." );

			result = 'vec2( 0.0 )';

		}

		return builder.format( result, this.getType( builder ), output );

	};

	ScreenUVNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.resolution = source.resolution;

	};

	ScreenUVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.resolution = this.resolution.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Math1Node( a, method ) {

		TempNode.call( this );

		this.a = a;

		this.method = method;

	}

	Math1Node.RAD = 'radians';
	Math1Node.DEG = 'degrees';
	Math1Node.EXP = 'exp';
	Math1Node.EXP2 = 'exp2';
	Math1Node.LOG = 'log';
	Math1Node.LOG2 = 'log2';
	Math1Node.SQRT = 'sqrt';
	Math1Node.INV_SQRT = 'inversesqrt';
	Math1Node.FLOOR = 'floor';
	Math1Node.CEIL = 'ceil';
	Math1Node.NORMALIZE = 'normalize';
	Math1Node.FRACT = 'fract';
	Math1Node.SATURATE = 'saturate';
	Math1Node.SIN = 'sin';
	Math1Node.COS = 'cos';
	Math1Node.TAN = 'tan';
	Math1Node.ASIN = 'asin';
	Math1Node.ACOS = 'acos';
	Math1Node.ARCTAN = 'atan';
	Math1Node.ABS = 'abs';
	Math1Node.SIGN = 'sign';
	Math1Node.LENGTH = 'length';
	Math1Node.NEGATE = 'negate';
	Math1Node.INVERT = 'invert';

	Math1Node.prototype = Object.create( TempNode.prototype );
	Math1Node.prototype.constructor = Math1Node;
	Math1Node.prototype.nodeType = "Math1";

	Math1Node.prototype.getType = function ( builder ) {

		switch ( this.method ) {

			case Math1Node.LENGTH:

				return 'f';

		}

		return this.a.getType( builder );

	};

	Math1Node.prototype.generate = function ( builder, output ) {

		var type = this.getType( builder ),
			result = this.a.build( builder, type );

		switch ( this.method ) {

			case Math1Node.NEGATE:

				result = '( -' + result + ' )';

				break;

			case Math1Node.INVERT:

				result = '( 1.0 - ' + result + ' )';

				break;

			default:

				result = this.method + '( ' + result + ' )';

				break;

		}

		return builder.format( result, type, output );

	};

	Math1Node.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.a = source.a;
		this.method = source.method;

	};

	Math1Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.a = this.a.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Math2Node( a, b, method ) {

		TempNode.call( this );

		this.a = a;
		this.b = b;

		this.method = method;

	}

	Math2Node.MIN = 'min';
	Math2Node.MAX = 'max';
	Math2Node.MOD = 'mod';
	Math2Node.STEP = 'step';
	Math2Node.REFLECT = 'reflect';
	Math2Node.DISTANCE = 'distance';
	Math2Node.DOT = 'dot';
	Math2Node.CROSS = 'cross';
	Math2Node.POW = 'pow';

	Math2Node.prototype = Object.create( TempNode.prototype );
	Math2Node.prototype.constructor = Math2Node;
	Math2Node.prototype.nodeType = "Math2";

	Math2Node.prototype.getInputType = function ( builder ) {

		// use the greater length vector

		if ( builder.getTypeLength( this.b.getType( builder ) ) > builder.getTypeLength( this.a.getType( builder ) ) ) {

			return this.b.getType( builder );

		}

		return this.a.getType( builder );

	};

	Math2Node.prototype.getType = function ( builder ) {

		switch ( this.method ) {

			case Math2Node.DISTANCE:
			case Math2Node.DOT:

				return 'f';

			case Math2Node.CROSS:

				return 'v3';

		}

		return this.getInputType( builder );

	};

	Math2Node.prototype.generate = function ( builder, output ) {

		var a, b,
			type = this.getInputType( builder ),
			al = builder.getTypeLength( this.a.getType( builder ) ),
			bl = builder.getTypeLength( this.b.getType( builder ) );

		// optimzer

		switch ( this.method ) {

			case Math2Node.CROSS:

				a = this.a.build( builder, 'v3' );
				b = this.b.build( builder, 'v3' );

				break;

			case Math2Node.STEP:

				a = this.a.build( builder, al === 1 ? 'f' : type );
				b = this.b.build( builder, type );

				break;

			case Math2Node.MIN:
			case Math2Node.MAX:
			case Math2Node.MOD:

				a = this.a.build( builder, type );
				b = this.b.build( builder, bl === 1 ? 'f' : type );

				break;

			default:

				a = this.a.build( builder, type );
				b = this.b.build( builder, type );

				break;

		}

		return builder.format( this.method + '( ' + a + ', ' + b + ' )', this.getType( builder ), output );

	};

	Math2Node.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.a = source.a;
		this.b = source.b;
		this.method = source.method;

	};

	Math2Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.a = this.a.toJSON( meta ).uuid;
			data.b = this.b.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function Math3Node( a, b, c, method ) {

		TempNode.call( this );

		this.a = a;
		this.b = b;
		this.c = c;

		this.method = method;

	}

	Math3Node.MIX = 'mix';
	Math3Node.CLAMP = 'clamp';
	Math3Node.REFRACT = 'refract';
	Math3Node.SMOOTHSTEP = 'smoothstep';
	Math3Node.FACEFORWARD = 'faceforward';

	Math3Node.prototype = Object.create( TempNode.prototype );
	Math3Node.prototype.constructor = Math3Node;
	Math3Node.prototype.nodeType = "Math3";

	Math3Node.prototype.getType = function ( builder ) {

		var a = builder.getTypeLength( this.a.getType( builder ) );
		var b = builder.getTypeLength( this.b.getType( builder ) );
		var c = builder.getTypeLength( this.c.getType( builder ) );

		if ( a > b && a > c ) {

			return this.a.getType( builder );

		} else if ( b > c ) {

			return this.b.getType( builder );

		}

		return this.c.getType( builder );

	};

	Math3Node.prototype.generate = function ( builder, output ) {

		var a, b, c,
			al = builder.getTypeLength( this.a.getType( builder ) ),
			bl = builder.getTypeLength( this.b.getType( builder ) ),
			cl = builder.getTypeLength( this.c.getType( builder ) ),
			type = this.getType( builder );

		// optimzer

		switch ( this.method ) {

			case Math3Node.REFRACT:

				a = this.a.build( builder, type );
				b = this.b.build( builder, type );
				c = this.c.build( builder, 'f' );

				break;

			case Math3Node.MIX:

				a = this.a.build( builder, type );
				b = this.b.build( builder, type );
				c = this.c.build( builder, cl === 1 ? 'f' : type );

				break;

			default:

				a = this.a.build( builder, type );
				b = this.b.build( builder, type );
				c = this.c.build( builder, type );

				break;

		}

		return builder.format( this.method + '( ' + a + ', ' + b + ', ' + c + ' )', type, output );

	};

	Math3Node.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.a = source.a;
		this.b = source.b;
		this.c = source.c;
		this.method = source.method;

	};

	Math3Node.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.a = this.a.toJSON( meta ).uuid;
			data.b = this.b.toJSON( meta ).uuid;
			data.c = this.c.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function CondNode( a, b, ifNode, elseNode, op ) {

		TempNode.call( this );

		this.a = a;
		this.b = b;

		this.ifNode = ifNode;
		this.elseNode = elseNode;

		this.op = op;

	}

	CondNode.EQUAL = '==';
	CondNode.NOT_EQUAL = '!=';
	CondNode.GREATER = '>';
	CondNode.GREATER_EQUAL = '>=';
	CondNode.LESS = '<';
	CondNode.LESS_EQUAL = '<=';

	CondNode.prototype = Object.create( TempNode.prototype );
	CondNode.prototype.constructor = CondNode;
	CondNode.prototype.nodeType = "Cond";

	CondNode.prototype.getType = function ( builder ) {

		if ( builder.getTypeLength( this.elseNode.getType( builder ) ) > builder.getTypeLength( this.ifNode.getType( builder ) ) ) {

			return this.elseNode.getType( builder );

		}

		return this.ifNode.getType( builder );

	};

	CondNode.prototype.getCondType = function ( builder ) {

		if ( builder.getTypeLength( this.b.getType( builder ) ) > builder.getTypeLength( this.a.getType( builder ) ) ) {

			return this.b.getType( builder );

		}

		return this.a.getType( builder );

	};

	CondNode.prototype.generate = function ( builder, output ) {

		var type = this.getType( builder ),
			condType = this.getCondType( builder ),
			a = this.a.build( builder, condType ),
			b = this.b.build( builder, condType ),
			ifNode = this.ifNode.build( builder, type ),
			elseNode = this.elseNode.build( builder, type );

		var code = '( ' + [ a, this.op, b, '?', ifNode, ':', elseNode ].join( ' ' ) + ' )';

		return builder.format( code, this.getType( builder ), output );

	};

	CondNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.a = source.a;
		this.b = source.b;

		this.ifNode = source.ifNode;
		this.elseNode = source.elseNode;

		this.op = source.op;

	};

	CondNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.a = this.a.toJSON( meta ).uuid;
			data.b = this.b.toJSON( meta ).uuid;

			data.ifNode = this.ifNode.toJSON( meta ).uuid;
			data.elseNode = this.elseNode.toJSON( meta ).uuid;

			data.op = this.op;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NoiseNode( uv ) {

		TempNode.call( this, 'f' );

		this.uv = uv || new UVNode();

	}

	NoiseNode.prototype = Object.create( TempNode.prototype );
	NoiseNode.prototype.constructor = NoiseNode;
	NoiseNode.prototype.nodeType = "Noise";

	NoiseNode.Nodes = ( function () {

		var snoise = new FunctionNode( [
			"float snoise(vec2 co) {",

			"	return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );",

			"}"
		].join( "\n" ) );

		return {
			snoise: snoise
		};

	} )();

	NoiseNode.prototype.generate = function ( builder, output ) {

		var snoise = builder.include( NoiseNode.Nodes.snoise );

		return builder.format( snoise + '( ' + this.uv.build( builder, 'v2' ) + ' )', this.getType( builder ), output );

	};

	NoiseNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.uv = source.uv;

	};

	NoiseNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function CheckerNode( uv ) {

		TempNode.call( this, 'f' );

		this.uv = uv || new UVNode();

	}

	CheckerNode.prototype = Object.create( TempNode.prototype );
	CheckerNode.prototype.constructor = CheckerNode;
	CheckerNode.prototype.nodeType = "Noise";

	CheckerNode.Nodes = ( function () {

		// https://github.com/mattdesl/glsl-checker/blob/master/index.glsl

		var checker = new FunctionNode( [
			"float checker( vec2 uv ) {",

			"	float cx = floor( uv.x );",
			"	float cy = floor( uv.y ); ",
			"	float result = mod( cx + cy, 2.0 );",

			"	return sign( result );",

			"}"
		].join( "\n" ) );

		return {
			checker: checker
		};

	} )();

	CheckerNode.prototype.generate = function ( builder, output ) {

		var snoise = builder.include( CheckerNode.Nodes.checker );

		return builder.format( snoise + '( ' + this.uv.build( builder, 'v2' ) + ' )', this.getType( builder ), output );

	};

	CheckerNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.uv = source.uv;

	};

	CheckerNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function BlinnShininessExponentNode() {

		TempNode.call( this, 'f' );

	}

	BlinnShininessExponentNode.prototype = Object.create( TempNode.prototype );
	BlinnShininessExponentNode.prototype.constructor = BlinnShininessExponentNode;
	BlinnShininessExponentNode.prototype.nodeType = "BlinnShininessExponent";

	BlinnShininessExponentNode.prototype.generate = function ( builder, output ) {

		if ( builder.isCache( 'clearCoat' ) ) {

			return builder.format( 'Material_ClearCoat_BlinnShininessExponent( material )', this.type, output );

		} else {

			return builder.format( 'Material_BlinnShininessExponent( material )', this.type, output );

		}

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function BlinnExponentToRoughnessNode( blinnExponent ) {

		TempNode.call( this, 'f' );

		this.blinnExponent = blinnExponent || new BlinnShininessExponentNode();

	}

	BlinnExponentToRoughnessNode.prototype = Object.create( TempNode.prototype );
	BlinnExponentToRoughnessNode.prototype.constructor = BlinnExponentToRoughnessNode;
	BlinnExponentToRoughnessNode.prototype.nodeType = "BlinnExponentToRoughness";

	BlinnExponentToRoughnessNode.prototype.generate = function ( builder, output ) {

		return builder.format( 'BlinnExponentToGGXRoughness( ' + this.blinnExponent.build( builder, 'f' ) + ' )', this.type, output );

	};

	BlinnExponentToRoughnessNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.blinnExponent = source.blinnExponent;

	};

	BlinnExponentToRoughnessNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.blinnExponent = this.blinnExponent;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function MaxMIPLevelNode( texture ) {

		FloatNode.call( this );

		this.texture = texture;

		this.maxMIPLevel = 0;

	}

	MaxMIPLevelNode.prototype = Object.create( FloatNode.prototype );
	MaxMIPLevelNode.prototype.constructor = MaxMIPLevelNode;
	MaxMIPLevelNode.prototype.nodeType = "MaxMIPLevel";

	Object.defineProperties( MaxMIPLevelNode.prototype, {

		value: {

			get: function () {

				if ( this.maxMIPLevel === 0 ) {

					var image = this.texture.value.image ? this.texture.value.image[ 0 ] : undefined;

					this.maxMIPLevel = image !== undefined ? Math.log( Math.max( image.width, image.height ) ) * Math.LOG2E : 0;

				}

				return this.maxMIPLevel;

			},

			set: function () { }

		}

	} );

	MaxMIPLevelNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.texture = this.texture.uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function RoughnessToBlinnExponentNode( texture ) {

		TempNode.call( this, 'f' );

		this.texture = texture;

		this.maxMIPLevel = new MaxMIPLevelNode( texture );
		this.blinnShininessExponent = new BlinnShininessExponentNode();

	}

	RoughnessToBlinnExponentNode.Nodes = ( function () {

		var getSpecularMIPLevel = new FunctionNode( [
			// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
			"float getSpecularMIPLevel( const in float blinnShininessExponent, const in float maxMIPLevelScalar ) {",

			//	float envMapWidth = pow( 2.0, maxMIPLevelScalar );
			//	float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );

			"	float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );",

			// clamp to allowable LOD ranges.
			"	return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );",

			"}"
		].join( "\n" ) );

		return {
			getSpecularMIPLevel: getSpecularMIPLevel
		};

	} )();

	RoughnessToBlinnExponentNode.prototype = Object.create( TempNode.prototype );
	RoughnessToBlinnExponentNode.prototype.constructor = RoughnessToBlinnExponentNode;
	RoughnessToBlinnExponentNode.prototype.nodeType = "RoughnessToBlinnExponent";

	RoughnessToBlinnExponentNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			this.maxMIPLevel.texture = this.texture;

			var getSpecularMIPLevel = builder.include( RoughnessToBlinnExponentNode.Nodes.getSpecularMIPLevel );

			return builder.format( getSpecularMIPLevel + '( ' + this.blinnShininessExponent.build( builder, 'f' ) + ', ' + this.maxMIPLevel.build( builder, 'f' ) + ' )', this.type, output );

		} else {

			console.warn( "THREE.RoughnessToBlinnExponentNode is not compatible with " + builder.shader + " shader." );

			return builder.format( '0.0', this.type, output );

		}

	};

	RoughnessToBlinnExponentNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.texture = source.texture;

	};

	RoughnessToBlinnExponentNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.texture = this.texture;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TextureCubeUVNode( uv, textureSize, blinnExponentToRoughness ) {

		TempNode.call( this, 'TextureCubeUVData' ); // TextureCubeUVData is type as StructNode

		this.uv = uv || new ReflectNode( ReflectNode.VECTOR );
		this.textureSize = textureSize || new FloatNode( 1024 );
		this.blinnExponentToRoughness = blinnExponentToRoughness || new BlinnExponentToRoughnessNode();

	}

	TextureCubeUVNode.Nodes = ( function () {

		var TextureCubeUVData = new StructNode( [
			"struct TextureCubeUVData {",
			"	vec2 uv_10;",
			"	vec2 uv_20;",
			"	float t;",
			"}"
		].join( "\n" ) );

		var getFaceFromDirection = new FunctionNode( [
			"int getFaceFromDirection(vec3 direction) {",
			"	vec3 absDirection = abs(direction);",
			"	int face = -1;",
			"	if( absDirection.x > absDirection.z ) {",
			"		if(absDirection.x > absDirection.y )",
			"			face = direction.x > 0.0 ? 0 : 3;",
			"		else",
			"			face = direction.y > 0.0 ? 1 : 4;",
			"	}",
			"	else {",
			"		if(absDirection.z > absDirection.y )",
			"			face = direction.z > 0.0 ? 2 : 5;",
			"		else",
			"			face = direction.y > 0.0 ? 1 : 4;",
			"	}",
			"	return face;",
			"}"
		].join( "\n" ) );

		var cubeUV_maxLods1 = new ConstNode( "#define cubeUV_maxLods1 ( log2( cubeUV_textureSize * 0.25 ) - 1.0 )" );
		var cubeUV_rangeClamp = new ConstNode( "#define cubeUV_rangeClamp ( exp2( ( 6.0 - 1.0 ) * 2.0 ) )" );

		var MipLevelInfo = new FunctionNode( [
			"vec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness, in float cubeUV_textureSize ) {",
			"	float scale = exp2(cubeUV_maxLods1 - roughnessLevel);",
			"	float dxRoughness = dFdx(roughness);",
			"	float dyRoughness = dFdy(roughness);",
			"	vec3 dx = dFdx( vec * scale * dxRoughness );",
			"	vec3 dy = dFdy( vec * scale * dyRoughness );",
			"	float d = max( dot( dx, dx ), dot( dy, dy ) );",
			// Clamp the value to the max mip level counts. hard coded to 6 mips"
			"	d = clamp(d, 1.0, cubeUV_rangeClamp);",
			"	float mipLevel = 0.5 * log2(d);",
			"	return vec2(floor(mipLevel), fract(mipLevel));",
			"}"
		].join( "\n" ), [ cubeUV_maxLods1, cubeUV_rangeClamp ], { derivatives: true } );

		var cubeUV_maxLods2 = new ConstNode( "#define cubeUV_maxLods2 ( log2( cubeUV_textureSize * 0.25 ) - 2.0 )" );
		var cubeUV_rcpTextureSize = new ConstNode( "#define cubeUV_rcpTextureSize ( 1.0 / cubeUV_textureSize )" );

		var getCubeUV = new FunctionNode( [
			"vec2 getCubeUV( vec3 direction, float roughnessLevel, float mipLevel, in float cubeUV_textureSize ) {",
			"	mipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;",
			"	float a = 16.0 * cubeUV_rcpTextureSize;",
			"",
			"	vec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );",
			"	vec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;",
			// float powScale = exp2(roughnessLevel + mipLevel);"
			"	float powScale = exp2_packed.x * exp2_packed.y;",
			// float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);"
			"	float scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;",
			// float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);"
			"	float mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;",
			"",
			"	bool bRes = mipLevel == 0.0;",
			"	scale =  bRes && (scale < a) ? a : scale;",
			"",
			"	vec3 r;",
			"	vec2 offset;",
			"	int face = getFaceFromDirection(direction);",
			"",
			"	float rcpPowScale = 1.0 / powScale;",
			"",
			"	if( face == 0) {",
			"		r = vec3(direction.x, -direction.z, direction.y);",
			"		offset = vec2(0.0+mipOffset,0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 1) {",
			"		r = vec3(direction.y, direction.x, direction.z);",
			"		offset = vec2(scale+mipOffset, 0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 2) {",
			"		r = vec3(direction.z, direction.x, direction.y);",
			"		offset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;",
			"	}",
			"	else if( face == 3) {",
			"		r = vec3(direction.x, direction.z, direction.y);",
			"		offset = vec2(0.0+mipOffset,0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	else if( face == 4) {",
			"		r = vec3(direction.y, direction.x, -direction.z);",
			"		offset = vec2(scale+mipOffset, 0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	else {",
			"		r = vec3(direction.z, -direction.x, direction.y);",
			"		offset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);",
			"		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;",
			"	}",
			"	r = normalize(r);",
			"	float texelOffset = 0.5 * cubeUV_rcpTextureSize;",
			"	vec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;",
			"	vec2 base = offset + vec2( texelOffset );",
			"	return base + s * ( scale - 2.0 * texelOffset );",
			"}"
		].join( "\n" ), [ cubeUV_maxLods2, cubeUV_rcpTextureSize, getFaceFromDirection ] );

		var cubeUV_maxLods3 = new ConstNode( "#define cubeUV_maxLods3 ( log2( cubeUV_textureSize * 0.25 ) - 3.0 )" );

		var textureCubeUV = new FunctionNode( [
			"TextureCubeUVData textureCubeUV( vec3 reflectedDirection, float roughness, in float cubeUV_textureSize ) {",
			"	float roughnessVal = roughness * cubeUV_maxLods3;",
			"	float r1 = floor(roughnessVal);",
			"	float r2 = r1 + 1.0;",
			"	float t = fract(roughnessVal);",
			"	vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness, cubeUV_textureSize);",
			"	float s = mipInfo.y;",
			"	float level0 = mipInfo.x;",
			"	float level1 = level0 + 1.0;",
			"	level1 = level1 > 5.0 ? 5.0 : level1;",
			"",
			// round to nearest mipmap if we are not interpolating."
			"	level0 += min( floor( s + 0.5 ), 5.0 );",
			"",
			// Tri linear interpolation."
			"	vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0, cubeUV_textureSize);",
			"	vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0, cubeUV_textureSize);",
			"",
			"	return TextureCubeUVData(uv_10, uv_20, t);",
			"}"
		].join( "\n" ), [ TextureCubeUVData, cubeUV_maxLods3, MipLevelInfo, getCubeUV ] );

		return {
			TextureCubeUVData: TextureCubeUVData,
			textureCubeUV: textureCubeUV
		};

	} )();

	TextureCubeUVNode.prototype = Object.create( TempNode.prototype );
	TextureCubeUVNode.prototype.constructor = TextureCubeUVNode;
	TextureCubeUVNode.prototype.nodeType = "TextureCubeUV";

	TextureCubeUVNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var textureCubeUV = builder.include( TextureCubeUVNode.Nodes.textureCubeUV );

			return builder.format( textureCubeUV + '( ' + this.uv.build( builder, 'v3' ) + ', ' +
				this.blinnExponentToRoughness.build( builder, 'f' ) + ', ' +
				this.textureSize.build( builder, 'f' ) + ' )', this.getType( builder ), output );

		} else {

			console.warn( "THREE.TextureCubeUVNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	TextureCubeUVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;
			data.textureSize = this.textureSize.toJSON( meta ).uuid;
			data.blinnExponentToRoughness = this.blinnExponentToRoughness.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TextureCubeNode$1( value, uv ) {

		TempNode.call( this, 'v4' );

		this.value = value;
		this.uv = uv || new TextureCubeUVNode();

	}

	TextureCubeNode$1.prototype = Object.create( TempNode.prototype );
	TextureCubeNode$1.prototype.constructor = TextureCubeNode$1;
	TextureCubeNode$1.prototype.nodeType = "TextureCube";

	TextureCubeNode$1.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var uv_10 = this.uv.build( builder ) + '.uv_10',
				uv_20 = this.uv.build( builder ) + '.uv_20',
				t = this.uv.build( builder ) + '.t';

			var color10 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_10 + ' )', this.value.value ),
				color20 = builder.getTexelDecodingFunctionFromTexture( 'texture2D( ' + this.value.build( builder, 'sampler2D' ) + ', ' + uv_20 + ' )', this.value.value );

			return builder.format( 'vec4( mix( ' + color10 + ', ' + color20 + ', ' + t + ' ).rgb, 1.0 )', this.getType( builder ), output );

		} else {

			console.warn( "THREE.TextureCubeNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	TextureCubeNode$1.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;
			data.textureSize = this.textureSize.toJSON( meta ).uuid;
			data.blinnExponentToRoughness = this.blinnExponentToRoughness.toJSON( meta ).uuid;

			if ( this.roughness ) data.roughness = this.roughness.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NormalMapNode( value, scale ) {

		TempNode.call( this, 'v3' );

		this.value = value;
		this.scale = scale || new Vector2Node( 1, 1 );

	}

	NormalMapNode.Nodes = ( function () {

		var perturbNormal2Arb = new FunctionNode( [

			// Per-Pixel Tangent Space Normal Mapping
			// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

			"vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 mUv, vec2 normalScale ) {",

			// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

			"	vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );",
			"	vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );",
			"	vec2 st0 = dFdx( mUv.st );",
			"	vec2 st1 = dFdy( mUv.st );",

			"	float scale = sign( st1.t * st0.s - st0.t * st1.s );", // we do not care about the magnitude

			"	vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );",
			"	vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );",
			"	vec3 N = normalize( surf_norm );",
			"	mat3 tsn = mat3( S, T, N );",

			"	vec3 mapN = map * 2.0 - 1.0;",

			"	mapN.xy *= normalScale;",
			"	mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );",

			"	return normalize( tsn * mapN );",

			"}"

		].join( "\n" ), null, { derivatives: true } );

		return {
			perturbNormal2Arb: perturbNormal2Arb
		};

	} )();

	NormalMapNode.prototype = Object.create( TempNode.prototype );
	NormalMapNode.prototype.constructor = NormalMapNode;
	NormalMapNode.prototype.nodeType = "NormalMap";

	NormalMapNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var perturbNormal2Arb = builder.include( NormalMapNode.Nodes.perturbNormal2Arb );

			this.normal = this.normal || new NormalNode$1();
			this.position = this.position || new PositionNode( PositionNode.VIEW );
			this.uv = this.uv || new UVNode();

			return builder.format( perturbNormal2Arb + '( -' + this.position.build( builder, 'v3' ) + ', ' +
				this.normal.build( builder, 'v3' ) + ', ' +
				this.value.build( builder, 'v3' ) + ', ' +
				this.uv.build( builder, 'v2' ) + ', ' +
				this.scale.build( builder, 'v2' ) + ' )', this.getType( builder ), output );

		} else {

			console.warn( "THREE.NormalMapNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

		}

	};

	NormalMapNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.value = source.value;
		this.scale = source.scale;

	};

	NormalMapNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;
			data.scale = this.scale.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function BumpMapNode( value, scale ) {

		TempNode.call( this, 'v3' );

		this.value = value;
		this.scale = scale || new FloatNode( 1 );

		this.toNormalMap = false;

	}

	BumpMapNode.Nodes = ( function () {

		var dHdxy_fwd = new FunctionNode( [

			// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
			// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

			// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

			"vec2 dHdxy_fwd( sampler2D bumpMap, vec2 vUv, float bumpScale ) {",

			// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

			"	vec2 dSTdx = dFdx( vUv );",
			"	vec2 dSTdy = dFdy( vUv );",

			"	float Hll = bumpScale * texture2D( bumpMap, vUv ).x;",
			"	float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;",
			"	float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;",

			"	return vec2( dBx, dBy );",

			"}"

		].join( "\n" ), null, { derivatives: true } );

		var perturbNormalArb = new FunctionNode( [

			"vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {",

			// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

			"	vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );",
			"	vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );",
			"	vec3 vN = surf_norm;", // normalized

			"	vec3 R1 = cross( vSigmaY, vN );",
			"	vec3 R2 = cross( vN, vSigmaX );",

			"	float fDet = dot( vSigmaX, R1 );",

			"	fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );",

			"	vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );",

			"	return normalize( abs( fDet ) * surf_norm - vGrad );",

			"}"

		].join( "\n" ), [ dHdxy_fwd ], { derivatives: true } );

		var bumpToNormal = new FunctionNode( [
			"vec3 bumpToNormal( sampler2D bumpMap, vec2 uv, float scale ) {",

			"	vec2 dSTdx = dFdx( uv );",
			"	vec2 dSTdy = dFdy( uv );",

			"	float Hll = texture2D( bumpMap, uv ).x;",
			"	float dBx = texture2D( bumpMap, uv + dSTdx ).x - Hll;",
			"	float dBy = texture2D( bumpMap, uv + dSTdy ).x - Hll;",

			"	return vec3( .5 - ( dBx * scale ), .5 - ( dBy * scale ), 1.0 );",

			"}"
		].join( "\n" ), null, { derivatives: true } );

		return {
			dHdxy_fwd: dHdxy_fwd,
			perturbNormalArb: perturbNormalArb,
			bumpToNormal: bumpToNormal
		};

	} )();

	BumpMapNode.prototype = Object.create( TempNode.prototype );
	BumpMapNode.prototype.constructor = BumpMapNode;
	BumpMapNode.prototype.nodeType = "BumpMap";

	BumpMapNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			if ( this.toNormalMap ) {

				var bumpToNormal = builder.include( BumpMapNode.Nodes.bumpToNormal );

				return builder.format( bumpToNormal + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' +
					this.value.uv.build( builder, 'v2' ) + ', ' +
					this.scale.build( builder, 'f' ) + ' )', this.getType( builder ), output );

			} else {

				var derivativeHeight = builder.include( BumpMapNode.Nodes.dHdxy_fwd ),
					perturbNormalArb = builder.include( BumpMapNode.Nodes.perturbNormalArb );

				this.normal = this.normal || new NormalNode$1();
				this.position = this.position || new PositionNode( PositionNode.VIEW );

				var derivativeHeightCode = derivativeHeight + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' +
					this.value.uv.build( builder, 'v2' ) + ', ' +
					this.scale.build( builder, 'f' ) + ' )';

				return builder.format( perturbNormalArb + '( -' + this.position.build( builder, 'v3' ) + ', ' +
					this.normal.build( builder, 'v3' ) + ', ' +
					derivativeHeightCode + ' )', this.getType( builder ), output );

			}

		} else {

			console.warn( "THREE.BumpMapNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec3( 0.0 )', this.getType( builder ), output );

		}

	};

	BumpMapNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.value = source.value;
		this.scale = source.scale;

	};

	BumpMapNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;
			data.scale = this.scale.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function BypassNode( code, value ) {

		Node.call( this );

		this.code = code;
		this.value = value;

	}

	BypassNode.prototype = Object.create( Node.prototype );
	BypassNode.prototype.constructor = BypassNode;
	BypassNode.prototype.nodeType = "Bypass";

	BypassNode.prototype.getType = function ( builder ) {

		if ( this.value ) {

			return this.value.getType( builder );

		} else if ( builder.isShader( 'fragment' ) ) {

			return 'f';

		}

		return 'void';

	};

	BypassNode.prototype.generate = function ( builder, output ) {

		var code = this.code.build( builder, output ) + ';';

		builder.addNodeCode( code );

		if ( builder.isShader( 'vertex' ) ) {

			if ( this.value ) {

				return this.value.build( builder, output );

			}

		} else {

			return this.value ? this.value.build( builder, output ) : builder.format( '0.0', 'f', output );

		}

	};

	BypassNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.code = source.code;
		this.value = source.value;

	};

	BypassNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.code = this.code.toJSON( meta ).uuid;

			if ( this.value ) data.value = this.value.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var inputs = NodeUtils.elements;

	function JoinNode( x, y, z, w ) {

		TempNode.call( this, 'f' );

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	}

	JoinNode.prototype = Object.create( TempNode.prototype );
	JoinNode.prototype.constructor = JoinNode;
	JoinNode.prototype.nodeType = "Join";

	JoinNode.prototype.getNumElements = function () {

		var i = inputs.length;

		while ( i -- ) {

			if ( this[ inputs[ i ] ] !== undefined ) {

				++ i;

				break;

			}

		}

		return Math.max( i, 2 );

	};

	JoinNode.prototype.getType = function ( builder ) {

		return builder.getTypeFromLength( this.getNumElements() );

	};

	JoinNode.prototype.generate = function ( builder, output ) {

		var type = this.getType( builder ),
			length = this.getNumElements(),
			outputs = [];

		for ( var i = 0; i < length; i ++ ) {

			var elm = this[ inputs[ i ] ];

			outputs.push( elm ? elm.build( builder, 'f' ) : '0.0' );

		}

		var code = ( length > 1 ? builder.getConstructorFromLength( length ) : '' ) + '( ' + outputs.join( ', ' ) + ' )';

		return builder.format( code, type, output );

	};

	JoinNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		for ( var prop in source.inputs ) {

			this[ prop ] = source.inputs[ prop ];

		}

	};

	JoinNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.inputs = {};

			var length = this.getNumElements();

			for ( var i = 0; i < length; i ++ ) {

				var elm = this[ inputs[ i ] ];

				if ( elm ) {

					data.inputs[ inputs[ i ] ] = elm.toJSON( meta ).uuid;

				}

			}


		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function SwitchNode( node, components ) {

		Node.call( this );

		this.node = node;
		this.components = components || 'x';

	}

	SwitchNode.prototype = Object.create( Node.prototype );
	SwitchNode.prototype.constructor = SwitchNode;
	SwitchNode.prototype.nodeType = "Switch";

	SwitchNode.prototype.getType = function ( builder ) {

		return builder.getTypeFromLength( this.components.length );

	};

	SwitchNode.prototype.generate = function ( builder, output ) {

		var type = this.node.getType( builder ),
			node = this.node.build( builder, type ),
			inputLength = builder.getTypeLength( type ) - 1;

		if ( inputLength > 0 ) {

			// get max length

			var outputLength = 0,
				components = builder.colorToVectorProperties( this.components );

			var i, len = components.length;

			for ( i = 0; i < len; i ++ ) {

				outputLength = Math.max( outputLength, builder.getIndexByElement( components.charAt( i ) ) );

			}

			if ( outputLength > inputLength ) outputLength = inputLength;

			// split

			node += '.';

			for ( i = 0; i < len; i ++ ) {

				var elm = components.charAt( i );
				var idx = builder.getIndexByElement( components.charAt( i ) );

				if ( idx > outputLength ) idx = outputLength;

				node += builder.getElementByIndex( idx );

			}

			return builder.format( node, this.getType( builder ), output );

		} else {

			// join

			return builder.format( node, type, output );

		}

	};

	SwitchNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		this.node = source.node;
		this.components = source.components;

	};

	SwitchNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.node = this.node.toJSON( meta ).uuid;
			data.components = this.components;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TimerNode( scale, scope, timeScale ) {

		FloatNode.call( this );

		this.scale = scale !== undefined ? scale : 1;
		this.scope = scope || TimerNode.GLOBAL;

		this.timeScale = timeScale !== undefined ? timeScale : this.scale !== 1;

	}

	TimerNode.GLOBAL = 'global';
	TimerNode.LOCAL = 'local';
	TimerNode.DELTA = 'delta';

	TimerNode.prototype = Object.create( FloatNode.prototype );
	TimerNode.prototype.constructor = TimerNode;
	TimerNode.prototype.nodeType = "Timer";

	TimerNode.prototype.isReadonly = function () {

		// never use TimerNode as readonly but aways as "uniform"

		return false;

	};

	TimerNode.prototype.isUnique = function () {

		// share TimerNode "uniform" input if is used on more time with others TimerNode

		return this.timeScale && ( this.scope === TimerNode.GLOBAL || this.scope === TimerNode.DELTA );

	};

	TimerNode.prototype.updateFrame = function ( frame ) {

		var scale = this.timeScale ? this.scale : 1;

		switch ( this.scope ) {

			case TimerNode.LOCAL:

				this.value += frame.delta * scale;

				break;

			case TimerNode.DELTA:

				this.value = frame.delta * scale;

				break;

			default:

				this.value = frame.time * scale;

		}

	};

	TimerNode.prototype.copy = function ( source ) {

		FloatNode.prototype.copy.call( this, source );

		this.scope = source.scope;
		this.scale = source.scale;

		this.timeScale = source.timeScale;

	};

	TimerNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.scope = this.scope;
			data.scale = this.scale;

			data.timeScale = this.timeScale;

		}

		return data;

	};

	NodeLib.addKeyword( 'time', function () {

		return new TimerNode();

	} );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function VelocityNode( target, params ) {

		Vector3Node.call( this );

		this.params = {};

		this.velocity = new THREE.Vector3();

		this.setTarget( target );
		this.setParams( params );

	}

	VelocityNode.prototype = Object.create( Vector3Node.prototype );
	VelocityNode.prototype.constructor = VelocityNode;
	VelocityNode.prototype.nodeType = "Velocity";

	VelocityNode.prototype.isReadonly = function ( builder ) {

		return false;

	};

	VelocityNode.prototype.setParams = function ( params ) {

		switch ( this.params.type ) {

			case "elastic":

				delete this.moment;

				delete this.speed;
				delete this.springVelocity;

				delete this.lastVelocity;

				break;

		}

		this.params = params || {};

		switch ( this.params.type ) {

			case "elastic":

				this.moment = new THREE.Vector3();

				this.speed = new THREE.Vector3();
				this.springVelocity = new THREE.Vector3();

				this.lastVelocity = new THREE.Vector3();

				break;

		}

	};

	VelocityNode.prototype.setTarget = function ( target ) {

		if ( this.target ) {

			delete this.position;
			delete this.oldPosition;

		}

		this.target = target;

		if ( target ) {

			this.position = target.getWorldPosition( this.position || new THREE.Vector3() );
			this.oldPosition = this.position.clone();

		}

	};

	VelocityNode.prototype.updateFrameVelocity = function ( frame ) {

		if ( this.target ) {

			this.position = this.target.getWorldPosition( this.position || new THREE.Vector3() );
			this.velocity.subVectors( this.position, this.oldPosition );
			this.oldPosition.copy( this.position );

		}

	};

	VelocityNode.prototype.updateFrame = function ( frame ) {

		this.updateFrameVelocity( frame );

		switch ( this.params.type ) {

			case "elastic":

				// convert to real scale: 0 at 1 values
				var deltaFps = frame.delta * ( this.params.fps || 60 );

				var spring = Math.pow( this.params.spring, deltaFps ),
					damping = Math.pow( this.params.damping, deltaFps );

				// fix relative frame-rate
				this.velocity.multiplyScalar( Math.exp( - this.params.damping * deltaFps ) );

				// elastic
				this.velocity.add( this.springVelocity );
				this.velocity.add( this.speed.multiplyScalar( damping ).multiplyScalar( 1 - spring ) );

				// speed
				this.speed.subVectors( this.velocity, this.lastVelocity );

				// spring velocity
				this.springVelocity.add( this.speed );
				this.springVelocity.multiplyScalar( spring );

				// moment
				this.moment.add( this.springVelocity );

				// damping
				this.moment.multiplyScalar( damping );

				this.lastVelocity.copy( this.velocity );
				this.value.copy( this.moment );

				break;

			default:

				this.value.copy( this.velocity );

		}

	};

	VelocityNode.prototype.copy = function ( source ) {

		Vector3Node.prototype.copy.call( this, source );

		if ( source.target ) object.setTarget( source.target );

		object.setParams( source.params );

	};

	VelocityNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			if ( this.target ) data.target = this.target.uuid;

			// clone params
			data.params = JSON.parse( JSON.stringify( this.params ) );

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function UVTransformNode( uv, position ) {

		ExpressionNode.call( this, "( uvTransform * vec3( uvNode, 1 ) ).xy", "vec2" );

		this.uv = uv || new UVNode();
		this.position = position || new Matrix3Node();

	}

	UVTransformNode.prototype = Object.create( ExpressionNode.prototype );
	UVTransformNode.prototype.constructor = UVTransformNode;
	UVTransformNode.prototype.nodeType = "UVTransform";

	UVTransformNode.prototype.generate = function ( builder, output ) {

		this.keywords[ "uvNode" ] = this.uv;
		this.keywords[ "uvTransform" ] = this.position;

		return ExpressionNode.prototype.generate.call( this, builder, output );

	};

	UVTransformNode.prototype.setUvTransform = function ( tx, ty, sx, sy, rotation, cx, cy ) {

		cx = cx !== undefined ? cx : .5;
		cy = cy !== undefined ? cy : .5;

		this.position.value.setUvTransform( tx, ty, sx, sy, rotation, cx, cy );

	};

	UVTransformNode.prototype.copy = function ( source ) {

		ExpressionNode.prototype.copy.call( this, source );

		this.uv = source.uv;
		this.position = source.position;

	};

	UVTransformNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.uv = this.uv.toJSON( meta ).uuid;
			data.position = this.position.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function BlurNode( value, uv, radius, size ) {

		TempNode.call( this, 'v4' );

		this.value = value;
		this.uv = uv || new UVNode();
		this.radius = new Vector2Node( 1, 1 );

		this.size = size;

		this.blurX = true;
		this.blurY = true;

		this.horizontal = new FloatNode( 1 / 64 );
		this.vertical = new FloatNode( 1 / 64 );

	}

	BlurNode.Nodes = ( function () {

		var blurX = new FunctionNode( [
			"vec4 blurX( sampler2D texture, vec2 uv, float s ) {",
			"	vec4 sum = vec4( 0.0 );",
			"	sum += texture2D( texture, vec2( uv.x - 4.0 * s, uv.y ) ) * 0.051;",
			"	sum += texture2D( texture, vec2( uv.x - 3.0 * s, uv.y ) ) * 0.0918;",
			"	sum += texture2D( texture, vec2( uv.x - 2.0 * s, uv.y ) ) * 0.12245;",
			"	sum += texture2D( texture, vec2( uv.x - 1.0 * s, uv.y ) ) * 0.1531;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y ) ) * 0.1633;",
			"	sum += texture2D( texture, vec2( uv.x + 1.0 * s, uv.y ) ) * 0.1531;",
			"	sum += texture2D( texture, vec2( uv.x + 2.0 * s, uv.y ) ) * 0.12245;",
			"	sum += texture2D( texture, vec2( uv.x + 3.0 * s, uv.y ) ) * 0.0918;",
			"	sum += texture2D( texture, vec2( uv.x + 4.0 * s, uv.y ) ) * 0.051;",
			"	return sum * .667;",
			"}"
		].join( "\n" ) );

		var blurY = new FunctionNode( [
			"vec4 blurY( sampler2D texture, vec2 uv, float s ) {",
			"	vec4 sum = vec4( 0.0 );",
			"	sum += texture2D( texture, vec2( uv.x, uv.y - 4.0 * s ) ) * 0.051;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y - 3.0 * s ) ) * 0.0918;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y - 2.0 * s ) ) * 0.12245;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y - 1.0 * s ) ) * 0.1531;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y ) ) * 0.1633;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y + 1.0 * s ) ) * 0.1531;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y + 2.0 * s ) ) * 0.12245;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y + 3.0 * s ) ) * 0.0918;",
			"	sum += texture2D( texture, vec2( uv.x, uv.y + 4.0 * s ) ) * 0.051;",
			"	return sum * .667;",
			"}"
		].join( "\n" ) );

		return {
			blurX: blurX,
			blurY: blurY
		};

	} )();


	BlurNode.prototype = Object.create( TempNode.prototype );
	BlurNode.prototype.constructor = BlurNode;
	BlurNode.prototype.nodeType = "Blur";

	BlurNode.prototype.updateFrame = function ( frame ) {

		if ( this.size ) {

			this.horizontal.value = this.radius.x / this.size.x;
			this.vertical.value = this.radius.y / this.size.y;

		} else if ( this.value.value && this.value.value.image ) {

			var image = this.value.value.image;

			this.horizontal.value = this.radius.x / image.width;
			this.vertical.value = this.radius.y / image.height;

		}

	};

	BlurNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			var blurCode = [], code;

			var blurX = builder.include( BlurNode.Nodes.blurX ),
				blurY = builder.include( BlurNode.Nodes.blurY );

			if ( this.blurX ) {

				blurCode.push( blurX + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' + this.uv.build( builder, 'v2' ) + ', ' + this.horizontal.build( builder, 'f' ) + ' )' );

			}

			if ( this.blurY ) {

				blurCode.push( blurY + '( ' + this.value.build( builder, 'sampler2D' ) + ', ' + this.uv.build( builder, 'v2' ) + ', ' + this.vertical.build( builder, 'f' ) + ' )' );

			}

			if ( blurCode.length == 2 ) code = '( ' + blurCode.join( ' + ' ) + ' / 2.0 )';
			else if ( blurCode.length ) code = '( ' + blurCode[ 0 ] + ' )';
			else code = 'vec4( 0.0 )';

			return builder.format( code, this.getType( builder ), output );

		} else {

			console.warn( "THREE.BlurNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	BlurNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.value = source.value;
		this.uv = source.uv;
		this.radius = source.radius;

		if ( source.size !== undefined ) this.size = new THREE.Vector2( source.size.x, source.size.y );

		this.blurX = source.blurX;
		this.blurY = source.blurY;

	};

	BlurNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;
			data.uv = this.uv.toJSON( meta ).uuid;
			data.radius = this.radius.toJSON( meta ).uuid;

			if ( this.size ) data.size = { x: this.size.x, y: this.size.y };

			data.blurX = this.blurX;
			data.blurY = this.blurY;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function LuminanceNode( rgb ) {

		TempNode.call( this, 'f' );

		this.rgb = rgb;

	}

	LuminanceNode.Nodes = ( function () {

		var LUMA = new ConstNode( "vec3 LUMA vec3( 0.2125, 0.7154, 0.0721 )" );

		var luminance = new FunctionNode( [
			// Algorithm from Chapter 10 of Graphics Shaders
			"float luminance( vec3 rgb ) {",

			"	return dot( rgb, LUMA );",

			"}"
		].join( "\n" ), [ LUMA ] );

		return {
			LUMA: LUMA,
			luminance: luminance
		};

	} )();

	LuminanceNode.prototype = Object.create( TempNode.prototype );
	LuminanceNode.prototype.constructor = LuminanceNode;
	LuminanceNode.prototype.nodeType = "Luminance";

	LuminanceNode.prototype.generate = function ( builder, output ) {

		var luminance = builder.include( LuminanceNode.Nodes.luminance );

		return builder.format( luminance + '( ' + this.rgb.build( builder, 'v3' ) + ' )', this.getType( builder ), output );

	};

	LuminanceNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.rgb = source.rgb;

	};

	LuminanceNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.rgb = this.rgb.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function ColorAdjustmentNode( rgb, adjustment, method ) {

		TempNode.call( this, 'v3' );

		this.rgb = rgb;
		this.adjustment = adjustment;

		this.method = method || ColorAdjustmentNode.SATURATION;

	}

	ColorAdjustmentNode.Nodes = ( function () {

		var hue = new FunctionNode( [
			"vec3 hue(vec3 rgb, float adjustment) {",

			"	const mat3 RGBtoYIQ = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);",
			"	const mat3 YIQtoRGB = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.107, 1.7046);",

			"	vec3 yiq = RGBtoYIQ * rgb;",

			"	float hue = atan(yiq.z, yiq.y) + adjustment;",
			"	float chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);",

			"	return YIQtoRGB * vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));",

			"}"
		].join( "\n" ) );

		var saturation = new FunctionNode( [
			// Algorithm from Chapter 16 of OpenGL Shading Language
			"vec3 saturation(vec3 rgb, float adjustment) {",

			"	vec3 intensity = vec3( luminance( rgb ) );",

			"	return mix( intensity, rgb, adjustment );",

			"}"
		].join( "\n" ), [ LuminanceNode.Nodes.luminance ] ); // include LuminanceNode function

		var vibrance = new FunctionNode( [
			// Shader by Evan Wallace adapted by @lo-th
			"vec3 vibrance(vec3 rgb, float adjustment) {",

			"	float average = (rgb.r + rgb.g + rgb.b) / 3.0;",

			"	float mx = max(rgb.r, max(rgb.g, rgb.b));",
			"	float amt = (mx - average) * (-3.0 * adjustment);",

			"	return mix(rgb.rgb, vec3(mx), amt);",

			"}"
		].join( "\n" ) );

		return {
			hue: hue,
			saturation: saturation,
			vibrance: vibrance
		};

	} )();

	ColorAdjustmentNode.SATURATION = 'saturation';
	ColorAdjustmentNode.HUE = 'hue';
	ColorAdjustmentNode.VIBRANCE = 'vibrance';
	ColorAdjustmentNode.BRIGHTNESS = 'brightness';
	ColorAdjustmentNode.CONTRAST = 'contrast';

	ColorAdjustmentNode.prototype = Object.create( TempNode.prototype );
	ColorAdjustmentNode.prototype.constructor = ColorAdjustmentNode;
	ColorAdjustmentNode.prototype.nodeType = "ColorAdjustment";

	ColorAdjustmentNode.prototype.generate = function ( builder, output ) {

		var rgb = this.rgb.build( builder, 'v3' ),
			adjustment = this.adjustment.build( builder, 'f' );

		switch ( this.method ) {

			case ColorAdjustmentNode.BRIGHTNESS:

				return builder.format( '( ' + rgb + ' + ' + adjustment + ' )', this.getType( builder ), output );

				break;

			case ColorAdjustmentNode.CONTRAST:

				return builder.format( '( ' + rgb + ' * ' + adjustment + ' )', this.getType( builder ), output );

				break;

		}

		var method = builder.include( ColorAdjustmentNode.Nodes[ this.method ] );

		return builder.format( method + '( ' + rgb + ', ' + adjustment + ' )', this.getType( builder ), output );

	};

	ColorAdjustmentNode.prototype.copy = function ( source ) {

		TempNode.prototype.copy.call( this, source );

		this.rgb = source.rgb;
		this.adjustment = source.adjustment;
		this.method = source.method;

	};

	ColorAdjustmentNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.rgb = this.rgb.toJSON( meta ).uuid;
			data.adjustment = this.adjustment.toJSON( meta ).uuid;
			data.method = this.method;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function SpriteNode() {

		Node.call( this );

		this.color = new ColorNode( 0xEEEEEE );
		this.spherical = true;

	}

	SpriteNode.prototype = Object.create( Node.prototype );
	SpriteNode.prototype.constructor = SpriteNode;
	SpriteNode.prototype.nodeType = "Sprite";

	SpriteNode.prototype.build = function ( builder ) {

		var output;

		builder.define( 'SPRITE' );

		builder.requires.lights = false;
		builder.requires.transparent = this.alpha !== undefined;

		if ( builder.isShader( 'vertex' ) ) {

			var position = this.position ? this.position.parseAndBuildCode( builder, 'v3', { cache: 'position' } ) : undefined;

			builder.mergeUniform( THREE.UniformsUtils.merge( [
				THREE.UniformsLib.fog
			] ) );

			builder.addParsCode( [
				"#include <fog_pars_vertex>",
				"#include <logdepthbuf_pars_vertex>",
				"#include <clipping_planes_pars_vertex>"
			].join( "\n" ) );

			output = [
				"#include <clipping_planes_fragment>",
				"#include <begin_vertex>"
			];

			if ( position ) {

				output.push(
					position.code,
					position.result ? "transformed = " + position.result + ";" : ''
				);

			}

			output.push(
				"#include <project_vertex>",
				"#include <fog_vertex>",

				'mat4 modelViewMtx = modelViewMatrix;',
				'mat4 modelMtx = modelMatrix;',

				// ignore position from modelMatrix (use vary position)
				'modelMtx[3][0] = 0.0;',
				'modelMtx[3][1] = 0.0;',
				'modelMtx[3][2] = 0.0;'
			);

			if ( ! this.spherical ) {

				output.push(
					'modelMtx[1][1] = 1.0;'
				);

			}

			output.push(
				// http://www.geeks3d.com/20140807/billboarding-vertex-shader-glsl/
				// First colunm.
				'modelViewMtx[0][0] = 1.0;',
				'modelViewMtx[0][1] = 0.0;',
				'modelViewMtx[0][2] = 0.0;'
			);

			if ( this.spherical ) {

				output.push(
					// Second colunm.
					'modelViewMtx[1][0] = 0.0;',
					'modelViewMtx[1][1] = 1.0;',
					'modelViewMtx[1][2] = 0.0;'
				);

			}

			output.push(
				// Thrid colunm.
				'modelViewMtx[2][0] = 0.0;',
				'modelViewMtx[2][1] = 0.0;',
				'modelViewMtx[2][2] = 1.0;',

				"gl_Position = projectionMatrix * modelViewMtx * modelMtx * vec4( transformed, 1.0 );",

				"#include <logdepthbuf_vertex>",
				"#include <clipping_planes_vertex>",
				"#include <fog_vertex>"
			);

		} else {

			builder.addParsCode( [
				"#include <fog_pars_fragment>",
				"#include <logdepthbuf_pars_fragment>",
				"#include <clipping_planes_pars_fragment>"
			].join( "\n" ) );

			builder.addCode( [
				"#include <clipping_planes_fragment>",
				"#include <logdepthbuf_fragment>"
			].join( "\n" ) );

			// parse all nodes to reuse generate codes

			if ( this.alpha ) this.alpha.parse( builder );

			this.color.parse( builder, { slot: 'color' } );

			// build code

			var alpha = this.alpha ? this.alpha.buildCode( builder, 'f' ) : undefined,
				color = this.color.buildCode( builder, 'c', { slot: 'color' } );

			if ( alpha ) {

				output = [
					alpha.code,
					'#ifdef ALPHATEST',

					'if ( ' + alpha.result + ' <= ALPHATEST ) discard;',

					'#endif',
					color.code,
					"gl_FragColor = vec4( " + color.result + ", " + alpha.result + " );"
				];

			} else {

				output = [
					color.code,
					"gl_FragColor = vec4( " + color.result + ", 1.0 );"
				];

			}

			output.push(
				"#include <tonemapping_fragment>",
				"#include <encodings_fragment>",
				"#include <fog_fragment>"
			);

		}

		return output.join( "\n" );

	};

	SpriteNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		// vertex

		if ( source.position ) this.position = source.position;

		// fragment

		this.color = source.color;

		if ( source.spherical !== undefined ) this.spherical = source.spherical;

		if ( source.alpha ) this.alpha = source.alpha;

	};

	SpriteNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			// vertex

			if ( this.position ) data.position = this.position.toJSON( meta ).uuid;

			// fragment

			data.color = this.color.toJSON( meta ).uuid;

			if ( this.spherical === false ) data.spherical = false;

			if ( this.alpha ) data.alpha = this.alpha.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function PhongNode() {

		Node.call( this );

		this.color = new ColorNode( 0xEEEEEE );
		this.specular = new ColorNode( 0x111111 );
		this.shininess = new FloatNode( 30 );

	}

	PhongNode.prototype = Object.create( Node.prototype );
	PhongNode.prototype.constructor = PhongNode;
	PhongNode.prototype.nodeType = "Phong";

	PhongNode.prototype.build = function ( builder ) {

		var code;

		builder.define( 'PHONG' );

		builder.requires.lights = true;

		if ( builder.isShader( 'vertex' ) ) {

			var position = this.position ? this.position.parseAndBuildCode( builder, 'v3', { cache: 'position' } ) : undefined;

			builder.mergeUniform( THREE.UniformsUtils.merge( [

				THREE.UniformsLib.fog,
				THREE.UniformsLib.lights

			] ) );

			builder.addParsCode( [
				"varying vec3 vViewPosition;",

				"#ifndef FLAT_SHADED",

				"	varying vec3 vNormal;",

				"#endif",

				//"#include <encodings_pars_fragment>", // encoding functions
				"#include <fog_pars_vertex>",
				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",
				"#include <shadowmap_pars_vertex>",
				"#include <logdepthbuf_pars_vertex>",
				"#include <clipping_planes_pars_vertex>"
			].join( "\n" ) );

			var output = [
				"#include <beginnormal_vertex>",
				"#include <morphnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",

				"#ifndef FLAT_SHADED", // normal computed with derivatives when FLAT_SHADED

				"	vNormal = normalize( transformedNormal );",

				"#endif",

				"#include <begin_vertex>"
			];

			if ( position ) {

				output.push(
					position.code,
					position.result ? "transformed = " + position.result + ";" : ''
				);

			}

			output.push(
				"	#include <morphtarget_vertex>",
				"	#include <skinning_vertex>",
				"	#include <project_vertex>",
				"	#include <fog_vertex>",
				"	#include <logdepthbuf_vertex>",
				"	#include <clipping_planes_vertex>",

				"	vViewPosition = - mvPosition.xyz;",

				"	#include <worldpos_vertex>",
				"	#include <shadowmap_vertex>",
				"	#include <fog_vertex>"
			);

			code = output.join( "\n" );

		} else {

			// parse all nodes to reuse generate codes

			this.color.parse( builder, { slot: 'color' } );
			this.specular.parse( builder );
			this.shininess.parse( builder );

			if ( this.alpha ) this.alpha.parse( builder );

			if ( this.normal ) this.normal.parse( builder );

			if ( this.light ) this.light.parse( builder, { cache: 'light' } );

			if ( this.ao ) this.ao.parse( builder );
			if ( this.ambient ) this.ambient.parse( builder );
			if ( this.shadow ) this.shadow.parse( builder );
			if ( this.emissive ) this.emissive.parse( builder, { slot: 'emissive' } );

			if ( this.environment ) this.environment.parse( builder, { slot: 'environment' } );
			if ( this.environmentAlpha && this.environment ) this.environmentAlpha.parse( builder );

			// build code

			var color = this.color.buildCode( builder, 'c', { slot: 'color' } );
			var specular = this.specular.buildCode( builder, 'c' );
			var shininess = this.shininess.buildCode( builder, 'f' );

			var alpha = this.alpha ? this.alpha.buildCode( builder, 'f' ) : undefined;

			var normal = this.normal ? this.normal.buildCode( builder, 'v3' ) : undefined;

			var light = this.light ? this.light.buildCode( builder, 'v3', { cache: 'light' } ) : undefined;

			var ao = this.ao ? this.ao.buildCode( builder, 'f' ) : undefined;
			var ambient = this.ambient ? this.ambient.buildCode( builder, 'c' ) : undefined;
			var shadow = this.shadow ? this.shadow.buildCode( builder, 'c' ) : undefined;
			var emissive = this.emissive ? this.emissive.buildCode( builder, 'c', { slot: 'emissive' } ) : undefined;

			var environment = this.environment ? this.environment.buildCode( builder, 'c', { slot: 'environment' } ) : undefined;
			var environmentAlpha = this.environmentAlpha && this.environment ? this.environmentAlpha.buildCode( builder, 'f' ) : undefined;

			builder.requires.transparent = alpha != undefined;

			builder.addParsCode( [
				"#include <fog_pars_fragment>",
				"#include <bsdfs>",
				"#include <lights_pars_begin>",
				"#include <lights_phong_pars_fragment>",
				"#include <shadowmap_pars_fragment>",
				"#include <logdepthbuf_pars_fragment>"
			].join( "\n" ) );

			var output = [
				// prevent undeclared normal
				"#include <normal_fragment_begin>",

				// prevent undeclared material
				"	BlinnPhongMaterial material;",

				color.code,
				"	vec3 diffuseColor = " + color.result + ";",
				"	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",

				"#include <logdepthbuf_fragment>",

				specular.code,
				"	vec3 specular = " + specular.result + ";",

				shininess.code,
				"	float shininess = max( 0.0001, " + shininess.result + " );",

				"	float specularStrength = 1.0;" // Ignored in MaterialNode ( replace to specular )
			];

			if ( alpha ) {

				output.push(
					alpha.code,
					'#ifdef ALPHATEST',

					'if ( ' + alpha.result + ' <= ALPHATEST ) discard;',

					'#endif'
				);

			}

			if ( normal ) {

				output.push(
					normal.code,
					'normal = ' + normal.result + ';'
				);

			}

			// optimization for now

			output.push( 'material.diffuseColor = ' + ( light ? 'vec3( 1.0 )' : 'diffuseColor' ) + ';' );

			output.push(
				// accumulation
				'material.specularColor = specular;',
				'material.specularShininess = shininess;',
				'material.specularStrength = specularStrength;',

				"#include <lights_fragment_begin>",
				"#include <lights_fragment_end>"
			);

			if ( light ) {

				output.push(
					light.code,
					"reflectedLight.directDiffuse = " + light.result + ";"
				);

				// apply color

				output.push(
					"reflectedLight.directDiffuse *= diffuseColor;",
					"reflectedLight.indirectDiffuse *= diffuseColor;"
				);

			}

			if ( ao ) {

				output.push(
					ao.code,
					"reflectedLight.indirectDiffuse *= " + ao.result + ";"
				);

			}

			if ( ambient ) {

				output.push(
					ambient.code,
					"reflectedLight.indirectDiffuse += " + ambient.result + ";"
				);

			}

			if ( shadow ) {

				output.push(
					shadow.code,
					"reflectedLight.directDiffuse *= " + shadow.result + ";",
					"reflectedLight.directSpecular *= " + shadow.result + ";"
				);

			}

			if ( emissive ) {

				output.push(
					emissive.code,
					"reflectedLight.directDiffuse += " + emissive.result + ";"
				);

			}

			output.push( "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular;" );

			if ( environment ) {

				output.push( environment.code );

				if ( environmentAlpha ) {

					output.push(
						environmentAlpha.code,
						"outgoingLight = mix( outgoingLight, " + environment.result + ", " + environmentAlpha.result + " );"
					);

				} else {

					output.push( "outgoingLight = " + environment.result + ";" );

				}

			}
			/*
			switch( builder.material.combine ) {

				case THREE.ENVMAP_BLENDING_MULTIPLY:

					//output.push( "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular;" );
					//outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

					break;


			}
		*/
			if ( alpha ) {

				output.push( "gl_FragColor = vec4( outgoingLight, " + alpha.result + " );" );

			} else {

				output.push( "gl_FragColor = vec4( outgoingLight, 1.0 );" );

			}

			output.push(
				"#include <premultiplied_alpha_fragment>",
				"#include <tonemapping_fragment>",
				"#include <encodings_fragment>",
				"#include <fog_fragment>"
			);

			code = output.join( "\n" );

		}

		return code;

	};

	PhongNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		// vertex

		if ( source.position ) this.position = source.position;

		// fragment

		this.color = source.color;
		this.specular = source.specular;
		this.shininess = source.shininess;

		if ( source.alpha ) this.alpha = source.alpha;

		if ( source.normal ) this.normal = source.normal;

		if ( source.light ) this.light = source.light;
		if ( source.shadow ) this.shadow = source.shadow;

		if ( source.ao ) this.ao = source.ao;

		if ( source.emissive ) this.emissive = source.emissive;
		if ( source.ambient ) this.ambient = source.ambient;

		if ( source.environment ) this.environment = source.environment;
		if ( source.environmentAlpha ) this.environmentAlpha = source.environmentAlpha;

	};

	PhongNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			// vertex

			if ( this.position ) data.position = this.position.toJSON( meta ).uuid;

			// fragment

			data.color = this.color.toJSON( meta ).uuid;
			data.specular = this.specular.toJSON( meta ).uuid;
			data.shininess = this.shininess.toJSON( meta ).uuid;

			if ( this.alpha ) data.alpha = this.alpha.toJSON( meta ).uuid;

			if ( this.normal ) data.normal = this.normal.toJSON( meta ).uuid;

			if ( this.light ) data.light = this.light.toJSON( meta ).uuid;

			if ( this.ao ) data.ao = this.ao.toJSON( meta ).uuid;
			if ( this.ambient ) data.ambient = this.ambient.toJSON( meta ).uuid;
			if ( this.shadow ) data.shadow = this.shadow.toJSON( meta ).uuid;
			if ( this.emissive ) data.emissive = this.emissive.toJSON( meta ).uuid;

			if ( this.environment ) data.environment = this.environment.toJSON( meta ).uuid;
			if ( this.environmentAlpha ) data.environmentAlpha = this.environmentAlpha.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function StandardNode() {

		Node.call( this );

		this.color = new ColorNode( 0xEEEEEE );
		this.roughness = new FloatNode( 0.5 );
		this.metalness = new FloatNode( 0.5 );

	}

	StandardNode.prototype = Object.create( Node.prototype );
	StandardNode.prototype.constructor = StandardNode;
	StandardNode.prototype.nodeType = "Standard";

	StandardNode.prototype.build = function ( builder ) {

		var code;

		builder.define( this.clearCoat || this.clearCoatRoughness ? 'PHYSICAL' : 'STANDARD' );

		builder.requires.lights = true;

		builder.extensions.shaderTextureLOD = true;

		if ( builder.isShader( 'vertex' ) ) {

			var position = this.position ? this.position.parseAndBuildCode( builder, 'v3', { cache: 'position' } ) : undefined;

			builder.mergeUniform( THREE.UniformsUtils.merge( [

				THREE.UniformsLib.fog,
				THREE.UniformsLib.lights

			] ) );

			builder.addParsCode( [
				"varying vec3 vViewPosition;",

				"#ifndef FLAT_SHADED",

				"	varying vec3 vNormal;",

				"#endif",

				//"#include <encodings_pars_fragment>", // encoding functions
				"#include <fog_pars_vertex>",
				"#include <morphtarget_pars_vertex>",
				"#include <skinning_pars_vertex>",
				"#include <shadowmap_pars_vertex>",
				"#include <logdepthbuf_pars_vertex>",
				"#include <clipping_planes_pars_vertex>"

			].join( "\n" ) );

			var output = [
				"#include <beginnormal_vertex>",
				"#include <morphnormal_vertex>",
				"#include <skinbase_vertex>",
				"#include <skinnormal_vertex>",
				"#include <defaultnormal_vertex>",

				"#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

				"	vNormal = normalize( transformedNormal );",

				"#endif",

				"#include <begin_vertex>"
			];

			if ( position ) {

				output.push(
					position.code,
					position.result ? "transformed = " + position.result + ";" : ''
				);

			}

			output.push(
				"#include <morphtarget_vertex>",
				"#include <skinning_vertex>",
				"#include <project_vertex>",
				"#include <fog_vertex>",
				"#include <logdepthbuf_vertex>",
				"#include <clipping_planes_vertex>",

				"	vViewPosition = - mvPosition.xyz;",

				"#include <worldpos_vertex>",
				"#include <shadowmap_vertex>"
			);

			code = output.join( "\n" );

		} else {

			var contextEnvironment = {
				bias: RoughnessToBlinnExponentNode,
				gamma: true
			};

			var contextGammaOnly = {
				gamma: true
			};

			var useClearCoat = ! builder.isDefined( 'STANDARD' );

			// parse all nodes to reuse generate codes

			this.color.parse( builder, { slot: 'color', context: contextGammaOnly } );
			this.roughness.parse( builder );
			this.metalness.parse( builder );

			if ( this.alpha ) this.alpha.parse( builder );

			if ( this.normal ) this.normal.parse( builder );

			if ( this.clearCoat ) this.clearCoat.parse( builder );
			if ( this.clearCoatRoughness ) this.clearCoatRoughness.parse( builder );

			if ( this.reflectivity ) this.reflectivity.parse( builder );

			if ( this.light ) this.light.parse( builder, { cache: 'light' } );

			if ( this.ao ) this.ao.parse( builder );
			if ( this.ambient ) this.ambient.parse( builder );
			if ( this.shadow ) this.shadow.parse( builder );
			if ( this.emissive ) this.emissive.parse( builder, { slot: 'emissive' } );

			if ( this.environment ) this.environment.parse( builder, { cache: 'env', context: contextEnvironment, slot: 'environment' } ); // isolate environment from others inputs ( see TextureNode, CubeTextureNode )

			// build code

			var color = this.color.buildCode( builder, 'c', { slot: 'color', context: contextGammaOnly } );
			var roughness = this.roughness.buildCode( builder, 'f' );
			var metalness = this.metalness.buildCode( builder, 'f' );

			var alpha = this.alpha ? this.alpha.buildCode( builder, 'f' ) : undefined;

			var normal = this.normal ? this.normal.buildCode( builder, 'v3' ) : undefined;

			var clearCoat = this.clearCoat ? this.clearCoat.buildCode( builder, 'f' ) : undefined;
			var clearCoatRoughness = this.clearCoatRoughness ? this.clearCoatRoughness.buildCode( builder, 'f' ) : undefined;

			var reflectivity = this.reflectivity ? this.reflectivity.buildCode( builder, 'f' ) : undefined;

			var light = this.light ? this.light.buildCode( builder, 'v3', { cache: 'light' } ) : undefined;

			var ao = this.ao ? this.ao.buildCode( builder, 'f' ) : undefined;
			var ambient = this.ambient ? this.ambient.buildCode( builder, 'c' ) : undefined;
			var shadow = this.shadow ? this.shadow.buildCode( builder, 'c' ) : undefined;
			var emissive = this.emissive ? this.emissive.buildCode( builder, 'c', { slot: 'emissive' } ) : undefined;

			var environment = this.environment ? this.environment.buildCode( builder, 'c', { cache: 'env', context: contextEnvironment, slot: 'environment' } ) : undefined;

			var clearCoatEnv = useClearCoat && environment ? this.environment.buildCode( builder, 'c', { cache: 'clearCoat', context: contextEnvironment, slot: 'environment' } ) : undefined;

			builder.requires.transparent = alpha !== undefined;

			builder.addParsCode( [

				"varying vec3 vViewPosition;",

				"#ifndef FLAT_SHADED",

				"	varying vec3 vNormal;",

				"#endif",

				"#include <dithering_pars_fragment>",
				"#include <fog_pars_fragment>",
				"#include <bsdfs>",
				"#include <lights_pars_begin>",
				"#include <lights_physical_pars_fragment>",
				"#include <shadowmap_pars_fragment>",
				"#include <logdepthbuf_pars_fragment>"
			].join( "\n" ) );

			var output = [
				"#include <clipping_planes_fragment>",

				// add before: prevent undeclared normal
				"	#include <normal_fragment_begin>",

				// add before: prevent undeclared material
				"	PhysicalMaterial material;",
				"	material.diffuseColor = vec3( 1.0 );",

				color.code,
				"	vec3 diffuseColor = " + color.result + ";",
				"	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",

				"#include <logdepthbuf_fragment>",

				roughness.code,
				"	float roughnessFactor = " + roughness.result + ";",

				metalness.code,
				"	float metalnessFactor = " + metalness.result + ";"
			];

			if ( alpha ) {

				output.push(
					alpha.code,
					'#ifdef ALPHATEST',

					'if ( ' + alpha.result + ' <= ALPHATEST ) discard;',

					'#endif'
				);

			}

			if ( normal ) {

				output.push(
					normal.code,
					'normal = ' + normal.result + ';'
				);

			}

			// optimization for now

			output.push(
				'material.diffuseColor = ' + ( light ? 'vec3( 1.0 )' : 'diffuseColor * (1.0 - metalnessFactor)' ) + ';',
				'material.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );'
			);

			if ( clearCoat ) {

				output.push(
					clearCoat.code,
					'material.clearCoat = saturate( ' + clearCoat.result + ' );'
				);

			} else if ( useClearCoat ) {

				output.push( 'material.clearCoat = 0.0;' );

			}

			if ( clearCoatRoughness ) {

				output.push(
					clearCoatRoughness.code,
					'material.clearCoatRoughness = clamp( ' + clearCoatRoughness.result + ', 0.04, 1.0 );'
				);

			} else if ( useClearCoat ) {

				output.push( 'material.clearCoatRoughness = 0.0;' );

			}

			if ( reflectivity ) {

				output.push(
					reflectivity.code,
					'material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( ' + reflectivity.result + ' ) ), diffuseColor, metalnessFactor );'
				);

			} else {

				output.push(
					'material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor, metalnessFactor );'
				);

			}

			output.push(
				"#include <lights_fragment_begin>"
			);

			if ( light ) {

				output.push(
					light.code,
					"reflectedLight.directDiffuse = " + light.result + ";"
				);

				// apply color

				output.push(
					"diffuseColor *= 1.0 - metalnessFactor;",

					"reflectedLight.directDiffuse *= diffuseColor;",
					"reflectedLight.indirectDiffuse *= diffuseColor;"
				);

			}

			if ( ao ) {

				output.push(
					ao.code,
					"reflectedLight.indirectDiffuse *= " + ao.result + ";",
					"float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );",
					"reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, " + ao.result + ", material.specularRoughness );"
				);

			}

			if ( ambient ) {

				output.push(
					ambient.code,
					"reflectedLight.indirectDiffuse += " + ambient.result + ";"
				);

			}

			if ( shadow ) {

				output.push(
					shadow.code,
					"reflectedLight.directDiffuse *= " + shadow.result + ";",
					"reflectedLight.directSpecular *= " + shadow.result + ";"
				);

			}

			if ( emissive ) {

				output.push(
					emissive.code,
					"reflectedLight.directDiffuse += " + emissive.result + ";"
				);

			}

			if ( environment ) {

				output.push( environment.code );

				if ( clearCoatEnv ) {

					output.push(
						clearCoatEnv.code,
						"clearCoatRadiance += " + clearCoatEnv.result + ";"
					);

				}

				output.push( "radiance += " + environment.result + ";" );

			}

			output.push(
				"#include <lights_fragment_end>"
			);

			output.push( "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular;" );

			if ( alpha ) {

				output.push( "gl_FragColor = vec4( outgoingLight, " + alpha.result + " );" );

			} else {

				output.push( "gl_FragColor = vec4( outgoingLight, 1.0 );" );

			}

			output.push(
				"#include <tonemapping_fragment>",
				"#include <encodings_fragment>",
				"#include <fog_fragment>",
				"#include <premultiplied_alpha_fragment>",
				"#include <dithering_fragment>"
			);

			code = output.join( "\n" );

		}

		return code;

	};

	StandardNode.prototype.copy = function ( source ) {

		Node.prototype.copy.call( this, source );

		// vertex

		if ( source.position ) this.position = source.position;

		// fragment

		this.color = source.color;
		this.roughness = source.roughness;
		this.metalness = source.metalness;

		if ( source.alpha ) this.alpha = source.alpha;

		if ( source.normal ) this.normal = source.normal;

		if ( source.clearCoat ) this.clearCoat = source.clearCoat;
		if ( source.clearCoatRoughness ) this.clearCoatRoughness = source.clearCoatRoughness;

		if ( source.reflectivity ) this.reflectivity = source.reflectivity;

		if ( source.light ) this.light = source.light;
		if ( source.shadow ) this.shadow = source.shadow;

		if ( source.ao ) this.ao = source.ao;

		if ( source.emissive ) this.emissive = source.emissive;
		if ( source.ambient ) this.ambient = source.ambient;

		if ( source.environment ) this.environment = source.environment;

	};

	StandardNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			// vertex

			if ( this.position ) data.position = this.position.toJSON( meta ).uuid;

			// fragment

			data.color = this.color.toJSON( meta ).uuid;
			data.roughness = this.roughness.toJSON( meta ).uuid;
			data.metalness = this.metalness.toJSON( meta ).uuid;

			if ( this.alpha ) data.alpha = this.alpha.toJSON( meta ).uuid;

			if ( this.normal ) data.normal = this.normal.toJSON( meta ).uuid;

			if ( this.clearCoat ) data.clearCoat = this.clearCoat.toJSON( meta ).uuid;
			if ( this.clearCoatRoughness ) data.clearCoatRoughness = this.clearCoatRoughness.toJSON( meta ).uuid;

			if ( this.reflectivity ) data.reflectivity = this.reflectivity.toJSON( meta ).uuid;

			if ( this.light ) data.light = this.light.toJSON( meta ).uuid;
			if ( this.shadow ) data.shadow = this.shadow.toJSON( meta ).uuid;

			if ( this.ao ) data.ao = this.ao.toJSON( meta ).uuid;

			if ( this.emissive ) data.emissive = this.emissive.toJSON( meta ).uuid;
			if ( this.ambient ) data.ambient = this.ambient.toJSON( meta ).uuid;

			if ( this.environment ) data.environment = this.environment.toJSON( meta ).uuid;

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function MeshStandardNode() {

		StandardNode.call( this );

		this.properties = {
			color: new THREE.Color( 0xffffff ),
			roughness: 0.5,
			metalness: 0.5,
			normalScale: new THREE.Vector2( 1, 1 )
		};

		this.inputs = {
			color: new PropertyNode( this.properties, 'color', 'c' ),
			roughness: new PropertyNode( this.properties, 'roughness', 'f' ),
			metalness: new PropertyNode( this.properties, 'metalness', 'f' ),
			normalScale: new PropertyNode( this.properties, 'normalScale', 'v2' )
		};

	}

	MeshStandardNode.prototype = Object.create( StandardNode.prototype );
	MeshStandardNode.prototype.constructor = MeshStandardNode;
	MeshStandardNode.prototype.nodeType = "MeshStandard";

	MeshStandardNode.prototype.build = function ( builder ) {

		var props = this.properties,
			inputs = this.inputs;

		if ( builder.isShader( 'fragment' ) ) {

			// slots
			// * color
			// * map

			var color = builder.findNode( props.color, inputs.color ),
				map = builder.resolve( props.map );

			this.color = map ? new OperatorNode( color, map, OperatorNode.MUL ) : color;

			// slots
			// * roughness
			// * roughnessMap

			var roughness = builder.findNode( props.roughness, inputs.roughness ),
				roughnessMap = builder.resolve( props.roughnessMap );

			this.roughness = roughnessMap ? new OperatorNode( roughness, new SwitchNode( roughnessMap, "g" ), OperatorNode.MUL ) : roughness;

			// slots
			// * metalness
			// * metalnessMap

			var metalness = builder.findNode( props.metalness, inputs.metalness ),
				metalnessMap = builder.resolve( props.metalnessMap );

			this.metalness = metalnessMap ? new OperatorNode( metalness, new SwitchNode( metalnessMap, "b" ), OperatorNode.MUL ) : metalness;

			// slots
			// * normalMap
			// * normalScale

			if ( props.normalMap ) {

				this.normal = new NormalMapNode( builder.resolve( props.normalMap ) );
				this.normal.scale = builder.findNode( props.normalScale, inputs.normalScale );

			} else {

				this.normal = undefined;

			}

			// slots
			// * envMap

			this.environment = builder.resolve( props.envMap );

		}

		// build code

		return StandardNode.prototype.build.call( this, builder );

	};

	MeshStandardNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			console.warn( ".toJSON not implemented in", this );

		}

		return data;

	};

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function SpriteNodeMaterial() {

		var node = new SpriteNode();

		NodeMaterial.call( this, node, node );

		this.type = "SpriteNodeMaterial";

	}

	SpriteNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
	SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

	NodeUtils.addShortcuts( SpriteNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'position',
		'spherical'
	] );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function PhongNodeMaterial() {

		var node = new PhongNode();

		NodeMaterial.call( this, node, node );

		this.type = "PhongNodeMaterial";

	}

	PhongNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
	PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

	NodeUtils.addShortcuts( PhongNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'specular',
		'shininess',
		'normal',
		'emissive',
		'ambient',
		'light',
		'shadow',
		'ao',
		'environment',
		'environmentAlpha',
		'position'
	] );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function StandardNodeMaterial() {

		var node = new StandardNode();

		NodeMaterial.call( this, node, node );

		this.type = "StandardNodeMaterial";

	}

	StandardNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
	StandardNodeMaterial.prototype.constructor = StandardNodeMaterial;

	NodeUtils.addShortcuts( StandardNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'roughness',
		'metalness',
		'reflectivity',
		'clearCoat',
		'clearCoatRoughness',
		'normal',
		'emissive',
		'ambient',
		'light',
		'shadow',
		'ao',
		'environment',
		'position'
	] );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function MeshStandardNodeMaterial() {

		var node = new MeshStandardNode();

		NodeMaterial.call( this, node, node );

		this.type = "MeshStandardNodeMaterial";

	}

	MeshStandardNodeMaterial.prototype = Object.create( NodeMaterial.prototype );
	MeshStandardNodeMaterial.prototype.constructor = MeshStandardNodeMaterial;

	NodeUtils.addShortcuts( MeshStandardNodeMaterial.prototype, 'properties', [
		"color",
		"roughness",
		"metalness",
		"map",
		"normalMap",
		"normalScale",
		"metalnessMap",
		"roughnessMap",
		"envMap"
	] );

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NodePostProcessing( renderer, renderTarget ) {

		if ( renderTarget === undefined ) {

			var parameters = {
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				stencilBuffer: false
			};

			var size = renderer.getDrawingBufferSize();
			renderTarget = new THREE.WebGLRenderTarget( size.width, size.height, parameters );

		}

		this.renderer = renderer;
		this.renderTarget = renderTarget;

		this.output = new ScreenNode();
		this.material = new NodeMaterial();

		this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add( this.quad );

		this.needsUpdate = true;

	}

	NodePostProcessing.prototype = {

		constructor: NodePostProcessing,

		render: function ( scene, camera, frame ) {

			if ( this.needsUpdate ) {

				this.material.dispose();

				this.material.fragment.value = this.output;
				this.material.build();

				if ( this.material.uniforms.renderTexture ) {

					this.material.uniforms.renderTexture.value = this.renderTarget.texture;

				}

				this.needsUpdate = false;

			}

			frame.setRenderer( this.renderer )
				.setRenderTexture( this.renderTarget.texture );

			this.renderer.render( scene, camera, this.renderTarget );

			frame.updateNode( this.material );

			this.renderer.render( this.scene, this.camera );

		},

		setSize: function ( width, height ) {

			this.renderTarget.setSize( width, height );

			this.renderer.setSize( width, height );

		},

		copy: function ( source ) {

			this.output = source.output;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( isRootObject ) {

				meta = {
					nodes: {}
				};

			}

			if ( meta && ! meta.post ) meta.post = {};

			if ( ! meta.post[ this.uuid ] ) {

				var data = {};

				data.uuid = this.uuid;
				data.type = "NodePostProcessing";

				meta.post[ this.uuid ] = data;

				if ( this.name !== "" ) data.name = this.name;

				if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

				data.output = this.output.toJSON( meta ).uuid;

			}

			meta.post = this.uuid;

			return meta;

		}

	};

	// TODO: all nodes
	//export { NodePass } from './postprocessing/NodePass.js';

	// core

	THREE.Node = Node;
	THREE.TempNode = TempNode;
	THREE.InputNode = InputNode$1;
	THREE.ConstNode = ConstNode;
	THREE.VarNode = VarNode;
	THREE.StructNode = StructNode;
	THREE.AttributeNode = AttributeNode;
	THREE.FunctionNode = FunctionNode;
	THREE.ExpressionNode = ExpressionNode;
	THREE.FunctionCallNode = FunctionCallNode;
	THREE.NodeLib = NodeLib;
	THREE.NodeUtils = NodeUtils;
	THREE.NodeFrame = NodeFrame;
	THREE.NodeUniform = NodeUniform;
	THREE.NodeBuilder = NodeBuilder;

	// inputs

	THREE.IntNode = IntNode;
	THREE.FloatNode = FloatNode;
	THREE.Vector2Node = Vector2Node;
	THREE.Vector3Node = Vector3Node;
	THREE.Vector4Node = Vector4Node;
	THREE.ColorNode = ColorNode;
	THREE.Matrix3Node = Matrix3Node;
	THREE.Matrix4Node = Matrix4Node;
	THREE.TextureNode = TextureNode;
	THREE.CubeTextureNode = CubeTextureNode;
	THREE.ScreenNode = ScreenNode;
	THREE.ReflectorNode = ReflectorNode;
	THREE.PropertyNode = PropertyNode;
	THREE.RTTNode = RTTNode;

	// accessors

	THREE.UVNode = UVNode;
	THREE.ColorsNode = ColorsNode;
	THREE.PositionNode = PositionNode;
	THREE.NormalNode = NormalNode$1;
	THREE.CameraNode = CameraNode;
	THREE.LightNode = LightNode;
	THREE.ReflectNode = ReflectNode;
	THREE.ScreenUVNode = ScreenUVNode;
	THREE.ResolutionNode = ResolutionNode;

	// math

	THREE.Math1Node = Math1Node;
	THREE.Math2Node = Math2Node;
	THREE.Math3Node = Math3Node;
	THREE.OperatorNode = OperatorNode;
	THREE.CondNode = CondNode;

	// procedural

	THREE.NoiseNode = NoiseNode;
	THREE.CheckerNode = CheckerNode;

	// bsdfs

	THREE.BlinnShininessExponentNode = BlinnShininessExponentNode;
	THREE.BlinnExponentToRoughnessNode = BlinnExponentToRoughnessNode;
	THREE.RoughnessToBlinnExponentNode = RoughnessToBlinnExponentNode;

	// misc

	THREE.TextureCubeUVNode = TextureCubeUVNode;
	THREE.TextureCubeNode = TextureCubeNode$1;
	THREE.NormalMapNode = NormalMapNode;
	THREE.BumpMapNode = BumpMapNode;

	// utils

	THREE.BypassNode = BypassNode;
	THREE.JoinNode = JoinNode;
	THREE.SwitchNode = SwitchNode;
	THREE.TimerNode = TimerNode;
	THREE.VelocityNode = VelocityNode;
	THREE.UVTransformNode = UVTransformNode;
	THREE.MaxMIPLevelNode = MaxMIPLevelNode;
	THREE.ColorSpaceNode = ColorSpaceNode;

	// effects

	THREE.BlurNode = BlurNode;
	THREE.ColorAdjustmentNode = ColorAdjustmentNode;
	THREE.LuminanceNode = LuminanceNode;

	// material nodes

	THREE.RawNode = RawNode;
	THREE.SpriteNode = SpriteNode;
	THREE.PhongNode = PhongNode;
	THREE.StandardNode = StandardNode;
	THREE.MeshStandardNode = MeshStandardNode;

	// materials

	THREE.NodeMaterial = NodeMaterial;
	THREE.SpriteNodeMaterial = SpriteNodeMaterial;
	THREE.PhongNodeMaterial = PhongNodeMaterial;
	THREE.StandardNodeMaterial = StandardNodeMaterial;
	THREE.MeshStandardNodeMaterial = MeshStandardNodeMaterial;

	// post-processing

	THREE.NodePostProcessing = NodePostProcessing;

})));
