var DiscretizationItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DiscretizationItem = (function(_super) {

  __extends(DiscretizationItem, _super);

  function DiscretizationItem() {
    DiscretizationItem.__super__.constructor.call(this);
    this._name.set("Discretization");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJBg0KJ8trtVMAAAMESURBVDjLjZN/SNQHGMaf93vnN72vdcak2bUaaVKKiWRaGoMmObvrxzCyomIgQVAKRX/MbRTBZFFM2Ab+WD9YE60/ygjLcGc/YC0NKrkit7uz8Dor+mbpOe2u7offZ3/Jzhaxzz/vH+/7PPDy8ADvgOTktJBM8/n9gv9LnLjm15Zmfnf4EEm2xO/ikcmFiMSbJPxy/NjQYd+plNjfYeaMzY5eaDk/Q0TCbxuYJ8V9t+99c+vebWvljh3JHR0da6/9cT0lZeUshAMhGXQ+U9vb219GI9H9ly50fGSxWMKl9s9OiMgjAMBzXT+UuW0pM3YuM/I/KWQsFjOGhoa4ZO0yLlqTz8tdV0jS2LhlIzN2FRkfb8hlf3+/FwBMALB5+9bjTuPOTJNqEkAQ8gWksbERpctLoEVU3L3rgtfrlT8NP5CdLKImMGHwdeqVrqvfKgCwYH7GNatuxtiLURamZsNqtaK1tRU1NTWoqKhAc3MzNE3DqnlFGHmgU0ZeS/m6Dd0iQmE0CpjNAqDO6/bu63R2IhAIQFEUlJSUwOPxwO12Iz09HcFgEGWlZchbkndRRNZzglNiy+7t7WVTUxNDoRBJsqqqig6Hg7qukyRra2vpcrlIcteUGCMTE44Tx37+8b7Pk5m/IBdnz7WhsrISdrsdPT09SExMRF1dHRyrHfhr0Is5abbnX+39slwxKTcFAHz+R53rTu5cHXsTReSGjotH20ASqqqiu7sbxcXFGB8fx9ffH8CLfBNeDQzjp88PYI3dIQoARGLhuUk2DWpqEjKWLkRWVhYaGhqgiAAE6uvrkZOTgzm585H0gQXTZifT//Txvy8Eg8GyH043/Nb3xIOtBeUYeTmMZE1D9bmDUCZMWP/hChTkFcBms+ntfV1p5pgJR/YcbNG06V8IDUIUAcmZAGYASAcQ3rSl4vrAKkOJ6q8kePmp8fD3vt0icpTkPADLReQMGZlaoHjGRsduLq5eyczqFYbT6Rwnqf63eAbkPa2cO+B+8OnwaEAtKCrsFRHXu+7+AaO8ey4Pw3F8AAAAAElFTkSuQmCC");
    this._viewable.set(false);
  }

  DiscretizationItem.prototype.accept_child = function(ch) {
    return ch instanceof GmshItem || ch instanceof MeshItem || ch instanceof MaskItem || ch instanceof MesherItem || ch instanceof SketchItem || ch instanceof ImgItem || ch instanceof TransformItem || ch instanceof ShapeFunctionItem;
  };

  DiscretizationItem.prototype.z_index = function() {};

  DiscretizationItem.prototype.sub_canvas_items = function() {
    return [];
  };

  return DiscretizationItem;

})(TreeItem);
var MaterialItem;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MaterialItem = (function() {
  __extends(MaterialItem, TreeItem);
  function MaterialItem() {
    this.parse_code_onchange = __bind(this.parse_code_onchange, this);    MaterialItem.__super__.constructor.call(this);
    this._name.set("Material");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaFJREFUeNpi/P//PwMh4Fe5zx1IrcYiNYeJkGaf8r3u//79X50dY8JroC7Ky870H4xBbKB4Cgs+zV4lu8E258ab8269+JHhyY2XDOs6XMByQRV7GP79/c+A0wD3wl1gzXmJ5rybL7wHiyF7FsT+CzSAEVsYuOTuAGvOTwZqPv8eLv7l5RuG7x8+gdmcAnwMr56++4zhAsfMbRDNKRa8a0+9RZFjExICYxj4+/ANqhfsUjaDNRekW/GuPvEab+A+Pn/rMygW4F6wStgI1lyYYcW7ioDmpxdugzUfW+BfBDbAPHo9RHO2Ne/yoy/xan5x4Q5Y88mlgUUgPqNR6GqI5lwb3iWHXuDV/PoiRPPZVSFFMDGWP3/+rS7Ks+Wdt/cpXs1vL90Fa764LqwIWZxR22d5H5BOEdRT4sWl+f2le2DNVzZHFKHLgcNA03Mp2BA+XWUMQz5dhth8fXt0ETbD4bGg5roYbAivLsIlny9DbL61O7YIl+tQUqKy0yKwITy6irxfLt8Ha767L64IX9hgJGVF+wVgQ0Ca7x9MKCKUWwECDABXTL4ZpMzUsQAAAABJRU5ErkJggg==");
    this._viewable.set(false);
    this.add_attr({
      code: new StrLanguage("Class Steel\n    Poisson := 0.28\n    Young := 210\n", "ruby", this.parse_code_onchange)
    });
    this._lst_variables = new Lst;
    this.parse_code_onchange();
  }
  MaterialItem.prototype.accept_child = function(ch) {
    return ch instanceof MaskItem || ch instanceof PickedZoneItem || ch instanceof DiscretizationItem || ch instanceof SketchItem || ch instanceof MeshItem || ch instanceof ImgSetItem || ch instanceof ImgItem;
  };
  MaterialItem.prototype.sub_canvas_items = function() {
    return [];
  };
  MaterialItem.prototype.parse_code_onchange = function() {
    var attr, i, reg, variable, variable_value, _i, _len, _ref, _results;
    if (this._lst_variables.length > 0) {
      _ref = this._lst_variables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        this.rem_attr(attr.get());
      }
      this._lst_variables.clear();
    }
    reg = /(\w+?) *:= *([0-9\.]+)/g;
    i = 0;
    _results = [];
    while (reg.exec(this.code.get())) {
      if (i > 1000) {
        console.error('Too much variables');
        break;
      }
      variable = RegExp.$1;
      variable_value = parseFloat(RegExp.$2);
      if (!(this[variable] != null)) {
        this.add_attr(variable, [variable_value, false]);
        this._lst_variables.push(variable);
      }
      _results.push(i++);
    }
    return _results;
  };
  return MaterialItem;
})();var FieldItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
FieldItem = (function() {
  __extends(FieldItem, TreeItem);
  function FieldItem(name, field) {
    if (name == null) {
      name = "Mesh";
    }
    if (field == null) {
      field = new NodalField;
    }
    FieldItem.__super__.constructor.call(this);
    this.add_attr({
      field: field
    });
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
  }
  FieldItem.prototype.sub_canvas_items = function() {
    return [this.field];
  };
  FieldItem.prototype.z_index = function() {
    return this.sub_canvas_items()[0].z_index();
  };
  return FieldItem;
})();var ResultItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ResultItem = (function() {
  __extends(ResultItem, TreeItem);
  function ResultItem(app) {
    var disp;
    ResultItem.__super__.constructor.call(this);
    this.add_attr({
      legend: new Legend("Displacement X")
    });
    disp = this.add_child(new MeshItem(this.legend));
    this._name.set("Results");
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
  }
  ResultItem.prototype.accept_child = function(ch) {
    return ch instanceof SketchItem || ch instanceof ImgItem || ch instanceof MeshItem;
  };
  ResultItem.prototype.z_index = function() {};
  ResultItem.prototype.sub_canvas_items = function() {
    return [this.legend];
  };
  ResultItem.prototype.anim_min_max = function() {};
  return ResultItem;
})();var FieldSetCorreliItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

