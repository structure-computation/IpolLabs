var ScillsAssemblyItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsAssemblyItem = (function(_super) {

  __extends(ScillsAssemblyItem, _super);

  function ScillsAssemblyItem(name) {
    if (name == null) name = "Assembly";
    ScillsAssemblyItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
    this.add_child(new ScillsPartSetItem);
    this.add_child(new ScillsInterfaceSetItem);
    this.add_child(new ScillsEdgeSetItem);
    this.add_attr({
      nb_parts: 0,
      nb_interfaces: 0,
      nb_edges: 0,
      compute_parts: true,
      compute_interfaces: true,
      compute_edges: false,
      _path: new Path,
      _path_loaded: false
    });
  }

  ScillsAssemblyItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartSetItem || ch instanceof ScillsInterfaceSetItem || ch instanceof ScillsEdgeSetItem;
  };

  ScillsAssemblyItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsAssemblyItem.prototype.filter_part = function(part_filter, mat_id) {
    if (this._children[0] != null) {
      return this._children[0].filter_part(part_filter, mat_id);
    }
  };

  ScillsAssemblyItem.prototype.clear_material_id = function() {
    if (this._children[0] != null) return this._children[0].clear_material_id();
  };

  ScillsAssemblyItem.prototype.filter_interface = function(inter_filter, link_id) {
    if (this._children[1] != null) {
      return this._children[1].filter_interface(inter_filter, link_id, this._children[0]);
    }
  };

  ScillsAssemblyItem.prototype.clear_link_id = function() {
    if (this._children[1] != null) return this._children[1].clear_link_id();
  };

  return ScillsAssemblyItem;

})(TreeItem);
var ParametricParamItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ParametricParamItem = (function() {
  __extends(ParametricParamItem, TreeItem);
  function ParametricParamItem(name) {
    if (name == null) {
      name = "Parametric";
    }
    ParametricParamItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      type: new Choice(0, ["off", "function"]),
      nb_resolutions: 0,
      nb_paramaters: 0,
      _incr_id_param: 1
    });
    this.bind(__bind(function() {
      if (this.type.has_been_modified() || this.nb_paramaters.has_been_modified()) {
        return this.change_parameters();
      }
    }, this));
  }
  ParametricParamItem.prototype.accept_child = function(ch) {};
  ParametricParamItem.prototype.z_index = function() {};
  ParametricParamItem.prototype.sub_canvas_items = function() {
    return [];
  };
  ParametricParamItem.prototype.ask_for_id_param = function() {
    var id_param;
    id_param = parseInt(this._incr_id_param);
    this._incr_id_param.set(parseInt(this._incr_id_param) + 1);
    return id_param;
  };
  ParametricParamItem.prototype.change_parameters = function() {
    var id_param, name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    if (this.type.toString() === "off") {
      this.nb_resolutions.set(0);
      this.nb_paramaters.set(0);
    }
    size_splice = 0;
    if (this._children.length > this.nb_paramaters) {
      size_splice = this._children.length - this.nb_paramaters;
      return this._children.splice(this.nb_paramaters, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this.nb_paramaters; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        id_param = this.ask_for_id_param();
        name_temp = "PM_" + id_param.toString();
        _results.push(this.add_child(new Basic1DFunctionItem(name_temp, id_param, "n", 0, this.nb_resolutions)));
      }
      return _results;
    }
  };
  return ParametricParamItem;
})();var TemporalParameterItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TemporalParameterItem = (function(_super) {

  __extends(TemporalParameterItem, _super);

  function TemporalParameterItem(name_param, id_param) {
    var _this = this;
    if (name_param == null) name_param = "Temporal parameter";
    if (id_param == null) id_param = -1;
    TemporalParameterItem.__super__.constructor.call(this);
    this._name.set(name_param);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      name: name_param,
      id: id_param
    });
    this.bind(function() {
      if (_this.name.has_been_modified()) return _this._name.set(_this.name.get());
    });
  }

  TemporalParameterItem.prototype.accept_child = function(ch) {
    return ch instanceof Basic1DFunctionItem;
  };

  TemporalParameterItem.prototype.z_index = function() {};

  TemporalParameterItem.prototype.sub_canvas_items = function() {
    return [];
  };

  return TemporalParameterItem;

})(TreeItem);
var ComputationParametersItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ComputationParametersItem = (function(_super) {

  __extends(ComputationParametersItem, _super);

  function ComputationParametersItem(name) {
    if (name == null) name = "ComputationParameters";
    ComputationParametersItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_child(new LatinParamItem);
    this.add_child(new TimeParamItem);
    this.add_child(new ParametricDataItem);
  }

  return ComputationParametersItem;

})(TreeItem);
var ScillsEdgeSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsEdgeSetItem = (function() {
  __extends(ScillsEdgeSetItem, TreeItem);
  function ScillsEdgeSetItem(app_data, panel_id) {
    this.app_data = app_data;
    this.panel_id = panel_id;
    ScillsEdgeSetItem.__super__.constructor.call(this);
    this._name.set("Edge collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      edge_collection: new Lst
    });
    this.add_attr({
      _edge_profile: new ScillsEdgeItem
    });
  }
  ScillsEdgeSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsEdgeItem;
  };
  ScillsEdgeSetItem.prototype.z_index = function() {
    return [];
  };
  ScillsEdgeSetItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return ScillsEdgeSetItem;
})();var VariableParameterSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
VariableParameterSetItem = (function() {
  __extends(VariableParameterSetItem, TreeItem);
  function VariableParameterSetItem(app_data, panel_id) {
    this.app_data = app_data;
    this.panel_id = panel_id;
    VariableParameterSetItem.__super__.constructor.call(this);
    this._name.set("Variable parameter collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_child(new VariableParameterItem);
    this.add_child(new VariableParameterItem);
    this.add_attr({
      variable_parameter_collection: new Lst
    });
  }
  VariableParameterSetItem.prototype.accept_child = function(ch) {
    return ch instanceof VariableParameterItem;
  };
  VariableParameterSetItem.prototype.z_index = function() {};
  VariableParameterSetItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return VariableParameterSetItem;
})();var LinkSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LinkSetItem = (function(_super) {

  __extends(LinkSetItem, _super);

  function LinkSetItem() {
    var _this = this;
    LinkSetItem.__super__.constructor.call(this);
    this._name.set("Link collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_links: 0,
      _incr_id_link: 0,
      _incr_id_group_inter: 0
    });
    this.add_attr({
      nb_links: this._nb_links
    });
    this.add_context_actions({
      txt: "add link",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_links.set(item._nb_links.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove link",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_links.get() > 0) {
            _results.push(item._nb_links.set(item._nb_links.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_links.has_been_modified()) return _this.change_collection();
    });
  }

  LinkSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsLinkItem;
  };

  LinkSetItem.prototype.z_index = function() {};

  LinkSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  LinkSetItem.prototype.ask_for_id_group = function() {
    var id_group;
    id_group = parseInt(this._incr_id_group_inter);
    this._incr_id_group_inter.set(parseInt(this._incr_id_group_inter) + 1);
    return id_group;
  };

  LinkSetItem.prototype.ask_for_id_link = function() {
    var id_link;
    id_link = parseInt(this._incr_id_link);
    this._incr_id_link.set(parseInt(this._incr_id_link) + 1);
    return id_link;
  };

  LinkSetItem.prototype.change_collection = function() {
    var id_link, name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._nb_links) {
      size_splice = this._children.length - this._nb_links;
      return this._children.splice(this._nb_links, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._nb_links; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        id_link = this.ask_for_id_link();
        name_temp = "Link_" + id_link.toString();
        _results.push(this.add_child(new ScillsLinkItem(name_temp, id_link)));
      }
      return _results;
    }
  };

  LinkSetItem.prototype.set_filter_interface = function(interface_filter, link_id) {
    this._parents[0]._parents[0].set_filter_interface(interface_filter, link_id);
    return this.assign_interfaces_to_links();
  };

  LinkSetItem.prototype.assign_interfaces_to_links = function() {
    var inter, inter_filter, link, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      link = _ref[_i];
      _results.push((function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = link._children;
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          inter_filter = _ref2[_j];
          _results2.push((function() {
            var _k, _len3, _ref3, _results3;
            _ref3 = inter_filter._children;
            _results3 = [];
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              inter = _ref3[_k];
              if (parseInt(inter.link_id) === -1) {
                _results3.push(inter.link_id.set(link._id));
              } else {
                _results3.push(void 0);
              }
            }
            return _results3;
          })());
        }
        return _results2;
      })());
    }
    return _results;
  };

  return LinkSetItem;

})(TreeItem);
var ScillsInterFilterItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsInterFilterItem = (function(_super) {

  __extends(ScillsInterFilterItem, _super);

  function ScillsInterFilterItem(name_group, id_group) {
    var _this = this;
    if (name_group == null) name_group = "interface_filter";
    if (id_group == null) id_group = 0;
    ScillsInterFilterItem.__super__.constructor.call(this);
    this._name.set(name_group);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      name: this._name,
      type: new Choice(0, ["by id", "between materials", "between groups"]),
      filter: "",
      _id: id_group,
      _info_ok: parseInt(0)
    });
    this.bind(function() {
      if (_this.type.has_been_modified() || _this.filter.has_been_modified()) {
        return _this.set_filter_interface();
      }
    });
  }

  ScillsInterFilterItem.prototype.set_filter_interface = function() {
    return this._parents[0]._parents[0].set_filter_interface(this);
  };

  ScillsInterFilterItem.prototype.cosmetic_attribute = function(name) {
    return ScillsInterFilterItem.__super__.cosmetic_attribute.call(this, name) || (name === "filter");
  };

  ScillsInterFilterItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsInterfaceItem;
  };

  ScillsInterFilterItem.prototype.z_index = function() {};

  ScillsInterFilterItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsInterFilterItem.prototype.information = function(div) {
    if (this._info_ok < 2) {
      this.txt = new_dom_element({
        parentNode: div
      });
      this.txt.innerHTML = "                  id : " + this._id + " <br>              ";
      return this._info_ok.set(parseInt(this._info_ok) + 1);
    }
  };

  return ScillsInterFilterItem;

})(TreeItem);
var MaterialSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MaterialSetItem = (function(_super) {

  __extends(MaterialSetItem, _super);

  function MaterialSetItem(dim) {
    var _this = this;
    if (dim == null) dim = 3;
    MaterialSetItem.__super__.constructor.call(this);
    this._name.set("Material collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_materials: 0,
      _incr_id_material: 0,
      _incr_id_group_part: 0,
      _dim: dim
    });
    this.add_attr({
      nb_materials: this._nb_materials
    });
    this.add_context_actions({
      txt: "add material",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_materials.set(item._nb_materials.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove material",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_materials.get() > 0) {
            _results.push(item._nb_materials.set(item._nb_materials.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_materials.has_been_modified()) {
        return _this.change_collection();
      }
    });
  }

  MaterialSetItem.prototype.accept_child = function(ch) {
    return false;
  };

  MaterialSetItem.prototype.z_index = function() {};

  MaterialSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  MaterialSetItem.prototype.ask_for_id_group = function() {
    var id_group;
    id_group = parseInt(this._incr_id_group_part);
    this._incr_id_group_part.set(parseInt(this._incr_id_group_part) + 1);
    return id_group;
  };

  MaterialSetItem.prototype.ask_for_id_mat = function() {
    var id_mat;
    id_mat = parseInt(this._incr_id_material);
    this._incr_id_material.set(parseInt(this._incr_id_material) + 1);
    return id_mat;
  };

  MaterialSetItem.prototype.change_collection = function() {
    var id_mat, name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._nb_materials) {
      size_splice = this._children.length - this._nb_materials;
      return this._children.splice(this._nb_materials, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._nb_materials; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        id_mat = this.ask_for_id_mat();
        name_temp = "Mat_" + id_mat.toString();
        _results.push(this.add_child(new ScillsMaterialItem(name_temp, id_mat, this._dim)));
      }
      return _results;
    }
  };

  MaterialSetItem.prototype.set_filter_part = function(part_filter, mat_id) {
    this._parents[0]._parents[0].set_filter_part(part_filter, mat_id);
    return this.assign_parts_to_materials();
  };

  MaterialSetItem.prototype.assign_parts_to_materials = function() {
    var mat, part, part_filter, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      mat = _ref[_i];
      _results.push((function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = mat._children;
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          part_filter = _ref2[_j];
          _results2.push((function() {
            var _k, _len3, _ref3, _results3;
            _ref3 = part_filter._children;
            _results3 = [];
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              part = _ref3[_k];
              if (parseInt(part.material_id) === -1) part.material_id.set(mat._id);
              if (parseInt(part.group_id) === -1) {
                _results3.push(part.group_id.set(part_filter._id));
              } else {
                _results3.push(void 0);
              }
            }
            return _results3;
          })());
        }
        return _results2;
      })());
    }
    return _results;
  };

  return MaterialSetItem;

})(TreeItem);
var BoundaryConditionItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

