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
var CsvReaderItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CsvReaderItem = (function(_super) {

  __extends(CsvReaderItem, _super);

  function CsvReaderItem(name) {
    if (name == null) name = "CsvReader";
    CsvReaderItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_attr({
      orientation: new Choice(1, ["byRow", "byColumn"]),
      values_separator: new Choice(1, [",", ";"]),
      has_headers: true,
      _parameters: new ListParameterSetItem
    });
    this.add_output(this._parameters);
  }

  CsvReaderItem.prototype.accept_child = function(ch) {
    return ch instanceof FileItem;
  };

  CsvReaderItem.prototype.z_index = function() {};

  CsvReaderItem.prototype.sub_canvas_items = function() {
    return [];
  };

  return CsvReaderItem;

})(TreeItem_Computable);
