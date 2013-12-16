var IpolFSTVItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IpolFSTVItem = (function(_super) {

  __extends(IpolFSTVItem, _super);

  function IpolFSTVItem(name) {
    if (name == null) name = "IpolFSTV";
    IpolFSTVItem.__super__.constructor.call(this);
    this.add_attr({
      alpha: new ConstrainedVal(0.001, {
        min: 1e-6
      }),
      beta: new ConstrainedVal(0.001, {
        min: 1e-6
      })
    });
    this._name.set(name);
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_child(new ImgSetItem('input'));
    this.add_output(new ImgSetItem('output'));
  }

  IpolFSTVItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };

  IpolFSTVItem.prototype.is_app_data = function(item) {
    if (item instanceof TreeAppData) {
      return true;
    } else {
      return false;
    }
  };

  IpolFSTVItem.prototype.get_app_data = function() {
    var it;
    it = this.get_parents_that_check(this.is_app_data);
    return it[0];
  };

  IpolFSTVItem.prototype.do_it = function() {
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

  IpolFSTVItem.prototype.z_index = function() {};

  return IpolFSTVItem;

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
var TreeAppApplication_IpolFSTV,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TreeAppApplication_IpolFSTV = (function(_super) {

  __extends(TreeAppApplication_IpolFSTV, _super);

  function TreeAppApplication_IpolFSTV() {
    var _ina,
      _this = this;
    TreeAppApplication_IpolFSTV.__super__.constructor.call(this);
    this.name = '1st & 2nd order Total Variation Inpainting';
    this.powered_with = 'Ipol';
    _ina = function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    };
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Ipol 1st & 2nd order Total Variation Inpainting",
      ina: _ina,
      fun: function(evt, app) {
        var ipolFSTV;
        app.undo_manager.snapshot();
        return ipolFSTV = _this.add_item_depending_selected_tree(app.data, IpolFSTVItem);
      }
    });
  }

  return TreeAppApplication_IpolFSTV;

})(TreeAppApplication);
