var ScilabItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ScilabItem = (function(_super) {

  __extends(ScilabItem, _super);

  function ScilabItem(name) {
    if (name == null) name = "Scilab";
    ScilabItem.__super__.constructor.call(this);
    this.add_attr({
      cell_type: new Choice(0, ["detectfaces", "filter : sobel"])
    });
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_output(new ImgItem);
  }

  ScilabItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };

  ScilabItem.prototype.z_index = function() {};

  ScilabItem.prototype.disp_only_in_model_editor = function() {};

  return ScilabItem;

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
