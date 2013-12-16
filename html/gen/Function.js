var SurfaceFunctionItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
SurfaceFunctionItem = (function() {
  __extends(SurfaceFunctionItem, TreeItem);
  function SurfaceFunctionItem(name) {
    if (name == null) {
      name = "function(x,y)";
    }
    SurfaceFunctionItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(true);
    this.add_attr({
      f_z: "x*y",
      x_bound: [-10, 10],
      y_bound: [-10, 10],
      nb_values: new ConstrainedVal(2, {
        min: 2,
        max: 50,
        div: 48
      }),
      x_axe_bound: [-10, 10],
      y_axe_bound: [-10, 10],
      z_axe_bound: [-10, 10],
      x_axe_scale: new ConstrainedVal(1, {
        min: 1,
        max: 100,
        div: 99
      }),
      y_axe_scale: new ConstrainedVal(1, {
        min: 1,
        max: 100,
        div: 99
      }),
      z_axe_scale: new ConstrainedVal(1, {
        min: 1,
        max: 100,
        div: 99
      }),
      _v1: new Vec,
      _v2: new Vec,
      _v3: new Vec,
      _v1_scale: new Vec,
      _v2_scale: new Vec,
      _v3_scale: new Vec,
      _mesh: new Mesh({
        not_editable: true
      }),
      _box: new Mesh({
        not_editable: true
      })
    });
    this.add_attr({
      visualization: this._mesh.visualization,
      _field: new NodalField(this._mesh)
    });
    this.visualization.display_style.num.set(1);
    this.bind(__bind(function() {
      if (this.f_z.has_been_modified() || this.z_axe_scale.has_been_modified() || this.z_axe_bound.has_been_modified() || this.y_bound.has_been_modified() || this.x_bound.has_been_modified() || this.nb_values.has_been_modified() || this.x_axe_bound.has_been_modified() || this.y_axe_bound.has_been_modified() || this.x_axe_scale.has_been_modified() || this.y_axe_scale.has_been_modified()) {
        this.make_mesh();
        return this.make_box();
      }
    }, this));
  }
  SurfaceFunctionItem.prototype.fill_v1_v2_v3 = function() {
    var i, j, str, val_f, x, y, _ref, _ref2, _ref3, _ref4, _ref5, _results;
    this._v1.clear();
    this._v2.clear();
    this._v3.clear();
    this._v1_scale.clear();
    this._v2_scale.clear();
    this._v3_scale.clear();
    this._field._data.resize(this._mesh.nb_points());
    for (i = 0, _ref = this.nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._v1.push(0);
      this._v2.push(0);
      this._v1_scale.push(0);
      this._v2_scale.push(0);
      this._v1[i].set(this.x_bound[0].get() + i * (this.x_bound[1].get() - this.x_bound[0].get()) / (this.nb_values.get() - 1));
      this._v2[i].set(this.y_bound[0].get() + i * (this.y_bound[1].get() - this.y_bound[0].get()) / (this.nb_values.get() - 1));
      for (j = 0, _ref2 = this.nb_values.get(); 0 <= _ref2 ? j < _ref2 : j > _ref2; 0 <= _ref2 ? j++ : j--) {
        this._v3.push(0);
        this._v3_scale.push(0);
      }
    }
    for (i = 0, _ref3 = this.nb_values.get(); 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      for (j = 0, _ref4 = this.nb_values.get(); 0 <= _ref4 ? j < _ref4 : j > _ref4; 0 <= _ref4 ? j++ : j--) {
        x = this._v1[i];
        y = this._v2[j];
        str = "x=" + x + "; y=" + y + "; val_z = " + this.f_z + ";";
        val_f = eval(str);
        this._v3[i * this.nb_values.get() + j].set(val_z);
      }
    }
    _results = [];
    for (i = 0, _ref5 = this.nb_values.get(); 0 <= _ref5 ? i < _ref5 : i > _ref5; 0 <= _ref5 ? i++ : i--) {
      this._v1_scale[i].set(this._v1[i].get() * this.x_axe_scale.get());
      this._v2_scale[i].set(this._v2[i].get() * this.y_axe_scale.get());
      _results.push((function() {
        var _ref6, _results2;
        _results2 = [];
        for (j = 0, _ref6 = this.nb_values.get(); 0 <= _ref6 ? j < _ref6 : j > _ref6; 0 <= _ref6 ? j++ : j--) {
          _results2.push(this._v3_scale[i * this.nb_values.get() + j].set(this._v3[i * this.nb_values.get() + j].get() * this.z_axe_scale.get()));
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };
  SurfaceFunctionItem.prototype.make_box = function() {
    var val, _i, _len, _ref;
    this._box.points.clear();
    this._box._elements.clear();
    if (this.x_axe_bound[0].get() > this.x_bound[0].get()) {
      this.x_axe_bound[0].set(this.x_bound[0].get());
    }
    if (this.x_axe_bound[1].get() > this.x_bound[1].get()) {
      this.x_axe_bound[1].set(this.x_bound[1].get());
    }
    if (this.y_axe_bound[0].get() > this.y_bound[0].get()) {
      this.y_axe_bound[0].set(this.y_bound[0].get());
    }
    if (this.y_axe_bound[1].get() > this.y_bound[1].get()) {
      this.y_axe_bound[1].set(this.y_bound[1].get());
    }
    _ref = this._v3;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      val = _ref[_i];
      if (this.z_axe_bound[0].get() > val.get()) {
        this.z_axe_bound[0].set(val.get());
      }
      if (this.z_axe_bound[1].get() < val.get()) {
        this.z_axe_bound[1].set(val.get());
      }
    }
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), this.z_axe_bound[0].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), this.z_axe_bound[0].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), this.z_axe_bound[0].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), this.z_axe_bound[0].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), this.z_axe_bound[1].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), this.z_axe_bound[1].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), this.z_axe_bound[1].get() * this.z_axe_scale.get()]);
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), this.z_axe_bound[1].get() * this.z_axe_scale.get()]);
    this._box.add_element(new Element_Line([0, 1]));
    this._box.add_element(new Element_Line([1, 2]));
    this._box.add_element(new Element_Line([2, 3]));
    this._box.add_element(new Element_Line([3, 0]));
    this._box.add_element(new Element_Line([4, 5]));
    this._box.add_element(new Element_Line([5, 6]));
    this._box.add_element(new Element_Line([6, 7]));
    this._box.add_element(new Element_Line([7, 4]));
    this._box.add_element(new Element_Line([0, 4]));
    this._box.add_element(new Element_Line([1, 5]));
    this._box.add_element(new Element_Line([2, 6]));
    this._box.add_element(new Element_Line([3, 7]));
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), 0, 0]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), 0, 0]);
    this._box.add_point([0, this.y_axe_bound[0].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([0, this.y_axe_bound[1].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([0, 0, this.z_axe_bound[0].get() * this.z_axe_scale.get()]);
    this._box.add_point([0, 0, this.z_axe_bound[1].get() * this.z_axe_scale.get()]);
    this._box.add_element(new Element_Line([8, 9]));
    this._box.add_element(new Element_Line([10, 11]));
    return this._box.add_element(new Element_Line([12, 13]));
  };
  SurfaceFunctionItem.prototype.make_mesh = function() {
    var el, i, j, num_element, pt_1, pt_2, pt_3, pt_4, _ref, _ref2, _ref3, _ref4, _ref5, _results;
    this.fill_v1_v2_v3();
    this._mesh.points.clear();
    this._mesh._elements.clear();
    for (i = 0, _ref = this.nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      for (j = 0, _ref2 = this.nb_values.get(); 0 <= _ref2 ? j < _ref2 : j > _ref2; 0 <= _ref2 ? j++ : j--) {
        this._mesh.add_point([this._v1_scale[i], this._v2_scale[j], this._v3_scale[i * this.nb_values.get() + j]]);
      }
    }
    el = new Element_TriangleList;
    el.indices.resize([3, 2 * (this.nb_values.get() - 1) * (this.nb_values.get() - 1)]);
    num_element = 0;
    for (i = 0, _ref3 = this.nb_values.get() - 1; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      for (j = 0, _ref4 = this.nb_values.get() - 1; 0 <= _ref4 ? j < _ref4 : j > _ref4; 0 <= _ref4 ? j++ : j--) {
        pt_1 = i * this.nb_values.get() + j;
        pt_2 = i * this.nb_values.get() + (j + 1);
        pt_3 = (i + 1) * this.nb_values.get() + j;
        pt_4 = (i + 1) * this.nb_values.get() + (j + 1);
        el.indices.set_val([0, num_element], pt_1);
        el.indices.set_val([1, num_element], pt_3);
        el.indices.set_val([2, num_element], pt_2);
        num_element += 1;
        el.indices.set_val([0, num_element], pt_4);
        el.indices.set_val([1, num_element], pt_2);
        el.indices.set_val([2, num_element], pt_3);
        num_element += 1;
      }
    }
    this._mesh.add_element(el);
    this._field._mesh = this._mesh;
    _results = [];
    for (i = 0, _ref5 = this._mesh.nb_points(); 0 <= _ref5 ? i < _ref5 : i > _ref5; 0 <= _ref5 ? i++ : i--) {
      _results.push(this._field._data.set_val([i], this._mesh.points[i].pos[2]));
    }
    return _results;
  };
  SurfaceFunctionItem.prototype.cosmetic_attribute = function(name) {
    return SurfaceFunctionItem.__super__.cosmetic_attribute.call(this, name) || (name === "_mesh" || name === "visualization");
  };
  SurfaceFunctionItem.prototype.accept_child = function(ch) {};
  SurfaceFunctionItem.prototype.sub_canvas_items = function() {
    return [this._mesh, this._box];
  };
  SurfaceFunctionItem.prototype.z_index = function() {
    return this._mesh.z_index();
  };
  SurfaceFunctionItem.prototype.disp_only_in_model_editor = function() {};
  return SurfaceFunctionItem;
})();var TFunctionItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TFunctionItem = (function(_super) {

  __extends(TFunctionItem, _super);

  function TFunctionItem(name) {
    var _this = this;
    if (name == null) name = "function(x)";
    TFunctionItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(true);
    this.add_attr({
      f_x: "x*x",
      x_bound: [-10, 10],
      nb_values: new ConstrainedVal(20, {
        min: 2,
        max: 100,
        div: 98
      }),
      x_axe_bound: [-10, 10],
      y_axe_bound: [-10, 10],
      x_axe_scale: new ConstrainedVal(1, {
        min: 1,
        max: 100,
        div: 99
      }),
      y_axe_scale: new ConstrainedVal(1, {
        min: 1,
        max: 100,
        div: 99
      }),
      _v1: new Vec,
      _v2: new Vec,
      _v1_scale: new Vec,
      _v2_scale: new Vec,
      _mesh: new Mesh({
        not_editable: true
      }),
      _box: new Mesh({
        not_editable: true
      })
    });
    this.add_attr({
      visualization: this._mesh.visualization
    });
    this.visualization.display_style.num.set(1);
    this.bind(function() {
      if (_this.f_x.has_been_modified() || _this.x_bound.has_been_modified() || _this.nb_values.has_been_modified() || _this.x_axe_bound.has_been_modified() || _this.y_axe_bound.has_been_modified() || _this.x_axe_scale.has_been_modified() || _this.y_axe_scale.has_been_modified()) {
        _this.make_mesh();
        return _this.make_box();
      }
    });
  }

  TFunctionItem.prototype.fill_v1_v2 = function() {
    var i, str, val_f, x, _ref, _ref2, _ref3, _results;
    this._v1.clear();
    this._v2.clear();
    this._v1_scale.clear();
    this._v2_scale.clear();
    for (i = 0, _ref = this.nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._v1.push(0);
      this._v2.push(0);
      this._v1_scale.push(0);
      this._v2_scale.push(0);
      this._v1[i].set(this.x_bound[0].get() + i * (this.x_bound[1].get() - this.x_bound[0].get()) / (this.nb_values.get() - 1));
    }
    for (i = 0, _ref2 = this.nb_values.get(); 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      x = this._v1[i];
      str = "x=" + x + "; val_y = " + this.f_x + ";";
      val_f = eval(str);
      this._v2[i].set(val_y);
    }
    _results = [];
    for (i = 0, _ref3 = this.nb_values.get(); 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      this._v1_scale[i].set(this._v1[i].get() * this.x_axe_scale.get());
      _results.push(this._v2_scale[i].set(this._v2[i].get() * this.y_axe_scale.get()));
    }
    return _results;
  };

  TFunctionItem.prototype.make_box = function() {
    var val, _i, _len, _ref;
    this._box.points.clear();
    this._box._elements.clear();
    if (this.x_axe_bound[0].get() > this.x_bound[0].get()) {
      this.x_axe_bound[0].set(this.x_bound[0].get());
    }
    if (this.x_axe_bound[1].get() > this.x_bound[1].get()) {
      this.x_axe_bound[1].set(this.x_bound[1].get());
    }
    _ref = this._v2;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      val = _ref[_i];
      if (this.y_axe_bound[0].get() > val.get()) {
        this.y_axe_bound[0].set(val.get());
      }
      if (this.y_axe_bound[1].get() < val.get()) {
        this.y_axe_bound[1].set(val.get());
      }
    }
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[0].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), this.y_axe_bound[1].get() * this.y_axe_scale.get(), 0]);
    this._box.add_element(new Element_Line([0, 1]));
    this._box.add_element(new Element_Line([1, 2]));
    this._box.add_element(new Element_Line([2, 3]));
    this._box.add_element(new Element_Line([3, 0]));
    this._box.add_point([this.x_axe_bound[0].get() * this.x_axe_scale.get(), 0, 0]);
    this._box.add_point([this.x_axe_bound[1].get() * this.x_axe_scale.get(), 0, 0]);
    this._box.add_point([0, this.y_axe_bound[0].get() * this.y_axe_scale.get(), 0]);
    this._box.add_point([0, this.y_axe_bound[1].get() * this.y_axe_scale.get(), 0]);
    this._box.add_element(new Element_Line([4, 5]));
    return this._box.add_element(new Element_Line([6, 7]));
  };

  TFunctionItem.prototype.make_mesh = function() {
    var bar, i, liste, _ref, _ref2, _results;
    this.fill_v1_v2();
    this._mesh.points.clear();
    this._mesh._elements.clear();
    for (i = 0, _ref = this.nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._mesh.add_point([this._v1_scale[i], this._v2_scale[i], 0]);
    }
    _results = [];
    for (i = 0, _ref2 = this.nb_values.get() - 1; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      liste = [i, i + 1];
      bar = new Element_Line(liste);
      _results.push(this._mesh.add_element(bar));
    }
    return _results;
  };

  TFunctionItem.prototype.cosmetic_attribute = function(name) {
    return TFunctionItem.__super__.cosmetic_attribute.call(this, name) || (name === "_mesh" || name === "visualization");
  };

  TFunctionItem.prototype.accept_child = function(ch) {};

  TFunctionItem.prototype.sub_canvas_items = function() {
    return [this._mesh, this._box];
  };

  TFunctionItem.prototype.z_index = function() {
    return this._mesh.z_index();
  };

  TFunctionItem.prototype.disp_only_in_model_editor = function() {};

  return TFunctionItem;

})(TreeItem);
var Basic1DFunctionItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Basic1DFunctionItem = (function() {
  __extends(Basic1DFunctionItem, TreeItem);
  function Basic1DFunctionItem(name, id_func, name_var, bound0, bound1) {
    if (name == null) {
      name = "function(x)";
    }
    if (id_func == null) {
      id_func = -1;
    }
    if (bound0 == null) {
      bound0 = -10;
    }
    if (bound1 == null) {
      bound1 = 10;
    }
    Basic1DFunctionItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(true);
    this.add_attr({
      _id: id_func,
      v_name: name_var,
      your_function: name_var,
      bound: [bound0, bound1]
    });
  }
  return Basic1DFunctionItem;
})();var Function,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Function = (function(_super) {

  __extends(Function, _super);

  function Function() {
    var onload,
      _this = this;
    Function.__super__.constructor.call(this);
    this.add_attr({
      _f_t: "t",
      _tmin: 0,
      _tmax: 10,
      _nb_values: 10,
      _v1: new Vec,
      _v2: new Vec,
      _mesh: new Mesh({
        not_editable: true
      })
    });
    onload = function() {
      _this._signal_change();
      if (_this._v2.length === 0) return _this.fill_v1_v2();
    };
    this.bind(function() {
      if (_this._f_t.has_been_modified() || _this._tmin.has_been_modified() || _this._tmax.has_been_modified() || _this._nb_values.has_been_modified()) {
        return _this.make_mesh();
      }
    });
  }

  Function.prototype.fill_v1_v2 = function() {
    var i, str, t, val_f, _ref, _ref2, _results;
    this._v1.clear();
    this._v2.clear();
    for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._v1.push(0);
      this._v2.push(0);
      this._v1[i].set(this._tmin.get() + i * (this._tmax.get() - this._tmin.get()) / (this._nb_values.get() - 1));
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get(); 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      t = this._v1[i];
      str = "t=" + t + "; val_t = " + this._f_t + ";";
      val_f = eval(str);
      _results.push(this._v2[i].set(val_t));
    }
    return _results;
  };

  Function.prototype.make_mesh = function() {
    var bar, i, liste, _ref, _ref2, _results;
    this.fill_v1_v2();
    this._mesh.points.clear();
    this._mesh._elements.clear();
    for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._mesh.add_point([this._v1[i], this._v2[i], 0]);
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get() - 1; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      liste = [i, i + 1];
      bar = new Element_Line(liste);
      _results.push(this._mesh.add_element(bar));
    }
    return _results;
  };

  Function.prototype.information = function(div) {
    var d, i, m, _ref;
    if (!(this.cm != null)) {
      this.txt = new_dom_element({
        parentNode: div
      });
      d = new_dom_element({
        parentNode: div
      });
      this.fill_v1_v2();
      m = new Graph({
        marker: 'bar',
        show_line: false,
        shadow: false,
        marker_size: 2,
        font_size: 10
      });
      for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        m.points.push([this._v1[i], this._v2[i], 0]);
      }
      m.build_w2b_legend();
      this.cm = new CanvasManager({
        el: d,
        want_aspect_ratio: true,
        padding_ratio: 1.4,
        constrain_zoom: 'x',
        width: '',
        class_name: 'histogramm'
      });
      this.cm.cam.threeD.set(false);
      this.cm.items.push(m);
      this.cm.fit();
    }
    return this.cm.draw();
  };

  return Function;

})(Model);
