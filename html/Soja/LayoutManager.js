var LayoutManagerPanelInstance;
LayoutManagerPanelInstance = (function() {
  function LayoutManagerPanelInstance(el, data, title, elem_kind) {
    this.el = el;
    if (title == null) {
      title = "";
    }
    if (elem_kind == null) {
      elem_kind = "div";
    }
    this.div = document.createElement(elem_kind);
    this.div.style.position = "absolute";
    this.title = title;
  }
  LayoutManagerPanelInstance.prototype.destructor = function() {
    return this.hide();
  };
  LayoutManagerPanelInstance.prototype.render = function(info, offset) {
    var p_max, p_min;
    if (offset == null) {
      offset = 0;
    }
    this.el.appendChild(this.div);
    p_min = info.p_min;
    p_max = info.p_max;
    this.div.style.left = p_min[0] - offset;
    this.div.style.top = p_min[1] - offset;
    this.div.style.width = p_max[0] - p_min[0];
    this.div.style.height = p_max[1] - p_min[1];
    if (this.title !== "" && !(this.title_elem != null)) {
      return this.title_elem = new_dom_element({
        nodeName: "div",
        className: "Title",
        parentNode: this.div,
        txt: this.title
      });
    }
  };
  LayoutManagerPanelInstance.prototype.hide = function() {
    var _ref;
    if (((_ref = this.title_elem) != null ? _ref.parentNode : void 0) === this.div) {
      this.div.removeChild(this.title_elem);
    }
    if (this.div.parentNode === this.el) {
      return this.el.removeChild(this.div);
    }
  };
  return LayoutManagerPanelInstance;
})();var LayoutManager,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LayoutManager = (function(_super) {

  __extends(LayoutManager, _super);

  function LayoutManager(el, model, browser_state) {
    var i;
    this.el = el;
    this.model = model;
    if (browser_state == null) browser_state = new BrowserState;
    LayoutManager.__super__.constructor.call(this, [this.model, browser_state.window_size]);
    this.disp_top = 0;
    this.disp_left = 0;
    this.disp_right = 0;
    this.disp_bottom = 0;
    this.border_size = 4;
    this._pan_vs_id = {};
    this._int_edges = [];
    this._ext_edges = (function() {
      var _results,
        _this = this;
      _results = [];
      for (i = 0; i < 4; i++) {
        _results.push((function(i) {
          return new_dom_element({
            className: "LayoutManager_Border",
            onmousedown: function(evt) {
              return _this._cut_border_mouse_down(i % 2, i >= 2, evt);
            },
            style: {
              position: "absolute",
              cursor: "wnes"[i] + "-resize"
            }
          });
        })(i));
      }
      return _results;
    }).call(this);
    this.tmp_border = document.createElement("div");
    this.tmp_border.style.position = "absolute";
    this.tmp_border.style.opacity = 0.5;
    this._hidden = false;
  }

  LayoutManager.prototype.onchange = function() {
    if (!this._hidden) return this.render();
  };

  LayoutManager.prototype.new_panel_instance = function(data, title) {
    var b, g, r, res;
    res = new LayoutManagerPanelInstance(this.el, data, title);
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    res.div.style.background = "rgb( " + r + ", " + g + ", " + b + " )";
    return res;
  };

  LayoutManager.prototype.render = function() {
    var b, e, info, key, keys, p, p_max, p_min, used_pid, val, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _results;
    b = this.border_size;
    p_min = [this.disp_left + b, this.disp_top + b];
    p_max = [this.el.offsetWidth - this.disp_right - b, this.el.offsetHeight - this.disp_bottom - b];
    this.flat = this.model.make_info(p_min, p_max, b);
    this._ext_edges[0].style.left = this.disp_left + 0;
    this._ext_edges[0].style.top = this.disp_top;
    this._ext_edges[0].style.bottom = this.disp_bottom;
    this._ext_edges[0].style.width = this.border_size;
    this._ext_edges[1].style.top = this.disp_top + 0;
    this._ext_edges[1].style.left = this.disp_left + this.border_size;
    this._ext_edges[1].style.right = this.disp_right + this.border_size;
    this._ext_edges[1].style.height = this.border_size;
    this._ext_edges[2].style.right = this.disp_right + 0;
    this._ext_edges[2].style.top = this.disp_top;
    this._ext_edges[2].style.bottom = this.disp_bottom;
    this._ext_edges[2].style.width = this.border_size;
    this._ext_edges[3].style.bottom = this.disp_bottom + 0;
    this._ext_edges[3].style.left = this.disp_left + this.border_size;
    this._ext_edges[3].style.right = this.disp_right + this.border_size;
    this._ext_edges[3].style.height = this.border_size;
    _ref = this._ext_edges;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.parentNode !== this.el) this.el.appendChild(e);
    }
    _ref2 = this._int_edges;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      b = _ref2[_j];
      if (b.parentNode === this.el) this.el.removeChild(b);
    }
    this._int_edges = (function() {
      var _k, _len3, _ref3, _results,
        _this = this;
      _ref3 = this.flat;
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        p = _ref3[_k];
        if (p.d_border != null) {
          _results.push((function(p) {
            return new_dom_element({
              parentNode: _this.el,
              className: "LayoutManager_Border",
              onmousedown: function(evt) {
                return _this._int_border_mouse_down(p, evt);
              },
              style: {
                position: "absolute",
                cursor: p.d_border ? "row-resize" : "col-resize",
                left: p.d_border ? p.p_min[0] : p.p_max[0],
                top: p.d_border ? p.p_max[1] : p.p_min[1],
                width: p.d_border ? p.p_max[0] - p.p_min[0] : p.border_s,
                height: p.d_border ? p.border_s : p.p_max[1] - p.p_min[1]
              }
            });
          })(p));
        }
      }
      return _results;
    }).call(this);
    used_pid = {};
    _ref3 = this.flat;
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      info = _ref3[_k];
      if (!(info.children.length === 0)) continue;
      used_pid[info.panel_id] = true;
      if (!(this._pan_vs_id[info.panel_id] != null)) {
        this._pan_vs_id[info.panel_id] = this.new_panel_instance(info.data);
      }
      this._pan_vs_id[info.panel_id].render(info);
    }
    keys = (function() {
      var _ref4, _results;
      _ref4 = this._pan_vs_id;
      _results = [];
      for (key in _ref4) {
        val = _ref4[key];
        if (!(!(used_pid[key] != null))) continue;
        val.destructor();
        _results.push(key);
      }
      return _results;
    }).call(this);
    _results = [];
    for (_l = 0, _len4 = keys.length; _l < _len4; _l++) {
      key = keys[_l];
      _results.push(delete this._pan_vs_id[key]);
    }
    return _results;
  };

  LayoutManager.prototype.hide = function() {
    var b, key, val, _i, _j, _len, _len2, _ref, _ref2, _ref3, _results;
    this._hidden = true;
    _ref = this._pan_vs_id;
    for (key in _ref) {
      val = _ref[key];
      val.hide();
    }
    _ref2 = this._int_edges;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      b = _ref2[_i];
      if (b.parentNode === this.el) this.el.removeChild(b);
    }
    _ref3 = this._ext_edges;
    _results = [];
    for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
      b = _ref3[_j];
      if (b.parentNode === this.el) {
        _results.push(this.el.removeChild(b));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  LayoutManager.prototype.show = function() {
    this._hidden = false;
    return this.model._signal_change();
  };

  LayoutManager.prototype.set_message = function(msg) {
    if (!(this.message != null)) {
      this.message = document.createElement("span");
      this.message.className = "LayoutManager_Message";
      this.message.appendChild(document.createTextNode(msg));
    }
    if (this.message.parentNode === this.el) this.el.removeChild(this.message);
    this.el.appendChild(this.message);
    return this.message.firstChild.nodeValue = msg;
  };

  LayoutManager.prototype.del_message = function() {
    if ((this.message != null) && this.message.parentNode === this.el) {
      return this.el.removeChild(this.message);
    }
  };

  LayoutManager.prototype._end_mouse_interact = function() {
    this.el.onmouseup = null;
    this.el.onmouseout = null;
    this.el.onmousemove = null;
    if ((this.tmp_border != null) && this.tmp_border.parentNode === this.el) {
      this.el.removeChild(this.tmp_border);
    }
    return this.del_message();
  };

  LayoutManager.prototype._int_border_mouse_down = function(repr, evt) {
    var _this = this;
    if (!(evt != null)) evt = window.event;
    this.el.onmouseup = function(evt) {
      return _this._int_border_mouse_up(repr, evt);
    };
    this.el.onmouseout = function(evt) {
      return _this._int_border_mouse_out(repr, evt);
    };
    this.el.onmousemove = function(evt) {
      return _this._int_border_mouse_move(repr, evt);
    };
    if (typeof evt.preventDefault === "function") evt.preventDefault();
    evt.returnValue = false;
    return false;
  };

  LayoutManager.prototype._int_border_mouse_up = function(repr, evt) {
    this._end_mouse_interact();
    return this._use_int_border(repr, LayoutManager.abs_evt_pos(this.el, evt));
  };

  LayoutManager.prototype._int_border_mouse_out = function(repr, evt) {
    var from;
    if (!(evt != null)) evt = window.event;
    from = evt.relatedTarget || evt.toElement;
    if (!from || from.nodeName === "HTML") return this._end_mouse_interact();
  };

  LayoutManager.prototype._int_border_mouse_move = function(repr, evt) {
    if (!(evt != null)) evt = window.event;
    return this._update_int_border(repr, LayoutManager.abs_evt_pos(this.el, evt));
  };

  LayoutManager.prototype._update_int_border = function(info, p) {
    var c_0, c_1, d, l_0, l_1, ok, p_0, p_1, p_max, p_min, par;
    par = info.parent;
    d = info.d_border;
    p_0 = par.children[info.num_in_p + 0].p_min[d];
    p_1 = par.children[info.num_in_p + 1].p_max[d];
    if (p[d] < p_0 || p[d] > p_1) {
      c_0 = p[d] < p_0 && par.children[info.num_in_p + 0].can_be_destroyed();
      c_1 = p[d] > p_1 && par.children[info.num_in_p + 1].can_be_destroyed();
      if (c_0 || c_1) {
        if (c_0) {
          LayoutManager.resize_div(this.tmp_border, par.children[info.num_in_p + 0].p_min, par.children[info.num_in_p + 0].p_max);
        } else {
          LayoutManager.resize_div(this.tmp_border, par.children[info.num_in_p + 1].p_min, par.children[info.num_in_p + 1].p_max);
        }
        this.tmp_border.style.background = "#000000";
        this.set_message("Destruction ?");
      } else {
        this.set_message("This item cannot be destroyed");
      }
      return true;
    }
    ok = true;
    l_0 = p_0 + info.border_s / 2 + par.children[info.num_in_p + 0].min_by(d);
    l_1 = p_1 - info.border_s / 2 - par.children[info.num_in_p + 1].min_by(d);
    if (p[d] < l_0 || p[d] > l_1) {
      if (p[d] < l_0) {
        p[d] = l_0;
      } else {
        p[d] = l_1;
      }
      this.tmp_border.style.background = "#FF0000";
      this.set_message("The minimum size is achieved.");
      ok = false;
    }
    l_0 = p_0 + info.border_s / 2 + par.children[info.num_in_p + 0].max_by(d);
    l_1 = p_1 - info.border_s / 2 - par.children[info.num_in_p + 1].max_by(d);
    if (p[d] > l_0 || p[d] < l_1) {
      if (p[d] > l_0) {
        p[d] = l_0;
      } else {
        p[d] = l_1;
      }
      this.tmp_border.style.background = "#FF0000";
      this.set_message("The maximum size is achieved.");
      ok = false;
    }
    if (ok) {
      this.tmp_border.style.background = "#FFFFFF";
      this.del_message();
    }
    p_min = [info.p_min[0], info.p_min[1]];
    p_max = [info.p_max[0], info.p_max[1]];
    p_min[d] = p[d] - info.border_s / 2;
    p_max[d] = p[d] + info.border_s / 2;
    LayoutManager.resize_div(this.tmp_border, p_min, p_max);
    if (this.tmp_border.parentNode !== this.el) {
      return this.el.appendChild(this.tmp_border);
    }
  };

  LayoutManager.prototype._use_int_border = function(info, p) {
    var c_0, c_1, d, l_0, l_1, p_0, p_1, par;
    par = info.parent;
    d = info.d_border;
    p_0 = par.children[info.num_in_p + 0].p_min[d];
    p_1 = par.children[info.num_in_p + 1].p_max[d];
    if (p[d] < p_0 || p[d] > p_1) {
      c_0 = p[d] < p_0 && par.children[info.num_in_p + 0].can_be_destroyed();
      c_1 = p[d] > p_1 && par.children[info.num_in_p + 1].can_be_destroyed();
      if (c_0) this.model.rm_panel(par.children[info.num_in_p + 0].panel_id);
      if (c_1) this.model.rm_panel(par.children[info.num_in_p + 1].panel_id);
      return true;
    }
    l_0 = p_0 + this.border_size / 2 + par.children[info.num_in_p + 0].min_by(d);
    l_1 = p_1 - this.border_size / 2 - par.children[info.num_in_p + 1].min_by(d);
    p[d] = Math.max(p[d], l_0);
    p[d] = Math.min(p[d], l_1);
    if (par.children.length > 2) console.log("TODO: par.children.length > 2");
    this.model.find_item_with_panel_id(par.children[0].panel_id).strength.set(p[d] - this.border_size / 2 - p_0);
    return this.model.find_item_with_panel_id(par.children[1].panel_id).strength.set(p_1 - p[d] - this.border_size / 2);
  };

  LayoutManager.prototype._cut_border_mouse_down = function(d, s, evt) {
    var _this = this;
    if (!(evt != null)) evt = window.event;
    this._update_cut_border(d, s, LayoutManager.abs_evt_pos(this.el, evt));
    this.el.onmouseup = function(evt) {
      return _this._cut_border_mouse_up(d, s, evt);
    };
    this.el.onmouseout = function(evt) {
      return _this._cut_border_mouse_out(d, s, evt);
    };
    this.el.onmousemove = function(evt) {
      return _this._cut_border_mouse_move(d, s, evt);
    };
    if (typeof evt.preventDefault === "function") evt.preventDefault();
    evt.returnValue = false;
    return false;
  };

  LayoutManager.prototype._cut_border_mouse_up = function(d, s, evt) {
    var di, info, p, _i, _len, _ref;
    this._end_mouse_interact();
    p = LayoutManager.abs_evt_pos(this.el, evt);
    _ref = this.flat;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      info = _ref[_i];
      if (info.children.length === 0) {
        if (info.contains(p)) {
          if (info.p_max[d] - info.p_min[d] <= info.min_by(d) - this.border_size) {
            return false;
          }
          di = info.p_max[d] - info.p_min[d] - this.border_size;
          di += di === 0;
          this.model.mk_split(d, s, info.panel_id, (p[d] - info.p_min[d] - this.border_size / 2.0) / di);
        }
      }
    }
  };

  LayoutManager.prototype._cut_border_mouse_out = function(d, s, evt) {
    var from;
    if (!(evt != null)) evt = window.event;
    from = evt.relatedTarget || evt.toElement;
    if (!from || from.nodeName === "HTML") return this._end_mouse_interact();
  };

  LayoutManager.prototype._cut_border_mouse_move = function(d, s, evt) {
    if (!(evt != null)) evt = window.event;
    return this._update_cut_border(d, s, LayoutManager.abs_evt_pos(this.el, evt));
  };

  LayoutManager.prototype._update_cut_border = function(d, s, p) {
    var info, p_max, p_min, _i, _len, _ref;
    _ref = this.flat;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      info = _ref[_i];
      if (!(info.children.length === 0 && info.contains(p))) continue;
      if (p[d] - info.p_min[d] <= this.border_size / 2) continue;
      if (info.p_max[d] - p[d] <= this.border_size / 2) continue;
      p_min = [info.p_min[0], info.p_min[1]];
      p_max = [info.p_max[0], info.p_max[1]];
      p_min[d] = p[d] - this.border_size / 2;
      p_max[d] = p[d] + this.border_size / 2;
      if (info.p_max[d] - info.p_min[d] === info.min_by(d)) {
        this.tmp_border.style.background = "#FF0000";
        this.set_message("The panel size is already minimal for this direction.");
      } else if ((s === 0 && info.p_max[d] - p[d] < info.min_by(d)) || (s === 1 && p[d] - info.p_min[d] < info.min_by(d))) {
        this.tmp_border.style.background = "#FF0000";
        this.set_message("Dividing here would cause this panel to be under minimal size.");
      } else {
        this.tmp_border.style.background = "#FFFFFF";
        this.del_message();
      }
      LayoutManager.resize_div(this.tmp_border, p_min, p_max);
      if (this.tmp_border.parentNode !== this.el) {
        this.el.appendChild(this.tmp_border);
      }
      return true;
    }
    if (this.tmp_border.parentNode === this.el) {
      this.el.removeChild(this.tmp_border);
    }
    return false;
  };

  LayoutManager.resize_div = function(obj, p_min, p_max) {
    obj.style.left = p_min[0];
    obj.style.top = p_min[1];
    obj.style.width = p_max[0] - p_min[0];
    return obj.style.height = p_max[1] - p_min[1];
  };

  LayoutManager.getLeft = function(l) {
    if (l.offsetParent != null) {
      return l.offsetLeft + LayoutManager.getLeft(l.offsetParent);
    }
    return l.offsetLeft;
  };

  LayoutManager.getTop = function(l) {
    if (l.offsetParent != null) {
      return l.offsetTop + LayoutManager.getTop(l.offsetParent);
    }
    return l.offsetTop;
  };

  LayoutManager.abs_evt_pos = function(obj, evt) {
    return [evt.clientX - LayoutManager.getLeft(obj), evt.clientY - LayoutManager.getTop(obj)];
  };

  return LayoutManager;

})(View);
var LayoutManagerData,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LayoutManagerData = (function(_super) {

  __extends(LayoutManagerData, _super);

  LayoutManagerData._used_panel_id = [];

  function LayoutManagerData(data) {
    if (data == null) {
      data = {
        panel_id: "id_0"
      };
    }
    LayoutManagerData.__super__.constructor.call(this);
    this.add_attr({
      root: data
    });
    this._assign_default_values(this.root);
  }

  LayoutManagerData.prototype.make_info = function(p_min, p_max, border_size) {
    var lst, obj;
    lst = [];
    obj = this._make_graph_rec(lst, this.root.get(), border_size);
    this._make_sizes(obj, p_min, p_max);
    return lst;
  };

  LayoutManagerData.prototype.allow_destruction = function(data) {
    if (data.immortal) {
      return false;
    } else {
      return true;
    }
  };

  LayoutManagerData.prototype.find_item_with_panel_id = function(id, data) {
    var c, r, _i, _len, _ref, _ref2;
    if (data == null) data = this.root;
    if ((_ref = data.panel_id) != null ? _ref.equals(id) : void 0) return data;
    if (data.children != null) {
      _ref2 = data.children;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        c = _ref2[_i];
        r = this.find_item_with_panel_id(id, c);
        if (r != null) return r;
      }
    }
  };

  LayoutManagerData.prototype.find_parent_of_panel_id = function(id, data) {
    var c, r, _i, _len, _ref, _ref2;
    if (data == null) data = this.root;
    if (data.children != null) {
      _ref = data.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if ((_ref2 = c.panel_id) != null ? _ref2.equals(id) : void 0) return data;
        r = this.find_parent_of_panel_id(id, c);
        if (r != null) return r;
      }
    }
  };

  LayoutManagerData.prototype.mk_split = function(d, s, id, c, new_panel_id) {
    var ch, lc, nc, od, os;
    if (new_panel_id == null) new_panel_id = this._find_new_panel_id([]);
    ch = this.find_item_with_panel_id(id);
    od = ch.get();
    os = od.strength || 1;
    nc = {
      panel_id: new_panel_id
    };
    lc = [od, nc];
    if (!s) lc.reverse();
    lc[0].strength = 0 + c;
    lc[1].strength = 1 - c;
    ch.set({
      sep_norm: d,
      strength: os,
      children: lc,
      panel_id: this._find_new_panel_id([new_panel_id])
    });
    return new_panel_id;
  };

  LayoutManagerData.prototype.rm_panel = function(id) {
    var ch, ci, nn, pa;
    if (!this.allow_destruction(id)) return false;
    ch = this.find_item_with_panel_id(id);
    pa = this.find_parent_of_panel_id(id);
    if (pa.children.length === 2) {
      nn = 1 * (pa.children[0] === ch);
      ci = pa.children[nn].get();
      ci.strength = pa.strength.get();
      pa.set(ci);
    } else {
      console.log("TODO");
    }
    return true;
  };

  LayoutManagerData.prototype.panel_id_of_term_panels = function() {
    var res;
    res = [];
    this._get_panel_id_of_term_panels(res, this.root);
    return res;
  };

  LayoutManagerData.prototype.panel_ids = function() {
    var res;
    res = [];
    this._get_panel_ids(res, this.root);
    return res;
  };

  LayoutManagerData.prototype._make_graph_rec = function(lst, data, border_size, orig) {
    var ch, n, num_ci, repr, _ref, _ref2, _ref3;
    if (orig == null) orig = data;
    repr = {
      data: data,
      pan_mana: this,
      sep_norm: data.sep_norm || 0,
      border_s: data.border_s != null ? data.border_s : border_size,
      min_size: data.min_size || [0, 0],
      max_size: data.max_size || [1e5, 1e5],
      selected: data.selected,
      immortal: data.immortal,
      strength: data.strength || 1,
      panel_id: data.panel_id,
      children: [],
      parent: void 0,
      num_in_p: void 0,
      p_min: void 0,
      p_max: void 0,
      d_border: void 0,
      min_by: function(d) {
        var c, l, _i, _len, _ref;
        l = this.min_size[d];
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          l = Math.max(l, c.min_by(d));
        }
        return l;
      },
      max_by: function(d) {
        var c, l, _i, _len, _ref;
        l = this.max_size[d];
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          l = Math.min(l, c.max_by(d));
        }
        return l;
      },
      contains: function(p) {
        return (p != null) && p[0] >= this.p_min[0] && p[0] < this.p_max[0] && p[1] >= this.p_min[1] && p[1] < this.p_max[1];
      },
      can_be_destroyed: function() {
        var c, _i, _len, _ref;
        if (this.immortal) return false;
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (!c.can_be_destroyed()) return false;
        }
        if (!this.pan_mana.allow_destruction(data)) return false;
        return true;
      }
    };
    if ((_ref = data.children) != null ? _ref.length : void 0) {
      for (num_ci = 0, _ref2 = data.children.length; 0 <= _ref2 ? num_ci < _ref2 : num_ci > _ref2; 0 <= _ref2 ? num_ci++ : num_ci--) {
        ch = this._make_graph_rec(lst, data.children[num_ci], border_size, orig);
        repr.children.push(ch);
        ch.parent = repr;
        ch.num_in_p = num_ci;
      }
      if (repr.children.length) {
        for (n = 0, _ref3 = repr.children.length - 1; 0 <= _ref3 ? n < _ref3 : n > _ref3; 0 <= _ref3 ? n++ : n--) {
          repr.children[n].d_border = repr.sep_norm;
        }
      }
    }
    lst.push(repr);
    return repr;
  };

  LayoutManagerData.prototype._make_sizes = function(repr, p_min, p_max) {
    var c, child, con, d, end, i, m, n, n_max, n_min, num_ci, pos, s, sep, sum, tot, _i, _len, _ref, _ref2, _ref3, _ref4, _results;
    repr.p_min = p_min;
    repr.p_max = p_max;
    if (repr.children.length) {
      tot = p_max[repr.sep_norm] - p_min[repr.sep_norm];
      for (num_ci = 0, _ref = repr.children.length - 1; 0 <= _ref ? num_ci < _ref : num_ci > _ref; 0 <= _ref ? num_ci++ : num_ci--) {
        tot -= repr.children[num_ci].border_s;
      }
      sum = 0;
      _ref2 = repr.children;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        c = _ref2[_i];
        sum += c.strength;
      }
      con = (function() {
        var _j, _len2, _ref3, _results;
        _ref3 = repr.children;
        _results = [];
        for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
          i = _ref3[_j];
          _results.push(0);
        }
        return _results;
      })();
      sep = (function() {
        var _j, _len2, _ref3, _results;
        _ref3 = repr.children;
        _results = [];
        for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
          i = _ref3[_j];
          _results.push(0);
        }
        return _results;
      })();
      while (true) {
        end = true;
        for (n = 0, _ref3 = repr.children.length; 0 <= _ref3 ? n < _ref3 : n > _ref3; 0 <= _ref3 ? n++ : n--) {
          if (con[n]) continue;
          child = repr.children[n];
          s = child.strength;
          if (!(repr.sep_norm != null)) alert("sep_norm is not defined");
          d = Math.round(tot * s / sum);
          m = child.min_by(repr.sep_norm);
          if (d < m) {
            d = m;
            tot -= m;
            end = false;
            con[n] = 1;
            sum -= s;
          }
          m = child.max_by(repr.sep_norm);
          if (d > m) {
            d = m;
            tot -= m;
            end = false;
            con[n] = 1;
            sum -= s;
          }
          sep[n] = d;
        }
        if (end) break;
      }
      pos = p_min[repr.sep_norm];
      _results = [];
      for (num_ci = 0, _ref4 = repr.children.length; 0 <= _ref4 ? num_ci < _ref4 : num_ci > _ref4; 0 <= _ref4 ? num_ci++ : num_ci--) {
        n_min = [p_min[0], p_min[1]];
        n_max = [p_max[0], p_max[1]];
        n_min[repr.sep_norm] = pos;
        n_max[repr.sep_norm] = pos + sep[num_ci];
        this._make_sizes(repr.children[num_ci], n_min, n_max);
        _results.push(pos += sep[num_ci] + repr.children[num_ci].border_s);
      }
      return _results;
    }
  };

  LayoutManagerData.prototype._id_in_data_rec = function(cur, id) {
    var chi, _i, _len, _ref, _ref2;
    if ((_ref = cur.panel_id) != null ? _ref.equals(id) : void 0) return true;
    if (cur.children != null) {
      _ref2 = cur.children;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        chi = _ref2[_i];
        if (this._id_in_data_rec(chi, id)) return true;
      }
    }
    return false;
  };

  LayoutManagerData.prototype._find_new_panel_id = function(lst) {
    var trial, txt;
    if (lst == null) lst = [];
    trial = 0;
    while (true) {
      txt = "id_" + trial;
      if (lst.indexOf(txt) < 0 && LayoutManagerData._used_panel_id.indexOf(txt) < 0 && !this._id_in_data_rec(this.root, txt)) {
        LayoutManagerData._used_panel_id.push(txt);
        return txt;
      }
      trial += 1;
    }
  };

  LayoutManagerData.prototype._assign_default_values = function(cur) {
    var chi, _i, _len, _ref, _results;
    if (!(cur.panel_id != null)) {
      cur.add_attr({
        panel_id: new Str(this._find_new_panel_id([]))
      });
    }
    if (!(cur.strength != null)) {
      cur.add_attr({
        strength: 1
      });
    }
    if (cur.children != null) {
      _ref = cur.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chi = _ref[_i];
        _results.push(this._assign_default_values(chi));
      }
      return _results;
    }
  };

  LayoutManagerData.prototype._get_panel_id_of_term_panels = function(res, data) {
    var c, _i, _len, _ref, _ref2, _results;
    if ((_ref = data.children) != null ? _ref.length : void 0) {
      _ref2 = data.children;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        c = _ref2[_i];
        _results.push(this._get_panel_id_of_term_panels(res, c));
      }
      return _results;
    } else {
      return res.push(data.panel_id.get());
    }
  };

  LayoutManagerData.prototype._get_panel_ids = function(res, data) {
    var c, _i, _len, _ref, _ref2, _results;
    res.push(data.panel_id.get());
    if ((_ref = data.children) != null ? _ref.length : void 0) {
      _ref2 = data.children;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        c = _ref2[_i];
        _results.push(this._get_panel_ids(res, c));
      }
      return _results;
    }
  };

  return LayoutManagerData;

})(Model);
