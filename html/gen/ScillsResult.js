var ScillsSetFilterItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsSetFilterItem = (function() {
  __extends(ScillsSetFilterItem, TreeItem);
  function ScillsSetFilterItem(app_data, panel_id) {
    this.app_data = app_data;
    this.panel_id = panel_id;
    ScillsSetFilterItem.__super__.constructor.call(this);
    this._name.set("filter");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxQAADsUBR2zs/wAAAAd0SU1FB9wKCxYcNOvxn34AAAF4SURBVDjL7dM7T5NRHMfxz3Np6IVimgYTC9g4ODjpwOboC3DRgfhKfB0ursbV1clo4mK0ibFgWBygUYRIlVpobWmpj0NrLBjaEEf5bif/c36Xc3I4ZwrBWTY/JLfIpSwS6g1adxicyeAR4TxBOBQRoE6SJcywtMDtHKU+6y3WGnyq07xHf6rBU+bylLLkI8Jk6CEgSBCxNM/KLMsDvnaotqm0qB5Q+0xzhe64Zjy+KHK5yN081+I/s2QsyOwMV9OUAkoZruRYnmO9TSXNezw/1SBNIc/yBW7GpJK/64YBcUiEIEUhJp9iIaT8g/JEgyO6Peo9tgcnZiNS8Uh09Eb9Pvs9Ng+pdlg9eeCYyA5bPZ5851U0TPubJCGIuFjkVp7ryTDMxgHvmrzeY7XB1kSDPb585EWaOBpd/li7oEQ5IndEq8+HJm++sVZj6y2tB/z8p3/wmMIiNzLMdNmosX2f9s7xLKc3mMYu+7tUOgxecvhsgvA5/xG/APO9dQC9AlrGAAAAAElFTkSuQmCC");
    this._viewable.set(false);
    this.add_attr({
      filter: {
        type: new Choice(0, ["by id", "by name"]),
        filter: ""
      }
    });
  }
  ScillsSetFilterItem.prototype.cosmetic_attribute = function(name) {
    return ScillsSetFilterItem.__super__.cosmetic_attribute.call(this, name) || (name === "filter");
  };
  ScillsSetFilterItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsSetItem;
  };
  ScillsSetFilterItem.prototype.z_index = function() {};
  ScillsSetFilterItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return ScillsSetFilterItem;
})();var ScillsSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsSetItem = (function() {
  __extends(ScillsSetItem, TreeItem);
  function ScillsSetItem(name, ico) {
    if (name == null) {
      name = "PartSet";
    }
    if (ico == null) {
      ico = "";
    }
    ScillsSetItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set(ico);
    this._viewable.set(true);
    this.add_attr({
      filter: {
        type: "",
        filter: ""
      }
    });
  }
  ScillsSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartItem || ch instanceof ScillsInterfaceItem || ch instanceof ScillsEdgeItem;
  };
  ScillsSetItem.prototype.z_index = function() {};
  ScillsSetItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return ScillsSetItem;
})();var ScillsAssemblyComputeItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ScillsAssemblyComputeItem = (function() {
  __extends(ScillsAssemblyComputeItem, TreeItem_Computable);
  function ScillsAssemblyComputeItem(name) {
    if (name == null) {
      name = "Assembly";
    }
    ScillsAssemblyComputeItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB9sMEBEWH62wjbcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADF0lEQVQ4y+3UTWhcVRTA8f89991335s3M51JYpJJU9vUViJYq4gKFYwbQQTBjehCsOhCUAiCuBFc6V5050JFyEqXIsWF+IFaxUItFuNH1DS21mQmdWaSmczkvXuvi+LOJq07wf/ybn4c7uEo7nlW7dl7QLts0mzmIymuSEmTOoOtCbzLsOY0w9Ciuzzkvac9/yLFQ6/uR8pzVKfBpg2klBHFDhUcHk8xTCAsk5ZXGJ89S9hY44XaNWER1cYYxt5Pv7WMH22T2S5KacQEwOGGA37/rj76zcLU0cHS3Ha7ufAZ/HBtSBQF4opga3V66xVWlldZ/Hpzz29fmrvyn/Y1dF5NdYi3PX69kO7iyJEJ7njyIh/Md68eSSzEVhO0UJ1K+PX06GO/vHHYaR0N4iycDZPue98oeirzVLISdz54H/tmb+P4h38w7H9KMbjEuw8Pd0aMuYxgFIVXxJkMIXwcHzHNyuGEwABtA2IEm3iyMcGOGGTrAMIhtorzcOwEfLF2JUTAB2LRJInCJIK2IqB8NqKZnqmRxBmb60Kv42ivOVZ/VHSXKxTdGvTrGH+Me48/svMkw06gVkswdY33go50BBJEAnEKo/ss1THL0skBB29J2TutKFd6iIBKFDhDJahdPr7XYdhWlOoZuRmiRQmIEi3EiZB7RQiK8Zky9YbBlgSbapT2iFI4p4jSHVdaaF9YYdh+hf6qxW1mKBcBRgkabQTRmoAhuISsXCKtKkwSMFZhUoiMYO0u27XwogNO8PhrTWo3Pke+aXKIg3hLIhafKK4bV9w022L65hbGClGi0WkBTiEIEu2C/N3b86d44vV5movPrEK5PTaVcfTWMiOzS2z0c1bOgNaXr4FJPCYWigLcICI4dXUIwJtPNYGXP5q4Xph74G6yaJLtdsp2ocF7FIIEwRIRFYGwrcl7Kf2W2QnR//Dm6XUc57vnOHTwIs7fTuFK9NZzyuUU4yPiokreHqNzSbHRWufkV+/z5+fnrnwgd+vRlxqkM8+z2dxP44Yyigp55wzKvkO/v8qpT37m27eG/N9/qr8AwOAj+L974bMAAAAASUVORK5CYII=");
    this._viewable.set(true);
    this.add_child(new ScillsPartSetItem);
    this.add_child(new ScillsInterfaceSetItem);
    this.add_child(new ScillsEdgeSetItem);
    this.add_attr({
      id_model: 217,
      id_calcul: -1,
      nb_parts: 0,
      nb_interfaces: 0,
      nb_edges: 0
    });
  }
  ScillsAssemblyComputeItem.prototype.accept_child = function(ch) {
    return ch instanceof ScillsPartSetItem || ch instanceof ScillsInterfaceSetItem || ch instanceof ScillsEdgeSetItem || ch instanceof FileItem;
  };
  ScillsAssemblyComputeItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return ScillsAssemblyComputeItem;
})();