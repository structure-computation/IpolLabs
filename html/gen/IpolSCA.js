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
})();var IpolSCAItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
IpolSCAItem = (function() {
  __extends(IpolSCAItem, TreeItem_Computable);
  function IpolSCAItem(name) {
    if (name == null) {
      name = "IpolSCA";
    }
    IpolSCAItem.__super__.constructor.call(this);
    this.add_attr({
      thresold: new ConstrainedVal(50, {
        min: 0.0
      }),
      gradient_amplification: new ConstrainedVal(3.0, {
        min: 0.01
      }),
      gradient_power: new ConstrainedVal(0.8, {
        min: 0.01
      }),
      algorithm: new Choice(0, ["simple gray", "local gray", "global gray", "simple rgb", "local rgb", "global rgb"])
    });
    this._name.set(name);
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_child(new ImgSetItem('input'));
    this.add_output(new ImgSetItem('output'));
  }
  IpolSCAItem.prototype.get_model_editor_parameters = function(res) {
    res.model_editor["weight"] = ModelEditorItem_ChoiceWithEditableItems;
    return res.model_editor["method"] = ModelEditorItem_ChoiceWithEditableItems;
  };
  IpolSCAItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };
  IpolSCAItem.prototype.is_app_data = function(item) {
    if (item instanceof TreeAppData) {
      return true;
    } else {
      return false;
    }
  };
  IpolSCAItem.prototype.get_app_data = function() {
    var it;
    it = this.get_parents_that_check(this.is_app_data);
    return it[0];
  };
  IpolSCAItem.prototype.do_it = function() {
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
  IpolSCAItem.prototype.z_index = function() {};
  return IpolSCAItem;
})();