BoundaryConditionItem = (function(_super) {

  __extends(BoundaryConditionItem, _super);

  function BoundaryConditionItem(name, id_bc, dim) {
    var cinetic_bc, displacement_bc, normal_displacement_bc, normal_speed_bc, normal_stress_density_bc, speed_bc, stress_density_bc, symetry_bc,
      _this = this;
    if (name == null) name = "Boundary_condition";
    if (id_bc == null) id_bc = 0;
    if (dim == null) dim = 3;
    BoundaryConditionItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_edge_filters: 1,
      name: this._name,
      _id: id_bc,
      _info_ok: parseInt(0),
      _dim: dim
    });
    this.add_attr({
      type: new Choice
    });
    displacement_bc = new DisplacementBC(this._dim);
    normal_displacement_bc = new NormalDisplacementBC;
    symetry_bc = new SymetrytBC;
    speed_bc = new SpeedBC(this._dim);
    normal_speed_bc = new NormalSpeedBC;
    stress_density_bc = new StressDensityBC(this._dim);
    normal_stress_density_bc = new NormalStressDensityBC;
    cinetic_bc = new CineticBC(this._dim);
    this.type.lst.push(displacement_bc);
    this.type.lst.push(normal_displacement_bc);
    this.type.lst.push(symetry_bc);
    this.type.lst.push(speed_bc);
    this.type.lst.push(normal_speed_bc);
    this.type.lst.push(stress_density_bc);
    this.type.lst.push(normal_stress_density_bc);
    this.type.lst.push(cinetic_bc);
    this.add_context_actions({
      txt: "add edge filter",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_edge_filters.set(item._nb_edge_filters.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove edge filter",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_edge_filters.get() > 0) {
            _results.push(item._nb_edge_filters.set(item._nb_edge_filters.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_edge_filters.has_been_modified()) {
        return _this.change_collection();
      }
    });
  }

  BoundaryConditionItem.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["type"] = ModelEditorItem_ChoiceWithEditableItems;
  };

  BoundaryConditionItem.prototype.accept_child = function(ch) {};

  BoundaryConditionItem.prototype.z_index = function() {};

  BoundaryConditionItem.prototype.sub_canvas_items = function() {
    return [];
  };

  BoundaryConditionItem.prototype.set_filter_edge = function(edge_filter) {
    return this._parents[0]._parents[0].set_filter_edge(edge_filter, this._id);
  };

  BoundaryConditionItem.prototype.ask_for_id_group = function() {
    return this._parents[0]._parents[0].ask_for_id_group();
  };

  BoundaryConditionItem.prototype.change_collection = function() {
    var id_group, name_temp, num_c, size_child0_child, size_splice, _ref, _ref2, _ref3, _results;
    size_splice = 0;
    if (this._children.length > this._nb_edge_filters) {
      size_splice = this._children.length - this._nb_edge_filters;
      for (num_c = _ref = this._nb_edge_filters, _ref2 = this._children.length; _ref <= _ref2 ? num_c < _ref2 : num_c > _ref2; _ref <= _ref2 ? num_c++ : num_c--) {
        this._children[num_c].clear();
      }
      return this._children.splice(this._nb_edge_filters, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref3 = this._nb_edge_filters; size_child0_child <= _ref3 ? num_c < _ref3 : num_c > _ref3; size_child0_child <= _ref3 ? num_c++ : num_c--) {
        id_group = this.ask_for_id_group();
        name_temp = "Edge_Group_" + id_group.toString();
        _results.push(this.add_child(new ScillsEdgeFilterItem(name_temp, id_group)));
      }
      return _results;
    }
  };

  BoundaryConditionItem.prototype.clear = function() {
    return this._nb_edge_filters.set(0);
  };

  BoundaryConditionItem.prototype.information = function(div) {
    if (this._info_ok < 2) {
      this.txt = new_dom_element({
        parentNode: div
      });
      this.txt.innerHTML = "                  id : " + this._id + " <br>              ";
      return this._info_ok.set(parseInt(this._info_ok) + 1);
    }
  };

  return BoundaryConditionItem;

})(TreeItem);
var Scills3DItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Scills3DItem = (function(_super) {

  __extends(Scills3DItem, _super);

  function Scills3DItem(name) {
    var _this = this;
    if (name == null) name = "Scills3D";
    Scills3DItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_attr({
      run_type: new Choice(0, ["compute", "check edge", "check geometry"]),
      nb_proc: 1,
      estimated_time: 0,
      nb_tokens: 0,
      _dim: 3,
      path_result: " ",
      _path: new Path,
      _path_zip: new Path
    });
    this.add_output(new FieldSetSetItem("Part field collection"));
    this.add_child(new ScillsStructureItem);
    this.add_child(new ComputationParametersItem);
    this.add_child(new MaterialSetItem(this._dim));
    this.add_child(new LinkSetItem);
    this.add_child(new BoundaryConditionSetItem(this._dim));
    this.add_child(new ThermalLoadItem);
    this.add_child(new VolumicForceSetItem(this._dim));
    this.add_context_actions({
      txt: "load result",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        return _this.download_result();
      }
    });
    this.bind(function() {
      var part, size_parts, _i, _len, _ref, _ref2, _ref3;
      if ((_ref = _this._children[0]) != null ? _ref.has_been_modified() : void 0) {
        if (((_ref2 = _this._children[0]) != null ? _ref2._children[0] : void 0) != null) {
          size_parts = 0;
          _ref3 = _this._children[0]._children[0]._children[0]._children;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            part = _ref3[_i];
            size_parts += 1;
          }
          return _this._output[0]._collection_size.set(size_parts);
        }
      }
    });
  }

  Scills3DItem.prototype.accept_child = function(ch) {
    return false;
  };

  Scills3DItem.prototype.set_filter_part = function(part_filter, mat_id) {
    return this._children[0].set_filter_part(part_filter, mat_id);
  };

  Scills3DItem.prototype.set_filter_interface = function(interface_filter, link_id) {
    return this._children[0].set_filter_interface(interface_filter, link_id);
  };

  Scills3DItem.prototype.download_result = function() {
    var myWindow;
    myWindow = window.open('', '');
    myWindow.document.write("<a href='/sceen/_?u=" + this._path._server_id + "'> Right click to save as </a>");
    return myWindow.focus();
  };

  return Scills3DItem;

})(TreeItem_Computable);
var TemporalStepSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TemporalStepSetItem = (function() {
  __extends(TemporalStepSetItem, TreeItem);
  function TemporalStepSetItem() {
    TemporalStepSetItem.__super__.constructor.call(this);
    this._name.set("Temporal step collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
  }
  TemporalStepSetItem.prototype.change_step_bounds = function() {
    var bound, initial_time, nb_steps, num_step, time_step, _ref, _results;
    bound = 0;
    _results = [];
    for (num_step = 0, _ref = this._children.length; 0 <= _ref ? num_step < _ref : num_step > _ref; 0 <= _ref ? num_step++ : num_step--) {
      this._children[num_step].initial_time.set(bound);
      initial_time = this._children[num_step].initial_time;
      time_step = this._children[num_step].time_step;
      nb_steps = this._children[num_step].nb_steps;
      bound = initial_time.get() + time_step.get() * nb_steps.get();
      _results.push(this._children[num_step].final_time.set(bound));
    }
    return _results;
  };
  TemporalStepSetItem.prototype.accept_child = function(ch) {
    return ch instanceof TemporalStepItem;
  };
  TemporalStepSetItem.prototype.z_index = function() {};
  TemporalStepSetItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return TemporalStepSetItem;
})();var Scills2DItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Scills2DItem = (function(_super) {

  __extends(Scills2DItem, _super);

  function Scills2DItem(name) {
    var _this = this;
    if (name == null) name = "Scills2D";
    Scills2DItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_attr({
      run_type: new Choice(0, ["compute", "check edge", "check geometry"]),
      nb_proc: 1,
      estimated_time: 0,
      nb_tokens: 0,
      _dim: 2,
      path_result: " ",
      _path: new Path,
      _path_zip: new Path
    });
    this.add_output(new FieldSetSetItem);
    this.add_child(new ScillsStructureItem);
    this.add_child(new ComputationParametersItem);
    this.add_child(new MaterialSetItem(this._dim));
    this.add_child(new LinkSetItem);
    this.add_child(new BoundaryConditionSetItem(this._dim));
    this.add_child(new ThermalLoadItem);
    this.add_child(new VolumicForceSetItem(this._dim));
    this.add_context_actions({
      txt: "load result",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        return _this.download_result();
      }
    });
    this.bind(function() {
      var part, size_c, _i, _len, _ref, _ref2, _ref3;
      if ((_ref = _this._children[0]) != null ? _ref.has_been_modified() : void 0) {
        if (((_ref2 = _this._children[0]) != null ? _ref2._children[0] : void 0) != null) {
          size_c = 0;
          _ref3 = _this._children[0]._children[0]._children[0]._children;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            part = _ref3[_i];
            size_c += 1;
          }
          return _this._output[0]._collection_size.set(size_c);
        }
      }
    });
  }

  Scills2DItem.prototype.accept_child = function(ch) {
    return false;
  };

  Scills2DItem.prototype.set_filter_part = function(part_filter, mat_id) {
    return this._children[0].set_filter_part(part_filter, mat_id);
  };

  Scills2DItem.prototype.set_filter_interface = function(interface_filter, link_id) {
    return this._children[0].set_filter_interface(interface_filter, link_id);
  };

  Scills2DItem.prototype.download_result = function() {
    var myWindow;
    myWindow = window.open('', '');
    myWindow.document.write("<a href='/sceen/_?u=" + this._path_zip._server_id + "'> Right click to save as </a>");
    return myWindow.focus();
  };

  return Scills2DItem;

})(TreeItem_Computable);
var ScillsInterfaceItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsInterfaceItem = (function(_super) {

  __extends(ScillsInterfaceItem, _super);

  function ScillsInterfaceItem(name) {
    if (name == null) name = "Interface";
    ScillsInterfaceItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
    this.add_attr({
      _mesh: new Mesh({
        not_editable: true
      }),
      name: this._name
    });
    this.add_attr({
      visualization: this._mesh.visualization,
      id: -1,
      link_id: -1,
      group_id: -1
    });
  }

  ScillsInterfaceItem.prototype.accept_child = function(ch) {};

  ScillsInterfaceItem.prototype.z_index = function() {
    return this._mesh.z_index();
  };

  ScillsInterfaceItem.prototype.sub_canvas_items = function() {
    return [this._mesh];
  };

  return ScillsInterfaceItem;

})(TreeItem);
var ScillsEdgeFilterItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsEdgeFilterItem = (function(_super) {

  __extends(ScillsEdgeFilterItem, _super);

  function ScillsEdgeFilterItem(name, id_group, dim) {
    var in_box_filter, in_cylinder_filter, in_sphere_filter, on_cylinder_filter, on_disc_filter, on_plan_filter, on_sphere_filter, parametrized_filter, undefined_filter;
    if (name == null) name = "edge_filter";
    if (id_group == null) id_group = 0;
    if (dim == null) dim = 3;
    ScillsEdgeFilterItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _id: id_group,
      _dim: dim,
      type: new Choice
    });
    undefined_filter = new UndefinedEdgeFilter;
    parametrized_filter = new ParametrizedEdgeFilter;
    in_box_filter = new InBoxEdgeFilter(this._dim);
    in_cylinder_filter = new InCylinderEdgeFilter(this._dim);
    in_sphere_filter = new InSphereEdgeFilter(this._dim);
    on_plan_filter = new OnPlanEdgeFilter(this._dim);
    on_disc_filter = new OnDiscEdgeFilter(this._dim);
    on_cylinder_filter = new OnCylinderEdgeFilter(this._dim);
    on_sphere_filter = new OnSphereEdgeFilter(this._dim);
    this.type.lst.push(undefined_filter);
    this.type.lst.push(parametrized_filter);
    this.type.lst.push(in_box_filter);
    this.type.lst.push(in_cylinder_filter);
    this.type.lst.push(in_sphere_filter);
    this.type.lst.push(on_plan_filter);
    this.type.lst.push(on_disc_filter);
    this.type.lst.push(on_cylinder_filter);
    this.type.lst.push(on_sphere_filter);
  }

  ScillsEdgeFilterItem.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["type"] = ModelEditorItem_ChoiceWithEditableItems;
  };

  ScillsEdgeFilterItem.prototype.cosmetic_attribute = function(name) {
    return ScillsEdgeFilterItem.__super__.cosmetic_attribute.call(this, name) || (name === "filter");
  };

  ScillsEdgeFilterItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsEdgeItem;
  };

  ScillsEdgeFilterItem.prototype.z_index = function() {};

  ScillsEdgeFilterItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsEdgeFilterItem.prototype.clear = function() {
    var ch, _i, _len, _ref;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ch = _ref[_i];
      ch.clear();
    }
    return this._children.clear();
  };

  return ScillsEdgeFilterItem;

})(TreeItem);
var VolumicForceSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

