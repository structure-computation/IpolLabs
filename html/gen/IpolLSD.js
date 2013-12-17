var ImgSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ImgSetItem = (function() {
  __extends(ImgSetItem, TreeItem);
  function ImgSetItem(name) {
    if (name == null) {
      name = 'ImgSetItem';
    }
    ImgSetItem.__super__.constructor.call(this);
    this._name.set(name);
  }
  ImgSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };
  return ImgSetItem;
})();var IpolLSDItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
IpolLSDItem = (function() {
  __extends(IpolLSDItem, TreeItem_Computable);
  function IpolLSDItem(name) {
    if (name == null) {
      name = "IpolLSD";
    }
    IpolLSDItem.__super__.constructor.call(this);
    this.add_attr({
      scale: new ConstrainedVal(1.0, {
        min: 0.0
      }),
      sigma_coef: new ConstrainedVal(0.6, {
        min: 0.0
      }),
      quant: new ConstrainedVal(2.0, {
        min: 0.0
      }),
      ang_th: new ConstrainedVal(22.5, {
        min: 0.0,
        max: 180.0
      }),
      log_eps: 0.0,
      density_th: new ConstrainedVal(0.7, {
        min: 0.0,
        max: 1.0
      }),
      n_bins: new ConstrainedVal(1, {
        min: 1,
        max: 1024,
        div: 1024
      }),
      width: 1.5
    });
    this._name.set(name);
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_child(new ImgSetItem('input'));
    this.add_output(new ImgSetItem('output'));
  }
  IpolLSDItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };
  IpolLSDItem.prototype.is_app_data = function(item) {
    if (item instanceof TreeAppData) {
      return true;
    } else {
      return false;
    }
  };
  IpolLSDItem.prototype.get_app_data = function() {
    var it;
    it = this.get_parents_that_check(this.is_app_data);
    return it[0];
  };
  IpolLSDItem.prototype.do_it = function() {
    var app_data, child, _i, _len, _ref;
    app_data = this.get_app_data();
    _ref = this._output[0]._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      this._output[0].rem_child(child);
      app_data.delete_from_tree(child);
    }
    return TreeItem_Computable._do_it_rec(this);
  };
  IpolLSDItem.prototype.z_index = function() {};
  return IpolLSDItem;
})();