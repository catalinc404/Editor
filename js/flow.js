////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isElectron()
{
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer')
    {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron)
    {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0)
    {
        return true;
    }

    return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getKeyByValue( object, value )
{
    return Object.keys(object).find(key => object[key] === value);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var UIL_ = UIL_ || function() {
    return {
        REVISION: "0.7-node",
        events: "onkeyup onkeydown onclick onchange onmouseover onmouseout onmousemove onmousedown onmouseup onmousewheel".split(" "),
        svgns: "http://www.w3.org/2000/svg",
        dragStart: function(a, b) {
            if (!document.tbFiller)
                return document.tbFiller = UIL_.DOM(b ? "UIL " + b : "", "div", "pointer-events:auto;position:absolute;z-index:5000;left:0;top:0;width:100%;height:100%;background-color:transparent;" + (a ? "cursor:" + a : "")),
                document.body.appendChild(document.tbFiller),
                document.tbFiller
        },
        dragStop: function() {
            document.tbFiller && document.tbFiller.parentNode.removeChild(document.tbFiller);
            delete document.tbFiller
        },
        classDefine: function() {
            UIL_.COLOR = "N";
            UIL_.SELECT = "#035fcf";
            UIL_.SELECTDOWN = "#024699";
            UIL_.SVGB = "rgba(0,0,0,0.2)";
            UIL_.SVGC = "rgba(120,120,120,0.6)";
            UIL_.txt1 = 'font-family:"Open Sans", sans-serif; font-size:11px; color:#000000; outline:0; padding:0px 10px; left:0; top:1px; height:17px; width:100px; overflow:hidden;';
            UIL_.CC("UIL", "position:absolute; pointer-events:none; box-sizing:border-box; -o-user-select:none; -ms-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -moz-user-select:none; margin:0; padding:0;");
            UIL_.CC("UIL.main", "top:28px;width:100%;height:100%;overflow:hidden;background:none;");
            UIL_.CC("UIL.menu", "width:100%; height:100%; overflow:hidden; background:none;");
            UIL_.CC("UIL.context-menu", "width:100%; height:100%; overflow:hidden; background:none; z-index:1000;");
            UIL_.CC("UIL.container", "position:absolute;overflow:hidden;width:100%;height:100%;overflow:hidden;background:none;");
            UIL_.CC("UIL.editor", "z-index:1;width:100%;height:100%;overflow:hidden;background:none;");
            UIL_.CC("UIL.grid", "pointer-events:auto;width:100%;height:100%;");
            UIL_.CC("UIL.grab", "cursor:move;cursor:-moz-grab;cursor:-webkit-grab;");
            UIL_.CC("UIL.grabbing", "cursor:move;cursor:-moz-grabbing;cursor:-webkit-grabbing;");
            UIL_.CC("UIL.links", "width:100%;height:100%;overflow:hidden;background:none;position:absolute;");
            UIL_.CC("UIL.preview", "position:absolute;top:0;left:0;pointer-events:none;width:100%;height:100%;");
            UIL_.CC("UIL.node", "position:fixed;");
            UIL_.CC("UIL.content", "position:initial;width:300px; overflow:hidden; background:none;");
            UIL_.CC("UIL.mask", "width:400px; height:100%; margin-left:-50px; pointer-events:auto; cursor:col-resize; background:none; display:none;");
            UIL_.CC("UIL.inner", "width:300px; top:0; left:0; height:auto; overflow:hidden; background:none;");
            UIL_.CC("UIL.base", "position:relative; height:20px; overflow:hidden; pointer-events:auto;");
            UIL_.CC("UIL.text", UIL_.txt1);
            UIL_.CC("input", "border:solid 1px rgba(0,0,0,0.2); background:rgba(130,130,130,0.2);", !0);
            UIL_.CC("input:focus", "border: solid 1px rgba(0,0,0,0); background:rgba(100,100,100,0.6);", !0);
            UIL_.CC("UIL.list", "box-sizing:content-box; border:20px solid transparent; border-bottom:10px solid transparent; left:80px; top:0px; width:190px; height:90px; overflow:hidden; cursor:s-resize; pointer-events:auto; display:none;");
            UIL_.CC("UIL.list-in", "left:0; top:0; width:100%; background:rgba(0,0,0,0.2); ");
            UIL_.CC("UIL.listItem", "position:relative; height:18px; background:rgba(0,0,0,0.2); border-bottom:1px solid rgba(0,0,0,0.2); pointer-events:auto; cursor:pointer;" + UIL_.txt1);
            UIL_.CC("UIL.listItem:hover", "background:" + UIL_.SELECT + "; color:#FFFFFF;");
            UIL_.CC("UIL.disconnect", "cursor:pointer;clip:rect(10px, 30px, 30px, 10px);margin-top:-10px;margin-left:-40px;width:40px;height:40px;position:fixed;pointer-events:auto;color:#AAC");
            UIL_.CC("UIL.svgbox", 'left:100px; top:1px; width:190px; height:17px; pointer-events:auto; cursor:pointer; font-family:"Open Sans", sans-serif; font-size:11px; text-align:center;')
        },
        color: function(a, b) {
            if (a)
                return "#" == a.charAt(0) ? a : this.bgcolor(a, b)
        },
        bgcolor: function(a, b) {
            var c = 204
              , d = 204
              , e = 204;
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
UIL_.ContextMenu = function(a) {
    this.dom = UIL_.DOM("UIL context-menu", "div");
    this.editor = a.editor;
    this.width = a.width || 150;
    this.buttons = a.buttons || [];
    this.childrens = [];
    for (a = this.offset = 0; a < this.buttons.length; a++)
        this.add(this.buttons[a])
};
UIL_.ContextMenu.prototype = {
    constructor: UIL_.ContextMenu,
    add: function(a) {
        var b = function() {
            this.editor.unselect(this);
            a.onComplete()
        }
        .bind(this);
        a.split && (this.offset += 4);
        this.childrens.push(new UIL_.Button({
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
        this.dom.style.top = ((b || 0) -28 ) + "px";
        this.dom.style.left = (a || 0) + "px";
        this.editor.select(this)
    },
    hide: function() {
        this.dom.parentNode.removeChild(this.dom);
        this.editor.unselect(this)
    }
};

UIL_.NodeEditor = function(a) {
    this.main = UIL_.DOM("UIL main");
    this.domContent = a.content || document.body;
    this.domContent.appendChild(this.main);
    this.dom = UIL_.DOM("UIL editor");
    this.main.appendChild(this.dom);
    this.grid = UIL_.DOM("UIL grid grab");
    this.dom.appendChild(this.grid);
    this.container = UIL_.DOM("UIL container");
    this.dom.appendChild(this.container);
    this.preview = UIL_.DOM("UIL preview", "canvas");
    this.dom.appendChild(this.preview);
    this.links = UIL_.DOM("UIL links");
    this.dom.appendChild(this.links);
    this.menu = UIL_.DOM("UIL menu", "div", "z-index:10000");
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
        UIL_.dragStart(null, "grabbing");
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
        UIL_.dragStop();
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
        (a = UIL_.draggingNode) && !a.visible && a.dispose();
        delete UIL_.dragging;
        delete UIL_.draggingNode;
        this.update()
    }
    .bind(this);
    this.main.onmousemove = function(a) {
        if (UIL_.dragging) {
            void 0 == UIL_.draggingNode && (UIL_.draggingNode = new UIL_["Node" + UIL_.dragging.attached](this),
            window.addEventListener("mouseup", this.onDropNode));
            var c = UIL_.draggingNode;
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
};
UIL_.NodeEditor.prototype = {
    constructor: UIL_.NodeEditor,
    add: function(node) {
        this.nodes.push(node)
    },
    remove: function(node) {
        node.disconnectAll();
        this.container.removeChild(node.dom);
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.update()
    },
    createLinks: function() {
        this.canvas && (this.map.parentNode.removeChild(this.map),
        this.canvas.parentNode.removeChild(this.canvas),
        this.front.parentNode.removeChild(this.front));
        this.canvas = UIL_.DOM("UIL canvas-links", "canvas");
        this.canvas.width = this.links.offsetWidth;
        this.canvas.height = this.links.offsetHeight;
        this.context = this.canvas.getContext("2d");
        this.front = UIL_.DOM("UIL canvas-links", "canvas", "z-index:10");
        this.front.width = this.links.offsetWidth;
        this.front.height = this.links.offsetHeight;
        this.frontContext = this.front.getContext("2d");
        this.aspectY = this.aspectX = 1;
        this.links.offsetWidth > this.links.offsetHeight ? (this.aspectX = 1,
        this.aspectY = this.links.offsetHeight / this.links.offsetWidth) : (this.aspectX = this.links.offsetWidth / this.links.offsetHeight,
        this.aspectY = 1);
        this.map = UIL_.DOM("UIL map", "canvas", "pointer-events:auto;z-index:100;position:absolute;top:0px;right:0px;");
        this.map.width = 300 * this.aspectX;
        this.map.height = 300 * this.aspectY;
        this.mapContext = this.map.getContext("2d");
        this.onMapDragStop = function() {
            delete this.dragging;
            this.map.className = "UIL map";
            UIL_.dragStop();
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
            UIL_.dragStart(null, "grabbing"),
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
        this.mapContext.fillStyle = "rgba(180, 180, 180, 0.98)";
        this.mapContext.fillRect(0, 0, this.coords.mapWidth, this.coords.mapHeight);
        for (var a = this.coords.nodes.length; a--; ) {
            var b = this.coords.nodes[a];
            this.mapContext.fillStyle = UIL_.bgcolor(b.node.uis[0].color);
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
        this.selected = a) && (this.selected instanceof UIL_.Node && (this.nodes.splice(this.nodes.indexOf(this.selected), 1),
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
                {
                    for (var f = d.input, 
                             g = e.output, 
                             h = g.getBoundingClientRect(), 
                             k = f.getBoundingClientRect(), 
                             d = [h.left + d.ioSize - 2, h.top + d.ioSize / 2, k.left + 2, k.top + e.ioSize / 2], 
                             e = 1, //Math.max(g.type, f.type), 
                             g = 0, //g.type - 1, 
                             h = 0, //f.type - 1, 
                             f = 0;                             
                             f < e; f++) 
                    {
                        var k = 2 * Math.min(f, g)
                          , l = 2 * Math.min(f, h);
                        this.drawLine(d[0], d[1] + k - 2 * g / 2, d[2], d[3] + l - 2 * h / 2)
                    }
                }
            }
    },
    drawLine: function(a, b, c, d, e, f, g)
    {
        f = f ? this.frontContext : this.context;
        e = 0.25 * Math.sqrt( (c-a)*(c-a) + (d-b)*(d-b) );
        f.beginPath();
        f.moveTo(a, b - 28);
        f.bezierCurveTo(a + e, b - 28, c - e, d - 28, c, d -28);
        f.lineWidth = 4;
        f.strokeStyle = "#333";
        f.stroke()

        f.lineWidth = 4;
        f.strokeStyle = "#AAC";
        f.stroke()
    },
    dispose: function() {
        window.removeEventListener("resize", this.resize)
    }
};

UIL_.Node = function(a, b, c, d, _name, _path, _preview) {
    this.editor = a;
    this.y = this.x = 0;
    this.width = this.width || 300;
    this.lockwheel = this.isCenter = !1;
    this.uis = [];
    this.dom = UIL_.DOM("UIL node", "div");
    this.editor.container.appendChild(this.dom);
    this.content = UIL_.DOM("UIL content", "div");

    this.dom.appendChild(this.content);
    this.mask = UIL_.DOM("UIL mask", "div");
    this.dom.appendChild(this.mask);
    this.inner = UIL_.DOM("UIL inner");
    this.content.appendChild(this.inner);
    this.changeWidth();
    this.down = !1;
    this.f = [];
    this.window = this.add("window", {
        name: b,
        color: c || "b",
        context: d
    });

    _preview && (this.preview = this.add("preview", { name: b })); 
    _name && (this.name = this.add("string", { name: "name", onChange: function(a) { this.name.value = a.value[0] }.bind(this) } ) );
    _path && (this.path = this.add("string", { name: "path", onChange: function(a) { this.path.value = a.value[0] }.bind(this) } ) );

    this.isRoot = function() { return 0 == this.getLinks().length; } .bind(this);
    this.startDrag = function(a) {  this.window.startDrag(a); }.bind(this);
    this.disconnectAll = function() { for (var a = this.uis.length; a--; )  this.uis[a].disconnectAll(); }.bind(this);
    this.dom.onmousedown = function(a) { this.editor.select(this); }.bind(this);
    this.resize();
    this.editor.add(this)
};

UIL_.Node.prototype = {
    constructor: UIL_.Node,
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
            c = new UIL_.Button(b);
            break;
        case "string":
            c = new UIL_.String(b);
            break;
        case "number":
            c = new UIL_.Number(b);
            break;
        case "title":
            c = new UIL_.Title(b);
            break;
        case "color":
            c = new UIL_.Color(b);
            break;
        case "slide":
            c = new UIL_.Slide(b);
            break;
        case "bool":
            c = new UIL_.Bool(b);
            break;
        case "list":
            c = new UIL_.List(b);
            break;
        case "group":
            c = new UIL_.Group(b);
            break;
        case "window":
            c = new UIL_.Window(b);
            break;
        case "preview":
            c = new UIL_.Preview(b)
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
        UIL_.setDOM(this.content, "width", this.width);
        var a = 0;
        this.isCenter && (a = .5 * -this.width,
        UIL_.setDOM(this.content, "margin-left", a));
        UIL_.setDOM(this.mask, "margin-left", a - 50);
        UIL_.setDOM(this.mask, "width", this.width + 100);
        UIL_.setDOM(this.inner, "width", this.width);
        for (a = this.uis.length; a--; )
            this.uis[a].setSize(this.width),
            this.uis[a].rSize()
    },
    liner: function(a) {
        return UIL_.DOM("UIL", "line", "width:100%; height:1px; bottom:0px;", {
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

UIL_.classDefine();

UIL_.Proto = function(a) {
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
    this.c[0] = UIL_.DOM("UIL base", "div", a.cc || "");
    this.attached = a.attached;
    if (a.draggable || a.attached)
        this.c[0].onmousedown = function(a) {
            UIL_.dragging = this
        }
        .bind(this);
    this.c[1] = UIL_.DOM("UIL text");
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
        UIL_.nodeOver && UIL_.nodeOver != this.node && (UIL_.nodeOver.output && this.element == this.input ? this.setConnection(UIL_.nodeOver) : UIL_.nodeOver.input && this.element == this.output && UIL_.nodeOver.setConnection(this));
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
        delete UIL_.nodeLink
    }
    .bind(this);
    this.c[0].addEventListener("mouseover", this.onIOMouseOut = function(a) {
        UIL_.nodeOver = this
    }
    .bind(this));
    this.c[0].addEventListener("mouseout", function(a) {
        delete UIL_.nodeOver
    }
    .bind(this));
    this.onIOMouseDown = function(a) {
        this.node.update();
        this.element = a.currentTarget;
        UIL_.nodeLink = this.node;
        window.addEventListener("mousemove", this.onIOMouseMove);
        window.addEventListener("mouseup", this.onIOMouseUp)
    }
    .bind(this);
    this.onIOMouseDown = function(a) {
        this.node.update();
        this.element = a.currentTarget;
        UIL_.nodeLink = this.node;
        window.addEventListener("mousemove", this.onIOMouseMove);
        window.addEventListener("mouseup", this.onIOMouseUp)
    }
    .bind(this);
    this.onDMouseOver = function(a) {
        UIL_.setSVG(this.disconnect, "fill", "rgba(255,0,0,1)")
    }
    .bind(this);
    this.onDMouseOut = function(a) {
        UIL_.setSVG(this.disconnect, "fill", "#666")
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
    }.bind(this);
    
    this.setConnection = function( nodeElement )
    {
        var oldConnection = this.connection;
        if (this.connection != nodeElement) 
        {
            if( this.connection )
                this.connection.links.splice(this.connection.links.indexOf(this), 1);

            if (this.connection = nodeElement)
            {
                this.connection.links.push(this);

                if( this.connection.node.isRecursive() )
                {
                    this.connection.links.splice(this.connection.links.indexOf(this), 1);
                    this.connection = null;
                }
            }

            this.disconnect.style.display = this.connection ? "block" : "none";

            if (this.connection && this.connection.onOutput)
            {
                this.connection.onOutput(this);
            }

            if( oldConnection != null )
            {
                this.node.connections.splice( this.node.connections.indexOf( { source: oldConnection, destination: this } ), 1 );
            }
            if( this.connection != null )
            {
                this.node.connections.push( { source: nodeElement, destination: this } );
            }

            if( this.onInput && !1 === this.onInput(this.connection) )
            {
                this.setConnection();
            }
        }
    }.bind(this);

    a.input && (this.input = this.createIO(this.ioSize),
    this.input.type = a.inputType || 3,
    this.onInput = a.onInput,
    this.input.style["margin-left"] = -this.ioSize / 2 + "px",
    a.inputColor && (this.input.style["border-color"] = a.inputColor),
    this.c[0].appendChild(this.input),
    this.disconnect = UIL_.DOM("UIL disconnect", "div", "display:none"),
    this.disconnect.innerHTML = UIL_.Icon("del"),
    UIL_.setSVG(this.disconnect, "fill", "#000000"),
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
};
UIL_.Proto.prototype = {
    constructor: UIL_.Proto,
    init: function() {
        this.c[0].style.background = UIL_.bgcolor(this.color);
        for (var a = 0; a < this.c.length; a++)
            0 == a ? this.target ? this.target.appendChild(this.c[0]) : this.node.inner.appendChild(this.c[0]) : this.c[0].appendChild(this.c[a]);
        this.rSize()
    },
    disconnectAll: function() {
        for (; this.links.length; )
            this.links[0].setConnection()
    },
    createIO: function(a) {
        a = UIL_.DOM("UIL io", "div", "z-index:10000;border:2px solid #eeeeee;width:" + a + "px;height:" + a + "px;margin-top:" + (-a / 2 + this.h / 2) + "px;position:fixed; background:#000; border-radius:8px; cursor:alias; pointer-events:auto;");
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
        for (var a = UIL_.events, b = this.c.length, c; b--; ) {
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

UIL_.Group = function(a) {
    UIL_.Proto.call(this, a);
    this.h = 25;
    this.isOpen = !1;
    this.c[2] = UIL_.DOM("UIL", "div", "top:25px; overflow:hidden;");
    this.c[3] = UIL_.DOM("UIL", "path", "position:absolute; width:16px; left:" + (this.sa + this.sb - 17) + "px; top:4px; pointer-events:none;", {
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
};
UIL_.Group.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Group.prototype.constructor = UIL_.Group;
UIL_.Group.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(3, "left", this.sa + this.sb - 17);
    this.setDom(1, "width", this.size);
    this.setDom(2, "width", this.size);
    for (var a = this.uis.length; a--; )
        this.uis[a].setSize(),
        this.uis[a].rSize();
    this.calc()
};
UIL_.Group.prototype.add = function(a, b) {
    b.target = this.c[2];
    UIL_.Node.prototype.add.call(this, a, b)
};
UIL_.Group.prototype.calc = function() {
    if (this.isOpen) {
        this.h = 25;
        for (var a = this.uis.length; a--; )
            this.h += this.uis[a].h;
        this.setDom(2, "height", this.h - 25);
        this.setDom(0, "height", this.h)
    }
};
UIL_.Group.prototype.open = function() {
    this.isOpen = !0;
    this.setSvg(3, "d", "M 12 6 L 8 10 4 6");
    this.calc();
    this.node.update()
};
UIL_.Group.prototype.close = function() {
    this.isOpen = !1;
    this.setSvg(3, "d", "M 6 4 L 10 8 6 12");
    this.h = 25;
    this.setDom(2, "height", 0);
    this.setDom(0, "height", this.h);
    this.node.update()
};
UIL_.Group.prototype.clear = function() {
    this.clearGroup();
    UIL_.Proto.prototype.clear.call(this)
};
UIL_.Group.prototype.clearGroup = function() {
    for (var a = this.uis.length; a--; )
        this.uis[a].clear(),
        this.uis.pop();
    this.uis = [];
    this.calc()
};

UIL_.Title = function(a) {
    UIL_.Proto.call(this, a);
    this.h = a.height || 31;
    var b = a.id || 0;
    a = a.prefix || "";
    this.c[2] = UIL_.DOM("UIL text", "div", "text-align:right; width:40px; padding:0px 5px;");
    31 == this.h && (this.setDom(0, "height", this.h),
    this.setDom(1, "top", 8),
    this.setDom(2, "top", 8));
    var c = b || 0;
    10 > b && (c = "0" + b);
    this.c[1].textContent = this.txt.substring(0, 1).toUpperCase() + this.txt.substring(1).replace("-", " ");
    this.c[2].textContent = a.toUpperCase() + " " + c;
    this.init()
};
UIL_.Title.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Title.prototype.constructor = UIL_.Title;
UIL_.Title.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(1, "width", this.size - 50);
    this.setDom(2, "left", this.size - 76)
};
UIL_.Title.prototype.text = function(a) {
    this.c[1].textContent = a
};
UIL_.Title.prototype.text2 = function(a) {
    this.c[2].textContent = a
};

UIL_.String = function(a) {
    UIL_.Proto.call(this, a);
    this.value = a.value || "";
    this.allway = a.allway || !1;
    this.c[2] = UIL_.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px;");
    this.c[2].name = "input";
    this.f[0] = function(a) 
    {
        this.value = a.target.value;
        13 === a.keyCode && this.callback && ( this.callback(a.target.value), a.target.blur());
        a.stopPropagation()
    }
    .bind(this);
    this.f[1] = function(a) {
        this.allway === true && this.callback(a.target.value);
        a.stopPropagation()
    }
    .bind(this);
    this.c[2].value = this.value;
    this.c[2].onkeydown = this.f[0];
    this.c[2].onkeyup = this.f[1];

    this.setValue = function( value )
    {
        this.value = value;
        this.c[2].value = this.value;
    }.bind(this);

    this.init()
};
UIL_.String.prototype = Object.create(UIL_.Proto.prototype);
UIL_.String.prototype.constructor = UIL_.String;
UIL_.String.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(2, "width", this.sb);
    this.setDom(2, "left", this.sa)
};

UIL_.Number = function(a) {
    UIL_.Proto.call(this, a);
    a.value = a.value || [];
    this.setTypeNumber(a);
    this.value = a.value;
    this.mask = this.mono ? null : this.node.mask;
    a.value && (this.value = a.value);
    this.length = this.value.length;
    this.w = (this.size / 3 * 2 - 5) / this.length - 5;
    this.current = null;
    for (a = this.length; a--; )
        this.c[2 + a] = UIL_.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px; width:" + this.w + "px; left:" + (this.size / 3 + this.w * a + 5 * a) + "px;"),
        this.c[2 + a].name = a,
        this.c[2 + a].value = this.value[a];
    this.mask || (this.c[2 + this.length] = UIL_.DOM("UIL mask", "div"),
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
            UIL_.dragStart("col-resize"),
            this.dragStart = !0
    }
    .bind(this);
    this.f[3] = function(a) {
        document.body.style.cursor = "inherit";
        this.mask.style.display = "none";
        window.removeEventListener("mousemove", this.f[2]);
        window.removeEventListener("mouseup", this.f[3]);
        delete this.dragStart;
        UIL_.dragStop();
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
};
UIL_.Number.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Number.prototype.constructor = UIL_.Number;
UIL_.Number.prototype.setValue = function(a) {
    this.value = a; 
    for (var b = a.length; b--; )
        this.c[b + 2].value = a[b];
    if (this.onChange)
        this.onChange(this)
};
UIL_.Number.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.w = (this.sb + 5) / this.length - 5;
    for (var a = this.length; a--; )
        this.setDom(2 + a, "left", this.sa + this.w * a + 5 * a),
        this.setDom(2 + a, "width", this.w)
};

UIL_.Color = function(a) {
    UIL_.Proto.call(this, a);
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
    this.c[2] = UIL_.DOM("UIL text", "input", "pointer-events:auto; padding:0px 5px; padding-bottom:2px;");
    this.c[2].spellcheck = !1;
    "up" == this.side && (this.decal = 5,
    this.c[2].style.top = "auto",
    this.c[2].style.bottom = "2px");
    this.c[3] = UIL_.DOM("UIL", "rect", "left:" + this.sa + "px;  top:" + this.decal + "px; width:" + this.width + "px; height:" + this.width + "px;", {
        x: this.mid - this.square,
        y: this.mid - this.square,
        width: 2 * this.square - 1,
        height: 2 * this.square - 1,
        fill: "#aaaaaa"
    });
    this.c[4] = UIL_.DOM("UIL", "canvas", "left:" + this.sa + "px;  top:" + this.decal + "px; display:none;");
    this.c[5] = UIL_.DOM("UIL", "canvas", "left:" + this.sa + "px;  top:" + this.decal + "px; pointer-events:auto; cursor:pointer; display:none;");
    "up" == this.side && (this.c[5].style.pointerEvents = "none");
    this.c[4].width = this.c[4].height = this.width;
    this.c[5].width = this.c[5].height = this.width;
    this.ctxMask = this.c[4].getContext("2d");
    this.ctxOverlay = this.c[5].getContext("2d");
    this.ctxMask.translate(this.mid, this.mid);
    this.ctxOverlay.translate(this.mid, this.mid);
    this.hsl = null;
    this.value = "#000000";
    a.value && (a.value instanceof Array ? this.value = UIL_.pack(a.value) : isNaN(a.value) ? this.value = a.value : this.value = UIL_.numFormat(a.value));
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
};
UIL_.Color.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Color.prototype.constructor = UIL_.Color;
UIL_.Color.prototype.redraw = function() {
    this.oldWidth = this.width;
    this.drawCircle();
    this.drawMask();
    this.drawMarkers()
};
UIL_.Color.prototype.show = function() {
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
};
UIL_.Color.prototype.hide = function() {
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
};
UIL_.Color.prototype.updateDisplay = function() {
    this.invert = .6 >= .3 * this.rgb[0] + .59 * this.rgb[1] + .11 * this.rgb[2];
    this.setSvg(3, "fill", UIL_.pack(UIL_.HSL2RGB([this.hsl[0], 1, .5])));
    this.drawMarkers();
    this.value = this.bcolor;
    this.c[2].value = this.bcolor.toUpperCase();
    var a = this.invert ? "#fff" : "#000";
    this.c[2].style["background-color"] = this.bcolor;
    this.c[2].style.color = a;
    if (this.onChange)
        this.onChange(this)
};
UIL_.Color.prototype.setColor = function(a) {
    var b = UIL_.unpack(a);
    this.bcolor != a && b && (this.bcolor = a,
    this.rgb = b,
    this.hsl = UIL_.RGB2HSL(this.rgb),
    this.updateDisplay());
    return this
};
UIL_.Color.prototype.getColor = function() {
    return parseInt("0x" + this.bcolor.substr(1))
};
UIL_.Color.prototype.setHSL = function(a) {
    this.hsl = a;
    this.rgb = UIL_.HSL2RGB(a);
    this.bcolor = UIL_.pack(this.rgb);
    this.updateDisplay();
    return this
};
UIL_.Color.prototype.calculateMask = function(a, b, c) {
    for (var d = 1 / a, e = 1 / b, f = 0; f <= b; ++f)
        for (var g = 1 - f * e, h = 0; h <= a; ++h) {
            var k = 1 - h * d
              , k = 1 - 2 * Math.min(g * k, (1 - g) * k);
            c(h, f, 0 < k ? .5 * (2 * g - 1 + k) / k : 0, k)
        }
};
UIL_.Color.prototype.drawMask = function() {
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
};
UIL_.Color.prototype.drawCircle = function() {
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
        k = UIL_.pack(UIL_.HSL2RGB([k, 1, .5])),
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
};
UIL_.Color.prototype.drawMarkers = function() {
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
};
UIL_.Color.prototype.widgetCoords = function(a) {
    return {
        x: a.pageX - this.offset.left - this.mid,
        y: a.pageY - this.offset.top - this.mid
    }
};
UIL_.Color.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
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
};
UIL_.hexToHtml = function(a) {
    return "#" + ("000000" + a.toString(16)).substr(-6)
};
UIL_.numFormat = function(a) {
    return "#" + ("000000" + a.toString(16)).substr(-6)
};
UIL_.pack = function(a) {
    var b = Math.round(255 * a[0])
      , c = Math.round(255 * a[1]);
    a = Math.round(255 * a[2]);
    return "#" + UIL_.dec2hex(b) + UIL_.dec2hex(c) + UIL_.dec2hex(a)
};
UIL_.u255 = function(a, b) {
    return parseInt(a.substring(b, b + 2), 16) / 255
};
UIL_.u16 = function(a, b) {
    return parseInt(a.substring(b, b + 1), 16) / 15
};
UIL_.unpack = function(a) {
    if (7 == a.length)
        return [UIL_.u255(a, 1), UIL_.u255(a, 3), UIL_.u255(a, 5)];
    if (4 == a.length)
        return [UIL_.u16(a, 1), UIL_.u16(a, 2), UIL_.u16(a, 3)]
};
UIL_.packDX = function(a, b) {
    return "#" + UIL_.dec2hex(b) + UIL_.dec2hex(a) + UIL_.dec2hex(a) + UIL_.dec2hex(a)
};
UIL_.dec2hex = function(a) {
    return (16 > a ? "0" : "") + a.toString(16)
};
UIL_.HSL2RGB = function(a) {
    var b, c = a[0];
    b = a[1];
    a = a[2];
    b = .5 >= a ? a * (b + 1) : a + b - a * b;
    a = 2 * a - b;
    return [UIL_.HUE2RGB(a, b, c + .33333), UIL_.HUE2RGB(a, b, c), UIL_.HUE2RGB(a, b, c - .33333)]
};
UIL_.HUE2RGB = function(a, b, c) {
    c = (c + 1) % 1;
    return 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (.66666 - c) * 6 : a
};
UIL_.RGB2HSL = function(a) {
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
};
UIL_.Slide = function(a) {
    UIL_.Proto.call(this, a);
    this.setTypeNumber(a);
    this.range = this.max - this.min;
    this.width = this.size / 3 * 2 - 50;
    this.w = this.width - 8;
    this.height = 17;
    this.value = a.value || 0;
    this.down = !1;
    this.c[2] = UIL_.DOM("UIL text", "div", "text-align:right; width:40px; padding:0px 5px;");
    this.c[3] = UIL_.DOM("UIL svgbox", "rect", "width:" + this.width + "px; height:" + this.height + "px; cursor:w-resize;", {
        width: this.width,
        height: this.height,
        fill: UIL_.SVGB,
        "stroke-width": 1,
        stroke: UIL_.SVGC
    });
    this.c[4] = UIL_.DOM("UIL svgbox", "rect", "width:" + this.width + "px; height:" + this.height + "px; pointer-events:none;", {
        x: 4,
        y: 4,
        width: this.width - 8,
        height: this.height - 8,
        fill: "#CCC",
        "stroke-width": 1,
        stroke: UIL_.SVGC
    });
    this.f[0] = function(a) {
        this.setSvg(3, "fill", "rgba(0,0,0,0.6)");
        this.setSvg(4, "fill", UIL_.SELECT)
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
};
UIL_.Slide.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Slide.prototype.constructor = UIL_.Slide;
UIL_.Slide.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.width = this.sb - 40;
    this.w = this.width - 8;
    this.setDom(2, "left", this.size - 50);
    this.setSvg(3, "width", this.width);
    this.setDom(3, "left", this.sa);
    this.setDom(3, "width", this.width);
    this.setDom(4, "left", this.sa);
    this.setDom(4, "width", this.width);
    this.f[5](!1)
};

UIL_.List = function(a) {
    UIL_.Proto.call(this, a);
    this.c[2] = UIL_.DOM("UIL list");
    this.c[3] = UIL_.DOM("UIL svgbox", "rect", "", {
        width: this.sb,
        height: 17,
        fill: UIL_.bgcolor(UIL_.COLOR),
        "stroke-width": 1,
        stroke: UIL_.SVGC
    });
    this.c[4] = UIL_.DOM("UIL", "path", "position:absolute; width:16px; height:16px; left:" + (this.sa + this.sb - 17) + "px; top:1px; pointer-events:none;", {
        width: 16,
        height: 16,
        d: "M 6 4 L 10 8 6 12",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.c[5] = UIL_.DOM("UIL text", "div", "text-align:center;");
    this.c[6] = UIL_.DOM("UIL svgbox", "rect", "top:20px; height:90px; pointer-events:none;", {
        x: this.sb - 15,
        y: 0,
        width: 10,
        height: 16,
        fill: "#666",
        "stroke-width": 1,
        stroke: UIL_.SVGC
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
    this.listIn = UIL_.DOM("UIL list-in");
    this.listIn.name = "list";
    this.c[2].style.height = this.maxHeight + "px";
    this.c[2].appendChild(this.listIn);
    for (var b, c = 0; c < this.length; c++)
        b = this.list[c],
        a = UIL_.DOM("UIL listItem", "div", "width:" + this.w + "px; height:18px;"),
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
        this.setSvg(3, "fill", UIL_.SELECT)
    }
    .bind(this);
    this.f[10] = function(a) {
        this.c[5].style.color = "#000";
        this.setSvg(3, "fill", "#CCC")
    }
    .bind(this);
    this.f[11] = function(a) {
        this.c[5].style.color = "#CCC";
        this.setSvg(3, "fill", UIL_.SELECTDOWN)
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
};
UIL_.List.prototype = Object.create(UIL_.Proto.prototype);
UIL_.List.prototype.constructor = UIL_.List;
UIL_.List.prototype.text = function(a) {
    this.c[5].textContent = a
};
UIL_.List.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
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
        UIL_.setDOM(this.listIn.children[a], "width", this.w)
};

UIL_.Bool = function(a) {
    UIL_.Proto.call(this, a);
    this.value = a.value || !1;
    this.c[2] = UIL_.DOM("UIL svgbox", "rect", "width:17px;", {
        width: 17,
        height: 17,
        fill: UIL_.SVGB,
        "stroke-width": 1,
        stroke: UIL_.SVGC
    });
    this.c[3] = UIL_.DOM("UIL svgbox", "path", "width:17px; pointer-events:none;", {
        width: 17,
        height: 17,
        d: "M 4 9 L 6 12 14 4",
        "stroke-width": 2,
        stroke: "#e2e2e2",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.value || (this.c[3].style.display = "none");
    this.f[0] = function(a) 
    {
        this.value ? (this.value = !1,
        this.c[3].style.display = "none",
        UIL_.setSVG(this.c[2], "fill", "rgba(0,0,0,0.2)")) : (this.value = !0,
        this.c[3].style.display = "block",
        UIL_.setSVG(this.c[2], "fill", "rgba(0,0,0,0.4)"));
        this.callback && this.callback(this.value)
    }
    .bind(this);
    this.c[2].onclick = this.f[0];
    this.init()
};
UIL_.Bool.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Bool.prototype.constructor = UIL_.Bool;
UIL_.Bool.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(2, "left", this.sa);
    this.setDom(3, "left", this.sa)
};

UIL_.Button = function(a) {
    UIL_.Proto.call(this, a);
    this.colorover = UIL_.color(a.colorover) || UIL_.SELECT;
    this.colordown = UIL_.color(a.colordown) || UIL_.color(a.colorover) || UIL_.SELECTDOWN;
    this.color = a.color || UIL_.COLOR;
    this.value = a.value || !1;
    this.c[2] = UIL_.DOM("UIL svgbox", "rect", "", {
        width: this.sb,
        height: 17,
        fill: UIL_.color(this.color),
        "stroke-width": 1,
        stroke: UIL_.SVGC
    });
    this.c[3] = UIL_.DOM("UIL text", "div", "text-align:center;");
    this.c[1].textContent = "";
    this.c[3].innerHTML = a.title || this.txt;
    this.f[0] = function(a) {
        if (this.onComplete)
            this.onComplete(this)
    }
    .bind(this);
    this.f[1] = function(a) {
        //this.c[3].style.color = "#FFF";
        this.setSvg(2, "fill", this.colorover);
        this.setSvg(2, "stroke-width", 0)
    }
    .bind(this);
    this.f[2] = function(a) {
        //this.c[3].style.color = "#EEEEEE";
        this.setSvg(2, "fill", UIL_.color(this.color));
        this.setSvg(2, "stroke-width", 1)
    }
    .bind(this);
    this.f[3] = function(a) {
        //this.c[3].style.color = "#EEEEEE";
        this.setSvg(2, "fill", this.colordown)
    }
    .bind(this);
    this.c[2].onmousedown = this.f[3];
    this.c[2].onmouseover = this.f[1];
    this.c[2].onmouseout = this.f[2];
    this.c[2].onmouseup = this.f[1];
    this.c[2].onclick = this.f[0];
    this.init()
};
UIL_.Button.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Button.prototype.constructor = UIL_.Button;
UIL_.Button.prototype.label = function(a) {
    this.c[3].textContent = a
};
UIL_.Button.prototype.icon = function(a) {
    this.c[3].style.padding = "0px 0px";
    this.c[3].innerHTML = a
};
UIL_.Button.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setSvg(2, "width", this.sb, 0);
    this.setDom(2, "width", this.sb);
    this.setDom(2, "left", this.sa);
    this.setDom(3, "width", this.sb);
    this.setDom(3, "left", this.sa)
};

UIL_.Menu = function(a, b, c) {
    this.left = void 0 !== a ? a : !0;
    this.top = void 0 !== b ? b : !0;
    this.colorover = void 0 !== c ? c : "b";
    this.uis = [];
    this.offset = 10;
    UIL_.Menu.uils = UIL_.Menu.uils || [];
    UIL_.Menu.uils.push(this)
};
UIL_.Menu.prototype = {
    constructor: UIL_.Menu,
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
        this.top ? b.pos.top = "10px" : b.pos.bottom = 10 + 25 * UIL_.Menu.uils.indexOf(this) + "px";
        this.offset += b.size + 10;
        switch (a) {
        case "button":
            c = new UIL_.Button(b);
            break;
        case "string":
            c = new UIL_.String(b);
            break;
        case "number":
            c = new UIL_.Number(b);
            break;
        case "title":
            c = new UIL_.Title(b);
            break;
        case "color":
            c = new UIL_.Color(b);
            break;
        case "slide":
            c = new UIL_.Slide(b);
            break;
        case "bool":
            c = new UIL_.Bool(b);
            break;
        case "list":
            c = new UIL_.List(b);
            break;
        case "group":
            c = new UIL_.Group(b);
            break;
        case "window":
            c = new UIL_.Window(b)
        }
        this.uis.push(c);
        return c
    }
};

UIL_.Window = function(a) {
    UIL_.Proto.call(this, a);
    this.h = 30;
    this.c[2] = UIL_.DOM("UIL", "div", "top:25px; overflow:hidden;");
    this.c[3] = UIL_.DOM("UIL", "path", "position:absolute; width:16px; left:" + (this.sa + this.sb - 17) + "px; top:4px; pointer-events:none;", {
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
};
UIL_.Window.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Window.prototype.constructor = UIL_.Window;
UIL_.Window.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(3, "left", this.sa + this.sb - 17);
    this.setDom(1, "width", this.size);
    this.setDom(2, "width", this.size)
};

UIL_.Preview = function(a) {
    UIL_.Proto.call(this, a);
    this.h = 200;
    this.setDom(0, "height", this.h);
    this.c[1].style.display = "none";
    this.content = this.c[2] = UIL_.DOM("UIL", "div", "width:100%;height:100%;overflow:hidden;");
    this.canvas = this.c[3] = UIL_.DOM("UIL", "canvas", "pointer-events:auto;width:100%;height:100%;overflow:hidden;");
    this.init()
};
UIL_.Preview.prototype = Object.create(UIL_.Proto.prototype);
UIL_.Preview.prototype.constructor = UIL_.Preview;
UIL_.Preview.prototype.rSize = function() {
    UIL_.Proto.prototype.rSize.call(this);
    this.setDom(1, "width", this.size - 50)
};

UIL_.Icon = function(a, b, c) {
    b = b || 40;
    var d = [];
    d[0] = "<svg version='1.1' xmlns='" + UIL_.svgns + "' preserveAspectRatio='none' x='0px' y='0px' fill='" + (c || "#FFF") + "' width='" + b + "px' height='" + b + "px' viewBox='0 0 40 40';'><g>";
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
};

UIL_.NodeElement = function(a, node, c, d, params )
{
    var contextMenu = null;
    if( params != null && params.contextMenu != null ) 
    { 
        contextMenu = params.contextMenu;
    }
    else
    {
        contextMenu = new UIL_.ContextMenu({
        editor: a,
        buttons: [{
            name: "Remove",
            color: "r",
            onComplete: this.dispose.bind(this)
        }]
       });
    }

    params = params || {};

    this.preview = (!(params.preview == false ));

    UIL_.Node.call(this, a, c, d, contextMenu, void 0 == d, (params.path != null), this.preview );
    
    this.setAlphaMaterial = function(a) 
    {
        this.material.alpha = a ? new THREE.SwitchNode(this.tag, "w" ) : null
    }.bind(this);

    this.tag = node;
    if( node instanceof THREE.NodeMaterial )
    {
        this.material = node;  
    }
    else
    {
        this.material = new THREE.PhongNodeMaterial();
        this.material.color.value.set(0, 0, 0);
        this.material.specular.value.set(0, 0, 0);
        this.material.emissive = node;
        /*this.setAlphaMaterial("v4" == b.getType()),*/
        this.material.build();
    }
    this.updateNodes = function()
    {
        for (var a = this.getParents(), b = a.length; b--; )
            a[b].material.build();
        this.material.build()
    }.bind(this);

    if( this.preview )
    {
        a = this.preview.content.getBoundingClientRect();

        var renderParams = null;
        if( params != null && params.renderParams != null )
        {
            renderParams = params.renderParams;
        }
        else
        {
            renderParams =
            {
                precision: "lowp",
                antialias: !0,
                alpha: !0
            };
        }
        renderParams.canvas = this.preview.canvas;
        
        this.renderer = new THREE.WebGLRenderer( renderParams );

        this.renderer.setSize( a.width, a.height, !0 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        
        this.camera = new THREE.PerspectiveCamera( 45, a.width / a.height, 1, 2E4);
        this.camera.aspect = a.width / a.height;
        this.camera.updateProjectionMatrix();
        this.camera.position.set( -100, 100, -200);
        
        this.controls = new THREE.OrbitControls( this.camera, this.preview.canvas );
        this.controls.update();

        this.render = function(a)
        {
            this.renderer.setScissorTest(!1);
            this.renderer.setClearColor( 0xaaaaaa );
            a.overrideMaterial = this.material;
            this.renderer.render(a, this.camera)
        }.bind(this);

        this.onDispose = function()
        {
            this.setAlphaMaterial();
            this.renderer.dispose();
            this.renderer = null;
    
        }.bind(this);

        this.updateAnimation = function(a)
        { 
            /*this.material.updateAnimation(a);*/
        }.bind(this);        
    }
    else
    {
        this.render = function(a){}.bind(this);
        this.onDispose = function(){}.bind(this);
        this.updateAnimation = function(a){}.bind(this);
    }

    this.connections = [];
};

UIL_.NodeElement.prototype = Object.create(UIL_.Node.prototype);
UIL_.NodeElement.prototype.constructor = UIL_.NodeElement;


UIL_.NodeUV = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.UVNode, "UV", "r",  { preview: false } );

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
};
UIL_.NodeUV.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeUV.prototype.constructor = UIL_.NodeUV;

UIL_.NodeColor = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.ColorNode, "Color", null, { preview: false } );

    this.color = this.add("color",
    {
        name: "xyz / rgb",
        output: !0,
        tag: this.tag,
        onChange: function(a) {
            this.tag.value.setRGB(a.rgb[0], a.rgb[1], a.rgb[2])
        }.bind(this)
    })
};
UIL_.NodeColor.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeColor.prototype.constructor = UIL_.NodeColor;

UIL_.NodeSpecularMIPLevel = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.SpecularMIPLevelNode, "Specular MIP Level");

    this.bias = this.add("color",
    {
        name: "bias",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeSpecularMIPLevel.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeSpecularMIPLevel.prototype.constructor = UIL_.NodeSpecularMIPLevel;

UIL_.NodeFloat = function( a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call( this, a, parameters.node || new THREE.FloatNode, "Float", null, { preview: false } );

    this.number = this.add( "number",   {
                                            name: "number",
                                            value: [0],
                                            output: !0,
                                            tag: this.tag,
                                            onChange: function(a)
                                            {
                                                this.tag.value = a.value[0]
                                            }.bind(this)
                                        } );
    this.updateValues = function()
    {
        this.number.setValue( [this.tag.value] );
    }.bind( this );
};
UIL_.NodeFloat.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeFloat.prototype.constructor = UIL_.NodeFloat;

UIL_.NodeCameraPosition = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.CameraPositionNode, "Camera Position", "r");

    this.cameraPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeCameraPosition.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeCameraPosition.prototype.constructor = UIL_.NodeCameraPosition;

UIL_.NodeReflect = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.ReflectNode, "Reflect", "r");

    this.reflect = this.add("number", {
        name: "reflect",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeReflect.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeReflect.prototype.constructor = UIL_.NodeReflect;

UIL_.NodeViewPosition = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.ViewPositionNode, "View Position", "r");

    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeViewPosition.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeViewPosition.prototype.constructor = UIL_.NodeViewPosition;

UIL_.NodeTransformedPosition = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.TransformedPositionNode, "Transformed Position", "r");

    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeTransformedPosition.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeTransformedPosition.prototype.constructor = UIL_.NodeTransformedPosition;

UIL_.NodeTransformedNormal = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.TransformedNormalNode, "Transformed Normal", "r");

    this.viewPosition = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeTransformedNormal.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeTransformedNormal.prototype.constructor = UIL_.NodeTransformedNormal;

UIL_.NodeViewNormal = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.ViewNormalNode, "View Normal", "r");

    this.normal = this.add("number", {
        name: "xyz",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeViewNormal.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeViewNormal.prototype.constructor = UIL_.NodeViewNormal;

UIL_.NodeTimer = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.TimerNode, "Time", null, { preview: false } );

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
};
UIL_.NodeTimer.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeTimer.prototype.constructor = UIL_.NodeTimer;

UIL_.NodeVector2 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Vector2Node, "Vector2", null, { preview: false } );

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
};
UIL_.NodeVector2.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeVector2.prototype.constructor = UIL_.NodeVector2;

UIL_.NodeVector3 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Vector3Node, "Vector3", null, { preview: false } );

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
};
UIL_.NodeVector3.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeVector3.prototype.constructor = UIL_.NodeVector3;

UIL_.NodeVector4 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Vector4Node, "Vector4", null, { preview: false } );

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
};
UIL_.NodeVector4.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeVector4.prototype.constructor = UIL_.NodeVector4;

UIL_.NodeOperator = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.OperatorNode(new THREE.FloatNode,new THREE.FloatNode), "Operator", "y", { preview: false } );

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
            this.tag.a = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.output = this.add("list", {
        name: "op",
        list: ["add", "subtract", "multiply", "divide"],
        output: !0,
        tag: this.tag,
        value: getKeyByValue( this.dict, this.tag.op ),
        onChange: function(a) {
            this.tag.op = this.dict[a.value];
            this.updateNodes()
        }
        .bind(this)
    });

    this.updateValues = function()
    {
        this.output.set
    }
};
UIL_.NodeOperator.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeOperator.prototype.constructor = UIL_.NodeOperator;

UIL_.NodeMath1 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Math1Node(new THREE.FloatNode), "Mathx1", "y", { preview: false } );

    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });

    this.list = 
    [
        THREE.Math1Node.RAD,
        THREE.Math1Node.DEG,
        THREE.Math1Node.EXP,
        THREE.Math1Node.EXP2,
        THREE.Math1Node.LOG,
        THREE.Math1Node.LOG2,
        THREE.Math1Node.SQRT,
        THREE.Math1Node.INV_SQRT,
        THREE.Math1Node.FLOOR,
        THREE.Math1Node.CEIL,
        THREE.Math1Node.NORMALIZE,
        THREE.Math1Node.FRACT,
        THREE.Math1Node.SAT,
        THREE.Math1Node.SIN,
        THREE.Math1Node.COS,
        THREE.Math1Node.TAN,
        THREE.Math1Node.ASIN,
        THREE.Math1Node.ACOS,
        THREE.Math1Node.ARCTAN,
        THREE.Math1Node.ABS,
        THREE.Math1Node.SIGN,
        THREE.Math1Node.LENGTH,
        THREE.Math1Node.NEGATE,
        THREE.Math1Node.INVERT,
    ];

    this.f = this.add("list", {
        name: "f",
        list: this.list,
        output: !0,
        tag: this.tag,
        value: this.list.indexOf( this.tag.method ),
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
};
UIL_.NodeMath1.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeMath1.prototype.constructor = UIL_.NodeMath1;

UIL_.NodeMath2 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Math2Node( new THREE.FloatNode, new THREE.FloatNode, THREE.Math2Node.MIN ), "Mathx2", "y", { preview: false } );

    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.list =
    [
        THREE.Math2Node.MIN, 
        THREE.Math2Node.MAX, 
        THREE.Math2Node.MOD,
        THREE.Math2Node.STEP,
        THREE.Math2Node.REFLECT,
        THREE.Math2Node.DISTANCE,
        THREE.Math2Node.DOT,
        THREE.Math2Node.CROSS,
        THREE.Math2Node.POW
    ];
    this.f = this.add("list", {
        name: "f",
        list: this.list,
        output: !0,
        tag: this.tag,
        value: this.list.indexOf( this.tag.method ),
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
};
UIL_.NodeMath2.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeMath2.prototype.constructor = UIL_.NodeMath2;

UIL_.NodeMath3 = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.Math3Node(new THREE.FloatNode,new THREE.FloatNode,new THREE.FloatNode), "Mathx3", "y", { preview: false } );

    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.b = this.add("number", {
        name: "b",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.b = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.c = this.add("number", {
        name: "c",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.c = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.list =
    [
        THREE.Math3Node.MIX,
        THREE.Math3Node.REFRACT,
        THREE.Math3Node.SMOOTHSTEP,
        THREE.Math3Node.FACEFORWARD
    ];
    this.f = this.add("list", {
        name: "function",
        list: this.list,
        output: !0,
        tag: this.tag,
        value: this.list.indexOf( this.tag.method ),
        onInput: function(a) {
            this.tag.a = a ? a.tag : new THREE.FloatNode;
            this.tag.b = a ? a.tag : new THREE.FloatNode;
            this.tag.c = a ? a.tag : new THREE.FloatNode;
            this.updateNodes()
        }
        .bind(this),
        onChange: function(a) {
            this.tag.method = a.value;
            this.updateNodes()
        }
        .bind(this)
    })
};
UIL_.NodeMath3.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeMath3.prototype.constructor = UIL_.NodeMath3;

UIL_.NodeSwitch = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.SwitchNode(new THREE.FloatNode), "Switch", "x", { preview: false } );

    this.a = this.add("number", {
        name: "a",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.node = a ? a.tag : new THREE.FloatNode;
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
};
UIL_.NodeSwitch.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeSwitch.prototype.constructor = UIL_.NodeSwitch;

UIL_.NodeJoin = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.JoinNode, "Join", "y", { preview: false } );

    this.updateJoin = function() {
        this.updateNodes()
    }
    .bind(this);
    this.x = this.add("number", {
        name: "x",
        input: !0,
        tag: this.tag,
        onInput: function(a) {
            this.tag.x = a ? a.tag : new THREE.FloatNode;
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
};
UIL_.NodeJoin.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeJoin.prototype.constructor = UIL_.NodeJoin;

UIL_.NodeStandardMaterial = function(a, parameters ) 
{
    parameters = parameters || {};

    var _this = this;

    this.scene = new THREE.Scene();

    this.lightKey = new THREE.PointLight(16777215,1,1E4);
    this.lightKey.position.set(500, 500, -500);
    this.scene.add( this.lightKey );

    this.lightFill = new THREE.PointLight(16777215,.9,1E5);
    this.lightFill.position.set(-500, 500, 500);
    this.scene.add( this.lightFill );

    this.lightBack = new THREE.PointLight(16777215,.4,1E5);
    this.lightBack.position.set(-500, -500, 500);
    this.scene.add( this.lightBack );

    this.mesh = new THREE.Mesh(new THREE.TeapotBufferGeometry);
    this.mesh.castShadow = !1;
    this.mesh.receiveShadow = !0;
    this.scene.add( this.mesh );

    this.loadObject = function( object )
    {
        var mesh = object.children[0];

        this.mesh.geometry = mesh.geometry;
    };

    var renderParams = 
    {
        precision: "highp",
        antialias: true,
        alpha: true,
        physicallyCorrectLights: true,
        gammaOutput: true,
    };

    var contextMenu = new UIL_.ContextMenu(
    {
        editor: a,
        buttons: 
        [
            {
                name: "Load",
                color: "r",
                onComplete: function() 
                { 
                    loadOBJ( _this.loadObject.bind( _this ) );
                }
            }
        ]
    });

    UIL_.NodeElement.call(  this, 
                            a, 
                            parameters.node || new THREE.StandardNodeMaterial, "Standard Material",
                            null,
                            { contextMenu: contextMenu, renderParams: renderParams, preview: true } );

    this.color = this.add("number", {
        name: "color",
        input: !0,
        inputType: 3,
        onInput: function(a)
        {
            if( a != null )
            {
                this.tag.color = a.tag;
            }
            else
            {
                this.tag.color = new THREE.ColorNode( 0xEEEEEE );
            }
            this.tag.build();
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
            if( a != null )
            {   this.tag.roughness = a.tag; }
            else
            {   this.tag.roughness = new THREE.FloatNode(.5); }

            this.tag.build()
        }
        .bind(this)
    });
    this.metalness = this.add("number", {
        name: "metalness",
        input: !0,
        inputType: 1,
        onInput: function(a) {
            this.tag.metalness = a ? a.tag : new THREE.FloatNode(.5);
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
    //TODO: add clearCoat
    //TODO: add clearCoatRoughness
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
    //TODO: add light
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
    //TODO: add ao
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
    //TODO: add position

    this.render = function( scene )
    {
        this.renderer.setScissorTest(!1);
        this.renderer.setClearColor( 0xaaaaaa );
        this.scene.overrideMaterial = this.material;
        this.renderer.render(this.scene, this.camera);
    };     
   
    this.width = parameters.width || 400;

    this.preview.h = this.width - 100;
    this.preview.setDom(0, "height", this.preview.h);

    UIL_.setDOM( this.preview.canvas, "width", this.width );
    UIL_.setDOM( this.preview.canvas, "height", this.preview.h );
    
    var rect = this.preview.canvas.getBoundingClientRect();

    this.renderer.setSize( rect.width, rect.height, !0 );
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();

    this.changeWidth();

    this.tag.build()
};
UIL_.NodeStandardMaterial.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeStandardMaterial.prototype.constructor = UIL_.NodeStandardMaterial;

UIL_.NodeTexture = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(  this, 
                            a,
                            parameters.node || new THREE.TextureNode(new THREE.Texture),
                            "Texture",
                            null,
                            { path: parameters.path || "", preview: true } );

    this.setTexture = function(a) {
        this.tag.value = a;
        this.updateNodes()
    };

    this.coord = this.add("number", {
        name: "coord",
        input: !0,
        tag: this.tag.uv,
        onInput: function(a) {
            this.tag.uv = a ? a.tag : new THREE.UVNode;
            this.updateNodes()
        }
        .bind(this)
    });
    this.bias = this.add("number", {
        name: "bias",
        input: !0,
        tag: this.tag.bias,
        onInput: function(a) {
            this.tag.bias = a ? a.tag : void 0;
            this.updateNodes()
        }
        .bind(this)
    });
    this.project = this.add("bool", {
        name: "project",
        input: !0,
        tag: this.tag.project,
        onInput: function(a) {
            this.tag.project = a ? Boolean(a.tag)  : false;
            this.updateNodes()
        }
        .bind(this)
    });    
    this.texture = this.add("number", {
        name: "xyzw / rgba",
        output: !0,
        tag: this.tag
    })
};
UIL_.NodeTexture.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeTexture.prototype.constructor = UIL_.NodeTexture;

UIL_.NodeCubeTexture = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.CubeTextureNode(new THREE.CubeTexture([])), "Cube Texture");

    this.setCubeTexture = function(a)
    {
        this.tag.value = a;
        this.updateNodes()
    };
    this.coord = this.add("number",
    {
        name: "coord",
        input: !0,
        tag: this.tag.coords,
        onInput: function(a)
        {
            this.tag.coord = a ? a.tag : new THREE.ReflectNode;
            this.updateNodes()
        }.bind(this)
    });
    this.bias = this.add("number",
    {
        name: "bias",
        input: !0,
        tag: this.tag.mip,
        onInput: function(a)
        {
            this.tag.bias = a ? a.tag : void 0;
            this.updateNodes()
        }.bind(this)
    });
    this.texture = this.add("number",
    {
        name: "xyzw / rgba",
        output: !0,
        tag: this.tag
    });
};
UIL_.NodeCubeTexture.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeCubeTexture.prototype.constructor = UIL_.NodeCubeTexture;

UIL_.NodeNormalMap = function(a, parameters )
{
    parameters = parameters || {};

    UIL_.NodeElement.call(this, a, parameters.node || new THREE.NormalMapNode( new THREE.TextureNode( new THREE.Texture([]) )), "Normal Map");

    this.setNormalTexture = function( texture )
    {
        this.tag.value.value = texture;
        this.updateNodes()
    };
    
    this.color = this.add("number", {
        name: "texture node",
        input: !0,
        inputType: 1,
        onInput: function(a)
        {
            if( a != null )
            {
                this.tag.value = a.tag;
            }
            else
            {
                this.tag.value = new THREE.TextureNode( new THREE.Texture( [] ) );
            }
            this.updateNodes()
        }
        .bind(this)
    });
    this.scale = this.add("number",
    {
        name: "scale",
        input: !0,
        tag: this.tag.scale,
        onInput: function(a)
        {
            this.tag.scale = a ? a.tag : new THREE.Vector2Node( 1.0, 1.0 );
            this.updateNodes()
        }.bind(this)
    });
    this.normal = this.add("number",
    {
        name: "normal",
        output: !0,
        tag: this.tag
    });
};
UIL_.NodeNormalMap.prototype = Object.create(UIL_.NodeElement.prototype);
UIL_.NodeNormalMap.prototype.constructor = UIL_.NodeNormalMap;

var editor = new UIL_.NodeEditor({width: 300 });

editor.onDropImage = function(a, b)
{
    function c(a, b, c)
    {
        var g = a.height / 3
          , h = document.createElement("canvas");
        h.width = g;
        h.height = g;
        h.getContext("2d").drawImage(a, -b * g, -c * g);
        return h
    }
    return function(a, b)
    {
        var f = new FileReader;
        var path = a.path || "";
        var name = path ? path.substr( path.lastIndexOf( "\\" ) + 1 ) : "";
        f.readAsDataURL(a);
        f.onload = function(a)
        {
            (new THREE.ImageLoader).load(a.currentTarget.result, function(a) {
                var d;
                a.height + a.width / 4 == a.width ? (a = [c(a, 2, 1), c(a, 0, 1), c(a, 1, 0), c(a, 1, 2), c(a, 1, 1), c(a, 3, 1)],
                d = new THREE.CubeTexture(a),
                a = new UIL_.NodeCubeTexture(editor),
                a.path.setValue( path ),
                a.name.setValue(name ),
                a.setCubeTexture(d)) : (d = new THREE.Texture(a),
                a = new UIL_.NodeTexture(editor),
                a.path.setValue( path ),
                a.name.setValue(name ),
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

var clock = new THREE.Clock();
var scene = new THREE.Scene();

var lightKey = new THREE.PointLight(16777215,1,1E4);
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

var mainMaterialNode = new UIL_.NodeStandardMaterial(editor);

editor.center();
editor.x += 350;
editor.update();

editor.onResize = function()
{};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getKeyByValue( object, value )
{
    return Object.keys(object).find(key => object[key] === value);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getNodeByUUID( uuid )
{
    var node = null;

    for( var i = 0, size = editor.nodes.length; i < size; ++i )
    {
        if( editor.nodes[ i ].tag.uuid ==  uuid )
        {
            node = editor.nodes[ i ];

            break;
        }
    }

    return node;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeTheme( theme )
{
    eventDispatcher.runCommand( "themeChange", theme );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function about()
{
    messageBox( { title: "About", contents: "<br>WebGL Editor<br>version 0.0.1<br><br>", type: EMessageBox.OK });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nodeNew( nodeType )
{
    UIL_.dragging = { attached: nodeType };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nodeClearAll()
{
    var nodes = [];
    for( var i = 0, size = editor.nodes.length; i < size; ++i )
    {
        nodes.push( editor.nodes[i] );
    }
    for( var i = 0, size = nodes.length; i < size; ++i )
    {
        nodes[i].dispose();
    }
    mainMaterialNode = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function materialOperation( operation )
{
    switch( operation )
    {
        case 'new':
        {
            nodeClearAll();
            mainMaterialNode = new UIL_.NodeStandardMaterial(editor);
            editor.center();
            editor.update();
        }
        break;

        case 'open':
        {
            loadMaterial( function( materialJSON )
            {
                nodeClearAll();

                console.log( materialJSON );

                mainMaterialNode = deserializeMaterial( materialJSON );

                if( mainMaterialNode == null )
                {
                    //console.log( "failed to load material" );

                    nodeClearAll();
                    mainMaterialNode = new UIL_.NodeStandardMaterial(editor);
                }

                editor.center();
                editor.update();
            });
        }
        break;

        case 'save':
        {
            var materialJSON = serializeMaterial( mainMaterialNode );
            console.log( materialJSON );

            var blob = new Blob( [ JSON.stringify( materialJSON ) ], { type: "application/json" } );
            saveAs( blob, materialName + ".json" );
        }
        break;

        case 'saveAs':
        {
            var userAgent = navigator.userAgent.toLowerCase();
            console.log( userAgent );
            if( isElectron() )
            {
                //electron
                const { dialog } = require( 'electron' ).remote;
                const fs = require( 'fs' );

                var savePath = dialog.showSaveDialog( {} );
                if( savePath != null )
                {
                    var materialJSON = serializeMaterial( mainMaterialNode.tag );
                    
                    //console.log( materialJSON );
        
                    var blob = JSON.stringify( materialJSON );
                    fs.writeFile( savePath, blob, function( error )
                                                  {
                                                    //console.log( "writeFile error:" + error );
                                                  });
                }
            }
        }
        break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadOBJ( callback )
{ 
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.multiple = false;

    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var length = event.target.files.length;
                                                    for( var i = 0; i < length; ++i )
                                                    {
                                                        var file = event.target.files[i];
                                                        
                                                        if( file.name.match(/\.(obj|OBJ)$/) ) 
                                                        {
                                                            var path = URL.createObjectURL( file );
                                                            var basePath = path.substr(0, path.lastIndexOf( "/" ) + 1 );
                                                            var fileName = path.substr( path.lastIndexOf( "/" ) + 1 );

                                                            var objLoader = new THREE.OBJLoader();
                                                            objLoader.setPath( basePath );
                                                            objLoader.load( fileName, function ( object ) 
                                                            {
                                                                callback( object );
                                                            } );
                                                        }
                                                    }
                                                }
                                            } );

    fileSelector.click();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadMaterial( callback )
{ 
    var fileSelector = document.createElement( "input" );
    fileSelector.type = 'file';
    fileSelector.multiple = false;

    fileSelector.addEventListener('change', function( event ) 
                                            {
                                                if( event.target.files.length > 0 )
                                                {
                                                    var length = event.target.files.length;
                                                    for( var i = 0; i < length; ++i )
                                                    {
                                                        var file = event.target.files[i];
                                                        if( file.name.match(/\.(json|JSON)$/) ) 
                                                        {
                                                            var fileReader = new FileReader();
                                                            fileReader.onload = function( event )
                                                            {
                                                                var json = JSON.parse( event.target.result );
                                                                callback( json );
                                                            };
                                                            fileReader.readAsText( file );
                                                        }
                                                    }
                                                }
                                            } );

    fileSelector.click();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function serializeMaterial( material )
{ 
    var materialJSON = material.toJSON();
    var materialName = "Material" + THREE.Math.generateUUID();

    for( var i = 0, size = editor.nodes.length; i < size; ++i )
    {
        var node = editor.nodes[ i ];
        var nodeUUID = node.tag.uuid;
        var nodeJSON = null;

        if( node instanceof UIL_.NodeStandardMaterial )
        {
            nodeJSON = materialJSON.materials[ nodeUUID ];
            materialName = node.name.value || materialName;
        }
        else
        {
            nodeJSON = materialJSON.nodes[ nodeUUID ];
        }

        nodeJSON.editor = {};
        nodeJSON.editor.position = { x: node.x, y: node.y };
        if( node.name != null )
        {
            nodeJSON.editor.name = node.name.value;
        }

        if( (node instanceof UIL_.NodeTexture) || (node instanceof UIL_.NodeCubeTexture) )
        {
            nodeJSON.editor.path = node.path.value;
        }
        
        nodeJSON.editor.connections = [];

        for( var j = 0, sizeConnections = node.connections.length; j < sizeConnections; ++j )
        {
            var sourceSlot = node.connections[j].source;
            var sourceNode = sourceSlot.node;

            var destinationSlot = node.connections[j].destination;
            var destinationNode = destinationSlot.node;

            nodeJSON.editor.connections.push( 
                {   source:      { node: sourceNode.tag.uuid, slot: getKeyByValue( sourceNode, sourceSlot)  },
                    destination: { node: destinationNode.tag.uuid, slot: getKeyByValue( destinationNode, destinationSlot ) } } );
        }
    }

    //console.log( json );

    return materialJSON;
}

function deserializeMaterial( materialJSON )
{
    var materialNode = null;

    var library = {};
    for( var key in materialJSON.nodes )
    {
        var jsonNode = materialJSON.nodes[ key ];
        if( jsonNode.nodeType == "Texture" )
        {
            if( jsonNode.editor && jsonNode.editor.path )
            {
                var texture = new THREE.TextureLoader().load( jsonNode.editor.path, function( _texture )
                {
                    _texture.wrapS = _texture.wrapT = THREE.RepeatWrapping;
                    _texture.flipY = false;
                    _texture.needsUpdate = true;                                
                });

                texture.uuid = jsonNode.value;
                library[ texture.uuid ] = texture;
            }
        }
    }

    var mainMaterialUUID = materialJSON.material;
    var loader = new THREE.NodeMaterialLoader( null, library );

    var material = loader.parse( materialJSON );
    if( material != null )
    {
        material.uuid = mainMaterialUUID;

        materialNode = new UIL_.NodeStandardMaterial( editor, { node: material } );
        
        var editorData = materialJSON.materials[ materialJSON.material.uuid ].editor;
        materialNode.name.setValue( editorData.name );
        materialNode.x = editorData.position.x;
        materialNode.y = editorData.position.y;

        for( var key in materialJSON.nodes )
        {
            var jsonNode = materialJSON.nodes[ key ];
            if( jsonNode.editor != null )
            {
                var editorData = jsonNode.editor;
                var editorNode = new UIL_[ "Node" + jsonNode.nodeType ]( editor, { node: loader.nodes[ jsonNode.uuid ] } );
                
                if( editorNode.updateValues != null )
                {
                    editorNode.updateValues();
                }

                if( editorData.name )
                {
                    editorNode.name.setValue( editorData.name );
                }
                if( editorNode instanceof UIL_.NodeTexture || editorNode instanceof UIL_.NodeCubeTexture )
                {
                    editorNode.path.setValue( editorData.path );
                }

                editorNode.x = editorData.position.x;
                editorNode.y = editorData.position.y;
            }
        }

        for( var key in materialJSON.nodes )
        {
            var jsonNode = materialJSON.nodes[ key ];
            if( jsonNode.editor != null && jsonNode.editor.connections != null )
            {
                for( var i = 0, size = jsonNode.editor.connections.length; i < size; ++i )
                {
                    var connection = jsonNode.editor.connections[i];
                    
                    var sourceNode = getNodeByUUID( connection.source.node.uuid );
                    var sourceSlot = sourceNode[ connection.source.slot ];
                    
                    var destinationNode = getNodeByUUID( connection.destination.node.uuid );
                    var destinationSlot = destinationNode[ connection.destination.slot ];

                    destinationSlot.setConnection( sourceSlot );
                }
            }
        }

        for( var key in materialJSON.materials )
        {
            var jsonNode = materialJSON.materials[ key ];
            if( jsonNode.editor != null && jsonNode.editor.connections != null )
            {
                for( var i = 0, size = jsonNode.editor.connections.length; i < size; ++i )
                {
                    var connection = jsonNode.editor.connections[i];
                    
                    var sourceNode = getNodeByUUID( connection.source.node.uuid );
                    var sourceSlot = sourceNode[ connection.source.slot ];
                    
                    var destinationNode = getNodeByUUID( connection.destination.node.uuid );
                    var destinationSlot = destinationNode[ connection.destination.slot ];

                    destinationSlot.setConnection( sourceSlot );
                }
            }
        }

        materialNode.tag.build();
    }

    return materialNode;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function render()
{
    for (var a = 0; a < editor.nodes.length; a++)
        editor.nodes[a].render(scene)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(a)
{
    for (var b = 0; b < editor.nodes.length; b++)
        editor.nodes[b].updateAnimation(a)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animate()
{
    var a = clock.getDelta();
    update(a);
    render();
    requestAnimationFrame(animate);
}

animate();

