var Function;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Function = (function() {
  __extends(Function, Model);
  function Function() {
    var onload;
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
    onload = __bind(function() {
      this._signal_change();
      if (this._v2.length === 0) {
        return this.fill_v1_v2();
      }
    }, this);
    this.bind(__bind(function() {
      if (this._f_t.has_been_modified() || this._tmin.has_been_modified() || this._tmax.has_been_modified() || this._nb_values.has_been_modified()) {
        return this.make_mesh();
      }
    }, this));
  }
  Function.prototype.fill_v1_v2 = function() {
    var i, str, t, val_f, _ref, _ref2, _results;
    this._v1.clear();
    this._v2.clear();
    for (i = 0, _ref = this._nb_values.get(); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      this._v1.push(0);
      this._v2.push(0);
      this._v1[i].set(this._tmin.get() + i * (this._tmax.get() - this._tmin.get()) / (this._nb_values.get() - 1));
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get(); (0 <= _ref2 ? i < _ref2 : i > _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
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
    for (i = 0, _ref = this._nb_values.get(); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      this._mesh.add_point([this._v1[i], this._v2[i], 0]);
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get() - 1; (0 <= _ref2 ? i < _ref2 : i > _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
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
      for (i = 0, _ref = this._nb_values.get(); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
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
})();var TestCollectionTreeItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TestCollectionTreeItem = (function() {
  __extends(TestCollectionTreeItem, CollectionTreeItem);
  function TestCollectionTreeItem(name) {
    if (name == null) {
      name = "test_collection_item";
    }
    TestCollectionTreeItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_attr({
      name_child: "test"
    });
  }
  TestCollectionTreeItem.prototype.add_collection_item = function() {
    var id_child, name_temp;
    id_child = this.ask_for_id_collection_child();
    name_temp = this.name_child + id_child.toString();
    return this.add_child(new TestChildItem(name_temp, id_child, this._dim));
  };
  return TestCollectionTreeItem;
})();var TestChildItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TestChildItem = (function() {
  __extends(TestChildItem, TreeItem);
  function TestChildItem(name, id_bc, dim) {
    if (name == null) {
      name = "test";
    }
    if (id_bc == null) {
      id_bc = 0;
    }
    if (dim == null) {
      dim = 3;
    }
    TestChildItem.__super__.constructor.call(this);
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
  }
  return TestChildItem;
})();