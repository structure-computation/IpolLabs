var VisuInterfaceGroupItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

VisuInterfaceGroupItem = (function(_super) {

  __extends(VisuInterfaceGroupItem, _super);

  function VisuInterfaceGroupItem(name) {
    var _this = this;
    if (name == null) name = "Visu_inter_group";
    VisuInterfaceGroupItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_link_filters: 1,
      _info_ok: parseInt(0),
      _incr_id_group_inter: 0
    });
    this.add_attr({
      nb_link_filters: this._nb_link_filters
    });
    this.add_context_actions({
      txt: "add link filter",
      ico: "data:image/png;base64,",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_link_filters.set(item._nb_link_filters.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove link filter",
      ico: "data:image/png;base64,",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_link_filters.get() > 0) {
            _results.push(item._nb_link_filters.set(item._nb_link_filters.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_link_filters.has_been_modified()) {
        return _this.change_collection();
      }
    });
  }

  VisuInterfaceGroupItem.prototype.accept_child = function(ch) {};

  VisuInterfaceGroupItem.prototype.z_index = function() {};

  VisuInterfaceGroupItem.prototype.sub_canvas_items = function() {
    return [];
  };

  VisuInterfaceGroupItem.prototype.set_filter_interface = function(interface_filter) {
    if ((this._parents[0] != null) && (this._parents[0]._parents[0] != null)) {
      return this._parents[0]._parents[0].set_filter_interface(interface_filter, -1);
    }
  };

  VisuInterfaceGroupItem.prototype.ask_for_id_group = function() {
    var id_group;
    id_group = parseInt(this._incr_id_group_inter);
    this._incr_id_group_inter.set(parseInt(this._incr_id_group_inter) + 1);
    return id_group;
  };

  VisuInterfaceGroupItem.prototype.change_collection = function() {
    var id_group, name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._nb_link_filters) {
      size_splice = this._children.length - this._nb_link_filters;
      return this._children.splice(this._nb_link_filters, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._nb_link_filters; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        id_group = this.ask_for_id_group();
        name_temp = "Inter_Group_" + id_group.toString();
        _results.push(this.add_child(new ScillsInterFilterItem(name_temp, id_group)));
      }
      return _results;
    }
  };

  return VisuInterfaceGroupItem;

})(TreeItem);
var Scult3DItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Scult3DItem = (function(_super) {

  __extends(Scult3DItem, _super);

  function Scult3DItem(name) {
    if (name == null) name = "Scult_3D";
    Scult3DItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_attr({
      run_type: new Choice(0, ["load unv", "visualize group"]),
      hdf_output_name: "output3D",
      _model_id: SC_MODEL_ID
    });
    this.add_output(new ScillsAssemblyItem);
    this.add_output(new VisuPartGroupItem);
    this.add_output(new VisuInterfaceGroupItem);
  }

  Scult3DItem.prototype.accept_child = function(ch) {
    return ch instanceof FileItem || ch instanceof MeshItem;
  };

  Scult3DItem.prototype.sub_canvas_items = function() {
    return [];
  };

  Scult3DItem.prototype.set_filter_part = function(part_filter, mat_id) {
    if (this._output[0] != null) {
      this._output[0].filter_part(part_filter, mat_id);
      return this._output[0].clear_material_id();
    }
  };

  Scult3DItem.prototype.set_filter_interface = function(interface_filter, link_id) {
    if (this._output[0] != null) {
      this._output[0].filter_interface(interface_filter, link_id);
      return this._output[0].clear_link_id();
    }
  };

  Scult3DItem.prototype.set_filter_edge = function(edge_filter, edge_id) {
    if (this._output[0] != null) {
      this._output[0].filter_edge(edge_filter, edge_id);
      return this._output[0].clear_edge_id();
    }
  };

  return Scult3DItem;

})(TreeItem_Computable);
var VisuPartGroupItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

VisuPartGroupItem = (function(_super) {

  __extends(VisuPartGroupItem, _super);

  function VisuPartGroupItem(name) {
    var _this = this;
    if (name == null) name = "Visu_part_group";
    VisuPartGroupItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_part_filters: 1,
      _info_ok: parseInt(0),
      _incr_id_group_part: 0
    });
    this.add_attr({
      nb_part_filters: this._nb_part_filters
    });
    this.add_context_actions({
      txt: "add part filter",
      ico: "data:image/png;base64,",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_part_filters.set(item._nb_part_filters.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove part filter",
      ico: "data:image/png;base64,",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_part_filters.get() > 0) {
            _results.push(item._nb_part_filters.set(item._nb_part_filters.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_part_filters.has_been_modified()) {
        return _this.change_collection();
      }
    });
  }

  VisuPartGroupItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartFilterItem;
  };

  VisuPartGroupItem.prototype.z_index = function() {};

  VisuPartGroupItem.prototype.sub_canvas_items = function() {
    return [];
  };

  VisuPartGroupItem.prototype.set_filter_part = function(part_filter) {
    if ((this._parents[0] != null) && (this._parents[0]._parents[0] != null)) {
      return this._parents[0]._parents[0].set_filter_part(part_filter, -1);
    }
  };

  VisuPartGroupItem.prototype.ask_for_id_group = function() {
    var id_group;
    id_group = parseInt(this._incr_id_group_part);
    this._incr_id_group_part.set(parseInt(this._incr_id_group_part) + 1);
    return id_group;
  };

  VisuPartGroupItem.prototype.change_collection = function() {
    var id_group, name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._nb_part_filters) {
      size_splice = this._children.length - this._nb_part_filters;
      return this._children.splice(this._nb_part_filters, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._nb_part_filters; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        id_group = this.ask_for_id_group();
        name_temp = "Part_Group_" + id_group.toString();
        _results.push(this.add_child(new ScillsPartFilterItem(name_temp, id_group)));
      }
      return _results;
    }
  };

  return VisuPartGroupItem;

})(TreeItem);
