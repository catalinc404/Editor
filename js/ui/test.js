'use strict';
var Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: function() {
        try {
            var a = document.createElement("canvas");
            return !(!window.WebGLRenderingContext || !a.getContext("webgl") && !a.getContext("experimental-webgl"))
        } catch (b) {
            return !1
        }
    }(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var a = document.createElement("div");
        a.id = "webgl-error-message";
        a.style.fontFamily = "monospace";
        a.style.fontSize = "13px";
        a.style.fontWeight = "normal";
        a.style.textAlign = "center";
        a.style.background = "#fff";
        a.style.color = "#000";
        a.style.padding = "1.5em";
        a.style.width = "400px";
        a.style.margin = "5em auto 0";
        this.webgl || (a.innerHTML = window.WebGLRenderingContext ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.' : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.');
        return a
    },
    addGetWebGLMessage: function(a) {
        var b, c;
        a = a || {};
        b = void 0 !== a.parent ? a.parent : document.body;
        a = void 0 !== a.id ? a.id : "oldie";
        c = Detector.getWebGLErrorMessage();
        c.id = a;
        b.appendChild(c)
    }
};
"object" === typeof module && (module.exports = Detector);
var THREE = {
    REVISION: "74dev"
};
"function" === typeof define && define.amd ? define("three", THREE) : "undefined" !== typeof exports && "undefined" !== typeof module && (module.exports = THREE);
void 0 !== self.requestAnimationFrame && void 0 !== self.cancelAnimationFrame || function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !self.requestAnimationFrame; ++c)
        self.requestAnimationFrame = self[b[c] + "RequestAnimationFrame"],
        self.cancelAnimationFrame = self[b[c] + "CancelAnimationFrame"] || self[b[c] + "CancelRequestAnimationFrame"];
    void 0 === self.requestAnimationFrame && void 0 !== self.setTimeout && (self.requestAnimationFrame = function(b) {
        var c = Date.now()
          , f = Math.max(0, 16 - (c - a))
          , g = self.setTimeout(function() {
            b(c + f)
        }, f);
        a = c + f;
        return g
    }
    );
    void 0 === self.cancelAnimationFrame && void 0 !== self.clearTimeout && (self.cancelAnimationFrame = function(a) {
        self.clearTimeout(a)
    }
    )
}();
void 0 === self.performance && (self.performance = {});
void 0 === self.performance.now && function() {
    var a = Date.now();
    self.performance.now = function() {
        return Date.now() - a
    }
}();
void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52));
void 0 === Math.sign && (Math.sign = function(a) {
    return 0 > a ? -1 : 0 < a ? 1 : +a
}
);
void 0 === Function.prototype.name && void 0 !== Object.defineProperty && Object.defineProperty(Function.prototype, "name", {
    get: function() {
        return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
    }
});
void 0 === Object.assign && Object.defineProperty(Object, "assign", {
    writable: !0,
    configurable: !0,
    value: function(a) {
        if (void 0 === a || null === a)
            throw new TypeError("Cannot convert first argument to object");
        for (var b = Object(a), c = 1, d = arguments.length; c !== d; ++c) {
            var e = arguments[c];
            if (void 0 !== e && null !== e)
                for (var e = Object(e), f = Object.keys(e), g = 0, h = f.length; g !== h; ++g) {
                    var k = f[g]
                      , l = Object.getOwnPropertyDescriptor(e, k);
                    void 0 !== l && l.enumerable && (b[k] = e[k])
                }
        }
        return b
    }
});
THREE.MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.MinEquation = 103;
THREE.MaxEquation = 104;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.NeverDepth = 0;
THREE.AlwaysDepth = 1;
THREE.LessDepth = 2;
THREE.LessEqualDepth = 3;
THREE.EqualDepth = 4;
THREE.GreaterEqualDepth = 5;
THREE.GreaterDepth = 6;
THREE.NotEqualDepth = 7;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = 300;
THREE.CubeReflectionMapping = 301;
THREE.CubeRefractionMapping = 302;
THREE.EquirectangularReflectionMapping = 303;
THREE.EquirectangularRefractionMapping = 304;
THREE.SphericalReflectionMapping = 305;
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.HalfFloatType = 1025;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGBEFormat = THREE.RGBAFormat;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
THREE.LoopOnce = 2200;
THREE.LoopRepeat = 2201;
THREE.LoopPingPong = 2202;
THREE.InterpolateDiscrete = 2300;
THREE.InterpolateLinear = 2301;
THREE.InterpolateSmooth = 2302;
THREE.ZeroCurvatureEnding = 2400;
THREE.ZeroSlopeEnding = 2401;
THREE.WrapAroundEnding = 2402;
THREE.TrianglesDrawMode = 0;
THREE.TriangleStripDrawMode = 1;
THREE.TriangleFanDrawMode = 2;
THREE.Color = function(a) {
    return 3 === arguments.length ? this.fromArray(arguments) : this.set(a)
}
;
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    set: function(a) {
        a instanceof THREE.Color ? this.copy(a) : "number" === typeof a ? this.setHex(a) : "string" === typeof a && this.setStyle(a);
        return this
    },
    setHex: function(a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    setRGB: function(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this
    },
    setHSL: function() {
        function a(a, c, d) {
            0 > d && (d += 1);
            1 < d && --d;
            return d < 1 / 6 ? a + 6 * (c - a) * d : .5 > d ? c : d < 2 / 3 ? a + 6 * (c - a) * (2 / 3 - d) : a
        }
        return function(b, c, d) {
            b = THREE.Math.euclideanModulo(b, 1);
            c = THREE.Math.clamp(c, 0, 1);
            d = THREE.Math.clamp(d, 0, 1);
            0 === c ? this.r = this.g = this.b = d : (c = .5 >= d ? d * (1 + c) : d + c - d * c,
            d = 2 * d - c,
            this.r = a(d, c, b + 1 / 3),
            this.g = a(d, c, b),
            this.b = a(d, c, b - 1 / 3));
            return this
        }
    }(),
    setStyle: function(a) {
        function b(b) {
            void 0 !== b && 1 > parseFloat(b) && console.warn("THREE.Color: Alpha component of " + a + " will be ignored.")
        }
        var c;
        if (c = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)) {
            var d = c[2];
            switch (c[1]) {
            case "rgb":
            case "rgba":
                if (c = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))
                    return this.r = Math.min(255, parseInt(c[1], 10)) / 255,
                    this.g = Math.min(255, parseInt(c[2], 10)) / 255,
                    this.b = Math.min(255, parseInt(c[3], 10)) / 255,
                    b(c[5]),
                    this;
                if (c = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))
                    return this.r = Math.min(100, parseInt(c[1], 10)) / 100,
                    this.g = Math.min(100, parseInt(c[2], 10)) / 100,
                    this.b = Math.min(100, parseInt(c[3], 10)) / 100,
                    b(c[5]),
                    this;
                break;
            case "hsl":
            case "hsla":
                if (c = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) {
                    var d = parseFloat(c[1]) / 360
                      , e = parseInt(c[2], 10) / 100
                      , f = parseInt(c[3], 10) / 100;
                    b(c[5]);
                    return this.setHSL(d, e, f)
                }
            }
        } else if (c = /^\#([A-Fa-f0-9]+)$/.exec(a)) {
            c = c[1];
            d = c.length;
            if (3 === d)
                return this.r = parseInt(c.charAt(0) + c.charAt(0), 16) / 255,
                this.g = parseInt(c.charAt(1) + c.charAt(1), 16) / 255,
                this.b = parseInt(c.charAt(2) + c.charAt(2), 16) / 255,
                this;
            if (6 === d)
                return this.r = parseInt(c.charAt(0) + c.charAt(1), 16) / 255,
                this.g = parseInt(c.charAt(2) + c.charAt(3), 16) / 255,
                this.b = parseInt(c.charAt(4) + c.charAt(5), 16) / 255,
                this
        }
        a && 0 < a.length && (c = THREE.ColorKeywords[a],
        void 0 !== c ? this.setHex(c) : console.warn("THREE.Color: Unknown color " + a));
        return this
    },
    clone: function() {
        return new this.constructor(this.r,this.g,this.b)
    },
    copy: function(a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function(a, b) {
        void 0 === b && (b = 2);
        this.r = Math.pow(a.r, b);
        this.g = Math.pow(a.g, b);
        this.b = Math.pow(a.b, b);
        return this
    },
    copyLinearToGamma: function(a, b) {
        void 0 === b && (b = 2);
        var c = 0 < b ? 1 / b : 1;
        this.r = Math.pow(a.r, c);
        this.g = Math.pow(a.g, c);
        this.b = Math.pow(a.b, c);
        return this
    },
    convertGammaToLinear: function() {
        var a = this.r
          , b = this.g
          , c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this
    },
    convertLinearToGamma: function() {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this
    },
    getHex: function() {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function() {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function(a) {
        a = a || {
            h: 0,
            s: 0,
            l: 0
        };
        var b = this.r, c = this.g, d = this.b, e = Math.max(b, c, d), f = Math.min(b, c, d), g, h = (f + e) / 2;
        if (f === e)
            f = g = 0;
        else {
            var k = e - f
              , f = .5 >= h ? k / (e + f) : k / (2 - e - f);
            switch (e) {
            case b:
                g = (c - d) / k + (c < d ? 6 : 0);
                break;
            case c:
                g = (d - b) / k + 2;
                break;
            case d:
                g = (b - c) / k + 4
            }
            g /= 6
        }
        a.h = g;
        a.s = f;
        a.l = h;
        return a
    },
    getStyle: function() {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
    },
    offsetHSL: function(a, b, c) {
        var d = this.getHSL();
        d.h += a;
        d.s += b;
        d.l += c;
        this.setHSL(d.h, d.s, d.l);
        return this
    },
    add: function(a) {
        this.r += a.r;
        this.g += a.g;
        this.b += a.b;
        return this
    },
    addColors: function(a, b) {
        this.r = a.r + b.r;
        this.g = a.g + b.g;
        this.b = a.b + b.b;
        return this
    },
    addScalar: function(a) {
        this.r += a;
        this.g += a;
        this.b += a;
        return this
    },
    multiply: function(a) {
        this.r *= a.r;
        this.g *= a.g;
        this.b *= a.b;
        return this
    },
    multiplyScalar: function(a) {
        this.r *= a;
        this.g *= a;
        this.b *= a;
        return this
    },
    lerp: function(a, b) {
        this.r += (a.r - this.r) * b;
        this.g += (a.g - this.g) * b;
        this.b += (a.b - this.b) * b;
        return this
    },
    equals: function(a) {
        return a.r === this.r && a.g === this.g && a.b === this.b
    },
    fromArray: function(a, b) {
        void 0 === b && (b = 0);
        this.r = a[b];
        this.g = a[b + 1];
        this.b = a[b + 2];
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this.r;
        a[b + 1] = this.g;
        a[b + 2] = this.b;
        return a
    }
};
THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
THREE.Quaternion = function(a, b, c, d) {
    this._x = a || 0;
    this._y = b || 0;
    this._z = c || 0;
    this._w = void 0 !== d ? d : 1
}
;
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    get x() {
        return this._x
    },
    set x(a) {
        this._x = a;
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(a) {
        this._y = a;
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(a) {
        this._z = a;
        this.onChangeCallback()
    },
    get w() {
        return this._w
    },
    set w(a) {
        this._w = a;
        this.onChangeCallback()
    },
    set: function(a, b, c, d) {
        this._x = a;
        this._y = b;
        this._z = c;
        this._w = d;
        this.onChangeCallback();
        return this
    },
    clone: function() {
        return new this.constructor(this._x,this._y,this._z,this._w)
    },
    copy: function(a) {
        this._x = a.x;
        this._y = a.y;
        this._z = a.z;
        this._w = a.w;
        this.onChangeCallback();
        return this
    },
    setFromEuler: function(a, b) {
        if (!1 === a instanceof THREE.Euler)
            throw Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var c = Math.cos(a._x / 2)
          , d = Math.cos(a._y / 2)
          , e = Math.cos(a._z / 2)
          , f = Math.sin(a._x / 2)
          , g = Math.sin(a._y / 2)
          , h = Math.sin(a._z / 2)
          , k = a.order;
        "XYZ" === k ? (this._x = f * d * e + c * g * h,
        this._y = c * g * e - f * d * h,
        this._z = c * d * h + f * g * e,
        this._w = c * d * e - f * g * h) : "YXZ" === k ? (this._x = f * d * e + c * g * h,
        this._y = c * g * e - f * d * h,
        this._z = c * d * h - f * g * e,
        this._w = c * d * e + f * g * h) : "ZXY" === k ? (this._x = f * d * e - c * g * h,
        this._y = c * g * e + f * d * h,
        this._z = c * d * h + f * g * e,
        this._w = c * d * e - f * g * h) : "ZYX" === k ? (this._x = f * d * e - c * g * h,
        this._y = c * g * e + f * d * h,
        this._z = c * d * h - f * g * e,
        this._w = c * d * e + f * g * h) : "YZX" === k ? (this._x = f * d * e + c * g * h,
        this._y = c * g * e + f * d * h,
        this._z = c * d * h - f * g * e,
        this._w = c * d * e - f * g * h) : "XZY" === k && (this._x = f * d * e - c * g * h,
        this._y = c * g * e - f * d * h,
        this._z = c * d * h + f * g * e,
        this._w = c * d * e + f * g * h);
        if (!1 !== b)
            this.onChangeCallback();
        return this
    },
    setFromAxisAngle: function(a, b) {
        var c = b / 2
          , d = Math.sin(c);
        this._x = a.x * d;
        this._y = a.y * d;
        this._z = a.z * d;
        this._w = Math.cos(c);
        this.onChangeCallback();
        return this
    },
    setFromRotationMatrix: function(a) {
        var b = a.elements
          , c = b[0];
        a = b[4];
        var d = b[8]
          , e = b[1]
          , f = b[5]
          , g = b[9]
          , h = b[2]
          , k = b[6]
          , b = b[10]
          , l = c + f + b;
        0 < l ? (c = .5 / Math.sqrt(l + 1),
        this._w = .25 / c,
        this._x = (k - g) * c,
        this._y = (d - h) * c,
        this._z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b),
        this._w = (k - g) / c,
        this._x = .25 * c,
        this._y = (a + e) / c,
        this._z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b),
        this._w = (d - h) / c,
        this._x = (a + e) / c,
        this._y = .25 * c,
        this._z = (g + k) / c) : (c = 2 * Math.sqrt(1 + b - c - f),
        this._w = (e - a) / c,
        this._x = (d + h) / c,
        this._y = (g + k) / c,
        this._z = .25 * c);
        this.onChangeCallback();
        return this
    },
    setFromUnitVectors: function() {
        var a, b;
        return function(c, d) {
            void 0 === a && (a = new THREE.Vector3);
            b = c.dot(d) + 1;
            1E-6 > b ? (b = 0,
            Math.abs(c.x) > Math.abs(c.z) ? a.set(-c.y, c.x, 0) : a.set(0, -c.z, c.y)) : a.crossVectors(c, d);
            this._x = a.x;
            this._y = a.y;
            this._z = a.z;
            this._w = b;
            this.normalize();
            return this
        }
    }(),
    inverse: function() {
        this.conjugate().normalize();
        return this
    },
    conjugate: function() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this.onChangeCallback();
        return this
    },
    dot: function(a) {
        return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w
    },
    lengthSq: function() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    },
    length: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    },
    normalize: function() {
        var a = this.length();
        0 === a ? (this._z = this._y = this._x = 0,
        this._w = 1) : (a = 1 / a,
        this._x *= a,
        this._y *= a,
        this._z *= a,
        this._w *= a);
        this.onChangeCallback();
        return this
    },
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
        this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
    },
    multiplyQuaternions: function(a, b) {
        var c = a._x
          , d = a._y
          , e = a._z
          , f = a._w
          , g = b._x
          , h = b._y
          , k = b._z
          , l = b._w;
        this._x = c * l + f * g + d * k - e * h;
        this._y = d * l + f * h + e * g - c * k;
        this._z = e * l + f * k + c * h - d * g;
        this._w = f * l - c * g - d * h - e * k;
        this.onChangeCallback();
        return this
    },
    slerp: function(a, b) {
        if (0 === b)
            return this;
        if (1 === b)
            return this.copy(a);
        var c = this._x
          , d = this._y
          , e = this._z
          , f = this._w
          , g = f * a._w + c * a._x + d * a._y + e * a._z;
        0 > g ? (this._w = -a._w,
        this._x = -a._x,
        this._y = -a._y,
        this._z = -a._z,
        g = -g) : this.copy(a);
        if (1 <= g)
            return this._w = f,
            this._x = c,
            this._y = d,
            this._z = e,
            this;
        var h = Math.sqrt(1 - g * g);
        if (.001 > Math.abs(h))
            return this._w = .5 * (f + this._w),
            this._x = .5 * (c + this._x),
            this._y = .5 * (d + this._y),
            this._z = .5 * (e + this._z),
            this;
        var k = Math.atan2(h, g)
          , g = Math.sin((1 - b) * k) / h
          , h = Math.sin(b * k) / h;
        this._w = f * g + this._w * h;
        this._x = c * g + this._x * h;
        this._y = d * g + this._y * h;
        this._z = e * g + this._z * h;
        this.onChangeCallback();
        return this
    },
    equals: function(a) {
        return a._x === this._x && a._y === this._y && a._z === this._z && a._w === this._w
    },
    fromArray: function(a, b) {
        void 0 === b && (b = 0);
        this._x = a[b];
        this._y = a[b + 1];
        this._z = a[b + 2];
        this._w = a[b + 3];
        this.onChangeCallback();
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this._x;
        a[b + 1] = this._y;
        a[b + 2] = this._z;
        a[b + 3] = this._w;
        return a
    },
    onChange: function(a) {
        this.onChangeCallback = a;
        return this
    },
    onChangeCallback: function() {}
};
Object.assign(THREE.Quaternion, {
    slerp: function(a, b, c, d) {
        return c.copy(a).slerp(b, d)
    },
    slerpFlat: function(a, b, c, d, e, f, g) {
        var h = c[d]
          , k = c[d + 1]
          , l = c[d + 2];
        c = c[d + 3];
        d = e[f];
        var m = e[f + 1]
          , p = e[f + 2];
        e = e[f + 3];
        if (c !== e || h !== d || k !== m || l !== p) {
            f = 1 - g;
            var n = h * d + k * m + l * p + c * e
              , q = 0 <= n ? 1 : -1
              , u = 1 - n * n;
            u > Number.EPSILON && (u = Math.sqrt(u),
            n = Math.atan2(u, n * q),
            f = Math.sin(f * n) / u,
            g = Math.sin(g * n) / u);
            q *= g;
            h = h * f + d * q;
            k = k * f + m * q;
            l = l * f + p * q;
            c = c * f + e * q;
            f === 1 - g && (g = 1 / Math.sqrt(h * h + k * k + l * l + c * c),
            h *= g,
            k *= g,
            l *= g,
            c *= g)
        }
        a[b] = h;
        a[b + 1] = k;
        a[b + 2] = l;
        a[b + 3] = c
    }
});
THREE.Vector2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
}
;
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    get width() {
        return this.x
    },
    set width(a) {
        this.x = a
    },
    get height() {
        return this.y
    },
    set height(a) {
        this.y = a
    },
    set: function(a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y)
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
            this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this
    },
    addScaledVector: function(a, b) {
        this.x += a.x * b;
        this.y += a.y * b;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
            this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    subScalar: function(a) {
        this.x -= a;
        this.y -= a;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this
    },
    multiply: function(a) {
        this.x *= a.x;
        this.y *= a.y;
        return this
    },
    multiplyScalar: function(a) {
        isFinite(a) ? (this.x *= a,
        this.y *= a) : this.y = this.x = 0;
        return this
    },
    divide: function(a) {
        this.x /= a.x;
        this.y /= a.y;
        return this
    },
    divideScalar: function(a) {
        return this.multiplyScalar(1 / a)
    },
    min: function(a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        return this
    },
    max: function(a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        return this
    },
    clamp: function(a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        return this
    },
    clampScalar: function() {
        var a, b;
        return function(c, d) {
            void 0 === a && (a = new THREE.Vector2,
            b = new THREE.Vector2);
            a.set(c, c);
            b.set(d, d);
            return this.clamp(a, b)
        }
    }(),
    clampLength: function(a, b) {
        var c = this.length();
        this.multiplyScalar(Math.max(a, Math.min(b, c)) / c);
        return this
    },
    floor: function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    },
    ceil: function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    },
    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    },
    roundToZero: function() {
        this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
        return this
    },
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x;
        a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function(a) {
        return this.multiplyScalar(a / this.length())
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        return this
    },
    lerpVectors: function(a, b, c) {
        this.subVectors(b, a).multiplyScalar(c).add(a);
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y
    },
    fromArray: function(a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this.x;
        a[b + 1] = this.y;
        return a
    },
    fromAttribute: function(a, b, c) {
        void 0 === c && (c = 0);
        b = b * a.itemSize + c;
        this.x = a.array[b];
        this.y = a.array[b + 1];
        return this
    },
    rotateAround: function(a, b) {
        var c = Math.cos(b)
          , d = Math.sin(b)
          , e = this.x - a.x
          , f = this.y - a.y;
        this.x = e * c - f * d + a.x;
        this.y = e * d + f * c + a.y;
        return this
    }
};
THREE.Vector3 = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
}
;
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y,this.z)
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
            this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
    },
    addScaledVector: function(a, b) {
        this.x += a.x * b;
        this.y += a.y * b;
        this.z += a.z * b;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
            this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
    subScalar: function(a) {
        this.x -= a;
        this.y -= a;
        this.z -= a;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
    },
    multiply: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
            this.multiplyVectors(a, b);
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    },
    multiplyScalar: function(a) {
        isFinite(a) ? (this.x *= a,
        this.y *= a,
        this.z *= a) : this.z = this.y = this.x = 0;
        return this
    },
    multiplyVectors: function(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    applyEuler: function() {
        var a;
        return function(b) {
            !1 === b instanceof THREE.Euler && console.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.");
            void 0 === a && (a = new THREE.Quaternion);
            this.applyQuaternion(a.setFromEuler(b));
            return this
        }
    }(),
    applyAxisAngle: function() {
        var a;
        return function(b, c) {
            void 0 === a && (a = new THREE.Quaternion);
            this.applyQuaternion(a.setFromAxisAngle(b, c));
            return this
        }
    }(),
    applyMatrix3: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z;
        a = a.elements;
        this.x = a[0] * b + a[3] * c + a[6] * d;
        this.y = a[1] * b + a[4] * c + a[7] * d;
        this.z = a[2] * b + a[5] * c + a[8] * d;
        return this
    },
    applyMatrix4: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z;
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
        return this
    },
    applyProjection: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z;
        a = a.elements;
        var e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
        this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
        this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
        this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
        return this
    },
    applyQuaternion: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z
          , e = a.x
          , f = a.y
          , g = a.z;
        a = a.w;
        var h = a * b + f * d - g * c
          , k = a * c + g * b - e * d
          , l = a * d + e * c - f * b
          , b = -e * b - f * c - g * d;
        this.x = h * a + b * -e + k * -g - l * -f;
        this.y = k * a + b * -f + l * -e - h * -g;
        this.z = l * a + b * -g + h * -f - k * -e;
        return this
    },
    project: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.multiplyMatrices(b.projectionMatrix, a.getInverse(b.matrixWorld));
            return this.applyProjection(a)
        }
    }(),
    unproject: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.multiplyMatrices(b.matrixWorld, a.getInverse(b.projectionMatrix));
            return this.applyProjection(a)
        }
    }(),
    transformDirection: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z;
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d;
        this.y = a[1] * b + a[5] * c + a[9] * d;
        this.z = a[2] * b + a[6] * c + a[10] * d;
        this.normalize();
        return this
    },
    divide: function(a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    },
    divideScalar: function(a) {
        return this.multiplyScalar(1 / a)
    },
    min: function(a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        this.z = Math.min(this.z, a.z);
        return this
    },
    max: function(a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        this.z = Math.max(this.z, a.z);
        return this
    },
    clamp: function(a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        this.z = Math.max(a.z, Math.min(b.z, this.z));
        return this
    },
    clampScalar: function() {
        var a, b;
        return function(c, d) {
            void 0 === a && (a = new THREE.Vector3,
            b = new THREE.Vector3);
            a.set(c, c, c);
            b.set(d, d, d);
            return this.clamp(a, b)
        }
    }(),
    clampLength: function(a, b) {
        var c = this.length();
        this.multiplyScalar(Math.max(a, Math.min(b, c)) / c);
        return this
    },
    floor: function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this
    },
    ceil: function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this
    },
    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this
    },
    roundToZero: function() {
        this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
        return this
    },
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.multiplyScalar(a / this.length())
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        return this
    },
    lerpVectors: function(a, b, c) {
        this.subVectors(b, a).multiplyScalar(c).add(a);
        return this
    },
    cross: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
            this.crossVectors(a, b);
        var c = this.x
          , d = this.y
          , e = this.z;
        this.x = d * a.z - e * a.y;
        this.y = e * a.x - c * a.z;
        this.z = c * a.y - d * a.x;
        return this
    },
    crossVectors: function(a, b) {
        var c = a.x
          , d = a.y
          , e = a.z
          , f = b.x
          , g = b.y
          , h = b.z;
        this.x = d * h - e * g;
        this.y = e * f - c * h;
        this.z = c * g - d * f;
        return this
    },
    projectOnVector: function() {
        var a, b;
        return function(c) {
            void 0 === a && (a = new THREE.Vector3);
            a.copy(c).normalize();
            b = this.dot(a);
            return this.copy(a).multiplyScalar(b)
        }
    }(),
    projectOnPlane: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Vector3);
            a.copy(this).projectOnVector(b);
            return this.sub(a)
        }
    }(),
    reflect: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Vector3);
            return this.sub(a.copy(b).multiplyScalar(2 * this.dot(b)))
        }
    }(),
    angleTo: function(a) {
        a = this.dot(a) / Math.sqrt(this.lengthSq() * a.lengthSq());
        return Math.acos(THREE.Math.clamp(a, -1, 1))
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x
          , c = this.y - a.y;
        a = this.z - a.z;
        return b * b + c * c + a * a
    },
    setFromMatrixPosition: function(a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this
    },
    setFromMatrixScale: function(a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length()
          , c = this.set(a.elements[4], a.elements[5], a.elements[6]).length();
        a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b;
        this.y = c;
        this.z = a;
        return this
    },
    setFromMatrixColumn: function(a, b) {
        var c = 4 * a
          , d = b.elements;
        this.x = d[c];
        this.y = d[c + 1];
        this.z = d[c + 2];
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    fromArray: function(a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        this.z = a[b + 2];
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this.x;
        a[b + 1] = this.y;
        a[b + 2] = this.z;
        return a
    },
    fromAttribute: function(a, b, c) {
        void 0 === c && (c = 0);
        b = b * a.itemSize + c;
        this.x = a.array[b];
        this.y = a.array[b + 1];
        this.z = a.array[b + 2];
        return this
    }
};
THREE.Vector4 = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1
}
;
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setW: function(a) {
        this.w = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        case 3:
            this.w = b;
            break;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw Error("index is out of range: " + a);
        }
    },
    clone: function() {
        return new this.constructor(this.x,this.y,this.z,this.w)
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = void 0 !== a.w ? a.w : 1;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
            this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        this.w += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this
    },
    addScaledVector: function(a, b) {
        this.x += a.x * b;
        this.y += a.y * b;
        this.z += a.z * b;
        this.w += a.w * b;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b)
            return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
            this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },
    subScalar: function(a) {
        this.x -= a;
        this.y -= a;
        this.z -= a;
        this.w -= a;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this
    },
    multiplyScalar: function(a) {
        isFinite(a) ? (this.x *= a,
        this.y *= a,
        this.z *= a,
        this.w *= a) : this.w = this.z = this.y = this.x = 0;
        return this
    },
    applyMatrix4: function(a) {
        var b = this.x
          , c = this.y
          , d = this.z
          , e = this.w;
        a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
        this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
        return this
    },
    divideScalar: function(a) {
        return this.multiplyScalar(1 / a)
    },
    setAxisAngleFromQuaternion: function(a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        1E-4 > b ? (this.x = 1,
        this.z = this.y = 0) : (this.x = a.x / b,
        this.y = a.y / b,
        this.z = a.z / b);
        return this
    },
    setAxisAngleFromRotationMatrix: function(a) {
        var b, c, d;
        a = a.elements;
        var e = a[0];
        d = a[4];
        var f = a[8]
          , g = a[1]
          , h = a[5]
          , k = a[9];
        c = a[2];
        b = a[6];
        var l = a[10];
        if (.01 > Math.abs(d - g) && .01 > Math.abs(f - c) && .01 > Math.abs(k - b)) {
            if (.1 > Math.abs(d + g) && .1 > Math.abs(f + c) && .1 > Math.abs(k + b) && .1 > Math.abs(e + h + l - 3))
                return this.set(1, 0, 0, 0),
                this;
            a = Math.PI;
            e = (e + 1) / 2;
            h = (h + 1) / 2;
            l = (l + 1) / 2;
            d = (d + g) / 4;
            f = (f + c) / 4;
            k = (k + b) / 4;
            e > h && e > l ? .01 > e ? (b = 0,
            d = c = .707106781) : (b = Math.sqrt(e),
            c = d / b,
            d = f / b) : h > l ? .01 > h ? (b = .707106781,
            c = 0,
            d = .707106781) : (c = Math.sqrt(h),
            b = d / c,
            d = k / c) : .01 > l ? (c = b = .707106781,
            d = 0) : (d = Math.sqrt(l),
            b = f / d,
            c = k / d);
            this.set(b, c, d, a);
            return this
        }
        a = Math.sqrt((b - k) * (b - k) + (f - c) * (f - c) + (g - d) * (g - d));
        .001 > Math.abs(a) && (a = 1);
        this.x = (b - k) / a;
        this.y = (f - c) / a;
        this.z = (g - d) / a;
        this.w = Math.acos((e + h + l - 1) / 2);
        return this
    },
    min: function(a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        this.z = Math.min(this.z, a.z);
        this.w = Math.min(this.w, a.w);
        return this
    },
    max: function(a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        this.z = Math.max(this.z, a.z);
        this.w = Math.max(this.w, a.w);
        return this
    },
    clamp: function(a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        this.z = Math.max(a.z, Math.min(b.z, this.z));
        this.w = Math.max(a.w, Math.min(b.w, this.w));
        return this
    },
    clampScalar: function() {
        var a, b;
        return function(c, d) {
            void 0 === a && (a = new THREE.Vector4,
            b = new THREE.Vector4);
            a.set(c, c, c, c);
            b.set(d, d, d, d);
            return this.clamp(a, b)
        }
    }(),
    floor: function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this
    },
    ceil: function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this
    },
    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this
    },
    roundToZero: function() {
        this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
        this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w);
        return this
    },
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        return this.multiplyScalar(a / this.length())
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        this.w += (a.w - this.w) * b;
        return this
    },
    lerpVectors: function(a, b, c) {
        this.subVectors(b, a).multiplyScalar(c).add(a);
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    fromArray: function(a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        this.z = a[b + 2];
        this.w = a[b + 3];
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this.x;
        a[b + 1] = this.y;
        a[b + 2] = this.z;
        a[b + 3] = this.w;
        return a
    },
    fromAttribute: function(a, b, c) {
        void 0 === c && (c = 0);
        b = b * a.itemSize + c;
        this.x = a.array[b];
        this.y = a.array[b + 1];
        this.z = a.array[b + 2];
        this.w = a.array[b + 3];
        return this
    }
};
THREE.Euler = function(a, b, c, d) {
    this._x = a || 0;
    this._y = b || 0;
    this._z = c || 0;
    this._order = d || THREE.Euler.DefaultOrder
}
;
THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
THREE.Euler.DefaultOrder = "XYZ";
THREE.Euler.prototype = {
    constructor: THREE.Euler,
    get x() {
        return this._x
    },
    set x(a) {
        this._x = a;
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(a) {
        this._y = a;
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(a) {
        this._z = a;
        this.onChangeCallback()
    },
    get order() {
        return this._order
    },
    set order(a) {
        this._order = a;
        this.onChangeCallback()
    },
    set: function(a, b, c, d) {
        this._x = a;
        this._y = b;
        this._z = c;
        this._order = d || this._order;
        this.onChangeCallback();
        return this
    },
    clone: function() {
        return new this.constructor(this._x,this._y,this._z,this._order)
    },
    copy: function(a) {
        this._x = a._x;
        this._y = a._y;
        this._z = a._z;
        this._order = a._order;
        this.onChangeCallback();
        return this
    },
    setFromRotationMatrix: function(a, b, c) {
        var d = THREE.Math.clamp
          , e = a.elements;
        a = e[0];
        var f = e[4]
          , g = e[8]
          , h = e[1]
          , k = e[5]
          , l = e[9]
          , m = e[2]
          , p = e[6]
          , e = e[10];
        b = b || this._order;
        "XYZ" === b ? (this._y = Math.asin(d(g, -1, 1)),
        .99999 > Math.abs(g) ? (this._x = Math.atan2(-l, e),
        this._z = Math.atan2(-f, a)) : (this._x = Math.atan2(p, k),
        this._z = 0)) : "YXZ" === b ? (this._x = Math.asin(-d(l, -1, 1)),
        .99999 > Math.abs(l) ? (this._y = Math.atan2(g, e),
        this._z = Math.atan2(h, k)) : (this._y = Math.atan2(-m, a),
        this._z = 0)) : "ZXY" === b ? (this._x = Math.asin(d(p, -1, 1)),
        .99999 > Math.abs(p) ? (this._y = Math.atan2(-m, e),
        this._z = Math.atan2(-f, k)) : (this._y = 0,
        this._z = Math.atan2(h, a))) : "ZYX" === b ? (this._y = Math.asin(-d(m, -1, 1)),
        .99999 > Math.abs(m) ? (this._x = Math.atan2(p, e),
        this._z = Math.atan2(h, a)) : (this._x = 0,
        this._z = Math.atan2(-f, k))) : "YZX" === b ? (this._z = Math.asin(d(h, -1, 1)),
        .99999 > Math.abs(h) ? (this._x = Math.atan2(-l, k),
        this._y = Math.atan2(-m, a)) : (this._x = 0,
        this._y = Math.atan2(g, e))) : "XZY" === b ? (this._z = Math.asin(-d(f, -1, 1)),
        .99999 > Math.abs(f) ? (this._x = Math.atan2(p, k),
        this._y = Math.atan2(g, a)) : (this._x = Math.atan2(-l, e),
        this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + b);
        this._order = b;
        if (!1 !== c)
            this.onChangeCallback();
        return this
    },
    setFromQuaternion: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationFromQuaternion(b);
            this.setFromRotationMatrix(a, c, d);
            return this
        }
    }(),
    setFromVector3: function(a, b) {
        return this.set(a.x, a.y, a.z, b || this._order)
    },
    reorder: function() {
        var a = new THREE.Quaternion;
        return function(b) {
            a.setFromEuler(this);
            this.setFromQuaternion(a, b)
        }
    }(),
    equals: function(a) {
        return a._x === this._x && a._y === this._y && a._z === this._z && a._order === this._order
    },
    fromArray: function(a) {
        this._x = a[0];
        this._y = a[1];
        this._z = a[2];
        void 0 !== a[3] && (this._order = a[3]);
        this.onChangeCallback();
        return this
    },
    toArray: function(a, b) {
        void 0 === a && (a = []);
        void 0 === b && (b = 0);
        a[b] = this._x;
        a[b + 1] = this._y;
        a[b + 2] = this._z;
        a[b + 3] = this._order;
        return a
    },
    toVector3: function(a) {
        return a ? a.set(this._x, this._y, this._z) : new THREE.Vector3(this._x,this._y,this._z)
    },
    onChange: function(a) {
        this.onChangeCallback = a;
        return this
    },
    onChangeCallback: function() {}
};
THREE.Line3 = function(a, b) {
    this.start = void 0 !== a ? a : new THREE.Vector3;
    this.end = void 0 !== b ? b : new THREE.Vector3
}
;
THREE.Line3.prototype = {
    constructor: THREE.Line3,
    set: function(a, b) {
        this.start.copy(a);
        this.end.copy(b);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.start.copy(a.start);
        this.end.copy(a.end);
        return this
    },
    center: function(a) {
        return (a || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
    },
    delta: function(a) {
        return (a || new THREE.Vector3).subVectors(this.end, this.start)
    },
    distanceSq: function() {
        return this.start.distanceToSquared(this.end)
    },
    distance: function() {
        return this.start.distanceTo(this.end)
    },
    at: function(a, b) {
        var c = b || new THREE.Vector3;
        return this.delta(c).multiplyScalar(a).add(this.start)
    },
    closestPointToPointParameter: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3;
        return function(c, d) {
            a.subVectors(c, this.start);
            b.subVectors(this.end, this.start);
            var e = b.dot(b)
              , e = b.dot(a) / e;
            d && (e = THREE.Math.clamp(e, 0, 1));
            return e
        }
    }(),
    closestPointToPoint: function(a, b, c) {
        a = this.closestPointToPointParameter(a, b);
        c = c || new THREE.Vector3;
        return this.delta(c).multiplyScalar(a).add(this.start)
    },
    applyMatrix4: function(a) {
        this.start.applyMatrix4(a);
        this.end.applyMatrix4(a);
        return this
    },
    equals: function(a) {
        return a.start.equals(this.start) && a.end.equals(this.end)
    }
};
THREE.Box2 = function(a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector2(Infinity,Infinity);
    this.max = void 0 !== b ? b : new THREE.Vector2(-Infinity,-Infinity)
}
;
THREE.Box2.prototype = {
    constructor: THREE.Box2,
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        this.makeEmpty();
        for (var b = 0, c = a.length; b < c; b++)
            this.expandByPoint(a[b]);
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector2;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = Infinity;
        this.max.x = this.max.y = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function(a) {
        return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(a) {
        return (a || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar(-a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
    },
    getParameter: function(a, b) {
        return (b || new THREE.Vector2).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
    },
    intersectsBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector2;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    }
};
THREE.Box3 = function(a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector3(Infinity,Infinity,Infinity);
    this.max = void 0 !== b ? b : new THREE.Vector3(-Infinity,-Infinity,-Infinity)
}
;
THREE.Box3.prototype = {
    constructor: THREE.Box3,
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        this.makeEmpty();
        for (var b = 0, c = a.length; b < c; b++)
            this.expandByPoint(a[b]);
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    }(),
    setFromObject: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Box3);
            var c = this;
            this.makeEmpty();
            b.updateMatrixWorld(!0);
            b.traverse(function(b) {
                var e = b.geometry;
                void 0 !== e && (null === e.boundingBox && e.computeBoundingBox(),
                a.copy(e.boundingBox),
                a.applyMatrix4(b.matrixWorld),
                c.union(a))
            });
            return this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function(a) {
        return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(a) {
        return (a || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar(-a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
    },
    getParameter: function(a, b) {
        return (b || new THREE.Vector3).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
    },
    intersectsBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
    },
    intersectsSphere: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Vector3);
            this.clampPoint(b.center, a);
            return a.distanceToSquared(b.center) <= b.radius * b.radius
        }
    }(),
    intersectsPlane: function(a) {
        var b, c;
        0 < a.normal.x ? (b = a.normal.x * this.min.x,
        c = a.normal.x * this.max.x) : (b = a.normal.x * this.max.x,
        c = a.normal.x * this.min.x);
        0 < a.normal.y ? (b += a.normal.y * this.min.y,
        c += a.normal.y * this.max.y) : (b += a.normal.y * this.max.y,
        c += a.normal.y * this.min.y);
        0 < a.normal.z ? (b += a.normal.z * this.min.z,
        c += a.normal.z * this.max.z) : (b += a.normal.z * this.max.z,
        c += a.normal.z * this.min.z);
        return b <= a.constant && c >= a.constant
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector3).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector3;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    getBoundingSphere: function() {
        var a = new THREE.Vector3;
        return function(b) {
            b = b || new THREE.Sphere;
            b.center = this.center();
            b.radius = .5 * this.size(a).length();
            return b
        }
    }(),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    applyMatrix4: function() {
        var a = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function(b) {
            a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
            a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
            a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
            a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
            a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
            a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
            a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
            a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
            this.makeEmpty();
            this.setFromPoints(a);
            return this
        }
    }(),
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    }
};
THREE.Matrix3 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
}
;
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    set: function(a, b, c, d, e, f, g, h, k) {
        var l = this.elements;
        l[0] = a;
        l[3] = b;
        l[6] = c;
        l[1] = d;
        l[4] = e;
        l[7] = f;
        l[2] = g;
        l[5] = h;
        l[8] = k;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this
    },
    clone: function() {
        return (new this.constructor).fromArray(this.elements)
    },
    copy: function(a) {
        a = a.elements;
        this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
        return this
    },
    applyToVector3Array: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === c && (c = 0);
            void 0 === d && (d = b.length);
            for (var e = 0; e < d; e += 3,
            c += 3)
                a.fromArray(b, c),
                a.applyMatrix3(this),
                a.toArray(b, c);
            return b
        }
    }(),
    applyToBuffer: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === c && (c = 0);
            void 0 === d && (d = b.length / b.itemSize);
            for (var e = 0; e < d; e++,
            c++)
                a.x = b.getX(c),
                a.y = b.getY(c),
                a.z = b.getZ(c),
                a.applyMatrix3(this),
                b.setXYZ(a.x, a.y, a.z);
            return b
        }
    }(),
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[3] *= a;
        b[6] *= a;
        b[1] *= a;
        b[4] *= a;
        b[7] *= a;
        b[2] *= a;
        b[5] *= a;
        b[8] *= a;
        return this
    },
    determinant: function() {
        var a = this.elements
          , b = a[0]
          , c = a[1]
          , d = a[2]
          , e = a[3]
          , f = a[4]
          , g = a[5]
          , h = a[6]
          , k = a[7]
          , a = a[8];
        return b * f * a - b * g * k - c * e * a + c * g * h + d * e * k - d * f * h
    },
    getInverse: function(a, b) {
        var c = a.elements
          , d = this.elements;
        d[0] = c[10] * c[5] - c[6] * c[9];
        d[1] = -c[10] * c[1] + c[2] * c[9];
        d[2] = c[6] * c[1] - c[2] * c[5];
        d[3] = -c[10] * c[4] + c[6] * c[8];
        d[4] = c[10] * c[0] - c[2] * c[8];
        d[5] = -c[6] * c[0] + c[2] * c[4];
        d[6] = c[9] * c[4] - c[5] * c[8];
        d[7] = -c[9] * c[0] + c[1] * c[8];
        d[8] = c[5] * c[0] - c[1] * c[4];
        c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
        if (0 === c) {
            if (b)
                throw Error("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
            console.warn("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    transpose: function() {
        var a, b = this.elements;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this
    },
    flattenToArrayOffset: function(a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        return a
    },
    getNormalMatrix: function(a) {
        this.getInverse(a).transpose();
        return this
    },
    transposeIntoArray: function(a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    },
    fromArray: function(a) {
        this.elements.set(a);
        return this
    },
    toArray: function() {
        var a = this.elements;
        return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]]
    }
};
THREE.Matrix4 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
}
;
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function(a, b, c, d, e, f, g, h, k, l, m, p, n, q, u, t) {
        var w = this.elements;
        w[0] = a;
        w[4] = b;
        w[8] = c;
        w[12] = d;
        w[1] = e;
        w[5] = f;
        w[9] = g;
        w[13] = h;
        w[2] = k;
        w[6] = l;
        w[10] = m;
        w[14] = p;
        w[3] = n;
        w[7] = q;
        w[11] = u;
        w[15] = t;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    clone: function() {
        return (new THREE.Matrix4).fromArray(this.elements)
    },
    copy: function(a) {
        this.elements.set(a.elements);
        return this
    },
    copyPosition: function(a) {
        var b = this.elements;
        a = a.elements;
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        return this
    },
    extractBasis: function(a, b, c) {
        var d = this.elements;
        a.set(d[0], d[1], d[2]);
        b.set(d[4], d[5], d[6]);
        c.set(d[8], d[9], d[10]);
        return this
    },
    makeBasis: function(a, b, c) {
        this.set(a.x, b.x, c.x, 0, a.y, b.y, c.y, 0, a.z, b.z, c.z, 0, 0, 0, 0, 1);
        return this
    },
    extractRotation: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Vector3);
            var c = this.elements;
            b = b.elements;
            var d = 1 / a.set(b[0], b[1], b[2]).length()
              , e = 1 / a.set(b[4], b[5], b[6]).length()
              , f = 1 / a.set(b[8], b[9], b[10]).length();
            c[0] = b[0] * d;
            c[1] = b[1] * d;
            c[2] = b[2] * d;
            c[4] = b[4] * e;
            c[5] = b[5] * e;
            c[6] = b[6] * e;
            c[8] = b[8] * f;
            c[9] = b[9] * f;
            c[10] = b[10] * f;
            return this
        }
    }(),
    makeRotationFromEuler: function(a) {
        !1 === a instanceof THREE.Euler && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var b = this.elements
          , c = a.x
          , d = a.y
          , e = a.z
          , f = Math.cos(c)
          , c = Math.sin(c)
          , g = Math.cos(d)
          , d = Math.sin(d)
          , h = Math.cos(e)
          , e = Math.sin(e);
        if ("XYZ" === a.order) {
            a = f * h;
            var k = f * e
              , l = c * h
              , m = c * e;
            b[0] = g * h;
            b[4] = -g * e;
            b[8] = d;
            b[1] = k + l * d;
            b[5] = a - m * d;
            b[9] = -c * g;
            b[2] = m - a * d;
            b[6] = l + k * d;
            b[10] = f * g
        } else
            "YXZ" === a.order ? (a = g * h,
            k = g * e,
            l = d * h,
            m = d * e,
            b[0] = a + m * c,
            b[4] = l * c - k,
            b[8] = f * d,
            b[1] = f * e,
            b[5] = f * h,
            b[9] = -c,
            b[2] = k * c - l,
            b[6] = m + a * c,
            b[10] = f * g) : "ZXY" === a.order ? (a = g * h,
            k = g * e,
            l = d * h,
            m = d * e,
            b[0] = a - m * c,
            b[4] = -f * e,
            b[8] = l + k * c,
            b[1] = k + l * c,
            b[5] = f * h,
            b[9] = m - a * c,
            b[2] = -f * d,
            b[6] = c,
            b[10] = f * g) : "ZYX" === a.order ? (a = f * h,
            k = f * e,
            l = c * h,
            m = c * e,
            b[0] = g * h,
            b[4] = l * d - k,
            b[8] = a * d + m,
            b[1] = g * e,
            b[5] = m * d + a,
            b[9] = k * d - l,
            b[2] = -d,
            b[6] = c * g,
            b[10] = f * g) : "YZX" === a.order ? (a = f * g,
            k = f * d,
            l = c * g,
            m = c * d,
            b[0] = g * h,
            b[4] = m - a * e,
            b[8] = l * e + k,
            b[1] = e,
            b[5] = f * h,
            b[9] = -c * h,
            b[2] = -d * h,
            b[6] = k * e + l,
            b[10] = a - m * e) : "XZY" === a.order && (a = f * g,
            k = f * d,
            l = c * g,
            m = c * d,
            b[0] = g * h,
            b[4] = -e,
            b[8] = d * h,
            b[1] = a * e + m,
            b[5] = f * h,
            b[9] = k * e - l,
            b[2] = l * e - k,
            b[6] = c * h,
            b[10] = m * e + a);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1;
        return this
    },
    makeRotationFromQuaternion: function(a) {
        var b = this.elements
          , c = a.x
          , d = a.y
          , e = a.z
          , f = a.w
          , g = c + c
          , h = d + d
          , k = e + e;
        a = c * g;
        var l = c * h
          , c = c * k
          , m = d * h
          , d = d * k
          , e = e * k
          , g = f * g
          , h = f * h
          , f = f * k;
        b[0] = 1 - (m + e);
        b[4] = l - f;
        b[8] = c + h;
        b[1] = l + f;
        b[5] = 1 - (a + e);
        b[9] = d - g;
        b[2] = c - h;
        b[6] = d + g;
        b[10] = 1 - (a + m);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1;
        return this
    },
    lookAt: function() {
        var a, b, c;
        return function(d, e, f) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === b && (b = new THREE.Vector3);
            void 0 === c && (c = new THREE.Vector3);
            var g = this.elements;
            c.subVectors(d, e).normalize();
            0 === c.lengthSq() && (c.z = 1);
            a.crossVectors(f, c).normalize();
            0 === a.lengthSq() && (c.x += 1E-4,
            a.crossVectors(f, c).normalize());
            b.crossVectors(c, a);
            g[0] = a.x;
            g[4] = b.x;
            g[8] = c.x;
            g[1] = a.y;
            g[5] = b.y;
            g[9] = c.y;
            g[2] = a.z;
            g[6] = b.z;
            g[10] = c.z;
            return this
        }
    }(),
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
        this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
    },
    multiplyMatrices: function(a, b) {
        var c = a.elements
          , d = b.elements
          , e = this.elements
          , f = c[0]
          , g = c[4]
          , h = c[8]
          , k = c[12]
          , l = c[1]
          , m = c[5]
          , p = c[9]
          , n = c[13]
          , q = c[2]
          , u = c[6]
          , t = c[10]
          , w = c[14]
          , v = c[3]
          , x = c[7]
          , E = c[11]
          , c = c[15]
          , y = d[0]
          , F = d[4]
          , z = d[8]
          , A = d[12]
          , B = d[1]
          , H = d[5]
          , G = d[9]
          , D = d[13]
          , K = d[2]
          , N = d[6]
          , M = d[10]
          , C = d[14]
          , J = d[3]
          , L = d[7]
          , Q = d[11]
          , d = d[15];
        e[0] = f * y + g * B + h * K + k * J;
        e[4] = f * F + g * H + h * N + k * L;
        e[8] = f * z + g * G + h * M + k * Q;
        e[12] = f * A + g * D + h * C + k * d;
        e[1] = l * y + m * B + p * K + n * J;
        e[5] = l * F + m * H + p * N + n * L;
        e[9] = l * z + m * G + p * M + n * Q;
        e[13] = l * A + m * D + p * C + n * d;
        e[2] = q * y + u * B + t * K + w * J;
        e[6] = q * F + u * H + t * N + w * L;
        e[10] = q * z + u * G + t * M + w * Q;
        e[14] = q * A + u * D + t * C + w * d;
        e[3] = v * y + x * B + E * K + c * J;
        e[7] = v * F + x * H + E * N + c * L;
        e[11] = v * z + x * G + E * M + c * Q;
        e[15] = v * A + x * D + E * C + c * d;
        return this
    },
    multiplyToArray: function(a, b, c) {
        var d = this.elements;
        this.multiplyMatrices(a, b);
        c[0] = d[0];
        c[1] = d[1];
        c[2] = d[2];
        c[3] = d[3];
        c[4] = d[4];
        c[5] = d[5];
        c[6] = d[6];
        c[7] = d[7];
        c[8] = d[8];
        c[9] = d[9];
        c[10] = d[10];
        c[11] = d[11];
        c[12] = d[12];
        c[13] = d[13];
        c[14] = d[14];
        c[15] = d[15];
        return this
    },
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[4] *= a;
        b[8] *= a;
        b[12] *= a;
        b[1] *= a;
        b[5] *= a;
        b[9] *= a;
        b[13] *= a;
        b[2] *= a;
        b[6] *= a;
        b[10] *= a;
        b[14] *= a;
        b[3] *= a;
        b[7] *= a;
        b[11] *= a;
        b[15] *= a;
        return this
    },
    applyToVector3Array: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === c && (c = 0);
            void 0 === d && (d = b.length);
            for (var e = 0; e < d; e += 3,
            c += 3)
                a.fromArray(b, c),
                a.applyMatrix4(this),
                a.toArray(b, c);
            return b
        }
    }(),
    applyToBuffer: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === c && (c = 0);
            void 0 === d && (d = b.length / b.itemSize);
            for (var e = 0; e < d; e++,
            c++)
                a.x = b.getX(c),
                a.y = b.getY(c),
                a.z = b.getZ(c),
                a.applyMatrix4(this),
                b.setXYZ(a.x, a.y, a.z);
            return b
        }
    }(),
    determinant: function() {
        var a = this.elements
          , b = a[0]
          , c = a[4]
          , d = a[8]
          , e = a[12]
          , f = a[1]
          , g = a[5]
          , h = a[9]
          , k = a[13]
          , l = a[2]
          , m = a[6]
          , p = a[10]
          , n = a[14];
        return a[3] * (+e * h * m - d * k * m - e * g * p + c * k * p + d * g * n - c * h * n) + a[7] * (+b * h * n - b * k * p + e * f * p - d * f * n + d * k * l - e * h * l) + a[11] * (+b * k * m - b * g * n - e * f * m + c * f * n + e * g * l - c * k * l) + a[15] * (-d * g * l - b * h * m + b * g * p + d * f * m - c * f * p + c * h * l)
    },
    transpose: function() {
        var a = this.elements, b;
        b = a[1];
        a[1] = a[4];
        a[4] = b;
        b = a[2];
        a[2] = a[8];
        a[8] = b;
        b = a[6];
        a[6] = a[9];
        a[9] = b;
        b = a[3];
        a[3] = a[12];
        a[12] = b;
        b = a[7];
        a[7] = a[13];
        a[13] = b;
        b = a[11];
        a[11] = a[14];
        a[14] = b;
        return this
    },
    flattenToArrayOffset: function(a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        a[b + 9] = c[9];
        a[b + 10] = c[10];
        a[b + 11] = c[11];
        a[b + 12] = c[12];
        a[b + 13] = c[13];
        a[b + 14] = c[14];
        a[b + 15] = c[15];
        return a
    },
    getPosition: function() {
        var a;
        return function() {
            void 0 === a && (a = new THREE.Vector3);
            console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
            var b = this.elements;
            return a.set(b[12], b[13], b[14])
        }
    }(),
    setPosition: function(a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this
    },
    getInverse: function(a, b) {
        var c = this.elements
          , d = a.elements
          , e = d[0]
          , f = d[4]
          , g = d[8]
          , h = d[12]
          , k = d[1]
          , l = d[5]
          , m = d[9]
          , p = d[13]
          , n = d[2]
          , q = d[6]
          , u = d[10]
          , t = d[14]
          , w = d[3]
          , v = d[7]
          , x = d[11]
          , d = d[15];
        c[0] = m * t * v - p * u * v + p * q * x - l * t * x - m * q * d + l * u * d;
        c[4] = h * u * v - g * t * v - h * q * x + f * t * x + g * q * d - f * u * d;
        c[8] = g * p * v - h * m * v + h * l * x - f * p * x - g * l * d + f * m * d;
        c[12] = h * m * q - g * p * q - h * l * u + f * p * u + g * l * t - f * m * t;
        c[1] = p * u * w - m * t * w - p * n * x + k * t * x + m * n * d - k * u * d;
        c[5] = g * t * w - h * u * w + h * n * x - e * t * x - g * n * d + e * u * d;
        c[9] = h * m * w - g * p * w - h * k * x + e * p * x + g * k * d - e * m * d;
        c[13] = g * p * n - h * m * n + h * k * u - e * p * u - g * k * t + e * m * t;
        c[2] = l * t * w - p * q * w + p * n * v - k * t * v - l * n * d + k * q * d;
        c[6] = h * q * w - f * t * w - h * n * v + e * t * v + f * n * d - e * q * d;
        c[10] = f * p * w - h * l * w + h * k * v - e * p * v - f * k * d + e * l * d;
        c[14] = h * l * n - f * p * n - h * k * q + e * p * q + f * k * t - e * l * t;
        c[3] = m * q * w - l * u * w - m * n * v + k * u * v + l * n * x - k * q * x;
        c[7] = f * u * w - g * q * w + g * n * v - e * u * v - f * n * x + e * q * x;
        c[11] = g * l * w - f * m * w - g * k * v + e * m * v + f * k * x - e * l * x;
        c[15] = f * m * n - g * l * n + g * k * q - e * m * q - f * k * u + e * l * u;
        c = e * c[0] + k * c[4] + n * c[8] + w * c[12];
        if (0 === c) {
            if (b)
                throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
            console.warn("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    scale: function(a) {
        var b = this.elements
          , c = a.x
          , d = a.y;
        a = a.z;
        b[0] *= c;
        b[4] *= d;
        b[8] *= a;
        b[1] *= c;
        b[5] *= d;
        b[9] *= a;
        b[2] *= c;
        b[6] *= d;
        b[10] *= a;
        b[3] *= c;
        b[7] *= d;
        b[11] *= a;
        return this
    },
    getMaxScaleOnAxis: function() {
        var a = this.elements;
        return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10]))
    },
    makeTranslation: function(a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    makeRotationX: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationY: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationZ: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationAxis: function(a, b) {
        var c = Math.cos(b)
          , d = Math.sin(b)
          , e = 1 - c
          , f = a.x
          , g = a.y
          , h = a.z
          , k = e * f
          , l = e * g;
        this.set(k * f + c, k * g - d * h, k * h + d * g, 0, k * g + d * h, l * g + c, l * h - d * f, 0, k * h - d * g, l * h + d * f, e * h * h + c, 0, 0, 0, 0, 1);
        return this
    },
    makeScale: function(a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    compose: function(a, b, c) {
        this.makeRotationFromQuaternion(b);
        this.scale(c);
        this.setPosition(a);
        return this
    },
    decompose: function() {
        var a, b;
        return function(c, d, e) {
            void 0 === a && (a = new THREE.Vector3);
            void 0 === b && (b = new THREE.Matrix4);
            var f = this.elements
              , g = a.set(f[0], f[1], f[2]).length()
              , h = a.set(f[4], f[5], f[6]).length()
              , k = a.set(f[8], f[9], f[10]).length();
            0 > this.determinant() && (g = -g);
            c.x = f[12];
            c.y = f[13];
            c.z = f[14];
            b.elements.set(this.elements);
            c = 1 / g;
            var f = 1 / h
              , l = 1 / k;
            b.elements[0] *= c;
            b.elements[1] *= c;
            b.elements[2] *= c;
            b.elements[4] *= f;
            b.elements[5] *= f;
            b.elements[6] *= f;
            b.elements[8] *= l;
            b.elements[9] *= l;
            b.elements[10] *= l;
            d.setFromRotationMatrix(b);
            e.x = g;
            e.y = h;
            e.z = k;
            return this
        }
    }(),
    makeFrustum: function(a, b, c, d, e, f) {
        var g = this.elements;
        g[0] = 2 * e / (b - a);
        g[4] = 0;
        g[8] = (b + a) / (b - a);
        g[12] = 0;
        g[1] = 0;
        g[5] = 2 * e / (d - c);
        g[9] = (d + c) / (d - c);
        g[13] = 0;
        g[2] = 0;
        g[6] = 0;
        g[10] = -(f + e) / (f - e);
        g[14] = -2 * f * e / (f - e);
        g[3] = 0;
        g[7] = 0;
        g[11] = -1;
        g[15] = 0;
        return this
    },
    makePerspective: function(a, b, c, d) {
        a = c * Math.tan(THREE.Math.degToRad(.5 * a));
        var e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function(a, b, c, d, e, f) {
        var g = this.elements
          , h = b - a
          , k = c - d
          , l = f - e;
        g[0] = 2 / h;
        g[4] = 0;
        g[8] = 0;
        g[12] = -((b + a) / h);
        g[1] = 0;
        g[5] = 2 / k;
        g[9] = 0;
        g[13] = -((c + d) / k);
        g[2] = 0;
        g[6] = 0;
        g[10] = -2 / l;
        g[14] = -((f + e) / l);
        g[3] = 0;
        g[7] = 0;
        g[11] = 0;
        g[15] = 1;
        return this
    },
    equals: function(a) {
        var b = this.elements;
        a = a.elements;
        for (var c = 0; 16 > c; c++)
            if (b[c] !== a[c])
                return !1;
        return !0
    },
    fromArray: function(a) {
        this.elements.set(a);
        return this
    },
    toArray: function() {
        var a = this.elements;
        return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]]
    }
};
THREE.Ray = function(a, b) {
    this.origin = void 0 !== a ? a : new THREE.Vector3;
    this.direction = void 0 !== b ? b : new THREE.Vector3
}
;
THREE.Ray.prototype = {
    constructor: THREE.Ray,
    set: function(a, b) {
        this.origin.copy(a);
        this.direction.copy(b);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.origin.copy(a.origin);
        this.direction.copy(a.direction);
        return this
    },
    at: function(a, b) {
        return (b || new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)
    },
    recast: function() {
        var a = new THREE.Vector3;
        return function(b) {
            this.origin.copy(this.at(b, a));
            return this
        }
    }(),
    closestPointToPoint: function(a, b) {
        var c = b || new THREE.Vector3;
        c.subVectors(a, this.origin);
        var d = c.dot(this.direction);
        return 0 > d ? c.copy(this.origin) : c.copy(this.direction).multiplyScalar(d).add(this.origin)
    },
    distanceToPoint: function(a) {
        return Math.sqrt(this.distanceSqToPoint(a))
    },
    distanceSqToPoint: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = a.subVectors(b, this.origin).dot(this.direction);
            if (0 > c)
                return this.origin.distanceToSquared(b);
            a.copy(this.direction).multiplyScalar(c).add(this.origin);
            return a.distanceToSquared(b)
        }
    }(),
    distanceSqToSegment: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3
          , c = new THREE.Vector3;
        return function(d, e, f, g) {
            a.copy(d).add(e).multiplyScalar(.5);
            b.copy(e).sub(d).normalize();
            c.copy(this.origin).sub(a);
            var h = .5 * d.distanceTo(e), k = -this.direction.dot(b), l = c.dot(this.direction), m = -c.dot(b), p = c.lengthSq(), n = Math.abs(1 - k * k), q;
            0 < n ? (d = k * m - l,
            e = k * l - m,
            q = h * n,
            0 <= d ? e >= -q ? e <= q ? (h = 1 / n,
            d *= h,
            e *= h,
            k = d * (d + k * e + 2 * l) + e * (k * d + e + 2 * m) + p) : (e = h,
            d = Math.max(0, -(k * e + l)),
            k = -d * d + e * (e + 2 * m) + p) : (e = -h,
            d = Math.max(0, -(k * e + l)),
            k = -d * d + e * (e + 2 * m) + p) : e <= -q ? (d = Math.max(0, -(-k * h + l)),
            e = 0 < d ? -h : Math.min(Math.max(-h, -m), h),
            k = -d * d + e * (e + 2 * m) + p) : e <= q ? (d = 0,
            e = Math.min(Math.max(-h, -m), h),
            k = e * (e + 2 * m) + p) : (d = Math.max(0, -(k * h + l)),
            e = 0 < d ? h : Math.min(Math.max(-h, -m), h),
            k = -d * d + e * (e + 2 * m) + p)) : (e = 0 < k ? -h : h,
            d = Math.max(0, -(k * e + l)),
            k = -d * d + e * (e + 2 * m) + p);
            f && f.copy(this.direction).multiplyScalar(d).add(this.origin);
            g && g.copy(b).multiplyScalar(e).add(a);
            return k
        }
    }(),
    intersectSphere: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            a.subVectors(b.center, this.origin);
            var d = a.dot(this.direction)
              , e = a.dot(a) - d * d
              , f = b.radius * b.radius;
            if (e > f)
                return null;
            f = Math.sqrt(f - e);
            e = d - f;
            d += f;
            return 0 > e && 0 > d ? null : 0 > e ? this.at(d, c) : this.at(e, c)
        }
    }(),
    intersectsSphere: function(a) {
        return this.distanceToPoint(a.center) <= a.radius
    },
    distanceToPlane: function(a) {
        var b = a.normal.dot(this.direction);
        if (0 === b)
            return 0 === a.distanceToPoint(this.origin) ? 0 : null;
        a = -(this.origin.dot(a.normal) + a.constant) / b;
        return 0 <= a ? a : null
    },
    intersectPlane: function(a, b) {
        var c = this.distanceToPlane(a);
        return null === c ? null : this.at(c, b)
    },
    intersectsPlane: function(a) {
        var b = a.distanceToPoint(this.origin);
        return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1
    },
    intersectBox: function(a, b) {
        var c, d, e, f, g;
        d = 1 / this.direction.x;
        f = 1 / this.direction.y;
        g = 1 / this.direction.z;
        var h = this.origin;
        0 <= d ? (c = (a.min.x - h.x) * d,
        d *= a.max.x - h.x) : (c = (a.max.x - h.x) * d,
        d *= a.min.x - h.x);
        0 <= f ? (e = (a.min.y - h.y) * f,
        f *= a.max.y - h.y) : (e = (a.max.y - h.y) * f,
        f *= a.min.y - h.y);
        if (c > f || e > d)
            return null;
        if (e > c || c !== c)
            c = e;
        if (f < d || d !== d)
            d = f;
        0 <= g ? (e = (a.min.z - h.z) * g,
        g *= a.max.z - h.z) : (e = (a.max.z - h.z) * g,
        g *= a.min.z - h.z);
        if (c > g || e > d)
            return null;
        if (e > c || c !== c)
            c = e;
        if (g < d || d !== d)
            d = g;
        return 0 > d ? null : this.at(0 <= c ? c : d, b)
    },
    intersectsBox: function() {
        var a = new THREE.Vector3;
        return function(b) {
            return null !== this.intersectBox(b, a)
        }
    }(),
    intersectTriangle: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3
          , c = new THREE.Vector3
          , d = new THREE.Vector3;
        return function(e, f, g, h, k) {
            b.subVectors(f, e);
            c.subVectors(g, e);
            d.crossVectors(b, c);
            f = this.direction.dot(d);
            if (0 < f) {
                if (h)
                    return null;
                h = 1
            } else if (0 > f)
                h = -1,
                f = -f;
            else
                return null;
            a.subVectors(this.origin, e);
            e = h * this.direction.dot(c.crossVectors(a, c));
            if (0 > e)
                return null;
            g = h * this.direction.dot(b.cross(a));
            if (0 > g || e + g > f)
                return null;
            e = -h * a.dot(d);
            return 0 > e ? null : this.at(e / f, k)
        }
    }(),
    applyMatrix4: function(a) {
        this.direction.add(this.origin).applyMatrix4(a);
        this.origin.applyMatrix4(a);
        this.direction.sub(this.origin);
        this.direction.normalize();
        return this
    },
    equals: function(a) {
        return a.origin.equals(this.origin) && a.direction.equals(this.direction)
    }
};
THREE.Sphere = function(a, b) {
    this.center = void 0 !== a ? a : new THREE.Vector3;
    this.radius = void 0 !== b ? b : 0
}
;
THREE.Sphere.prototype = {
    constructor: THREE.Sphere,
    set: function(a, b) {
        this.center.copy(a);
        this.radius = b;
        return this
    },
    setFromPoints: function() {
        var a = new THREE.Box3;
        return function(b, c) {
            var d = this.center;
            void 0 !== c ? d.copy(c) : a.setFromPoints(b).center(d);
            for (var e = 0, f = 0, g = b.length; f < g; f++)
                e = Math.max(e, d.distanceToSquared(b[f]));
            this.radius = Math.sqrt(e);
            return this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.center.copy(a.center);
        this.radius = a.radius;
        return this
    },
    empty: function() {
        return 0 >= this.radius
    },
    containsPoint: function(a) {
        return a.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function(a) {
        return a.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function(a) {
        var b = this.radius + a.radius;
        return a.center.distanceToSquared(this.center) <= b * b
    },
    intersectsBox: function(a) {
        return a.intersectsSphere(this)
    },
    intersectsPlane: function(a) {
        return Math.abs(this.center.dot(a.normal) - a.constant) <= this.radius
    },
    clampPoint: function(a, b) {
        var c = this.center.distanceToSquared(a)
          , d = b || new THREE.Vector3;
        d.copy(a);
        c > this.radius * this.radius && (d.sub(this.center).normalize(),
        d.multiplyScalar(this.radius).add(this.center));
        return d
    },
    getBoundingBox: function(a) {
        a = a || new THREE.Box3;
        a.set(this.center, this.center);
        a.expandByScalar(this.radius);
        return a
    },
    applyMatrix4: function(a) {
        this.center.applyMatrix4(a);
        this.radius *= a.getMaxScaleOnAxis();
        return this
    },
    translate: function(a) {
        this.center.add(a);
        return this
    },
    equals: function(a) {
        return a.center.equals(this.center) && a.radius === this.radius
    }
};
THREE.Frustum = function(a, b, c, d, e, f) {
    this.planes = [void 0 !== a ? a : new THREE.Plane, void 0 !== b ? b : new THREE.Plane, void 0 !== c ? c : new THREE.Plane, void 0 !== d ? d : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
}
;
THREE.Frustum.prototype = {
    constructor: THREE.Frustum,
    set: function(a, b, c, d, e, f) {
        var g = this.planes;
        g[0].copy(a);
        g[1].copy(b);
        g[2].copy(c);
        g[3].copy(d);
        g[4].copy(e);
        g[5].copy(f);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        for (var b = this.planes, c = 0; 6 > c; c++)
            b[c].copy(a.planes[c]);
        return this
    },
    setFromMatrix: function(a) {
        var b = this.planes
          , c = a.elements;
        a = c[0];
        var d = c[1]
          , e = c[2]
          , f = c[3]
          , g = c[4]
          , h = c[5]
          , k = c[6]
          , l = c[7]
          , m = c[8]
          , p = c[9]
          , n = c[10]
          , q = c[11]
          , u = c[12]
          , t = c[13]
          , w = c[14]
          , c = c[15];
        b[0].setComponents(f - a, l - g, q - m, c - u).normalize();
        b[1].setComponents(f + a, l + g, q + m, c + u).normalize();
        b[2].setComponents(f + d, l + h, q + p, c + t).normalize();
        b[3].setComponents(f - d, l - h, q - p, c - t).normalize();
        b[4].setComponents(f - e, l - k, q - n, c - w).normalize();
        b[5].setComponents(f + e, l + k, q + n, c + w).normalize();
        return this
    },
    intersectsObject: function() {
        var a = new THREE.Sphere;
        return function(b) {
            var c = b.geometry;
            null === c.boundingSphere && c.computeBoundingSphere();
            a.copy(c.boundingSphere);
            a.applyMatrix4(b.matrixWorld);
            return this.intersectsSphere(a)
        }
    }(),
    intersectsSphere: function(a) {
        var b = this.planes
          , c = a.center;
        a = -a.radius;
        for (var d = 0; 6 > d; d++)
            if (b[d].distanceToPoint(c) < a)
                return !1;
        return !0
    },
    intersectsBox: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3;
        return function(c) {
            for (var d = this.planes, e = 0; 6 > e; e++) {
                var f = d[e];
                a.x = 0 < f.normal.x ? c.min.x : c.max.x;
                b.x = 0 < f.normal.x ? c.max.x : c.min.x;
                a.y = 0 < f.normal.y ? c.min.y : c.max.y;
                b.y = 0 < f.normal.y ? c.max.y : c.min.y;
                a.z = 0 < f.normal.z ? c.min.z : c.max.z;
                b.z = 0 < f.normal.z ? c.max.z : c.min.z;
                var g = f.distanceToPoint(a)
                  , f = f.distanceToPoint(b);
                if (0 > g && 0 > f)
                    return !1
            }
            return !0
        }
    }(),
    containsPoint: function(a) {
        for (var b = this.planes, c = 0; 6 > c; c++)
            if (0 > b[c].distanceToPoint(a))
                return !1;
        return !0
    }
};
THREE.Plane = function(a, b) {
    this.normal = void 0 !== a ? a : new THREE.Vector3(1,0,0);
    this.constant = void 0 !== b ? b : 0
}
;
THREE.Plane.prototype = {
    constructor: THREE.Plane,
    set: function(a, b) {
        this.normal.copy(a);
        this.constant = b;
        return this
    },
    setComponents: function(a, b, c, d) {
        this.normal.set(a, b, c);
        this.constant = d;
        return this
    },
    setFromNormalAndCoplanarPoint: function(a, b) {
        this.normal.copy(a);
        this.constant = -b.dot(this.normal);
        return this
    },
    setFromCoplanarPoints: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3;
        return function(c, d, e) {
            d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
            this.setFromNormalAndCoplanarPoint(d, c);
            return this
        }
    }(),
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.normal.copy(a.normal);
        this.constant = a.constant;
        return this
    },
    normalize: function() {
        var a = 1 / this.normal.length();
        this.normal.multiplyScalar(a);
        this.constant *= a;
        return this
    },
    negate: function() {
        this.constant *= -1;
        this.normal.negate();
        return this
    },
    distanceToPoint: function(a) {
        return this.normal.dot(a) + this.constant
    },
    distanceToSphere: function(a) {
        return this.distanceToPoint(a.center) - a.radius
    },
    projectPoint: function(a, b) {
        return this.orthoPoint(a, b).sub(a).negate()
    },
    orthoPoint: function(a, b) {
        var c = this.distanceToPoint(a);
        return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
    },
    intersectLine: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = c || new THREE.Vector3
              , e = b.delta(a)
              , f = this.normal.dot(e);
            if (0 === f) {
                if (0 === this.distanceToPoint(b.start))
                    return d.copy(b.start)
            } else
                return f = -(b.start.dot(this.normal) + this.constant) / f,
                0 > f || 1 < f ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)
        }
    }(),
    intersectsLine: function(a) {
        var b = this.distanceToPoint(a.start);
        a = this.distanceToPoint(a.end);
        return 0 > b && 0 < a || 0 > a && 0 < b
    },
    intersectsBox: function(a) {
        return a.intersectsPlane(this)
    },
    intersectsSphere: function(a) {
        return a.intersectsPlane(this)
    },
    coplanarPoint: function(a) {
        return (a || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3
          , c = new THREE.Matrix3;
        return function(d, e) {
            var f = e || c.getNormalMatrix(d)
              , f = a.copy(this.normal).applyMatrix3(f)
              , g = this.coplanarPoint(b);
            g.applyMatrix4(d);
            this.setFromNormalAndCoplanarPoint(f, g);
            return this
        }
    }(),
    translate: function(a) {
        this.constant -= a.dot(this.normal);
        return this
    },
    equals: function(a) {
        return a.normal.equals(this.normal) && a.constant === this.constant
    }
};
THREE.Math = {
    generateUUID: function() {
        var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), b = Array(36), c = 0, d;
        return function() {
            for (var e = 0; 36 > e; e++)
                8 === e || 13 === e || 18 === e || 23 === e ? b[e] = "-" : 14 === e ? b[e] = "4" : (2 >= c && (c = 33554432 + 16777216 * Math.random() | 0),
                d = c & 15,
                c >>= 4,
                b[e] = a[19 === e ? d & 3 | 8 : d]);
            return b.join("")
        }
    }(),
    clamp: function(a, b, c) {
        return Math.max(b, Math.min(c, a))
    },
    euclideanModulo: function(a, b) {
        return (a % b + b) % b
    },
    mapLinear: function(a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    smoothstep: function(a, b, c) {
        if (a <= b)
            return 0;
        if (a >= c)
            return 1;
        a = (a - b) / (c - b);
        return a * a * (3 - 2 * a)
    },
    smootherstep: function(a, b, c) {
        if (a <= b)
            return 0;
        if (a >= c)
            return 1;
        a = (a - b) / (c - b);
        return a * a * a * (a * (6 * a - 15) + 10)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function(a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function(a) {
        return a * (.5 - Math.random())
    },
    degToRad: function() {
        var a = Math.PI / 180;
        return function(b) {
            return b * a
        }
    }(),
    radToDeg: function() {
        var a = 180 / Math.PI;
        return function(b) {
            return b * a
        }
    }(),
    isPowerOfTwo: function(a) {
        return 0 === (a & a - 1) && 0 !== a
    },
    nearestPowerOfTwo: function(a) {
        return Math.pow(2, Math.round(Math.log(a) / Math.LN2))
    },
    nextPowerOfTwo: function(a) {
        a--;
        a |= a >> 1;
        a |= a >> 2;
        a |= a >> 4;
        a |= a >> 8;
        a |= a >> 16;
        a++;
        return a
    }
};
THREE.Spline = function(a) {
    function b(a, b, c, d, e, f, g) {
        a = .5 * (c - a);
        d = .5 * (d - b);
        return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    }
    this.points = a;
    var c = [], d = {
        x: 0,
        y: 0,
        z: 0
    }, e, f, g, h, k, l, m, p, n;
    this.initFromArray = function(a) {
        this.points = [];
        for (var b = 0; b < a.length; b++)
            this.points[b] = {
                x: a[b][0],
                y: a[b][1],
                z: a[b][2]
            }
    }
    ;
    this.getPoint = function(a) {
        e = (this.points.length - 1) * a;
        f = Math.floor(e);
        g = e - f;
        c[0] = 0 === f ? f : f - 1;
        c[1] = f;
        c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
        c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
        l = this.points[c[0]];
        m = this.points[c[1]];
        p = this.points[c[2]];
        n = this.points[c[3]];
        h = g * g;
        k = g * h;
        d.x = b(l.x, m.x, p.x, n.x, g, h, k);
        d.y = b(l.y, m.y, p.y, n.y, g, h, k);
        d.z = b(l.z, m.z, p.z, n.z, g, h, k);
        return d
    }
    ;
    this.getControlPointsArray = function() {
        var a, b, c = this.points.length, d = [];
        for (a = 0; a < c; a++)
            b = this.points[a],
            d[a] = [b.x, b.y, b.z];
        return d
    }
    ;
    this.getLength = function(a) {
        var b, c, d, e = b = b = 0, f = new THREE.Vector3, g = new THREE.Vector3, h = [], k = 0;
        h[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        f.copy(this.points[0]);
        for (a = 1; a < c; a++)
            b = a / c,
            d = this.getPoint(b),
            g.copy(d),
            k += g.distanceTo(f),
            f.copy(d),
            b *= this.points.length - 1,
            b = Math.floor(b),
            b !== e && (h[b] = k,
            e = b);
        h[h.length] = k;
        return {
            chunks: h,
            total: k
        }
    }
    ;
    this.reparametrizeByArcLength = function(a) {
        var b, c, d, e, f, g, h = [], k = new THREE.Vector3, l = this.getLength();
        h.push(k.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = l.chunks[b] - l.chunks[b - 1];
            g = Math.ceil(a * c / l.total);
            e = (b - 1) / (this.points.length - 1);
            f = b / (this.points.length - 1);
            for (c = 1; c < g - 1; c++)
                d = e + 1 / g * c * (f - e),
                d = this.getPoint(d),
                h.push(k.copy(d).clone());
            h.push(k.copy(this.points[b]).clone())
        }
        this.points = h
    }
}
;
THREE.Triangle = function(a, b, c) {
    this.a = void 0 !== a ? a : new THREE.Vector3;
    this.b = void 0 !== b ? b : new THREE.Vector3;
    this.c = void 0 !== c ? c : new THREE.Vector3
}
;
THREE.Triangle.normal = function() {
    var a = new THREE.Vector3;
    return function(b, c, d, e) {
        e = e || new THREE.Vector3;
        e.subVectors(d, c);
        a.subVectors(b, c);
        e.cross(a);
        b = e.lengthSq();
        return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
    }
}();
THREE.Triangle.barycoordFromPoint = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3
      , c = new THREE.Vector3;
    return function(d, e, f, g, h) {
        a.subVectors(g, e);
        b.subVectors(f, e);
        c.subVectors(d, e);
        d = a.dot(a);
        e = a.dot(b);
        f = a.dot(c);
        var k = b.dot(b);
        g = b.dot(c);
        var l = d * k - e * e;
        h = h || new THREE.Vector3;
        if (0 === l)
            return h.set(-2, -1, -1);
        l = 1 / l;
        k = (k * f - e * g) * l;
        d = (d * g - e * f) * l;
        return h.set(1 - k - d, d, k)
    }
}();
THREE.Triangle.containsPoint = function() {
    var a = new THREE.Vector3;
    return function(b, c, d, e) {
        b = THREE.Triangle.barycoordFromPoint(b, c, d, e, a);
        return 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
    }
}();
THREE.Triangle.prototype = {
    constructor: THREE.Triangle,
    set: function(a, b, c) {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this
    },
    setFromPointsAndIndices: function(a, b, c, d) {
        this.a.copy(a[b]);
        this.b.copy(a[c]);
        this.c.copy(a[d]);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.a.copy(a.a);
        this.b.copy(a.b);
        this.c.copy(a.c);
        return this
    },
    area: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3;
        return function() {
            a.subVectors(this.c, this.b);
            b.subVectors(this.a, this.b);
            return .5 * a.cross(b).length()
        }
    }(),
    midpoint: function(a) {
        return (a || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    },
    normal: function(a) {
        return THREE.Triangle.normal(this.a, this.b, this.c, a)
    },
    plane: function(a) {
        return (a || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    },
    barycoordFromPoint: function(a, b) {
        return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
    },
    containsPoint: function(a) {
        return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
    },
    equals: function(a) {
        return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
    }
};
THREE.Interpolant = function(a, b, c, d) {
    this.parameterPositions = a;
    this._cachedIndex = 0;
    this.resultBuffer = void 0 !== d ? d : new b.constructor(c);
    this.sampleValues = b;
    this.valueSize = c
}
;
THREE.Interpolant.prototype = {
    constructor: THREE.Intepolant,
    evaluate: function(a) {
        var b = this.parameterPositions
          , c = this._cachedIndex
          , d = b[c]
          , e = b[c - 1];
        a: {
            b: {
                c: {
                    d: if (!(a < d)) {
                        for (var f = c + 2; ; ) {
                            if (void 0 === d) {
                                if (a < e)
                                    break d;
                                this._cachedIndex = c = b.length;
                                return this.afterEnd_(c - 1, a, e)
                            }
                            if (c === f)
                                break;
                            e = d;
                            d = b[++c];
                            if (a < d)
                                break b
                        }
                        d = b.length;
                        break c
                    }
                    if (a >= e)
                        break a;
                    else {
                        f = b[1];
                        a < f && (c = 2,
                        e = f);
                        for (f = c - 2; ; ) {
                            if (void 0 === e)
                                return this._cachedIndex = 0,
                                this.beforeStart_(0, a, d);
                            if (c === f)
                                break;
                            d = e;
                            e = b[--c - 1];
                            if (a >= e)
                                break b
                        }
                        d = c;
                        c = 0
                    }
                }
                for (; c < d; )
                    e = c + d >>> 1,
                    a < b[e] ? d = e : c = e + 1;
                d = b[c];
                e = b[c - 1];
                if (void 0 === e)
                    return this._cachedIndex = 0,
                    this.beforeStart_(0, a, d);
                if (void 0 === d)
                    return this._cachedIndex = c = b.length,
                    this.afterEnd_(c - 1, e, a)
            }
            this._cachedIndex = c;
            this.intervalChanged_(c, e, d)
        }
        return this.interpolate_(c, e, a, d)
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function() {
        return this.settings || this.DefaultSettings_
    },
    copySampleValue_: function(a) {
        var b = this.resultBuffer
          , c = this.sampleValues
          , d = this.valueSize;
        a *= d;
        for (var e = 0; e !== d; ++e)
            b[e] = c[a + e];
        return b
    },
    interpolate_: function(a, b, c, d) {
        throw Error("call to abstract method");
    },
    intervalChanged_: function(a, b, c) {}
};
Object.assign(THREE.Interpolant.prototype, {
    beforeStart_: THREE.Interpolant.prototype.copySampleValue_,
    afterEnd_: THREE.Interpolant.prototype.copySampleValue_
});
THREE.CubicInterpolant = function(a, b, c, d) {
    THREE.Interpolant.call(this, a, b, c, d);
    this._offsetNext = this._weightNext = this._offsetPrev = this._weightPrev = -0
}
;
THREE.CubicInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.CubicInterpolant,
    DefaultSettings_: {
        endingStart: THREE.ZeroCurvatureEnding,
        endingEnd: THREE.ZeroCurvatureEnding
    },
    intervalChanged_: function(a, b, c) {
        var d = this.parameterPositions
          , e = a - 2
          , f = a + 1
          , g = d[e]
          , h = d[f];
        if (void 0 === g)
            switch (this.getSettings_().endingStart) {
            case THREE.ZeroSlopeEnding:
                e = a;
                g = 2 * b - c;
                break;
            case THREE.WrapAroundEnding:
                e = d.length - 2;
                g = b + d[e] - d[e + 1];
                break;
            default:
                e = a,
                g = c
            }
        if (void 0 === h)
            switch (this.getSettings_().endingEnd) {
            case THREE.ZeroSlopeEnding:
                f = a;
                h = 2 * c - b;
                break;
            case THREE.WrapAroundEnding:
                f = 1;
                h = c + d[1] - d[0];
                break;
            default:
                f = a - 1,
                h = b
            }
        a = .5 * (c - b);
        d = this.valueSize;
        this._weightPrev = a / (b - g);
        this._weightNext = a / (h - c);
        this._offsetPrev = e * d;
        this._offsetNext = f * d
    },
    interpolate_: function(a, b, c, d) {
        var e = this.resultBuffer
          , f = this.sampleValues
          , g = this.valueSize;
        a *= g;
        var h = a - g
          , k = this._offsetPrev
          , l = this._offsetNext
          , m = this._weightPrev
          , p = this._weightNext
          , n = (c - b) / (d - b);
        c = n * n;
        d = c * n;
        b = -m * d + 2 * m * c - m * n;
        m = (1 + m) * d + (-1.5 - 2 * m) * c + (-.5 + m) * n + 1;
        n = (-1 - p) * d + (1.5 + p) * c + .5 * n;
        p = p * d - p * c;
        for (c = 0; c !== g; ++c)
            e[c] = b * f[k + c] + m * f[h + c] + n * f[a + c] + p * f[l + c];
        return e
    }
});
THREE.DiscreteInterpolant = function(a, b, c, d) {
    THREE.Interpolant.call(this, a, b, c, d)
}
;
THREE.DiscreteInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.DiscreteInterpolant,
    interpolate_: function(a, b, c, d) {
        return this.copySampleValue_(a - 1)
    }
});
THREE.LinearInterpolant = function(a, b, c, d) {
    THREE.Interpolant.call(this, a, b, c, d)
}
;
THREE.LinearInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.LinearInterpolant,
    interpolate_: function(a, b, c, d) {
        var e = this.resultBuffer
          , f = this.sampleValues
          , g = this.valueSize;
        a *= g;
        var h = a - g;
        b = (c - b) / (d - b);
        c = 1 - b;
        for (d = 0; d !== g; ++d)
            e[d] = f[h + d] * c + f[a + d] * b;
        return e
    }
});
THREE.QuaternionLinearInterpolant = function(a, b, c, d) {
    THREE.Interpolant.call(this, a, b, c, d)
}
;
THREE.QuaternionLinearInterpolant.prototype = Object.assign(Object.create(THREE.Interpolant.prototype), {
    constructor: THREE.QuaternionLinearInterpolant,
    interpolate_: function(a, b, c, d) {
        var e = this.resultBuffer
          , f = this.sampleValues
          , g = this.valueSize;
        a *= g;
        b = (c - b) / (d - b);
        for (c = a + g; a !== c; a += 4)
            THREE.Quaternion.slerpFlat(e, 0, f, a - g, f, a, b);
        return e
    }
});
THREE.Clock = function(a) {
    this.autoStart = void 0 !== a ? a : !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1
}
;
THREE.Clock.prototype = {
    constructor: THREE.Clock,
    start: function() {
        this.oldTime = this.startTime = self.performance.now();
        this.running = !0
    },
    stop: function() {
        this.getElapsedTime();
        this.running = !1
    },
    getElapsedTime: function() {
        this.getDelta();
        return this.elapsedTime
    },
    getDelta: function() {
        var a = 0;
        this.autoStart && !this.running && this.start();
        if (this.running) {
            var b = self.performance.now()
              , a = .001 * (b - this.oldTime);
            this.oldTime = b;
            this.elapsedTime += a
        }
        return a
    }
};
THREE.EventDispatcher = function() {}
;
THREE.EventDispatcher.prototype = {
    constructor: THREE.EventDispatcher,
    apply: function(a) {
        a.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
        a.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
        a.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
        a.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
    },
    addEventListener: function(a, b) {
        void 0 === this._listeners && (this._listeners = {});
        var c = this._listeners;
        void 0 === c[a] && (c[a] = []);
        -1 === c[a].indexOf(b) && c[a].push(b)
    },
    hasEventListener: function(a, b) {
        if (void 0 === this._listeners)
            return !1;
        var c = this._listeners;
        return void 0 !== c[a] && -1 !== c[a].indexOf(b) ? !0 : !1
    },
    removeEventListener: function(a, b) {
        if (void 0 !== this._listeners) {
            var c = this._listeners[a];
            if (void 0 !== c) {
                var d = c.indexOf(b);
                -1 !== d && c.splice(d, 1)
            }
        }
    },
    dispatchEvent: function(a) {
        if (void 0 !== this._listeners) {
            var b = this._listeners[a.type];
            if (void 0 !== b) {
                a.target = this;
                for (var c = [], d = b.length, e = 0; e < d; e++)
                    c[e] = b[e];
                for (e = 0; e < d; e++)
                    c[e].call(this, a)
            }
        }
    }
};
THREE.Layers = function() {
    this.mask = 1
}
;
THREE.Layers.prototype = {
    constructor: THREE.Layers,
    set: function(a) {
        this.mask = 1 << a
    },
    enable: function(a) {
        this.mask |= 1 << a
    },
    toggle: function(a) {
        this.mask ^= 1 << a
    },
    disable: function(a) {
        this.mask &= ~(1 << a)
    },
    test: function(a) {
        return 0 !== (this.mask & a.mask)
    }
};
(function(a) {
    function b(a, b) {
        return a.distance - b.distance
    }
    function c(a, b, f, g) {
        if (!1 !== a.visible && (a.raycast(b, f),
        !0 === g)) {
            a = a.children;
            g = 0;
            for (var h = a.length; g < h; g++)
                c(a[g], b, f, !0)
        }
    }
    a.Raycaster = function(b, c, f, g) {
        this.ray = new a.Ray(b,c);
        this.near = f || 0;
        this.far = g || Infinity;
        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        };
        Object.defineProperties(this.params, {
            PointCloud: {
                get: function() {
                    console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");
                    return this.Points
                }
            }
        })
    }
    ;
    a.Raycaster.prototype = {
        constructor: a.Raycaster,
        linePrecision: 1,
        set: function(a, b) {
            this.ray.set(a, b)
        },
        setFromCamera: function(b, c) {
            c instanceof a.PerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(c.matrixWorld),
            this.ray.direction.set(b.x, b.y, .5).unproject(c).sub(this.ray.origin).normalize()) : c instanceof a.OrthographicCamera ? (this.ray.origin.set(b.x, b.y, -1).unproject(c),
            this.ray.direction.set(0, 0, -1).transformDirection(c.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
        },
        intersectObject: function(a, e) {
            var f = [];
            c(a, this, f, e);
            f.sort(b);
            return f
        },
        intersectObjects: function(a, e) {
            var f = [];
            if (!1 === Array.isArray(a))
                return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),
                f;
            for (var g = 0, h = a.length; g < h; g++)
                c(a[g], this, f, e);
            f.sort(b);
            return f
        }
    }
}
)(THREE);
THREE.Object3D = function() {
    Object.defineProperty(this, "id", {
        value: THREE.Object3DIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = THREE.Object3D.DefaultUp.clone();
    var a = new THREE.Vector3
      , b = new THREE.Euler
      , c = new THREE.Quaternion
      , d = new THREE.Vector3(1,1,1);
    b.onChange(function() {
        c.setFromEuler(b, !1)
    });
    c.onChange(function() {
        b.setFromQuaternion(c, void 0, !1)
    });
    Object.defineProperties(this, {
        position: {
            enumerable: !0,
            value: a
        },
        rotation: {
            enumerable: !0,
            value: b
        },
        quaternion: {
            enumerable: !0,
            value: c
        },
        scale: {
            enumerable: !0,
            value: d
        },
        modelViewMatrix: {
            value: new THREE.Matrix4
        },
        normalMatrix: {
            value: new THREE.Matrix3
        }
    });
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixAutoUpdate = THREE.Object3D.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = !1;
    this.layers = new THREE.Layers;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this.renderOrder = 0;
    this.userData = {}
}
;
THREE.Object3D.DefaultUp = new THREE.Vector3(0,1,0);
THREE.Object3D.DefaultMatrixAutoUpdate = !0;
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function(a) {
        this.matrix.multiplyMatrices(a, this.matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    },
    setRotationFromAxisAngle: function(a, b) {
        this.quaternion.setFromAxisAngle(a, b)
    },
    setRotationFromEuler: function(a) {
        this.quaternion.setFromEuler(a, !0)
    },
    setRotationFromMatrix: function(a) {
        this.quaternion.setFromRotationMatrix(a)
    },
    setRotationFromQuaternion: function(a) {
        this.quaternion.copy(a)
    },
    rotateOnAxis: function() {
        var a = new THREE.Quaternion;
        return function(b, c) {
            a.setFromAxisAngle(b, c);
            this.quaternion.multiply(a);
            return this
        }
    }(),
    rotateX: function() {
        var a = new THREE.Vector3(1,0,0);
        return function(b) {
            return this.rotateOnAxis(a, b)
        }
    }(),
    rotateY: function() {
        var a = new THREE.Vector3(0,1,0);
        return function(b) {
            return this.rotateOnAxis(a, b)
        }
    }(),
    rotateZ: function() {
        var a = new THREE.Vector3(0,0,1);
        return function(b) {
            return this.rotateOnAxis(a, b)
        }
    }(),
    translateOnAxis: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            a.copy(b).applyQuaternion(this.quaternion);
            this.position.add(a.multiplyScalar(c));
            return this
        }
    }(),
    translateX: function() {
        var a = new THREE.Vector3(1,0,0);
        return function(b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    translateY: function() {
        var a = new THREE.Vector3(0,1,0);
        return function(b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    translateZ: function() {
        var a = new THREE.Vector3(0,0,1);
        return function(b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    localToWorld: function(a) {
        return a.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function() {
        var a = new THREE.Matrix4;
        return function(b) {
            return b.applyMatrix4(a.getInverse(this.matrixWorld))
        }
    }(),
    lookAt: function() {
        var a = new THREE.Matrix4;
        return function(b) {
            a.lookAt(b, this.position, this.up);
            this.quaternion.setFromRotationMatrix(a)
        }
    }(),
    add: function(a) {
        if (1 < arguments.length) {
            for (var b = 0; b < arguments.length; b++)
                this.add(arguments[b]);
            return this
        }
        if (a === this)
            return console.error("THREE.Object3D.add: object can't be added as a child of itself.", a),
            this;
        a instanceof THREE.Object3D ? (null !== a.parent && a.parent.remove(a),
        a.parent = this,
        a.dispatchEvent({
            type: "added"
        }),
        this.children.push(a)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", a);
        return this
    },
    remove: function(a) {
        if (1 < arguments.length)
            for (var b = 0; b < arguments.length; b++)
                this.remove(arguments[b]);
        b = this.children.indexOf(a);
        -1 !== b && (a.parent = null,
        a.dispatchEvent({
            type: "removed"
        }),
        this.children.splice(b, 1))
    },
    getObjectById: function(a) {
        return this.getObjectByProperty("id", a)
    },
    getObjectByName: function(a) {
        return this.getObjectByProperty("name", a)
    },
    getObjectByProperty: function(a, b) {
        if (this[a] === b)
            return this;
        for (var c = 0, d = this.children.length; c < d; c++) {
            var e = this.children[c].getObjectByProperty(a, b);
            if (void 0 !== e)
                return e
        }
    },
    getWorldPosition: function(a) {
        a = a || new THREE.Vector3;
        this.updateMatrixWorld(!0);
        return a.setFromMatrixPosition(this.matrixWorld)
    },
    getWorldQuaternion: function() {
        var a = new THREE.Vector3
          , b = new THREE.Vector3;
        return function(c) {
            c = c || new THREE.Quaternion;
            this.updateMatrixWorld(!0);
            this.matrixWorld.decompose(a, c, b);
            return c
        }
    }(),
    getWorldRotation: function() {
        var a = new THREE.Quaternion;
        return function(b) {
            b = b || new THREE.Euler;
            this.getWorldQuaternion(a);
            return b.setFromQuaternion(a, this.rotation.order, !1)
        }
    }(),
    getWorldScale: function() {
        var a = new THREE.Vector3
          , b = new THREE.Quaternion;
        return function(c) {
            c = c || new THREE.Vector3;
            this.updateMatrixWorld(!0);
            this.matrixWorld.decompose(a, b, c);
            return c
        }
    }(),
    getWorldDirection: function() {
        var a = new THREE.Quaternion;
        return function(b) {
            b = b || new THREE.Vector3;
            this.getWorldQuaternion(a);
            return b.set(0, 0, 1).applyQuaternion(a)
        }
    }(),
    raycast: function() {},
    traverse: function(a) {
        a(this);
        for (var b = this.children, c = 0, d = b.length; c < d; c++)
            b[c].traverse(a)
    },
    traverseVisible: function(a) {
        if (!1 !== this.visible) {
            a(this);
            for (var b = this.children, c = 0, d = b.length; c < d; c++)
                b[c].traverseVisible(a)
        }
    },
    traverseAncestors: function(a) {
        var b = this.parent;
        null !== b && (a(b),
        b.traverseAncestors(a))
    },
    updateMatrix: function() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(a) {
        !0 === this.matrixAutoUpdate && this.updateMatrix();
        if (!0 === this.matrixWorldNeedsUpdate || !0 === a)
            null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            this.matrixWorldNeedsUpdate = !1,
            a = !0;
        for (var b = 0, c = this.children.length; b < c; b++)
            this.children[b].updateMatrixWorld(a)
    },
    toJSON: function(a) {
        function b(a) {
            var b = [], c;
            for (c in a) {
                var d = a[c];
                delete d.metadata;
                b.push(d)
            }
            return b
        }
        var c = void 0 === a
          , d = {};
        c && (a = {
            geometries: {},
            materials: {},
            textures: {},
            images: {}
        },
        d.metadata = {
            version: 4.4,
            type: "Object",
            generator: "Object3D.toJSON"
        });
        var e = {};
        e.uuid = this.uuid;
        e.type = this.type;
        "" !== this.name && (e.name = this.name);
        "{}" !== JSON.stringify(this.userData) && (e.userData = this.userData);
        !0 === this.castShadow && (e.castShadow = !0);
        !0 === this.receiveShadow && (e.receiveShadow = !0);
        !1 === this.visible && (e.visible = !1);
        e.matrix = this.matrix.toArray();
        void 0 !== this.geometry && (void 0 === a.geometries[this.geometry.uuid] && (a.geometries[this.geometry.uuid] = this.geometry.toJSON(a)),
        e.geometry = this.geometry.uuid);
        void 0 !== this.material && (void 0 === a.materials[this.material.uuid] && (a.materials[this.material.uuid] = this.material.toJSON(a)),
        e.material = this.material.uuid);
        if (0 < this.children.length) {
            e.children = [];
            for (var f = 0; f < this.children.length; f++)
                e.children.push(this.children[f].toJSON(a).object)
        }
        if (c) {
            var c = b(a.geometries)
              , f = b(a.materials)
              , g = b(a.textures);
            a = b(a.images);
            0 < c.length && (d.geometries = c);
            0 < f.length && (d.materials = f);
            0 < g.length && (d.textures = g);
            0 < a.length && (d.images = a)
        }
        d.object = e;
        return d
    },
    clone: function(a) {
        return (new this.constructor).copy(this, a)
    },
    copy: function(a, b) {
        void 0 === b && (b = !0);
        this.name = a.name;
        this.up.copy(a.up);
        this.position.copy(a.position);
        this.quaternion.copy(a.quaternion);
        this.scale.copy(a.scale);
        this.rotationAutoUpdate = a.rotationAutoUpdate;
        this.matrix.copy(a.matrix);
        this.matrixWorld.copy(a.matrixWorld);
        this.matrixAutoUpdate = a.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
        this.visible = a.visible;
        this.castShadow = a.castShadow;
        this.receiveShadow = a.receiveShadow;
        this.frustumCulled = a.frustumCulled;
        this.renderOrder = a.renderOrder;
        this.userData = JSON.parse(JSON.stringify(a.userData));
        if (!0 === b)
            for (var c = 0; c < a.children.length; c++)
                this.add(a.children[c].clone());
        return this
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);
THREE.Object3DIdCount = 0;
THREE.Face3 = function(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
    this.vertexNormals = Array.isArray(d) ? d : [];
    this.color = e instanceof THREE.Color ? e : new THREE.Color;
    this.vertexColors = Array.isArray(e) ? e : [];
    this.materialIndex = void 0 !== f ? f : 0
}
;
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.a = a.a;
        this.b = a.b;
        this.c = a.c;
        this.normal.copy(a.normal);
        this.color.copy(a.color);
        this.materialIndex = a.materialIndex;
        for (var b = 0, c = a.vertexNormals.length; b < c; b++)
            this.vertexNormals[b] = a.vertexNormals[b].clone();
        b = 0;
        for (c = a.vertexColors.length; b < c; b++)
            this.vertexColors[b] = a.vertexColors[b].clone();
        return this
    }
};
THREE.Face4 = function(a, b, c, d, e, f, g) {
    console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
    return new THREE.Face3(a,b,c,e,f,g)
}
;
THREE.BufferAttribute = function(a, b) {
    this.uuid = THREE.Math.generateUUID();
    this.array = a;
    this.itemSize = b;
    this.dynamic = !1;
    this.updateRange = {
        offset: 0,
        count: -1
    };
    this.version = 0
}
;
THREE.BufferAttribute.prototype = {
    constructor: THREE.BufferAttribute,
    get count() {
        return this.array.length / this.itemSize
    },
    set needsUpdate(a) {
        !0 === a && this.version++
    },
    setDynamic: function(a) {
        this.dynamic = a;
        return this
    },
    copy: function(a) {
        this.array = new a.array.constructor(a.array);
        this.itemSize = a.itemSize;
        this.dynamic = a.dynamic;
        return this
    },
    copyAt: function(a, b, c) {
        a *= this.itemSize;
        c *= b.itemSize;
        for (var d = 0, e = this.itemSize; d < e; d++)
            this.array[a + d] = b.array[c + d];
        return this
    },
    copyArray: function(a) {
        this.array.set(a);
        return this
    },
    copyColorsArray: function(a) {
        for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            void 0 === f && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", d),
            f = new THREE.Color);
            b[c++] = f.r;
            b[c++] = f.g;
            b[c++] = f.b
        }
        return this
    },
    copyIndicesArray: function(a) {
        for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            b[c++] = f.a;
            b[c++] = f.b;
            b[c++] = f.c
        }
        return this
    },
    copyVector2sArray: function(a) {
        for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            void 0 === f && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", d),
            f = new THREE.Vector2);
            b[c++] = f.x;
            b[c++] = f.y
        }
        return this
    },
    copyVector3sArray: function(a) {
        for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            void 0 === f && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", d),
            f = new THREE.Vector3);
            b[c++] = f.x;
            b[c++] = f.y;
            b[c++] = f.z
        }
        return this
    },
    copyVector4sArray: function(a) {
        for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            void 0 === f && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", d),
            f = new THREE.Vector4);
            b[c++] = f.x;
            b[c++] = f.y;
            b[c++] = f.z;
            b[c++] = f.w
        }
        return this
    },
    set: function(a, b) {
        void 0 === b && (b = 0);
        this.array.set(a, b);
        return this
    },
    getX: function(a) {
        return this.array[a * this.itemSize]
    },
    setX: function(a, b) {
        this.array[a * this.itemSize] = b;
        return this
    },
    getY: function(a) {
        return this.array[a * this.itemSize + 1]
    },
    setY: function(a, b) {
        this.array[a * this.itemSize + 1] = b;
        return this
    },
    getZ: function(a) {
        return this.array[a * this.itemSize + 2]
    },
    setZ: function(a, b) {
        this.array[a * this.itemSize + 2] = b;
        return this
    },
    getW: function(a) {
        return this.array[a * this.itemSize + 3]
    },
    setW: function(a, b) {
        this.array[a * this.itemSize + 3] = b;
        return this
    },
    setXY: function(a, b, c) {
        a *= this.itemSize;
        this.array[a + 0] = b;
        this.array[a + 1] = c;
        return this
    },
    setXYZ: function(a, b, c, d) {
        a *= this.itemSize;
        this.array[a + 0] = b;
        this.array[a + 1] = c;
        this.array[a + 2] = d;
        return this
    },
    setXYZW: function(a, b, c, d, e) {
        a *= this.itemSize;
        this.array[a + 0] = b;
        this.array[a + 1] = c;
        this.array[a + 2] = d;
        this.array[a + 3] = e;
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
};
THREE.Int8Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Int8Array(a),b)
}
;
THREE.Uint8Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Uint8Array(a),b)
}
;
THREE.Uint8ClampedAttribute = function(a, b) {
    return new THREE.BufferAttribute(new Uint8ClampedArray(a),b)
}
;
THREE.Int16Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Int16Array(a),b)
}
;
THREE.Uint16Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Uint16Array(a),b)
}
;
THREE.Int32Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Int32Array(a),b)
}
;
THREE.Uint32Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Uint32Array(a),b)
}
;
THREE.Float32Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Float32Array(a),b)
}
;
THREE.Float64Attribute = function(a, b) {
    return new THREE.BufferAttribute(new Float64Array(a),b)
}
;
THREE.DynamicBufferAttribute = function(a, b) {
    console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");
    return (new THREE.BufferAttribute(a,b)).setDynamic(!0)
}
;
THREE.InstancedBufferAttribute = function(a, b, c) {
    THREE.BufferAttribute.call(this, a, b);
    this.meshPerAttribute = c || 1
}
;
THREE.InstancedBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype);
THREE.InstancedBufferAttribute.prototype.constructor = THREE.InstancedBufferAttribute;
THREE.InstancedBufferAttribute.prototype.copy = function(a) {
    THREE.BufferAttribute.prototype.copy.call(this, a);
    this.meshPerAttribute = a.meshPerAttribute;
    return this
}
;
THREE.InterleavedBuffer = function(a, b) {
    this.uuid = THREE.Math.generateUUID();
    this.array = a;
    this.stride = b;
    this.dynamic = !1;
    this.updateRange = {
        offset: 0,
        count: -1
    };
    this.version = 0
}
;
THREE.InterleavedBuffer.prototype = {
    constructor: THREE.InterleavedBuffer,
    get length() {
        return this.array.length
    },
    get count() {
        return this.array.length / this.stride
    },
    set needsUpdate(a) {
        !0 === a && this.version++
    },
    setDynamic: function(a) {
        this.dynamic = a;
        return this
    },
    copy: function(a) {
        this.array = new a.array.constructor(a.array);
        this.stride = a.stride;
        this.dynamic = a.dynamic;
        return this
    },
    copyAt: function(a, b, c) {
        a *= this.stride;
        c *= b.stride;
        for (var d = 0, e = this.stride; d < e; d++)
            this.array[a + d] = b.array[c + d];
        return this
    },
    set: function(a, b) {
        void 0 === b && (b = 0);
        this.array.set(a, b);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
};
THREE.InstancedInterleavedBuffer = function(a, b, c) {
    THREE.InterleavedBuffer.call(this, a, b);
    this.meshPerAttribute = c || 1
}
;
THREE.InstancedInterleavedBuffer.prototype = Object.create(THREE.InterleavedBuffer.prototype);
THREE.InstancedInterleavedBuffer.prototype.constructor = THREE.InstancedInterleavedBuffer;
THREE.InstancedInterleavedBuffer.prototype.copy = function(a) {
    THREE.InterleavedBuffer.prototype.copy.call(this, a);
    this.meshPerAttribute = a.meshPerAttribute;
    return this
}
;
THREE.InterleavedBufferAttribute = function(a, b, c) {
    this.uuid = THREE.Math.generateUUID();
    this.data = a;
    this.itemSize = b;
    this.offset = c
}
;
THREE.InterleavedBufferAttribute.prototype = {
    constructor: THREE.InterleavedBufferAttribute,
    get length() {
        console.warn("THREE.BufferAttribute: .length has been deprecated. Please use .count.");
        return this.array.length
    },
    get count() {
        return this.data.count
    },
    setX: function(a, b) {
        this.data.array[a * this.data.stride + this.offset] = b;
        return this
    },
    setY: function(a, b) {
        this.data.array[a * this.data.stride + this.offset + 1] = b;
        return this
    },
    setZ: function(a, b) {
        this.data.array[a * this.data.stride + this.offset + 2] = b;
        return this
    },
    setW: function(a, b) {
        this.data.array[a * this.data.stride + this.offset + 3] = b;
        return this
    },
    getX: function(a) {
        return this.data.array[a * this.data.stride + this.offset]
    },
    getY: function(a) {
        return this.data.array[a * this.data.stride + this.offset + 1]
    },
    getZ: function(a) {
        return this.data.array[a * this.data.stride + this.offset + 2]
    },
    getW: function(a) {
        return this.data.array[a * this.data.stride + this.offset + 3]
    },
    setXY: function(a, b, c) {
        a = a * this.data.stride + this.offset;
        this.data.array[a + 0] = b;
        this.data.array[a + 1] = c;
        return this
    },
    setXYZ: function(a, b, c, d) {
        a = a * this.data.stride + this.offset;
        this.data.array[a + 0] = b;
        this.data.array[a + 1] = c;
        this.data.array[a + 2] = d;
        return this
    },
    setXYZW: function(a, b, c, d, e) {
        a = a * this.data.stride + this.offset;
        this.data.array[a + 0] = b;
        this.data.array[a + 1] = c;
        this.data.array[a + 2] = d;
        this.data.array[a + 3] = e;
        return this
    }
};
THREE.Geometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Geometry";
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingSphere = this.boundingBox = null;
    this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
}
;
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function(a) {
        for (var b = (new THREE.Matrix3).getNormalMatrix(a), c = 0, d = this.vertices.length; c < d; c++)
            this.vertices[c].applyMatrix4(a);
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            a = this.faces[c];
            a.normal.applyMatrix3(b).normalize();
            for (var e = 0, f = a.vertexNormals.length; e < f; e++)
                a.vertexNormals[e].applyMatrix3(b).normalize()
        }
        null !== this.boundingBox && this.computeBoundingBox();
        null !== this.boundingSphere && this.computeBoundingSphere();
        this.normalsNeedUpdate = this.verticesNeedUpdate = !0
    },
    rotateX: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationX(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    rotateY: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationY(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    rotateZ: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationZ(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    translate: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeTranslation(b, c, d);
            this.applyMatrix(a);
            return this
        }
    }(),
    scale: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeScale(b, c, d);
            this.applyMatrix(a);
            return this
        }
    }(),
    lookAt: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Object3D);
            a.lookAt(b);
            a.updateMatrix();
            this.applyMatrix(a.matrix)
        }
    }(),
    fromBufferGeometry: function(a) {
        function b(a, b, d) {
            var e = void 0 !== g ? [m[a].clone(), m[b].clone(), m[d].clone()] : []
              , f = void 0 !== h ? [c.colors[a].clone(), c.colors[b].clone(), c.colors[d].clone()] : []
              , e = new THREE.Face3(a,b,d,e,f);
            c.faces.push(e);
            void 0 !== k && c.faceVertexUvs[0].push([p[a].clone(), p[b].clone(), p[d].clone()]);
            void 0 !== l && c.faceVertexUvs[1].push([n[a].clone(), n[b].clone(), n[d].clone()])
        }
        var c = this
          , d = null !== a.index ? a.index.array : void 0
          , e = a.attributes
          , f = e.position.array
          , g = void 0 !== e.normal ? e.normal.array : void 0
          , h = void 0 !== e.color ? e.color.array : void 0
          , k = void 0 !== e.uv ? e.uv.array : void 0
          , l = void 0 !== e.uv2 ? e.uv2.array : void 0;
        void 0 !== l && (this.faceVertexUvs[1] = []);
        for (var m = [], p = [], n = [], q = e = 0; e < f.length; e += 3,
        q += 2)
            c.vertices.push(new THREE.Vector3(f[e],f[e + 1],f[e + 2])),
            void 0 !== g && m.push(new THREE.Vector3(g[e],g[e + 1],g[e + 2])),
            void 0 !== h && c.colors.push(new THREE.Color(h[e],h[e + 1],h[e + 2])),
            void 0 !== k && p.push(new THREE.Vector2(k[q],k[q + 1])),
            void 0 !== l && n.push(new THREE.Vector2(l[q],l[q + 1]));
        if (void 0 !== d)
            if (f = a.groups,
            0 < f.length)
                for (e = 0; e < f.length; e++)
                    for (var q = f[e], u = q.start, t = q.count, q = u, u = u + t; q < u; q += 3)
                        b(d[q], d[q + 1], d[q + 2]);
            else
                for (e = 0; e < d.length; e += 3)
                    b(d[e], d[e + 1], d[e + 2]);
        else
            for (e = 0; e < f.length / 3; e += 3)
                b(e, e + 1, e + 2);
        this.computeFaceNormals();
        null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
        null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
        return this
    },
    center: function() {
        this.computeBoundingBox();
        var a = this.boundingBox.center().negate();
        this.translate(a.x, a.y, a.z);
        return a
    },
    normalize: function() {
        this.computeBoundingSphere();
        var a = this.boundingSphere.center
          , b = this.boundingSphere.radius
          , b = 0 === b ? 1 : 1 / b
          , c = new THREE.Matrix4;
        c.set(b, 0, 0, -b * a.x, 0, b, 0, -b * a.y, 0, 0, b, -b * a.z, 0, 0, 0, 1);
        this.applyMatrix(c);
        return this
    },
    computeFaceNormals: function() {
        for (var a = new THREE.Vector3, b = new THREE.Vector3, c = 0, d = this.faces.length; c < d; c++) {
            var e = this.faces[c]
              , f = this.vertices[e.a]
              , g = this.vertices[e.b];
            a.subVectors(this.vertices[e.c], g);
            b.subVectors(f, g);
            a.cross(b);
            a.normalize();
            e.normal.copy(a)
        }
    },
    computeVertexNormals: function(a) {
        var b, c, d;
        d = Array(this.vertices.length);
        b = 0;
        for (c = this.vertices.length; b < c; b++)
            d[b] = new THREE.Vector3;
        if (a) {
            var e, f, g, h = new THREE.Vector3, k = new THREE.Vector3;
            a = 0;
            for (b = this.faces.length; a < b; a++)
                c = this.faces[a],
                e = this.vertices[c.a],
                f = this.vertices[c.b],
                g = this.vertices[c.c],
                h.subVectors(g, f),
                k.subVectors(e, f),
                h.cross(k),
                d[c.a].add(h),
                d[c.b].add(h),
                d[c.c].add(h)
        } else
            for (a = 0,
            b = this.faces.length; a < b; a++)
                c = this.faces[a],
                d[c.a].add(c.normal),
                d[c.b].add(c.normal),
                d[c.c].add(c.normal);
        b = 0;
        for (c = this.vertices.length; b < c; b++)
            d[b].normalize();
        a = 0;
        for (b = this.faces.length; a < b; a++)
            c = this.faces[a],
            e = c.vertexNormals,
            3 === e.length ? (e[0].copy(d[c.a]),
            e[1].copy(d[c.b]),
            e[2].copy(d[c.c])) : (e[0] = d[c.a].clone(),
            e[1] = d[c.b].clone(),
            e[2] = d[c.c].clone())
    },
    computeMorphNormals: function() {
        var a, b, c, d, e;
        c = 0;
        for (d = this.faces.length; c < d; c++)
            for (e = this.faces[c],
            e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone(),
            e.__originalVertexNormals || (e.__originalVertexNormals = []),
            a = 0,
            b = e.vertexNormals.length; a < b; a++)
                e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone();
        var f = new THREE.Geometry;
        f.faces = this.faces;
        a = 0;
        for (b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {};
                this.morphNormals[a].faceNormals = [];
                this.morphNormals[a].vertexNormals = [];
                e = this.morphNormals[a].faceNormals;
                var g = this.morphNormals[a].vertexNormals, h, k;
                c = 0;
                for (d = this.faces.length; c < d; c++)
                    h = new THREE.Vector3,
                    k = {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3,
                        c: new THREE.Vector3
                    },
                    e.push(h),
                    g.push(k)
            }
            g = this.morphNormals[a];
            f.vertices = this.morphTargets[a].vertices;
            f.computeFaceNormals();
            f.computeVertexNormals();
            c = 0;
            for (d = this.faces.length; c < d; c++)
                e = this.faces[c],
                h = g.faceNormals[c],
                k = g.vertexNormals[c],
                h.copy(e.normal),
                k.a.copy(e.vertexNormals[0]),
                k.b.copy(e.vertexNormals[1]),
                k.c.copy(e.vertexNormals[2])
        }
        c = 0;
        for (d = this.faces.length; c < d; c++)
            e = this.faces[c],
            e.normal = e.__originalFaceNormal,
            e.vertexNormals = e.__originalVertexNormals
    },
    computeTangents: function() {
        console.warn("THREE.Geometry: .computeTangents() has been removed.")
    },
    computeLineDistances: function() {
        for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++)
            0 < c && (a += b[c].distanceTo(b[c - 1])),
            this.lineDistances[c] = a
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
        this.boundingSphere.setFromPoints(this.vertices)
    },
    merge: function(a, b, c) {
        if (!1 === a instanceof THREE.Geometry)
            console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", a);
        else {
            var d, e = this.vertices.length, f = this.vertices, g = a.vertices, h = this.faces, k = a.faces, l = this.faceVertexUvs[0];
            a = a.faceVertexUvs[0];
            void 0 === c && (c = 0);
            void 0 !== b && (d = (new THREE.Matrix3).getNormalMatrix(b));
            for (var m = 0, p = g.length; m < p; m++) {
                var n = g[m].clone();
                void 0 !== b && n.applyMatrix4(b);
                f.push(n)
            }
            m = 0;
            for (p = k.length; m < p; m++) {
                var g = k[m], q, u = g.vertexNormals, t = g.vertexColors, n = new THREE.Face3(g.a + e,g.b + e,g.c + e);
                n.normal.copy(g.normal);
                void 0 !== d && n.normal.applyMatrix3(d).normalize();
                b = 0;
                for (f = u.length; b < f; b++)
                    q = u[b].clone(),
                    void 0 !== d && q.applyMatrix3(d).normalize(),
                    n.vertexNormals.push(q);
                n.color.copy(g.color);
                b = 0;
                for (f = t.length; b < f; b++)
                    q = t[b],
                    n.vertexColors.push(q.clone());
                n.materialIndex = g.materialIndex + c;
                h.push(n)
            }
            m = 0;
            for (p = a.length; m < p; m++)
                if (c = a[m],
                d = [],
                void 0 !== c) {
                    b = 0;
                    for (f = c.length; b < f; b++)
                        d.push(c[b].clone());
                    l.push(d)
                }
        }
    },
    mergeMesh: function(a) {
        !1 === a instanceof THREE.Mesh ? console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", a) : (a.matrixAutoUpdate && a.updateMatrix(),
        this.merge(a.geometry, a.matrix))
    },
    mergeVertices: function() {
        var a = {}, b = [], c = [], d, e = Math.pow(10, 4), f, g;
        f = 0;
        for (g = this.vertices.length; f < g; f++)
            d = this.vertices[f],
            d = Math.round(d.x * e) + "_" + Math.round(d.y * e) + "_" + Math.round(d.z * e),
            void 0 === a[d] ? (a[d] = f,
            b.push(this.vertices[f]),
            c[f] = b.length - 1) : c[f] = c[a[d]];
        a = [];
        f = 0;
        for (g = this.faces.length; f < g; f++)
            for (e = this.faces[f],
            e.a = c[e.a],
            e.b = c[e.b],
            e.c = c[e.c],
            e = [e.a, e.b, e.c],
            d = 0; 3 > d; d++)
                if (e[d] === e[(d + 1) % 3]) {
                    a.push(f);
                    break
                }
        for (f = a.length - 1; 0 <= f; f--)
            for (e = a[f],
            this.faces.splice(e, 1),
            c = 0,
            g = this.faceVertexUvs.length; c < g; c++)
                this.faceVertexUvs[c].splice(e, 1);
        f = this.vertices.length - b.length;
        this.vertices = b;
        return f
    },
    sortFacesByMaterialIndex: function() {
        for (var a = this.faces, b = a.length, c = 0; c < b; c++)
            a[c]._id = c;
        a.sort(function(a, b) {
            return a.materialIndex - b.materialIndex
        });
        var d = this.faceVertexUvs[0], e = this.faceVertexUvs[1], f, g;
        d && d.length === b && (f = []);
        e && e.length === b && (g = []);
        for (c = 0; c < b; c++) {
            var h = a[c]._id;
            f && f.push(d[h]);
            g && g.push(e[h])
        }
        f && (this.faceVertexUvs[0] = f);
        g && (this.faceVertexUvs[1] = g)
    },
    toJSON: function() {
        function a(a, b, c) {
            return c ? a | 1 << b : a & ~(1 << b)
        }
        function b(a) {
            var b = a.x.toString() + a.y.toString() + a.z.toString();
            if (void 0 !== l[b])
                return l[b];
            l[b] = k.length / 3;
            k.push(a.x, a.y, a.z);
            return l[b]
        }
        function c(a) {
            var b = a.r.toString() + a.g.toString() + a.b.toString();
            if (void 0 !== p[b])
                return p[b];
            p[b] = m.length;
            m.push(a.getHex());
            return p[b]
        }
        function d(a) {
            var b = a.x.toString() + a.y.toString();
            if (void 0 !== q[b])
                return q[b];
            q[b] = n.length / 2;
            n.push(a.x, a.y);
            return q[b]
        }
        var e = {
            metadata: {
                version: 4.4,
                type: "Geometry",
                generator: "Geometry.toJSON"
            }
        };
        e.uuid = this.uuid;
        e.type = this.type;
        "" !== this.name && (e.name = this.name);
        if (void 0 !== this.parameters) {
            var f = this.parameters, g;
            for (g in f)
                void 0 !== f[g] && (e[g] = f[g]);
            return e
        }
        f = [];
        for (g = 0; g < this.vertices.length; g++) {
            var h = this.vertices[g];
            f.push(h.x, h.y, h.z)
        }
        var h = []
          , k = []
          , l = {}
          , m = []
          , p = {}
          , n = []
          , q = {};
        for (g = 0; g < this.faces.length; g++) {
            var u = this.faces[g]
              , t = void 0 !== this.faceVertexUvs[0][g]
              , w = 0 < u.normal.length()
              , v = 0 < u.vertexNormals.length
              , x = 1 !== u.color.r || 1 !== u.color.g || 1 !== u.color.b
              , E = 0 < u.vertexColors.length
              , y = 0
              , y = a(y, 0, 0)
              , y = a(y, 1, !0)
              , y = a(y, 2, !1)
              , y = a(y, 3, t)
              , y = a(y, 4, w)
              , y = a(y, 5, v)
              , y = a(y, 6, x)
              , y = a(y, 7, E);
            h.push(y);
            h.push(u.a, u.b, u.c);
            h.push(u.materialIndex);
            t && (t = this.faceVertexUvs[0][g],
            h.push(d(t[0]), d(t[1]), d(t[2])));
            w && h.push(b(u.normal));
            v && (w = u.vertexNormals,
            h.push(b(w[0]), b(w[1]), b(w[2])));
            x && h.push(c(u.color));
            E && (u = u.vertexColors,
            h.push(c(u[0]), c(u[1]), c(u[2])))
        }
        e.data = {};
        e.data.vertices = f;
        e.data.normals = k;
        0 < m.length && (e.data.colors = m);
        0 < n.length && (e.data.uvs = [n]);
        e.data.faces = h;
        return e
    },
    clone: function() {
        return (new THREE.Geometry).copy(this)
    },
    copy: function(a) {
        this.vertices = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        for (var b = a.vertices, c = 0, d = b.length; c < d; c++)
            this.vertices.push(b[c].clone());
        b = a.faces;
        c = 0;
        for (d = b.length; c < d; c++)
            this.faces.push(b[c].clone());
        c = 0;
        for (d = a.faceVertexUvs.length; c < d; c++) {
            b = a.faceVertexUvs[c];
            void 0 === this.faceVertexUvs[c] && (this.faceVertexUvs[c] = []);
            for (var e = 0, f = b.length; e < f; e++) {
                for (var g = b[e], h = [], k = 0, l = g.length; k < l; k++)
                    h.push(g[k].clone());
                this.faceVertexUvs[c].push(h)
            }
        }
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);
THREE.GeometryIdCount = 0;
THREE.DirectGeometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "DirectGeometry";
    this.indices = [];
    this.vertices = [];
    this.normals = [];
    this.colors = [];
    this.uvs = [];
    this.uvs2 = [];
    this.groups = [];
    this.morphTargets = {};
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1
}
;
THREE.DirectGeometry.prototype = {
    constructor: THREE.DirectGeometry,
    computeBoundingBox: THREE.Geometry.prototype.computeBoundingBox,
    computeBoundingSphere: THREE.Geometry.prototype.computeBoundingSphere,
    computeFaceNormals: function() {
        console.warn("THREE.DirectGeometry: computeFaceNormals() is not a method of this type of geometry.")
    },
    computeVertexNormals: function() {
        console.warn("THREE.DirectGeometry: computeVertexNormals() is not a method of this type of geometry.")
    },
    computeGroups: function(a) {
        var b, c = [], d;
        a = a.faces;
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            f.materialIndex !== d && (d = f.materialIndex,
            void 0 !== b && (b.count = 3 * e - b.start,
            c.push(b)),
            b = {
                start: 3 * e,
                materialIndex: d
            })
        }
        void 0 !== b && (b.count = 3 * e - b.start,
        c.push(b));
        this.groups = c
    },
    fromGeometry: function(a) {
        var b = a.faces
          , c = a.vertices
          , d = a.faceVertexUvs
          , e = d[0] && 0 < d[0].length
          , f = d[1] && 0 < d[1].length
          , g = a.morphTargets
          , h = g.length;
        if (0 < h) {
            for (var k = [], l = 0; l < h; l++)
                k[l] = [];
            this.morphTargets.position = k
        }
        var m = a.morphNormals
          , p = m.length;
        if (0 < p) {
            for (var n = [], l = 0; l < p; l++)
                n[l] = [];
            this.morphTargets.normal = n
        }
        for (var q = a.skinIndices, u = a.skinWeights, t = q.length === c.length, w = u.length === c.length, l = 0; l < b.length; l++) {
            var v = b[l];
            this.vertices.push(c[v.a], c[v.b], c[v.c]);
            var x = v.vertexNormals;
            3 === x.length ? this.normals.push(x[0], x[1], x[2]) : (x = v.normal,
            this.normals.push(x, x, x));
            x = v.vertexColors;
            3 === x.length ? this.colors.push(x[0], x[1], x[2]) : (x = v.color,
            this.colors.push(x, x, x));
            !0 === e && (x = d[0][l],
            void 0 !== x ? this.uvs.push(x[0], x[1], x[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", l),
            this.uvs.push(new THREE.Vector2, new THREE.Vector2, new THREE.Vector2)));
            !0 === f && (x = d[1][l],
            void 0 !== x ? this.uvs2.push(x[0], x[1], x[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", l),
            this.uvs2.push(new THREE.Vector2, new THREE.Vector2, new THREE.Vector2)));
            for (x = 0; x < h; x++) {
                var E = g[x].vertices;
                k[x].push(E[v.a], E[v.b], E[v.c])
            }
            for (x = 0; x < p; x++)
                E = m[x].vertexNormals[l],
                n[x].push(E.a, E.b, E.c);
            t && this.skinIndices.push(q[v.a], q[v.b], q[v.c]);
            w && this.skinWeights.push(u[v.a], u[v.b], u[v.c])
        }
        this.computeGroups(a);
        this.verticesNeedUpdate = a.verticesNeedUpdate;
        this.normalsNeedUpdate = a.normalsNeedUpdate;
        this.colorsNeedUpdate = a.colorsNeedUpdate;
        this.uvsNeedUpdate = a.uvsNeedUpdate;
        this.groupsNeedUpdate = a.groupsNeedUpdate;
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.EventDispatcher.prototype.apply(THREE.DirectGeometry.prototype);
THREE.BufferGeometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "BufferGeometry";
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingSphere = this.boundingBox = null;
    this.drawRange = {
        start: 0,
        count: Infinity
    }
}
;
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    addIndex: function(a) {
        console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");
        this.setIndex(a)
    },
    getIndex: function() {
        return this.index
    },
    setIndex: function(a) {
        this.index = a
    },
    addAttribute: function(a, b, c) {
        !1 === b instanceof THREE.BufferAttribute && !1 === b instanceof THREE.InterleavedBufferAttribute ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),
        this.addAttribute(a, new THREE.BufferAttribute(b,c))) : "index" === a ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),
        this.setIndex(b)) : this.attributes[a] = b
    },
    getAttribute: function(a) {
        return this.attributes[a]
    },
    removeAttribute: function(a) {
        delete this.attributes[a]
    },
    get drawcalls() {
        console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");
        return this.groups
    },
    get offsets() {
        console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");
        return this.groups
    },
    addDrawCall: function(a, b, c) {
        void 0 !== c && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");
        console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");
        this.addGroup(a, b)
    },
    clearDrawCalls: function() {
        console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");
        this.clearGroups()
    },
    addGroup: function(a, b, c) {
        this.groups.push({
            start: a,
            count: b,
            materialIndex: void 0 !== c ? c : 0
        })
    },
    clearGroups: function() {
        this.groups = []
    },
    setDrawRange: function(a, b) {
        this.drawRange.start = a;
        this.drawRange.count = b
    },
    applyMatrix: function(a) {
        var b = this.attributes.position;
        void 0 !== b && (a.applyToVector3Array(b.array),
        b.needsUpdate = !0);
        b = this.attributes.normal;
        void 0 !== b && ((new THREE.Matrix3).getNormalMatrix(a).applyToVector3Array(b.array),
        b.needsUpdate = !0);
        null !== this.boundingBox && this.computeBoundingBox();
        null !== this.boundingSphere && this.computeBoundingSphere()
    },
    rotateX: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationX(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    rotateY: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationY(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    rotateZ: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeRotationZ(b);
            this.applyMatrix(a);
            return this
        }
    }(),
    translate: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeTranslation(b, c, d);
            this.applyMatrix(a);
            return this
        }
    }(),
    scale: function() {
        var a;
        return function(b, c, d) {
            void 0 === a && (a = new THREE.Matrix4);
            a.makeScale(b, c, d);
            this.applyMatrix(a);
            return this
        }
    }(),
    lookAt: function() {
        var a;
        return function(b) {
            void 0 === a && (a = new THREE.Object3D);
            a.lookAt(b);
            a.updateMatrix();
            this.applyMatrix(a.matrix)
        }
    }(),
    center: function() {
        this.computeBoundingBox();
        var a = this.boundingBox.center().negate();
        this.translate(a.x, a.y, a.z);
        return a
    },
    setFromObject: function(a) {
        var b = a.geometry;
        if (a instanceof THREE.Points || a instanceof THREE.Line) {
            a = new THREE.Float32Attribute(3 * b.vertices.length,3);
            var c = new THREE.Float32Attribute(3 * b.colors.length,3);
            this.addAttribute("position", a.copyVector3sArray(b.vertices));
            this.addAttribute("color", c.copyColorsArray(b.colors));
            b.lineDistances && b.lineDistances.length === b.vertices.length && (a = new THREE.Float32Attribute(b.lineDistances.length,1),
            this.addAttribute("lineDistance", a.copyArray(b.lineDistances)));
            null !== b.boundingSphere && (this.boundingSphere = b.boundingSphere.clone());
            null !== b.boundingBox && (this.boundingBox = b.boundingBox.clone())
        } else
            a instanceof THREE.Mesh && b instanceof THREE.Geometry && this.fromGeometry(b);
        return this
    },
    updateFromObject: function(a) {
        var b = a.geometry;
        if (a instanceof THREE.Mesh) {
            var c = b.__directGeometry;
            if (void 0 === c)
                return this.fromGeometry(b);
            c.verticesNeedUpdate = b.verticesNeedUpdate;
            c.normalsNeedUpdate = b.normalsNeedUpdate;
            c.colorsNeedUpdate = b.colorsNeedUpdate;
            c.uvsNeedUpdate = b.uvsNeedUpdate;
            c.groupsNeedUpdate = b.groupsNeedUpdate;
            b.verticesNeedUpdate = !1;
            b.normalsNeedUpdate = !1;
            b.colorsNeedUpdate = !1;
            b.uvsNeedUpdate = !1;
            b.groupsNeedUpdate = !1;
            b = c
        }
        !0 === b.verticesNeedUpdate && (c = this.attributes.position,
        void 0 !== c && (c.copyVector3sArray(b.vertices),
        c.needsUpdate = !0),
        b.verticesNeedUpdate = !1);
        !0 === b.normalsNeedUpdate && (c = this.attributes.normal,
        void 0 !== c && (c.copyVector3sArray(b.normals),
        c.needsUpdate = !0),
        b.normalsNeedUpdate = !1);
        !0 === b.colorsNeedUpdate && (c = this.attributes.color,
        void 0 !== c && (c.copyColorsArray(b.colors),
        c.needsUpdate = !0),
        b.colorsNeedUpdate = !1);
        b.uvsNeedUpdate && (c = this.attributes.uv,
        void 0 !== c && (c.copyVector2sArray(b.uvs),
        c.needsUpdate = !0),
        b.uvsNeedUpdate = !1);
        b.lineDistancesNeedUpdate && (c = this.attributes.lineDistance,
        void 0 !== c && (c.copyArray(b.lineDistances),
        c.needsUpdate = !0),
        b.lineDistancesNeedUpdate = !1);
        b.groupsNeedUpdate && (b.computeGroups(a.geometry),
        this.groups = b.groups,
        b.groupsNeedUpdate = !1);
        return this
    },
    fromGeometry: function(a) {
        a.__directGeometry = (new THREE.DirectGeometry).fromGeometry(a);
        return this.fromDirectGeometry(a.__directGeometry)
    },
    fromDirectGeometry: function(a) {
        var b = new Float32Array(3 * a.vertices.length);
        this.addAttribute("position", (new THREE.BufferAttribute(b,3)).copyVector3sArray(a.vertices));
        0 < a.normals.length && (b = new Float32Array(3 * a.normals.length),
        this.addAttribute("normal", (new THREE.BufferAttribute(b,3)).copyVector3sArray(a.normals)));
        0 < a.colors.length && (b = new Float32Array(3 * a.colors.length),
        this.addAttribute("color", (new THREE.BufferAttribute(b,3)).copyColorsArray(a.colors)));
        0 < a.uvs.length && (b = new Float32Array(2 * a.uvs.length),
        this.addAttribute("uv", (new THREE.BufferAttribute(b,2)).copyVector2sArray(a.uvs)));
        0 < a.uvs2.length && (b = new Float32Array(2 * a.uvs2.length),
        this.addAttribute("uv2", (new THREE.BufferAttribute(b,2)).copyVector2sArray(a.uvs2)));
        0 < a.indices.length && (b = new (65535 < a.vertices.length ? Uint32Array : Uint16Array)(3 * a.indices.length),
        this.setIndex((new THREE.BufferAttribute(b,1)).copyIndicesArray(a.indices)));
        this.groups = a.groups;
        for (var c in a.morphTargets) {
            for (var b = [], d = a.morphTargets[c], e = 0, f = d.length; e < f; e++) {
                var g = d[e]
                  , h = new THREE.Float32Attribute(3 * g.length,3);
                b.push(h.copyVector3sArray(g))
            }
            this.morphAttributes[c] = b
        }
        0 < a.skinIndices.length && (c = new THREE.Float32Attribute(4 * a.skinIndices.length,4),
        this.addAttribute("skinIndex", c.copyVector4sArray(a.skinIndices)));
        0 < a.skinWeights.length && (c = new THREE.Float32Attribute(4 * a.skinWeights.length,4),
        this.addAttribute("skinWeight", c.copyVector4sArray(a.skinWeights)));
        null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
        null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
        return this
    },
    computeBoundingBox: function() {
        var a = new THREE.Vector3;
        return function() {
            null === this.boundingBox && (this.boundingBox = new THREE.Box3);
            var b = this.attributes.position.array;
            if (b) {
                var c = this.boundingBox;
                c.makeEmpty();
                for (var d = 0, e = b.length; d < e; d += 3)
                    a.fromArray(b, d),
                    c.expandByPoint(a)
            }
            if (void 0 === b || 0 === b.length)
                this.boundingBox.min.set(0, 0, 0),
                this.boundingBox.max.set(0, 0, 0);
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        }
    }(),
    computeBoundingSphere: function() {
        var a = new THREE.Box3
          , b = new THREE.Vector3;
        return function() {
            null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
            var c = this.attributes.position.array;
            if (c) {
                a.makeEmpty();
                for (var d = this.boundingSphere.center, e = 0, f = c.length; e < f; e += 3)
                    b.fromArray(c, e),
                    a.expandByPoint(b);
                a.center(d);
                for (var g = 0, e = 0, f = c.length; e < f; e += 3)
                    b.fromArray(c, e),
                    g = Math.max(g, d.distanceToSquared(b));
                this.boundingSphere.radius = Math.sqrt(g);
                isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
            }
        }
    }(),
    computeFaceNormals: function() {},
    computeVertexNormals: function() {
        var a = this.index
          , b = this.attributes
          , c = this.groups;
        if (b.position) {
            var d = b.position.array;
            if (void 0 === b.normal)
                this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(d.length),3));
            else
                for (var e = b.normal.array, f = 0, g = e.length; f < g; f++)
                    e[f] = 0;
            var e = b.normal.array, h, k, l, m = new THREE.Vector3, p = new THREE.Vector3, n = new THREE.Vector3, q = new THREE.Vector3, u = new THREE.Vector3;
            if (a) {
                a = a.array;
                0 === c.length && this.addGroup(0, a.length);
                for (var t = 0, w = c.length; t < w; ++t)
                    for (f = c[t],
                    g = f.start,
                    h = f.count,
                    f = g,
                    g += h; f < g; f += 3)
                        h = 3 * a[f + 0],
                        k = 3 * a[f + 1],
                        l = 3 * a[f + 2],
                        m.fromArray(d, h),
                        p.fromArray(d, k),
                        n.fromArray(d, l),
                        q.subVectors(n, p),
                        u.subVectors(m, p),
                        q.cross(u),
                        e[h] += q.x,
                        e[h + 1] += q.y,
                        e[h + 2] += q.z,
                        e[k] += q.x,
                        e[k + 1] += q.y,
                        e[k + 2] += q.z,
                        e[l] += q.x,
                        e[l + 1] += q.y,
                        e[l + 2] += q.z
            } else
                for (f = 0,
                g = d.length; f < g; f += 9)
                    m.fromArray(d, f),
                    p.fromArray(d, f + 3),
                    n.fromArray(d, f + 6),
                    q.subVectors(n, p),
                    u.subVectors(m, p),
                    q.cross(u),
                    e[f] = q.x,
                    e[f + 1] = q.y,
                    e[f + 2] = q.z,
                    e[f + 3] = q.x,
                    e[f + 4] = q.y,
                    e[f + 5] = q.z,
                    e[f + 6] = q.x,
                    e[f + 7] = q.y,
                    e[f + 8] = q.z;
            this.normalizeNormals();
            b.normal.needsUpdate = !0
        }
    },
    computeTangents: function() {
        console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
    },
    computeOffsets: function(a) {
        console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
    },
    merge: function(a, b) {
        if (!1 === a instanceof THREE.BufferGeometry)
            console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", a);
        else {
            void 0 === b && (b = 0);
            var c = this.attributes, d;
            for (d in c)
                if (void 0 !== a.attributes[d])
                    for (var e = c[d].array, f = a.attributes[d], g = f.array, h = 0, f = f.itemSize * b; h < g.length; h++,
                    f++)
                        e[f] = g[h];
            return this
        }
    },
    normalizeNormals: function() {
        for (var a = this.attributes.normal.array, b, c, d, e = 0, f = a.length; e < f; e += 3)
            b = a[e],
            c = a[e + 1],
            d = a[e + 2],
            b = 1 / Math.sqrt(b * b + c * c + d * d),
            a[e] *= b,
            a[e + 1] *= b,
            a[e + 2] *= b
    },
    toJSON: function() {
        var a = {
            metadata: {
                version: 4.4,
                type: "BufferGeometry",
                generator: "BufferGeometry.toJSON"
            }
        };
        a.uuid = this.uuid;
        a.type = this.type;
        "" !== this.name && (a.name = this.name);
        if (void 0 !== this.parameters) {
            var b = this.parameters, c;
            for (c in b)
                void 0 !== b[c] && (a[c] = b[c]);
            return a
        }
        a.data = {
            attributes: {}
        };
        var d = this.index;
        null !== d && (b = Array.prototype.slice.call(d.array),
        a.data.index = {
            type: d.array.constructor.name,
            array: b
        });
        d = this.attributes;
        for (c in d) {
            var e = d[c]
              , b = Array.prototype.slice.call(e.array);
            a.data.attributes[c] = {
                itemSize: e.itemSize,
                type: e.array.constructor.name,
                array: b
            }
        }
        c = this.groups;
        0 < c.length && (a.data.groups = JSON.parse(JSON.stringify(c)));
        c = this.boundingSphere;
        null !== c && (a.data.boundingSphere = {
            center: c.center.toArray(),
            radius: c.radius
        });
        return a
    },
    clone: function() {
        return (new THREE.BufferGeometry).copy(this)
    },
    copy: function(a) {
        var b = a.index;
        null !== b && this.setIndex(b.clone());
        var b = a.attributes, c;
        for (c in b)
            this.addAttribute(c, b[c].clone());
        a = a.groups;
        c = 0;
        for (b = a.length; c < b; c++) {
            var d = a[c];
            this.addGroup(d.start, d.count)
        }
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);
THREE.BufferGeometry.MaxIndex = 65535;
THREE.InstancedBufferGeometry = function() {
    THREE.BufferGeometry.call(this);
    this.type = "InstancedBufferGeometry";
    this.maxInstancedCount = void 0
}
;
THREE.InstancedBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.InstancedBufferGeometry.prototype.constructor = THREE.InstancedBufferGeometry;
THREE.InstancedBufferGeometry.prototype.addGroup = function(a, b, c) {
    this.groups.push({
        start: a,
        count: b,
        instances: c
    })
}
;
THREE.InstancedBufferGeometry.prototype.copy = function(a) {
    var b = a.index;
    null !== b && this.setIndex(b.clone());
    var b = a.attributes, c;
    for (c in b)
        this.addAttribute(c, b[c].clone());
    a = a.groups;
    c = 0;
    for (b = a.length; c < b; c++) {
        var d = a[c];
        this.addGroup(d.start, d.count, d.instances)
    }
    return this
}
;
THREE.EventDispatcher.prototype.apply(THREE.InstancedBufferGeometry.prototype);
THREE.Uniform = function(a, b) {
    this.type = a;
    this.value = b;
    this.dynamic = !1
}
;
THREE.Uniform.prototype = {
    constructor: THREE.Uniform,
    onUpdate: function(a) {
        this.dynamic = !0;
        this.onUpdateCallback = a;
        return this
    }
};
THREE.AnimationClip = function(a, b, c) {
    this.name = a || THREE.Math.generateUUID();
    this.tracks = c;
    this.duration = void 0 !== b ? b : -1;
    0 > this.duration && this.resetDuration();
    this.trim();
    this.optimize()
}
;
THREE.AnimationClip.prototype = {
    constructor: THREE.AnimationClip,
    resetDuration: function() {
        for (var a = 0, b = 0, c = this.tracks.length; b !== c; ++b)
            var d = this.tracks[b]
              , a = Math.max(a, d.times[d.times.length - 1]);
        this.duration = a
    },
    trim: function() {
        for (var a = 0; a < this.tracks.length; a++)
            this.tracks[a].trim(0, this.duration);
        return this
    },
    optimize: function() {
        for (var a = 0; a < this.tracks.length; a++)
            this.tracks[a].optimize();
        return this
    }
};
Object.assign(THREE.AnimationClip, {
    parse: function(a) {
        for (var b = [], c = a.tracks, d = 1 / (a.fps || 1), e = 0, f = c.length; e !== f; ++e)
            b.push(THREE.KeyframeTrack.parse(c[e]).scale(d));
        return new THREE.AnimationClip(a.name,a.duration,b)
    },
    toJSON: function(a) {
        var b = []
          , c = a.tracks;
        a = {
            name: a.name,
            duration: a.duration,
            tracks: b
        };
        for (var d = 0, e = c.length; d !== e; ++d)
            b.push(THREE.KeyframeTrack.toJSON(c[d]));
        return a
    },
    CreateFromMorphTargetSequence: function(a, b, c) {
        for (var d = b.length, e = [], f = 0; f < d; f++) {
            var g = []
              , h = [];
            g.push((f + d - 1) % d, f, (f + 1) % d);
            h.push(0, 1, 0);
            var k = THREE.AnimationUtils.getKeyframeOrder(g)
              , g = THREE.AnimationUtils.sortedArray(g, 1, k)
              , h = THREE.AnimationUtils.sortedArray(h, 1, k);
            0 === g[0] && (g.push(d),
            h.push(h[0]));
            e.push((new THREE.NumberKeyframeTrack(".morphTargetInfluences[" + b[f].name + "]",g,h)).scale(1 / c))
        }
        return new THREE.AnimationClip(a,-1,e)
    },
    findByName: function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].name === b)
                return a[c];
        return null
    },
    CreateClipsFromMorphTargetSequences: function(a, b) {
        for (var c = {}, d = /^([\w-]*?)([\d]+)$/, e = 0, f = a.length; e < f; e++) {
            var g = a[e]
              , h = g.name.match(d);
            if (h && 1 < h.length) {
                var k = h[1];
                (h = c[k]) || (c[k] = h = []);
                h.push(g)
            }
        }
        d = [];
        for (k in c)
            d.push(THREE.AnimationClip.CreateFromMorphTargetSequence(k, c[k], b));
        return d
    },
    parseAnimation: function(a, b, c) {
        if (!a)
            return console.error("  no animation in JSONLoader data"),
            null;
        c = function(a, b, c, d, e) {
            if (0 !== c.length) {
                var f = []
                  , g = [];
                THREE.AnimationUtils.flattenJSON(c, f, g, d);
                0 !== f.length && e.push(new a(b,f,g))
            }
        }
        ;
        var d = []
          , e = a.name || "default"
          , f = a.length || -1
          , g = a.fps || 30;
        a = a.hierarchy || [];
        for (var h = 0; h < a.length; h++) {
            var k = a[h].keys;
            if (k && 0 != k.length)
                if (k[0].morphTargets) {
                    for (var f = {}, l = 0; l < k.length; l++)
                        if (k[l].morphTargets)
                            for (var m = 0; m < k[l].morphTargets.length; m++)
                                f[k[l].morphTargets[m]] = -1;
                    for (var p in f) {
                        for (var n = [], q = [], m = 0; m !== k[l].morphTargets.length; ++m) {
                            var u = k[l];
                            n.push(u.time);
                            q.push(u.morphTarget === p ? 1 : 0)
                        }
                        d.push(new THREE.NumberKeyframeTrack(".morphTargetInfluence[" + p + "]",n,q))
                    }
                    f = f.length * (g || 1)
                } else
                    l = ".bones[" + b[h].name + "]",
                    c(THREE.VectorKeyframeTrack, l + ".position", k, "pos", d),
                    c(THREE.QuaternionKeyframeTrack, l + ".quaternion", k, "rot", d),
                    c(THREE.VectorKeyframeTrack, l + ".scale", k, "scl", d)
        }
        return 0 === d.length ? null : new THREE.AnimationClip(e,f,d)
    }
});
THREE.AnimationMixer = function(a) {
    this._root = a;
    this._initMemoryManager();
    this.time = this._accuIndex = 0;
    this.timeScale = 1
}
;
THREE.AnimationMixer.prototype = {
    constructor: THREE.AnimationMixer,
    clipAction: function(a, b) {
        var c = (b || this._root).uuid, d = "string" === typeof a ? a : a.name, e = a !== d ? a : null, f = this._actionsByClip[d], g;
        if (void 0 !== f) {
            g = f.actionByRoot[c];
            if (void 0 !== g)
                return g;
            g = f.knownActions[0];
            e = g._clip;
            if (a !== d && a !== e)
                throw Error("Different clips with the same name detected!");
        }
        if (null === e)
            return null;
        f = new THREE.AnimationMixer._Action(this,e,b);
        this._bindAction(f, g);
        this._addInactiveAction(f, d, c);
        return f
    },
    existingAction: function(a, b) {
        var c = (b || this._root).uuid
          , d = this._actionsByClip["string" === typeof a ? a : a.name];
        return void 0 !== d ? d.actionByRoot[c] || null : null
    },
    stopAllAction: function() {
        for (var a = this._actions, b = this._nActiveActions, c = this._bindings, d = this._nActiveBindings, e = this._nActiveBindings = this._nActiveActions = 0; e !== b; ++e)
            a[e].reset();
        for (e = 0; e !== d; ++e)
            c[e].useCount = 0;
        return this
    },
    update: function(a) {
        a *= this.timeScale;
        for (var b = this._actions, c = this._nActiveActions, d = this.time += a, e = Math.sign(a), f = this._accuIndex ^= 1, g = 0; g !== c; ++g) {
            var h = b[g];
            h.enabled && h._update(d, a, e, f)
        }
        a = this._bindings;
        b = this._nActiveBindings;
        for (g = 0; g !== b; ++g)
            a[g].apply(f);
        return this
    },
    getRoot: function() {
        return this._root
    },
    uncacheClip: function(a) {
        var b = this._actions;
        a = a.name;
        var c = this._actionsByClip
          , d = c[a];
        if (void 0 !== d) {
            for (var d = d.knownActions, e = 0, f = d.length; e !== f; ++e) {
                var g = d[e];
                this._deactivateAction(g);
                var h = g._cacheIndex
                  , k = b[b.length - 1];
                g._cacheIndex = null;
                g._byClipCacheIndex = null;
                k._cacheIndex = h;
                b[h] = k;
                b.pop();
                this._removeInactiveBindingsForAction(g)
            }
            delete c[a]
        }
    },
    uncacheRoot: function(a) {
        a = a.uuid;
        var b = this._actionsByClip, c;
        for (c in b) {
            var d = b[c].actionByRoot[a];
            void 0 !== d && (this._deactivateAction(d),
            this._removeInactiveAction(d))
        }
        c = this._bindingsByRootAndName[a];
        if (void 0 !== c)
            for (var e in c)
                a = c[e],
                a.restoreOriginalState(),
                this._removeInactiveBinding(a)
    },
    uncacheAction: function(a, b) {
        var c = this.existingAction(a, b);
        null !== c && (this._deactivateAction(c),
        this._removeInactiveAction(c))
    }
};
THREE.EventDispatcher.prototype.apply(THREE.AnimationMixer.prototype);
THREE.AnimationMixer._Action = function(a, b, c) {
    this._mixer = a;
    this._clip = b;
    this._localRoot = c || null;
    a = b.tracks;
    b = a.length;
    c = Array(b);
    for (var d = {
        endingStart: THREE.ZeroCurvatureEnding,
        endingEnd: THREE.ZeroCurvatureEnding
    }, e = 0; e !== b; ++e) {
        var f = a[e].createInterpolant(null);
        c[e] = f;
        f.settings = d
    }
    this._interpolantSettings = d;
    this._interpolants = c;
    this._propertyBindings = Array(b);
    this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null;
    this.loop = THREE.LoopRepeat;
    this._loopCount = -1;
    this._startTime = null;
    this.time = 0;
    this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1;
    this.repetitions = Infinity;
    this.paused = !1;
    this.enabled = !0;
    this.clampWhenFinished = !1;
    this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0
}
;
THREE.AnimationMixer._Action.prototype = {
    constructor: THREE.AnimationMixer._Action,
    play: function() {
        this._mixer._activateAction(this);
        return this
    },
    stop: function() {
        this._mixer._deactivateAction(this);
        return this.reset()
    },
    reset: function() {
        this.paused = !1;
        this.enabled = !0;
        this.time = 0;
        this._loopCount = -1;
        this._startTime = null;
        return this.stopFading().stopWarping()
    },
    isRunning: function() {
        return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
    },
    isScheduled: function() {
        return this._mixer._isActiveAction(this)
    },
    startAt: function(a) {
        this._startTime = a;
        return this
    },
    setLoop: function(a, b) {
        this.loop = a;
        this.repetitions = b;
        return this
    },
    setEffectiveWeight: function(a) {
        this.weight = a;
        this._effectiveWeight = this.enabled ? a : 0;
        return this.stopFading()
    },
    getEffectiveWeight: function() {
        return this._effectiveWeight
    },
    fadeIn: function(a) {
        return this._scheduleFading(a, 0, 1)
    },
    fadeOut: function(a) {
        return this._scheduleFading(a, 1, 0)
    },
    crossFadeFrom: function(a, b, c) {
        a.fadeOut(b);
        this.fadeIn(b);
        if (c) {
            c = this._clip.duration;
            var d = a._clip.duration
              , e = c / d;
            a.warp(1, d / c, b);
            this.warp(e, 1, b)
        }
        return this
    },
    crossFadeTo: function(a, b, c) {
        return a.crossFadeFrom(this, b, c)
    },
    stopFading: function() {
        var a = this._weightInterpolant;
        null !== a && (this._weightInterpolant = null,
        this._mixer._takeBackControlInterpolant(a));
        return this
    },
    setEffectiveTimeScale: function(a) {
        this.timeScale = a;
        this._effectiveTimeScale = this.paused ? 0 : a;
        return this.stopWarping()
    },
    getEffectiveTimeScale: function() {
        return this._effectiveTimeScale
    },
    setDuration: function(a) {
        this.timeScale = this._clip.duration / a;
        return this.stopWarping()
    },
    syncWith: function(a) {
        this.time = a.time;
        this.timeScale = a.timeScale;
        return this.stopWarping()
    },
    halt: function(a) {
        return this.warp(this._currentTimeScale, 0, a)
    },
    warp: function(a, b, c) {
        var d = this._mixer
          , e = d.time
          , f = this._timeScaleInterpolant
          , g = this.timeScale;
        null === f && (this._timeScaleInterpolant = f = d._lendControlInterpolant());
        d = f.parameterPositions;
        f = f.sampleValues;
        d[0] = e;
        d[1] = e + c;
        f[0] = a / g;
        f[1] = b / g;
        return this
    },
    stopWarping: function() {
        var a = this._timeScaleInterpolant;
        null !== a && (this._timeScaleInterpolant = null,
        this._mixer._takeBackControlInterpolant(a));
        return this
    },
    getMixer: function() {
        return this._mixer
    },
    getClip: function() {
        return this._clip
    },
    getRoot: function() {
        return this._localRoot || this._mixer._root
    },
    _update: function(a, b, c, d) {
        var e = this._startTime;
        if (null !== e) {
            b = (a - e) * c;
            if (0 > b || 0 === c)
                return;
            this._startTime = null;
            b *= c
        }
        b *= this._updateTimeScale(a);
        c = this._updateTime(b);
        a = this._updateWeight(a);
        if (0 < a) {
            b = this._interpolants;
            for (var e = this._propertyBindings, f = 0, g = b.length; f !== g; ++f)
                b[f].evaluate(c),
                e[f].accumulate(d, a)
        }
    },
    _updateWeight: function(a) {
        var b = 0;
        if (this.enabled) {
            var b = this.weight
              , c = this._weightInterpolant;
            if (null !== c) {
                var d = c.evaluate(a)[0]
                  , b = b * d;
                a > c.parameterPositions[1] && (this.stopFading(),
                0 === d && (this.enabled = !1))
            }
        }
        return this._effectiveWeight = b
    },
    _updateTimeScale: function(a) {
        var b = 0;
        if (!this.paused) {
            var b = this.timeScale
              , c = this._timeScaleInterpolant;
            if (null !== c) {
                var d = c.evaluate(a)[0]
                  , b = b * d;
                a > c.parameterPositions[1] && (this.stopWarping(),
                0 === b ? this.pause = !0 : this.timeScale = b)
            }
        }
        return this._effectiveTimeScale = b
    },
    _updateTime: function(a) {
        var b = this.time + a;
        if (0 === a)
            return b;
        var c = this._clip.duration
          , d = this.loop
          , e = this._loopCount
          , f = !1;
        switch (d) {
        case THREE.LoopOnce:
        case THREE.LoopOnceClamp:
            -1 === e && (this.loopCount = 0,
            this._setEndings(!0, !0, !1));
            if (b >= c)
                b = c;
            else if (0 > b)
                b = 0;
            else
                break;
            this.clampWhenFinished ? this.pause = !0 : this.enabled = !1;
            this._mixer.dispatchEvent({
                type: "finished",
                action: this,
                direction: 0 > a ? -1 : 1
            });
            break;
        case THREE.LoopPingPong:
            f = !0;
        case THREE.LoopRepeat:
            -1 === e && (0 < a ? (e = 0,
            this._setEndings(!0, 0 === this.repetitions, f)) : this._setEndings(0 === this.repetitions, !0, f));
            if (b >= c || 0 > b) {
                var g = Math.floor(b / c)
                  , b = b - c * g
                  , e = e + Math.abs(g)
                  , h = this.repetitions - e;
                if (0 > h) {
                    this.clampWhenFinished ? this.paused = !0 : this.enabled = !1;
                    b = 0 < a ? c : 0;
                    this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: 0 < a ? 1 : -1
                    });
                    break
                } else
                    0 === h ? (a = 0 > a,
                    this._setEndings(a, !a, f)) : this._setEndings(!1, !1, f);
                this._loopCount = e;
                this._mixer.dispatchEvent({
                    type: "loop",
                    action: this,
                    loopDelta: g
                })
            }
            if (d === THREE.LoopPingPong && 1 === (e & 1))
                return this.time = b,
                c - b
        }
        return this.time = b
    },
    _setEndings: function(a, b, c) {
        var d = this._interpolantSettings;
        c ? (d.endingStart = THREE.ZeroSlopeEnding,
        d.endingEnd = THREE.ZeroSlopeEnding) : (d.endingStart = a ? this.zeroSlopeAtStart ? THREE.ZeroSlopeEnding : THREE.ZeroCurvatureEnding : THREE.WrapAroundEnding,
        d.endingEnd = b ? this.zeroSlopeAtEnd ? THREE.ZeroSlopeEnding : THREE.ZeroCurvatureEnding : THREE.WrapAroundEnding)
    },
    _scheduleFading: function(a, b, c) {
        var d = this._mixer
          , e = d.time
          , f = this._weightInterpolant;
        null === f && (this._weightInterpolant = f = d._lendControlInterpolant());
        d = f.parameterPositions;
        f = f.sampleValues;
        d[0] = e;
        f[0] = b;
        d[1] = e + a;
        f[1] = c;
        return this
    }
};
Object.assign(THREE.AnimationMixer.prototype, {
    _bindAction: function(a, b) {
        var c = a._localRoot || this._root
          , d = a._clip.tracks
          , e = d.length
          , f = a._propertyBindings
          , g = a._interpolants
          , h = c.uuid
          , k = this._bindingsByRootAndName
          , l = k[h];
        void 0 === l && (l = {},
        k[h] = l);
        for (k = 0; k !== e; ++k) {
            var m = d[k]
              , p = m.name
              , n = l[p];
            if (void 0 === n) {
                n = f[k];
                if (void 0 !== n) {
                    null === n._cacheIndex && (++n.referenceCount,
                    this._addInactiveBinding(n, h, p));
                    continue
                }
                n = new THREE.PropertyMixer(THREE.PropertyBinding.create(c, p, b && b._propertyBindings[k].binding.parsedPath),m.ValueTypeName,m.getValueSize());
                ++n.referenceCount;
                this._addInactiveBinding(n, h, p)
            }
            f[k] = n;
            g[k].resultBuffer = n.buffer
        }
    },
    _activateAction: function(a) {
        if (!this._isActiveAction(a)) {
            if (null === a._cacheIndex) {
                var b = (a._localRoot || this._root).uuid
                  , c = a._clip.name
                  , d = this._actionsByClip[c];
                this._bindAction(a, d && d.knownActions[0]);
                this._addInactiveAction(a, c, b)
            }
            b = a._propertyBindings;
            c = 0;
            for (d = b.length; c !== d; ++c) {
                var e = b[c];
                0 === e.useCount++ && (this._lendBinding(e),
                e.saveOriginalState())
            }
            this._lendAction(a)
        }
    },
    _deactivateAction: function(a) {
        if (this._isActiveAction(a)) {
            for (var b = a._propertyBindings, c = 0, d = b.length; c !== d; ++c) {
                var e = b[c];
                0 === --e.useCount && (e.restoreOriginalState(),
                this._takeBackBinding(e))
            }
            this._takeBackAction(a)
        }
    },
    _initMemoryManager: function() {
        this._actions = [];
        this._nActiveActions = 0;
        this._actionsByClip = {};
        this._bindings = [];
        this._nActiveBindings = 0;
        this._bindingsByRootAndName = {};
        this._controlInterpolants = [];
        this._nActiveControlInterpolants = 0;
        var a = this;
        this.stats = {
            actions: {
                get total() {
                    return a._actions.length
                },
                get inUse() {
                    return a._nActiveActions
                }
            },
            bindings: {
                get total() {
                    return a._bindings.length
                },
                get inUse() {
                    return a._nActiveBindings
                }
            },
            controlInterpolants: {
                get total() {
                    return a._controlInterpolants.length
                },
                get inUse() {
                    return a._nActiveControlInterpolants
                }
            }
        }
    },
    _isActiveAction: function(a) {
        a = a._cacheIndex;
        return null !== a && a < this._nActiveActions
    },
    _addInactiveAction: function(a, b, c) {
        var d = this._actions
          , e = this._actionsByClip
          , f = e[b];
        void 0 === f ? (f = {
            knownActions: [a],
            actionByRoot: {}
        },
        a._byClipCacheIndex = 0,
        e[b] = f) : (b = f.knownActions,
        a._byClipCacheIndex = b.length,
        b.push(a));
        a._cacheIndex = d.length;
        d.push(a);
        f.actionByRoot[c] = a
    },
    _removeInactiveAction: function(a) {
        var b = this._actions
          , c = b[b.length - 1]
          , d = a._cacheIndex;
        c._cacheIndex = d;
        b[d] = c;
        b.pop();
        a._cacheIndex = null;
        var c = a._clip.name
          , d = this._actionsByClip
          , e = d[c]
          , f = e.knownActions
          , g = f[f.length - 1]
          , h = a._byClipCacheIndex;
        g._byClipCacheIndex = h;
        f[h] = g;
        f.pop();
        a._byClipCacheIndex = null;
        delete e.actionByRoot[(b._localRoot || this._root).uuid];
        0 === f.length && delete d[c];
        this._removeInactiveBindingsForAction(a)
    },
    _removeInactiveBindingsForAction: function(a) {
        a = a._propertyBindings;
        for (var b = 0, c = a.length; b !== c; ++b) {
            var d = a[b];
            0 === --d.referenceCount && this._removeInactiveBinding(d)
        }
    },
    _lendAction: function(a) {
        var b = this._actions
          , c = a._cacheIndex
          , d = this._nActiveActions++
          , e = b[d];
        a._cacheIndex = d;
        b[d] = a;
        e._cacheIndex = c;
        b[c] = e
    },
    _takeBackAction: function(a) {
        var b = this._actions
          , c = a._cacheIndex
          , d = --this._nActiveActions
          , e = b[d];
        a._cacheIndex = d;
        b[d] = a;
        e._cacheIndex = c;
        b[c] = e
    },
    _addInactiveBinding: function(a, b, c) {
        var d = this._bindingsByRootAndName
          , e = d[b]
          , f = this._bindings;
        void 0 === e && (e = {},
        d[b] = e);
        e[c] = a;
        a._cacheIndex = f.length;
        f.push(a)
    },
    _removeInactiveBinding: function(a) {
        var b = this._bindings
          , c = a.binding
          , d = c.rootNode.uuid
          , c = c.path
          , e = this._bindingsByRootAndName
          , f = e[d]
          , g = b[b.length - 1];
        a = a._cacheIndex;
        g._cacheIndex = a;
        b[a] = g;
        b.pop();
        delete f[c];
        a: {
            for (var h in f)
                break a;
            delete e[d]
        }
    },
    _lendBinding: function(a) {
        var b = this._bindings
          , c = a._cacheIndex
          , d = this._nActiveBindings++
          , e = b[d];
        a._cacheIndex = d;
        b[d] = a;
        e._cacheIndex = c;
        b[c] = e
    },
    _takeBackBinding: function(a) {
        var b = this._bindings
          , c = a._cacheIndex
          , d = --this._nActiveBindings
          , e = b[d];
        a._cacheIndex = d;
        b[d] = a;
        e._cacheIndex = c;
        b[c] = e
    },
    _lendControlInterpolant: function() {
        var a = this._controlInterpolants
          , b = this._nActiveControlInterpolants++
          , c = a[b];
        void 0 === c && (c = new THREE.LinearInterpolant(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),
        c.__cacheIndex = b,
        a[b] = c);
        return c
    },
    _takeBackControlInterpolant: function(a) {
        var b = this._controlInterpolants
          , c = a.__cacheIndex
          , d = --this._nActiveControlInterpolants
          , e = b[d];
        a.__cacheIndex = d;
        b[d] = a;
        e.__cacheIndex = c;
        b[c] = e
    },
    _controlInterpolantsResultBuffer: new Float32Array(1)
});
THREE.AnimationObjectGroup = function(a) {
    this.uuid = THREE.Math.generateUUID();
    this._objects = Array.prototype.slice.call(arguments);
    this.nCachedObjects_ = 0;
    var b = {};
    this._indicesByUUID = b;
    for (var c = 0, d = arguments.length; c !== d; ++c)
        b[arguments[c].uuid] = c;
    this._paths = [];
    this._parsedPaths = [];
    this._bindings = [];
    this._bindingsIndicesByPath = {};
    var e = this;
    this.stats = {
        objects: {
            get total() {
                return e._objects.length
            },
            get inUse() {
                return this.total - e.nCachedObjects_
            }
        },
        get bindingsPerObject() {
            return e._bindings.length
        }
    }
}
;
THREE.AnimationObjectGroup.prototype = {
    constructor: THREE.AnimationObjectGroup,
    add: function(a) {
        for (var b = this._objects, c = b.length, d = this.nCachedObjects_, e = this._indicesByUUID, f = this._paths, g = this._parsedPaths, h = this._bindings, k = h.length, l = 0, m = arguments.length; l !== m; ++l) {
            var p = arguments[l]
              , n = p.uuid
              , q = e[n];
            if (void 0 === q) {
                q = c++;
                e[n] = q;
                b.push(p);
                for (var n = 0, u = k; n !== u; ++n)
                    h[n].push(new THREE.PropertyBinding(p,f[n],g[n]))
            } else if (q < d) {
                var t = b[q]
                  , w = --d
                  , u = b[w];
                e[u.uuid] = q;
                b[q] = u;
                e[n] = w;
                b[w] = p;
                n = 0;
                for (u = k; n !== u; ++n) {
                    var v = h[n]
                      , x = v[q];
                    v[q] = v[w];
                    void 0 === x && (x = new THREE.PropertyBinding(p,f[n],g[n]));
                    v[w] = x
                }
            } else
                b[q] !== t && console.error("Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes...")
        }
        this.nCachedObjects_ = d
    },
    remove: function(a) {
        for (var b = this._objects, c = this.nCachedObjects_, d = this._indicesByUUID, e = this._bindings, f = e.length, g = 0, h = arguments.length; g !== h; ++g) {
            var k = arguments[g]
              , l = k.uuid
              , m = d[l];
            if (void 0 !== m && m >= c) {
                var p = c++
                  , n = b[p];
                d[n.uuid] = m;
                b[m] = n;
                d[l] = p;
                b[p] = k;
                k = 0;
                for (l = f; k !== l; ++k) {
                    var n = e[k]
                      , q = n[m];
                    n[m] = n[p];
                    n[p] = q
                }
            }
        }
        this.nCachedObjects_ = c
    },
    uncache: function(a) {
        for (var b = this._objects, c = b.length, d = this.nCachedObjects_, e = this._indicesByUUID, f = this._bindings, g = f.length, h = 0, k = arguments.length; h !== k; ++h) {
            var l = arguments[h].uuid
              , m = e[l];
            if (void 0 !== m)
                if (delete e[l],
                m < d) {
                    var l = --d
                      , p = b[l]
                      , n = --c
                      , q = b[n];
                    e[p.uuid] = m;
                    b[m] = p;
                    e[q.uuid] = l;
                    b[l] = q;
                    b.pop();
                    p = 0;
                    for (q = g; p !== q; ++p) {
                        var u = f[p]
                          , t = u[n];
                        u[m] = u[l];
                        u[l] = t;
                        u.pop()
                    }
                } else
                    for (n = --c,
                    q = b[n],
                    e[q.uuid] = m,
                    b[m] = q,
                    b.pop(),
                    p = 0,
                    q = g; p !== q; ++p)
                        u = f[p],
                        u[m] = u[n],
                        u.pop()
        }
        this.nCachedObjects_ = d
    },
    subscribe_: function(a, b) {
        var c = this._bindingsIndicesByPath
          , d = c[a]
          , e = this._bindings;
        if (void 0 !== d)
            return e[d];
        var f = this._paths
          , g = this._parsedPaths
          , h = this._objects
          , k = this.nCachedObjects_
          , l = Array(h.length)
          , d = e.length;
        c[a] = d;
        f.push(a);
        g.push(b);
        e.push(l);
        c = k;
        for (d = h.length; c !== d; ++c)
            l[c] = new THREE.PropertyBinding(h[c],a,b);
        return l
    },
    unsubscribe_: function(a) {
        var b = this._bindingsIndicesByPath
          , c = b[a];
        if (void 0 !== c) {
            var d = this._paths
              , e = this._parsedPaths
              , f = this._bindings
              , g = f.length - 1
              , h = f[g];
            b[a[g]] = c;
            f[c] = h;
            f.pop();
            e[c] = e[g];
            e.pop();
            d[c] = d[g];
            d.pop()
        }
    }
};
THREE.AnimationUtils = {
    arraySlice: function(a, b, c) {
        return THREE.AnimationUtils.isTypedArray(a) ? new a.constructor(a.subarray(b, c)) : a.slice(b, c)
    },
    convertArray: function(a, b, c) {
        return !a || !c && a.constructor === b ? a : "number" === typeof b.BYTES_PER_ELEMENT ? new b(a) : Array.prototype.slice.call(a)
    },
    isTypedArray: function(a) {
        return ArrayBuffer.isView(a) && !(a instanceof DataView)
    },
    getKeyframeOrder: function(a) {
        for (var b = a.length, c = Array(b), d = 0; d !== b; ++d)
            c[d] = d;
        c.sort(function(b, c) {
            return a[b] - a[c]
        });
        return c
    },
    sortedArray: function(a, b, c) {
        for (var d = a.length, e = new a.constructor(d), f = 0, g = 0; g !== d; ++f)
            for (var h = c[f] * b, k = 0; k !== b; ++k)
                e[g++] = a[h + k];
        return e
    },
    flattenJSON: function(a, b, c, d) {
        for (var e = 1, f = a[0]; void 0 !== f && void 0 === f[d]; )
            f = a[e++];
        if (void 0 !== f) {
            var g = f[d];
            if (void 0 !== g)
                if (Array.isArray(g)) {
                    do
                        g = f[d],
                        void 0 !== g && (b.push(f.time),
                        c.push.apply(c, g)),
                        f = a[e++];
                    while (void 0 !== f)
                } else if (void 0 !== g.toArray) {
                    do
                        g = f[d],
                        void 0 !== g && (b.push(f.time),
                        g.toArray(c, c.length)),
                        f = a[e++];
                    while (void 0 !== f)
                } else {
                    do
                        g = f[d],
                        void 0 !== g && (b.push(f.time),
                        c.push(g)),
                        f = a[e++];
                    while (void 0 !== f)
                }
        }
    }
};
THREE.KeyframeTrack = function(a, b, c, d) {
    if (void 0 === a)
        throw Error("track name is undefined");
    if (void 0 === b || 0 === b.length)
        throw Error("no keyframes in track named " + a);
    this.name = a;
    this.times = THREE.AnimationUtils.convertArray(b, this.TimeBufferType);
    this.values = THREE.AnimationUtils.convertArray(c, this.ValueBufferType);
    this.setInterpolation(d || this.DefaultInterpolation);
    this.validate();
    this.optimize()
}
;
THREE.KeyframeTrack.prototype = {
    constructor: THREE.KeyframeTrack,
    TimeBufferType: Float32Array,
    ValueBufferType: Float32Array,
    DefaultInterpolation: THREE.InterpolateLinear,
    InterpolantFactoryMethodDiscrete: function(a) {
        return new THREE.DiscreteInterpolant(this.times,this.values,this.getValueSize(),a)
    },
    InterpolantFactoryMethodLinear: function(a) {
        return new THREE.LinearInterpolant(this.times,this.values,this.getValueSize(),a)
    },
    InterpolantFactoryMethodSmooth: function(a) {
        return new THREE.CubicInterpolant(this.times,this.values,this.getValueSize(),a)
    },
    setInterpolation: function(a) {
        var b = void 0;
        switch (a) {
        case THREE.InterpolateDiscrete:
            b = this.InterpolantFactoryMethodDiscrete;
            break;
        case THREE.InterpolateLinear:
            b = this.InterpolantFactoryMethodLinear;
            break;
        case THREE.InterpolateSmooth:
            b = this.InterpolantFactoryMethodSmooth
        }
        if (void 0 === b) {
            b = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
            if (void 0 === this.createInterpolant)
                if (a !== this.DefaultInterpolation)
                    this.setInterpolation(this.DefaultInterpolation);
                else
                    throw Error(b);
            console.warn(b)
        } else
            this.createInterpolant = b
    },
    getInterpolation: function() {
        switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
            return THREE.InterpolateDiscrete;
        case this.InterpolantFactoryMethodLinear:
            return THREE.InterpolateLinear;
        case this.InterpolantFactoryMethodSmooth:
            return THREE.InterpolateSmooth
        }
    },
    getValueSize: function() {
        return this.values.length / this.times.length
    },
    shift: function(a) {
        if (0 !== a)
            for (var b = this.times, c = 0, d = b.length; c !== d; ++c)
                b[c] += a;
        return this
    },
    scale: function(a) {
        if (1 !== a)
            for (var b = this.times, c = 0, d = b.length; c !== d; ++c)
                b[c] *= a;
        return this
    },
    trim: function(a, b) {
        for (var c = this.times, d = c.length, e = 0, f = 1; f !== d; ++f)
            c[f] <= a && ++e;
        for (var g = 0, f = d - 2; 0 !== f; --f)
            if (c[f] >= b)
                ++g;
            else
                break;
        0 !== e + g && (f = e,
        d = d - g - e,
        this.times = THREE.AnimationUtils.arraySlice(c, f, d),
        c = this.values,
        e = this.getValueSize(),
        this.values = THREE.AnimationUtils.arraySlice(c, f * e, d * e));
        return this
    },
    validate: function() {
        var a = !0
          , b = this.getValueSize();
        0 !== b - Math.floor(b) && (console.error("invalid value size in track", this),
        a = !1);
        var c = this.times
          , b = this.values
          , d = c.length;
        0 === d && (console.error("track is empty", this),
        a = !1);
        for (var e = null, f = 0; f !== d; f++) {
            var g = c[f];
            if ("number" === typeof g && isNaN(g)) {
                console.error("time is not a valid number", this, f, g);
                a = !1;
                break
            }
            if (null !== e && e > g) {
                console.error("out of order keys", this, f, g, e);
                a = !1;
                break
            }
            e = g
        }
        if (void 0 !== b && THREE.AnimationUtils.isTypedArray(b))
            for (f = 0,
            c = b.length; f !== c; ++f)
                if (d = b[f],
                isNaN(d)) {
                    console.error("value is not a valid number", this, f, d);
                    a = !1;
                    break
                }
        return a
    },
    optimize: function() {
        for (var a = this.times, b = this.values, c = this.getValueSize(), d = 1, e = 1, f = a.length - 1; e <= f; ++e) {
            var g = !1
              , h = a[e];
            if (h !== a[e + 1] && (1 !== e || h !== h[0]))
                for (var k = e * c, l = k - c, m = k + c, h = 0; h !== c; ++h) {
                    var p = b[k + h];
                    if (p !== b[l + h] || p !== b[m + h]) {
                        g = !0;
                        break
                    }
                }
            if (g) {
                if (e !== d)
                    for (a[d] = a[e],
                    g = e * c,
                    k = d * c,
                    h = 0; h !== c; ++h)
                        b[k + h] = b[g + h];
                ++d
            }
        }
        d !== a.length && (this.times = THREE.AnimationUtils.arraySlice(a, 0, d),
        this.values = THREE.AnimationUtils.arraySlice(b, 0, d * c));
        return this
    }
};
Object.assign(THREE.KeyframeTrack, {
    parse: function(a) {
        if (void 0 === a.type)
            throw Error("track type undefined, can not parse");
        var b = THREE.KeyframeTrack._getTrackTypeForValueTypeName(a.type);
        if (void 0 === a.times) {
            console.warn("legacy JSON format detected, converting");
            var c = []
              , d = [];
            THREE.AnimationUtils.flattenJSON(a.keys, c, d, "value");
            a.times = c;
            a.values = d
        }
        return void 0 !== b.parse ? b.parse(a) : new b(a.name,a.times,a.values,a.interpolation)
    },
    toJSON: function(a) {
        var b = a.constructor;
        if (void 0 !== b.toJSON)
            b = b.toJSON(a);
        else {
            var b = {
                name: a.name,
                times: THREE.AnimationUtils.convertArray(a.times, Array),
                values: THREE.AnimationUtils.convertArray(a.values, Array)
            }
              , c = a.getInterpolation();
            c !== a.DefaultInterpolation && (b.interpolation = c)
        }
        b.type = a.ValueTypeName;
        return b
    },
    _getTrackTypeForValueTypeName: function(a) {
        switch (a.toLowerCase()) {
        case "scalar":
        case "double":
        case "float":
        case "number":
        case "integer":
            return THREE.NumberKeyframeTrack;
        case "vector":
        case "vector2":
        case "vector3":
        case "vector4":
            return THREE.VectorKeyframeTrack;
        case "color":
            return THREE.ColorKeyframeTrack;
        case "quaternion":
            return THREE.QuaternionKeyframeTrack;
        case "bool":
        case "boolean":
            return THREE.BooleanKeyframeTrack;
        case "string":
            return THREE.StringKeyframeTrack
        }
        throw Error("Unsupported typeName: " + a);
    }
});
THREE.PropertyBinding = function(a, b, c) {
    this.path = b;
    this.parsedPath = c || THREE.PropertyBinding.parseTrackName(b);
    this.node = THREE.PropertyBinding.findNode(a, this.parsedPath.nodeName) || a;
    this.rootNode = a
}
;
THREE.PropertyBinding.prototype = {
    constructor: THREE.PropertyBinding,
    getValue: function(a, b) {
        this.bind();
        this.getValue(a, b)
    },
    setValue: function(a, b) {
        this.bind();
        this.setValue(a, b)
    },
    bind: function() {
        var a = this.node
          , b = this.parsedPath
          , c = b.objectName
          , d = b.propertyName
          , e = b.propertyIndex;
        a || (this.node = a = THREE.PropertyBinding.findNode(this.rootNode, b.nodeName) || this.rootNode);
        this.getValue = this._getValue_unavailable;
        this.setValue = this._setValue_unavailable;
        if (a) {
            if (c) {
                var f = b.objectIndex;
                switch (c) {
                case "materials":
                    if (!a.material) {
                        console.error("  can not bind to material as node does not have a material", this);
                        return
                    }
                    if (!a.material.materials) {
                        console.error("  can not bind to material.materials as node.material does not have a materials array", this);
                        return
                    }
                    a = a.material.materials;
                    break;
                case "bones":
                    if (!a.skeleton) {
                        console.error("  can not bind to bones as node does not have a skeleton", this);
                        return
                    }
                    a = a.skeleton.bones;
                    for (c = 0; c < a.length; c++)
                        if (a[c].name === f) {
                            f = c;
                            break
                        }
                    break;
                default:
                    if (void 0 === a[c]) {
                        console.error("  can not bind to objectName of node, undefined", this);
                        return
                    }
                    a = a[c]
                }
                if (void 0 !== f) {
                    if (void 0 === a[f]) {
                        console.error("  trying to bind to objectIndex of objectName, but is undefined:", this, a);
                        return
                    }
                    a = a[f]
                }
            }
            if (f = a[d]) {
                b = this.Versioning.None;
                void 0 !== a.needsUpdate ? (b = this.Versioning.NeedsUpdate,
                this.targetObject = a) : void 0 !== a.matrixWorldNeedsUpdate && (b = this.Versioning.MatrixWorldNeedsUpdate,
                this.targetObject = a);
                c = this.BindingType.Direct;
                if (void 0 !== e) {
                    if ("morphTargetInfluences" === d) {
                        if (!a.geometry) {
                            console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry", this);
                            return
                        }
                        if (!a.geometry.morphTargets) {
                            console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry.morphTargets", this);
                            return
                        }
                        for (c = 0; c < this.node.geometry.morphTargets.length; c++)
                            if (a.geometry.morphTargets[c].name === e) {
                                e = c;
                                break
                            }
                    }
                    c = this.BindingType.ArrayElement;
                    this.resolvedProperty = f;
                    this.propertyIndex = e
                } else
                    void 0 !== f.fromArray && void 0 !== f.toArray ? (c = this.BindingType.HasFromToArray,
                    this.resolvedProperty = f) : void 0 !== f.length ? (c = this.BindingType.EntireArray,
                    this.resolvedProperty = f) : this.propertyName = d;
                this.getValue = this.GetterByBindingType[c];
                this.setValue = this.SetterByBindingTypeAndVersioning[c][b]
            } else
                console.error("  trying to update property for track: " + b.nodeName + "." + d + " but it wasn't found.", a)
        } else
            console.error("  trying to update node for track: " + this.path + " but it wasn't found.")
    },
    unbind: function() {
        this.node = null;
        this.getValue = this._getValue_unbound;
        this.setValue = this._setValue_unbound
    }
};
Object.assign(THREE.PropertyBinding.prototype, {
    _getValue_unavailable: function() {},
    _setValue_unavailable: function() {},
    _getValue_unbound: THREE.PropertyBinding.prototype.getValue,
    _setValue_unbound: THREE.PropertyBinding.prototype.setValue,
    BindingType: {
        Direct: 0,
        EntireArray: 1,
        ArrayElement: 2,
        HasFromToArray: 3
    },
    Versioning: {
        None: 0,
        NeedsUpdate: 1,
        MatrixWorldNeedsUpdate: 2
    },
    GetterByBindingType: [function(a, b) {
        a[b] = this.node[this.propertyName]
    }
    , function(a, b) {
        for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d)
            a[b++] = c[d]
    }
    , function(a, b) {
        a[b] = this.resolvedProperty[this.propertyIndex]
    }
    , function(a, b) {
        this.resolvedProperty.toArray(a, b)
    }
    ],
    SetterByBindingTypeAndVersioning: [[function(a, b) {
        this.node[this.propertyName] = a[b]
    }
    , function(a, b) {
        this.node[this.propertyName] = a[b];
        this.targetObject.needsUpdate = !0
    }
    , function(a, b) {
        this.node[this.propertyName] = a[b];
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(a, b) {
        for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d)
            c[d] = a[b++]
    }
    , function(a, b) {
        for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d)
            c[d] = a[b++];
        this.targetObject.needsUpdate = !0
    }
    , function(a, b) {
        for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d)
            c[d] = a[b++];
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(a, b) {
        this.resolvedProperty[this.propertyIndex] = a[b]
    }
    , function(a, b) {
        this.resolvedProperty[this.propertyIndex] = a[b];
        this.targetObject.needsUpdate = !0
    }
    , function(a, b) {
        this.resolvedProperty[this.propertyIndex] = a[b];
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ], [function(a, b) {
        this.resolvedProperty.fromArray(a, b)
    }
    , function(a, b) {
        this.resolvedProperty.fromArray(a, b);
        this.targetObject.needsUpdate = !0
    }
    , function(a, b) {
        this.resolvedProperty.fromArray(a, b);
        this.targetObject.matrixWorldNeedsUpdate = !0
    }
    ]]
});
THREE.PropertyBinding.Composite = function(a, b, c) {
    c = c || THREE.PropertyBinding.parseTrackName(b);
    this._targetGroup = a;
    this._bindings = a.subscribe_(b, c)
}
;
THREE.PropertyBinding.Composite.prototype = {
    constructor: THREE.PropertyBinding.Composite,
    getValue: function(a, b) {
        this.bind();
        var c = this._bindings[this._targetGroup.nCachedObjects_];
        void 0 !== c && c.getValue(a, b)
    },
    setValue: function(a, b) {
        for (var c = this._bindings, d = this._targetGroup.nCachedObjects_, e = c.length; d !== e; ++d)
            c[d].setValue(a, b)
    },
    bind: function() {
        for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, c = a.length; b !== c; ++b)
            a[b].bind()
    },
    unbind: function() {
        for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, c = a.length; b !== c; ++b)
            a[b].unbind()
    }
};
THREE.PropertyBinding.create = function(a, b, c) {
    return a instanceof THREE.AnimationObjectGroup ? new THREE.PropertyBinding.Composite(a,b,c) : new THREE.PropertyBinding(a,b,c)
}
;
THREE.PropertyBinding.parseTrackName = function(a) {
    var b = /^(([\w]+\/)*)([\w-\d]+)?(\.([\w]+)(\[([\w\d\[\]\_. ]+)\])?)?(\.([\w.]+)(\[([\w\d\[\]\_. ]+)\])?)$/
      , c = b.exec(a);
    if (!c)
        throw Error("cannot parse trackName at all: " + a);
    c.index === b.lastIndex && b.lastIndex++;
    b = {
        nodeName: c[3],
        objectName: c[5],
        objectIndex: c[7],
        propertyName: c[9],
        propertyIndex: c[11]
    };
    if (null === b.propertyName || 0 === b.propertyName.length)
        throw Error("can not parse propertyName from trackName: " + a);
    return b
}
;
THREE.PropertyBinding.findNode = function(a, b) {
    if (!b || "" === b || "root" === b || "." === b || -1 === b || b === a.name || b === a.uuid)
        return a;
    if (a.skeleton) {
        var c = function(a) {
            for (var c = 0; c < a.bones.length; c++) {
                var d = a.bones[c];
                if (d.name === b)
                    return d
            }
            return null
        }(a.skeleton);
        if (c)
            return c
    }
    if (a.children) {
        var d = function(a) {
            for (var c = 0; c < a.length; c++) {
                var g = a[c];
                if (g.name === b || g.uuid === b || (g = d(g.children)))
                    return g
            }
            return null
        };
        if (c = d(a.children))
            return c
    }
    return null
}
;
THREE.PropertyMixer = function(a, b, c) {
    this.binding = a;
    this.valueSize = c;
    a = Float64Array;
    switch (b) {
    case "quaternion":
        b = this._slerp;
        break;
    case "string":
    case "bool":
        a = Array;
        b = this._select;
        break;
    default:
        b = this._lerp
    }
    this.buffer = new a(4 * c);
    this._mixBufferRegion = b;
    this.referenceCount = this.useCount = this.cumulativeWeight = 0
}
;
THREE.PropertyMixer.prototype = {
    constructor: THREE.PropertyMixer,
    accumulate: function(a, b) {
        var c = this.buffer
          , d = this.valueSize
          , e = a * d + d
          , f = this.cumulativeWeight;
        if (0 === f) {
            for (f = 0; f !== d; ++f)
                c[e + f] = c[f];
            f = b
        } else
            f += b,
            this._mixBufferRegion(c, e, 0, b / f, d);
        this.cumulativeWeight = f
    },
    apply: function(a) {
        var b = this.valueSize
          , c = this.buffer;
        a = a * b + b;
        var d = this.cumulativeWeight
          , e = this.binding;
        this.cumulativeWeight = 0;
        1 > d && this._mixBufferRegion(c, a, 3 * b, 1 - d, b);
        for (var d = b, f = b + b; d !== f; ++d)
            if (c[d] !== c[d + b]) {
                e.setValue(c, a);
                break
            }
    },
    saveOriginalState: function() {
        var a = this.buffer
          , b = this.valueSize
          , c = 3 * b;
        this.binding.getValue(a, c);
        for (var d = b; d !== c; ++d)
            a[d] = a[c + d % b];
        this.cumulativeWeight = 0
    },
    restoreOriginalState: function() {
        this.binding.setValue(this.buffer, 3 * this.valueSize)
    },
    _select: function(a, b, c, d, e) {
        if (.5 <= d)
            for (d = 0; d !== e; ++d)
                a[b + d] = a[c + d]
    },
    _slerp: function(a, b, c, d, e) {
        THREE.Quaternion.slerpFlat(a, b, a, b, a, c, d)
    },
    _lerp: function(a, b, c, d, e) {
        for (var f = 1 - d, g = 0; g !== e; ++g) {
            var h = b + g;
            a[h] = a[h] * f + a[c + g] * d
        }
    }
};
THREE.BooleanKeyframeTrack = function(a, b, c) {
    THREE.KeyframeTrack.call(this, a, b, c)
}
;
THREE.BooleanKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.BooleanKeyframeTrack,
    ValueTypeName: "bool",
    ValueBufferType: Array,
    DefaultInterpolation: THREE.IntepolateDiscrete,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
});
THREE.NumberKeyframeTrack = function(a, b, c, d) {
    THREE.KeyframeTrack.call(this, a, b, c, d)
}
;
THREE.NumberKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.NumberKeyframeTrack,
    ValueTypeName: "number"
});
THREE.QuaternionKeyframeTrack = function(a, b, c, d) {
    THREE.KeyframeTrack.call(this, a, b, c, d)
}
;
THREE.QuaternionKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.QuaternionKeyframeTrack,
    ValueTypeName: "quaternion",
    DefaultInterpolation: THREE.InterpolateLinear,
    InterpolantFactoryMethodLinear: function(a) {
        return new THREE.QuaternionLinearInterpolant(this.times,this.values,this.getValueSize(),a)
    },
    InterpolantFactoryMethodSmooth: void 0
});
THREE.StringKeyframeTrack = function(a, b, c, d) {
    THREE.KeyframeTrack.call(this, a, b, c, d)
}
;
THREE.StringKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.StringKeyframeTrack,
    ValueTypeName: "string",
    ValueBufferType: Array,
    DefaultInterpolation: THREE.IntepolateDiscrete,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
});
THREE.VectorKeyframeTrack = function(a, b, c, d) {
    THREE.KeyframeTrack.call(this, a, b, c, d)
}
;
THREE.VectorKeyframeTrack.prototype = Object.assign(Object.create(THREE.KeyframeTrack.prototype), {
    constructor: THREE.VectorKeyframeTrack,
    ValueTypeName: "vector"
});
THREE.Audio = function(a) {
    THREE.Object3D.call(this);
    this.type = "Audio";
    this.context = a.context;
    this.source = this.context.createBufferSource();
    this.source.onended = this.onEnded.bind(this);
    this.gain = this.context.createGain();
    this.gain.connect(a.getInput());
    this.autoplay = !1;
    this.startTime = 0;
    this.playbackRate = 1;
    this.isPlaying = !1;
    this.hasPlaybackControl = !0;
    this.sourceType = "empty";
    this.filter = null
}
;
THREE.Audio.prototype = Object.create(THREE.Object3D.prototype);
THREE.Audio.prototype.constructor = THREE.Audio;
THREE.Audio.prototype.getOutput = function() {
    return this.gain
}
;
THREE.Audio.prototype.load = function(a) {
    var b = new THREE.AudioBuffer(this.context);
    b.load(a);
    this.setBuffer(b);
    return this
}
;
THREE.Audio.prototype.setNodeSource = function(a) {
    this.hasPlaybackControl = !1;
    this.sourceType = "audioNode";
    this.source = a;
    this.connect();
    return this
}
;
THREE.Audio.prototype.setBuffer = function(a) {
    var b = this;
    a.onReady(function(a) {
        b.source.buffer = a;
        b.sourceType = "buffer";
        b.autoplay && b.play()
    });
    return this
}
;
THREE.Audio.prototype.play = function() {
    if (!0 === this.isPlaying)
        console.warn("THREE.Audio: Audio is already playing.");
    else if (!1 === this.hasPlaybackControl)
        console.warn("THREE.Audio: this Audio has no playback control.");
    else {
        var a = this.context.createBufferSource();
        a.buffer = this.source.buffer;
        a.loop = this.source.loop;
        a.onended = this.source.onended;
        a.start(0, this.startTime);
        a.playbackRate.value = this.playbackRate;
        this.isPlaying = !0;
        this.source = a;
        this.connect()
    }
}
;
THREE.Audio.prototype.pause = function() {
    !1 === this.hasPlaybackControl ? console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(),
    this.startTime = this.context.currentTime)
}
;
THREE.Audio.prototype.stop = function() {
    !1 === this.hasPlaybackControl ? console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(),
    this.startTime = 0)
}
;
THREE.Audio.prototype.connect = function() {
    null !== this.filter ? (this.source.connect(this.filter),
    this.filter.connect(this.getOutput())) : this.source.connect(this.getOutput())
}
;
THREE.Audio.prototype.disconnect = function() {
    null !== this.filter ? (this.source.disconnect(this.filter),
    this.filter.disconnect(this.getOutput())) : this.source.disconnect(this.getOutput())
}
;
THREE.Audio.prototype.getFilter = function() {
    return this.filter
}
;
THREE.Audio.prototype.setFilter = function(a) {
    void 0 === a && (a = null);
    !0 === this.isPlaying ? (this.disconnect(),
    this.filter = a,
    this.connect()) : this.filter = a
}
;
THREE.Audio.prototype.setPlaybackRate = function(a) {
    !1 === this.hasPlaybackControl ? console.warn("THREE.Audio: this Audio has no playback control.") : (this.playbackRate = a,
    !0 === this.isPlaying && (this.source.playbackRate.value = this.playbackRate))
}
;
THREE.Audio.prototype.getPlaybackRate = function() {
    return this.playbackRate
}
;
THREE.Audio.prototype.onEnded = function() {
    this.isPlaying = !1
}
;
THREE.Audio.prototype.setLoop = function(a) {
    !1 === this.hasPlaybackControl ? console.warn("THREE.Audio: this Audio has no playback control.") : this.source.loop = a
}
;
THREE.Audio.prototype.getLoop = function() {
    return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."),
    !1) : this.source.loop
}
;
THREE.Audio.prototype.setVolume = function(a) {
    this.gain.gain.value = a
}
;
THREE.Audio.prototype.getVolume = function() {
    return this.gain.gain.value
}
;
THREE.AudioAnalyser = function(a, b) {
    this.analyser = a.context.createAnalyser();
    this.analyser.fftSize = void 0 !== b ? b : 2048;
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    a.getOutput().connect(this.analyser)
}
;
THREE.AudioAnalyser.prototype = {
    constructor: THREE.AudioAnalyser,
    getData: function() {
        this.analyser.getByteFrequencyData(this.data);
        return this.data
    }
};
THREE.AudioBuffer = function(a) {
    this.context = a;
    this.ready = !1;
    this.readyCallbacks = []
}
;
THREE.AudioBuffer.prototype.load = function(a) {
    var b = this
      , c = new XMLHttpRequest;
    c.open("GET", a, !0);
    c.responseType = "arraybuffer";
    c.onload = function(a) {
        b.context.decodeAudioData(this.response, function(a) {
            b.buffer = a;
            b.ready = !0;
            for (a = 0; a < b.readyCallbacks.length; a++)
                b.readyCallbacks[a](b.buffer);
            b.readyCallbacks = []
        })
    }
    ;
    c.send();
    return this
}
;
THREE.AudioBuffer.prototype.onReady = function(a) {
    this.ready ? a(this.buffer) : this.readyCallbacks.push(a)
}
;
THREE.PositionalAudio = function(a) {
    THREE.Audio.call(this, a);
    this.panner = this.context.createPanner();
    this.panner.connect(this.gain)
}
;
THREE.PositionalAudio.prototype = Object.create(THREE.Audio.prototype);
THREE.PositionalAudio.prototype.constructor = THREE.PositionalAudio;
THREE.PositionalAudio.prototype.getOutput = function() {
    return this.panner
}
;
THREE.PositionalAudio.prototype.setRefDistance = function(a) {
    this.panner.refDistance = a
}
;
THREE.PositionalAudio.prototype.getRefDistance = function() {
    return this.panner.refDistance
}
;
THREE.PositionalAudio.prototype.setRolloffFactor = function(a) {
    this.panner.rolloffFactor = a
}
;
THREE.PositionalAudio.prototype.getRolloffFactor = function() {
    return this.panner.rolloffFactor
}
;
THREE.PositionalAudio.prototype.setDistanceModel = function(a) {
    this.panner.distanceModel = a
}
;
THREE.PositionalAudio.prototype.getDistanceModel = function() {
    return this.panner.distanceModel
}
;
THREE.PositionalAudio.prototype.setMaxDistance = function(a) {
    this.panner.maxDistance = a
}
;
THREE.PositionalAudio.prototype.getMaxDistance = function() {
    return this.panner.maxDistance
}
;
THREE.PositionalAudio.prototype.updateMatrixWorld = function() {
    var a = new THREE.Vector3;
    return function(b) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, b);
        a.setFromMatrixPosition(this.matrixWorld);
        this.panner.setPosition(a.x, a.y, a.z)
    }
}();
THREE.AudioListener = function() {
    THREE.Object3D.call(this);
    this.type = "AudioListener";
    this.context = new (window.AudioContext || window.webkitAudioContext);
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.filter = null
}
;
THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype);
THREE.AudioListener.prototype.constructor = THREE.AudioListener;
THREE.AudioListener.prototype.getInput = function() {
    return this.gain
}
;
THREE.AudioListener.prototype.removeFilter = function() {
    null !== this.filter && (this.gain.disconnect(this.filter),
    this.filter.disconnect(this.context.destination),
    this.gain.connect(this.context.destination),
    this.filter = null)
}
;
THREE.AudioListener.prototype.setFilter = function(a) {
    null !== this.filter ? (this.gain.disconnect(this.filter),
    this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination);
    this.filter = a;
    this.gain.connect(this.filter);
    this.filter.connect(this.context.destination)
}
;
THREE.AudioListener.prototype.getFilter = function() {
    return this.filter
}
;
THREE.AudioListener.prototype.setMasterVolume = function(a) {
    this.gain.gain.value = a
}
;
THREE.AudioListener.prototype.getMasterVolume = function() {
    return this.gain.gain.value
}
;
THREE.AudioListener.prototype.updateMatrixWorld = function() {
    var a = new THREE.Vector3
      , b = new THREE.Quaternion
      , c = new THREE.Vector3
      , d = new THREE.Vector3;
    return function(e) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, e);
        e = this.context.listener;
        var f = this.up;
        this.matrixWorld.decompose(a, b, c);
        d.set(0, 0, -1).applyQuaternion(b);
        e.setPosition(a.x, a.y, a.z);
        e.setOrientation(d.x, d.y, d.z, f.x, f.y, f.z)
    }
}();
THREE.Camera = function() {
    THREE.Object3D.call(this);
    this.type = "Camera";
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4
}
;
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.getWorldDirection = function() {
    var a = new THREE.Quaternion;
    return function(b) {
        b = b || new THREE.Vector3;
        this.getWorldQuaternion(a);
        return b.set(0, 0, -1).applyQuaternion(a)
    }
}();
THREE.Camera.prototype.lookAt = function() {
    var a = new THREE.Matrix4;
    return function(b) {
        a.lookAt(this.position, b, this.up);
        this.quaternion.setFromRotationMatrix(a)
    }
}();
THREE.Camera.prototype.clone = function() {
    return (new this.constructor).copy(this)
}
;
THREE.Camera.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a);
    this.matrixWorldInverse.copy(a.matrixWorldInverse);
    this.projectionMatrix.copy(a.projectionMatrix);
    return this
}
;
THREE.CubeCamera = function(a, b, c) {
    THREE.Object3D.call(this);
    this.type = "CubeCamera";
    var d = new THREE.PerspectiveCamera(90,1,a,b);
    d.up.set(0, -1, 0);
    d.lookAt(new THREE.Vector3(1,0,0));
    this.add(d);
    var e = new THREE.PerspectiveCamera(90,1,a,b);
    e.up.set(0, -1, 0);
    e.lookAt(new THREE.Vector3(-1,0,0));
    this.add(e);
    var f = new THREE.PerspectiveCamera(90,1,a,b);
    f.up.set(0, 0, 1);
    f.lookAt(new THREE.Vector3(0,1,0));
    this.add(f);
    var g = new THREE.PerspectiveCamera(90,1,a,b);
    g.up.set(0, 0, -1);
    g.lookAt(new THREE.Vector3(0,-1,0));
    this.add(g);
    var h = new THREE.PerspectiveCamera(90,1,a,b);
    h.up.set(0, -1, 0);
    h.lookAt(new THREE.Vector3(0,0,1));
    this.add(h);
    var k = new THREE.PerspectiveCamera(90,1,a,b);
    k.up.set(0, -1, 0);
    k.lookAt(new THREE.Vector3(0,0,-1));
    this.add(k);
    this.renderTarget = new THREE.WebGLRenderTargetCube(c,c,{
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    });
    this.updateCubeMap = function(a, b) {
        null === this.parent && this.updateMatrixWorld();
        var c = this.renderTarget
          , n = c.texture.generateMipmaps;
        c.texture.generateMipmaps = !1;
        c.activeCubeFace = 0;
        a.render(b, d, c);
        c.activeCubeFace = 1;
        a.render(b, e, c);
        c.activeCubeFace = 2;
        a.render(b, f, c);
        c.activeCubeFace = 3;
        a.render(b, g, c);
        c.activeCubeFace = 4;
        a.render(b, h, c);
        c.texture.generateMipmaps = n;
        c.activeCubeFace = 5;
        a.render(b, k, c);
        a.setRenderTarget(null)
    }
}
;
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CubeCamera.prototype.constructor = THREE.CubeCamera;
THREE.OrthographicCamera = function(a, b, c, d, e, f) {
    THREE.Camera.call(this);
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = void 0 !== e ? e : .1;
    this.far = void 0 !== f ? f : 2E3;
    this.updateProjectionMatrix()
}
;
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    var a = (this.right - this.left) / (2 * this.zoom)
      , b = (this.top - this.bottom) / (2 * this.zoom)
      , c = (this.right + this.left) / 2
      , d = (this.top + this.bottom) / 2;
    this.projectionMatrix.makeOrthographic(c - a, c + a, d + b, d - b, this.near, this.far)
}
;
THREE.OrthographicCamera.prototype.copy = function(a) {
    THREE.Camera.prototype.copy.call(this, a);
    this.left = a.left;
    this.right = a.right;
    this.top = a.top;
    this.bottom = a.bottom;
    this.near = a.near;
    this.far = a.far;
    this.zoom = a.zoom;
    return this
}
;
THREE.OrthographicCamera.prototype.toJSON = function(a) {
    a = THREE.Object3D.prototype.toJSON.call(this, a);
    a.object.zoom = this.zoom;
    a.object.left = this.left;
    a.object.right = this.right;
    a.object.top = this.top;
    a.object.bottom = this.bottom;
    a.object.near = this.near;
    a.object.far = this.far;
    return a
}
;
THREE.PerspectiveCamera = function(a, b, c, d) {
    THREE.Camera.call(this);
    this.type = "PerspectiveCamera";
    this.zoom = 1;
    this.fov = void 0 !== a ? a : 50;
    this.aspect = void 0 !== b ? b : 1;
    this.near = void 0 !== c ? c : .1;
    this.far = void 0 !== d ? d : 2E3;
    this.updateProjectionMatrix()
}
;
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
    void 0 === b && (b = 24);
    this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
    this.updateProjectionMatrix()
}
;
THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = e;
    this.height = f;
    this.updateProjectionMatrix()
}
;
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    var a = THREE.Math.radToDeg(2 * Math.atan(Math.tan(.5 * THREE.Math.degToRad(this.fov)) / this.zoom));
    if (this.fullWidth) {
        var b = this.fullWidth / this.fullHeight
          , a = Math.tan(THREE.Math.degToRad(.5 * a)) * this.near
          , c = -a
          , d = b * c
          , b = Math.abs(b * a - d)
          , c = Math.abs(a - c);
        this.projectionMatrix.makeFrustum(d + this.x * b / this.fullWidth, d + (this.x + this.width) * b / this.fullWidth, a - (this.y + this.height) * c / this.fullHeight, a - this.y * c / this.fullHeight, this.near, this.far)
    } else
        this.projectionMatrix.makePerspective(a, this.aspect, this.near, this.far)
}
;
THREE.PerspectiveCamera.prototype.copy = function(a) {
    THREE.Camera.prototype.copy.call(this, a);
    this.fov = a.fov;
    this.aspect = a.aspect;
    this.near = a.near;
    this.far = a.far;
    this.zoom = a.zoom;
    return this
}
;
THREE.PerspectiveCamera.prototype.toJSON = function(a) {
    a = THREE.Object3D.prototype.toJSON.call(this, a);
    a.object.zoom = this.zoom;
    a.object.fov = this.fov;
    a.object.aspect = this.aspect;
    a.object.near = this.near;
    a.object.far = this.far;
    return a
}
;
THREE.Light = function(a) {
    THREE.Object3D.call(this);
    this.type = "Light";
    this.color = new THREE.Color(a);
    this.receiveShadow = void 0
}
;
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a);
    this.color.copy(a.color);
    return this
}
;
THREE.Light.prototype.toJSON = function(a) {
    a = THREE.Object3D.prototype.toJSON.call(this, a);
    a.object.color = this.color.getHex();
    void 0 !== this.groundColor && (a.object.groundColor = this.groundColor.getHex());
    void 0 !== this.intensity && (a.object.intensity = this.intensity);
    void 0 !== this.distance && (a.object.distance = this.distance);
    void 0 !== this.angle && (a.object.angle = this.angle);
    void 0 !== this.decay && (a.object.decay = this.decay);
    void 0 !== this.exponent && (a.object.exponent = this.exponent);
    return a
}
;
THREE.LightShadow = function(a) {
    this.camera = a;
    this.bias = 0;
    this.darkness = 1;
    this.mapSize = new THREE.Vector2(512,512);
    this.matrix = this.map = null
}
;
THREE.LightShadow.prototype = {
    constructor: THREE.LightShadow,
    copy: function(a) {
        this.camera = a.camera.clone();
        this.bias = a.bias;
        this.darkness = a.darkness;
        this.mapSize.copy(a.mapSize);
        return this
    },
    clone: function() {
        return (new this.constructor).copy(this)
    }
};
THREE.AmbientLight = function(a) {
    THREE.Light.call(this, a);
    this.type = "AmbientLight";
    this.castShadow = void 0
}
;
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function(a, b) {
    THREE.Light.call(this, a);
    this.type = "DirectionalLight";
    this.position.set(0, 1, 0);
    this.updateMatrix();
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b : 1;
    this.shadow = new THREE.LightShadow(new THREE.OrthographicCamera(-500,500,500,-500,50,5E3))
}
;
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.DirectionalLight.prototype.copy = function(a) {
    THREE.Light.prototype.copy.call(this, a);
    this.intensity = a.intensity;
    this.target = a.target.clone();
    this.shadow = a.shadow.clone();
    return this
}
;
THREE.HemisphereLight = function(a, b, c) {
    THREE.Light.call(this, a);
    this.type = "HemisphereLight";
    this.castShadow = void 0;
    this.position.set(0, 1, 0);
    this.updateMatrix();
    this.groundColor = new THREE.Color(b);
    this.intensity = void 0 !== c ? c : 1
}
;
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight;
THREE.HemisphereLight.prototype.copy = function(a) {
    THREE.Light.prototype.copy.call(this, a);
    this.groundColor.copy(a.groundColor);
    this.intensity = a.intensity;
    return this
}
;
THREE.PointLight = function(a, b, c, d) {
    THREE.Light.call(this, a);
    this.type = "PointLight";
    this.intensity = void 0 !== b ? b : 1;
    this.distance = void 0 !== c ? c : 0;
    this.decay = void 0 !== d ? d : 1;
    this.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(90,1,1,500))
}
;
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.PointLight.prototype.copy = function(a) {
    THREE.Light.prototype.copy.call(this, a);
    this.intensity = a.intensity;
    this.distance = a.distance;
    this.decay = a.decay;
    this.shadow = a.shadow.clone();
    return this
}
;
THREE.SpotLight = function(a, b, c, d, e, f) {
    THREE.Light.call(this, a);
    this.type = "SpotLight";
    this.position.set(0, 1, 0);
    this.updateMatrix();
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== b ? b : 1;
    this.distance = void 0 !== c ? c : 0;
    this.angle = void 0 !== d ? d : Math.PI / 3;
    this.exponent = void 0 !== e ? e : 10;
    this.decay = void 0 !== f ? f : 1;
    this.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,50,5E3))
}
;
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.SpotLight.prototype.copy = function(a) {
    THREE.Light.prototype.copy.call(this, a);
    this.intensity = a.intensity;
    this.distance = a.distance;
    this.angle = a.angle;
    this.exponent = a.exponent;
    this.decay = a.decay;
    this.target = a.target.clone();
    this.shadow = a.shadow.clone();
    return this
}
;
THREE.Cache = {
    enabled: !1,
    files: {},
    add: function(a, b) {
        !1 !== this.enabled && (this.files[a] = b)
    },
    get: function(a) {
        if (!1 !== this.enabled)
            return this.files[a]
    },
    remove: function(a) {
        delete this.files[a]
    },
    clear: function() {
        this.files = {}
    }
};
THREE.Loader = function() {
    this.onLoadStart = function() {}
    ;
    this.onLoadProgress = function() {}
    ;
    this.onLoadComplete = function() {}
}
;
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: void 0,
    extractUrlBase: function(a) {
        a = a.split("/");
        if (1 === a.length)
            return "./";
        a.pop();
        return a.join("/") + "/"
    },
    initMaterials: function(a, b, c) {
        for (var d = [], e = 0; e < a.length; ++e)
            d[e] = this.createMaterial(a[e], b, c);
        return d
    },
    createMaterial: function() {
        var a, b, c;
        return function(d, e, f) {
            function g(a, c, d, g, k) {
                a = e + a;
                var l = THREE.Loader.Handlers.get(a);
                null !== l ? a = l.load(a) : (b.setCrossOrigin(f),
                a = b.load(a));
                void 0 !== c && (a.repeat.fromArray(c),
                1 !== c[0] && (a.wrapS = THREE.RepeatWrapping),
                1 !== c[1] && (a.wrapT = THREE.RepeatWrapping));
                void 0 !== d && a.offset.fromArray(d);
                void 0 !== g && ("repeat" === g[0] && (a.wrapS = THREE.RepeatWrapping),
                "mirror" === g[0] && (a.wrapS = THREE.MirroredRepeatWrapping),
                "repeat" === g[1] && (a.wrapT = THREE.RepeatWrapping),
                "mirror" === g[1] && (a.wrapT = THREE.MirroredRepeatWrapping));
                void 0 !== k && (a.anisotropy = k);
                c = THREE.Math.generateUUID();
                h[c] = a;
                return c
            }
            void 0 === a && (a = new THREE.Color);
            void 0 === b && (b = new THREE.TextureLoader);
            void 0 === c && (c = new THREE.MaterialLoader);
            var h = {}, k = {
                uuid: THREE.Math.generateUUID(),
                type: "MeshLambertMaterial"
            }, l;
            for (l in d) {
                var m = d[l];
                switch (l) {
                case "DbgColor":
                case "DbgIndex":
                case "opticalDensity":
                case "illumination":
                    break;
                case "DbgName":
                    k.name = m;
                    break;
                case "blending":
                    k.blending = THREE[m];
                    break;
                case "colorAmbient":
                    console.warn("THREE.Loader.createMaterial: colorAmbient is no longer supported");
                    break;
                case "colorDiffuse":
                    k.color = a.fromArray(m).getHex();
                    break;
                case "colorSpecular":
                    k.specular = a.fromArray(m).getHex();
                    break;
                case "colorEmissive":
                    k.emissive = a.fromArray(m).getHex();
                    break;
                case "specularCoef":
                    k.shininess = m;
                    break;
                case "shading":
                    "basic" === m.toLowerCase() && (k.type = "MeshBasicMaterial");
                    "phong" === m.toLowerCase() && (k.type = "MeshPhongMaterial");
                    break;
                case "mapDiffuse":
                    k.map = g(m, d.mapDiffuseRepeat, d.mapDiffuseOffset, d.mapDiffuseWrap, d.mapDiffuseAnisotropy);
                    break;
                case "mapDiffuseRepeat":
                case "mapDiffuseOffset":
                case "mapDiffuseWrap":
                case "mapDiffuseAnisotropy":
                    break;
                case "mapLight":
                    k.lightMap = g(m, d.mapLightRepeat, d.mapLightOffset, d.mapLightWrap, d.mapLightAnisotropy);
                    break;
                case "mapLightRepeat":
                case "mapLightOffset":
                case "mapLightWrap":
                case "mapLightAnisotropy":
                    break;
                case "mapAO":
                    k.aoMap = g(m, d.mapAORepeat, d.mapAOOffset, d.mapAOWrap, d.mapAOAnisotropy);
                    break;
                case "mapAORepeat":
                case "mapAOOffset":
                case "mapAOWrap":
                case "mapAOAnisotropy":
                    break;
                case "mapBump":
                    k.bumpMap = g(m, d.mapBumpRepeat, d.mapBumpOffset, d.mapBumpWrap, d.mapBumpAnisotropy);
                    break;
                case "mapBumpScale":
                    k.bumpScale = m;
                    break;
                case "mapBumpRepeat":
                case "mapBumpOffset":
                case "mapBumpWrap":
                case "mapBumpAnisotropy":
                    break;
                case "mapNormal":
                    k.normalMap = g(m, d.mapNormalRepeat, d.mapNormalOffset, d.mapNormalWrap, d.mapNormalAnisotropy);
                    break;
                case "mapNormalFactor":
                    k.normalScale = [m, m];
                    break;
                case "mapNormalRepeat":
                case "mapNormalOffset":
                case "mapNormalWrap":
                case "mapNormalAnisotropy":
                    break;
                case "mapSpecular":
                    k.specularMap = g(m, d.mapSpecularRepeat, d.mapSpecularOffset, d.mapSpecularWrap, d.mapSpecularAnisotropy);
                    break;
                case "mapSpecularRepeat":
                case "mapSpecularOffset":
                case "mapSpecularWrap":
                case "mapSpecularAnisotropy":
                    break;
                case "mapAlpha":
                    k.alphaMap = g(m, d.mapAlphaRepeat, d.mapAlphaOffset, d.mapAlphaWrap, d.mapAlphaAnisotropy);
                    break;
                case "mapAlphaRepeat":
                case "mapAlphaOffset":
                case "mapAlphaWrap":
                case "mapAlphaAnisotropy":
                    break;
                case "flipSided":
                    k.side = THREE.BackSide;
                    break;
                case "doubleSided":
                    k.side = THREE.DoubleSide;
                    break;
                case "transparency":
                    console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");
                    k.opacity = m;
                    break;
                case "opacity":
                case "transparent":
                case "depthTest":
                case "depthWrite":
                case "transparent":
                case "visible":
                case "wireframe":
                    k[l] = m;
                    break;
                case "vertexColors":
                    !0 === m && (k.vertexColors = THREE.VertexColors);
                    "face" === m && (k.vertexColors = THREE.FaceColors);
                    break;
                default:
                    console.error("THREE.Loader.createMaterial: Unsupported", l, m)
                }
            }
            "MeshPhongMaterial" !== k.type && delete k.specular;
            1 > k.opacity && (k.transparent = !0);
            c.setTextures(h);
            return c.parse(k)
        }
    }()
};
THREE.Loader.Handlers = {
    handlers: [],
    add: function(a, b) {
        this.handlers.push(a, b)
    },
    get: function(a) {
        for (var b = this.handlers, c = 0, d = b.length; c < d; c += 2) {
            var e = b[c + 1];
            if (b[c].test(a))
                return e
        }
        return null
    }
};
THREE.XHRLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
;
THREE.XHRLoader.prototype = {
    constructor: THREE.XHRLoader,
    load: function(a, b, c, d) {
        void 0 !== this.path && (a = this.path + a);
        var e = this
          , f = THREE.Cache.get(a);
        if (void 0 !== f)
            return b && setTimeout(function() {
                b(f)
            }, 0),
            f;
        var g = new XMLHttpRequest;
        g.overrideMimeType("text/plain");
        g.open("GET", a, !0);
        g.addEventListener("load", function(c) {
            var f = c.target.response;
            THREE.Cache.add(a, f);
            200 === this.status && 4 === this.readyState ? (b && b(f),
            e.manager.itemEnd(a)) : (d && d(c),
            e.manager.itemError(a))
        }, !1);
        void 0 !== c && g.addEventListener("progress", function(a) {
            c(a)
        }, !1);
        g.addEventListener("error", function(b) {
            d && d(b);
            e.manager.itemError(a)
        }, !1);
        void 0 !== this.responseType && (g.responseType = this.responseType);
        void 0 !== this.withCredentials && (g.withCredentials = this.withCredentials);
        g.send(null);
        e.manager.itemStart(a);
        return g
    },
    setPath: function(a) {
        this.path = a
    },
    setResponseType: function(a) {
        this.responseType = a
    },
    setWithCredentials: function(a) {
        this.withCredentials = a
    }
};
THREE.ImageLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
;
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function(a, b, c, d) {
        void 0 !== this.path && (a = this.path + a);
        var e = this
          , f = THREE.Cache.get(a);
        if (void 0 !== f)
            return e.manager.itemStart(a),
            b ? setTimeout(function() {
                b(f);
                e.manager.itemEnd(a)
            }, 0) : e.manager.itemEnd(a),
            f;
        var g = document.createElement("img");
        g.addEventListener("load", function(c) {
            THREE.Cache.add(a, this);
            b && b(this);
            e.manager.itemEnd(a)
        }, !1);
        void 0 !== c && g.addEventListener("progress", function(a) {
            c(a)
        }, !1);
        g.addEventListener("error", function(b) {
            d && d(b);
            e.manager.itemError(a)
        }, !1);
        void 0 !== this.crossOrigin && (g.crossOrigin = this.crossOrigin);
        e.manager.itemStart(a);
        g.src = a;
        return g
    },
    setCrossOrigin: function(a) {
        this.crossOrigin = a
    },
    setPath: function(a) {
        this.path = a
    }
};
THREE.JSONLoader = function(a) {
    "boolean" === typeof a && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."),
    a = void 0);
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    this.withCredentials = !1
}
;
THREE.JSONLoader.prototype = {
    constructor: THREE.JSONLoader,
    get statusDomElement() {
        void 0 === this._statusDomElement && (this._statusDomElement = document.createElement("div"));
        console.warn("THREE.JSONLoader: .statusDomElement has been removed.");
        return this._statusDomElement
    },
    load: function(a, b, c, d) {
        var e = this
          , f = this.texturePath && "string" === typeof this.texturePath ? this.texturePath : THREE.Loader.prototype.extractUrlBase(a);
        c = new THREE.XHRLoader(this.manager);
        c.setWithCredentials(this.withCredentials);
        c.load(a, function(c) {
            c = JSON.parse(c);
            var d = c.metadata;
            if (void 0 !== d && (d = d.type,
            void 0 !== d)) {
                if ("object" === d.toLowerCase()) {
                    console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.ObjectLoader instead.");
                    return
                }
                if ("scene" === d.toLowerCase()) {
                    console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.SceneLoader instead.");
                    return
                }
            }
            c = e.parse(c, f);
            b(c.geometry, c.materials)
        })
    },
    setTexturePath: function(a) {
        this.texturePath = a
    },
    parse: function(a, b) {
        var c = new THREE.Geometry
          , d = void 0 !== a.scale ? 1 / a.scale : 1;
        (function(b) {
            var d, g, h, k, l, m, p, n, q, u, t, w, v, x = a.faces;
            m = a.vertices;
            var E = a.normals
              , y = a.colors
              , F = 0;
            if (void 0 !== a.uvs) {
                for (d = 0; d < a.uvs.length; d++)
                    a.uvs[d].length && F++;
                for (d = 0; d < F; d++)
                    c.faceVertexUvs[d] = []
            }
            k = 0;
            for (l = m.length; k < l; )
                d = new THREE.Vector3,
                d.x = m[k++] * b,
                d.y = m[k++] * b,
                d.z = m[k++] * b,
                c.vertices.push(d);
            k = 0;
            for (l = x.length; k < l; )
                if (b = x[k++],
                q = b & 1,
                h = b & 2,
                d = b & 8,
                p = b & 16,
                u = b & 32,
                m = b & 64,
                b &= 128,
                q) {
                    q = new THREE.Face3;
                    q.a = x[k];
                    q.b = x[k + 1];
                    q.c = x[k + 3];
                    t = new THREE.Face3;
                    t.a = x[k + 1];
                    t.b = x[k + 2];
                    t.c = x[k + 3];
                    k += 4;
                    h && (h = x[k++],
                    q.materialIndex = h,
                    t.materialIndex = h);
                    h = c.faces.length;
                    if (d)
                        for (d = 0; d < F; d++)
                            for (w = a.uvs[d],
                            c.faceVertexUvs[d][h] = [],
                            c.faceVertexUvs[d][h + 1] = [],
                            g = 0; 4 > g; g++)
                                n = x[k++],
                                v = w[2 * n],
                                n = w[2 * n + 1],
                                v = new THREE.Vector2(v,n),
                                2 !== g && c.faceVertexUvs[d][h].push(v),
                                0 !== g && c.faceVertexUvs[d][h + 1].push(v);
                    p && (p = 3 * x[k++],
                    q.normal.set(E[p++], E[p++], E[p]),
                    t.normal.copy(q.normal));
                    if (u)
                        for (d = 0; 4 > d; d++)
                            p = 3 * x[k++],
                            u = new THREE.Vector3(E[p++],E[p++],E[p]),
                            2 !== d && q.vertexNormals.push(u),
                            0 !== d && t.vertexNormals.push(u);
                    m && (m = x[k++],
                    m = y[m],
                    q.color.setHex(m),
                    t.color.setHex(m));
                    if (b)
                        for (d = 0; 4 > d; d++)
                            m = x[k++],
                            m = y[m],
                            2 !== d && q.vertexColors.push(new THREE.Color(m)),
                            0 !== d && t.vertexColors.push(new THREE.Color(m));
                    c.faces.push(q);
                    c.faces.push(t)
                } else {
                    q = new THREE.Face3;
                    q.a = x[k++];
                    q.b = x[k++];
                    q.c = x[k++];
                    h && (h = x[k++],
                    q.materialIndex = h);
                    h = c.faces.length;
                    if (d)
                        for (d = 0; d < F; d++)
                            for (w = a.uvs[d],
                            c.faceVertexUvs[d][h] = [],
                            g = 0; 3 > g; g++)
                                n = x[k++],
                                v = w[2 * n],
                                n = w[2 * n + 1],
                                v = new THREE.Vector2(v,n),
                                c.faceVertexUvs[d][h].push(v);
                    p && (p = 3 * x[k++],
                    q.normal.set(E[p++], E[p++], E[p]));
                    if (u)
                        for (d = 0; 3 > d; d++)
                            p = 3 * x[k++],
                            u = new THREE.Vector3(E[p++],E[p++],E[p]),
                            q.vertexNormals.push(u);
                    m && (m = x[k++],
                    q.color.setHex(y[m]));
                    if (b)
                        for (d = 0; 3 > d; d++)
                            m = x[k++],
                            q.vertexColors.push(new THREE.Color(y[m]));
                    c.faces.push(q)
                }
        }
        )(d);
        (function() {
            var b = void 0 !== a.influencesPerVertex ? a.influencesPerVertex : 2;
            if (a.skinWeights)
                for (var d = 0, g = a.skinWeights.length; d < g; d += b)
                    c.skinWeights.push(new THREE.Vector4(a.skinWeights[d],1 < b ? a.skinWeights[d + 1] : 0,2 < b ? a.skinWeights[d + 2] : 0,3 < b ? a.skinWeights[d + 3] : 0));
            if (a.skinIndices)
                for (d = 0,
                g = a.skinIndices.length; d < g; d += b)
                    c.skinIndices.push(new THREE.Vector4(a.skinIndices[d],1 < b ? a.skinIndices[d + 1] : 0,2 < b ? a.skinIndices[d + 2] : 0,3 < b ? a.skinIndices[d + 3] : 0));
            c.bones = a.bones;
            c.bones && 0 < c.bones.length && (c.skinWeights.length !== c.skinIndices.length || c.skinIndices.length !== c.vertices.length) && console.warn("When skinning, number of vertices (" + c.vertices.length + "), skinIndices (" + c.skinIndices.length + "), and skinWeights (" + c.skinWeights.length + ") should match.")
        }
        )();
        (function(b) {
            if (void 0 !== a.morphTargets)
                for (var d = 0, g = a.morphTargets.length; d < g; d++) {
                    c.morphTargets[d] = {};
                    c.morphTargets[d].name = a.morphTargets[d].name;
                    c.morphTargets[d].vertices = [];
                    for (var h = c.morphTargets[d].vertices, k = a.morphTargets[d].vertices, l = 0, m = k.length; l < m; l += 3) {
                        var p = new THREE.Vector3;
                        p.x = k[l] * b;
                        p.y = k[l + 1] * b;
                        p.z = k[l + 2] * b;
                        h.push(p)
                    }
                }
            if (void 0 !== a.morphColors && 0 < a.morphColors.length)
                for (console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'),
                b = c.faces,
                h = a.morphColors[0].colors,
                d = 0,
                g = b.length; d < g; d++)
                    b[d].color.fromArray(h, 3 * d)
        }
        )(d);
        (function() {
            var b = []
              , d = [];
            void 0 !== a.animation && d.push(a.animation);
            void 0 !== a.animations && (a.animations.length ? d = d.concat(a.animations) : d.push(a.animations));
            for (var g = 0; g < d.length; g++) {
                var h = THREE.AnimationClip.parseAnimation(d[g], c.bones);
                h && b.push(h)
            }
            c.morphTargets && (d = THREE.AnimationClip.CreateClipsFromMorphTargetSequences(c.morphTargets, 10),
            b = b.concat(d));
            0 < b.length && (c.animations = b)
        }
        )();
        c.computeFaceNormals();
        c.computeBoundingSphere();
        if (void 0 === a.materials || 0 === a.materials.length)
            return {
                geometry: c
            };
        d = THREE.Loader.prototype.initMaterials(a.materials, b, this.crossOrigin);
        return {
            geometry: c,
            materials: d
        }
    }
};
THREE.LoadingManager = function(a, b, c) {
    var d = this
      , e = !1
      , f = 0
      , g = 0;
    this.onStart = void 0;
    this.onLoad = a;
    this.onProgress = b;
    this.onError = c;
    this.itemStart = function(a) {
        g++;
        if (!1 === e && void 0 !== d.onStart)
            d.onStart(a, f, g);
        e = !0
    }
    ;
    this.itemEnd = function(a) {
        f++;
        if (void 0 !== d.onProgress)
            d.onProgress(a, f, g);
        if (f === g && (e = !1,
        void 0 !== d.onLoad))
            d.onLoad()
    }
    ;
    this.itemError = function(a) {
        if (void 0 !== d.onError)
            d.onError(a)
    }
}
;
THREE.DefaultLoadingManager = new THREE.LoadingManager;
THREE.BufferGeometryLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
;
THREE.BufferGeometryLoader.prototype = {
    constructor: THREE.BufferGeometryLoader,
    load: function(a, b, c, d) {
        var e = this;
        (new THREE.XHRLoader(e.manager)).load(a, function(a) {
            b(e.parse(JSON.parse(a)))
        }, c, d)
    },
    parse: function(a) {
        var b = new THREE.BufferGeometry
          , c = a.data.index;
        void 0 !== c && (c = new self[c.type](c.array),
        b.setIndex(new THREE.BufferAttribute(c,1)));
        var d = a.data.attributes, e;
        for (e in d) {
            var f = d[e]
              , c = new self[f.type](f.array);
            b.addAttribute(e, new THREE.BufferAttribute(c,f.itemSize))
        }
        e = a.data.groups || a.data.drawcalls || a.data.offsets;
        if (void 0 !== e)
            for (c = 0,
            d = e.length; c !== d; ++c)
                f = e[c],
                b.addGroup(f.start, f.count, f.materialIndex);
        a = a.data.boundingSphere;
        void 0 !== a && (e = new THREE.Vector3,
        void 0 !== a.center && e.fromArray(a.center),
        b.boundingSphere = new THREE.Sphere(e,a.radius));
        return b
    }
};
THREE.MaterialLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    this.textures = {}
}
;
THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader,
    load: function(a, b, c, d) {
        var e = this;
        (new THREE.XHRLoader(e.manager)).load(a, function(a) {
            b(e.parse(JSON.parse(a)))
        }, c, d)
    },
    setTextures: function(a) {
        this.textures = a
    },
    getTexture: function(a) {
        var b = this.textures;
        void 0 === b[a] && console.warn("THREE.MaterialLoader: Undefined texture", a);
        return b[a]
    },
    parse: function(a) {
        var b = new THREE[a.type];
        b.uuid = a.uuid;
        void 0 !== a.name && (b.name = a.name);
        void 0 !== a.color && b.color.setHex(a.color);
        void 0 !== a.roughness && (b.roughness = a.roughness);
        void 0 !== a.metalness && (b.metalness = a.metalness);
        void 0 !== a.emissive && b.emissive.setHex(a.emissive);
        void 0 !== a.specular && b.specular.setHex(a.specular);
        void 0 !== a.shininess && (b.shininess = a.shininess);
        void 0 !== a.uniforms && (b.uniforms = a.uniforms);
        void 0 !== a.vertexShader && (b.vertexShader = a.vertexShader);
        void 0 !== a.fragmentShader && (b.fragmentShader = a.fragmentShader);
        void 0 !== a.vertexColors && (b.vertexColors = a.vertexColors);
        void 0 !== a.shading && (b.shading = a.shading);
        void 0 !== a.blending && (b.blending = a.blending);
        void 0 !== a.side && (b.side = a.side);
        void 0 !== a.opacity && (b.opacity = a.opacity);
        void 0 !== a.transparent && (b.transparent = a.transparent);
        void 0 !== a.alphaTest && (b.alphaTest = a.alphaTest);
        void 0 !== a.depthTest && (b.depthTest = a.depthTest);
        void 0 !== a.depthWrite && (b.depthWrite = a.depthWrite);
        void 0 !== a.wireframe && (b.wireframe = a.wireframe);
        void 0 !== a.wireframeLinewidth && (b.wireframeLinewidth = a.wireframeLinewidth);
        void 0 !== a.size && (b.size = a.size);
        void 0 !== a.sizeAttenuation && (b.sizeAttenuation = a.sizeAttenuation);
        void 0 !== a.map && (b.map = this.getTexture(a.map));
        void 0 !== a.alphaMap && (b.alphaMap = this.getTexture(a.alphaMap),
        b.transparent = !0);
        void 0 !== a.bumpMap && (b.bumpMap = this.getTexture(a.bumpMap));
        void 0 !== a.bumpScale && (b.bumpScale = a.bumpScale);
        void 0 !== a.normalMap && (b.normalMap = this.getTexture(a.normalMap));
        if (void 0 !== a.normalScale) {
            var c = a.normalScale;
            !1 === Array.isArray(c) && (c = [c, c]);
            b.normalScale = (new THREE.Vector2).fromArray(c)
        }
        void 0 !== a.displacementMap && (b.displacementMap = this.getTexture(a.displacementMap));
        void 0 !== a.displacementScale && (b.displacementScale = a.displacementScale);
        void 0 !== a.displacementBias && (b.displacementBias = a.displacementBias);
        void 0 !== a.roughnessMap && (b.roughnessMap = this.getTexture(a.roughnessMap));
        void 0 !== a.metalnessMap && (b.metalnessMap = this.getTexture(a.metalnessMap));
        void 0 !== a.specularMap && (b.specularMap = this.getTexture(a.specularMap));
        void 0 !== a.envMap && (b.envMap = this.getTexture(a.envMap),
        b.combine = THREE.MultiplyOperation);
        a.reflectivity && (b.reflectivity = a.reflectivity);
        void 0 !== a.lightMap && (b.lightMap = this.getTexture(a.lightMap));
        void 0 !== a.lightMapIntensity && (b.lightMapIntensity = a.lightMapIntensity);
        void 0 !== a.aoMap && (b.aoMap = this.getTexture(a.aoMap));
        void 0 !== a.aoMapIntensity && (b.aoMapIntensity = a.aoMapIntensity);
        if (void 0 !== a.materials)
            for (var c = 0, d = a.materials.length; c < d; c++)
                b.materials.push(this.parse(a.materials[c]));
        return b
    }
};
THREE.ObjectLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    this.texturePath = ""
}
;
THREE.ObjectLoader.prototype = {
    constructor: THREE.ObjectLoader,
    load: function(a, b, c, d) {
        "" === this.texturePath && (this.texturePath = a.substring(0, a.lastIndexOf("/") + 1));
        var e = this;
        (new THREE.XHRLoader(e.manager)).load(a, function(a) {
            e.parse(JSON.parse(a), b)
        }, c, d)
    },
    setTexturePath: function(a) {
        this.texturePath = a
    },
    setCrossOrigin: function(a) {
        this.crossOrigin = a
    },
    parse: function(a, b) {
        var c = this.parseGeometries(a.geometries)
          , d = this.parseImages(a.images, function() {
            void 0 !== b && b(e)
        })
          , d = this.parseTextures(a.textures, d)
          , d = this.parseMaterials(a.materials, d)
          , e = this.parseObject(a.object, c, d);
        a.animations && (e.animations = this.parseAnimations(a.animations));
        void 0 !== a.images && 0 !== a.images.length || void 0 === b || b(e);
        return e
    },
    parseGeometries: function(a) {
        var b = {};
        if (void 0 !== a)
            for (var c = new THREE.JSONLoader, d = new THREE.BufferGeometryLoader, e = 0, f = a.length; e < f; e++) {
                var g, h = a[e];
                switch (h.type) {
                case "PlaneGeometry":
                case "PlaneBufferGeometry":
                    g = new THREE[h.type](h.width,h.height,h.widthSegments,h.heightSegments);
                    break;
                case "BoxGeometry":
                case "CubeGeometry":
                    g = new THREE.BoxGeometry(h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);
                    break;
                case "CircleBufferGeometry":
                    g = new THREE.CircleBufferGeometry(h.radius,h.segments,h.thetaStart,h.thetaLength);
                    break;
                case "CircleGeometry":
                    g = new THREE.CircleGeometry(h.radius,h.segments,h.thetaStart,h.thetaLength);
                    break;
                case "CylinderGeometry":
                    g = new THREE.CylinderGeometry(h.radiusTop,h.radiusBottom,h.height,h.radialSegments,h.heightSegments,h.openEnded,h.thetaStart,h.thetaLength);
                    break;
                case "SphereGeometry":
                    g = new THREE.SphereGeometry(h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);
                    break;
                case "SphereBufferGeometry":
                    g = new THREE.SphereBufferGeometry(h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);
                    break;
                case "DodecahedronGeometry":
                    g = new THREE.DodecahedronGeometry(h.radius,h.detail);
                    break;
                case "IcosahedronGeometry":
                    g = new THREE.IcosahedronGeometry(h.radius,h.detail);
                    break;
                case "OctahedronGeometry":
                    g = new THREE.OctahedronGeometry(h.radius,h.detail);
                    break;
                case "TetrahedronGeometry":
                    g = new THREE.TetrahedronGeometry(h.radius,h.detail);
                    break;
                case "RingGeometry":
                    g = new THREE.RingGeometry(h.innerRadius,h.outerRadius,h.thetaSegments,h.phiSegments,h.thetaStart,h.thetaLength);
                    break;
                case "TorusGeometry":
                    g = new THREE.TorusGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);
                    break;
                case "TorusKnotGeometry":
                    g = new THREE.TorusKnotGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.p,h.q,h.heightScale);
                    break;
                case "BufferGeometry":
                    g = d.parse(h);
                    break;
                case "Geometry":
                    g = c.parse(h.data, this.texturePath).geometry;
                    break;
                default:
                    console.warn('THREE.ObjectLoader: Unsupported geometry type "' + h.type + '"');
                    continue
                }
                g.uuid = h.uuid;
                void 0 !== h.name && (g.name = h.name);
                b[h.uuid] = g
            }
        return b
    },
    parseMaterials: function(a, b) {
        var c = {};
        if (void 0 !== a) {
            var d = new THREE.MaterialLoader;
            d.setTextures(b);
            for (var e = 0, f = a.length; e < f; e++) {
                var g = d.parse(a[e]);
                c[g.uuid] = g
            }
        }
        return c
    },
    parseAnimations: function(a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = THREE.AnimationClip.parse(a[c]);
            b.push(d)
        }
        return b
    },
    parseImages: function(a, b) {
        function c(a) {
            d.manager.itemStart(a);
            return g.load(a, function() {
                d.manager.itemEnd(a)
            })
        }
        var d = this
          , e = {};
        if (void 0 !== a && 0 < a.length) {
            var f = new THREE.LoadingManager(b)
              , g = new THREE.ImageLoader(f);
            g.setCrossOrigin(this.crossOrigin);
            for (var f = 0, h = a.length; f < h; f++) {
                var k = a[f]
                  , l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(k.url) ? k.url : d.texturePath + k.url;
                e[k.uuid] = c(l)
            }
        }
        return e
    },
    parseTextures: function(a, b) {
        function c(a) {
            if ("number" === typeof a)
                return a;
            console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", a);
            return THREE[a]
        }
        var d = {};
        if (void 0 !== a)
            for (var e = 0, f = a.length; e < f; e++) {
                var g = a[e];
                void 0 === g.image && console.warn('THREE.ObjectLoader: No "image" specified for', g.uuid);
                void 0 === b[g.image] && console.warn("THREE.ObjectLoader: Undefined image", g.image);
                var h = new THREE.Texture(b[g.image]);
                h.needsUpdate = !0;
                h.uuid = g.uuid;
                void 0 !== g.name && (h.name = g.name);
                void 0 !== g.mapping && (h.mapping = c(g.mapping));
                void 0 !== g.offset && (h.offset = new THREE.Vector2(g.offset[0],g.offset[1]));
                void 0 !== g.repeat && (h.repeat = new THREE.Vector2(g.repeat[0],g.repeat[1]));
                void 0 !== g.minFilter && (h.minFilter = c(g.minFilter));
                void 0 !== g.magFilter && (h.magFilter = c(g.magFilter));
                void 0 !== g.anisotropy && (h.anisotropy = g.anisotropy);
                Array.isArray(g.wrap) && (h.wrapS = c(g.wrap[0]),
                h.wrapT = c(g.wrap[1]));
                d[g.uuid] = h
            }
        return d
    },
    parseObject: function() {
        var a = new THREE.Matrix4;
        return function(b, c, d) {
            function e(a) {
                void 0 === c[a] && console.warn("THREE.ObjectLoader: Undefined geometry", a);
                return c[a]
            }
            function f(a) {
                if (void 0 !== a)
                    return void 0 === d[a] && console.warn("THREE.ObjectLoader: Undefined material", a),
                    d[a]
            }
            var g;
            switch (b.type) {
            case "Scene":
                g = new THREE.Scene;
                break;
            case "PerspectiveCamera":
                g = new THREE.PerspectiveCamera(b.fov,b.aspect,b.near,b.far);
                break;
            case "OrthographicCamera":
                g = new THREE.OrthographicCamera(b.left,b.right,b.top,b.bottom,b.near,b.far);
                break;
            case "AmbientLight":
                g = new THREE.AmbientLight(b.color);
                break;
            case "DirectionalLight":
                g = new THREE.DirectionalLight(b.color,b.intensity);
                break;
            case "PointLight":
                g = new THREE.PointLight(b.color,b.intensity,b.distance,b.decay);
                break;
            case "SpotLight":
                g = new THREE.SpotLight(b.color,b.intensity,b.distance,b.angle,b.exponent,b.decay);
                break;
            case "HemisphereLight":
                g = new THREE.HemisphereLight(b.color,b.groundColor,b.intensity);
                break;
            case "Mesh":
                g = e(b.geometry);
                var h = f(b.material);
                g = g.bones && 0 < g.bones.length ? new THREE.SkinnedMesh(g,h) : new THREE.Mesh(g,h);
                break;
            case "LOD":
                g = new THREE.LOD;
                break;
            case "Line":
                g = new THREE.Line(e(b.geometry),f(b.material),b.mode);
                break;
            case "PointCloud":
            case "Points":
                g = new THREE.Points(e(b.geometry),f(b.material));
                break;
            case "Sprite":
                g = new THREE.Sprite(f(b.material));
                break;
            case "Group":
                g = new THREE.Group;
                break;
            default:
                g = new THREE.Object3D
            }
            g.uuid = b.uuid;
            void 0 !== b.name && (g.name = b.name);
            void 0 !== b.matrix ? (a.fromArray(b.matrix),
            a.decompose(g.position, g.quaternion, g.scale)) : (void 0 !== b.position && g.position.fromArray(b.position),
            void 0 !== b.rotation && g.rotation.fromArray(b.rotation),
            void 0 !== b.scale && g.scale.fromArray(b.scale));
            void 0 !== b.castShadow && (g.castShadow = b.castShadow);
            void 0 !== b.receiveShadow && (g.receiveShadow = b.receiveShadow);
            void 0 !== b.visible && (g.visible = b.visible);
            void 0 !== b.userData && (g.userData = b.userData);
            if (void 0 !== b.children)
                for (var k in b.children)
                    g.add(this.parseObject(b.children[k], c, d));
            if ("LOD" === b.type)
                for (b = b.levels,
                h = 0; h < b.length; h++) {
                    var l = b[h];
                    k = g.getObjectByProperty("uuid", l.object);
                    void 0 !== k && g.addLevel(k, l.distance)
                }
            return g
        }
    }()
};
THREE.TextureLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
;
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function(a, b, c, d) {
        var e = new THREE.Texture
          , f = new THREE.ImageLoader(this.manager);
        f.setCrossOrigin(this.crossOrigin);
        f.setPath(this.path);
        f.load(a, function(a) {
            e.image = a;
            e.needsUpdate = !0;
            void 0 !== b && b(e)
        }, c, d);
        return e
    },
    setCrossOrigin: function(a) {
        this.crossOrigin = a
    },
    setPath: function(a) {
        this.path = a
    }
};
THREE.CubeTextureLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
;
THREE.CubeTextureLoader.prototype = {
    constructor: THREE.CubeTextureLoader,
    load: function(a, b, c, d) {
        function e(c) {
            g.load(a[c], function(a) {
                f.images[c] = a;
                h++;
                6 === h && (f.needsUpdate = !0,
                b && b(f))
            }, void 0, d)
        }
        var f = new THREE.CubeTexture([])
          , g = new THREE.ImageLoader;
        g.setCrossOrigin(this.crossOrigin);
        g.setPath(this.path);
        var h = 0;
        for (c = 0; c < a.length; ++c)
            e(c);
        return f
    },
    setCrossOrigin: function(a) {
        this.crossOrigin = a
    },
    setPath: function(a) {
        this.path = a
    }
};
THREE.DataTextureLoader = THREE.BinaryTextureLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    this._parser = null
}
;
THREE.BinaryTextureLoader.prototype = {
    constructor: THREE.BinaryTextureLoader,
    load: function(a, b, c, d) {
        var e = this
          , f = new THREE.DataTexture
          , g = new THREE.XHRLoader(this.manager);
        g.setResponseType("arraybuffer");
        g.load(a, function(a) {
            if (a = e._parser(a))
                void 0 !== a.image ? f.image = a.image : void 0 !== a.data && (f.image.width = a.width,
                f.image.height = a.height,
                f.image.data = a.data),
                f.wrapS = void 0 !== a.wrapS ? a.wrapS : THREE.ClampToEdgeWrapping,
                f.wrapT = void 0 !== a.wrapT ? a.wrapT : THREE.ClampToEdgeWrapping,
                f.magFilter = void 0 !== a.magFilter ? a.magFilter : THREE.LinearFilter,
                f.minFilter = void 0 !== a.minFilter ? a.minFilter : THREE.LinearMipMapLinearFilter,
                f.anisotropy = void 0 !== a.anisotropy ? a.anisotropy : 1,
                void 0 !== a.format && (f.format = a.format),
                void 0 !== a.type && (f.type = a.type),
                void 0 !== a.mipmaps && (f.mipmaps = a.mipmaps),
                1 === a.mipmapCount && (f.minFilter = THREE.LinearFilter),
                f.needsUpdate = !0,
                b && b(f, a)
        }, c, d);
        return f
    }
};
THREE.CompressedTextureLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    this._parser = null
}
;
THREE.CompressedTextureLoader.prototype = {
    constructor: THREE.CompressedTextureLoader,
    load: function(a, b, c, d) {
        function e(e) {
            k.load(a[e], function(a) {
                a = f._parser(a, !0);
                g[e] = {
                    width: a.width,
                    height: a.height,
                    format: a.format,
                    mipmaps: a.mipmaps
                };
                l += 1;
                6 === l && (1 === a.mipmapCount && (h.minFilter = THREE.LinearFilter),
                h.format = a.format,
                h.needsUpdate = !0,
                b && b(h))
            }, c, d)
        }
        var f = this
          , g = []
          , h = new THREE.CompressedTexture;
        h.image = g;
        var k = new THREE.XHRLoader(this.manager);
        k.setPath(this.path);
        k.setResponseType("arraybuffer");
        if (Array.isArray(a))
            for (var l = 0, m = 0, p = a.length; m < p; ++m)
                e(m);
        else
            k.load(a, function(a) {
                a = f._parser(a, !0);
                if (a.isCubemap)
                    for (var c = a.mipmaps.length / a.mipmapCount, d = 0; d < c; d++) {
                        g[d] = {
                            mipmaps: []
                        };
                        for (var e = 0; e < a.mipmapCount; e++)
                            g[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + e]),
                            g[d].format = a.format,
                            g[d].width = a.width,
                            g[d].height = a.height
                    }
                else
                    h.image.width = a.width,
                    h.image.height = a.height,
                    h.mipmaps = a.mipmaps;
                1 === a.mipmapCount && (h.minFilter = THREE.LinearFilter);
                h.format = a.format;
                h.needsUpdate = !0;
                b && b(h)
            }, c, d);
        return h
    },
    setPath: function(a) {
        this.path = a
    }
};
THREE.Material = function() {
    Object.defineProperty(this, "id", {
        value: THREE.MaterialIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Material";
    this.side = THREE.FrontSide;
    this.opacity = 1;
    this.transparent = !1;
    this.blending = THREE.NormalBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = THREE.AddEquation;
    this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null;
    this.depthFunc = THREE.LessEqualDepth;
    this.colorWrite = this.depthWrite = this.depthTest = !0;
    this.precision = null;
    this.polygonOffset = !1;
    this.overdraw = this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this._needsUpdate = this.visible = !0
}
;
THREE.Material.prototype = {
    constructor: THREE.Material,
    get needsUpdate() {
        return this._needsUpdate
    },
    set needsUpdate(a) {
        !0 === a && this.update();
        this._needsUpdate = a
    },
    setValues: function(a) {
        if (void 0 !== a)
            for (var b in a) {
                var c = a[b];
                if (void 0 === c)
                    console.warn("THREE.Material: '" + b + "' parameter is undefined.");
                else {
                    var d = this[b];
                    void 0 === d ? console.warn("THREE." + this.type + ": '" + b + "' is not a property of this material.") : d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = "overdraw" === b ? Number(c) : c
                }
            }
    },
    toJSON: function(a) {
        function b(a) {
            var b = [], c;
            for (c in a) {
                var d = a[c];
                delete d.metadata;
                b.push(d)
            }
            return b
        }
        var c = void 0 === a;
        c && (a = {
            textures: {},
            images: {}
        });
        var d = {
            metadata: {
                version: 4.4,
                type: "Material",
                generator: "Material.toJSON"
            }
        };
        d.uuid = this.uuid;
        d.type = this.type;
        "" !== this.name && (d.name = this.name);
        this.color instanceof THREE.Color && (d.color = this.color.getHex());
        .5 !== this.roughness && (d.roughness = this.roughness);
        0 < this.metalness && (d.metalness = this.metalness);
        this.emissive instanceof THREE.Color && (d.emissive = this.emissive.getHex());
        this.specular instanceof THREE.Color && (d.specular = this.specular.getHex());
        void 0 !== this.shininess && (d.shininess = this.shininess);
        this.map instanceof THREE.Texture && (d.map = this.map.toJSON(a).uuid);
        this.alphaMap instanceof THREE.Texture && (d.alphaMap = this.alphaMap.toJSON(a).uuid);
        this.lightMap instanceof THREE.Texture && (d.lightMap = this.lightMap.toJSON(a).uuid);
        this.bumpMap instanceof THREE.Texture && (d.bumpMap = this.bumpMap.toJSON(a).uuid,
        d.bumpScale = this.bumpScale);
        this.normalMap instanceof THREE.Texture && (d.normalMap = this.normalMap.toJSON(a).uuid,
        d.normalScale = this.normalScale.toArray());
        this.displacementMap instanceof THREE.Texture && (d.displacementMap = this.displacementMap.toJSON(a).uuid,
        d.displacementScale = this.displacementScale,
        d.displacementBias = this.displacementBias);
        this.roughnessMap instanceof THREE.Texture && (d.roughnessMap = this.roughnessMap.toJSON(a).uuid);
        this.metalnessMap instanceof THREE.Texture && (d.metalnessMap = this.metalnessMap.toJSON(a).uuid);
        this.specularMap instanceof THREE.Texture && (d.specularMap = this.specularMap.toJSON(a).uuid);
        this.envMap instanceof THREE.Texture && (d.envMap = this.envMap.toJSON(a).uuid,
        d.reflectivity = this.reflectivity);
        void 0 !== this.size && (d.size = this.size);
        void 0 !== this.sizeAttenuation && (d.sizeAttenuation = this.sizeAttenuation);
        void 0 !== this.vertexColors && this.vertexColors !== THREE.NoColors && (d.vertexColors = this.vertexColors);
        void 0 !== this.shading && this.shading !== THREE.SmoothShading && (d.shading = this.shading);
        void 0 !== this.blending && this.blending !== THREE.NormalBlending && (d.blending = this.blending);
        void 0 !== this.side && this.side !== THREE.FrontSide && (d.side = this.side);
        1 > this.opacity && (d.opacity = this.opacity);
        !0 === this.transparent && (d.transparent = this.transparent);
        0 < this.alphaTest && (d.alphaTest = this.alphaTest);
        !0 === this.wireframe && (d.wireframe = this.wireframe);
        1 < this.wireframeLinewidth && (d.wireframeLinewidth = this.wireframeLinewidth);
        c && (c = b(a.textures),
        a = b(a.images),
        0 < c.length && (d.textures = c),
        0 < a.length && (d.images = a));
        return d
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.name = a.name;
        this.side = a.side;
        this.opacity = a.opacity;
        this.transparent = a.transparent;
        this.blending = a.blending;
        this.blendSrc = a.blendSrc;
        this.blendDst = a.blendDst;
        this.blendEquation = a.blendEquation;
        this.blendSrcAlpha = a.blendSrcAlpha;
        this.blendDstAlpha = a.blendDstAlpha;
        this.blendEquationAlpha = a.blendEquationAlpha;
        this.depthFunc = a.depthFunc;
        this.depthTest = a.depthTest;
        this.depthWrite = a.depthWrite;
        this.precision = a.precision;
        this.polygonOffset = a.polygonOffset;
        this.polygonOffsetFactor = a.polygonOffsetFactor;
        this.polygonOffsetUnits = a.polygonOffsetUnits;
        this.alphaTest = a.alphaTest;
        this.overdraw = a.overdraw;
        this.visible = a.visible;
        return this
    },
    update: function() {
        this.dispatchEvent({
            type: "update"
        })
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "LineBasicMaterial";
    this.color = new THREE.Color(16777215);
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.vertexColors = THREE.NoColors;
    this.fog = !0;
    this.setValues(a)
}
;
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.LineBasicMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.linewidth = a.linewidth;
    this.linecap = a.linecap;
    this.linejoin = a.linejoin;
    this.vertexColors = a.vertexColors;
    this.fog = a.fog;
    return this
}
;
THREE.LineDashedMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "LineDashedMaterial";
    this.color = new THREE.Color(16777215);
    this.scale = this.linewidth = 1;
    this.dashSize = 3;
    this.gapSize = 1;
    this.vertexColors = THREE.NoColors;
    this.fog = !0;
    this.setValues(a)
}
;
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial;
THREE.LineDashedMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.linewidth = a.linewidth;
    this.scale = a.scale;
    this.dashSize = a.dashSize;
    this.gapSize = a.gapSize;
    this.vertexColors = a.vertexColors;
    this.fog = a.fog;
    return this
}
;
THREE.MeshBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "MeshBasicMaterial";
    this.color = new THREE.Color(16777215);
    this.aoMap = this.map = null;
    this.aoMapIntensity = 1;
    this.envMap = this.alphaMap = this.specularMap = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphTargets = this.skinning = !1;
    this.setValues(a)
}
;
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshBasicMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.fog = a.fog;
    this.shading = a.shading;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.vertexColors = a.vertexColors;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    return this
}
;
THREE.MeshLambertMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "MeshLambertMaterial";
    this.color = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.envMap = this.alphaMap = this.specularMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
}
;
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshLambertMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.emissive.copy(a.emissive);
    this.map = a.map;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.fog = a.fog;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.vertexColors = a.vertexColors;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this
}
;
THREE.MeshPhongMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "MeshPhongMaterial";
    this.color = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.specular = new THREE.Color(1118481);
    this.shininess = 30;
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.bumpMap = this.emissiveMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1,1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.envMap = this.alphaMap = this.specularMap = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
}
;
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshPhongMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.emissive.copy(a.emissive);
    this.specular.copy(a.specular);
    this.shininess = a.shininess;
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.emissiveMap = a.emissiveMap;
    this.bumpMap = a.bumpMap;
    this.bumpScale = a.bumpScale;
    this.normalMap = a.normalMap;
    this.normalScale.copy(a.normalScale);
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.fog = a.fog;
    this.shading = a.shading;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.vertexColors = a.vertexColors;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this
}
;
THREE.MeshStandardMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "MeshStandardMaterial";
    this.color = new THREE.Color(16777215);
    this.metalness = this.roughness = .5;
    this.emissive = new THREE.Color(0);
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.bumpMap = this.emissiveMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1,1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null;
    this.envMapIntensity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a)
}
;
THREE.MeshStandardMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshStandardMaterial.prototype.constructor = THREE.MeshStandardMaterial;
THREE.MeshStandardMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.roughness = a.roughness;
    this.metalness = a.metalness;
    this.emissive.copy(a.emissive);
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.emissiveMap = a.emissiveMap;
    this.bumpMap = a.bumpMap;
    this.bumpScale = a.bumpScale;
    this.normalMap = a.normalMap;
    this.normalScale.copy(a.normalScale);
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.roughnessMap = a.roughnessMap;
    this.metalnessMap = a.metalnessMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.envMapIntensity = a.envMapIntensity;
    this.refractionRatio = a.refractionRatio;
    this.fog = a.fog;
    this.shading = a.shading;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.vertexColors = a.vertexColors;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this
}
;
THREE.MeshDepthMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "MeshDepthMaterial";
    this.wireframe = this.morphTargets = !1;
    this.wireframeLinewidth = 1;
    this.setValues(a)
}
;
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshDepthMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    return this
}
;
THREE.MeshNormalMaterial = function(a) {
    THREE.Material.call(this, a);
    this.type = "MeshNormalMaterial";
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.morphTargets = !1;
    this.setValues(a)
}
;
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshNormalMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    return this
}
;
THREE.MultiMaterial = function(a) {
    this.uuid = THREE.Math.generateUUID();
    this.type = "MultiMaterial";
    this.materials = a instanceof Array ? a : [];
    this.visible = !0
}
;
THREE.MultiMaterial.prototype = {
    constructor: THREE.MultiMaterial,
    toJSON: function(a) {
        for (var b = {
            metadata: {
                version: 4.2,
                type: "material",
                generator: "MaterialExporter"
            },
            uuid: this.uuid,
            type: this.type,
            materials: []
        }, c = this.materials, d = 0, e = c.length; d < e; d++) {
            var f = c[d].toJSON(a);
            delete f.metadata;
            b.materials.push(f)
        }
        b.visible = this.visible;
        return b
    },
    clone: function() {
        for (var a = new this.constructor, b = 0; b < this.materials.length; b++)
            a.materials.push(this.materials[b].clone());
        a.visible = this.visible;
        return a
    }
};
THREE.MeshFaceMaterial = THREE.MultiMaterial;
THREE.PointsMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "PointsMaterial";
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.vertexColors = THREE.NoColors;
    this.fog = !0;
    this.setValues(a)
}
;
THREE.PointsMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.PointsMaterial.prototype.constructor = THREE.PointsMaterial;
THREE.PointsMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.size = a.size;
    this.sizeAttenuation = a.sizeAttenuation;
    this.vertexColors = a.vertexColors;
    this.fog = a.fog;
    return this
}
;
THREE.ShaderMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "ShaderMaterial";
    this.defines = {};
    this.uniforms = {};
    this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
    this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
    this.shading = THREE.SmoothShading;
    this.linewidth = 1;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.lights = this.fog = !1;
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1
    };
    this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0]
    };
    this.index0AttributeName = void 0;
    void 0 !== a && (void 0 !== a.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),
    this.setValues(a))
}
;
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.ShaderMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.fragmentShader = a.fragmentShader;
    this.vertexShader = a.vertexShader;
    this.uniforms = THREE.UniformsUtils.clone(a.uniforms);
    this.attributes = a.attributes;
    this.defines = a.defines;
    this.shading = a.shading;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.fog = a.fog;
    this.lights = a.lights;
    this.vertexColors = a.vertexColors;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    this.extensions = a.extensions;
    return this
}
;
THREE.ShaderMaterial.prototype.toJSON = function(a) {
    a = THREE.Material.prototype.toJSON.call(this, a);
    a.uniforms = this.uniforms;
    a.attributes = this.attributes;
    a.vertexShader = this.vertexShader;
    a.fragmentShader = this.fragmentShader;
    return a
}
;
THREE.RawShaderMaterial = function(a) {
    THREE.ShaderMaterial.call(this, a);
    this.type = "RawShaderMaterial"
}
;
THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial;
THREE.SpriteMaterial = function(a) {
    THREE.Material.call(this);
    this.type = "SpriteMaterial";
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.rotation = 0;
    this.fog = !1;
    this.setValues(a)
}
;
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial;
THREE.SpriteMaterial.prototype.copy = function(a) {
    THREE.Material.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.rotation = a.rotation;
    this.fog = a.fog;
    return this
}
;
THREE.Texture = function(a, b, c, d, e, f, g, h, k) {
    Object.defineProperty(this, "id", {
        value: THREE.TextureIdCount++
    });
    this.uuid = THREE.Math.generateUUID();
    this.sourceFile = this.name = "";
    this.image = void 0 !== a ? a : THREE.Texture.DEFAULT_IMAGE;
    this.mipmaps = [];
    this.mapping = void 0 !== b ? b : THREE.Texture.DEFAULT_MAPPING;
    this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
    this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== k ? k : 1;
    this.format = void 0 !== g ? g : THREE.RGBAFormat;
    this.type = void 0 !== h ? h : THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0,0);
    this.repeat = new THREE.Vector2(1,1);
    this.generateMipmaps = !0;
    this.premultiplyAlpha = !1;
    this.flipY = !0;
    this.unpackAlignment = 4;
    this.version = 0;
    this.onUpdate = null
}
;
THREE.Texture.DEFAULT_IMAGE = void 0;
THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping;
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    set needsUpdate(a) {
        !0 === a && this.version++
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.image = a.image;
        this.mipmaps = a.mipmaps.slice(0);
        this.mapping = a.mapping;
        this.wrapS = a.wrapS;
        this.wrapT = a.wrapT;
        this.magFilter = a.magFilter;
        this.minFilter = a.minFilter;
        this.anisotropy = a.anisotropy;
        this.format = a.format;
        this.type = a.type;
        this.offset.copy(a.offset);
        this.repeat.copy(a.repeat);
        this.generateMipmaps = a.generateMipmaps;
        this.premultiplyAlpha = a.premultiplyAlpha;
        this.flipY = a.flipY;
        this.unpackAlignment = a.unpackAlignment;
        return this
    },
    toJSON: function(a) {
        if (void 0 !== a.textures[this.uuid])
            return a.textures[this.uuid];
        var b = {
            metadata: {
                version: 4.4,
                type: "Texture",
                generator: "Texture.toJSON"
            },
            uuid: this.uuid,
            name: this.name,
            mapping: this.mapping,
            repeat: [this.repeat.x, this.repeat.y],
            offset: [this.offset.x, this.offset.y],
            wrap: [this.wrapS, this.wrapT],
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy
        };
        if (void 0 !== this.image) {
            var c = this.image;
            void 0 === c.uuid && (c.uuid = THREE.Math.generateUUID());
            if (void 0 === a.images[c.uuid]) {
                var d = a.images, e = c.uuid, f = c.uuid, g;
                void 0 !== c.toDataURL ? g = c : (g = document.createElement("canvas"),
                g.width = c.width,
                g.height = c.height,
                g.getContext("2d").drawImage(c, 0, 0, c.width, c.height));
                g = 2048 < g.width || 2048 < g.height ? g.toDataURL("image/jpeg", .6) : g.toDataURL("image/png");
                d[e] = {
                    uuid: f,
                    url: g
                }
            }
            b.image = c.uuid
        }
        return a.textures[this.uuid] = b
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    },
    transformUv: function(a) {
        if (this.mapping === THREE.UVMapping) {
            a.multiply(this.repeat);
            a.add(this.offset);
            if (0 > a.x || 1 < a.x)
                switch (this.wrapS) {
                case THREE.RepeatWrapping:
                    a.x -= Math.floor(a.x);
                    break;
                case THREE.ClampToEdgeWrapping:
                    a.x = 0 > a.x ? 0 : 1;
                    break;
                case THREE.MirroredRepeatWrapping:
                    1 === Math.abs(Math.floor(a.x) % 2) ? a.x = Math.ceil(a.x) - a.x : a.x -= Math.floor(a.x)
                }
            if (0 > a.y || 1 < a.y)
                switch (this.wrapT) {
                case THREE.RepeatWrapping:
                    a.y -= Math.floor(a.y);
                    break;
                case THREE.ClampToEdgeWrapping:
                    a.y = 0 > a.y ? 0 : 1;
                    break;
                case THREE.MirroredRepeatWrapping:
                    1 === Math.abs(Math.floor(a.y) % 2) ? a.y = Math.ceil(a.y) - a.y : a.y -= Math.floor(a.y)
                }
            this.flipY && (a.y = 1 - a.y)
        }
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);
THREE.TextureIdCount = 0;
THREE.CanvasTexture = function(a, b, c, d, e, f, g, h, k) {
    THREE.Texture.call(this, a, b, c, d, e, f, g, h, k);
    this.needsUpdate = !0
}
;
THREE.CanvasTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CanvasTexture.prototype.constructor = THREE.CanvasTexture;
THREE.CubeTexture = function(a, b, c, d, e, f, g, h, k) {
    b = void 0 !== b ? b : THREE.CubeReflectionMapping;
    THREE.Texture.call(this, a, b, c, d, e, f, g, h, k);
    this.images = a;
    this.flipY = !1
}
;
THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CubeTexture.prototype.constructor = THREE.CubeTexture;
THREE.CubeTexture.prototype.copy = function(a) {
    THREE.Texture.prototype.copy.call(this, a);
    this.images = a.images;
    return this
}
;
THREE.CompressedTexture = function(a, b, c, d, e, f, g, h, k, l, m) {
    THREE.Texture.call(this, null, f, g, h, k, l, d, e, m);
    this.image = {
        width: b,
        height: c
    };
    this.mipmaps = a;
    this.generateMipmaps = this.flipY = !1
}
;
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture;
THREE.DataTexture = function(a, b, c, d, e, f, g, h, k, l, m) {
    THREE.Texture.call(this, null, f, g, h, k, l, d, e, m);
    this.image = {
        data: a,
        width: b,
        height: c
    };
    this.magFilter = void 0 !== k ? k : THREE.NearestFilter;
    this.minFilter = void 0 !== l ? l : THREE.NearestFilter;
    this.generateMipmaps = this.flipY = !1
}
;
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.VideoTexture = function(a, b, c, d, e, f, g, h, k) {
    function l() {
        requestAnimationFrame(l);
        a.readyState === a.HAVE_ENOUGH_DATA && (m.needsUpdate = !0)
    }
    THREE.Texture.call(this, a, b, c, d, e, f, g, h, k);
    this.generateMipmaps = !1;
    var m = this;
    l()
}
;
THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.VideoTexture.prototype.constructor = THREE.VideoTexture;
THREE.Group = function() {
    THREE.Object3D.call(this);
    this.type = "Group"
}
;
THREE.Group.prototype = Object.create(THREE.Object3D.prototype);
THREE.Group.prototype.constructor = THREE.Group;
THREE.Points = function(a, b) {
    THREE.Object3D.call(this);
    this.type = "Points";
    this.geometry = void 0 !== a ? a : new THREE.Geometry;
    this.material = void 0 !== b ? b : new THREE.PointsMaterial({
        color: 16777215 * Math.random()
    })
}
;
THREE.Points.prototype = Object.create(THREE.Object3D.prototype);
THREE.Points.prototype.constructor = THREE.Points;
THREE.Points.prototype.raycast = function() {
    var a = new THREE.Matrix4
      , b = new THREE.Ray;
    return function(c, d) {
        function e(a, e) {
            var g = b.distanceSqToPoint(a);
            if (g < k) {
                var h = b.closestPointToPoint(a);
                h.applyMatrix4(f.matrixWorld);
                var l = c.ray.origin.distanceTo(h);
                l < c.near || l > c.far || d.push({
                    distance: l,
                    distanceToRay: Math.sqrt(g),
                    point: h.clone(),
                    index: e,
                    face: null,
                    object: f
                })
            }
        }
        var f = this
          , g = f.geometry
          , h = c.params.Points.threshold;
        a.getInverse(this.matrixWorld);
        b.copy(c.ray).applyMatrix4(a);
        if (null === g.boundingBox || !1 !== b.intersectsBox(g.boundingBox)) {
            var h = h / ((this.scale.x + this.scale.y + this.scale.z) / 3)
              , k = h * h
              , h = new THREE.Vector3;
            if (g instanceof THREE.BufferGeometry) {
                var l = g.index
                  , g = g.attributes.position.array;
                if (null !== l)
                    for (var m = l.array, l = 0, p = m.length; l < p; l++) {
                        var n = m[l];
                        h.fromArray(g, 3 * n);
                        e(h, n)
                    }
                else
                    for (l = 0,
                    m = g.length / 3; l < m; l++)
                        h.fromArray(g, 3 * l),
                        e(h, l)
            } else
                for (h = g.vertices,
                l = 0,
                m = h.length; l < m; l++)
                    e(h[l], l)
        }
    }
}();
THREE.Points.prototype.clone = function() {
    return (new this.constructor(this.geometry,this.material)).copy(this)
}
;
THREE.Line = function(a, b, c) {
    if (1 === c)
        return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."),
        new THREE.LineSegments(a,b);
    THREE.Object3D.call(this);
    this.type = "Line";
    this.geometry = void 0 !== a ? a : new THREE.Geometry;
    this.material = void 0 !== b ? b : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    })
}
;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.constructor = THREE.Line;
THREE.Line.prototype.raycast = function() {
    var a = new THREE.Matrix4
      , b = new THREE.Ray
      , c = new THREE.Sphere;
    return function(d, e) {
        var f = d.linePrecision
          , f = f * f
          , g = this.geometry;
        null === g.boundingSphere && g.computeBoundingSphere();
        c.copy(g.boundingSphere);
        c.applyMatrix4(this.matrixWorld);
        if (!1 !== d.ray.intersectsSphere(c)) {
            a.getInverse(this.matrixWorld);
            b.copy(d.ray).applyMatrix4(a);
            var h = new THREE.Vector3
              , k = new THREE.Vector3
              , l = new THREE.Vector3
              , m = new THREE.Vector3
              , p = this instanceof THREE.LineSegments ? 2 : 1;
            if (g instanceof THREE.BufferGeometry) {
                var n = g.index
                  , q = g.attributes;
                if (null !== n)
                    for (var g = n.array, q = q.position.array, n = 0, u = g.length - 1; n < u; n += p) {
                        var t = g[n + 1];
                        h.fromArray(q, 3 * g[n]);
                        k.fromArray(q, 3 * t);
                        t = b.distanceSqToSegment(h, k, m, l);
                        t > f || (m.applyMatrix4(this.matrixWorld),
                        t = d.ray.origin.distanceTo(m),
                        t < d.near || t > d.far || e.push({
                            distance: t,
                            point: l.clone().applyMatrix4(this.matrixWorld),
                            index: n,
                            face: null,
                            faceIndex: null,
                            object: this
                        }))
                    }
                else
                    for (q = q.position.array,
                    n = 0,
                    u = q.length / 3 - 1; n < u; n += p)
                        h.fromArray(q, 3 * n),
                        k.fromArray(q, 3 * n + 3),
                        t = b.distanceSqToSegment(h, k, m, l),
                        t > f || (m.applyMatrix4(this.matrixWorld),
                        t = d.ray.origin.distanceTo(m),
                        t < d.near || t > d.far || e.push({
                            distance: t,
                            point: l.clone().applyMatrix4(this.matrixWorld),
                            index: n,
                            face: null,
                            faceIndex: null,
                            object: this
                        }))
            } else if (g instanceof THREE.Geometry)
                for (h = g.vertices,
                k = h.length,
                n = 0; n < k - 1; n += p)
                    t = b.distanceSqToSegment(h[n], h[n + 1], m, l),
                    t > f || (m.applyMatrix4(this.matrixWorld),
                    t = d.ray.origin.distanceTo(m),
                    t < d.near || t > d.far || e.push({
                        distance: t,
                        point: l.clone().applyMatrix4(this.matrixWorld),
                        index: n,
                        face: null,
                        faceIndex: null,
                        object: this
                    }))
        }
    }
}();
THREE.Line.prototype.clone = function() {
    return (new this.constructor(this.geometry,this.material)).copy(this)
}
;
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.LineSegments = function(a, b) {
    THREE.Line.call(this, a, b);
    this.type = "LineSegments"
}
;
THREE.LineSegments.prototype = Object.create(THREE.Line.prototype);
THREE.LineSegments.prototype.constructor = THREE.LineSegments;
THREE.Mesh = function(a, b) {
    THREE.Object3D.call(this);
    this.type = "Mesh";
    this.geometry = void 0 !== a ? a : new THREE.Geometry;
    this.material = void 0 !== b ? b : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.drawMode = THREE.TrianglesDrawMode;
    this.updateMorphTargets()
}
;
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.setDrawMode = function(a) {
    this.drawMode = a
}
;
THREE.Mesh.prototype.updateMorphTargets = function() {
    if (void 0 !== this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
        this.morphTargetBase = -1;
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++)
            this.morphTargetInfluences.push(0),
            this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
    }
}
;
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    if (void 0 !== this.morphTargetDictionary[a])
        return this.morphTargetDictionary[a];
    console.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
}
;
THREE.Mesh.prototype.raycast = function() {
    function a(a, b, c, d, e, f, g) {
        THREE.Triangle.barycoordFromPoint(a, b, c, d, t);
        e.multiplyScalar(t.x);
        f.multiplyScalar(t.y);
        g.multiplyScalar(t.z);
        e.add(f).add(g);
        return e.clone()
    }
    function b(a, b, c, d, e, f, g) {
        var h = a.material;
        if (null === (h.side === THREE.BackSide ? c.intersectTriangle(f, e, d, !0, g) : c.intersectTriangle(d, e, f, h.side !== THREE.DoubleSide, g)))
            return null;
        v.copy(g);
        v.applyMatrix4(a.matrixWorld);
        c = b.ray.origin.distanceTo(v);
        return c < b.near || c > b.far ? null : {
            distance: c,
            point: v.clone(),
            object: a
        }
    }
    function c(c, d, e, f, l, m, p, t) {
        g.fromArray(f, 3 * m);
        h.fromArray(f, 3 * p);
        k.fromArray(f, 3 * t);
        if (c = b(c, d, e, g, h, k, w))
            l && (n.fromArray(l, 2 * m),
            q.fromArray(l, 2 * p),
            u.fromArray(l, 2 * t),
            c.uv = a(w, g, h, k, n, q, u)),
            c.face = new THREE.Face3(m,p,t,THREE.Triangle.normal(g, h, k)),
            c.faceIndex = m;
        return c
    }
    var d = new THREE.Matrix4
      , e = new THREE.Ray
      , f = new THREE.Sphere
      , g = new THREE.Vector3
      , h = new THREE.Vector3
      , k = new THREE.Vector3
      , l = new THREE.Vector3
      , m = new THREE.Vector3
      , p = new THREE.Vector3
      , n = new THREE.Vector2
      , q = new THREE.Vector2
      , u = new THREE.Vector2
      , t = new THREE.Vector3
      , w = new THREE.Vector3
      , v = new THREE.Vector3;
    return function(t, v) {
        var y = this.geometry
          , F = this.material;
        if (void 0 !== F) {
            null === y.boundingSphere && y.computeBoundingSphere();
            var z = this.matrixWorld;
            f.copy(y.boundingSphere);
            f.applyMatrix4(z);
            if (!1 !== t.ray.intersectsSphere(f) && (d.getInverse(z),
            e.copy(t.ray).applyMatrix4(d),
            null === y.boundingBox || !1 !== e.intersectsBox(y.boundingBox))) {
                var A, B;
                if (y instanceof THREE.BufferGeometry) {
                    var H, G, F = y.index, z = y.attributes, y = z.position.array;
                    void 0 !== z.uv && (A = z.uv.array);
                    if (null !== F)
                        for (var z = F.array, D = 0, K = z.length; D < K; D += 3) {
                            if (F = z[D],
                            H = z[D + 1],
                            G = z[D + 2],
                            B = c(this, t, e, y, A, F, H, G))
                                B.faceIndex = Math.floor(D / 3),
                                v.push(B)
                        }
                    else
                        for (D = 0,
                        K = y.length; D < K; D += 9)
                            if (F = D / 3,
                            H = F + 1,
                            G = F + 2,
                            B = c(this, t, e, y, A, F, H, G))
                                B.index = F,
                                v.push(B)
                } else if (y instanceof THREE.Geometry) {
                    var N, M, z = F instanceof THREE.MeshFaceMaterial, D = !0 === z ? F.materials : null, K = y.vertices;
                    H = y.faces;
                    G = y.faceVertexUvs[0];
                    0 < G.length && (A = G);
                    for (var C = 0, J = H.length; C < J; C++) {
                        var L = H[C];
                        B = !0 === z ? D[L.materialIndex] : F;
                        if (void 0 !== B) {
                            G = K[L.a];
                            N = K[L.b];
                            M = K[L.c];
                            if (!0 === B.morphTargets) {
                                B = y.morphTargets;
                                var Q = this.morphTargetInfluences;
                                g.set(0, 0, 0);
                                h.set(0, 0, 0);
                                k.set(0, 0, 0);
                                for (var T = 0, R = B.length; T < R; T++) {
                                    var P = Q[T];
                                    if (0 !== P) {
                                        var I = B[T].vertices;
                                        g.addScaledVector(l.subVectors(I[L.a], G), P);
                                        h.addScaledVector(m.subVectors(I[L.b], N), P);
                                        k.addScaledVector(p.subVectors(I[L.c], M), P)
                                    }
                                }
                                g.add(G);
                                h.add(N);
                                k.add(M);
                                G = g;
                                N = h;
                                M = k
                            }
                            if (B = b(this, t, e, G, N, M, w))
                                A && (Q = A[C],
                                n.copy(Q[0]),
                                q.copy(Q[1]),
                                u.copy(Q[2]),
                                B.uv = a(w, G, N, M, n, q, u)),
                                B.face = L,
                                B.faceIndex = C,
                                v.push(B)
                        }
                    }
                }
            }
        }
    }
}();
THREE.Mesh.prototype.clone = function() {
    return (new this.constructor(this.geometry,this.material)).copy(this)
}
;
THREE.Bone = function(a) {
    THREE.Object3D.call(this);
    this.type = "Bone";
    this.skin = a
}
;
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a);
    this.skin = a.skin;
    return this
}
;
THREE.Skeleton = function(a, b, c) {
    this.useVertexTexture = void 0 !== c ? c : !0;
    this.identityMatrix = new THREE.Matrix4;
    a = a || [];
    this.bones = a.slice(0);
    this.useVertexTexture ? (a = Math.sqrt(4 * this.bones.length),
    a = THREE.Math.nextPowerOfTwo(Math.ceil(a)),
    this.boneTextureHeight = this.boneTextureWidth = a = Math.max(a, 4),
    this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4),
    this.boneTexture = new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType)) : this.boneMatrices = new Float32Array(16 * this.bones.length);
    if (void 0 === b)
        this.calculateInverses();
    else if (this.bones.length === b.length)
        this.boneInverses = b.slice(0);
    else
        for (console.warn("THREE.Skeleton bonInverses is the wrong length."),
        this.boneInverses = [],
        b = 0,
        a = this.bones.length; b < a; b++)
            this.boneInverses.push(new THREE.Matrix4)
}
;
THREE.Skeleton.prototype.calculateInverses = function() {
    this.boneInverses = [];
    for (var a = 0, b = this.bones.length; a < b; a++) {
        var c = new THREE.Matrix4;
        this.bones[a] && c.getInverse(this.bones[a].matrixWorld);
        this.boneInverses.push(c)
    }
}
;
THREE.Skeleton.prototype.pose = function() {
    for (var a, b = 0, c = this.bones.length; b < c; b++)
        (a = this.bones[b]) && a.matrixWorld.getInverse(this.boneInverses[b]);
    b = 0;
    for (c = this.bones.length; b < c; b++)
        if (a = this.bones[b])
            a.parent ? (a.matrix.getInverse(a.parent.matrixWorld),
            a.matrix.multiply(a.matrixWorld)) : a.matrix.copy(a.matrixWorld),
            a.matrix.decompose(a.position, a.quaternion, a.scale)
}
;
THREE.Skeleton.prototype.update = function() {
    var a = new THREE.Matrix4;
    return function() {
        for (var b = 0, c = this.bones.length; b < c; b++)
            a.multiplyMatrices(this.bones[b] ? this.bones[b].matrixWorld : this.identityMatrix, this.boneInverses[b]),
            a.flattenToArrayOffset(this.boneMatrices, 16 * b);
        this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
    }
}();
THREE.Skeleton.prototype.clone = function() {
    return new THREE.Skeleton(this.bones,this.boneInverses,this.useVertexTexture)
}
;
THREE.SkinnedMesh = function(a, b, c) {
    THREE.Mesh.call(this, a, b);
    this.type = "SkinnedMesh";
    this.bindMode = "attached";
    this.bindMatrix = new THREE.Matrix4;
    this.bindMatrixInverse = new THREE.Matrix4;
    a = [];
    if (this.geometry && void 0 !== this.geometry.bones) {
        for (var d, e = 0, f = this.geometry.bones.length; e < f; ++e)
            d = this.geometry.bones[e],
            b = new THREE.Bone(this),
            a.push(b),
            b.name = d.name,
            b.position.fromArray(d.pos),
            b.quaternion.fromArray(d.rotq),
            void 0 !== d.scl && b.scale.fromArray(d.scl);
        e = 0;
        for (f = this.geometry.bones.length; e < f; ++e)
            d = this.geometry.bones[e],
            -1 !== d.parent && null !== d.parent ? a[d.parent].add(a[e]) : this.add(a[e])
    }
    this.normalizeSkinWeights();
    this.updateMatrixWorld(!0);
    this.bind(new THREE.Skeleton(a,void 0,c), this.matrixWorld)
}
;
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.bind = function(a, b) {
    this.skeleton = a;
    void 0 === b && (this.updateMatrixWorld(!0),
    this.skeleton.calculateInverses(),
    b = this.matrixWorld);
    this.bindMatrix.copy(b);
    this.bindMatrixInverse.getInverse(b)
}
;
THREE.SkinnedMesh.prototype.pose = function() {
    this.skeleton.pose()
}
;
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function() {
    if (this.geometry instanceof THREE.Geometry)
        for (var a = 0; a < this.geometry.skinIndices.length; a++) {
            var b = this.geometry.skinWeights[a]
              , c = 1 / b.lengthManhattan();
            Infinity !== c ? b.multiplyScalar(c) : b.set(1)
        }
}
;
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
    THREE.Mesh.prototype.updateMatrixWorld.call(this, !0);
    "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unrecognized bindMode: " + this.bindMode)
}
;
THREE.SkinnedMesh.prototype.clone = function() {
    return (new this.constructor(this.geometry,this.material,this.useVertexTexture)).copy(this)
}
;
THREE.LOD = function() {
    THREE.Object3D.call(this);
    this.type = "LOD";
    Object.defineProperties(this, {
        levels: {
            enumerable: !0,
            value: []
        },
        objects: {
            get: function() {
                console.warn("THREE.LOD: .objects has been renamed to .levels.");
                return this.levels
            }
        }
    })
}
;
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.addLevel = function(a, b) {
    void 0 === b && (b = 0);
    b = Math.abs(b);
    for (var c = this.levels, d = 0; d < c.length && !(b < c[d].distance); d++)
        ;
    c.splice(d, 0, {
        distance: b,
        object: a
    });
    this.add(a)
}
;
THREE.LOD.prototype.getObjectForDistance = function(a) {
    for (var b = this.levels, c = 1, d = b.length; c < d && !(a < b[c].distance); c++)
        ;
    return b[c - 1].object
}
;
THREE.LOD.prototype.raycast = function() {
    var a = new THREE.Vector3;
    return function(b, c) {
        a.setFromMatrixPosition(this.matrixWorld);
        var d = b.ray.origin.distanceTo(a);
        this.getObjectForDistance(d).raycast(b, c)
    }
}();
THREE.LOD.prototype.update = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3;
    return function(c) {
        var d = this.levels;
        if (1 < d.length) {
            a.setFromMatrixPosition(c.matrixWorld);
            b.setFromMatrixPosition(this.matrixWorld);
            c = a.distanceTo(b);
            d[0].object.visible = !0;
            for (var e = 1, f = d.length; e < f; e++)
                if (c >= d[e].distance)
                    d[e - 1].object.visible = !1,
                    d[e].object.visible = !0;
                else
                    break;
            for (; e < f; e++)
                d[e].object.visible = !1
        }
    }
}();
THREE.LOD.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a, !1);
    a = a.levels;
    for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b];
        this.addLevel(d.object.clone(), d.distance)
    }
    return this
}
;
THREE.LOD.prototype.toJSON = function(a) {
    a = THREE.Object3D.prototype.toJSON.call(this, a);
    a.object.levels = [];
    for (var b = this.levels, c = 0, d = b.length; c < d; c++) {
        var e = b[c];
        a.object.levels.push({
            object: e.object.uuid,
            distance: e.distance
        })
    }
    return a
}
;
THREE.Sprite = function() {
    var a = new Uint16Array([0, 1, 2, 0, 2, 3])
      , b = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0])
      , c = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
      , d = new THREE.BufferGeometry;
    d.setIndex(new THREE.BufferAttribute(a,1));
    d.addAttribute("position", new THREE.BufferAttribute(b,3));
    d.addAttribute("uv", new THREE.BufferAttribute(c,2));
    return function(a) {
        THREE.Object3D.call(this);
        this.type = "Sprite";
        this.geometry = d;
        this.material = void 0 !== a ? a : new THREE.SpriteMaterial
    }
}();
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.raycast = function() {
    var a = new THREE.Vector3;
    return function(b, c) {
        a.setFromMatrixPosition(this.matrixWorld);
        var d = b.ray.distanceSqToPoint(a);
        d > this.scale.x * this.scale.y || c.push({
            distance: Math.sqrt(d),
            point: this.position,
            face: null,
            object: this
        })
    }
}();
THREE.Sprite.prototype.clone = function() {
    return (new this.constructor(this.material)).copy(this)
}
;
THREE.Particle = THREE.Sprite;
THREE.LensFlare = function(a, b, c, d, e) {
    THREE.Object3D.call(this);
    this.lensFlares = [];
    this.positionScreen = new THREE.Vector3;
    this.customUpdateCallback = void 0;
    void 0 !== a && this.add(a, b, c, d, e)
}
;
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.add = function(a, b, c, d, e, f) {
    void 0 === b && (b = -1);
    void 0 === c && (c = 0);
    void 0 === f && (f = 1);
    void 0 === e && (e = new THREE.Color(16777215));
    void 0 === d && (d = THREE.NormalBlending);
    c = Math.min(c, Math.max(0, c));
    this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 0,
        opacity: f,
        color: e,
        blending: d
    })
}
;
THREE.LensFlare.prototype.updateLensFlares = function() {
    var a, b = this.lensFlares.length, c, d = 2 * -this.positionScreen.x, e = 2 * -this.positionScreen.y;
    for (a = 0; a < b; a++)
        c = this.lensFlares[a],
        c.x = this.positionScreen.x + d * c.distance,
        c.y = this.positionScreen.y + e * c.distance,
        c.wantedRotation = c.x * Math.PI * .25,
        c.rotation += .25 * (c.wantedRotation - c.rotation)
}
;
THREE.LensFlare.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a);
    this.positionScreen.copy(a.positionScreen);
    this.customUpdateCallback = a.customUpdateCallback;
    for (var b = 0, c = a.lensFlares.length; b < c; b++)
        this.lensFlares.push(a.lensFlares[b]);
    return this
}
;
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.type = "Scene";
    this.overrideMaterial = this.fog = null;
    this.autoUpdate = !0
}
;
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.copy = function(a) {
    THREE.Object3D.prototype.copy.call(this, a);
    null !== a.fog && (this.fog = a.fog.clone());
    null !== a.overrideMaterial && (this.overrideMaterial = a.overrideMaterial.clone());
    this.autoUpdate = a.autoUpdate;
    this.matrixAutoUpdate = a.matrixAutoUpdate;
    return this
}
;
THREE.Fog = function(a, b, c) {
    this.name = "";
    this.color = new THREE.Color(a);
    this.near = void 0 !== b ? b : 1;
    this.far = void 0 !== c ? c : 1E3
}
;
THREE.Fog.prototype.clone = function() {
    return new THREE.Fog(this.color.getHex(),this.near,this.far)
}
;
THREE.FogExp2 = function(a, b) {
    this.name = "";
    this.color = new THREE.Color(a);
    this.density = void 0 !== b ? b : 2.5E-4
}
;
THREE.FogExp2.prototype.clone = function() {
    return new THREE.FogExp2(this.color.getHex(),this.density)
}
;
THREE.ShaderChunk = {};
THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n";
THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n";
THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n";
THREE.ShaderChunk.aomap_fragment = "#ifdef USE_AOMAP\n\treflectedLight.indirectDiffuse *= ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n#endif\n";
THREE.ShaderChunk.aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";
THREE.ShaderChunk.begin_vertex = "\nvec3 transformed = vec3( position );\n";
THREE.ShaderChunk.beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n";
THREE.ShaderChunk.bsdfs = "float calcLightAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif ( decayExponent > 0.0 ) {\n\t  return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = alpha * alpha;\n\tfloat gl = dotNL + pow( a2 + ( 1.0 - a2 ) * dotNL * dotNL, 0.5 );\n\tfloat gv = dotNV + pow( a2 + ( 1.0 - a2 ) * dotNV * dotNV, 0.5 );\n\treturn 1.0 / ( gl * gv );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = alpha * alpha;\n\tfloat denom = dotNH * dotNH * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / ( denom * denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = roughness * roughness;\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_Smith( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / square( ggxRoughness + 0.0001 ) - 2.0 );\n}";
THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n";
THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";
THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n";
THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";
THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif";
THREE.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat square( const in float x ) { return x*x; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nvec3 inputToLinear( in vec3 a ) {\n\t#ifdef GAMMA_INPUT\n\t\treturn pow( a, vec3( float( GAMMA_FACTOR ) ) );\n\t#else\n\t\treturn a;\n\t#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n\t#ifdef GAMMA_OUTPUT\n\t\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n\t#else\n\t\treturn a;\n\t#endif\n}\n";
THREE.ShaderChunk.defaultnormal_vertex = "#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n";
THREE.ShaderChunk.displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n";
THREE.ShaderChunk.displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n";
THREE.ShaderChunk.emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = inputToLinear( emissiveColor.rgb );\n\ttotalEmissiveLight *= emissiveColor.rgb;\n#endif\n";
THREE.ShaderChunk.emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n";
THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#else\n\t\tfloat flipNormal = 1.0;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#endif\n\tenvColor.xyz = inputToLinear( envColor.xyz );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n";
THREE.ShaderChunk.envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( STANDARD )\n\tuniform float reflectivity;\n\tuniform float envMapIntenstiy;\n#endif\n#ifdef USE_ENVMAP\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( STANDARD )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n";
THREE.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG ) && ! defined( STANDARD )\n\tvarying vec3 vReflect;\n\tuniform float refractionRatio;\n#endif\n";
THREE.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG ) && ! defined( STANDARD )\n\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t#ifdef ENVMAP_MODE_REFLECTION\n\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t#else\n\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t#endif\n#endif\n";
THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t#endif\n\t\n\toutgoingLight = mix( outgoingLight, fogColor, fogFactor );\n#endif";
THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";
THREE.ShaderChunk.lights_pars = "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\treturn PI * ambientLightColor;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t  vec3 direction;\n\t  vec3 color;\n\t  int shadow;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tIncidentLight getDirectionalDirectLight( const in DirectionalLight directionalLight, const in GeometricContext geometry ) {\n\t\tIncidentLight directLight;\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\treturn directLight;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t  vec3 position;\n\t  vec3 color;\n\t  float distance;\n\t  float decay;\n\t  int shadow;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tIncidentLight getPointDirectLight( const in PointLight pointLight, const in GeometricContext geometry ) {\n\t\tIncidentLight directLight;\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= calcLightAttenuation( length( lVector ), pointLight.distance, pointLight.decay );\n\t\treturn directLight;\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t  vec3 position;\n\t  vec3 direction;\n\t  vec3 color;\n\t  float distance;\n\t  float decay;\n\t  float angleCos;\n\t  float exponent;\n\t  int shadow;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tIncidentLight getSpotDirectLight( const in SpotLight spotLight, const in GeometricContext geometry ) {\n\t\tIncidentLight directLight;\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat spotEffect = dot( directLight.direction, spotLight.direction );\n\t\tif ( spotEffect > spotLight.angleCos ) {\n\t\t\tfloat spotEffect = dot( spotLight.direction, directLight.direction );\n\t\t\tspotEffect = saturate( pow( saturate( spotEffect ), spotLight.exponent ) );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= ( spotEffect * calcLightAttenuation( length( lVector ), spotLight.distance, spotLight.decay ) );\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t}\n\t\treturn directLight;\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t  vec3 direction;\n\t  vec3 skyColor;\n\t  vec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\treturn PI * mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( STANDARD )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#else\n\t\t\tfloat flipNormal = 1.0;\n\t\t#endif\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = flipNormal * vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t#else\n\t\t\tvec3 envMapColor = vec3( 0.0 );\n\t\t#endif\n\t\tenvMapColor.rgb = inputToLinear( envMapColor.rgb );\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( square( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#else\n\t\t\tfloat flipNormal = 1.0;\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#endif\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec );\n\t\t\t#endif\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV );\n\t\t\t#endif\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t\t\t#endif\n\t\t#endif\n\t\tenvMapColor.rgb = inputToLinear( envMapColor.rgb );\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n";
THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";
THREE.ShaderChunk.lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tIncidentLight directLight = getPointDirectLight( pointLights[ i ], geometry );\n\t\tfloat dotNL = dot( geometry.normal, directLight.direction );\n\t\tvec3 directLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tIncidentLight directLight = getSpotDirectLight( spotLights[ i ], geometry );\n\t\tfloat dotNL = dot( geometry.normal, directLight.direction );\n\t\tvec3 directLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tIncidentLight directLight = getDirectionalDirectLight( directionalLights[ i ], geometry );\n\t\tfloat dotNL = dot( geometry.normal, directLight.direction );\n\t\tvec3 directLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n\t{\n\t\t#if NUM_HEMI_LIGHTS > 0\n\t\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t\t\t#ifdef DOUBLE_SIDED\n\t\t\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t\t\t#endif\n\t\t\t}\n\t\t#endif\n\t}\n";
THREE.ShaderChunk.lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n#ifdef METAL\n\tmaterial.diffuseColor = vec3( 0.0 );\n#endif\n";
THREE.ShaderChunk.lights_phong_pars_fragment = "#ifdef USE_ENVMAP\n\tvarying vec3 vWorldPosition;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid BlinnPhongMaterial_RE_DirectLight( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * PI * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid BlinnPhongMaterial_RE_IndirectDiffuseLight( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define Material_RE_DirectLight    BlinnPhongMaterial_RE_DirectLight\n#define Material_RE_IndirectDiffuseLight    BlinnPhongMaterial_RE_IndirectDiffuseLight\n#define Material_LightProbeLOD( material )   (0)\n";
THREE.ShaderChunk.lights_phong_pars_vertex = "#ifdef USE_ENVMAP\n\tvarying vec3 vWorldPosition;\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tuniform vec3 pointLightPosition[ NUM_POINT_LIGHTS ];\n#endif\n";
THREE.ShaderChunk.lights_phong_vertex = "#ifdef USE_ENVMAP\n\tvWorldPosition = worldPosition.xyz;\n#endif\n";
THREE.ShaderChunk.lights_standard_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n";
THREE.ShaderChunk.lights_standard_pars_fragment = "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\tfloat\tclearCoatWeight;\n\tfloat\tclearCoatRoughness;\n};\nvoid PhysicalMaterial_RE_DirectLight( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * PI * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n}\nvoid PhysicalMaterial_RE_DiffuseIndirectLight( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid PhysicalMaterial_RE_SpecularIndirectLight( const in vec3 radiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectSpecular += radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n}\n#define Material_RE_DirectLight    PhysicalMaterial_RE_DirectLight\n#define Material_RE_IndirectDiffuseLight    PhysicalMaterial_RE_DiffuseIndirectLight\n#define Material_RE_IndirectSpecularLight    PhysicalMaterial_RE_SpecularIndirectLight\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n";
THREE.ShaderChunk.lights_template = "\nGeometricContext geometry;\ngeometry.position = -vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( Material_RE_DirectLight )\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tPointLight pointLight = pointLights[ i ];\n\t\tIncidentLight directLight = getPointDirectLight( pointLight, geometry );\n\t\t#ifdef USE_SHADOWMAP\n\t\tif ( pointLight.shadow > - 1 ) {\n\t\t\tfor ( int j = 0; j < NUM_SHADOWS; j ++ ) {\n\t\t\t\tif ( j == pointLight.shadow ) {\n\t\t\t\t\tdirectLight.color *= shadows[ j ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t#endif\n\t\tMaterial_RE_DirectLight( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( Material_RE_DirectLight )\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tSpotLight spotLight = spotLights[ i ];\n\t\tIncidentLight directLight = getSpotDirectLight( spotLight, geometry );\n\t\t#ifdef USE_SHADOWMAP\n\t\tif ( spotLight.shadow > - 1 ) {\n\t\t\tfor ( int j = 0; j < NUM_SHADOWS; j ++ ) {\n\t\t\t\tif ( j == spotLight.shadow ) {\n\t\t\t\t\tdirectLight.color *= shadows[ j ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t#endif\n\t\tMaterial_RE_DirectLight( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( Material_RE_DirectLight )\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tDirectionalLight directionalLight = directionalLights[ i ];\n\t\tIncidentLight directLight = getDirectionalDirectLight( directionalLight, geometry );\n\t\t#ifdef USE_SHADOWMAP\n\t\tif ( directionalLight.shadow > - 1 ) {\n\t\t\tfor ( int j = 0; j < NUM_SHADOWS; j ++ ) {\n\t\t\t\tif ( j == directionalLight.shadow ) {\n\t\t\t\t\tdirectLight.color *= shadows[ j ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t#endif\n\t\tMaterial_RE_DirectLight( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( Material_RE_IndirectDiffuseLight )\n\t{\n\t\tvec3 indirectDiffuseIrradiance = getAmbientLightIrradiance( ambientLightColor );\n\t\t#ifdef USE_LIGHTMAP\n\t\t\tindirectDiffuseIrradiance += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#endif\n\t\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\t\tindirectDiffuseIrradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t\t}\n\t\t#endif\n\t\tMaterial_RE_IndirectDiffuseLight( indirectDiffuseIrradiance, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( Material_RE_IndirectSpecularLight )\n\t{\n\t\tvec3 indirectSpecularRadiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t\tMaterial_RE_IndirectSpecularLight( indirectSpecularRadiance, geometry, material, reflectedLight );\n    }\n#endif\n";
THREE.ShaderChunk.linear_to_gamma_fragment = "\n\toutgoingLight = linearToOutput( outgoingLight );\n";
THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif";
THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif";
THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n";
THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor.xyz = inputToLinear( texelColor.xyz );\n\tdiffuseColor *= texelColor;\n#endif\n";
THREE.ShaderChunk.map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";
THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n#endif\n";
THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n";
THREE.ShaderChunk.metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.r;\n#endif\n";
THREE.ShaderChunk.metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";
THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n";
THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";
THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n";
THREE.ShaderChunk.normal_fragment = "#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t#endif\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n";
THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n";
THREE.ShaderChunk.project_vertex = "#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n";
THREE.ShaderChunk.roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.r;\n#endif\n";
THREE.ShaderChunk.roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";
THREE.ShaderChunk.shadowmap_fragment = "vec3 shadowMask = vec3( 1.0 );\n#ifdef USE_SHADOWMAP\n\tfloat shadows[ NUM_SHADOWS ];\n\tfor ( int i = 0; i < NUM_SHADOWS; i ++ ) {\n\t\tfloat texelSizeY =  1.0 / shadowMapSize[ i ].y;\n\t\tfloat shadow = 0.0;\n#ifdef POINT_LIGHT_SHADOWS\n\t\tbool isPointLight = shadowDarkness[ i ] < 0.0;\n\t\tif ( isPointLight ) {\n\t\t\tfloat realShadowDarkness = abs( shadowDarkness[ i ] );\n\t\t\tvec3 lightToPosition = vShadowCoord[ i ].xyz;\n\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t\tfloat dp = length( lightToPosition );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D, texelSizeY ) ), shadowBias[ i ], shadow );\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tconst float Dr = 1.25;\n\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tconst float Dr = 2.25;\n\t#endif\n\t\t\tfloat os = Dr *  2.0 * texelSizeY;\n\t\t\tconst vec3 Gsd = vec3( - 1, 0, 1 );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzy * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxy * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxy * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzy * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zyz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xyz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zyx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xyx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yzz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yxz * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yxx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yzx * os, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tshadow *= realShadowDarkness * ( 1.0 / 21.0 );\n\t#else\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t\tfloat dp = length( lightToPosition );\n\t\t\tadjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D, texelSizeY ) ), shadowBias[ i ], shadow );\n\t\t\tshadow *= realShadowDarkness;\n\t#endif\n\t\t} else {\n#endif\n\t\t\tfloat texelSizeX =  1.0 / shadowMapSize[ i ].x;\n\t\t\tvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\t\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\t\tbool inFrustum = all( inFrustumVec );\n\t\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\t\tbool frustumTest = all( frustumTestVec );\n\t\t\tif ( frustumTest ) {\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\t\tshadowCoord.z += shadowBias[ i ];\n\t\t\t\tconst float ShadowDelta = 1.0 / 9.0;\n\t\t\t\tfloat xPixelOffset = texelSizeX;\n\t\t\t\tfloat yPixelOffset = texelSizeY;\n\t\t\t\tfloat dx0 = - 1.25 * xPixelOffset;\n\t\t\t\tfloat dy0 = - 1.25 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.25 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.25 * yPixelOffset;\n\t\t\t\tfloat fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += ShadowDelta;\n\t\t\t\tshadow *= shadowDarkness[ i ];\n\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\t\tshadowCoord.z += shadowBias[ i ];\n\t\t\t\tfloat xPixelOffset = texelSizeX;\n\t\t\t\tfloat yPixelOffset = texelSizeY;\n\t\t\t\tfloat dx0 = - 1.0 * xPixelOffset;\n\t\t\t\tfloat dy0 = - 1.0 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.0 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.0 * yPixelOffset;\n\t\t\t\tmat3 shadowKernel;\n\t\t\t\tmat3 depthKernel;\n\t\t\t\tdepthKernel[ 0 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tdepthKernel[ 0 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tdepthKernel[ 0 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tdepthKernel[ 1 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tdepthKernel[ 1 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tdepthKernel[ 1 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tdepthKernel[ 2 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tdepthKernel[ 2 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tdepthKernel[ 2 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tvec3 shadowZ = vec3( shadowCoord.z );\n\t\t\t\tshadowKernel[ 0 ] = vec3( lessThan( depthKernel[ 0 ], shadowZ ) );\n\t\t\t\tshadowKernel[ 0 ] *= vec3( 0.25 );\n\t\t\t\tshadowKernel[ 1 ] = vec3( lessThan( depthKernel[ 1 ], shadowZ ) );\n\t\t\t\tshadowKernel[ 1 ] *= vec3( 0.25 );\n\t\t\t\tshadowKernel[ 2 ] = vec3( lessThan( depthKernel[ 2 ], shadowZ ) );\n\t\t\t\tshadowKernel[ 2 ] *= vec3( 0.25 );\n\t\t\t\tvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[ i ].xy );\n\t\t\t\tshadowKernel[ 0 ] = mix( shadowKernel[ 1 ], shadowKernel[ 0 ], fractionalCoord.x );\n\t\t\t\tshadowKernel[ 1 ] = mix( shadowKernel[ 2 ], shadowKernel[ 1 ], fractionalCoord.x );\n\t\t\t\tvec4 shadowValues;\n\t\t\t\tshadowValues.x = mix( shadowKernel[ 0 ][ 1 ], shadowKernel[ 0 ][ 0 ], fractionalCoord.y );\n\t\t\t\tshadowValues.y = mix( shadowKernel[ 0 ][ 2 ], shadowKernel[ 0 ][ 1 ], fractionalCoord.y );\n\t\t\t\tshadowValues.z = mix( shadowKernel[ 1 ][ 1 ], shadowKernel[ 1 ][ 0 ], fractionalCoord.y );\n\t\t\t\tshadowValues.w = mix( shadowKernel[ 1 ][ 2 ], shadowKernel[ 1 ][ 1 ], fractionalCoord.y );\n\t\t\t\tshadow = dot( shadowValues, vec4( 1.0 ) ) * shadowDarkness[ i ];\n\t#else\n\t\t\t\tshadowCoord.z += shadowBias[ i ];\n\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\t\t\t\tif ( fDepth < shadowCoord.z )\n\t\t\t\t\tshadow = shadowDarkness[ i ];\n\t#endif\n\t\t\t}\n#ifdef SHADOWMAP_DEBUG\n\t\t\tif ( inFrustum ) {\n\t\t\t\tif ( i == 0 ) {\n\t\t\t\t\toutgoingLight *= vec3( 1.0, 0.5, 0.0 );\n\t\t\t\t} else if ( i == 1 ) {\n\t\t\t\t\toutgoingLight *= vec3( 0.0, 1.0, 0.8 );\n\t\t\t\t} else {\n\t\t\t\t\toutgoingLight *= vec3( 0.0, 0.5, 1.0 );\n\t\t\t\t}\n\t\t\t}\n#endif\n#ifdef POINT_LIGHT_SHADOWS\n\t\t}\n#endif\n\t\tshadowMask = shadowMask * vec3( 1.0 - shadow );\n\t\tshadows[ i ] = 1.0 - shadow;\n\t}\n#endif\n";
THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\tuniform sampler2D shadowMap[ NUM_SHADOWS ];\n\tuniform vec2 shadowMapSize[ NUM_SHADOWS ];\n\tuniform float shadowDarkness[ NUM_SHADOWS ];\n\tuniform float shadowBias[ NUM_SHADOWS ];\n\tvarying vec4 vShadowCoord[ NUM_SHADOWS ];\n\tfloat unpackDepth( const in vec4 rgba_depth ) {\n\t\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\tfloat depth = dot( rgba_depth, bit_shift );\n\t\treturn depth;\n\t}\n\t#ifdef POINT_LIGHT_SHADOWS\n\t\tvoid adjustShadowValue1K( const float testDepth, const vec4 textureData, const float bias, inout float shadowValue ) {\n\t\t\tconst vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\t\tif ( testDepth >= dot( textureData, bitSh ) * 1000.0 + bias )\n\t\t\t\tshadowValue += 1.0;\n\t\t}\n\t\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\t\tvec3 absV = abs( v );\n\t\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\t\tabsV *= scaleToCube;\n\t\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\t\tvec2 planar = v.xy;\n\t\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\t\tfloat almostOne = 1.0 - almostATexel;\n\t\t\tif ( absV.z >= almostOne ) {\n\t\t\t\tif ( v.z > 0.0 )\n\t\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t\t} else if ( absV.x >= almostOne ) {\n\t\t\t\tfloat signX = sign( v.x );\n\t\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t\t} else if ( absV.y >= almostOne ) {\n\t\t\t\tfloat signY = sign( v.y );\n\t\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t\t}\n\t\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t\t}\n\t#endif\n#endif\n";
THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\tuniform float shadowDarkness[ NUM_SHADOWS ];\n\tuniform mat4 shadowMatrix[ NUM_SHADOWS ];\n\tvarying vec4 vShadowCoord[ NUM_SHADOWS ];\n#endif";
THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\tfor ( int i = 0; i < NUM_SHADOWS; i ++ ) {\n\t\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\t}\n#endif";
THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneGlobalMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n";
THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n";
THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n";
THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";
THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";
THREE.ShaderChunk.uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";
THREE.ShaderChunk.uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif";
THREE.ShaderChunk.uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif";
THREE.ShaderChunk.uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif";
THREE.ShaderChunk.uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n";
THREE.ShaderChunk.uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif";
THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( STANDARD ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n";
THREE.UniformsUtils = {
    merge: function(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = this.clone(a[c]), e;
            for (e in d)
                b[e] = d[e]
        }
        return b
    },
    clone: function(a) {
        var b = {}, c;
        for (c in a) {
            b[c] = {};
            for (var d in a[c]) {
                var e = a[c][d];
                e instanceof THREE.Color || e instanceof THREE.Vector2 || e instanceof THREE.Vector3 || e instanceof THREE.Vector4 || e instanceof THREE.Matrix3 || e instanceof THREE.Matrix4 || e instanceof THREE.Texture ? b[c][d] = e.clone() : Array.isArray(e) ? b[c][d] = e.slice() : b[c][d] = e
            }
        }
        return b
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        },
        specularMap: {
            type: "t",
            value: null
        },
        alphaMap: {
            type: "t",
            value: null
        },
        envMap: {
            type: "t",
            value: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: .98
        }
    },
    aomap: {
        aoMap: {
            type: "t",
            value: null
        },
        aoMapIntensity: {
            type: "f",
            value: 1
        }
    },
    lightmap: {
        lightMap: {
            type: "t",
            value: null
        },
        lightMapIntensity: {
            type: "f",
            value: 1
        }
    },
    emissivemap: {
        emissiveMap: {
            type: "t",
            value: null
        }
    },
    bumpmap: {
        bumpMap: {
            type: "t",
            value: null
        },
        bumpScale: {
            type: "f",
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            type: "t",
            value: null
        },
        normalScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        }
    },
    displacementmap: {
        displacementMap: {
            type: "t",
            value: null
        },
        displacementScale: {
            type: "f",
            value: 1
        },
        displacementBias: {
            type: "f",
            value: 0
        }
    },
    roughnessmap: {
        roughnessMap: {
            type: "t",
            value: null
        }
    },
    metalnessmap: {
        metalnessMap: {
            type: "t",
            value: null
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLights: {
            type: "sa",
            value: [],
            properties: {
                direction: {
                    type: "v3"
                },
                color: {
                    type: "c"
                },
                shadow: {
                    type: "i"
                }
            }
        },
        hemisphereLights: {
            type: "sa",
            value: [],
            properties: {
                direction: {
                    type: "v3"
                },
                skyColor: {
                    type: "c"
                },
                groundColor: {
                    type: "c"
                }
            }
        },
        pointLights: {
            type: "sa",
            value: [],
            properties: {
                color: {
                    type: "c"
                },
                position: {
                    type: "v3"
                },
                decay: {
                    type: "f"
                },
                distance: {
                    type: "f"
                },
                shadow: {
                    type: "i"
                }
            }
        },
        spotLights: {
            type: "sa",
            value: [],
            properties: {
                color: {
                    type: "c"
                },
                position: {
                    type: "v3"
                },
                direction: {
                    type: "v3"
                },
                distance: {
                    type: "f"
                },
                angleCos: {
                    type: "f"
                },
                exponent: {
                    type: "f"
                },
                decay: {
                    type: "f"
                },
                shadow: {
                    type: "i"
                }
            }
        }
    },
    points: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
};
THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.uv_pars_vertex, THREE.ShaderChunk.uv2_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.uv_vertex, THREE.ShaderChunk.uv2_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "\t#ifdef USE_ENVMAP", THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "\t#endif", THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.uv_pars_fragment, THREE.ShaderChunk.uv2_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.aomap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "\tReflectedLight reflectedLight;\n\treflectedLight.directDiffuse = vec3( 0.0 );\n\treflectedLight.directSpecular = vec3( 0.0 );\n\treflectedLight.indirectDiffuse = diffuseColor.rgb;\n\treflectedLight.indirectSpecular = vec3( 0.0 );", THREE.ShaderChunk.aomap_fragment, THREE.ShaderChunk.shadowmap_fragment, "reflectedLight.indirectDiffuse *= shadowMask;\nvec3 outgoingLight = reflectedLight.indirectDiffuse;", THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            }
        }]),
        vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.uv_pars_vertex, THREE.ShaderChunk.uv2_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.bsdfs, THREE.ShaderChunk.lights_pars, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.uv_vertex, THREE.ShaderChunk.uv2_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nuniform vec3 ambientLightColor;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.uv_pars_fragment, THREE.ShaderChunk.uv2_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tvec3 totalAmbientLight = PI * ambientLightColor;", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.shadowmap_fragment, "\t#ifdef DOUBLE_SIDED\n\t\tif ( gl_FrontFacing )\n\t\t\toutgoingLight += RECIPROCAL_PI * diffuseColor.rgb * ( vLightFront * shadowMask + totalAmbientLight ) + emissive;\n\t\telse\n\t\t\toutgoingLight += RECIPROCAL_PI * diffuseColor.rgb * ( vLightBack * shadowMask + totalAmbientLight ) + emissive;\n\t#else\n\t\toutgoingLight += RECIPROCAL_PI * diffuseColor.rgb * ( vLightFront * shadowMask + totalAmbientLight ) + emissive;\n\t#endif", THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.bumpmap, THREE.UniformsLib.normalmap, THREE.UniformsLib.displacementmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            }
        }]),
        vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.uv_pars_vertex, THREE.ShaderChunk.uv2_pars_vertex, THREE.ShaderChunk.displacementmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.uv_vertex, THREE.ShaderChunk.uv2_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif", THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.displacementmap_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = - mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.uv_pars_fragment, THREE.ShaderChunk.uv2_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.aomap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.emissivemap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.bsdfs, THREE.ShaderChunk.lights_pars, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveLight = emissive;", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.normal_fragment, THREE.ShaderChunk.emissivemap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lights_template, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.aomap_fragment, "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveLight;", THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    standard: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.aomap, THREE.UniformsLib.lightmap, THREE.UniformsLib.emissivemap, THREE.UniformsLib.bumpmap, THREE.UniformsLib.normalmap, THREE.UniformsLib.displacementmap, THREE.UniformsLib.roughnessmap, THREE.UniformsLib.metalnessmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            roughness: {
                type: "f",
                value: .5
            },
            metalness: {
                type: "f",
                value: 0
            },
            envMapIntensity: {
                type: "f",
                value: 1
            }
        }]),
        vertexShader: ["#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.uv_pars_vertex, THREE.ShaderChunk.uv2_pars_vertex, THREE.ShaderChunk.displacementmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.uv_vertex, THREE.ShaderChunk.uv2_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif", THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.displacementmap_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = - mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["#define STANDARD\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\nuniform float envMapIntensity;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.uv_pars_fragment, THREE.ShaderChunk.uv2_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.aomap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.emissivemap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.bsdfs, THREE.ShaderChunk.lights_pars, THREE.ShaderChunk.lights_standard_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.roughnessmap_pars_fragment, THREE.ShaderChunk.metalnessmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveLight = emissive;", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.roughnessmap_fragment, THREE.ShaderChunk.metalnessmap_fragment, THREE.ShaderChunk.normal_fragment, THREE.ShaderChunk.emissivemap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.lights_standard_fragment, THREE.ShaderChunk.lights_template, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.aomap_fragment, "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveLight;", THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    points: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.points, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / -mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.shadowmap_fragment, "\toutgoingLight = diffuseColor.rgb * shadowMask;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "f",
                value: 1
            },
            dashSize: {
                type: "f",
                value: 1
            },
            totalSize: {
                type: "f",
                value: 2
            }
        }]),
        vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float mNear;\nuniform float mFar;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\tfloat color = 1.0 - smoothstep( mNear, mFar, depth );\n\tgl_FragColor = vec4( vec3( color ), opacity );\n}"].join("\n")
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tgl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    cube: {
        uniforms: {
            tCube: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    equirect: {
        uniforms: {
            tEquirect: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\nvec3 direction = normalize( vWorldPosition );\nvec2 sampleUV;\nsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\nsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\ngl_FragColor = texture2D( tEquirect, sampleUV );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {\n\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n\tconst vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n\tvec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );\n\tres -= res.xxyz * bit_mask;\n\treturn res;\n}\nvoid main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n\t#else\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n\t#endif\n}"].join("\n")
    },
    distanceRGBA: {
        uniforms: {
            lightPos: {
                type: "v3",
                value: new THREE.Vector3(0,0,0)
            }
        },
        vertexShader: ["varying vec4 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.begin_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.worldpos_vertex, "vWorldPosition = worldPosition;\n}"].join("\n"),
        fragmentShader: ["uniform vec3 lightPos;\nvarying vec4 vWorldPosition;", THREE.ShaderChunk.common, "vec4 pack1K ( float depth ) {\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n\tconst vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n\tvec4 res = fract( depth * bitSh );\n\tres -= res.xxyz * bitMsk;\n\treturn res; \n}\nfloat unpack1K ( vec4 color ) {\n\tconst vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\treturn dot( color, bitSh ) * 1000.0;\n}\nvoid main () {\n\tgl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n}"].join("\n")
    }
};
THREE.WebGLRenderer = function(a) {
    function b(a, b, c, d) {
        !0 === P && (a *= d,
        b *= d,
        c *= d);
        r.clearColor(a, b, c, d)
    }
    function c() {
        O.init();
        r.viewport(ma, na, oa, pa);
        b(S.r, S.g, S.b, U)
    }
    function d() {
        qa = fa = null;
        ra = "";
        ua = -1;
        O.reset()
    }
    function e(a) {
        a.preventDefault();
        d();
        c();
        W.clear()
    }
    function f(a) {
        a = a.target;
        a.removeEventListener("dispose", f);
        a: {
            var b = W.get(a);
            if (a.image && b.__image__webglTextureCube)
                r.deleteTexture(b.__image__webglTextureCube);
            else {
                if (void 0 === b.__webglInit)
                    break a;
                r.deleteTexture(b.__webglTexture)
            }
            W.delete(a)
        }
        la.textures--
    }
    function g(a) {
        a = a.target;
        a.removeEventListener("dispose", g);
        var b = W.get(a)
          , c = W.get(a.texture);
        if (a && void 0 !== c.__webglTexture) {
            r.deleteTexture(c.__webglTexture);
            if (a instanceof THREE.WebGLRenderTargetCube)
                for (c = 0; 6 > c; c++)
                    r.deleteFramebuffer(b.__webglFramebuffer[c]),
                    r.deleteRenderbuffer(b.__webglRenderbuffer[c]);
            else
                r.deleteFramebuffer(b.__webglFramebuffer),
                r.deleteRenderbuffer(b.__webglRenderbuffer);
            W.delete(a.texture);
            W.delete(a)
        }
        la.textures--
    }
    function h(a) {
        a = a.target;
        a.removeEventListener("dispose", h);
        k(a);
        W.delete(a)
    }
    function k(a) {
        var b = W.get(a).program;
        a.program = void 0;
        void 0 !== b && sa.releaseProgram(b)
    }
    function l(a, b) {
        return b[0] - a[0]
    }
    function m(a, b) {
        return a.object.renderOrder !== b.object.renderOrder ? a.object.renderOrder - b.object.renderOrder : a.material.id !== b.material.id ? a.material.id - b.material.id : a.z !== b.z ? a.z - b.z : a.id - b.id
    }
    function p(a, b) {
        return a.object.renderOrder !== b.object.renderOrder ? a.object.renderOrder - b.object.renderOrder : a.z !== b.z ? b.z - a.z : a.id - b.id
    }
    function n(a, b, c, d, e) {
        var f;
        c.transparent ? (d = ea,
        f = ++ha) : (d = ca,
        f = ++da);
        f = d[f];
        void 0 !== f ? (f.id = a.id,
        f.object = a,
        f.geometry = b,
        f.material = c,
        f.z = Y.z,
        f.group = e) : (f = {
            id: a.id,
            object: a,
            geometry: b,
            material: c,
            z: Y.z,
            group: e
        },
        d.push(f))
    }
    function q(a, b) {
        if (!1 !== a.visible) {
            if (a.layers.test(b.layers))
                if (a instanceof THREE.Light)
                    Z.push(a);
                else if (a instanceof THREE.Sprite)
                    !1 !== a.frustumCulled && !0 !== za.intersectsObject(a) || ga.push(a);
                else if (a instanceof THREE.LensFlare)
                    ba.push(a);
                else if (a instanceof THREE.ImmediateRenderObject)
                    !0 === aa.sortObjects && (Y.setFromMatrixPosition(a.matrixWorld),
                    Y.applyProjection(va)),
                    n(a, null, a.material, Y.z, null);
                else if (a instanceof THREE.Mesh || a instanceof THREE.Line || a instanceof THREE.Points)
                    if (a instanceof THREE.SkinnedMesh && a.skeleton.update(),
                    !1 === a.frustumCulled || !0 === za.intersectsObject(a)) {
                        var c = a.material;
                        if (!0 === c.visible) {
                            !0 === aa.sortObjects && (Y.setFromMatrixPosition(a.matrixWorld),
                            Y.applyProjection(va));
                            var d = ta.update(a);
                            if (c instanceof THREE.MeshFaceMaterial)
                                for (var e = d.groups, f = c.materials, c = 0, g = e.length; c < g; c++) {
                                    var h = e[c]
                                      , k = f[h.materialIndex];
                                    !0 === k.visible && n(a, d, k, Y.z, h)
                                }
                            else
                                n(a, d, c, Y.z, null)
                        }
                    }
            d = a.children;
            c = 0;
            for (g = d.length; c < g; c++)
                q(d[c], b)
        }
    }
    function u(a, b, c, d) {
        for (var e = 0, f = a.length; e < f; e++) {
            var g = a[e]
              , h = g.object
              , k = g.geometry
              , l = void 0 === d ? g.material : d
              , g = g.group;
            h.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, h.matrixWorld);
            h.normalMatrix.getNormalMatrix(h.modelViewMatrix);
            if (h instanceof THREE.ImmediateRenderObject) {
                t(l);
                var m = w(b, c, l, h);
                ra = "";
                h.render(function(a) {
                    aa.renderBufferImmediate(a, m, l)
                })
            } else
                aa.renderBufferDirect(b, c, k, l, h, g)
        }
    }
    function t(a) {
        a.side !== THREE.DoubleSide ? O.enable(r.CULL_FACE) : O.disable(r.CULL_FACE);
        O.setFlipSided(a.side === THREE.BackSide);
        !0 === a.transparent ? O.setBlending(a.blending, a.blendEquation, a.blendSrc, a.blendDst, a.blendEquationAlpha, a.blendSrcAlpha, a.blendDstAlpha) : O.setBlending(THREE.NoBlending);
        O.setDepthFunc(a.depthFunc);
        O.setDepthTest(a.depthTest);
        O.setDepthWrite(a.depthWrite);
        O.setColorWrite(a.colorWrite);
        O.setPolygonOffset(a.polygonOffset, a.polygonOffsetFactor, a.polygonOffsetUnits)
    }
    function w(a, b, c, d) {
        wa = 0;
        var e = W.get(c);
        void 0 === e.program && (c.needsUpdate = !0);
        void 0 !== e.lightsHash && e.lightsHash !== V.hash && (c.needsUpdate = !0);
        if (c.needsUpdate) {
            a: {
                var f = W.get(c)
                  , g = sa.getParameters(c, V, b, d)
                  , l = sa.getProgramCode(c, g)
                  , m = f.program
                  , n = !0;
                if (void 0 === m)
                    c.addEventListener("dispose", h);
                else if (m.code !== l)
                    k(c);
                else if (void 0 !== g.shaderID)
                    break a;
                else
                    n = !1;
                n && (g.shaderID ? (m = THREE.ShaderLib[g.shaderID],
                f.__webglShader = {
                    name: c.type,
                    uniforms: THREE.UniformsUtils.clone(m.uniforms),
                    vertexShader: m.vertexShader,
                    fragmentShader: m.fragmentShader
                }) : f.__webglShader = {
                    name: c.type,
                    uniforms: c.uniforms,
                    vertexShader: c.vertexShader,
                    fragmentShader: c.fragmentShader
                },
                c.__webglShader = f.__webglShader,
                m = sa.acquireProgram(c, g, l),
                f.program = m,
                c.program = m);
                g = m.getAttributes();
                if (c.morphTargets)
                    for (l = c.numSupportedMorphTargets = 0; l < aa.maxMorphTargets; l++)
                        0 <= g["morphTarget" + l] && c.numSupportedMorphTargets++;
                if (c.morphNormals)
                    for (l = c.numSupportedMorphNormals = 0; l < aa.maxMorphNormals; l++)
                        0 <= g["morphNormal" + l] && c.numSupportedMorphNormals++;
                f.uniformsList = [];
                var g = f.__webglShader.uniforms, l = f.program.getUniforms(), q;
                for (q in g)
                    (m = l[q]) && f.uniformsList.push([f.__webglShader.uniforms[q], m]);
                if (c instanceof THREE.MeshPhongMaterial || c instanceof THREE.MeshLambertMaterial || c instanceof THREE.MeshStandardMaterial || c.lights)
                    f.lightsHash = V.hash,
                    g.ambientLightColor.value = V.ambient,
                    g.directionalLights.value = V.directional,
                    g.pointLights.value = V.point,
                    g.spotLights.value = V.spot,
                    g.hemisphereLights.value = V.hemi;
                f.hasDynamicUniforms = !1;
                q = 0;
                for (g = f.uniformsList.length; q < g; q++)
                    if (!0 === f.uniformsList[q][0].dynamic) {
                        f.hasDynamicUniforms = !0;
                        break
                    }
            }
            c.needsUpdate = !1
        }
        m = l = n = !1;
        f = e.program;
        q = f.getUniforms();
        g = e.__webglShader.uniforms;
        f.id !== fa && (r.useProgram(f.program),
        fa = f.id,
        m = l = n = !0);
        c.id !== ua && (ua = c.id,
        l = !0);
        if (n || a !== qa)
            r.uniformMatrix4fv(q.projectionMatrix, !1, a.projectionMatrix.elements),
            ia.logarithmicDepthBuffer && r.uniform1f(q.logDepthBufFC, 2 / (Math.log(a.far + 1) / Math.LN2)),
            a !== qa && (qa = a,
            m = l = !0),
            (c instanceof THREE.ShaderMaterial || c instanceof THREE.MeshPhongMaterial || c instanceof THREE.MeshStandardMaterial || c.envMap) && void 0 !== q.cameraPosition && (Y.setFromMatrixPosition(a.matrixWorld),
            r.uniform3f(q.cameraPosition, Y.x, Y.y, Y.z)),
            (c instanceof THREE.MeshPhongMaterial || c instanceof THREE.MeshLambertMaterial || c instanceof THREE.MeshBasicMaterial || c instanceof THREE.MeshStandardMaterial || c instanceof THREE.ShaderMaterial || c.skinning) && void 0 !== q.viewMatrix && r.uniformMatrix4fv(q.viewMatrix, !1, a.matrixWorldInverse.elements);
        c.skinning && (d.bindMatrix && void 0 !== q.bindMatrix && r.uniformMatrix4fv(q.bindMatrix, !1, d.bindMatrix.elements),
        d.bindMatrixInverse && void 0 !== q.bindMatrixInverse && r.uniformMatrix4fv(q.bindMatrixInverse, !1, d.bindMatrixInverse.elements),
        ia.floatVertexTextures && d.skeleton && d.skeleton.useVertexTexture ? (void 0 !== q.boneTexture && (n = v(),
        r.uniform1i(q.boneTexture, n),
        aa.setTexture(d.skeleton.boneTexture, n)),
        void 0 !== q.boneTextureWidth && r.uniform1i(q.boneTextureWidth, d.skeleton.boneTextureWidth),
        void 0 !== q.boneTextureHeight && r.uniform1i(q.boneTextureHeight, d.skeleton.boneTextureHeight)) : d.skeleton && d.skeleton.boneMatrices && void 0 !== q.boneGlobalMatrices && r.uniformMatrix4fv(q.boneGlobalMatrices, !1, d.skeleton.boneMatrices));
        if (l) {
            if (c instanceof THREE.MeshPhongMaterial || c instanceof THREE.MeshLambertMaterial || c instanceof THREE.MeshStandardMaterial || c.lights)
                l = m,
                g.ambientLightColor.needsUpdate = l,
                g.directionalLights.needsUpdate = l,
                g.pointLights.needsUpdate = l,
                g.spotLights.needsUpdate = l,
                g.hemisphereLights.needsUpdate = l;
            b && c.fog && (g.fogColor.value = b.color,
            b instanceof THREE.Fog ? (g.fogNear.value = b.near,
            g.fogFar.value = b.far) : b instanceof THREE.FogExp2 && (g.fogDensity.value = b.density));
            if (c instanceof THREE.MeshBasicMaterial || c instanceof THREE.MeshLambertMaterial || c instanceof THREE.MeshPhongMaterial || c instanceof THREE.MeshStandardMaterial) {
                g.opacity.value = c.opacity;
                g.diffuse.value = c.color;
                c.emissive && (g.emissive.value = c.emissive);
                g.map.value = c.map;
                g.specularMap.value = c.specularMap;
                g.alphaMap.value = c.alphaMap;
                c.aoMap && (g.aoMap.value = c.aoMap,
                g.aoMapIntensity.value = c.aoMapIntensity);
                var p;
                c.map ? p = c.map : c.specularMap ? p = c.specularMap : c.displacementMap ? p = c.displacementMap : c.normalMap ? p = c.normalMap : c.bumpMap ? p = c.bumpMap : c.roughnessMap ? p = c.roughnessMap : c.metalnessMap ? p = c.metalnessMap : c.alphaMap ? p = c.alphaMap : c.emissiveMap && (p = c.emissiveMap);
                void 0 !== p && (p instanceof THREE.WebGLRenderTarget && (p = p.texture),
                b = p.offset,
                p = p.repeat,
                g.offsetRepeat.value.set(b.x, b.y, p.x, p.y));
                g.envMap.value = c.envMap;
                g.flipEnvMap.value = c.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
                g.reflectivity.value = c.reflectivity;
                g.refractionRatio.value = c.refractionRatio
            }
            c instanceof THREE.LineBasicMaterial ? (g.diffuse.value = c.color,
            g.opacity.value = c.opacity) : c instanceof THREE.LineDashedMaterial ? (g.diffuse.value = c.color,
            g.opacity.value = c.opacity,
            g.dashSize.value = c.dashSize,
            g.totalSize.value = c.dashSize + c.gapSize,
            g.scale.value = c.scale) : c instanceof THREE.PointsMaterial ? (g.psColor.value = c.color,
            g.opacity.value = c.opacity,
            g.size.value = c.size * J,
            g.scale.value = K.height / 2,
            g.map.value = c.map,
            null !== c.map && (p = c.map.offset,
            b = c.map.repeat,
            g.offsetRepeat.value.set(p.x, p.y, b.x, b.y))) : c instanceof THREE.MeshPhongMaterial ? (g.specular.value = c.specular,
            g.shininess.value = Math.max(c.shininess, 1E-4),
            c.lightMap && (g.lightMap.value = c.lightMap,
            g.lightMapIntensity.value = c.lightMapIntensity),
            c.emissiveMap && (g.emissiveMap.value = c.emissiveMap),
            c.bumpMap && (g.bumpMap.value = c.bumpMap,
            g.bumpScale.value = c.bumpScale),
            c.normalMap && (g.normalMap.value = c.normalMap,
            g.normalScale.value.copy(c.normalScale)),
            c.displacementMap && (g.displacementMap.value = c.displacementMap,
            g.displacementScale.value = c.displacementScale,
            g.displacementBias.value = c.displacementBias)) : c instanceof THREE.MeshStandardMaterial ? (g.roughness.value = c.roughness,
            g.metalness.value = c.metalness,
            c.roughnessMap && (g.roughnessMap.value = c.roughnessMap),
            c.metalnessMap && (g.metalnessMap.value = c.metalnessMap),
            c.lightMap && (g.lightMap.value = c.lightMap,
            g.lightMapIntensity.value = c.lightMapIntensity),
            c.emissiveMap && (g.emissiveMap.value = c.emissiveMap),
            c.bumpMap && (g.bumpMap.value = c.bumpMap,
            g.bumpScale.value = c.bumpScale),
            c.normalMap && (g.normalMap.value = c.normalMap,
            g.normalScale.value.copy(c.normalScale)),
            c.displacementMap && (g.displacementMap.value = c.displacementMap,
            g.displacementScale.value = c.displacementScale,
            g.displacementBias.value = c.displacementBias),
            c.envMap && (g.envMapIntensity.value = c.envMapIntensity)) : c instanceof THREE.MeshDepthMaterial ? (g.mNear.value = a.near,
            g.mFar.value = a.far,
            g.opacity.value = c.opacity) : c instanceof THREE.MeshNormalMaterial && (g.opacity.value = c.opacity);
            if (Aa.enabled && d.receiveShadow && !c._shadowPass && g.shadowMatrix)
                for (c = V.shadows,
                p = 0,
                b = c.length; p < b; p++)
                    l = c[p],
                    m = l.shadow,
                    l instanceof THREE.PointLight ? (Y.setFromMatrixPosition(l.matrixWorld).negate(),
                    m.matrix.identity().setPosition(Y),
                    g.shadowDarkness.value[p] = -m.darkness) : g.shadowDarkness.value[p] = m.darkness,
                    g.shadowBias.value[p] = m.bias,
                    g.shadowMap.value[p] = m.map,
                    g.shadowMapSize.value[p] = m.mapSize,
                    g.shadowMatrix.value[p] = m.matrix;
            x(e.uniformsList)
        }
        r.uniformMatrix4fv(q.modelViewMatrix, !1, d.modelViewMatrix.elements);
        q.normalMatrix && r.uniformMatrix3fv(q.normalMatrix, !1, d.normalMatrix.elements);
        void 0 !== q.modelMatrix && r.uniformMatrix4fv(q.modelMatrix, !1, d.matrixWorld.elements);
        if (!0 === e.hasDynamicUniforms) {
            e = e.uniformsList;
            c = [];
            p = 0;
            for (b = e.length; p < b; p++)
                q = e[p][0],
                g = q.onUpdateCallback,
                void 0 !== g && (g.bind(q)(d, a),
                c.push(e[p]));
            x(c)
        }
        return f
    }
    function v() {
        var a = wa;
        a >= ia.maxTextures && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + ia.maxTextures);
        wa += 1;
        return a
    }
    function x(a) {
        for (var b, c, d = 0, e = a.length; d < e; d++) {
            var f = a[d][0];
            if (!1 !== f.needsUpdate) {
                var g = f.type;
                b = f.value;
                var h = a[d][1];
                switch (g) {
                case "1i":
                    r.uniform1i(h, b);
                    break;
                case "1f":
                    r.uniform1f(h, b);
                    break;
                case "2f":
                    r.uniform2f(h, b[0], b[1]);
                    break;
                case "3f":
                    r.uniform3f(h, b[0], b[1], b[2]);
                    break;
                case "4f":
                    r.uniform4f(h, b[0], b[1], b[2], b[3]);
                    break;
                case "1iv":
                    r.uniform1iv(h, b);
                    break;
                case "3iv":
                    r.uniform3iv(h, b);
                    break;
                case "1fv":
                    r.uniform1fv(h, b);
                    break;
                case "2fv":
                    r.uniform2fv(h, b);
                    break;
                case "3fv":
                    r.uniform3fv(h, b);
                    break;
                case "4fv":
                    r.uniform4fv(h, b);
                    break;
                case "Matrix2fv":
                    r.uniformMatrix2fv(h, !1, b);
                    break;
                case "Matrix3fv":
                    r.uniformMatrix3fv(h, !1, b);
                    break;
                case "Matrix4fv":
                    r.uniformMatrix4fv(h, !1, b);
                    break;
                case "i":
                    r.uniform1i(h, b);
                    break;
                case "f":
                    r.uniform1f(h, b);
                    break;
                case "v2":
                    r.uniform2f(h, b.x, b.y);
                    break;
                case "v3":
                    r.uniform3f(h, b.x, b.y, b.z);
                    break;
                case "v4":
                    r.uniform4f(h, b.x, b.y, b.z, b.w);
                    break;
                case "c":
                    r.uniform3f(h, b.r, b.g, b.b);
                    break;
                case "sa":
                    for (g = 0; g < b.length; g++)
                        for (var k in f.properties) {
                            var l = h[g][k];
                            c = b[g][k];
                            switch (f.properties[k].type) {
                            case "i":
                                r.uniform1i(l, c);
                                break;
                            case "f":
                                r.uniform1f(l, c);
                                break;
                            case "v2":
                                r.uniform2f(l, c.x, c.y);
                                break;
                            case "v3":
                                r.uniform3f(l, c.x, c.y, c.z);
                                break;
                            case "v4":
                                r.uniform4f(l, c.x, c.y, c.z, c.w);
                                break;
                            case "c":
                                r.uniform3f(l, c.r, c.g, c.b)
                            }
                        }
                    break;
                case "iv1":
                    r.uniform1iv(h, b);
                    break;
                case "iv":
                    r.uniform3iv(h, b);
                    break;
                case "fv1":
                    r.uniform1fv(h, b);
                    break;
                case "fv":
                    r.uniform3fv(h, b);
                    break;
                case "v2v":
                    void 0 === f._array && (f._array = new Float32Array(2 * b.length));
                    c = g = 0;
                    for (l = b.length; g < l; g++,
                    c += 2)
                        f._array[c + 0] = b[g].x,
                        f._array[c + 1] = b[g].y;
                    r.uniform2fv(h, f._array);
                    break;
                case "v3v":
                    void 0 === f._array && (f._array = new Float32Array(3 * b.length));
                    c = g = 0;
                    for (l = b.length; g < l; g++,
                    c += 3)
                        f._array[c + 0] = b[g].x,
                        f._array[c + 1] = b[g].y,
                        f._array[c + 2] = b[g].z;
                    r.uniform3fv(h, f._array);
                    break;
                case "v4v":
                    void 0 === f._array && (f._array = new Float32Array(4 * b.length));
                    c = g = 0;
                    for (l = b.length; g < l; g++,
                    c += 4)
                        f._array[c + 0] = b[g].x,
                        f._array[c + 1] = b[g].y,
                        f._array[c + 2] = b[g].z,
                        f._array[c + 3] = b[g].w;
                    r.uniform4fv(h, f._array);
                    break;
                case "m2":
                    r.uniformMatrix2fv(h, !1, b.elements);
                    break;
                case "m3":
                    r.uniformMatrix3fv(h, !1, b.elements);
                    break;
                case "m3v":
                    void 0 === f._array && (f._array = new Float32Array(9 * b.length));
                    g = 0;
                    for (l = b.length; g < l; g++)
                        b[g].flattenToArrayOffset(f._array, 9 * g);
                    r.uniformMatrix3fv(h, !1, f._array);
                    break;
                case "m4":
                    r.uniformMatrix4fv(h, !1, b.elements);
                    break;
                case "m4v":
                    void 0 === f._array && (f._array = new Float32Array(16 * b.length));
                    g = 0;
                    for (l = b.length; g < l; g++)
                        b[g].flattenToArrayOffset(f._array, 16 * g);
                    r.uniformMatrix4fv(h, !1, f._array);
                    break;
                case "t":
                    c = v();
                    r.uniform1i(h, c);
                    if (!b)
                        continue;
                    b instanceof THREE.CubeTexture || Array.isArray(b.image) && 6 === b.image.length ? z(b, c) : b instanceof THREE.WebGLRenderTargetCube ? A(b.texture, c) : b instanceof THREE.WebGLRenderTarget ? aa.setTexture(b.texture, c) : aa.setTexture(b, c);
                    break;
                case "tv":
                    void 0 === f._array && (f._array = []);
                    g = 0;
                    for (l = f.value.length; g < l; g++)
                        f._array[g] = v();
                    r.uniform1iv(h, f._array);
                    g = 0;
                    for (l = f.value.length; g < l; g++)
                        b = f.value[g],
                        c = f._array[g],
                        b && (b instanceof THREE.CubeTexture || b.image instanceof Array && 6 === b.image.length ? z(b, c) : b instanceof THREE.WebGLRenderTarget ? aa.setTexture(b.texture, c) : b instanceof THREE.WebGLRenderTargetCube ? A(b.texture, c) : aa.setTexture(b, c));
                    break;
                default:
                    console.warn("THREE.WebGLRenderer: Unknown uniform type: " + g)
                }
            }
        }
    }
    function E(a, b, c) {
        c ? (r.texParameteri(a, r.TEXTURE_WRAP_S, D(b.wrapS)),
        r.texParameteri(a, r.TEXTURE_WRAP_T, D(b.wrapT)),
        r.texParameteri(a, r.TEXTURE_MAG_FILTER, D(b.magFilter)),
        r.texParameteri(a, r.TEXTURE_MIN_FILTER, D(b.minFilter))) : (r.texParameteri(a, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE),
        r.texParameteri(a, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE),
        b.wrapS === THREE.ClampToEdgeWrapping && b.wrapT === THREE.ClampToEdgeWrapping || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", b),
        r.texParameteri(a, r.TEXTURE_MAG_FILTER, G(b.magFilter)),
        r.texParameteri(a, r.TEXTURE_MIN_FILTER, G(b.minFilter)),
        b.minFilter !== THREE.NearestFilter && b.minFilter !== THREE.LinearFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", b));
        !(c = X.get("EXT_texture_filter_anisotropic")) || b.type === THREE.FloatType && null === X.get("OES_texture_float_linear") || b.type === THREE.HalfFloatType && null === X.get("OES_texture_half_float_linear") || !(1 < b.anisotropy || W.get(b).__currentAnisotropy) || (r.texParameterf(a, c.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, aa.getMaxAnisotropy())),
        W.get(b).__currentAnisotropy = b.anisotropy)
    }
    function y(a, b) {
        if (a.width > b || a.height > b) {
            var c = b / Math.max(a.width, a.height)
              , d = document.createElement("canvas");
            d.width = Math.floor(a.width * c);
            d.height = Math.floor(a.height * c);
            d.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, d.width, d.height);
            console.warn("THREE.WebGLRenderer: image is too big (" + a.width + "x" + a.height + "). Resized to " + d.width + "x" + d.height, a);
            return d
        }
        return a
    }
    function F(a) {
        return THREE.Math.isPowerOfTwo(a.width) && THREE.Math.isPowerOfTwo(a.height)
    }
    function z(a, b) {
        var c = W.get(a);
        if (6 === a.image.length)
            if (0 < a.version && c.__version !== a.version) {
                c.__image__webglTextureCube || (a.addEventListener("dispose", f),
                c.__image__webglTextureCube = r.createTexture(),
                la.textures++);
                O.activeTexture(r.TEXTURE0 + b);
                O.bindTexture(r.TEXTURE_CUBE_MAP, c.__image__webglTextureCube);
                r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, a.flipY);
                for (var d = a instanceof THREE.CompressedTexture, e = a.image[0]instanceof THREE.DataTexture, g = [], h = 0; 6 > h; h++)
                    g[h] = !aa.autoScaleCubemaps || d || e ? e ? a.image[h].image : a.image[h] : y(a.image[h], ia.maxCubemapSize);
                var k = F(g[0])
                  , l = D(a.format)
                  , m = D(a.type);
                E(r.TEXTURE_CUBE_MAP, a, k);
                for (h = 0; 6 > h; h++)
                    if (d)
                        for (var n, q = g[h].mipmaps, p = 0, u = q.length; p < u; p++)
                            n = q[p],
                            a.format !== THREE.RGBAFormat && a.format !== THREE.RGBFormat ? -1 < O.getCompressedTextureFormats().indexOf(l) ? O.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, p, l, n.width, n.height, 0, n.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : O.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, p, l, n.width, n.height, 0, l, m, n.data);
                    else
                        e ? O.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, l, g[h].width, g[h].height, 0, l, m, g[h].data) : O.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, l, l, m, g[h]);
                a.generateMipmaps && k && r.generateMipmap(r.TEXTURE_CUBE_MAP);
                c.__version = a.version;
                if (a.onUpdate)
                    a.onUpdate(a)
            } else
                O.activeTexture(r.TEXTURE0 + b),
                O.bindTexture(r.TEXTURE_CUBE_MAP, c.__image__webglTextureCube)
    }
    function A(a, b) {
        O.activeTexture(r.TEXTURE0 + b);
        O.bindTexture(r.TEXTURE_CUBE_MAP, W.get(a).__webglTexture)
    }
    function B(a, b, c, d) {
        var e = D(b.texture.format)
          , f = D(b.texture.type);
        O.texImage2D(d, 0, e, b.width, b.height, 0, e, f, null);
        r.bindFramebuffer(r.FRAMEBUFFER, a);
        r.framebufferTexture2D(r.FRAMEBUFFER, c, d, W.get(b.texture).__webglTexture, 0);
        r.bindFramebuffer(r.FRAMEBUFFER, null)
    }
    function H(a, b) {
        r.bindRenderbuffer(r.RENDERBUFFER, a);
        b.depthBuffer && !b.stencilBuffer ? (r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_COMPONENT16, b.width, b.height),
        r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, b.width, b.height),
        r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, a)) : r.renderbufferStorage(r.RENDERBUFFER, r.RGBA4, b.width, b.height);
        r.bindRenderbuffer(r.RENDERBUFFER, null)
    }
    function G(a) {
        return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter || a === THREE.NearestMipMapLinearFilter ? r.NEAREST : r.LINEAR
    }
    function D(a) {
        var b;
        if (a === THREE.RepeatWrapping)
            return r.REPEAT;
        if (a === THREE.ClampToEdgeWrapping)
            return r.CLAMP_TO_EDGE;
        if (a === THREE.MirroredRepeatWrapping)
            return r.MIRRORED_REPEAT;
        if (a === THREE.NearestFilter)
            return r.NEAREST;
        if (a === THREE.NearestMipMapNearestFilter)
            return r.NEAREST_MIPMAP_NEAREST;
        if (a === THREE.NearestMipMapLinearFilter)
            return r.NEAREST_MIPMAP_LINEAR;
        if (a === THREE.LinearFilter)
            return r.LINEAR;
        if (a === THREE.LinearMipMapNearestFilter)
            return r.LINEAR_MIPMAP_NEAREST;
        if (a === THREE.LinearMipMapLinearFilter)
            return r.LINEAR_MIPMAP_LINEAR;
        if (a === THREE.UnsignedByteType)
            return r.UNSIGNED_BYTE;
        if (a === THREE.UnsignedShort4444Type)
            return r.UNSIGNED_SHORT_4_4_4_4;
        if (a === THREE.UnsignedShort5551Type)
            return r.UNSIGNED_SHORT_5_5_5_1;
        if (a === THREE.UnsignedShort565Type)
            return r.UNSIGNED_SHORT_5_6_5;
        if (a === THREE.ByteType)
            return r.BYTE;
        if (a === THREE.ShortType)
            return r.SHORT;
        if (a === THREE.UnsignedShortType)
            return r.UNSIGNED_SHORT;
        if (a === THREE.IntType)
            return r.INT;
        if (a === THREE.UnsignedIntType)
            return r.UNSIGNED_INT;
        if (a === THREE.FloatType)
            return r.FLOAT;
        b = X.get("OES_texture_half_float");
        if (null !== b && a === THREE.HalfFloatType)
            return b.HALF_FLOAT_OES;
        if (a === THREE.AlphaFormat)
            return r.ALPHA;
        if (a === THREE.RGBFormat)
            return r.RGB;
        if (a === THREE.RGBAFormat)
            return r.RGBA;
        if (a === THREE.LuminanceFormat)
            return r.LUMINANCE;
        if (a === THREE.LuminanceAlphaFormat)
            return r.LUMINANCE_ALPHA;
        if (a === THREE.AddEquation)
            return r.FUNC_ADD;
        if (a === THREE.SubtractEquation)
            return r.FUNC_SUBTRACT;
        if (a === THREE.ReverseSubtractEquation)
            return r.FUNC_REVERSE_SUBTRACT;
        if (a === THREE.ZeroFactor)
            return r.ZERO;
        if (a === THREE.OneFactor)
            return r.ONE;
        if (a === THREE.SrcColorFactor)
            return r.SRC_COLOR;
        if (a === THREE.OneMinusSrcColorFactor)
            return r.ONE_MINUS_SRC_COLOR;
        if (a === THREE.SrcAlphaFactor)
            return r.SRC_ALPHA;
        if (a === THREE.OneMinusSrcAlphaFactor)
            return r.ONE_MINUS_SRC_ALPHA;
        if (a === THREE.DstAlphaFactor)
            return r.DST_ALPHA;
        if (a === THREE.OneMinusDstAlphaFactor)
            return r.ONE_MINUS_DST_ALPHA;
        if (a === THREE.DstColorFactor)
            return r.DST_COLOR;
        if (a === THREE.OneMinusDstColorFactor)
            return r.ONE_MINUS_DST_COLOR;
        if (a === THREE.SrcAlphaSaturateFactor)
            return r.SRC_ALPHA_SATURATE;
        b = X.get("WEBGL_compressed_texture_s3tc");
        if (null !== b) {
            if (a === THREE.RGB_S3TC_DXT1_Format)
                return b.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT1_Format)
                return b.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT3_Format)
                return b.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (a === THREE.RGBA_S3TC_DXT5_Format)
                return b.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        b = X.get("WEBGL_compressed_texture_pvrtc");
        if (null !== b) {
            if (a === THREE.RGB_PVRTC_4BPPV1_Format)
                return b.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
            if (a === THREE.RGB_PVRTC_2BPPV1_Format)
                return b.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
            if (a === THREE.RGBA_PVRTC_4BPPV1_Format)
                return b.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
            if (a === THREE.RGBA_PVRTC_2BPPV1_Format)
                return b.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        }
        b = X.get("EXT_blend_minmax");
        if (null !== b) {
            if (a === THREE.MinEquation)
                return b.MIN_EXT;
            if (a === THREE.MaxEquation)
                return b.MAX_EXT
        }
        return 0
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    a = a || {};
    var K = void 0 !== a.canvas ? a.canvas : document.createElement("canvas")
      , N = void 0 !== a.context ? a.context : null
      , M = K.width
      , C = K.height
      , J = 1
      , L = void 0 !== a.alpha ? a.alpha : !1
      , Q = void 0 !== a.depth ? a.depth : !0
      , T = void 0 !== a.stencil ? a.stencil : !0
      , R = void 0 !== a.antialias ? a.antialias : !1
      , P = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0
      , I = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1
      , S = new THREE.Color(0)
      , U = 0
      , Z = []
      , ca = []
      , da = -1
      , ea = []
      , ha = -1
      , ja = new Float32Array(8)
      , ga = []
      , ba = [];
    this.domElement = K;
    this.context = null;
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.gammaFactor = 2;
    this.gammaOutput = this.gammaInput = !1;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = !0;
    var aa = this
      , fa = null
      , xa = null
      , ua = -1
      , ra = ""
      , qa = null
      , wa = 0
      , ma = 0
      , na = 0
      , oa = K.width
      , pa = K.height
      , Ba = 0
      , Ca = 0
      , za = new THREE.Frustum
      , va = new THREE.Matrix4
      , Y = new THREE.Vector3
      , V = {
        hash: "",
        ambient: [0, 0, 0],
        directional: [],
        point: [],
        spot: [],
        hemi: [],
        shadows: [],
        shadowsPointLight: 0
    }
      , la = {
        geometries: 0,
        textures: 0
    }
      , ka = {
        calls: 0,
        vertices: 0,
        faces: 0,
        points: 0
    };
    this.info = {
        render: ka,
        memory: la,
        programs: null
    };
    var r;
    try {
        L = {
            alpha: L,
            depth: Q,
            stencil: T,
            antialias: R,
            premultipliedAlpha: P,
            preserveDrawingBuffer: I
        };
        r = N || K.getContext("webgl", L) || K.getContext("experimental-webgl", L);
        if (null === r) {
            if (null !== K.getContext("webgl"))
                throw "Error creating WebGL context with your selected attributes.";
            throw "Error creating WebGL context.";
        }
        K.addEventListener("webglcontextlost", e, !1)
    } catch (Da) {
        console.error("THREE.WebGLRenderer: " + Da)
    }
    var X = new THREE.WebGLExtensions(r);
    X.get("OES_texture_float");
    X.get("OES_texture_float_linear");
    X.get("OES_texture_half_float");
    X.get("OES_texture_half_float_linear");
    X.get("OES_standard_derivatives");
    X.get("ANGLE_instanced_arrays");
    X.get("OES_element_index_uint") && (THREE.BufferGeometry.MaxIndex = 4294967296);
    var ia = new THREE.WebGLCapabilities(r,X,a)
      , O = new THREE.WebGLState(r,X,D)
      , W = new THREE.WebGLProperties
      , ta = new THREE.WebGLObjects(r,W,this.info)
      , sa = new THREE.WebGLPrograms(this,ia)
      , ya = new THREE.WebGLLights;
    this.info.programs = sa.programs;
    var Ea = new THREE.WebGLBufferRenderer(r,X,ka)
      , Fa = new THREE.WebGLIndexedBufferRenderer(r,X,ka);
    c();
    this.context = r;
    this.capabilities = ia;
    this.extensions = X;
    this.state = O;
    var Aa = new THREE.WebGLShadowMap(this,V,ta);
    this.shadowMap = Aa;
    var Ga = new THREE.SpritePlugin(this,ga)
      , Ha = new THREE.LensFlarePlugin(this,ba);
    this.getContext = function() {
        return r
    }
    ;
    this.getContextAttributes = function() {
        return r.getContextAttributes()
    }
    ;
    this.forceContextLoss = function() {
        X.get("WEBGL_lose_context").loseContext()
    }
    ;
    this.getMaxAnisotropy = function() {
        var a;
        return function() {
            if (void 0 !== a)
                return a;
            var b = X.get("EXT_texture_filter_anisotropic");
            return a = null !== b ? r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
        }
    }();
    this.getPrecision = function() {
        return ia.precision
    }
    ;
    this.getPixelRatio = function() {
        return J
    }
    ;
    this.setPixelRatio = function(a) {
        void 0 !== a && (J = a)
    }
    ;
    this.getSize = function() {
        return {
            width: M,
            height: C
        }
    }
    ;
    this.setSize = function(a, b, c) {
        M = a;
        C = b;
        K.width = a * J;
        K.height = b * J;
        !1 !== c && (K.style.width = a + "px",
        K.style.height = b + "px");
        this.setViewport(0, 0, a, b)
    }
    ;
    this.setViewport = function(a, b, c, d) {
        ma = a * J;
        na = b * J;
        oa = c * J;
        pa = d * J;
        r.viewport(ma, na, oa, pa)
    }
    ;
    this.getViewport = function(a) {
        a.x = ma / J;
        a.y = na / J;
        a.z = oa / J;
        a.w = pa / J
    }
    ;
    this.setScissor = function(a, b, c, d) {
        r.scissor(a * J, b * J, c * J, d * J)
    }
    ;
    this.enableScissorTest = function(a) {
        O.setScissorTest(a)
    }
    ;
    this.getClearColor = function() {
        return S
    }
    ;
    this.setClearColor = function(a, c) {
        S.set(a);
        U = void 0 !== c ? c : 1;
        b(S.r, S.g, S.b, U)
    }
    ;
    this.getClearAlpha = function() {
        return U
    }
    ;
    this.setClearAlpha = function(a) {
        U = a;
        b(S.r, S.g, S.b, U)
    }
    ;
    this.clear = function(a, b, c) {
        var d = 0;
        if (void 0 === a || a)
            d |= r.COLOR_BUFFER_BIT;
        if (void 0 === b || b)
            d |= r.DEPTH_BUFFER_BIT;
        if (void 0 === c || c)
            d |= r.STENCIL_BUFFER_BIT;
        r.clear(d)
    }
    ;
    this.clearColor = function() {
        r.clear(r.COLOR_BUFFER_BIT)
    }
    ;
    this.clearDepth = function() {
        r.clear(r.DEPTH_BUFFER_BIT)
    }
    ;
    this.clearStencil = function() {
        r.clear(r.STENCIL_BUFFER_BIT)
    }
    ;
    this.clearTarget = function(a, b, c, d) {
        this.setRenderTarget(a);
        this.clear(b, c, d)
    }
    ;
    this.resetGLState = d;
    this.dispose = function() {
        K.removeEventListener("webglcontextlost", e, !1)
    }
    ;
    this.renderBufferImmediate = function(a, b, c) {
        O.initAttributes();
        var d = W.get(a);
        a.hasPositions && !d.position && (d.position = r.createBuffer());
        a.hasNormals && !d.normal && (d.normal = r.createBuffer());
        a.hasUvs && !d.uv && (d.uv = r.createBuffer());
        a.hasColors && !d.color && (d.color = r.createBuffer());
        b = b.getAttributes();
        a.hasPositions && (r.bindBuffer(r.ARRAY_BUFFER, d.position),
        r.bufferData(r.ARRAY_BUFFER, a.positionArray, r.DYNAMIC_DRAW),
        O.enableAttribute(b.position),
        r.vertexAttribPointer(b.position, 3, r.FLOAT, !1, 0, 0));
        if (a.hasNormals) {
            r.bindBuffer(r.ARRAY_BUFFER, d.normal);
            if ("MeshPhongMaterial" !== c.type && "MeshStandardMaterial" !== c.type && c.shading === THREE.FlatShading)
                for (var e = 0, f = 3 * a.count; e < f; e += 9) {
                    var g = a.normalArray
                      , h = (g[e + 0] + g[e + 3] + g[e + 6]) / 3
                      , k = (g[e + 1] + g[e + 4] + g[e + 7]) / 3
                      , l = (g[e + 2] + g[e + 5] + g[e + 8]) / 3;
                    g[e + 0] = h;
                    g[e + 1] = k;
                    g[e + 2] = l;
                    g[e + 3] = h;
                    g[e + 4] = k;
                    g[e + 5] = l;
                    g[e + 6] = h;
                    g[e + 7] = k;
                    g[e + 8] = l
                }
            r.bufferData(r.ARRAY_BUFFER, a.normalArray, r.DYNAMIC_DRAW);
            O.enableAttribute(b.normal);
            r.vertexAttribPointer(b.normal, 3, r.FLOAT, !1, 0, 0)
        }
        a.hasUvs && c.map && (r.bindBuffer(r.ARRAY_BUFFER, d.uv),
        r.bufferData(r.ARRAY_BUFFER, a.uvArray, r.DYNAMIC_DRAW),
        O.enableAttribute(b.uv),
        r.vertexAttribPointer(b.uv, 2, r.FLOAT, !1, 0, 0));
        a.hasColors && c.vertexColors !== THREE.NoColors && (r.bindBuffer(r.ARRAY_BUFFER, d.color),
        r.bufferData(r.ARRAY_BUFFER, a.colorArray, r.DYNAMIC_DRAW),
        O.enableAttribute(b.color),
        r.vertexAttribPointer(b.color, 3, r.FLOAT, !1, 0, 0));
        O.disableUnusedAttributes();
        r.drawArrays(r.TRIANGLES, 0, a.count);
        a.count = 0
    }
    ;
    this.renderBufferDirect = function(a, b, c, d, e, f) {
        t(d);
        var g = w(a, b, d, e)
          , h = !1;
        a = c.id + "_" + g.id + "_" + d.wireframe;
        a !== ra && (ra = a,
        h = !0);
        b = e.morphTargetInfluences;
        if (void 0 !== b) {
            a = [];
            for (var k = 0, h = b.length; k < h; k++) {
                var m = b[k];
                a.push([m, k])
            }
            a.sort(l);
            8 < a.length && (a.length = 8);
            for (var n = c.morphAttributes, k = 0, h = a.length; k < h; k++)
                m = a[k],
                ja[k] = m[0],
                0 !== m[0] ? (b = m[1],
                !0 === d.morphTargets && n.position && c.addAttribute("morphTarget" + k, n.position[b]),
                !0 === d.morphNormals && n.normal && c.addAttribute("morphNormal" + k, n.normal[b])) : (!0 === d.morphTargets && c.removeAttribute("morphTarget" + k),
                !0 === d.morphNormals && c.removeAttribute("morphNormal" + k));
            a = g.getUniforms();
            null !== a.morphTargetInfluences && r.uniform1fv(a.morphTargetInfluences, ja);
            h = !0
        }
        b = c.index;
        k = c.attributes.position;
        !0 === d.wireframe && (b = ta.getWireframeAttribute(c));
        null !== b ? (a = Fa,
        a.setIndex(b)) : a = Ea;
        if (h) {
            a: {
                var h = void 0, p;
                if (c instanceof THREE.InstancedBufferGeometry && (p = X.get("ANGLE_instanced_arrays"),
                null === p)) {
                    console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                    break a
                }
                void 0 === h && (h = 0);
                O.initAttributes();
                var m = c.attributes, g = g.getAttributes(), n = d.defaultAttributeValues, q;
                for (q in g) {
                    var u = g[q];
                    if (0 <= u) {
                        var v = m[q];
                        if (void 0 !== v) {
                            var x = v.itemSize
                              , y = ta.getAttributeBuffer(v);
                            if (v instanceof THREE.InterleavedBufferAttribute) {
                                var D = v.data
                                  , E = D.stride
                                  , v = v.offset;
                                D instanceof THREE.InstancedInterleavedBuffer ? (O.enableAttributeAndDivisor(u, D.meshPerAttribute, p),
                                void 0 === c.maxInstancedCount && (c.maxInstancedCount = D.meshPerAttribute * D.count)) : O.enableAttribute(u);
                                r.bindBuffer(r.ARRAY_BUFFER, y);
                                r.vertexAttribPointer(u, x, r.FLOAT, !1, E * D.array.BYTES_PER_ELEMENT, (h * E + v) * D.array.BYTES_PER_ELEMENT)
                            } else
                                v instanceof THREE.InstancedBufferAttribute ? (O.enableAttributeAndDivisor(u, v.meshPerAttribute, p),
                                void 0 === c.maxInstancedCount && (c.maxInstancedCount = v.meshPerAttribute * v.count)) : O.enableAttribute(u),
                                r.bindBuffer(r.ARRAY_BUFFER, y),
                                r.vertexAttribPointer(u, x, r.FLOAT, !1, 0, h * x * 4)
                        } else if (void 0 !== n && (x = n[q],
                        void 0 !== x))
                            switch (x.length) {
                            case 2:
                                r.vertexAttrib2fv(u, x);
                                break;
                            case 3:
                                r.vertexAttrib3fv(u, x);
                                break;
                            case 4:
                                r.vertexAttrib4fv(u, x);
                                break;
                            default:
                                r.vertexAttrib1fv(u, x)
                            }
                    }
                }
                O.disableUnusedAttributes()
            }
            null !== b && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, ta.getAttributeBuffer(b))
        }
        p = Infinity;
        null !== b ? p = b.count : void 0 !== k && (p = k.count);
        q = c.drawRange.start;
        b = c.drawRange.count;
        k = null !== f ? f.start : 0;
        h = null !== f ? f.count : Infinity;
        f = Math.max(0, q, k);
        p = Math.min(0 + p, q + b, k + h) - 1;
        p = Math.max(0, p - f + 1);
        if (e instanceof THREE.Mesh)
            if (!0 === d.wireframe)
                O.setLineWidth(d.wireframeLinewidth * J),
                a.setMode(r.LINES);
            else
                switch (e.drawMode) {
                case THREE.TrianglesDrawMode:
                    a.setMode(r.TRIANGLES);
                    break;
                case THREE.TriangleStripDrawMode:
                    a.setMode(r.TRIANGLE_STRIP);
                    break;
                case THREE.TriangleFanDrawMode:
                    a.setMode(r.TRIANGLE_FAN)
                }
        else
            e instanceof THREE.Line ? (d = d.linewidth,
            void 0 === d && (d = 1),
            O.setLineWidth(d * J),
            e instanceof THREE.LineSegments ? a.setMode(r.LINES) : a.setMode(r.LINE_STRIP)) : e instanceof THREE.Points && a.setMode(r.POINTS);
        c instanceof THREE.InstancedBufferGeometry && 0 < c.maxInstancedCount ? a.renderInstances(c, f, p) : a.render(f, p)
    }
    ;
    this.render = function(a, b, c, d) {
        if (!1 === b instanceof THREE.Camera)
            console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        else {
            var e = a.fog;
            ra = "";
            ua = -1;
            qa = null;
            !0 === a.autoUpdate && a.updateMatrixWorld();
            null === b.parent && b.updateMatrixWorld();
            b.matrixWorldInverse.getInverse(b.matrixWorld);
            va.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
            za.setFromMatrix(va);
            Z.length = 0;
            ha = da = -1;
            ga.length = 0;
            ba.length = 0;
            q(a, b);
            ca.length = da + 1;
            ea.length = ha + 1;
            !0 === aa.sortObjects && (ca.sort(m),
            ea.sort(p));
            var f = Z, g, h, k, l = 0, n = 0, t = 0, v, x, w, D = b.matrixWorldInverse, y = 0, E = 0, M = 0, A = 0, z = 0;
            g = V.shadowsPointLight = 0;
            for (h = f.length; g < h; g++)
                if (k = f[g],
                v = k.color,
                x = k.intensity,
                w = k.distance,
                k instanceof THREE.AmbientLight)
                    l += v.r,
                    n += v.g,
                    t += v.b;
                else if (k instanceof THREE.DirectionalLight) {
                    var C = ya.get(k);
                    C.direction.setFromMatrixPosition(k.matrixWorld);
                    Y.setFromMatrixPosition(k.target.matrixWorld);
                    C.direction.sub(Y);
                    C.direction.transformDirection(D);
                    C.color.copy(k.color).multiplyScalar(k.intensity);
                    k.castShadow ? (C.shadow = z,
                    V.shadows[z++] = k) : C.shadow = -1;
                    V.directional[y++] = C
                } else
                    k instanceof THREE.PointLight ? (C = ya.get(k),
                    C.position.setFromMatrixPosition(k.matrixWorld),
                    C.position.applyMatrix4(D),
                    C.color.copy(k.color).multiplyScalar(k.intensity),
                    C.distance = k.distance,
                    C.decay = 0 === k.distance ? 0 : k.decay,
                    k.castShadow ? (C.shadow = z,
                    V.shadows[z++] = k,
                    V.shadowsPointLight++) : C.shadow = -1,
                    V.point[E++] = C) : k instanceof THREE.SpotLight ? (C = ya.get(k),
                    C.position.setFromMatrixPosition(k.matrixWorld),
                    C.position.applyMatrix4(D),
                    C.color.copy(v).multiplyScalar(x),
                    C.distance = w,
                    C.direction.setFromMatrixPosition(k.matrixWorld),
                    Y.setFromMatrixPosition(k.target.matrixWorld),
                    C.direction.sub(Y),
                    C.direction.transformDirection(D),
                    C.angleCos = Math.cos(k.angle),
                    C.exponent = k.exponent,
                    C.decay = 0 === k.distance ? 0 : k.decay,
                    k.castShadow ? (C.shadow = z,
                    V.shadows[z++] = k) : C.shadow = -1,
                    V.spot[M++] = C) : k instanceof THREE.HemisphereLight && (C = ya.get(k),
                    C.direction.setFromMatrixPosition(k.matrixWorld),
                    C.direction.transformDirection(D),
                    C.direction.normalize(),
                    C.skyColor.copy(k.color).multiplyScalar(x),
                    C.groundColor.copy(k.groundColor).multiplyScalar(x),
                    V.hemi[A++] = C);
            V.ambient[0] = l;
            V.ambient[1] = n;
            V.ambient[2] = t;
            V.directional.length = y;
            V.point.length = E;
            V.spot.length = M;
            V.hemi.length = A;
            V.shadows.length = z;
            V.hash = y + "," + E + "," + M + "," + A + "," + z;
            Aa.render(a, b);
            ka.calls = 0;
            ka.vertices = 0;
            ka.faces = 0;
            ka.points = 0;
            this.setRenderTarget(c);
            (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
            a.overrideMaterial ? (d = a.overrideMaterial,
            u(ca, b, e, d),
            u(ea, b, e, d)) : (O.setBlending(THREE.NoBlending),
            u(ca, b, e),
            u(ea, b, e));
            Ga.render(a, b);
            Ha.render(a, b, Ba, Ca);
            c && (a = c.texture,
            a.generateMipmaps && F(c) && a.minFilter !== THREE.NearestFilter && a.minFilter !== THREE.LinearFilter && (a = c instanceof THREE.WebGLRenderTargetCube ? r.TEXTURE_CUBE_MAP : r.TEXTURE_2D,
            c = W.get(c.texture).__webglTexture,
            O.bindTexture(a, c),
            r.generateMipmap(a),
            O.bindTexture(a, null)));
            O.setDepthTest(!0);
            O.setDepthWrite(!0);
            O.setColorWrite(!0)
        }
    }
    ;
    this.setFaceCulling = function(a, b) {
        a === THREE.CullFaceNone ? O.disable(r.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? r.frontFace(r.CW) : r.frontFace(r.CCW),
        a === THREE.CullFaceBack ? r.cullFace(r.BACK) : a === THREE.CullFaceFront ? r.cullFace(r.FRONT) : r.cullFace(r.FRONT_AND_BACK),
        O.enable(r.CULL_FACE))
    }
    ;
    this.setTexture = function(a, b) {
        var c = W.get(a);
        if (0 < a.version && c.__version !== a.version) {
            var d = a.image;
            if (void 0 === d)
                console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", a);
            else if (!1 === d.complete)
                console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", a);
            else {
                void 0 === c.__webglInit && (c.__webglInit = !0,
                a.addEventListener("dispose", f),
                c.__webglTexture = r.createTexture(),
                la.textures++);
                O.activeTexture(r.TEXTURE0 + b);
                O.bindTexture(r.TEXTURE_2D, c.__webglTexture);
                r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, a.flipY);
                r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
                r.pixelStorei(r.UNPACK_ALIGNMENT, a.unpackAlignment);
                a.image = y(a.image, ia.maxTextureSize);
                if ((a.wrapS !== THREE.ClampToEdgeWrapping || a.wrapT !== THREE.ClampToEdgeWrapping || a.minFilter !== THREE.NearestFilter && a.minFilter !== THREE.LinearFilter) && !1 === F(a.image)) {
                    d = a.image;
                    if (d instanceof HTMLImageElement || d instanceof HTMLCanvasElement) {
                        var e = document.createElement("canvas");
                        e.width = THREE.Math.nearestPowerOfTwo(d.width);
                        e.height = THREE.Math.nearestPowerOfTwo(d.height);
                        e.getContext("2d").drawImage(d, 0, 0, e.width, e.height);
                        console.warn("THREE.WebGLRenderer: image is not power of two (" + d.width + "x" + d.height + "). Resized to " + e.width + "x" + e.height, d);
                        d = e
                    }
                    a.image = d
                }
                var g = a.image
                  , d = F(g)
                  , e = D(a.format)
                  , h = D(a.type);
                E(r.TEXTURE_2D, a, d);
                var k = a.mipmaps;
                if (a instanceof THREE.DataTexture)
                    if (0 < k.length && d) {
                        for (var l = 0, m = k.length; l < m; l++)
                            g = k[l],
                            O.texImage2D(r.TEXTURE_2D, l, e, g.width, g.height, 0, e, h, g.data);
                        a.generateMipmaps = !1
                    } else
                        O.texImage2D(r.TEXTURE_2D, 0, e, g.width, g.height, 0, e, h, g.data);
                else if (a instanceof THREE.CompressedTexture)
                    for (l = 0,
                    m = k.length; l < m; l++)
                        g = k[l],
                        a.format !== THREE.RGBAFormat && a.format !== THREE.RGBFormat ? -1 < O.getCompressedTextureFormats().indexOf(e) ? O.compressedTexImage2D(r.TEXTURE_2D, l, e, g.width, g.height, 0, g.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : O.texImage2D(r.TEXTURE_2D, l, e, g.width, g.height, 0, e, h, g.data);
                else if (0 < k.length && d) {
                    l = 0;
                    for (m = k.length; l < m; l++)
                        g = k[l],
                        O.texImage2D(r.TEXTURE_2D, l, e, e, h, g);
                    a.generateMipmaps = !1
                } else
                    O.texImage2D(r.TEXTURE_2D, 0, e, e, h, a.image);
                a.generateMipmaps && d && r.generateMipmap(r.TEXTURE_2D);
                c.__version = a.version;
                if (a.onUpdate)
                    a.onUpdate(a)
            }
        } else
            O.activeTexture(r.TEXTURE0 + b),
            O.bindTexture(r.TEXTURE_2D, c.__webglTexture)
    }
    ;
    this.setRenderTarget = function(a) {
        if (a && void 0 === W.get(a).__webglFramebuffer) {
            var b = W.get(a)
              , c = W.get(a.texture);
            a.addEventListener("dispose", g);
            c.__webglTexture = r.createTexture();
            la.textures++;
            var d = a instanceof THREE.WebGLRenderTargetCube
              , e = THREE.Math.isPowerOfTwo(a.width) && THREE.Math.isPowerOfTwo(a.height);
            D(a.texture.format);
            D(a.texture.type);
            if (d) {
                b.__webglFramebuffer = [];
                for (var f = 0; 6 > f; f++)
                    b.__webglFramebuffer[f] = r.createFramebuffer()
            } else
                b.__webglFramebuffer = r.createFramebuffer();
            if (d) {
                O.bindTexture(r.TEXTURE_CUBE_MAP, c.__webglTexture);
                E(r.TEXTURE_CUBE_MAP, a.texture, e);
                for (f = 0; 6 > f; f++)
                    B(b.__webglFramebuffer[f], a, r.COLOR_ATTACHMENT0, r.TEXTURE_CUBE_MAP_POSITIVE_X + f);
                a.texture.generateMipmaps && e && r.generateMipmap(r.TEXTURE_CUBE_MAP);
                O.bindTexture(r.TEXTURE_CUBE_MAP, null)
            } else
                O.bindTexture(r.TEXTURE_2D, c.__webglTexture),
                E(r.TEXTURE_2D, a.texture, e),
                B(b.__webglFramebuffer, a, r.COLOR_ATTACHMENT0, r.TEXTURE_2D),
                a.texture.generateMipmaps && e && r.generateMipmap(r.TEXTURE_2D),
                O.bindTexture(r.TEXTURE_2D, null);
            if (a.depthBuffer) {
                b = W.get(a);
                if (a instanceof THREE.WebGLRenderTargetCube)
                    for (b.__webglDepthbuffer = [],
                    c = 0; 6 > c; c++)
                        r.bindFramebuffer(r.FRAMEBUFFER, b.__webglFramebuffer[c]),
                        b.__webglDepthbuffer[c] = r.createRenderbuffer(),
                        H(b.__webglDepthbuffer[c], a);
                else
                    r.bindFramebuffer(r.FRAMEBUFFER, b.__webglFramebuffer),
                    b.__webglDepthbuffer = r.createRenderbuffer(),
                    H(b.__webglDepthbuffer, a);
                r.bindFramebuffer(r.FRAMEBUFFER, null)
            }
        }
        var b = a instanceof THREE.WebGLRenderTargetCube, h;
        a ? (c = W.get(a),
        e = b ? c.__webglFramebuffer[a.activeCubeFace] : c.__webglFramebuffer,
        c = a.width,
        d = a.height,
        h = f = 0) : (e = null,
        c = oa,
        d = pa,
        f = ma,
        h = na);
        e !== xa && (r.bindFramebuffer(r.FRAMEBUFFER, e),
        r.viewport(f, h, c, d),
        xa = e);
        b && (b = W.get(a.texture),
        r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_CUBE_MAP_POSITIVE_X + a.activeCubeFace, b.__webglTexture, 0));
        Ba = c;
        Ca = d
    }
    ;
    this.readRenderTargetPixels = function(a, b, c, d, e, f) {
        if (!1 === a instanceof THREE.WebGLRenderTarget)
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        else {
            var g = W.get(a).__webglFramebuffer;
            if (g) {
                var h = !1;
                g !== xa && (r.bindFramebuffer(r.FRAMEBUFFER, g),
                h = !0);
                try {
                    var k = a.texture;
                    k.format !== THREE.RGBAFormat && D(k.format) !== r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT) ? console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.") : k.type === THREE.UnsignedByteType || D(k.type) === r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE) || k.type === THREE.FloatType && X.get("WEBGL_color_buffer_float") || k.type === THREE.HalfFloatType && X.get("EXT_color_buffer_half_float") ? r.checkFramebufferStatus(r.FRAMEBUFFER) === r.FRAMEBUFFER_COMPLETE ? r.readPixels(b, c, d, e, D(k.format), D(k.type), f) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.") : console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.")
                } finally {
                    h && r.bindFramebuffer(r.FRAMEBUFFER, xa)
                }
            }
        }
    }
}
;
THREE.WebGLRenderTarget = function(a, b, c) {
    this.uuid = THREE.Math.generateUUID();
    this.width = a;
    this.height = b;
    c = c || {};
    void 0 === c.minFilter && (c.minFilter = THREE.LinearFilter);
    this.texture = new THREE.Texture(void 0,void 0,c.wrapS,c.wrapT,c.magFilter,c.minFilter,c.format,c.type,c.anisotropy);
    this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
    this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0
}
;
THREE.WebGLRenderTarget.prototype = {
    constructor: THREE.WebGLRenderTarget,
    setSize: function(a, b) {
        if (this.width !== a || this.height !== b)
            this.width = a,
            this.height = b,
            this.dispose()
    },
    clone: function() {
        return (new this.constructor).copy(this)
    },
    copy: function(a) {
        this.width = a.width;
        this.height = a.height;
        this.texture = a.texture.clone();
        this.depthBuffer = a.depthBuffer;
        this.stencilBuffer = a.stencilBuffer;
        this.shareDepthFrom = a.shareDepthFrom;
        return this
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
};
THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube = function(a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c);
    this.activeCubeFace = 0
}
;
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.WebGLBufferRenderer = function(a, b, c) {
    var d;
    this.setMode = function(a) {
        d = a
    }
    ;
    this.render = function(b, f) {
        a.drawArrays(d, b, f);
        c.calls++;
        c.vertices += f;
        d === a.TRIANGLES && (c.faces += f / 3)
    }
    ;
    this.renderInstances = function(a) {
        var c = b.get("ANGLE_instanced_arrays");
        if (null === c)
            console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        else {
            var g = a.attributes.position;
            g instanceof THREE.InterleavedBufferAttribute ? c.drawArraysInstancedANGLE(d, 0, g.data.count, a.maxInstancedCount) : c.drawArraysInstancedANGLE(d, 0, g.count, a.maxInstancedCount)
        }
    }
}
;
THREE.WebGLIndexedBufferRenderer = function(a, b, c) {
    var d, e, f;
    this.setMode = function(a) {
        d = a
    }
    ;
    this.setIndex = function(c) {
        c.array instanceof Uint32Array && b.get("OES_element_index_uint") ? (e = a.UNSIGNED_INT,
        f = 4) : (e = a.UNSIGNED_SHORT,
        f = 2)
    }
    ;
    this.render = function(b, h) {
        a.drawElements(d, h, e, b * f);
        c.calls++;
        c.vertices += h;
        d === a.TRIANGLES && (c.faces += h / 3)
    }
    ;
    this.renderInstances = function(a, c, k) {
        var l = b.get("ANGLE_instanced_arrays");
        null === l ? console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") : l.drawElementsInstancedANGLE(d, k, e, c * f, a.maxInstancedCount)
    }
}
;
THREE.WebGLExtensions = function(a) {
    var b = {};
    this.get = function(c) {
        if (void 0 !== b[c])
            return b[c];
        var d;
        switch (c) {
        case "EXT_texture_filter_anisotropic":
            d = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
        case "WEBGL_compressed_texture_s3tc":
            d = a.getExtension("WEBGL_compressed_texture_s3tc") || a.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
        case "WEBGL_compressed_texture_pvrtc":
            d = a.getExtension("WEBGL_compressed_texture_pvrtc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
        default:
            d = a.getExtension(c)
        }
        null === d && console.warn("THREE.WebGLRenderer: " + c + " extension not supported.");
        return b[c] = d
    }
}
;
THREE.WebGLCapabilities = function(a, b, c) {
    function d(b) {
        if ("highp" === b) {
            if (0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision)
                return "highp";
            b = "mediump"
        }
        return "mediump" === b && 0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
    }
    this.getMaxPrecision = d;
    this.precision = void 0 !== c.precision ? c.precision : "highp";
    this.logarithmicDepthBuffer = void 0 !== c.logarithmicDepthBuffer ? c.logarithmicDepthBuffer : !1;
    this.maxTextures = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);
    this.maxVertexTextures = a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this.maxTextureSize = a.getParameter(a.MAX_TEXTURE_SIZE);
    this.maxCubemapSize = a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE);
    this.maxAttributes = a.getParameter(a.MAX_VERTEX_ATTRIBS);
    this.maxVertexUniforms = a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS);
    this.maxVaryings = a.getParameter(a.MAX_VARYING_VECTORS);
    this.maxFragmentUniforms = a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS);
    this.vertexTextures = 0 < this.maxVertexTextures;
    this.floatFragmentTextures = !!b.get("OES_texture_float");
    this.floatVertexTextures = this.vertexTextures && this.floatFragmentTextures;
    c = d(this.precision);
    c !== this.precision && (console.warn("THREE.WebGLRenderer:", this.precision, "not supported, using", c, "instead."),
    this.precision = c);
    this.logarithmicDepthBuffer && (this.logarithmicDepthBuffer = !!b.get("EXT_frag_depth"))
}
;
THREE.WebGLGeometries = function(a, b, c) {
    function d(a) {
        a = a.target;
        var h = f[a.id];
        null !== h.index && e(h.index);
        var h = h.attributes, k;
        for (k in h)
            e(h[k]);
        a.removeEventListener("dispose", d);
        delete f[a.id];
        k = b.get(a);
        k.wireframe && e(k.wireframe);
        b.delete(a);
        c.memory.geometries--
    }
    function e(c) {
        var d;
        d = c instanceof THREE.InterleavedBufferAttribute ? b.get(c.data).__webglBuffer : b.get(c).__webglBuffer;
        void 0 !== d && (a.deleteBuffer(d),
        c instanceof THREE.InterleavedBufferAttribute ? b.delete(c.data) : b.delete(c))
    }
    var f = {};
    this.get = function(a) {
        var b = a.geometry;
        if (void 0 !== f[b.id])
            return f[b.id];
        b.addEventListener("dispose", d);
        var e;
        b instanceof THREE.BufferGeometry ? e = b : b instanceof THREE.Geometry && (void 0 === b._bufferGeometry && (b._bufferGeometry = (new THREE.BufferGeometry).setFromObject(a)),
        e = b._bufferGeometry);
        f[b.id] = e;
        c.memory.geometries++;
        return e
    }
}
;
THREE.WebGLLights = function() {
    var a = {};
    this.get = function(b) {
        if (void 0 !== a[b.id])
            return a[b.id];
        var c;
        switch (b.type) {
        case "DirectionalLight":
            c = {
                direction: new THREE.Vector3,
                color: new THREE.Color,
                shadow: -1
            };
            break;
        case "PointLight":
            c = {
                position: new THREE.Vector3,
                color: new THREE.Color,
                distance: 0,
                decay: 0,
                shadow: -1
            };
            break;
        case "SpotLight":
            c = {
                position: new THREE.Vector3,
                direction: new THREE.Vector3,
                color: new THREE.Color,
                distance: 0,
                decay: 0,
                angleCos: 0
            };
            break;
        case "HemisphereLight":
            c = {
                direction: new THREE.Vector3,
                skyColor: new THREE.Color,
                groundColor: new THREE.Color
            }
        }
        return a[b.id] = c
    }
}
;
THREE.WebGLObjects = function(a, b, c) {
    function d(c, d) {
        var e = c instanceof THREE.InterleavedBufferAttribute ? c.data : c
          , f = b.get(e);
        void 0 === f.__webglBuffer ? (f.__webglBuffer = a.createBuffer(),
        a.bindBuffer(d, f.__webglBuffer),
        a.bufferData(d, e.array, e.dynamic ? a.DYNAMIC_DRAW : a.STATIC_DRAW),
        f.version = e.version) : f.version !== e.version && (a.bindBuffer(d, f.__webglBuffer),
        !1 === e.dynamic || -1 === e.updateRange.count ? a.bufferSubData(d, 0, e.array) : 0 === e.updateRange.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (a.bufferSubData(d, e.updateRange.offset * e.array.BYTES_PER_ELEMENT, e.array.subarray(e.updateRange.offset, e.updateRange.offset + e.updateRange.count)),
        e.updateRange.count = 0),
        f.version = e.version)
    }
    function e(a, b, c) {
        if (b > c) {
            var d = b;
            b = c;
            c = d
        }
        d = a[b];
        return void 0 === d ? (a[b] = [c],
        !0) : -1 === d.indexOf(c) ? (d.push(c),
        !0) : !1
    }
    var f = new THREE.WebGLGeometries(a,b,c);
    this.getAttributeBuffer = function(a) {
        return a instanceof THREE.InterleavedBufferAttribute ? b.get(a.data).__webglBuffer : b.get(a).__webglBuffer
    }
    ;
    this.getWireframeAttribute = function(c) {
        var f = b.get(c);
        if (void 0 !== f.wireframe)
            return f.wireframe;
        var k = []
          , l = c.index
          , m = c.attributes;
        c = m.position;
        if (null !== l)
            for (var m = {}, l = l.array, p = 0, n = l.length; p < n; p += 3) {
                var q = l[p + 0]
                  , u = l[p + 1]
                  , t = l[p + 2];
                e(m, q, u) && k.push(q, u);
                e(m, u, t) && k.push(u, t);
                e(m, t, q) && k.push(t, q)
            }
        else
            for (l = m.position.array,
            p = 0,
            n = l.length / 3 - 1; p < n; p += 3)
                q = p + 0,
                u = p + 1,
                t = p + 2,
                k.push(q, u, u, t, t, q);
        k = new THREE.BufferAttribute(new (65535 < c.count ? Uint32Array : Uint16Array)(k),1);
        d(k, a.ELEMENT_ARRAY_BUFFER);
        return f.wireframe = k
    }
    ;
    this.update = function(b) {
        var c = f.get(b);
        b.geometry instanceof THREE.Geometry && c.updateFromObject(b);
        b = c.index;
        var e = c.attributes;
        null !== b && d(b, a.ELEMENT_ARRAY_BUFFER);
        for (var l in e)
            d(e[l], a.ARRAY_BUFFER);
        b = c.morphAttributes;
        for (l in b)
            for (var e = b[l], m = 0, p = e.length; m < p; m++)
                d(e[m], a.ARRAY_BUFFER);
        return c
    }
}
;
THREE.WebGLProgram = function() {
    function a(a, b, d) {
        a = a || {};
        return [a.derivatives || b.bumpMap || b.normalMap || b.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (a.fragDepth || b.logarithmicDepthBuffer) && d.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", a.drawBuffers && d.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (a.shaderTextureLOD || b.envMap) && d.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(c).join("\n")
    }
    function b(a) {
        var b = [], c;
        for (c in a) {
            var d = a[c];
            !1 !== d && b.push("#define " + c + " " + d)
        }
        return b.join("\n")
    }
    function c(a) {
        return "" !== a
    }
    var d = 0
      , e = /^([\w\d_]+)\.([\w\d_]+)$/
      , f = /^([\w\d_]+)\[(\d+)\]\.([\w\d_]+)$/
      , g = /^([\w\d_]+)\[0\]$/;
    return function(h, k, l, m) {
        var p = h.context
          , n = l.extensions
          , q = l.defines
          , u = l.__webglShader.vertexShader
          , t = l.__webglShader.fragmentShader
          , w = "SHADOWMAP_TYPE_BASIC";
        m.shadowMapType === THREE.PCFShadowMap ? w = "SHADOWMAP_TYPE_PCF" : m.shadowMapType === THREE.PCFSoftShadowMap && (w = "SHADOWMAP_TYPE_PCF_SOFT");
        var v = "ENVMAP_TYPE_CUBE"
          , x = "ENVMAP_MODE_REFLECTION"
          , E = "ENVMAP_BLENDING_MULTIPLY";
        if (m.envMap) {
            switch (l.envMap.mapping) {
            case THREE.CubeReflectionMapping:
            case THREE.CubeRefractionMapping:
                v = "ENVMAP_TYPE_CUBE";
                break;
            case THREE.EquirectangularReflectionMapping:
            case THREE.EquirectangularRefractionMapping:
                v = "ENVMAP_TYPE_EQUIREC";
                break;
            case THREE.SphericalReflectionMapping:
                v = "ENVMAP_TYPE_SPHERE"
            }
            switch (l.envMap.mapping) {
            case THREE.CubeRefractionMapping:
            case THREE.EquirectangularRefractionMapping:
                x = "ENVMAP_MODE_REFRACTION"
            }
            switch (l.combine) {
            case THREE.MultiplyOperation:
                E = "ENVMAP_BLENDING_MULTIPLY";
                break;
            case THREE.MixOperation:
                E = "ENVMAP_BLENDING_MIX";
                break;
            case THREE.AddOperation:
                E = "ENVMAP_BLENDING_ADD"
            }
        }
        var y = 0 < h.gammaFactor ? h.gammaFactor : 1
          , n = a(n, m, h.extensions)
          , F = b(q)
          , z = p.createProgram();
        l instanceof THREE.RawShaderMaterial ? h = q = "" : (q = ["precision " + m.precision + " float;", "precision " + m.precision + " int;", "#define SHADER_NAME " + l.__webglShader.name, F, m.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", h.gammaInput ? "#define GAMMA_INPUT" : "", h.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + y, "#define NUM_DIR_LIGHTS " + m.numDirLights, "#define NUM_POINT_LIGHTS " + m.numPointLights, "#define NUM_SPOT_LIGHTS " + m.numSpotLights, "#define NUM_HEMI_LIGHTS " + m.numHemiLights, "#define NUM_SHADOWS " + m.numShadows, "#define MAX_BONES " + m.maxBones, m.map ? "#define USE_MAP" : "", m.envMap ? "#define USE_ENVMAP" : "", m.envMap ? "#define " + x : "", m.lightMap ? "#define USE_LIGHTMAP" : "", m.aoMap ? "#define USE_AOMAP" : "", m.emissiveMap ? "#define USE_EMISSIVEMAP" : "", m.bumpMap ? "#define USE_BUMPMAP" : "", m.normalMap ? "#define USE_NORMALMAP" : "", m.displacementMap && m.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", m.specularMap ? "#define USE_SPECULARMAP" : "", m.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", m.metalnessMap ? "#define USE_METALNESSMAP" : "", m.alphaMap ? "#define USE_ALPHAMAP" : "", m.vertexColors ? "#define USE_COLOR" : "", m.flatShading ? "#define FLAT_SHADED" : "", m.skinning ? "#define USE_SKINNING" : "", m.useVertexTexture ? "#define BONE_TEXTURE" : "", m.morphTargets ? "#define USE_MORPHTARGETS" : "", m.morphNormals && !1 === m.flatShading ? "#define USE_MORPHNORMALS" : "", m.doubleSided ? "#define DOUBLE_SIDED" : "", m.flipSided ? "#define FLIP_SIDED" : "", m.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", m.shadowMapEnabled ? "#define " + w : "", m.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", 0 < m.pointLightShadows ? "#define POINT_LIGHT_SHADOWS" : "", m.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", m.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", m.logarithmicDepthBuffer && h.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(c).join("\n"),
        h = [n, "precision " + m.precision + " float;", "precision " + m.precision + " int;", "#define SHADER_NAME " + l.__webglShader.name, F, "#define NUM_DIR_LIGHTS " + m.numDirLights, "#define NUM_POINT_LIGHTS " + m.numPointLights, "#define NUM_SPOT_LIGHTS " + m.numSpotLights, "#define NUM_HEMI_LIGHTS " + m.numHemiLights, "#define NUM_SHADOWS " + m.numShadows, m.alphaTest ? "#define ALPHATEST " + m.alphaTest : "", h.gammaInput ? "#define GAMMA_INPUT" : "", h.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + y, m.useFog && m.fog ? "#define USE_FOG" : "", m.useFog && m.fogExp ? "#define FOG_EXP2" : "", m.map ? "#define USE_MAP" : "", m.envMap ? "#define USE_ENVMAP" : "", m.envMap ? "#define " + v : "", m.envMap ? "#define " + x : "", m.envMap ? "#define " + E : "", m.lightMap ? "#define USE_LIGHTMAP" : "", m.aoMap ? "#define USE_AOMAP" : "", m.emissiveMap ? "#define USE_EMISSIVEMAP" : "", m.bumpMap ? "#define USE_BUMPMAP" : "", m.normalMap ? "#define USE_NORMALMAP" : "", m.specularMap ? "#define USE_SPECULARMAP" : "", m.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", m.metalnessMap ? "#define USE_METALNESSMAP" : "", m.alphaMap ? "#define USE_ALPHAMAP" : "", m.vertexColors ? "#define USE_COLOR" : "", m.flatShading ? "#define FLAT_SHADED" : "", m.doubleSided ? "#define DOUBLE_SIDED" : "", m.flipSided ? "#define FLIP_SIDED" : "", m.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", m.shadowMapEnabled ? "#define " + w : "", m.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", 0 < m.pointLightShadows ? "#define POINT_LIGHT_SHADOWS" : "", m.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", m.logarithmicDepthBuffer && h.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", m.envMap && h.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "\n"].filter(c).join("\n"));
        t = h + t;
        u = THREE.WebGLShader(p, p.VERTEX_SHADER, q + u);
        t = THREE.WebGLShader(p, p.FRAGMENT_SHADER, t);
        p.attachShader(z, u);
        p.attachShader(z, t);
        void 0 !== l.index0AttributeName ? p.bindAttribLocation(z, 0, l.index0AttributeName) : !0 === m.morphTargets && p.bindAttribLocation(z, 0, "position");
        p.linkProgram(z);
        m = p.getProgramInfoLog(z);
        w = p.getShaderInfoLog(u);
        v = p.getShaderInfoLog(t);
        E = x = !0;
        if (!1 === p.getProgramParameter(z, p.LINK_STATUS))
            x = !1,
            console.error("THREE.WebGLProgram: shader error: ", p.getError(), "gl.VALIDATE_STATUS", p.getProgramParameter(z, p.VALIDATE_STATUS), "gl.getProgramInfoLog", m, w, v);
        else if ("" !== m)
            console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", m);
        else if ("" === w || "" === v)
            E = !1;
        E && (this.diagnostics = {
            runnable: x,
            material: l,
            programLog: m,
            vertexShader: {
                log: w,
                prefix: q
            },
            fragmentShader: {
                log: v,
                prefix: h
            }
        });
        p.deleteShader(u);
        p.deleteShader(t);
        var A;
        this.getUniforms = function() {
            if (void 0 === A) {
                for (var a = {}, b = p.getProgramParameter(z, p.ACTIVE_UNIFORMS), c = 0; c < b; c++) {
                    var d = p.getActiveUniform(z, c).name
                      , h = p.getUniformLocation(z, d)
                      , k = e.exec(d);
                    if (k) {
                        var d = k[1]
                          , k = k[2]
                          , l = a[d];
                        l || (l = a[d] = {});
                        l[k] = h
                    } else if (k = f.exec(d)) {
                        var l = k[1]
                          , d = k[2]
                          , k = k[3]
                          , m = a[l];
                        m || (m = a[l] = []);
                        (l = m[d]) || (l = m[d] = {});
                        l[k] = h
                    } else
                        (k = g.exec(d)) ? (l = k[1],
                        a[l] = h) : a[d] = h
                }
                A = a
            }
            return A
        }
        ;
        var B;
        this.getAttributes = function() {
            if (void 0 === B) {
                for (var a = {}, b = p.getProgramParameter(z, p.ACTIVE_ATTRIBUTES), c = 0; c < b; c++) {
                    var d = p.getActiveAttrib(z, c).name;
                    a[d] = p.getAttribLocation(z, d)
                }
                B = a
            }
            return B
        }
        ;
        this.destroy = function() {
            p.deleteProgram(z);
            this.program = void 0
        }
        ;
        Object.defineProperties(this, {
            uniforms: {
                get: function() {
                    console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");
                    return this.getUniforms()
                }
            },
            attributes: {
                get: function() {
                    console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");
                    return this.getAttributes()
                }
            }
        });
        this.id = d++;
        this.code = k;
        this.usedTimes = 1;
        this.program = z;
        this.vertexShader = u;
        this.fragmentShader = t;
        return this
    }
}();
THREE.WebGLPrograms = function(a, b) {
    var c = []
      , d = {
        MeshDepthMaterial: "depth",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshStandardMaterial: "standard",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points"
    }
      , e = "precision supportsVertexTextures map envMap envMapMode lightMap aoMap emissiveMap bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals numDirLights numPointLights numSpotLights numHemiLights numShadows shadowMapEnabled pointLightShadows shadowMapType shadowMapDebug alphaTest doubleSided flipSided".split(" ");
    this.getParameters = function(c, e, h, k) {
        var l = d[c.type], m;
        b.floatVertexTextures && k && k.skeleton && k.skeleton.useVertexTexture ? m = 1024 : (m = Math.floor((b.maxVertexUniforms - 20) / 4),
        void 0 !== k && k instanceof THREE.SkinnedMesh && (m = Math.min(k.skeleton.bones.length, m),
        m < k.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + k.skeleton.bones.length + ", this GPU supports just " + m + " (try OpenGL instead of ANGLE)")));
        var p = a.getPrecision();
        null !== c.precision && (p = b.getMaxPrecision(c.precision),
        p !== c.precision && console.warn("THREE.WebGLProgram.getParameters:", c.precision, "not supported, using", p, "instead."));
        return {
            shaderID: l,
            precision: p,
            supportsVertexTextures: b.vertexTextures,
            map: !!c.map,
            envMap: !!c.envMap,
            envMapMode: c.envMap && c.envMap.mapping,
            lightMap: !!c.lightMap,
            aoMap: !!c.aoMap,
            emissiveMap: !!c.emissiveMap,
            bumpMap: !!c.bumpMap,
            normalMap: !!c.normalMap,
            displacementMap: !!c.displacementMap,
            roughnessMap: !!c.roughnessMap,
            metalnessMap: !!c.metalnessMap,
            specularMap: !!c.specularMap,
            alphaMap: !!c.alphaMap,
            combine: c.combine,
            vertexColors: c.vertexColors,
            fog: h,
            useFog: c.fog,
            fogExp: h instanceof THREE.FogExp2,
            flatShading: c.shading === THREE.FlatShading,
            sizeAttenuation: c.sizeAttenuation,
            logarithmicDepthBuffer: b.logarithmicDepthBuffer,
            skinning: c.skinning,
            maxBones: m,
            useVertexTexture: b.floatVertexTextures && k && k.skeleton && k.skeleton.useVertexTexture,
            morphTargets: c.morphTargets,
            morphNormals: c.morphNormals,
            maxMorphTargets: a.maxMorphTargets,
            maxMorphNormals: a.maxMorphNormals,
            numDirLights: e.directional.length,
            numPointLights: e.point.length,
            numSpotLights: e.spot.length,
            numHemiLights: e.hemi.length,
            numShadows: e.shadows.length,
            pointLightShadows: e.shadowsPointLight,
            shadowMapEnabled: a.shadowMap.enabled && k.receiveShadow && 0 < e.shadows.length,
            shadowMapType: a.shadowMap.type,
            shadowMapDebug: a.shadowMap.debug,
            alphaTest: c.alphaTest,
            doubleSided: c.side === THREE.DoubleSide,
            flipSided: c.side === THREE.BackSide
        }
    }
    ;
    this.getProgramCode = function(a, b) {
        var c = [];
        b.shaderID ? c.push(b.shaderID) : (c.push(a.fragmentShader),
        c.push(a.vertexShader));
        if (void 0 !== a.defines)
            for (var d in a.defines)
                c.push(d),
                c.push(a.defines[d]);
        for (d = 0; d < e.length; d++) {
            var l = e[d];
            c.push(l);
            c.push(b[l])
        }
        return c.join()
    }
    ;
    this.acquireProgram = function(b, d, e) {
        for (var k, l = 0, m = c.length; l < m; l++) {
            var p = c[l];
            if (p.code === e) {
                k = p;
                ++k.usedTimes;
                break
            }
        }
        void 0 === k && (k = new THREE.WebGLProgram(a,e,b,d),
        c.push(k));
        return k
    }
    ;
    this.releaseProgram = function(a) {
        if (0 === --a.usedTimes) {
            var b = c.indexOf(a);
            c[b] = c[c.length - 1];
            c.pop();
            a.destroy()
        }
    }
    ;
    this.programs = c
}
;
THREE.WebGLProperties = function() {
    var a = {};
    this.get = function(b) {
        b = b.uuid;
        var c = a[b];
        void 0 === c && (c = {},
        a[b] = c);
        return c
    }
    ;
    this.delete = function(b) {
        delete a[b.uuid]
    }
    ;
    this.clear = function() {
        a = {}
    }
}
;
THREE.WebGLShader = function() {
    function a(a) {
        a = a.split("\n");
        for (var c = 0; c < a.length; c++)
            a[c] = c + 1 + ": " + a[c];
        return a.join("\n")
    }
    return function(b, c, d) {
        var e = b.createShader(c);
        b.shaderSource(e, d);
        b.compileShader(e);
        !1 === b.getShaderParameter(e, b.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile.");
        "" !== b.getShaderInfoLog(e) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", c === b.VERTEX_SHADER ? "vertex" : "fragment", b.getShaderInfoLog(e), a(d));
        return e
    }
}();
THREE.WebGLShadowMap = function(a, b, c) {
    function d(a, b, c, d) {
        var e = a.geometry
          , f = null
          , f = n
          , g = a.customDepthMaterial;
        c && (f = q,
        g = a.customDistanceMaterial);
        g ? f = g : (a = a instanceof THREE.SkinnedMesh && b.skinning,
        g = 0,
        void 0 !== e.morphTargets && 0 < e.morphTargets.length && b.morphTargets && (g |= 1),
        a && (g |= 2),
        f = f[g]);
        f.visible = b.visible;
        f.wireframe = b.wireframe;
        f.wireframeLinewidth = b.wireframeLinewidth;
        c && void 0 !== f.uniforms.lightPos && f.uniforms.lightPos.value.copy(d);
        return f
    }
    function e(a, b, c) {
        if (!1 !== a.visible) {
            a.layers.test(b.layers) && (a instanceof THREE.Mesh || a instanceof THREE.Line || a instanceof THREE.Points) && a.castShadow && (!1 === a.frustumCulled || !0 === h.intersectsObject(a)) && !0 === a.material.visible && (a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse, a.matrixWorld),
            p.push(a));
            a = a.children;
            for (var d = 0, f = a.length; d < f; d++)
                e(a[d], b, c)
        }
    }
    var f = a.context
      , g = a.state
      , h = new THREE.Frustum
      , k = new THREE.Matrix4;
    new THREE.Vector3;
    new THREE.Vector3;
    for (var l = new THREE.Vector3, m = new THREE.Vector3, p = [], n = Array(4), q = Array(4), u = [new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1), new THREE.Vector3(0,1,0), new THREE.Vector3(0,-1,0)], t = [new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1)], w = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], v = new THREE.Vector4, x = THREE.ShaderLib.depthRGBA, E = THREE.UniformsUtils.clone(x.uniforms), y = THREE.ShaderLib.distanceRGBA, F = THREE.UniformsUtils.clone(y.uniforms), z = 0; 4 !== z; ++z) {
        var A = 0 !== (z & 1)
          , B = 0 !== (z & 2)
          , H = new THREE.ShaderMaterial({
            uniforms: E,
            vertexShader: x.vertexShader,
            fragmentShader: x.fragmentShader,
            morphTargets: A,
            skinning: B
        });
        H._shadowPass = !0;
        n[z] = H;
        A = new THREE.ShaderMaterial({
            uniforms: F,
            vertexShader: y.vertexShader,
            fragmentShader: y.fragmentShader,
            morphTargets: A,
            skinning: B
        });
        A._shadowPass = !0;
        q[z] = A
    }
    var G = this;
    this.enabled = !1;
    this.autoUpdate = !0;
    this.needsUpdate = !1;
    this.type = THREE.PCFShadowMap;
    this.cullFace = THREE.CullFaceFront;
    this.render = function(n, q) {
        var x, y;
        if (!1 !== G.enabled && (!1 !== G.autoUpdate || !1 !== G.needsUpdate)) {
            var E = g.getScissorTest();
            a.getViewport(v);
            f.clearColor(1, 1, 1, 1);
            g.disable(f.BLEND);
            g.enable(f.CULL_FACE);
            f.frontFace(f.CCW);
            f.cullFace(G.cullFace === THREE.CullFaceFront ? f.FRONT : f.BACK);
            g.setDepthTest(!0);
            g.setScissorTest(!1);
            for (var A = b.shadows, z = 0, F = A.length; z < F; z++) {
                var B = A[z]
                  , H = B.shadow
                  , P = H.camera
                  , I = H.mapSize;
                if (B instanceof THREE.PointLight) {
                    x = 6;
                    y = !0;
                    var S = I.x / 4
                      , U = I.y / 2;
                    w[0].set(2 * S, U, S, U);
                    w[1].set(0, U, S, U);
                    w[2].set(3 * S, U, S, U);
                    w[3].set(S, U, S, U);
                    w[4].set(3 * S, 0, S, U);
                    w[5].set(S, 0, S, U)
                } else
                    x = 1,
                    y = !1;
                null === H.map && (S = THREE.LinearFilter,
                G.type === THREE.PCFSoftShadowMap && (S = THREE.NearestFilter),
                H.map = new THREE.WebGLRenderTarget(I.x,I.y,{
                    minFilter: S,
                    magFilter: S,
                    format: THREE.RGBAFormat
                }),
                H.matrix = new THREE.Matrix4,
                B instanceof THREE.SpotLight && (P.aspect = I.x / I.y),
                P.updateProjectionMatrix());
                I = H.map;
                H = H.matrix;
                m.setFromMatrixPosition(B.matrixWorld);
                P.position.copy(m);
                a.setRenderTarget(I);
                a.clear();
                for (I = 0; I < x; I++)
                    for (y ? (l.copy(P.position),
                    l.add(u[I]),
                    P.up.copy(t[I]),
                    P.lookAt(l),
                    S = w[I],
                    a.setViewport(S.x, S.y, S.z, S.w)) : (l.setFromMatrixPosition(B.target.matrixWorld),
                    P.lookAt(l)),
                    P.updateMatrixWorld(),
                    P.matrixWorldInverse.getInverse(P.matrixWorld),
                    H.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                    H.multiply(P.projectionMatrix),
                    H.multiply(P.matrixWorldInverse),
                    k.multiplyMatrices(P.projectionMatrix, P.matrixWorldInverse),
                    h.setFromMatrix(k),
                    p.length = 0,
                    e(n, q, P),
                    S = 0,
                    U = p.length; S < U; S++) {
                        var Z = p[S]
                          , ca = c.update(Z)
                          , da = Z.material;
                        if (da instanceof THREE.MeshFaceMaterial)
                            for (var ea = ca.groups, da = da.materials, ha = 0, ja = ea.length; ha < ja; ha++) {
                                var ga = ea[ha]
                                  , ba = da[ga.materialIndex];
                                !0 === ba.visible && (ba = d(Z, ba, y, m),
                                a.renderBufferDirect(P, null, ca, ba, Z, ga))
                            }
                        else
                            ba = d(Z, da, y, m),
                            a.renderBufferDirect(P, null, ca, ba, Z, null)
                    }
                a.resetGLState()
            }
            a.setViewport(v.x, v.y, v.z, v.w);
            x = a.getClearColor();
            y = a.getClearAlpha();
            a.setClearColor(x, y);
            g.enable(f.BLEND);
            !0 === E && g.setScissorTest(!0);
            G.cullFace === THREE.CullFaceFront && f.cullFace(f.BACK);
            a.resetGLState();
            G.needsUpdate = !1
        }
    }
}
;
THREE.WebGLState = function(a, b, c) {
    var d = this
      , e = new Uint8Array(16)
      , f = new Uint8Array(16)
      , g = new Uint8Array(16)
      , h = {}
      , k = null
      , l = null
      , m = null
      , p = null
      , n = null
      , q = null
      , u = null
      , t = null
      , w = null
      , v = null
      , x = null
      , E = null
      , y = null
      , F = null
      , z = null
      , A = null
      , B = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)
      , H = void 0
      , G = {};
    this.init = function() {
        a.clearColor(0, 0, 0, 1);
        a.clearDepth(1);
        a.clearStencil(0);
        this.enable(a.DEPTH_TEST);
        a.depthFunc(a.LEQUAL);
        a.frontFace(a.CCW);
        a.cullFace(a.BACK);
        this.enable(a.CULL_FACE);
        this.enable(a.BLEND);
        a.blendEquation(a.FUNC_ADD);
        a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA)
    }
    ;
    this.initAttributes = function() {
        for (var a = 0, b = e.length; a < b; a++)
            e[a] = 0
    }
    ;
    this.enableAttribute = function(c) {
        e[c] = 1;
        0 === f[c] && (a.enableVertexAttribArray(c),
        f[c] = 1);
        0 !== g[c] && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c, 0),
        g[c] = 0)
    }
    ;
    this.enableAttributeAndDivisor = function(b, c, d) {
        e[b] = 1;
        0 === f[b] && (a.enableVertexAttribArray(b),
        f[b] = 1);
        g[b] !== c && (d.vertexAttribDivisorANGLE(b, c),
        g[b] = c)
    }
    ;
    this.disableUnusedAttributes = function() {
        for (var b = 0, c = f.length; b < c; b++)
            f[b] !== e[b] && (a.disableVertexAttribArray(b),
            f[b] = 0)
    }
    ;
    this.enable = function(b) {
        !0 !== h[b] && (a.enable(b),
        h[b] = !0)
    }
    ;
    this.disable = function(b) {
        !1 !== h[b] && (a.disable(b),
        h[b] = !1)
    }
    ;
    this.getCompressedTextureFormats = function() {
        if (null === k && (k = [],
        b.get("WEBGL_compressed_texture_pvrtc") || b.get("WEBGL_compressed_texture_s3tc")))
            for (var c = a.getParameter(a.COMPRESSED_TEXTURE_FORMATS), d = 0; d < c.length; d++)
                k.push(c[d]);
        return k
    }
    ;
    this.setBlending = function(b, d, e, f, g, h, k) {
        b !== l && (b === THREE.NoBlending ? this.disable(a.BLEND) : b === THREE.AdditiveBlending ? (this.enable(a.BLEND),
        a.blendEquation(a.FUNC_ADD),
        a.blendFunc(a.SRC_ALPHA, a.ONE)) : b === THREE.SubtractiveBlending ? (this.enable(a.BLEND),
        a.blendEquation(a.FUNC_ADD),
        a.blendFunc(a.ZERO, a.ONE_MINUS_SRC_COLOR)) : b === THREE.MultiplyBlending ? (this.enable(a.BLEND),
        a.blendEquation(a.FUNC_ADD),
        a.blendFunc(a.ZERO, a.SRC_COLOR)) : b === THREE.CustomBlending ? this.enable(a.BLEND) : (this.enable(a.BLEND),
        a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD),
        a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA)),
        l = b);
        if (b === THREE.CustomBlending) {
            g = g || d;
            h = h || e;
            k = k || f;
            if (d !== m || g !== q)
                a.blendEquationSeparate(c(d), c(g)),
                m = d,
                q = g;
            if (e !== p || f !== n || h !== u || k !== t)
                a.blendFuncSeparate(c(e), c(f), c(h), c(k)),
                p = e,
                n = f,
                u = h,
                t = k
        } else
            t = u = q = n = p = m = null
    }
    ;
    this.setDepthFunc = function(b) {
        if (w !== b) {
            if (b)
                switch (b) {
                case THREE.NeverDepth:
                    a.depthFunc(a.NEVER);
                    break;
                case THREE.AlwaysDepth:
                    a.depthFunc(a.ALWAYS);
                    break;
                case THREE.LessDepth:
                    a.depthFunc(a.LESS);
                    break;
                case THREE.LessEqualDepth:
                    a.depthFunc(a.LEQUAL);
                    break;
                case THREE.EqualDepth:
                    a.depthFunc(a.EQUAL);
                    break;
                case THREE.GreaterEqualDepth:
                    a.depthFunc(a.GEQUAL);
                    break;
                case THREE.GreaterDepth:
                    a.depthFunc(a.GREATER);
                    break;
                case THREE.NotEqualDepth:
                    a.depthFunc(a.NOTEQUAL);
                    break;
                default:
                    a.depthFunc(a.LEQUAL)
                }
            else
                a.depthFunc(a.LEQUAL);
            w = b
        }
    }
    ;
    this.setDepthTest = function(b) {
        b ? this.enable(a.DEPTH_TEST) : this.disable(a.DEPTH_TEST)
    }
    ;
    this.setDepthWrite = function(b) {
        v !== b && (a.depthMask(b),
        v = b)
    }
    ;
    this.setColorWrite = function(b) {
        x !== b && (a.colorMask(b, b, b, b),
        x = b)
    }
    ;
    this.setFlipSided = function(b) {
        E !== b && (b ? a.frontFace(a.CW) : a.frontFace(a.CCW),
        E = b)
    }
    ;
    this.setLineWidth = function(b) {
        b !== y && (a.lineWidth(b),
        y = b)
    }
    ;
    this.setPolygonOffset = function(b, c, d) {
        b ? this.enable(a.POLYGON_OFFSET_FILL) : this.disable(a.POLYGON_OFFSET_FILL);
        !b || F === c && z === d || (a.polygonOffset(c, d),
        F = c,
        z = d)
    }
    ;
    this.getScissorTest = function() {
        return A
    }
    ;
    this.setScissorTest = function(b) {
        (A = b) ? this.enable(a.SCISSOR_TEST) : this.disable(a.SCISSOR_TEST)
    }
    ;
    this.activeTexture = function(b) {
        void 0 === b && (b = a.TEXTURE0 + B - 1);
        H !== b && (a.activeTexture(b),
        H = b)
    }
    ;
    this.bindTexture = function(b, c) {
        void 0 === H && d.activeTexture();
        var e = G[H];
        void 0 === e && (e = {
            type: void 0,
            texture: void 0
        },
        G[H] = e);
        if (e.type !== b || e.texture !== c)
            a.bindTexture(b, c),
            e.type = b,
            e.texture = c
    }
    ;
    this.compressedTexImage2D = function() {
        try {
            a.compressedTexImage2D.apply(a, arguments)
        } catch (b) {
            console.error(b)
        }
    }
    ;
    this.texImage2D = function() {
        try {
            a.texImage2D.apply(a, arguments)
        } catch (b) {
            console.error(b)
        }
    }
    ;
    this.reset = function() {
        for (var b = 0; b < f.length; b++)
            1 === f[b] && (a.disableVertexAttribArray(b),
            f[b] = 0);
        h = {};
        E = x = v = l = k = null
    }
}
;
THREE.LensFlarePlugin = function(a, b) {
    var c, d, e, f, g, h, k, l, m, p, n = a.context, q = a.state, u, t, w, v, x, E;
    this.render = function(y, F, z, A) {
        if (0 !== b.length) {
            y = new THREE.Vector3;
            var B = A / z
              , H = .5 * z
              , G = .5 * A
              , D = 16 / A
              , K = new THREE.Vector2(D * B,D)
              , N = new THREE.Vector3(1,1,0)
              , M = new THREE.Vector2(1,1);
            if (void 0 === w) {
                var D = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1])
                  , C = new Uint16Array([0, 1, 2, 0, 2, 3]);
                u = n.createBuffer();
                t = n.createBuffer();
                n.bindBuffer(n.ARRAY_BUFFER, u);
                n.bufferData(n.ARRAY_BUFFER, D, n.STATIC_DRAW);
                n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, t);
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, C, n.STATIC_DRAW);
                x = n.createTexture();
                E = n.createTexture();
                q.bindTexture(n.TEXTURE_2D, x);
                n.texImage2D(n.TEXTURE_2D, 0, n.RGB, 16, 16, 0, n.RGB, n.UNSIGNED_BYTE, null);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST);
                q.bindTexture(n.TEXTURE_2D, E);
                n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, 16, 16, 0, n.RGBA, n.UNSIGNED_BYTE, null);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST);
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST);
                var D = (v = 0 < n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) ? {
                    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif ( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                    fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif ( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if ( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                } : {
                    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif ( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                    fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif ( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if ( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                }
                  , C = n.createProgram()
                  , J = n.createShader(n.FRAGMENT_SHADER)
                  , L = n.createShader(n.VERTEX_SHADER)
                  , Q = "precision " + a.getPrecision() + " float;\n";
                n.shaderSource(J, Q + D.fragmentShader);
                n.shaderSource(L, Q + D.vertexShader);
                n.compileShader(J);
                n.compileShader(L);
                n.attachShader(C, J);
                n.attachShader(C, L);
                n.linkProgram(C);
                w = C;
                m = n.getAttribLocation(w, "position");
                p = n.getAttribLocation(w, "uv");
                c = n.getUniformLocation(w, "renderType");
                d = n.getUniformLocation(w, "map");
                e = n.getUniformLocation(w, "occlusionMap");
                f = n.getUniformLocation(w, "opacity");
                g = n.getUniformLocation(w, "color");
                h = n.getUniformLocation(w, "scale");
                k = n.getUniformLocation(w, "rotation");
                l = n.getUniformLocation(w, "screenPosition")
            }
            n.useProgram(w);
            q.initAttributes();
            q.enableAttribute(m);
            q.enableAttribute(p);
            q.disableUnusedAttributes();
            n.uniform1i(e, 0);
            n.uniform1i(d, 1);
            n.bindBuffer(n.ARRAY_BUFFER, u);
            n.vertexAttribPointer(m, 2, n.FLOAT, !1, 16, 0);
            n.vertexAttribPointer(p, 2, n.FLOAT, !1, 16, 8);
            n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, t);
            q.disable(n.CULL_FACE);
            n.depthMask(!1);
            C = 0;
            for (J = b.length; C < J; C++)
                if (D = 16 / A,
                K.set(D * B, D),
                L = b[C],
                y.set(L.matrixWorld.elements[12], L.matrixWorld.elements[13], L.matrixWorld.elements[14]),
                y.applyMatrix4(F.matrixWorldInverse),
                y.applyProjection(F.projectionMatrix),
                N.copy(y),
                M.x = N.x * H + H,
                M.y = N.y * G + G,
                v || 0 < M.x && M.x < z && 0 < M.y && M.y < A) {
                    q.activeTexture(n.TEXTURE0);
                    q.bindTexture(n.TEXTURE_2D, null);
                    q.activeTexture(n.TEXTURE1);
                    q.bindTexture(n.TEXTURE_2D, x);
                    n.copyTexImage2D(n.TEXTURE_2D, 0, n.RGB, M.x - 8, M.y - 8, 16, 16, 0);
                    n.uniform1i(c, 0);
                    n.uniform2f(h, K.x, K.y);
                    n.uniform3f(l, N.x, N.y, N.z);
                    q.disable(n.BLEND);
                    q.enable(n.DEPTH_TEST);
                    n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0);
                    q.activeTexture(n.TEXTURE0);
                    q.bindTexture(n.TEXTURE_2D, E);
                    n.copyTexImage2D(n.TEXTURE_2D, 0, n.RGBA, M.x - 8, M.y - 8, 16, 16, 0);
                    n.uniform1i(c, 1);
                    q.disable(n.DEPTH_TEST);
                    q.activeTexture(n.TEXTURE1);
                    q.bindTexture(n.TEXTURE_2D, x);
                    n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0);
                    L.positionScreen.copy(N);
                    L.customUpdateCallback ? L.customUpdateCallback(L) : L.updateLensFlares();
                    n.uniform1i(c, 2);
                    q.enable(n.BLEND);
                    for (var Q = 0, T = L.lensFlares.length; Q < T; Q++) {
                        var R = L.lensFlares[Q];
                        .001 < R.opacity && .001 < R.scale && (N.x = R.x,
                        N.y = R.y,
                        N.z = R.z,
                        D = R.size * R.scale / A,
                        K.x = D * B,
                        K.y = D,
                        n.uniform3f(l, N.x, N.y, N.z),
                        n.uniform2f(h, K.x, K.y),
                        n.uniform1f(k, R.rotation),
                        n.uniform1f(f, R.opacity),
                        n.uniform3f(g, R.color.r, R.color.g, R.color.b),
                        q.setBlending(R.blending, R.blendEquation, R.blendSrc, R.blendDst),
                        a.setTexture(R.texture, 1),
                        n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0))
                    }
                }
            q.enable(n.CULL_FACE);
            q.enable(n.DEPTH_TEST);
            n.depthMask(!0);
            a.resetGLState()
        }
    }
}
;
THREE.SpritePlugin = function(a, b) {
    var c, d, e, f, g, h, k, l, m, p, n, q, u, t, w, v, x;
    function E(a, b) {
        return a.z !== b.z ? b.z - a.z : b.id - a.id
    }
    var y = a.context, F = a.state, z, A, B, H, G = new THREE.Vector3, D = new THREE.Quaternion, K = new THREE.Vector3;
    this.render = function(N, M) {
        if (0 !== b.length) {
            if (void 0 === B) {
                var C = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1])
                  , J = new Uint16Array([0, 1, 2, 0, 2, 3]);
                z = y.createBuffer();
                A = y.createBuffer();
                y.bindBuffer(y.ARRAY_BUFFER, z);
                y.bufferData(y.ARRAY_BUFFER, C, y.STATIC_DRAW);
                y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, A);
                y.bufferData(y.ELEMENT_ARRAY_BUFFER, J, y.STATIC_DRAW);
                var C = y.createProgram()
                  , J = y.createShader(y.VERTEX_SHADER)
                  , L = y.createShader(y.FRAGMENT_SHADER);
                y.shaderSource(J, ["precision " + a.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n"));
                y.shaderSource(L, ["precision " + a.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n"));
                y.compileShader(J);
                y.compileShader(L);
                y.attachShader(C, J);
                y.attachShader(C, L);
                y.linkProgram(C);
                B = C;
                v = y.getAttribLocation(B, "position");
                x = y.getAttribLocation(B, "uv");
                c = y.getUniformLocation(B, "uvOffset");
                d = y.getUniformLocation(B, "uvScale");
                e = y.getUniformLocation(B, "rotation");
                f = y.getUniformLocation(B, "scale");
                g = y.getUniformLocation(B, "color");
                h = y.getUniformLocation(B, "map");
                k = y.getUniformLocation(B, "opacity");
                l = y.getUniformLocation(B, "modelViewMatrix");
                m = y.getUniformLocation(B, "projectionMatrix");
                p = y.getUniformLocation(B, "fogType");
                n = y.getUniformLocation(B, "fogDensity");
                q = y.getUniformLocation(B, "fogNear");
                u = y.getUniformLocation(B, "fogFar");
                t = y.getUniformLocation(B, "fogColor");
                w = y.getUniformLocation(B, "alphaTest");
                C = document.createElement("canvas");
                C.width = 8;
                C.height = 8;
                J = C.getContext("2d");
                J.fillStyle = "white";
                J.fillRect(0, 0, 8, 8);
                H = new THREE.Texture(C);
                H.needsUpdate = !0
            }
            y.useProgram(B);
            F.initAttributes();
            F.enableAttribute(v);
            F.enableAttribute(x);
            F.disableUnusedAttributes();
            F.disable(y.CULL_FACE);
            F.enable(y.BLEND);
            y.bindBuffer(y.ARRAY_BUFFER, z);
            y.vertexAttribPointer(v, 2, y.FLOAT, !1, 16, 0);
            y.vertexAttribPointer(x, 2, y.FLOAT, !1, 16, 8);
            y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, A);
            y.uniformMatrix4fv(m, !1, M.projectionMatrix.elements);
            F.activeTexture(y.TEXTURE0);
            y.uniform1i(h, 0);
            J = C = 0;
            (L = N.fog) ? (y.uniform3f(t, L.color.r, L.color.g, L.color.b),
            L instanceof THREE.Fog ? (y.uniform1f(q, L.near),
            y.uniform1f(u, L.far),
            y.uniform1i(p, 1),
            J = C = 1) : L instanceof THREE.FogExp2 && (y.uniform1f(n, L.density),
            y.uniform1i(p, 2),
            J = C = 2)) : (y.uniform1i(p, 0),
            J = C = 0);
            for (var L = 0, Q = b.length; L < Q; L++) {
                var T = b[L];
                T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse, T.matrixWorld);
                T.z = -T.modelViewMatrix.elements[14]
            }
            b.sort(E);
            for (var R = [], L = 0, Q = b.length; L < Q; L++) {
                var T = b[L]
                  , P = T.material;
                y.uniform1f(w, P.alphaTest);
                y.uniformMatrix4fv(l, !1, T.modelViewMatrix.elements);
                T.matrixWorld.decompose(G, D, K);
                R[0] = K.x;
                R[1] = K.y;
                T = 0;
                N.fog && P.fog && (T = J);
                C !== T && (y.uniform1i(p, T),
                C = T);
                null !== P.map ? (y.uniform2f(c, P.map.offset.x, P.map.offset.y),
                y.uniform2f(d, P.map.repeat.x, P.map.repeat.y)) : (y.uniform2f(c, 0, 0),
                y.uniform2f(d, 1, 1));
                y.uniform1f(k, P.opacity);
                y.uniform3f(g, P.color.r, P.color.g, P.color.b);
                y.uniform1f(e, P.rotation);
                y.uniform2fv(f, R);
                F.setBlending(P.blending, P.blendEquation, P.blendSrc, P.blendDst);
                F.setDepthTest(P.depthTest);
                F.setDepthWrite(P.depthWrite);
                P.map && P.map.image && P.map.image.width ? a.setTexture(P.map, 0) : a.setTexture(H, 0);
                y.drawElements(y.TRIANGLES, 6, y.UNSIGNED_SHORT, 0)
            }
            F.enable(y.CULL_FACE);
            a.resetGLState()
        }
    }
}
;
Object.defineProperties(THREE.Box2.prototype, {
    isIntersectionBox: {
        value: function(a) {
            console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        }
    }
});
Object.defineProperties(THREE.Box3.prototype, {
    isIntersectionBox: {
        value: function(a) {
            console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        }
    },
    isIntersectionSphere: {
        value: function(a) {
            console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        }
    }
});
Object.defineProperties(THREE.Matrix3.prototype, {
    multiplyVector3: {
        value: function(a) {
            console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
            return a.applyMatrix3(this)
        }
    },
    multiplyVector3Array: {
        value: function(a) {
            console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
            return this.applyToVector3Array(a)
        }
    }
});
Object.defineProperties(THREE.Matrix4.prototype, {
    extractPosition: {
        value: function(a) {
            console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
            return this.copyPosition(a)
        }
    },
    setRotationFromQuaternion: {
        value: function(a) {
            console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
            return this.makeRotationFromQuaternion(a)
        }
    },
    multiplyVector3: {
        value: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
            return a.applyProjection(this)
        }
    },
    multiplyVector4: {
        value: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        }
    },
    multiplyVector3Array: {
        value: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
            return this.applyToVector3Array(a)
        }
    },
    rotateAxis: {
        value: function(a) {
            console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
            a.transformDirection(this)
        }
    },
    crossVector: {
        value: function(a) {
            console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        }
    },
    translate: {
        value: function(a) {
            console.error("THREE.Matrix4: .translate() has been removed.")
        }
    },
    rotateX: {
        value: function(a) {
            console.error("THREE.Matrix4: .rotateX() has been removed.")
        }
    },
    rotateY: {
        value: function(a) {
            console.error("THREE.Matrix4: .rotateY() has been removed.")
        }
    },
    rotateZ: {
        value: function(a) {
            console.error("THREE.Matrix4: .rotateZ() has been removed.")
        }
    },
    rotateByAxis: {
        value: function(a, b) {
            console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
        }
    }
});
Object.defineProperties(THREE.Plane.prototype, {
    isIntersectionLine: {
        value: function(a) {
            console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");
            return this.intersectsLine(a)
        }
    }
});
Object.defineProperties(THREE.Quaternion.prototype, {
    multiplyVector3: {
        value: function(a) {
            console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
            return a.applyQuaternion(this)
        }
    }
});
Object.defineProperties(THREE.Ray.prototype, {
    isIntersectionBox: {
        value: function(a) {
            console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        }
    },
    isIntersectionPlane: {
        value: function(a) {
            console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");
            return this.intersectsPlane(a)
        }
    },
    isIntersectionSphere: {
        value: function(a) {
            console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        }
    }
});
Object.defineProperties(THREE.Vector3.prototype, {
    setEulerFromRotationMatrix: {
        value: function() {
            console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
        }
    },
    setEulerFromQuaternion: {
        value: function() {
            console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
        }
    },
    getPositionFromMatrix: {
        value: function(a) {
            console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
            return this.setFromMatrixPosition(a)
        }
    },
    getScaleFromMatrix: {
        value: function(a) {
            console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
            return this.setFromMatrixScale(a)
        }
    },
    getColumnFromMatrix: {
        value: function(a, b) {
            console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
            return this.setFromMatrixColumn(a, b)
        }
    }
});
Object.defineProperties(THREE.Object3D.prototype, {
    eulerOrder: {
        get: function() {
            console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
            return this.rotation.order
        },
        set: function(a) {
            console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
            this.rotation.order = a
        }
    },
    getChildByName: {
        value: function(a) {
            console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
            return this.getObjectByName(a)
        }
    },
    renderDepth: {
        set: function(a) {
            console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
        }
    },
    translate: {
        value: function(a, b) {
            console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
            return this.translateOnAxis(b, a)
        }
    },
    useQuaternion: {
        get: function() {
            console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
        },
        set: function(a) {
            console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
        }
    }
});
Object.defineProperties(THREE, {
    PointCloud: {
        value: function(a, b) {
            console.warn("THREE.PointCloud has been renamed to THREE.Points.");
            return new THREE.Points(a,b)
        }
    },
    ParticleSystem: {
        value: function(a, b) {
            console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");
            return new THREE.Points(a,b)
        }
    }
});
Object.defineProperties(THREE.Light.prototype, {
    onlyShadow: {
        set: function(a) {
            console.warn("THREE.Light: .onlyShadow has been removed.")
        }
    },
    shadowCameraFov: {
        set: function(a) {
            this.shadow.camera.fov = a
        }
    },
    shadowCameraLeft: {
        set: function(a) {
            this.shadow.camera.left = a
        }
    },
    shadowCameraRight: {
        set: function(a) {
            this.shadow.camera.right = a
        }
    },
    shadowCameraTop: {
        set: function(a) {
            this.shadow.camera.top = a
        }
    },
    shadowCameraBottom: {
        set: function(a) {
            this.shadow.camera.bottom = a
        }
    },
    shadowCameraNear: {
        set: function(a) {
            this.shadow.camera.near = a
        }
    },
    shadowCameraFar: {
        set: function(a) {
            this.shadow.camera.far = a
        }
    },
    shadowCameraVisible: {
        set: function(a) {
            console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
        }
    },
    shadowBias: {
        set: function(a) {
            this.shadow.bias = a
        }
    },
    shadowDarkness: {
        set: function(a) {
            this.shadow.darkness = a
        }
    },
    shadowMapWidth: {
        set: function(a) {
            this.shadow.mapSize.width = a
        }
    },
    shadowMapHeight: {
        set: function(a) {
            this.shadow.mapSize.height = a
        }
    }
});
Object.defineProperties(THREE.BufferAttribute.prototype, {
    length: {
        get: function() {
            console.warn("THREE.BufferAttribute: .length has been deprecated. Please use .count.");
            return this.array.length
        }
    }
});
Object.defineProperties(THREE.Material.prototype, {
    wrapAround: {
        get: function() {
            console.warn("THREE." + this.type + ": .wrapAround has been removed.")
        },
        set: function(a) {
            console.warn("THREE." + this.type + ": .wrapAround has been removed.")
        }
    },
    wrapRGB: {
        get: function() {
            console.warn("THREE." + this.type + ": .wrapRGB has been removed.");
            return new THREE.Color
        }
    }
});
Object.defineProperties(THREE, {
    PointCloudMaterial: {
        value: function(a) {
            console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");
            return new THREE.PointsMaterial(a)
        }
    },
    ParticleBasicMaterial: {
        value: function(a) {
            console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");
            return new THREE.PointsMaterial(a)
        }
    },
    ParticleSystemMaterial: {
        value: function(a) {
            console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");
            return new THREE.PointsMaterial(a)
        }
    }
});
Object.defineProperties(THREE.MeshPhongMaterial.prototype, {
    metal: {
        get: function() {
            console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");
            return !1
        },
        set: function(a) {
            console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
        }
    }
});
Object.defineProperties(THREE.ShaderMaterial.prototype, {
    derivatives: {
        get: function() {
            console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
            return this.extensions.derivatives
        },
        set: function(a) {
            console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
            this.extensions.derivatives = a
        }
    }
});
Object.defineProperties(THREE.WebGLRenderer.prototype, {
    supportsFloatTextures: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");
            return this.extensions.get("OES_texture_float")
        }
    },
    supportsHalfFloatTextures: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");
            return this.extensions.get("OES_texture_half_float")
        }
    },
    supportsStandardDerivatives: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");
            return this.extensions.get("OES_standard_derivatives")
        }
    },
    supportsCompressedTextureS3TC: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");
            return this.extensions.get("WEBGL_compressed_texture_s3tc")
        }
    },
    supportsCompressedTexturePVRTC: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");
            return this.extensions.get("WEBGL_compressed_texture_pvrtc")
        }
    },
    supportsBlendMinMax: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");
            return this.extensions.get("EXT_blend_minmax")
        }
    },
    supportsVertexTextures: {
        value: function() {
            return this.capabilities.vertexTextures
        }
    },
    supportsInstancedArrays: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");
            return this.extensions.get("ANGLE_instanced_arrays")
        }
    },
    initMaterial: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
        }
    },
    addPrePlugin: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
        }
    },
    addPostPlugin: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
        }
    },
    updateShadowMap: {
        value: function() {
            console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
        }
    },
    shadowMapEnabled: {
        get: function() {
            return this.shadowMap.enabled
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");
            this.shadowMap.enabled = a
        }
    },
    shadowMapType: {
        get: function() {
            return this.shadowMap.type
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");
            this.shadowMap.type = a
        }
    },
    shadowMapCullFace: {
        get: function() {
            return this.shadowMap.cullFace
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace.");
            this.shadowMap.cullFace = a
        }
    },
    shadowMapDebug: {
        get: function() {
            return this.shadowMap.debug
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderer: .shadowMapDebug is now .shadowMap.debug.");
            this.shadowMap.debug = a
        }
    }
});
Object.defineProperties(THREE.WebGLRenderTarget.prototype, {
    wrapS: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
            return this.texture.wrapS
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
            this.texture.wrapS = a
        }
    },
    wrapT: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
            return this.texture.wrapT
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
            this.texture.wrapT = a
        }
    },
    magFilter: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
            return this.texture.magFilter
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
            this.texture.magFilter = a
        }
    },
    minFilter: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
            return this.texture.minFilter
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
            this.texture.minFilter = a
        }
    },
    anisotropy: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
            return this.texture.anisotropy
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
            this.texture.anisotropy = a
        }
    },
    offset: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
            return this.texture.offset
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
            this.texture.offset = a
        }
    },
    repeat: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
            return this.texture.repeat
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
            this.texture.repeat = a
        }
    },
    format: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
            return this.texture.format
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
            this.texture.format = a
        }
    },
    type: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
            return this.texture.type
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
            this.texture.type = a
        }
    },
    generateMipmaps: {
        get: function() {
            console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
            return this.texture.generateMipmaps
        },
        set: function(a) {
            console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
            this.texture.generateMipmaps = a
        }
    }
});
THREE.GeometryUtils = {
    merge: function(a, b, c) {
        console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
        var d;
        b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(),
        d = b.matrix,
        b = b.geometry);
        a.merge(b, d, c)
    },
    center: function(a) {
        console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
        return a.center()
    }
};
THREE.ImageUtils = {
    crossOrigin: void 0,
    loadTexture: function(a, b, c, d) {
        console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
        var e = new THREE.TextureLoader;
        e.setCrossOrigin(this.crossOrigin);
        a = e.load(a, c, void 0, d);
        b && (a.mapping = b);
        return a
    },
    loadTextureCube: function(a, b, c, d) {
        console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
        var e = new THREE.CubeTextureLoader;
        e.setCrossOrigin(this.crossOrigin);
        a = e.load(a, c, void 0, d);
        b && (a.mapping = b);
        return a
    },
    loadCompressedTexture: function() {
        console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
    },
    loadCompressedTextureCube: function() {
        console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
    }
};
THREE.Projector = function() {
    console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
    this.projectVector = function(a, b) {
        console.warn("THREE.Projector: .projectVector() is now vector.project().");
        a.project(b)
    }
    ;
    this.unprojectVector = function(a, b) {
        console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
        a.unproject(b)
    }
    ;
    this.pickingRay = function(a, b) {
        console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
    }
}
;
THREE.CanvasRenderer = function() {
    console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
    this.domElement = document.createElement("canvas");
    this.clear = function() {}
    ;
    this.render = function() {}
    ;
    this.setClearColor = function() {}
    ;
    this.setSize = function() {}
}
;
THREE.TextGeometry = function() {
    console.error("THREE.TextGeometry has been moved to /examples/js/geometries/TextGeometry.js");
    console.error("THREE.FontUtils has been moved to /examples/js/utils/FontUtils.js")
}
;
THREE.CurveUtils = {
    tangentQuadraticBezier: function(a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
    },
    tangentCubicBezier: function(a, b, c, d, e) {
        return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
    },
    tangentSpline: function(a, b, c, d, e) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function(a, b, c, d, e) {
        a = .5 * (c - a);
        d = .5 * (d - b);
        var f = e * e;
        return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
    }
};
THREE.SceneUtils = {
    createMultiMaterialObject: function(a, b) {
        for (var c = new THREE.Group, d = 0, e = b.length; d < e; d++)
            c.add(new THREE.Mesh(a,b[d]));
        return c
    },
    detach: function(a, b, c) {
        a.applyMatrix(b.matrixWorld);
        b.remove(a);
        c.add(a)
    },
    attach: function(a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld);
        a.applyMatrix(d);
        b.remove(a);
        c.add(a)
    }
};
THREE.ShapeUtils = {
    area: function(a) {
        for (var b = a.length, c = 0, d = b - 1, e = 0; e < b; d = e++)
            c += a[d].x * a[e].y - a[e].x * a[d].y;
        return .5 * c
    },
    triangulate: function() {
        return function(a, b) {
            var c = a.length;
            if (3 > c)
                return null;
            var d = [], e = [], f = [], g, h, k;
            if (0 < THREE.ShapeUtils.area(a))
                for (h = 0; h < c; h++)
                    e[h] = h;
            else
                for (h = 0; h < c; h++)
                    e[h] = c - 1 - h;
            var l = 2 * c;
            for (h = c - 1; 2 < c; ) {
                if (0 >= l--) {
                    console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()");
                    break
                }
                g = h;
                c <= g && (g = 0);
                h = g + 1;
                c <= h && (h = 0);
                k = h + 1;
                c <= k && (k = 0);
                var m;
                a: {
                    var p = m = void 0
                      , n = void 0
                      , q = void 0
                      , u = void 0
                      , t = void 0
                      , w = void 0
                      , v = void 0
                      , x = void 0
                      , p = a[e[g]].x
                      , n = a[e[g]].y
                      , q = a[e[h]].x
                      , u = a[e[h]].y
                      , t = a[e[k]].x
                      , w = a[e[k]].y;
                    if (Number.EPSILON > (q - p) * (w - n) - (u - n) * (t - p))
                        m = !1;
                    else {
                        var E = void 0
                          , y = void 0
                          , F = void 0
                          , z = void 0
                          , A = void 0
                          , B = void 0
                          , H = void 0
                          , G = void 0
                          , D = void 0
                          , K = void 0
                          , D = G = H = x = v = void 0
                          , E = t - q
                          , y = w - u
                          , F = p - t
                          , z = n - w
                          , A = q - p
                          , B = u - n;
                        for (m = 0; m < c; m++)
                            if (v = a[e[m]].x,
                            x = a[e[m]].y,
                            !(v === p && x === n || v === q && x === u || v === t && x === w) && (H = v - p,
                            G = x - n,
                            D = v - q,
                            K = x - u,
                            v -= t,
                            x -= w,
                            D = E * K - y * D,
                            H = A * G - B * H,
                            G = F * x - z * v,
                            D >= -Number.EPSILON && G >= -Number.EPSILON && H >= -Number.EPSILON)) {
                                m = !1;
                                break a
                            }
                        m = !0
                    }
                }
                if (m) {
                    d.push([a[e[g]], a[e[h]], a[e[k]]]);
                    f.push([e[g], e[h], e[k]]);
                    g = h;
                    for (k = h + 1; k < c; g++,
                    k++)
                        e[g] = e[k];
                    c--;
                    l = 2 * c
                }
            }
            return b ? f : d
        }
    }(),
    triangulateShape: function(a, b) {
        function c(a, b, c) {
            return a.x !== b.x ? a.x < b.x ? a.x <= c.x && c.x <= b.x : b.x <= c.x && c.x <= a.x : a.y < b.y ? a.y <= c.y && c.y <= b.y : b.y <= c.y && c.y <= a.y
        }
        function d(a, b, d, e, f) {
            var g = b.x - a.x
              , h = b.y - a.y
              , k = e.x - d.x
              , l = e.y - d.y
              , m = a.x - d.x
              , p = a.y - d.y
              , A = h * k - g * l
              , B = h * m - g * p;
            if (Math.abs(A) > Number.EPSILON) {
                if (0 < A) {
                    if (0 > B || B > A)
                        return [];
                    k = l * m - k * p;
                    if (0 > k || k > A)
                        return []
                } else {
                    if (0 < B || B < A)
                        return [];
                    k = l * m - k * p;
                    if (0 < k || k < A)
                        return []
                }
                if (0 === k)
                    return !f || 0 !== B && B !== A ? [a] : [];
                if (k === A)
                    return !f || 0 !== B && B !== A ? [b] : [];
                if (0 === B)
                    return [d];
                if (B === A)
                    return [e];
                f = k / A;
                return [{
                    x: a.x + f * g,
                    y: a.y + f * h
                }]
            }
            if (0 !== B || l * m !== k * p)
                return [];
            h = 0 === g && 0 === h;
            k = 0 === k && 0 === l;
            if (h && k)
                return a.x !== d.x || a.y !== d.y ? [] : [a];
            if (h)
                return c(d, e, a) ? [a] : [];
            if (k)
                return c(a, b, d) ? [d] : [];
            0 !== g ? (a.x < b.x ? (g = a,
            k = a.x,
            h = b,
            a = b.x) : (g = b,
            k = b.x,
            h = a,
            a = a.x),
            d.x < e.x ? (b = d,
            A = d.x,
            l = e,
            d = e.x) : (b = e,
            A = e.x,
            l = d,
            d = d.x)) : (a.y < b.y ? (g = a,
            k = a.y,
            h = b,
            a = b.y) : (g = b,
            k = b.y,
            h = a,
            a = a.y),
            d.y < e.y ? (b = d,
            A = d.y,
            l = e,
            d = e.y) : (b = e,
            A = e.y,
            l = d,
            d = d.y));
            return k <= A ? a < A ? [] : a === A ? f ? [] : [b] : a <= d ? [b, h] : [b, l] : k > d ? [] : k === d ? f ? [] : [g] : a <= d ? [g, h] : [g, l]
        }
        function e(a, b, c, d) {
            var e = b.x - a.x
              , f = b.y - a.y;
            b = c.x - a.x;
            c = c.y - a.y;
            var g = d.x - a.x;
            d = d.y - a.y;
            a = e * c - f * b;
            e = e * d - f * g;
            return Math.abs(a) > Number.EPSILON ? (b = g * c - d * b,
            0 < a ? 0 <= e && 0 <= b : 0 <= e || 0 <= b) : 0 < e
        }
        var f, g, h, k, l, m = {};
        h = a.concat();
        f = 0;
        for (g = b.length; f < g; f++)
            Array.prototype.push.apply(h, b[f]);
        f = 0;
        for (g = h.length; f < g; f++)
            l = h[f].x + ":" + h[f].y,
            void 0 !== m[l] && console.warn("THREE.Shape: Duplicate point", l),
            m[l] = f;
        f = function(a, b) {
            function c(a, b) {
                var d = h.length - 1
                  , f = a - 1;
                0 > f && (f = d);
                var g = a + 1;
                g > d && (g = 0);
                d = e(h[a], h[f], h[g], k[b]);
                if (!d)
                    return !1;
                d = k.length - 1;
                f = b - 1;
                0 > f && (f = d);
                g = b + 1;
                g > d && (g = 0);
                return (d = e(k[b], k[f], k[g], h[a])) ? !0 : !1
            }
            function f(a, b) {
                var c, e;
                for (c = 0; c < h.length; c++)
                    if (e = c + 1,
                    e %= h.length,
                    e = d(a, b, h[c], h[e], !0),
                    0 < e.length)
                        return !0;
                return !1
            }
            function g(a, c) {
                var e, f, h, k;
                for (e = 0; e < l.length; e++)
                    for (f = b[l[e]],
                    h = 0; h < f.length; h++)
                        if (k = h + 1,
                        k %= f.length,
                        k = d(a, c, f[h], f[k], !0),
                        0 < k.length)
                            return !0;
                return !1
            }
            var h = a.concat(), k, l = [], m, p, z, A, B, H = [], G, D, K, N = 0;
            for (m = b.length; N < m; N++)
                l.push(N);
            G = 0;
            for (var M = 2 * l.length; 0 < l.length; ) {
                M--;
                if (0 > M) {
                    console.log("Infinite Loop! Holes left:" + l.length + ", Probably Hole outside Shape!");
                    break
                }
                for (p = G; p < h.length; p++) {
                    z = h[p];
                    m = -1;
                    for (N = 0; N < l.length; N++)
                        if (A = l[N],
                        B = z.x + ":" + z.y + ":" + A,
                        void 0 === H[B]) {
                            k = b[A];
                            for (D = 0; D < k.length; D++)
                                if (A = k[D],
                                c(p, D) && !f(z, A) && !g(z, A)) {
                                    m = D;
                                    l.splice(N, 1);
                                    G = h.slice(0, p + 1);
                                    A = h.slice(p);
                                    D = k.slice(m);
                                    K = k.slice(0, m + 1);
                                    h = G.concat(D).concat(K).concat(A);
                                    G = p;
                                    break
                                }
                            if (0 <= m)
                                break;
                            H[B] = !0
                        }
                    if (0 <= m)
                        break
                }
            }
            return h
        }(a, b);
        var p = THREE.ShapeUtils.triangulate(f, !1);
        f = 0;
        for (g = p.length; f < g; f++)
            for (k = p[f],
            h = 0; 3 > h; h++)
                l = k[h].x + ":" + k[h].y,
                l = m[l],
                void 0 !== l && (k[h] = l);
        return p.concat()
    },
    isClockWise: function(a) {
        return 0 > THREE.ShapeUtils.area(a)
    },
    b2: function() {
        return function(a, b, c, d) {
            var e = 1 - a;
            return e * e * b + 2 * (1 - a) * a * c + a * a * d
        }
    }(),
    b3: function() {
        return function(a, b, c, d, e) {
            var f = 1 - a
              , g = 1 - a;
            return f * f * f * b + 3 * g * g * a * c + 3 * (1 - a) * a * a * d + a * a * a * e
        }
    }()
};
THREE.Curve = function() {}
;
THREE.Curve.prototype = {
    constructor: THREE.Curve,
    getPoint: function(a) {
        console.warn("THREE.Curve: Warning, getPoint() not implemented!");
        return null
    },
    getPointAt: function(a) {
        a = this.getUtoTmapping(a);
        return this.getPoint(a)
    },
    getPoints: function(a) {
        a || (a = 5);
        var b, c = [];
        for (b = 0; b <= a; b++)
            c.push(this.getPoint(b / a));
        return c
    },
    getSpacedPoints: function(a) {
        a || (a = 5);
        var b, c = [];
        for (b = 0; b <= a; b++)
            c.push(this.getPointAt(b / a));
        return c
    },
    getLength: function() {
        var a = this.getLengths();
        return a[a.length - 1]
    },
    getLengths: function(a) {
        a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
        if (this.cacheArcLengths && this.cacheArcLengths.length === a + 1 && !this.needsUpdate)
            return this.cacheArcLengths;
        this.needsUpdate = !1;
        var b = [], c, d = this.getPoint(0), e, f = 0;
        b.push(0);
        for (e = 1; e <= a; e++)
            c = this.getPoint(e / a),
            f += c.distanceTo(d),
            b.push(f),
            d = c;
        return this.cacheArcLengths = b
    },
    updateArcLengths: function() {
        this.needsUpdate = !0;
        this.getLengths()
    },
    getUtoTmapping: function(a, b) {
        var c = this.getLengths(), d = 0, e = c.length, f;
        f = b ? b : a * c[e - 1];
        for (var g = 0, h = e - 1, k; g <= h; )
            if (d = Math.floor(g + (h - g) / 2),
            k = c[d] - f,
            0 > k)
                g = d + 1;
            else if (0 < k)
                h = d - 1;
            else {
                h = d;
                break
            }
        d = h;
        if (c[d] === f)
            return d / (e - 1);
        g = c[d];
        return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
    },
    getTangent: function(a) {
        var b = a - 1E-4;
        a += 1E-4;
        0 > b && (b = 0);
        1 < a && (a = 1);
        b = this.getPoint(b);
        return this.getPoint(a).clone().sub(b).normalize()
    },
    getTangentAt: function(a) {
        a = this.getUtoTmapping(a);
        return this.getTangent(a)
    }
};
THREE.Curve.Utils = THREE.CurveUtils;
THREE.Curve.create = function(a, b) {
    a.prototype = Object.create(THREE.Curve.prototype);
    a.prototype.constructor = a;
    a.prototype.getPoint = b;
    return a
}
;
THREE.CurvePath = function() {
    this.curves = [];
    this.autoClose = !1
}
;
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function(a) {
    this.curves.push(a)
}
;
THREE.CurvePath.prototype.closePath = function() {
    var a = this.curves[0].getPoint(0)
      , b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b,a))
}
;
THREE.CurvePath.prototype.getPoint = function(a) {
    for (var b = a * this.getLength(), c = this.getCurveLengths(), d = 0; d < c.length; ) {
        if (c[d] >= b)
            return a = this.curves[d],
            b = 1 - (c[d] - b) / a.getLength(),
            a.getPointAt(b);
        d++
    }
    return null
}
;
THREE.CurvePath.prototype.getLength = function() {
    var a = this.getCurveLengths();
    return a[a.length - 1]
}
;
THREE.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths;
    for (var a = [], b = 0, c = 0, d = this.curves.length; c < d; c++)
        b += this.curves[c].getLength(),
        a.push(b);
    return this.cacheLengths = a
}
;
THREE.CurvePath.prototype.createPointsGeometry = function(a) {
    a = this.getPoints(a, !0);
    return this.createGeometry(a)
}
;
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
    a = this.getSpacedPoints(a, !0);
    return this.createGeometry(a)
}
;
THREE.CurvePath.prototype.createGeometry = function(a) {
    for (var b = new THREE.Geometry, c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        b.vertices.push(new THREE.Vector3(e.x,e.y,e.z || 0))
    }
    return b
}
;
THREE.Path = function(a) {
    THREE.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a)
}
;
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.Path.prototype.constructor = THREE.Path;
THREE.Path.prototype.fromPoints = function(a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1, c = a.length; b < c; b++)
        this.lineTo(a[b].x, a[b].y)
}
;
THREE.Path.prototype.moveTo = function(a, b) {
    this.actions.push({
        action: "moveTo",
        args: [a, b]
    })
}
;
THREE.Path.prototype.lineTo = function(a, b) {
    var c = this.actions[this.actions.length - 1].args
      , c = new THREE.LineCurve(new THREE.Vector2(c[c.length - 2],c[c.length - 1]),new THREE.Vector2(a,b));
    this.curves.push(c);
    this.actions.push({
        action: "lineTo",
        args: [a, b]
    })
}
;
THREE.Path.prototype.quadraticCurveTo = function(a, b, c, d) {
    var e = this.actions[this.actions.length - 1].args
      , e = new THREE.QuadraticBezierCurve(new THREE.Vector2(e[e.length - 2],e[e.length - 1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d));
    this.curves.push(e);
    this.actions.push({
        action: "quadraticCurveTo",
        args: [a, b, c, d]
    })
}
;
THREE.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
    var g = this.actions[this.actions.length - 1].args
      , g = new THREE.CubicBezierCurve(new THREE.Vector2(g[g.length - 2],g[g.length - 1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d),new THREE.Vector2(e,f));
    this.curves.push(g);
    this.actions.push({
        action: "bezierCurveTo",
        args: [a, b, c, d, e, f]
    })
}
;
THREE.Path.prototype.splineThru = function(a) {
    var b = Array.prototype.slice.call(arguments)
      , c = this.actions[this.actions.length - 1].args
      , c = [new THREE.Vector2(c[c.length - 2],c[c.length - 1])];
    Array.prototype.push.apply(c, a);
    c = new THREE.SplineCurve(c);
    this.curves.push(c);
    this.actions.push({
        action: "splineThru",
        args: b
    })
}
;
THREE.Path.prototype.arc = function(a, b, c, d, e, f) {
    var g = this.actions[this.actions.length - 1].args;
    this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f)
}
;
THREE.Path.prototype.absarc = function(a, b, c, d, e, f) {
    this.absellipse(a, b, c, c, d, e, f)
}
;
THREE.Path.prototype.ellipse = function(a, b, c, d, e, f, g, h) {
    var k = this.actions[this.actions.length - 1].args;
    this.absellipse(a + k[k.length - 2], b + k[k.length - 1], c, d, e, f, g, h)
}
;
THREE.Path.prototype.absellipse = function(a, b, c, d, e, f, g, h) {
    var k = [a, b, c, d, e, f, g, h || 0];
    a = new THREE.EllipseCurve(a,b,c,d,e,f,g,h);
    this.curves.push(a);
    a = a.getPoint(1);
    k.push(a.x);
    k.push(a.y);
    this.actions.push({
        action: "ellipse",
        args: k
    })
}
;
THREE.Path.prototype.getSpacedPoints = function(a, b) {
    a || (a = 40);
    for (var c = [], d = 0; d < a; d++)
        c.push(this.getPoint(d / a));
    return c
}
;
THREE.Path.prototype.getPoints = function(a, b) {
    a = a || 12;
    for (var c = THREE.ShapeUtils.b2, d = THREE.ShapeUtils.b3, e = [], f, g, h, k, l, m, p, n, q, u, t = 0, w = this.actions.length; t < w; t++) {
        q = this.actions[t];
        var v = q.args;
        switch (q.action) {
        case "moveTo":
            e.push(new THREE.Vector2(v[0],v[1]));
            break;
        case "lineTo":
            e.push(new THREE.Vector2(v[0],v[1]));
            break;
        case "quadraticCurveTo":
            f = v[2];
            g = v[3];
            l = v[0];
            m = v[1];
            0 < e.length ? (q = e[e.length - 1],
            p = q.x,
            n = q.y) : (q = this.actions[t - 1].args,
            p = q[q.length - 2],
            n = q[q.length - 1]);
            for (v = 1; v <= a; v++)
                u = v / a,
                q = c(u, p, l, f),
                u = c(u, n, m, g),
                e.push(new THREE.Vector2(q,u));
            break;
        case "bezierCurveTo":
            f = v[4];
            g = v[5];
            l = v[0];
            m = v[1];
            h = v[2];
            k = v[3];
            0 < e.length ? (q = e[e.length - 1],
            p = q.x,
            n = q.y) : (q = this.actions[t - 1].args,
            p = q[q.length - 2],
            n = q[q.length - 1]);
            for (v = 1; v <= a; v++)
                u = v / a,
                q = d(u, p, l, h, f),
                u = d(u, n, m, k, g),
                e.push(new THREE.Vector2(q,u));
            break;
        case "splineThru":
            q = this.actions[t - 1].args;
            u = [new THREE.Vector2(q[q.length - 2],q[q.length - 1])];
            q = a * v[0].length;
            u = u.concat(v[0]);
            u = new THREE.SplineCurve(u);
            for (v = 1; v <= q; v++)
                e.push(u.getPointAt(v / q));
            break;
        case "arc":
            f = v[0];
            g = v[1];
            m = v[2];
            h = v[3];
            q = v[4];
            l = !!v[5];
            p = q - h;
            n = 2 * a;
            for (v = 1; v <= n; v++)
                u = v / n,
                l || (u = 1 - u),
                u = h + u * p,
                q = f + m * Math.cos(u),
                u = g + m * Math.sin(u),
                e.push(new THREE.Vector2(q,u));
            break;
        case "ellipse":
            f = v[0];
            g = v[1];
            m = v[2];
            k = v[3];
            h = v[4];
            q = v[5];
            l = !!v[6];
            var x = v[7];
            p = q - h;
            n = 2 * a;
            var E, y;
            0 !== x && (E = Math.cos(x),
            y = Math.sin(x));
            for (v = 1; v <= n; v++) {
                u = v / n;
                l || (u = 1 - u);
                u = h + u * p;
                q = f + m * Math.cos(u);
                u = g + k * Math.sin(u);
                if (0 !== x) {
                    var F = q;
                    q = (F - f) * E - (u - g) * y + f;
                    u = (F - f) * y + (u - g) * E + g
                }
                e.push(new THREE.Vector2(q,u))
            }
        }
    }
    c = e[e.length - 1];
    Math.abs(c.x - e[0].x) < Number.EPSILON && Math.abs(c.y - e[0].y) < Number.EPSILON && e.splice(e.length - 1, 1);
    b && e.push(e[0]);
    return e
}
;
THREE.Path.prototype.toShapes = function(a, b) {
    function c(a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) {
            var e = a[c]
              , f = new THREE.Shape;
            f.actions = e.actions;
            f.curves = e.curves;
            b.push(f)
        }
        return b
    }
    function d(a, b) {
        for (var c = b.length, d = !1, e = c - 1, f = 0; f < c; e = f++) {
            var g = b[e]
              , h = b[f]
              , k = h.x - g.x
              , l = h.y - g.y;
            if (Math.abs(l) > Number.EPSILON) {
                if (0 > l && (g = b[f],
                k = -k,
                h = b[e],
                l = -l),
                !(a.y < g.y || a.y > h.y))
                    if (a.y === g.y) {
                        if (a.x === g.x)
                            return !0
                    } else {
                        e = l * (a.x - g.x) - k * (a.y - g.y);
                        if (0 === e)
                            return !0;
                        0 > e || (d = !d)
                    }
            } else if (a.y === g.y && (h.x <= a.x && a.x <= g.x || g.x <= a.x && a.x <= h.x))
                return !0
        }
        return d
    }
    var e = THREE.ShapeUtils.isClockWise
      , f = function(a) {
        for (var b = [], c = new THREE.Path, d = 0, e = a.length; d < e; d++) {
            var f = a[d]
              , g = f.args
              , f = f.action;
            "moveTo" === f && 0 !== c.actions.length && (b.push(c),
            c = new THREE.Path);
            c[f].apply(c, g)
        }
        0 !== c.actions.length && b.push(c);
        return b
    }(this.actions);
    if (0 === f.length)
        return [];
    if (!0 === b)
        return c(f);
    var g, h, k, l = [];
    if (1 === f.length)
        return h = f[0],
        k = new THREE.Shape,
        k.actions = h.actions,
        k.curves = h.curves,
        l.push(k),
        l;
    var m = !e(f[0].getPoints())
      , m = a ? !m : m;
    k = [];
    var p = [], n = [], q = 0, u;
    p[q] = void 0;
    n[q] = [];
    for (var t = 0, w = f.length; t < w; t++)
        h = f[t],
        u = h.getPoints(),
        g = e(u),
        (g = a ? !g : g) ? (!m && p[q] && q++,
        p[q] = {
            s: new THREE.Shape,
            p: u
        },
        p[q].s.actions = h.actions,
        p[q].s.curves = h.curves,
        m && q++,
        n[q] = []) : n[q].push({
            h: h,
            p: u[0]
        });
    if (!p[0])
        return c(f);
    if (1 < p.length) {
        t = !1;
        h = [];
        e = 0;
        for (f = p.length; e < f; e++)
            k[e] = [];
        e = 0;
        for (f = p.length; e < f; e++)
            for (g = n[e],
            m = 0; m < g.length; m++) {
                q = g[m];
                u = !0;
                for (w = 0; w < p.length; w++)
                    d(q.p, p[w].p) && (e !== w && h.push({
                        froms: e,
                        tos: w,
                        hole: m
                    }),
                    u ? (u = !1,
                    k[w].push(q)) : t = !0);
                u && k[e].push(q)
            }
        0 < h.length && (t || (n = k))
    }
    t = 0;
    for (e = p.length; t < e; t++)
        for (k = p[t].s,
        l.push(k),
        h = n[t],
        f = 0,
        g = h.length; f < g; f++)
            k.holes.push(h[f].h);
    return l
}
;
THREE.Shape = function() {
    THREE.Path.apply(this, arguments);
    this.holes = []
}
;
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.constructor = THREE.Shape;
THREE.Shape.prototype.extrude = function(a) {
    return new THREE.ExtrudeGeometry(this,a)
}
;
THREE.Shape.prototype.makeGeometry = function(a) {
    return new THREE.ShapeGeometry(this,a)
}
;
THREE.Shape.prototype.getPointsHoles = function(a) {
    for (var b = [], c = 0, d = this.holes.length; c < d; c++)
        b[c] = this.holes[c].getPoints(a);
    return b
}
;
THREE.Shape.prototype.extractAllPoints = function(a) {
    return {
        shape: this.getPoints(a),
        holes: this.getPointsHoles(a)
    }
}
;
THREE.Shape.prototype.extractPoints = function(a) {
    return this.extractAllPoints(a)
}
;
THREE.Shape.Utils = THREE.ShapeUtils;
THREE.LineCurve = function(a, b) {
    this.v1 = a;
    this.v2 = b
}
;
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function(a) {
    var b = this.v2.clone().sub(this.v1);
    b.multiplyScalar(a).add(this.v1);
    return b
}
;
THREE.LineCurve.prototype.getPointAt = function(a) {
    return this.getPoint(a)
}
;
THREE.LineCurve.prototype.getTangent = function(a) {
    return this.v2.clone().sub(this.v1).normalize()
}
;
THREE.QuadraticBezierCurve = function(a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
}
;
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function(a) {
    var b = THREE.ShapeUtils.b2;
    return new THREE.Vector2(b(a, this.v0.x, this.v1.x, this.v2.x),b(a, this.v0.y, this.v1.y, this.v2.y))
}
;
THREE.QuadraticBezierCurve.prototype.getTangent = function(a) {
    var b = THREE.CurveUtils.tangentQuadraticBezier;
    return (new THREE.Vector2(b(a, this.v0.x, this.v1.x, this.v2.x),b(a, this.v0.y, this.v1.y, this.v2.y))).normalize()
}
;
THREE.CubicBezierCurve = function(a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
}
;
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function(a) {
    var b = THREE.ShapeUtils.b3;
    return new THREE.Vector2(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x),b(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y))
}
;
THREE.CubicBezierCurve.prototype.getTangent = function(a) {
    var b = THREE.CurveUtils.tangentCubicBezier;
    return (new THREE.Vector2(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x),b(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y))).normalize()
}
;
THREE.SplineCurve = function(a) {
    this.points = void 0 == a ? [] : a
}
;
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function(a) {
    var b = this.points;
    a *= b.length - 1;
    var c = Math.floor(a);
    a -= c;
    var d = b[0 === c ? c : c - 1]
      , e = b[c]
      , f = b[c > b.length - 2 ? b.length - 1 : c + 1]
      , b = b[c > b.length - 3 ? b.length - 1 : c + 2]
      , c = THREE.CurveUtils.interpolate;
    return new THREE.Vector2(c(d.x, e.x, f.x, b.x, a),c(d.y, e.y, f.y, b.y, a))
}
;
THREE.EllipseCurve = function(a, b, c, d, e, f, g, h) {
    this.aX = a;
    this.aY = b;
    this.xRadius = c;
    this.yRadius = d;
    this.aStartAngle = e;
    this.aEndAngle = f;
    this.aClockwise = g;
    this.aRotation = h || 0
}
;
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve;
THREE.EllipseCurve.prototype.getPoint = function(a) {
    var b = this.aEndAngle - this.aStartAngle;
    0 > b && (b += 2 * Math.PI);
    b > 2 * Math.PI && (b -= 2 * Math.PI);
    b = !0 === this.aClockwise ? this.aEndAngle + (1 - a) * (2 * Math.PI - b) : this.aStartAngle + a * b;
    a = this.aX + this.xRadius * Math.cos(b);
    var c = this.aY + this.yRadius * Math.sin(b);
    if (0 !== this.aRotation) {
        var b = Math.cos(this.aRotation)
          , d = Math.sin(this.aRotation)
          , e = a;
        a = (e - this.aX) * b - (c - this.aY) * d + this.aX;
        c = (e - this.aX) * d + (c - this.aY) * b + this.aY
    }
    return new THREE.Vector2(a,c)
}
;
THREE.ArcCurve = function(a, b, c, d, e, f) {
    THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
}
;
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.LineCurve3 = THREE.Curve.create(function(a, b) {
    this.v1 = a;
    this.v2 = b
}, function(a) {
    var b = new THREE.Vector3;
    b.subVectors(this.v2, this.v1);
    b.multiplyScalar(a);
    b.add(this.v1);
    return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
}, function(a) {
    var b = THREE.ShapeUtils.b2;
    return new THREE.Vector3(b(a, this.v0.x, this.v1.x, this.v2.x),b(a, this.v0.y, this.v1.y, this.v2.y),b(a, this.v0.z, this.v1.z, this.v2.z))
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d
}, function(a) {
    var b = THREE.ShapeUtils.b3;
    return new THREE.Vector3(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x),b(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y),b(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z))
});
THREE.SplineCurve3 = THREE.Curve.create(function(a) {
    console.warn("THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3");
    this.points = void 0 == a ? [] : a
}, function(a) {
    var b = this.points;
    a *= b.length - 1;
    var c = Math.floor(a);
    a -= c;
    var d = b[0 == c ? c : c - 1]
      , e = b[c]
      , f = b[c > b.length - 2 ? b.length - 1 : c + 1]
      , b = b[c > b.length - 3 ? b.length - 1 : c + 2]
      , c = THREE.CurveUtils.interpolate;
    return new THREE.Vector3(c(d.x, e.x, f.x, b.x, a),c(d.y, e.y, f.y, b.y, a),c(d.z, e.z, f.z, b.z, a))
});
THREE.CatmullRomCurve3 = function() {
    function a() {}
    var b = new THREE.Vector3
      , c = new a
      , d = new a
      , e = new a;
    a.prototype.init = function(a, b, c, d) {
        this.c0 = a;
        this.c1 = c;
        this.c2 = -3 * a + 3 * b - 2 * c - d;
        this.c3 = 2 * a - 2 * b + c + d
    }
    ;
    a.prototype.initNonuniformCatmullRom = function(a, b, c, d, e, m, p) {
        a = ((b - a) / e - (c - a) / (e + m) + (c - b) / m) * m;
        d = ((c - b) / m - (d - b) / (m + p) + (d - c) / p) * m;
        this.init(b, c, a, d)
    }
    ;
    a.prototype.initCatmullRom = function(a, b, c, d, e) {
        this.init(b, c, e * (c - a), e * (d - b))
    }
    ;
    a.prototype.calc = function(a) {
        var b = a * a;
        return this.c0 + this.c1 * a + this.c2 * b + this.c3 * b * a
    }
    ;
    return THREE.Curve.create(function(a) {
        this.points = a || []
    }, function(a) {
        var g = this.points, h, k;
        k = g.length;
        2 > k && console.log("duh, you need at least 2 points");
        a *= k - 1;
        h = Math.floor(a);
        a -= h;
        0 === a && h === k - 1 && (h = k - 2,
        a = 1);
        var l, m, p;
        0 === h ? (b.subVectors(g[0], g[1]).add(g[0]),
        l = b) : l = g[h - 1];
        m = g[h];
        p = g[h + 1];
        h + 2 < k ? g = g[h + 2] : (b.subVectors(g[k - 1], g[k - 2]).add(g[k - 2]),
        g = b);
        if (void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
            var n = "chordal" === this.type ? .5 : .25;
            k = Math.pow(l.distanceToSquared(m), n);
            h = Math.pow(m.distanceToSquared(p), n);
            n = Math.pow(p.distanceToSquared(g), n);
            1E-4 > h && (h = 1);
            1E-4 > k && (k = h);
            1E-4 > n && (n = h);
            c.initNonuniformCatmullRom(l.x, m.x, p.x, g.x, k, h, n);
            d.initNonuniformCatmullRom(l.y, m.y, p.y, g.y, k, h, n);
            e.initNonuniformCatmullRom(l.z, m.z, p.z, g.z, k, h, n)
        } else
            "catmullrom" === this.type && (k = void 0 !== this.tension ? this.tension : .5,
            c.initCatmullRom(l.x, m.x, p.x, g.x, k),
            d.initCatmullRom(l.y, m.y, p.y, g.y, k),
            e.initCatmullRom(l.z, m.z, p.z, g.z, k));
        return new THREE.Vector3(c.calc(a),d.calc(a),e.calc(a))
    })
}();
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a) {
    this.points = void 0 == a ? [] : a
}, function(a) {
    var b = this.points;
    a *= b.length - 0;
    var c = Math.floor(a);
    a -= c;
    var c = c + (0 < c ? 0 : (Math.floor(Math.abs(c) / b.length) + 1) * b.length)
      , d = b[(c - 1) % b.length]
      , e = b[c % b.length]
      , f = b[(c + 1) % b.length]
      , b = b[(c + 2) % b.length]
      , c = THREE.CurveUtils.interpolate;
    return new THREE.Vector3(c(d.x, e.x, f.x, b.x, a),c(d.y, e.y, f.y, b.y, a),c(d.z, e.z, f.z, b.z, a))
});
THREE.BoxGeometry = function(a, b, c, d, e, f) {
    function g(a, b, c, d, e, f, g, t) {
        var w, v = h.widthSegments, x = h.heightSegments, E = e / 2, y = f / 2, F = h.vertices.length;
        if ("x" === a && "y" === b || "y" === a && "x" === b)
            w = "z";
        else if ("x" === a && "z" === b || "z" === a && "x" === b)
            w = "y",
            x = h.depthSegments;
        else if ("z" === a && "y" === b || "y" === a && "z" === b)
            w = "x",
            v = h.depthSegments;
        var z = v + 1
          , A = x + 1
          , B = e / v
          , H = f / x
          , G = new THREE.Vector3;
        G[w] = 0 < g ? 1 : -1;
        for (e = 0; e < A; e++)
            for (f = 0; f < z; f++) {
                var D = new THREE.Vector3;
                D[a] = (f * B - E) * c;
                D[b] = (e * H - y) * d;
                D[w] = g;
                h.vertices.push(D)
            }
        for (e = 0; e < x; e++)
            for (f = 0; f < v; f++)
                y = f + z * e,
                a = f + z * (e + 1),
                b = f + 1 + z * (e + 1),
                c = f + 1 + z * e,
                d = new THREE.Vector2(f / v,1 - e / x),
                g = new THREE.Vector2(f / v,1 - (e + 1) / x),
                w = new THREE.Vector2((f + 1) / v,1 - (e + 1) / x),
                E = new THREE.Vector2((f + 1) / v,1 - e / x),
                y = new THREE.Face3(y + F,a + F,c + F),
                y.normal.copy(G),
                y.vertexNormals.push(G.clone(), G.clone(), G.clone()),
                y.materialIndex = t,
                h.faces.push(y),
                h.faceVertexUvs[0].push([d, g, E]),
                y = new THREE.Face3(a + F,b + F,c + F),
                y.normal.copy(G),
                y.vertexNormals.push(G.clone(), G.clone(), G.clone()),
                y.materialIndex = t,
                h.faces.push(y),
                h.faceVertexUvs[0].push([g.clone(), w, E.clone()])
    }
    THREE.Geometry.call(this);
    this.type = "BoxGeometry";
    this.parameters = {
        width: a,
        height: b,
        depth: c,
        widthSegments: d,
        heightSegments: e,
        depthSegments: f
    };
    this.widthSegments = d || 1;
    this.heightSegments = e || 1;
    this.depthSegments = f || 1;
    var h = this;
    d = a / 2;
    e = b / 2;
    f = c / 2;
    g("z", "y", -1, -1, c, b, d, 0);
    g("z", "y", 1, -1, c, b, -d, 1);
    g("x", "z", 1, 1, a, c, e, 2);
    g("x", "z", 1, -1, a, c, -e, 3);
    g("x", "y", 1, -1, a, b, f, 4);
    g("x", "y", -1, -1, a, b, -f, 5);
    this.mergeVertices()
}
;
THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry;
THREE.CubeGeometry = THREE.BoxGeometry;
THREE.CircleGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    this.type = "CircleGeometry";
    this.parameters = {
        radius: a,
        segments: b,
        thetaStart: c,
        thetaLength: d
    };
    this.fromBufferGeometry(new THREE.CircleBufferGeometry(a,b,c,d))
}
;
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry;
THREE.CircleBufferGeometry = function(a, b, c, d) {
    THREE.BufferGeometry.call(this);
    this.type = "CircleBufferGeometry";
    this.parameters = {
        radius: a,
        segments: b,
        thetaStart: c,
        thetaLength: d
    };
    a = a || 50;
    b = void 0 !== b ? Math.max(3, b) : 8;
    c = void 0 !== c ? c : 0;
    d = void 0 !== d ? d : 2 * Math.PI;
    var e = b + 2
      , f = new Float32Array(3 * e)
      , g = new Float32Array(3 * e)
      , e = new Float32Array(2 * e);
    g[2] = 1;
    e[0] = .5;
    e[1] = .5;
    for (var h = 0, k = 3, l = 2; h <= b; h++,
    k += 3,
    l += 2) {
        var m = c + h / b * d;
        f[k] = a * Math.cos(m);
        f[k + 1] = a * Math.sin(m);
        g[k + 2] = 1;
        e[l] = (f[k] / a + 1) / 2;
        e[l + 1] = (f[k + 1] / a + 1) / 2
    }
    c = [];
    for (k = 1; k <= b; k++)
        c.push(k, k + 1, 0);
    this.setIndex(new THREE.BufferAttribute(new Uint16Array(c),1));
    this.addAttribute("position", new THREE.BufferAttribute(f,3));
    this.addAttribute("normal", new THREE.BufferAttribute(g,3));
    this.addAttribute("uv", new THREE.BufferAttribute(e,2));
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,a)
}
;
THREE.CircleBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.CircleBufferGeometry.prototype.constructor = THREE.CircleBufferGeometry;
THREE.CylinderGeometry = function(a, b, c, d, e, f, g, h) {
    THREE.Geometry.call(this);
    this.type = "CylinderGeometry";
    this.parameters = {
        radiusTop: a,
        radiusBottom: b,
        height: c,
        radialSegments: d,
        heightSegments: e,
        openEnded: f,
        thetaStart: g,
        thetaLength: h
    };
    a = void 0 !== a ? a : 20;
    b = void 0 !== b ? b : 20;
    c = void 0 !== c ? c : 100;
    d = d || 8;
    e = e || 1;
    f = void 0 !== f ? f : !1;
    g = void 0 !== g ? g : 0;
    h = void 0 !== h ? h : 2 * Math.PI;
    var k = c / 2, l, m, p = [], n = [];
    for (m = 0; m <= e; m++) {
        var q = []
          , u = []
          , t = m / e
          , w = t * (b - a) + a;
        for (l = 0; l <= d; l++) {
            var v = l / d
              , x = new THREE.Vector3;
            x.x = w * Math.sin(v * h + g);
            x.y = -t * c + k;
            x.z = w * Math.cos(v * h + g);
            this.vertices.push(x);
            q.push(this.vertices.length - 1);
            u.push(new THREE.Vector2(v,1 - t))
        }
        p.push(q);
        n.push(u)
    }
    c = (b - a) / c;
    for (l = 0; l < d; l++)
        for (0 !== a ? (g = this.vertices[p[0][l]].clone(),
        h = this.vertices[p[0][l + 1]].clone()) : (g = this.vertices[p[1][l]].clone(),
        h = this.vertices[p[1][l + 1]].clone()),
        g.setY(Math.sqrt(g.x * g.x + g.z * g.z) * c).normalize(),
        h.setY(Math.sqrt(h.x * h.x + h.z * h.z) * c).normalize(),
        m = 0; m < e; m++) {
            var q = p[m][l]
              , u = p[m + 1][l]
              , t = p[m + 1][l + 1]
              , w = p[m][l + 1]
              , v = g.clone()
              , x = g.clone()
              , E = h.clone()
              , y = h.clone()
              , F = n[m][l].clone()
              , z = n[m + 1][l].clone()
              , A = n[m + 1][l + 1].clone()
              , B = n[m][l + 1].clone();
            this.faces.push(new THREE.Face3(q,u,w,[v, x, y]));
            this.faceVertexUvs[0].push([F, z, B]);
            this.faces.push(new THREE.Face3(u,t,w,[x.clone(), E, y.clone()]));
            this.faceVertexUvs[0].push([z.clone(), A, B.clone()])
        }
    if (!1 === f && 0 < a)
        for (this.vertices.push(new THREE.Vector3(0,k,0)),
        l = 0; l < d; l++)
            q = p[0][l],
            u = p[0][l + 1],
            t = this.vertices.length - 1,
            v = new THREE.Vector3(0,1,0),
            x = new THREE.Vector3(0,1,0),
            E = new THREE.Vector3(0,1,0),
            F = n[0][l].clone(),
            z = n[0][l + 1].clone(),
            A = new THREE.Vector2(z.x,0),
            this.faces.push(new THREE.Face3(q,u,t,[v, x, E],void 0,1)),
            this.faceVertexUvs[0].push([F, z, A]);
    if (!1 === f && 0 < b)
        for (this.vertices.push(new THREE.Vector3(0,-k,0)),
        l = 0; l < d; l++)
            q = p[e][l + 1],
            u = p[e][l],
            t = this.vertices.length - 1,
            v = new THREE.Vector3(0,-1,0),
            x = new THREE.Vector3(0,-1,0),
            E = new THREE.Vector3(0,-1,0),
            F = n[e][l + 1].clone(),
            z = n[e][l].clone(),
            A = new THREE.Vector2(z.x,1),
            this.faces.push(new THREE.Face3(q,u,t,[v, x, E],void 0,2)),
            this.faceVertexUvs[0].push([F, z, A]);
    this.computeFaceNormals()
}
;
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.EdgesGeometry = function(a, b) {
    function c(a, b) {
        return a - b
    }
    THREE.BufferGeometry.call(this);
    var d = Math.cos(THREE.Math.degToRad(void 0 !== b ? b : 1)), e = [0, 0], f = {}, g = ["a", "b", "c"], h;
    a instanceof THREE.BufferGeometry ? (h = new THREE.Geometry,
    h.fromBufferGeometry(a)) : h = a.clone();
    h.mergeVertices();
    h.computeFaceNormals();
    var k = h.vertices;
    h = h.faces;
    for (var l = 0, m = h.length; l < m; l++)
        for (var p = h[l], n = 0; 3 > n; n++) {
            e[0] = p[g[n]];
            e[1] = p[g[(n + 1) % 3]];
            e.sort(c);
            var q = e.toString();
            void 0 === f[q] ? f[q] = {
                vert1: e[0],
                vert2: e[1],
                face1: l,
                face2: void 0
            } : f[q].face2 = l
        }
    e = [];
    for (q in f)
        if (g = f[q],
        void 0 === g.face2 || h[g.face1].normal.dot(h[g.face2].normal) <= d)
            l = k[g.vert1],
            e.push(l.x),
            e.push(l.y),
            e.push(l.z),
            l = k[g.vert2],
            e.push(l.x),
            e.push(l.y),
            e.push(l.z);
    this.addAttribute("position", new THREE.BufferAttribute(new Float32Array(e),3))
}
;
THREE.EdgesGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.EdgesGeometry.prototype.constructor = THREE.EdgesGeometry;
THREE.ExtrudeGeometry = function(a, b) {
    "undefined" !== typeof a && (THREE.Geometry.call(this),
    this.type = "ExtrudeGeometry",
    a = Array.isArray(a) ? a : [a],
    this.addShapeList(a, b),
    this.computeFaceNormals())
}
;
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShapeList = function(a, b) {
    for (var c = a.length, d = 0; d < c; d++)
        this.addShape(a[d], b)
}
;
THREE.ExtrudeGeometry.prototype.addShape = function(a, b) {
    function c(a, b, c) {
        b || console.error("THREE.ExtrudeGeometry: vec does not exist");
        return b.clone().multiplyScalar(c).add(a)
    }
    function d(a, b, c) {
        var d = 1
          , d = a.x - b.x
          , e = a.y - b.y
          , f = c.x - a.x
          , g = c.y - a.y
          , h = d * d + e * e;
        if (Math.abs(d * g - e * f) > Number.EPSILON) {
            var k = Math.sqrt(h)
              , l = Math.sqrt(f * f + g * g)
              , h = b.x - e / k;
            b = b.y + d / k;
            f = ((c.x - g / l - h) * g - (c.y + f / l - b) * f) / (d * g - e * f);
            c = h + d * f - a.x;
            a = b + e * f - a.y;
            d = c * c + a * a;
            if (2 >= d)
                return new THREE.Vector2(c,a);
            d = Math.sqrt(d / 2)
        } else
            a = !1,
            d > Number.EPSILON ? f > Number.EPSILON && (a = !0) : d < -Number.EPSILON ? f < -Number.EPSILON && (a = !0) : Math.sign(e) === Math.sign(g) && (a = !0),
            a ? (c = -e,
            a = d,
            d = Math.sqrt(h)) : (c = d,
            a = e,
            d = Math.sqrt(h / 2));
        return new THREE.Vector2(c / d,a / d)
    }
    function e(a, b) {
        var c, d;
        for (I = a.length; 0 <= --I; ) {
            c = I;
            d = I - 1;
            0 > d && (d = a.length - 1);
            for (var e = 0, f = q + 2 * m, e = 0; e < f; e++) {
                var g = T * e
                  , h = T * (e + 1)
                  , k = b + c + g
                  , g = b + d + g
                  , l = b + d + h
                  , h = b + c + h
                  , k = k + G
                  , g = g + G
                  , l = l + G
                  , h = h + G;
                H.faces.push(new THREE.Face3(k,g,h,null,null,1));
                H.faces.push(new THREE.Face3(g,l,h,null,null,1));
                k = v.generateSideWallUV(H, k, g, l, h);
                H.faceVertexUvs[0].push([k[0], k[1], k[3]]);
                H.faceVertexUvs[0].push([k[1], k[2], k[3]])
            }
        }
    }
    function f(a, b, c) {
        H.vertices.push(new THREE.Vector3(a,b,c))
    }
    function g(a, b, c) {
        a += G;
        b += G;
        c += G;
        H.faces.push(new THREE.Face3(a,b,c,null,null,0));
        a = v.generateTopUV(H, a, b, c);
        H.faceVertexUvs[0].push(a)
    }
    var h = void 0 !== b.amount ? b.amount : 100, k = void 0 !== b.bevelThickness ? b.bevelThickness : 6, l = void 0 !== b.bevelSize ? b.bevelSize : k - 2, m = void 0 !== b.bevelSegments ? b.bevelSegments : 3, p = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0, n = void 0 !== b.curveSegments ? b.curveSegments : 12, q = void 0 !== b.steps ? b.steps : 1, u = b.extrudePath, t, w = !1, v = void 0 !== b.UVGenerator ? b.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator, x, E, y, F;
    u && (t = u.getSpacedPoints(q),
    w = !0,
    p = !1,
    x = void 0 !== b.frames ? b.frames : new THREE.TubeGeometry.FrenetFrames(u,q,!1),
    E = new THREE.Vector3,
    y = new THREE.Vector3,
    F = new THREE.Vector3);
    p || (l = k = m = 0);
    var z, A, B, H = this, G = this.vertices.length, u = a.extractPoints(n), n = u.shape, D = u.holes;
    if (u = !THREE.ShapeUtils.isClockWise(n)) {
        n = n.reverse();
        A = 0;
        for (B = D.length; A < B; A++)
            z = D[A],
            THREE.ShapeUtils.isClockWise(z) && (D[A] = z.reverse());
        u = !1
    }
    var K = THREE.ShapeUtils.triangulateShape(n, D)
      , N = n;
    A = 0;
    for (B = D.length; A < B; A++)
        z = D[A],
        n = n.concat(z);
    var M, C, J, L, Q, T = n.length, R, P = K.length, u = [], I = 0;
    J = N.length;
    M = J - 1;
    for (C = I + 1; I < J; I++,
    M++,
    C++)
        M === J && (M = 0),
        C === J && (C = 0),
        u[I] = d(N[I], N[M], N[C]);
    var S = [], U, Z = u.concat();
    A = 0;
    for (B = D.length; A < B; A++) {
        z = D[A];
        U = [];
        I = 0;
        J = z.length;
        M = J - 1;
        for (C = I + 1; I < J; I++,
        M++,
        C++)
            M === J && (M = 0),
            C === J && (C = 0),
            U[I] = d(z[I], z[M], z[C]);
        S.push(U);
        Z = Z.concat(U)
    }
    for (M = 0; M < m; M++) {
        J = M / m;
        L = k * (1 - J);
        C = l * Math.sin(J * Math.PI / 2);
        I = 0;
        for (J = N.length; I < J; I++)
            Q = c(N[I], u[I], C),
            f(Q.x, Q.y, -L);
        A = 0;
        for (B = D.length; A < B; A++)
            for (z = D[A],
            U = S[A],
            I = 0,
            J = z.length; I < J; I++)
                Q = c(z[I], U[I], C),
                f(Q.x, Q.y, -L)
    }
    C = l;
    for (I = 0; I < T; I++)
        Q = p ? c(n[I], Z[I], C) : n[I],
        w ? (y.copy(x.normals[0]).multiplyScalar(Q.x),
        E.copy(x.binormals[0]).multiplyScalar(Q.y),
        F.copy(t[0]).add(y).add(E),
        f(F.x, F.y, F.z)) : f(Q.x, Q.y, 0);
    for (J = 1; J <= q; J++)
        for (I = 0; I < T; I++)
            Q = p ? c(n[I], Z[I], C) : n[I],
            w ? (y.copy(x.normals[J]).multiplyScalar(Q.x),
            E.copy(x.binormals[J]).multiplyScalar(Q.y),
            F.copy(t[J]).add(y).add(E),
            f(F.x, F.y, F.z)) : f(Q.x, Q.y, h / q * J);
    for (M = m - 1; 0 <= M; M--) {
        J = M / m;
        L = k * (1 - J);
        C = l * Math.sin(J * Math.PI / 2);
        I = 0;
        for (J = N.length; I < J; I++)
            Q = c(N[I], u[I], C),
            f(Q.x, Q.y, h + L);
        A = 0;
        for (B = D.length; A < B; A++)
            for (z = D[A],
            U = S[A],
            I = 0,
            J = z.length; I < J; I++)
                Q = c(z[I], U[I], C),
                w ? f(Q.x, Q.y + t[q - 1].y, t[q - 1].x + L) : f(Q.x, Q.y, h + L)
    }
    (function() {
        if (p) {
            var a;
            a = 0 * T;
            for (I = 0; I < P; I++)
                R = K[I],
                g(R[2] + a, R[1] + a, R[0] + a);
            a = q + 2 * m;
            a *= T;
            for (I = 0; I < P; I++)
                R = K[I],
                g(R[0] + a, R[1] + a, R[2] + a)
        } else {
            for (I = 0; I < P; I++)
                R = K[I],
                g(R[2], R[1], R[0]);
            for (I = 0; I < P; I++)
                R = K[I],
                g(R[0] + T * q, R[1] + T * q, R[2] + T * q)
        }
    }
    )();
    (function() {
        var a = 0;
        e(N, a);
        a += N.length;
        A = 0;
        for (B = D.length; A < B; A++)
            z = D[A],
            e(z, a),
            a += z.length
    }
    )()
}
;
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function(a, b, c, d) {
        a = a.vertices;
        b = a[b];
        c = a[c];
        d = a[d];
        return [new THREE.Vector2(b.x,b.y), new THREE.Vector2(c.x,c.y), new THREE.Vector2(d.x,d.y)]
    },
    generateSideWallUV: function(a, b, c, d, e) {
        a = a.vertices;
        b = a[b];
        c = a[c];
        d = a[d];
        e = a[e];
        return .01 > Math.abs(b.y - c.y) ? [new THREE.Vector2(b.x,1 - b.z), new THREE.Vector2(c.x,1 - c.z), new THREE.Vector2(d.x,1 - d.z), new THREE.Vector2(e.x,1 - e.z)] : [new THREE.Vector2(b.y,1 - b.z), new THREE.Vector2(c.y,1 - c.z), new THREE.Vector2(d.y,1 - d.z), new THREE.Vector2(e.y,1 - e.z)]
    }
};
THREE.ShapeGeometry = function(a, b) {
    THREE.Geometry.call(this);
    this.type = "ShapeGeometry";
    !1 === Array.isArray(a) && (a = [a]);
    this.addShapeList(a, b);
    this.computeFaceNormals()
}
;
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry;
THREE.ShapeGeometry.prototype.addShapeList = function(a, b) {
    for (var c = 0, d = a.length; c < d; c++)
        this.addShape(a[c], b);
    return this
}
;
THREE.ShapeGeometry.prototype.addShape = function(a, b) {
    void 0 === b && (b = {});
    var c = b.material, d = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : b.UVGenerator, e, f, g, h = this.vertices.length;
    e = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
    var k = e.shape
      , l = e.holes;
    if (!THREE.ShapeUtils.isClockWise(k))
        for (k = k.reverse(),
        e = 0,
        f = l.length; e < f; e++)
            g = l[e],
            THREE.ShapeUtils.isClockWise(g) && (l[e] = g.reverse());
    var m = THREE.ShapeUtils.triangulateShape(k, l);
    e = 0;
    for (f = l.length; e < f; e++)
        g = l[e],
        k = k.concat(g);
    l = k.length;
    f = m.length;
    for (e = 0; e < l; e++)
        g = k[e],
        this.vertices.push(new THREE.Vector3(g.x,g.y,0));
    for (e = 0; e < f; e++)
        l = m[e],
        k = l[0] + h,
        g = l[1] + h,
        l = l[2] + h,
        this.faces.push(new THREE.Face3(k,g,l,null,null,c)),
        this.faceVertexUvs[0].push(d.generateTopUV(this, k, g, l))
}
;
THREE.LatheGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    this.type = "LatheGeometry";
    this.parameters = {
        points: a,
        segments: b,
        phiStart: c,
        phiLength: d
    };
    b = b || 12;
    c = c || 0;
    d = d || 2 * Math.PI;
    for (var e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; g <= h; g++)
        for (var k = c + g * f * d, l = Math.cos(k), m = Math.sin(k), k = 0, p = a.length; k < p; k++) {
            var n = a[k]
              , q = new THREE.Vector3;
            q.x = l * n.x - m * n.y;
            q.y = m * n.x + l * n.y;
            q.z = n.z;
            this.vertices.push(q)
        }
    c = a.length;
    g = 0;
    for (h = b; g < h; g++)
        for (k = 0,
        p = a.length - 1; k < p; k++) {
            b = m = k + c * g;
            d = m + c;
            var l = m + 1 + c
              , m = m + 1
              , n = g * f
              , q = k * e
              , u = n + f
              , t = q + e;
            this.faces.push(new THREE.Face3(b,d,m));
            this.faceVertexUvs[0].push([new THREE.Vector2(n,q), new THREE.Vector2(u,q), new THREE.Vector2(n,t)]);
            this.faces.push(new THREE.Face3(d,l,m));
            this.faceVertexUvs[0].push([new THREE.Vector2(u,q), new THREE.Vector2(u,t), new THREE.Vector2(n,t)])
        }
    this.mergeVertices();
    this.computeFaceNormals();
    this.computeVertexNormals()
}
;
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.PlaneGeometry = function(a, b, c, d) {
    THREE.Geometry.call(this);
    this.type = "PlaneGeometry";
    this.parameters = {
        width: a,
        height: b,
        widthSegments: c,
        heightSegments: d
    };
    this.fromBufferGeometry(new THREE.PlaneBufferGeometry(a,b,c,d))
}
;
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.PlaneBufferGeometry = function(a, b, c, d) {
    THREE.BufferGeometry.call(this);
    this.type = "PlaneBufferGeometry";
    this.parameters = {
        width: a,
        height: b,
        widthSegments: c,
        heightSegments: d
    };
    var e = a / 2
      , f = b / 2;
    c = Math.floor(c) || 1;
    d = Math.floor(d) || 1;
    var g = c + 1
      , h = d + 1
      , k = a / c
      , l = b / d;
    b = new Float32Array(g * h * 3);
    a = new Float32Array(g * h * 3);
    for (var m = new Float32Array(g * h * 2), p = 0, n = 0, q = 0; q < h; q++)
        for (var u = q * l - f, t = 0; t < g; t++)
            b[p] = t * k - e,
            b[p + 1] = -u,
            a[p + 2] = 1,
            m[n] = t / c,
            m[n + 1] = 1 - q / d,
            p += 3,
            n += 2;
    p = 0;
    e = new (65535 < b.length / 3 ? Uint32Array : Uint16Array)(c * d * 6);
    for (q = 0; q < d; q++)
        for (t = 0; t < c; t++)
            f = t + g * (q + 1),
            h = t + 1 + g * (q + 1),
            k = t + 1 + g * q,
            e[p] = t + g * q,
            e[p + 1] = f,
            e[p + 2] = k,
            e[p + 3] = f,
            e[p + 4] = h,
            e[p + 5] = k,
            p += 6;
    this.setIndex(new THREE.BufferAttribute(e,1));
    this.addAttribute("position", new THREE.BufferAttribute(b,3));
    this.addAttribute("normal", new THREE.BufferAttribute(a,3));
    this.addAttribute("uv", new THREE.BufferAttribute(m,2))
}
;
THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry;
THREE.RingGeometry = function(a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    this.type = "RingGeometry";
    this.parameters = {
        innerRadius: a,
        outerRadius: b,
        thetaSegments: c,
        phiSegments: d,
        thetaStart: e,
        thetaLength: f
    };
    a = a || 0;
    b = b || 50;
    e = void 0 !== e ? e : 0;
    f = void 0 !== f ? f : 2 * Math.PI;
    c = void 0 !== c ? Math.max(3, c) : 8;
    d = void 0 !== d ? Math.max(1, d) : 8;
    var g, h = [], k = a, l = (b - a) / d;
    for (a = 0; a < d + 1; a++) {
        for (g = 0; g < c + 1; g++) {
            var m = new THREE.Vector3
              , p = e + g / c * f;
            m.x = k * Math.cos(p);
            m.y = k * Math.sin(p);
            this.vertices.push(m);
            h.push(new THREE.Vector2((m.x / b + 1) / 2,(m.y / b + 1) / 2))
        }
        k += l
    }
    b = new THREE.Vector3(0,0,1);
    for (a = 0; a < d; a++)
        for (e = a * (c + 1),
        g = 0; g < c; g++)
            f = p = g + e,
            l = p + c + 1,
            m = p + c + 2,
            this.faces.push(new THREE.Face3(f,l,m,[b.clone(), b.clone(), b.clone()])),
            this.faceVertexUvs[0].push([h[f].clone(), h[l].clone(), h[m].clone()]),
            f = p,
            l = p + c + 2,
            m = p + 1,
            this.faces.push(new THREE.Face3(f,l,m,[b.clone(), b.clone(), b.clone()])),
            this.faceVertexUvs[0].push([h[f].clone(), h[l].clone(), h[m].clone()]);
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,k)
}
;
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry;
THREE.SphereGeometry = function(a, b, c, d, e, f, g) {
    THREE.Geometry.call(this);
    this.type = "SphereGeometry";
    this.parameters = {
        radius: a,
        widthSegments: b,
        heightSegments: c,
        phiStart: d,
        phiLength: e,
        thetaStart: f,
        thetaLength: g
    };
    this.fromBufferGeometry(new THREE.SphereBufferGeometry(a,b,c,d,e,f,g))
}
;
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.SphereBufferGeometry = function(a, b, c, d, e, f, g) {
    THREE.BufferGeometry.call(this);
    this.type = "SphereBufferGeometry";
    this.parameters = {
        radius: a,
        widthSegments: b,
        heightSegments: c,
        phiStart: d,
        phiLength: e,
        thetaStart: f,
        thetaLength: g
    };
    a = a || 50;
    b = Math.max(3, Math.floor(b) || 8);
    c = Math.max(2, Math.floor(c) || 6);
    d = void 0 !== d ? d : 0;
    e = void 0 !== e ? e : 2 * Math.PI;
    f = void 0 !== f ? f : 0;
    g = void 0 !== g ? g : Math.PI;
    for (var h = f + g, k = (b + 1) * (c + 1), l = new THREE.BufferAttribute(new Float32Array(3 * k),3), m = new THREE.BufferAttribute(new Float32Array(3 * k),3), k = new THREE.BufferAttribute(new Float32Array(2 * k),2), p = 0, n = [], q = new THREE.Vector3, u = 0; u <= c; u++) {
        for (var t = [], w = u / c, v = 0; v <= b; v++) {
            var x = v / b
              , E = -a * Math.cos(d + x * e) * Math.sin(f + w * g)
              , y = a * Math.cos(f + w * g)
              , F = a * Math.sin(d + x * e) * Math.sin(f + w * g);
            q.set(E, y, F).normalize();
            l.setXYZ(p, E, y, F);
            m.setXYZ(p, q.x, q.y, q.z);
            k.setXY(p, x, 1 - w);
            t.push(p);
            p++
        }
        n.push(t)
    }
    d = [];
    for (u = 0; u < c; u++)
        for (v = 0; v < b; v++)
            e = n[u][v + 1],
            g = n[u][v],
            p = n[u + 1][v],
            q = n[u + 1][v + 1],
            (0 !== u || 0 < f) && d.push(e, g, q),
            (u !== c - 1 || h < Math.PI) && d.push(g, p, q);
    this.setIndex(new (65535 < l.count ? THREE.Uint32Attribute : THREE.Uint16Attribute)(d,1));
    this.addAttribute("position", l);
    this.addAttribute("normal", m);
    this.addAttribute("uv", k);
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,a)
}
;
THREE.SphereBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.SphereBufferGeometry.prototype.constructor = THREE.SphereBufferGeometry;
THREE.TorusGeometry = function(a, b, c, d, e) {
    THREE.Geometry.call(this);
    this.type = "TorusGeometry";
    this.parameters = {
        radius: a,
        tube: b,
        radialSegments: c,
        tubularSegments: d,
        arc: e
    };
    a = a || 100;
    b = b || 40;
    c = c || 8;
    d = d || 6;
    e = e || 2 * Math.PI;
    for (var f = new THREE.Vector3, g = [], h = [], k = 0; k <= c; k++)
        for (var l = 0; l <= d; l++) {
            var m = l / d * e
              , p = k / c * Math.PI * 2;
            f.x = a * Math.cos(m);
            f.y = a * Math.sin(m);
            var n = new THREE.Vector3;
            n.x = (a + b * Math.cos(p)) * Math.cos(m);
            n.y = (a + b * Math.cos(p)) * Math.sin(m);
            n.z = b * Math.sin(p);
            this.vertices.push(n);
            g.push(new THREE.Vector2(l / d,k / c));
            h.push(n.clone().sub(f).normalize())
        }
    for (k = 1; k <= c; k++)
        for (l = 1; l <= d; l++)
            a = (d + 1) * k + l - 1,
            b = (d + 1) * (k - 1) + l - 1,
            e = (d + 1) * (k - 1) + l,
            f = (d + 1) * k + l,
            m = new THREE.Face3(a,b,f,[h[a].clone(), h[b].clone(), h[f].clone()]),
            this.faces.push(m),
            this.faceVertexUvs[0].push([g[a].clone(), g[b].clone(), g[f].clone()]),
            m = new THREE.Face3(b,e,f,[h[b].clone(), h[e].clone(), h[f].clone()]),
            this.faces.push(m),
            this.faceVertexUvs[0].push([g[b].clone(), g[e].clone(), g[f].clone()]);
    this.computeFaceNormals()
}
;
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function(a, b, c, d, e, f, g) {
    function h(a, b, c, d, e) {
        var f = Math.cos(a)
          , g = Math.sin(a);
        a *= b / c;
        b = Math.cos(a);
        f *= d * (2 + b) * .5;
        g = d * (2 + b) * g * .5;
        d = e * d * Math.sin(a) * .5;
        return new THREE.Vector3(f,g,d)
    }
    THREE.Geometry.call(this);
    this.type = "TorusKnotGeometry";
    this.parameters = {
        radius: a,
        tube: b,
        radialSegments: c,
        tubularSegments: d,
        p: e,
        q: f,
        heightScale: g
    };
    a = a || 100;
    b = b || 40;
    c = c || 64;
    d = d || 8;
    e = e || 2;
    f = f || 3;
    g = g || 1;
    for (var k = Array(c), l = new THREE.Vector3, m = new THREE.Vector3, p = new THREE.Vector3, n = 0; n < c; ++n) {
        k[n] = Array(d);
        var q = n / c * 2 * e * Math.PI
          , u = h(q, f, e, a, g)
          , q = h(q + .01, f, e, a, g);
        l.subVectors(q, u);
        m.addVectors(q, u);
        p.crossVectors(l, m);
        m.crossVectors(p, l);
        p.normalize();
        m.normalize();
        for (q = 0; q < d; ++q) {
            var t = q / d * 2 * Math.PI
              , w = -b * Math.cos(t)
              , t = b * Math.sin(t)
              , v = new THREE.Vector3;
            v.x = u.x + w * m.x + t * p.x;
            v.y = u.y + w * m.y + t * p.y;
            v.z = u.z + w * m.z + t * p.z;
            k[n][q] = this.vertices.push(v) - 1
        }
    }
    for (n = 0; n < c; ++n)
        for (q = 0; q < d; ++q)
            e = (n + 1) % c,
            f = (q + 1) % d,
            a = k[n][q],
            b = k[e][q],
            e = k[e][f],
            f = k[n][f],
            g = new THREE.Vector2(n / c,q / d),
            l = new THREE.Vector2((n + 1) / c,q / d),
            m = new THREE.Vector2((n + 1) / c,(q + 1) / d),
            p = new THREE.Vector2(n / c,(q + 1) / d),
            this.faces.push(new THREE.Face3(a,b,f)),
            this.faceVertexUvs[0].push([g, l, p]),
            this.faces.push(new THREE.Face3(b,e,f)),
            this.faceVertexUvs[0].push([l.clone(), m, p.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
}
;
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.TubeGeometry = function(a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    this.type = "TubeGeometry";
    this.parameters = {
        path: a,
        segments: b,
        radius: c,
        radialSegments: d,
        closed: e,
        taper: f
    };
    b = b || 64;
    c = c || 1;
    d = d || 8;
    e = e || !1;
    f = f || THREE.TubeGeometry.NoTaper;
    var g = [], h, k, l = b + 1, m, p, n, q, u, t = new THREE.Vector3, w, v, x;
    w = new THREE.TubeGeometry.FrenetFrames(a,b,e);
    v = w.normals;
    x = w.binormals;
    this.tangents = w.tangents;
    this.normals = v;
    this.binormals = x;
    for (w = 0; w < l; w++)
        for (g[w] = [],
        m = w / (l - 1),
        u = a.getPointAt(m),
        h = v[w],
        k = x[w],
        n = c * f(m),
        m = 0; m < d; m++)
            p = m / d * 2 * Math.PI,
            q = -n * Math.cos(p),
            p = n * Math.sin(p),
            t.copy(u),
            t.x += q * h.x + p * k.x,
            t.y += q * h.y + p * k.y,
            t.z += q * h.z + p * k.z,
            g[w][m] = this.vertices.push(new THREE.Vector3(t.x,t.y,t.z)) - 1;
    for (w = 0; w < b; w++)
        for (m = 0; m < d; m++)
            f = e ? (w + 1) % b : w + 1,
            l = (m + 1) % d,
            a = g[w][m],
            c = g[f][m],
            f = g[f][l],
            l = g[w][l],
            t = new THREE.Vector2(w / b,m / d),
            v = new THREE.Vector2((w + 1) / b,m / d),
            x = new THREE.Vector2((w + 1) / b,(m + 1) / d),
            h = new THREE.Vector2(w / b,(m + 1) / d),
            this.faces.push(new THREE.Face3(a,c,l)),
            this.faceVertexUvs[0].push([t, v, h]),
            this.faces.push(new THREE.Face3(c,f,l)),
            this.faceVertexUvs[0].push([v.clone(), x, h.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
}
;
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry;
THREE.TubeGeometry.NoTaper = function(a) {
    return 1
}
;
THREE.TubeGeometry.SinusoidalTaper = function(a) {
    return Math.sin(Math.PI * a)
}
;
THREE.TubeGeometry.FrenetFrames = function(a, b, c) {
    var d = new THREE.Vector3
      , e = []
      , f = []
      , g = []
      , h = new THREE.Vector3
      , k = new THREE.Matrix4;
    b += 1;
    var l, m, p;
    this.tangents = e;
    this.normals = f;
    this.binormals = g;
    for (l = 0; l < b; l++)
        m = l / (b - 1),
        e[l] = a.getTangentAt(m),
        e[l].normalize();
    f[0] = new THREE.Vector3;
    g[0] = new THREE.Vector3;
    a = Number.MAX_VALUE;
    l = Math.abs(e[0].x);
    m = Math.abs(e[0].y);
    p = Math.abs(e[0].z);
    l <= a && (a = l,
    d.set(1, 0, 0));
    m <= a && (a = m,
    d.set(0, 1, 0));
    p <= a && d.set(0, 0, 1);
    h.crossVectors(e[0], d).normalize();
    f[0].crossVectors(e[0], h);
    g[0].crossVectors(e[0], f[0]);
    for (l = 1; l < b; l++)
        f[l] = f[l - 1].clone(),
        g[l] = g[l - 1].clone(),
        h.crossVectors(e[l - 1], e[l]),
        h.length() > Number.EPSILON && (h.normalize(),
        d = Math.acos(THREE.Math.clamp(e[l - 1].dot(e[l]), -1, 1)),
        f[l].applyMatrix4(k.makeRotationAxis(h, d))),
        g[l].crossVectors(e[l], f[l]);
    if (c)
        for (d = Math.acos(THREE.Math.clamp(f[0].dot(f[b - 1]), -1, 1)),
        d /= b - 1,
        0 < e[0].dot(h.crossVectors(f[0], f[b - 1])) && (d = -d),
        l = 1; l < b; l++)
            f[l].applyMatrix4(k.makeRotationAxis(e[l], d * l)),
            g[l].crossVectors(e[l], f[l])
}
;
THREE.PolyhedronGeometry = function(a, b, c, d) {
    function e(a) {
        var b = a.normalize().clone();
        b.index = k.vertices.push(b) - 1;
        var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + .5;
        a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + .5;
        b.uv = new THREE.Vector2(c,1 - a);
        return b
    }
    function f(a, b, c, d) {
        d = new THREE.Face3(a.index,b.index,c.index,[a.clone(), b.clone(), c.clone()],void 0,d);
        k.faces.push(d);
        w.copy(a).add(b).add(c).divideScalar(3);
        d = Math.atan2(w.z, -w.x);
        k.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)])
    }
    function g(a, b) {
        for (var c = Math.pow(2, b), d = e(k.vertices[a.a]), g = e(k.vertices[a.b]), h = e(k.vertices[a.c]), l = [], m = a.materialIndex, n = 0; n <= c; n++) {
            l[n] = [];
            for (var p = e(d.clone().lerp(h, n / c)), q = e(g.clone().lerp(h, n / c)), t = c - n, u = 0; u <= t; u++)
                l[n][u] = 0 === u && n === c ? p : e(p.clone().lerp(q, u / t))
        }
        for (n = 0; n < c; n++)
            for (u = 0; u < 2 * (c - n) - 1; u++)
                d = Math.floor(u / 2),
                0 === u % 2 ? f(l[n][d + 1], l[n + 1][d], l[n][d], m) : f(l[n][d + 1], l[n + 1][d + 1], l[n + 1][d], m)
    }
    function h(a, b, c) {
        0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1,a.y));
        0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + .5,a.y));
        return a.clone()
    }
    THREE.Geometry.call(this);
    this.type = "PolyhedronGeometry";
    this.parameters = {
        vertices: a,
        indices: b,
        radius: c,
        detail: d
    };
    c = c || 1;
    d = d || 0;
    for (var k = this, l = 0, m = a.length; l < m; l += 3)
        e(new THREE.Vector3(a[l],a[l + 1],a[l + 2]));
    a = this.vertices;
    for (var p = [], n = l = 0, m = b.length; l < m; l += 3,
    n++) {
        var q = a[b[l]]
          , u = a[b[l + 1]]
          , t = a[b[l + 2]];
        p[n] = new THREE.Face3(q.index,u.index,t.index,[q.clone(), u.clone(), t.clone()],void 0,n)
    }
    for (var w = new THREE.Vector3, l = 0, m = p.length; l < m; l++)
        g(p[l], d);
    l = 0;
    for (m = this.faceVertexUvs[0].length; l < m; l++)
        b = this.faceVertexUvs[0][l],
        d = b[0].x,
        a = b[1].x,
        p = b[2].x,
        n = Math.max(d, a, p),
        q = Math.min(d, a, p),
        .9 < n && .1 > q && (.2 > d && (b[0].x += 1),
        .2 > a && (b[1].x += 1),
        .2 > p && (b[2].x += 1));
    l = 0;
    for (m = this.vertices.length; l < m; l++)
        this.vertices[l].multiplyScalar(c);
    this.mergeVertices();
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,c)
}
;
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;
THREE.DodecahedronGeometry = function(a, b) {
    var c = (1 + Math.sqrt(5)) / 2
      , d = 1 / c;
    THREE.PolyhedronGeometry.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, 0, -c, 0, -d, c, 0, -d, -c, 0, d, c, 0, d], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], a, b);
    this.type = "DodecahedronGeometry";
    this.parameters = {
        radius: a,
        detail: b
    }
}
;
THREE.DodecahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);
THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry;
THREE.IcosahedronGeometry = function(a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [-1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, 0, 0, -1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, c, 0, -1, c, 0, 1, -c, 0, -1, -c, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], a, b);
    this.type = "IcosahedronGeometry";
    this.parameters = {
        radius: a,
        detail: b
    }
}
;
THREE.IcosahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.OctahedronGeometry = function(a, b) {
    THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], a, b);
    this.type = "OctahedronGeometry";
    this.parameters = {
        radius: a,
        detail: b
    }
}
;
THREE.OctahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;
THREE.TetrahedronGeometry = function(a, b) {
    THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], a, b);
    this.type = "TetrahedronGeometry";
    this.parameters = {
        radius: a,
        detail: b
    }
}
;
THREE.TetrahedronGeometry.prototype = Object.create(THREE.PolyhedronGeometry.prototype);
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;
THREE.ParametricGeometry = function(a, b, c) {
    THREE.Geometry.call(this);
    this.type = "ParametricGeometry";
    this.parameters = {
        func: a,
        slices: b,
        stacks: c
    };
    var d = this.vertices, e = this.faces, f = this.faceVertexUvs[0], g, h, k, l, m = b + 1;
    for (g = 0; g <= c; g++)
        for (l = g / c,
        h = 0; h <= b; h++)
            k = h / b,
            k = a(k, l),
            d.push(k);
    var p, n, q, u;
    for (g = 0; g < c; g++)
        for (h = 0; h < b; h++)
            a = g * m + h,
            d = g * m + h + 1,
            l = (g + 1) * m + h + 1,
            k = (g + 1) * m + h,
            p = new THREE.Vector2(h / b,g / c),
            n = new THREE.Vector2((h + 1) / b,g / c),
            q = new THREE.Vector2((h + 1) / b,(g + 1) / c),
            u = new THREE.Vector2(h / b,(g + 1) / c),
            e.push(new THREE.Face3(a,d,k)),
            f.push([p, n, u]),
            e.push(new THREE.Face3(d,l,k)),
            f.push([n.clone(), q, u.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
}
;
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry;
THREE.WireframeGeometry = function(a) {
    function b(a, b) {
        return a - b
    }
    THREE.BufferGeometry.call(this);
    var c = [0, 0]
      , d = {}
      , e = ["a", "b", "c"];
    if (a instanceof THREE.Geometry) {
        var f = a.vertices
          , g = a.faces
          , h = 0
          , k = new Uint32Array(6 * g.length);
        a = 0;
        for (var l = g.length; a < l; a++)
            for (var m = g[a], p = 0; 3 > p; p++) {
                c[0] = m[e[p]];
                c[1] = m[e[(p + 1) % 3]];
                c.sort(b);
                var n = c.toString();
                void 0 === d[n] && (k[2 * h] = c[0],
                k[2 * h + 1] = c[1],
                d[n] = !0,
                h++)
            }
        c = new Float32Array(6 * h);
        a = 0;
        for (l = h; a < l; a++)
            for (p = 0; 2 > p; p++)
                d = f[k[2 * a + p]],
                h = 6 * a + 3 * p,
                c[h + 0] = d.x,
                c[h + 1] = d.y,
                c[h + 2] = d.z;
        this.addAttribute("position", new THREE.BufferAttribute(c,3))
    } else if (a instanceof THREE.BufferGeometry) {
        if (null !== a.index) {
            l = a.index.array;
            f = a.attributes.position;
            e = a.groups;
            h = 0;
            0 === e.length && a.addGroup(0, l.length);
            k = new Uint32Array(2 * l.length);
            g = 0;
            for (m = e.length; g < m; ++g) {
                a = e[g];
                p = a.start;
                n = a.count;
                a = p;
                for (var q = p + n; a < q; a += 3)
                    for (p = 0; 3 > p; p++)
                        c[0] = l[a + p],
                        c[1] = l[a + (p + 1) % 3],
                        c.sort(b),
                        n = c.toString(),
                        void 0 === d[n] && (k[2 * h] = c[0],
                        k[2 * h + 1] = c[1],
                        d[n] = !0,
                        h++)
            }
            c = new Float32Array(6 * h);
            a = 0;
            for (l = h; a < l; a++)
                for (p = 0; 2 > p; p++)
                    h = 6 * a + 3 * p,
                    d = k[2 * a + p],
                    c[h + 0] = f.getX(d),
                    c[h + 1] = f.getY(d),
                    c[h + 2] = f.getZ(d)
        } else
            for (f = a.attributes.position.array,
            h = f.length / 3,
            k = h / 3,
            c = new Float32Array(6 * h),
            a = 0,
            l = k; a < l; a++)
                for (p = 0; 3 > p; p++)
                    h = 18 * a + 6 * p,
                    k = 9 * a + 3 * p,
                    c[h + 0] = f[k],
                    c[h + 1] = f[k + 1],
                    c[h + 2] = f[k + 2],
                    d = 9 * a + (p + 1) % 3 * 3,
                    c[h + 3] = f[d],
                    c[h + 4] = f[d + 1],
                    c[h + 5] = f[d + 2];
        this.addAttribute("position", new THREE.BufferAttribute(c,3))
    }
}
;
THREE.WireframeGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.WireframeGeometry.prototype.constructor = THREE.WireframeGeometry;
THREE.AxisHelper = function(a) {
    a = a || 1;
    var b = new Float32Array([0, 0, 0, a, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 0, a])
      , c = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]);
    a = new THREE.BufferGeometry;
    a.addAttribute("position", new THREE.BufferAttribute(b,3));
    a.addAttribute("color", new THREE.BufferAttribute(c,3));
    b = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    THREE.LineSegments.call(this, a, b)
}
;
THREE.AxisHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper;
THREE.ArrowHelper = function() {
    var a = new THREE.Geometry;
    a.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0));
    var b = new THREE.CylinderGeometry(0,.5,1,5,1);
    b.translate(0, -.5, 0);
    return function(c, d, e, f, g, h) {
        THREE.Object3D.call(this);
        void 0 === f && (f = 16776960);
        void 0 === e && (e = 1);
        void 0 === g && (g = .2 * e);
        void 0 === h && (h = .2 * g);
        this.position.copy(d);
        this.line = new THREE.Line(a,new THREE.LineBasicMaterial({
            color: f
        }));
        this.line.matrixAutoUpdate = !1;
        this.add(this.line);
        this.cone = new THREE.Mesh(b,new THREE.MeshBasicMaterial({
            color: f
        }));
        this.cone.matrixAutoUpdate = !1;
        this.add(this.cone);
        this.setDirection(c);
        this.setLength(e, g, h)
    }
}();
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper;
THREE.ArrowHelper.prototype.setDirection = function() {
    var a = new THREE.Vector3, b;
    return function(c) {
        .99999 < c.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > c.y ? this.quaternion.set(1, 0, 0, 0) : (a.set(c.z, 0, -c.x).normalize(),
        b = Math.acos(c.y),
        this.quaternion.setFromAxisAngle(a, b))
    }
}();
THREE.ArrowHelper.prototype.setLength = function(a, b, c) {
    void 0 === b && (b = .2 * a);
    void 0 === c && (c = .2 * b);
    this.line.scale.set(1, Math.max(0, a - b), 1);
    this.line.updateMatrix();
    this.cone.scale.set(c, b, c);
    this.cone.position.y = a;
    this.cone.updateMatrix()
}
;
THREE.ArrowHelper.prototype.setColor = function(a) {
    this.line.material.color.set(a);
    this.cone.material.color.set(a)
}
;
THREE.BoxHelper = function(a) {
    var b = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7])
      , c = new Float32Array(24)
      , d = new THREE.BufferGeometry;
    d.setIndex(new THREE.BufferAttribute(b,1));
    d.addAttribute("position", new THREE.BufferAttribute(c,3));
    THREE.LineSegments.call(this, d, new THREE.LineBasicMaterial({
        color: 16776960
    }));
    void 0 !== a && this.update(a)
}
;
THREE.BoxHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.BoxHelper.prototype.constructor = THREE.BoxHelper;
THREE.BoxHelper.prototype.update = function() {
    var a = new THREE.Box3;
    return function(b) {
        a.setFromObject(b);
        if (!a.empty()) {
            b = a.min;
            var c = a.max
              , d = this.geometry.attributes.position
              , e = d.array;
            e[0] = c.x;
            e[1] = c.y;
            e[2] = c.z;
            e[3] = b.x;
            e[4] = c.y;
            e[5] = c.z;
            e[6] = b.x;
            e[7] = b.y;
            e[8] = c.z;
            e[9] = c.x;
            e[10] = b.y;
            e[11] = c.z;
            e[12] = c.x;
            e[13] = c.y;
            e[14] = b.z;
            e[15] = b.x;
            e[16] = c.y;
            e[17] = b.z;
            e[18] = b.x;
            e[19] = b.y;
            e[20] = b.z;
            e[21] = c.x;
            e[22] = b.y;
            e[23] = b.z;
            d.needsUpdate = !0;
            this.geometry.computeBoundingSphere()
        }
    }
}();
THREE.BoundingBoxHelper = function(a, b) {
    var c = void 0 !== b ? b : 8947848;
    this.object = a;
    this.box = new THREE.Box3;
    THREE.Mesh.call(this, new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: c,
        wireframe: !0
    }))
}
;
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper;
THREE.BoundingBoxHelper.prototype.update = function() {
    this.box.setFromObject(this.object);
    this.box.size(this.scale);
    this.box.center(this.position)
}
;
THREE.CameraHelper = function(a) {
    function b(a, b, d) {
        c(a, d);
        c(b, d)
    }
    function c(a, b) {
        d.vertices.push(new THREE.Vector3);
        d.colors.push(new THREE.Color(b));
        void 0 === f[a] && (f[a] = []);
        f[a].push(d.vertices.length - 1)
    }
    var d = new THREE.Geometry
      , e = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    })
      , f = {};
    b("n1", "n2", 16755200);
    b("n2", "n4", 16755200);
    b("n4", "n3", 16755200);
    b("n3", "n1", 16755200);
    b("f1", "f2", 16755200);
    b("f2", "f4", 16755200);
    b("f4", "f3", 16755200);
    b("f3", "f1", 16755200);
    b("n1", "f1", 16755200);
    b("n2", "f2", 16755200);
    b("n3", "f3", 16755200);
    b("n4", "f4", 16755200);
    b("p", "n1", 16711680);
    b("p", "n2", 16711680);
    b("p", "n3", 16711680);
    b("p", "n4", 16711680);
    b("u1", "u2", 43775);
    b("u2", "u3", 43775);
    b("u3", "u1", 43775);
    b("c", "t", 16777215);
    b("p", "c", 3355443);
    b("cn1", "cn2", 3355443);
    b("cn3", "cn4", 3355443);
    b("cf1", "cf2", 3355443);
    b("cf3", "cf4", 3355443);
    THREE.LineSegments.call(this, d, e);
    this.camera = a;
    this.camera.updateProjectionMatrix();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.pointMap = f;
    this.update()
}
;
THREE.CameraHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;
THREE.CameraHelper.prototype.update = function() {
    function a(a, g, h, k) {
        d.set(g, h, k).unproject(e);
        a = c[a];
        if (void 0 !== a)
            for (g = 0,
            h = a.length; g < h; g++)
                b.vertices[a[g]].copy(d)
    }
    var b, c, d = new THREE.Vector3, e = new THREE.Camera;
    return function() {
        b = this.geometry;
        c = this.pointMap;
        e.projectionMatrix.copy(this.camera.projectionMatrix);
        a("c", 0, 0, -1);
        a("t", 0, 0, 1);
        a("n1", -1, -1, -1);
        a("n2", 1, -1, -1);
        a("n3", -1, 1, -1);
        a("n4", 1, 1, -1);
        a("f1", -1, -1, 1);
        a("f2", 1, -1, 1);
        a("f3", -1, 1, 1);
        a("f4", 1, 1, 1);
        a("u1", .7, 1.1, -1);
        a("u2", -.7, 1.1, -1);
        a("u3", 0, 2, -1);
        a("cf1", -1, 0, 1);
        a("cf2", 1, 0, 1);
        a("cf3", 0, -1, 1);
        a("cf4", 0, 1, 1);
        a("cn1", -1, 0, -1);
        a("cn2", 1, 0, -1);
        a("cn3", 0, -1, -1);
        a("cn4", 0, 1, -1);
        b.verticesNeedUpdate = !0
    }
}();
THREE.DirectionalLightHelper = function(a, b) {
    THREE.Object3D.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    b = b || 1;
    var c = new THREE.Geometry;
    c.vertices.push(new THREE.Vector3(-b,b,0), new THREE.Vector3(b,b,0), new THREE.Vector3(b,-b,0), new THREE.Vector3(-b,-b,0), new THREE.Vector3(-b,b,0));
    var d = new THREE.LineBasicMaterial({
        fog: !1
    });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    this.lightPlane = new THREE.Line(c,d);
    this.add(this.lightPlane);
    c = new THREE.Geometry;
    c.vertices.push(new THREE.Vector3, new THREE.Vector3);
    d = new THREE.LineBasicMaterial({
        fog: !1
    });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    this.targetLine = new THREE.Line(c,d);
    this.add(this.targetLine);
    this.update()
}
;
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper;
THREE.DirectionalLightHelper.prototype.dispose = function() {
    this.lightPlane.geometry.dispose();
    this.lightPlane.material.dispose();
    this.targetLine.geometry.dispose();
    this.targetLine.material.dispose()
}
;
THREE.DirectionalLightHelper.prototype.update = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3
      , c = new THREE.Vector3;
    return function() {
        a.setFromMatrixPosition(this.light.matrixWorld);
        b.setFromMatrixPosition(this.light.target.matrixWorld);
        c.subVectors(b, a);
        this.lightPlane.lookAt(c);
        this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
        this.targetLine.geometry.vertices[1].copy(c);
        this.targetLine.geometry.verticesNeedUpdate = !0;
        this.targetLine.material.color.copy(this.lightPlane.material.color)
    }
}();
THREE.EdgesHelper = function(a, b, c) {
    b = void 0 !== b ? b : 16777215;
    THREE.LineSegments.call(this, new THREE.EdgesGeometry(a.geometry,c), new THREE.LineBasicMaterial({
        color: b
    }));
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1
}
;
THREE.EdgesHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper;
THREE.FaceNormalsHelper = function(a, b, c, d) {
    this.object = a;
    this.size = void 0 !== b ? b : 1;
    a = void 0 !== c ? c : 16776960;
    d = void 0 !== d ? d : 1;
    b = 0;
    c = this.object.geometry;
    c instanceof THREE.Geometry ? b = c.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
    c = new THREE.BufferGeometry;
    b = new THREE.Float32Attribute(6 * b,3);
    c.addAttribute("position", b);
    THREE.LineSegments.call(this, c, new THREE.LineBasicMaterial({
        color: a,
        linewidth: d
    }));
    this.matrixAutoUpdate = !1;
    this.update()
}
;
THREE.FaceNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper;
THREE.FaceNormalsHelper.prototype.update = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3
      , c = new THREE.Matrix3;
    return function() {
        this.object.updateMatrixWorld(!0);
        c.getNormalMatrix(this.object.matrixWorld);
        for (var d = this.object.matrixWorld, e = this.geometry.attributes.position, f = this.object.geometry, g = f.vertices, f = f.faces, h = 0, k = 0, l = f.length; k < l; k++) {
            var m = f[k]
              , p = m.normal;
            a.copy(g[m.a]).add(g[m.b]).add(g[m.c]).divideScalar(3).applyMatrix4(d);
            b.copy(p).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
            e.setXYZ(h, a.x, a.y, a.z);
            h += 1;
            e.setXYZ(h, b.x, b.y, b.z);
            h += 1
        }
        e.needsUpdate = !0;
        return this
    }
}();
THREE.GridHelper = function(a, b) {
    var c = new THREE.Geometry
      , d = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    this.color1 = new THREE.Color(4473924);
    this.color2 = new THREE.Color(8947848);
    for (var e = -a; e <= a; e += b) {
        c.vertices.push(new THREE.Vector3(-a,0,e), new THREE.Vector3(a,0,e), new THREE.Vector3(e,0,-a), new THREE.Vector3(e,0,a));
        var f = 0 === e ? this.color1 : this.color2;
        c.colors.push(f, f, f, f)
    }
    THREE.LineSegments.call(this, c, d)
}
;
THREE.GridHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.GridHelper.prototype.constructor = THREE.GridHelper;
THREE.GridHelper.prototype.setColors = function(a, b) {
    this.color1.set(a);
    this.color2.set(b);
    this.geometry.colorsNeedUpdate = !0
}
;
THREE.HemisphereLightHelper = function(a, b) {
    THREE.Object3D.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.colors = [new THREE.Color, new THREE.Color];
    var c = new THREE.SphereGeometry(b,4,2);
    c.rotateX(-Math.PI / 2);
    for (var d = 0; 8 > d; d++)
        c.faces[d].color = this.colors[4 > d ? 0 : 1];
    d = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        wireframe: !0
    });
    this.lightSphere = new THREE.Mesh(c,d);
    this.add(this.lightSphere);
    this.update()
}
;
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper;
THREE.HemisphereLightHelper.prototype.dispose = function() {
    this.lightSphere.geometry.dispose();
    this.lightSphere.material.dispose()
}
;
THREE.HemisphereLightHelper.prototype.update = function() {
    var a = new THREE.Vector3;
    return function() {
        this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
        this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
        this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());
        this.lightSphere.geometry.colorsNeedUpdate = !0
    }
}();
THREE.PointLightHelper = function(a, b) {
    this.light = a;
    this.light.updateMatrixWorld();
    var c = new THREE.SphereGeometry(b,4,2)
      , d = new THREE.MeshBasicMaterial({
        wireframe: !0,
        fog: !1
    });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    THREE.Mesh.call(this, c, d);
    this.matrix = this.light.matrixWorld;
    this.matrixAutoUpdate = !1
}
;
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper;
THREE.PointLightHelper.prototype.dispose = function() {
    this.geometry.dispose();
    this.material.dispose()
}
;
THREE.PointLightHelper.prototype.update = function() {
    this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}
;
THREE.SkeletonHelper = function(a) {
    this.bones = this.getBoneList(a);
    for (var b = new THREE.Geometry, c = 0; c < this.bones.length; c++)
        this.bones[c].parent instanceof THREE.Bone && (b.vertices.push(new THREE.Vector3),
        b.vertices.push(new THREE.Vector3),
        b.colors.push(new THREE.Color(0,0,1)),
        b.colors.push(new THREE.Color(0,1,0)));
    b.dynamic = !0;
    c = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
    });
    THREE.LineSegments.call(this, b, c);
    this.root = a;
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.update()
}
;
THREE.SkeletonHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper;
THREE.SkeletonHelper.prototype.getBoneList = function(a) {
    var b = [];
    a instanceof THREE.Bone && b.push(a);
    for (var c = 0; c < a.children.length; c++)
        b.push.apply(b, this.getBoneList(a.children[c]));
    return b
}
;
THREE.SkeletonHelper.prototype.update = function() {
    for (var a = this.geometry, b = (new THREE.Matrix4).getInverse(this.root.matrixWorld), c = new THREE.Matrix4, d = 0, e = 0; e < this.bones.length; e++) {
        var f = this.bones[e];
        f.parent instanceof THREE.Bone && (c.multiplyMatrices(b, f.matrixWorld),
        a.vertices[d].setFromMatrixPosition(c),
        c.multiplyMatrices(b, f.parent.matrixWorld),
        a.vertices[d + 1].setFromMatrixPosition(c),
        d += 2)
    }
    a.verticesNeedUpdate = !0;
    a.computeBoundingSphere()
}
;
THREE.SpotLightHelper = function(a) {
    THREE.Object3D.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    a = new THREE.CylinderGeometry(0,1,1,8,1,!0);
    a.translate(0, -.5, 0);
    a.rotateX(-Math.PI / 2);
    var b = new THREE.MeshBasicMaterial({
        wireframe: !0,
        fog: !1
    });
    this.cone = new THREE.Mesh(a,b);
    this.add(this.cone);
    this.update()
}
;
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper;
THREE.SpotLightHelper.prototype.dispose = function() {
    this.cone.geometry.dispose();
    this.cone.material.dispose()
}
;
THREE.SpotLightHelper.prototype.update = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3;
    return function() {
        var c = this.light.distance ? this.light.distance : 1E4
          , d = c * Math.tan(this.light.angle);
        this.cone.scale.set(d, d, c);
        a.setFromMatrixPosition(this.light.matrixWorld);
        b.setFromMatrixPosition(this.light.target.matrixWorld);
        this.cone.lookAt(b.sub(a));
        this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    }
}();
THREE.VertexNormalsHelper = function(a, b, c, d) {
    this.object = a;
    this.size = void 0 !== b ? b : 1;
    a = void 0 !== c ? c : 16711680;
    d = void 0 !== d ? d : 1;
    b = 0;
    c = this.object.geometry;
    c instanceof THREE.Geometry ? b = 3 * c.faces.length : c instanceof THREE.BufferGeometry && (b = c.attributes.normal.count);
    c = new THREE.BufferGeometry;
    b = new THREE.Float32Attribute(6 * b,3);
    c.addAttribute("position", b);
    THREE.LineSegments.call(this, c, new THREE.LineBasicMaterial({
        color: a,
        linewidth: d
    }));
    this.matrixAutoUpdate = !1;
    this.update()
}
;
THREE.VertexNormalsHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper;
THREE.VertexNormalsHelper.prototype.update = function() {
    var a = new THREE.Vector3
      , b = new THREE.Vector3
      , c = new THREE.Matrix3;
    return function() {
        var d = ["a", "b", "c"];
        this.object.updateMatrixWorld(!0);
        c.getNormalMatrix(this.object.matrixWorld);
        var e = this.object.matrixWorld
          , f = this.geometry.attributes.position
          , g = this.object.geometry;
        if (g instanceof THREE.Geometry)
            for (var h = g.vertices, k = g.faces, l = g = 0, m = k.length; l < m; l++)
                for (var p = k[l], n = 0, q = p.vertexNormals.length; n < q; n++) {
                    var u = p.vertexNormals[n];
                    a.copy(h[p[d[n]]]).applyMatrix4(e);
                    b.copy(u).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
                    f.setXYZ(g, a.x, a.y, a.z);
                    g += 1;
                    f.setXYZ(g, b.x, b.y, b.z);
                    g += 1
                }
        else if (g instanceof THREE.BufferGeometry)
            for (d = g.attributes.position,
            h = g.attributes.normal,
            n = g = 0,
            q = d.count; n < q; n++)
                a.set(d.getX(n), d.getY(n), d.getZ(n)).applyMatrix4(e),
                b.set(h.getX(n), h.getY(n), h.getZ(n)),
                b.applyMatrix3(c).normalize().multiplyScalar(this.size).add(a),
                f.setXYZ(g, a.x, a.y, a.z),
                g += 1,
                f.setXYZ(g, b.x, b.y, b.z),
                g += 1;
        f.needsUpdate = !0;
        return this
    }
}();
THREE.WireframeHelper = function(a, b) {
    var c = void 0 !== b ? b : 16777215;
    THREE.LineSegments.call(this, new THREE.WireframeGeometry(a.geometry), new THREE.LineBasicMaterial({
        color: c
    }));
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1
}
;
THREE.WireframeHelper.prototype = Object.create(THREE.LineSegments.prototype);
THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper;
THREE.ImmediateRenderObject = function(a) {
    THREE.Object3D.call(this);
    this.material = a;
    this.render = function(a) {}
}
;
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject;
THREE.MorphBlendMesh = function(a, b) {
    THREE.Mesh.call(this, a, b);
    this.animationsMap = {};
    this.animationsList = [];
    var c = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, c - 1, c / 1);
    this.setAnimationWeight("__default", 1)
}
;
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;
THREE.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d) {
    b = {
        start: b,
        end: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[a] = b;
    this.animationsList.push(b)
}
;
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(a) {
    for (var b = /([a-z]+)_?(\d+)/, c, d = {}, e = this.geometry, f = 0, g = e.morphTargets.length; f < g; f++) {
        var h = e.morphTargets[f].name.match(b);
        if (h && 1 < h.length) {
            var k = h[1];
            d[k] || (d[k] = {
                start: Infinity,
                end: -Infinity
            });
            h = d[k];
            f < h.start && (h.start = f);
            f > h.end && (h.end = f);
            c || (c = k)
        }
    }
    for (k in d)
        h = d[k],
        this.createAnimation(k, h.start, h.end, a);
    this.firstAnimation = c
}
;
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
    if (a = this.animationsMap[a])
        a.direction = 1,
        a.directionBackwards = !1
}
;
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
    if (a = this.animationsMap[a])
        a.direction = -1,
        a.directionBackwards = !0
}
;
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.fps = b,
    c.duration = (c.end - c.start) / c.fps)
}
;
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.duration = b,
    c.fps = (c.end - c.start) / c.duration)
}
;
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.weight = b)
}
;
THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, b) {
    var c = this.animationsMap[a];
    c && (c.time = b)
}
;
THREE.MorphBlendMesh.prototype.getAnimationTime = function(a) {
    var b = 0;
    if (a = this.animationsMap[a])
        b = a.time;
    return b
}
;
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
    var b = -1;
    if (a = this.animationsMap[a])
        b = a.duration;
    return b
}
;
THREE.MorphBlendMesh.prototype.playAnimation = function(a) {
    var b = this.animationsMap[a];
    b ? (b.time = 0,
    b.active = !0) : console.warn("THREE.MorphBlendMesh: animation[" + a + "] undefined in .playAnimation()")
}
;
THREE.MorphBlendMesh.prototype.stopAnimation = function(a) {
    if (a = this.animationsMap[a])
        a.active = !1
}
;
THREE.MorphBlendMesh.prototype.update = function(a) {
    for (var b = 0, c = this.animationsList.length; b < c; b++) {
        var d = this.animationsList[b];
        if (d.active) {
            var e = d.duration / d.length;
            d.time += d.direction * a;
            if (d.mirroredLoop) {
                if (d.time > d.duration || 0 > d.time)
                    d.direction *= -1,
                    d.time > d.duration && (d.time = d.duration,
                    d.directionBackwards = !0),
                    0 > d.time && (d.time = 0,
                    d.directionBackwards = !1)
            } else
                d.time %= d.duration,
                0 > d.time && (d.time += d.duration);
            var f = d.start + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1)
              , g = d.weight;
            f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0,
            this.morphTargetInfluences[d.currentFrame] = 1 * g,
            this.morphTargetInfluences[f] = 0,
            d.lastFrame = d.currentFrame,
            d.currentFrame = f);
            e = d.time % e / e;
            d.directionBackwards && (e = 1 - e);
            d.currentFrame !== d.lastFrame ? (this.morphTargetInfluences[d.currentFrame] = e * g,
            this.morphTargetInfluences[d.lastFrame] = (1 - e) * g) : this.morphTargetInfluences[d.currentFrame] = g
        }
    }
}
;
THREE.TeapotBufferGeometry = function(a, b, c, d, e, f, g) {
    var h = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 16, 17, 18, 7, 19, 20, 21, 11, 22, 23, 24, 15, 25, 26, 27, 18, 28, 29, 30, 21, 31, 32, 33, 24, 34, 35, 36, 27, 37, 38, 39, 30, 40, 41, 0, 33, 42, 43, 4, 36, 44, 45, 8, 39, 46, 47, 12, 12, 13, 14, 15, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 15, 25, 26, 27, 51, 60, 61, 62, 55, 63, 64, 65, 59, 66, 67, 68, 27, 37, 38, 39, 62, 69, 70, 71, 65, 72, 73, 74, 68, 75, 76, 77, 39, 46, 47, 12, 71, 78, 79, 48, 74, 80, 81, 52, 77, 82, 83, 56, 56, 57, 58, 59, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 59, 66, 67, 68, 87, 96, 97, 98, 91, 99, 100, 101, 95, 102, 103, 104, 68, 75, 76, 77, 98, 105, 106, 107, 101, 108, 109, 110, 104, 111, 112, 113, 77, 82, 83, 56, 107, 114, 115, 84, 110, 116, 117, 88, 113, 118, 119, 92, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 123, 136, 137, 120, 127, 138, 139, 124, 131, 140, 141, 128, 135, 142, 143, 132, 132, 133, 134, 135, 144, 145, 146, 147, 148, 149, 150, 151, 68, 152, 153, 154, 135, 142, 143, 132, 147, 155, 156, 144, 151, 157, 158, 148, 154, 159, 160, 68, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 164, 177, 178, 161, 168, 179, 180, 165, 172, 181, 182, 169, 176, 183, 184, 173, 173, 174, 175, 176, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 176, 183, 184, 173, 188, 197, 198, 185, 192, 199, 200, 189, 196, 201, 202, 193, 203, 203, 203, 203, 204, 205, 206, 207, 208, 208, 208, 208, 209, 210, 211, 212, 203, 203, 203, 203, 207, 213, 214, 215, 208, 208, 208, 208, 212, 216, 217, 218, 203, 203, 203, 203, 215, 219, 220, 221, 208, 208, 208, 208, 218, 222, 223, 224, 203, 203, 203, 203, 221, 225, 226, 204, 208, 208, 208, 208, 224, 227, 228, 209, 209, 210, 211, 212, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 212, 216, 217, 218, 232, 241, 242, 243, 236, 244, 245, 246, 240, 247, 248, 249, 218, 222, 223, 224, 243, 250, 251, 252, 246, 253, 254, 255, 249, 256, 257, 258, 224, 227, 228, 209, 252, 259, 260, 229, 255, 261, 262, 233, 258, 263, 264, 237, 265, 265, 265, 265, 266, 267, 268, 269, 270, 271, 272, 273, 92, 119, 118, 113, 265, 265, 265, 265, 269, 274, 275, 276, 273, 277, 278, 279, 113, 112, 111, 104, 265, 265, 265, 265, 276, 280, 281, 282, 279, 283, 284, 285, 104, 103, 102, 95, 265, 265, 265, 265, 282, 286, 287, 266, 285, 288, 289, 270, 95, 94, 93, 92]
      , k = [1.4, 0, 2.4, 1.4, -.784, 2.4, .784, -1.4, 2.4, 0, -1.4, 2.4, 1.3375, 0, 2.53125, 1.3375, -.749, 2.53125, .749, -1.3375, 2.53125, 0, -1.3375, 2.53125, 1.4375, 0, 2.53125, 1.4375, -.805, 2.53125, .805, -1.4375, 2.53125, 0, -1.4375, 2.53125, 1.5, 0, 2.4, 1.5, -.84, 2.4, .84, -1.5, 2.4, 0, -1.5, 2.4, -.784, -1.4, 2.4, -1.4, -.784, 2.4, -1.4, 0, 2.4, -.749, -1.3375, 2.53125, -1.3375, -.749, 2.53125, -1.3375, 0, 2.53125, -.805, -1.4375, 2.53125, -1.4375, -.805, 2.53125, -1.4375, 0, 2.53125, -.84, -1.5, 2.4, -1.5, -.84, 2.4, -1.5, 0, 2.4, -1.4, .784, 2.4, -.784, 1.4, 2.4, 0, 1.4, 2.4, -1.3375, .749, 2.53125, -.749, 1.3375, 2.53125, 0, 1.3375, 2.53125, -1.4375, .805, 2.53125, -.805, 1.4375, 2.53125, 0, 1.4375, 2.53125, -1.5, .84, 2.4, -.84, 1.5, 2.4, 0, 1.5, 2.4, .784, 1.4, 2.4, 1.4, .784, 2.4, .749, 1.3375, 2.53125, 1.3375, .749, 2.53125, .805, 1.4375, 2.53125, 1.4375, .805, 2.53125, .84, 1.5, 2.4, 1.5, .84, 2.4, 1.75, 0, 1.875, 1.75, -.98, 1.875, .98, -1.75, 1.875, 0, -1.75, 1.875, 2, 0, 1.35, 2, -1.12, 1.35, 1.12, -2, 1.35, 0, -2, 1.35, 2, 0, .9, 2, -1.12, .9, 1.12, -2, .9, 0, -2, .9, -.98, -1.75, 1.875, -1.75, -.98, 1.875, -1.75, 0, 1.875, -1.12, -2, 1.35, -2, -1.12, 1.35, -2, 0, 1.35, -1.12, -2, .9, -2, -1.12, .9, -2, 0, .9, -1.75, .98, 1.875, -.98, 1.75, 1.875, 0, 1.75, 1.875, -2, 1.12, 1.35, -1.12, 2, 1.35, 0, 2, 1.35, -2, 1.12, .9, -1.12, 2, .9, 0, 2, .9, .98, 1.75, 1.875, 1.75, .98, 1.875, 1.12, 2, 1.35, 2, 1.12, 1.35, 1.12, 2, .9, 2, 1.12, .9, 2, 0, .45, 2, -1.12, .45, 1.12, -2, .45, 0, -2, .45, 1.5, 0, .225, 1.5, -.84, .225, .84, -1.5, .225, 0, -1.5, .225, 1.5, 0, .15, 1.5, -.84, .15, .84, -1.5, .15, 0, -1.5, .15, -1.12, -2, .45, -2, -1.12, .45, -2, 0, .45, -.84, -1.5, .225, -1.5, -.84, .225, -1.5, 0, .225, -.84, -1.5, .15, -1.5, -.84, .15, -1.5, 0, .15, -2, 1.12, .45, -1.12, 2, .45, 0, 2, .45, -1.5, .84, .225, -.84, 1.5, .225, 0, 1.5, .225, -1.5, .84, .15, -.84, 1.5, .15, 0, 1.5, .15, 1.12, 2, .45, 2, 1.12, .45, .84, 1.5, .225, 1.5, .84, .225, .84, 1.5, .15, 1.5, .84, .15, -1.6, 0, 2.025, -1.6, -.3, 2.025, -1.5, -.3, 2.25, -1.5, 0, 2.25, -2.3, 0, 2.025, -2.3, -.3, 2.025, -2.5, -.3, 2.25, -2.5, 0, 2.25, -2.7, 0, 2.025, -2.7, -.3, 2.025, -3, -.3, 2.25, -3, 0, 2.25, -2.7, 0, 1.8, -2.7, -.3, 1.8, -3, -.3, 1.8, -3, 0, 1.8, -1.5, .3, 2.25, -1.6, .3, 2.025, -2.5, .3, 2.25, -2.3, .3, 2.025, -3, .3, 2.25, -2.7, .3, 2.025, -3, .3, 1.8, -2.7, .3, 1.8, -2.7, 0, 1.575, -2.7, -.3, 1.575, -3, -.3, 1.35, -3, 0, 1.35, -2.5, 0, 1.125, -2.5, -.3, 1.125, -2.65, -.3, .9375, -2.65, 0, .9375, -2, -.3, .9, -1.9, -.3, .6, -1.9, 0, .6, -3, .3, 1.35, -2.7, .3, 1.575, -2.65, .3, .9375, -2.5, .3, 1.125, -1.9, .3, .6, -2, .3, .9, 1.7, 0, 1.425, 1.7, -.66, 1.425, 1.7, -.66, .6, 1.7, 0, .6, 2.6, 0, 1.425, 2.6, -.66, 1.425, 3.1, -.66, .825, 3.1, 0, .825, 2.3, 0, 2.1, 2.3, -.25, 2.1, 2.4, -.25, 2.025, 2.4, 0, 2.025, 2.7, 0, 2.4, 2.7, -.25, 2.4, 3.3, -.25, 2.4, 3.3, 0, 2.4, 1.7, .66, .6, 1.7, .66, 1.425, 3.1, .66, .825, 2.6, .66, 1.425, 2.4, .25, 2.025, 2.3, .25, 2.1, 3.3, .25, 2.4, 2.7, .25, 2.4, 2.8, 0, 2.475, 2.8, -.25, 2.475, 3.525, -.25, 2.49375, 3.525, 0, 2.49375, 2.9, 0, 2.475, 2.9, -.15, 2.475, 3.45, -.15, 2.5125, 3.45, 0, 2.5125, 2.8, 0, 2.4, 2.8, -.15, 2.4, 3.2, -.15, 2.4, 3.2, 0, 2.4, 3.525, .25, 2.49375, 2.8, .25, 2.475, 3.45, .15, 2.5125, 2.9, .15, 2.475, 3.2, .15, 2.4, 2.8, .15, 2.4, 0, 0, 3.15, .8, 0, 3.15, .8, -.45, 3.15, .45, -.8, 3.15, 0, -.8, 3.15, 0, 0, 2.85, .2, 0, 2.7, .2, -.112, 2.7, .112, -.2, 2.7, 0, -.2, 2.7, -.45, -.8, 3.15, -.8, -.45, 3.15, -.8, 0, 3.15, -.112, -.2, 2.7, -.2, -.112, 2.7, -.2, 0, 2.7, -.8, .45, 3.15, -.45, .8, 3.15, 0, .8, 3.15, -.2, .112, 2.7, -.112, .2, 2.7, 0, .2, 2.7, .45, .8, 3.15, .8, .45, 3.15, .112, .2, 2.7, .2, .112, 2.7, .4, 0, 2.55, .4, -.224, 2.55, .224, -.4, 2.55, 0, -.4, 2.55, 1.3, 0, 2.55, 1.3, -.728, 2.55, .728, -1.3, 2.55, 0, -1.3, 2.55, 1.3, 0, 2.4, 1.3, -.728, 2.4, .728, -1.3, 2.4, 0, -1.3, 2.4, -.224, -.4, 2.55, -.4, -.224, 2.55, -.4, 0, 2.55, -.728, -1.3, 2.55, -1.3, -.728, 2.55, -1.3, 0, 2.55, -.728, -1.3, 2.4, -1.3, -.728, 2.4, -1.3, 0, 2.4, -.4, .224, 2.55, -.224, .4, 2.55, 0, .4, 2.55, -1.3, .728, 2.55, -.728, 1.3, 2.55, 0, 1.3, 2.55, -1.3, .728, 2.4, -.728, 1.3, 2.4, 0, 1.3, 2.4, .224, .4, 2.55, .4, .224, 2.55, .728, 1.3, 2.55, 1.3, .728, 2.55, .728, 1.3, 2.4, 1.3, .728, 2.4, 0, 0, 0, 1.425, 0, 0, 1.425, .798, 0, .798, 1.425, 0, 0, 1.425, 0, 1.5, 0, .075, 1.5, .84, .075, .84, 1.5, .075, 0, 1.5, .075, -.798, 1.425, 0, -1.425, .798, 0, -1.425, 0, 0, -.84, 1.5, .075, -1.5, .84, .075, -1.5, 0, .075, -1.425, -.798, 0, -.798, -1.425, 0, 0, -1.425, 0, -1.5, -.84, .075, -.84, -1.5, .075, 0, -1.5, .075, .798, -1.425, 0, 1.425, -.798, 0, .84, -1.5, .075, 1.5, -.84, .075];
    THREE.BufferGeometry.call(this);
    this.type = "TeapotBufferGeometry";
    this.parameters = {
        size: a,
        segments: b,
        bottom: c,
        lid: d,
        body: e,
        fitLid: f,
        blinn: g
    };
    a = a || 50;
    b = void 0 !== b ? Math.max(2, Math.floor(b) || 10) : 10;
    c = void 0 === c ? !0 : c;
    d = void 0 === d ? !0 : d;
    e = void 0 === e ? !0 : e;
    f = void 0 === f ? !1 : f;
    g = void 0 === g ? !0 : g;
    var l = 3.15 * (g ? 1 : 1.3) / 2;
    a /= l;
    var m;
    m = (c ? (8 * b - 4) * b : 0) + (d ? (16 * b - 4) * b : 0);
    m += e ? 40 * b * b : 0;
    m = new Uint32Array(3 * m);
    var p;
    p = (c ? 4 : 0) + (d ? 8 : 0);
    p += e ? 20 : 0;
    p = p * (b + 1) * (b + 1);
    var n = new Float32Array(3 * p)
      , q = new Float32Array(3 * p);
    p = new Float32Array(2 * p);
    var u = new THREE.Matrix4;
    u.set(-1, 3, -3, 1, 3, -6, 3, 0, -3, 3, 0, 0, 1, 0, 0, 0);
    var t = [], w, v, x, E = [], y = [], F = [], z = [], A = [], B = [], H = [], G = [], D = new THREE.Vector3, K, N, M, C, J, L, Q = new THREE.Vector3, T = new THREE.Matrix4, R = new THREE.Matrix4, P = new THREE.Vector4, I = new THREE.Vector4, S = new THREE.Vector4, U = new THREE.Vector4, Z = new THREE.Vector3, ca = new THREE.Vector3, da = u.clone();
    da.transpose();
    var ea = function(a, b, c) {
        return !(n[3 * a] === n[3 * b] && n[3 * a + 1] === n[3 * b + 1] && n[3 * a + 2] === n[3 * b + 2] || n[3 * a] === n[3 * c] && n[3 * a + 1] === n[3 * c + 1] && n[3 * a + 2] === n[3 * c + 2] || n[3 * b] === n[3 * c] && n[3 * b + 1] === n[3 * c + 1] && n[3 * b + 2] === n[3 * c + 2])
    };
    for (w = 0; 3 > w; w++)
        A[w] = new THREE.Matrix4;
    var ha = c ? 32 : 28;
    c = b + 1;
    var ja = 0
      , ga = 0
      , ba = 0
      , aa = 0
      , fa = 0;
    for (e = e ? 0 : 20; e < ha; e++)
        if (d || 20 > e || 28 <= e) {
            for (w = 0; 3 > w; w++) {
                for (v = 0; 4 > v; v++)
                    for (x = 0; 4 > x; x++)
                        t[4 * x + v] = k[3 * h[16 * e + 4 * v + x] + w],
                        f && 20 <= e && 28 > e && 2 !== w && (t[4 * x + v] *= 1.077),
                        g || 2 !== w || (t[4 * x + v] *= 1.3);
                T.set(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
                R.multiplyMatrices(T, u);
                A[w].multiplyMatrices(da, R)
            }
            for (v = 0; v <= b; v++)
                for (N = v / b,
                x = 0; x <= b; x++) {
                    M = x / b;
                    C = 4;
                    for (w = K = 1; C--; )
                        E[C] = w,
                        y[C] = K,
                        w *= N,
                        K *= M,
                        3 === C ? (F[C] = z[C] = 0,
                        J = L = 1) : (F[C] = J * (3 - C),
                        z[C] = L * (3 - C),
                        J *= N,
                        L *= M);
                    P.fromArray(E);
                    I.fromArray(y);
                    S.fromArray(F);
                    U.fromArray(z);
                    for (w = 0; 3 > w; w++)
                        K = P.clone(),
                        K.applyMatrix4(A[w]),
                        B[w] = K.dot(I),
                        K = S.clone(),
                        K.applyMatrix4(A[w]),
                        H[w] = K.dot(I),
                        K = P.clone(),
                        K.applyMatrix4(A[w]),
                        G[w] = K.dot(U);
                    Z.fromArray(H);
                    ca.fromArray(G);
                    D.crossVectors(ca, Z);
                    D.normalize();
                    0 === B[0] && 0 === B[1] ? Q.set(0, B[2] > l ? 1 : -1, 0) : Q.set(D.x, D.z, -D.y);
                    n[ga++] = a * B[0];
                    n[ga++] = a * (B[2] - l);
                    n[ga++] = -a * B[1];
                    q[ba++] = Q.x;
                    q[ba++] = Q.y;
                    q[ba++] = Q.z;
                    p[aa++] = 1 - M;
                    p[aa++] = 1 - N
                }
            for (v = 0; v < b; v++)
                for (x = 0; x < b; x++)
                    w = ja * c * c + v * c + x,
                    N = w + 1,
                    M = N + c,
                    K = w + c,
                    ea(w, N, M) && (m[fa++] = w,
                    m[fa++] = N,
                    m[fa++] = M),
                    ea(w, M, K) && (m[fa++] = w,
                    m[fa++] = M,
                    m[fa++] = K);
            ja++
        }
    this.setIndex(new THREE.BufferAttribute(m,1));
    this.addAttribute("position", new THREE.BufferAttribute(n,3));
    this.addAttribute("normal", new THREE.BufferAttribute(q,3));
    this.addAttribute("uv", new THREE.BufferAttribute(p,2));
    this.computeBoundingSphere()
}
;
THREE.TeapotBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.TeapotBufferGeometry.prototype.constructor = THREE.TeapotBufferGeometry;
THREE.TeapotBufferGeometry.prototype.clone = function() {
    return new THREE.TeapotBufferGeometry(this.parameters.size,this.parameters.segments,this.parameters.bottom,this.parameters.lid,this.parameters.body,this.parameters.fitLid,this.parameters.blinn)
}
;
THREE.NodeMaterial = function(a, b) {
    THREE.ShaderMaterial.call(this);
    this.vertex = a || new THREE.NodeGL(new THREE.NodeProjectPosition);
    this.fragment = b || new THREE.NodeGL(new THREE.NodeColor(16711680))
}
;
THREE.NodeMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.NodeMaterial.prototype.constructor = THREE.NodeMaterial;
THREE.NodeMaterial.Type = {
    t: "sampler2D",
    tc: "samplerCube",
    bv1: "bool",
    iv1: "int",
    fv1: "float",
    c: "vec3",
    v2: "vec2",
    v3: "vec3",
    v4: "vec4"
};
THREE.NodeMaterial.GetShortcuts = function(a, b) {
    return {
        get: function() {
            return this[a][b]
        },
        set: function(c) {
            this[a][b] = c
        }
    }
}
;
THREE.NodeMaterial.Shortcuts = function(a, b, c) {
    for (var d = {}, e = 0; e < c.length; ++e) {
        var f = c[e];
        d[f] = this.GetShortcuts(b, f)
    }
    Object.defineProperties(a, d)
}
;
THREE.NodeMaterial.prototype.updateAnimation = function(a) {
    for (var b = 0; b < this.requestUpdate.length; ++b)
        this.requestUpdate[b].updateAnimation(a)
}
;
THREE.NodeMaterial.prototype.build = function() {
    var a, b;
    this.defines = {};
    this.uniforms = {};
    this.nodeData = {};
    this.vertexUniform = [];
    this.fragmentUniform = [];
    this.vertexTemps = [];
    this.fragmentTemps = [];
    this.uniformList = [];
    this.includes = [];
    this.requestUpdate = [];
    this.needsWorldPosition = this.needsTransparent = this.needsPosition = this.needsDerivatives = this.needsLight = this.needsColor = this.needsUv2 = this.needsUv = !1;
    this.fragmentNode = this.vertexNode = this.fragmentCode = this.vertexCode = this.fragmentPars = this.vertexPars = "";
    b = new THREE.NodeBuilder(this);
    a = this.vertex.build(b.setShader("vertex"), "v4");
    b = this.fragment.build(b.setShader("fragment"), "v4");
    this.needsUv && (this.addVertexPars("varying vec2 vUv;"),
    this.addFragmentPars("varying vec2 vUv;"),
    this.addVertexCode("vUv = uv;"));
    this.needsUv2 && (this.addVertexPars("varying vec2 vUv2; attribute vec2 uv2;"),
    this.addFragmentPars("varying vec2 vUv2;"),
    this.addVertexCode("vUv2 = uv2;"));
    this.needsColor && (this.addVertexPars("varying vec4 vColor; attribute vec4 color;"),
    this.addFragmentPars("varying vec4 vColor;"),
    this.addVertexCode("vColor = color;"));
    this.needsPosition && (this.addVertexPars("varying vec3 vPosition;"),
    this.addFragmentPars("varying vec3 vPosition;"),
    this.addVertexCode("vPosition = transformed;"));
    this.needsWorldPosition && (this.addVertexPars("varying vec3 vWPosition;"),
    this.addFragmentPars("varying vec3 vWPosition;"),
    this.addVertexCode("vWPosition = worldPosition.xyz;"));
    this.needsTransformedNormal && (this.addVertexPars("varying vec3 vTransformedNormal;"),
    this.addFragmentPars("varying vec3 vTransformedNormal;"),
    this.addVertexCode("vTransformedNormal = transformedNormal;"));
    this.extensions.derivatives = this.needsDerivatives;
    this.lights = this.needsLight;
    this.transparent = this.needsTransparent;
    this.vertexShader = [this.vertexPars, this.getCodePars(this.vertexUniform, "uniform"), this.getIncludes("vertex"), "void main(){", this.getCodePars(this.vertexTemps), a, this.vertexCode, "}"].join("\n");
    this.fragmentShader = [this.fragmentPars, this.getCodePars(this.fragmentUniform, "uniform"), this.getIncludes("fragment"), "void main(){", this.getCodePars(this.fragmentTemps), this.fragmentCode, b, "}"].join("\n");
    this.needsUpdate = !0;
    this.dispose();
    return this
}
;
THREE.NodeMaterial.prototype.define = function(a, b) {
    this.defines[a] = void 0 == b ? 1 : b
}
;
THREE.NodeMaterial.prototype.isDefined = function(a) {
    return void 0 != this.defines[a]
}
;
THREE.NodeMaterial.prototype.mergeUniform = function(a) {
    for (var b in a)
        this.uniforms[b] = a[b]
}
;
THREE.NodeMaterial.prototype.createUniform = function(a, b, c) {
    a = {
        type: b,
        value: a,
        needsUpdate: c,
        name: "nVu" + this.uniformList.length
    };
    this.uniformList.push(a);
    return a
}
;
THREE.NodeMaterial.prototype.getVertexTemp = function(a, b) {
    if (!this.vertexTemps[a]) {
        var c = {
            name: "nVt" + this.vertexTemps.length,
            type: b
        };
        this.vertexTemps.push(c);
        this.vertexTemps[a] = c
    }
    return this.vertexTemps[a]
}
;
THREE.NodeMaterial.prototype.getIncludes = function(a) {
    function b(a, b) {
        return b.deps - a.deps
    }
    return function(a) {
        a = this.includes[a];
        if (!a)
            return "";
        var d = "";
        a = a.sort(b);
        for (var e = 0; e < a.length; e++)
            d += THREE.NodeLib.nodes[a[e].name].src + "\n";
        return d
    }
}();
THREE.NodeMaterial.prototype.getFragmentTemp = function(a, b) {
    if (!this.fragmentTemps[a]) {
        var c = {
            name: "nVt" + this.fragmentTemps.length,
            type: b
        };
        this.fragmentTemps.push(c);
        this.fragmentTemps[a] = c
    }
    return this.fragmentTemps[a]
}
;
THREE.NodeMaterial.prototype.addVertexPars = function(a) {
    this.vertexPars += a + "\n"
}
;
THREE.NodeMaterial.prototype.addFragmentPars = function(a) {
    this.fragmentPars += a + "\n"
}
;
THREE.NodeMaterial.prototype.addVertexCode = function(a) {
    this.vertexCode += a + "\n"
}
;
THREE.NodeMaterial.prototype.addFragmentCode = function(a) {
    this.fragmentCode += a + "\n"
}
;
THREE.NodeMaterial.prototype.addVertexNode = function(a) {
    this.vertexNode += a + "\n"
}
;
THREE.NodeMaterial.prototype.clearVertexNode = function() {
    var a = this.fragmentNode;
    this.fragmentNode = "";
    return a
}
;
THREE.NodeMaterial.prototype.addFragmentNode = function(a) {
    this.fragmentNode += a + "\n"
}
;
THREE.NodeMaterial.prototype.clearFragmentNode = function() {
    var a = this.fragmentNode;
    this.fragmentNode = "";
    return a
}
;
THREE.NodeMaterial.prototype.getCodePars = function(a, b) {
    b = b || "";
    for (var c = "", d = 0, e = a.length; d < e; ++d) {
        var f = a[d].type
          , g = a[d].name
          , h = a[d].value;
        "t" == f && h instanceof THREE.CubeTexture && (f = "tc");
        h = THREE.NodeMaterial.Type[f];
        if (void 0 == h)
            throw Error("Node pars " + f + " not found.");
        c += b + " " + h + " " + g + ";\n"
    }
    return c
}
;
THREE.NodeMaterial.prototype.getVertexUniform = function(a, b, c) {
    a = this.createUniform(a, b, c);
    this.vertexUniform.push(a);
    this.vertexUniform[a.name] = a;
    return this.uniforms[a.name] = a
}
;
THREE.NodeMaterial.prototype.getFragmentUniform = function(a, b, c) {
    a = this.createUniform(a, b, c);
    this.fragmentUniform.push(a);
    this.fragmentUniform[a.name] = a;
    return this.uniforms[a.name] = a
}
;
THREE.NodeMaterial.prototype.getNodeData = function(a) {
    return this.nodeData[a] = this.nodeData[a] || {}
}
;
THREE.NodeMaterial.prototype.include = function(a, b) {
    var c = this.includes[a] = this.includes[a] || [];
    if (void 0 === c[b]) {
        var d = THREE.NodeLib.nodes[b];
        this.needsDerivatives = d.needsDerivatives || this.needsDerivatives;
        if (!d)
            throw Error("Library " + b + " not found!");
        c[b] = {
            name: b,
            deps: 1
        };
        c.push(c[b])
    } else
        ++c[b].deps
}
;
THREE.NodeBuilder = function(a) {
    this.material = a;
    this.isVerify = !1;
    this.cache = ""
}
;
THREE.NodeBuilder.prototype = {
    constructor: THREE.NodeBuilder,
    include: function(a) {
        this.material.include(this.shader, a)
    },
    getUuid: function(a) {
        this.cache && (a = this.cache + "-" + a);
        return a
    },
    setCache: function(a) {
        this.cache = a || "";
        return this
    },
    isShader: function(a) {
        return this.shader == a || this.isVerify
    },
    setShader: function(a) {
        this.shader = a;
        return this
    }
};
THREE.NodeGL = function(a) {
    this.uuid = THREE.Math.generateUUID();
    this.allow = {};
    this.type = a
}
;
THREE.NodeGL.prototype.verify = function(a) {
    a.isVerify = !0;
    var b = a.material;
    this.build(a, "v4");
    b.clearVertexNode();
    b.clearFragmentNode();
    a.setCache();
    a.isVerify = !1
}
;
THREE.NodeGL.prototype.verifyAndBuildCode = function(a, b, c) {
    this.verify(a.setCache(c));
    return this.buildCode(a.setCache(c), b)
}
;
THREE.NodeGL.prototype.buildCode = function(a, b, c) {
    var d = a.material;
    b = {
        result: this.build(a, b, c)
    };
    a.isShader("vertex") ? b.code = d.clearVertexNode() : b.code = d.clearFragmentNode();
    a.setCache();
    return b
}
;
THREE.NodeGL.prototype.verifyNodeDeps = function(a, b) {
    a.deps = (a.deps || 0) + 1;
    var c = this.getFormatLength(this.getFormat(b));
    if (c > a.outputMax || this.getType())
        a.outputMax = c,
        a.output = b
}
;
THREE.NodeGL.prototype.build = function(a, b, c) {
    var d = a.material
      , e = d.getNodeData(c || this.uuid);
    a.isShader("verify") && this.verifyNodeDeps(e, b);
    if (!1 === this.allow[a.shader])
        throw Error("Shader " + shader + " is not compatible with this node.");
    this.allow.requestUpdate && !e.requestUpdate && (d.requestUpdate.push(this),
    e.requestUpdate = !0);
    return this.generate(a, b, c)
}
;
THREE.NodeGL.prototype.getType = function() {
    return this.type
}
;
THREE.NodeGL.prototype.getFormat = function(a) {
    return a.replace("c", "v3").replace(/fv1|iv1/, "v1")
}
;
THREE.NodeGL.prototype.getFormatLength = function(a) {
    return parseInt(this.getFormat(a).substr(1))
}
;
THREE.NodeGL.prototype.getFormatByLength = function(a) {
    return 1 == a ? "fv1" : "v" + a
}
;
THREE.NodeGL.prototype.getFormatConstructor = function(a) {
    return THREE.NodeGL.formatConstructor[a - 1]
}
;
THREE.NodeGL.prototype.format = function(a, b, c) {
    switch (this.getFormat(b + "=" + c)) {
    case "v1=v2":
        return "vec2(" + a + ")";
    case "v1=v3":
        return "vec3(" + a + ")";
    case "v1=v4":
        return "vec4(" + a + ")";
    case "v2=v1":
        return a + ".x";
    case "v2=v3":
        return "vec3(" + a + ",0.0)";
    case "v2=v4":
        return "vec4(" + a + ",0.0,0.0)";
    case "v3=v1":
        return a + ".x";
    case "v3=v2":
        return a + ".xy";
    case "v3=v4":
        return "vec4(" + a + ",0.0)";
    case "v4=v1":
        return a + ".x";
    case "v4=v2":
        return a + ".xy";
    case "v4=v3":
        return a + ".xyz"
    }
    return a
}
;
THREE.NodeGL.prototype.generate = function(a, b) {
    return a.isShader("vertex") ? "gl_Position = " + this.value.generate(a, b) + ";" : "gl_FragColor = " + this.value.generate(a, b) + ";"
}
;
THREE.NodeGL.formatConstructor = ["", "vec2", "vec3", "vec4"];
THREE.NodeFunction = function(a, b) {
    var c = a.match(/^([a-z_0-9]+)\s([a-z_0-9]+)\s?\((.*)\)/i);
    this.output = c[1];
    this.name = c[2];
    this.src = a;
    this.needsDerivatives = void 0 !== b ? b : !1;
    this.params = [];
    for (var c = c[3].match(/[a-z_0-9]+/ig), d = 0; d < c.length; d += 2)
        this.params.push({
            name: c[d],
            type: c[d + 1]
        });
    THREE.NodeGL.call(this, "v3")
}
;
THREE.NodeFunction.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeFunction.prototype.constructor = THREE.NodeFunction;
THREE.NodeInput = function(a) {
    THREE.NodeGL.call(this, a)
}
;
THREE.NodeInput.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeInput.prototype.constructor = THREE.NodeInput;
THREE.NodeInput.prototype.generate = function(a, b, c, d) {
    var e = a.material;
    c = a.getUuid(c || this.uuid);
    d = d || this.type;
    var f = e.getNodeData(c);
    console.log(c, a.cache);
    if (a.isShader("vertex"))
        return f.vertex || (f.vertex = e.getVertexUniform(this.value, d)),
        this.format(f.vertex.name, d, b);
    f.fragment || (f.fragment = e.getFragmentUniform(this.value, d));
    return this.format(f.fragment.name, d, b)
}
;
THREE.NodeTemp = function(a) {
    THREE.NodeGL.call(this, a)
}
;
THREE.NodeTemp.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeTemp.prototype.constructor = THREE.NodeTemp;
THREE.NodeTemp.prototype.build = function(a, b, c) {
    var d = a.material;
    c = a.getUuid(c || this.uuid);
    var e = d.getNodeData(c);
    if (a.isShader("verify"))
        return e.deps ? (this.verifyNodeDeps(e, b),
        "") : THREE.NodeGL.prototype.build.call(this, a, b, c);
    if (1 == e.deps)
        return THREE.NodeGL.prototype.build.call(this, a, b, c);
    var f = this.getTemp(a, c)
      , g = e.output || this.getType();
    f || (f = THREE.NodeTemp.prototype.generate.call(this, a, b, c, e.output),
    c = this.generate(a, g, c),
    a.isShader("vertex") ? d.addVertexNode(f + "=" + c + ";") : d.addFragmentNode(f + "=" + c + ";"));
    return this.format(f, g, b)
}
;
THREE.NodeTemp.prototype.getTemp = function(a, b) {
    b = b || this.uuid;
    var c = a.material;
    if (a.isShader("vertex") && c.vertexTemps[b])
        return c.vertexTemps[b].name;
    if (c.fragmentTemps[b])
        return c.fragmentTemps[b].name
}
;
THREE.NodeTemp.prototype.generate = function(a, b, c, d) {
    c = c || this.uuid;
    return a.isShader("vertex") ? a.material.getVertexTemp(c, d || this.getType()).name : a.material.getFragmentTemp(c, d || this.getType()).name
}
;
THREE.NodeReference = function(a, b) {
    THREE.NodeGL.call(this, a);
    this.name = b
}
;
THREE.NodeReference.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeReference.prototype.constructor = THREE.NodeReference;
THREE.NodeReference.prototype.generate = function(a, b) {
    return this.format(this.name, this.type, b)
}
;
THREE.NodeLib = {
    nodes: {},
    add: function(a) {
        this.nodes[a.name] = a
    },
    remove: function(a) {
        delete this.nodes[a.name]
    }
};
THREE.NodeLib.add(new THREE.NodeFunction("vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 mUv, float scale ) {\nvec3 q0 = dFdx( eye_pos );\nvec3 q1 = dFdy( eye_pos );\nvec2 st0 = dFdx( mUv.st );\nvec2 st1 = dFdy( mUv.st );\nvec3 S = normalize( q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = map * 2.0 - 1.0;\nmapN.xy = scale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}",!0));
THREE.NodeLib.add(new THREE.NodeFunction("vec3 saturation_rgb(vec3 rgb, float adjustment) {\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nvec3 intensity = vec3(dot(rgb, W));\nreturn mix(intensity, rgb, adjustment);\n}"));
THREE.NodeLib.add(new THREE.NodeFunction("float luminance_rgb(vec3 rgb) {\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nreturn dot(rgb, W);\n}"));
THREE.NodeStandard = function() {
    THREE.NodeGL.call(this);
    this.color = new THREE.NodeColor(15658734);
    this.roughness = new THREE.NodeFloat(.5);
    this.metalness = new THREE.NodeFloat(.5)
}
;
THREE.NodeStandard.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeStandard.prototype.constructor = THREE.NodeStandard;
THREE.NodeStandard.prototype.build = function(a) {
    var b = a.material;
    b.define("STANDARD");
    b.define("ALPHATEST", "0.0");
    b.needsLight = !0;
    if (a.isShader("vertex"))
        a = this.transform ? this.transform.verifyAndBuildCode(a, "v3") : void 0,
        b.mergeUniform(THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap])),
        b.addVertexPars(["varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex].join("\n")),
        b = [THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", THREE.ShaderChunk.begin_vertex],
        a && (b.push(a.code),
        b.push("transformed = " + a.result + ";")),
        b.push(THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = - mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex);
    else {
        this.color.verify(a);
        this.roughness.verify(a);
        this.metalness.verify(a);
        this.alpha && this.alpha.verify(a);
        this.ao && this.ao.verify(a);
        this.ambient && this.ambient.verify(a);
        this.shadow && this.shadow.verify(a);
        this.emissive && this.emissive.verify(a);
        this.normal && this.normal.verify(a);
        this.normalScale && this.normal && this.normalScale.verify(a);
        this.environment && this.environment.verify(a.setCache("env"));
        this.reflectivity && this.environment && this.reflectivity.verify(a);
        var c = this.color.buildCode(a, "v4")
          , d = this.roughness.buildCode(a, "fv1")
          , e = this.metalness.buildCode(a, "fv1")
          , f = this.alpha ? this.alpha.buildCode(a, "fv1") : void 0
          , g = this.ao ? this.ao.buildCode(a, "c") : void 0
          , h = this.ambient ? this.ambient.buildCode(a, "c") : void 0
          , k = this.shadow ? this.shadow.buildCode(a, "c") : void 0
          , l = this.emissive ? this.emissive.buildCode(a, "c") : void 0
          , m = this.normal ? this.normal.buildCode(a, "v3") : void 0
          , p = this.normalScale && this.normal ? this.normalScale.buildCode(a, "fv1") : void 0
          , n = this.environment ? this.environment.buildCode(a.setCache("env"), "c") : void 0
          , q = this.reflectivity && this.environment ? this.reflectivity.buildCode(a, "fv1") : void 0;
        b.needsTransparent = void 0 != f;
        b.addFragmentPars(["varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.bsdfs, THREE.ShaderChunk.lights_pars, THREE.ShaderChunk.lights_standard_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment].join("\n"));
        b = [THREE.ShaderChunk.normal_fragment, "\tPhysicalMaterial material;", c.code, "\tvec4 diffuseColor = " + c.result + ";", "\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );", THREE.ShaderChunk.logdepthbuf_fragment, d.code, "\tfloat roughnessFactor = " + d.result + ";", e.code, "\tfloat metalnessFactor = " + e.result + ";"];
        f && b.push(f.code, "if ( " + f.result + " <= ALPHATEST ) discard;");
        m && (a.include("perturbNormal2Arb"),
        b.push(m.code),
        p && b.push(p.code),
        b.push("normal = perturbNormal2Arb(-vViewPosition,normal," + m.result + "," + (new THREE.NodeUV).build(a, "v2") + "," + (p ? p.result : "1.0") + ");"));
        b.push(THREE.ShaderChunk.shadowmap_fragment, "material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );", "material.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );", "material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );", THREE.ShaderChunk.lights_template);
        g && (b.push(g.code),
        b.push("reflectedLight.indirectDiffuse *= " + g.result + ";"));
        h && (b.push(h.code),
        b.push("reflectedLight.indirectDiffuse += " + h.result + ";"));
        k && (b.push(k.code),
        b.push("reflectedLight.directDiffuse *= " + k.result + ";"),
        b.push("reflectedLight.directSpecular *= " + k.result + ";"));
        l && (b.push(l.code),
        b.push("reflectedLight.directDiffuse += " + l.result + ";"));
        n && (b.push(n.code),
        b.push("Material_RE_IndirectSpecularLight(" + n.result + ", geometry, material, reflectedLight );"));
        q && (b.push(q.code),
        b.push("reflectedLight.indirectSpecular *= " + q.result + ";"));
        b.push("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular;");
        b.push(THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment);
        f ? b.push("gl_FragColor = vec4( outgoingLight, " + f.result + " );") : b.push("gl_FragColor = vec4( outgoingLight, 1.0 );")
    }
    return b.join("\n")
}
;
THREE.NodeStandardMaterial = function() {
    this.node = new THREE.NodeStandard;
    THREE.NodeMaterial.call(this, this.node, this.node)
}
;
THREE.NodeStandardMaterial.prototype = Object.create(THREE.NodeMaterial.prototype);
THREE.NodeStandardMaterial.prototype.constructor = THREE.NodeStandardMaterial;
THREE.NodeMaterial.Shortcuts(THREE.NodeStandardMaterial.prototype, "node", "color alpha roughness metalness normal normalScale emissive ambient shadow ao environment reflectivity transform".split(" "));
THREE.NodePhong = function() {
    THREE.NodeGL.call(this);
    this.color = new THREE.NodeColor(15658734);
    this.specular = new THREE.NodeColor(1118481);
    this.shininess = new THREE.NodeFloat(30)
}
;
THREE.NodePhong.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodePhong.prototype.constructor = THREE.NodePhong;
THREE.NodePhong.prototype.build = function(a) {
    var b = a.material;
    b.define("PHONG");
    b.define("ALPHATEST", "0.0");
    b.needsLight = !0;
    if (a.isShader("vertex"))
        a = this.transform ? this.transform.verifyAndBuildCode(a, "v3") : void 0,
        b.mergeUniform(THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap])),
        b.addVertexPars(["varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex].join("\n")),
        b = [THREE.ShaderChunk.beginnormal_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", THREE.ShaderChunk.begin_vertex],
        a && (b.push(a.code),
        b.push("transformed = " + a.result + ";")),
        b.push(THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = - mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex);
    else {
        this.color.verify(a);
        this.specular.verify(a);
        this.shininess.verify(a);
        this.alpha && this.alpha.verify(a);
        this.ao && this.ao.verify(a);
        this.ambient && this.ambient.verify(a);
        this.shadow && this.shadow.verify(a);
        this.emissive && this.emissive.verify(a);
        this.normal && this.normal.verify(a);
        this.normalScale && this.normal && this.normalScale.verify(a);
        this.environment && this.environment.verify(a);
        this.reflectivity && this.environment && this.reflectivity.verify(a);
        var c = this.color.buildCode(a, "v4")
          , d = this.specular.buildCode(a, "c")
          , e = this.shininess.buildCode(a, "fv1")
          , f = this.alpha ? this.alpha.buildCode(a, "fv1") : void 0
          , g = this.ao ? this.ao.buildCode(a, "c") : void 0
          , h = this.ambient ? this.ambient.buildCode(a, "c") : void 0
          , k = this.shadow ? this.shadow.buildCode(a, "c") : void 0
          , l = this.emissive ? this.emissive.buildCode(a, "c") : void 0
          , m = this.normal ? this.normal.buildCode(a, "v3") : void 0
          , p = this.normalScale && this.normal ? this.normalScale.buildCode(a, "fv1") : void 0
          , n = this.environment ? this.environment.buildCode(a.setCache("env"), "c") : void 0
          , q = this.reflectivity && this.environment ? this.reflectivity.buildCode(a, "fv1") : void 0;
        b.needsTransparent = void 0 != f;
        b.addFragmentPars([THREE.ShaderChunk.common, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.bsdfs, THREE.ShaderChunk.lights_pars, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment].join("\n"));
        b = [THREE.ShaderChunk.normal_fragment, c.code, "\tvec4 diffuseColor = " + c.result + ";", "\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );", THREE.ShaderChunk.logdepthbuf_fragment, d.code, "\tvec3 specular = " + d.result + ";", e.code, "\tfloat shininess = max(0.0001," + e.result + ");", "\tfloat specularStrength = 1.0;"];
        f && b.push(f.code, "if ( " + f.result + " <= ALPHATEST ) discard;");
        m && (a.include("perturbNormal2Arb"),
        b.push(m.code),
        p && b.push(p.code),
        b.push("normal = perturbNormal2Arb(-vViewPosition,normal," + m.result + "," + (new THREE.NodeUV).build(a, "v2") + "," + (p ? p.result : "1.0") + ");"));
        b.push(THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lights_template);
        g && (b.push(g.code),
        b.push("reflectedLight.indirectDiffuse *= " + g.result + ";"));
        h && (b.push(h.code),
        b.push("reflectedLight.indirectDiffuse += " + h.result + ";"));
        k && (b.push(k.code),
        b.push("reflectedLight.directDiffuse *= " + k.result + ";"),
        b.push("reflectedLight.directSpecular *= " + k.result + ";"));
        l && (b.push(l.code),
        b.push("reflectedLight.directDiffuse += " + l.result + ";"));
        b.push("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular;");
        n && (b.push(n.code),
        q ? (b.push(q.code),
        b.push("outgoingLight = mix(outgoingLight," + n.result + "," + q.result + ");")) : b.push("outgoingLight = " + n.result + ";"));
        b.push(THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment);
        f ? b.push("gl_FragColor = vec4( outgoingLight, " + f.result + " );") : b.push("gl_FragColor = vec4( outgoingLight, 1.0 );")
    }
    return b.join("\n")
}
;
THREE.NodePhongMaterial = function() {
    this.node = new THREE.NodePhong;
    THREE.NodeMaterial.call(this, this.node, this.node)
}
;
THREE.NodePhongMaterial.prototype = Object.create(THREE.NodeMaterial.prototype);
THREE.NodePhongMaterial.prototype.constructor = THREE.NodePhongMaterial;
THREE.NodeMaterial.Shortcuts(THREE.NodePhongMaterial.prototype, "node", "color alpha specular shininess normal normalScale emissive ambient shadow ao environment reflectivity transform".split(" "));
THREE.NodeCameraPosition = function() {
    THREE.NodeReference.call(this, "v3", "cameraPosition");
    this.allow.vertex = !1
}
;
THREE.NodeCameraPosition.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeCameraPosition.prototype.constructor = THREE.NodeCameraPosition;
THREE.NodeColor = function(a) {
    THREE.NodeInput.call(this, "c");
    this.value = new THREE.Color(a || 0)
}
;
THREE.NodeColor.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeColor.prototype.constructor = THREE.NodeColor;
THREE.NodeMaterial.Shortcuts(THREE.NodeColor.prototype, "value", ["r", "g", "b"]);
THREE.NodeConst = function(a) {
    THREE.NodeReference.call(this, "fv1", a || THREE.NodeConst.PI)
}
;
THREE.NodeConst.PI = "PI";
THREE.NodeConst.PI2 = "PI2";
THREE.NodeConst.RECIPROCAL_PI = "RECIPROCAL_PI";
THREE.NodeConst.RECIPROCAL_PI2 = "RECIPROCAL_PI2";
THREE.NodeConst.LOG2 = "LOG2";
THREE.NodeConst.EPSILON = "EPSILON";
THREE.NodeConst.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeConst.prototype.constructor = THREE.NodeConst;
THREE.NodeCubeTexture = function(a, b, c) {
    THREE.NodeInput.call(this, "v4");
    this.allow.vertex = !1;
    this.value = a;
    this.coord = b || new THREE.NodeReflect;
    this.bias = c
}
;
THREE.NodeCubeTexture.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeCubeTexture.prototype.constructor = THREE.NodeCubeTexture;
THREE.NodeCubeTexture.prototype.generate = function(a, b) {
    var c = THREE.NodeInput.prototype.generate.call(this, a, b, this.value.uuid, "t")
      , d = this.coord.build(a, "v3")
      , e = this.bias ? this.bias.build(a, "fv1") : void 0;
    void 0 == e && "env" == a.cache && (e = (new THREE.NodeSpecularMIPLevel).build(a, "fv1"));
    return this.format(e ? "textureCube(" + c + "," + d + "," + e + ")" : "textureCube(" + c + "," + d + ")", this.type, b)
}
;
THREE.NodeDepth = function(a, b, c) {
    THREE.NodeGL.call(this, "fv1");
    this.allow.vertex = !1;
    this.near = b || new THREE.NodeFloat(1);
    this.far = c || new THREE.NodeFloat(500)
}
;
THREE.NodeDepth.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeDepth.prototype.constructor = THREE.NodeDepth;
THREE.NodeDepth.prototype.generate = function(a, b) {
    var c = a.material
      , d = c.getNodeData(this.uuid);
    d.initied || (c.addFragmentPars("float depthcolor( float mNear, float mFar ) {\n#ifdef USE_LOGDEPTHBUF_EXT\nfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n#else\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#endif\nreturn 1.0 - smoothstep( mNear, mFar, depth );\n}"),
    d.initied = !0);
    c = this.near.build(a, "fv1");
    d = this.far.build(a, "fv1");
    return this.format("depthcolor(" + c + "," + d + ")", this.type, b)
}
;
THREE.NodeFloat = function(a) {
    THREE.NodeInput.call(this, "fv1");
    this.value = [a || 0]
}
;
THREE.NodeFloat.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeFloat.prototype.constructor = THREE.NodeFloat;
Object.defineProperties(THREE.NodeFloat.prototype, {
    number: {
        get: function() {
            return this.value[0]
        },
        set: function(a) {
            this.value[0] = a
        }
    }
});
THREE.NodeInt = function(a) {
    THREE.NodeInput.call(this, "fv1");
    this.value = [Math.floor(a || 0)]
}
;
THREE.NodeInt.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeInt.prototype.constructor = THREE.NodeInt;
Object.defineProperties(THREE.NodeInt.prototype, {
    number: {
        get: function() {
            return this.value[0]
        },
        set: function(a) {
            this.value[0] = Math.floor(a)
        }
    }
});
THREE.NodeJoin = function(a, b, c, d) {
    THREE.NodeGL.call(this, "fv1");
    this.x = a;
    this.y = b;
    this.z = d;
    this.w = c
}
;
THREE.NodeJoin.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeJoin.prototype.constructor = THREE.NodeJoin;
THREE.NodeJoin.inputs = ["x", "y", "z", "w"];
THREE.NodeJoin.prototype.getNumElements = function() {
    for (var a = THREE.NodeJoin.inputs, b = a.length; b--; )
        if (void 0 !== this[a[b]]) {
            ++b;
            break
        }
    return Math.max(b, 2)
}
;
THREE.NodeJoin.prototype.getType = function() {
    return this.getFormatByLength(this.getNumElements())
}
;
THREE.NodeJoin.prototype.generate = function(a, b) {
    for (var c = this.getType(), d = this.getNumElements(), e = THREE.NodeJoin.inputs, f = [], g = 0; g < d; g++) {
        var h = this[e[g]];
        f.push(h ? h.build(a, "fv1") : "0.")
    }
    d = this.getFormatConstructor(d) + "(" + f.join(",") + ")";
    return this.format(d, c, b)
}
;
THREE.NodeMath1 = function(a, b) {
    THREE.NodeTemp.call(this);
    this.a = a;
    this.method = b || THREE.NodeMath1.SINE
}
;
THREE.NodeMath1.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeMath1.prototype.constructor = THREE.NodeMath1;
THREE.NodeMath1.RADIANS = "radians";
THREE.NodeMath1.DEGREES = "degrees";
THREE.NodeMath1.EXPONENTIAL = "exp";
THREE.NodeMath1.EXPONENTIAL2 = "exp2";
THREE.NodeMath1.LOGARITHM = "log";
THREE.NodeMath1.LOGARITHM2 = "log2";
THREE.NodeMath1.INVERSE_SQUARE = "inversesqrt";
THREE.NodeMath1.FLOOR = "floor";
THREE.NodeMath1.CEILING = "ceil";
THREE.NodeMath1.NORMALIZE = "normalize";
THREE.NodeMath1.FRACTIONAL = "fract";
THREE.NodeMath1.SINE = "sin";
THREE.NodeMath1.COSINE = "cos";
THREE.NodeMath1.TANGENT = "tan";
THREE.NodeMath1.ARCSINE = "asin";
THREE.NodeMath1.ARCCOSINE = "acos";
THREE.NodeMath1.ARCTANGENT = "atan";
THREE.NodeMath1.ABSOLUTE = "abc";
THREE.NodeMath1.SIGN = "sign";
THREE.NodeMath1.LENGTH = "length";
THREE.NodeMath1.prototype.getType = function() {
    switch (this.method) {
    case THREE.NodeMath1.DISTANCE:
        return "fv1"
    }
    return this.a.getType()
}
;
THREE.NodeMath1.prototype.generate = function(a, b) {
    var c = this.getType()
      , d = this.a.build(a, c);
    return this.format(this.method + "(" + d + ")", c, b)
}
;
THREE.NodeMath2 = function(a, b, c) {
    THREE.NodeTemp.call(this);
    this.a = a;
    this.b = b;
    this.method = c || THREE.NodeMath2.MIN
}
;
THREE.NodeMath2.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeMath2.prototype.constructor = THREE.NodeMath2;
THREE.NodeMath2.MIN = "min";
THREE.NodeMath2.MAX = "max";
THREE.NodeMath2.MODULO = "mod";
THREE.NodeMath2.STEP = "step";
THREE.NodeMath2.REFLECT = "reflect";
THREE.NodeMath2.DISTANCE = "distance";
THREE.NodeMath2.DOT = "dot";
THREE.NodeMath2.CROSS = "cross";
THREE.NodeMath2.EXPONENTIATION = "pow";
THREE.NodeMath2.prototype.getInputType = function() {
    return this.getFormatLength(this.b.getType()) > this.getFormatLength(this.a.getType()) ? this.b.getType() : this.a.getType()
}
;
THREE.NodeMath2.prototype.getType = function() {
    switch (this.method) {
    case THREE.NodeMath2.DISTANCE:
    case THREE.NodeMath2.DOT:
        return "fv1";
    case THREE.NodeMath2.CROSS:
        return "v3"
    }
    return this.getInputType()
}
;
THREE.NodeMath2.prototype.generate = function(a, b) {
    var c = this.getInputType(), d;
    d = this.getFormatLength(this.a.getType());
    var e = this.getFormatLength(this.b.getType());
    switch (this.method) {
    case THREE.NodeMath2.CROSS:
        d = this.a.build(a, "v3");
        c = this.b.build(a, "v3");
        break;
    case THREE.NodeMath2.STEP:
        d = this.a.build(a, 1 == d ? "fv1" : c);
        c = this.b.build(a, c);
        break;
    case THREE.NodeMath2.MIN:
    case THREE.NodeMath2.MAX:
    case THREE.NodeMath2.MODULO:
        d = this.a.build(a, c);
        c = this.b.build(a, 1 == e ? "fv1" : c);
        break;
    default:
        d = this.a.build(a, c),
        c = this.b.build(a, c)
    }
    return this.format(this.method + "(" + d + "," + c + ")", this.getType(), b)
}
;
THREE.NodeMath3 = function(a, b, c, d) {
    THREE.NodeTemp.call(this);
    this.a = a;
    this.b = b;
    this.c = c;
    this.method = d || THREE.NodeMath3.MIX
}
;
THREE.NodeMath3.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeMath3.prototype.constructor = THREE.NodeMath3;
THREE.NodeMath3.MIX = "mix";
THREE.NodeMath3.REFRACT = "refract";
THREE.NodeMath3.SMOOTHSTEP = "smoothstep";
THREE.NodeMath3.FACEFORWARD = "faceforward";
THREE.NodeMath3.prototype.getType = function() {
    var a = this.getFormatLength(this.a.getType())
      , b = this.getFormatLength(this.b.getType())
      , c = this.getFormatLength(this.c.getType());
    return a > b ? a > c ? this.a.getType() : this.c.getType() : b > c ? this.b.getType() : this.c.getType()
}
;
THREE.NodeMath3.prototype.generate = function(a, b) {
    var c = this.getType(), d, e, f;
    this.getFormatLength(this.a.getType());
    this.getFormatLength(this.b.getType());
    f = this.getFormatLength(this.c.getType());
    switch (this.method) {
    case THREE.NodeMath3.REFRACT:
        d = this.a.build(a, c);
        e = this.b.build(a, c);
        f = this.c.build(a, "fv1");
        break;
    case THREE.NodeMath3.MIX:
    case THREE.NodeMath3.SMOOTHSTEP:
        d = this.a.build(a, c);
        e = this.b.build(a, c);
        f = this.c.build(a, 1 == f ? "fv1" : c);
        break;
    default:
        d = this.a.build(a, c),
        e = this.b.build(a, c),
        f = this.c.build(a, c)
    }
    return this.format(this.method + "(" + d + "," + e + "," + f + ")", c, b)
}
;
THREE.NodeOperator = function(a, b, c) {
    THREE.NodeTemp.call(this);
    this.op = c || "+";
    this.a = a;
    this.b = b
}
;
THREE.NodeOperator.prototype = Object.create(THREE.NodeTemp.prototype);
THREE.NodeOperator.prototype.constructor = THREE.NodeOperator;
THREE.NodeOperator.prototype.getType = function() {
    return this.getFormatLength(this.b.getType()) > this.getFormatLength(this.a.getType()) ? this.b.getType() : this.a.getType()
}
;
THREE.NodeOperator.prototype.generate = function(a, b) {
    a.material.getNodeData(this.uuid);
    var c = this.a.build(a, b)
      , d = this.b.build(a, b);
    return "(" + c + this.op + d + ")"
}
;
THREE.NodeProjectPosition = function() {
    THREE.NodeTemp.call(this, "v4")
}
;
THREE.NodeProjectPosition.prototype = Object.create(THREE.NodeTemp.prototype);
THREE.NodeProjectPosition.prototype.constructor = THREE.NodeGLPosition;
THREE.NodeProjectPosition.prototype.generate = function(a) {
    return builder.isShader("vertex") ? "(projectionMatrix * modelViewMatrix * vec4( position, 1.0 ))" : "vec4( 0.0 )"
}
;
THREE.NodeReflect = function() {
    THREE.NodeTemp.call(this, "v3");
    this.allow.vertex = !1
}
;
THREE.NodeReflect.prototype = Object.create(THREE.NodeTemp.prototype);
THREE.NodeReflect.prototype.constructor = THREE.NodeReflect;
THREE.NodeReflect.prototype.generate = function(a, b) {
    var c = a.material;
    c.getNodeData(this.uuid);
    c.needsWorldPosition = !0;
    if (a.isShader("fragment"))
        return c.addFragmentNode("vec3 cameraToVertex = normalize( vWPosition.xyz - cameraPosition );\nvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\nvec3 vReflect = reflect( cameraToVertex, worldNormal );"),
        this.format("vReflect", this.type, b)
}
;
THREE.NodeSwitch = function(a, b) {
    THREE.NodeGL.call(this, "fv1");
    this.component = b || "x";
    this.a = a
}
;
THREE.NodeSwitch.prototype = Object.create(THREE.NodeGL.prototype);
THREE.NodeSwitch.prototype.constructor = THREE.NodeSwitch;
THREE.NodeSwitch.elements = ["x", "y", "z", "w"];
THREE.NodeSwitch.prototype.generate = function(a, b) {
    var c = this.a.getType()
      , d = this.getFormatLength(c)
      , c = this.a.build(a, c)
      , e = THREE.NodeSwitch.elements.indexOf(this.component) + 1;
    1 < d && (d < e && (e = d),
    c = c + "." + THREE.NodeSwitch.elements[e - 1]);
    return this.format(c, this.type, b)
}
;
THREE.NodeTexture = function(a, b, c) {
    THREE.NodeInput.call(this, "v4");
    this.value = a;
    this.coord = b || new THREE.NodeUV;
    this.bias = c
}
;
THREE.NodeTexture.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeTexture.prototype.constructor = THREE.NodeTexture;
THREE.NodeTexture.prototype.getTemp = THREE.NodeTemp.prototype.getTemp;
THREE.NodeTexture.prototype.build = function(a, b, c) {
    return THREE.NodeTemp.prototype.build.call(this, a, b, c)
}
;
THREE.NodeTexture.prototype.generate = function(a, b) {
    var c = THREE.NodeInput.prototype.generate.call(this, a, b, this.value.uuid, "t")
      , d = this.coord.build(a, "v2")
      , e = this.bias ? this.bias.build(a, "fv1") : void 0;
    return this.format(e ? "texture2D(" + c + "," + d + "," + e + ")" : "texture2D(" + c + "," + d + ")", this.type, b)
}
;
THREE.NodeTimer = function(a) {
    THREE.NodeFloat.call(this, a);
    this.allow.requestUpdate = !0
}
;
THREE.NodeTimer.prototype = Object.create(THREE.NodeFloat.prototype);
THREE.NodeTimer.prototype.constructor = THREE.NodeTimer;
THREE.NodeTimer.prototype.updateAnimation = function(a) {
    this.number += a
}
;
THREE.NodeTransformedNormal = function() {
    THREE.NodeReference.call(this, "v3")
}
;
THREE.NodeTransformedNormal.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeTransformedNormal.prototype.constructor = THREE.NodeTransformedNormal;
THREE.NodeTransformedNormal.prototype.generate = function(a, b) {
    a.material.needsTransformedNormal = !0;
    a.isShader("vertex") ? this.name = "normal" : this.name = "vTransformedNormal";
    return THREE.NodeReference.prototype.generate.call(this, a, b)
}
;
THREE.NodeTransformedPosition = function() {
    THREE.NodeReference.call(this, "v3")
}
;
THREE.NodeTransformedPosition.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeTransformedPosition.prototype.constructor = THREE.NodeTransformedPosition;
THREE.NodeTransformedPosition.prototype.generate = function(a, b) {
    a.material.needsPosition = !0;
    a.isShader("vertex") ? this.name = "transformed" : this.name = "vPosition";
    return THREE.NodeReference.prototype.generate.call(this, a, b)
}
;
THREE.NodeUV = function(a) {
    this.uv2 = a || !1;
    THREE.NodeReference.call(this, "v2")
}
;
THREE.NodeUV.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeUV.prototype.constructor = THREE.NodeUV;
THREE.NodeUV.prototype.generate = function(a, b) {
    var c = a.material;
    c.needsUv = c.needsUv || !this.uv2;
    c.needsUv2 = c.needsUv2 || this.uv2;
    a.isShader("vertex") ? this.name = this.uv2 ? "uv2" : "uv" : this.name = this.uv2 ? "vUv2" : "vUv";
    return THREE.NodeReference.prototype.generate.call(this, a, b)
}
;
THREE.NodeVector2 = function(a, b) {
    THREE.NodeInput.call(this, "v2");
    this.value = new THREE.Vector2(a,b)
}
;
THREE.NodeVector2.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeVector2.prototype.constructor = THREE.NodeVector2;
THREE.NodeMaterial.Shortcuts(THREE.NodeVector2.prototype, "value", ["x", "y"]);
THREE.NodeVector3 = function(a, b, c) {
    THREE.NodeInput.call(this, "v3");
    this.type = "v3";
    this.value = new THREE.Vector3(a,b,c)
}
;
THREE.NodeVector3.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeVector3.prototype.constructor = THREE.NodeVector3;
THREE.NodeMaterial.Shortcuts(THREE.NodeVector3.prototype, "value", ["x", "y", "z"]);
THREE.NodeVector4 = function(a, b, c, d) {
    THREE.NodeInput.call(this, "v4");
    this.value = new THREE.Vector4(a,b,c,d)
}
;
THREE.NodeVector4.prototype = Object.create(THREE.NodeInput.prototype);
THREE.NodeVector4.prototype.constructor = THREE.NodeVector4;
THREE.NodeMaterial.Shortcuts(THREE.NodeVector4.prototype, "value", ["x", "y", "z", "w"]);
THREE.NodeViewNormal = function() {
    THREE.NodeReference.call(this, "v3")
}
;
THREE.NodeViewNormal.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeViewNormal.prototype.constructor = THREE.NodeViewNormal;
THREE.NodeViewNormal.prototype.generate = function(a, b) {
    a.isShader("vertex") ? this.name = "normal" : this.name = "vNormal";
    return THREE.NodeReference.prototype.generate.call(this, a, b)
}
;
THREE.NodeViewPosition = function() {
    THREE.NodeReference.call(this, "v3")
}
;
THREE.NodeViewPosition.prototype = Object.create(THREE.NodeReference.prototype);
THREE.NodeViewPosition.prototype.constructor = THREE.NodeViewPosition;
THREE.NodeViewPosition.prototype.generate = function(a, b) {
    a.isShader("vertex") ? this.name = "vec3(0)" : this.name = "vViewPosition";
    return THREE.NodeReference.prototype.generate.call(this, a, b)
}
;
THREE.NodeSpecularMIPLevel = function() {
    THREE.NodeTemp.call(this, "fv1");
    this.allow.vertex = !1
}
;
THREE.NodeSpecularMIPLevel.prototype = Object.create(THREE.NodeTemp.prototype);
THREE.NodeSpecularMIPLevel.prototype.constructor = THREE.NodeSpecularMIPLevel;
THREE.NodeSpecularMIPLevel.prototype.generate = function(a, b) {
    var c = a.material;
    c.getNodeData(this.uuid);
    c.needsWorldPosition = !0;
    if (a.isShader("fragment"))
        return c.isDefined("STANDARD") ? c.addFragmentNode("float specularMIPLevel = GGXRoughnessToBlinnExponent( 1.0 - material.specularRoughness );") : c.addFragmentNode("float specularMIPLevel = 0.0;"),
        this.format("specularMIPLevel", this.type, b)
}
;
(function() {
    function a(a) {
        this.object = a;
        this.target = new THREE.Vector3;
        this.minDistance = 0;
        this.maxDistance = Infinity;
        this.minZoom = 0;
        this.maxZoom = Infinity;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.minAzimuthAngle = -Infinity;
        this.maxAzimuthAngle = Infinity;
        this.enableDamping = !1;
        this.dampingFactor = .25;
        var c = this, d, e, f = 0, g = 0, h = 1, k = new THREE.Vector3, l = !1;
        this.getPolarAngle = function() {
            return e
        }
        ;
        this.getAzimuthalAngle = function() {
            return d
        }
        ;
        this.rotateLeft = function(a) {
            g -= a
        }
        ;
        this.rotateUp = function(a) {
            f -= a
        }
        ;
        this.panLeft = function() {
            var a = new THREE.Vector3;
            return function(b) {
                var c = this.object.matrix.elements;
                a.set(c[0], c[1], c[2]);
                a.multiplyScalar(-b);
                k.add(a)
            }
        }();
        this.panUp = function() {
            var a = new THREE.Vector3;
            return function(b) {
                var c = this.object.matrix.elements;
                a.set(c[4], c[5], c[6]);
                a.multiplyScalar(b);
                k.add(a)
            }
        }();
        this.pan = function(a, b, d, e) {
            c.object instanceof THREE.PerspectiveCamera ? (d = c.object.position.clone().sub(c.target).length(),
            d *= Math.tan(c.object.fov / 2 * Math.PI / 180),
            c.panLeft(2 * a * d / e),
            c.panUp(2 * b * d / e)) : c.object instanceof THREE.OrthographicCamera ? (c.panLeft(a * (c.object.right - c.object.left) / d),
            c.panUp(b * (c.object.top - c.object.bottom) / e)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
        }
        ;
        this.dollyIn = function(a) {
            c.object instanceof THREE.PerspectiveCamera ? h /= a : c.object instanceof THREE.OrthographicCamera ? (c.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * a)),
            c.object.updateProjectionMatrix(),
            l = !0) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
        }
        ;
        this.dollyOut = function(a) {
            c.object instanceof THREE.PerspectiveCamera ? h *= a : c.object instanceof THREE.OrthographicCamera ? (c.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / a)),
            c.object.updateProjectionMatrix(),
            l = !0) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
        }
        ;
        this.update = function() {
            var c = new THREE.Vector3
              , p = (new THREE.Quaternion).setFromUnitVectors(a.up, new THREE.Vector3(0,1,0))
              , n = p.clone().inverse()
              , q = new THREE.Vector3
              , u = new THREE.Quaternion;
            return function() {
                var a = this.object.position;
                c.copy(a).sub(this.target);
                c.applyQuaternion(p);
                d = Math.atan2(c.x, c.z);
                e = Math.atan2(Math.sqrt(c.x * c.x + c.z * c.z), c.y);
                d += g;
                e += f;
                d = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, d));
                e = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, e));
                e = Math.max(1E-6, Math.min(Math.PI - 1E-6, e));
                var b = c.length() * h
                  , b = Math.max(this.minDistance, Math.min(this.maxDistance, b));
                this.target.add(k);
                c.x = b * Math.sin(e) * Math.sin(d);
                c.y = b * Math.cos(e);
                c.z = b * Math.sin(e) * Math.cos(d);
                c.applyQuaternion(n);
                a.copy(this.target).add(c);
                this.object.lookAt(this.target);
                !0 === this.enableDamping ? (g *= 1 - this.dampingFactor,
                f *= 1 - this.dampingFactor) : f = g = 0;
                h = 1;
                k.set(0, 0, 0);
                return l || 1E-6 < q.distanceToSquared(this.object.position) || 1E-6 < 8 * (1 - u.dot(this.object.quaternion)) ? (q.copy(this.object.position),
                u.copy(this.object.quaternion),
                l = !1,
                !0) : !1
            }
        }()
    }
    THREE.OrbitControls = function(b, c) {
        function d(a, b) {
            var c = t.domElement === document ? t.domElement.body : t.domElement;
            u.pan(a, b, c.clientWidth, c.clientHeight)
        }
        function e() {
            return Math.pow(.95, t.zoomSpeed)
        }
        function f(a) {
            if (!1 !== t.enabled) {
                a.preventDefault();
                if (a.button === t.mouseButtons.ORBIT) {
                    if (!1 === t.enableRotate)
                        return;
                    G = H.ROTATE;
                    w.set(a.clientX, a.clientY)
                } else if (a.button === t.mouseButtons.ZOOM) {
                    if (!1 === t.enableZoom)
                        return;
                    G = H.DOLLY;
                    z.set(a.clientX, a.clientY)
                } else if (a.button === t.mouseButtons.PAN) {
                    if (!1 === t.enablePan)
                        return;
                    G = H.PAN;
                    E.set(a.clientX, a.clientY)
                }
                G !== H.NONE && (document.addEventListener("mousemove", g, !1),
                document.addEventListener("mouseup", h, !1),
                t.dispatchEvent(K))
            }
        }
        function g(a) {
            if (!1 !== t.enabled) {
                a.preventDefault();
                var b = t.domElement === document ? t.domElement.body : t.domElement;
                if (G === H.ROTATE) {
                    if (!1 === t.enableRotate)
                        return;
                    v.set(a.clientX, a.clientY);
                    x.subVectors(v, w);
                    u.rotateLeft(2 * Math.PI * x.x / b.clientWidth * t.rotateSpeed);
                    u.rotateUp(2 * Math.PI * x.y / b.clientHeight * t.rotateSpeed);
                    w.copy(v)
                } else if (G === H.DOLLY) {
                    if (!1 === t.enableZoom)
                        return;
                    A.set(a.clientX, a.clientY);
                    B.subVectors(A, z);
                    0 < B.y ? u.dollyIn(e()) : 0 > B.y && u.dollyOut(e());
                    z.copy(A)
                } else if (G === H.PAN) {
                    if (!1 === t.enablePan)
                        return;
                    y.set(a.clientX, a.clientY);
                    F.subVectors(y, E);
                    d(F.x, F.y);
                    E.copy(y)
                }
                G !== H.NONE && t.update()
            }
        }
        function h() {
            !1 !== t.enabled && (document.removeEventListener("mousemove", g, !1),
            document.removeEventListener("mouseup", h, !1),
            t.dispatchEvent(N),
            G = H.NONE)
        }
        function k(a) {
            if (!1 !== t.enabled && !1 !== t.enableZoom && G === H.NONE) {
                a.preventDefault();
                a.stopPropagation();
                var b = 0;
                void 0 !== a.wheelDelta ? b = a.wheelDelta : void 0 !== a.detail && (b = -a.detail);
                0 < b ? u.dollyOut(e()) : 0 > b && u.dollyIn(e());
                t.update();
                t.dispatchEvent(K);
                t.dispatchEvent(N)
            }
        }
        function l(a) {
            if (!1 !== t.enabled && !1 !== t.enableKeys && !1 !== t.enablePan)
                switch (a.keyCode) {
                case t.keys.UP:
                    d(0, t.keyPanSpeed);
                    t.update();
                    break;
                case t.keys.BOTTOM:
                    d(0, -t.keyPanSpeed);
                    t.update();
                    break;
                case t.keys.LEFT:
                    d(t.keyPanSpeed, 0);
                    t.update();
                    break;
                case t.keys.RIGHT:
                    d(-t.keyPanSpeed, 0),
                    t.update()
                }
        }
        function m(a) {
            if (!1 !== t.enabled) {
                switch (a.touches.length) {
                case 1:
                    if (!1 === t.enableRotate)
                        return;
                    G = H.TOUCH_ROTATE;
                    w.set(a.touches[0].pageX, a.touches[0].pageY);
                    break;
                case 2:
                    if (!1 === t.enableZoom)
                        return;
                    G = H.TOUCH_DOLLY;
                    var b = a.touches[0].pageX - a.touches[1].pageX;
                    a = a.touches[0].pageY - a.touches[1].pageY;
                    b = Math.sqrt(b * b + a * a);
                    z.set(0, b);
                    break;
                case 3:
                    if (!1 === t.enablePan)
                        return;
                    G = H.TOUCH_PAN;
                    E.set(a.touches[0].pageX, a.touches[0].pageY);
                    break;
                default:
                    G = H.NONE
                }
                G !== H.NONE && t.dispatchEvent(K)
            }
        }
        function p(a) {
            if (!1 !== t.enabled) {
                a.preventDefault();
                a.stopPropagation();
                var b = t.domElement === document ? t.domElement.body : t.domElement;
                switch (a.touches.length) {
                case 1:
                    if (!1 === t.enableRotate)
                        break;
                    if (G !== H.TOUCH_ROTATE)
                        break;
                    v.set(a.touches[0].pageX, a.touches[0].pageY);
                    x.subVectors(v, w);
                    u.rotateLeft(2 * Math.PI * x.x / b.clientWidth * t.rotateSpeed);
                    u.rotateUp(2 * Math.PI * x.y / b.clientHeight * t.rotateSpeed);
                    w.copy(v);
                    t.update();
                    break;
                case 2:
                    if (!1 === t.enableZoom)
                        break;
                    if (G !== H.TOUCH_DOLLY)
                        break;
                    b = a.touches[0].pageX - a.touches[1].pageX;
                    a = a.touches[0].pageY - a.touches[1].pageY;
                    a = Math.sqrt(b * b + a * a);
                    A.set(0, a);
                    B.subVectors(A, z);
                    0 < B.y ? u.dollyOut(e()) : 0 > B.y && u.dollyIn(e());
                    z.copy(A);
                    t.update();
                    break;
                case 3:
                    if (!1 === t.enablePan)
                        break;
                    if (G !== H.TOUCH_PAN)
                        break;
                    y.set(a.touches[0].pageX, a.touches[0].pageY);
                    F.subVectors(y, E);
                    d(F.x, F.y);
                    E.copy(y);
                    t.update();
                    break;
                default:
                    G = H.NONE
                }
            }
        }
        function n() {
            !1 !== t.enabled && (t.dispatchEvent(N),
            G = H.NONE)
        }
        function q(a) {
            a.preventDefault()
        }
        var u = new a(b);
        this.domElement = void 0 !== c ? c : document;
        Object.defineProperty(this, "constraint", {
            get: function() {
                return u
            }
        });
        this.getPolarAngle = function() {
            return u.getPolarAngle()
        }
        ;
        this.getAzimuthalAngle = function() {
            return u.getAzimuthalAngle()
        }
        ;
        this.enabled = !0;
        this.center = this.target;
        this.enableZoom = !0;
        this.zoomSpeed = 1;
        this.enableRotate = !0;
        this.rotateSpeed = 1;
        this.enablePan = !0;
        this.keyPanSpeed = 7;
        this.autoRotate = !1;
        this.autoRotateSpeed = 2;
        this.enableKeys = !0;
        this.keys = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            BOTTOM: 40
        };
        this.mouseButtons = {
            ORBIT: THREE.MOUSE.LEFT,
            ZOOM: THREE.MOUSE.MIDDLE,
            PAN: THREE.MOUSE.RIGHT
        };
        var t = this
          , w = new THREE.Vector2
          , v = new THREE.Vector2
          , x = new THREE.Vector2
          , E = new THREE.Vector2
          , y = new THREE.Vector2
          , F = new THREE.Vector2
          , z = new THREE.Vector2
          , A = new THREE.Vector2
          , B = new THREE.Vector2
          , H = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY: 4,
            TOUCH_PAN: 5
        }
          , G = H.NONE;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        var D = {
            type: "change"
        }
          , K = {
            type: "start"
        }
          , N = {
            type: "end"
        };
        this.update = function() {
            this.autoRotate && G === H.NONE && u.rotateLeft(2 * Math.PI / 60 / 60 * t.autoRotateSpeed);
            !0 === u.update() && this.dispatchEvent(D)
        }
        ;
        this.reset = function() {
            G = H.NONE;
            this.target.copy(this.target0);
            this.object.position.copy(this.position0);
            this.object.zoom = this.zoom0;
            this.object.updateProjectionMatrix();
            this.dispatchEvent(D);
            this.update()
        }
        ;
        this.dispose = function() {
            this.domElement.removeEventListener("contextmenu", q, !1);
            this.domElement.removeEventListener("mousedown", f, !1);
            this.domElement.removeEventListener("mousewheel", k, !1);
            this.domElement.removeEventListener("MozMousePixelScroll", k, !1);
            this.domElement.removeEventListener("touchstart", m, !1);
            this.domElement.removeEventListener("touchend", n, !1);
            this.domElement.removeEventListener("touchmove", p, !1);
            document.removeEventListener("mousemove", g, !1);
            document.removeEventListener("mouseup", h, !1);
            window.removeEventListener("keydown", l, !1)
        }
        ;
        this.domElement.addEventListener("contextmenu", q, !1);
        this.domElement.addEventListener("mousedown", f, !1);
        this.domElement.addEventListener("mousewheel", k, !1);
        this.domElement.addEventListener("MozMousePixelScroll", k, !1);
        this.domElement.addEventListener("touchstart", m, !1);
        this.domElement.addEventListener("touchend", n, !1);
        this.domElement.addEventListener("touchmove", p, !1);
        window.addEventListener("keydown", l, !1);
        this.update()
    }
    ;
    THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
    Object.defineProperties(THREE.OrbitControls.prototype, {
        object: {
            get: function() {
                return this.constraint.object
            }
        },
        target: {
            get: function() {
                return this.constraint.target
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: target is now immutable. Use target.set() instead.");
                this.constraint.target.copy(a)
            }
        },
        minDistance: {
            get: function() {
                return this.constraint.minDistance
            },
            set: function(a) {
                this.constraint.minDistance = a
            }
        },
        maxDistance: {
            get: function() {
                return this.constraint.maxDistance
            },
            set: function(a) {
                this.constraint.maxDistance = a
            }
        },
        minZoom: {
            get: function() {
                return this.constraint.minZoom
            },
            set: function(a) {
                this.constraint.minZoom = a
            }
        },
        maxZoom: {
            get: function() {
                return this.constraint.maxZoom
            },
            set: function(a) {
                this.constraint.maxZoom = a
            }
        },
        minPolarAngle: {
            get: function() {
                return this.constraint.minPolarAngle
            },
            set: function(a) {
                this.constraint.minPolarAngle = a
            }
        },
        maxPolarAngle: {
            get: function() {
                return this.constraint.maxPolarAngle
            },
            set: function(a) {
                this.constraint.maxPolarAngle = a
            }
        },
        minAzimuthAngle: {
            get: function() {
                return this.constraint.minAzimuthAngle
            },
            set: function(a) {
                this.constraint.minAzimuthAngle = a
            }
        },
        maxAzimuthAngle: {
            get: function() {
                return this.constraint.maxAzimuthAngle
            },
            set: function(a) {
                this.constraint.maxAzimuthAngle = a
            }
        },
        enableDamping: {
            get: function() {
                return this.constraint.enableDamping
            },
            set: function(a) {
                this.constraint.enableDamping = a
            }
        },
        dampingFactor: {
            get: function() {
                return this.constraint.dampingFactor
            },
            set: function(a) {
                this.constraint.dampingFactor = a
            }
        },
        noZoom: {
            get: function() {
                console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.");
                return !this.enableZoom
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.");
                this.enableZoom = !a
            }
        },
        noRotate: {
            get: function() {
                console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.");
                return !this.enableRotate
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.");
                this.enableRotate = !a
            }
        },
        noPan: {
            get: function() {
                console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.");
                return !this.enablePan
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.");
                this.enablePan = !a
            }
        },
        noKeys: {
            get: function() {
                console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.");
                return !this.enableKeys
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.");
                this.enableKeys = !a
            }
        },
        staticMoving: {
            get: function() {
                console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.");
                return !this.constraint.enableDamping
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.");
                this.constraint.enableDamping = !a
            }
        },
        dynamicDampingFactor: {
            get: function() {
                console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
                return this.constraint.dampingFactor
            },
            set: function(a) {
                console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
                this.constraint.dampingFactor = a
            }
        }
    })
}
)();
var PGUI = {
    style: function(a, b) {
        b = (b instanceof Array ? b.join(";") : b) || "";
        document.styleSheets[0].insertRule(".PGUI." + a + "{" + b + "}", 0)
    },
    element: function(a, b) {
        var c = document.createElement(b || "div");
        a && c.setAttribute("class", "PGUI " + a);
        return c
    },
    image: function(a, b, c, d, e) {
        var f = document.createElement("img");
        f.src = a;
        f.width = b;
        f.height = c;
        d && (f.alt = d);
        e && f.setAttribute("class", "PGUI " + e);
        return f
    },
    toRGB: function(a) {
        return {
            r: a >> 16 & 255,
            g: a >> 8 & 255,
            b: a & 255
        }
    }
};

document.styleSheets[0].insertRule(".PGUI {position:absolute;box-sizing:border-box;-o-user-select:none;-ms-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-moz-user-select:none;margin:0;padding:0}", 0);
PGUI.style("Image", ["margin-bottom:15px", "position:relative", "opacity:0.4"]);
PGUI.style("Image:hover", ["margin-bottom:15px", "position:relative", "opacity:1"]);
PGUI.style("ImageList.Base", ["width:100%", "height:100%", "overflow: hidden", "padding-top:20px", "margin-top:-10px"]);
PGUI.Image = function(a, b) {
    this._height = this._width = 180;
    this.body = PGUI.image(a, this._width, this._height, b, "Image");
    this.style = this.body.style;
    this.style.left = "calc(50% - " + Math.round(this._width / 2) + "px)"
}
;
PGUI.ImageList = function() {
    this.body = PGUI.element("ImageList");
    this.style = this.body.style;
    this.list = PGUI.element("ImageList Base");
    this.body.appendChild(this.list);
    this.images = [];
    this.y = this.x = 0;
    this.height = this.width = 100;
    this._backgroundColor = 3355443;
    this._backgroundAlpha = 1;
    this.backgroundColor = 3355443;
    this.backgroundAlpha = .5
}
;
PGUI.ImageList.prototype = {
    constructor: PGUI.ImageList,
    set x(a) {
        this._x = a;
        this.style.left = a + "px"
    },
    get x() {
        return this._x
    },
    set y(a) {
        this._y = a;
        this.style.top = a + "px"
    },
    get y() {
        return this._y
    },
    set width(a) {
        this._width = a;
        this.style.width = a + "px"
    },
    get width() {
        return this._width
    },
    set height(a) {
        this._height = a;
        this.style.height = a + "px"
    },
    get height() {
        return this._height
    },
    add: function(a) {
        this.list.appendChild(a.body);
        this.images.push(a)
    },
    toRight: function(a) {
        this.style.left = "calc(100% - " + (this._width + (a || 0)) + "px)"
    },
    toVertical: function(a) {
        this.y = void 0 == a ? this._y : a;
        this.style.height = "calc(100% - " + 2 * this._y + "px)"
    },
    set backgroundColor(a) {
        this._backgroundColor = a;
        this.updateBackground()
    },
    set backgroundAlpha(a) {
        this._backgroundAlpha = a;
        this.updateBackground()
    },
    updateBackground: function() {
        var a = PGUI.toRGB(this._backgroundColor);
        this.style["background-color"] = "rgba(" + [a.r, a.g, a.b, this._backgroundAlpha].join() + ")"
    },
    set parent(a) {
        this.dom != a && (this.dom && a.removeChild(this.body),
        (this.dom = a) && a.appendChild(this.body))
    },
    get parent() {
        return this.dom
    },
    update: function() {}
};
var UIL = UIL || function() {
    return {
        REVISION: "0.7-node",
        events: "onkeyup onkeydown onclick onchange onmouseover onmouseout onmousemove onmousedown onmouseup onmousewheel".split(" "),
        svgns: "http://www.w3.org/2000/svg",
        dragStart: function(a, b) {
            if (!document.tbFiller)
                return document.tbFiller = UIL.DOM(b ? "UIL " + b : "", "div", "pointer-events:auto;position:absolute;z-index:5000;left:0;top:0;width:100%;height:100%;background-color:transparent;" + (a ? "cursor:" + a : "")),
                document.body.appendChild(document.tbFiller),
                document.tbFiller
        },
        dragStop: function() {
            document.tbFiller && document.tbFiller.parentNode.removeChild(document.tbFiller);
            delete document.tbFiller
        },
        classDefine: function() {
            UIL.COLOR = "N";
            UIL.SELECT = "#035fcf";
            UIL.SELECTDOWN = "#024699";
            UIL.SVGB = "rgba(0,0,0,0.2)";
            UIL.SVGC = "rgba(120,120,120,0.6)";
            UIL.txt1 = 'font-family:"Open Sans", sans-serif; font-size:11px; color:#eeeeee; outline:0; padding:0px 10px; left:0; top:1px; height:17px; width:100px; overflow:hidden;';
            UIL.CC("UIL", "position:absolute; pointer-events:none; box-sizing:border-box; -o-user-select:none; -ms-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -moz-user-select:none; margin:0; padding:0;");
            UIL.CC("UIL.main", "width:100%;height:100%;overflow:hidden;background:none;");
            UIL.CC("UIL.menu", "width:100%; height:100%; overflow:hidden; background:none;");
            UIL.CC("UIL.context-menu", "width:100%; height:100%; overflow:hidden; background:none; z-index:1000;");
            UIL.CC("UIL.container", "position:absolute;overflow:hidden;width:100%;height:100%;overflow:hidden;background:none;");
            UIL.CC("UIL.editor", "z-index:1;width:100%;height:100%;overflow:hidden;background:none;");
            UIL.CC("UIL.grid", "pointer-events:auto;width:100%;height:100%;");
            UIL.CC("UIL.grab", "cursor:move;cursor:-moz-grab;cursor:-webkit-grab;");
            UIL.CC("UIL.grabbing", "cursor:move;cursor:-moz-grabbing;cursor:-webkit-grabbing;");
            UIL.CC("UIL.links", "width:100%;height:100%;overflow:hidden;background:none;position:absolute;");
            UIL.CC("UIL.preview", "position:absolute;top:0;left:0;pointer-events:none;width:100%;height:100%;");
            UIL.CC("UIL.node", "position:fixed;");
            UIL.CC("UIL.content", "position:initial;width:300px; overflow:hidden; background:none;");
            UIL.CC("UIL.mask", "width:400px; height:100%; margin-left:-50px; pointer-events:auto; cursor:col-resize; background:none; display:none;");
            UIL.CC("UIL.inner", "width:300px; top:0; left:0; height:auto; overflow:hidden; background:none;");
            UIL.CC("UIL.base", "position:relative; height:20px; overflow:hidden; pointer-events:auto;");
            UIL.CC("UIL.text", UIL.txt1);
            UIL.CC("input", "border:solid 1px rgba(0,0,0,0.2); background:rgba(0,0,0,0.2);", !0);
            UIL.CC("input:focus", "border: solid 1px rgba(0,0,0,0); background:rgba(0,0,0,0.6);", !0);
            UIL.CC("UIL.list", "box-sizing:content-box; border:20px solid transparent; border-bottom:10px solid transparent; left:80px; top:0px; width:190px; height:90px; overflow:hidden; cursor:s-resize; pointer-events:auto; display:none;");
            UIL.CC("UIL.list-in", "left:0; top:0; width:100%; background:rgba(0,0,0,0.2); ");
            UIL.CC("UIL.listItem", "position:relative; height:18px; background:rgba(0,0,0,0.2); border-bottom:1px solid rgba(0,0,0,0.2); pointer-events:auto; cursor:pointer;" + UIL.txt1);
            UIL.CC("UIL.listItem:hover", "background:" + UIL.SELECT + "; color:#FFFFFF;");
            UIL.CC("UIL.disconnect", "cursor:pointer;clip:rect(10px, 30px, 30px, 10px);margin-top:-10px;margin-left:-40px;width:40px;height:40px;position:fixed;pointer-events:auto;");
            UIL.CC("UIL.svgbox", 'left:100px; top:1px; width:190px; height:17px; pointer-events:auto; cursor:pointer; font-family:"Open Sans", sans-serif; font-size:11px; text-align:center;')
        },
        color: function(a, b) {
            if (a)
                return "#" == a.charAt(0) ? a : this.bgcolor(a, b)
        },
        bgcolor: function(a, b) {
            var c = 33
              , d = 33
              , e = 33;
            b = b || .98;
            if (a)
                switch (a.toUpperCase()) {
                case "R":
                    c = 180;
                    e = 38;
                    break;
                case "G":
                    d = 160;
                    e = 30;
                    break;
                case "B":
                    e = 180;
                    d = 48;
                    break;
                case "Y":
                    c = 200;
                    d = 160;
                    e = 30;
                    break;
                case "D":
                    d = e = c = 20;
                    break;
                case "O":
                    c = 200;
                    d = 100;
                    e = 0;
                    break;
                case "NO":
                    b = 0
                }
            c = "rgba(" + c + "," + d + "," + e + "," + b + ")";
            0 == b && (c = "none");
            return c
        },
        setSVG: function(a, b, c, d) {
            a.childNodes[d || 0].setAttributeNS(null, b, c)
        },
        setDOM: function(a, b, c) {
            a.style[b] = c + "px"
        },
        setStyle: function(a, b, c) {
            window.getComputedStyle(a).setProperty(b, c)
        },
        DOM: function(a, b, c, d, e) {
            b = b || "div";
            if ("rect" == b || "path" == b || "polygon" == b || "text" == b || "pattern" == b || "defs" == b || "g" == b || "line" == b) {
                void 0 == e && (e = document.createElementNS(this.svgns, "svg"));
                b = document.createElementNS(this.svgns, b);
                for (var f in d)
                    "txt" == f ? b.textContent = d[f] : b.setAttributeNS(null, f, d[f]);
                e.appendChild(b);
                a && e.setAttribute("class", a)
            } else
                void 0 == e && (e = document.createElement(b)),
                a && (e.className = a);
            c && (e.style.cssText = c);
            return e
        },
        CC: function(a, b, c) {
            var d = ".";
            c && (d = "");
            "*" == a && (d = "");
            c = document.createElement("style");
            c.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(c);
            (c.sheet || {}).insertRule ? c.sheet.insertRule(d + a + "{" + b + "}", 0) : (c.styleSheet || c.sheet).insertRule(d + a + "{" + b + "}", 0)
        }
    }
}();
UIL.ContextMenu = function(a) {
    this.dom = UIL.DOM("UIL context-menu", "div");
    this.editor = a.editor;
    this.width = a.width || 150;
    this.buttons = a.buttons || [];
    this.childrens = [];
    for (a = this.offset = 0; a < this.buttons.length; a++)
        this.add(this.buttons[a])
}
;
UIL.ContextMenu.prototype = {
    constructor: UIL.ContextMenu,
    add: function(a) {
        var b = function() {
            this.editor.unselect(this);
            a.onComplete()
        }
        .bind(this);
        a.split && (this.offset += 4);
        this.childrens.push(new UIL.Button({
            target: this.dom,
            onComplete: b,
            name: a.name,
            colorover: a.color,
            size: this.width,
            pos: {
                left: "0px",
                top: this.offset + "px"
            }
        }));
        this.offset += 20
    },
    show: function(a, b) {
        this.dom.style.top = (b || 0) + "px";
        this.dom.style.left = (a || 0) + "px";
        this.editor.select(this)
    },
    hide: function() {
        this.dom.parentNode.removeChild(this.dom);
        this.editor.unselect(this)
    }
};
UIL.NodeEditor = function(a) {
    this.main = UIL.DOM("UIL main");
    this.domContent = a.content || document.body;
    this.domContent.appendChild(this.main);
    this.dom = UIL.DOM("UIL editor");
    this.main.appendChild(this.dom);
    this.grid = UIL.DOM("UIL grid grab");
    this.dom.appendChild(this.grid);
    this.container = UIL.DOM("UIL container");
    this.dom.appendChild(this.container);
    this.preview = UIL.DOM("UIL preview", "canvas");
    this.dom.appendChild(this.preview);
    this.links = UIL.DOM("UIL links");
    this.dom.appendChild(this.links);
    this.menu = UIL.DOM("UIL menu", "div", "z-index:10000");
    this.dom.appendChild(this.menu);
    this.nodes = [];
    this.createLinks();
    this.mouseY = this.mouseX = this.y = this.x = 0;
    this.onResizeEditor = function(a) {
        this.resize();
        if (this.onResize)
            this.onResize(this)
    }
    .bind(this);
    this.onMouseMove = function(a) {
        UIL.dragStart(null, "grabbing");
        var c = a.clientX;
        a = a.clientY;
        this.x += c - this.mouseX;
        this.y += a - this.mouseY;
        this.mouseX = c;
        this.mouseY = a;
        this.update()
    }
    .bind(this);
    this.onMouseUp = function(a) {
        UIL.dragStop();
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp)
    }
    .bind(this);
    this.center = function() {
        this.updateCoords();
        this.x = document.documentElement.clientWidth / 2 + -(this.coords.bounds.x + this.coords.bounds.w / 2);
        this.y = document.documentElement.clientHeight / 2 + -(this.coords.bounds.y + this.coords.bounds.h / 2);
        this.update()
    }
    .bind(this);
    this.main.ondragover = function(a) {
        a.preventDefault()
    }
    .bind(this);
    this.main.ondrop = function(a) {
        a.preventDefault();
        for (var c = {
            x: -this.x + a.clientX,
            y: -this.y + a.clientY
        }, d = 0; d < a.dataTransfer.files.length; d++) {
            var e = a.dataTransfer.files[d]
              , f = e.name.split(".").pop().toLowerCase();
            if (this.onDropImage && ("png" == f || "jpg" == f || "gif" == f))
                this.onDropImage(e, c)
        }
        this.main.node && !this.main.node.visible && this.main.node.dispose();
        delete this.main.node;
        this.update()
    }
    .bind(this);
    this.onDropNode = function(a) {
        window.removeEventListener("mouseup", this.onDropNode);
        (a = UIL.draggingNode) && !a.visible && a.dispose();
        delete UIL.dragging;
        delete UIL.draggingNode;
        this.update()
    }
    .bind(this);
    this.main.onmousemove = function(a) {
        if (UIL.dragging) {
            void 0 == UIL.draggingNode && (UIL.draggingNode = new UIL["Node" + UIL.dragging.attached](this),
            window.addEventListener("mouseup", this.onDropNode));
            var c = UIL.draggingNode;
            c.visible = 0 < a.clientX || 0 < a.clientY;
            if (c.visible)
                c.x = -this.x + (a.clientX - c.width / 2),
                c.y = -this.y + (a.clientY - c.getH() / 2),
                this.updateTransform();
            else
                this.onDropNode(a)
        }
    }
    .bind(this);
    this.grid.onmousedown = function(a) {
        this.select();
        this.mouseX = a.clientX;
        this.mouseY = a.clientY;
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp)
    }
    .bind(this);
    window.addEventListener("resize", this.onResizeEditor);
    this.update()
}
;
UIL.NodeEditor.prototype = {
    constructor: UIL.NodeEditor,
    add: function(a) {
        this.nodes.push(a)
    },
    remove: function(a) {
        a.disconnectAll();
        this.container.removeChild(a.dom);
        this.nodes.splice(this.nodes.indexOf(a), 1);
        this.update()
    },
    createLinks: function() {
        this.canvas && (this.map.parentNode.removeChild(this.map),
        this.canvas.parentNode.removeChild(this.canvas),
        this.front.parentNode.removeChild(this.front));
        this.canvas = UIL.DOM("UIL canvas-links", "canvas");
        this.canvas.width = this.links.offsetWidth;
        this.canvas.height = this.links.offsetHeight;
        this.context = this.canvas.getContext("2d");
        this.front = UIL.DOM("UIL canvas-links", "canvas", "z-index:10");
        this.front.width = this.links.offsetWidth;
        this.front.height = this.links.offsetHeight;
        this.frontContext = this.front.getContext("2d");
        this.aspectY = this.aspectX = 1;
        this.links.offsetWidth > this.links.offsetHeight ? (this.aspectX = 1,
        this.aspectY = this.links.offsetHeight / this.links.offsetWidth) : (this.aspectX = this.links.offsetWidth / this.links.offsetHeight,
        this.aspectY = 1);
        this.map = UIL.DOM("UIL map", "canvas", "pointer-events:auto;z-index:100;position:absolute;top:10px;right:10px;");
        this.map.width = 300 * this.aspectX;
        this.map.height = 300 * this.aspectY;
        this.mapContext = this.map.getContext("2d");
        this.onMapDragStop = function() {
            delete this.dragging;
            this.map.className = "UIL map";
            UIL.dragStop();
            window.removeEventListener("mousemove", this.onMapDragging);
            window.removeEventListener("mouseup", this.onMapDragStop)
        }
        .bind(this);
        this.onMapDragging = function(a) {
            var b = a.clientX;
            a = a.clientY;
            this.x += (b - this.mouseX) * -(this.coords.srcWidth / this.map.width);
            this.y += (a - this.mouseY) * -(this.coords.srcHeight / this.map.height);
            this.mouseX = b;
            this.mouseY = a;
            this.update()
        }
        .bind(this);
        this.onMapDrag = function(a, b) {
            var c = a.layerX
              , d = a.layerY
              , e = this.coords.screen;
            c > e.x && c < e.x + e.w && d > e.y && d < e.y + e.h ? (this.map.className = "UIL map grab",
            b && (this.mouseX = a.clientX,
            this.mouseY = a.clientY,
            UIL.dragStart(null, "grabbing"),
            window.addEventListener("mousemove", this.onMapDragging),
            window.addEventListener("mouseup", this.onMapDragStop),
            this.dragging = !0)) : this.map.className = "UIL map"
        }
        .bind(this);
        this.map.onmousedown = function(a) {
            this.onMapDrag(a, !0)
        }
        .bind(this);
        this.map.onmousemove = function(a) {
            if (!this.dragging)
                this.onMapDrag(a)
        }
        .bind(this);
        this.map.onmouseout = function(a) {
            if (!this.dragging)
                this.onMapDragStop()
        }
        .bind(this);
        this.main.appendChild(this.map);
        this.main.appendChild(this.canvas);
        this.main.appendChild(this.front)
    },
    updateCoords: function() {
        var a = [], b, c, d, e, f, g, h = this.map.width, k = this.map.height;
        b = this.links.offsetWidth;
        for (var l = this.links.offsetHeight, m = this.nodes.length; m--; )
            b = this.nodes[m],
            c = {
                node: b,
                x: b.x,
                y: b.y,
                w: b.width,
                h: b.getH()
            },
            void 0 == d ? (d = c.x,
            e = c.y,
            g = c.x + c.w,
            f = c.y + c.h) : (d = Math.min(d, c.x),
            e = Math.min(e, c.y),
            g = Math.max(g, c.x + c.w),
            f = Math.max(f, c.y + c.h)),
            a.push(c);
        m = g - d;
        c = f - e;
        var p = .5 * m
          , n = .5 * c
          , q = this.links.offsetWidth * this.aspectX
          , u = this.links.offsetHeight * this.aspectY;
        b = this.links.offsetWidth;
        var l = this.links.offsetHeight
          , t = b - d - 100
          , w = l - e - 100
          , v = -g + 100
          , x = -f + 100;
        this.x > t ? this.x = t : this.x < v && (this.x = v);
        this.y > w ? this.y = w : this.y < x && (this.y = x);
        c > l && (b += (c - l) * this.aspectX,
        l = c);
        m > b && (l += (m - b) * this.aspectY,
        b = m);
        b += 2 * q;
        l += 2 * u;
        q = b / 2;
        u = l / 2;
        t = (q + (-this.x - d) - p) / b * h;
        w = (u + (-this.y - e) - n) / l * k;
        v = this.links.offsetWidth / b * h;
        x = this.links.offsetHeight / l * k;
        for (m = this.nodes.length; m--; )
            c = a[m],
            c.sx = (q + (c.x - d) - p) / b * h,
            c.sy = (u + (c.y - e) - n) / l * k,
            c.sw = c.w / b * h,
            c.sh = c.h / l * k;
        this.coords = {
            bounds: {
                x: d,
                y: e,
                w: g,
                h: f
            },
            screen: {
                x: t,
                y: w,
                w: v,
                h: x
            },
            nodes: a,
            srcWidth: b,
            srcHeight: l,
            mapWidth: h,
            mapHeight: k
        }
    },
    updateMap: function() {
        this.mapContext.clearRect(0, 0, this.coords.mapWidth, this.coords.mapHeight);
        this.mapContext.fillStyle = "rgba(30, 30, 30, 0.98)";
        this.mapContext.fillRect(0, 0, this.coords.mapWidth, this.coords.mapHeight);
        for (var a = this.coords.nodes.length; a--; ) {
            var b = this.coords.nodes[a];
            this.mapContext.fillStyle = UIL.bgcolor(b.node.uis[0].color);
            this.mapContext.fillRect(b.sx, b.sy, b.sw, b.sh)
        }
        a = this.coords.screen;
        this.mapContext.fillStyle = "rgba(200, 200, 200, 0.5)";
        this.mapContext.fillRect(a.x, a.y, a.w, a.h)
    },
    select: function(a) {
        var b = this.selected;
        a != b && (this.selected = null,
        b && b.hide(),
        this.selected = a) && (this.selected instanceof UIL.Node && (this.nodes.splice(this.nodes.indexOf(this.selected), 1),
        this.nodes.push(this.selected)),
        this.container.appendChild(this.selected.dom))
    },
    unselect: function(a) {
        a == this.selected && this.select()
    },
    update: function() {
        this.updateCoords();
        this.updateTransform();
        this.updateLinks();
        this.updateMap()
    },
    resize: function() {
        this.createLinks();
        this.update();
        this.preview.width = this.links.offsetWidth;
        this.preview.height = this.links.offsetHeight
    },
    updateTransform: function() {
        for (var a = this.nodes.length; a--; )
            this.nodes[a].updateTransform()
    },
    updateLinks: function(a) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.frontContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        a && this.drawLine(a.x1, a.y1, a.x2, a.y2, a.invert, !0, 2);
        for (a = this.nodes.length; a--; )
            for (var b = this.nodes[a], c = b.uis.length; c--; ) {
                var d = b.uis[c]
                  , e = d.connection;
                if (e)
                    for (var f = d.input, g = e.output, h = g.getBoundingClientRect(), k = f.getBoundingClientRect(), d = [h.left + d.ioSize - 2, h.top + d.ioSize / 2, k.left + 2, k.top + e.ioSize / 2], e = Math.max(g.type, f.type), g = g.type - 1, h = f.type - 1, f = 0; f < e; f++) {
                        var k = 2 * Math.min(f, g)
                          , l = 2 * Math.min(f, h);
                        this.drawLine(d[0], d[1] + k - 2 * g / 2, d[2], d[3] + l - 2 * h / 2)
                    }
            }
    },
    drawLine: function(a, b, c, d, e, f, g) {
        f = f ? this.frontContext : this.context;
        e = 100 * (e ? -1 : 1);
        f.beginPath();
        f.moveTo(a, b);
        f.bezierCurveTo(a + e, b, c - e, d, c, d);
        f.lineWidth = g || 1;
        f.strokeStyle = "white";
        f.stroke()
    },
    dispose: function() {
        window.removeEventListener("resize", this.resize)
    }
};
UIL.Node = function(a, b, c, d, e) {
    this.editor = a;
    this.y = this.x = 0;
    this.width = 300;
    this.lockwheel = this.isCenter = !1;
    this.uis = [];
    this.dom = UIL.DOM("UIL node", "div");
    this.editor.container.appendChild(this.dom);
    this.content = UIL.DOM("UIL content", "div");
    this.dom.appendChild(this.content);
    this.mask = UIL.DOM("UIL mask", "div");
    this.dom.appendChild(this.mask);
    this.inner = UIL.DOM("UIL inner");
    this.content.appendChild(this.inner);
    this.changeWidth();
    this.down = !1;
    this.f = [];
    this.window = this.add("window", {
        name: b,
        color: c || "b",
        context: d
    });
    this.preview = this.add("preview", {
        name: b
    });
    e && (this.name = this.add("string", {
        name: "name"
    }));
    this.isRoot = function() {
        return 0 == this.getLinks().length
    }
    .bind(this);
    this.startDrag = function(a) {
        this.window.startDrag(a)
    }
    .bind(this);
    this.disconnectAll = function() {
        for (var a = this.uis.length; a--; )
            this.uis[a].disconnectAll()
    }
    .bind(this);
    this.dom.onmousedown = function(a) {
        this.editor.select(this)
    }
    .bind(this);
    this.resize();
    this.editor.add(this)
}
;
UIL.Node.prototype = {
    constructor: UIL.Node,
    set visible(a) {
        this.dom.style.display = a ? "" : "none"
    },
    get visible() {
        return "none" != this.dom.style.display
    },
    redraw: function() {
        this.visible && (this.dom.style.display = "none",
        this.dom.offsetHeight,
        this.dom.style.display = "")
    },
    updateTransform: function() {
        this.dom.style.left = this.editor.x + this.x + "px";
        this.dom.style.top = this.editor.y + this.y + "px";
        this.redraw()
    },
    update: function() {
        this.updateTransform();
        -1 < this.editor.nodes.indexOf(this) && this.editor.update()
    },
    getParents: function(a) {
        void 0 == a ? a = [] : -1 == a.indexOf(this) && a.push(this);
        for (var b = this.getLinks(), c = b.length; c--; )
            b[c].node.getParents(a);
        return a
    },
    getRoots: function(a) {
        a = a || [];
        var b = this.getLinks()
          , c = b.length;
        if (0 < c)
            for (; c--; )
                b[c].node.getRoots(a);
        else
            -1 == a.indexOf(this) && a.push(this);
        return a
    },
    getLinks: function() {
        for (var a = this.uis.length, b = []; a--; )
            for (var c = this.uis[a].links, d = c.length; d--; )
                b.push(c[d]);
        return b
    },
    isRecursive: function(a) {
        if (this == a)
            return !0;
        a = a || this;
        for (var b = this.getLinks(), c = b.length; c--; )
            if (b[c].node.isRecursive(a))
                return !0;
        return !1
    },
    show: function() {
        for (var a = this.uis.length; a--; )
            this.uis[a].show();
        this.editor.select(this)
    },
    hide: function() {
        for (var a = this.uis.length; a--; )
            this.uis[a].hide();
        this.editor.unselect(this)
    },
    add: function(a, b) {
        var c;
        b = b || {};
        b.node = this;
        switch (a) {
        case "button":
            c = new UIL.Button(b);
            break;
        case "string":
            c = new UIL.String(b);
            break;
        case "number":
            c = new UIL.Number(b);
            break;
        case "title":
            c = new UIL.Title(b);
            break;
        case "color":
            c = new UIL.Color(b);
            break;
        case "slide":
            c = new UIL.Slide(b);
            break;
        case "bool":
            c = new UIL.Bool(b);
            break;
        case "list":
            c = new UIL.List(b);
            break;
        case "group":
            c = new UIL.Group(b);
            break;
        case "window":
            c = new UIL.Window(b);
            break;
        case "preview":
            c = new UIL.Preview(b)
        }
        this.uis.push(c);
        return c
    },
    resize: function(a) {
        this.height = window.innerHeight - 5;
        this.content.style.height = this.height + "px";
        this.zone = this.height - 40;
        this.update()
    },
    remove: function(a) {
        a = this.uis.indexOf(a);
        -1 !== a && (this.uis[a].clear(),
        this.uis.splice(a, 1))
    },
    clear: function() {
        for (var a = this.uis.length; a--; )
            this.uis[a].clear(),
            this.uis.pop();
        this.uis = [];
        this.update()
    },
    getH: function() {
        for (var a = this.uis.length, b = 0; a--; )
            b += this.uis[a].h;
        return b
    },
    changeWidth: function() {
        UIL.setDOM(this.content, "width", this.width);
        var a = 0;
        this.isCenter && (a = .5 * -this.width,
        UIL.setDOM(this.content, "margin-left", a));
        UIL.setDOM(this.mask, "margin-left", a - 50);
        UIL.setDOM(this.mask, "width", this.width + 100);
        UIL.setDOM(this.inner, "width", this.width);
        for (a = this.uis.length; a--; )
            this.uis[a].setSize(),
            this.uis[a].rSize()
    },
    liner: function(a) {
        return UIL.DOM("UIL", "line", "width:100%; height:1px; bottom:0px;", {
            x1: 0,
            y1: 0,
            x2: "100%",
            y2: 0,
            stroke: a || "rgba(0,0,0,0.5)",
            "stroke-width": 1,
            "stroke-linecap": "butt"
        })
    },
    dispose: function() {
        if (this.onDispose)
            this.onDispose(this);
        this.editor.remove(this)
    }
};
UIL.classDefine();
UIL.Proto = function(a) {
    a = a || {};
    a.size = a.size || (a.node ? a.node.size : null) || 300;
    this.node = a.node;
    this.mono = !1;
    this.liner = null;
    this.setSize(a.size);
    this.h = 20;
    this.color = a.color || "";
    this.txt = a.name || "Proto";
    this.target = a.target;
    this.tag = a.tag;
    this.onChange = a.onChange;
    this.onComplete = a.onComplete;
    this.ioSize = a.ioSize || 10;
    this.c = [];
    this.f = [];
    this.links = [];
    this.c[0] = UIL.DOM("UIL base", "div", a.cc || "");
    this.attached = a.attached;
    if (a.draggable || a.attached)
        this.c[0].onmousedown = function(a) {
            UIL.dragging = this
        }
        .bind(this);
    this.c[1] = UIL.DOM("UIL text");
    this.node && (this.c[1].textContent = this.txt);
    if (a.pos) {
        this.c[0].style.position = "absolute";
        for (var b in a.pos)
            this.c[0].style[b] = a.pos[b];
        this.mono = !0
    } else
        this.node && (this.liner = this.node.liner(),
        this.c[0].appendChild(this.liner));
    this.onIOMouseUp = function(a) {
        UIL.nodeOver && UIL.nodeOver != this.node && (UIL.nodeOver.output && this.element == this.input ? this.setConnection(UIL.nodeOver) : UIL.nodeOver.input && this.element == this.output && UIL.nodeOver.setConnection(this));
        delete this.element;
        this.node.editor.update();
        window.removeEventListener("mousemove", this.onIOMouseMove);
        window.removeEventListener("mouseup", this.onIOMouseUp)
    }
    .bind(this);
    this.onIOMouseMove = function(a) {
        var b = this.element.getBoundingClientRect()
          , e = this.element == this.input;
        this.node.editor.updateLinks({
            x1: b.left + 10 * (e ? 0 : 1),
            y1: b.top + this.ioSize / 2,
            x2: a.clientX,
            y2: a.clientY,
            invert: e
        });
        delete UIL.nodeLink
    }
    .bind(this);
    this.c[0].addEventListener("mouseover", this.onIOMouseOut = function(a) {
        UIL.nodeOver = this
    }
    .bind(this));
    this.c[0].addEventListener("mouseout", function(a) {
        delete UIL.nodeOver
    }
    .bind(this));
    this.onIOMouseDown = function(a) {
        this.node.update();
        this.element = a.currentTarget;
        UIL.nodeLink = this.node;
        window.addEventListener("mousemove", this.onIOMouseMove);
        window.addEventListener("mouseup", this.onIOMouseUp)
    }
    .bind(this);
    this.onIOMouseDown = function(a) {
        this.node.update();
        this.element = a.currentTarget;
        UIL.nodeLink = this.node;
        window.addEventListener("mousemove", this.onIOMouseMove);
        window.addEventListener("mouseup", this.onIOMouseUp)
    }
    .bind(this);
    this.onDMouseOver = function(a) {
        UIL.setSVG(this.disconnect, "fill", "rgba(255,0,0,1)")
    }
    .bind(this);
    this.onDMouseOut = function(a) {
        UIL.setSVG(this.disconnect, "fill", "#FFF")
    }
    .bind(this);
    this.onDisconnect = function(a) {
        this.setConnection();
        this.node.update()
    }
    .bind(this);
    this.getUid = function(a) {
        var b = a.node.uis.indexOf(a);
        a = a.links.indexOf(this);
        return b + ":" + a
    }
    .bind(this);
    this.setConnection = function(a) {
        if (this.connection != a) {
            this.connection && this.connection.links.splice(this.connection.links.indexOf(this), 1);
            if (this.connection = a)
                this.connection.links.push(this),
                this.connection.node.isRecursive() && (this.connection.links.splice(this.connection.links.indexOf(this), 1),
                this.connection = null);
            this.disconnect.style.display = this.connection ? "block" : "none";
            if (this.connection && this.connection.onOutput)
                this.connection.onOutput(this);
            this.onInput && !1 === this.onInput(this.connection) && this.setConnection()
        }
    }
    .bind(this);
    a.input && (this.input = this.createIO(this.ioSize),
    this.input.type = a.inputType || 3,
    this.onInput = a.onInput,
    this.input.style["margin-left"] = -this.ioSize / 2 + "px",
    a.inputColor && (this.input.style["border-color"] = a.inputColor),
    this.c[0].appendChild(this.input),
    this.disconnect = UIL.DOM("UIL disconnect", "div", "display:none"),
    this.disconnect.innerHTML = UIL.Icon("del"),
    this.c[0].appendChild(this.disconnect),
    this.input.onmousedown = this.onIOMouseDown,
    this.disconnect.onmouseover = this.onDMouseOver,
    this.disconnect.onmouseout = this.onDMouseOut,
    this.disconnect.onmousedown = this.onDisconnect);
    a.output && (this.output = this.createIO(this.ioSize),
    this.output.type = a.outputType || 3,
    a.outputColor && (this.output.style["border-color"] = a.outputColor),
    this.onOutput = a.onOutput,
    this.output.style["margin-left"] = this.node.width + -this.ioSize / 2 + "px",
    this.c[0].appendChild(this.output),
    this.output.onmousedown = this.onIOMouseDown)
}
;
UIL.Proto.prototype = {
    constructor: UIL.Proto,
    init: function() {
        this.c[0].style.background = UIL.bgcolor(this.color);
        for (var a = 0; a < this.c.length; a++)
            0 == a ? this.target ? this.target.appendChild(this.c[0]) : this.node.inner.appendChild(this.c[0]) : this.c[0].appendChild(this.c[a]);
        this.rSize()
    },
    disconnectAll: function() {
        for (; this.links.length; )
            this.links[0].setConnection()
    },
    createIO: function(a) {
        a = UIL.DOM("UIL io", "div", "z-index:10000;border:2px solid #eeeeee;width:" + a + "px;height:" + a + "px;margin-top:" + (-a / 2 + this.h / 2) + "px;position:fixed; background:#000; border-radius:8px; cursor:alias; pointer-events:auto;");
        a.element = this;
        return a
    },
    setCallBack: function(a) {
        this.callback && (this.callback = null);
        this.callback = a
    },
    setSize: function(a) {
        this.size = a;
        this.node ? (this.sa = 1 * (this.size / 3).toFixed(0),
        this.sb = 1 * (2 * this.sa - 10).toFixed(0)) : (this.sa = 1,
        this.sb = a - 2)
    },
    setDom: function(a, b, c) {
        this.c[a].style[b] = c + "px"
    },
    setSvg: function(a, b, c, d) {
        this.c[a].childNodes[d || 0].setAttributeNS(null, b, c)
    },
    clear: function() {
        for (var a = UIL.events, b = this.c.length, c; b--; ) {
            if (0 == b)
                null !== this.liner && (this.c[0].removeChild(this.liner),
                this.liner = null),
                null !== this.target ? this.target.removeChild(this.c[0]) : this.node.inner.removeChild(this.c[0]);
            else {
                for (c = a.length; c--; )
                    null !== this.c[b][a[c]] && (this.c[b][a[c]] = null);
                this.c[b].children && this.clearDOM(this.c[b]);
                this.c[0].removeChild(this.c[b])
            }
            this.c[b] = null
        }
        this.c = null;
        if (this.f) {
            for (b = this.f.length; b--; )
                this.f[b] = null;
            this.f = null
        }
        this.callback && (this.callback = null);
        this.value && (this.value = null)
    },
    clearDOM: function(a) {
        for (; a.children.length; ) {
            if (a.lastChild.children)
                for (; a.lastChild.children.length; )
                    a.lastChild.removeChild(a.lastChild.lastChild);
            a.removeChild(a.lastChild)
        }
    },
    setTypeNumber: function(a) {
        this.min = -Infinity;
        this.max = Infinity;
        this.precision = 2;
        void 0 !== a.precision && (this.precision = a.precision);
        this.step = .01;
        switch (this.precision) {
        case 0:
            this.step = 1;
            break;
        case 1:
            this.step = .1;
            break;
        case 2:
            this.step = .01;
            break;
        case 3:
            this.step = .001;
            break;
        case 4:
            this.step = 1E-4
        }
        void 0 !== a.min && (this.min = a.min);
        void 0 !== a.max && (this.max = a.max);
        void 0 !== a.step && (this.step = a.step)
    },
    numValue: function(a) {
        return 1 * Math.min(this.max, Math.max(this.min, a)).toFixed(this.precision)
    },
    rSize: function() {
        this.c[0].style.width = this.size + "px";
        this.node && (this.c[1].style.width = this.sa + "px")
    },
    show: function() {},
    hide: function() {}
};
UIL.Group = function(a) {
    UIL.Proto.call(this, a);
    this.h = 25;
    this.isOpen = !1;
    this.c[2] = UIL.DOM("UIL", "div", "top:25px; overflow:hidden;");
    this.c[3] = UIL.DOM("UIL", "path", "position:absolute; width:16px; left:" + (this.sa + this.sb - 17) + "px; top:4px; pointer-events:none;", {
        width: 16,
        height: 16,
        d: "M 6 4 L 10 8 6 12",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.setDom(0, "height", this.h);
    this.setDom(1, "height", this.h);
    this.setDom(1, "top", 0);
    this.c[1].style.pointerEvents = "auto";
    this.c[1].style.cursor = "pointer";
    this.c[1].name = "group";
    this.setDom(1, "top", 4);
    this.uis = [];
    this.f[0] = function() {
        this.isOpen ? this.close() : this.open();
        this.node.calc()
    }
    .bind(this);
    this.c[1].onclick = this.f[0];
    this.init()
}
;
UIL.Group.prototype = Object.create(UIL.Proto.prototype);
UIL.Group.prototype.constructor = UIL.Group;
UIL.Group.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(3, "left", this.sa + this.sb - 17);
    this.setDom(1, "width", this.size);
    this.setDom(2, "width", this.size);
    for (var a = this.uis.length; a--; )
        this.uis[a].setSize(),
        this.uis[a].rSize();
    this.calc()
}
;
UIL.Group.prototype.add = function(a, b) {
    b.target = this.c[2];
    UIL.Node.prototype.add.call(this, a, b)
}
;
UIL.Group.prototype.calc = function() {
    if (this.isOpen) {
        this.h = 25;
        for (var a = this.uis.length; a--; )
            this.h += this.uis[a].h;
        this.setDom(2, "height", this.h - 25);
        this.setDom(0, "height", this.h)
    }
}
;
UIL.Group.prototype.open = function() {
    this.isOpen = !0;
    this.setSvg(3, "d", "M 12 6 L 8 10 4 6");
    this.calc();
    this.node.update()
}
;
UIL.Group.prototype.close = function() {
    this.isOpen = !1;
    this.setSvg(3, "d", "M 6 4 L 10 8 6 12");
    this.h = 25;
    this.setDom(2, "height", 0);
    this.setDom(0, "height", this.h);
    this.node.update()
}
;
UIL.Group.prototype.clear = function() {
    this.clearGroup();
    UIL.Proto.prototype.clear.call(this)
}
;
UIL.Group.prototype.clearGroup = function() {
    for (var a = this.uis.length; a--; )
        this.uis[a].clear(),
        this.uis.pop();
    this.uis = [];
    this.calc()
}
;
UIL.Title = function(a) {
    UIL.Proto.call(this, a);
    this.h = a.height || 31;
    var b = a.id || 0;
    a = a.prefix || "";
    this.c[2] = UIL.DOM("UIL text", "div", "text-align:right; width:40px; padding:0px 5px;");
    31 == this.h && (this.setDom(0, "height", this.h),
    this.setDom(1, "top", 8),
    this.setDom(2, "top", 8));
    var c = b || 0;
    10 > b && (c = "0" + b);
    this.c[1].textContent = this.txt.substring(0, 1).toUpperCase() + this.txt.substring(1).replace("-", " ");
    this.c[2].textContent = a.toUpperCase() + " " + c;
    this.init()
}
;
UIL.Title.prototype = Object.create(UIL.Proto.prototype);
UIL.Title.prototype.constructor = UIL.Title;
UIL.Title.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(1, "width", this.size - 50);
    this.setDom(2, "left", this.size - 76)
}
;
UIL.Title.prototype.text = function(a) {
    this.c[1].textContent = a
}
;
UIL.Title.prototype.text2 = function(a) {
    this.c[2].textContent = a
}
;
UIL.String = function(a) {
    UIL.Proto.call(this, a);
    this.value = a.value || "";
    this.allway = a.allway || !1;
    this.c[2] = UIL.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px;");
    this.c[2].name = "input";
    this.f[0] = function(a) {
        13 === a.keyCode && (this.callback(a.target.value),
        a.target.blur());
        a.stopPropagation()
    }
    .bind(this);
    this.f[1] = function(a) {
        this.allway && this.callback(a.target.value);
        a.stopPropagation()
    }
    .bind(this);
    this.c[2].value = this.value;
    this.c[2].onkeydown = this.f[0];
    this.c[2].onkeyup = this.f[1];
    this.init()
}
;
UIL.String.prototype = Object.create(UIL.Proto.prototype);
UIL.String.prototype.constructor = UIL.String;
UIL.String.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(2, "width", this.sb);
    this.setDom(2, "left", this.sa)
}
;
UIL.Number = function(a) {
    UIL.Proto.call(this, a);
    a.value = a.value || [];
    this.setTypeNumber(a);
    this.value = a.value;
    this.mask = this.mono ? null : this.node.mask;
    a.value && (this.value = a.value);
    this.length = this.value.length;
    this.w = (this.size / 3 * 2 - 5) / this.length - 5;
    this.current = null;
    for (a = this.length; a--; )
        this.c[2 + a] = UIL.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px; width:" + this.w + "px; left:" + (this.size / 3 + this.w * a + 5 * a) + "px;"),
        this.c[2 + a].name = a,
        this.c[2 + a].value = this.value[a];
    this.mask || (this.c[2 + this.length] = UIL.DOM("UIL mask", "div"),
    this.mask = this.c[2 + this.length]);
    this.f[0] = function(a) {
        if (13 === a.keyCode) {
            this.current = parseFloat(a.target.name);
            this.f[4](this.current);
            if (this.onChange)
                this.onChange(this);
            a.target.blur()
        }
    }
    .bind(this);
    this.f[1] = function(a) {
        this.current = parseFloat(a.target.name);
        void 0 != this.current && (a.preventDefault(),
        this.prev = {
            x: a.clientX,
            y: a.clientY,
            d: 0,
            id: this.current + 2
        },
        this.prev.v = parseFloat(this.value[this.current]),
        this.mask.style.display = "block",
        window.addEventListener("mousemove", this.f[2]),
        window.addEventListener("mouseup", this.f[3]))
    }
    .bind(this);
    this.f[2] = function(a) {
        if (this.dragStart) {
            this.prev.d += a.clientX - this.prev.x - (a.clientY - this.prev.y);
            this.value[this.current] = this.numValue(this.prev.v + this.prev.d * this.step);
            this.c[this.prev.id].value = this.value[this.current];
            if (this.onChange)
                this.onChange(this);
            this.prev.x = a.clientX;
            this.prev.y = a.clientY
        } else
            UIL.dragStart("col-resize"),
            this.dragStart = !0
    }
    .bind(this);
    this.f[3] = function(a) {
        document.body.style.cursor = "inherit";
        this.mask.style.display = "none";
        window.removeEventListener("mousemove", this.f[2]);
        window.removeEventListener("mouseup", this.f[3]);
        delete this.dragStart;
        UIL.dragStop();
        2 > Math.abs(this.prev.d) && (this.c[this.prev.id].focus(),
        this.c[this.prev.id].select())
    }
    .bind(this);
    this.f[4] = function(a) {
        isNaN(this.c[2 + a].value) ? this.c[2 + a].value = this.value[a] : this.value[a] = this.c[2 + a].value
    }
    .bind(this);
    for (a = 0; a < this.length; a++)
        this.c[2 + a].onkeydown = this.f[0],
        this.c[2 + a].onmousedown = this.f[1];
    this.init()
}
;
UIL.Number.prototype = Object.create(UIL.Proto.prototype);
UIL.Number.prototype.constructor = UIL.Number;
UIL.Number.prototype.setValue = function(a) {
    for (var b = a.length; b--; )
        this.c[b + 2].value = a[b];
    if (this.onChange)
        this.onChange(this)
}
;
UIL.Number.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.w = (this.sb + 5) / this.length - 5;
    for (var a = this.length; a--; )
        this.setDom(2 + a, "left", this.sa + this.w * a + 5 * a),
        this.setDom(2 + a, "width", this.w)
}
;
UIL.Color = function(a) {
    UIL.Proto.call(this, a);
    this.width = this.sb;
    this.oldWidth = 0;
    this.side = a.side || "down";
    this.holdTop = 0;
    this.wheelWidth = .1 * this.width;
    this.decal = 22;
    this.radius = .5 * (this.width - this.wheelWidth) - 1;
    this.square = Math.floor(.7 * (this.radius - .5 * this.wheelWidth)) - 1;
    this.mid = Math.floor(.5 * this.width);
    this.markerSize = .3 * this.wheelWidth;
    this.c[2] = UIL.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px;");
    this.c[2].spellcheck = !1;
    "up" == this.side && (this.decal = 5,
    this.c[2].style.top = "auto",
    this.c[2].style.bottom = "2px");
    this.c[3] = UIL.DOM("UIL", "rect", "left:" + this.sa + "px;  top:" + this.decal + "px; width:" + this.width + "px; height:" + this.width + "px;", {
        x: this.mid - this.square,
        y: this.mid - this.square,
        width: 2 * this.square - 1,
        height: 2 * this.square - 1,
        fill: "#000"
    });
    this.c[4] = UIL.DOM("UIL", "canvas", "left:" + this.sa + "px;  top:" + this.decal + "px; display:none;");
    this.c[5] = UIL.DOM("UIL", "canvas", "left:" + this.sa + "px;  top:" + this.decal + "px; pointer-events:auto; cursor:pointer; display:none;");
    "up" == this.side && (this.c[5].style.pointerEvents = "none");
    this.c[4].width = this.c[4].height = this.width;
    this.c[5].width = this.c[5].height = this.width;
    this.ctxMask = this.c[4].getContext("2d");
    this.ctxOverlay = this.c[5].getContext("2d");
    this.ctxMask.translate(this.mid, this.mid);
    this.ctxOverlay.translate(this.mid, this.mid);
    this.hsl = null;
    this.value = "#000000";
    a.value && (a.value instanceof Array ? this.value = UIL.pack(a.value) : isNaN(a.value) ? this.value = a.value : this.value = UIL.numFormat(a.value));
    this.bcolor = null;
    this.isShow = this.down = !1;
    this.f[0] = function(a) {
        this.show()
    }
    .bind(this);
    this.f[1] = function(a) {
        this.down || (this.down = !0,
        this.c[5].onmousemove = this.f[2],
        this.c[5].onmouseup = this.f[3]);
        this.offset = this.c[5].getBoundingClientRect();
        var c = this.widgetCoords(a);
        this.circleDrag = Math.max(Math.abs(c.x), Math.abs(c.y)) > this.square + 2;
        this.f[2](a);
        return !1
    }
    .bind(this);
    this.f[2] = function(a) {
        var c = this.widgetCoords(a);
        this.circleDrag ? (a = Math.atan2(c.x, -c.y) / 6.28,
        this.setHSL([(a + 1) % 1, this.hsl[1], this.hsl[2]])) : (a = Math.max(0, Math.min(1, -(c.x / this.square * .5) + .5)),
        c = Math.max(0, Math.min(1, -(c.y / this.square * .5) + .5)),
        this.setHSL([this.hsl[0], a, c]));
        return !1
    }
    .bind(this);
    this.f[3] = function(a) {
        this.c[5].onmouseup = null;
        this.c[5].onmousemove = null;
        this.down = !1
    }
    .bind(this);
    this.c[2].onmousedown = this.f[0];
    this.setColor(this.value);
    this.f[4] = function(a) {
        if (13 == a.keyCode) {
            var c = this.c[2].value;
            "0x" == c.substr(0, 2) && (c = "#" + c.substr(2));
            "#" != c.charAt(0) && (c = "#" + c);
            this.setColor(c)
        }
        a.stopPropagation()
    }
    .bind(this);
    this.c[2].onkeydown = this.f[4];
    this.init()
}
;
UIL.Color.prototype = Object.create(UIL.Proto.prototype);
UIL.Color.prototype.constructor = UIL.Color;
UIL.Color.prototype.redraw = function() {
    this.oldWidth = this.width;
    this.drawCircle();
    this.drawMask();
    this.drawMarkers()
}
;
UIL.Color.prototype.show = function() {
    this.isShow || (this.oldWidth !== this.width && this.redraw(),
    this.isShow = !0,
    this.h = this.width + 30,
    this.c[0].style.height = this.h + "px",
    "up" == this.side && (this.holdTop = 1 * this.c[0].style.top.substring(0, this.c[0].style.top.length - 2) || "auto",
    isNaN(this.holdTop) || (this.c[0].style.top = this.holdTop - (this.h - 20) + "px"),
    setTimeout(function() {
        this.c[5].style.pointerEvents = "auto"
    }
    .bind(this), 100)),
    this.c[3].style.display = "block",
    this.c[4].style.display = "block",
    this.c[5].style.display = "block",
    this.c[5].onmousedown = this.f[1],
    this.node && this.node.update())
}
;
UIL.Color.prototype.hide = function() {
    this.isShow && (this.isShow = !1,
    this.h = 20,
    "up" == this.side && (isNaN(this.holdTop) || (this.c[0].style.top = this.holdTop + "px"),
    this.c[5].style.pointerEvents = "none"),
    this.c[0].style.height = this.h + "px",
    this.c[3].style.display = "none",
    this.c[4].style.display = "none",
    this.c[5].style.display = "none",
    this.c[5].onmousedown = null,
    this.c[5].onmouseout = null,
    this.node && this.node.update())
}
;
UIL.Color.prototype.updateDisplay = function() {
    this.invert = .6 >= .3 * this.rgb[0] + .59 * this.rgb[1] + .11 * this.rgb[2];
    this.setSvg(3, "fill", UIL.pack(UIL.HSL2RGB([this.hsl[0], 1, .5])));
    this.drawMarkers();
    this.value = this.bcolor;
    this.c[2].value = this.bcolor.toUpperCase();
    var a = this.invert ? "#fff" : "#000";
    this.c[2].style["background-color"] = this.bcolor;
    this.c[2].style.color = a;
    if (this.onChange)
        this.onChange(this)
}
;
UIL.Color.prototype.setColor = function(a) {
    var b = UIL.unpack(a);
    this.bcolor != a && b && (this.bcolor = a,
    this.rgb = b,
    this.hsl = UIL.RGB2HSL(this.rgb),
    this.updateDisplay());
    return this
}
;
UIL.Color.prototype.getColor = function() {
    return parseInt("0x" + this.bcolor.substr(1))
}
;
UIL.Color.prototype.setHSL = function(a) {
    this.hsl = a;
    this.rgb = UIL.HSL2RGB(a);
    this.bcolor = UIL.pack(this.rgb);
    this.updateDisplay();
    return this
}
;
UIL.Color.prototype.calculateMask = function(a, b, c) {
    for (var d = 1 / a, e = 1 / b, f = 0; f <= b; ++f)
        for (var g = 1 - f * e, h = 0; h <= a; ++h) {
            var k = 1 - h * d
              , k = 1 - 2 * Math.min(g * k, (1 - g) * k);
            c(h, f, 0 < k ? .5 * (2 * g - 1 + k) / k : 0, k)
        }
}
;
UIL.Color.prototype.drawMask = function() {
    var a = this.square
      , b = Math.floor(2 * this.square / 2)
      , c = document.createElement("canvas");
    c.width = c.height = b + 1;
    var d = c.getContext("2d")
      , e = d.getImageData(0, 0, b + 1, b + 1)
      , f = 0;
    this.calculateMask(b, b, function(a, b, c, d) {
        e.data[f++] = e.data[f++] = e.data[f++] = 255 * c;
        e.data[f++] = 255 * d
    });
    d.putImageData(e, 0, 0);
    this.ctxMask.drawImage(c, 0, 0, b + 1, b + 1, -a, -a, 2 * a, 2 * a)
}
;
UIL.Color.prototype.drawCircle = function() {
    var a = this.radius, b = this.wheelWidth, c = 8 / a / 24 * Math.PI, d = this.ctxMask, e = 0, f, g, h, k;
    d.save();
    d.lineWidth = b / a;
    d.scale(a, a);
    for (var l = 0; 24 >= l; ++l)
        k = l / 24,
        a = k * Math.PI * 2,
        b = [Math.sin(e), -Math.cos(e), Math.sin(a), -Math.cos(a)],
        g = .5 * (e + a),
        h = 1 / Math.cos(.5 * (a - e)),
        e = Math.sin(g) * h,
        g = -Math.cos(g) * h,
        k = UIL.pack(UIL.HSL2RGB([k, 1, .5])),
        0 < l && (h = d.createLinearGradient(b[0], b[1], b[2], b[3]),
        h.addColorStop(0, f),
        h.addColorStop(1, k),
        d.strokeStyle = h,
        d.beginPath(),
        d.moveTo(b[0], b[1]),
        d.quadraticCurveTo(e, g, b[2], b[3]),
        d.stroke()),
        e = a - c,
        f = k;
    d.restore()
}
;
UIL.Color.prototype.drawMarkers = function() {
    var a = this.markerSize
      , b = this.radius
      , c = this.width
      , d = Math.ceil(a / 4)
      , e = a - d + 1
      , f = this.invert ? "#fff" : "#000"
      , g = this.invert ? "#000" : "#fff"
      , h = 6.28 * this.hsl[0]
      , b = [Math.sin(h) * b, -Math.cos(h) * b, 2 * this.square * (.5 - this.hsl[1]), 2 * this.square * (.5 - this.hsl[2])]
      , a = [{
        x: b[2],
        y: b[3],
        r: a,
        c: f,
        lw: d
    }, {
        x: b[2],
        y: b[3],
        r: e,
        c: g,
        lw: d + 1
    }, {
        x: b[0],
        y: b[1],
        r: a,
        c: "#fff",
        lw: d
    }, {
        x: b[0],
        y: b[1],
        r: e,
        c: "#000",
        lw: d + 1
    }];
    this.ctxOverlay.clearRect(-this.mid, -this.mid, c, c);
    for (c = a.length; c--; )
        d = a[c],
        this.ctxOverlay.lineWidth = d.lw,
        this.ctxOverlay.strokeStyle = d.c,
        this.ctxOverlay.beginPath(),
        this.ctxOverlay.arc(d.x, d.y, d.r, 0, 2 * Math.PI, !0),
        this.ctxOverlay.stroke()
}
;
UIL.Color.prototype.widgetCoords = function(a) {
    return {
        x: a.pageX - this.offset.left - this.mid,
        y: a.pageY - this.offset.top - this.mid
    }
}
;
UIL.Color.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.width = this.sb;
    this.wheelWidth = .1 * this.width;
    this.decal = 22;
    "up" == this.side && (this.decal = 5);
    this.radius = .5 * (this.width - this.wheelWidth) - 1;
    this.square = Math.floor(.7 * (this.radius - .5 * this.wheelWidth)) - 1;
    this.mid = Math.floor(.5 * this.width);
    this.markerSize = .3 * this.wheelWidth;
    this.setDom(2, "width", this.sb);
    this.setDom(2, "width", this.sb);
    this.setDom(2, "left", this.sa);
    this.setDom(3, "left", this.sa);
    this.setDom(3, "width", this.width);
    this.setDom(3, "height", this.width);
    this.setDom(4, "left", this.sa);
    this.setDom(5, "left", this.sa);
    this.setSvg(3, "width", 2 * this.square - 1);
    this.setSvg(3, "height", 2 * this.square - 1);
    this.setSvg(3, "x", this.mid - this.square);
    this.setSvg(3, "y", this.mid - this.square);
    this.c[4].width = this.c[4].height = this.width;
    this.c[5].width = this.c[5].height = this.width;
    this.c[4].style.left = this.sa + "px";
    this.c[5].style.left = this.sa + "px";
    this.c[4].style.top = this.decal + "px";
    this.c[5].style.top = this.decal + "px";
    this.ctxMask.translate(this.mid, this.mid);
    this.ctxOverlay.translate(this.mid, this.mid);
    this.isShow && (this.redraw(),
    this.h = this.width + 30,
    this.setDom(0, "height", this.h),
    this.node && this.node.calc())
}
;
UIL.hexToHtml = function(a) {
    return "#" + ("000000" + a.toString(16)).substr(-6)
}
;
UIL.numFormat = function(a) {
    return "#" + ("000000" + a.toString(16)).substr(-6)
}
;
UIL.pack = function(a) {
    var b = Math.round(255 * a[0])
      , c = Math.round(255 * a[1]);
    a = Math.round(255 * a[2]);
    return "#" + UIL.dec2hex(b) + UIL.dec2hex(c) + UIL.dec2hex(a)
}
;
UIL.u255 = function(a, b) {
    return parseInt(a.substring(b, b + 2), 16) / 255
}
;
UIL.u16 = function(a, b) {
    return parseInt(a.substring(b, b + 1), 16) / 15
}
;
UIL.unpack = function(a) {
    if (7 == a.length)
        return [UIL.u255(a, 1), UIL.u255(a, 3), UIL.u255(a, 5)];
    if (4 == a.length)
        return [UIL.u16(a, 1), UIL.u16(a, 2), UIL.u16(a, 3)]
}
;
UIL.packDX = function(a, b) {
    return "#" + UIL.dec2hex(b) + UIL.dec2hex(a) + UIL.dec2hex(a) + UIL.dec2hex(a)
}
;
UIL.dec2hex = function(a) {
    return (16 > a ? "0" : "") + a.toString(16)
}
;
UIL.HSL2RGB = function(a) {
    var b, c = a[0];
    b = a[1];
    a = a[2];
    b = .5 >= a ? a * (b + 1) : a + b - a * b;
    a = 2 * a - b;
    return [UIL.HUE2RGB(a, b, c + .33333), UIL.HUE2RGB(a, b, c), UIL.HUE2RGB(a, b, c - .33333)]
}
;
UIL.HUE2RGB = function(a, b, c) {
    c = (c + 1) % 1;
    return 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (.66666 - c) * 6 : a
}
;
UIL.RGB2HSL = function(a) {
    var b = a[0]
      , c = a[1];
    a = a[2];
    var d = Math.min(b, c, a)
      , e = Math.max(b, c, a)
      , f = e - d
      , g = 0
      , h = 0
      , d = (d + e) / 2;
    0 < d && 1 > d && (h = f / (.5 > d ? 2 * d : 2 - 2 * d));
    0 < f && (e == b && e != c && (g += (c - a) / f),
    e == c && e != a && (g += 2 + (a - b) / f),
    e == a && e != b && (g += 4 + (b - c) / f),
    g /= 6);
    return [g, h, d]
}
;
UIL.Slide = function(a) {
    UIL.Proto.call(this, a);
    this.setTypeNumber(a);
    this.range = this.max - this.min;
    this.width = this.size / 3 * 2 - 50;
    this.w = this.width - 8;
    this.height = 17;
    this.value = a.value || 0;
    this.down = !1;
    this.c[2] = UIL.DOM("UIL text", "div", "text-align:right; width:40px; padding:0px 5px;");
    this.c[3] = UIL.DOM("UIL svgbox", "rect", "width:" + this.width + "px; height:" + this.height + "px; cursor:w-resize;", {
        width: this.width,
        height: this.height,
        fill: UIL.SVGB,
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.c[4] = UIL.DOM("UIL svgbox", "rect", "width:" + this.width + "px; height:" + this.height + "px; pointer-events:none;", {
        x: 4,
        y: 4,
        width: this.width - 8,
        height: this.height - 8,
        fill: "#CCC",
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.f[0] = function(a) {
        this.setSvg(3, "fill", "rgba(0,0,0,0.6)");
        this.setSvg(4, "fill", UIL.SELECT)
    }
    .bind(this);
    this.f[1] = function(a) {
        this.down = !1;
        this.setSvg(3, "fill", "rgba(0,0,0,0.2)");
        this.setSvg(4, "fill", "#CCC")
    }
    .bind(this);
    this.f[2] = function(a) {
        this.down = !1
    }
    .bind(this);
    this.f[3] = function(a) {
        this.down = !0;
        this.prev = {
            x: a.clientX,
            d: 0,
            v: parseFloat(this.value)
        };
        this.f[4](a)
    }
    .bind(this);
    this.f[4] = function(a) {
        if (this.down) {
            a.preventDefault();
            var c = this.c[3].getBoundingClientRect();
            a = (a.clientX - c.left - 4) / this.w * this.range + this.min - this.prev.v;
            if (a > this.step || a < this.step)
                a = 1 * (a / this.step).toFixed(0),
                this.value = this.numValue(this.prev.v + a * this.step),
                this.f[5](!0),
                this.prev.v = this.value
        }
    }
    .bind(this);
    this.f[5] = function(a) {
        this.setSvg(4, "width", (this.value - this.min) / this.range * this.w);
        this.c[2].innerHTML = this.value;
        a && this.callback(this)
    }
    .bind(this);
    this.c[3].onmouseover = this.f[0];
    this.c[3].onmouseout = this.f[1];
    this.c[3].onmouseup = this.f[2];
    this.c[3].onmousedown = this.f[3];
    this.c[3].onmousemove = this.f[4];
    this.f[5](!1);
    this.init()
}
;
UIL.Slide.prototype = Object.create(UIL.Proto.prototype);
UIL.Slide.prototype.constructor = UIL.Slide;
UIL.Slide.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.width = this.sb - 40;
    this.w = this.width - 8;
    this.setDom(2, "left", this.size - 50);
    this.setSvg(3, "width", this.width);
    this.setDom(3, "left", this.sa);
    this.setDom(3, "width", this.width);
    this.setDom(4, "left", this.sa);
    this.setDom(4, "width", this.width);
    this.f[5](!1)
}
;
UIL.List = function(a) {
    UIL.Proto.call(this, a);
    this.c[2] = UIL.DOM("UIL list");
    this.c[3] = UIL.DOM("UIL svgbox", "rect", "", {
        width: this.sb,
        height: 17,
        fill: UIL.bgcolor(UIL.COLOR),
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.c[4] = UIL.DOM("UIL", "path", "position:absolute; width:16px; height:16px; left:" + (this.sa + this.sb - 17) + "px; top:1px; pointer-events:none;", {
        width: 16,
        height: 16,
        d: "M 6 4 L 10 8 6 12",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.c[5] = UIL.DOM("UIL text", "div", "text-align:center;");
    this.c[6] = UIL.DOM("UIL svgbox", "rect", "top:20px; height:90px; pointer-events:none;", {
        x: this.sb - 15,
        y: 0,
        width: 10,
        height: 16,
        fill: "#666",
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.list = a.list || [];
    a.value ? isNaN(a.value) ? this.value = a.value : this.value = this.list[a.value] : this.value = this.list[0];
    this.show = !1;
    this.maxItem = 5;
    this.length = this.list.length;
    if (this.full = a.full || !1)
        this.maxItem = this.length;
    this.maxHeight = 18 * this.maxItem;
    this.max = 18 * this.length;
    this.w = this.sb;
    this.down = !1;
    this.range = this.max - this.maxHeight;
    this.py = 0;
    this.scroll = !1;
    this.side = a.side || "down";
    this.holdTop = 0;
    "up" == this.side && (this.c[2].style.top = "auto",
    this.c[3].style.top = "auto",
    this.c[4].style.top = "auto",
    this.c[5].style.top = "auto",
    this.c[2].style.bottom = "10px",
    this.c[3].style.bottom = "2px",
    this.c[4].style.bottom = "2px",
    this.c[5].style.bottom = "2px");
    this.max > this.maxHeight && (this.w = this.sb - 20,
    this.scroll = !0);
    this.listIn = UIL.DOM("UIL list-in");
    this.listIn.name = "list";
    this.c[2].style.height = this.maxHeight + "px";
    this.c[2].appendChild(this.listIn);
    for (var b, c = 0; c < this.length; c++)
        b = this.list[c],
        a = UIL.DOM("UIL listItem", "div", "width:" + this.w + "px; height:18px;"),
        a.textContent = b,
        a.name = b,
        this.listIn.appendChild(a);
    this.c[5].textContent = this.value;
    this.c[2].name = "list";
    this.f[0] = function(a) {
        if (this.show)
            this.f[1]();
        else
            this.f[2]();
        this.node.update()
    }
    .bind(this);
    this.f[1] = function(a) {
        this.show = !1;
        this.h = 20;
        this.c[0].style.height = this.h + "px";
        this.c[2].style.display = "none";
        this.setSvg(4, "d", "M 6 4 L 10 8 6 12");
        this.node && this.node.update()
    }
    .bind(this);
    this.f[2] = function(a) {
        this.f[8](0);
        this.show = !0;
        this.h = this.maxHeight + 30;
        this.scroll || (this.h = 30 + this.max,
        this.c[6].style.display = "none",
        this.c[2].onmousemove = null,
        this.c[2].onmousewheel = null);
        this.c[0].style.height = this.h + "px";
        this.c[2].style.display = "block";
        "up" == this.side ? this.setSvg(4, "d", "M 12 10 L 8 6 4 10") : this.setSvg(4, "d", "M 12 6 L 8 10 4 6");
        this.node && this.node.update()
    }
    .bind(this);
    this.f[3] = function(a) {
        var b = a.target.name;
        if ("list" !== b && void 0 !== b) {
            this.value = a.target.name;
            this.c[5].textContent = this.value;
            if (this.onChange)
                this.onChange(this);
            this.f[1]()
        } else
            "list" == b && this.scroll && (this.down = !0,
            this.f[4](a),
            this.listIn.style.background = "rgba(0,0,0,0.6)",
            this.setSvg(6, "fill", "#AAA"),
            a.preventDefault())
    }
    .bind(this);
    this.f[4] = function(a) {
        if (this.down) {
            var b = this.c[2].getBoundingClientRect();
            a = a.clientY - b.top;
            30 > a && (a = 30);
            100 < a && (a = 100);
            this.py = ((a - 30) / 70 * this.range).toFixed(0);
            this.f[8]()
        }
    }
    .bind(this);
    this.f[5] = function(a) {}
    .bind(this);
    this.f[6] = function(a) {
        this.down = !1;
        this.listIn.style.background = "rgba(0,0,0,0.2)";
        this.setSvg(6, "fill", "#666")
    }
    .bind(this);
    this.f[7] = function(a) {
        if (this.scroll) {
            this.node && (this.node.lockwheel = !0);
            var b = 0;
            a.wheelDeltaY ? b = .04 * -a.wheelDeltaY : a.wheelDelta ? b = .2 * -a.wheelDelta : a.detail && (b = 4 * a.detail);
            this.py += b;
            0 > this.py && (this.py = 0);
            this.py > this.range && (this.py = this.range);
            this.f[8]()
        }
    }
    .bind(this);
    this.f[8] = function(a) {
        this.scroll && (void 0 !== a && (this.py = a),
        this.listIn.style.top = -this.py + "px",
        this.setSvg(6, "y", 70 * this.py / this.range + 2))
    }
    .bind(this);
    this.f[9] = function(a) {
        this.c[5].style.color = "#FFF";
        this.setSvg(3, "fill", UIL.SELECT)
    }
    .bind(this);
    this.f[10] = function(a) {
        this.c[5].style.color = "#CCC";
        this.setSvg(3, "fill", UIL.bgcolor(UIL.COLOR))
    }
    .bind(this);
    this.f[11] = function(a) {
        this.c[5].style.color = "#CCC";
        this.setSvg(3, "fill", UIL.SELECTDOWN)
    }
    .bind(this);
    this.c[2].onmousedown = this.f[3];
    this.c[2].onmousemove = this.f[4];
    this.c[2].onmouseout = this.f[5];
    this.c[2].onmouseup = this.f[6];
    this.c[2].onmousewheel = this.f[7];
    this.c[3].onclick = this.f[0];
    this.c[3].onmouseover = this.f[9];
    this.c[3].onmouseout = this.f[10];
    this.c[3].onmouseup = this.f[10];
    this.c[3].onmousedown = this.f[11];
    this.init()
}
;
UIL.List.prototype = Object.create(UIL.Proto.prototype);
UIL.List.prototype.constructor = UIL.List;
UIL.List.prototype.text = function(a) {
    this.c[5].textContent = a
}
;
UIL.List.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setSvg(3, "width", this.sb);
    this.setDom(3, "width", this.sb);
    this.setDom(3, "left", this.sa);
    this.setDom(4, "left", this.sa + this.sb - 17);
    this.setDom(5, "left", this.sa);
    this.setDom(5, "width", this.sb);
    this.setDom(2, "left", this.sa - 20);
    this.setDom(2, "width", this.sb);
    this.setDom(6, "left", this.sa);
    this.setDom(6, "width", this.sb);
    this.setSvg(6, "x", this.sb - 15);
    this.w = this.sb;
    this.max > this.maxHeight && (this.w = this.sb - 20);
    for (var a = 0; a < this.length; a++)
        UIL.setDOM(this.listIn.children[a], "width", this.w)
}
;
UIL.Bool = function(a) {
    UIL.Proto.call(this, a);
    this.value = a.value || !1;
    this.c[2] = UIL.DOM("UIL svgbox", "rect", "width:17px;", {
        width: 17,
        height: 17,
        fill: UIL.SVGB,
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.c[3] = UIL.DOM("UIL svgbox", "path", "width:17px; pointer-events:none;", {
        width: 17,
        height: 17,
        d: "M 4 9 L 6 12 14 4",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.value || (this.c[3].style.display = "none");
    this.f[0] = function(a) {
        this.value ? (this.value = !1,
        this.c[3].style.display = "none",
        UIL.setSVG(this.c[2], "fill", "rgba(0,0,0,0.2)")) : (this.value = !0,
        this.c[3].style.display = "block",
        UIL.setSVG(this.c[2], "fill", "rgba(0,0,0,0.4)"));
        this.callback(this.value)
    }
    .bind(this);
    this.c[2].onclick = this.f[0];
    this.init()
}
;
UIL.Bool.prototype = Object.create(UIL.Proto.prototype);
UIL.Bool.prototype.constructor = UIL.Bool;
UIL.Bool.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(2, "left", this.sa);
    this.setDom(3, "left", this.sa)
}
;
UIL.Button = function(a) {
    UIL.Proto.call(this, a);
    this.colorover = UIL.color(a.colorover) || UIL.SELECT;
    this.colordown = UIL.color(a.colordown) || UIL.color(a.colorover) || UIL.SELECTDOWN;
    this.color = a.color || UIL.COLOR;
    this.value = a.value || !1;
    this.c[2] = UIL.DOM("UIL svgbox", "rect", "", {
        width: this.sb,
        height: 17,
        fill: UIL.color(this.color),
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    this.c[3] = UIL.DOM("UIL text", "div", "text-align:center;");
    this.c[1].textContent = "";
    this.c[3].innerHTML = a.title || this.txt;
    this.f[0] = function(a) {
        if (this.onComplete)
            this.onComplete(this)
    }
    .bind(this);
    this.f[1] = function(a) {
        this.c[3].style.color = "#FFF";
        this.setSvg(2, "fill", this.colorover);
        this.setSvg(2, "stroke-width", 0)
    }
    .bind(this);
    this.f[2] = function(a) {
        this.c[3].style.color = "#EEEEEE";
        this.setSvg(2, "fill", UIL.color(this.color));
        this.setSvg(2, "stroke-width", 1)
    }
    .bind(this);
    this.f[3] = function(a) {
        this.c[3].style.color = "#EEEEEE";
        this.setSvg(2, "fill", this.colordown)
    }
    .bind(this);
    this.c[2].onmousedown = this.f[3];
    this.c[2].onmouseover = this.f[1];
    this.c[2].onmouseout = this.f[2];
    this.c[2].onmouseup = this.f[1];
    this.c[2].onclick = this.f[0];
    this.init()
}
;
UIL.Button.prototype = Object.create(UIL.Proto.prototype);
UIL.Button.prototype.constructor = UIL.Button;
UIL.Button.prototype.label = function(a) {
    this.c[3].textContent = a
}
;
UIL.Button.prototype.icon = function(a) {
    this.c[3].style.padding = "0px 0px";
    this.c[3].innerHTML = a
}
;
UIL.Button.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setSvg(2, "width", this.sb, 0);
    this.setDom(2, "width", this.sb);
    this.setDom(2, "left", this.sa);
    this.setDom(3, "width", this.sb);
    this.setDom(3, "left", this.sa)
}
;
UIL.Menu = function(a, b, c) {
    this.left = void 0 !== a ? a : !0;
    this.top = void 0 !== b ? b : !0;
    this.colorover = void 0 !== c ? c : "b";
    this.uis = [];
    this.offset = 10;
    UIL.Menu.uils = UIL.Menu.uils || [];
    UIL.Menu.uils.push(this)
}
;
UIL.Menu.prototype = {
    constructor: UIL.Menu,
    add: function(a, b) {
        var c;
        b = b || {};
        b.target = editor.menu;
        b.size = b.size || 100;
        b.attached = b.name || b.attached;
        b.color = b.color || "no";
        b.colorover = b.colorover || this.colorover;
        b.pos = {};
        this.left && (b.pos.left = this.offset + "px");
        this.top ? b.pos.top = "10px" : b.pos.bottom = 10 + 25 * UIL.Menu.uils.indexOf(this) + "px";
        this.offset += b.size + 10;
        switch (a) {
        case "button":
            c = new UIL.Button(b);
            break;
        case "string":
            c = new UIL.String(b);
            break;
        case "number":
            c = new UIL.Number(b);
            break;
        case "title":
            c = new UIL.Title(b);
            break;
        case "color":
            c = new UIL.Color(b);
            break;
        case "slide":
            c = new UIL.Slide(b);
            break;
        case "bool":
            c = new UIL.Bool(b);
            break;
        case "list":
            c = new UIL.List(b);
            break;
        case "group":
            c = new UIL.Group(b);
            break;
        case "window":
            c = new UIL.Window(b)
        }
        this.uis.push(c);
        return c
    }
};
UIL.Window = function(a) {
    UIL.Proto.call(this, a);
    this.h = 30;
    this.c[2] = UIL.DOM("UIL", "div", "top:25px; overflow:hidden;");
    this.c[3] = UIL.DOM("UIL", "path", "position:absolute; width:16px; left:" + (this.sa + this.sb - 17) + "px; top:4px; pointer-events:none;", {
        width: 16,
        height: 16,
        d: "M 12 6 L 8 10 4 6",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.setDom(0, "height", this.h);
    this.setDom(1, "height", this.h);
    this.setDom(0, "border-top-left-radius", 3);
    this.setDom(0, "border-top-right-radius", 3);
    this.c[1].style.pointerEvents = "auto";
    this.c[1].style.cursor = "all-scroll";
    this.c[1].name = "group";
    this.c[3].style.pointerEvents = "auto";
    this.c[3].style.cursor = "pointer";
    this.c[3].name = "group";
    this.setDom(1, "top", 7);
    this.setDom(3, "top", 7);
    this.mouseY = this.mouseX = 0;
    this.context = a.context;
    var b = function(a) {
        var b = a.clientX;
        a = a.clientY;
        this.node.x += b - this.mouseX;
        this.node.y += a - this.mouseY;
        this.node.update();
        this.mouseX = b;
        this.mouseY = a
    }
    .bind(this)
      , c = function(a) {
        window.removeEventListener("mousemove", b);
        window.removeEventListener("mouseup", c)
    }
    .bind(this);
    this.startDrag = this.f[0] = function(a) {
        this.mouseX = a ? a.clientX : 0;
        this.mouseY = a ? a.clientY : 0;
        window.addEventListener("mousemove", b);
        window.addEventListener("mouseup", c)
    }
    .bind(this);
    this.f[1] = function(a) {
        this.context && (this.context.show(a.clientX, a.clientY),
        a.stopPropagation())
    }
    .bind(this);
    this.c[1].onmousedown = this.f[0];
    this.c[3].onmousedown = this.f[1];
    this.init()
}
;
UIL.Window.prototype = Object.create(UIL.Proto.prototype);
UIL.Window.prototype.constructor = UIL.Window;
UIL.Window.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(3, "left", this.sa + this.sb - 17);
    this.setDom(1, "width", this.size);
    this.setDom(2, "width", this.size)
}
;
UIL.Preview = function(a) {
    UIL.Proto.call(this, a);
    this.h = 200;
    this.setDom(0, "height", this.h);
    this.c[1].style.display = "none";
    this.content = this.c[2] = UIL.DOM("UIL", "div", "width:100%;height:100%;overflow:hidden;");
    this.canvas = this.c[3] = UIL.DOM("UIL", "canvas", "pointer-events:auto;width:100%;height:100%;overflow:hidden;");
    this.init()
}
;
UIL.Preview.prototype = Object.create(UIL.Proto.prototype);
UIL.Preview.prototype.constructor = UIL.Preview;
UIL.Preview.prototype.rSize = function() {
    UIL.Proto.prototype.rSize.call(this);
    this.setDom(1, "width", this.size - 50)
}
;
UIL.Icon = function(a, b, c) {
    b = b || 40;
    var d = [];
    d[0] = "<svg version='1.1' xmlns='" + UIL.svgns + "' preserveAspectRatio='none' x='0px' y='0px' fill='" + (c || "#FFF") + "' width='" + b + "px' height='" + b + "px' viewBox='0 0 40 40';'><g>";
    switch (a) {
    case "image":
        d[1] = "<path d='M 16 30 L 20 34 24 30 16 30 M 16 27 L 16 29 24 29 24 27 16 27 M 27 23 L 27 20 Q 25.2 17.15 23 20 21.4 22.1 18 20 15.7 18.75 13 20 L 13 22 Q 16.32 21.27 19 22.7 21.73 24.17 23.7 21.55 25.65 18.96 27 23 M 30 11 L 29 10 11 10 10 11 10 29 11 30 14 30 14 28 12 28 12 12 28 12 28 28 26 28 26 30 29 30 30 29 30 11 Z'/>";
        break;
    case "video":
        d[1] = "<path d='M 16 30 L 20 34 24 30 16 30 M 16 27 L 16 29 24 29 24 27 16 27 M 30 11 L 30 10 10 10 10 30 14 30 14 29 13 29 13 28 14 28 14 27 11 27 11 13 29 13 29 27 26 27 26 30 30 30 30 29 29 29 29 28 30 28 30 12 29 12 29 11 30 11 M 21 12 L 21 11 22 11 22 12 21 12 M 23 12 L 23 11 24 11 24 12 23 12 M 25 12 L 25 11 26 11 26 12 25 12 M 27 12 L 27 11 28 11 28 12 27 12 M 11 11 L 12 11 12 12 11 12 11 11 M 15 12 L 15 11 16 11 16 12 15 12 M 13 11 L 14 11 14 12 13 12 13 11 M 17 12 L 17 11 18 11 18 12 17 12 M 19 11 L 20 11 20 12 19 12 19 11 M 12 29 L 11 29 11 28 12 28 12 29 M 27 29 L 27 28 28 28 28 29 27 29 Z'/>";
        break;
    case "camera":
        d[1] = "<path d='M 16 30 L 20 34 24 30 16 30 M 16 27 L 16 29 24 29 24 27 16 27 M 29 12 L 23 12 23 10 17 10 17 12 11 12 10 13 10 28 11 29 14 29 14 27 12 27 12 14 18 14 18 11 22 11 22 14 28 14 28 27 26 27 26 29 29 29 30 28 30 13 29 12 M 21 14 L 21 12 19 12 19 14 21 14 M 23.5 23.5 Q 25 22.05 25 20 25 17.95 23.5 16.45 22.05 15 20 15 17.95 15 16.45 16.45 15 17.95 15 20 15 22.05 16.45 23.5 17.95 25 20 25 22.05 25 23.5 23.5 M 22.8 17.15 Q 24 18.35 24 20 24 21.65 22.8 22.8 21.65 24 20 24 18.35 24 17.15 22.8 16 21.65 16 20 16 18.35 17.15 17.15 18.35 16 20 16 21.65 16 22.8 17.15 M 22.1 22.1 Q 23 21.25 23 20 23 18.75 22.1 17.85 21.25 17 20 17 18.75 17 17.85 17.85 17 18.75 17 20 17 21.25 17.85 22.1 18.75 23 20 23 21.25 23 22.1 22.1 Z'/>";
        break;
    case "scene":
        d[1] = "<path d='M 27.9 15.8 L 28 24.5 26 25.5 26 27.6 30 26 30 14 21 10 20 10 10 14 10 26 14 27.75 14 25.5 12 24.5 12 15.9 19 19 19 25 20 25 20 19 27.9 15.8 M 21 12 L 27.75 14.9 20 18 19 18 12.15 14.95 20 12 21 12 M 16 30 L 20 34 24 30 16 30 M 16 27 L 16 29 24 29 24 27 16 27 Z'/>";
        break;
    case "texture":
        d[1] = "<path d='M 30 10 L 25 10 20 15 15 10 10 10 10 30 30 30 30 10 M 24 12 L 26 12 26 14 28 14 28 17 27 17 27 18 28 18 28 28 18 28 18 27 17 27 17 28 14 28 14 26 12 26 12 24 14 24 14 22 16 22 16 20 18 20 18 18 20 18 20 16 22 16 22 14 24 14 24 12 M 20 25 L 19 25 19 26 20 26 20 25 M 25 19 L 25 20 26 20 26 19 25 19 M 24 21 L 23 21 23 22 24 22 24 21 M 22 23 L 21 23 21 24 22 24 22 23 M 16 24 L 14 24 14 26 16 26 16 24 M 16 22 L 16 24 18 24 18 22 16 22 M 20 20 L 18 20 18 22 20 22 20 20 M 22 20 L 22 18 20 18 20 20 22 20 M 22 16 L 22 18 24 18 24 16 22 16 M 26 16 L 26 14 24 14 24 16 26 16 M 24 8 L 24 6 16 6 16 8 24 8 M 16 9 L 20 13 24 9 16 9 Z'/>";
        break;
    case "canvas":
        d[1] = "<path d='M 25 18 L 25 16 23 14 18 14 15 17 15 23 18 26 23 26 25 24 25 22 24 22 22 24 20 24 18 22 18 18 20 16 22 16 24 18 25 18 M 16 9 L 20 13 24 9 16 9 M 24 8 L 24 6 16 6 16 8 24 8 M 30 10 L 25 10 22 13 25 13 26 12 28 12 28 28 12 28 12 12 14 12 15 13 18 13 15 10 10 10 10 30 30 30 30 10 Z'/>";
        break;
    case 18:
        d[1] = "<path d='M 16 11 L 14 11 14 14 11 14 11 16 14 16 14 19 16 19 16 16 19 16 19 14 16 14 16 11 Z'/>";
        break;
    case "nightvision":
        d[1] = "<path d='M 24 27 L 24 29 26 29 26 27 24 27 M 14 27 L 14 29 16 29 16 27 14 27 M 16 11 L 14 11 14 13 16 13 16 11 M 28 15 L 26 15 26 14 24 14 24 15 16 15 16 14 14 14 14 15 12 15 10 17 10 23 13 26 18 26 20 24 22 26 27 26 30 23 30 17 28 15 M 27 17 L 28 18 28 22 26 24 23 24 21 22 19 22 17 24 14 24 12 22 12 18 13 17 27 17 M 14 21 L 15 21 15 22 16 22 16 21 17 21 17 20 16 20 16 19 15 19 15 20 14 20 14 21 M 24 20 L 23 20 23 21 24 21 24 22 25 22 25 21 26 21 26 20 25 20 25 19 24 19 24 20 M 26 11 L 24 11 24 13 26 13 26 11 Z'/>";
        break;
    case "sepia":
        d[1] = "<path d='M 23 12 L 23 10 17 10 17 12 23 12 M 30 20 L 25 15 15 15 10 20 10 26 14 30 26 30 30 26 30 20 M 24 17 L 28 21 28 25 25 28 15 28 12 25 12 21 16 17 24 17 M 23 23 L 22 22 20 22 20 21 23 21 23 19 18 19 17 20 17 22 18 23 20 23 20 24 17 24 17 26 22 26 23 25 23 23 M 23 14 L 23 13 17 13 17 14 23 14 Z'/>";
        break;
    case "pixelate":
        d[1] = "<path d='M 24 26 L 22 26 22 24 20 24 20 28 24 28 24 26 M 12 24 L 12 20 10 20 10 30 20 30 20 28 16 28 16 24 12 24 M 26 30 L 26 28 24 28 24 30 26 30 M 10 14 L 10 16 12 16 12 14 10 14 M 14 18 L 14 16 12 16 12 20 16 20 16 18 14 18 M 20 22 L 18 22 18 20 16 20 16 24 20 24 20 22 M 28 26 L 26 26 26 28 28 28 28 26 M 30 28 L 28 28 28 30 30 30 30 28 M 16 16 L 16 14 14 14 14 16 16 16 M 20 18 L 18 18 18 20 20 20 20 18 M 16 16 L 16 18 18 18 18 16 16 16 M 14 12 L 12 12 12 14 14 14 14 12 M 12 12 L 12 10 10 10 10 12 12 12 M 26 24 L 24 24 24 26 26 26 26 24 M 22 22 L 22 24 24 24 24 22 22 22 M 22 22 L 22 20 20 20 20 22 22 22 Z'/>";
        break;
    case "hex":
        d[1] = "<path d='M 21 11.5 L 21 10 19 10 19 11.55 13 14.95 10 13.3 10 15.55 12 16.65 12 23.2 10 24.3 10 26.55 12.85 25 19 28.4 19 30 21 30 21 28.45 27.15 25 30 26.55 30 24.3 28.05 23.2 28.05 16.6 30 15.55 30 13.3 27 14.9 21 11.5 M 24.65 15.9 L 24.85 16 26 16.65 26 23.35 20.05 26.7 14.05 23.35 14.05 16.65 20.05 13.3 24.65 15.9 Z'/>";
        break;
    case "daltonize":
        d[1] = "<path d='M 30 22 L 30 18 Q 27.348 12.241 20 12 12.649 12.198 10 18 L 10 22 Q 13.461 28.316 20 28 26.665 27.865 30 22 M 11 20 Q 13.617 14.019 20 14 26.075 14.056 29 20 25.551 26.005 20 26 14.113 25.799 11 20 M 23.5 23.5 Q 25 22.05 25 20 25 17.95 23.5 16.45 22.05 15 20 15 17.95 15 16.45 16.45 15 17.95 15 20 15 22.05 16.45 23.5 17.95 25 20 25 22.05 25 23.5 23.5 M 23 20 Q 23 21.25 22.1 22.1 21.25 23 20 23 18.75 23 17.85 22.1 17 21.25 17 20 17 18.75 17.85 17.85 18.75 17 20 17 21.25 17 22.1 17.85 23 18.75 23 20 Z'/>";
        break;
    case "filmgrain":
        d[1] = "<path d='M 10 30 L 30 30 30 10 10 10 10 30 M 29 27 L 11 27 11 13 29 13 29 27 M 21 11 L 24 11 24 12 21 12 21 11 M 26 11 L 29 11 29 12 26 12 26 11 M 11 12 L 11 11 14 11 14 12 11 12 M 16 12 L 16 11 19 11 19 12 16 12 M 16 29 L 16 28 19 28 19 29 16 29 M 11 29 L 11 28 14 28 14 29 11 29 M 26 29 L 26 28 29 28 29 29 26 29 M 21 29 L 21 28 24 28 24 29 21 29 M 16 18 L 15 18 15 19 16 19 16 18 M 16 24 L 15 24 15 25 16 25 16 24 M 20 24 L 19 24 19 25 20 25 20 24 M 18 21 L 17 21 17 22 18 22 18 21 M 14 21 L 13 21 13 22 14 22 14 21 M 13 15 L 13 16 14 16 14 15 13 15 M 18 16 L 18 15 17 15 17 16 18 16 M 20 18 L 19 18 19 19 20 19 20 18 M 28 24 L 27 24 27 25 28 25 28 24 M 24 24 L 23 24 23 25 24 25 24 24 M 25 21 L 25 22 26 22 26 21 25 21 M 22 22 L 22 21 21 21 21 22 22 22 M 24 18 L 23 18 23 19 24 19 24 18 M 22 15 L 21 15 21 16 22 16 22 15 M 26 16 L 26 15 25 15 25 16 26 16 M 28 18 L 27 18 27 19 28 19 28 18 Z'/>";
        break;
    case "tvglitch":
        d[1] = "<path d='M 30 14 L 28 12 18 12 18 9 17 9 17 12 12 12 10 14 10 27 12 29 15 29 15 30 17 30 17 29 23 29 23 30 25 30 25 29 28 29 30 27 30 14 M 27 14 L 28 15 28 26 27 27 13 27 12 26 12 15 13 14 27 14 M 23 24 L 14 24 14 25 23 25 23 24 M 21 17 L 21 16 14 16 14 17 21 17 M 26 19 L 26 18 16 18 16 19 26 19 M 26 23 L 26 22 19 22 19 23 26 23 M 22 21 L 22 20 14 20 14 21 22 21 Z'/>";
        break;
    case "checkerboard":
        d[1] = "<path d='M 20 10 L 10 10 10 20 20 20 20 10 M 30 20 L 20 20 20 30 30 30 30 20 Z'/>";
        break;
    case "chroma":
        d[1] = "<path d='M 23 16.4 L 23 16.6 Q 23 17.7 22.4 18.6 22.3 18.75 22.15 18.95 21.8 19.35 21.35 19.65 L 21 20 21 21 25 22 26 24 26 30 30 30 30 10 10 10 10 30 14 30 14 24 15 22 19 21 19 20 18.6 19.6 Q 18.205 19.364 17.85 18.95 17.692 18.765 17.55 18.55 17.023 17.717 17 16.6 L 17 16.4 Q 17.021 15.333 17.5 14.45 17.661 14.232 17.85 14 18.223 13.584 18.65 13.35 19.242 13.0150 19.9 13 L 20.05 13 Q 20.75 13 21.35 13.35 21.8 13.6 22.15 14 22.35 14.25 22.45 14.5 23 15.35 23 16.4 Z'/>";
        break;
    case "freeze":
        d[1] = "<path d='M 23 11 L 22 10 20 12 18 10 17 11 19 13 19 15 16 12 15 13 19 17 17 19 16 18 16 18.05 13 15 12 16 15 19 13 19 11 17 10 18 12 20 10 22 11 23 13 21 15 21 12 24 13 25 17 21 19 23 15 27 16 28 19 25 19 27 17 29 18 30 20 28 22 30 23 29 21 27 21 25 24 28 25 27 21 23 23 21 27 25 28 24 25 21 27 21 29 23 30 22 28 20 30 18 29 17 27 19 25 19 28 16 27 15 23 19 21 17 25 13 24 12 21 15 21 13 23 11 M 20 22 L 18 20 20 18 22 20 20 22 Z'/>";
        break;
    case "brightness-contrast":
        d[1] = "<path d='M 30 20 Q 30 15.867 27.05 12.9 L 27.05 12.9 Q 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 L 12.9 27.05 Q 15.867 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 25.65 14.35Q 28 16.7 28 20 28 23.3 25.65 25.65 23.3 28 20 28 16.7 28 14.35 25.65L 25.65 14.35 Z'/>";
        break;
    case "color":
        d[1] = "<path d='M 30 12 L 28 10 24 10 23 11 23 13 22 14 21 13 20 14 21 15 12 24 11 27 10 28 10.75 28.75 12.25 27.25 13 25 22 16 24 18 15 27 12.75 27.75 11.25 29.25 12 30 13 29 16 28 25 19 26 20 27 19 26 18 27 17 29 17 30 16 30 12 M 25 11 L 27 11 29 13 29 15 28 16 26 16 25 17 23 15 24 14 24 12 25 11 Z'/>";
        break;
    case "polar":
        d[1] = "<path d='M 30 20 Q 30 15.85 27.05 12.9 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 15.85 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 24 24 Q 24 22.35 22.8 21.15 21.667 20.017 20.05 20 L 19.95 20 Q 18.33125 19.98125 17.15 18.8 16 17.65 16 16 16 14.35 17.15 13.15 18.257 12.088 19.75 12 L 20.2 12 Q 23.373 12.073 25.65 14.35 28 16.7 28 20 28 23.3 25.65 25.65 23.373 27.926 20.2 28 21.721 27.925 22.8 26.8 24 25.65 24 24 Z'/>";
        break;
    case "sketch":
        d[1] = "<path d='M 28 10 L 26 10 12 24 10 30 16 28 30 14 30 12 28 10 M 13 25 L 15 27 12 28 13 25 M 29 13 L 27 15 25 13 27 11 29 13 M 24 14 L 26 16 16 26 14 24 24 14 Z'/>";
        break;
    case "highlights-shadows":
        d[1] = "<path d='M 12.95 27.05 L 15.05 24.95 14.35 24.25 12.25 26.35 12.95 27.05 M 26 20 Q 26 17.5 24.25 15.75 22.5 14 20 14 17.5 14 15.75 15.75 14 17.5 14 20 14 22.5 15.75 24.25 17.5 26 20 26 22.5 26 24.25 24.25 26 22.5 26 20 M 22.8 17.15 L 22.8 17.15 17.15 22.8 17.15 22.8 Q 16 21.65 16 20 16 18.35 17.15 17.15 18.35 16 20 16 21.65 16 22.8 17.15 M 24.25 14.35 L 24.95 15.05 27.1 12.9 26.4 12.2 24.25 14.35 M 14.3 15.7 L 14.35 15.75 15.75 14.35 13.6 12.2 12.2 13.6 14.3 15.7 M 10 19 L 10 21 13 21 13 19 10 19 M 21 13 L 21 10 19 10 19 13 21 13 Z'/>";
        break;
    case "exposure":
        d[1] = "<path d='M 25.65 15.75 L 27.75 13.65 26.4 12.2 24.25 14.35 25.65 15.75 M 12.25 26.35 L 13.6 27.8 15.75 25.65 14.35 24.25 12.25 26.35 M 24.25 24.25 Q 26 22.5 26 20 26 17.5 24.25 15.75 22.5 14 20 14 17.5 14 15.75 15.75 14 17.5 14 20 14 22.5 15.75 24.25 17.5 26 20 26 22.5 26 24.25 24.25 M 22.8 17.15 L 22.85 17.2 Q 24 18.35 24 20 24 21.65 22.85 22.85 21.65 24 20 24 18.35 24 17.2 22.85 L 17.15 22.8 Q 16 21.65 16 20 16 18.35 17.15 17.15 18.35 16 20 16 21.65 16 22.8 17.15 M 24.25 25.65 L 26.4 27.8 27.8 26.4 25.65 24.25 24.25 25.65 M 19 27 L 19 30 21 30 21 27 19 27 M 27 21 L 30 21 30 19 27 19 27 21 M 12.2 13.6 L 14.35 15.75 15.75 14.35 13.6 12.2 12.2 13.6 M 10 19 L 10 21 13 21 13 19 10 19 M 21 13 L 21 10 19 10 19 13 21 13 Z'/>";
        break;
    case "scanlines":
        d[1] = "<path d='M 30 25 L 30 23 10 23 10 25 30 25 M 10 27 L 10 29 30 29 30 27 10 27 M 30 13 L 30 11 10 11 10 13 30 13 M 30 17 L 30 15 10 15 10 17 30 17 M 30 21 L 30 19 10 19 10 21 30 21 Z'/>";
        break;
    case "fxaa":
        d[1] = "<path d='M 21 14 L 24 11 12 11 12 29 15 29 15 20 18 20 18 18 15 18 15 14 21 14 M 28.5 16.5 L 27 15 24 18 21 15 19.5 16.5 22.5 19.5 19.5 22.5 21 24 24 21 27 24 28.5 22.5 25.5 19.5 28.5 16.5 M 28 29 L 28 26 25 26 25 29 28 29 M 26 27 L 27 27 27 28 26 28 26 27 M 20 26 L 20 29 23 29 23 26 20 26 M 21 27 L 22 27 22 28 21 28 21 27 Z'/>";
        break;
    case "vibrance":
        d[1] = "<path d='M 30 12 L 28 10 26 10 22 14 21 13 20 14 21 15 12 24 11 27 10 28 10.75 28.75 12.25 27.25 13 25 22 16 24 18 15 27 12.75 27.75 11.25 29.25 12 30 13 29 16 28 25 19 26 20 27 19 26 18 30 14 30 12 M 25 17 L 23 15 27 11 29 13 25 17 M 25.1 20.9 L 21.8 23.9 20 28 19.35 26.6 18.05 27.9 19 30 21 30 25.1 20.9 M 14.35 19.65 L 15.7 18.3 12 10 10 10 14.35 19.65 Z'/>";
        break;
    case "noise":
        d[1] = "<path d='M 22 15 L 26 19 29 16 29 13 26 16 23 13 21 13 18 16 15 13 11 13 11 15 14 15 18 19 22 15 M 14 21 L 11 24 11 27 14 24 17 27 19 27 22 24 25 27 29 27 29 25 26 25 22 21 18 25 14 21 Z'/>";
        break;
    case "fader":
        d[1] = "<path d='M 23.1 23.65 Q 22.9 22.2 23 21 L 24 21 24 19 19 19 19 18 20 15 20 12 19 11 17 11 16 12 16 15 17 18 17 19 12 19 12 21 13 21 Q 12.9 22.2 13.05 23.65 13.2 25.2 13.5 26 14.479 28.117 17 29 L 29 29 29 28 25.45 28 Q 24.423 27.157 23.8 26.1 23.78 26.055 23.75 26 23.3 25.2 23.1 23.65 M 22 21 Q 21.9 22.2 22.1 23.65 22.253 24.84 22.55 25.6 21.173 27.1 18.85 25.7 16.58 24.304 14.25 25.25 13.8 23.65 14 21 L 22 21 M 18 12 Q 18.4 12 18.7 12.3 19 12.6 19 13 19 13.4 18.7 13.7 18.4 14 18 14 17.6 14 17.3 13.7 17 13.4 17 13 17 12.6 17.3 12.3 17.6 12 18 12 Z'/>";
        break;
    case "kaleidoscope":
        d[1] = "<path d='M 21 17 L 22 14 21 12 20 11 19 12 18 14 19 17 20 19 21 17 M 12 21 L 14 22 17 21 19 20 17 19 14 18 12 19 11 20 12 21 M 20 21 L 19 23 18 26 19 28 20 29 21 28 22 26 21 23 20 21 M 23 19 L 21 20 23 21 26 22 28 21 29 20 28 19 26 18 23 19 M 18.6 22.8 L 19.3 20.7 17.2 21.4 14.35 22.85 13.65 24.95 13.65 26.35 15.05 26.35 17.15 25.65 18.6 22.8 M 18.55 17.15 L 17.15 14.35 15.05 13.65 13.65 13.65 13.65 15.05 14.35 17.15 17.15 18.55 19.3 19.3 18.55 17.15 M 22.8 21.4 L 20.7 20.7 21.4 22.8 22.85 25.65 24.95 26.35 26.35 26.35 26.35 24.95 25.65 22.85 22.8 21.4 M 26.35 15.05 L 26.35 13.65 24.95 13.65 22.85 14.35 21.45 17.15 20.7 19.3 22.85 18.55 25.65 17.15 26.35 15.05 Z'/>";
        break;
    case "invert":
        d[1] = "<path d='M 26.95 21.95 Q 26.95 19.05 24.95 17.1 L 24.9 17.05 Q 21.7 14.05 20 11 18.25 14.25 15.1 17 15.05 17 15.05 17.05 13 19.05 13 21.95 13 24.85 15.05 26.9 17.05 28.95 19.95 28.95 L 20 28.95 Q 22.85 28.95 24.9 26.9 26.95 24.85 26.95 21.95 M 16.1 18.85 Q 18.85 16.3 20 14 L 20 27 Q 17.95 27 16.45 25.5 15 24.05 15 22 15 20.3 16 19 16.05 18.9 16.1 18.85 Z'/>";
        break;
    case "mirror":
        d[1] = "<path d='M 21 25 L 21 23 19 23 19 25 21 25 M 19 27 L 19 29 21 29 21 27 19 27 M 17 11 L 15 11 10 27 10 29 17 29 17 11 M 15 27 L 11.7 27 15 17 15 27 M 21 13 L 21 11 19 11 19 13 21 13 M 21 17 L 21 15 19 15 19 17 21 17 M 21 21 L 21 19 19 19 19 21 21 21 M 25 11 L 23 11 23 29 30 29 30 27 25 11 M 28.35 27 L 25 27 25 17 28.35 27 Z'/>";
        break;
    case "hue-saturation":
        d[1] = "<path d='M 24.9 17.05 Q 24.387 16.569 23.9 16.05 21.427 13.561 20 11 18.25 14.25 15.1 17 15.05 17 15.05 17.05 13 19.05 13 21.95 13 24.134 14.15 25.8 14.544 26.394 15.05 26.9 17.05 28.95 19.95 28.95 22.85 28.95 24.9 26.9 26.95 24.85 26.95 21.95 26.95 19.05 24.95 17.1 L 24.9 17.05 M 22.5 17.45 Q 23.213 18.261 24 19 25 20.3 25 22 25 24.05 23.5 25.5 22.05 27 20 27 17.95 27 16.45 25.5 15.935 24.9855 15.6 24.4 L 22.5 17.45 Z'/>";
        break;
    case "emboss":
        d[1] = "<path d='M 13 27 L 13 28 15 30 28 30 28 26 27 25 27 29 15 29 13 27 M 21 20 L 21 18 17 18 16 17 16 15 18 13 26 13 26 11 15 11 14 12 14 27 15 28 26 28 26 26 18 26 16 24 16 21 17 20 21 20 M 23 18 L 22 17 22 21 17 21 17 24 18 25 18 22 23 22 23 18 M 28 11 L 27 10 27 14 18 14 17 15 17 17 18 17 18 15 28 15 28 11 Z'/>";
        break;
    case "edge":
        d[1] = "<path d='M 27 14 L 27 10 15 10 13 12 13 27 15 29 27 29 27 25 18 25 17 24 17 21 22 21 22 17 17 17 17 15 18 14 27 14 M 26 11 L 26 13 18 13 16 15 16 17 17 18 21 18 21 20 17 20 16 21 16 24 18 26 26 26 26 28 15 28 14 27 14 12 15 11 26 11 Z'/>";
        break;
    case "ripple":
        d[1] = "<path d='M 30 13 Q 28.65 16.25 25 16 21.65 16.15 20 13 18.2 10.05 15 10 11.75 9.85 10 13 L 10 15 Q 11.75 11.85 15 12 18.2 12.05 20 15 21.65 18.15 25 18 28.65 18.25 30 15 L 30 13 M 10 25 L 10 27 Q 11.74 23.871 15 24 18.186 24.032 20 27 21.645 30.163 25 30 28.664 30.247 30 27 L 30 25 Q 28.65 28.25 25 28 21.65 28.15 20 25 18.2 22.05 15 22 11.75 21.85 10 25 M 30 21 L 30 19 Q 28.65 22.25 25 22 21.65 22.15 20 19 18.2 16.05 15 16 11.75 15.85 10 19 L 10 21 Q 11.75 17.85 15 18 18.2 18.05 20 21 21.65 24.15 25 24 28.65 24.25 30 21 Z'/>";
        break;
    case "ascii":
        d[1] = "<path d='M 19 24 L 17 24 17 30 19 30 19 24 M 19 22 L 17 22 17 23 19 23 19 22 M 15 12 L 12 12 10 18 10 20 11 20 12 18 15 18 16 20 17 20 17 18 15 12 M 13 17 L 13 14 14 14 14 17 13 17 M 23 24 L 21 24 21 30 23 30 23 24 M 23 22 L 21 22 21 23 23 23 23 22 M 23 14 L 23 13 22 12 19 12 18 13 18 15 21 18 21 19 20 19 19 18 18 18 18 19 19 20 22 20 23 19 23 17 20 14 20 13 21 13 22 14 23 14 M 29 12 L 26 12 24 14 24 18 26 20 29 20 30 19 30 18 29 18 28 19 27 19 26 18 26 14 27 13 28 13 29 14 30 14 30 13 29 12 Z'/>";
        break;
    case "bleach-bypass":
        d[1] = "<path d='M 26.95 21.95 Q 26.95 19.05 24.95 17.1 L 24.9 17.05 Q 21.7 14.05 20 11 18.25 14.25 15.1 17 15.05 17 15.05 17.05 13 19.05 13 21.95 13 24.85 15.05 26.9 17.05 28.95 19.95 28.95 22.85 28.95 24.9 26.9 26.95 24.85 26.95 21.95 M 15 22 Q 15 20.3 16 19 16.05 18.9 16.1 18.85 18.85 16.3 20 14 19.3 16.3 17.65 18.85 17.65 18.9 17.6 19 17 20.3 17 22 17 24.05 17.85 25.5 18.721 26.953 19.9 27 17.921 26.971 16.45 25.5 15 24.05 15 22 Z'/>";
        break;
    case "blur":
        d[1] = "<path d='M 22 30 Q 22.486 30.016 23 30 L 23 28 Q 22.488 28.018 22 28 L 22 30 M 18.9 27.25 Q 18.529 27.067 18.15 26.85 L 16.05 28.9 Q 16.943 29.378 18.1 29.65 L 18.9 27.25 M 19.6 27.5 L 19.05 29.8 19.1 29.8 Q 19.973 29.955 21 30 L 21 27.85 Q 20.295 27.759 19.6 27.5 M 26 10 L 24 10 26 18 26 22 25 23 21 23 22 22 24 22 24 19 22 19 21 20 16 26 14 26 14 25 18.6 20 15.15 17.45 19.45 10 17.6 10 13 18 14 19 16 20 16 21 12 25 12 26 13.75 27.4 16.3 27.4 17.55 26.45 20 24 21 25 25 25 28 22 28 18 26 10 M 23 20 L 23 21 21.15 21 22 20 23 20 Z'/>";
        break;
    case "directionblur":
        d[1] = "<path d='M 19.6 27.5 L 19.6 27.55 Q 18.524 27.065 18.15 26.85 L 16.05 28.9 Q 16.943 29.378 19.05 29.85 L 19.05 29.8 19.1 29.8 Q 19.923 29.948 20.95 30 21.035 29.997 21.1 30 22.553 29.926 23.45 29.45 L 23.85 30.55 25.95 27.45 22.4 26.5 22.8 27.55 Q 21.56 27.859 20.85 27.8 20.073 27.7236 19.6 27.5 M 26 10 L 24 10 26 18 26 22 25 23 21 23 22 22 24 22 24 19 22 19 21 20 16 26 14 26 14 25 18.6 20 15.15 17.45 19.45 10 17.6 10 13 18 14 19 16 20 16 21 12 25 12 26 13.75 27.4 16.3 27.4 17.55 26.45 20 24 21 25 25 25 28 22 28 18 26 10 M 23 20 L 23 21 21.15 21 22 20 23 20 Z'/>";
        break;
    case "vignette":
        d[1] = "<path d='M 30 14 L 26 10 14 10 10 14 10 26 14 30 26 30 30 26 30 14 M 25 12 L 28 15 28 25 25 28 15 28 12 25 12 15 15 12 25 12 M 27 15 L 25 13 15 13 13 15 13 25 15 27 25 27 27 25 27 15 M 25 14 L 26 15 26 25 25 26 15 26 14 25 14 15 15 14 25 14 Z'/>";
        break;
    case "reformat":
        d[1] = "<path d='M 14 26 L 26 26 26 14 14 14 14 26 M 24 16 L 24 24 16 24 16 16 24 16 M 26 29 L 26 30 30 30 30 26 29 26 29 29 26 29 M 14 30 L 14 29 11 29 11 26 10 26 10 30 14 30 M 18 29 L 18 30 22 30 22 29 18 29 M 10 18 L 10 22 11 22 11 18 10 18 M 14 11 L 14 10 10 10 10 14 11 14 11 11 14 11 M 30 18 L 29 18 29 22 30 22 30 18 M 26 11 L 29 11 29 14 30 14 30 10 26 10 26 11 M 22 11 L 22 10 18 10 18 11 22 11 Z'/>";
        break;
    case "lumakey":
        d[1] = "<path d='M 10 30 L 28 30 28 12 10 12 10 30 M 26 28 L 12 28 12 14 26 14 26 28 M 23 23 L 23 22 24 22 24 20 18 20 16 18 14 18 14 24 16 24 18 22 22 22 22 23 23 23 M 15 23 L 15 19 16 19 17 20 17 22 16 23 15 23 M 29 24 L 30 24 30 10 16 10 16 11 29 11 29 24 Z'/>";
        break;
    case "simplex":
        d[1] = "<path d='M 30 22 L 30 20 28 22 25 19 22 22 15 14 10 19 10 21 15 16 22 24 25 21 28 24 30 22 M 15 18 L 10 23 10 25 15 20 22 28 25 25 28 28 30 26 30 24 28 26 25 23 22 26 15 18 Z'/>";
        break;
    case "throttle":
        d[1] = "<path d='M 30 22 Q 30 17.85 27.05 14.9 24.15 12 20 12 15.85 12 12.9 14.9 10 17.85 10 22 10 24.15 10.8 26 11.25 27.05 12 28 L 28 28 Q 28.75 27.05 29.2 26 30 24.15 30 22 M 25.65 16.35 Q 28 18.7 28 22 28 24.2 26.95 26 L 13.05 26 Q 12 24.2 12 22 12 18.7 14.35 16.35 16.7 14 20 14 23.3 14 25.65 16.35 M 20.4 22.95 Q 20.75 22.8 20.9 22.4 21.1 21.95 20.95 21.6 20.9 21.45 20.85 21.35 L 18.95 18.1 Q 18.85 17.9 18.65 17.8 18.5 17.75 18.3 17.85 18.1 17.95 18.05 18.1 17.95 18.3 18.05 18.5 L 19 22.1 Q 19 22.25 19.05 22.4 19.2 22.75 19.6 22.9 20.05 23.1 20.4 22.95 M 15 22.5 L 15 21.5 13 21.5 13 22.5 15 22.5 M 16.8 18.1 L 15.4 16.7 14.7 17.4 16.1 18.8 16.8 18.1 M 25 21.5 L 25 22.5 27 22.5 27 21.5 25 21.5 M 25.3 17.4 L 24.6 16.7 23.2 18.1 23.9 18.8 25.3 17.4 M 20.5 17 L 20.5 15 19.5 15 19.5 17 20.5 17 Z'/>";
        break;
    case "tone":
        d[1] = "<path d='M 26 24 L 26 22.55 Q 22.45 24.25 20 22.6 17.75 21 14 22 L 14 24 16 25 24 25 26 24 M 21 12 L 21 17 27 22 27 24 24 26 16 26 13 24 13 22 19 17 19 12 17 12 17 16 11 21 11 25 15 28 25 28 29 25 29 21 23 16 23 12 21 12 Z'/>";
        break;
    case "layer":
        d[1] = "<path d='M 30 15 L 30 14 21 10 19 10 10 14 10 15 19 20 21 20 30 15 M 28 14 L 28 15 21 18.75 19 18.75 12 15 12 14 19 11 21 11 28 14 M 26.55 17.45 L 25.6 17.95 28 19 28 20 21 23.75 19 23.75 12 20 12 19 14.35 17.95 13.45 17.45 10 19 10 20 19 25 21 25 30 20 30 19 26.55 17.45 M 26.55 22.45 L 25.6 22.95 28 24 28 25 21 28.75 19 28.75 12 25 12 24 14.35 22.95 13.45 22.45 10 24 10 25 19 30 21 30 30 25 30 24 26.55 22.45 Z'/>";
        break;
    case "whitebalance":
        d[1] = "<path d='M 30 12 L 26 12 24 14 28 14 28 16 12 16 12 14 22 14 20 12 10 12 10 18 30 18 30 12 M 20 22 L 18 24 28 24 28 26 12 26 12 24 16 24 14 22 10 22 10 28 30 28 30 22 20 22 M 23 14 L 27 10 19 10 23 14 M 13 20 L 17 24 21 20 13 20 Z'/>";
        break;
    case "color-select":
        d[1] = "<path d='M 28 10 L 26 10 Q 24.975 13.072 22 14 L 21 13 20 14 21 15 12 24 11 27 10 28 10.75 28.75 12.25 27.25 13 25 22 16 24 18 15 27 12.75 27.75 11.25 29.25 12 30 13 29 16 28 25 19 26 20 27 19 26 18 Q 26.59 14.875 30 14 L 30 12 28 10 M 29 13 Q 25.67 13.955 25 17 L 23 15 Q 26.29 14.093 27 11 L 29 13 M 18.65 22.35 L 16.55 22.35 13.5 25.4 13 26.95 14.85 26.2 18.65 22.35 Z'/>";
        break;
    case "colorcube":
        d[1] = "<path d='M 30 14 L 21 10 20 10 10 14 10 26 20 30 30 26 30 14 M 21 12 L 27.75 14.9 20 18 19 18 12.15 14.95 20 12 21 12 M 27.9 15.8 L 28 24.5 20 27.95 20 19 27.9 15.8 M 12 24.5 L 12 15.9 19 19 19 27.55 12 24.5 Z'/>";
        break;
    case "select":
        d[1] = "<path d='M 12 12 L 14 12 14 10 10 10 10 14 12 14 12 12 M 22 12 L 22 10 18 10 18 12 22 12 M 26 12 L 28 12 28 14 30 14 30 10 26 10 26 12 M 28 18 L 28 22 30 22 30 18 28 18 M 28 26 L 28 28 26 28 26 30 30 30 30 26 28 26 M 18 28 L 18 30 22 30 22 28 18 28 M 14 28 L 12 28 12 26 10 26 10 30 14 30 14 28 M 10 18 L 10 22 12 22 12 18 10 18 Z'/>";
        break;
    case "split":
        d[1] = "<path d='M 12 30 L 30 30 30 12 12 30 M 15 28 L 28 15 28 28 15 28 M 10 10 L 10 28 28 10 10 10 M 12 25 L 12 12 25 12 12 25 Z'/>";
        break;
    case "repeat":
        d[1] = "<path d='M 27 10 L 26 10 29 13 29 27 26 30 27 30 30 27 30 13 27 10 M 23 10 L 21 10 24 13 24 27 21 30 23 30 26 27 26 13 23 10 M 19 10 L 13 10 10 13 10 27 13 30 19 30 22 27 22 13 19 10 M 14 12 L 18 12 20 14 20 26 18 28 14 28 12 26 12 14 14 12 Z'/>";
        break;
    case "panorama":
        d[1] = "<path d='M 30 16 Q 27.85 13.4 25.75 12.3 23.65 11.15 20 11 16.15 11.25 14 12.4 11.8 13.5 10 16 L 10 29 Q 20.1 17.9 30 29 L 30 16 M 20 22 Q 14.9 22.3 12 25.2 L 12 16 Q 20.2 8.1 28 16 L 28 25.35 Q 24.95 22.2 20 22 Z'/>";
        break;
    case "linear-transfer":
        d[1] = "<path d='M 30 10 L 10 10 10 30 30 30 30 10 M 21 12 L 21 11 29 11 29 19 28 19 28 21 29 21 29 29 21 29 21 28 19 28 19 29 11 29 11 21 12 21 12 19 11 19 11 11 19 11 19 12 21 12 M 27 16 L 27 14 13 25 13 27 27 16 Z'/>";
        break;
    case "falsecolor":
        d[1] = "<path d='M 28 10 L 26 10 22 14 21 13 20 14 21 15 18.5 17.5 14.5 13.5 13.5 14.5 17.5 18.5 12 24 11 27 10 28 10.75 28.75 12.25 27.25 13 25 18.5 19.5 20.5 21.5 15 27 12.75 27.75 11.25 29.25 12 30 13 29 16 28 21.5 22.5 25.5 26.5 26.5 25.5 22.5 21.5 25 19 26 20 27 19 26 18 30 14 30 12 28 10 M 25 17 L 23 15 27 11 29 13 25 17 M 22 16 L 24 18 21.5 20.5 19.5 18.5 22 16 Z'/>";
        break;
    case "dither":
        d[1] = "<path d='M 20 25 L 20 30 25 30 25 25 20 25 M 20 20 L 15 20 15 25 20 25 20 20 M 20 10 L 15 10 15 15 20 15 20 10 M 30 20 L 25 20 25 25 30 25 30 20 M 25 20 L 25 15 20 15 20 20 25 20 M 25 10 L 25 15 30 15 30 10 25 10 M 10 25 L 10 30 15 30 15 25 10 25 M 10 15 L 10 20 15 20 15 15 10 15 Z'/>";
        break;
    case "expression":
        d[1] = "<path d='M 30 20 Q 30 15.85 27.05 12.9 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 15.85 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 25.65 14.35 Q 28 16.7 28 20 28 23.3 25.65 25.65 23.3 28 20 28 16.7 28 14.35 25.65 12 23.3 12 20 12 16.7 14.35 14.35 16.7 12 20 12 23.3 12 25.65 14.35 M 24.55 18.55 Q 25 18.1 25 17.5 25 16.9 24.55 16.45 24.1 16 23.5 16 22.9 16 22.45 16.45 22 16.9 22 17.5 22 18.1 22.45 18.55 22.9 19 23.5 19 24.1 19 24.55 18.55 M 17.55 18.55 Q 18 18.1 18 17.5 18 16.9 17.55 16.45 17.1 16 16.5 16 15.9 16 15.45 16.45 15 16.9 15 17.5 15 18.1 15.45 18.55 15.9 19 16.5 19 17.1 19 17.55 18.55 M 25 23 L 25 21 Q 20.15 25.05 15 21 L 15 23 Q 20.15 27.05 25 23 Z'/>";
        break;
    case "displacement":
        d[1] = "<path d='M 17.2 17.35 L 17.2 16.6 16.65 16.35 16.1 16.65 14.55 17.45 13.7 17.9 13.7 24.35 14.55 24.8 16.1 25.65 17.2 25.05 17.2 24.45 16.5 24.85 16.5 18.95 17.2 18.55 17.2 18.15 16.7 18.45 16.1 18.75 14.8 18.05 16.1 17.4 16.65 17.1 17.2 17.35 M 14.55 18.35 L 15.7 18.95 15.7 24.85 14.55 24.25 14.55 18.35 M 26.3 11.95 L 22.1 10.15 19.05 11.65 17.8 12.3 17.8 24.7 17.75 24.75 22.1 26.6 25.1 25 25.6 24.75 26.25 24.35 26.3 24.35 26.3 11.95 M 24.7 12.4 L 22.1 13.8 19.4 12.6 22.1 11.25 24.7 12.4 M 22.5 14 L 25.1 12.55 25.1 24.4 22.5 25.8 22.5 14 M 19.05 24.6 L 19.05 12.8 21.7 14 21.7 25.85 19.05 24.6 M 26.95 22.65 L 27 23.55 28 24 28 25 21 28.75 19 28.75 12 25 12 24 13 23.55 13 22.65 10 24 10 25 19 30 21 30 30 25 30 24 26.95 22.65 Z'/>";
        break;
    case "crop":
        d[1] = "<path d='M 25 14 L 27 12 14 12 14 10 12 10 12 12 10 12 10 14 12 14 12 27 14 25 14 14 25 14 M 28 13 L 26 15 26 26 15 26 13 28 26 28 26 30 28 30 28 28 30 28 30 26 28 26 28 13 Z'/>";
        break;
    case "colorcomplements":
        d[1] = "<path d='M 24 10 L 23 11 23 13 22 14 21 13 20 14 21 15 12 24 11 27 10 28 10.75 28.75 12.25 27.25 13 25 22 16 24 18 15 27 12.75 27.75 11.25 29.25 12 30 13 29 16 28 25 19 26 20 27 19 26 18 27 17 29 17 30 16 30 12 28 10 24 10 M 25 11 L 27 11 29 13 29 15 28 16 26 16 25 17 23 15 24 14 24 12 25 11 M 22 12.2 L 22 10.15 Q 21.039 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 22.188 10.8 24 L 16.45 17.85 Q 16 17.033 16 16 16 14.35 17.15 13.15 18.257 12.088 19.75 12 L 20.2 12 Q 21.139 12.021 22 12.2 M 29.8 18 L 27.75 18 Q 28 18.952 28 20 28 23.3 25.65 25.65 23.373 27.926 20.2 28 21.721 27.925 22.8 26.8 24 25.65 24 24 24 23.109 23.65 22.35 L 16.55 29.4 Q 18.17 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 30 18.9625 29.8 18 Z'/>";
        break;
    case "channels":
        d[1] = "<path d='M 30 20 Q 30 15.85 27.05 12.9 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 15.85 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 25.65 14.35 Q 26.415 15.115 26.9 15.95 28 17.774 28 20 28 22.21 26.95 24 26.425 24.875 25.65 25.65 23.3 28 20 28 16.7 28 14.35 25.65 13.575 24.875 13.05 24 12 22.211 12 20 12 17.774 13.05 15.95 13.584 15.115 14.35 14.35 16.7 12 20 12 23.3 12 25.65 14.35 M 25.45 24.3 L 21.1 21.8 21.1 27 Q 23.15 26.75 24.65 25.25 25.1 24.8 25.45 24.3 M 24.7 14.75 Q 23.2 13.25 21.15 13.05 L 21.15 18.2 25.5 15.7 Q 25.15 15.2 24.7 14.75 M 18.9 21.8 L 14.6 24.3 Q 14.9 24.8 15.35 25.25 16.85 26.75 18.9 27 L 18.9 21.8 M 18.95 13.05 Q 16.9 13.25 15.4 14.75 14.95 15.2 14.65 15.7 L 18.95 18.2 18.95 13.05 M 26.4 22.65 Q 27 21.45 27 20 27 18.55 26.4 17.35 L 21.8 20 26.4 22.65 M 13 20 Q 13 21.45 13.6 22.65 L 18.2 20 13.6 17.35 Q 13 18.55 13 20 Z'/>";
        break;
    case "gradientwipe":
        d[1] = "<path d='M 20 26 L 18 26 18 30 20 30 20 26 M 16 26 L 14 26 14 30 16 30 16 26 M 20 10 L 18 10 18 14 20 14 20 10 M 16 10 L 14 10 14 14 16 14 16 10 M 30 20 L 25 15 25 17 14 17 14 23 25 23 25 25 30 20 M 12 10 L 10 10 10 30 12 30 12 10 Z'/>";
        break;
    case "accumulator":
        d[1] = "<path d='M 27 18 L 27 17 20 10 13 17 13 18 20 11 27 18 M 27 21 L 27 19 20 12 13 19 13 21 20 14 27 21 M 13 23 L 20 30 27 23 20 16 13 23 M 24 23 L 20 27 16 23 20 19 24 23 Z'/>";
        break;
    case "temperature":
        d[1] = "<path d='M 23.5 21.45 Q 23.256 21.206 23 21 L 23 13 Q 23 11.75 22.1 10.85 21.25 10 20 10 18.75 10 17.85 10.85 17 11.75 17 13 L 17 20.95 Q 16.716 21.192 16.45 21.45 15 22.95 15 25 15 27.05 16.45 28.5 17.95 30 20 30 22.05 30 23.5 28.5 25 27.05 25 25 25 22.95 23.5 21.45 M 21 22.15 Q 21.615 22.365 22.1 22.85 23 23.75 23 25 23 26.25 22.1 27.1 21.25 28 20 28 18.75 28 17.85 27.1 17 26.25 17 25 17 23.75 17.85 22.85 18.367 22.3615 19 22.15 L 19 13 Q 19 12.6 19.3 12.3 19.6 12 20 12 20.4 12 20.7 12.3 21 12.6 21 13 L 21 22.15 M 20.5 23.05 L 20.5 19 19.5 19 19.5 23.05 Q 18.96 23.16 18.55 23.55 18 24.15 18 25 18 25.85 18.55 26.4 19.15 27 20 27 20.85 27 21.4 26.4 22 25.85 22 25 22 24.15 21.4 23.55 21.02 23.17 20.5 23.05 Z'/>";
        break;
    case "time":
        d[1] = "<path d='M 30 20 Q 30 15.85 27.05 12.9 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 15.85 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 25.65 14.35 Q 28 16.7 28 20 28 22.935 26.15 25.1 25.909 25.39 25.65 25.65 25.390 25.909 25.1 26.15 22.935 28 20 28 16.7 28 14.35 25.65 12 23.3 12 20 12 16.7 14.35 14.35 16.7 12 20 12 23.3 12 25.65 14.35 M 21 19 L 21 14 20 13 19 14 19 19 20 18 21 19 M 20 19 L 19 20 24.5 25.5 25.5 24.5 20 19 Z'/>";
        break;
    case "load":
        d[1] = "<path d='M 22 20 L 25 20 20 15 15 20 18 20 18 26 22 26 22 20 M 30 24 L 28 24 28 28 12 28 12 24 10 24 10 30 30 30 30 24 M 27 13 L 27 10 13 10 13 13 27 13 Z'/>";
        break;
    case "save":
        d[1] = "<path d='M 22 16 L 22 10 18 10 18 16 15 16 20 21 25 16 22 16 M 30 24 L 28 24 28 28 12 28 12 24 10 24 10 30 30 30 30 24 M 27 27 L 27 24 13 24 13 27 27 27 Z'/>";
        break;
    case "del":
        d[1] = "<path d='M 30 20 Q 30 15.85 27.05 12.9 24.15 10 20 10 15.85 10 12.9 12.9 10 15.85 10 20 10 24.15 12.9 27.05 15.85 30 20 30 24.15 30 27.05 27.05 30 24.15 30 20 M 25.65 14.35 Q 28 16.7 28 20 28 23.3 25.65 25.65 23.3 28 20 28 16.7 28 14.35 25.65 12 23.3 12 20 12 16.7 14.35 14.35 16.7 12 20 12 23.3 12 25.65 14.35 M 22.1 23.5 L 23.5 22.1 21.4 20 23.55 17.85 22.15 16.45 20 18.6 17.85 16.45 16.45 17.85 18.6 20 16.5 22.1 17.9 23.5 20 21.4 22.1 23.5 Z'/>";
        break;
    case "add":
        d[1] = "<path d='M 30 12 L 28 10 12 10 10 12 10 28 12 30 28 30 30 28 30 12 M 27 12 L 28 13 28 27 27 28 13 28 12 27 12 13 13 12 27 12 M 21 24 L 21 21 24 21 24 19 21 19 21 16 19 16 19 19 16 19 16 21 19 21 19 24 21 24 Z'/>";
        break;
    default:
        d[1] = "<path d='M 21 20 Q 24.4 17 23 13 22.5 11.6 20.9 10 L 18.9 10 Q 20.4 11.5 20.95 13 22.4 16.95 19 20 15.35 23.4 16.45 27 16.9 28.2 17.85 29.1 18.35 29.55 19 30 L 21 30 Q 19.1 28.3 18.5 27 17.05 23.65 21 20 M 20.2 14 Q 20.14 13.51 20 13 L 19.55 12 10 12 10 28 16.05 28 15.5 27 Q 15.28 26.50 15.15 26 L 12 26 12 14 20.2 14 M 21.9 10 Q 23.3 11.4 23.6 12 L 28 12 28 28 20.05 28 Q 20.4 28.5 20.9 29 21.4 29.5 22 30 L 30 30 30 10 21.9 10 Z'/>"
    }
    d[2] = "</g></svg>";
    return d.join("\n")
}
;
UIL.NodeElement = function(a, b, c, d) {
    var e = new UIL.ContextMenu({
        editor: a,
        buttons: [{
            name: "Remove",
            color: "r",
            onComplete: this.dispose.bind(this)
        }]
    });
    UIL.Node.call(this, a, c, d, e, void 0 == d);
    this.setAlphaMaterial = function(a) {
        this.material.alpha = a ? new THREE.NodeSwitch(this.tag,"w") : null
    }
    .bind(this);
    this.tag = b;
    b instanceof THREE.NodeMaterial ? this.material = b : (this.material = new THREE.NodePhongMaterial,
    this.material.color.value.set(0, 0, 0),
    this.material.specular.value.set(0, 0, 0),
    this.material.emissive = b,
    this.setAlphaMaterial("v4" == b.getType()),
    this.material.build());
    this.getTypeColor = function(a) {
        return UIL.NodeElement.TypeColor[a]
    }
    .bind(this);
    this.updateNodes = function() {
        for (var a = this.getParents(), b = a.length; b--; )
            a[b].material.build();
        this.material.build()
    }
    .bind(this);
    a = this.preview.content.getBoundingClientRect();
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.preview.canvas,
        precision: "lowp",
        antialias: !0,
        alpha: !0
    });
    this.renderer.setSize(a.width, a.height, !0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.PerspectiveCamera(45,a.width / a.height,1,2E4);
    this.camera.aspect = a.width / a.height;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(-100, 100, -200);
    this.controls = new THREE.OrbitControls(this.camera,this.preview.canvas);
    this.controls.update();
    this.render = function(a) {
        this.renderer.enableScissorTest(!1);
        this.renderer.setClearColor(3355443);
        a.overrideMaterial = this.material;
        this.renderer.render(a, this.camera)
    }
    .bind(this);
    this.updateAnimation = function(a) {
        this.material.updateAnimation(a)
    }
    .bind(this);
    this.onDispose = function() {
        this.setAlphaMaterial();
        this.renderer.dispose()
    }
    .bind(this)
}
;
UIL.NodeElement.prototype = Object.create(UIL.Node.prototype);
UIL.NodeElement.prototype.constructor = UIL.NodeElement;
UIL.NodeElement.TypeColor = {
    bv1: "#ff2126"
};
UIL.NodeUV = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeUV, "UV", "r");
    this.channel = this.add("list", {
        name: "channel",
        list: ["1", "2"],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.uv2 = "2" == a.value
        }
        .bind(this)
    })
}
;
UIL.NodeUV.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeUV.prototype.constructor = UIL.NodeUV;
UIL.NodeColor = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeColor, "Color");
    this.color = this.add("color", {
        name: "xyz / rgb",
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.value.setRGB(a.rgb[0], a.rgb[1], a.rgb[2])
        }
        .bind(this)
    })
}
;
UIL.NodeColor.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeColor.prototype.constructor = UIL.NodeColor;
UIL.NodeSpecularMIPLevel = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeSpecularMIPLevel, "Specular MIP Level");
    this.bias = this.add("color", {
        name: "bias",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeSpecularMIPLevel.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeSpecularMIPLevel.prototype.constructor = UIL.NodeSpecularMIPLevel;
UIL.NodeFloat = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeFloat, "Float");
    this.number = this.add("number", {
        name: "number",
        value: [0],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.number = a.value[0]
        }
        .bind(this)
    })
}
;
UIL.NodeFloat.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeFloat.prototype.constructor = UIL.NodeFloat;
UIL.NodeCameraPosition = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeCameraPosition, "Camera Position", "r");
    this.cameraPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeCameraPosition.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeCameraPosition.prototype.constructor = UIL.NodeCameraPosition;
UIL.NodeReflect = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeReflect, "Reflect", "r");
    this.reflect = this.add("number", {
        name: "reflect",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeReflect.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeReflect.prototype.constructor = UIL.NodeReflect;
UIL.NodeViewPosition = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeViewPosition, "View Position", "r");
    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeViewPosition.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeViewPosition.prototype.constructor = UIL.NodeViewPosition;
UIL.NodeTransformedPosition = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeTransformedPosition, "Transformed Position", "r");
    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeTransformedPosition.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeTransformedPosition.prototype.constructor = UIL.NodeTransformedPosition;
UIL.NodeTransformedNormal = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeTransformedNormal, "Transformed Normal", "r");
    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeTransformedNormal.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeTransformedNormal.prototype.constructor = UIL.NodeTransformedNormal;
UIL.NodeViewNormal = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeViewNormal, "View Normal", "r");
    this.normal = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeViewNormal.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeViewNormal.prototype.constructor = UIL.NodeViewNormal;
UIL.NodePI = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodePI, "Normal", "r");
    this.pi = this.add("number", {
        name: "3.14159",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodePI.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodePI.prototype.constructor = UIL.NodePI;
UIL.NodePI2 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodePI2, "Normal", "r");
    this.pi2 = this.add("number", {
        name: "6.28318",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodePI2.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodePI2.prototype.constructor = UIL.NodePI2;
UIL.NodeTimer = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeTimer, "Time");
    this.number = this.add("number", {
        name: "seconds",
        value: [0],
        output: !0,
        tag: this.tag
    });
    this.reset = this.add("button", {
        name: "reset",
        onComplete: function() {
            this.tag.number = 0
        }
        .bind(this)
    });
    this.tag._updateAnimation = this.tag.updateAnimation.bind(this.tag);
    this.tag.updateAnimation = function(a) {
        this.tag._updateAnimation(a);
        this.number.setValue(this.tag.value)
    }
    .bind(this);
    this.onRoot = function() {
        this.tag.number = 0
    }
    .bind(this)
}
;
UIL.NodeTimer.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeTimer.prototype.constructor = UIL.NodeTimer;
UIL.NodeVector2 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeVector2, "Vector2");
    this.add("number", {
        name: "xy",
        value: [0, 0],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.value.x = a.value[0];
            this.tag.value.y = a.value[1]
        }
        .bind(this)
    })
}
;
UIL.NodeVector2.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeVector2.prototype.constructor = UIL.NodeVector2;
UIL.NodeVector3 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeVector3, "Vector3");
    this.add("number", {
        name: "xyz",
        value: [0, 0, 0],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.value.x = a.value[0];
            this.tag.value.y = a.value[1];
            this.tag.value.z = a.value[2]
        }
        .bind(this)
    })
}
;
UIL.NodeVector3.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeVector3.prototype.constructor = UIL.NodeVector3;
UIL.NodeVector4 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeVector4, "Vector4");
    this.add("number", {
        name: "xyzw",
        value: [0, 0, 0, 1],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.value.x = a.value[0];
            this.tag.value.y = a.value[1];
            this.tag.value.z = a.value[2];
            this.tag.value.w = a.value[3]
        }
        .bind(this)
    })
}
;
UIL.NodeVector4.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeVector4.prototype.constructor = UIL.NodeVector4;
UIL.NodeOperator = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeOperator(new THREE.NodeFloat,new THREE.NodeFloat), "Operator", "y");
    this.dict = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/"
    };
    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.output = this.add("list", {
        name: "op",
        list: ["add", "subtract", "multiply", "divide"],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.op = this.dict[a.value];
            this.updateNodes()
        }
        .bind(this)
    })
}
;
UIL.NodeOperator.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeOperator.prototype.constructor = UIL.NodeOperator;
UIL.NodeMath1 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeMath1(new THREE.NodeFloat), "Mathx1", "y");
    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.f = this.add("list", {
        name: "f",
        list: [THREE.NodeMath1.RADIANS, THREE.NodeMath1.DEGREES, THREE.NodeMath1.EXPONENTIAL, THREE.NodeMath1.EXPONENTIAL2, THREE.NodeMath1.LOGARITHM, THREE.NodeMath1.LOGARITHM2, THREE.NodeMath1.INVERSE_SQUARE, THREE.NodeMath1.FLOOR, THREE.NodeMath1.CEILING, THREE.NodeMath1.NORMALIZE, THREE.NodeMath1.FRACTIONAL, THREE.NodeMath1.SINE, THREE.NodeMath1.COSINE, THREE.NodeMath1.TANGENT, THREE.NodeMath1.ARCSINE, THREE.NodeMath1.ARCCOSINE, THREE.NodeMath1.ARCTANGENT, THREE.NodeMath1.ABSOLUTE, THREE.NodeMath1.SIGN, THREE.NodeMath1.LENGTH],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
}
;
UIL.NodeMath1.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeMath1.prototype.constructor = UIL.NodeMath1;
UIL.NodeMath2 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeMath2(new THREE.NodeFloat,new THREE.NodeFloat), "Mathx2", "y");
    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.f = this.add("list", {
        name: "f",
        list: [THREE.NodeMath2.MIN, THREE.NodeMath2.MAX, THREE.NodeMath2.MODULO, THREE.NodeMath2.STEP, THREE.NodeMath2.REFLECT, THREE.NodeMath2.DISTANCE, THREE.NodeMath2.DOT, THREE.NodeMath2.CROSS, THREE.NodeMath2.EXPONENTIATION],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
}
;
UIL.NodeMath2.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeMath2.prototype.constructor = UIL.NodeMath2;
UIL.NodeMath3 = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeMath3(new THREE.NodeFloat,new THREE.NodeFloat,new THREE.NodeFloat), "Mathx1", "y");
    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.c = this.add("number", {
        name: "c",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.c = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.f = this.add("list", {
        name: "function",
        list: [THREE.NodeMath3.MIX, THREE.NodeMath3.REFRACT, THREE.NodeMath3.SMOOTHSTEP, THREE.NodeMath3.FACEFORWARD],
        output: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.tag.b = a ? a.tag : new THREE.NodeFloat;
            this.tag.c = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this),
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
}
;
UIL.NodeMath3.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeMath3.prototype.constructor = UIL.NodeMath3;
UIL.NodeSwitch = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeSwitch(new THREE.NodeFloat), "Switch", "y");
    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.NodeFloat;
            this.updateNodes()
        }
        .bind(this)
    });
    this.component = this.add("list", {
        name: "component",
        list: ["x", "y", "z", "w"],
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.component = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
}
;
UIL.NodeSwitch.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeSwitch.prototype.constructor = UIL.NodeSwitch;
UIL.NodeJoin = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeJoin, "Join", "y");
    this.updateJoin = function() {
        this.updateNodes()
    }
    .bind(this);
    this.x = this.add("number", {
        name: "x",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.x = a ? a.tag : new THREE.NodeFloat;
            this.updateJoin()
        }
        .bind(this)
    });
    this.y = this.add("number", {
        name: "y",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.y = a ? a.tag : null;
            this.updateJoin()
        }
        .bind(this)
    });
    this.z = this.add("number", {
        name: "z",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.z = a ? a.tag : null;
            this.updateJoin()
        }
        .bind(this)
    });
    this.w = this.add("number", {
        name: "w",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.w = a ? a.tag : null;
            this.setAlphaMaterial(this.tag.w);
            this.updateJoin()
        }
        .bind(this)
    });
    this.join = this.add("number", {
        name: "xy / xyz / xyzw",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeJoin.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeJoin.prototype.constructor = UIL.NodeJoin;
UIL.NodePhongMaterial = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodePhongMaterial, "Phong Material", "g");
    this.color = this.add("number", {
        name: "color",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.color = a ? a.tag : new THREE.NodeColor(15658734);
            this.tag.build()
        }
        .bind(this)
    });
    this.alpha = this.add("number", {
        name: "alpha",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.alpha = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.specular = this.add("number", {
        name: "specular",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.specular = a ? a.tag : new THREE.NodeColor(1118481);
            this.tag.build()
        }
        .bind(this)
    });
    this.shininess = this.add("number", {
        name: "shininess",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.shininess = a ? a.tag : new THREE.NodeFloat(30);
            this.tag.build()
        }
        .bind(this)
    });
    this.shadow = this.add("number", {
        name: "shadow",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.shadow = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.emissive = this.add("number", {
        name: "emissive",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.emissive = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.ambient = this.add("number", {
        name: "ambient",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.ambient = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.environment = this.add("number", {
        name: "environment",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.environment = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.reflectivity = this.add("number", {
        name: "reflectivity",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.reflectivity = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.normal = this.add("number", {
        name: "normal",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.normal = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.normalScale = this.add("number", {
        name: "normal scale",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.normalScale = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.transform = this.add("number", {
        name: "transform",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.transform = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.tag.build()
}
;
UIL.NodePhongMaterial.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodePhongMaterial.prototype.constructor = UIL.NodePhongMaterial;
UIL.NodeStandardMaterial = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeStandardMaterial, "Standard Material", "g");
    this.color = this.add("number", {
        name: "color",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.color = a ? a.tag : new THREE.NodeColor(15658734);
            this.tag.build()
        }
        .bind(this)
    });
    this.alpha = this.add("number", {
        name: "alpha",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.alpha = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.roughness = this.add("number", {
        name: "roughness",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.roughness = a ? a.tag : new THREE.NodeFloat(.5);
            this.tag.build()
        }
        .bind(this)
    });
    this.metalness = this.add("number", {
        name: "metalness",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.metalness = a ? a.tag : new THREE.NodeFloat(.5);
            this.tag.build()
        }
        .bind(this)
    });
    this.shadow = this.add("number", {
        name: "shadow",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.shadow = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.emissive = this.add("number", {
        name: "emissive",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.emissive = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.ambient = this.add("number", {
        name: "ambient",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.ambient = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.environment = this.add("number", {
        name: "environment",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.environment = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.reflectivity = this.add("number", {
        name: "reflectivity",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.reflectivity = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.normal = this.add("number", {
        name: "normal",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.normal = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.normalScale = this.add("number", {
        name: "normal scale",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.normalScale = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.transform = this.add("number", {
        name: "transform",
        input: !0,
        inputType: 3,
        onInput: function(a) {
            this.tag.transform = a ? a.tag : void 0;
            this.tag.build()
        }
        .bind(this)
    });
    this.tag.build()
}
;
UIL.NodeStandardMaterial.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeStandardMaterial.prototype.constructor = UIL.NodeStandardMaterial;
UIL.NodeTexture = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeTexture(new THREE.Texture), "Texture");
    this.setTexture = function(a) {
        this.tag.value = a;
        this.updateNodes()
    }
    ;
    this.coord = this.add("number", {
        name: "coord",
        input: !0,
        tag: this.tag.coord,
        onInput: function(a) {
            this.tag.coord = a ? a.tag : new THREE.NodeUV;
            this.updateNodes()
        }
        .bind(this)
    });
    this.bias = this.add("number", {
        name: "bias",
        input: !0,
        tag: this.tag.mip,
        onInput: function(a) {
            this.tag.bias = a ? a.tag : void 0;
            this.updateNodes()
        }
        .bind(this)
    });
    this.texture = this.add("number", {
        name: "xyzw / rgba",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeTexture.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeTexture.prototype.constructor = UIL.NodeTexture;
UIL.NodeCubeTexture = function(a) {
    UIL.NodeElement.call(this, a, new THREE.NodeCubeTexture(new THREE.CubeTexture([])), "Cube Texture");
    this.setCubeTexture = function(a) {
        this.tag.value = a;
        this.updateNodes()
    }
    ;
    this.coord = this.add("number", {
        name: "coord",
        input: !0,
        tag: this.tag.coords,
        onInput: function(a) {
            this.tag.coord = a ? a.tag : new THREE.NodeReflect;
            this.updateNodes()
        }
        .bind(this)
    });
    this.bias = this.add("number", {
        name: "bias",
        input: !0,
        tag: this.tag.mip,
        onInput: function(a) {
            this.tag.bias = a ? a.tag : void 0;
            this.updateNodes()
        }
        .bind(this)
    });
    this.texture = this.add("number", {
        name: "xyzw / rgba",
        output: !0,
        tag: this.tag
    })
}
;
UIL.NodeCubeTexture.prototype = Object.create(UIL.NodeElement.prototype);
UIL.NodeCubeTexture.prototype.constructor = UIL.NodeCubeTexture;
var editor = new UIL.NodeEditor({
    width: 300
})
  , material = new UIL.NodeStandardMaterial(editor);
editor.onDropImage = function(a, b) {
    function c(a, b, c) {
        var g = a.height / 3
          , h = document.createElement("canvas");
        h.width = g;
        h.height = g;
        h.getContext("2d").drawImage(a, -b * g, -c * g);
        return h
    }
    return function(a, b) {
        var f = new FileReader;
        f.readAsDataURL(a);
        f.onload = function(a) {
            (new THREE.ImageLoader).load(a.currentTarget.result, function(a) {
                var d;
                a.height + a.width / 4 == a.width ? (a = [c(a, 2, 1), c(a, 0, 1), c(a, 1, 0), c(a, 1, 2), c(a, 1, 1), c(a, 3, 1)],
                d = new THREE.CubeTexture(a),
                a = new UIL.NodeCubeTexture(editor),
                a.setCubeTexture(d)) : (d = new THREE.Texture(a),
                a = new UIL.NodeTexture(editor),
                a.setTexture(d));
                d.wrapS = d.wrapT = THREE.RepeatWrapping;
                d.flipY = !1;
                d.needsUpdate = !0;
                a.x = b.x;
                a.y = b.y;
                a.update()
            })
        }
    }
}();
var materials = new UIL.Menu(!0,!1,"g");
materials.add("button", {
    name: "StandardMaterial",
    title: "Standard"
});
materials.add("button", {
    name: "PhongMaterial",
    title: "Phong"
});
var inputs = new UIL.Menu(!0,!1);
inputs.add("button", {
    name: "Float"
});
inputs.add("button", {
    name: "Vector2"
});
inputs.add("button", {
    name: "Vector3"
});
inputs.add("button", {
    name: "Vector4"
});
inputs.add("button", {
    name: "Color"
});
inputs.add("button", {
    name: "Timer"
});
var natives = new UIL.Menu(!0,!1,"r");
natives.add("button", {
    name: "UV"
});
natives.add("button", {
    name: "Reflect"
});
natives.add("button", {
    name: "TransformedPosition",
    title: "T. Position"
});
natives.add("button", {
    name: "TransformedNormal",
    title: "T. Normal"
});
natives.add("button", {
    name: "ViewPosition",
    title: "View Position"
});
natives.add("button", {
    name: "ViewNormal",
    title: "View Normal"
});
natives.add("button", {
    name: "CameraPosition",
    title: "C. Position"
});
var math = new UIL.Menu(!0,!1,"y");
math.add("button", {
    name: "Operator"
});
math.add("button", {
    name: "Math1"
});
math.add("button", {
    name: "Math2"
});
math.add("button", {
    name: "Math3"
});
math.add("button", {
    name: "Switch"
});
math.add("button", {
    name: "Join"
});
editor.center();
editor.x += 300;
editor.update();
var clock = new THREE.Clock
  , scene = new THREE.Scene
  , lightKey = new THREE.PointLight(16777215,1,1E4);
lightKey.position.set(500, 500, -500);
scene.add(lightKey);
var lightFill = new THREE.PointLight(16777215,.9,1E5);
lightFill.position.set(-500, 500, 500);
scene.add(lightFill);
var lightBack = new THREE.PointLight(16777215,.4,1E5);
lightBack.position.set(-500, -500, 500);
scene.add(lightBack);
var mesh = new THREE.Mesh(new THREE.TeapotBufferGeometry);
mesh.castShadow = !1;
mesh.receiveShadow = !0;
scene.add(mesh);
function render() {
    for (var a = 0; a < editor.nodes.length; a++)
        editor.nodes[a].render(scene)
}
function update(a) {
    for (var b = 0; b < editor.nodes.length; b++)
        editor.nodes[b].updateAnimation(a)
}
editor.onResize = function() {}
;
function animate() {
    var a = clock.getDelta();
    update(a);
    render();
    requestAnimationFrame(animate)
}
animate();
