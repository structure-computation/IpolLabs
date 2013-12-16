var UnvReaderItem3D;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
UnvReaderItem3D = (function() {
  __extends(UnvReaderItem3D, TreeItem_Computable);
  function UnvReaderItem3D(name) {
    if (name == null) {
      name = "UnvReader_3D";
    }
    UnvReaderItem3D.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_output(new SketchItem);
  }
  UnvReaderItem3D.prototype.accept_child = function(ch) {
    return ch instanceof FileItem;
  };
  UnvReaderItem3D.prototype.sub_canvas_items = function() {
    return [];
  };
  UnvReaderItem3D.prototype.z_index = function() {};
  UnvReaderItem3D.prototype.disp_only_in_model_editor = function() {};
  return UnvReaderItem3D;
})();