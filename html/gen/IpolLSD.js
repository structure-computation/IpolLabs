var IpolLSDItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IpolLSDItem = (function(_super) {

  __extends(IpolLSDItem, _super);

  function IpolLSDItem(name) {
    if (name == null) name = "IpolLSD";
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
var TreeAppApplication_IpolLSD,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

TreeAppApplication_IpolLSD = (function(_super) {

  __extends(TreeAppApplication_IpolLSD, _super);

  function TreeAppApplication_IpolLSD() {
    var _ina,
      _this = this;
    TreeAppApplication_IpolLSD.__super__.constructor.call(this);
    this.name = 'Line Segment Detector';
    this.powered_with = 'Ipol';
    this.publication_link = 'http://www.ipol.im/pub/art/2012/gjmr-lsd/';
    _ina = function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    };
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Ipol LSD",
      ina: _ina,
      fun: function(evt, app) {
        var ipolLsd;
        app.undo_manager.snapshot();
        return ipolLsd = _this.add_item_depending_selected_tree(app.data, IpolLSDItem);
      }
    });
  }

  return TreeAppApplication_IpolLSD;

})(TreeAppApplication);
