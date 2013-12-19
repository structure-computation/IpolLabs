var InterpolateMethod;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
InterpolateMethod = (function() {
  __extends(InterpolateMethod, Model);
  function InterpolateMethod() {
    InterpolateMethod.__super__.constructor.call(this);
    this.add_attr({
      _name: "Interpolate",
      _level: new ConstrainedVal(2, {
        min: 2,
        max: 500,
        div: 498
      })
    });
    this.add_attr({
      level: this._level
    });
  }
  InterpolateMethod.prototype.toString = function() {
    return this._name.get();
  };
  return InterpolateMethod;
})();var RadialWeight;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
RadialWeight = (function() {
  __extends(RadialWeight, Model);
  function RadialWeight() {
    RadialWeight.__super__.constructor.call(this);
    this.add_attr({
      _name: "radial (1/r)"
    });
  }
  RadialWeight.prototype.toString = function() {
    return this._name.get();
  };
  return RadialWeight;
})();var PolynomialMethod;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PolynomialMethod = (function() {
  __extends(PolynomialMethod, Model);
  function PolynomialMethod() {
    PolynomialMethod.__super__.constructor.call(this);
    this.add_attr({
      _name: "Polynomial",
      _degree: new Choice(0, ["3", "5", "7", "9", "11"])
    });
    this.add_attr({
      degree: this._degree
    });
  }
  PolynomialMethod.prototype.toString = function() {
    return this._name.get();
  };
  return PolynomialMethod;
})();var ConstantWeight;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ConstantWeight = (function() {
  __extends(ConstantWeight, Model);
  function ConstantWeight() {
    ConstantWeight.__super__.constructor.call(this);
    this.add_attr({
      _name: "constant (1)"
    });
  }
  ConstantWeight.prototype.toString = function() {
    return this._name.get();
  };
  return ConstantWeight;
})();var GaussianWeight;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
GaussianWeight = (function() {
  __extends(GaussianWeight, Model);
  function GaussianWeight() {
    GaussianWeight.__super__.constructor.call(this);
    this.add_attr({
      _name: "gaussian",
      _sigma: 1.0
    });
    this.add_attr({
      sigma: this._sigma
    });
  }
  GaussianWeight.prototype.toString = function() {
    return this._name.get();
  };
  return GaussianWeight;
})();var ImgSetItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ImgSetItem = (function() {
  __extends(ImgSetItem, TreeItem);
  function ImgSetItem(name) {
    if (name == null) {
      name = 'ImgSetItem';
    }
    ImgSetItem.__super__.constructor.call(this);
    this._name.set(name);
  }
  ImgSetItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };
  return ImgSetItem;
})();var IpolACEItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
IpolACEItem = (function() {
  __extends(IpolACEItem, TreeItem_Computable);
  function IpolACEItem(name) {
    var constant, gaussian, interp, poly, radial;
    if (name == null) {
      name = "IpolACE";
    }
    IpolACEItem.__super__.constructor.call(this);
    this.add_attr({
      alpha: new ConstrainedVal(5.0, {
        min: 1.0,
        max: 8.0
      }),
      weight: new Choice,
      method: new Choice
    });
    radial = new RadialWeight;
    constant = new ConstantWeight;
    gaussian = new GaussianWeight;
    this.weight.lst.push(radial);
    this.weight.lst.push(constant);
    this.weight.lst.push(gaussian);
    interp = new InterpolateMethod;
    poly = new PolynomialMethod;
    this.method.lst.push(interp);
    this.method.lst.push(poly);
    this._name.set(name);
    this._viewable.set(false);
    this._computation_mode.set(false);
    this.add_child(new ImgSetItem('input'));
    this.add_output(new ImgSetItem('output'));
  }
  IpolACEItem.prototype.get_model_editor_parameters = function(res) {
    res.model_editor["weight"] = ModelEditorItem_ChoiceWithEditableItems;
    return res.model_editor["method"] = ModelEditorItem_ChoiceWithEditableItems;
  };
  IpolACEItem.prototype.accept_child = function(ch) {
    return ch instanceof ImgItem || ch instanceof FileItem;
  };
  IpolACEItem.prototype.is_app_data = function(item) {
    if (item instanceof TreeAppData) {
      return true;
    } else {
      return false;
    }
  };
  IpolACEItem.prototype.get_app_data = function() {
    var it;
    it = this.get_parents_that_check(this.is_app_data);
    return it[0];
  };
  IpolACEItem.prototype.do_it = function() {
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
  IpolACEItem.prototype.z_index = function() {};
  return IpolACEItem;
})();