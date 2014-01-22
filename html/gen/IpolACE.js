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
})();var TreeAppApplication_IpolACE;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TreeAppApplication_IpolACE = (function() {
  __extends(TreeAppApplication_IpolACE, TreeAppApplication);
  function TreeAppApplication_IpolACE() {
    var _ina;
    TreeAppApplication_IpolACE.__super__.constructor.call(this);
    this.name = 'Automatic Color Enhancement';
    this.powered_with = 'Ipol';
    this.publication_link = 'http://www.ipol.im/pub/art/2012/g-ace/';
    this.tutorial_link = 'http://youtu.be/AfCmbIf3DpA';
    _ina = __bind(function(app) {
      var _ref, _ref2;
      return app.data.focus.get() !== ((_ref = app.selected_canvas_inst()) != null ? (_ref2 = _ref[0]) != null ? _ref2.cm.view_id : void 0 : void 0);
    }, this);
    this.actions.push({
      ico: "data:image/png;base64,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",
      siz: 1,
      txt: "Ipol ACE",
      ina: _ina,
      fun: __bind(function(evt, app) {
        var ipolLsd;
        app.undo_manager.snapshot();
        return ipolLsd = this.add_item_depending_selected_tree(app.data, IpolACEItem);
      }, this)
    });
  }
  return TreeAppApplication_IpolACE;
})();