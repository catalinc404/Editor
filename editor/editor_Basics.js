////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Epsilon = 0.001;

var AxisX = new THREE.Vector3( 1, 0, 0 );
var AxisY = new THREE.Vector3( 0, 1, 0 );
var AxisZ = new THREE.Vector3( 0, 0, 1 );
var Zero  = new THREE.Vector3( 0, 0, 0 );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EView       = { TL: 0, TR: 1, BL: 2, BR: 3  };
var EViewMode   = { TL_TR_BL_BR: 0, TL_TR_BL: 1, TL_BL_BR: 2, TL_TR: 3, TL_BL_BR: 4, TL_BL: 5, TL: 6, TR: 7, BL: 8, BR: 9  };