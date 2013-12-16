var IpolSCAItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IpolSCAItem = (function(_super) {

  __extends(IpolSCAItem, _super);

  function IpolSCAItem(name) {
    if (name == null) name = "IpolSCA";
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

})(TreeItem_Computable);
var ImgSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ImgSetItem = (function(_super) {

  __extends(ImgSetItem, _super);

  function ImgSetItem(name) {
    if (name == null) name = 'ImgSetItem';
    ImgSetItem.__super__.constructor.call(this);
    this._name.set(name);
  }

  ImgSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };

  return ImgSetItem;

})(TreeItem);
var TreeAppApplication_IpolSCA,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TreeAppApplication_IpolSCA = (function(_super) {

  __extends(TreeAppApplication_IpolSCA, _super);

  function TreeAppApplication_IpolSCA() {
    var _ina,
      _this = this;
    TreeAppApplication_IpolSCA.__super__.constructor.call(this);
    this.name = 'Selective Contrast Adjustment';
    this.powered_with = 'Ipol';
    this.publication_link = 'http://www.ipol.im/pub/art/2013/41/';
    _ina = function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    };
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Ipol SCA",
      ina: _ina,
      fun: function(evt, app) {
        var ipolSCA;
        app.undo_manager.snapshot();
        return ipolSCA = _this.add_item_depending_selected_tree(app.data, IpolSCAItem);
      }
    });
  }

  return TreeAppApplication_IpolSCA;

})(TreeAppApplication);
