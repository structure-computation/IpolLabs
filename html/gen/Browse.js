var Browse;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Browse = (function() {
  __extends(Browse, Model);
  function Browse() {
    Browse.__super__.constructor.call(this);
    this.add_attr({
      path: new Str
    });
  }
  Browse.prototype._set = function(path) {
    return this.path.set(path);
  };
  return Browse;
})();var ModelEditorItem_Browse;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Browse = (function() {
  __extends(ModelEditorItem_Browse, ModelEditorItem);
  function ModelEditorItem_Browse(params) {
    ModelEditorItem_Browse.__super__.constructor.call(this, params);
    this.line_height = 30;
    this.height = 30;
    this.container = new_dom_element({
      parentNode: this.ed,
      nodeName: "div",
      className: "ModelEditorDragAndDrop",
      style: {
        color: "rgba(0,0,0,0)",
        display: "inline-block",
        width: this.ew + "%",
        height: this.height + "px",
        border: "black solid thin"
      },
      ondragover: __bind(function(evt) {
        return false;
      }, this),
      ondrop: __bind(function(evt) {
        return this.drop(evt);
      }, this)
    });
    this.browse = new_dom_element({
      parentNode: this.container,
      nodeName: 'input',
      type: 'file',
      multiple: 'multiple'
    });
  }
  ModelEditorItem_Browse.prototype.onchange = function() {};
  ModelEditorItem_Browse.prototype.drop = function(event) {
    var file, files, format, pic, _i, _len;
    console.log("drop");
    event.stopPropagation();
    event.returnValue = false;
    event.preventDefault();
    files = event.dataTransfer.files;
    if (event.dataTransfer.files.length > 0) {
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        format = file.type.indexOf("image");
        if (format !== -1) {
          console.log(file);
          pic = new ImgItem(file.name);
          pic.file = file;
        }
      }
    }
    return false;
  };
  return ModelEditorItem_Browse;
})();
ModelEditorItem.default_types.push(function(model) {
  if (model instanceof Browse) {
    return ModelEditorItem_Browse;
  }
});