VolumicForceSetItem = (function(_super) {

  __extends(VolumicForceSetItem, _super);

  function VolumicForceSetItem(dim) {
    var _this = this;
    if (dim == null) dim = 3;
    VolumicForceSetItem.__super__.constructor.call(this);
    this._name.set("VolumicForce collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_loads: 0,
      _dim: dim
    });
    this.add_attr({
      nb_loads: this._nb_loads
    });
    this.add_context_actions({
      txt: "add force",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          _results.push(item._nb_loads.set(item._nb_loads.get() + 1));
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "remove force",
      ico: "data:image/png;base64,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",
      fun: function(evt, app) {
        var item, items, path_item, _i, _len, _results;
        items = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          path_item = items[_i];
          item = path_item[path_item.length - 1];
          if (item._nb_loads.get() > 0) {
            _results.push(item._nb_loads.set(item._nb_loads.get() - 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this._nb_loads.has_been_modified()) return _this.change_parameters();
    });
  }

  VolumicForceSetItem.prototype.accept_child = function(ch) {
    return ch instanceof VolumicForceItem;
  };

  VolumicForceSetItem.prototype.change_parameters = function() {
    var name_temp, num_c, size_child0_child, size_splice, _ref, _results;
    size_splice = 0;
    if (this._children.length > this._nb_loads) {
      size_splice = this._children.length - this._nb_loads;
      return this._children.splice(this._nb_loads, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref = this._nb_loads; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        name_temp = "F_" + num_c.toString();
        _results.push(this.add_child(new VolumicForceItem(name_temp, this._dim)));
      }
      return _results;
    }
  };

  return VolumicForceSetItem;

})(TreeItem);
var ThermalLoadItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ThermalLoadItem = (function() {
  __extends(ThermalLoadItem, TreeItem);
  function ThermalLoadItem(name) {
    if (name == null) {
      name = "ThermalLoad";
    }
    ThermalLoadItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      name: "name",
      thermal_function: "0"
    });
  }
  ThermalLoadItem.prototype.accept_child = function(ch) {
    return false;
  };
  return ThermalLoadItem;
})();var ParametricDataItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ParametricDataItem = (function(_super) {

  __extends(ParametricDataItem, _super);

  function ParametricDataItem(name) {
    var _this = this;
    if (name == null) name = "Parametric data";
    ParametricDataItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_attr({
      type: new Choice(0, ["off", "sequential"]),
      nb_resolutions: new ConstrainedVal(0),
      nb_parameters: 0,
      _incr_id_param: 1,
      _old_children: [],
      _max_resolutions: 600
    });
    this.add_context_actions({
      txt: "Add List",
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CGg4lDbvMwJoAACAASURBVHgBAECAv38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWQ7vXwAAIABJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAABQAAAAsAAAAGAAAAAQAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAPkAAAD1AAAA+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAALAAAAAwAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAP4AAAD3AAAA9gAAAP4AAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAADwAAAC4AAAAcAAAAAgAAAPsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAOYAAADSAAAA6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAB8AAAArAAAADgAAAPwAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAAAPcAAADZAAAA1QAAAPoAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAEgAAADsAAAA2AAAAAgAAAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAM8AAADmAAAA6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAACMAAABKAAAAGwAAAPgAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAACgAAAO8AAAC1AAAA2wAAAPoAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAADgAAADAAAABGAAAAAgAAAPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAEAAAC5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAB4AAAA9AAAAJQAAAPYAAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADQAAAOkAAADZAAAABQAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABwAAABYAAAAGAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAcAAAAAAAAAAoAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcAAAARAAAAAgAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAA/gAAAPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAA/gAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPoAAAD7AAAA/wAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPoAAADzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAO0AAADsAAAA+gAAAAMAAAAAAAAAAAAAAAAAAAALAAAAAAAAANwAAAD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAOsAAADUAAAAIQAAAPcAAAD6AAAAAAAAAAAAAAD+AAAAAAAAAAsAAAAWAAAADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAANsAAADJAAAA8AAAAAcAAAACAAAAAAAAAAAAAAAHAAAAAAAAANkAAADtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAN4AAAC6AAAAFQAAAPsAAAD8AAAAAAAAAAAAAAD6AAAA/wAAAB8AAAA9AAAADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAANoAAAC2AAAA5gAAAAoAAAAEAAAAAAAAAAAAAAADAAAAAAAAAPAAAADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAN4AAAD4AAAACQAAAP4AAAD+AAAAAAAAAAAAAAD3AAAA/QAAADQAAAAlAAAAIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAOUAAADMAAAA8AAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAOcAAADoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAgAAADwAAAAAAAAAAAAAAAAAAAAAAD6mcfNAAAgAElEQVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPcAAADwAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPEAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL1oIzEAACAASURBVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt7m8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASUdE/7a4uwW2uLsWAAAAAAAAAAAAAAAAAAAAALa4uwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2uLsGAAAAAAAAAAC2uLsBtri7IqyusSN3d3ccAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACusbQCUE1L/gAAAAAAAAAAUE1L/QwZAADi8bQA9vvlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9//cA1+uYABcXJwABEeeaAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqKCb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8CrbCzAgAAAAAAAAAAqrSkAf0C9gDz+eAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA/f76APf76QABC/AAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoJyb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////+AAAAA6yvsv8AAAAB/QDtJ/X65QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPL54AAA/ywAAAAAAQAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////VVJP+wAAAAAAAAD/qLOe2vb65wAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPj77AAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABVUk//AAAAAAAAAAAAAAAAAwMD/v4A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A/AAAAAAAAAAABQAAAP0AAAAAAAAAAAAAAAAA/UASAgAAIABJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH8/gAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCxswEAAAAAAAAAAAAAAAARDwwJAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAeAAAAAHZ2dgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBPTf8AAAAAAAAAAAAAAAAAAAD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtAAAAAIqKiv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7u7sBAAAAAAAAAAAAAAD9/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAD2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAGAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAAAAAAAAAAMAAAAAHZ2dgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFRUX/AAAAAAAAAAAAAAD4AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAADvAAAAAIqKiv0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7u7sBAAAAAAAAAAAAAAAB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAA/AAAAAAAAAAPAP8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvr6+AcDAwAEAAAAZ/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAACAAAAAHZ2dgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9QkJC/wAAAAC7xa3i//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIqKiv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEfAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAD/AAAAAAAXfHx8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7e3sEpqamAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABFRUX8AAAAAAAAAAAAAADd//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP8AAAAAAAD6hISE/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqAGnp6cBAAAAAAAAAAAAAAAAAAAAAAAAAACFhYX9AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFO1L3/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+vz1ANXorQAYDjEA4+/HQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEB/vX19fgAAAAKAAAAAAAAAAAAAAAA8O70ACMhGADk8MwA/wABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPX67QALBhgA/wABCAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+vr6+vgBAQEK////AAAAAAAAAAAAAAAAAPL46AD9/vwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy+OYA//8AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAf/+/v4AAAAAAAAAAAAAAAAADBIHAPX66QAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2+vAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gABAQEA////AAAAAAAAAAAACQwGAPX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAACAP8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQUA//8AAP//AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f0ABf0SAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBwcAEfc0AO0IywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/qAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD49/cAb1mCABD2MgD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wDgAP8AgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAEA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA7AAAAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7AAAA5QAAAOUAAAAAAAAAAAAAAACfp5cBvf58AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAq6urA62trQcAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIPlH///8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP8AAAAFBQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVVVV/QAAAPoAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4wq8D//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAAD/AAD5+fkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAFNTU/8AAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAA/v8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQD+/v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIP1H9//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAACAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAACAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4wbAJ//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAD/AAAA/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAJ//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAD5AAAA6gAAAPoAAAACAAAA8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAA6AAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx/v8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAA9gAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAANAAAA6QAAAO8AAAD+AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAADyAAAA0AAAAAYAAAACAAAA9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAzwAAAO8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz7/fsAAAC+AAAA+AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAKAAAA7wAAANwAAAD7AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAADuAAAAxQAAAOEAAAACAAAA+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAA5gAAAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmuhjQAAIABJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM7fwpwAAADLAAAA/AAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAA9wAAANkAAAD6AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAADxAAAAzgAAANQAAAABAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA+QAAAPUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD3//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgnDdYAAAC2AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAA/gAAAPcAAAD8AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAQAAAAAAAAD7AAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8WDvMAAADpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAP8AAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAQsF/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL+BvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQcADgIXAPH96gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA79G6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7KAc9AP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEABf0MxIJUnv0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+Pj7/KAg7Fx4GLfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/wXxLvdOTaSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTw+6iHtPxAf+TXjA/8F/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8B/hL8H+M29VsVaVpy8FxcXP8AAAAAAAAAAKSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQLoaSgAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAGkpKQDpKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQKAAAAAAAAAAAAAAAApKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz2AAAAAAAAAAAAAAAAAAAAAKSkpAGkpKQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQGAAAABQAAAPdcXFz+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQJAAAA+FxcXP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz+AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAwAAAP5cXFz/pKSkCQAAAPwAAAABAAAA/FxcXP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAJcXFz+AAAAAKSkpAUAAAAHAAAAAAAAAP8AAAD5AAAA/lxcXP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQBAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAXFxc/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAEAAAAAAAAAAAAAAABcXFz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAQAAAAQAAAACAAAA+lxcXP8AAAAApKSkBQAAAAAAAAAAAAAAAAAAAP8AAAD+AAAAAQAAAP8AAAACAAAAAAAAAAEAAAD/AAAAAAAAAP8fQqeyAAAAlUlEQVQAAAD/AAAA/wAAAAABgAB//wAAAAAAAAAAAAAAAAAAAABcXFz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFLRWuayFb+sAAAAASUVORK5CYII=",
      key: [""],
      loc: true,
      fun: function(evt, app) {
        var item, path_item, _i, _len, _ref, _results;
        _ref = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path_item = _ref[_i];
          item = path_item[path_item.length - 1];
          _results.push(item.new_list_parameter());
        }
        return _results;
      }
    });
    this.add_context_actions({
      txt: "Add Function",
      ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90CGg4kCaW6NcIAACAASURBVHgBAECAv38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAktiQAAIABJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcAAAAGAAAABgAAAAQAAAADAAAAAgAAAAIAAAABAAAAAAAAAAAAAAABAAAA/wAAAAIAAAAAAAAA/wAAAPcAAADsAAAA+QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAALAAAACgAAAAYAAAADAAAAAgAAAP8AAAAAAAAA/QAAAPsAAADyAAAA8wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAADwAAAA0AAAAFAAAAAgAAAAAAAAABAAAA/gAAAP0AAAD5AAAA9gAAAPUAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABEAAAARAAAADgAAAAoAAAAIAAAABQAAAAQAAAACAAAAAgAAAAAAAAABAAAA/wAAAAIAAAACAAAA/wAAAOgAAADOAAAA7QAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAAcAAAAGAAAABAAAAAIAAAAAgAAAP8AAAAAAAAA+AAAAPIAAADeAAAA9gAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAGwAAACAAAAAMAAAABgAAAAAAAAABAAAA/QAAAPcAAADvAAAA5wAAAOUAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAB8AAAAfAAAAGgAAABUAAAAOAAAACgAAAAcAAAAFAAAABAAAAAAAAAAAAAAAAAAAAAUAAAAEAAAA/QAAANEAAADkAAAA8AAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAArAAAALQAAAB8AAAAQAAAABQAAAP4AAAD+AAAA8gAAAOQAAAABAAAA4wAAAPsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAIAAAAKAAAAD4AAAAXAAAADAAAAAIAAAACAAAA+QAAAO4AAADeAAAA0gAAAPMAAADyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAIAAAAGQAAACMAAAAlAAAAIAAAABkAAAASAAAACwAAAAcAAAAEAAAAAwAAAAAAAAAAAAAAAAAAAAYAAAAEAAAAAAAAAAEAAACwAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAkAAAAMwAAACUAAAANAAAABgAAAP4AAAD+AAAA7QAAAAoAAADRAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFgAAACkAAAAiAAAADwAAAAIAAAACAAAA+QAAAPAAAAAPAAAA8wAAANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABgAAAA8AAAAZAAAAJwAAACUAAAAkAAAAHgAAABcAAAARAAAACQAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAABYAAAAIAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAcAAAAIgAAAB4AAAAAAAAAAQAAAP8AAAACAAAA/AAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAAQAAAAEgAAAPwAAAABAAAACwAAABAAAAD3AAAA2wAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAADwAAACMAAAAsAAAAKQAAACMAAAAbAAAAFQAAABAAAAANAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAABAAAAAVAAAAEQAAAAQAAAAAAAAAAAAAAAAAAAD7AAAA9AAAAOsAAADzAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA8QAAAOsAAAD2AAAAEQAAAAQAAAAAAAAAAAAAAAAAAAATAAAAFQAAAA4AAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAFgAAAC4AAABAAAAAIQAAABYAAAAMAAAACQAAAAYAAAD/AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAPcAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADgAAABIAAAAPAAAAAwAAAAAAAAAAAAAAAAAAAP4AAADsAAAA3gAAANYAAADoAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD8AAAA5AAAANYAAAAXAAAACQAAABIAAAABAAAAAAAAAAAAAAAGAAAAEgAAABIAAAANAAAA9QAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAFwAAACQAAAAtAAAAFwAAAAoAAAAFAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAJAAAAFQAAABUAAAAPAAAABQAAAAAAAAAAAAAAAAAAAP8AAADzAAAA5gAAAOEAAADsAAAA/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA6wAAAOAAAADpAAAAHgAAABIAAAAAAAAAAAAAAAAAAAAGAAAAEAAAABUAAAATAAAA/AAAAPcAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAPAAAAGgAAAB8AAAAdAAAADQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAALAAAAGgAAABgAAAAOAAAABAAAAAAAAAAAAAAAAAAAAP8AAAD0AAAA6wAAAOUAAADwAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA7gAAAOUAAADsAAAA9gAAAP8AAAABAAAAAAAAAAAAAAAFAAAADgAAABkAAAAZAAAA8wAAAPgAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAABAAAAAdAAAAHgAAABcAAAAMAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAcAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAQAAAAIgAAABsAAAAKAAAAAgAAAAAAAAAAAAAAAAAAAAEAAAD2AAAA7QAAAOcAAADxAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA8AAAAOcAAADuAAAA+AAAAAEAAAAAAAAA/wAAAAAAAAADAAAADQAAABwAAAAhAAAADAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAABQAAAAhAAAAHwAAABIAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAQAAAAIwAAABsAAAAJAAAAAgAAAAAAAAD/AAAAAAAAAP4AAAD2AAAA8AAAAO0AAAD7AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA9wAAAO0AAADxAAAA9wAAAP8AAAAAAAAAAAAAAAAAAAACAAAACgAAAB0AAAAiAAAADQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAaAAAAGQAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP0AAAD8AAAA/AAAAP0AAAD+AAAA/wAAAAQAAAACAAAABQAAAOoAAAD5AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAARAAAAHAAAABYAAAAIAAAAAgAAAAAAAAAAAAAAAAAAAPgAAADxAAAA8QAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcAAADxAAAA8wAAAPoAAAAIAAAAAAAAAAAAAAADAAAACgAAABcAAAAcAAAADgAAAAUAAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAYAAAAFQAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPYAAADzAAAA8wAAAPUAAAD5AAAA/wAAAAYAAAAEAAAA/AAAANgAAADzAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAcAAAAQAAAAGQAAABIAAAAGAAAAAQAAAAAAAAAAAAAA/AAAAPIAAADwAAAA9AAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPsAAADzAAAA8AAAAPMAAAAGAAAAAgAAAAAAAAACAAAABwAAABQAAAAYAAAADwAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA0AAAAUAAAAEAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAO0AAADhAAAA4AAAAOMAAADvAAAA/gAAAAMAAAADAAAA/QAAAOQAAADrAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAkAAAAQAAAAFgAAAA8AAAAEAAAAAQAAAAAAAAAAAAAA9AAAAOkAAADtAAAA9AAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAADyAAAA6wAAAOsAAAAJAAAADAAAAAAAAAABAAAABgAAABEAAAAWAAAADwAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAARAAAADQAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAOwAAADbAAAA0AAAANkAAADpAAAAAAAAAAAAAAABAAAA/wAAAPUAAADvAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAsAAAAQAAAAEAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAA9QAAAOkAAADtAAAA9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAADzAAAA6wAAAOkAAAAUAAAADAAAAAAAAAAAAAAAAgAAAAkAAAARAAAAEAByw9HmAAAgAElEQVQAAAoAAAACAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAANAAAADQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAO0AAADhAAAA1wAAANoAAADtAAAAAgAAAAEAAAAAAAAA/wAAAP4AAAD6AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAABAAAAAQAAAACgAAAAAAAAAAAAAAAAAAAAAAAAABAAAA9gAAAOwAAADuAAAA9gAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD0AAAA7QAAAOwAAAD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAEQAAAA8AAAAJAAAA9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAKAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAO0AAADjAAAA4AAAAOkAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAADwAAABMAAAARAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9gAAAOwAAADuAAAA9QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD1AAAA7gAAAOwAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAEQAAABMAAAANAAAA+QAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAO0AAADnAAAA6gAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAEwAAABcAAAAQAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wAAAOwAAADwAAAA9wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD0AAAA7wAAAO8AAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAEwAAABYAAAARAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAMAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPEAAADvAAAA9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAEgAAABYAAAARAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9gAAAO4AAADxAAAA9wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD2AAAA8AAAAO8AAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAEgAAABYAAAARAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAEAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPUAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAEgAAABYAAAARAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA9wAAAPAAAADyAAAA+AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD3AAAA8QAAAO8AAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAEwAAABcAAAAPAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPcAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAEgAAABgAAAASAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA9gAAAO8AAADzAAAA+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5AAAA8wAAAPAAAAD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAABYAAAAQAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPwAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAEQAAABcAAAARAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA9QAAAPAAAAD2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA9QAAAPAAAAD2AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAEgAAABYAAAAPAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABAAAAAQAAAP4AAAAAAAAABQAAAAUAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAgAAAADAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAD+AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAEAAAABIAAAAOAAAAAQAAAAAAAAAAAAAAAAAAAP8AAAD5AAAA9AAAAPMAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAA/wAAAAAAAAABAAAA/wAAAAAAAAABAAAAAAAAAAAAAAD/AAAAAAAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAAAAAAEAAAAAAAAAAAAAAP8AAAAAAAAAAQAAAP8AAAAAAAAAAQAAAAAAAAD/AAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+gAAAPQAAAD1AAAA+QAAAAgAAAAAAAAAAAAAAP8AAAADAAAAEAAAABMAAAAPAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAP8AAAALAAAACQAAAAEAAAD8AAAADgAAAA8AAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAAAAWAAAA5QAAAAgAAAALAAAA/wAAAAAAAAAAAAAAAQAAAPkAAADxAAAA+QAAAAAAAAAAAAAAAAAAAAAAAAAHAAAADgAAAA0AAAACAAAAAAAAAP8AAAABAAAAAAAAAP0AAAD1AAAA9AAAAPcAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAcAAAAIAAAABAAAAAIAAAD/AAAA/wAAAAAAAAABAAAA/wAAAAAAAAABAAAAAQAAAP8AAAD+AAAA/AAAAPkAAAD2AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAACAAAABgAAAAgAAAAHAAAAAwAAAAIAAAABAAAA/wAAAP8AAAAAAAAAAQAAAP8AAAAAAAAAAQAAAAEAAAD9AAAA+wAAAPkAAAD5AAAA+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPYAAAD0AAAA9gAAAAUAAAADAAAAAAAAAAAAAAACAAAABgAAAA8AAAAOAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAdAAAAJgAAABgAAAACAAAAAgAAACgAAAAMAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAACkAAAD2AAAAIAAAAAYAAAAIAAAA/gAAAAQAAAACAAAA/gAAAOUAAADJAAAA6gAAAP0AAAAAAAAAAAAAAAEAAAAMAAAACwAAAAUAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAPcAAADwAAAA9AAAAPwAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAFgAAAB0AAAAZAAAAEAAAAAgAAAD+AAAA/gAAAAAAAAD/AAAAAAAAAAAAAAACAAAAAgAAAP0AAAD4AAAA8QAAAOYAAADdAAAA8QAAAPsAAAAAAAAAAAAAAAAAAAAFAAAAEQAAACMAAAAYAAAADQAAAAcAAAADAAAA/QAAAP8AAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAAAAAD3AAAA7wAAAOYAAADjAAAA5wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPsAAADzAAAA8AAAAAcAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAeAAAAPAAAACsAAAAHAAAA+QAAACIAAAALAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAACgAAAAPAAAA8AAAAAMAAAADAAAA/wAAAAUAAAADAAAA/wAAANMAAADdAAAA7QAAAP0AAAAAAAAAAgAAAAoAAAANAAAACwAAAAMAAAAAAAAAAAAAAAEAAAD/AAAA/AAAAPUAAADuAAAA9QAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAFQAAACkAAAArAAAAHAAAAA4AAAD+AAAA/gAAAAAAAAD+AAAAAQAAAAAAAAABAAAAAwAAAP0AAAD0AAAA5wAAANQAAADxAAAA9gAAAPsAAAAAAAAAAAAAAAAAAAAGAAAAFgAAADAAAAAqAAAAFgAAAAkAAAACAAAA/QAAAAAAAAAAAAAA/wAAAAIAAAAAAAAABAAAAP8AAADwAAAA4gAAANIAAAD0AAAA5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPwAAADzAAAA7wAAAA0AAAAGAAAABAAAAAEAAAAAAAAAAAAAAAQAAAAMAAAACwAAAAUAAAD8AAAA/wAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAYAAAAKwAAAC4AAAAMAAAA+gAAAAoAAAAHAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAABwAAAAVAAAA+wAAAAEAAAABAAAA/wAAAAIAAAABAAAABwAAAAMAAAAPAAAAAgAAAAAAAAAAAAAABQAAAA0AAAAOAAAACQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPcAAADwAAAA9QAAAP0AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAACwAAABcAAAAlAAAAJAAAABQAAAD+AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAABAAAAAQAAAAEAAAD3AAAA4gAAAPsAAADaAAAA6QAAAPYAAAAAAAAAAAAAAAAAAAAJAAAAGgAAACsAAAA0AAAAGQAAAAYAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAEAAAAAAAAAAwAAAP8AAADrAAAABgAAAOgAAAAKAAAAAQAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPwAAADzAAAA8AAAABcAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAKAAAADgAAAAsAAAD0AAAA/AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAANAAAAFwAAABgAAAAEAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAJAAAAAQAAAAAAAAAAAAAABQAAAA0AAAANAAAABwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPcAAADxAAAA9gAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+gAAAPsAAAACAAAADwAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAOgAAAAbAAAA4gAAAO8AAAAAAAAAAAAAAAEAAAARAAAAHQAAACIAAAAjAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAPsAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0AAAD2AAAA8gAAAPkAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAJAAAADQAAAA0AAAD4AAAA/AAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAA/gAAAP0AAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD/AAAAAAAAAAAAAAAAAAAABAAAAA4AAAANAAAABwAAAAEAAAAAAAAAAAAAAAAAAAD/AAAA/QAAAPkAAADzAAAA9wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA5gAAANcAAADYAAAA7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAABwAAAAgAAAAGgAAAA0AAAAAAAAAAAAAABEAAAAdAAAAIAAAABoAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnAAAA1gAAANgAAADpAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP0AAAD2AAAA8wAAAPgAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAHAAAADQAAAA4AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAD9AAAA/AAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPsAAAD+AAAAAAAAAAAAAAAAAAAABgAAAA4AAAAMAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPkAAAD0AAAA9wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA7AAAAN0AAADWAAAA4gAAAPkAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAACAAAABUAAAAgAAAAHQAAABQAAAAEAAAABgAAABcAAAAfAAAAHgAAABIAAAAEAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/gAAAPQAAADfAAAA1QAAAN8AAADwAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0AAAD3AAAA9AAAAPoAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAHAAAADQAAAA0AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAD8AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAPkAAAD+AAAA/wAAAAAAAAABAAAABQAAAA4AAAALAAAABgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPkAAAD1AAAA+AAAAP4AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA9gAAAOcAAADZAAAA2gAAAOUAAAD0AAAA/gAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAA4AAAAdAAAAIQAAABsAAAAGAAAACAAAAB0AAAAhAAAAHAAAAAsAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD+AAAA9AAAAOQAAADZAAAA2QAAAOkAAAD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP4AAAD3AAAA9AAAAPoAAAD/AG5REaMAACAASURBVAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAGAAAADQAAAA4AAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAACAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAABAAAAAAAAAAAAAAAAAAAABQAAAA4AAAANAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPkAAADzAAAA9wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPQAAADmAAAA2gAAANgAAAAEAAAAGAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAaAAAAIwAAAOcAAADlAAAABQAAACMAAAAiAAAAGQAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD7AAAA6wAAANYAAADbAAAA6AAAAPUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0AAAD2AAAA8wAAAPoAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAIAAAADQAAAA0AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAFAAAABwAAAAEAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAoAAAADAAAAAAAAAAAAAAABAAAABgAAAA4AAAANAAAABwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPkAAADyAAAA9wAAAP4AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAADxAAAA2gAAAM4AAAAVAAAAEwAAAAQAAAABAAAA/wAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAYAAAAJAAAAO0AAADnAAAABQAAACkAAAAhAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD4AAAA5QAAAMwAAADdAAAA9AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP0AAAD2AAAA9AAAAPkAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAIAAAADQAAAA0AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAD+AAAA/wAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAABAAAAA0AAAAMAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAPkAAAD0AAAA+AAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD0AAAA3wAAABIAAAAtAAAAIQAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+QAAAOsAAADfAAAA3AAAAO0AAAD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEA////AAAAAAAAAAAA/v7++QwZAADi8bQA9vvlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9//cA1+uYABcXJwABEeeaAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/AAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABAAAAAQAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqKCb/AAAAAAAAAAAAAAAAAAAAAgAAAAUAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAP0AAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAO8AAADfAAAA2gAAAOgAAAD2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAQEBAAAAAAAAAAD/AAAA9P0C9gDz+eAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA/f76APf76QABC/AAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAP0AAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoJyb/AAAAAAAAAAAAAAAAAAAAAgAAAAUAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP0AAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPUAAADmAAAA2wAAAOYAAADxAAAA+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAgICAAAAAAABAQH5HyEd9fX65QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPL54AAA/wAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAP0AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAADrAAAA3wAAAOQAAADrAAAA9AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A/f39AAAAAPv////x4+Hl4/b65wAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAPj77AAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAP4AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAQAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD8AAAA7AAAAN4AAADeAAAA6gAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUAAADn////2/4A/AD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4A/AAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAE7UxNAAAIABJREFUAAAAAAAA/QAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH8/gAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2AAAA2wAAANUAAADjAAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8QAAAN8ODw3bAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAeAAAAAHZ2dgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6AAAA3QAAANMAAADhAAAA8wAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA7wAAAN77+/vQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtAAAAAIqKiv8AAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/gAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA5gAAANsAAADiAAAA8AAAAAAAAAAAAAAAAAAAAP8AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAD5AAAA7AAAAOH8+/zZ/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAD2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/QAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPAAAADoAAAA6AAAAO4AAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAPkCAgLuAAAA6AAAAOouMSv6AP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAAAAAAAAAAMAAAAAHZ2dgIAAAAAAAAAAAAAAAAAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA/QAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/AAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAADsAAAA6AAAAOoAAAD6AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPj+/v7qAAAA6QAAAO8dHhv+/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAD+AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAEAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD9AAAA+wAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAADwAAAA6AAAAOkAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAADpAAAA6wAAAPLLyc/2AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAADvAAAAAIqKiv0AAAAAAAAAAAAAAAAAAAAFAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA+wAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA+wAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA+gAAAPkAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0BAQH6/////AAAAP8MDAsB/wD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAEAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9AAAA+wAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA+wAAAPwAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAPAAAAEQAAABAAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAYCAgIRAAAAEgAAAA5FSD8RAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAD/AQAA/wEAAP8BAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAAAgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD9AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA/AAAAPwAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAQAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAXAAAAGwAAABcAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAgIZAQEBGwICAhgREhAh/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAACAAAAAHZ2dgEAAAAAAAAAAAAAAAIAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD8AAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD+AAAA+wAAAPsAAAD9AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABwAAABYAAAAfAAAAJAAAAB0AAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv9/f0e////I/7+/h6sqLP5//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAIqKiv8AAAAAAAAAAQAAAAQAAAAEAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD8AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA+gAAAPoAAAD9AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFQAAAB4AAAAeAAAAFAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFgAAAB4jJSExAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAD/AAAAAAAXfHx8AQAAAAAAAAAAAAAAAQAAAAQAAAAGAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAPwAAAD6AAAA+gAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA+AAAAPoAAAD9AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAACAAAABQAAAAcAAAAFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAHwAAACYAAAAcAAAACQAAAAABAQEAAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAD+/v4AAAAACwAAAB3BvsUM//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP8AAAAAAAD6hISE/wAAAAAAAAAAAAAAAwAAAAcAAAAIAAAABAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPsAAAD4AAAA+AAAAP4AAAD/AAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA9wAAAPgAAAD7AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAACAAAABQAAAAkAAAAGAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqAEHBwcKAAAAJQAAACwAAAAbAAAACwAAAAD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAB7y8fMn/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAA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AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AADy+OYA//8AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7AAAA8gAAAPMAAAD4AAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACQAAABAAAAAKAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAD+AAAACAAAABoAAAAiBwoFC/X65gAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2+vAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA8wAAAPIAAAD3AAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACgAAABEAAAAMAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEBv4BA/8BAAAACgAAAB4AAAAkBwoFA/z/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAPIAAAD1AAAA/AAAAAAAAAD/AAAAAAAAAAAAAAADAAAACgAAABEAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgBMSUUDAAAADwAAACAAAAAlAAACAP8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAADzAAAA9gAAAAAAAAD/AAAAAQAAAAAAAAAAAAAABgAAAA0AAAAMAAAABwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUtIRQEICAgQ+Pj4GgAAAB4AAAAX//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPsAAADxAAAA8QAAAPgAAAAFAAAAAgAAAAAAAAAAAAAAAwAAAAoAAAALAAAACQAAAAQAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAr4+PgYAAAAIwAAABsFBgYO//8AAP//AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkAAADvAAAA6wAAAO8AAAAUAAAAAwAAAAAAAAAAAAAAAQAAAAcAAAAMAAAADgAAAAYAAAD3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAwAAAAjAAAAMQAAABj9/PwIBf0SAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAADuAAAA6QAAAO4AAAASAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAALAAAAEAAAAAoAAADyAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAABEAAAAmAAAALwAAABUHBwcDEfc0AO0IywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/qAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkAAADuAAAA6QAAAO8AAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAMAAAALAAAAEQAAAA4AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABkAAAAjAAAAJAAAAA/39/cDb1mCABD2MgD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wDgAP8AgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkAAADvAAAA6QAAAO8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAEgAAABAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAPAAAADdAAAA5gAAAPYAAAD+AAAAAAAAAAEAAAAAAAAA/wAAAAoAAAASAAAAGAAAAA4AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVVVV/QAAAPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4wq8D//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAAD/AAChoaEDAAAAGAAAABEAAAAJAAAA/wAAAAAAAAABAAAAAAAAAP0AAAD0AAAA4wAAAN4AAADyAAAA/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAPMAAADjAAAA5wAAAPQAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAoAAAATAAAAGQAAAOwAAAD2AAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTU/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAA/v8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQDm5uYMAAAAGQAAABIAAAAIAAAAAQAAAAAAAAAAAAAAAAAAAPwAAADzAAAA5gAAAOQAAAD1AAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAPYAAADoAAAA6QAAAPIAAAD8AAAAAAAAAAAAAAAAAAAAAQAAAA0AAAAXAAAAHQAAABEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIP1H9//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD9/f0TAAAAHQAAABUAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAPsAAADxAAAA6QAAAOkAAAD4AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPoAAADuAAAA7AAAAPEAAAD+AAAAAAAAAAAAAAAAAAAAAgAAABQAAAAjAAAA5QAAAN8AAADcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAKgAAACEAAAASAAAAAQAAAAAAAAAAAAAAAAAAAP0AAADwAAAA7AAAAPAAAAD7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAD1AAAA7wAAAO4AAAD0AAAAAAAAAP8AAAAAAAAAAAAAAAsAAAAWAAAAHgAAABIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4wbAJ//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP8AAAABAQEWAAAAHwAAABQAAAAJAAAA/wAAAAAAAAAAAAAAAAAAAPMAAADtAAAA8AAAAPkAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA8gAAAOkAAADoAAAADQAAAAwAAAADAAAAAQAAAP4AAAADAAAADQAAAAkAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAJ//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AQAAAAAJAAAADAAAAAAAAAD+AAAAAgAAAAAAAAD8AAAA8wAAAOcAAADqAAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8QAAAOAAAAAVAAAA+QAAABIAAAAHAAAA/gAAAPoAAADwAAAA6gAAAPUAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx/v8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD////zAAAA6AAAAAQAAADsAAAABQAAAAEAAAD4AAAA7QAAANgAAADiAAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7wAAANUAAAD2AAAA2AAAAAsAAAAEAAAA/gAAAP4AAAD3AAAA7AAAAOEAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////UCAgHd/v7/wQAAABAAAAAHAAAAAgAAAAEAAAD8AAAA9AAAAOcAAADdAAAA8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8wAAAN0AAADtAAAADAAAAAUAAAACAAAA/wAAAAAAAAD7AAAA+AAAAOgAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhTnbxgAAIABJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOwR0nL+/v/gAAAA9gAAAAgAAAADAAAAAAAAAAEAAAD+AAAA+gAAAPQAAADvAAAA9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wAAAOcAAADpAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAPwAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD3//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIFAvoAAADmAAAA6QAAAAIAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP4AAAD9AAAA/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCB/8AAAD7AAAA+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAQsF/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL+BvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQcADgIXAPH96gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA79G6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7KAc9AP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEABf0MxIJUnv0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+Pj7/KAg7Fx4GLfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/wXxLvdOTaSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTw+6iHtPxAf+TXjA/8F/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8B/hL8H+M29VsVaVpy8FxcXP8AAAAAAAAAAKSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQLoaSgAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAGkpKQDpKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQKAAAAAAAAAAAAAAAApKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz2AAAAAAAAAAAAAAAAAAAAAKSkpAGkpKQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQGAAAABQAAAPdcXFz+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQJAAAA+FxcXP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcXFz+AAAA/AAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAwAAAP5cXFz/pKSkCQAAAPwAAAABAAAA/FxcXP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAJcXFz+AAAAAKSkpAUAAAAHAAAAAAAAAP8AAAD5AAAA/lxcXP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKQBAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAXFxc/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSkpAEAAAAAAAAAAAAAAABcXFz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApKSkAQAAAAQAAAACAAAA+lxcXP8AAAAApKSkBQAAAAAAAAAAAAAAAAAAAP8AAAD+AAAAAQAAAP8AAAACAAAAAAAAAAEAAAD/AAAAAAAAAP+K9hKuAAAAlUlEQVQAAAD/AAAA/wAAAAABgAB//wAAAAAAAAAAAAAAAAAAAABcXFz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGlGs85spqyoAAAAASUVORK5CYII=",
      key: [""],
      loc: true,
      fun: function(evt, app) {
        var item, path_item, _i, _len, _ref, _results;
        _ref = app.data.selected_tree_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path_item = _ref[_i];
          item = path_item[path_item.length - 1];
          _results.push(item.new_function_parameter());
        }
        return _results;
      }
    });
    this.bind(function() {
      if (_this.type.has_been_modified() || _this.nb_parameters.has_been_modified()) {
        _this.update_parameters();
      }
      if (_this._children.has_been_modified()) {
        _this.check_child();
        return _this.update_parameters();
      }
    });
  }

  ParametricDataItem.prototype.accept_child = function(ch) {
    return ch instanceof ParametricListItem || ch instanceof ListParameterItem || ch instanceof ListParameterSetItem || ch instanceof Basic1DFunctionItem;
  };

  ParametricDataItem.prototype.check_child = function() {
    child;
    var ch, child, sub_child, _i, _j, _len, _len2, _ref, _ref2;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ch = _ref[_i];
      if (!(__indexOf.call(this._old_children, ch) >= 0)) {
        child = ch;
        break;
      }
    }
    if (child instanceof TreeItem) this._old_children.push(child);
    if (child instanceof ListParameterSetItem) {
      _ref2 = child._children;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        sub_child = _ref2[_j];
        this.new_list_parameter(sub_child._name.get(), sub_child._values);
      }
      return this.rem_this_child(child);
    } else if (child instanceof ListParameterItem) {
      this.new_list_parameter(child._name.get(), child._values);
      return this.rem_this_child(child);
    }
  };

  ParametricDataItem.prototype.rem_this_child = function(child) {
    var num_c, _ref;
    this.rem_child(child);
    if (child instanceof TreeItem) {
      for (num_c = 0, _ref = this._old_children.length; 0 <= _ref ? num_c < _ref : num_c > _ref; 0 <= _ref ? num_c++ : num_c--) {
        if (this._old_children[num_c] === child) {
          this._old_children.splice(num_c, 1);
          return;
        }
      }
    } else {
      return this._old_children.splice(child, 1);
    }
  };

  ParametricDataItem.prototype.z_index = function() {};

  ParametricDataItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ParametricDataItem.prototype.ask_for_id_param = function() {
    var id_param;
    id_param = parseInt(this._incr_id_param);
    this._incr_id_param.set(parseInt(this._incr_id_param) + 1);
    return id_param;
  };

  ParametricDataItem.prototype.update_parameters = function() {
    var child, _i, _len, _ref;
    this.nb_parameters.set(this._children.length);
    if (this.type.toString() === "off") {
      this.nb_resolutions._min.set(0);
      this.nb_resolutions._max.set(0);
      return this.nb_resolutions.val.set(0);
    } else if (this.type.toString() === "sequential") {
      this._max_resolutions.set(600);
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child._name_class.get() === "ParametricListItem") {
          if (child._size.get() < this._max_resolutions.get()) {
            this._max_resolutions.set(child._values.length);
          }
        }
      }
      this.nb_resolutions._min.set(1);
      this.nb_resolutions._max.set(this._max_resolutions.get());
      this.nb_resolutions._div.set(this._max_resolutions.get() - 1);
      if (this.nb_resolutions.val.get() < this.nb_resolutions._min.get()) {
        return this.nb_resolutions.val.set(this.nb_resolutions._min.get());
      } else if (this.nb_resolutions.val.get() > this.nb_resolutions._max.get()) {
        return this.nb_resolutions.val.set(this.nb_resolutions._max.get());
      }
    } else {
      alert("Not implemented type : " + (this.type.toString()));
      if (this._children.length() > 0) {
        return this.type.num.set(1);
      } else {
        return this.type.num.set(0);
      }
    }
  };

  ParametricDataItem.prototype.new_function_parameter = function(name) {
    var id_param, param;
    if (name == null) name = "";
    id_param = this.ask_for_id_param();
    if (name === "") name = "PM_" + id_param.toString();
    param = new Basic1DFunctionItem(name, id_param, "n", 0, this.nb_resolutions.val.get() - 1);
    param._name_class.set("Basic1DFunctionItem");
    return this.add_child(param);
  };

  ParametricDataItem.prototype.new_list_parameter = function(name, values) {
    var id_param, param;
    if (name == null) name = "";
    if (values == null) values = [];
    id_param = this.ask_for_id_param();
    if (name === "") name = "PM_" + id_param.toString();
    param = new ParametricListItem(name, id_param, values);
    param._name_class.set("ParametricListItem");
    this.add_child(param);
    if (param.length() < this._max_resolutions.get()) {
      return alert("WARNING!\nParametric parameter " + (param._name.get()) + " has only " + (param.length()) + " values!\nMaximum number of resolutions will be constrained.");
    }
  };

  ParametricDataItem.prototype.update_max_resolutions = function() {
    var child, _i, _len, _ref, _results;
    this._max_resolutions.set(600);
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child._name_class.get() === "ParametricListItem") {
        if (child._size.get() < this._max_resolutions.get()) {
          _results.push(this._max_resolutions.set(child._values.length));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return ParametricDataItem;

})(TreeItem);


var ScillsPartFilterItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsPartFilterItem = (function(_super) {

  __extends(ScillsPartFilterItem, _super);

  function ScillsPartFilterItem(name_group, id_group) {
    var _this = this;
    if (name_group == null) name_group = "part_filter";
    if (id_group == null) id_group = 0;
    ScillsPartFilterItem.__super__.constructor.call(this);
    this._name.set(name_group);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      name: this._name,
      type: new Choice(0, ["void", "by id", "by name", "all"]),
      filter: "",
      _id: id_group,
      _info_ok: parseInt(0)
    });
    this.bind(function() {
      if (_this.type.has_been_modified() || _this.filter.has_been_modified()) {
        return _this.set_filter_part();
      }
    });
  }

  ScillsPartFilterItem.prototype.set_filter_part = function() {
    return this._parents[0]._parents[0].set_filter_part(this);
  };

  ScillsPartFilterItem.prototype.cosmetic_attribute = function(name) {
    return ScillsPartFilterItem.__super__.cosmetic_attribute.call(this, name) || (name === "filter");
  };

  ScillsPartFilterItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartItem;
  };

  ScillsPartFilterItem.prototype.z_index = function() {};

  ScillsPartFilterItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsPartFilterItem.prototype.information = function(div) {
    if (this._info_ok < 2) {
      this.txt = new_dom_element({
        parentNode: div
      });
      this.txt.innerHTML = "                  id : " + this._id + " <br>              ";
      return this._info_ok.set(parseInt(this._info_ok) + 1);
    }
  };

  return ScillsPartFilterItem;

})(TreeItem);
var TemporalStepItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TemporalStepItem = (function() {
  __extends(TemporalStepItem, TreeItem);
  function TemporalStepItem(name, id_step) {
    if (name == null) {
      name = "TemporalStep";
    }
    if (id_step == null) {
      id_step = -1;
    }
    TemporalStepItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _id: id_step,
      initial_time: 0,
      final_time: 1,
      time_step: 1,
      nb_steps: 1
    });
    this.bind(__bind(function() {
      if (this.time_step.has_been_modified() || this.nb_steps.has_been_modified()) {
        return this._parents[0]._parents[0].change_step_bounds();
      }
    }, this));
  }
  TemporalStepItem.prototype.accept_child = function(ch) {
    return false;
  };
  TemporalStepItem.prototype.z_index = function() {};
  TemporalStepItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return TemporalStepItem;
})();var VolumicForceItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
VolumicForceItem = (function() {
  __extends(VolumicForceItem, TreeItem);
  function VolumicForceItem(name, dim) {
    if (name == null) {
      name = "VolumicForce";
    }
    if (dim == null) {
      dim = 3;
    }
    VolumicForceItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      alias: name,
      gamma: "2",
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        space_function: ["0", "0", "-1"]
      });
    } else {
      this.add_attr({
        space_function: ["0", "-1"]
      });
    }
    this.bind(__bind(function() {
      if (this.alias.has_been_modified()) {
        return this._name.set(this.alias);
      }
    }, this));
  }
  VolumicForceItem.prototype.accept_child = function(ch) {};
  VolumicForceItem.prototype.z_index = function() {};
  VolumicForceItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return VolumicForceItem;
})();var ScillsEdgeItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsEdgeItem = (function() {
  __extends(ScillsEdgeItem, TreeItem);
  function ScillsEdgeItem(name) {
    if (name == null) {
      name = "Edge";
    }
    ScillsEdgeItem.__super__.constructor.call(this);
    this.add_attr({
      _mesh: new Mesh({
        not_editable: true
      })
    });
    this.add_attr({
      visualization: this._mesh.visualization,
      id: -1
    });
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
  }
  ScillsEdgeItem.prototype.cosmetic_attribute = function(name) {
    return ScillsEdgeItem.__super__.cosmetic_attribute.call(this, name) || (name === "_mesh" || name === "visualization");
  };
  ScillsEdgeItem.prototype.accept_child = function(ch) {};
  ScillsEdgeItem.prototype.z_index = function() {
    return this._mesh.z_index();
  };
  ScillsEdgeItem.prototype.sub_canvas_items = function() {
    return [this._mesh];
  };
  ScillsEdgeItem.prototype.clear = function() {
    return this._mesh.clear();
  };
  return ScillsEdgeItem;
})();var TimeParamItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TimeParamItem = (function(_super) {

  __extends(TimeParamItem, _super);

  function TimeParamItem(name) {
    var _this = this;
    if (name == null) name = "Time";
    TimeParamItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      type: new Choice(0, ["static", "quasistatic"]),
      nb_steps: 0,
      nb_parameters: 1,
      _incr_id_param: 0
    });
    this.add_child(new TemporalStepSetItem);
    this.add_child(new TemporalParameterSetItem);
    this.bind(function() {
      if (_this.type.has_been_modified() || _this.nb_steps.has_been_modified() || _this.nb_parameters.has_been_modified()) {
        return _this.change_parameters();
      }
    });
  }

  TimeParamItem.prototype.accept_child = function(ch) {};

  TimeParamItem.prototype.z_index = function() {};

  TimeParamItem.prototype.sub_canvas_items = function() {
    return [];
  };

  TimeParamItem.prototype.ask_for_id_param = function() {
    var id_param;
    id_param = parseInt(this._incr_id_param);
    this._incr_id_param.set(parseInt(this._incr_id_param) + 1);
    return id_param;
  };

  TimeParamItem.prototype.change_step_bounds = function() {
    return this._children[0].change_step_bounds();
  };

  TimeParamItem.prototype.change_parameters = function() {
    var bound0, bound1, id_param, name_temp, num_c, num_param, num_step, size_child, size_child0_child, size_splice, size_splice_1, _ref, _ref2, _ref3, _results;
    if (this.type.toString() === "static") {
      this.nb_steps.set(0);
      this.nb_parameters.set(0);
    }
    size_splice = 0;
    if (this._children[0]._children.length > this.nb_steps) {
      size_splice = this._children[0]._children.length - this.nb_steps;
      this._children[0]._children.splice(this.nb_steps, size_splice);
    } else {
      size_child0_child = this._children[0]._children.length;
      for (num_c = size_child0_child, _ref = this.nb_steps; size_child0_child <= _ref ? num_c < _ref : num_c > _ref; size_child0_child <= _ref ? num_c++ : num_c--) {
        name_temp = "step_" + num_c.toString();
        this._children[0].add_child(new TemporalStepItem(name_temp, num_c));
      }
    }
    this.change_step_bounds();
    size_splice = 0;
    if (this._children[1]._children.length > this.nb_parameters) {
      size_splice = this._children[1]._children.length - this.nb_parameters;
      return this._children[1]._children.splice(this.nb_parameters, size_splice);
    } else {
      size_child0_child = this._children[1]._children.length;
      for (num_c = size_child0_child, _ref2 = this.nb_parameters; size_child0_child <= _ref2 ? num_c < _ref2 : num_c > _ref2; size_child0_child <= _ref2 ? num_c++ : num_c--) {
        id_param = this.ask_for_id_param();
        name_temp = "PT_" + id_param.toString();
        this._children[1].add_child(new TemporalParameterItem(name_temp, id_param));
      }
      _results = [];
      for (num_param = 0, _ref3 = this.nb_parameters; 0 <= _ref3 ? num_param < _ref3 : num_param > _ref3; 0 <= _ref3 ? num_param++ : num_param--) {
        size_splice_1 = 0;
        if (this._children[1]._children[num_param]._children.length > this.nb_steps) {
          size_splice_1 = this._children[1]._children[num_param]._children.length - this.nb_steps;
          _results.push(this._children[1]._children[num_param]._children.splice(this.nb_steps, size_splice_1));
        } else {
          size_child = this._children[0]._children[num_param]._children.length;
          _results.push((function() {
            var _ref4, _results2;
            _results2 = [];
            for (num_step = size_child, _ref4 = this.nb_steps; size_child <= _ref4 ? num_step < _ref4 : num_step > _ref4; size_child <= _ref4 ? num_step++ : num_step--) {
              name_temp = "step_" + num_step.toString() + "_function";
              bound0 = this._children[0]._children[num_step].initial_time;
              bound1 = this._children[0]._children[num_step].final_time;
              _results2.push(this._children[1]._children[num_param].add_child(new Basic1DFunctionItem(name_temp, num_step, "t", bound0, bound1)));
            }
            return _results2;
          }).call(this));
        }
      }
      return _results;
    }
  };

  return TimeParamItem;

})(TreeItem);
var BoundaryConditionSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