FieldSetCorreliItem = (function(_super) {

  __extends(FieldSetCorreliItem, _super);

  function FieldSetCorreliItem(name, id_c) {
    if (name == null) name = "Field";
    if (id_c == null) id_c = 0;
    FieldSetCorreliItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,");
    this._viewable.set(true);
    this.add_attr({
      id: id_c,
      visualization: new FieldSet,
      _norm_i_history: [],
      _norm_2_history: [],
      _residual_history: [],
      _residual_adv: new NamedParametrizedDrawable("Residual adv", new InterpolatedField),
      _residual: new NamedParametrizedDrawable("Residual", new InterpolatedField),
      _residual_int_adv: new NamedParametrizedDrawable("Residual int adv", new InterpolatedField),
      _residual_int: new NamedParametrizedDrawable("Residual int", new InterpolatedField)
    });
  }

  FieldSetCorreliItem.prototype.accept_child = function(ch) {
    return false;
  };

  FieldSetCorreliItem.prototype.sub_canvas_items = function() {
    var res;
    res = [this.visualization];
    return res;
  };

  FieldSetCorreliItem.prototype.cosmetic_attribute = function(name) {
    return FieldSetCorreliItem.__super__.cosmetic_attribute.call(this, name) || (name === "visualization" || name === "_residual" || name === "_residual_adv" || name === "_residual_int" || name === "_residual_int_adv" || name === "_norm_i_history" || name === "_norm_2_history" || name === "_residual_history");
  };

  FieldSetCorreliItem.prototype.information = function(div) {
    if (!(this.txt != null)) {
      this.txt = new_dom_element({
        parentNode: div
      });
    }
    return this.txt.innerHTML = this._norm_2_history.get();
  };

  return FieldSetCorreliItem;

})(TreeItem);
var PhysicsItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PhysicsItem = (function() {
  __extends(PhysicsItem, TreeItem);
  function PhysicsItem() {
    PhysicsItem.__super__.constructor.call(this);
    this._name.set("Physics");
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_child(new MaterialItem);
  }
  PhysicsItem.prototype.accept_child = function(ch) {
    return ch instanceof MaterialItem || ch instanceof PickedZoneItem || ch instanceof MaskItem || ch instanceof DiscretizationItem || ch instanceof SketchItem || ch instanceof MeshItem || ch instanceof ImgSetItem || ch instanceof ImgItem || ch instanceof BoundariesSelectionItem;
  };
  PhysicsItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return PhysicsItem;
})();var CorrelationItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CorrelationItem = (function(_super) {

  __extends(CorrelationItem, _super);

  function CorrelationItem() {
    CorrelationItem.__super__.constructor.call(this);
    this._name.set("Correlation");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABEgAAARIBezqkZAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJISURBVDiNhZPNS1RRGMaf99xxzBuahJVmWGAQgSA2QbTIHJNornqvIg2tXVSbaNFCWoW16GtRSBT9BcGEqGNOSOhcdCX41SoiIynpA11oKtM4M+dpEUN3dHAOnMX7ex5+53DgCEkAQDDo7jHL8QDkq5HB4FTcCZ0AjZtCZCh0g9GRfmxbVnjygJHMdGkBQf7fAKXVGe9rbx82423W0+mrgSKSiNutt8Y6QrXermXFK9uc+LNQx1gtSSjvCSRoUPpqZPm2KPkYeDmdAoDiYvO5kVHd2Z4IRIp4dyux1RMbaP4MIFcEAENDTQs1XKojVTzLzkYiCQ1ksnPIGTtJwB0dvbiZZTtEALBPVvdjfX0hB1JW3c7OcgBQ4jtPQya8cV6RH8nEY/NOhZcJMMt0OvBPiiOx/qalgqIybvwQHwNeli75M6egT+Xr5xW9sW1zH9cWIaj38pbIuzWIlDuOe5zCTwVFJllnqNQcIOb2TJOigTNKOFdQpEQ3GOLbUQQApdT6XtmoL/GtfCgoInG0cXDwGwQrtu3mPLjWeH8Mi9WRyOWtXUW9vb0KSvkAgFrPZkQavHlaqfnD+H4o7229w7mZqSahngAAppLzSukc0ZPU9Y0yrvl3Fb0Oh/0KKlxa9WsUAGKx0G8Sld6y4TcvlGHz51vLKs4rmuy6VHUwuXlfQT3M/i8AEMiUZY83A8DpazNFhA5WyPK9Ep+6sV0k43Zrt0BK05SBlmj0a04oEMtxe0RQLWRCtPEiGm384jptVwipCQ4NP8p2/wK2t/N/NeYNxgAAAABJRU5ErkJggg==");
    this._viewable.set(false);
    this.add_child(new PhysicsItem);
    this.add_child(new ImgSetItem);
    this.add_child(new MaskItem);
    this.add_child(new DiscretizationItem);
    this.add_output(new FieldSetCorreliItem);
    this.add_attr({
      parameters: {
        rigid_body: true,
        lum_corr: true,
        uncertainty: false,
        norm_inf: 1e-2,
        norm_2: 0,
        multi_res: new ConstrainedVal(0, {
          min: 0,
          max: 10,
          div: 10
        }),
        nb_iter_max: 10,
        lambda_bulk: 0,
        max_displacement: -1,
        crack_eps_threshold: -1,
        ident: false,
        crack_dir: [1, 0, 0],
        rb_guess: [0, 0, 0]
      }
    });
  }

  CorrelationItem.prototype.accept_child = function(ch) {
    return ch instanceof MaskItem || ch instanceof DiscretizationItem || ch instanceof SketchItem || ch instanceof ImgSetItem || ch instanceof TransformItem || ch instanceof PhysicsItem || ch instanceof BoundariesSelectionItem;
  };

  return CorrelationItem;

})(TreeItem_Computable);
var BoundariesSelectionItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BoundariesSelectionItem = (function() {
  __extends(BoundariesSelectionItem, TreeItem);
  function BoundariesSelectionItem() {
    BoundariesSelectionItem.__super__.constructor.call(this);
    this._viewable.set(true);
  }
  BoundariesSelectionItem.prototype.z_index = function() {
    return 2000;
  };
  BoundariesSelectionItem.prototype.accept_child = function(ch) {
    return ch instanceof PickedZoneItem || ch instanceof DiscretizationItem || ch instanceof SketchItem || ch instanceof MeshItem;
  };
  BoundariesSelectionItem.prototype.is_app_data = function(item) {
    if (item instanceof TreeAppData) {
      return true;
    } else {
      return false;
    }
  };
  BoundariesSelectionItem.prototype.get_app_data = function() {
    var it;
    it = this.get_parents_that_check(this.is_app_data);
    return it[0];
  };
  BoundariesSelectionItem.prototype.draw = function(info) {
    var ch, elem, mesh, p, pe, proj, theme, _i, _len, _ref, _results;
    _ref = this._children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ch = _ref[_i];
      if (ch instanceof PickedZoneItem) {
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = ch.picked_element;
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            pe = _ref2[_j];
            mesh = pe.mesh;
            elem = pe.element;
            proj = (function() {
              var _k, _len3, _ref3, _results3;
              _ref3 = mesh.points;
              _results3 = [];
              for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                p = _ref3[_k];
                _results3.push(info.re_2_sc.proj(p.pos.get()));
              }
              return _results3;
            })();
            _results2.push(__indexOf.call(ch._pelected, elem) >= 0 ? (theme = this._get_theme(info, true), elem.draw(info, mesh, proj, true, theme)) : (theme = this._get_theme(info, false), elem.draw(info, mesh, proj, true, theme)));
          }
          return _results2;
        }).call(this));
      }
    }
    return _results;
  };
  BoundariesSelectionItem.prototype.add_child_mesh = function(msh) {
    var app_data, just_created, path_item, pzi, pzi_path, ski;
    app_data = this.get_app_data();
    if (this._children.length <= 0) {
      just_created = true;
    }
    pzi = new PickedZoneItem(this._border_type);
    this.add_child(pzi);
    ski = new SketchItem;
    pzi.add_child(ski);
    ski.mesh = msh;
    if (just_created === true) {
      path_item = app_data.get_root_path(this);
      app_data.close_item(path_item[0]);
    }
    pzi_path = app_data.get_root_path(pzi);
    app_data.close_item(pzi_path[0]);
    return pzi;
  };
  BoundariesSelectionItem.prototype.create_pzi = function(msh, elem) {
    var pe, pzi;
    pzi = this.add_child_mesh(msh);
    pe = {
      mesh: msh,
      element: elem
    };
    pzi.picked_element.push(pe);
    msh.delete_selected_points_callback.push(__bind(function(msh, index_selected_points) {
      var app_data, ch, ind, isp, pe, _i, _len, _ref, _results;
      _ref = this._children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        if (ch instanceof PickedZoneItem) {
          _results.push((function() {
            var _j, _len2, _ref2, _results2;
            _ref2 = ch.picked_element;
            _results2 = [];
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              pe = _ref2[_j];
              _results2.push((function() {
                var _k, _len3, _ref3, _results3;
                _ref3 = pe.element.indices.get();
                _results3 = [];
                for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                  ind = _ref3[_k];
                  _results3.push((function() {
                    var _l, _len4, _results4;
                    _results4 = [];
                    for (_l = 0, _len4 = index_selected_points.length; _l < _len4; _l++) {
                      isp = index_selected_points[_l];
                      _results4.push(ind === isp ? (app_data = this.get_app_data(), app_data.delete_from_tree(ch)) : void 0);
                    }
                    return _results4;
                  }).call(this));
                }
                return _results3;
              }).call(this));
            }
            return _results2;
          }).call(this));
        }
      }
      return _results;
    }, this));
    elem.cut_with_point_callback = [];
    return elem.cut_with_point_callback.push(__bind(function(msh, indices, np) {
      var modify_line, new_line;
      new_line = new Element_Line([np, indices[1].get()]);
      modify_line = elem;
      modify_line.indices[0].set(indices[0].get());
      modify_line.indices[1].set(np);
      this.create_pzi(msh, modify_line);
      return this.create_pzi(msh, new_line);
    }, this));
  };
  BoundariesSelectionItem.prototype.on_mouse_down = function(cm, evt, pos, b) {
    var app_data, best, ch, el, msh, p, proj, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
    if (b === "LEFT") {
      if (cm._flat != null) {
        app_data = this.get_app_data();
        best = {
          dist: 10
        };
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          if (ch instanceof PickedZoneItem) {
            ch.closest_point_closer_than(best, cm.cam_info, pos);
            if (best.disp != null) {
              app_data.delete_from_tree(best.pzi);
              return true;
            }
          }
        }
        if (!(best.disp != null)) {
          _ref2 = cm._flat;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            msh = _ref2[_j];
            if (msh instanceof Mesh) {
              proj = (function() {
                var _k, _len3, _ref3, _results;
                _ref3 = msh.points;
                _results = [];
                for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                  p = _ref3[_k];
                  _results.push(cm.cam_info.re_2_sc.proj(p.pos.get()));
                }
                return _results;
              })();
              best = {
                dist: 10
              };
              _ref3 = msh._elements;
              for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                el = _ref3[_k];
                if (typeof el.closest_point_closer_than === "function") {
                  el.closest_point_closer_than(best, msh, proj, cm.cam_info, pos);
                }
              }
              _ref4 = msh._sub_elements;
              for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
                el = _ref4[_l];
                if (typeof el.closest_point_closer_than === "function") {
                  el.closest_point_closer_than(best, msh, proj, cm.cam_info, pos);
                }
              }
              if (best.disp != null) {
                this._may_need_snapshot = true;
                this.create_pzi(msh, best.inst);
              }
            }
          }
        }
        return false;
      }
    }
    return false;
  };
  BoundariesSelectionItem.prototype.on_mouse_move = function(cm, evt, pos, b) {
    var best, ch, el, elem, msh, p, proj, res, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _m, _n, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    _ref = this._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ch = _ref[_i];
      if (ch instanceof PickedZoneItem) {
        ch._pelected.clear();
      }
    }
    _ref2 = cm._flat;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      msh = _ref2[_j];
      if (msh instanceof Mesh) {
        msh._pelected_elements.clear();
      }
    }
    if (cm._flat != null) {
      res = [];
      best = {
        dist: 10
      };
      _ref3 = this._children;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        ch = _ref3[_k];
        if (ch instanceof PickedZoneItem) {
          ch.closest_point_closer_than(best, cm.cam_info, pos);
          if (best.disp != null) {
            elem = best.inst;
            if (__indexOf.call(best.pzi._pelected, elem) < 0) {
              best.pzi._pelected.push(elem);
            }
          }
        }
      }
      if (!(best.disp != null)) {
        _ref4 = cm._flat;
        for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
          msh = _ref4[_l];
          if (msh instanceof Mesh) {
            proj = (function() {
              var _len5, _m, _ref5, _results;
              _ref5 = msh.points;
              _results = [];
              for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
                p = _ref5[_m];
                _results.push(cm.cam_info.re_2_sc.proj(p.pos.get()));
              }
              return _results;
            })();
            best = {
              dist: 10
            };
            _ref5 = msh._elements;
            for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
              el = _ref5[_m];
              if (typeof el.closest_point_closer_than === "function") {
                el.closest_point_closer_than(best, msh, proj, cm.cam_info, pos);
              }
            }
            _ref6 = msh._sub_elements;
            for (_n = 0, _len6 = _ref6.length; _n < _len6; _n++) {
              el = _ref6[_n];
              if (typeof el.closest_point_closer_than === "function") {
                el.closest_point_closer_than(best, msh, proj, cm.cam_info, pos);
              }
            }
            if (best.disp != null) {
              elem = best.inst;
              if (__indexOf.call(msh._pelected_elements, elem) < 0) {
                msh._pelected_elements.push(elem);
              }
            }
          }
        }
      }
    }
    return false;
  };
  BoundariesSelectionItem.prototype._get_theme = function(info, hover) {
    var theme;
    if (hover == null) {
      hover = false;
    }
    if (this._border_type != null) {
      if (hover === false) {
        if (this._border_type.get() === 'constrain_displacement') {
          theme = info.theme.constrain_boundary_displacement;
        } else if (this._border_type.get() === 'constrain_strain') {
          theme = info.theme.constrain_boundary_strain;
        } else if (this._border_type.get() === 'constrain_pressure') {
          theme = info.theme.constrain_boundary_pressure;
        } else if (this._border_type.get() === 'free') {
          theme = info.theme.free_boundary;
        }
      } else {
        if (this._border_type.get() === 'constrain_displacement') {
          theme = info.theme.constrain_boundary_displacement_hover;
        } else if (this._border_type.get() === 'constrain_strain') {
          theme = info.theme.constrain_boundary_strain_hover;
        } else if (this._border_type.get() === 'constrain_pressure') {
          theme = info.theme.constrain_boundary_pressure_hover;
        } else if (this._border_type.get() === 'free') {
          theme = info.theme.free_boundary_hover;
        }
      }
      return theme;
    } else {
      return info.theme.lines;
    }
  };
  return BoundariesSelectionItem;
})();var MaskItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MaskItem = (function() {
  __extends(MaskItem, TreeItem);
  function MaskItem(app_data, panel_id) {
    this.app_data = app_data;
    this.panel_id = panel_id;
    MaskItem.__super__.constructor.call(this);
    this._name.set("Mask");
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAACDgAAAg4B2vefHQAAAAd0SU1FB9sKDAwYN4f3JWcAAACgSURBVDjL5dIxCsJAEIXhT40pxcobSFobK0FS6BksPJKH8AyewMZabcU72NkmNisEycYQSx8MA8POv/N2tocNbropS0LztSNA34/6A8AIhxB57NCsAXBBiSLkfV1vDDAPTZ9xrAKaLCwj9RynNm+wCjfWaYEzxk0W7hEL1Xg2TTBpscUiBkjDCr8pjQF2Lf/RMEH2HgdTbLHGI9TLSIbBC+4WJRNEAiZQAAAAAElFTkSuQmCC");
    this._viewable.set(false);
  }
  MaskItem.prototype.accept_child = function(ch) {
    return ch instanceof SketchItem || ch instanceof ImgItem || ch instanceof TransformItem;
  };
  MaskItem.prototype.z_index = function() {};
  MaskItem.prototype.sub_canvas_items = function() {
    return [];
  };
  return MaskItem;
})();