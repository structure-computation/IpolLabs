var GmshItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

GmshItem = (function(_super) {

  __extends(GmshItem, _super);

  function GmshItem(name) {
    if (name == null) name = "Gmsh";
    GmshItem.__super__.constructor.call(this);
    this.add_attr({
      cell_type: new Choice(0, ["Triangle 3", "Triangle 6", "Quad 4", "Quad 8"]),
      base_size: 100,
      p_mesher: new Lst
    });
    this._name.set(name);
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ1JREFUeNrsl80NwyAMhVP11BsjZJSOxrWnjMAo7QaMwggOUkhFLcCPBIoqFelFTWI9fwWHn2namvLSXs6Lglx4drZBvjYK4LInkkO+uhC0Sx/855CvAwIdEU01Qn0v4cewNhwA7qqevkixLAdqYEGLUAGfyyzEcBnQF5owVDRZWTD53mZ4gou6jrbb931sKEGkYj98sxVTACAQIhfTBECCKL1rBpBLJPVOU4AUhDQ0zQE4hFScXQDsSACb6PqvDQFPbtizrkX4TCRPgXX5DHnRGWFomk5ESPISBAYALkamcjGCd9tDl+Pf2BX32pL9d8XDh+DqLzevu2D28HpVAqC+4w+nVcfo1sfzVYABANUatnC/8X39AAAAAElFTkSuQmCC");
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_output(new MeshItem);
  }

  GmshItem.prototype.display_suppl_context_actions = function(context_action) {
    context_action.push(new TreeAppModule_Mesher);
    return context_action.push(new TreeAppModule_Sketch);
  };

  GmshItem.prototype.add_point = function(p) {
    if (p == null) p = new PointMesher;
    if (p instanceof PointMesher) return this.p_mesher.push(p);
  };

  GmshItem.prototype.remove_point = function(p) {
    var ind;
    if (p instanceof PointMesher) {
      ind = this.p_mesher.indexOf(p);
      if (ind !== -1) return this.p_mesher.splice(ind, 1);
    } else if (p !== NaN) {
      return this.p_mesher.splice(p, 1);
    }
  };

  GmshItem.prototype.accept_child = function(ch) {
    return ch instanceof MaskItem || ch instanceof MesherItem || ch instanceof MeshItem || ch instanceof SketchItem || ch instanceof ImgItem || ch instanceof TransformItem || ch instanceof FileItem;
  };

  GmshItem.prototype.sub_canvas_items = function() {
    return [];
  };

  GmshItem.prototype.draw = function(info) {
    var draw_point, pm, _i, _len, _ref, _results;
    draw_point = info.sel_item[this.model_id];
    if (this.p_mesher.length && draw_point) {
      _ref = this.p_mesher;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pm = _ref[_i];
        _results.push(pm.draw(info));
      }
      return _results;
    }
  };

  GmshItem.prototype.disp_only_in_model_editor = function() {};

  GmshItem.prototype.get_movable_entities = function(res, info, pos, phase) {
    var pm, _i, _len, _ref, _results;
    _ref = this.p_mesher;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pm = _ref[_i];
      _results.push(pm.get_movable_entities(res, info, pos, phase));
    }
    return _results;
  };

  GmshItem.prototype.on_mouse_down = function(cm, evt, pos, b) {
    var pm, _i, _len, _ref;
    _ref = this.p_mesher;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pm = _ref[_i];
      pm.on_mouse_down(cm, evt, pos, b);
    }
    return false;
  };

  GmshItem.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var pm, _i, _len, _ref;
    _ref = this.p_mesher;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pm = _ref[_i];
      pm.on_mouse_move(cm, evt, pos, b, old);
    }
    return false;
  };

  return GmshItem;

})(TreeItem_Computable);