BoundaryConditionSetItem = (function(_super) {

  __extends(BoundaryConditionSetItem, _super);

  function BoundaryConditionSetItem(dim) {
    var _this = this;
    if (dim == null) dim = 3;
    BoundaryConditionSetItem.__super__.constructor.call(this);
    this._name.set("BoundaryCondition collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_bcs: 0,
      _incr_id_bc: 0,
      _incr_id_group_edge: 0,
      _dim: dim
    });
    this.add_attr({
      nb_bcs: this._nb_bcs
    });
    this.add_context_actions(new TreeAppModule_Collection(this._nb_bcs));
    this.bind(function() {
      if (_this._nb_bcs.has_been_modified()) return _this.change_collection();
    });
  }

  BoundaryConditionSetItem.prototype.accept_child = function(ch) {
    return false;
  };

  BoundaryConditionSetItem.prototype.z_index = function() {};

  BoundaryConditionSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  BoundaryConditionSetItem.prototype.ask_for_id_group = function() {
    var id_group;
    id_group = parseInt(this._incr_id_group_edge);
    this._incr_id_group_edge.set(parseInt(this._incr_id_group_edge) + 1);
    return id_group;
  };

  BoundaryConditionSetItem.prototype.ask_for_id_bc = function() {
    var id_link;
    id_link = parseInt(this._incr_id_bc);
    this._incr_id_bc.set(parseInt(this._incr_id_bc) + 1);
    return id_link;
  };

  BoundaryConditionSetItem.prototype.change_collection = function() {
    var id_bc, name_temp, num_c, size_child0_child, size_splice, _ref, _ref2, _ref3, _results;
    size_splice = 0;
    if (this._children.length > this._nb_bcs) {
      size_splice = this._children.length - this._nb_bcs;
      for (num_c = _ref = this._nb_bcs, _ref2 = this._children.length; _ref <= _ref2 ? num_c < _ref2 : num_c > _ref2; _ref <= _ref2 ? num_c++ : num_c--) {
        this._children[num_c].clear();
      }
      return this._children.splice(this._nb_bcs, size_splice);
    } else {
      size_child0_child = this._children.length;
      _results = [];
      for (num_c = size_child0_child, _ref3 = this._nb_bcs; size_child0_child <= _ref3 ? num_c < _ref3 : num_c > _ref3; size_child0_child <= _ref3 ? num_c++ : num_c--) {
        id_bc = this.ask_for_id_bc();
        name_temp = "BC_" + id_bc.toString();
        _results.push(this.add_child(new BoundaryConditionItem(name_temp, id_bc, this._dim)));
      }
      return _results;
    }
  };

  BoundaryConditionSetItem.prototype.set_filter_edge = function(edge_filter, bc_id) {
    this._parents[0]._parents[0].set_filter_edge(edge_filter, bc_id);
    return this.assign_edges_to_bcs();
  };

  BoundaryConditionSetItem.prototype.assign_edges_to_bcs = function() {
    var bc, edge, edge_filter, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      bc = _ref[_i];
      _results.push((function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = bc._children;
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          edge_filter = _ref2[_j];
          _results2.push((function() {
            var _k, _len3, _ref3, _results3;
            _ref3 = edge_filter._children;
            _results3 = [];
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              edge = _ref3[_k];
              if (parseInt(edge.bc_id) === -1) {
                _results3.push(edge.bc_id.set(bc._id));
              } else {
                _results3.push(void 0);
              }
            }
            return _results3;
          })());
        }
        return _results2;
      })());
    }
    return _results;
  };

  return BoundaryConditionSetItem;

})(TreeItem);
var VariableParameterItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
VariableParameterItem = (function() {
  __extends(VariableParameterItem, TreeItem);
  function VariableParameterItem(name) {
    if (name == null) {
      name = "VariableParameter";
    }
    VariableParameterItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      nominal_value: 0,
      min_value: 0,
      max_value: 1,
      nb_values: 1
    });
  }
  VariableParameterItem.prototype.accept_child = function(ch) {};
  VariableParameterItem.prototype.z_index = function() {};
  VariableParameterItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return VariableParameterItem;
})();var ScillsInterfaceSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsInterfaceSetItem = (function(_super) {

  __extends(ScillsInterfaceSetItem, _super);

  function ScillsInterfaceSetItem(app_data, panel_id) {
    var _this = this;
    this.app_data = app_data;
    this.panel_id = panel_id;
    ScillsInterfaceSetItem.__super__.constructor.call(this);
    this._name.set("Interface collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _interface_profile: new ScillsInterfaceItem,
      _mesh_profile: new Mesh
    });
    this.add_attr({
      visualization: this._mesh_profile.visualization
    });
    this.bind(function() {
      if (_this.visualization.has_been_modified()) {
        return _this.visualisation_interface_set();
      }
    });
  }

  ScillsInterfaceSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsInterfaceItem;
  };

  ScillsInterfaceSetItem.prototype.z_index = function() {};

  ScillsInterfaceSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsInterfaceSetItem.prototype.visualisation_interface_set = function() {
    var interface, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interface = _ref[_i];
      _results.push(interface.visualization.display_style.num.set(this.visualization.display_style.num.get()));
    }
    return _results;
  };

  ScillsInterfaceSetItem.prototype.get_interface = function(id_inter) {
    var inter, _i, _len, _ref;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      inter = _ref[_i];
      if (parseInt(inter.id) === parseInt(id_inter)) {
        return inter;
        break;
      }
    }
  };

  ScillsInterfaceSetItem.prototype.clear_link_id = function() {
    var inter, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      inter = _ref[_i];
      inter.link_id.set(parseInt(-1));
      _results.push(inter.group_id.set(parseInt(-1)));
    }
    return _results;
  };

  ScillsInterfaceSetItem.prototype.filter_interface = function(interface_filter, link_id, part_set) {
    var group, group_id, group_modulo, inter, materialIDs, modulo, modulo_id, out, piece1, piece2, piece_id, range, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _m, _n, _o, _p, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _results;
    if (interface_filter._children.lenght !== 0) {
      _ref = interface_filter._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        inter = _ref[_i];
        inter.link_id.set(parseInt(-1));
        inter.group_id.set(parseInt(-1));
      }
      interface_filter._children.clear();
    }
    if (interface_filter.type.toString() === "by id") {
      group = interface_filter.filter.toString().split(",");
      for (_j = 0, _len2 = group.length; _j < _len2; _j++) {
        group_id = group[_j];
        group_modulo = group_id.split("%");
        if (group_modulo.length === 2) {
          range = group_modulo[0].split("-");
          modulo_id = parseInt(group_modulo[1]);
          modulo = 0;
          out = true;
          while (out) {
            piece_id = [];
            if (range.length === 2) {
              piece_id[0] = parseFloat(range[0]) + modulo;
              piece_id[1] = parseFloat(range[1]) + modulo;
              _ref2 = this._children;
              for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
                inter = _ref2[_k];
                if (inter.id >= piece_id[0] && inter.id <= piece_id[1]) {
                  if (parseInt(inter.link_id) === -1 || parseInt(inter.link_id) === parseInt(link_id)) {
                    interface_filter.add_child(inter);
                    inter.link_id.set(parseInt(link_id));
                    inter.group_id.set(parseInt(interface_filter._id));
                  }
                }
              }
            } else if (range.length === 1) {
              piece_id[0] = parseFloat(range[0]) + modulo;
              _ref3 = this._children;
              for (_l = 0, _len4 = _ref3.length; _l < _len4; _l++) {
                inter = _ref3[_l];
                if (inter.id === piece_id[0]) {
                  if (parseInt(inter.link_id) === -1 || parseInt(inter.link_id) === parseInt(link_id)) {
                    interface_filter.add_child(inter);
                    inter.link_id.set(parseInt(link_id));
                    inter.group_id.set(parseInt(interface_filter._id));
                  }
                }
              }
            }
            modulo += modulo_id;
            if ((parseFloat(range[0]) + modulo) > this._children.length) {
              out = false;
              break;
            }
          }
        } else if (group_modulo.length === 1) {
          range = group_modulo[0].split("-");
          piece_id = [];
          if (range.length === 2) {
            piece_id[0] = parseFloat(range[0]);
            piece_id[1] = parseFloat(range[1]);
            _ref4 = this._children;
            for (_m = 0, _len5 = _ref4.length; _m < _len5; _m++) {
              inter = _ref4[_m];
              if (inter.id >= piece_id[0] && inter.id <= piece_id[1]) {
                if (parseInt(inter.link_id) === -1 || parseInt(inter.link_id) === parseInt(link_id)) {
                  interface_filter.add_child(inter);
                  inter.link_id.set(parseInt(link_id));
                  inter.group_id.set(parseInt(interface_filter._id));
                }
              }
            }
          } else if (range.length === 1) {
            piece_id[0] = parseFloat(range[0]);
            _ref5 = this._children;
            for (_n = 0, _len6 = _ref5.length; _n < _len6; _n++) {
              inter = _ref5[_n];
              if (parseInt(inter.id) === piece_id[0]) {
                if (parseInt(inter.link_id) === -1 || parseInt(inter.link_id) === parseInt(link_id)) {
                  interface_filter.add_child(inter);
                  inter.link_id.set(parseInt(link_id));
                  inter.group_id.set(parseInt(interface_filter._id));
                }
              }
            }
          }
        }
      }
    }
    if (interface_filter.type.toString() === "between materials") {
      group = interface_filter.filter.toString().split(",");
      if (group.length === 2) {
        _ref6 = this._children;
        for (_o = 0, _len7 = _ref6.length; _o < _len7; _o++) {
          inter = _ref6[_o];
          piece1 = part_set.get_part(inter.group_elements_id[0]);
          piece2 = part_set.get_part(inter.group_elements_id[1]);
          materialIDs = [parseInt(piece1.material_id), parseInt(piece2.material_id)];
          if (materialIDs.indexOf(parseInt(group[0])) !== -1 && materialIDs.indexOf(parseInt(group[1])) !== -1) {
            if (group[0] !== group[1] || (materialIDs[0] === materialIDs[1])) {
              interface_filter.add_child(inter);
              inter.link_id.set(parseInt(link_id));
              inter.group_id.set(parseInt(interface_filter._id));
            }
          }
        }
      }
    }
    if (interface_filter.type.toString() === "between groups") {
      group = interface_filter.filter.toString().split(",");
      if (group.length === 2) {
        _ref7 = this._children;
        _results = [];
        for (_p = 0, _len8 = _ref7.length; _p < _len8; _p++) {
          inter = _ref7[_p];
          piece1 = part_set.get_part(inter.group_elements_id[0]);
          piece2 = part_set.get_part(inter.group_elements_id[1]);
          materialIDs = [parseInt(piece1.group_id), parseInt(piece2.group_id)];
          if (materialIDs.indexOf(parseInt(group[0])) !== -1 && materialIDs.indexOf(parseInt(group[1])) !== -1) {
            if (group[0] !== group[1] || (materialIDs[0] === materialIDs[1])) {
              interface_filter.add_child(inter);
              inter.group_id.set(parseInt(interface_filter._id));
              _results.push(inter.link_id.set(parseInt(link_id)));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    }
  };

  return ScillsInterfaceSetItem;

})(TreeItem);
var ScillsPartItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsPartItem = (function(_super) {

  __extends(ScillsPartItem, _super);

  function ScillsPartItem(name) {
    if (name == null) name = "Part";
    ScillsPartItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
    this.add_attr({
      _mesh: new Mesh({
        not_editable: true
      }),
      name: this._name
    });
    this.add_attr({
      visualization: this._mesh.visualization,
      id: -1,
      material_id: -1,
      group_id: -1
    });
  }

  ScillsPartItem.prototype.cosmetic_attribute = function(name) {
    return ScillsPartItem.__super__.cosmetic_attribute.call(this, name) || (name === "_mesh" || name === "visualization");
  };

  ScillsPartItem.prototype.accept_child = function(ch) {};

  ScillsPartItem.prototype.z_index = function() {
    return this._mesh.z_index();
  };

  ScillsPartItem.prototype.sub_canvas_items = function() {
    return [this._mesh];
  };

  return ScillsPartItem;

})(TreeItem);
var DeepCopyItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
DeepCopyItem = (function() {
  __extends(DeepCopyItem, TreeItem);
  function DeepCopyItem(name) {
    if (name == null) {
      name = "deep_copy";
    }
    DeepCopyItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      compute_copy: false
    });
    this.bind(__bind(function() {
      if (this.compute_copy.has_been_modified() && (this._children[0] != null)) {
        return this.set_copy();
      }
    }, this));
  }
  DeepCopyItem.prototype.accept_child = function(ch) {
    return true;
  };
  DeepCopyItem.prototype.set_copy = function() {
    var copy;
    copy = this._children[0].deep_copy();
    copy._name.set(this._children[0]._name + "_copy");
    return this._children.push(copy);
  };
  return DeepCopyItem;
})();var LatinParamItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LatinParamItem = (function(_super) {

  __extends(LatinParamItem, _super);

  function LatinParamItem(name) {
    if (name == null) name = "Latin";
    LatinParamItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      max_iteration: new ConstrainedVal(100, {
        min: 50,
        max: 300,
        div: 250
      }),
      convergence_rate: new ConstrainedVal(0.00001, {
        min: 0.00001,
        max: 0.001,
        div: 99
      }),
      multiscale: new Bool(true)
    });
  }

  return LatinParamItem;

})(TreeItem);
var ScillsStructureItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsStructureItem = (function() {
  __extends(ScillsStructureItem, TreeItem);
  function ScillsStructureItem(name) {
    if (name == null) {
      name = "Structure";
    }
    ScillsStructureItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
  }
  ScillsStructureItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsAssemblyItem;
  };
  ScillsStructureItem.prototype.set_filter_part = function(part_filter, mat_id) {
    if (this._children[0] != null) {
      this._children[0].filter_part(part_filter, mat_id);
      return this._children[0].clear_material_id();
    }
  };
  ScillsStructureItem.prototype.set_filter_interface = function(interface_filter, link_id) {
    if (this._children[0] != null) {
      this._children[0].filter_interface(interface_filter, link_id);
      return this._children[0].clear_link_id();
    }
  };
  return ScillsStructureItem;
})();var ScillsMaterialItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsMaterialItem = (function(_super) {

  __extends(ScillsMaterialItem, _super);

  function ScillsMaterialItem(name, id_mat, dim) {
    var dammage_isotrop_mat, elastic_isotrop_mat, elastic_orthotrop_mat, mesomodel_mat, plastic_isotrop_mat,
      _this = this;
    if (name == null) name = "Material";
    if (id_mat == null) id_mat = 0;
    if (dim == null) dim = 3;
    ScillsMaterialItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_part_filters: 1,
      alias: this._name,
      _id: id_mat,
      _info_ok: parseInt(0),
      _dim: dim
    });
    this.add_attr({
      type: new Choice
    });
    elastic_isotrop_mat = new ElasticIsotropMaterial;
    elastic_orthotrop_mat = new ElasticOrthotropMaterial(this._dim);
    plastic_isotrop_mat = new PlasticIsotropMaterial;
    dammage_isotrop_mat = new DammageIsotropMaterial;
    mesomodel_mat = new MesomodelMaterial(this._dim);
    this.type.lst.push(elastic_isotrop_mat);
    this.type.lst.push(elastic_orthotrop_mat);
    this.type.lst.push(plastic_isotrop_mat);
    this.type.lst.push(dammage_isotrop_mat);
    this.type.lst.push(mesomodel_mat);
    this.add_context_actions({
      txt: "add part filter",
      ico: "data:image/png;base64,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",
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
      ico: "data:image/png;base64,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",
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

  ScillsMaterialItem.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["type"] = ModelEditorItem_ChoiceWithEditableItems;
  };

  ScillsMaterialItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartFilterItem;
  };

  ScillsMaterialItem.prototype.z_index = function() {};

  ScillsMaterialItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsMaterialItem.prototype.set_filter_part = function(part_filter) {
    return this._parents[0]._parents[0].set_filter_part(part_filter, this._id);
  };

  ScillsMaterialItem.prototype.ask_for_id_group = function() {
    return this._parents[0]._parents[0].ask_for_id_group();
  };

  ScillsMaterialItem.prototype.change_collection = function() {
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

  ScillsMaterialItem.prototype.information = function(div) {
    if (this._info_ok < 2) {
      this.txt = new_dom_element({
        parentNode: div
      });
      this.txt.innerHTML = "                  id : " + this._id + " <br>              ";
      return this._info_ok.set(parseInt(this._info_ok) + 1);
    }
  };

  return ScillsMaterialItem;

})(TreeItem);
var ParametricListItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ParametricListItem = (function(_super) {

  __extends(ParametricListItem, _super);

  function ParametricListItem(name_param, id_param, values) {
    var _this = this;
    if (name_param == null) name_param = "Parametric List";
    if (id_param == null) id_param = -1;
    if (values == null) values = [];
    ParametricListItem.__super__.constructor.call(this);
    this._name.set(name_param);
    this._viewable.set(false);
    this.add_attr({
      _values: values,
      _size: 0,
      name: this._name,
      id: id_param
    });
    this.bind(function() {
      if (_this._values.has_been_modified()) {
        return _this._size.set(_this.length());
      }
    });
  }

  ParametricListItem.prototype.accept_child = function(ch) {};

  ParametricListItem.prototype.z_index = function() {};

  ParametricListItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ParametricListItem.prototype.length = function() {
    return this._values.length;
  };

  return ParametricListItem;

})(TreeItem);
var LatinComputationItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
LatinComputationItem = (function() {
  __extends(LatinComputationItem, TreeItem);
  function LatinComputationItem(name) {
    if (name == null) {
      name = "LatinComputation";
    }
    LatinComputationItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_child(new LatinParametersItem("Computation parameters"));
    this.add_child(new MaterialAssignationItem);
    this.add_child(new LinkAssignationItem);
    this.add_child(new BoundaryConditionAssignationItem);
    this.add_attr({
      name: name,
      description: "description"
    });
  }
  LatinComputationItem.prototype.accept_child = function(ch) {};
  LatinComputationItem.prototype.z_index = function() {};
  LatinComputationItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return LatinComputationItem;
})();var TemporalParameterSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TemporalParameterSetItem = (function() {
  __extends(TemporalParameterSetItem, TreeItem);
  function TemporalParameterSetItem() {
    TemporalParameterSetItem.__super__.constructor.call(this);
    this._name.set("Temporal parameter collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
  }
  TemporalParameterSetItem.prototype.accept_child = function(ch) {};
  TemporalParameterSetItem.prototype.z_index = function() {};
  TemporalParameterSetItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return TemporalParameterSetItem;
})();var ScillsPartSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsPartSetItem = (function(_super) {

  __extends(ScillsPartSetItem, _super);

  function ScillsPartSetItem(app_data, panel_id) {
    var _this = this;
    this.app_data = app_data;
    this.panel_id = panel_id;
    ScillsPartSetItem.__super__.constructor.call(this);
    this._name.set("Part collection");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _part_profile: new ScillsPartItem,
      _mesh_profile: new Mesh
    });
    this.add_attr({
      visualization: this._mesh_profile.visualization
    });
    this.bind(function() {
      if (_this.visualization.has_been_modified()) {
        return _this.visualisation_part_set();
      }
    });
  }

  ScillsPartSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartItem;
  };

  ScillsPartSetItem.prototype.z_index = function() {};

  ScillsPartSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsPartSetItem.prototype.visualisation_part_set = function() {
    var part, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      _results.push(part.visualization.display_style.num.set(this.visualization.display_style.num.get()));
    }
    return _results;
  };

  ScillsPartSetItem.prototype.get_part = function(id_part) {
    var part, _i, _len, _ref;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      if (parseInt(part.id) === parseInt(id_part)) {
        return part;
        break;
      }
    }
  };

  ScillsPartSetItem.prototype.clear_material_id = function() {
    var part, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      part.material_id.set(parseInt(-1));
      _results.push(part.group_id.set(parseInt(-1)));
    }
    return _results;
  };

  ScillsPartSetItem.prototype.filter_part = function(part_filter, mat_id) {
    var filter, group, group_id, group_modulo, modulo, modulo_id, out, part, piece_id, range, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _results, _results2, _results3, _results4;
    if (part_filter._children.lenght !== 0) {
      _ref = part_filter._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        part.material_id.set(parseInt(-1));
        part.group_id.set(parseInt(-1));
      }
      part_filter._children.clear();
    }
    if (part_filter.type.toString() === "all") {
      _ref2 = this._children;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        part = _ref2[_j];
        if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
          part_filter.add_child(part);
          part.material_id.set(parseInt(mat_id));
          _results.push(part.group_id.set(parseInt(part_filter._id)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else if (part_filter.type.toString() === "by name") {
      if (part_filter.filter.toString().match('[\*]')) {
        filter = part_filter.filter.toString().substring(0, part_filter.filter.toString().length - 1);
        _ref3 = this._children;
        _results2 = [];
        for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
          part = _ref3[_k];
          if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
            if (part._name.toString().match(filter.toString())) {
              part_filter.add_child(part);
              part.material_id.set(parseInt(mat_id));
              _results2.push(part.group_id.set(parseInt(part_filter._id)));
            } else {
              _results2.push(void 0);
            }
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      } else {
        filter = part_filter.filter.toString();
        _ref4 = this._children;
        _results3 = [];
        for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
          part = _ref4[_l];
          if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
            if (part._name.toString() === filter.toString()) {
              part_filter.add_child(part);
              part.material_id.set(parseInt(mat_id));
              _results3.push(part.group_id.set(parseInt(part_filter._id)));
            } else {
              _results3.push(void 0);
            }
          } else {
            _results3.push(void 0);
          }
        }
        return _results3;
      }
    } else if (part_filter.type.toString() === "by id") {
      group = part_filter.filter.toString().split(",");
      _results4 = [];
      for (_m = 0, _len5 = group.length; _m < _len5; _m++) {
        group_id = group[_m];
        group_modulo = group_id.split("%");
        if (group_modulo.length === 2) {
          range = group_modulo[0].split("-");
          modulo_id = parseInt(group_modulo[1]);
          modulo = 0;
          out = true;
          _results4.push((function() {
            var _len6, _len7, _n, _o, _ref5, _ref6, _results5;
            _results5 = [];
            while (out) {
              piece_id = [];
              if (range.length === 2) {
                piece_id[0] = parseFloat(range[0]) + modulo;
                piece_id[1] = parseFloat(range[1]) + modulo;
                _ref5 = this._children;
                for (_n = 0, _len6 = _ref5.length; _n < _len6; _n++) {
                  part = _ref5[_n];
                  if (part.id >= piece_id[0] && part.id <= piece_id[1]) {
                    if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
                      part_filter.add_child(part);
                      part.material_id.set(parseInt(mat_id));
                      part.group_id.set(parseInt(part_filter._id));
                    }
                  }
                }
              } else if (range.length === 1) {
                piece_id[0] = parseFloat(range[0]) + modulo;
                _ref6 = this._children;
                for (_o = 0, _len7 = _ref6.length; _o < _len7; _o++) {
                  part = _ref6[_o];
                  if (part.id === piece_id[0]) {
                    if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
                      part_filter.add_child(part);
                      part.material_id.set(parseInt(mat_id));
                      part.group_id.set(parseInt(part_filter._id));
                    }
                  }
                }
              }
              modulo += modulo_id;
              if ((parseFloat(range[0]) + modulo) > this._children.length) {
                out = false;
                break;
              } else {
                _results5.push(void 0);
              }
            }
            return _results5;
          }).call(this));
        } else if (group_modulo.length === 1) {
          range = group_modulo[0].split("-");
          piece_id = [];
          if (range.length === 2) {
            piece_id[0] = parseFloat(range[0]);
            piece_id[1] = parseFloat(range[1]);
            _results4.push((function() {
              var _len6, _n, _ref5, _results5;
              _ref5 = this._children;
              _results5 = [];
              for (_n = 0, _len6 = _ref5.length; _n < _len6; _n++) {
                part = _ref5[_n];
                if (part.id >= piece_id[0] && part.id <= piece_id[1]) {
                  if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
                    part_filter.add_child(part);
                    part.material_id.set(parseInt(mat_id));
                    _results5.push(part.group_id.set(parseInt(part_filter._id)));
                  } else {
                    _results5.push(void 0);
                  }
                } else {
                  _results5.push(void 0);
                }
              }
              return _results5;
            }).call(this));
          } else if (range.length === 1) {
            piece_id[0] = parseFloat(range[0]);
            _results4.push((function() {
              var _len6, _n, _ref5, _results5;
              _ref5 = this._children;
              _results5 = [];
              for (_n = 0, _len6 = _ref5.length; _n < _len6; _n++) {
                part = _ref5[_n];
                if (parseInt(part.id) === piece_id[0]) {
                  if (parseInt(part.material_id) === -1 || parseInt(part.material_id) === parseInt(mat_id)) {
                    part_filter.add_child(part);
                    part.material_id.set(parseInt(mat_id));
                    _results5.push(part.group_id.set(parseInt(part_filter._id)));
                  } else {
                    _results5.push(void 0);
                  }
                } else {
                  _results5.push(void 0);
                }
              }
              return _results5;
            }).call(this));
          } else {
            _results4.push(void 0);
          }
        } else {
          _results4.push(void 0);
        }
      }
      return _results4;
    }
  };

  return ScillsPartSetItem;

})(TreeItem);
var ScillsLinkItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScillsLinkItem = (function(_super) {

  __extends(ScillsLinkItem, _super);

  function ScillsLinkItem(name, id_link) {
    var cohesive_link, contact_link, elastic_breakable_link, elastic_link, perfect_breakable_link, perfect_link,
      _this = this;
    if (name == null) name = "Link";
    if (id_link == null) id_link = 0;
    ScillsLinkItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(false);
    this.add_attr({
      _nb_link_filters: 1,
      alias: this._name,
      _id: id_link,
      _info_ok: parseInt(0)
    });
    this.add_attr({
      type: new Choice
    });
    perfect_link = new PerfectLink;
    perfect_breakable_link = new PerfectBreakableLink;
    contact_link = new ContactLink;
    elastic_link = new ElasticLink;
    elastic_breakable_link = new ElasticBreakableLink;
    cohesive_link = new CohesivLink;
    this.type.lst.push(perfect_link);
    this.type.lst.push(perfect_breakable_link);
    this.type.lst.push(contact_link);
    this.type.lst.push(elastic_link);
    this.type.lst.push(elastic_breakable_link);
    this.type.lst.push(cohesive_link);
    this.add_context_actions({
      txt: "add link filter",
      ico: "data:image/png;base64,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",
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
      ico: "data:image/png;base64,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",
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

  ScillsLinkItem.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["type"] = ModelEditorItem_ChoiceWithEditableItems;
  };

  ScillsLinkItem.prototype.accept_child = function(ch) {};

  ScillsLinkItem.prototype.z_index = function() {};

  ScillsLinkItem.prototype.sub_canvas_items = function() {
    return [];
  };

  ScillsLinkItem.prototype.set_filter_interface = function(interface_filter) {
    return this._parents[0]._parents[0].set_filter_interface(interface_filter, this._id);
  };

  ScillsLinkItem.prototype.ask_for_id_group = function() {
    return this._parents[0]._parents[0].ask_for_id_group();
  };

  ScillsLinkItem.prototype.change_collection = function() {
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

  ScillsLinkItem.prototype.information = function(div) {
    if (this._info_ok < 2) {
      this.txt = new_dom_element({
        parentNode: div
      });
      this.txt.innerHTML = "                  id : " + this._id + " <br>              ";
      return this._info_ok.set(parseInt(this._info_ok) + 1);
    }
  };

  return ScillsLinkItem;

})(TreeItem);
var CineticBC,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CineticBC = (function(_super) {

  __extends(CineticBC, _super);

  function CineticBC(dim) {
    if (dim == null) dim = 3;
    CineticBC.__super__.constructor.call(this);
    this.add_attr({
      _point: new Point,
      _name: "cinetic torseur",
      _num_type: 0,
      _dim: dim
    });
    this.add_attr({
      point: this._point
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        direction_0: [1, 0, 0],
        direction_1: [0, 1, 0],
        direction_2: [0, 0, 1],
        resultante: ["0", "0", "0"],
        moment: ["0", "0", "0"],
        imp_resultante: [0, 0, 0],
        imp_moment: [0, 0, 0]
      });
    } else {
      this.add_attr({
        direction_0: [1, 0],
        direction_1: [0, 1],
        resultante: ["0", "0"],
        moment: ["0", "0"],
        imp_resultante: [0, 0],
        imp_moment: [0, 0]
      });
    }
  }

  CineticBC.prototype.toString = function() {
    return this._name.get();
  };

  CineticBC.prototype.accept_child = function(ch) {};

  CineticBC.prototype.z_index = function() {
    return this._point.z_index();
  };

  CineticBC.prototype.sub_canvas_items = function() {
    return [this._point];
  };

  return CineticBC;

})(Model);
var UndefinedEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
UndefinedEdgeFilter = (function() {
  __extends(UndefinedEdgeFilter, Model);
  function UndefinedEdgeFilter() {
    UndefinedEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "undefined"
    });
  }
  UndefinedEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  UndefinedEdgeFilter.prototype.accept_child = function(ch) {};
  UndefinedEdgeFilter.prototype.z_index = function() {};
  UndefinedEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return UndefinedEdgeFilter;
})();var OnSphereEdgeFilter,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

