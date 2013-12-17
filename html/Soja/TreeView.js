var TreeView;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
TreeView = (function() {
  __extends(TreeView, View);
  function TreeView(el, roots, selected, visible, closed, visibility_context) {
    this.el = el;
    this.roots = roots;
    this.selected = selected != null ? selected : new Lst;
    this.visible = visible != null ? visible : new Model;
    this.closed = closed != null ? closed : new Lst;
    this.visibility_context = visibility_context;
    if (!(this.visibility_context != null)) {
      this.visibility_context = new Str("default_visibility_context");
    }
    if (!(this.visible[this.visibility_context.get()] != null)) {
      this.visible.add_attr(this.visibility_context.get(), new Lst);
    }
    TreeView.__super__.constructor.call(this, [this.roots, this.closed, this.selected, this.visible, this.visibility_context]);
    this.css_prefix = "";
    this.icon_width = 18;
    this.line_height = 18;
    this.index_color_for_tree = 0;
    this.sep_x = this.line_height * 4 / 4;
    this._line_div = new_dom_element({
      className: this.css_prefix + "TreeLine",
      style: {
        position: "absolute",
        height: 2,
        right: 0
      }
    });
    this._created_elements = [];
    this.linked_id_dom = {};
  }
  TreeView.prototype.get_children_of = function(item) {
    return item._children;
  };
  TreeView.prototype.get_output_of = function(item) {
    return item._output;
  };
  TreeView.prototype.insert_child = function(par, pos, chi) {
    if (!(par._children != null)) {
      par.add_attr({
        _children: []
      });
    }
    return par._children.insert(pos, [chi]);
  };
  TreeView.prototype.get_viewable_of = function(item) {
    return item._viewable;
  };
  TreeView.prototype.get_computable_of = function(item) {
    return item.auto_compute;
  };
  TreeView.prototype.get_name_of = function(item) {
    return item._name;
  };
  TreeView.prototype.get_name_class_of = function(item) {
    return item._name_class;
  };
  TreeView.prototype.get_ico_of = function(item) {
    return item._ico;
  };
  TreeView.prototype.onchange = function() {
    var dom_elem, el, model, _i, _len, _ref, _ref2, _ref3, _results;
    if (this._need_render()) {
      this._update_repr();
      this._render();
    }
    _ref = this.flat;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      model = el.item;
      _results.push(this.linked_id_dom[model.model_id] != null ? (((_ref2 = this.get_children_of(model)) != null ? _ref2.has_been_directly_modified() : void 0) ? (dom_elem = this.linked_id_dom[model.model_id], dom_elem.classList.add("TreeJustModified")) : void 0, ((_ref3 = this.get_output_of(model)) != null ? _ref3.has_been_directly_modified() : void 0) ? (dom_elem = this.linked_id_dom[model.model_id], dom_elem.classList.add("TreeJustModified")) : void 0) : void 0);
    }
    return _results;
  };
  TreeView.prototype._get_color_element = function(info) {
    var col;
    col = "#262626";
    return col;
  };
  TreeView.prototype._get_next_color_element = function() {
    var tab;
    tab = ["lightSeaGreen"];
    if (this.index_color_for_tree === tab.length - 1) {
      this.index_color_for_tree = 0;
    } else {
      this.index_color_for_tree++;
    }
    return tab[this.index_color_for_tree];
  };
  TreeView.prototype._render = function() {
    var c, info, pos_y, _i, _j, _len, _len2, _ref, _ref2, _results;
    _ref = this._created_elements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      this.el.removeChild(c);
    }
    this._created_elements = [];
    this.linked_id_dom = {};
    pos_y = 0;
    this.height_header = this.line_height + 10;
    this.height_icon_bar = 0;
    pos_y += this.height_header;
    pos_y += this.height_icon_bar;
    this.treeContainer = new_dom_element({
      nodeName: "div",
      id: "ContainerTreeView",
      parentNode: this.el
    });
    this._created_elements.push(this.treeContainer);
    _ref2 = this.flat;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      info = _ref2[_j];
      _results.push(__bind(function(info) {
        var div, elem, is_ref, _i, _len, _ref;
        div = new_dom_element({
          parentNode: this.treeContainer,
          className: this.css_prefix + "TreeView",
          my_item: info,
          style: {
            position: "absolute",
            top: pos_y,
            height: this.line_height,
            lineHeight: this.line_height + "px",
            left: 0,
            right: 0,
            overflow: "hidden",
            color: this._get_color_element(info)
          },
          onclick: __bind(function(evt) {
            if (evt.ctrlKey) {
              this.selected.toggle(info.item_path);
            } else {
              this.selected.clear();
              this.selected.push(info.item_path);
            }
            return true;
          }, this),
          draggable: true,
          ondragstart: __bind(function(evt) {
            this.drag_info = info;
            this.drag_kind = evt.ctrlKey ? "copy" : "move";
            evt.dataTransfer.effectAllowed = this.drag_kind;
            return evt.dataTransfer.setData('text/plain', '');
          }, this),
          ondragend: __bind(function(evt) {
            if (this._line_div.parentNode === this.el) {
              this.el.removeChild(this._line_div);
            }
            evt.returnValue = false;
            return false;
          }, this),
          ondragover: __bind(function(evt) {
            var bar, n, num, par, _ref;
            for (num = _ref = info.path.length - 1; (_ref <= 0 ? num <= 0 : num >= 0); (_ref <= 0 ? num += 1 : num -= 1)) {
              par = info.path[num];
              if (this._accept_child(par, this.drag_info)) {
                n = par.num_in_flat;
                if (num + 1 < info.path.length) {
                  bar = info.path[num + 1];
                  n = bar.num_in_flat + this._nb_displayed_children(bar);
                }
                this._line_div.style.top = this.line_height * (n + 1) + this.height_header + this.height_icon_bar;
                this._line_div.style.left = this.sep_x * (num + 1);
                this.el.appendChild(this._line_div);
                break;
              }
            }
            evt.returnValue = false;
            return false;
          }, this),
          ondragleave: __bind(function(evt) {
            if (this._line_div.parentNode === this.el) {
              this.el.removeChild(this._line_div);
            }
            evt.returnValue = false;
            return false;
          }, this),
          ondrop: __bind(function(evt) {
            var accept_child, file, files, format, n, num, p, par, pic, _i, _len, _ref, _ref2;
            console.log(evt, evt.dataTransfer.files, info);
            if (typeof files === "undefined") {
              evt.stopPropagation();
              evt.returnValue = false;
              evt.preventDefault();
              files = evt.dataTransfer.files;
            }
            if (evt.dataTransfer.files.length > 0) {
              for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                format = file.type.indexOf("image");
                console.log("TODO, need to create an Img who contains a Path");
                if (format !== -1) {
                  pic = new ImgItem(file.name);
                  accept_child = info.item.accept_child(pic);
                  if (accept_child === true) {
                    info.item.add_child(pic);
                    info.item.img_collection.push(pic);
                  }
                }
              }
            }
            for (num = _ref = info.path.length - 1; (_ref <= 0 ? num <= 0 : num >= 0); (_ref <= 0 ? num += 1 : num -= 1)) {
              par = info.path[num];
              if (this._accept_child(par, this.drag_info)) {
                if (this.drag_kind === "move" && this.drag_info.parents.length) {
                  p = this.drag_info.parents[this.drag_info.parents.length - 1];
                  if ((_ref2 = this.get_children_of(p.item)) != null) {
                    _ref2.remove_ref(this.drag_info.item);
                  }
                }
                n = 0;
                if (num + 1 < info.path.length) {
                  n = info.path[num + 1].num_in_parent + 1;
                }
                this.insert_child(par.item, n, this.drag_info.item);
                break;
              }
            }
            evt.returnValue = false;
            evt.stopPropagation();
            evt.preventDefault();
            return false;
          }, this)
        });
        this.linked_id_dom[info.item.model_id] = div;
        is_ref = false;
        _ref = this.flat;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (elem.item.equals(info.item)) {
            if (!this.selected.contains(info.item_path)) {
              if (this.selected.contains(elem.item_path)) {
                is_ref = true;
                break;
              }
            }
          }
        }
        if (is_ref) {
          div.className += " " + this.css_prefix + "TreePartiallySelected";
        }
        if (this.selected.contains(info.item_path)) {
          div.className += " " + this.css_prefix + "TreeSelected";
        } else if (this.closed.contains(info.item_path) && this._has_a_selected_child(info.item, info.item_path)) {
          div.className += " " + this.css_prefix + "TreePartiallySelected";
        }
        pos_y += this.line_height;
        this._add_tree_signs(div, info);
        return this._make_line(div, info);
      }, this)(info));
    }
    return _results;
  };
  TreeView.prototype._add_tree_signs = function(div, info) {
    var len_i, num_i, p, pos_x, tc, _i, _len, _ref, _ref2;
    pos_x = 0;
    _ref = info.parents;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (p.num_in_parent < p.len_sibling - 1) {
        new_dom_element({
          parentNode: div,
          nodeName: 'span',
          className: this.css_prefix + "TreeIcon_tree_cnt",
          style: {
            position: "absolute",
            top: 0,
            left: pos_x,
            width: this.sep_x,
            height: this.line_height
          }
        });
      }
      pos_x += this.sep_x;
    }
    tc = this.css_prefix + "TreeIcon_tree";
    num_i = info.num_in_parent;
    len_i = info.len_sibling;
    if (len_i === 1) {
      tc += "_end";
    } else if (num_i === 0 && info.path.length === 1) {
      tc += "_beg";
    } else if (num_i < len_i - 1) {
      tc += "_mid";
    } else {
      tc += "_end";
    }
    if ((_ref2 = this.get_children_of(info.item)) != null ? _ref2.length : void 0) {
      if (this.closed.contains(info.item_path)) {
        tc += "_add";
      } else {
        tc += "_sub";
      }
    }
    return new_dom_element({
      parentNode: div,
      className: tc,
      nodeName: 'span',
      onmousedown: __bind(function(evt) {
        return this.closed.toggle(info.item_path);
      }, this),
      style: {
        position: "absolute",
        top: 0,
        left: pos_x,
        width: this.sep_x,
        height: this.line_height
      }
    });
  };
  TreeView.prototype._make_line = function(div, info) {
    var classTitle, name, pos_x, _ref, _ref2;
    pos_x = this.sep_x * info.path.length;
    name = new_dom_element({
      parentNode: div,
      txt: info.name,
      className: info.name_class,
      style: {
        position: "absolute",
        top: 0,
        height: this.line_height,
        left: pos_x,
        right: 0
      }
    });
    if (info.is_an_output) {
      name.style.textAlign = "left";
      name.style.color = "red";
      name.style.right = "20px";
    }
    if (this.get_computable_of(info.item) != null) {
      if (info.item._computation_mode.get() === false && info.item._computation_state.get() === false) {
        classTitle = "TreeComputableItem";
      } else if (info.item._computation_state.get() === true || info.item._pending_state.get() === true || info.item._processing_state.get() === true || info.item._finish_state.get() === true) {
        classTitle = "TreeProcessingItem";
      }
      new_dom_element({
        parentNode: div,
        className: this.css_prefix + classTitle,
        onmousedown: __bind(function(evt) {
          if (info.item._computation_mode.get() === false && info.item._computation_state.get() === false) {
            return info.item.do_it();
          }
        }, this),
        style: {
          position: "absolute",
          top: 0,
          right: 22
        }
      });
    }
    if ((_ref = this.get_viewable_of(info.item)) != null ? _ref.toBoolean() : void 0) {
      return new_dom_element({
        parentNode: div,
        className: (_ref2 = info.item, __indexOf.call(this.visible[this.visibility_context.get()], _ref2) >= 0) ? this.css_prefix + "TreeVisibleItem" : this.selected.contains(info.item_path) ? this.css_prefix + "TreeSelectedItem" : this.css_prefix + "TreeHiddenItem",
        onmousedown: __bind(function(evt) {
          if ((info.item._allow_vmod != null) === false || info.item._allow_vmod.get()) {
            return this.visible[this.visibility_context.get()].toggle_ref(info.item);
          }
        }, this),
        style: {
          position: "absolute",
          top: 0,
          right: 0
        }
      });
    }
  };
  TreeView.prototype._update_repr = function() {
    var num_item;
    this.flat = [];
    return this.repr = (function() {
      var _ref, _results;
      _results = [];
      for (num_item = 0, _ref = this.roots.length; (0 <= _ref ? num_item < _ref : num_item > _ref); (0 <= _ref ? num_item += 1 : num_item -= 1)) {
        _results.push(this._update_repr_rec(this.roots[num_item], num_item, this.roots.length, []));
      }
      return _results;
    }).call(this);
  };
  TreeView.prototype._update_repr_rec = function(item, number, length, parents, output) {
    var ch, info, num_ch, p, par, _ref;
    if (output == null) {
      output = false;
    }
    info = {
      item: item,
      name: this.get_name_of(item).get(),
      name_class: ((_ref = this.get_name_class_of(item)) != null ? _ref.get() : void 0) || "",
      num_in_parent: number,
      len_sibling: length,
      children: [],
      outputs: [],
      parents: parents,
      path: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = parents.length; _i < _len; _i++) {
          p = parents[_i];
          _results.push(p);
        }
        return _results;
      })(),
      item_path: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = parents.length; _i < _len; _i++) {
          p = parents[_i];
          _results.push(p.item);
        }
        return _results;
      })(),
      num_in_flat: this.flat.length,
      is_an_output: output
    };
    info.path.push(info);
    info.item_path.push(item);
    this.flat.push(info);
    if (!this.closed.contains(info.item_path)) {
      ch = this.get_children_of(item);
      if (ch != null) {
        info.children = (function() {
          var _ref, _results;
          _results = [];
          for (num_ch = 0, _ref = ch.length; (0 <= _ref ? num_ch < _ref : num_ch > _ref); (0 <= _ref ? num_ch += 1 : num_ch -= 1)) {
            par = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = parents.length; _i < _len; _i++) {
                p = parents[_i];
                _results.push(p);
              }
              return _results;
            })();
            par.push(info);
            _results.push(this._update_repr_rec(ch[num_ch], num_ch, ch.length, par, false));
          }
          return _results;
        }).call(this);
      }
      ch = this.get_output_of(item);
      if (ch != null) {
        info.outputs = (function() {
          var _ref, _results;
          _results = [];
          for (num_ch = 0, _ref = ch.length; (0 <= _ref ? num_ch < _ref : num_ch > _ref); (0 <= _ref ? num_ch += 1 : num_ch -= 1)) {
            par = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = parents.length; _i < _len; _i++) {
                p = parents[_i];
                _results.push(p);
              }
              return _results;
            })();
            par.push(info);
            _results.push(this._update_repr_rec(ch[num_ch], num_ch, ch.length, par, true));
          }
          return _results;
        }).call(this);
      }
    }
    return info;
  };
  TreeView.prototype._need_render = function() {
    var i, item, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (!(this.visible[this.visibility_context.get()] != null)) {
      this.visible.add_attr(this.visibility_context.get(), new Lst);
    }
    _ref = [this.closed, this.selected, this.visible[this.visibility_context.get()], this.visibility_context];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.has_been_directly_modified()) {
        return true;
      }
    }
    _ref2 = this._flat_item_list();
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      item = _ref2[_j];
      if (item.has_been_directly_modified()) {
        return true;
      }
      if ((_ref3 = this.get_children_of(item)) != null ? _ref3.has_been_directly_modified() : void 0) {
        return true;
      }
      if ((_ref4 = this.get_output_of(item)) != null ? _ref4.has_been_directly_modified() : void 0) {
        return true;
      }
      if ((_ref5 = this.get_viewable_of(item)) != null ? _ref5.has_been_directly_modified() : void 0) {
        return true;
      }
      if ((_ref6 = this.get_name_class_of(item)) != null ? _ref6.has_been_modified() : void 0) {
        return true;
      }
    }
    return false;
  };
  TreeView.prototype._has_a_selected_child = function(item, item_path) {
    var c, cp, p, _i, _len, _ref;
    if (this.get_children_of(item) != null) {
      _ref = this.get_children_of(item);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        cp = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = item_path.length; _i < _len; _i++) {
            p = item_path[_i];
            _results.push(p);
          }
          return _results;
        })();
        cp.push(c);
        if (this.selected.contains(cp)) {
          return true;
        }
        if (this._has_a_selected_child(c, cp)) {
          return true;
        }
      }
    }
    return false;
  };
  TreeView.prototype._nb_displayed_children = function(info) {
    var c, res, _i, _len, _ref;
    res = 0;
    _ref = info.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      res += 1 + this._nb_displayed_children(c);
    }
    return res;
  };
  TreeView.prototype._accept_child = function(parent, source) {
    var _base;
    return (source != null) && (__indexOf.call(parent.parents, source) < 0) && (typeof (_base = parent.item).accept_child === "function" ? _base.accept_child(source.item) : void 0);
  };
  TreeView.prototype._flat_item_list = function() {
    var item, res, _i, _len, _ref;
    res = [];
    _ref = this.roots;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      this._flat_item_list_rec(res, item);
    }
    return res;
  };
  TreeView.prototype._flat_item_list_rec = function(res, item) {
    var c, _i, _j, _len, _len2, _ref, _ref2, _results;
    res.push(item);
    if (this.get_output_of(item) != null) {
      _ref = this.get_output_of(item);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        this._flat_item_list_rec(res, c);
      }
    }
    if (this.get_children_of(item) != null) {
      _ref2 = this.get_children_of(item);
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        c = _ref2[_j];
        _results.push(this._flat_item_list_rec(res, c));
      }
      return _results;
    }
  };
  return TreeView;
})();