var IpolLsdItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IpolLsdItem = (function(_super) {

  __extends(IpolLsdItem, _super);

  function IpolLsdItem(name) {
    if (name == null) name = "IpolLsd";
    IpolLsdItem.__super__.constructor.call(this);
    this.add_attr({
      scale: new ConstrainedVal(0.8, {
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
      n_bins: new ConstrainedVal(0, {
        min: 1,
        max: 1024,
        div: 1024
      }),
      reg: "",
      epsfile: "",
      svgfile: "",
      width: 1.5
    });
    this._name.set(name);
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_output(new ImgItem);
  }

  IpolLsdItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };

  IpolLsdItem.prototype.z_index = function() {};

  return IpolLsdItem;

})(TreeItem_Computable);
var ListParameterItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ListParameterItem = (function(_super) {

  __extends(ListParameterItem, _super);

  function ListParameterItem() {
    ListParameterItem.__super__.constructor.apply(this, arguments);
  }

  return ListParameterItem;

})(TreeItem);

({
  constructor: function(name, values) {
    if (name == null) name = "ListParameter";
    if (values == null) values = [];
    constructor.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(true);
    return this.add_attr({
      _values: values
    });
  },
  accept_child: function(ch) {},
  z_index: function() {},
  sub_canvas_items: function() {
    return [];
  }
});
var ListParameterSetItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ListParameterSetItem = (function(_super) {

  __extends(ListParameterSetItem, _super);

  function ListParameterSetItem(name) {
    if (name == null) name = "ListParameterSet";
    ListParameterSetItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(true);
  }

  ListParameterSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ListParameterItem;
  };

  ListParameterSetItem.prototype.z_index = function() {};

  ListParameterSetItem.prototype.sub_canvas_items = function() {
    return [];
  };

  return ListParameterSetItem;

})(TreeItem);