OnSphereEdgeFilter = (function(_super) {

  __extends(OnSphereEdgeFilter, _super);

  function OnSphereEdgeFilter(dim) {
    if (dim == null) dim = 3;
    OnSphereEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "on_sphere",
      _dim: dim,
      radius: 0,
      epsilon: new ConstrainedVal(10, {
        min: 1,
        max: 100,
        div: 99
      })
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0]
      });
    }
  }

  OnSphereEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };

  OnSphereEdgeFilter.prototype.accept_child = function(ch) {};

  OnSphereEdgeFilter.prototype.z_index = function() {};

  OnSphereEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };

  return OnSphereEdgeFilter;

})(Model);
var NormalDisplacementBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
NormalDisplacementBC = (function() {
  __extends(NormalDisplacementBC, Model);
  function NormalDisplacementBC() {
    NormalDisplacementBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "normal displacement",
      _num_type: 1,
      space_function: "0"
    });
  }
  NormalDisplacementBC.prototype.toString = function() {
    return this._name.get();
  };
  NormalDisplacementBC.prototype.accept_child = function(ch) {};
  NormalDisplacementBC.prototype.z_index = function() {};
  NormalDisplacementBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return NormalDisplacementBC;
})();var MesomodelMaterial;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MesomodelMaterial = (function() {
  __extends(MesomodelMaterial, Model);
  function MesomodelMaterial(dim) {
    if (dim == null) {
      dim = 3;
    }
    MesomodelMaterial.__super__.constructor.call(this);
    this.add_attr({
      _name: "mesomodel",
      _type_num: 4,
      _type_plast: "0",
      _type_endo: "0",
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        main_directions: {
          direction_1: [1, 0, 0],
          direction_2: [0, 1, 0],
          direction_3: [0, 0, 1]
        },
        generic: {
          alpha: ["1e-6", "1e-6", "1e-6"],
          density: "2000"
        },
        elasticity: {
          E: ["200000", "200000", "200000"],
          nu: ["0.3", "0.3", "0.3"],
          G: ["0", "0", "0"]
        }
      });
    } else {
      this.add_attr({
        main_directions: {
          direction_1: [1, 0],
          direction_2: [0, 1]
        },
        generic: {
          alpha: ["1e-6", "1e-6"],
          density: "2000"
        },
        elasticity: {
          E: ["200000", "200000"],
          nu: ["0.3", "0.3"],
          G: ["0", "0"]
        }
      });
    }
    this.add_attr({
      dammage: {
        Yo: "0",
        Yc: "0",
        Ycf: "0",
        dmax: "0",
        bc: "0",
        a: "0",
        tau: "0"
      }
    });
  }
  MesomodelMaterial.prototype.toString = function() {
    return this._name.get();
  };
  MesomodelMaterial.prototype.accept_child = function(ch) {};
  MesomodelMaterial.prototype.z_index = function() {};
  MesomodelMaterial.prototype.sub_canvas_items = function() {
    return [];
  };
  return MesomodelMaterial;
})();var DisplacementBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
DisplacementBC = (function() {
  __extends(DisplacementBC, Model);
  function DisplacementBC(dim) {
    if (dim == null) {
      dim = 3;
    }
    DisplacementBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "displacement",
      _num_type: 0,
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        space_function: ["0", "0", "0"]
      });
    } else {
      this.add_attr({
        space_function: ["0", "0"]
      });
    }
  }
  DisplacementBC.prototype.toString = function() {
    return this._name.get();
  };
  DisplacementBC.prototype.accept_child = function(ch) {};
  DisplacementBC.prototype.z_index = function() {};
  DisplacementBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return DisplacementBC;
})();var ElasticOrthotropMaterial;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ElasticOrthotropMaterial = (function() {
  __extends(ElasticOrthotropMaterial, Model);
  function ElasticOrthotropMaterial(dim) {
    if (dim == null) {
      dim = 3;
    }
    ElasticOrthotropMaterial.__super__.constructor.call(this);
    this.add_attr({
      _name: "orthotropic elastic",
      _type_num: 1,
      _type_plast: "0",
      _type_endo: "0",
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        main_directions: {
          direction_1: [1, 0, 0],
          direction_2: [0, 1, 0],
          direction_3: [0, 0, 1]
        },
        generic: {
          alpha: ["1e-6", "1e-6", "1e-6"],
          density: "2000"
        },
        elasticity: {
          E: ["200000", "200000", "200000"],
          nu: ["0.3", "0.3", "0.3"],
          G: ["0", "0", "0"]
        }
      });
    } else {
      this.add_attr({
        main_directions: {
          direction_1: [1, 0],
          direction_2: [0, 1]
        },
        generic: {
          alpha: ["1e-6", "1e-6"],
          density: "2000"
        },
        elasticity: {
          E: ["200000", "200000"],
          nu: ["0.3", "0.3"],
          G: ["0", "0"]
        }
      });
    }
  }
  ElasticOrthotropMaterial.prototype.toString = function() {
    return this._name.get();
  };
  ElasticOrthotropMaterial.prototype.accept_child = function(ch) {};
  ElasticOrthotropMaterial.prototype.z_index = function() {};
  ElasticOrthotropMaterial.prototype.sub_canvas_items = function() {
    return [];
  };
  return ElasticOrthotropMaterial;
})();var InSphereEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
InSphereEdgeFilter = (function() {
  __extends(InSphereEdgeFilter, Model);
  function InSphereEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    InSphereEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "in_sphere",
      _dim: dim,
      radius: 0
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0]
      });
    }
  }
  InSphereEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  InSphereEdgeFilter.prototype.accept_child = function(ch) {};
  InSphereEdgeFilter.prototype.z_index = function() {};
  InSphereEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return InSphereEdgeFilter;
})();var SpeedBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
SpeedBC = (function() {
  __extends(SpeedBC, Model);
  function SpeedBC(dim) {
    if (dim == null) {
      dim = 3;
    }
    SpeedBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "Speed",
      _num_type: 3,
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        space_function: ["0", "0", "0"]
      });
    } else {
      this.add_attr({
        space_function: ["0", "0"]
      });
    }
  }
  SpeedBC.prototype.toString = function() {
    return this._name.get();
  };
  SpeedBC.prototype.accept_child = function(ch) {};
  SpeedBC.prototype.z_index = function() {};
  SpeedBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return SpeedBC;
})();var NormalStressDensityBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
NormalStressDensityBC = (function() {
  __extends(NormalStressDensityBC, Model);
  function NormalStressDensityBC() {
    NormalStressDensityBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "normal stress density",
      _num_type: 6,
      space_function: "0"
    });
  }
  NormalStressDensityBC.prototype.toString = function() {
    return this._name.get();
  };
  NormalStressDensityBC.prototype.accept_child = function(ch) {};
  NormalStressDensityBC.prototype.z_index = function() {};
  NormalStressDensityBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return NormalStressDensityBC;
})();var PerfectBreakableLink,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PerfectBreakableLink = (function(_super) {

  __extends(PerfectBreakableLink, _super);

  function PerfectBreakableLink() {
    PerfectBreakableLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "perfect breakable",
      _type_num: 3,
      thickness: "0",
      Fc_n: "0",
      Fc_t: "0",
      friction: "0.3"
    });
  }

  PerfectBreakableLink.prototype.toString = function() {
    return this._name.get();
  };

  PerfectBreakableLink.prototype.accept_child = function(ch) {};

  PerfectBreakableLink.prototype.z_index = function() {};

  PerfectBreakableLink.prototype.sub_canvas_items = function() {
    return [];
  };

  return PerfectBreakableLink;

})(Model);
var DammageIsotropMaterial;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
DammageIsotropMaterial = (function() {
  __extends(DammageIsotropMaterial, Model);
  function DammageIsotropMaterial() {
    DammageIsotropMaterial.__super__.constructor.call(this);
    this.add_attr({
      _name: "isotropic damageable",
      _type_num: 3,
      _type_plast: 0,
      _type_endo: 1,
      generic: {
        alpha: 1e-6,
        density: 2000
      },
      elasticity: {
        E: 200000,
        nu: 0.3
      },
      dammage: {
        Yo: 0,
        dmax: 0,
        bc: 0
      }
    });
  }
  DammageIsotropMaterial.prototype.toString = function() {
    return this._name.get();
  };
  DammageIsotropMaterial.prototype.accept_child = function(ch) {};
  DammageIsotropMaterial.prototype.z_index = function() {};
  DammageIsotropMaterial.prototype.sub_canvas_items = function() {
    return [];
  };
  return DammageIsotropMaterial;
})();var OnCylinderEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
OnCylinderEdgeFilter = (function() {
  __extends(OnCylinderEdgeFilter, Model);
  function OnCylinderEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    OnCylinderEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "on_cylinder",
      _dim: dim,
      radius: 0
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0],
        direction: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0],
        direction: [0, 0]
      });
    }
  }
  OnCylinderEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  OnCylinderEdgeFilter.prototype.accept_child = function(ch) {};
  OnCylinderEdgeFilter.prototype.z_index = function() {};
  OnCylinderEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return OnCylinderEdgeFilter;
})();var InCylinderEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
InCylinderEdgeFilter = (function() {
  __extends(InCylinderEdgeFilter, Model);
  function InCylinderEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    InCylinderEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "in_cylinder",
      _dim: dim,
      radius: 0
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0],
        direction: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0],
        direction: [0, 0]
      });
    }
  }
  InCylinderEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  InCylinderEdgeFilter.prototype.accept_child = function(ch) {};
  InCylinderEdgeFilter.prototype.z_index = function() {};
  InCylinderEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return InCylinderEdgeFilter;
})();var LinkBehaviourBoltConnector,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LinkBehaviourBoltConnector = (function(_super) {

  __extends(LinkBehaviourBoltConnector, _super);

  function LinkBehaviourBoltConnector() {
    LinkBehaviourBoltConnector.__super__.constructor.call(this);
    this.add_attr({
      _name: "bolt connector",
      _type_num: 100,
      thickness: new NormalOrDimVector,
      rayon_cone: "0"
    });
  }

  LinkBehaviourBoltConnector.prototype.toString = function() {
    return this._name.get();
  };

  LinkBehaviourBoltConnector.prototype.accept_child = function(ch) {};

  LinkBehaviourBoltConnector.prototype.z_index = function() {};

  LinkBehaviourBoltConnector.prototype.sub_canvas_items = function() {
    return [];
  };

  return LinkBehaviourBoltConnector;

})(Model);
var LinkPreloadAttribute,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LinkPreloadAttribute = (function(_super) {

  __extends(LinkPreloadAttribute, _super);

  function LinkPreloadAttribute() {
    LinkPreloadAttribute.__super__.constructor.call(this);
    this.add_attr({
      _name: "preload",
      _type_num: 2,
      preload: "0"
    });
  }

  LinkPreloadAttribute.prototype.toString = function() {
    return this._name.get();
  };

  LinkPreloadAttribute.prototype.accept_child = function(ch) {};

  LinkPreloadAttribute.prototype.z_index = function() {};

  LinkPreloadAttribute.prototype.sub_canvas_items = function() {
    return [];
  };

  return LinkPreloadAttribute;

})(Model);
var SymetrytBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
SymetrytBC = (function() {
  __extends(SymetrytBC, Model);
  function SymetrytBC() {
    SymetrytBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "symetry",
      _num_type: 2
    });
  }
  SymetrytBC.prototype.toString = function() {
    return this._name.get();
  };
  SymetrytBC.prototype.accept_child = function(ch) {};
  SymetrytBC.prototype.z_index = function() {};
  SymetrytBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return SymetrytBC;
})();var PlasticIsotropMaterial;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PlasticIsotropMaterial = (function() {
  __extends(PlasticIsotropMaterial, Model);
  function PlasticIsotropMaterial() {
    PlasticIsotropMaterial.__super__.constructor.call(this);
    this.add_attr({
      _name: "isotropic plastic",
      _type_num: 2,
      _type_plast: "1",
      _type_endo: "0",
      generic: {
        alpha: "1e-6",
        density: "2000"
      },
      elasticity: {
        E: "200000",
        nu: "0.3"
      },
      plasticity: {
        R0: "0",
        Kp: "0",
        Mp: "0",
        C: "0"
      }
    });
  }
  PlasticIsotropMaterial.prototype.toString = function() {
    return this._name.get();
  };
  PlasticIsotropMaterial.prototype.accept_child = function(ch) {};
  PlasticIsotropMaterial.prototype.z_index = function() {};
  PlasticIsotropMaterial.prototype.sub_canvas_items = function() {
    return [];
  };
  return PlasticIsotropMaterial;
})();var ElasticIsotropMaterial;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ElasticIsotropMaterial = (function() {
  __extends(ElasticIsotropMaterial, Model);
  function ElasticIsotropMaterial() {
    ElasticIsotropMaterial.__super__.constructor.call(this);
    this.add_attr({
      _name: "isotropic elastic",
      _type_num: 0,
      _type_plast: "0",
      _type_endo: "0",
      generic: {
        alpha: "1e-6",
        density: "2000"
      },
      elasticity: {
        E: "200000",
        nu: "0.3"
      }
    });
  }
  ElasticIsotropMaterial.prototype.toString = function() {
    return this._name.get();
  };
  ElasticIsotropMaterial.prototype.accept_child = function(ch) {};
  ElasticIsotropMaterial.prototype.z_index = function() {};
  ElasticIsotropMaterial.prototype.sub_canvas_items = function() {
    return [];
  };
  return ElasticIsotropMaterial;
})();var InBoxEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
InBoxEdgeFilter = (function() {
  __extends(InBoxEdgeFilter, Model);
  function InBoxEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    InBoxEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "in_box",
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point_1: [0, 0, 0],
        point_2: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point_1: [0, 0],
        point_2: [0, 0]
      });
    }
  }
  InBoxEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  InBoxEdgeFilter.prototype.accept_child = function(ch) {};
  InBoxEdgeFilter.prototype.z_index = function() {};
  InBoxEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return InBoxEdgeFilter;
})();var OnPlanEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
OnPlanEdgeFilter = (function() {
  __extends(OnPlanEdgeFilter, Model);
  function OnPlanEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    OnPlanEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "on_plan",
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0],
        direction: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0],
        direction: [0, 0]
      });
    }
  }
  OnPlanEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  OnPlanEdgeFilter.prototype.accept_child = function(ch) {};
  OnPlanEdgeFilter.prototype.z_index = function() {};
  OnPlanEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return OnPlanEdgeFilter;
})();var LinkThicknessAttribute,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LinkThicknessAttribute = (function(_super) {

  __extends(LinkThicknessAttribute, _super);

  function LinkThicknessAttribute() {
    LinkThicknessAttribute.__super__.constructor.call(this);
    this.add_attr({
      _name: "thickness",
      _type_num: 0,
      thickness: z
    });
  }

  LinkThicknessAttribute.prototype.toString = function() {
    return this._name.get();
  };

  LinkThicknessAttribute.prototype.accept_child = function(ch) {};

  LinkThicknessAttribute.prototype.z_index = function() {};

  LinkThicknessAttribute.prototype.sub_canvas_items = function() {
    return [];
  };

  return LinkThicknessAttribute;

})(Model);
var ContactLink;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ContactLink = (function() {
  __extends(ContactLink, Model);
  function ContactLink() {
    ContactLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "contact",
      _type_num: 2,
      thickness: "0",
      friction: "0.3"
    });
  }
  ContactLink.prototype.toString = function() {
    return this._name.get();
  };
  ContactLink.prototype.accept_child = function(ch) {};
  ContactLink.prototype.z_index = function() {};
  ContactLink.prototype.sub_canvas_items = function() {
    return [];
  };
  return ContactLink;
})();var CohesivLink;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
CohesivLink = (function() {
  __extends(CohesivLink, Model);
  function CohesivLink() {
    CohesivLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "cohesiv",
      _type_num: 5,
      thickness: "0",
      normal_rigidity: "2000",
      tangent_rigidity: "2000",
      compression_rigidity: "2000",
      Fc_n: "1000",
      Fc_t: "1000",
      friction: "0.3",
      Yo: "0",
      Yc: "0",
      alpha: "0",
      gamma: "0",
      n: "0"
    });
  }
  CohesivLink.prototype.toString = function() {
    return this._name.get();
  };
  CohesivLink.prototype.accept_child = function(ch) {};
  CohesivLink.prototype.z_index = function() {};
  CohesivLink.prototype.sub_canvas_items = function() {
    return [];
  };
  return CohesivLink;
})();var PerfectLink,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PerfectLink = (function(_super) {

  __extends(PerfectLink, _super);

  function PerfectLink() {
    PerfectLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "perfect",
      _type_num: 0,
      thickness: "0"
    });
  }

  PerfectLink.prototype.toString = function() {
    return this._name.get();
  };

  PerfectLink.prototype.accept_child = function(ch) {};

  PerfectLink.prototype.z_index = function() {};

  PerfectLink.prototype.sub_canvas_items = function() {
    return [];
  };

  return PerfectLink;

})(Model);
var OrientedDisplacementBC,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

