var StepReaderItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

StepReaderItem = (function(_super) {

  __extends(StepReaderItem, _super);

  function StepReaderItem(name) {
    if (name == null) name = "StepReader";
    StepReaderItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90LBQ8cLP2JEvEAAAFySURBVFjD7dY9Sx1REAbgB7EIIhIkWogWqQTBBBJs0gX8ByLWin1+i6S0sfIPmCqEELRRMGAsFD+wUm4RC/HGSz5INs1cWA6717uXC1rsCwf2zJl35t3ZYc5So8YjwzQ+oYlLrIc962G1cY4WfkfMDUyUCdhLgnzsg4Cisy9lAn6Ew0uM40WBT5qgzJaeDeJtPN+WCdgKhxbWMFxRQDdnHSswgve5Snzoo4C/aGATk2UCZvAMs0G66+Mn6Aqfkzc57rECWbcCBpL9Ka7xE1+xXE+mGj3g+qEFZFWcBx5abSpgN4bPRezncIbvWMr5HcY8X4z9axzhJudTxE3jF5ZvNBbsYD4m41nObwzPY27ANlaDl3XgpvHv/X63uUn2J2wLuIoLq+3fxFASo4ibVW2gJp4mtgbeRMJ8suEkRhE3q9qE+3gXyaZy9n+x2jjACp50wa1UgZlonFb8LYmGusQvnITtFb7FHXLcgZvVY7JGjUeH/7xesRC0WJxHAAAAAElFTkSuQmCC");
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_output(new MeshItem);
  }

  StepReaderItem.prototype.accept_child = function(ch) {
    return ch instanceof FileItem;
  };

  StepReaderItem.prototype.sub_canvas_items = function() {
    return [];
  };

  return StepReaderItem;

})(TreeItem_Computable);
