var TreeAppModule;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeAppModule = (function() {
  __extends(TreeAppModule, Model);
  function TreeAppModule() {
    TreeAppModule.__super__.constructor.call(this);
    this.name = '';
    this.visible = true;
    this.actions = [];
  }
  TreeAppModule.prototype.select_item = function(app_data, item, parent) {
    var path;
    if (!parent) {
      path = [];
      path.push(app_data.selected_session());
    } else {
      path = app_data.get_root_path_in_selected(parent);
    }
    path.push(item);
    this.unselect_all_item(app_data);
    return app_data.selected_tree_items.push(path);
  };
  TreeAppModule.prototype.unselect_all_item = function(app_data) {
    return app_data.selected_tree_items.clear();
  };
  TreeAppModule.prototype.watch_item = function(app_data, item) {
    return app_data.watch_item(item);
  };
  TreeAppModule.prototype.get_animation_module = function(app) {
    var child, _i, _len, _ref;
    _ref = app.data.modules;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child instanceof TreeAppModule_Animation) {
        return child;
      }
    }
  };
  TreeAppModule.prototype.get_display_settings_item = function(app) {
    var child, _i, _len, _ref;
    _ref = app.data.tree_items[0]._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child instanceof DisplaySettingsItem) {
        return child;
      }
    }
  };
  TreeAppModule.prototype.add_item_depending_selected_tree = function(app_data, typeItem) {
    var find_object, it, item, items, object, parent, session, _i, _j, _len, _len2, _ref;
    items = app_data.get_selected_tree_items();
    find_object = false;
    if (find_object === false) {
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        it = items[_i];
        item = new typeItem;
        if (typeof it.accept_child === "function" ? it.accept_child(item) : void 0) {
          if (find_object === false) {
            object = item;
            it.add_child(object);
            this.select_item(app_data, object, it);
            this.watch_item(app_data, object);
            find_object = true;
          }
        }
      }
    }
    if (find_object === false) {
      _ref = app_data.selected_tree_items;
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        items = _ref[_j];
        parent = items[items.length - 2];
        item = new typeItem;
        if (parent instanceof typeItem) {
          object = parent;
          find_object = true;
        }
      }
    }
    if (find_object === false) {
      object = new typeItem;
      session = app_data.selected_session();
      session.add_child(object);
      this.select_item(app_data, object);
      this.watch_item(app_data, object);
    }
    return object;
  };
  TreeAppModule.prototype.child_in_selected = function(app, typeItem, sel_item, item) {
    var c, current, i, id, it, p, _i, _len, _results;
    current = new typeItem;
    _results = [];
    for (_i = 0, _len = sel_item.length; _i < _len; _i++) {
      it = sel_item[_i];
      _results.push((function() {
        var _i, _len, _ref, _results;
        if (current.accept_child(it)) {
          app.data.selected_tree_items[0][app.data.selected_tree_items[0].length - 2].rem_child(it);
          item.add_child(it);
          id = it.model_id;
          _ref = app.data.panel_id_list();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            _results.push((function() {
              var _len, _ref, _results;
              _ref = app.data.visible_tree_items[p];
              _results = [];
              for (i = 0, _len = _ref.length; i < _len; i++) {
                c = _ref[i];
                if (c.model_id === id) {
                  app.data.visible_tree_items[p].splice(i, 1);
                  break;
                }
              }
              return _results;
            })());
          }
          return _results;
        }
      })());
    }
    return _results;
  };
  return TreeAppModule;
})();var TreeItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeItem = (function() {
  __extends(TreeItem, Model);
  function TreeItem() {
    TreeItem.__super__.constructor.call(this);
    this.add_attr({
      _ico: "",
      _name: "",
      _children: [],
      _output: [],
      _viewable: 0,
      _allow_vmod: true,
      _name_class: "",
      _context_modules: new Lst,
      _context_actions: new Lst
    });
  }
  TreeItem.prototype.add_context_modules = function(context_module) {
    return this._context_modules.push(context_module);
  };
  TreeItem.prototype.add_context_actions = function(context_action) {
    return this._context_actions.push(context_action);
  };
  TreeItem.prototype.display_suppl_context_actions = function(context_action) {};
  TreeItem.prototype.display_context_actions = function() {
    var contex_action;
    contex_action = new Lst;
    contex_action.push(new TreeAppAction_Save);
    this.display_suppl_context_actions(contex_action);
    return contex_action;
  };
  TreeItem.prototype.add_child = function(child) {
    return this._children.push(child);
  };
  TreeItem.prototype.rem_child = function(child) {
    var num_c, _ref;
    if (child instanceof TreeItem) {
      for (num_c = 0, _ref = this._children.length; (0 <= _ref ? num_c < _ref : num_c > _ref); (0 <= _ref ? num_c += 1 : num_c -= 1)) {
        if (this._children[num_c] === child) {
          this._children.splice(num_c, 1);
          return;
        }
      }
    } else {
      return this._children.splice(child, 1);
    }
  };
  TreeItem.prototype.add_output = function(child) {
    return this._output.push(child);
  };
  TreeItem.prototype.rem_output = function(child) {
    var num_c, _ref;
    if (child instanceof TreeItem) {
      for (num_c = 0, _ref = this._output.length; (0 <= _ref ? num_c < _ref : num_c > _ref); (0 <= _ref ? num_c += 1 : num_c -= 1)) {
        if (this._output[num_c] === child) {
          this._output.splice(num_c, 1);
          return;
        }
      }
    } else {
      return this._output.splice(child, 1);
    }
  };
  TreeItem.prototype.draw = function(info) {
    var s, _i, _len, _ref, _results;
    if (this.sub_canvas_items != null) {
      _ref = this.sub_canvas_items();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push(s.draw(info));
      }
      return _results;
    }
  };
  TreeItem.prototype.anim_min_max = function() {};
  TreeItem.prototype.z_index = function() {
    return 0;
  };
  TreeItem.prototype.to_string = function() {
    return this._name.get();
  };
  return TreeItem;
})();var TreeAppData;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
TreeAppData = (function() {
  __extends(TreeAppData, Model);
  function TreeAppData() {
    TreeAppData.__super__.constructor.call(this);
    this.add_attr({
      tree_items: new Lst,
      selected_tree_items: new Lst,
      visible_tree_items: new Model,
      closed_tree_items: new Lst,
      selected_canvas_pan: new Lst,
      last_canvas_pan: new Str,
      applications: new Lst,
      base_modules: new Lst,
      modules: new Lst,
      focus: -1,
      time: new ConstrainedVal(0, {
        min: 0,
        max: 10,
        div: 0
      })
    });
  }
  TreeAppData.prototype.watch_item = function(item) {
    var p, _i, _len, _ref, _results;
    _ref = this.panel_id_list();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (!(this.visible_tree_items[p] != null)) {
        this.visible_tree_items.add_attr(p, []);
      }
      _results.push(!this.visible_tree_items[p].contains_ref(item) ? this.visible_tree_items[p].push(item) : void 0);
    }
    return _results;
  };
  TreeAppData.prototype.close_item = function(item) {
    return this.closed_tree_items.push(item);
  };
  TreeAppData.prototype.open_item = function(item) {
    var index, it, _len, _ref, _results;
    _ref = this.closed_tree_items;
    _results = [];
    for (index = 0, _len = _ref.length; index < _len; index++) {
      it = _ref[index];
      _results.push(item.equals(it) ? this.closed_tree_items.splice(index, 1) : void 0);
    }
    return _results;
  };
  TreeAppData.prototype.display_scientific_framework = function() {
    var d;
    d = new DisplaySettingsItem({
      sep_norm: 0,
      children: [
        {
          panel_id: "ContextBar",
          immortal: true,
          min_size: [60, 0],
          max_size: [65, 1e5]
        }, {
          sep_norm: 0,
          children: [
            {
              sep_norm: 1,
              children: [
                {
                  panel_id: "TreeView",
                  immortal: true
                }, {
                  strength: 2,
                  panel_id: "EditView",
                  immortal: true
                }
              ]
            }, {
              panel_id: "MainView",
              strength: 3
            }
          ]
        }
      ]
    });
    return d;
  };
  TreeAppData.prototype.display_standard_framework = function() {
    var d;
    d = new DisplaySettingsItem({
      sep_norm: 0,
      children: [
        {
          panel_id: "ContextBar",
          immortal: true,
          min_size: [60, 0],
          max_size: [65, 1e5]
        }, {
          sep_norm: 0,
          children: [
            {
              panel_id: "TreeView",
              immortal: true
            }, {
              panel_id: "EditView",
              strength: 3
            }
          ]
        }
      ]
    });
    return d;
  };
  TreeAppData.prototype.new_session = function(name) {
    var d, s;
    if (name == null) {
      name = "Session";
    }
    s = new SessionItem(name, this);
    this.add_session(s);
    d = this.display_scientific_framework();
    s._children.push(d);
    return s;
  };
  TreeAppData.prototype.new_standard_session = function(name) {
    var d, s;
    if (name == null) {
      name = "Session";
    }
    s = new SessionItem(name, this);
    this.add_session(s);
    d = this.display_standard_framework();
    s._children.push(d);
    return s;
  };
  TreeAppData.prototype.add_session = function(session) {
    return this.tree_items.push(session);
  };
  TreeAppData.prototype.selected_session = function() {
    var session, _i, _len, _ref;
    _ref = this.tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      session = _ref[_i];
      if (this.has_a_selected_child(session)) {
        return session;
      }
    }
    return this.tree_items[0];
  };
  TreeAppData.prototype.selected_display_settings = function() {
    var session;
    session = this.selected_session();
    return session._children.detect(function(x) {
      return x instanceof DisplaySettingsItem;
    });
  };
  TreeAppData.prototype.panel_id_list = function() {
    var d;
    d = this.selected_display_settings();
    return d._layout.panel_id_of_term_panels().filter(function(x) {
      return x !== "EditView" && x !== "TreeView" && x !== "ContextBar" && x !== "IcoBar";
    });
  };
  TreeAppData.prototype.rm_selected_panels = function() {
    var d, panel_id, _i, _len, _ref, _results;
    d = this.selected_display_settings();
    _ref = this.selected_canvas_pan;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      panel_id = _ref[_i];
      _results.push(d._layout.rm_panel(panel_id));
    }
    return _results;
  };
  TreeAppData.prototype.update_associated_layout_data = function(d) {
    var key, pil, _i, _j, _len, _len2, _ref, _ref2, _ref3;
    pil = d._layout.panel_id_of_term_panels();
    _ref = (function() {
      var _i, _len, _ref, _results;
      _ref = this.visible_tree_items._attribute_names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(pil, key) < 0) {
          _results.push(key);
        }
      }
      return _results;
    }).call(this);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      this.visible_tree_items.rem_attr(key);
    }
    _ref2 = (function() {
      var _i, _len, _ref, _results;
      _ref = this.selected_canvas_pan;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(pil, key) < 0) {
          _results.push(key);
        }
      }
      return _results;
    }).call(this);
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      key = _ref2[_j];
      this.selected_canvas_pan.remove(key);
    }
    if (!this.selected_canvas_pan.length) {
      this.selected_canvas_pan.push(pil[pil.length - 1]);
    }
    if (_ref3 = this.last_canvas_pan, __indexOf.call(pil, _ref3) < 0) {
      return this.last_canvas_pan.set(pil[pil.length - 1]);
    }
  };
  TreeAppData.prototype.get_current_cam = function() {
    var i, panel_id, _ref;
    panel_id = this.last_canvas_pan.get();
    for (i = 0, _ref = this.selected_display_settings()._children.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (this.selected_display_settings()._children[i]._panel_id.get() === panel_id) {
        return this.selected_display_settings()._children[i].cam;
      }
    }
  };
  TreeAppData.prototype.has_a_selected_child = function(item) {
    var c, _i, _len, _ref;
    if (__indexOf.call(this.selected_tree_items, item) >= 0) {
      return true;
    }
    _ref = item._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      if (this.has_a_selected_child(c)) {
        return true;
      }
    }
    return false;
  };
  TreeAppData.prototype.get_child_of_type = function(item, type) {
    var res, visited;
    res = [];
    visited = {};
    this._get_child_of_type_rec(res, visited, item, type);
    return res;
  };
  TreeAppData.prototype.get_selected_tree_items = function() {
    var items, path, _i, _len, _ref;
    items = new Lst;
    _ref = this.selected_tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      path = _ref[_i];
      items.push(path[path.length - 1]);
    }
    return items;
  };
  TreeAppData.prototype.get_root_path_in_selected = function(item) {
    var it, path, _i, _j, _len, _len2, _ref, _results;
    _ref = this.selected_tree_items;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      path = _ref[_i];
      for (_j = 0, _len2 = path.length; _j < _len2; _j++) {
        it = path[_j];
        if (it.model_id === item.model_id) {
          return path;
        }
      }
    }
    return _results;
  };
  TreeAppData.prototype.get_root_path = function(item) {
    var node, path, res, root, _i, _len, _ref;
    res = [];
    path = [];
    _ref = this.tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      root = _ref[_i];
      path.push(root);
      if (item.equals(root)) {
        res.push(path.slice(0));
      } else {
        node = root;
        this.get_root_path_rec(path, item, node, res);
      }
      return res;
    }
  };
  TreeAppData.prototype.get_root_path_rec = function(path, item, node, res) {
    var child, _i, _j, _len, _len2, _ref, _ref2, _results;
    _ref = node._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (item.equals(child)) {
        path.push(child);
        res.push(path.slice(0));
        path.pop();
        return path;
      }
    }
    _ref2 = node._children;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      child = _ref2[_j];
      path.push(child);
      this.get_root_path_rec(path, item, child, res);
      _results.push(path.pop());
    }
    return _results;
  };
  TreeAppData.prototype.delete_from_tree = function(item, root) {
    var c, child, i, p, parent, _i, _j, _len, _len2, _ref, _ref2, _ref3, _results;
    if (root == null) {
      root = true;
    }
    child = false;
    if (item._children.length) {
      for (i = _ref = item._children.length - 1; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
        c = item._children[i];
        if (c._children.length > 0) {
          this.delete_from_tree(c, false);
        }
        child = true;
        item.rem_child(c);
        this.closed_tree_items.remove(c);
        _ref2 = this.panel_id_list();
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          this.visible_tree_items[p].remove(c);
        }
      }
    }
    if (!child || root) {
      parent = this._get_parent(item);
      parent.rem_child(item);
      this.closed_tree_items.remove(item);
      _ref3 = this.panel_id_list();
      _results = [];
      for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
        p = _ref3[_j];
        _results.push(this.visible_tree_items[p].remove(item));
      }
      return _results;
    }
  };
  TreeAppData.prototype._get_parent = function(item) {
    var i, parent, path;
    path = item._parents;
    if (path[0].length <= 2) {
      parent = path[0][0];
    } else {
      parent = path[0][path[0].length - 2];
    }
    if (parent === item) {
      i = 1;
      while (parent === item && i < 50) {
        if (path[i].length > 1) {
          parent = path[i][path[i].length - 2];
        }
        i++;
      }
    }
    return parent;
  };
  TreeAppData.prototype._get_child_of_type_rec = function(res, visited, item, type) {
    var ch, _i, _len, _ref, _results;
    if (!(visited[item.model_id] != null)) {
      visited[item.model_id] = true;
      if (item instanceof type) {
        res.push(item);
      }
      if (item._children != null) {
        _ref = item._children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          _results.push(this._get_child_of_type_rec(res, visited, ch, type));
        }
        return _results;
      }
    }
  };
  return TreeAppData;
})();var TreeAppModule_PanelManagerTop;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppModule_PanelManagerTop = (function() {
  __extends(TreeAppModule_PanelManagerTop, TreeAppModule);
  function TreeAppModule_PanelManagerTop() {
    var cube, _ina;
    TreeAppModule_PanelManagerTop.__super__.constructor.call(this);
    this.name = 'Windows';
    _ina = __bind(function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    }, this);
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Close current view",
      ina: _ina,
      fun: function(evt, app) {
        app.undo_manager.snapshot();
        return app.data.rm_selected_panels();
      },
      key: ["Shift+X"]
    });
    this.actions.push({
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAMgAyADIKiWVHwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90DDQ42JoYxPt4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAGX0lEQVQ4EQFUBqv5Af///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAABAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAAgAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzNUpeS+fl6wAAAAASUVORK5CYII=",
      siz: 1,
      txt: "Vertical Split",
      ina: _ina,
      fun: __bind(function(evt, app) {
        return this.split_view(evt, app, 0);
      }, this),
      key: ["Shift+V"]
    });
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Horizontal Split",
      ina: _ina,
      fun: __bind(function(evt, app) {
        return this.split_view(evt, app, 1);
      }, this),
      key: ["Shift+H"]
    });
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Fit object to the view",
      ina: _ina,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.fit());
        }
        return _results;
      },
      key: ["F"]
    });
    cube = {
      siz: 1,
      txt: "View",
      ina: _ina,
      sub: {
        prf: "list",
        act: []
      },
      key: ["V"]
    };
    this.actions.push(cube);
    this.actions.push({
      ico: "data:image/png;base64,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",
      txt: "Origin Camera",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.origin());
        }
        return _results;
      },
      key: ["O"]
    });
    this.actions.push({
      ico: "data:image/png;base64,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",
      txt: "Watch top",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.top());
        }
        return _results;
      },
      key: ["T"]
    });
    cube.sub.act.push({
      txt: "Watch bottom",
      ina: _ina,
      vis: false,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.bottom());
        }
        return _results;
      },
      key: ["B"]
    });
    this.actions.push({
      ico: "data:image/png;base64,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",
      txt: "Watch right",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.right());
        }
        return _results;
      },
      key: ["R"]
    });
    cube.sub.act.push({
      txt: "Watch left",
      ina: _ina,
      vis: false,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.left());
        }
        return _results;
      },
      key: ["L"]
    });
    this.actions.push({
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAMgAyADIKiWVHwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90DDQ8HLdZ8itMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAGX0lEQVQ4EQFUBqv5Af///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ0//j4+AD4+PgA/f39AAAAAAADAwMACAgIAAgICADMzMwBAAAAAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMjL/+fn5AEhISAA7OzsAGBgYAAAAAADo6OgAxcXFALi4uAAHBwcAzs7OAQAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAADQ0NP8HBwcAdnZ2APPz8wC9vb0A4eHhAAAAAAAfHx8AQ0NDAA0NDQCKiooA+fn5AMzMzAEAAAAAAP///wD///8A////AP///wD///8A////ADIyMv+wsLD/hISE/zU1Nf////8A////AP///wD///8ANTU1/4SEhP+wsLD/MjIy/////wD///8ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8/PwDx8fEAsbGxAMrKygEAAAAAAAAAAAAAAAAAAAAAysrKATY2Nv8dHR0APz8/AAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo6OgC9vb0AysrKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMrKygG9vb0AOjo6AAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoaGgDi4uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADi4uIAGhoaAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8/PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8/PwAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjo6AAZGRkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGRkA6OjoAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMzABKSkoAKysr/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsrK/9KSkoAzc3NAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMz/wAAAAA3NzcAUlJSACcnJ/8ICAgABAQEAAAAAAD8/PwA+Pj4AFZWVgASEhIAwMDAAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAzMzP/AwMDAHx8fADIyMgAOTk5AO/v7wCzs7MA29vbAAAAAAAlJSUATU1NABEREQCXl5cAtra2AQAAAAAAAAAAAf///wAAAAAAAAAAADMzM/8DAwMAfHx8ABcXFwDr6+sAjo6OADk5OQA0NDQAFxcXAAAAAADp6ekAzMzMAMDAwADFxcUBAAAAAAAAAAAAAAAAAP///wD///8AMjIy/zU1Nf+xsbH/yMjI/7Ozs/9ERET/////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAP///wD///8ANjY2/7Gxsf/IyMj/s7Oz/0RERP////8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAP///wD///8Aqqqq/8jIyP+zs7P/RERE/////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAP///wD///8AVFRU/6urq/9ERET/////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYjFW1mx+okAAAAASUVORK5CYII=",
      siz: 1,
      txt: "Zoom",
      ina: _ina,
      fun: function(evt, app) {
        var _ref, _ref2;
        if (!this.zoom_area) {
          this.old_cm = (_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm : void 0 : void 0;
          this.theme = this.old_cm.theme;
          this.zoom_area = new ZoomArea(this.old_cm, {
            zoom_factor: [this.theme.zoom_factor, this.theme.zoom_factor, 1]
          });
          this.zoom_area.zoom_pos.set([this.old_cm.mouse_x, this.old_cm.mouse_y]);
          return this.old_cm.items.push(this.zoom_area);
        } else {
          this.old_cm.items.remove_ref(this.zoom_area);
          this.old_cm.draw();
          this.theme.zoom_factor.set(this.zoom_area.zoom_factor[0]);
          return delete this.zoom_area;
        }
      },
      key: ["Z"]
    });
    this.actions.push({
      txt: "",
      key: ["UpArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(-0.1, 0, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["DownArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0.1, 0, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["LeftArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0, -0.1, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["RightArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0, 0.1, 0));
        }
        return _results;
      }, this)
    });
  }
  TreeAppModule_PanelManagerTop.prototype.split_view = function(evt, app, n) {
    var cam, child, d, p, panel_id, s, _i, _j, _len, _len2, _ref, _ref2, _results;
    app.undo_manager.snapshot();
    cam = void 0;
    child = void 0;
    _ref = app.data.selected_tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      s = p[p.length - 1];
      if (s instanceof ShootingItem) {
        cam = s.cam;
        child = s;
      }
    }
    d = app.data.selected_display_settings();
    _ref2 = app.data.selected_canvas_pan;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      panel_id = _ref2[_j];
      app._next_view_item_cam = cam;
      app._next_view_item_child = child;
      _results.push(d._layout.mk_split(n, 0, panel_id, 0.5));
    }
    return _results;
  };
  return TreeAppModule_PanelManagerTop;
})();var TreeAppModule_ImageSet;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppModule_ImageSet = (function() {
  __extends(TreeAppModule_ImageSet, TreeAppModule);
  function TreeAppModule_ImageSet() {
    TreeAppModule_ImageSet.__super__.constructor.call(this);
    this.name = 'Image';
    this.visible = true;
    this.numpic = 1;
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "New Shooting",
      fun: __bind(function(evt, app) {
        var session;
        app.undo_manager.snapshot();
        this.collection = new ShootingItem(app);
        session = app.data.selected_session();
        session._children.push(this.collection);
        this.unselect_all_item(app.data);
        this.select_item(app.data, this.collection);
        return this.watch_item(app.data, this.collection);
      }, this)
    });
    this.actions.push({
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sLFQ0kK/G2W0UAAARaSURBVEjH7ZRPTxMJGIefGacMtdBOaUtbUCgN1WUxrg2YAgJZ4z82mOXgwZj4Ufwim73tysUQEz3YEkM2HMi6bMDIaspCLezItjIzdAotnW5hhr0ZTWx2P4C/2+/yPnmS933hS/4jwsflwYMHJ7FYDMMwWF1dRZZlenp6SCaTpNNpFhcXSSQSTE5O4vf7yWQy5PN57t+/j8/nwzAMLly4wMzMzIe50scARVHIZDKYpokkScTjcR49esTJyQm6rnP27FmuXr3K0NAQjUYDRVEIhUIEAgHa2trI5XK8f//+E4NPANFolNu3b9PW1sb29jahUIhIJEIikaBUKjE2NkYsFsPlclGpVFhZWcFxHGzb5uHDh5TLZQYHBz8BiB+XWq2GLMv4/X7a29vZ2Njg8uXLZLNZgsEgW1tbzM7O8ubNG9rb27lx4waHh4esr6+zt7eHaZqYptncYGlpCcuyGB4eJp/Ps7CwgMfj4fXr18iyjGVZuN1uRFFkeXmZer1Ob28v0WiU8fFxnjx5QqFQaG6gaRqqqjI3N8fR0RHDw8OYpsnIyAiKonDu3Dm8Xi9er5e1tTWWlpYA2N/fp7W1lTNnzhCJRJob7O7ucnx8DIDb7SYWi5HL5dA0jWKxyN27d5EkCUmS6OvrQxAEXr16ha7rBINBLl68yNbWVnPA+fPncRyHmzdvEo/H0TSNlpYWJEmio6ODd+/ekUqlMAyDeDxOMpkk6A8x8e04uq7z+PFjVFVtDpienqbRaGDbNrlcju7ubnp6elBVlf39fSRJwjAMqtUqnZ2dCIJA1xWF9PwzFJ+fRqNBPB5nY2Pj84BiscjTp0+xbZtarcb09DRTU1OEw2EkSeL58+ek02nGxsaYuvUdmvKWhc4fGPBPov10TLVaJRqNNjeo1+uUy2VGR0dRVRVVVdF1nWKxiCiKHBwcAGAYBh63h1Lr3wgi1Dr36Ooawuf3knubaw6wLIuBgQGuX7/O7Owstm2TzWbJ5/NEo1FSqRSx3j48bg/CKTDfVRD8ItgiqdQIO7sq1Uq1OSCZTCLLMpqmMTg4iM/nw3EcDMOgVCrRaDQwAzvUhTKdTgfroWUkXFSEEpnQj4hhEW/EBz83AWxubiKKImtra3R3d6OqKoIgcOnSJUKBEG/1P1Fv/cKhv4Rpg+vEBUcildMGpqcAIshdcnODnZ0dVldXAVhcXEQURdxuN/fu3cMf8CMXPMRfTJIT/iDsj5Dz/k5Lv8PpQ4Wv/pqgfmJRUIvA9ucvWZZlrl27RigUIhwOk0wmsSyL+fl5NE3DcRyKvx4wWvkez28xDp61IEggILAxt0tk82vqi+7mr0JRFDo6OggEAkxMTDAzM0MikUDXddLpNJlMhtbTrQgSLK+84J/9I3AEXC4Jy6nycu0lVybGmgP6+/uRJInx8XEEQcDtdjMyMkJLSwvZbJZyuczm5iaFQoE7d+6Q/GYI+9gmKHThOeXFsmofVvlL/nf+BcEhzmREx+HfAAAAAElFTkSuQmCC",
      siz: 1,
      txt: "Add Image",
      fun: __bind(function(evt, app, img) {
        app.undo_manager.snapshot();
        this.collection = this.add_item_depending_selected_tree(app.data, ImgSetItem);
        if (!(img != null)) {
          if (this.numpic < 10) {
            img = new ImgItem("composite0" + this.numpic + ".png", app);
          } else {
            img = new ImgItem("composite" + this.numpic + ".png", app);
          }
          this.numpic += 2;
        }
        this.collection.add_child(img);
        app.data.time._max.set((this.collection._children.length - 1 > 0 ? this.collection._children.length - 1 : 0));
        app.data.time._div.set(app.data.time._max.get());
        if (this.collection._children.length === 1) {
          app.data.time.set(0);
        }
        this.watch_item(app.data, this.collection);
        return app.fit();
      }, this),
      key: ["Shift+A"]
    });
    this.actions.push({
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAFeUlEQVR42p2Va2xT5xmAQ/90rZqiUan7s24MypSOduOirRQ27dbSibaUAmlpYdNo2lKGyMVNUpSQBBLnVodLEgOCQC7YxrGJHYf4EscOFQlKTBpjHJtcWgrrWAqkOM5xfEsc9uzEmiIuVTftPXp09Enfeb5Xr973OwkWi0VnNBqF/5Mxs9lsEWN+wv0xsyF2dZrYtWmmv7rzH8T1/8Dk1SkGu4ewd9ht3yqe+DyM/ec9ND5r4OTiJjqWdYv0fCf2pT10veIkMBjEZmsX7nZuWPXC9+Ni/9AEmoUWdv+ohOyFBzi2SEnTz9r+G+I3ZvyDAtZ2a2hGuGbpL+ZIP5Lskvx5c0dcPOoeo+pxBQVzK8hJLOXQPCXyJ+5inoLqb6EysYGbbh+WNksoZf3rj8qLpY1yaWHs/VfXvBAXA4xN+BEiAoFogOBUkPHQOF/f+JpAJED0TmSWyX9FiTPz3IkCoNfpItJMSe/H7/6Vv61bu2u2xgA+n48xvx//+DjjIp3N3eg/bOeCvY9QKBQnHA4TjkSIRKNEo6I4FiMcDFKQkU7G5rdJTd5g3rhqxUN3i++RCgEBxV4Ne+bI0e5vJiQKI6IwOjnF5FSMiYCfW9evcLmvi73paXz0ly2i+B3vGytXzL2nKwBu+27jsrpxNPThOu/myNY6KhJPUPOeAkEIMDU9zYTgY/C8igHbAZymKlLf2UDehx+Q+/5WzhxJN5Tt2pT4gHjkHzc4vk6FckkLtUtPU/lUA4d/oKJqfgPm/WfxOs7Rq8tFl/4GJ9KT2fHm6xRLMijYsZ09efloj+bgNOSfTX7tl4/cm/E3t1GUNbLvJzUoFrRQP19P7Y911P6wGe0rx3Gos/j72SpsC54mefky9u/ORZq2k3ZlCT12JV/01HGloxzbiR2VonbOrDgYDjLs+ZyDvzsa79HGJBOnFpnQ/l5BT2Mm33ga+KezjvfWvkh1USGlEgnGmhyEy0rGh05xy3WSm5dO0m+UxvK2r06aFV/74ivaKjow//ocxiWf0vJcB82/auV8rYRb7mOMXKhmZ/LLHJIW8UlWJs3yNHyuI9z21nO99ziD7Zs5X7+c7lMSGoo37U5oMZwRBs4McW6jA+vznZxebKbxGWM8a9tuKS11Mv6wvoa0D1I4mF9AcUYG+sod3HBUiOxj2C7jak89F81bMR5aQH9rHnWFbx5NaFI3CZbtNswrOyhPqiZ/aRn5S8opTtpPrzaDelku27IP43b2cay6Ck3FNq53lXOtsxynIYdLFhn99iP0GqQMthXh0n3MPsmagwkGvUHoMnQjz6zBqrYzeHE4ju2UhrryFErLihm9NUpnZycH87bh0GSKrbWNQ4UpWGrT6NYV8pl+L4PWEgbEbLsVqby66uk/zdZYGA8QiUaIxWKEwiHUjWpMbW1MTk5y5csvKSosQ5a5k6bKraiVtXgvD/Opppi31r3E6j/+FmdTDv26bCrSVl94MvHhx2bF4ZnJikYJBAL0fubA7x/HNzYWP6hUVoHRZEZ5tARl8SZ6msu4ZJLhOp3FvtwtLH/up3Q1pHIib61v2aJ5z9/Tx+LIxu8Dr9dDv+cSHo+boLh2e718IpNhMlvQHiuiqnQjLyl+Q/aeFxkySxk27cHdlIU86+WbK5KeWP29RxIeekA8OjqKw9GDy+XE43UzMOChtrYOtVpNn9OJRVVBnextVr61kNL89VzUZmM8sIXC1PWTC558ePHjcxPm3D/SszEyMhKXezz94rsbrVYrHuSKl6XLohRFm+lVpmI7nII8ey3GppMYTSYh4b544Geq1+sDGo0mYLVawzKZLCiXyydUKlXAYDAIWq1GOC5Ln6gqeHeiJC89oFIphdbWVmHGcb/330ijKo2XdMsXAAAAAElFTkSuQmCC",
      siz: 1,
      txt: "New Collection",
      fun: __bind(function(evt, app) {
        var session;
        app.undo_manager.snapshot();
        this.collection = new ImgSetItem;
        session = app.data.selected_session();
        session._children.push(this.collection);
        this.unselect_all_item(app.data);
        return this.select_item(app.data, this.collection);
      }, this)
    });
  }
  return TreeAppModule_ImageSet;
})();var TreeAppModule_File;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeAppModule_File = (function() {
  __extends(TreeAppModule_File, TreeAppModule);
  function TreeAppModule_File() {
    this.onPopupClose = __bind(this.onPopupClose, this);;    TreeAppModule_File.__super__.constructor.call(this);
    this.name = 'Files';
    this.visible = true;
    this.actions.push({
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAJdnBBZwAAACAAAAAgAIf6nJ0AAAKPSURBVEjH7dXPSyJhGAfwxxZhibDFwPYQGtstqE72Q+rQqVjoEgTRabtFEEREeuh/6BI4aBQ4aZBEUNpJ2WymmaZxRl0tZ1SItKAOWdGlyHx7S10yNngPe1r2/VyG932+39v7DsD/9bfWERzVqI0pY0naeGxkjHsfM4Q0oeoCFdTG9M9MLnP6In0qn7Ify7FB1sBWFyQhaUpl06jkFzpAfBmH8e9leRNfXSCB1CxnZfRCQiI6/COxIis2i9UFUYh+i+aiiFAOT1eiuzV8w8FX3hCxxC/iiNBFxMIbcKphtwZW9K5Feofe9uxu3W8jMlv3ayF6m95xLa7ogaqlKHvMLjmT7kcPchPAU4/OpF2yxyiKqoVVoKxUhBKXkp7CGiLjKSwlKRGnrKsATnCMOMIOcVnxFDyIUGFZcYg4NeIEcIHLTLN02K2uP60jQk9ulQ7TrMvsAvCCt8nr90obqc3iJiJU3Eh5JZxq8gL4wKfz0T7Zn/EX/YhQ0Z/xyTil8wEEIKANLgTl4EkAkQue4MRCQBsAYCEMrI2VmWwIkWOyrMzacBJAwA5+CBJ3ziJy3Lkg4RTOvl6k8HfpULjkEDnhUjrEqd8XqSfKi3kBkRPzUR6nSgUJSLTFGelOROSkuziTaEuUChRQWo5DkQcJkYs8HIeUFqVUcAaqSeFixSiKYW/vfaTs7V5pJlZUONV0VnkT5lsFRrji89z1/s3+DXvL3jKv9sqYMnyCz7lrPi9cCcx8ayWv6dBZ2yd7RweHhgfG+sf7JixTPdPdM12znXNmm9nWOdc12z3TM22Z6pvoHx8YGxoeHZzstbZ36EDz/nXXwCfQwmeoAx3UwxfQQwOmx1/1eKcOn2jxhOYf+6c9AywIEs2PE0peAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDA5LTA5LTEzVDE0OjIxOjQ2KzAyOjAwmMe/4wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwOS0wOS0xM1QxNDoyMTo0NiswMjowMOmaB18AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC",
      siz: 0.9,
      txt: "Open in Tree",
      fun: __bind(function(evt, app) {
        var Pheight, Pleft, Ptop, Pwidth, dir, fs, inst, inst_i, p, _i, _len, _ref;
        this.d = new_dom_element({
          className: "browse_container",
          id: "id_browse_container"
        });
        if ((typeof FileSystem != "undefined" && FileSystem !== null) && (FileSystem.get_inst() != null)) {
          fs = FileSystem.get_inst();
        } else {
          fs = new FileSystem;
          FileSystem._disp = false;
        }
        if (!(typeof SC_MODEL_ID != "undefined" && SC_MODEL_ID !== null) || SC_MODEL_ID === -1) {
          dir = "/home/monkey/test_browser";
        } else {
          dir = "/home/projet_" + SC_MODEL_ID;
        }
        fs.load_or_make_dir(dir, __bind(function(d, err) {
          var item_cp, t;
          t = new Directory;
          ModelEditorItem_Directory.add_action("Mesh", __bind(function(file, path, browser) {
            var m, modules, _i, _len, _results;
            console.log("open mesh");
            if ((typeof TreeAppModule_Sketch != "undefined" && TreeAppModule_Sketch !== null) && (app != null)) {
              modules = app.data.modules;
              _results = [];
              for (_i = 0, _len = modules.length; _i < _len; _i++) {
                m = modules[_i];
                _results.push(m instanceof TreeAppModule_Sketch ? m.actions[4].fun(evt, app, file) : void 0);
              }
              return _results;
            }
          }, this));
          ModelEditorItem_Directory.add_action("TreeItem", __bind(function(file, path, browser) {
            return file.load(__bind(function(object, err) {
              var copyItem, session;
              app.undo_manager.snapshot();
              copyItem = object.deep_copy();
              copyItem._name.set(object._name + "_copy");
              session = app.data.selected_session();
              session.add_child(object);
              this.select_item(app.data, object);
              return this.watch_item(app.data, object);
            }, this));
          }, this));
          ModelEditorItem_Directory.add_action("Path", __bind(function(file, path, browser) {
            return file.load(__bind(function(m, err) {
              var done, file_item, img_item, item, rv, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
              if (file.name.ends_with(".raw")) {
                rv = this.add_item_depending_selected_tree(app.data, RawVolume);
                return rv._children.push(new FileItem(file));
              } else if (file.name.ends_with(".unv") || file.name.ends_with(".csv") || file.name.ends_with(".geo") || file.name.ends_with(".stp")) {
                file_item = new FileItem(file);
                _ref = app.data.get_selected_tree_items();
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  item = _ref[_i];
                  if (typeof item.accept_child === "function" ? item.accept_child(file_item) : void 0) {
                    item.add_child(file_item);
                    done = true;
                  }
                }
                if (!done) {
                  return alert("Please select in the tree an item which accepts a file");
                }
              } else if (file.name.ends_with(".jpg") || file.name.ends_with(".png") || file.name.ends_with(".tiff") || file.name.ends_with(".jpeg")) {
                img_item = new ImgItem(m, app);
                img_item._name.set(file.name);
                done = false;
                _ref2 = app.data.get_selected_tree_items();
                for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                  item = _ref2[_j];
                  if (typeof item.accept_child === "function" ? item.accept_child(img_item) : void 0) {
                    item.add_child(img_item);
                    done = true;
                  }
                }
                if (!done) {
                  return alert("Please select in the tree an item which accepts an image");
                }
              } else {
                file_item = new FileItem(file);
                _ref3 = app.data.get_selected_tree_items();
                for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                  item = _ref3[_k];
                  if (typeof item.accept_child === "function" ? item.accept_child(file_item) : void 0) {
                    item.add_child(file_item);
                    done = true;
                  }
                }
                if (!done) {
                  return alert("Please select in the tree an item which accepts a file");
                }
              }
            }, this));
          }, this));
          return item_cp = new ModelEditorItem_Directory({
            el: this.d,
            model: d,
            initial_path: dir
          });
        }, this));
        inst = void 0;
        _ref = app.selected_canvas_inst();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst_i = _ref[_i];
          inst = inst_i;
        }
        if (inst.divCanvas != null) {
          Ptop = this.getTop(inst.div);
          Pleft = this.getLeft(inst.div);
          Pwidth = inst.divCanvas.offsetWidth;
          Pheight = inst.divCanvas.offsetHeight;
          Pheight = Pheight + 22;
        } else {
          Ptop = 100;
          Pleft = 100;
          Pwidth = 800;
          Pheight = 500;
        }
        p = new_popup("Browse Folder", {
          event: evt,
          child: this.d,
          top_x: Pleft,
          top_y: Ptop,
          width: Pwidth,
          height: Pheight,
          onclose: __bind(function() {
            return this.onPopupClose(app);
          }, this)
        });
        return app.active_key.set(false);
      }, this)
    });
  }
  TreeAppModule_File.prototype.getLeft = function(l) {
    if (l.offsetParent != null) {
      return l.offsetLeft + this.getLeft(l.offsetParent);
    } else {
      return l.offsetLeft;
    }
  };
  TreeAppModule_File.prototype.getTop = function(l) {
    if (l.offsetParent != null) {
      return l.offsetTop + this.getTop(l.offsetParent);
    } else {
      return l.offsetTop;
    }
  };
  TreeAppModule_File.prototype.onPopupClose = function(app) {
    document.onkeydown = void 0;
    return app.active_key.set(true);
  };
  return TreeAppModule_File;
})();var TreeAppModule_TreeView;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppModule_TreeView = (function() {
  __extends(TreeAppModule_TreeView, TreeAppModule);
  function TreeAppModule_TreeView() {
    var lst_equals, up_down_fun, _ina, _ina_cm;
    TreeAppModule_TreeView.__super__.constructor.call(this);
    this.name = 'Tree View';
    this.visible = false;
    _ina = __bind(function(app) {
      return app.data.focus.get() !== app.treeview.view_id;
    }, this);
    _ina_cm = __bind(function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0) && app.data.focus.get() !== app.treeview.view_id;
    }, this);
    lst_equals = function(a, b) {
      var ia, va, _len;
      if (a.length !== b.length) {
        return false;
      }
      for (ia = 0, _len = a.length; ia < _len; ia++) {
        va = a[ia];
        if (va !== b[ia]) {
          return false;
        }
      }
      return true;
    };
    up_down_fun = function(evt, app, inc) {
      var f, flat, i, items, session, _len, _results;
      items = app.data.selected_tree_items;
      session = app.data.selected_session();
      if (items.length === 0) {
        app.data.selected_tree_items.clear();
        return app.data.selected_tree_items.push([session]);
      } else if (items.length === 1) {
        flat = app.layouts[session.model_id]._pan_vs_id.TreeView.treeview.flat;
        _results = [];
        for (i = 0, _len = flat.length; i < _len; i++) {
          f = flat[i];
          if (i + inc >= 0 && i + inc < flat.length && lst_equals(items[0], f.item_path)) {
            app.data.selected_tree_items.clear();
            app.data.selected_tree_items.push(flat[i + inc].item_path);
            break;
          }
        }
        return _results;
      }
    };
    this.actions.push({
      txt: "",
      key: ["UpArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        return up_down_fun(evt, app, -1);
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["DownArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        return up_down_fun(evt, app, 1);
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["LeftArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var close, item, items, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          close = this.is_close(app, item);
          _results.push(item[item.length - 1]._children.length > 0 && close === false ? this.add_item_to_close_tree(app, item) : void 0);
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["RightArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var close, item, items, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          close = this.is_close(app, item);
          _results.push(item[item.length - 1]._children.length > 0 && close === true ? this.rem_item_to_close_tree(app, item) : void 0);
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "",
      key: ["Enter"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var item, p, path_item, path_items, _i, _len, _results;
        path_items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = path_items.length; _i < _len; _i++) {
          path_item = path_items[_i];
          item = path_item[path_item.length - 1];
          _results.push((function() {
            var _i, _len, _ref, _ref2, _results;
            if ((_ref = item._viewable) != null ? _ref.get() : void 0) {
              _ref2 = app.data.selected_canvas_pan;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                p = _ref2[_i];
                _results.push(app.data.visible_tree_items[p].toggle(item));
              }
              return _results;
            }
          })());
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "Save",
      key: [""],
      ina: _ina,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADqElEQVRIiZWUTY8UVRSGn3Nv9VQ39MgwDIEZSNQBXUDAjcGFIUHiRyRGE+OvcO/SlXsX7twY48K40MTowvgD2JhAghthEiEmLhAyOsqk6+Oee46Lqm66B130TX1XnfPWc897rpw58/zqpJr8eGTt2NntZ59OV69eacBxZ6kRQuTBwz82vv/uh/0Yw7c/37rxPoAcP765jvDT4fFTZ44eOczNmzeWyzw3Ll16iY3NbQ6NRnz91WcCUGQ3ihB58dLL/LpzCzWwrPiSCOXKAAA3x+ZiC9xwF/b2/gZ3kmY856UFQixwIGfFcp4TQHAHM8OBplV+v/vLUskBnnnuPLiTcyYvCLjjdC9wSJo5fmp7aYJWtSc4IOAA3qE5TtMm9u7fW5rg2Nb2jEBV5wUccSNrp5qSMjp6cmmbJs04oKqzXJ2AOR6kI3Bok5L+ub80AWunwMFyJuc5AgB3RzUDTpsUG6wtTdCmboqz6oEp6jNl7Qh27tzm3Lnzc1726bYwZPHAzs5tAJIqhT7hIpAg7D7Y5aMPP0D6oOmpu5y7wRcFvft2d/dP1jdO/5eLOquub5yiahIhBHI2QhBCCIiE/twlMzfcvesdd4oYMTPW1jcRgZzTk1Ok2j0syxVijEz2/yJKJIYIyOMlYArnEAWyZWKxiqvRtg2xGBBjOCAg9I3mKLBajnnn7WtcufIKK8MhuFOWJaNhSdu2iHQqMUauX7/OF19+g9baCahSDodzNaBboDQ9xtKsXL58mdt3dvj4k09xc9584yrvvfsWVVXPBEIIbG5t9UhCDLFrtHTQRe6dd11wHE1KXdeoKkUIeHDMMnVd07ZtV1d3RIRqUqEpoSmRc8bMFmswLXBKigi4d/WYTCZUVdU3oJNSom0TdV3P1qkYI23bklLnfbM8M8WcixzvCYRp0yVSSjRNQ0oJd6dtGqpqQtO0s+DObRnLGdU0ozKzOQFz3N1z333ukDVTT5ObYW5oVpqmoWnaRYKUUE108U5yX1iJi6aZPBKRnaapzpo5lg231F68cGHwwsWL8vprr+I4g2LAYFAsBIsIDx4+ZH9/n8lkQowBMyeEx00pQACeXllZ+Xw4HBVNU58ej8e/nTh5YiuGKCEEkc420ieVvsg+Lfbdu/dKd8fd3N0953yrrutrXb/M/ZGqipmNYgirDodCCGMRGYvIGBgBJRD7zzPQuHslIhXwyN0e5Wz7Oee9sizbJwT6v4x9fxzcY0875XfAeiH9n51/Ac3vnsxrMRLjAAAAAElFTkSuQmCC",
      fun: __bind(function(evt, app) {
        var fs, item, items, name, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          console.log("saving : ", item);
          _results.push((typeof FileSystem != "undefined" && FileSystem !== null) && (FileSystem.get_inst() != null) ? (fs = FileSystem.get_inst(), name = item.to_string(), fs.load_or_make_dir("/home/monkey/test_browser", __bind(function(d, err) {
            return d.add_file(name, item, {
              model_type: "TreeItem"
            });
          }, this))) : void 0);
        }
        return _results;
      }, this)
    });
    this.actions.push({
      txt: "Delete current tree item",
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAANBJREFUSEvtVbENgzAQNBOwh2tmYAcXqbxGBIvQMQKNO7dIrhE9PUiUVBfOgiIRkZUo6f6lE6//O5148FspiQ8nAK01yrKEtRZ1XaNpGjjnMAwD1nWNYM4ae+SQSw21ux/xNsQgOSKVZRm6roP3HiEEjOOIaZqwLAu2bYtgzhp75JBLDbXJby4GMiL5i5QctPSqOPb5ubTik+vjClfc5EGjKM9zFEUBYwyqqkLbtuj7HvM8RzBnjT1yyKUmddmc5v83eH31X4/othvcvwS1T/EATq2IdOg+xX0AAAAASUVORK5CYII=",
      key: ["Del"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var m, mod, modules, path, _i, _j, _len, _len2, _ref, _results;
        _ref = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (path.length > 1) {
            m = path[path.length - 1];
            if (m instanceof DisplaySettingsItem) {
              return true;
            } else if (m instanceof ViewItem) {
              modules = app.data.modules;
              for (_j = 0, _len2 = modules.length; _j < _len2; _j++) {
                mod = modules[_j];
                if (mod instanceof TreeAppModule_PanelManager) {
                  mod.actions[4].fun(evt, app);
                }
              }
            } else {
              app.undo_manager.snapshot();
              path[path.length - 2].rem_child(m);
              app.data.delete_from_tree(m);
              app.data.selected_tree_items.clear();
            }
          }
        }
        return _results;
      }, this)
    });
  }
  TreeAppModule_TreeView.prototype.is_close = function(app, item) {
    var closed_item_path, _i, _len, _ref;
    _ref = app.data.closed_tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      closed_item_path = _ref[_i];
      if (item.equals(closed_item_path)) {
        return true;
      }
    }
    return false;
  };
  TreeAppModule_TreeView.prototype.add_item_to_close_tree = function(app, item) {
    return app.data.close_item(item);
  };
  TreeAppModule_TreeView.prototype.rem_item_to_close_tree = function(app, item) {
    return app.data.open_item(item);
  };
  return TreeAppModule_TreeView;
})();var TreeAppModule_UndoManager;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeAppModule_UndoManager = (function() {
  __extends(TreeAppModule_UndoManager, TreeAppModule);
  function TreeAppModule_UndoManager() {
    TreeAppModule_UndoManager.__super__.constructor.call(this);
    this.name = '';
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 0.9,
      txt: "Undo",
      fun: function(evt, app) {
        return app.undo_manager.undo();
      },
      key: ["Ctrl+Z"]
    });
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 0.9,
      txt: "Redo",
      fun: function(evt, app) {
        return app.undo_manager.redo();
      },
      key: ["Ctrl+Shift+Z"]
    });
  }
  return TreeAppModule_UndoManager;
})();var TreeAppModule_PanelManager;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppModule_PanelManager = (function() {
  __extends(TreeAppModule_PanelManager, TreeAppModule);
  function TreeAppModule_PanelManager() {
    var cube, _ina;
    TreeAppModule_PanelManager.__super__.constructor.call(this);
    this.name = ' ';
    _ina = __bind(function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    }, this);
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90JFAs3HDhMFHIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAh0lEQVQ4y+2UMQoEIQxFk+WfIkU6b+V5LLyiXQpPEXCq2dVBGNy1m02V+MND4SG31mhn4WxCCM3dPwFA7s4AhvMpBKBSCg/AlBKp6nvJzEhVycyWbvg6mx42m5eBu+rJwFrrEFznZQ9FhPtARH4DxhinYuecvwP+xX6y2ADuVel2ePePvf3JBxY+Odo/jSlIAAAAAElFTkSuQmCC",
      siz: 0.9,
      txt: "Scientific framework",
      fun: __bind(function(evt, app) {
        var d;
        app.data.display_scientific_framework();
        d = app.data.selected_display_settings();
        app.data.update_associated_layout_data(d);
        return alert("ok scientific");
      }, this)
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAMgAyADIKiWVHwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90DDQ42JoYxPt4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAGX0lEQVQ4EQFUBqv5Af///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAABAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAAgAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzNUpeS+fl6wAAAAASUVORK5CYII=",
      siz: 0.9,
      txt: "Standard framework",
      fun: function(evt, app) {
        var d;
        app.data.display_scientific_framework();
        d = app.data.selected_display_settings();
        app.data.update_associated_layout_data(d);
        return alert("ok standard");
      }
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAMgAyADIKiWVHwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90DDQ42JoYxPt4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAGX0lEQVQ4EQFUBqv5Af///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAAJSUl//z8/AAAAAAAAAAAAAAAAAAAAAAABAQEANvb2wEAAAAABAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAhoaGAB4eHgAAAAAAAAAAAAAAAAAAAAAA4uLiAAAAAAAAAAAAAgAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4eAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAA5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ubmAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzNUpeS+fl6wAAAAASUVORK5CYII=",
      siz: 1,
      txt: "Vertical Split",
      ina: _ina,
      fun: __bind(function(evt, app) {
        return this.split_view(evt, app, 0);
      }, this),
      key: ["Shift+V"]
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wBEgwmOfuZMhgAAAIISURBVFjDxZexihNRFIa/c++5yQTRFFoIwiBilV4bYWsxFhZZ7HwBwScQBfEJBF/CLCLIamm1jfZ5gHXtLBYbDcncY5FMNolZmRn2JgemuMOd+X/+859zzxUzY5fh2HEIoDdeffowFdc3M7D0iCKCWjz88eLBIwU6U1z/9cO7FDHiJC1+NPDO8fzj1z7QUSArLHKl7Xl2+B31QioOBkwL403/JoVFgEwBiQbdtnLrakZwkkyFaDCJRretxFmqRQGKaHTUc/1Shk9syyJCRz3FnIECTCLs5W328nxr7p9EzgjMyTAajTAEqZCCp9+Ut3em9TxgIBi9Xm+BqcsbWq2ASdUcREKrVb8KLa6s9cyfoBqgMoExQUODUoisYK6wUV9DAfDqGyggmxSYL3zApHoNqtcGBOx8AiF4Yo02pA0UcGwiUDpStSYBbU5guQps8cOwKI9UKSi7rG30gHqKGgSamNCvCbxC4P67k1o/a6KAl/9UwZcnt4kx7UDg1k46tz4tOOdqP4/fn1TeC3LxI9lwkLN/cMz+wXHtb/WipB0OZidpSaJcb30oHQ7yhSLrseldsvGjalo0pePX07KTe0ElBVKO4ueZscR0AMFv/4JUYipg2fj0qPvy871JEUncCHEyA8/Gp0e/wAS4DOTAtdSmXIop8BM4ljloB8j+6ZPpwoA/wO9dX475C9dYnN3eMJ3aAAAAAElFTkSuQmCC",
      siz: 1,
      txt: "Fit object to the view",
      ina: _ina,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.fit());
        }
        return _results;
      },
      key: ["F"]
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeZJREFUeNrslc9q1FAUxr9zczu5Qx1HsItCoZTu2gdwUcEHcFyID+ITaAvSdQt9kkL/7bpz0wew6yruBEXEWie5x3MyudNk6PZkXMwlN5BLyPfL+fcRAL/24fy4IDdiZkAu00VyEcFzPPu6+/K1l6N+ATfaf/UMZYxwZKsf5Qcz5/Du5Gqk2goQSo54nGd4e/YFPiNYMWhwi5JxNNqAaqq2ApBSDXOPzacBSxICqyiozlhuqhUnqSYFkNCzxCLD6nKQ8NimoIyotMqaoAIYy+GL9Vz2Orpa44h7gMgTmuvrT5InqqrUpAZYv87Y2tqeavrmC/3QB5NtDohj67kFECoAMgbgBwA4AfQQYQvgkhg3ABJTyIP0p23xZdTSnwDQNAV5BWA5iBIANQFcmjwuQ9ZRGybNCqAnWDffb/HrrpAIsHEKCI9kEqrm7wSQy/jbPrjE3yJWvWraBQLQ8w6Dnm8X4eGbHRmPpXEP1HUgqX5/etWchBFPQrduGOuB5JNLzckNsXDDhRsu3PD/cEM03LCItgR+ZshM3DCdyYj0rps2nBqw3pYyh65X0tQIcLj78XG4d/F8LGPKOAPVn6u4av4UbQ3EQLaOwJXZmjBchexvsj9TLdrXGgTM3bhpjH9k32Le658AAwAHpcq9MWLTJwAAAABJRU5ErkJggg==",
      siz: 1,
      txt: "Horizontal Split",
      ina: _ina,
      fun: __bind(function(evt, app) {
        return this.split_view(evt, app, 1);
      }, this),
      key: ["Shift+H"]
    });
    cube = {
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAbCAYAAACX6BTbAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABVQAAAVUB1l9HcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARmSURBVEiJlVZtSLJnFD6Pc2VkL62hGLyu2gjeWEYFWUQEo6IIMvrY+lHSBxj0o19mBVK6OeYqaEOL2IowipJBPn1QRB8wIumTFhUrh2+m683abIXY7Ovx7M+rqKW1C+4f55z7XPf13Pe5n/sQiAjPgSCI8MrKyuaMjIyi4+PjnZmZme8PDg7+eDYREQMOAAivqqr6ZmRk5Pf7+3t0Q6/X/9Xc3DyQkJAQHyyfeEo5QRBMoVDYUlBQUM5gMN4sLCw8mpOYmAipqal/T01NTU5PT3fs7+8bgyoHAKZQKPx2dHT00K10e3sbNRoNajQajIqKQqVSiRqNBhcXFz1fsrq6ei6VSn9OTEz8zIfvPWlEdXX1d1qt1vDw8ICBwOFwcHt7O2B8bW3tvK2t7Scej/cpIgKUlZX9+BzpS8ndWF9fPy8vL/+Fxmazv7RareEOh+P5snkBzGbz7dzcnDMuLi4TSJK0uFwu7OzsPB8aGrJ6V8X/Ue5wOFzd3d1/9vf32xARSZK00AEACYIAiUTCvry8BIVC8S4rK4uRl5f38UuUIiKMjY1Zj46OoLW19TWdTveEgCRJs7+K3d3dO7lcbtnb23N4+yUSCZ6cnHjs5eXlf6RSqeX09NTlz0GSpPlJcjcmJyftSqXScnZ25rNXRqPxX7lcbl5ZWXEGyiVJ0kxHDHz/BQJBhEAgiFCpVLaQkJDb0tLS6OHh4XdsNvuVTCb75JntQtDpdMf+q15cXKDVavXxOZ1OFIlEZxRFPVJpNBqxo6MDBwYGPD6dTndMAwAf5TKZDLhcLvD5fBCJROByuQAAgMFgQEpKipNGo3nm2mw2EIvFIBaLwWAwQFdXl494mre1tLQEWq0W9Ho9bG1tgclkgt7eXp/K8EZDQwMwmUyYmJiA3NxcSE9P94n7kI+Pj0NxcTEkJycDm82GyspKmJ+fD7ivFEUBh8OBhYUFkMvlIBAIfOJ0bzUGgwGampo8dnR0NNjt9oDKCYIAjUYDXC4XMjMzoaamBsLCwqCwsBAQEXyqhaIouL6+9iRfXFxAZGRkQOUEQYBAIACpVAoAAEwmE2ZnZ93kSAevA42PjweTyeRJnpqaAj6f77Hdh+sGjUbzWVytVnuHke5t1dXVQUlJCdBoNLBYLLCzswM9PT1BlVMUFTD+AYvF4sXGxsazWKxQLpcLPB4P5ufngaIoUKlUEBMT45m8ubl5yefzP3LboaGhUFZWBiEhIT6ker3+XKfTaQERIScn54vOzs6lq6urxzfEC2q1+ihY3GKx3La3t+vS0tI+R/dL9P5MiYqKisaxsbEDl+vRfygo+c3NDfb19W0UFRV9hf7PnPeIiop61djY2LOxsWF7gvytv29ubs5SW1v7NQB86M8VsC3Izs5OUSgU01ar9e4p8sPDQ0dLS8twUlLS60AcQfsWRITS0lLh4ODgb3d3d6hWq9/a7XZXd3f3r/n5+bnP5T7ZtzxRcqH19fXy6+vrIoIgBkdGRn7AFyT+B8V0vTlNCwgQAAAAAElFTkSuQmCC",
      siz: 1,
      txt: "View",
      ina: _ina,
      sub: {
        prf: "list",
        act: []
      },
      key: ["V"]
    };
    this.actions.push(cube);
    cube.sub.act.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAcCAYAAADr9QYhAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB8wAAAfMB4Ueu7gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQ2SURBVEiJ7ZZNSHJZGMf/V+/YcInqHUnMECwTDdpUFm1iiCYqEoKKaHAjDEEJaQUtWqWrgr4/sGCiIKJdZJNR0OciaDZBQ4xoVqhRlGRjQ2nJa2cWM4p9XBXe6YWB+W/uuff5P+f+znnOPfdQhBCwiWEYcVFR0U9yubwoPT1dQlEUBwAoiqIAwOfzfeP3+7nhZwzDhNLS0j6H4/+Iis55lU9vbm5+4vP5nPv7+wcqGoaiKI5UKv1eoVD8KJPJ8kpKSuQ1NTXfJScnvwt7dnaGhYUF1NbWQiwWg2EY8Hg81sEBwOHhISYmJv58fn4OSqVSWq1Wp0gkEo7RaHRRAFIKCwvVMpnsB6lUqlCpVDnFxcU8DocTs9OlpSUEAgE0NTUhntdsNj8vLi7eJScnf1YqlUkNDQ0pqampLzxGo9FF5efnX2dnZ39L0/SLeoVn9fX1taKfR7fDgC6Xi9fd3U3Ky8sZmqZZgY1Go4uura0N9PT0CGIO7QukVqv/qKys/JSIN/b8fmX9D8OmhGAIIZicnER1dTVEIhEEAgEqKiowMDCAUCj09WB8Ph9UKhW0Wi2CwSC0Wi06OzuRlJSErq4ulJWV4erqijU/+gtzOp3Y3d3F+vo6vF7vW7PBYHCSGGppaSEAyPDw8JvYzMwMoSiKNDY2suar1erbcLu5uZkoFApSVVVF+Hw+aW9vj/gMBoMzJszR0RHhcrmkoqKC9WV1dXUEANnf348Lo9fryejoKCGEkMvLS5KamkoeHh4iMDHLtLa2hlAohLa2NlaPTqcDAFgsltj1BsAwDPx+PwBAKBSCw+G8KDH7lgjg5OQEACCTyVg9CoUCAGC32xOCub6+xvHxMebn55GRkYGsrKzEYC4uLgAAAgH7Bi0QCMDlcnF+fp4QTF9fH5aXl+F2uzE3N/fyFxIrOTMzEwDg8XhYPR6PB6FQCGKxOCEYjUaDs7MzHB0doaOjAzc3N4nB5OTkAAAcDgerx2azAQDkcvm78eiRMwyDx8dHAEBubi40Gg0GBwcTg6murgaXy8X4+DirZ2xsDACgUqlidRWBCQQCkXu9Xo/p6Wnc3d3Fh8nLy0NzczM2NjYwMjLyJj47O4ulpSU0NjaipKQkLoxEIkFBQUHkXiQSYWpqKlKqmAsYAHp7e+F2u9HR0YGVlRWUlZWBpmns7e1hdXUVpaWlGB0dZc2nKCpyTlIqlVAqlS/i9fX1kXbc30FaWhosFgtMJhN4PB5MJhOGhobw9PSE/v5+7OzsQCgUxusmIcWdGeDvRdja2orW1tZ/5aVs+vAjBNtx9T39984zH63b21tYrVZOQmvmS8RWJqvV+mw2m13Hx8f209PTX/f29n7+cJiwgsEgtre373d2dhwOh8Nqt9uXrVbrL4SQp7CH3traCgFwfRSE0+lkdDrdls1m++3g4GDG6/X+zub9C+mQLtnIGvhlAAAAAElFTkSuQmCC",
      txt: "Origin Camera",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.origin());
        }
        return _results;
      },
      key: ["O"]
    });
    cube.sub.act.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB4wAAAeMBqFO+JAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMpSURBVEiJ7ZfBSxtBFMa/iYkmpekSLz3IepCtEVlkJaCCRlI2evFiLkUxhSSVCj14MOBRRRAlORX8BzwYYiseJAdRVEIOwZNGSShR0VJFUEOkLsWYZKeHNqlRI0qb6KEfLMy8ebz5Md/szg5pa2vbFEXxOQqgUCj0TJKk+NnZ2edAIPCRUhrLmzw6OhqmBZLX66XBYJDG43E6OTl5aLVaffX19e8AlFJKcfUpCshV7e7upkdGRr50dnZ6OI4zZUCUhbDkmigAkulUVVUphoeH9QD0gUDAMjAwEN7c3PQXAySvjEaj2mg0Gtxu90vFY4JcVd4VWVxcxODg4L0L6fV6zMzM3DaUY82DQRQKBdRqdU7s/PwckUgEDMOgpqYmZ6y0tPRewA8GMZvNMJvNOTG/3w+TyYSmpiYsLCz81cTX9WT2yH+Q6yo4CKUUp6enaG5uRkNDA7xebza+v7+PcDhcHBAAmJqaQnd3N5aWljA3N4euri7U1taiv78fGxsbxQM5PDxEZWUlGIaBw+FAIpFAJBLB/Pw8enp6igNCKaUdHR2Ynp5GY2MjXC4XNBoNTk5OcvKKctaIoghRFEEpRSgUwvLyMux2O+LxOIaGhooHkhEhBIIgQBAEOJ1OJJNJSJKEra2touwRmm9ApVJBp9MBeELfkQdZIwgCVldXUV5e/rggDMPAZDL9cwjgKVkTi8VU0Wi0IMWPjo7Asuy9cgnHcZ8kSWo3GAwlLS0tSYUiu0iEEJJpINPO9AFAlmWSTqeJLMvQaDTZtyNT4/LykqytrSVZlqU2m+1FXV3drX9Pbrf7QLm9vf0GADiOew3gPc/z9Var9RXP83fa5vF4sLe3h9bWVsiyjPX1daRSKTidzhxoALi4uMD4+PiPiYmJ74IglPT29upubPgbFx1AxfP8W4vF4hsbG/t6cHBw653F5/PRvr4+enx8nI3Z7Xa6srJy511nZ2eH2my2M4fDEZudnZVSqRR1uVzfyO/Jb/eNEMZgMHyorq5ur6ioYMgvZT1LJBIl0WhUW1ZWRmVZJlqtNsWy7MVVX8mf5cn2MzWCwSATi8UYpVL5/SdNaUM7QHCHsAAAAABJRU5ErkJggg==",
      txt: "Watch top",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.top());
        }
        return _results;
      },
      key: ["T"]
    });
    cube.sub.act.push({
      txt: "Watch bottom",
      ina: _ina,
      vis: false,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.bottom());
        }
        return _results;
      },
      key: ["B"]
    });
    cube.sub.act.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB6QAAAekB8yd1yAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASJSURBVEiJzZZLSCtXGMf/Mxmr+G6sRhyKLgSfiEnU1AeKoOhCoVIUouJCrU8QRcWFIKKLq9koBMGIiAvRhURBEHShoo0PihpKBA2C+GggJG01WI0mM54uSqK9Nya59t7e/mE458z/+878vjNn8VEymeyK4zihQCCwFhYWWiiKIgBACKHwLAoAbDYbZbVaBYQQihCCFyN4nqeEQiEnEAjIy9yHhwfLycnJz1qtdtRoNB7hNSkUiiu73U7UavWfdXV15vLy8t80Gg1HXOjh4YHo9XpyenpKzs7OyPz8PCkuLiYzMzPEYDCQu7s7V2nEZrORhYUFS0NDw085OTmDAL5xFOB4oFAorl4m3dzckNHR0Wu5XG6qra39/fLy0uXmDnEcRyYmJkh9fT3RarVuYwkh5Pr6miiVyl8rKyuXU1JS6gF8RQgBpVAoLru7u791dVrn5+dPk5OTfxwfH4NlWZ/AwEACAE9PT84Yx2+w2+2UyWSiIyMjeZqmX/qvzi8uLpitrS06JCTkFygUCvclE0K0Wi1RqVR2j+W+Uf39/efP6F9YNHl5Xl9Q/5sTYV4ujEYjOjs7odFokJ+fD5VKBV9fX4+bbGxs4OLiwrmmaRoRERGIjo5GQkLCx4HwPI/S0lIIhUI0NTVhZGQEfX19GB4e9riJUqnE4uKiS08ikUCpVCIrK8s7kPHxcQQFBWF1dRUAIJVKUVVVhcHBQa8qAoCJiQmkp6eD53lsb29jfn4eGo0GZWVl0Ol0iIiIeDXXeUfUajV6e3udRkFBARiGgV6v9xokNjYWqampkEqlaGtrw8bGBkQiEUwmE5aWltzm0gDI/f099vf3kZ2d/WzQNOLi4nB1deU1yPtiGAYVFRUA4LEgGgBMJhPCw8Ph5+f3D1MkEsFsNr8ZBAAODg4AAMnJyW7jGACwWCwICAj4wOR5HoGBgW8CuL29xcLCAnZ2dkDTNIqKijyDcBwHm83mcrOQkBCvP97a2org4GDwPA+dTofHx0fExcVhamoKkZGRbnNpAGBZFkaj8QNTp9MhMTHRaxCHrFars7DMzEyIxWKPOTTw9114fHzE0dFz33J4eIjw8HBERUV5DTA2Noa9vT0cHR3BbDajuroa09PTqKur8wxCCCEURaGsrAxDQ0POijo6OtDY2Og1xPsKCwuDSqVCUlIS5ubmsLy87B7EMenq6oJarUZGRgbi4+Ph4+OD5ubmN4MAgL+/P6ampgAAnZ2d4HneM4hEIsHKygpkMhl6enqwuroKiqJeTfRWGRkZKCkpgV6vx+zsrFsQZxuQl5cHpVKJlpYWCASCfw3h0MDAgHN87VQ+SRuQnJyMvLw8hIaGuvTFYjHa29vBsix2d3ddxjAu336kHBW708jIiFtfwPO8v06nEzAMI4yJifF1dS+MRiMMBsOTVCr9LI3U5uamhVlfX38H4B3LsmKZTNaSmpr6XU1NTUJMTMynuyReyPlrDAaDFsCPFEX5qNXqSolE8kN2drZELpez/wUI5a53pihKlJub2yEUCr/nOO7rtLQ06+eAWFtb4/8CgETWcCacduEAAAAASUVORK5CYII=",
      txt: "Watch right",
      ina: _ina,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.right());
        }
        return _results;
      },
      key: ["R"]
    });
    cube.sub.act.push({
      txt: "Watch left",
      ina: _ina,
      vis: false,
      siz: 1,
      fun: function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.left());
        }
        return _results;
      },
      key: ["L"]
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCRJREFUeNq0V0tsG1UUPe/NjD1WUrvYaZQoklsFtZUiAQJKN+EjIRYFVy2qxKZIfBYVCIkiYFNEBIgCAqkSpeqiRUJULECwKaQ1XwkW0E1pqpaA1TaElkAS4sTOOLGdj+fDvWO7NY2dFGfmaa498+Zzzzv3vHvfEwDUrte//NwUMuE4DkCHL03QIQRUx06OvvLQw9RjcrdKFjIhE29s3wrLtiGFP/5tGpgiJfpOnE6wT7LZKgDdcmyEgwr2Jv+Cqgh4jYFJNS0HhxIbwL7YZy0AwegiQRXdMR0aUeA1C/z9Ev2wD9upBqTcGABR7yCkKuho0Ykmf0Jg0cDZh2X/V2QugBLdvDceJIvD71aysRRAFVQqlaJ4kQY8DgFPLkFf7unpwXUElAFUWyCgwRH+xEA4dt1+9ZpO6ULV6EmfRHAVgNOYAZVE4h8DYjkGKhcKh0D4BMBZGYCmKbDhDwCJ5QA41RCo/gOoNwucqxrQlkwTzwCIuv6XitBaLQDhlj238tVlQKwgwkZiuRHHgqqdoFwul/q5dq2ojQEoJELRTAwEF7Cyi9yv53Hl6EFMJI+7gMopwEbn9l245cV9WNBbGwNgnHIVpfD3A/sx9ukxbEjsxM0HDkFtKTszC3lMD57DwKM78Nz6B/BeYwDNt1Tf8zBOfY8tfftRGk6h+NkHMCfHy07WdSKy9R6073sNT7x/GNvu2vj2gz8P7eEi6Unam00NYuqbk7jt2Rcwf+ITLHzXD+RniYGwa3w+T33FLz7G5j3PYG207cljd2zshVeJ/48j76J71yMwf/wadnoMUtchqbBJyiuu8Tn1WROjWPwhifXbEugMKG9x7vMEAAsu2r4O1vAlCMsC5uaAYoEsX7GC28f3rOGLuCkWQVBKZiCk1iaJpqc+jVL5+zIUmgmR5Llln83t3AIxMlzNCgGXAW2V6zBNo3HkpiE1feWMyM8Y09XoC2bA0ReMU5FXv+ot0cLt/6QBWyoohcI4HaR1xIwBJRxBfvf9cEyzvAy6PlExU/SMbRioLrsYwHz6nd1P0X9bk9NSnbw9/qZRXLwzGl0LO6ij7gansjGRlAmnjBxmTOssD54dkmIwQpauk0FvpIVOZucOxyamPmwjIUq3oNn1CCCtlUP95/gkvk0bB+l0UWEm+YSsSFZowubO5IqZ+2Lh7lIhv7mro8MFIRVK6xQi/leYeuoTBGAgdQFDRr7/pd+uHKV3pxUv9h1sx8cyZ3sjrfH5GWNTSA+iZc0ayGCQRKe51GeyWQxeHMKFzEzy8YFLL9M7/zB4r1YfPJAIWddj8fa7d3RGn46pyq1OTSXMmNYv/ePZIx+NpH+iy1GekZyKvVz+MIgWsmhF0K2VPndjREYZCVNk2UroLDQpuhU24dAqu99Azfedis5Y8KXahdG/AgwADk9zOiQNsccAAAAASUVORK5CYII=",
      siz: 1,
      txt: "Close current view",
      ina: _ina,
      fun: function(evt, app) {
        app.undo_manager.snapshot();
        return app.data.rm_selected_panels();
      },
      key: ["Shift+X"]
    });
    this.actions.push({
      vis: false,
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Zoom",
      ina: _ina,
      fun: function(evt, app) {
        var _ref, _ref2;
        if (!this.zoom_area) {
          this.old_cm = (_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm : void 0 : void 0;
          this.theme = this.old_cm.theme;
          this.zoom_area = new ZoomArea(this.old_cm, {
            zoom_factor: [this.theme.zoom_factor, this.theme.zoom_factor, 1]
          });
          this.zoom_area.zoom_pos.set([this.old_cm.mouse_x, this.old_cm.mouse_y]);
          return this.old_cm.items.push(this.zoom_area);
        } else {
          this.old_cm.items.remove_ref(this.zoom_area);
          this.old_cm.draw();
          this.theme.zoom_factor.set(this.zoom_area.zoom_factor[0]);
          return delete this.zoom_area;
        }
      },
      key: ["Z"]
    });
    this.actions.push({
      vis: false,
      txt: "",
      key: ["UpArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(-0.1, 0, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      vis: false,
      txt: "",
      key: ["DownArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0.1, 0, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      vis: false,
      txt: "",
      key: ["LeftArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0, -0.1, 0));
        }
        return _results;
      }, this)
    });
    this.actions.push({
      vis: false,
      txt: "",
      key: ["RightArrow"],
      ina: _ina,
      fun: __bind(function(evt, app) {
        var inst, _i, _len, _ref, _results;
        _ref = app.selected_canvas_inst();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inst = _ref[_i];
          _results.push(inst.cm.cam.rotate(0, 0.1, 0));
        }
        return _results;
      }, this)
    });
  }
  TreeAppModule_PanelManager.prototype.split_view = function(evt, app, n) {
    var cam, child, d, p, panel_id, s, _i, _j, _len, _len2, _ref, _ref2, _results;
    app.undo_manager.snapshot();
    cam = void 0;
    child = void 0;
    _ref = app.data.selected_tree_items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      s = p[p.length - 1];
      if (s instanceof ShootingItem) {
        cam = s.cam;
        child = s;
      }
    }
    d = app.data.selected_display_settings();
    _ref2 = app.data.selected_canvas_pan;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      panel_id = _ref2[_j];
      app._next_view_item_cam = cam;
      app._next_view_item_child = child;
      _results.push(d._layout.mk_split(n, 0, panel_id, 0.5));
    }
    return _results;
  };
  return TreeAppModule_PanelManager;
})();var TreeAppModule_Apps;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeAppModule_Apps = (function() {
  __extends(TreeAppModule_Apps, TreeAppModule);
  function TreeAppModule_Apps() {
    this.display_app = __bind(this.display_app, this);;
    this.onPopupClose = __bind(this.onPopupClose, this);;    var _ina;
    TreeAppModule_Apps.__super__.constructor.call(this);
    this.name = 'Apps';
    this.visible = true;
    _ina = __bind(function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0) && app.data.focus.get() !== app.treeview.view_id;
    }, this);
    this.icon_app = new Lst;
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 0.9,
      txt: "Load app in tree",
      ina: _ina,
      fun: __bind(function(evt, app) {
        var Pheight, Pleft, Ptop, Pwidth, i_app, inst, inst_i, p, _i, _len, _ref, _ref2;
        this.d = new_dom_element({
          className: "apps_container",
          id: "id_apps_container"
        });
        for (i_app = 0, _ref = app.data.applications.length; (0 <= _ref ? i_app <= _ref : i_app >= _ref); (0 <= _ref ? i_app += 1 : i_app -= 1)) {
          if (app.data.applications[i_app] != null) {
            this.display_app(app, app.data.applications[i_app]);
          }
        }
        inst = void 0;
        _ref2 = app.selected_canvas_inst();
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          inst_i = _ref2[_i];
          inst = inst_i;
        }
        if (inst.divCanvas != null) {
          Ptop = this.getTop(inst.div);
          Pleft = this.getLeft(inst.div);
          Pwidth = inst.divCanvas.offsetWidth;
          Pheight = inst.divCanvas.offsetHeight;
          Pheight = Pheight + 22;
        } else {
          Ptop = 100;
          Pleft = 100;
          Pwidth = 800;
          Pheight = 500;
        }
        p = new_popup("Apps store", {
          event: evt,
          child: this.d,
          top_x: Pleft,
          top_y: Ptop,
          width: Pwidth,
          height: Pheight,
          onclose: __bind(function() {
            return this.onPopupClose(app);
          }, this)
        });
        return app.active_key.set(false);
      }, this)
    });
  }
  TreeAppModule_Apps.prototype.onPopupClose = function(app) {
    document.onkeydown = void 0;
    return app.active_key.set(true);
  };
  TreeAppModule_Apps.prototype.getLeft = function(l) {
    if (l.offsetParent != null) {
      return l.offsetLeft + this.getLeft(l.offsetParent);
    } else {
      return l.offsetLeft;
    }
  };
  TreeAppModule_Apps.prototype.getTop = function(l) {
    if (l.offsetParent != null) {
      return l.offsetTop + this.getTop(l.offsetParent);
    } else {
      return l.offsetTop;
    }
  };
  TreeAppModule_Apps.prototype.display_app = function(app, application) {
    var act, group_app, ico_app, link_app, text_app, _i, _len, _ref, _results;
    if (application.actions != null) {
      group_app = new_dom_element({
        parentNode: this.d,
        className: "app_group",
        nodeName: "div"
      });
      _ref = application.actions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        act = _ref[_i];
        ico_app = new_dom_element({
          parentNode: group_app,
          className: "app_icon",
          nodeName: "div",
          onmousedown: __bind(function(evt) {
            return act.fun(evt, app);
          }, this)
        });
        this.picture = new_dom_element({
          parentNode: ico_app,
          className: "app_picture",
          nodeName: "img",
          src: act.ico,
          alt: act.txt,
          title: act.txt,
          style: {
            maxWidth: 150,
            maxHeight: 75
          }
        });
        text_app = new_dom_element({
          parentNode: group_app,
          className: "app_group_text",
          nodeName: "div"
        });
        this.name_app = new_dom_element({
          parentNode: text_app,
          className: "app_group_title",
          nodeName: "div",
          txt: application.name
        });
        this.editor_app = new_dom_element({
          parentNode: text_app,
          className: "app_group_name",
          nodeName: "div",
          style: {
            fontWidth: 0.8
          },
          txt: "powered by"
        });
        this.powered_app = new_dom_element({
          parentNode: text_app,
          className: "app_group_name",
          nodeName: "div",
          txt: application.powered_with
        });
        link_app = new_dom_element({
          parentNode: group_app,
          className: "app_group_link",
          nodeName: "div"
        });
        this.publication_link_app = new_dom_element({
          parentNode: link_app,
          className: "app_group_publication_link",
          nodeName: "div",
          src: act.ico,
          alt: "Related publications",
          title: "Related publications",
          onmousedown: __bind(function(evt) {
            var myWindow;
            myWindow = window.open('', '');
            myWindow.document.location.href = application.publication_link;
            return myWindow.focus();
          }, this)
        });
        _results.push(this.tutorial_link_app = new_dom_element({
          parentNode: link_app,
          className: "app_group_tutorial_link",
          nodeName: "div",
          src: act.ico,
          alt: application.tutorial_link,
          title: "Video tutorial",
          onmousedown: __bind(function(evt) {
            var myWindow;
            myWindow = window.open('', '');
            myWindow.document.location.href = application.tutorial_link;
            return myWindow.focus();
          }, this)
        }));
      }
      return _results;
    }
  };
  return TreeAppModule_Apps;
})();var TreeAppAction_Save;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppAction_Save = (function() {
  __extends(TreeAppAction_Save, TreeAppModule);
  function TreeAppAction_Save() {
    var save_sub;
    TreeAppAction_Save.__super__.constructor.call(this);
    this.name = 'Save';
    save_sub = {
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Save",
      sub: {
        prf: "list",
        act: []
      },
      key: ["M"]
    };
    this.actions.push(save_sub);
    save_sub.sub.act.push({
      txt: "Save",
      key: [""],
      ico: "data:image/png;base64,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",
      loc: true,
      fun: __bind(function(evt, app) {
        var dir_save, fs, item, items, name, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          console.log("saving : ", item);
          _results.push((typeof FileSystem != "undefined" && FileSystem !== null) && (FileSystem.get_inst() != null) ? (fs = FileSystem.get_inst(), name = prompt("Item name", item.to_string() + new Date()), dir_save = "/home/projet_" + SC_MODEL_ID, fs.load_or_make_dir(dir_save, __bind(function(d, err) {
            return d.add_file(name, item, {
              model_type: "TreeItem"
            });
          }, this))) : void 0);
        }
        return _results;
      }, this)
    });
    save_sub.sub.act.push({
      txt: "Delete current tree item",
      ico: "data:image/png;base64,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",
      key: ["Del"],
      loc: true,
      fun: __bind(function(evt, app) {
        var m, mod, modules, path, _i, _j, _len, _len2, _ref, _results;
        _ref = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (path.length > 1) {
            m = path[path.length - 1];
            if (m instanceof DisplaySettingsItem) {
              return true;
            } else if (m instanceof ViewItem) {
              modules = app.data.modules;
              for (_j = 0, _len2 = modules.length; _j < _len2; _j++) {
                mod = modules[_j];
                if (mod instanceof TreeAppModule_PanelManager) {
                  mod.actions[4].fun(evt, app);
                }
              }
            } else {
              app.undo_manager.snapshot();
              path[path.length - 2].rem_child(m);
              app.data.delete_from_tree(m);
              app.data.selected_tree_items.clear();
            }
          }
        }
        return _results;
      }, this)
    });
    save_sub.sub.act.push({
      txt: "Copy tree item",
      ico: "data:image/png;base64,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",
      loc: true,
      fun: __bind(function(evt, app) {
        var copyItem, m, path, session, _i, _len, _ref, _results;
        _ref = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          _results.push(path.length > 1 ? (m = path[path.length - 1], m instanceof DisplaySettingsItem || m instanceof ViewItem ? void 0 : (copyItem = m.deep_copy(), copyItem._name.set(m._name + "_copy"), session = app.data.selected_session(), session.add_child(copyItem), this.select_item(app.data, copyItem), this.watch_item(app.data, copyItem))) : void 0);
        }
        return _results;
      }, this)
    });
  }
  return TreeAppAction_Save;
})();var SessionItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
SessionItem = (function() {
  __extends(SessionItem, TreeItem);
  function SessionItem(name, app_data) {
    SessionItem.__super__.constructor.call(this);
    this.add_attr({
      _selected_tree_items: new Lst,
      _visible_tree_items: new Model,
      _closed_tree_items: new Lst,
      _selected_canvas_pan: new Lst,
      _last_canvas_pan: new Str,
      _modules: new Lst,
      time: (app_data != null ? app_data.time : void 0) || new ConstrainedVal(0, {
        min: 0,
        max: 20,
        div: 0
      })
    });
    this._name._set(name);
    this._ico._set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAAlwSFlzAABuugAAbroB1t6xFwAAAAd0SU1FB9kKFg0RBwNC0kUAAAEsUExURQAAAAAAAAgICAAAAAAAAAAAAAAAAAAAAAAAAAAAADiB2SNtwjqC2S51yDqD2TZ8zjqD2T6D1DyE20aJ2P///wBMowJOqAJPqA9YqhBguhhUnRlWnSJrvzmC2TmD3jqD2TqE3jx2vzyE20GH206Cw1CU5lCV5lCV6FSU4WmTy26Hpm+Wy3aNp3mp5n6SqX6VsX6t6Iiz65CdrZCu1JGw1pG67pS56pW56p69457C7aDD7a7L767N76/K7q/N77DQ97fQ77jS8bnU8bzV9L3W9MPY8sXZ88bZ8dDg9tnn9+Lj4+jp6evr6+vs7O3t7e3u7u7v7+/v7+/w8PDw8PHx8fHy8vLz8/Pz8/T09PT19fX19fb29vj4+Pn5+fr6+vv7+/z8/P//+v///v///158d/IAAAAVdFJOUwARHyorMzQ1Njf6+/v8/P39/f7+/prq3iMAAAABYktHRGNcvi2qAAAAq0lEQVQYGUXBPUoDARQE4Jl587KQEBRstRKCrY2tR/ACOZ+9rUextVFIa4z795LNEvw+AkpiVt0IA9zi4vUXvu/6tydSCuC6A7h8/n78siwK702GdGihSNuhl5tNa7UjwhYJoT/IImBLJM6sRWJN4iwdvB1qEE4KHIPB1aa964hJ5efiw+r3P3/EpJq9ZMUJMamIkJXZJGbKlLWMHTGrq0Z8GEhcVAVp4l/1R+7tLK9NVBYVAAAAAElFTkSuQmCC");
  }
  SessionItem.prototype.accept_child = function(ch) {
    return true;
  };
  return SessionItem;
})();var ImgSetItem;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ImgSetItem = (function() {
  __extends(ImgSetItem, TreeItem);
  function ImgSetItem() {
    this.update_min_max = __bind(this.update_min_max, this);;    ImgSetItem.__super__.constructor.call(this);
    this._name.set("Image collection");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42o2TW0zbBRSH/yVqvMTJhhHxQVejCWCmARfmNLtoMuPmbYRscSrRGiZM0AgEsWVrGWNUS2lgY5YNV1scZYO1hTBu1TJcAccYvcGmDKdhTEQuLYjrqD58/tfgDIkm/pIvJ+fhfA8n5whibhNZKSL9n6wQFpPyzFMRN+qq4IUFJtv8TLUHRPxM/gdTHQFGzlz+SZyJ3p+X87wifWerIBEkCaON4+gfNqF7xIAlroOTce3/Tmw7o03jvL0t5aBGnh/K2Pry+rDgYt1l5MvUZEcWUXGviXKRcI0y/k24r4gyYZRX83GajHdf2VIgLCYBwD8XYG5+jlmR/mY3HscQwVCQ66HrLPyxQOjPEA01RgrS08hIftWydc1qyVLBbIDpaT8z0zMc2HIUg6yOa8EgwWu/c3X4LFWaYva+n8W+92Rkpm5+MTYuXlgiGPaM0JLZySnVV5THGqhcXcOI+zyDbaUcULzDpx/lody1E1P1IVqMit86DNkblwguDf6Ado0e00obhgct1K77HNfJQkyaHMqVu1FmyHC3avE5zVzqNeBuUk1WKnfE3BQEZmeplzdiibfTsLae/uNKLFUFVBYVotol46y1iCnPF/zqMTDUFMvpw/HUqneUhAUzo3569/fTsu40tlV2nBV7cVjLOKzVUJCWitOcx1h3KT+e0XLRoWO4Mwm7PgqzJtUh3CLc+mS3+lvqkqx8knSQss0l6HVy+vr6qDEepb5Mhq95D762Qs7ZlAx+fYhvTNn0mD+kpvi15ht3kDj63RhdVifnewcwGr/kypUxOru6KM7fwxHV69RV5lBTpab7xG5OPZtExoq7OXc8l9w31qbf3MHExDhDF4YIBAL8MjGBXJGPw9FJre4Dehu1fN9jxmtV4Ny+iZz7IinJfK77/uV33RkWzM/P43a78PncXP15DJu1gVJ1IQMDA1RXpJHWksJbug14bUpxudnsS1/f89hD9zywbZkQzhMAXq9XxI1v0MOxY7W4XC78/gCF2jd5NDeGmBeW85k8mdYTeiIihMRI4Z/cLvK4VCrdYLd32LOyMlVinyzytEQiJKSnJMi3vxTn2pgYXSWNvmOTRPze8Mxi/gKHPkiflBBh7wAAAABJRU5ErkJggg==");
    this._viewable.set(true);
    this.visible = true;
  }
  ImgSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof RawVolume;
  };
  ImgSetItem.prototype.draw = function(info) {
    if ((info.time_ref._max != null) && info.time_ref._max.get() < this._children.length - 1) {
      info.time_ref._max.set(this._children.length - 1);
    }
    if (info.time_ref != null) {
      info.time_ref._div.set(Math.max(info.time_ref._max.get(), 1));
    }
    if (this._children[info.time] != null) {
      return this._children[info.time].draw(info);
    } else if (this._children[0] != null) {
      return this._children[0].draw(info);
    }
  };
  ImgSetItem.prototype.z_index = function() {
    if (this._children.length) {
      return this._children[0].z_index();
    }
    return 0;
  };
  ImgSetItem.prototype.update_min_max = function(x_min, x_max) {
    if (this._children[0] != null) {
      return this._children[0].update_min_max(x_min, x_max);
    }
  };
  ImgSetItem.prototype.anim_min_max = function() {
    return this._children.length;
  };
  return ImgSetItem;
})();var CollectionTreeItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
CollectionTreeItem = (function() {
  __extends(CollectionTreeItem, TreeItem);
  function CollectionTreeItem() {
    CollectionTreeItem.__super__.constructor.call(this);
    this.add_attr({
      _collection_size: 0,
      _incr_id_collection_child: 0
    });
    this.bind(__bind(function() {
      if (this._collection_size.has_been_modified()) {
        return this.change_collection();
      }
    }, this));
  }
  CollectionTreeItem.prototype.display_suppl_context_actions = function(context_action) {};
  CollectionTreeItem.prototype.display_context_actions = function() {
    var contex_action;
    contex_action = new Lst;
    contex_action.push(new TreeAppAction_Save);
    contex_action.push({
      txt: "add",
      ico: "data:image/png;base64,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",
      fun: __bind(function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._collection_size.set(item._collection_size.get() + 1));
        }
        return _results;
      }, this)
    });
    contex_action.push({
      txt: "remove",
      ico: "data:image/png;base64,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",
      fun: __bind(function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._collection_size.get() > 0 ? item._collection_size.set(item._collection_size.get() - 1) : void 0);
        }
        return _results;
      }, this)
    });
    this.display_suppl_context_actions(contex_action);
    return contex_action;
  };
  CollectionTreeItem.prototype.ask_for_id_collection_child = function() {
    var id_child;
    id_child = parseInt(this._incr_id_collection_child);
    this._incr_id_collection_child.set(parseInt(this._incr_id_collection_child) + 1);
    return id_child;
  };
  CollectionTreeItem.prototype.remove_collection_item = function() {
    var size_splice;
    size_splice = this._children.length - this._collection_size;
    return this._children.splice(this._collection_size, size_splice);
  };
  CollectionTreeItem.prototype.add_collection_item = function() {
    var id_child, name_temp;
    id_child = this.ask_for_id_collection_child();
    name_temp = "child_" + id_child.toString();
    return this.add_child(new BoundaryConditionItem(name_temp, id_child, this._dim));
  };
  CollectionTreeItem.prototype.change_collection = function() {
    var num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._collection_size) {
      return this.remove_collection_item();
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._collection_size; (size_child0_child <= _ref ? num_c < _ref : num_c > _ref); (size_child0_child <= _ref ? num_c += 1 : num_c -= 1)) {
        _results.push(this.add_collection_item());
      }
      return _results;
    }
  };
  return CollectionTreeItem;
})();var FileItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
FileItem = (function() {
  __extends(FileItem, TreeItem);
  function FileItem(file) {
    FileItem.__super__.constructor.call(this);
    if (file != null) {
      this.add_attr({
        _ptr: file._ptr
      });
      this._name.set(file.name);
      this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHnSURBVHjabVPLbtNAFD1+TyRUxyGJQWnjbvgASHfAF1Qs+g18BT/BL8CCJbBEahbtD6QPsijLuipgucFOUrVqm+AO947VUXF9rCPdmbln5t4zHkNKiSoMAgD3bogSkklY0DKvLXlg14jF0dGPqd/0BcU0NnlO0TQNjMfjkz9ZFuVZdk1zQbUCTox+J0l8eytJwMIaAjAtC60gWLfxECS0sLs7hEVJLLgPPrAoCmxuvgGjbgOlOZucgc+qLjAkfZZpqim7xjRvNBphONyG7wd4HLTgODa8hoDnuVjcLDCbz2GUG8Bm0w4Pv0873c5/pn388El5sL+3h8HGBn6enuLL189ot9twXZcr0C2E3bAr2LSyQnmvX+DFYKCCfhTBJNHaWh95nnGsUuw70578eg/DcoBK36rjYonzZ+8QNAOEYUgtOaTRFZDOorIvT8Al1MGQpWm93ipevXytbiJN0yWAnBXrWZ4ft771AcsjCmIDCsUV8Zp4g8utFKu93lshRErXKAkHk8kksfX1/L0oWQ9VwWw22yFhjBK6Bcn9aDwiNlhBLIhXxAto01CBDZSL0vFhiDnQBLBCdIkL4jnHTW1a3QY53fEy2kocUz8a/YD07xvHsTKtxmDJiU8BPNfP9yEk8YByE1TwD/10s5+5ubutAAAAAElFTkSuQmCC");
    }
  }
  return FileItem;
})();var RawVolume;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
RawVolume = (function() {
  __extends(RawVolume, TreeItem);
  function RawVolume() {
    RawVolume.__super__.constructor.call(this);
    this.add_attr({
      scalar_type: new Choice(0, ["PI8", "SI8", "PI16", "SI16", "PI32", "SI32", "FP32", "FP64"]),
      endianness: new Choice(0, ["LittleEndian", "BigEndian"]),
      img_size: [0, 0, 0],
      min_val: new ConstrainedVal(0, {
        min: 0,
        max: 255,
        div: 255
      }),
      max_val: new ConstrainedVal(255, {
        min: 0,
        max: 255,
        div: 255
      })
    });
    this._name.set("Raw volume");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42o2TW0zbBRSH/yVqvMTJhhHxQVejCWCmARfmNLtoMuPmbYRscSrRGiZM0AgEsWVrGWNUS2lgY5YNV1scZYO1hTBu1TJcAccYvcGmDKdhTEQuLYjrqD58/tfgDIkm/pIvJ+fhfA8n5whibhNZKSL9n6wQFpPyzFMRN+qq4IUFJtv8TLUHRPxM/gdTHQFGzlz+SZyJ3p+X87wifWerIBEkCaON4+gfNqF7xIAlroOTce3/Tmw7o03jvL0t5aBGnh/K2Pry+rDgYt1l5MvUZEcWUXGviXKRcI0y/k24r4gyYZRX83GajHdf2VIgLCYBwD8XYG5+jlmR/mY3HscQwVCQ66HrLPyxQOjPEA01RgrS08hIftWydc1qyVLBbIDpaT8z0zMc2HIUg6yOa8EgwWu/c3X4LFWaYva+n8W+92Rkpm5+MTYuXlgiGPaM0JLZySnVV5THGqhcXcOI+zyDbaUcULzDpx/lody1E1P1IVqMit86DNkblwguDf6Ado0e00obhgct1K77HNfJQkyaHMqVu1FmyHC3avE5zVzqNeBuUk1WKnfE3BQEZmeplzdiibfTsLae/uNKLFUFVBYVotol46y1iCnPF/zqMTDUFMvpw/HUqneUhAUzo3569/fTsu40tlV2nBV7cVjLOKzVUJCWitOcx1h3KT+e0XLRoWO4Mwm7PgqzJtUh3CLc+mS3+lvqkqx8knSQss0l6HVy+vr6qDEepb5Mhq95D762Qs7ZlAx+fYhvTNn0mD+kpvi15ht3kDj63RhdVifnewcwGr/kypUxOru6KM7fwxHV69RV5lBTpab7xG5OPZtExoq7OXc8l9w31qbf3MHExDhDF4YIBAL8MjGBXJGPw9FJre4Dehu1fN9jxmtV4Ny+iZz7IinJfK77/uV33RkWzM/P43a78PncXP15DJu1gVJ1IQMDA1RXpJHWksJbug14bUpxudnsS1/f89hD9zywbZkQzhMAXq9XxI1v0MOxY7W4XC78/gCF2jd5NDeGmBeW85k8mdYTeiIihMRI4Z/cLvK4VCrdYLd32LOyMlVinyzytEQiJKSnJMi3vxTn2pgYXSWNvmOTRPze8Mxi/gKHPkiflBBh7wAAAABJRU5ErkJggg==");
    this._viewable.set(true);
  }
  RawVolume.prototype.update_min_max = function(x_min, x_max) {
    var d, _results;
    _results = [];
    for (d = 0; d < 3; d++) {
      x_min[d] = Math.min(x_min[d], 0);
      _results.push(x_max[d] = Math.max(x_max[d], this.img_size[d].get()));
    }
    return _results;
  };
  return RawVolume;
})();var ViewItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ViewItem = (function() {
  __extends(ViewItem, TreeItem);
  function ViewItem(app_data, panel_id, cam) {
    this.app_data = app_data;
    if (cam == null) {
      cam = new Cam;
    }
    ViewItem.__super__.constructor.call(this);
    this.add_attr({
      background: new Background,
      cam: cam,
      axes: new Axes,
      _panel_id: panel_id,
      _repr: ""
    });
    this._buff = new Image;
    this._buff.onload = __bind(function() {
      return this._signal_change();
    }, this);
    this.bind(__bind(function() {
      if ((this._repr != null) && this._repr.has_been_modified()) {
        return this._buff.src = this._repr.get();
      }
    }, this));
    this._name.set("View");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHnSURBVHjabVPLbtNAFD1+TyRUxyGJQWnjbvgASHfAF1Qs+g18BT/BL8CCJbBEahbtD6QPsijLuipgucFOUrVqm+AO947VUXF9rCPdmbln5t4zHkNKiSoMAgD3bogSkklY0DKvLXlg14jF0dGPqd/0BcU0NnlO0TQNjMfjkz9ZFuVZdk1zQbUCTox+J0l8eytJwMIaAjAtC60gWLfxECS0sLs7hEVJLLgPPrAoCmxuvgGjbgOlOZucgc+qLjAkfZZpqim7xjRvNBphONyG7wd4HLTgODa8hoDnuVjcLDCbz2GUG8Bm0w4Pv0873c5/pn388El5sL+3h8HGBn6enuLL189ot9twXZcr0C2E3bAr2LSyQnmvX+DFYKCCfhTBJNHaWh95nnGsUuw70578eg/DcoBK36rjYonzZ+8QNAOEYUgtOaTRFZDOorIvT8Al1MGQpWm93ipevXytbiJN0yWAnBXrWZ4ft771AcsjCmIDCsUV8Zp4g8utFKu93lshRErXKAkHk8kksfX1/L0oWQ9VwWw22yFhjBK6Bcn9aDwiNlhBLIhXxAto01CBDZSL0vFhiDnQBLBCdIkL4jnHTW1a3QY53fEy2kocUz8a/YD07xvHsTKtxmDJiU8BPNfP9yEk8YByE1TwD/10s5+5ubutAAAAAElFTkSuQmCC");
    this._date_tex = -1;
  }
  ViewItem.prototype.accept_child = function(ch) {};
  ViewItem.prototype.z_index = function() {
    return 1;
  };
  ViewItem.prototype.draw = function(info) {
    var fs, gl, ibuf, idx, initBuffer, ps, tbuf, txc, vbuf, vs, vtx, z;
    if (info.ctx_type === '2d') {
      return info.ctx.drawImage(this._buff, 0, 0);
    } else {
      if (this._buff.width) {
        vs = "                    attribute vec3 a_position;\n                    attribute vec2 textureCoords;\n                    varying vec2 texcoords;\n                    void main( void ) {\n                        texcoords = textureCoords;\n                        gl_Position = vec4( a_position, 1.0 );\n                    }\n                ";
        fs = "                    precision mediump float;\n                    varying vec2 texcoords;\n                    uniform sampler2D uSampler;\n                    void main( void ) {\n                        gl_FragColor = texture2D( uSampler, texcoords );\n                    }\n                ";
        gl = info.ctx;
        ps = info.cm.gl_prog(vs, fs);
        gl.useProgram(ps);
        ps.atexAttrib = gl.getAttribLocation(ps, "textureCoords");
        ps.aposAttrib = gl.getAttribLocation(ps, "a_position");
        if (this._date_tex < this._repr._date_last_modification) {
          this._date_tex = this._repr._date_last_modification;
          if (this.tex != null) {
            gl.deleteTexture(this.tex);
          }
          this.tex = gl.createTexture();
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._buff);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        gl.bindTexture(gl.TEXTURE_2D, this.tex);
        ps.samplerUniform = gl.getUniformLocation(ps, "uSampler");
        gl.uniform1i(ps.samplerUniform, 0);
        z = 1.0 - 1e-5;
        vtx = new Float32Array([-1.0, -1.0, z, 1.0, 1.0, z, 1.0, -1.0, z, -1.0, 1.0, z]);
        txc = new Float32Array([0, 0, 1, 1, 1, 0, 0, 1]);
        idx = new Uint16Array([0, 2, 3, 1]);
        initBuffer = function(glELEMENT_ARRAY_BUFFER, data) {
          var buf;
          buf = gl.createBuffer();
          gl.bindBuffer(glELEMENT_ARRAY_BUFFER, buf);
          gl.bufferData(glELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
          return buf;
        };
        vbuf = initBuffer(gl.ARRAY_BUFFER, vtx);
        ibuf = initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
        gl.vertexAttribPointer(ps.aposAttrib, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ps.aposAttrib);
        tbuf = initBuffer(gl.ARRAY_BUFFER, txc);
        gl.vertexAttribPointer(ps.atexAttrib, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(ps.atexAttrib);
        gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
        gl.disableVertexAttribArray(ps.aposAttrib);
        gl.disableVertexAttribArray(ps.atexAttrib);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.deleteBuffer(tbuf);
        gl.deleteBuffer(ibuf);
        return gl.deleteBuffer(vbuf);
      }
    }
  };
  ViewItem.prototype.sub_canvas_items = function() {
    return [this.background, this.axes];
  };
  return ViewItem;
})();var ImgItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ImgItem = (function() {
  __extends(ImgItem, TreeItem);
  function ImgItem(file, app) {
    ImgItem.__super__.constructor.call(this);
    this.add_attr({
      img: new Img(file, app)
    });
    if (file instanceof Str) {
      this._name.set(file.replace(/^.*\//, ""));
    } else {
      this._name.set("image");
    }
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42o2TW0zbBRSH/yVqvMTJhhHxQVejCWCmARfmNLtoMuPmbYRscSrRGiZM0AgEsWVrGWNUS2lgY5YNV1scZYO1hTBu1TJcAccYvcGmDKdhTEQuLYjrqD58/tfgDIkm/pIvJ+fhfA8n5whibhNZKSL9n6wQFpPyzFMRN+qq4IUFJtv8TLUHRPxM/gdTHQFGzlz+SZyJ3p+X87wifWerIBEkCaON4+gfNqF7xIAlroOTce3/Tmw7o03jvL0t5aBGnh/K2Pry+rDgYt1l5MvUZEcWUXGviXKRcI0y/k24r4gyYZRX83GajHdf2VIgLCYBwD8XYG5+jlmR/mY3HscQwVCQ66HrLPyxQOjPEA01RgrS08hIftWydc1qyVLBbIDpaT8z0zMc2HIUg6yOa8EgwWu/c3X4LFWaYva+n8W+92Rkpm5+MTYuXlgiGPaM0JLZySnVV5THGqhcXcOI+zyDbaUcULzDpx/lody1E1P1IVqMit86DNkblwguDf6Ado0e00obhgct1K77HNfJQkyaHMqVu1FmyHC3avE5zVzqNeBuUk1WKnfE3BQEZmeplzdiibfTsLae/uNKLFUFVBYVotol46y1iCnPF/zqMTDUFMvpw/HUqneUhAUzo3569/fTsu40tlV2nBV7cVjLOKzVUJCWitOcx1h3KT+e0XLRoWO4Mwm7PgqzJtUh3CLc+mS3+lvqkqx8knSQss0l6HVy+vr6qDEepb5Mhq95D762Qs7ZlAx+fYhvTNn0mD+kpvi15ht3kDj63RhdVifnewcwGr/kypUxOru6KM7fwxHV69RV5lBTpab7xG5OPZtExoq7OXc8l9w31qbf3MHExDhDF4YIBAL8MjGBXJGPw9FJre4Dehu1fN9jxmtV4Ny+iZz7IinJfK77/uV33RkWzM/P43a78PncXP15DJu1gVJ1IQMDA1RXpJHWksJbug14bUpxudnsS1/f89hD9zywbZkQzhMAXq9XxI1v0MOxY7W4XC78/gCF2jd5NDeGmBeW85k8mdYTeiIihMRI4Z/cLvK4VCrdYLd32LOyMlVinyzytEQiJKSnJMi3vxTn2pgYXSWNvmOTRPze8Mxi/gKHPkiflBBh7wAAAABJRU5ErkJggg==");
    this._viewable.set(true);
  }
  ImgItem.prototype.accept_child = function(ch) {
    return false;
  };
  ImgItem.prototype.sub_canvas_items = function() {
    return [this.img];
  };
  ImgItem.prototype.z_index = function() {
    return this.img.z_index();
  };
  ImgItem.prototype.update_min_max = function(x_min, x_max) {
    return this.img.update_min_max(x_min, x_max);
  };
  ImgItem.prototype.get_file_info = function(info) {
    info.model_type = "Img";
    return info.icon = "picture";
  };
  return ImgItem;
})();var TreeItem_Computable;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeItem_Computable = (function() {
  __extends(TreeItem_Computable, TreeItem);
  function TreeItem_Computable() {
    TreeItem_Computable.__super__.constructor.call(this);
    this.add_attr({
      _computation_req_date: 1,
      _computation_rep_date: 0,
      _computation_mode: false,
      _ready_state: true,
      _computation_state: false,
      _pending_state: false,
      _processing_state: false,
      _finish_state: false,
      _stop_state: false,
      _sc_model_id: SC_MODEL_ID,
      _sc_nb_proc: 1,
      _messages: []
    });
    this.add_attr({
      auto_compute: this._computation_mode
    });
    this.bind(__bind(function() {
      if (this.real_change()) {
        if (this._computation_req_date.has_been_modified()) {
          return;
        }
        if (this._computation_rep_date.has_been_modified()) {
          return;
        }
        return this._computation_req_date.add(1);
      }
    }, this));
  }
  TreeItem_Computable.prototype.cosmetic_attribute = function(name) {
    return name === "_ready_state" || name === "_pending_state" || name === "_processing_state" || name === "_finish_state" || name === "_computation_req_date" || name === "_computation_rep_date" || name === "_computation_mode" || name === "_computation_state" || name === "_stop_state" || name === "_messages" || name === "auto_compute";
  };
  TreeItem_Computable.prototype.nothing_to_do = function() {
    return this._computation_req_date.get() === this._computation_rep_date.get();
  };
  TreeItem_Computable.prototype.manual_mode = function() {
    return this._computation_mode.get();
  };
  TreeItem_Computable.prototype.do_it = function() {
    return TreeItem_Computable._do_it_rec(this);
  };
  TreeItem_Computable._do_it_rec = function(obj) {
    var c, _i, _len, _ref, _results;
    if (obj instanceof TreeItem_Computable) {
      obj._computation_state.set(true);
      obj._stop_state.set(false);
    }
    _ref = obj._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _results.push(TreeItem_Computable._do_it_rec(c));
    }
    return _results;
  };
  TreeItem_Computable.prototype.stop_it = function() {
    return TreeItem_Computable._stop_it_rec(this);
  };
  TreeItem_Computable._stop_it_rec = function(obj) {
    var c, _i, _len, _ref, _results;
    if (obj instanceof TreeItem_Computable) {
      obj._computation_state.set(false);
      obj._computation_mode.set(false);
      obj._stop_state.set(true);
    }
    _ref = obj._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _results.push(TreeItem_Computable._stop_it_rec(c));
    }
    return _results;
  };
  return TreeItem_Computable;
})();var DisplaySettingsItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
DisplaySettingsItem = (function() {
  __extends(DisplaySettingsItem, TreeItem);
  function DisplaySettingsItem(layout_manager_data) {
    if (layout_manager_data == null) {
      layout_manager_data = {};
    }
    DisplaySettingsItem.__super__.constructor.call(this);
    this.add_attr({
      theme: new Theme,
      _layout: new LayoutManagerData(layout_manager_data)
    });
    this._name._set("Display settings");
    this._ico._set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAADdgAAA3YBfdWCzAAAAAd0SU1FB9oBEAMpLRHXlgEAAAQbSURBVDgRARAE7/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADNzdEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc3N0bcCAgNIAAD/AAAAAAAAAAEABAQEwS0tKEDT09fA+/v7PwAAAAAAAAEAAQEAAAAAAAAAAAAAAAABAP7+/bgE+fn5SC0tKQD7+/sA/Pz8APz8/ADl5ek/AAAAAPb29z82NjEA+vr6APv7+wD+/v4A/v7+AP7+/gD///4A2dnfSAT19fYAAwMCAPr6/wAEBAQAAQEAAPT09QAAAAAA9fX0AAAAAAABAQEAAAAAAAEBAQD///8AAgICAP//AQD29vUAAvb29gAHBwcABQUFANLS0gAHBwgA9vb2AAAAAAD19fYAAAAAAAMDAwAHBwcA0tLSAAYGBgDQ0NAABQUEAPb29gAE9vb2AAICAwAMDAwAOjo6AP7+/AD29vYAAAAAAPf39wAAAAAAAgICAAICAgA6OjoA+/v7ADo6OQD9/fwA9vb3AAT8/Py4oKClSAEBAAAAAAEAAAAAAAkJCMEAAAAA///+xqCgpToAAAAAAAAAAAAAAAABAQEAAAAAAAAAAQADAwG9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzc3RtwEBAUgAAAAAAAAAAAAAAQABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAABAQAA/f38uAT4+PhIOjo2AP39/QD8/PwA/Pz7AP39/gD///8A/v7+AP7+/gD+/v0A+/v8AP7+/gD+/vwAAAABAAAAAQDm5upIBPb29gAAAAAAAAAAAP///wAAAAEA////AP7+/gD+/v4A////AAEBAgACAgIAAQEBAP7+/gAAAAAAAAAAAPb29gAC9vb3AAAAAAACAgIABAQEAAICAgADAwMAAQEBAAICAgAFBQUA09PTAAcHBwDU1NQABwcHANTU1AAEBAMA9vb3AAT39/cAAAAAAAEBAQAEBAQABAQEAP7+/QD8/PwA/f3+AP///gA3NzYA/Pz8ADY2NgD7+/sANTU1APz8+wD39/cAAaWlqbf8/P1IAAD/AAAAAAAAAAEAAAAAAAAAAAABAQAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgIBAAAAAbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFy8/azHbCOEAAAAAElFTkSuQmCC");
    this._layout.bind(__bind(function() {
      var l, view_item, _i, _len, _ref, _ref2, _results;
      l = this._layout.panel_id_of_term_panels();
      _ref = this._children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view_item = _ref[_i];
        if (view_item instanceof ViewItem) {
          _results.push((_ref2 = view_item._panel_id.get(), __indexOf.call(l, _ref2) < 0) ? this.rem_child(view_item) : void 0);
        }
      }
      return _results;
    }, this));
    this._layout.allow_destruction = __bind(function(data) {
      return this._layout.panel_id_of_term_panels().length >= 4;
    }, this);
  }
  DisplaySettingsItem.prototype.accept_child = function(ch) {
    return ch instanceof ViewItem;
  };
  DisplaySettingsItem.prototype.z_index = function() {};
  return DisplaySettingsItem;
})();var ShootingItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ShootingItem = (function() {
  __extends(ShootingItem, TreeItem);
  function ShootingItem(app, panel_id) {
    var lst_view;
    this.app = app;
    this.panel_id = panel_id;
    ShootingItem.__super__.constructor.call(this);
    lst_view = new Lst;
    this.add_attr({
      view: new Choice(0, lst_view),
      cam: new Cam
    });
    this.add_attr({
      _cam_representation: new CamRepresentation(this.cam)
    });
    this._name.set("Shooting informations");
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(true);
    this.add_child(new ImgSetItem);
  }
  ShootingItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof ImgSetItem || ch instanceof SketchItem || ch instanceof TransformItem;
  };
  ShootingItem.prototype.sub_canvas_items = function() {
    return [this._cam_representation];
  };
  ShootingItem.prototype.z_index = function() {
    return 0.1;
  };
  ShootingItem.prototype.draw = function(info) {
    var c, _i, _len, _ref;
    info.shoot_cam = this.cam;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      c.draw(info);
    }
    if (this.cam === info.cam) {
      info.ctx.beginPath();
      info.ctx.fillStyle = "white";
      info.ctx.font = "10px Arial";
      info.ctx.textBaseline = 'top';
      info.ctx.textAlign = 'right';
      info.ctx.fillText("Shooting Cam " + this.cam.model_id, info.w - 10, 10);
    }
    return delete info.shoot_cam;
  };
  return ShootingItem;
})();var TreeView_ModuleView;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TreeView_ModuleView = (function() {
  __extends(TreeView_ModuleView, View);
  function TreeView_ModuleView(el, roots, selected, visible, closed, visibility_context, tree_app) {
    this.el = el;
    this.roots = roots;
    this.selected = selected != null ? selected : new Lst;
    this.visible = visible != null ? visible : new Model;
    this.closed = closed != null ? closed : new Lst;
    this.visibility_context = visibility_context;
    this.tree_app = tree_app;
    TreeView_ModuleView.__super__.constructor.call(this, [this.roots, this.selected, this.visible, this.closed, this.visibility_context]);
    this.treeview = new TreeView(this.el, this.roots, this.selected, this.visible, this.closed, this.visibility_context);
  }
  return TreeView_ModuleView;
})();var ContextBar;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ContextBar = (function() {
  __extends(ContextBar, View);
  function ContextBar(el, tree_app, params) {
    this.el = el;
    this.tree_app = tree_app;
    if (params == null) {
      params = {};
    }
    this.create_list_menu = __bind(this.create_list_menu, this);;
    this.app_data = this.tree_app.data;
    ContextBar.__super__.constructor.call(this, this.app_data);
    this.icon_container = new_dom_element({
      nodeName: "div",
      parentNode: this.el
    });
    this.run_compute_action = {
      txt: "run",
      ico: "data:image/png;base64,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",
      loc: true,
      fun: __bind(function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._computation_mode.get() === false && item._computation_state.get() === false ? item.do_it() : void 0);
        }
        return _results;
      }, this)
    };
    this.stop_compute_action = {
      txt: "stop",
      ico: "data:image/png;base64,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",
      loc: true,
      fun: __bind(function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._computation_state.get() === true || item._pending_state.get() === true || item._processing_state.get() === true || item._finish_state.get() === true ? item.stop_it() : void 0);
        }
        return _results;
      }, this)
    };
  }
  ContextBar.prototype.onchange = function() {
    var act, block, container_icon, context_actions, item, j, path, processing, suppl_act, _i, _j, _k, _len, _len2, _len3, _len4, _ref, _ref2, _results;
    context_actions = new Lst;
    processing = false;
    if (this.app_data.selected_tree_items.has_been_directly_modified) {
      _ref = this.app_data.selected_tree_items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        item = path[path.length - 1];
        if (item.auto_compute != null) {
          if (item._computation_mode.get() === false && item._computation_state.get() === false) {
            context_actions.push(this.run_compute_action);
          } else if (item._computation_state.get() === true || item._pending_state.get() === true || item._processing_state.get() === true || item._finish_state.get() === true) {
            processing = true;
            context_actions.push(this.stop_compute_action);
          }
        }
        suppl_act = item.display_context_actions();
        for (_j = 0, _len2 = suppl_act.length; _j < _len2; _j++) {
          act = suppl_act[_j];
          if (act instanceof TreeAppModule) {
            __bind(function(act) {
              var in_act, _i, _len, _ref, _results;
              _ref = act.actions;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                in_act = _ref[_i];
                _results.push(__bind(function(in_act) {
                  if (!(context_actions.contains(in_act))) {
                    return context_actions.push(in_act);
                  }
                }, this)(in_act));
              }
              return _results;
            }, this)(act);
          } else {
            if (!(context_actions.contains(act))) {
              context_actions.push(act);
            }
          }
        }
        if (item._context_actions != null) {
          _ref2 = item._context_actions;
          for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
            act = _ref2[_k];
            if (act instanceof TreeAppModule) {
              __bind(function(act) {
                var in_act, _i, _len, _ref, _results;
                _ref = act.actions;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  in_act = _ref[_i];
                  _results.push(__bind(function(in_act) {
                    if (!(context_actions.contains(in_act))) {
                      return context_actions.push(in_act);
                    }
                  }, this)(in_act));
                }
                return _results;
              }, this)(act);
            } else {
              if (!(context_actions.contains(act))) {
                context_actions.push(act);
              }
            }
          }
        }
      }
    }
    this.el.appendChild(this.icon_container);
    while (this.icon_container.firstChild != null) {
      this.icon_container.removeChild(this.icon_container.firstChild);
    }
    block = new_dom_element({
      parentNode: this.icon_container,
      nodeName: "span"
    });
    if (processing) {
      container_icon = new_dom_element({
        parentNode: block,
        nodeName: "span",
        className: "ContextModuleProcessig"
      });
    }
    _results = [];
    for (j = 0, _len4 = context_actions.length; j < _len4; j++) {
      act = context_actions[j];
      if (act.vis !== false) {
        _results.push(this._select_icon_type_rec(act, block, 1));
      }
    }
    return _results;
  };
  ContextBar.prototype.draw_item = function(act, parent, key, size, prf) {
    return __bind(function(act) {
      var container_icon, de;
      if ((prf != null) && prf === "list") {
        container_icon = new_dom_element({
          parentNode: parent,
          nodeName: "img",
          alt: act.txt,
          title: act.txt + key,
          src: act.ico,
          style: {
            height: 30
          },
          onmousedown: __bind(function(evt) {
            act.fun(evt, this.tree_app);
            return parent.classList.toggle("inline");
          }, this)
        });
        new_dom_element({
          parentNode: parent,
          nodeName: "br"
        });
      } else {
        container_icon = new_dom_element({
          parentNode: parent,
          nodeName: "span",
          className: "ContextModule"
        });
        de = new_dom_element({
          nodeName: "img",
          src: act.ico,
          parentNode: container_icon,
          alt: act.txt,
          title: act.txt,
          style: {
            height: 30
          },
          onclick: __bind(function(evt) {
            return act.fun(evt, this.tree_app);
          }, this)
        });
      }
      return container_icon;
    }, this)(act);
  };
  ContextBar.prototype.display_child_menu_container = function(evt, val) {
    var containers, menu_container;
    if (val === 1) {
      containers = document.getElementsByClassName("menu_container");
      menu_container = containers[containers.length - 1];
      menu_container.classList.add("block");
    }
    if (val === 0) {
      containers = document.getElementsByClassName("menu_container");
      menu_container = containers[containers.length - 1];
      return menu_container.classList.remove("block");
    }
  };
  ContextBar.prototype.create_list_menu = function(act, parent, key, size) {
    var arrow, arrow_container, child_container, click_container;
    click_container = new_dom_element({
      parentNode: parent,
      nodeName: "span",
      className: "ContextModule"
    });
    if ((act.ico != null) && act.ico.length > 0) {
      new_dom_element({
        parentNode: click_container,
        nodeName: "img",
        alt: act.txt,
        title: act.txt + key,
        src: act.ico,
        className: "parent_list_icon",
        style: {
          height: 30
        },
        onmousedown: __bind(function(evt) {
          var _ref;
          return (_ref = act.sub.act[0]) != null ? _ref.fun(evt, this.tree_app) : void 0;
        }, this)
      });
    }
    arrow_container = new_dom_element({
      parentNode: click_container,
      nodeName: "span",
      className: "arrow_container",
      onmousedown: __bind(function(evt) {
        return child_container.classList.toggle("block");
      }, this)
    });
    arrow = new_dom_element({
      parentNode: arrow_container,
      nodeName: "img",
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CGQ0RLrJyU6gAAABLSURBVBjTY/z//z8DqYCFgYGB4evnR0Tr5OaVY2SCMYjVwMDAwMCELkBIA4omfBrRxZkIKcBq0P///7HiL58e/sclx0hOkDMxkAEAsgUzZcOBlXMAAAAASUVORK5CYII=",
      alt: "",
      className: "arrow"
    });
    child_container = new_dom_element({
      parentNode: parent,
      nodeName: "span",
      className: "container_hidden_icon",
      id: "id_hidden_icon"
    });
    return child_container;
  };
  ContextBar.prototype._select_icon_type_rec = function(act, parent, size, prf) {
    var ac, container, i, key, must_draw_item, _len, _ref, _ref2;
    if (prf == null) {
      prf = '';
    }
    key = this.key_as_string(act);
    if ((act.sub != null) && (act.sub.prf != null) && (act.sub.act != null)) {
      must_draw_item = false;
      act.fun = function(evt, app) {
        return act.sub.act[0].fun(evt, app);
      };
      container = this.create_list_menu(act, parent, key, size);
    } else {
      container = this.draw_item(act, parent, key, size, prf);
    }
    if (((_ref = act.sub) != null ? _ref.act : void 0) != null) {
      _ref2 = act.sub.act;
      for (i = 0, _len = _ref2.length; i < _len; i++) {
        ac = _ref2[i];
        this._select_icon_type_rec(ac, container, size, act.sub.prf);
      }
      return true;
    }
    return false;
  };
  ContextBar.prototype.key_as_string = function(act) {
    var i, k, key, _len, _ref;
    key = '';
    if (act.key != null) {
      key = ' (';
      _ref = act.key;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        k = _ref[i];
        if (i >= 1) {
          key += ' or ';
        }
        key += k;
      }
      key += ')';
    }
    return key;
  };
  return ContextBar;
})();var IcoBar;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
IcoBar = (function() {
  __extends(IcoBar, View);
  function IcoBar(el, tree_app, params) {
    var key, val;
    this.el = el;
    this.tree_app = tree_app;
    if (params == null) {
      params = {};
    }
    this.create_list_menu = __bind(this.create_list_menu, this);;
    this.modules = this.tree_app.data.modules;
    IcoBar.__super__.constructor.call(this, this.modules);
    this.app_data = this.tree_app.data;
    IcoBar.__super__.constructor.call(this, this.app_data);
    this.tree_app.data.focus.bind(this);
    this.loc = false;
    for (key in params) {
      val = params[key];
      this[key] = val;
    }
    if (this.loc === false) {
      this.disp_top = 0;
      this.disp_left = 0;
      this.height = 0;
      this.height_ico = 24;
      this.div = new_dom_element({
        className: "IcoBar",
        style: {
          position: "absolute",
          right: 0
        }
      });
    }
    this.icon_container = new_dom_element({
      nodeName: "div",
      className: "FooterTreeView",
      parentNode: this.el
    });
  }
  IcoBar.prototype.onchange = function() {
    var context_modules, item, m, module, path, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _results;
    context_modules = new Lst;
    context_modules.set(this.app_data.modules);
    if (this.app_data.selected_tree_items.has_been_directly_modified) {
      _ref = this.app_data.selected_tree_items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        item = path[path.length - 1];
        if (item._context_modules != null) {
          _ref2 = item._context_modules;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            module = _ref2[_j];
            if (!(context_modules.contains(module))) {
              context_modules.push(module);
            }
          }
        }
      }
    }
    this._render_loc_actions(this.tree_app);
    if (this.loc === true) {
      return;
    }
    this.el.appendChild(this.div);
    this.div.style.top = this.disp_top;
    this.div.style.left = this.disp_left;
    this.hidden_ico = false;
    while (this.div.firstChild != null) {
      this.div.removeChild(this.div.firstChild);
    }
    _results = [];
    for (_k = 0, _len3 = context_modules.length; _k < _len3; _k++) {
      m = context_modules[_k];
      if ((m.visible != null) && m.visible === false) {
        continue;
      }
      _results.push(__bind(function(m) {
        var act, big_icon, block, icon_bot, icon_top, j, module_title, parent, _len, _ref, _results;
        block = new_dom_element({
          parentNode: this.div,
          nodeName: "span",
          className: "module"
        });
        if (m.right != null) {
          block.style.cssFloat = "right";
        }
        parent = icon_top = icon_bot = big_icon = void 0;
        _ref = m.actions;
        _results = [];
        for (j = 0, _len = _ref.length; j < _len; j++) {
          act = _ref[j];
          if (act.vis !== false && act.loc !== true) {
            __bind(function(act) {
              var container_icon, siz;
              siz = act.siz || 1;
              if (act.siz === 1) {
                if (parent === void 0 || parent === big_icon) {
                  container_icon = new_dom_element({
                    parentNode: block,
                    nodeName: "span",
                    className: "container_icon"
                  });
                  icon_top = new_dom_element({
                    parentNode: container_icon,
                    nodeName: "span",
                    className: "icon_top_span"
                  });
                  new_dom_element({
                    parentNode: container_icon,
                    nodeName: "br"
                  });
                  icon_bot = new_dom_element({
                    parentNode: container_icon,
                    nodeName: "span",
                    className: "icon_bot_span"
                  });
                  parent = icon_top;
                }
              } else {
                if (parent === void 0) {
                  parent = big_icon;
                }
                if (parent === icon_top || parent === icon_bot) {
                  container_icon = new_dom_element({
                    parentNode: block,
                    nodeName: "span",
                    className: "container_icon"
                  });
                  big_icon = new_dom_element({
                    parentNode: container_icon,
                    nodeName: "span",
                    className: "big_icon_span"
                  });
                  parent = big_icon;
                }
              }
              this._select_icon_type_rec(act, parent, siz);
              if (act.siz === 1 && parent !== big_icon && act.ord === void 0 || act.ord === true) {
                if (parent === icon_top) {
                  return parent = icon_bot;
                } else {
                  return parent = icon_top;
                }
              }
            }, this)(act);
            _results.push(module_title = new_dom_element({
              parentNode: block,
              nodeName: "div",
              className: "module_title",
              txt: m.name
            }));
          }
        }
        return _results;
      }, this)(m));
    }
    return _results;
  };
  IcoBar.prototype.key_as_string = function(act) {
    var i, k, key, _len, _ref;
    key = '';
    if (act.key != null) {
      key = ' (';
      _ref = act.key;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        k = _ref[i];
        if (i >= 1) {
          key += ' or ';
        }
        key += k;
      }
      key += ')';
    }
    return key;
  };
  IcoBar.prototype.display_child_menu_container = function(evt, val) {
    var containers, menu_container;
    if (val === 1) {
      containers = document.getElementsByClassName("menu_container");
      menu_container = containers[containers.length - 1];
      menu_container.classList.add("block");
    }
    if (val === 0) {
      containers = document.getElementsByClassName("menu_container");
      menu_container = containers[containers.length - 1];
      return menu_container.classList.remove("block");
    }
  };
  IcoBar.prototype.draw_item = function(act, parent, key, size, prf) {
    var arr, c, editor, hotkey, s, t, _ref;
    if (act.vis !== false) {
      if ((prf != null) && prf === "menu") {
        if (act.mod != null) {
          editor = new_model_editor({
            el: parent,
            model: act.mod(this.tree_app),
            item_width: 85
          });
          s = parent;
        } else {
          if (((_ref = act.sub) != null ? _ref.act : void 0) != null) {
            c = new_dom_element({
              parentNode: parent,
              nodeName: "div",
              className: "elem_container_parent",
              txt: act.txt,
              title: act.txt + key,
              onmouseover: __bind(function(evt) {
                return this.display_child_menu_container(evt, 1);
              }, this),
              onmouseout: __bind(function(evt) {
                return this.display_child_menu_container(evt, 0);
              }, this)
            });
            arr = new_dom_element({
              parentNode: c,
              nodeName: "img",
              className: "menu_img_arrow",
              src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CGQ0RLrJyU6gAAABLSURBVBjTY/z//z8DqYCFgYGB4evnR0Tr5OaVY2SCMYjVwMDAwMCELkBIA4omfBrRxZkIKcBq0P///7HiL58e/sclx0hOkDMxkAEAsgUzZcOBlXMAAAAASUVORK5CYII=",
              alt: ""
            });
          } else {
            s = new_dom_element({
              parentNode: parent,
              nodeName: "div",
              className: "elem_container",
              title: act.txt + key,
              onmousedown: __bind(function(evt) {
                act.fun(evt, this.tree_app);
                return parent.classList.toggle("block");
              }, this)
            });
            t = new_dom_element({
              parentNode: s,
              nodeName: "span",
              txt: act.txt
            });
            hotkey = new_dom_element({
              parentNode: s,
              nodeName: "span",
              className: "elem_container_key",
              txt: key
            });
          }
        }
      } else if ((prf != null) && prf === "list") {
        s = new_dom_element({
          parentNode: parent,
          nodeName: "img",
          alt: act.txt,
          title: act.txt + key,
          src: act.ico,
          style: {
            height: this.height_ico * size
          },
          onmousedown: __bind(function(evt) {
            act.fun(evt, this.tree_app);
            return parent.classList.toggle("inline");
          }, this)
        });
        new_dom_element({
          parentNode: parent,
          nodeName: "br"
        });
      } else if ((act.ico != null) && act.ico.length > 0) {
        s = new_dom_element({
          parentNode: parent,
          nodeName: "img",
          alt: act.txt,
          title: act.txt + key,
          src: act.ico,
          style: {
            height: this.height_ico * size
          },
          onmousedown: __bind(function(evt) {
            return act.fun(evt, this.tree_app);
          }, this)
        });
      } else if (act.mod != null) {
        editor = new_model_editor({
          el: parent,
          model: act.mod(this.tree_app),
          item_width: 85
        });
        s = parent;
      } else if (act.txt != null) {
        s = new_dom_element({
          parentNode: parent,
          nodeName: "span",
          txt: act.txt,
          title: act.txt + key,
          style: {
            height: this.height_ico * size
          },
          onmousedown: __bind(function(evt) {
            return act.fun(evt, this.tree_app);
          }, this)
        });
      }
    }
    return s;
  };
  IcoBar.prototype.create_hierarchical_menu = function(sub, parent, key) {
    var menu_container;
    if (parent.className === "menu_container") {
      menu_container = new_dom_element({
        parentNode: parent,
        nodeName: "div",
        className: "menu_container",
        style: {
          left: "100%"
        },
        onmouseover: __bind(function(evt) {
          return this.display_child_menu_container(evt, 1);
        }, this),
        onmouseout: __bind(function(evt) {
          return this.display_child_menu_container(evt, 0);
        }, this)
      });
    } else {
      menu_container = new_dom_element({
        parentNode: parent,
        nodeName: "div",
        className: "menu_container",
        style: {
          top: "70%"
        }
      });
    }
    return menu_container;
  };
  IcoBar.prototype.create_list_menu = function(act, parent, key, size) {
    var arrow, arrow_container, child_container, click_container, editor;
    click_container = new_dom_element({
      parentNode: parent,
      nodeName: "span",
      className: "click_container"
    });
    if ((act.ico != null) && act.ico.length > 0) {
      new_dom_element({
        parentNode: click_container,
        nodeName: "img",
        alt: act.txt,
        title: act.txt + key,
        src: act.ico,
        className: "parent_list_icon",
        style: {
          height: this.height_ico * size
        },
        onmousedown: __bind(function(evt) {
          var _ref;
          return (_ref = act.sub.act[0]) != null ? _ref.fun(evt, this.tree_app) : void 0;
        }, this)
      });
    } else if (act.mod != null) {
      editor = new_model_editor({
        el: click_container,
        model: act.mod(this.tree_app),
        item_width: 85
      });
    } else if (act.txt != null) {
      new_dom_element({
        parentNode: click_container,
        nodeName: "span",
        txt: act.txt,
        title: act.txt + key,
        style: {
          height: this.height_ico * size
        },
        onmousedown: __bind(function(evt) {
          return act.fun(evt, this.tree_app);
        }, this)
      });
    }
    arrow_container = new_dom_element({
      parentNode: click_container,
      nodeName: "span",
      className: "arrow_container",
      onmousedown: __bind(function(evt) {
        return child_container.classList.toggle("inline");
      }, this)
    });
    arrow = new_dom_element({
      parentNode: arrow_container,
      nodeName: "img",
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CGQ0RLrJyU6gAAABLSURBVBjTY/z//z8DqYCFgYGB4evnR0Tr5OaVY2SCMYjVwMDAwMCELkBIA4omfBrRxZkIKcBq0P///7HiL58e/sclx0hOkDMxkAEAsgUzZcOBlXMAAAAASUVORK5CYII=",
      alt: "",
      className: "arrow"
    });
    child_container = new_dom_element({
      parentNode: parent,
      nodeName: "span",
      className: "container_hidden_icon",
      id: "id_hidden_icon"
    });
    return child_container;
  };
  IcoBar.prototype._select_icon_type_rec = function(act, parent, size, prf) {
    var ac, container, i, key, must_draw_item, _len, _ref, _ref2;
    if (prf == null) {
      prf = '';
    }
    key = this.key_as_string(act);
    if ((act.sub != null) && (act.sub.prf != null) && (act.sub.act != null)) {
      if (act.sub.prf === "list") {
        must_draw_item = false;
        act.fun = function(evt, app) {
          return act.sub.act[0].fun(evt, app);
        };
        container = this.create_list_menu(act, parent, key, size);
      } else if (act.sub.prf === "menu") {
        container = this.create_hierarchical_menu(act.sub, parent, key);
        must_draw_item = false;
        this.draw_item(act, parent, key, size, prf);
        act.fun = function(evt, app) {
          return container.classList.toggle("block");
        };
      }
    } else if (act.vis !== false && must_draw_item !== false) {
      container = this.draw_item(act, parent, key, size, prf);
    }
    if (((_ref = act.sub) != null ? _ref.act : void 0) != null) {
      _ref2 = act.sub.act;
      for (i = 0, _len = _ref2.length; i < _len; i++) {
        ac = _ref2[i];
        this._select_icon_type_rec(ac, container, size, act.sub.prf);
      }
      return true;
    }
    return false;
  };
  IcoBar.prototype._render_loc_actions = function(tree_app) {
    var m, _i, _len, _ref, _results;
    this.tree_app = tree_app;
    while (this.icon_container.firstChild != null) {
      this.icon_container.removeChild(this.icon_container.firstChild);
    }
    _ref = this.modules;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      _results.push(__bind(function(m) {
        var act, j, _len, _ref, _results;
        _ref = m.actions;
        _results = [];
        for (j = 0, _len = _ref.length; j < _len; j++) {
          act = _ref[j];
          if (act.loc === true) {
            _results.push(__bind(function(act) {
              var de;
              de = new_dom_element({
                nodeName: "img",
                src: act.ico,
                className: "FooterTreeViewIcon",
                parentNode: this.icon_container,
                alt: act.txt,
                title: act.txt,
                onclick: __bind(function(evt) {
                  return act.fun(evt, this.tree_app);
                }, this)
              });
              if (this.bnd && (act.bnd != null) && (act.vis != null)) {
                return act.bnd(this.tree_app.data).bind(__bind(function() {
                  if (act.vis(this.tree_app)) {
                    return de.style.display = "none";
                  } else {
                    return de.style.display = "inline-block";
                  }
                }, this));
              } else if (!this.bnd && (act.bnd != null)) {
                return de.style.display = "none";
              }
            }, this)(act));
          }
        }
        return _results;
      }, this)(m));
    }
    return _results;
  };
  return IcoBar;
})();var TreeApp;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeApp = (function() {
  __extends(TreeApp, View);
  function TreeApp(bel, data) {
    this.bel = bel;
    this.data = data != null ? data : new TreeAppData;
    TreeApp.__super__.constructor.call(this, this.data);
    this.layouts = {};
    this.cur_session_model_id = -1;
    this.active_key = new Bool(true);
    this.undo_manager = new UndoManager(this.data);
    this.he = new_dom_element({
      parentNode: this.bel,
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "31px",
        height: "30px"
      }
    });
    this.el = new_dom_element({
      parentNode: this.bel,
      id: "main_window",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "61px",
        bottom: 0
      }
    });
    this.icobar = new IcoBar(this.he, this, {
      allow_sub: false
    });
    document.addEventListener("keydown", (__bind(function(evt) {
      return this._on_key_down(evt);
    }, this)), true);
    this.msg_container = new_dom_element({
      nodeName: "div",
      id: "msg_container",
      parentNode: this.el,
      txt: ""
    });
  }
  TreeApp.prototype.onchange = function() {
    var d, el, message, session, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5;
    if (((_ref = this.treeview) != null ? _ref.flat : void 0) != null) {
      _ref2 = this.treeview.flat;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        el = _ref2[_i];
        if (((_ref3 = el.item) != null ? _ref3._messages : void 0) != null) {
          if (el.item._messages.has_been_modified()) {
            _ref4 = el.item._messages;
            for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
              message = _ref4[_j];
              if (message.has_been_modified()) {
                __bind(function(message) {
                  var br, msg_box, msg_content;
                  msg_box = new_dom_element({
                    nodeName: "span",
                    id: "msg_box",
                    parentNode: this.msg_container
                  });
                  msg_content = new_dom_element({
                    nodeName: "span",
                    parentNode: msg_box,
                    txt: message.provenance + " : " + message.title
                  });
                  br = new_dom_element({
                    nodeName: "br",
                    parentNode: msg_box
                  });
                  msg_content.classList.add(message.type);
                  return setTimeout((__bind(function() {
                    return this.msg_container.removeChild(msg_box);
                  }, this)), 5000);
                }, this)(message);
              }
            }
          }
        }
      }
    }
    if (this.data.selected_tree_items.has_been_modified()) {
      session = this.data.selected_session();
      if (session != null) {
        if (!(this.layouts[session.model_id] != null)) {
          this.layouts[session.model_id] = this._new_LayoutManager(session);
        }
        if (this.cur_session_model_id !== session.model_id) {
          if ((_ref5 = this.layouts[this.cur_session_model_id]) != null) {
            _ref5.hide();
          }
          this.layouts[session.model_id].show();
          this.cur_session_model_id = session.model_id;
        }
      }
    }
    d = this.data.selected_display_settings();
    if (d._layout.has_been_modified()) {
      return this.data.update_associated_layout_data(d);
    }
  };
  TreeApp.prototype.selected_canvas_inst = function() {
    var layout, panel_id, session, _i, _len, _ref, _results;
    session = this.data.selected_session();
    layout = this.layouts[session.model_id];
    _ref = this.data.selected_canvas_pan;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      panel_id = _ref[_i];
      if (layout._pan_vs_id[panel_id] != null) {
        _results.push(layout._pan_vs_id[panel_id]);
      }
    }
    return _results;
  };
  TreeApp.prototype.all_canvas_inst = function() {
    var ch, cmpi, key, layout, session, _ref;
    session = this.data.selected_session();
    layout = this.layouts[session.model_id];
    cmpi = [];
    _ref = layout._pan_vs_id;
    for (ch in _ref) {
      key = _ref[ch];
      if (key instanceof CanvasManagerPanelInstance) {
        cmpi.push(key);
      }
    }
    return cmpi;
  };
  TreeApp.prototype.fit = function(anim) {
    var inst, _i, _len, _ref, _results;
    if (anim == null) {
      anim = 1;
    }
    _ref = this.selected_canvas_inst();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      inst = _ref[_i];
      _results.push(inst.cm.fit(anim));
    }
    return _results;
  };
  TreeApp.prototype._new_LayoutManager = function(session) {
    var display_settings, res;
    display_settings = session._children.detect(function(x) {
      return x instanceof DisplaySettingsItem;
    });
    res = new LayoutManager(this.el, display_settings._layout);
    res.new_panel_instance = __bind(function(data) {
      return this._new_panel_instance(display_settings, data);
    }, this);
    return res;
  };
  TreeApp.prototype._new_panel_instance = function(display_settings, data) {
    var c, id, res, tree_item, view_item, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
    if (data.panel_id === "IcoBar") {
      res = new LayoutManagerPanelInstance(this.el, data);
      res.div.className = "PanelInstanceIcoBar";
      this.icobar = new IcoBar(res.div, this, {
        allow_sub: false
      });
      return res;
    }
    if (data.panel_id === "ContextBar") {
      res = new LayoutManagerPanelInstance(this.el, data);
      res.div.className = "PanelInstanceContextBar";
      new ContextBar(res.div, this);
      return res;
    }
    if (data.panel_id === "TreeView") {
      res = new LayoutManagerPanelInstance(this.el, data, "Scene");
      res.div.className = "PanelInstanceTreeView";
      this.module_treeview = new TreeView_ModuleView(res.div, this.data.tree_items, this.data.selected_tree_items, this.data.visible_tree_items, this.data.closed_tree_items, this.data.last_canvas_pan, this);
      this.treeview = this.module_treeview.treeview;
      res.treeview = this.module_treeview.treeview;
      res.div.onmousedown = __bind(function() {
        this.data.focus.set(this.module_treeview.treeview.view_id);
        return true;
      }, this);
      return res;
    }
    if (data.panel_id === "EditView") {
      res = new LayoutManagerPanelInstance(this.el, data, "Inspector");
      res.div.className = "PanelInstanceEditView";
      new EditView(res.div, this.data, this.undo_manager);
      return res;
    }
    view_item = void 0;
    _ref = display_settings._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      if (c._panel_id.get() === data.panel_id) {
        view_item = c;
        break;
      }
    }
    if (!(view_item != null)) {
      view_item = new ViewItem(this.data, data.panel_id, this._next_view_item_cam);
      if (this._next_view_item_child) {
        view_item.add_child(this._next_view_item_child);
      }
      display_settings._children.push(view_item);
      delete this._next_view_item_cam;
    }
    bind(this.data.selected_canvas_pan, __bind(function() {
      if (this.data.selected_canvas_pan.contains(data.panel_id)) {
        return view_item._name_class.set("SelectedViewItem");
      } else {
        return view_item._name_class.set("UnselectedViewItem");
      }
    }, this));
    if (!(this.data.visible_tree_items[data.panel_id] != null)) {
      this.data.visible_tree_items.add_attr(data.panel_id, new Lst([view_item]));
      _ref2 = this.data.panel_id_list();
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        id = _ref2[_j];
        if (this.data.visible_tree_items[id].length >= 2) {
          _ref3 = this.data.visible_tree_items[id];
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            tree_item = _ref3[_k];
            if (!(tree_item instanceof ViewItem)) {
              this.data.visible_tree_items[data.panel_id].push(tree_item);
            }
          }
          break;
        }
      }
    } else {
      this.data.visible_tree_items[data.panel_id].push(view_item);
    }
    this.data.selected_canvas_pan.clear();
    this.data.selected_canvas_pan.push(data.panel_id);
    this.data.last_canvas_pan.set(data.panel_id);
    this.undo_manager.snapshot();
    return new CanvasManagerPanelInstance(this.el, this.data, view_item, this.undo_manager);
  };
  TreeApp.prototype._on_key_down = function(evt) {
    var cur_key, m, special_keys, _i, _len, _ref, _ref2, _results;
    if (this.active_key.get()) {
      if ((16 <= (_ref = evt.keyCode) && _ref <= 18)) {
        return;
      }
      cur_key = "";
      if (evt.ctrlKey) {
        cur_key += "Ctrl+";
      }
      if (evt.shiftKey) {
        cur_key += "Shift+";
      }
      if (evt.altKey) {
        cur_key += "Alt+";
      }
      special_keys = {
        8: "BackSpace",
        9: "Tab",
        13: "Enter",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "LeftArrow",
        38: "UpArrow",
        39: "RightArrow",
        40: "DownArrow",
        45: "Insert",
        46: "Del",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock"
      };
      cur_key += special_keys[evt.keyCode] || String.fromCharCode(evt.keyCode).toUpperCase();
      _ref2 = this.data.modules;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        m = _ref2[_i];
        _results.push(this._on_key_down_rec(m.actions, cur_key, evt));
      }
      return _results;
    }
  };
  TreeApp.prototype._on_key_down_rec = function(actions, cur_key, evt) {
    var a, k, _i, _j, _len, _len2, _ref, _ref2;
    for (_i = 0, _len = actions.length; _i < _len; _i++) {
      a = actions[_i];
      if ((a.key != null) && (!(a.ina != null) || !a.ina(this))) {
        _ref = a.key;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          k = _ref[_j];
          if (k === cur_key) {
            if (typeof a.fun === "function") {
              a.fun(evt, this);
            }
            this._cancel_natural_hotkeys(evt);
            return true;
          }
        }
      }
      if (((_ref2 = a.sub) != null ? _ref2.act : void 0) != null) {
        this._on_key_down_rec(a.sub.act, cur_key, evt);
      }
    }
    return false;
  };
  TreeApp.prototype._cancel_natural_hotkeys = function(evt) {
    if (!evt) {
      evt = window.event;
    }
    evt.cancelBubble = true;
    if (typeof evt.stopPropagation === "function") {
      evt.stopPropagation();
    }
    if (typeof evt.preventDefault === "function") {
      evt.preventDefault();
    }
    return false;
  };
  return TreeApp;
})();var EditView;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
EditView = (function() {
  __extends(EditView, View);
  function EditView(div, app_data, undo_manager) {
    this.div = div;
    this.app_data = app_data;
    this.undo_manager = undo_manager;
    EditView.__super__.constructor.call(this, this.app_data);
    this.model_editors = {};
    this.div_icobar = {};
    this.old_divs = [];
  }
  EditView.prototype.onchange = function() {
    var d, e, f, icobar, legend, m, o, path, s, v, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _ref4, _results;
    if (this.app_data.selected_tree_items.has_been_modified) {
      _ref = this.old_divs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        this.div.removeChild(d);
      }
      this.old_divs = [];
      _ref2 = this.app_data.selected_tree_items;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        path = _ref2[_j];
        s = path[path.length - 1];
        o = this.model_editors[s.model_id];
        if (!(o != null)) {
          o = new_dom_element();
          if (!(this.div_icobar[s.model_id] != null)) {
            this.div_icobar[s.model_id] = new_dom_element({
              parentNode: o
            });
            _ref3 = this.app_data._views;
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              v = _ref3[_k];
              if (v instanceof TreeApp) {
                if (s instanceof TreeItem_Computable) {
                  icobar = new IcoBar(this.div_icobar[s.model_id], v, {
                    bnd: true,
                    loc: true
                  });
                } else {
                  icobar = new IcoBar(this.div_icobar[s.model_id], v, {
                    bnd: false,
                    loc: true
                  });
                }
                break;
              }
            }
          }
          e = new_dom_element({
            parentNode: o
          });
          m = new_model_editor({
            el: e,
            model: s,
            undo_manager: this.undo_manager,
            focus: this.app_data.focus
          });
          if (s.information != null) {
            f = new_dom_element({
              nodeName: "fieldset",
              parentNode: e
            });
            legend = new_dom_element({
              nodeName: "legend",
              parentNode: f,
              txt: "Informations"
            });
            d = new_dom_element({
              parentNode: f
            });
            s.bind(function() {
              return s.information(d);
            });
          }
          if (((_ref4 = s.img) != null ? _ref4.information : void 0) != null) {
            f = new_dom_element({
              nodeName: "fieldset",
              parentNode: e
            });
            legend = new_dom_element({
              nodeName: "legend",
              parentNode: f,
              txt: "Informations"
            });
            d = new_dom_element({
              parentNode: f
            });
            s.bind(function() {
              var _ref;
              return (_ref = s.img) != null ? _ref.information(d) : void 0;
            });
          }
          this.model_editors[s.model_id] = o;
        }
        this.div.appendChild(o);
        _results.push(this.old_divs.push(o));
      }
      return _results;
    }
  };
  return EditView;
})();var CanvasManagerPanelInstance;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
CanvasManagerPanelInstance = (function() {
  __extends(CanvasManagerPanelInstance, LayoutManagerPanelInstance);
  function CanvasManagerPanelInstance(el, app_data, view_item, undo_manager) {
    this.app_data = app_data;
    this.view_item = view_item;
    this._launch_context_menu = __bind(this._launch_context_menu, this);;
    this._add_transform_node = __bind(this._add_transform_node, this);;
    CanvasManagerPanelInstance.__super__.constructor.call(this, el);
    this.divCanvas = document.createElement("div");
    this.divCanvas.style.position = "absolute";
    this._manage_is_chown = false;
    this.cm = new CanvasManager({
      el: this.divCanvas,
      cam: this.view_item.cam,
      items: this.app_data.visible_tree_items[this.view_item._panel_id],
      time: this.app_data.time,
      context_menu: __bind(function(evt, show) {
        return this._launch_context_menu(evt, show);
      }, this),
      add_transform: __bind(function(evt, show) {
        return this._add_transform_node(evt);
      }, this),
      theme: this.app_data.selected_display_settings().theme,
      undo_manager: undo_manager,
      allow_gl: true
    });
    this.cm.active_items = __bind(function() {
      var i, res, _ref;
      res = [];
      if (((_ref = this.cm) != null ? _ref.items : void 0) != null) {
        res = (function() {
          var _i, _len, _ref, _results;
          _ref = this.cm.items;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            _results.push(i);
          }
          return _results;
        }).call(this);
      }
      return res;
    }, this);
    this.cm.selected_items = __bind(function() {
      var s, _i, _len, _ref, _results;
      _ref = this.app_data.selected_tree_items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push(s[s.length - 1]);
      }
      return _results;
    }, this);
    this.app_data.selected_tree_items.bind(this.cm);
    this.app_data.focus.set(this.cm.view_id);
    this.cm.select_canvas_fun.push(__bind(function(cm, evt) {
      this.app_data.focus.set(this.cm.view_id);
      if (evt.ctrlKey) {
        this.app_data.selected_canvas_pan.toggle(this.view_item._panel_id);
      } else {
        this.app_data.selected_canvas_pan.set([this.view_item._panel_id]);
      }
      if (this.app_data.selected_canvas_pan.contains(this.view_item._panel_id)) {
        return this.app_data.last_canvas_pan.set(this.view_item._panel_id);
      }
    }, this));
    this.cm.click_fun.push(__bind(function(cm, evt) {}, this));
    this.cm.dblclick_fun.push(__bind(function(cm, evt) {
      return this._add_transform_node(evt);
    }, this));
    bind(this.app_data.selected_canvas_pan, __bind(function() {
      return this._update_borders();
    }, this));
  }
  CanvasManagerPanelInstance.prototype.destructor = function() {
    var _base;
    CanvasManagerPanelInstance.__super__.destructor.call(this);
    if (typeof (_base = this.cm).destructor === "function") {
      _base.destructor();
    }
    delete this.cm;
    return delete this.divManager;
  };
  CanvasManagerPanelInstance.prototype.render = function(info) {
    var h, w;
    this.el.appendChild(this.div);
    this.div.appendChild(this.divCanvas);
    this.p_min = info.p_min;
    this.p_max = info.p_max;
    this._update_borders();
    w = info.p_max[0] - info.p_min[0];
    h = info.p_max[1] - info.p_min[1] - 30;
    this.cm.resize(w, h);
    return this.cm.draw();
  };
  CanvasManagerPanelInstance.prototype._update_borders = function() {
    var module_manage, s;
    s = 1 * this.app_data.selected_canvas_pan.contains(this.view_item._panel_id);
    this.div.style.left = this.p_min[0] - s;
    this.div.style.top = this.p_min[1] - s;
    this.div.style.width = this.p_max[0] - this.p_min[0];
    this.div.style.height = this.p_max[1] - this.p_min[1];
    if (s) {
      this.div.style.borderWidth = 1;
      add_class(this.div, "SelectedCanvas");
    } else {
      this.div.style.borderWidth = 0;
      rem_class(this.div, "SelectedCanvas");
    }
    this.divCanvas.style.left = 0;
    this.divCanvas.style.top = 30;
    this.divCanvas.style.width = this.p_max[0] - this.p_min[0];
    this.divCanvas.style.height = this.p_max[1] - this.p_min[1] - 30;
    module_manage = new TreeAppModule_PanelManagerTop;
    return this._show_actions_module_manage(module_manage.actions, module_manage);
  };
  CanvasManagerPanelInstance.prototype._add_transform_node = function(evt) {
    var m, _i, _len, _ref, _results;
    _ref = this.app_data.modules;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      if (m instanceof TreeAppModule_Transform) {
        _results.push(m.actions[1].fun(evt, this.app_data._views[0]));
      }
    }
    return _results;
  };
  CanvasManagerPanelInstance.prototype._launch_context_menu = function(evt, show) {
    if (show === true) {
      return this._show_context_menu(evt);
    } else {
      return this._delete_context_menu(evt);
    }
  };
  CanvasManagerPanelInstance.prototype._delete_context_menu = function(evt) {
    var menu, parent;
    if (document.getElementById("contextMenu") !== null) {
      menu = document.getElementById("contextMenu");
      parent = document.getElementById("main_window");
      return parent.removeChild(menu);
    }
  };
  CanvasManagerPanelInstance.prototype._find_entity = function(evt) {
    var item, mouse_x, mouse_y, movable_entities, p, phase, point, pos, proj, _i, _j, _len, _len2, _ref, _ref2;
    movable_entities = [];
    _ref = this.cm.active_items();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      mouse_x = evt.clientX - get_left(this.cm.canvas);
      mouse_y = evt.clientY - get_top(this.cm.canvas);
      pos = [mouse_x, mouse_y];
      if (item._closest_point_closer_than != null) {
        proj = (function() {
          var _i, _len, _ref, _results;
          _ref = item.mesh.points;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            _results.push(this.cm.cam_info.re_2_sc.proj(p.pos.get()));
          }
          return _results;
        }).call(this);
        point = item._closest_point_closer_than(proj, pos, 10);
        if (point >= 0) {
          point.type = "Mesh";
          return point;
        }
      }
    }
    for (phase = 0; phase < 2; phase++) {
      _ref2 = this.cm.active_items();
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        item = _ref2[_j];
        if (item.get_movable_entities != null) {
          item.get_movable_entities(movable_entities, this.cm.cam_info, [this.cm.mouse_x, this.cm.mouse_y], phase);
          if (movable_entities.length) {
            return movable_entities;
          }
        }
      }
    }
    return [];
  };
  CanvasManagerPanelInstance.prototype._show_context_menu = function(evt) {
    var movable_entities, parent, point_under;
    if (!(evt != null)) {
      evt = window.event;
    }
    this._delete_context_menu();
    movable_entities = this._find_entity(evt);
    point_under = false;
    if (movable_entities.length > 0) {
      if (movable_entities[0].type === "Transform") {
        point_under = "Transform";
      } else {
        point_under = "Mesh";
      }
    }
    this.modules = this.app_data.modules;
    parent = document.getElementById("main_window");
    this.menu = new_dom_element({
      parentNode: parent,
      id: "contextMenu",
      style: {
        position: "absolute",
        left: evt.clientX - get_left(this.div),
        top: evt.clientY - get_top(this.div)
      }
    });
    if (point_under === "Transform") {
      this._show_actions(TreeAppModule_Transform);
    } else if (point_under === "Mesh") {
      this._show_actions(TreeAppModule_Sketch);
    } else {
      this._show_actions(TreeAppModule_PanelManager);
    }
    return this._show_actions(TreeAppModule_UndoManager);
  };
  CanvasManagerPanelInstance.prototype._show_actions = function(module) {
    var m, _i, _len, _ref, _results;
    _ref = this.modules;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      if (m instanceof module) {
        _results.push(this._show_actions_module_rec(m.actions, module));
      }
    }
    return _results;
  };
  CanvasManagerPanelInstance.prototype._show_actions_module_rec = function(actions, module) {
    var c, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = actions.length; _i < _len; _i++) {
      c = actions[_i];
      if (c.ico != null) {
        _results.push(__bind(function(c) {
          var elem, _ref;
          elem = new_dom_element({
            parentNode: this.menu,
            className: "contextMenuElement",
            onclick: __bind(function(evt) {
              c.fun(evt, this.app_data._views[0]);
              return this._delete_context_menu(evt);
            }, this)
          });
          new_dom_element({
            parentNode: elem,
            nodeName: "img",
            src: c.ico,
            alt: "",
            title: c.txt,
            height: 24,
            style: {
              paddingRight: "2px"
            }
          });
          new_dom_element({
            parentNode: elem,
            nodeName: "span",
            txt: c.txt,
            style: {
              position: "relative",
              top: "-5px"
            }
          });
          if (((_ref = c.sub) != null ? _ref.act : void 0) != null) {
            this._show_actions_module_rec(c.sub.act, module);
            return true;
          }
        }, this)(c));
      }
    }
    return _results;
  };
  CanvasManagerPanelInstance.prototype._show_actions_module_manage = function(actions, module) {
    var c, index_left, _i, _len;
    if (!this._manage_is_chown) {
      index_left = 0;
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        c = actions[_i];
        if (c.ico != null) {
          __bind(function(c) {
            var elem, _ref;
            elem = new_dom_element({
              parentNode: this.div,
              style: {
                paddingRight: "4px",
                paddingTop: "2px",
                background: "#262626",
                width: 30,
                height: 30,
                cssFloat: "right"
              },
              onclick: __bind(function(evt) {
                var fun, _i, _len, _ref;
                _ref = this.cm.select_canvas_fun;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  fun = _ref[_i];
                  fun(this.cm, evt);
                }
                return c.fun(evt, this.app_data._views[0]);
              }, this)
            });
            index_left += 1;
            new_dom_element({
              parentNode: elem,
              nodeName: "img",
              src: c.ico,
              alt: "",
              title: c.txt,
              height: 22,
              style: {
                marginTop: "2px",
                paddingRight: "4px",
                float: "left"
              }
            });
            if (((_ref = c.sub) != null ? _ref.act : void 0) != null) {
              this._show_actions_module_manage(c.sub.act, module);
              return true;
            }
          }, this)(c);
        }
      }
    }
    return this._manage_is_chown = true;
  };
  return CanvasManagerPanelInstance;
})();