OrientedDisplacementBC = (function(_super) {

  __extends(OrientedDisplacementBC, _super);

  function OrientedDisplacementBC(dim) {
    if (dim == null) dim = 3;
    OrientedDisplacementBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "oriented displacement",
      _num_type: 0,
      _dim: dim,
      displacement: 0
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        orientation: ["0", "0", "0"]
      });
    } else {
      this.add_attr({
        orientation: ["0", "0"]
      });
    }
  }

  OrientedDisplacementBC.prototype.toString = function() {
    return this._name.get();
  };

  OrientedDisplacementBC.prototype.accept_child = function(ch) {};

  OrientedDisplacementBC.prototype.z_index = function() {};

  OrientedDisplacementBC.prototype.sub_canvas_items = function() {
    return [];
  };

  return OrientedDisplacementBC;

})(Model);
var ElasticBreakableLink;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ElasticBreakableLink = (function() {
  __extends(ElasticBreakableLink, Model);
  function ElasticBreakableLink() {
    ElasticBreakableLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "elastic breakable",
      _num_type: 4,
      thickness: "0",
      normal_rigidity: "2000",
      tangent_rigidity: "2000",
      compression_rigidity: "2000",
      Fc_n: "1000",
      Fc_t: "1000",
      friction: "0.3"
    });
  }
  ElasticBreakableLink.prototype.toString = function() {
    return this._name.get();
  };
  ElasticBreakableLink.prototype.accept_child = function(ch) {};
  ElasticBreakableLink.prototype.z_index = function() {};
  ElasticBreakableLink.prototype.sub_canvas_items = function() {
    return [];
  };
  return ElasticBreakableLink;
})();var ElasticLink;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ElasticLink = (function() {
  __extends(ElasticLink, Model);
  function ElasticLink() {
    ElasticLink.__super__.constructor.call(this);
    this.add_attr({
      _name: "elastic",
      _type_num: 1,
      thickness: "0",
      normal_rigidity: "2000",
      tangent_rigidity: "2000",
      compression_rigidity: "2000"
    });
  }
  ElasticLink.prototype.toString = function() {
    return this._name.get();
  };
  ElasticLink.prototype.accept_child = function(ch) {};
  ElasticLink.prototype.z_index = function() {};
  ElasticLink.prototype.sub_canvas_items = function() {
    return [];
  };
  return ElasticLink;
})();var NamedValue, NamedVector, NormalOrDimVector,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NamedVector = (function(_super) {

  __extends(NamedVector, _super);

  function NamedVector(name, data) {
    NamedVector.__super__.constructor.call(this, data);
    this.add_attr({
      _name: name
    });
    alert(this._name);
  }

  NamedVector.toString = function() {
    return this._name.get();
  };

  return NamedVector;

})(Vec);

NamedValue = (function(_super) {

  __extends(NamedValue, _super);

  function NamedValue(name, data) {
    NamedValue.__super__.constructor.call(this, data);
    this.add_attr({
      _name: name
    });
    alert(this._name);
  }

  NamedValue.toString = function() {
    return this._name.get();
  };

  return NamedValue;

})(Val);

NormalOrDimVector = (function(_super) {

  __extends(NormalOrDimVector, _super);

  function NormalOrDimVector(dim) {
    var full, normal;
    if (dim == null) dim = 3;
    NormalOrDimVector.__super__.constructor.call(this);
    this.add_attr({
      _dim: dim,
      value: new Choice
    });
    normal = new NamedValue("normal vector", 0);
    if (dim === 2) {
      full = new NamedVector("2D vector", [0, 0]);
    } else {
      full = new NamedVector("3D vector", [0, 0, 0]);
    }
    this.value.lst.push(full);
    this.value.lst.push(normal);
  }

  return NormalOrDimVector;

})(Model);
var OnDiscEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
OnDiscEdgeFilter = (function() {
  __extends(OnDiscEdgeFilter, Model);
  function OnDiscEdgeFilter(dim) {
    if (dim == null) {
      dim = 3;
    }
    OnDiscEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "on_disc",
      _dim: dim,
      radius: 0
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        point: [0, 0, 0],
        direction: [0, 0, 0]
      });
    } else {
      this.add_attr({
        point: [0, 0],
        direction: [0, 0]
      });
    }
  }
  OnDiscEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  OnDiscEdgeFilter.prototype.accept_child = function(ch) {};
  OnDiscEdgeFilter.prototype.z_index = function() {};
  OnDiscEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return OnDiscEdgeFilter;
})();var NormalSpeedBC;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
NormalSpeedBC = (function() {
  __extends(NormalSpeedBC, Model);
  function NormalSpeedBC() {
    NormalSpeedBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "normal speed",
      _num_type: 4,
      space_function: "0"
    });
  }
  NormalSpeedBC.prototype.toString = function() {
    return this._name.get();
  };
  NormalSpeedBC.prototype.accept_child = function(ch) {};
  NormalSpeedBC.prototype.z_index = function() {};
  NormalSpeedBC.prototype.sub_canvas_items = function() {
    return [];
  };
  return NormalSpeedBC;
})();var StressDensityBC,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

StressDensityBC = (function(_super) {

  __extends(StressDensityBC, _super);

  function StressDensityBC(dim) {
    if (dim == null) dim = 3;
    StressDensityBC.__super__.constructor.call(this);
    this.add_attr({
      _name: "Stress density",
      _num_type: 5,
      _dim: dim
    });
    if (parseInt(this._dim) === 3) {
      this.add_attr({
        space_function: ["0", "0", "0"]
      });
    } else {
      this.add_attr({
        space_function: ["0", "0"]
      });
    }
  }

  StressDensityBC.prototype.toString = function() {
    return this._name.get();
  };

  StressDensityBC.prototype.accept_child = function(ch) {};

  StressDensityBC.prototype.z_index = function() {};

  StressDensityBC.prototype.sub_canvas_items = function() {
    return [];
  };

  return StressDensityBC;

})(Model);
var ParametrizedEdgeFilter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ParametrizedEdgeFilter = (function() {
  __extends(ParametrizedEdgeFilter, Model);
  function ParametrizedEdgeFilter() {
    ParametrizedEdgeFilter.__super__.constructor.call(this);
    this.add_attr({
      _name: "parameterized",
      filter: ""
    });
  }
  ParametrizedEdgeFilter.prototype.toString = function() {
    return this._name.get();
  };
  ParametrizedEdgeFilter.prototype.accept_child = function(ch) {};
  ParametrizedEdgeFilter.prototype.z_index = function() {};
  ParametrizedEdgeFilter.prototype.sub_canvas_items = function() {
    return [];
  };
  return ParametrizedEdgeFilter;
})();