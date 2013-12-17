var Drawable;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Drawable = (function() {
  function Drawable() {
    Drawable.__super__.constructor.apply(this, arguments);
  }
  __extends(Drawable, Model);
  Drawable.prototype.draw = function(info) {};
  Drawable.prototype.update_min_max = function(x_min, x_max) {};
  Drawable.prototype.get_movable_entities = function(res, info, phase) {};
  Drawable.prototype.z_index = function() {
    return 0;
  };
  Drawable.prototype.sub_canvas_items = function() {
    return [];
  };
  return Drawable;
})();var Element;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Element = (function() {
  function Element() {
    Element.__super__.constructor.apply(this, arguments);
  }
  __extends(Element, Model);
  return Element;
})();var ParametrizedDrawable;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ParametrizedDrawable = (function() {
  __extends(ParametrizedDrawable, Drawable);
  function ParametrizedDrawable(data) {
    ParametrizedDrawable.__super__.constructor.call(this);
    this.add_attr({
      data: data
    });
  }
  ParametrizedDrawable.prototype.get_sub_field = function(info) {
    return this.data.get_sub_field(info);
  };
  ParametrizedDrawable.prototype.draw = function(info, additionnal_parameters) {
    this._udpate_parameters_if_necessary();
    return this.data.draw(info, this.drawing_parameters, additionnal_parameters);
  };
  ParametrizedDrawable.prototype.update_min_max = function(x_min, x_max) {
    return this.data.update_min_max(x_min, x_max);
  };
  ParametrizedDrawable.prototype.disp_only_in_model_editor = function() {
    return this.drawing_parameters;
  };
  ParametrizedDrawable.prototype.z_index = function() {
    return this.data.z_index();
  };
  ParametrizedDrawable.prototype._udpate_parameters_if_necessary = function() {
    if (!(this.drawing_parameters != null)) {
      return this.data.get_drawing_parameters(this);
    }
  };
  return ParametrizedDrawable;
})();var Element_WithIndices;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Element_WithIndices = (function() {
  __extends(Element_WithIndices, Element);
  function Element_WithIndices(indices) {
    if (indices == null) {
      indices = [];
    }
    Element_WithIndices.__super__.constructor.call(this);
    this.add_attr({
      indices: indices
    });
  }
  Element_WithIndices.prototype.points_inside = function(tab_ind) {
    var a, i, _i, _j, _len, _len2, _ref;
    for (_i = 0, _len = tab_ind.length; _i < _len; _i++) {
      i = tab_ind[_i];
      _ref = this.indices;
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        a = _ref[_j];
        if (a.equals(i)) {
          return true;
        }
      }
    }
    return false;
  };
  Element_WithIndices.prototype.get_point_numbers = function() {
    return this.indices.get();
  };
  Element_WithIndices.prototype.update_indices = function(done, n_array) {
    var v, _i, _len, _ref, _results;
    if (!(done[this.model_id] != null)) {
      done[this.model_id] = true;
      _ref = this.indices;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(v.set(n_array[v.get()]));
      }
      return _results;
    }
  };
  return Element_WithIndices;
})();var Choice_RestrictedByDim;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Choice_RestrictedByDim = (function() {
  __extends(Choice_RestrictedByDim, Choice);
  function Choice_RestrictedByDim(data, initial_list) {
    if (initial_list == null) {
      initial_list = [];
    }
    Choice_RestrictedByDim.__super__.constructor.call(this, data, initial_list);
    this.add_attr({
      wanted_dim: [2, 3]
    });
  }
  Choice_RestrictedByDim.prototype.filter = function(obj) {
    return this.wanted_dim.contains(obj.dim());
  };
  return Choice_RestrictedByDim;
})();var MoveScheme_2D;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MoveScheme_2D = (function() {
  __extends(MoveScheme_2D, Model);
  function MoveScheme_2D() {
    MoveScheme_2D.__super__.constructor.call(this);
    this.add_attr({
      _O: new Vec_3([0, 0, 0]),
      _N: new Vec_3([0, 0, 1])
    });
  }
  MoveScheme_2D.prototype.beg_click = function(pos) {};
  MoveScheme_2D.prototype.move = function(selected_entities, pos, P, D) {
    var I, bot, dec, m, top, _i, _len, _results;
    top = Vec_3.dot(Vec_3.sub(this._O, P), this._N);
    bot = Vec_3.dot(D, this._N);
    I = Vec_3.add(P, Vec_3.mus(top / bot, D));
    dec = Vec_3.sub(I, pos);
    _results = [];
    for (_i = 0, _len = selected_entities.length; _i < _len; _i++) {
      m = selected_entities[_i];
      if (m instanceof Point) {
        _results.push(m.pos.set(Vec_3.add(m.pos.get(), dec)));
      }
    }
    return _results;
  };
  return MoveScheme_2D;
})();var Cam;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Cam = (function() {
  var TransBuf, TransEye;
  __extends(Cam, Model);
  function Cam(want_aspect_ratio) {
    if (want_aspect_ratio == null) {
      want_aspect_ratio = false;
    }
    Cam.__super__.constructor.call(this);
    this.add_attr({
      threeD: true,
      O: [0, 0, 0],
      X: [1, 0, 0],
      Y: [0, 1, 0],
      C: [0, 0, 0],
      d: 1,
      _O: [0, 0, 0],
      _d: 1,
      a: new ConstrainedVal(20, {
        min: 0,
        max: 80
      })
    });
    if (want_aspect_ratio) {
      this.add_attr({
        r: 1
      });
    }
  }
  Cam.prototype.gl_mat = function(w, h) {
    var O, O_w, X, Y, Z, cx, cy, d_w, f, g, i, p, z_max, z_min;
    X = Vec_3.nor(this.X.get());
    Y = Vec_3.nor(Vec_3.sub(this.Y.get(), Vec_3.mus(Vec_3.dot(X, this.Y.get()), X)));
    Z = Vec_3.nor(Vec_3.cro(X, Y));
    O = [Vec_3.dot(this.O.get(), X), Vec_3.dot(this.O.get(), Y), Vec_3.dot(this.O.get(), Z)];
    f = 2 / this.d.get();
    g = -f;
    cx = Math.min(w, h) / w;
    cy = Math.min(w, h) / h;
    O_w = this._O.get();
    d_w = this._d.get();
    p = Math.tan(this.a.get() * 3.14158 / 360) * 2 / d_w;
    z_max = Vec_3.dot(O_w, Z) + d_w / 2;
    z_min = Vec_3.dot(O_w, Z) - d_w / 2;
    h = 1.0 / (z_max - z_min);
    i = 0.5 * (z_min + z_max) / (z_max - z_min);
    return [cx * f * X[0], cy * f * Y[0], h * Z[0], p * Z[0], cx * f * X[1], cy * f * Y[1], h * Z[1], p * Z[1], cx * f * X[2], cy * f * Y[2], h * Z[2], p * Z[2], cx * g * O[0], cy * g * O[1], -i, 1 - p * O[2]];
  };
  Cam.prototype.gl_attr = function(info, prefix) {
    return "uniform mat4 " + prefix + "_mat;";
  };
  Cam.prototype.gl_attr_vec = function(info, prefix) {
    return "uniform mat3 " + prefix + "_mat;";
  };
  Cam.prototype.gl_main = function(info, prefix) {
    return "gl_Position = " + prefix + "_mat * gl_Position;";
  };
  Cam.prototype.gl_main_vec = function(info, prefix, norm_val, norm_var) {
    return "" + norm_var + " = " + prefix + "_mat * " + norm_val + ";";
  };
  Cam.prototype.gl_exec = function(info, prefix, prog) {
    var gl, mat, proj_mat;
    mat = this.gl_mat(info.w, info.h);
    gl = info.ctx;
    proj_mat = gl.getUniformLocation(prog, "" + prefix + "_mat");
    return gl.uniformMatrix4fv(proj_mat, false, new Float32Array(mat));
  };
  Cam.prototype.gl_exec_vec = function(info, prefix, prog) {
    var X, Y, Z, gl, mat, proj_mat;
    X = Vec_3.nor(this.X.get());
    Y = Vec_3.nor(Vec_3.sub(this.Y.get(), Vec_3.mus(Vec_3.dot(X, this.Y.get()), X)));
    Z = Vec_3.nor(Vec_3.cro(X, Y));
    mat = [X[0], Y[0], Z[0], X[1], Y[1], Z[1], X[2], Y[2], Z[2]];
    gl = info.ctx;
    proj_mat = gl.getUniformLocation(prog, "" + prefix + "_mat");
    return gl.uniformMatrix3fv(proj_mat, false, new Float32Array(mat));
  };
  Cam.prototype.focal_point = function() {
    var ap, nZ;
    nZ = Vec_3.nor(Vec_3.cro(this.X.get(), this.Y.get()));
    ap = Math.tan(this.a.get() / 2 * 3.14159265358979323846 / 180);
    return [this.O[0].get() - 0.5 * this.d.get() / ap * nZ[0], this.O[1].get() - 0.5 * this.d.get() / ap * nZ[1], this.O[2].get() - 0.5 * this.d.get() / ap * nZ[2]];
  };
  Cam.prototype.pan = function(x, y, w, h, ctrl_key) {
    var c, d, r, _results;
    if (ctrl_key == null) {
      ctrl_key = false;
    }
    if (ctrl_key) {
      x /= 10;
      y /= 10;
    }
    c = this.d.get() / Math.min(w, h);
    r = this.r || 1;
    x *= c * r;
    y *= c;
    _results = [];
    for (d = 0; d <= 2; d++) {
      _results.push(this.O[d].set(this.O[d].get() - x * this.X[d].get() + y * this.Y[d].get()));
    }
    return _results;
  };
  Cam.prototype.zoom = function(x, y, c, w, h) {
    var n_re_2_sc, o, o_sc_2_rw, p;
    if (typeof c === "number") {
      return zoom(x, y, [c, c], w, h);
    } else {
      o_sc_2_rw = this.sc_2_rw(w, h);
      o = o_sc_2_rw.pos(x, y);
      this.d.set(this.d.get() / c[1]);
      if (this.r != null) {
        this.r.set(this.r.get() * c[1] / c[0]);
      }
      n_re_2_sc = this.re_2_sc(w, h);
      p = n_re_2_sc.proj(o);
      return this.pan(x - p[0], y - p[1], w, h);
    }
  };
  Cam.prototype.rotate = function(x, y, z) {
    var R;
    if (this.threeD.get()) {
      R = this.s_to_w_vec([x, y, z]);
      this.X.set(Vec_3.rot(this.X.get(), R));
      this.Y.set(Vec_3.rot(this.Y.get(), R));
      return this.O.set(Vec_3.add(this.C.get(), Vec_3.rot(Vec_3.sub(this.O.get(), this.C.get()), R)));
    }
  };
  Cam.prototype.re_2_sc = function(w, h) {
    return new TransBuf(this.gl_mat(w, h), w, h);
  };
  Cam.prototype.sc_2_rw = function(w, h) {
    return new TransEye(this.gl_mat(w, h), w, h);
  };
  Cam.prototype.equal = function(l) {
    var ap_3;
    ap_3 = function(a, b, e) {
      if (e == null) {
        e = 1e-3;
      }
      return Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e && Math.abs(a[2] - b[2]) < e;
    };
    if ((this.r != null) && (l.r != null) && l.r.get() !== this.r.get()) {
      return false;
    }
    return l.w === this.w && l.h === this.h && ap_3(l.O, this.O) && ap_3(l.X, this.X) && ap_3(l.Y, this.Y) && Math.abs(l.a - this.a) < 1e-3 && Math.abs(l.d - this.d) / this.d < 1e-3;
  };
  Cam.prototype.s_to_w_vec = function(V) {
    var X, Y, Z;
    X = Vec_3.nor(this.X.get());
    Y = Vec_3.nor(this.Y.get());
    Z = Vec_3.nor(Vec_3.cro(X, Y));
    return [V[0] * this.X[0] + V[1] * this.Y[0] + V[2] * Z[0], V[0] * this.X[1] + V[1] * this.Y[1] + V[2] * Z[1], V[0] * this.X[2] + V[1] * this.Y[2] + V[2] * Z[2]];
  };
  Cam.prototype.get_X = function() {
    return Vec_3.nor(this.X.get());
  };
  Cam.prototype.get_Y = function() {
    return Vec_3.nor(this.Y.get());
  };
  Cam.prototype.get_Z = function() {
    return Vec_3.nor(Vec_3.cro(this.X.get(), this.Y.get()));
  };
  Cam.prototype.get_a = function() {
    return this.a.get();
  };
  Cam.prototype.get_screen_coord = function(coord) {
    var Cx, Cy, Cz, O, X, Y, Z, d, x, y, z;
    x = coord[0];
    y = coord[1];
    z = coord[2] || 0;
    O = this.O.get();
    X = this.X.get();
    Y = this.Y.get();
    Z = this.get_Z();
    d = this.d;
    Cx = Vec_3.mus(d * x, X);
    Cy = Vec_3.mus(d * y, Y);
    Cz = Vec_3.mus(d * z, Z);
    return Vec_3.add(O, Vec_3.add(Cx, Vec_3.add(Cy, Cz)));
  };
  TransEye = (function() {
    function TransEye(mat, w, h) {
      this.mat = mat;
      this.w = w;
      this.h = h;
    }
    TransEye.prototype.dir = function(x, y) {
      return Vec_3.nor(Vec_3.sub(Vec_3.solve(this.mat, [x, y, 0.5, 1]), Vec_3.solve(this.mat, [x, y, -0.5, 1])));
    };
    TransEye.prototype.pos = function(x, y, z) {
      var R;
      if (z == null) {
        z = 0;
      }
      R = Vec_3.solve(this.mat, [2 * x / this.w - 1, 1 - 2 * y / this.h, z, 1]);
      return [R[0] / R[3], R[1] / R[3], R[2] / R[3]];
    };
    return TransEye;
  })();
  TransBuf = (function() {
    function TransBuf(mat, w, h) {
      this.mat = mat;
      this.w = w;
      this.h = h;
    }
    TransBuf.prototype.proj = function(P) {
      var R;
      R = [this.mat[0 + 4 * 0] * P[0] + this.mat[0 + 4 * 1] * P[1] + this.mat[0 + 4 * 2] * P[2] + this.mat[0 + 4 * 3], this.mat[1 + 4 * 0] * P[0] + this.mat[1 + 4 * 1] * P[1] + this.mat[1 + 4 * 2] * P[2] + this.mat[1 + 4 * 3], this.mat[2 + 4 * 0] * P[0] + this.mat[2 + 4 * 1] * P[1] + this.mat[2 + 4 * 2] * P[2] + this.mat[2 + 4 * 3], this.mat[3 + 4 * 0] * P[0] + this.mat[3 + 4 * 1] * P[1] + this.mat[3 + 4 * 2] * P[2] + this.mat[3 + 4 * 3]];
      return [0.5 * this.w * (1 + R[0] / R[3]), 0.5 * this.h * (1 - R[1] / R[3]), R[2] / R[3]];
    };
    return TransBuf;
  })();
  return Cam;
})();var ServerAssistedVisualization;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ServerAssistedVisualization = (function() {
  __extends(ServerAssistedVisualization, Model);
  function ServerAssistedVisualization(app, bs) {
    var ds;
    ServerAssistedVisualization.__super__.constructor.call(this);
    this.add_attr({
      data: app.data,
      layout: {}
    });
    ds = app.data.selected_display_settings();
    bind([bs, ds._layout], __bind(function() {
      var d, lay, lid, lm, mid, used_lid, _i, _len, _ref, _ref2, _ref3, _results;
      used_lid = {};
      _ref = app.layouts;
      for (mid in _ref) {
        lm = _ref[mid];
        _ref2 = lm._pan_vs_id;
        for (lid in _ref2) {
          lay = _ref2[lid];
          if (lay.cm != null) {
            if (!(this.layout[lid] != null)) {
              this.layout.add_attr(lid, {
                width: 0,
                height: 0
              });
            }
            this.layout[lid].width.set(lay.cm.canvas.width);
            this.layout[lid].height.set(lay.cm.canvas.height);
            used_lid[lid] = true;
          }
        }
      }
      _ref3 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.layout._attribute_names;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lid = _ref[_i];
          if (!(used_lid[lid] != null)) {
            _results.push(lid);
          }
        }
        return _results;
      }).call(this);
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        d = _ref3[_i];
        _results.push(this.layout.rem_attr(d));
      }
      return _results;
    }, this));
  }
  return ServerAssistedVisualization;
})();var Lst_Point;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Lst_Point = (function() {
  function Lst_Point() {
    Lst_Point.__super__.constructor.apply(this, arguments);
  }
  __extends(Lst_Point, Lst);
  Lst_Point.prototype.base_type = function() {
    return Point;
  };
  Lst_Point.prototype.dim = function() {
    return 2;
  };
  Lst_Point.prototype._underlying_fs_type = function() {
    return "Lst";
  };
  return Lst_Point;
})();var MoveScheme_3D;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MoveScheme_3D = (function() {
  __extends(MoveScheme_3D, Model);
  function MoveScheme_3D() {
    MoveScheme_3D.__super__.constructor.call(this);
    this.add_attr({
      _req_pos: new Vec_3,
      _req_dir: new Vec_3,
      _old_pos: new Vec_3,
      _old_dir: new Vec_3
    });
    this.cos_for_move_req_old_dir = 0.7;
    this._beg_click = false;
  }
  MoveScheme_3D.prototype.beg_click = function(pos) {
    return this._beg_click = true;
  };
  MoveScheme_3D.prototype.move = function(selected_entities, pos, p_0, d_0) {
    var c_00, c_01, c_11, d, d_1, del, dete, dok, l_0, m, p_1, ve_0, ve_1, _i, _len;
    if (this._beg_click) {
      this._beg_click = false;
      d_1 = this._old_dir.get();
      dok = d_1[0] || d_1[1] || d_1[2];
      if (dok && Math.abs(Vec_3.dot(d_0, d_1)) < this.cos_for_move_req_old_dir) {
        this._req_pos.set(this._old_pos);
        this._req_dir.set(this._old_dir);
      }
    }
    l_0 = Vec_3.dot(Vec_3.sub(pos.get(), p_0), d_0);
    p_1 = this._req_pos.get();
    d_1 = this._req_dir.get();
    if (d_1[0] || d_1[1] || d_1[2]) {
      c_00 = d_0[0] * d_0[0] + d_0[1] * d_0[1] + d_0[2] * d_0[2];
      c_01 = d_0[0] * d_1[0] + d_0[1] * d_1[1] + d_0[2] * d_1[2];
      c_11 = d_1[0] * d_1[0] + d_1[1] * d_1[1] + d_1[2] * d_1[2];
      dete = c_00 * c_11 - c_01 * c_01;
      ve_0 = d_0[0] * (p_0[0] - p_1[0]) + d_0[1] * (p_0[1] - p_1[1]) + d_0[2] * (p_0[2] - p_1[2]);
      ve_1 = d_1[0] * (p_0[0] - p_1[0]) + d_1[1] * (p_0[1] - p_1[1]) + d_1[2] * (p_0[2] - p_1[2]);
      l_0 = (c_01 * ve_1 - c_11 * ve_0) / dete;
    }
    del = (function() {
      var _results;
      _results = [];
      for (d = 0; d <= 2; d++) {
        _results.push(p_0[d] + d_0[d] * l_0 - pos[d].get());
      }
      return _results;
    })();
    for (_i = 0, _len = selected_entities.length; _i < _len; _i++) {
      m = selected_entities[_i];
      if (m instanceof Point) {
        for (d = 0; d <= 2; d++) {
          m.pos[d].set(m.pos[d].get() + del[d]);
        }
      }
    }
    this._old_pos.set(p_0);
    return this._old_dir.set(d_0);
  };
  return MoveScheme_3D;
})();var Mesh;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Mesh = (function() {
  __extends(Mesh, Drawable);
  function Mesh(params) {
    if (params == null) {
      params = {};
    }
    Mesh.__super__.constructor.call(this);
    this.add_attr({
      visualization: {
        display_style: new Choice(3, ["Points", "Wireframe", "Surface", "Surface with Edges"]),
        point_edition: (!params.not_editable ? true : void 0)
      },
      points: new Lst_Point,
      _elements: [],
      _selected_points: [],
      _pelected_points: [],
      _selected_elements: [],
      _pelected_elements: []
    });
    this.move_scheme = MoveScheme_3D;
    this._sub_elements = [];
    this._sub_date = -1;
    this.delete_selected_points_callback = [];
  }
  Mesh.prototype.add_point = function(pos) {
    var res;
    if (pos == null) {
      pos = [0, 0, 0];
    }
    res = new Point(pos, new this.move_scheme);
    this.points.push(res);
    return res;
  };
  Mesh.prototype.add_element = function(element) {
    return this._elements.push(element);
  };
  Mesh.prototype.nb_points = function() {
    return this.points.length;
  };
  Mesh.prototype.nb_elements = function() {
    var el, res, _i, _len, _ref;
    res = 0;
    _ref = this._elements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (typeof el.indices.size(1) === "number") {
        res += el.indices.size(1);
      }
    }
    return res;
  };
  Mesh.prototype.real_change = function() {
    var a, _i, _len, _ref;
    _ref = [this.points, this._elements];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      if (a.real_change()) {
        return true;
      }
    }
    return false;
  };
  Mesh.prototype.z_index = function() {
    return 1000;
  };
  Mesh.prototype.clear = function() {
    this.points.clear();
    return this._elements.clear();
  };
  Mesh.prototype.draw = function(info) {
    var draw_points, el, i, n, p, proj, _i, _j, _k, _l, _len, _len10, _len11, _len12, _len13, _len14, _len15, _len16, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results, _s, _t, _u, _v, _w, _x;
    if (info.ctx_type === 'gl') {
      _ref = this._elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.draw_gl(info, this, this.points);
      }
      draw_points = false;
      if (((_ref2 = this.visualization.point_edition) != null ? _ref2.get() : void 0) && (info.sel_item[this.model_id] != null)) {
        proj = (function() {
          var _len, _ref, _results;
          _ref = this.points;
          _results = [];
          for (i = 0, _len = _ref.length; i < _len; i++) {
            p = _ref[i];
            _results.push(info.re_2_sc.proj(p.pos.get()));
          }
          return _results;
        }).call(this);
        info.theme.editable_points.beg_ctx(info);
        for (_j = 0, _len2 = proj.length; _j < _len2; _j++) {
          p = proj[_j];
          info.theme.points.draw_proj(info, p);
        }
        info.theme.editable_points.end_ctx(info);
        if (this._selected_points.length) {
          info.theme.selected_points.beg_ctx(info);
          _ref3 = this._selected_points;
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            p = _ref3[_k];
            n = info.re_2_sc.proj(p.pos.get());
            info.theme.selected_points.draw_proj(info, n);
          }
          info.theme.selected_points.end_ctx(info);
        }
        if (this._pelected_points.length) {
          info.theme.highlighted_points.beg_ctx(info);
          _ref4 = this._pelected_points;
          for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
            p = _ref4[_l];
            n = info.re_2_sc.proj(p.pos.get());
            info.theme.highlighted_points.draw_proj(info, n);
          }
          info.theme.highlighted_points.end_ctx(info);
        }
      } else if (this.visualization.display_style.equals("Points")) {
        info.theme.points.beg_ctx(info);
        for (_m = 0, _len5 = proj.length; _m < _len5; _m++) {
          p = proj[_m];
          info.theme.points.draw_proj(info, p);
        }
        info.theme.points.end_ctx(info);
      }
      this._update_sub_elements();
      _ref5 = this._sub_elements;
      for (_n = 0, _len6 = _ref5.length; _n < _len6; _n++) {
        el = _ref5[_n];
        el.draw_gl(info, this, this.points, true);
      }
      if (this._selected_elements.length) {
        _ref6 = this._pelected_points;
        for (_o = 0, _len7 = _ref6.length; _o < _len7; _o++) {
          el = _ref6[_o];
          el.draw_gl(info, this, this.points, true, info.theme.selected_elements);
        }
      }
      if (this._pelected_elements.length) {
        _ref7 = this._pelected_elements;
        for (_p = 0, _len8 = _ref7.length; _p < _len8; _p++) {
          el = _ref7[_p];
          el.draw_gl(info, this, this.points, true, info.theme.highlighted_elements);
        }
      }
      return true;
    }
    if ((_ref8 = this.points) != null ? _ref8.length : void 0) {
      proj = (function() {
        var _len, _ref, _results;
        _ref = this.points;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          p = _ref[i];
          _results.push(info.re_2_sc.proj(p.pos.get()));
        }
        return _results;
      }).call(this);
      _ref9 = this._elements;
      for (_q = 0, _len9 = _ref9.length; _q < _len9; _q++) {
        el = _ref9[_q];
        el.draw(info, this, proj);
      }
      draw_points = false;
      if (((_ref10 = this.visualization.point_edition) != null ? _ref10.get() : void 0) && (info.sel_item[this.model_id] != null)) {
        info.theme.editable_points.beg_ctx(info);
        for (_r = 0, _len10 = proj.length; _r < _len10; _r++) {
          p = proj[_r];
          info.theme.points.draw_proj(info, p);
        }
        info.theme.editable_points.end_ctx(info);
        if (this._selected_points.length) {
          info.theme.selected_points.beg_ctx(info);
          _ref11 = this._selected_points;
          for (_s = 0, _len11 = _ref11.length; _s < _len11; _s++) {
            p = _ref11[_s];
            n = info.re_2_sc.proj(p.pos.get());
            info.theme.selected_points.draw_proj(info, n);
          }
          info.theme.selected_points.end_ctx(info);
        }
        if (this._pelected_points.length) {
          info.theme.highlighted_points.beg_ctx(info);
          _ref12 = this._pelected_points;
          for (_t = 0, _len12 = _ref12.length; _t < _len12; _t++) {
            p = _ref12[_t];
            n = info.re_2_sc.proj(p.pos.get());
            info.theme.highlighted_points.draw_proj(info, n);
          }
          info.theme.highlighted_points.end_ctx(info);
        }
      } else if (this.visualization.display_style.equals("Points")) {
        info.theme.points.beg_ctx(info);
        for (_u = 0, _len13 = proj.length; _u < _len13; _u++) {
          p = proj[_u];
          info.theme.points.draw_proj(info, p);
        }
        info.theme.points.end_ctx(info);
      }
      this._update_sub_elements();
      _ref13 = this._sub_elements;
      for (_v = 0, _len14 = _ref13.length; _v < _len14; _v++) {
        el = _ref13[_v];
        el.draw(info, this, proj, true);
      }
      if (this._selected_elements.length) {
        _ref14 = this._pelected_points;
        for (_w = 0, _len15 = _ref14.length; _w < _len15; _w++) {
          el = _ref14[_w];
          el.draw(info, this, proj, true, info.theme.selected_elements);
        }
      }
      if (this._pelected_elements.length) {
        _ref15 = this._pelected_elements;
        _results = [];
        for (_x = 0, _len16 = _ref15.length; _x < _len16; _x++) {
          el = _ref15[_x];
          _results.push(el.draw(info, this, proj, true, info.theme.highlighted_elements));
        }
        return _results;
      }
    }
  };
  Mesh.prototype.on_mouse_down = function(cm, evt, pos, b, old, points_allowed) {
    var best, divisions, el, ip, nl, np, p, proj, res, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5;
    if (points_allowed == null) {
      points_allowed = true;
    }
    delete this._moving_point;
    if ((_ref = this.visualization.point_edition) != null ? _ref.get() : void 0) {
      if (b === "LEFT" || b === "RIGHT") {
        if (points_allowed) {
          proj = (function() {
            var _i, _len, _ref, _results;
            _ref = this.points;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              p = _ref[_i];
              _results.push(cm.cam_info.re_2_sc.proj(p.pos.get()));
            }
            return _results;
          }).call(this);
          best = this._closest_point_closer_than(proj, pos, 10);
          if (best >= 0) {
            if (evt.ctrlKey) {
              this._ctrlKey = true;
              if (this._selected_points.toggle_ref(this.points[best])) {
                this._moving_point = this.points[best];
                this._moving_point.beg_click(pos);
              }
            } else {
              this._ctrlKey = false;
              if (!this._selected_points.contains_ref(this.points[best])) {
                this._selected_points.clear();
                this._selected_points.set([this.points[best]]);
              }
              this._moving_point = this.points[best];
              this._moving_point.beg_click(pos);
            }
            if (b === "RIGHT") {
              return false;
            }
            return true;
          } else {
            this._pelected_points.clear();
          }
          best = {
            dist: 4
          };
          _ref2 = this._elements;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            el = _ref2[_i];
            if (typeof el.closest_point_closer_than === "function") {
              el.closest_point_closer_than(best, this, proj, cm.cam_info, pos);
            }
          }
          _ref3 = this._sub_elements;
          for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
            el = _ref3[_j];
            if (typeof el.closest_point_closer_than === "function") {
              el.closest_point_closer_than(best, this, proj, cm.cam_info, pos);
            }
          }
          if (best.disp != null) {
            np = this.points.length;
            ip = this.add_point(best.disp);
            this._selected_points.clear();
            this._selected_points.set([ip]);
            this._moving_point = ip;
            this._moving_point.beg_click(pos);
            res = [];
            divisions = {};
            _ref4 = this._elements;
            for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
              el = _ref4[_k];
              if (typeof el.cut_with_point === "function") {
                el.cut_with_point(divisions, best, this, np, ip);
              }
              if (divisions[el.model_id] != null) {
                _ref5 = divisions[el.model_id];
                for (_l = 0, _len4 = _ref5.length; _l < _len4; _l++) {
                  nl = _ref5[_l];
                  res.push(nl);
                }
              } else {
                res.push(el);
              }
            }
            this._elements.clear();
            this._elements.set(res);
          }
        }
      }
    }
    return false;
  };
  Mesh.prototype.on_mouse_up_wo_move = function(cm, evt, pos, b, points_allowed) {
    var p;
    if (points_allowed == null) {
      points_allowed = true;
    }
    if ((this._moving_point != null) && !this._ctrlKey && this._selected_points.length > 1) {
      p = this._selected_points.back();
      this._selected_points.clear();
      this._selected_points.set([p]);
      return true;
    }
  };
  Mesh.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var best, d_0, el, p, p_0, proj, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4;
    if ((_ref = this.visualization.point_edition) != null ? _ref.get() : void 0) {
      if ((this._moving_point != null) && b === "LEFT") {
        if ((_ref2 = cm.undo_manager) != null) {
          _ref2.snapshot();
        }
        p_0 = cm.cam_info.sc_2_rw.pos(pos[0], pos[1]);
        d_0 = cm.cam_info.sc_2_rw.dir(pos[0], pos[1]);
        this._moving_point.move(this._selected_points, this._moving_point.pos, p_0, d_0);
        return true;
      }
      proj = (function() {
        var _i, _len, _ref, _results;
        _ref = this.points;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(cm.cam_info.re_2_sc.proj(p.pos.get()));
        }
        return _results;
      }).call(this);
      best = this._closest_point_closer_than(proj, pos, 10);
      if (best >= 0) {
        this._pelected_points.clear();
        this._pelected_points.set([this.points[best]]);
        return true;
      }
      best = {
        dist: 4
      };
      _ref3 = this._elements;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        el = _ref3[_i];
        if (typeof el.closest_point_closer_than === "function") {
          el.closest_point_closer_than(best, this, proj, cm.cam_info, pos);
        }
      }
      _ref4 = this._sub_elements;
      for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
        el = _ref4[_j];
        if (typeof el.closest_point_closer_than === "function") {
          el.closest_point_closer_than(best, this, proj, cm.cam_info, pos);
        }
      }
      if (best.disp != null) {
        this._pelected_points.clear();
        this._pelected_points.set([new Point(best.disp)]);
        return true;
      }
    }
    this._pelected_points.clear();
    return false;
  };
  Mesh.prototype.update_min_max = function(x_min, x_max) {
    var d, m, p, _i, _len, _ref, _results;
    _ref = this.points;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      p = m.pos.get();
      _results.push((function() {
        var _results;
        _results = [];
        for (d = 0; d < 3; d++) {
          x_min[d] = Math.min(x_min[d], p[d]);
          _results.push(x_max[d] = Math.max(x_max[d], p[d]));
        }
        return _results;
      })());
    }
    return _results;
  };
  Mesh.prototype.make_curve_line_from_selected = function() {
    var el, index_selected_points, sel_point, _i, _len, _results;
    index_selected_points = this._get_indices_of_selected_points();
    if (index_selected_points.length) {
      _results = [];
      for (_i = 0, _len = index_selected_points.length; _i < _len; _i++) {
        sel_point = index_selected_points[_i];
        _results.push((function() {
          var _i, _len, _ref, _results;
          _ref = this._elements;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            _results.push(el.make_curve_line_from_selected(sel_point));
          }
          return _results;
        }).call(this));
      }
      return _results;
    }
  };
  Mesh.prototype.break_line_from_selected = function() {
    var el, index_selected_points, sel_point, _i, _len, _results;
    index_selected_points = this._get_indices_of_selected_points();
    if (index_selected_points.length) {
      _results = [];
      for (_i = 0, _len = index_selected_points.length; _i < _len; _i++) {
        sel_point = index_selected_points[_i];
        _results.push((function() {
          var _i, _len, _ref, _results;
          _ref = this._elements;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            _results.push(el.break_line_from_selected(sel_point));
          }
          return _results;
        }).call(this));
      }
      return _results;
    }
  };
  Mesh.prototype.delete_selected_point = function() {
    var done, el, fun, i, ind, index_selected_points, j, n_array, p, sel_point, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _results;
    index_selected_points = this._get_indices_of_selected_points();
    if (index_selected_points.length > 0) {
      _results = [];
      for (ind = _ref = index_selected_points.length - 1; (_ref <= 0 ? ind <= 0 : ind >= 0); (_ref <= 0 ? ind += 1 : ind -= 1)) {
        sel_point = index_selected_points[ind];
        p = this.points[sel_point];
        n_array = (function() {
          var _ref, _results;
          _results = [];
          for (i = 0, _ref = this.points.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
            _results.push(i);
          }
          return _results;
        }).call(this);
        n_array[sel_point] = -1;
        for (j = _ref2 = sel_point + 1, _ref3 = this.points.length; (_ref2 <= _ref3 ? j < _ref3 : j > _ref3); (_ref2 <= _ref3 ? j += 1 : j -= 1)) {
          n_array[j] -= 1;
        }
        _ref4 = this._elements;
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          el = _ref4[_i];
          if (typeof el.rem_sub_element === "function") {
            el.rem_sub_element(sel_point);
          }
        }
        this._selected_points.remove_ref(p);
        this._pelected_points.remove_ref(p);
        this.points.splice(sel_point, 1);
        _ref5 = this.delete_selected_points_callback;
        for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
          fun = _ref5[_j];
          fun(this, index_selected_points);
        }
        done = {};
        _results.push((function() {
          var _i, _len, _ref, _results;
          _ref = this._elements;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            _results.push(typeof el.update_indices === "function" ? el.update_indices(done, n_array) : void 0);
          }
          return _results;
        }).call(this));
      }
      return _results;
    }
  };
  Mesh.prototype._actualise_indices = function(array, val, index) {
    var ind, _i, _len, _ref, _results;
    if (index == null) {
      index = 0;
    }
    if (array.length && val !== 0 && index >= 0 && index <= array.length - 1) {
      _ref = array.slice(index, array.length);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ind = _ref[_i];
        _results.push(array[ind].set(array[ind].get() + val));
      }
      return _results;
    }
  };
  Mesh.prototype._get_indices_of_selected_points = function() {
    var index_selected_points, j, point, sel_point, _i, _len, _len2, _ref, _ref2;
    index_selected_points = [];
    _ref = this.points;
    for (j = 0, _len = _ref.length; j < _len; j++) {
      point = _ref[j];
      _ref2 = this._selected_points;
      for (_i = 0, _len2 = _ref2.length; _i < _len2; _i++) {
        sel_point = _ref2[_i];
        if (point === sel_point) {
          index_selected_points.push(j);
        }
      }
    }
    return index_selected_points;
  };
  Mesh.prototype._update_sub_elements = function() {
    var e, l, n, oi, _base, _results;
    if (this._sub_date < this._elements._date_last_modification) {
      this._sub_date = this._elements._date_last_modification;
      l = (function() {
        var _i, _len, _ref, _results;
        _ref = this._elements;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          _results.push(e);
        }
        return _results;
      }).call(this);
      this._sub_elements = [];
      _results = [];
      while (l.length) {
        oi = this._sub_elements.length;
        if (typeof (_base = l.pop()).add_sub_element === "function") {
          _base.add_sub_element(this._sub_elements);
        }
        _results.push((function() {
          var _i, _len, _ref, _results;
          _ref = this._sub_elements.slice(oi);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            n = _ref[_i];
            _results.push(l.push(n));
          }
          return _results;
        }).call(this));
      }
      return _results;
    }
  };
  Mesh.prototype._closest_point_closer_than = function(proj, pos, dist) {
    var best, d, n, p, _len;
    best = -1;
    for (n = 0, _len = proj.length; n < _len; n++) {
      p = proj[n];
      d = Math.sqrt(Math.pow(pos[0] - p[0], 2) + Math.pow(pos[1] - p[1], 2));
      if (dist > d) {
        dist = d;
        best = n;
      }
    }
    return best;
  };
  return Mesh;
})();var Transform;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Transform = (function() {
  __extends(Transform, Drawable);
  function Transform() {
    Transform.__super__.constructor.call(this);
    this.add_attr({
      cur_points: new Lst_Point,
      old_points: new Lst_Point,
      lock: true,
      _selected: new Lst,
      _pre_sele: new Lst
    });
  }
  Transform.prototype.z_index = function() {
    return 1000;
  };
  Transform.prototype.draw = function(info) {
    var draw_point, item, n, p, proj, selected, _i, _j, _len, _len2, _pre_sele, _ref, _ref2, _ref3, _results;
    draw_point = info.sel_item[this.model_id];
    if (this.cur_points.length && draw_point) {
      selected = {};
      _ref = this._selected;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        selected[item.model_id] = true;
      }
      _pre_sele = {};
      _ref2 = this._pre_sele;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        item = _ref2[_j];
        _pre_sele[item.model_id] = true;
      }
      proj = (function() {
        var _i, _len, _ref, _results;
        _ref = this.cur_points;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(info.re_2_sc.proj(p.pos.get()));
        }
        return _results;
      }).call(this);
      _results = [];
      for (n = 0, _ref3 = proj.length; (0 <= _ref3 ? n < _ref3 : n > _ref3); (0 <= _ref3 ? n += 1 : n -= 1)) {
        info.ctx.lineWidth = 1;
        info.ctx.strokeStyle = "#333311";
        info.ctx.fillStyle = "#333311";
        p = proj[n];
        if (selected[this.cur_points[n].model_id] != null) {
          info.ctx.strokeStyle = "#FF0000";
        } else {
          info.ctx.strokeStyle = "#FFFF00";
        }
        info.ctx.beginPath();
        info.ctx.arc(p[0], p[1], 4, 0, Math.PI * 2, true);
        info.ctx.closePath();
        info.ctx.fill();
        info.ctx.stroke();
        _results.push(_pre_sele[this.cur_points[n].model_id] != null ? (info.ctx.fillStyle = "#FFFF22", info.ctx.beginPath(), info.ctx.lineWidth = 0.8, info.ctx.arc(p[0], p[1], 3, 0, Math.PI * 2, true), info.ctx.fill(), info.ctx.closePath()) : void 0);
      }
      return _results;
    }
  };
  Transform.prototype.get_movable_entities = function(res, info, pos, phase) {
    var d, draw_point, dx, dy, i, p, proj, x, y, _len, _ref, _ref2, _results;
    draw_point = info.sel_item[this.model_id];
    if (this.cur_points.length && draw_point) {
      x = pos[0];
      y = pos[1];
      if (phase === 0) {
        _ref = this.cur_points;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          p = _ref[i];
          proj = info.re_2_sc.proj(p.pos.get());
          dx = x - proj[0];
          dy = y - proj[1];
          d = Math.sqrt(dx * dx + dy * dy);
          _results.push(d <= 10 ? (res.push({
            item: p,
            dist: d,
            type: "Transform"
          }), ((_ref2 = this.lock) != null ? _ref2.get() : void 0) === false ? res.push({
            item: this.old_points[i],
            dist: d,
            type: "Transform"
          }) : void 0) : void 0);
        }
        return _results;
      }
    }
  };
  Transform.prototype.on_mouse_down = function(cm, evt, pos, b) {
    var phase, res;
    delete this._movable_entity;
    if (b === "LEFT" || b === "RIGHT") {
      for (phase = 0; phase < 3; phase++) {
        res = [];
        this.get_movable_entities(res, cm.cam_info, pos, phase);
        if (res.length) {
          res.sort(function(a, b) {
            return b.dist - a.dist;
          });
          this._movable_entity = res[0].item;
          if (evt.ctrlKey) {
            this._selected.toggle_ref(this._movable_entity);
            if (!this._selected.contains_ref(this._movable_entity)) {
              delete this._movable_entity;
            }
          } else {
            this._selected.clear();
            this._selected.push(this._movable_entity);
            this._movable_entity.beg_click(pos);
          }
          if (b === "RIGHT") {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  };
  Transform.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var d, d_0, dx, dy, i, p, p_0, proj, res, x, y, _len, _ref, _ref2;
    if (b === "LEFT" && (this._movable_entity != null)) {
      if ((_ref = cm.undo_manager) != null) {
        _ref.snapshot();
      }
      p_0 = cm.cam_info.sc_2_rw.pos(pos[0], pos[1]);
      d_0 = cm.cam_info.sc_2_rw.dir(pos[0], pos[1]);
      this._movable_entity.move(this._selected, this._movable_entity.pos, p_0, d_0);
      return true;
    }
    res = [];
    x = pos[0];
    y = pos[1];
    if (this.cur_points.length) {
      _ref2 = this.cur_points;
      for (i = 0, _len = _ref2.length; i < _len; i++) {
        p = _ref2[i];
        proj = cm.cam_info.re_2_sc.proj(p.pos.get());
        dx = x - proj[0];
        dy = y - proj[1];
        d = Math.sqrt(dx * dx + dy * dy);
        if (d <= 10) {
          res.push({
            item: p,
            dist: d
          });
        }
      }
    }
    if (res.length) {
      res.sort(function(a, b) {
        return b.dist - a.dist;
      });
      if (this._pre_sele.length !== 1 || this._pre_sele[0] !== res[0].item) {
        this._pre_sele.clear();
        this._pre_sele.push(res[0].item);
      }
    } else if (this._pre_sele.length) {
      this._pre_sele.clear();
    }
    return false;
  };
  return Transform;
})();var PointMesher;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PointMesher = (function() {
  __extends(PointMesher, Drawable);
  function PointMesher(pos, density, radius) {
    if (pos == null) {
      pos = [0, 0, 0];
    }
    if (density == null) {
      density = 2;
    }
    if (radius == null) {
      radius = 6;
    }
    PointMesher.__super__.constructor.call(this);
    this.add_attr({
      point: new Point(pos),
      density: density,
      radius: radius,
      _selected: new Lst,
      _pre_sele: new Lst
    });
  }
  PointMesher.prototype.z_index = function() {
    return 1000;
  };
  PointMesher.prototype.draw = function(info) {
    var editable_points, highlighted_points, item, n, points, proj, selected, selected_points, _i, _j, _k, _l, _len, _len2, _len3, _len4, _pre_sele, _ref, _ref2, _ref3, _ref4;
    if (info.ctx_type === 'gl') {
      selected = {};
      _ref = this._selected;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        selected[item.model_id] = true;
      }
      _pre_sele = {};
      _ref2 = this._pre_sele;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        item = _ref2[_j];
        _pre_sele[item.model_id] = true;
      }
      points = new PointTheme(new Color(255, 255, 255, 255), this.radius.get(), new Color(255, 255, 255, 255), 1);
      editable_points = new PointTheme(new Color(0, 255, 0, 255), this.radius.get(), new Color(255, 255, 255, 255), 1);
      selected_points = new PointTheme(new Color(255, 0, 0, 255), this.radius.get(), new Color(255, 255, 255, 255), 1);
      highlighted_points = new PointTheme(new Color(0, 0, 0, 0), this.radius.get(), new Color(255, 0, 0, 255), 1);
      proj = info.re_2_sc.proj(this.point.pos.get());
      editable_points.beg_ctx(info);
      points.draw_proj(info, proj);
      editable_points.end_ctx(info);
      if (_pre_sele[this.model_id] != null) {
        highlighted_points.beg_ctx(info);
        n = info.re_2_sc.proj(this.point.pos.get());
        highlighted_points.draw_proj(info, n);
        return highlighted_points.end_ctx(info);
      }
    } else {
      selected = {};
      _ref3 = this._selected;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        item = _ref3[_k];
        selected[item.model_id] = true;
      }
      _pre_sele = {};
      _ref4 = this._pre_sele;
      for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
        item = _ref4[_l];
        _pre_sele[item.model_id] = true;
      }
      proj = info.re_2_sc.proj(this.point.pos.get());
      info.ctx.lineWidth = 1;
      info.ctx.strokeStyle = "#993311";
      info.ctx.fillStyle = "#553311";
      if (selected[this.point.model_id] != null) {
        info.ctx.strokeStyle = "#FF0000";
      } else {
        info.ctx.strokeStyle = "#FFFF00";
      }
      info.ctx.beginPath();
      info.ctx.arc(proj[0], proj[1], this.radius.get(), 0, Math.PI * 2, true);
      info.ctx.closePath();
      info.ctx.fill();
      info.ctx.stroke();
      if (_pre_sele[this.model_id] != null) {
        info.ctx.fillStyle = "#FFDD22";
        info.ctx.beginPath();
        info.ctx.lineWidth = 0.8;
        info.ctx.arc(proj[0], proj[1], this.radius.get() * 0.5, 0, Math.PI * 2, true);
        info.ctx.fill();
        return info.ctx.closePath();
      }
    }
  };
  PointMesher.prototype.get_movable_entities = function(res, info, pos, phase) {
    var d, dx, dy, proj, x, y;
    x = pos[0];
    y = pos[1];
    if (phase === 0) {
      proj = info.re_2_sc.proj(this.point.pos.get());
      dx = x - proj[0];
      dy = y - proj[1];
      d = Math.sqrt(dx * dx + dy * dy);
      if (d <= 10) {
        return res.push({
          item: this.point,
          dist: d,
          type: "PointMesher"
        });
      }
    }
  };
  PointMesher.prototype.on_mouse_down = function(cm, evt, pos, b) {
    var phase, res;
    delete this._movable_entity;
    if (b === "LEFT" || b === "RIGHT") {
      for (phase = 0; phase < 3; phase++) {
        res = [];
        this.get_movable_entities(res, cm.cam_info, pos, phase);
        if (res.length) {
          res.sort(function(a, b) {
            return b.dist - a.dist;
          });
          this._movable_entity = res[0].item;
          if (evt.ctrlKey) {
            this._selected.toggle_ref(this._movable_entity);
            if (!this._selected.contains_ref(this._movable_entity)) {
              delete this._movable_entity;
            }
          } else {
            this._selected.clear();
            this._selected.push(this._movable_entity);
            this._movable_entity.beg_click(pos);
          }
          if (b === "RIGHT") {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  };
  PointMesher.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var d, d_0, dx, dy, p_0, proj, res, x, y, _ref;
    if (b === "LEFT" && (this._movable_entity != null)) {
      if ((_ref = cm.undo_manager) != null) {
        _ref.snapshot();
      }
      p_0 = cm.cam_info.sc_2_rw.pos(pos[0], pos[1]);
      d_0 = cm.cam_info.sc_2_rw.dir(pos[0], pos[1]);
      this._movable_entity.move(this._selected, this._movable_entity.pos, p_0, d_0);
      return true;
    }
    res = [];
    x = pos[0];
    y = pos[1];
    proj = cm.cam_info.re_2_sc.proj(this.point.pos.get());
    dx = x - proj[0];
    dy = y - proj[1];
    d = Math.sqrt(dx * dx + dy * dy);
    if (d <= 10) {
      res.push({
        item: this,
        dist: d
      });
    }
    if (res.length) {
      res.sort(function(a, b) {
        return b.dist - a.dist;
      });
      if (this._pre_sele.length !== 1 || this._pre_sele[0] !== res[0].item) {
        this._pre_sele.clear();
        this._pre_sele.push(res[0].item);
      }
    } else if (this._pre_sele.length) {
      this._pre_sele.clear();
    }
    return false;
  };
  return PointMesher;
})();var Point;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Point = (function() {
  __extends(Point, Drawable);
  function Point(pos, move_scheme) {
    if (move_scheme == null) {
      move_scheme = new MoveScheme_3D;
    }
    Point.__super__.constructor.call(this);
    this.add_attr({
      pos: new Vec_3(pos)
    });
    this._mv = move_scheme;
  }
  Point.prototype.disp_only_in_model_editor = function() {
    return this.pos;
  };
  Point.prototype.beg_click = function(pos) {
    return this._mv.beg_click(pos);
  };
  Point.prototype.move = function(selected_entities, pos, p_0, d_0) {
    return this._mv.move(selected_entities, pos, p_0, d_0);
  };
  Point.prototype.z_index = function() {
    return 100;
  };
  Point.prototype.size = function(for_display) {
    if (for_display == null) {
      for_display = false;
    }
    return [3];
  };
  return Point;
})();var CamRepresentation;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
CamRepresentation = (function() {
  __extends(CamRepresentation, Drawable);
  function CamRepresentation(cam, params) {
    var key, val, _ref;
    if (params == null) {
      params = {};
    }
    CamRepresentation.__super__.constructor.call(this);
    this.add_attr({
      cam: cam
    });
    for (key in params) {
      val = params[key];
      if ((_ref = this[key]) != null) {
        if (typeof _ref.set === "function") {
          _ref.set(val);
        }
      }
    }
  }
  CamRepresentation.prototype.z_index = function() {
    return 10;
  };
  CamRepresentation.prototype.draw = function(info) {
    var F, P, X, Y, Z, d, e, lb, lt, rb, rt, size_elem;
    d = this.cam.d.get();
    e = d * Math.tan(this.cam.get_a() * 0.017453292519943295 / 2);
    X = Vec_3.mus(e, this.cam.get_X());
    Y = Vec_3.mus(e, this.cam.get_Y());
    Z = Vec_3.mus(d, this.cam.get_Z());
    F = this.cam.focal_point();
    P = info.re_2_sc.proj(F);
    lt = info.re_2_sc.proj([F[0] + Z[0] - X[0] + Y[0], F[1] + Z[1] - X[1] + Y[1], F[2] + Z[2] - X[2] + Y[2]]);
    rt = info.re_2_sc.proj([F[0] + Z[0] + X[0] + Y[0], F[1] + Z[1] + X[1] + Y[1], F[2] + Z[2] + X[2] + Y[2]]);
    rb = info.re_2_sc.proj([F[0] + Z[0] + X[0] - Y[0], F[1] + Z[1] + X[1] - Y[1], F[2] + Z[2] + X[2] - Y[2]]);
    lb = info.re_2_sc.proj([F[0] + Z[0] - X[0] - Y[0], F[1] + Z[1] - X[1] - Y[1], F[2] + Z[2] - X[2] - Y[2]]);
    info.ctx.lineWidth = 2;
    info.ctx.beginPath();
    info.ctx.strokeStyle = "lightBlue";
    info.ctx.moveTo(P[0], P[1]);
    info.ctx.lineTo(lt[0], lt[1]);
    info.ctx.moveTo(P[0], P[1]);
    info.ctx.lineTo(rt[0], rt[1]);
    info.ctx.moveTo(P[0], P[1]);
    info.ctx.lineTo(rb[0], rb[1]);
    info.ctx.moveTo(P[0], P[1]);
    info.ctx.lineTo(lb[0], lb[1]);
    info.ctx.moveTo(lt[0], lt[1]);
    info.ctx.lineTo(rt[0], rt[1]);
    info.ctx.lineTo(rb[0], rb[1]);
    info.ctx.lineTo(lb[0], lb[1]);
    info.ctx.lineTo(lt[0], lt[1]);
    info.ctx.stroke();
    info.ctx.closePath();
    size_elem = 10;
    info.ctx.beginPath();
    info.ctx.fillStyle = "navy";
    info.ctx.arc(P[0], P[1], size_elem * 0.5, 0, Math.PI * 2, true);
    info.ctx.fill();
    if ((this.cam != null) && (this.cam.model_id != null)) {
      info.ctx.fillStyle = "white";
      info.ctx.font = "10px Arial";
      info.ctx.fillText("Cam " + this.cam.model_id, P[0] + 10, P[1] - 10);
    }
    return info.ctx.closePath();
  };
  return CamRepresentation;
})();var Axes;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Axes = (function() {
  __extends(Axes, Drawable);
  function Axes() {
    Axes.__super__.constructor.call(this);
    this.add_attr({
      p: new Choice(0, ["lb", "lt", "rb", "rt", "mm"]),
      r: new ConstrainedVal(0.05, {
        min: 0,
        max: 1
      }),
      d: 1,
      l: new ConstrainedVal(2, {
        min: 0,
        max: 10,
        div: 10
      })
    });
    this.theme_x = new LineTheme(new Color(255, 0, 0));
    this.theme_y = new LineTheme(new Color(0, 255, 0));
    this.theme_z = new LineTheme(new Color(0, 0, 255));
  }
  Axes.prototype.z_index = function() {
    return 10000;
  };
  Axes.prototype.draw = function(info) {
    var o, vz, x, y, z, _ref;
    _ref = this._coords(info), o = _ref[0], x = _ref[1], y = _ref[2], z = _ref[3];
    vz = -1 + 1e-5;
    o[2] = vz;
    x[2] = vz;
    y[2] = vz;
    z[2] = vz;
    this.theme_x.beg_ctx(info);
    this.theme_x.draw_straight_proj(info, o, x);
    this.theme_x.end_ctx(info);
    this.theme_y.beg_ctx(info);
    this.theme_y.draw_straight_proj(info, o, y);
    this.theme_y.end_ctx(info);
    this.theme_z.beg_ctx(info);
    this.theme_z.draw_straight_proj(info, o, z);
    return this.theme_z.end_ctx(info);
  };
  Axes.prototype._coords = function(info) {
    var c, d, dec, l, ma_x, ma_y, mi_x, mi_y, o, p, s, x, y, z;
    d = this.d.get();
    if (d < 0 || !this.p.equals("mm")) {
      d = info.cam.d.get() / 10;
    }
    l = this.r.get() * (this._fixed() ? d : info.cam.d.get());
    s = 0.3 * info.mwh * this.r.get();
    c = info.cam.O.get();
    o = info.re_2_sc.proj(Vec_3.add(c, [0, 0, 0]));
    x = info.re_2_sc.proj(Vec_3.add(c, [l, 0, 0]));
    y = info.re_2_sc.proj(Vec_3.add(c, [0, l, 0]));
    z = info.re_2_sc.proj(Vec_3.add(c, [0, 0, l]));
    mi_x = Math.min(o[0], x[0], y[0], z[0]);
    ma_x = Math.max(o[0], x[0], y[0], z[0]);
    mi_y = Math.min(o[1], x[1], y[1], z[1]);
    ma_y = Math.max(o[1], x[1], y[1], z[1]);
    p = this.p.get();
    if (p[0] === "l" || p[0] === "r") {
      dec = p[0] === "r" ? info.w - ma_x - s : s - mi_x;
      x[0] += dec;
      y[0] += dec;
      z[0] += dec;
      o[0] += dec;
    }
    if (p[1] === "b" || p[1] === "t") {
      dec = p[1] === "b" ? info.h - ma_y - s : s - mi_y;
      x[1] += dec;
      y[1] += dec;
      z[1] += dec;
      o[1] += dec;
    }
    return [o, x, y, z];
  };
  Axes.prototype._fixed = function() {
    return this.p.equals("mm");
  };
  return Axes;
})();var ZoomArea;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ZoomArea = (function() {
  __extends(ZoomArea, Drawable);
  function ZoomArea(canvas_manager, params) {
    var key, val, _ref;
    this.canvas_manager = canvas_manager;
    if (params == null) {
      params = {};
    }
    ZoomArea.__super__.constructor.call(this);
    this.add_attr({
      zoom_factor: [5, 5, 1],
      zoom_pos: [-1, -1, 0]
    });
    for (key in params) {
      val = params[key];
      if ((_ref = this[key]) != null) {
        if (typeof _ref.set === "function") {
          _ref.set(val);
        }
      }
    }
  }
  ZoomArea.prototype.z_index = function() {
    return 1000;
  };
  ZoomArea.prototype.always_active = function() {
    return true;
  };
  ZoomArea.prototype.on_mouse_move = function(cm, evt, pos, b) {
    this.zoom_pos[0].set(pos[0]);
    this.zoom_pos[1].set(pos[1]);
    return false;
  };
  ZoomArea.prototype.on_mouse_wheel = function(cm, evt, pos, b, delta) {
    var n;
    n = Math.pow(1.2, delta);
    this.zoom_factor[0].set(this.zoom_factor[0] * n);
    this.zoom_factor[1].set(this.zoom_factor[1] * n);
    return true;
  };
  ZoomArea.prototype.draw = function(info) {
    var clientX, clientY, it, key, n_info, val, zx, zy, _i, _len, _ref;
    clientX = this.zoom_pos[0].get();
    clientY = this.zoom_pos[1].get();
    zx = this.zoom_factor[0].get();
    zy = this.zoom_factor[1].get();
    n_info = {};
    for (key in info) {
      val = info[key];
      n_info[key] = val;
    }
    n_info.re_2_sc = {
      proj: function(p) {
        var np;
        np = info.re_2_sc.proj(p);
        return [zx * (np[0] - clientX) + clientX, zy * (np[1] - clientY) + clientY, p[2]];
      }
    };
    info.ctx.save();
    info.ctx.beginPath();
    info.ctx.strokeStyle = 'rgba(170,170,200,0.8)';
    info.ctx.shadowBlur = 5;
    info.ctx.shadowColor = "lightBlue";
    info.ctx.lineWidth = 4;
    info.ctx.arc(clientX, clientY, 100, 0, Math.PI * 2, true);
    info.ctx.stroke();
    info.ctx.shadowBlur = 0;
    info.ctx.shadowColor = "transparent black";
    info.ctx.fillStyle = "lightBlue";
    info.ctx.font = "10px Arial";
    info.ctx.textBaseline = 'bottom';
    info.ctx.textAlign = 'left';
    info.ctx.fillText("X " + this.zoom_factor[0].get().toFixed(1), clientX + 75, clientY - 75);
    info.ctx.closePath();
    info.ctx.clip();
    _ref = this.canvas_manager._flat;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      it = _ref[_i];
      if (it !== this && !(it instanceof Axes)) {
        it.draw(n_info);
      }
    }
    return info.ctx.restore();
  };
  return ZoomArea;
})();var CuttingPlan;
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
};
CuttingPlan = (function() {
  __extends(CuttingPlan, Drawable);
  function CuttingPlan(pos, dir) {
    if (pos == null) {
      pos = [0, 0, 0];
    }
    if (dir == null) {
      dir = [0, 0, -0.2];
    }
    CuttingPlan.__super__.constructor.call(this);
    this.add_attr({
      pos: new Point(pos),
      dir: new Point(dir),
      opacity: new ConstrainedVal(50, {
        min: 0,
        max: 100,
        div: 100
      }),
      _selected: new Lst,
      _pre_sele: new Lst
    });
    this.b = [];
  }
  CuttingPlan.prototype.z_index = function() {
    return 1;
  };
  CuttingPlan.prototype.bounding_box = function() {
    var get_min_max, item, x_max, x_min, _i, _len, _ref;
    if (this._bounding_box != null) {
      return this._bounding_box;
    }
    get_min_max = function(item, x_min, x_max) {
      var sub_item, _i, _len, _ref, _results;
      if (item.update_min_max != null) {
        return item.update_min_max(x_min, x_max);
      } else if (item.sub_canvas_items != null) {
        _ref = item.sub_canvas_items();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sub_item = _ref[_i];
          _results.push(get_min_max(sub_item, x_min, x_max));
        }
        return _results;
      }
    };
    x_min = [+1e40, +1e40, +1e40];
    x_max = [-1e40, -1e40, -1e40];
    _ref = this._parents[0]._children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      get_min_max(item, x_min, x_max);
    }
    if (x_min[0] === +1e40) {
      return [[-1, -1, -1], [1, 1, 1]];
    }
    this._bounding_box = [x_min, x_max];
    return this._bounding_box;
  };
  CuttingPlan.prototype.draw = function(info) {
    var half_height, half_width, height, lb, lt, proj_dir, proj_pos, rb, rt, width, _ref, _ref2, _ref3, _ref4;
    proj_pos = info.re_2_sc.proj(this.pos.pos.get());
    proj_dir = info.re_2_sc.proj(this.dir.pos.get());
    this.b = this.bounding_box();
    width = this.b[1][0] - this.b[0][0];
    height = this.b[1][1] - this.b[0][1];
    half_width = width / 2;
    half_height = height / 2;
    lt = info.re_2_sc.proj([this.pos.pos[0].get() - half_width, this.pos.pos[1].get() + half_height, this.pos.pos[2].get()]);
    rt = info.re_2_sc.proj([this.pos.pos[0].get() + half_width, this.pos.pos[1].get() + half_height, this.pos.pos[2].get()]);
    rb = info.re_2_sc.proj([this.pos.pos[0].get() + half_width, this.pos.pos[1].get() - half_height, this.pos.pos[2].get()]);
    lb = info.re_2_sc.proj([this.pos.pos[0].get() - half_width, this.pos.pos[1].get() - half_height, this.pos.pos[2].get()]);
    info.ctx.lineWidth = 2;
    info.ctx.lineCap = "square";
    info.ctx.beginPath();
    info.ctx.strokeStyle = "rgb( 70, 70, 70)";
    info.ctx.fillStyle = "rgba( 200, 200, 200, 200)";
    info.ctx.moveTo(lt[0], lt[1]);
    info.ctx.lineTo(rt[0], rt[1]);
    info.ctx.lineTo(rb[0], rb[1]);
    info.ctx.lineTo(lb[0], lb[1]);
    info.ctx.lineTo(lt[0], lt[1]);
    info.ctx.fill();
    info.ctx.stroke();
    info.ctx.closePath();
    info.ctx.beginPath();
    info.ctx.strokeStyle = "orange";
    info.ctx.moveTo(proj_pos[0], proj_pos[1]);
    info.ctx.lineTo(proj_dir[0], proj_dir[1]);
    info.ctx.fill();
    info.ctx.stroke();
    info.ctx.lineWidth = 1;
    info.ctx.beginPath();
    if (_ref = this.pos, __indexOf.call(this._pre_sele, _ref) >= 0) {
      info.ctx.strokeStyle = "yellow";
    } else {
      info.ctx.strokeStyle = "#333311";
    }
    if (_ref2 = this.pos, __indexOf.call(this._selected, _ref2) >= 0) {
      info.ctx.fillStyle = "red";
    } else {
      info.ctx.fillStyle = "#333311";
    }
    info.ctx.arc(proj_pos[0], proj_pos[1], 4, 0, Math.PI * 2, true);
    info.ctx.fill();
    info.ctx.stroke();
    info.ctx.closePath();
    info.ctx.beginPath();
    if (_ref3 = this.dir, __indexOf.call(this._pre_sele, _ref3) >= 0) {
      info.ctx.strokeStyle = "yellow";
    } else {
      info.ctx.strokeStyle = "#333311";
    }
    if (_ref4 = this.dir, __indexOf.call(this._selected, _ref4) >= 0) {
      info.ctx.fillStyle = "red";
    } else {
      info.ctx.fillStyle = "#333311";
    }
    info.ctx.arc(proj_dir[0], proj_dir[1], 4, 0, Math.PI * 2, true);
    info.ctx.fill();
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  CuttingPlan.prototype.get_movable_entities = function(res, info, pos, phase) {
    var d, dx, dy, proj, x, y;
    x = pos[0];
    y = pos[1];
    if (phase === 0) {
      proj = info.re_2_sc.proj(this.pos.pos.get());
      dx = x - proj[0];
      dy = y - proj[1];
      d = Math.sqrt(dx * dx + dy * dy);
      if (d <= 10) {
        res.push({
          item: this.pos,
          dist: d,
          type: "CuttingPlan"
        });
      }
      proj = info.re_2_sc.proj(this.dir.pos.get());
      dx = x - proj[0];
      dy = y - proj[1];
      d = Math.sqrt(dx * dx + dy * dy);
      if (d <= 10) {
        return res.push({
          item: this.dir,
          dist: d,
          type: "CuttingPlan"
        });
      }
    }
  };
  CuttingPlan.prototype.on_mouse_down = function(cm, evt, pos, b) {
    var phase, res;
    delete this._movable_entity;
    if (b === "LEFT") {
      for (phase = 0; phase < 3; phase++) {
        res = [];
        this.get_movable_entities(res, cm.cam_info, pos, phase);
        if (res.length) {
          res.sort(function(a, b) {
            return b.dist - a.dist;
          });
          this._movable_entity = res[0].item;
          this._may_need_snapshot = true;
          if (evt.ctrlKey) {
            this._selected.toggle_ref(this._movable_entity);
            if (!this._selected.contains_ref(this._movable_entity)) {
              delete this._movable_entity;
            }
          } else {
            this._selected.clear();
            this._selected.push(this._movable_entity);
            this._movable_entity.beg_click(pos);
          }
          return true;
        }
      }
    }
    return false;
  };
  CuttingPlan.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var d, d_0, dx, dy, p_0, proj, res, x, y, _ref;
    if (b === "LEFT" && (this._movable_entity != null)) {
      if (this._may_need_snapshot) {
        if ((_ref = cm.undo_manager) != null) {
          _ref.snapshot();
        }
        delete this._may_need_snapshot;
      }
      p_0 = cm.cam_info.sc_2_rw.pos(pos[0], pos[1]);
      d_0 = cm.cam_info.sc_2_rw.dir(pos[0], pos[1]);
      this._movable_entity.move(this._selected, this._movable_entity.pos, p_0, d_0);
      return true;
    }
    res = [];
    x = pos[0];
    y = pos[1];
    if (this.dir != null) {
      proj = cm.cam_info.re_2_sc.proj(this.dir.pos.get());
      dx = x - proj[0];
      dy = y - proj[1];
      d = Math.sqrt(dx * dx + dy * dy);
      if (d <= 10) {
        res.push({
          item: this.dir,
          dist: d
        });
      }
    }
    if (this.pos != null) {
      proj = cm.cam_info.re_2_sc.proj(this.pos.pos.get());
      dx = x - proj[0];
      dy = y - proj[1];
      d = Math.sqrt(dx * dx + dy * dy);
      if (d <= 10) {
        res.push({
          item: this.pos,
          dist: d
        });
      }
    }
    if (res.length) {
      res.sort(function(a, b) {
        return b.dist - a.dist;
      });
      if (this._pre_sele.length !== 1 || this._pre_sele[0] !== res[0].item) {
        this._pre_sele.clear();
        this._pre_sele.push(res[0].item);
      }
    } else if (this._pre_sele.length) {
      this._pre_sele.clear();
    }
    return false;
  };
  return CuttingPlan;
})();var Legend;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Legend = (function() {
  __extends(Legend, Drawable);
  function Legend(title, show_legend, auto_fit) {
    if (title == null) {
      title = "Big title";
    }
    if (show_legend == null) {
      show_legend = true;
    }
    if (auto_fit == null) {
      auto_fit = true;
    }
    Legend.__super__.constructor.call(this);
    this.add_attr({
      show_legend: show_legend,
      color_map: new Gradient,
      auto_fit: auto_fit,
      legend_size: new ConstrainedVal(1, {
        min: 0.1,
        max: 2,
        div: 0
      }),
      _title: title,
      _width: 12,
      _height: 100,
      _min_val: 0,
      _max_val: -1
    });
    this.add_attr({
      max_val: new ConstOrNotModel(this.auto_fit, this._max_val, false),
      min_val: new ConstOrNotModel(this.auto_fit, this._min_val, false)
    });
    this.color_map.add_color([0, 0, 0, 255], 0);
    this.color_map.add_color([255, 0, 0, 255], 0.33);
    this.color_map.add_color([255, 255, 0, 255], 0.66);
    this.color_map.add_color([255, 255, 255, 255], 1);
  }
  Legend.prototype.z_index = function() {
    return 1000;
  };
  Legend.prototype.is_correct = function() {
    return this.max_val.get() >= this.min_val.get();
  };
  Legend.prototype.get_ratio = function(info) {
    return info.h / (this._height.get() * 2) * this.legend_size.get();
  };
  Legend.prototype._draw_text_legend = function(info) {
    var c_s, font_size, height, pos, pos_x, pos_y, ratio, val, width, _i, _len, _ref, _results;
    ratio = this.get_ratio(info);
    height = this._height.get() * ratio;
    width = this._width.get() * ratio;
    pos_y = info.h * 0.5 - height * 0.5;
    pos_x = info.w - 2.0 * width;
    font_size = 10 * ratio;
    _ref = this.color_map.color_stop;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c_s = _ref[_i];
      pos = c_s.position.get();
      val = (this.max_val.get() - this.min_val.get()) * (1 - c_s.position.get()) + this.min_val.get();
      _results.push(info.cm.fillText(val.toFixed(4), pos_x - 8, pos_y + 7 + pos * height, font_size + "pt Arial", "right", "White"));
    }
    return _results;
  };
  Legend.prototype._draw_gradient = function(info, pos_x, pos_y, width, height) {
    var array, col, fs, gl, lineargradient, pos, ps, vs, x_max, x_min, y_max, y_min, z, _i, _len, _points, _ref;
    if (info.ctx_type === "2d") {
      lineargradient = info.ctx.createLinearGradient(0, pos_y, 0, pos_y + height);
      _ref = this.color_map.color_stop;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        lineargradient.addColorStop(col.position.get(), "rgba(" + (col.color.r.get()) + ", " + (col.color.g.get()) + ", " + (col.color.b.get()) + ", " + (col.color.a.get()) + ")");
      }
      info.ctx.fillStyle = lineargradient;
      return info.ctx.fillRect(pos_x, pos_y, width, height);
    } else {
      gl = info.ctx;
      vs = "                precision mediump float;                varying float y;                uniform float my;                attribute vec3 pos;                void main( void ) {                    y = 0.5 * ( my * pos.y + 1.0 );                    gl_Position = vec4( pos, 1.0 );                }            ";
      fs = this.color_map.get_fragment_shader("y");
      ps = info.cm.gl_prog(vs, fs);
      ps.myUniform = gl.getUniformLocation(ps, "my");
      _points = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, _points);
      z = -1.0;
      x_min = 2.0 * pos_x / info.w - 1.0;
      y_min = 1.0 - 2.0 * pos_y / info.h;
      x_max = 2.0 * (pos_x + width) / info.w - 1.0;
      y_max = 1.0 - 2.0 * (pos_y + height) / info.h;
      array = new Float32Array([x_min, y_min, z, x_max, y_min, z, x_min, y_max, z, x_max, y_max, z]);
      gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
      gl.useProgram(ps);
      gl.uniform1f(ps.myUniform, info.h * 1.0 / height);
      pos = gl.getAttribLocation(ps, "pos");
      gl.enableVertexAttribArray(pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, _points);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.deleteBuffer(_points);
      gl.disableVertexAttribArray(pos);
      return gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  };
  Legend.prototype.draw = function(info) {
    var height, pos_x, pos_y, ratio, t, th, width, _ref;
    if (this.show_legend.get() === true) {
      ratio = this.get_ratio(info);
      height = this._height.get() * ratio;
      width = this._width.get() * ratio;
      pos_y = info.h * 0.5 - height * 0.5;
      pos_x = info.w - 2.0 * width;
      this._draw_gradient(info, pos_x, pos_y, width, height);
      this._draw_text_legend(info);
      t = (_ref = this._title) != null ? _ref.toString() : void 0;
      if (t != null) {
        th = 10 * ratio;
        return info.cm.fillText(t, pos_x + 0.5 * width, pos_y + height + th * 1.6, th + "pt Arial", "center-limited", "White");
      }
    }
  };
  return Legend;
})();var NamedParametrizedDrawable;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
NamedParametrizedDrawable = (function() {
  __extends(NamedParametrizedDrawable, ParametrizedDrawable);
  function NamedParametrizedDrawable(name, data) {
    NamedParametrizedDrawable.__super__.constructor.call(this, data);
    this.add_attr({
      name: name
    });
  }
  NamedParametrizedDrawable.prototype.toString = function() {
    return this.name.get();
  };
  return NamedParametrizedDrawable;
})();var Img;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Img = (function() {
  __extends(Img, Drawable);
  function Img(src, app, need_fit) {
    var onload;
    if (src == null) {
      src = "";
    }
    if (app == null) {
      app = void 0;
    }
    if (need_fit == null) {
      need_fit = true;
    }
    Img.__super__.constructor.call(this);
    this.add_attr({
      src: src,
      _histo: new Vec
    });
    this.data = {
      zmin: 0,
      zmax: 0,
      buff: void 0,
      rgba: void 0,
      begl: true
    };
    onload = __bind(function() {
      var _ref;
      this._signal_change();
      this.loaded = true;
      this.data.rgba = this.data.buff;
      this.data.buff = new Image;
      this.data.buff.onload = onload;
      if (((_ref = this._histo) != null ? _ref.length : void 0) === 0) {
        this.fill_histogram();
      }
      if (need_fit && (app != null)) {
        need_fit = false;
        return app.fit(0);
      }
    }, this);
    this.loaded = false;
    this.data.buff = new Image;
    this.data.buff.onload = onload;
    this._get_src_data();
    this.tex = {};
    this._date_tex = {};
  }
  Img.prototype.z_index = function() {
    return 1;
  };
  Img.prototype.draw = function(info) {
    var P, Xc, Z, ajusted, dX, dY, dc, h, sc_2_rw, w, x_max, x_min, _ref;
    if (this.src.has_been_modified() || ((_ref = this._repr) != null ? _ref.has_been_modified() : void 0) || this.data.begl) {
      this.data.begl = false;
      this._get_src_data();
    }
    if (!(this.data.rgba != null)) {
      return false;
    }
    this.X = [1, 0, 0];
    this.Y = [0, 1, 0];
    this.Z = [0, 0, -1];
    this.O = [0, 0, 0];
    if (info.shoot_cam != null) {
      w = this.data.rgba.width;
      h = this.data.rgba.height;
      sc_2_rw = info.shoot_cam.sc_2_rw(w, h);
      Z = sc_2_rw.dir(0.5 * w, 0.5 * h);
      x_min = info.get_x_min();
      x_max = info.get_x_max();
      Xc = [0.5 * (x_min[0] + x_max[0]), 0.5 * (x_min[1] + x_max[1]), 0.5 * (x_min[2] + x_max[2])];
      dc = Math.max(x_max[0] - x_min[0], x_max[1] - x_min[1], x_max[2] - x_min[2]);
      P = [Xc[0] + dc * Z[0], Xc[1] + dc * Z[1], Xc[2] + dc * Z[2]];
      ajusted = function(pos, dir, Z, P) {
        var pp, pq;
        pp = Vec_3.dot(Vec_3.sub(P, pos), Z);
        pq = pp / Vec_3.dot(Z, dir);
        return [pos[0] + dir[0] * pq, pos[1] + dir[1] * pq, pos[2] + dir[2] * pq];
      };
      this.O = ajusted(sc_2_rw.pos(0, h), sc_2_rw.dir(0, h), Z, P);
      dX = ajusted(sc_2_rw.pos(w, h), sc_2_rw.dir(w, h), Z, P);
      dY = ajusted(sc_2_rw.pos(0, 0), sc_2_rw.dir(0, 0), Z, P);
      this.X = Vec_3.mus(1 / w, Vec_3.sub(dX, this.O));
      this.Y = Vec_3.mus(1 / h, Vec_3.sub(dY, this.O));
      this.Z = Vec_3.nor(Vec_3.cro(this.X, this.Y));
    }
    if (this.data.zmin === this.data.zmax) {
      if (!(this.loaded != null) || this.loaded !== true) {
        console.log(Img, this.src.get());
        console.log(this.loaded);
      }
      return Img._draw_persp_rec(info, this.data.rgba, this.data.zmin, this.data.zmax, this.O, this.X, this.Y, this.Z, this._date_tex, this.tex, this.src);
    }
  };
  Img.prototype.update_min_max = function(x_min, x_max) {
    var d;
    if (this.data.rgba != null) {
      for (d = 0; d < 3; d++) {
        x_min[d] = Math.min(x_min[d], 0);
      }
      x_max[0] = Math.max(x_max[0], this.data.rgba.width);
      x_max[1] = Math.max(x_max[1], this.data.rgba.height);
      return x_max[2] = Math.max(x_max[2], 0);
    }
  };
  Img.prototype.fill_histogram = function() {};
  Img.prototype.information = function(div) {
    var _ref;
    if (((_ref = this.data.rgba) != null ? _ref.height : void 0) != null) {
      if (!(this.cm != null)) {
        this.txt = new_dom_element({
          parentNode: div
        });
      }
      return this.txt.innerHTML = "                " + this.src + " <br>                Height : " + this.data.rgba.height + "px <br>                Width  : " + this.data.rgba.width + "px <br>            ";
    }
  };
  Img.prototype._get_src_data = function() {
    var s;
    s = this._repr != null ? this._repr : this.src;
    if ((typeof Path != "undefined" && Path !== null) && (s instanceof Path)) {
      return this.data.buff.src = "/sceen/_?u=" + s._server_id;
    } else if (s.get().length) {
      return this.data.buff.src = s.get();
    }
  };
  Img._draw_persp_rec = function(info, rgba, zmin, zmax, O, X, Y, Z, _date_tex, tex, src, xmin, ymin, xmax, ymax, rec) {
    var a, b, c, ca, cb, d, dx, dy, fs, gl, h, ibuf, idx, initBuffer, ps, r, sx, sy, tbuf, txc, vbuf, vs, vtx, w, x, xm_0, xm_1, y, ym_0, ym_1;
    if (xmin == null) {
      xmin = 0;
    }
    if (ymin == null) {
      ymin = 0;
    }
    if (xmax == null) {
      xmax = 1;
    }
    if (ymax == null) {
      ymax = 1;
    }
    if (rec == null) {
      rec = 0;
    }
    w = rgba.width;
    h = rgba.height;
    if (info.ctx_type === "gl") {
      vs = "                attribute vec3 pos;                attribute vec2 textureCoords;                varying vec2 texcoords;                " + (info.cam.gl_attr(info, "cam")) + "                void main( void ) {                    texcoords = textureCoords;                    gl_Position = vec4( pos, 1.0 );                    " + (info.cam.gl_main(info, "cam")) + "                    gl_Position.z += 1e-5;                }            ";
      fs = "                precision mediump float;                varying vec2 texcoords;                uniform sampler2D uSampler;                void main( void ) {                    gl_FragColor = texture2D( uSampler, texcoords );                }            ";
      gl = info.ctx;
      ps = info.cm.gl_prog(vs, fs);
      gl.useProgram(ps);
      ps.aposAttrib = gl.getAttribLocation(ps, "pos");
      gl.enableVertexAttribArray(ps.aposAttrib);
      ps.atexAttrib = gl.getAttribLocation(ps, "textureCoords");
      gl.enableVertexAttribArray(ps.atexAttrib);
      if (!(_date_tex[gl.ctx_id] != null)) {
        _date_tex[gl.ctx_id] = -1;
      }
      if (_date_tex[gl.ctx_id] < src._date_last_modification) {
        _date_tex[gl.ctx_id] = src._date_last_modification;
        if (tex[gl.ctx_id] != null) {
          gl.deleteTexture(tex[gl.ctx_id]);
        }
        tex[gl.ctx_id] = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex[gl.ctx_id]);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
      gl.bindTexture(gl.TEXTURE_2D, tex[gl.ctx_id]);
      ps.samplerUniform = gl.getUniformLocation(ps, "uSampler");
      gl.uniform1i(ps.samplerUniform, 0);
      a = Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmin, X), Vec_3.mus(h * ymin, Y)), Vec_3.mus(zmin, Z)));
      b = Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmax, X), Vec_3.mus(h * ymax, Y)), Vec_3.mus(zmin, Z)));
      c = Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmax, X), Vec_3.mus(h * ymin, Y)), Vec_3.mus(zmin, Z)));
      d = Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmin, X), Vec_3.mus(h * ymax, Y)), Vec_3.mus(zmin, Z)));
      vtx = new Float32Array([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]]);
      txc = new Float32Array([0, 0, 1, 1, 1, 0, 0, 1]);
      idx = new Uint16Array([0, 2, 3, 1]);
      initBuffer = function(glELEMENT_ARRAY_BUFFER, data) {
        var buf;
        buf = gl.createBuffer();
        gl.bindBuffer(glELEMENT_ARRAY_BUFFER, buf);
        gl.bufferData(glELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return buf;
      };
      vbuf = initBuffer(gl.ARRAY_BUFFER, vtx);
      ibuf = initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
      gl.vertexAttribPointer(ps.aposAttrib, 3, gl.FLOAT, false, 0, 0);
      tbuf = initBuffer(gl.ARRAY_BUFFER, txc);
      gl.vertexAttribPointer(ps.atexAttrib, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(ps.atexAttrib);
      info.cam.gl_exec(info, "cam", ps);
      gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
      gl.disableVertexAttribArray(ps.aposAttrib);
      gl.disableVertexAttribArray(ps.atexAttrib);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.deleteBuffer(tbuf);
      gl.deleteBuffer(ibuf);
      return gl.deleteBuffer(vbuf);
    } else {
      a = info.re_2_sc.proj(Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmin, X), Vec_3.mus(h * ymin, Y)), Vec_3.mus(zmin, Z))));
      b = info.re_2_sc.proj(Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmax, X), Vec_3.mus(h * ymax, Y)), Vec_3.mus(zmin, Z))));
      c = info.re_2_sc.proj(Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmax, X), Vec_3.mus(h * ymin, Y)), Vec_3.mus(zmin, Z))));
      d = info.re_2_sc.proj(Vec_3.add(O, Vec_3.add(Vec_3.add(Vec_3.mus(w * xmin, X), Vec_3.mus(h * ymax, Y)), Vec_3.mus(zmin, Z))));
      if (a[0] >= info.w && b[0] >= info.w && c[0] >= info.w && d[0] >= info.w) {
        return true;
      }
      if (a[0] < 0 && b[0] < 0 && c[0] < 0 && d[0] < 0) {
        return true;
      }
      if (a[1] >= info.h && b[1] >= info.h && c[1] >= info.h && d[1] >= info.h) {
        return true;
      }
      if (a[1] < 0 && b[1] < 0 && c[1] < 0 && d[1] < 0) {
        return true;
      }
      r = [c[0] + d[0] - a[0], c[1] + d[1] - a[1]];
      if (rec < 6 && Math.pow(r[0] - b[0], 2) + Math.pow(r[1] - b[1], 2) > 1) {
        ca = 0.5 + 1e-2;
        cb = 1 - ca;
        xm_0 = cb * xmin + ca * xmax;
        ym_0 = cb * ymin + ca * ymax;
        xm_1 = ca * xmin + cb * xmax;
        ym_1 = ca * ymin + cb * ymax;
        Img._draw_persp_rec(info, rgba, zmin, zmax, O, X, Y, Z, _date_tex, tex, src, xmin, ymin, xm_0, ym_0, rec + 1);
        Img._draw_persp_rec(info, rgba, zmin, zmax, O, X, Y, Z, _date_tex, tex, src, xm_1, ymin, xmax, ym_0, rec + 1);
        Img._draw_persp_rec(info, rgba, zmin, zmax, O, X, Y, Z, _date_tex, tex, src, xmin, ym_1, xm_0, ymax, rec + 1);
        Img._draw_persp_rec(info, rgba, zmin, zmax, O, X, Y, Z, _date_tex, tex, src, xm_1, ym_1, xmax, ymax, rec + 1);
        return true;
      }
      sx = Math.ceil(w * xmin);
      sy = Math.ceil(h * (1 - ymax));
      dx = Math.ceil(w * (xmax - xmin));
      dy = Math.ceil(h * (ymax - ymin));
      dx = Math.min(dx, w - sx);
      dy = Math.min(dy, h - sy);
      x = [(c[0] - a[0]) / dx, (c[1] - a[1]) / dx];
      y = [(d[0] - a[0]) / dy, (d[1] - a[1]) / dy];
      info.ctx.save();
      info.ctx.setTransform(x[0], x[1], y[0], y[1], d[0], d[1]);
      info.ctx.transform(1, 0, 0, -1, 0, 0);
      info.ctx.drawImage(rgba, sx, sy, dx, dy, 0, 0, dx, dy);
      return info.ctx.restore();
    }
  };
  return Img;
})();var Graph;
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
};
Graph = (function() {
  __extends(Graph, Drawable);
  function Graph(params) {
    var key, val, _ref;
    if (params == null) {
      params = {};
    }
    Graph.__super__.constructor.call(this);
    this.add_attr({
      show_line: true,
      line_color: new Color(0, 0, 0),
      line_width: new ConstrainedVal(1, {
        min: 0,
        max: 20
      }),
      shadow: true,
      show_marker: true,
      marker: new Choice(0, ["dot", "square", "cross", "diamond", "bar"]),
      marker_size: new ConstrainedVal(5, {
        min: 0,
        max: 40
      }),
      marker_color: new Color(0, 0, 0),
      font_color: new Color(0, 0, 0),
      font_size: new ConstrainedVal(12, {
        min: 2,
        max: 72
      }),
      show_grid: true,
      grid_color: new Color(200, 200, 200),
      x_axis: '',
      y_axis: '',
      legend_x_division: 5,
      legend_y_division: 3,
      sel_item_color: new Color(255, 255, 0),
      movable_hl_infos: true,
      points: new Lst_Point,
      legend: new Lst,
      _pre_sele: new Lst
    });
    for (key in params) {
      val = params[key];
      if ((_ref = this[key]) != null) {
        if (typeof _ref.set === "function") {
          _ref.set(val);
        }
      }
    }
    this.axis_width = 1;
    this.origin = [0, 0];
    this.O_point = [0, 0];
    this.X_point = [0, 0];
    this.Y_point = [0, 0];
  }
  Graph.prototype.z_index = function() {
    return 100;
  };
  Graph.prototype.build_w2b_legend = function() {
    var color, i, _results;
    _results = [];
    for (i = 0; i <= 255; i++) {
      color = (i < 16 ? '0' : '') + i.toString(16);
      _results.push(this.legend[i] = "#" + color + color + color);
    }
    return _results;
  };
  Graph.prototype.draw = function(info) {
    var orig, p, proj;
    this.O_point = [info.padding / 2, info.h - info.padding];
    this.X_point = [info.w - info.padding / 2, info.h - info.padding];
    this.Y_point = [info.padding / 2, -info.h + info.padding];
    info.ctx.lineCap = "round";
    info.ctx.lineJoin = "round";
    info.ctx.shadowOffsetX = 0;
    info.ctx.shadowOffsetY = 0;
    info.ctx.shadowBlur = 0;
    info.ctx.shadowColor = "transparent black";
    if (this.points.length) {
      orig = info.re_2_sc.proj([0, 0, 0]);
      proj = (function() {
        var _i, _len, _ref, _results;
        _ref = this.points;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(info.re_2_sc.proj(p.pos.get()));
        }
        return _results;
      }).call(this);
      if (this.show_grid.get() === true) {
        this.draw_grid(info);
      }
      if (this.shadow.get() === true) {
        this.add_shadow(info);
      } else {
        this.remove_shadow(info);
      }
      if (this.show_line.get() === true) {
        this.draw_line(info, orig, proj);
      }
      if (this.show_marker.get() === true) {
        if (this.marker.get() === 'bar') {
          this.draw_marker_bar(info, orig, proj);
        } else if (this.marker.get() === 'cross') {
          this.draw_marker_cross(info, orig, proj);
        } else if (this.marker.get() === 'square') {
          this.draw_marker_square(info, orig, proj);
        } else if (this.marker.get() === 'diamond') {
          this.draw_marker_diamond(info, orig, proj);
        } else if (this.marker.get() === 'dot') {
          this.draw_marker_dot(info, orig, proj);
        }
      }
      this.remove_shadow(info);
      if (this.show_marker.get() === true) {
        if (this.movable_hl_infos.get() === true) {
          this.draw_movable_highlight_values(info);
        } else {
          this.draw_highlight_values(info);
        }
      }
    }
    this.hide_outside_values(info);
    this.draw_axis(info);
    return this.draw_legend(info);
  };
  Graph.prototype.add_shadow = function(info) {
    info.ctx.shadowOffsetX = this.line_width.get();
    info.ctx.shadowOffsetY = this.line_width.get();
    info.ctx.shadowBlur = this.line_width.get();
    return info.ctx.shadowColor = "#3a3a3a";
  };
  Graph.prototype.remove_shadow = function(info) {
    info.ctx.shadowOffsetX = 0;
    info.ctx.shadowOffsetY = 0;
    info.ctx.shadowBlur = 0;
    return info.ctx.shadowColor = "transparent black";
  };
  Graph.prototype.hide_outside_values = function(info) {
    info.ctx.fillStyle = "rgba( 255, 255, 255, 0.9 )";
    info.ctx.clearRect(0, 0, info.padding * 0.5, info.h);
    return info.ctx.clearRect(info.padding * 0.5, info.h - info.padding / 2, info.w, info.padding * 0.5);
  };
  Graph.prototype.draw_movable_highlight_values = function(info) {
    var decal_left, decal_top, height_box, highlighted_point, i, p, padding_left, padding_top, pos, text, width_box, _len, _ref, _ref2, _results;
    padding_left = 10;
    padding_top = -8;
    decal_left = 10;
    decal_top = -12;
    _ref = this.points;
    _results = [];
    for (i = 0, _len = _ref.length; i < _len; i++) {
      p = _ref[i];
      _results.push((_ref2 = this.points[i], __indexOf.call(this._pre_sele, _ref2) >= 0) ? (highlighted_point = p.pos.get(), info.ctx.beginPath(), pos = info.re_2_sc.proj(highlighted_point), text = highlighted_point[0] + ", " + highlighted_point[1], info.ctx.font = this.font_size.get() * 2 + "px Arial", width_box = info.ctx.measureText(text).width + padding_left * 2, height_box = this.font_size.get() * 3, info.ctx.fillStyle = "rgba(255, 255, 255, 0.8)", info.ctx.fillRect(pos[0] + decal_left, pos[1] + decal_top - height_box * 0.8, width_box, height_box), info.ctx.lineWidth = 1, info.ctx.strokeStyle = "rgba(0, 0, 0, 0.8)", info.ctx.strokeRect(pos[0] + decal_left, pos[1] + decal_top - height_box * 0.8, width_box, height_box), info.ctx.textAlign = "left", info.ctx.fillStyle = this.font_color.to_rgba(), info.ctx.fillText(text, pos[0] + padding_left + decal_left, pos[1] + padding_top + decal_top)) : void 0);
    }
    return _results;
  };
  Graph.prototype.draw_highlight_values = function(info) {
    var highlighted_point, i, p, padding, _len, _ref, _ref2, _results;
    padding = 10;
    _ref = this.points;
    _results = [];
    for (i = 0, _len = _ref.length; i < _len; i++) {
      p = _ref[i];
      _results.push((_ref2 = this.points[i], __indexOf.call(this._pre_sele, _ref2) >= 0) ? (highlighted_point = p.pos.get(), info.ctx.beginPath(), info.ctx.fillStyle = this.font_color.to_rgba(), info.ctx.textAlign = "right", info.ctx.font = this.font_size.get() * 2 + "px Arial", info.ctx.fillText(highlighted_point[0] + ", " + highlighted_point[1], info.w - padding, 20)) : void 0);
    }
    return _results;
  };
  Graph.prototype.draw_line = function(info, orig, proj) {
    var i, p, _len;
    info.ctx.beginPath();
    info.ctx.strokeStyle = this.line_color.to_rgba();
    if (this.line_width.get() <= 1) {
      info.ctx.lineWidth = 1.000001;
    } else {
      info.ctx.lineWidth = this.line_width.get();
    }
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      info.ctx.lineTo(p[0], p[1]);
    }
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  Graph.prototype.draw_marker_dot = function(info, orig, proj) {
    var i, p, _len, _ref;
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      if (_ref = this.points[i], __indexOf.call(this._pre_sele, _ref) >= 0) {
        info.ctx.fillStyle = this.sel_item_color.to_rgba();
      } else {
        info.ctx.fillStyle = this.legend[i] || this.marker_color.to_rgba();
      }
      info.ctx.beginPath();
      info.ctx.arc(p[0], p[1], this.marker_size.get() * 0.5, 0, Math.PI * 2, true);
      info.ctx.fill();
    }
    return info.ctx.closePath();
  };
  Graph.prototype.draw_marker_cross = function(info, orig, proj) {
    var i, p, _len, _ref;
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      if (_ref = this.points[i], __indexOf.call(this._pre_sele, _ref) >= 0) {
        info.ctx.strokeStyle = this.sel_item_color.to_rgba();
      } else {
        info.ctx.strokeStyle = this.legend[i] || this.marker_color.to_rgba();
      }
      info.ctx.beginPath();
      info.ctx.moveTo(p[0] - this.marker_size.get() * 0.5, p[1] + this.marker_size.get() * 0.5);
      info.ctx.lineTo(p[0] + this.marker_size.get() * 0.5, p[1] - this.marker_size.get() * 0.5);
      info.ctx.moveTo(p[0] + this.marker_size.get() * 0.5, p[1] + this.marker_size.get() * 0.5);
      info.ctx.lineTo(p[0] - this.marker_size.get() * 0.5, p[1] - this.marker_size.get() * 0.5);
      info.ctx.stroke();
    }
    return info.ctx.closePath();
  };
  Graph.prototype.draw_marker_square = function(info, orig, proj) {
    var i, p, _len, _ref;
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      if (_ref = this.points[i], __indexOf.call(this._pre_sele, _ref) >= 0) {
        info.ctx.fillStyle = this.sel_item_color.to_rgba();
      } else {
        info.ctx.fillStyle = this.legend[i] || this.marker_color.to_rgba();
      }
      info.ctx.beginPath();
      info.ctx.fillRect(p[0] - this.marker_size.get() * 0.5, p[1] - this.marker_size.get() * 0.5, this.marker_size.get(), this.marker_size.get());
    }
    return info.ctx.closePath();
  };
  Graph.prototype.draw_marker_diamond = function(info, orig, proj) {
    var i, p, _len, _ref;
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      if (_ref = this.points[i], __indexOf.call(this._pre_sele, _ref) >= 0) {
        info.ctx.fillStyle = this.sel_item_color.to_rgba();
      } else {
        info.ctx.fillStyle = this.legend[i] || this.marker_color.to_rgba();
      }
      info.ctx.beginPath();
      info.ctx.moveTo(p[0], p[1] - this.marker_size.get());
      info.ctx.lineTo(p[0] + this.marker_size.get() * 0.5, p[1]);
      info.ctx.lineTo(p[0], p[1] + this.marker_size.get());
      info.ctx.lineTo(p[0] - +this.marker_size.get() * 0.5, p[1]);
      info.ctx.fill();
    }
    return info.ctx.closePath();
  };
  Graph.prototype.draw_marker_bar = function(info, orig, proj) {
    var height, i, p, _len, _ref;
    for (i = 0, _len = proj.length; i < _len; i++) {
      p = proj[i];
      if (_ref = this.points[i], __indexOf.call(this._pre_sele, _ref) >= 0) {
        info.ctx.fillStyle = this.sel_item_color.to_rgba();
      } else {
        info.ctx.fillStyle = this.legend[i] || this.marker_color.to_rgba();
      }
      height = orig[1] - p[1];
      info.ctx.beginPath();
      info.ctx.fillRect(p[0], p[1], this.marker_size.get(), height);
    }
    return info.ctx.closePath();
  };
  Graph.prototype.draw_axis = function(info) {
    var decal_txt, height_axis, orig, width_axis;
    orig = [info.padding * 0.5, info.h - info.padding / 2, 0];
    width_axis = info.w - info.padding;
    height_axis = -info.h + orig[1] + info.padding;
    info.ctx.beginPath();
    info.ctx.lineWidth = this.axis_width;
    info.ctx.strokeStyle = this.font_color.to_rgba();
    info.ctx.fillStyle = this.font_color.to_rgba();
    info.ctx.font = this.font_size.get() + "px Arial";
    decal_txt = 10;
    if (this.x_axis.get() !== "") {
      info.ctx.textAlign = "left";
      info.ctx.fillText(this.x_axis.get(), orig[0] + width_axis + decal_txt, orig[1] + 2);
    }
    info.ctx.moveTo(orig[0], orig[1]);
    info.ctx.lineTo(orig[0] + width_axis, orig[1]);
    if (this.y_axis.get() !== "") {
      info.ctx.textBaseline = "bottom";
      info.ctx.textAlign = "center";
      info.ctx.fillText(this.y_axis.get(), orig[0] - 2, height_axis - decal_txt);
    }
    info.ctx.moveTo(orig[0], orig[1]);
    info.ctx.lineTo(orig[0], height_axis);
    info.ctx.stroke();
    info.ctx.closePath();
    return info.ctx.textBaseline = "middle";
  };
  Graph.prototype.draw_legend = function(info) {
    var decal_txt_X, decal_txt_Y, height_axis, i, max, min, nice_val, orig, pos, posit, val, val_from_screen, value, vve, width_axis, x_padding_txt, y_padding_txt, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    x_padding_txt = 10;
    y_padding_txt = 2;
    decal_txt_X = 3;
    decal_txt_Y = 1;
    orig = [0 + info.padding * 0.5, info.h - info.padding / 2, 0];
    width_axis = info.w - info.padding / 2;
    height_axis = -info.h + orig[1] + info.padding;
    info.ctx.beginPath();
    info.ctx.fillStyle = this.font_color.to_rgba();
    info.ctx.font = this.font_size.get() * 0.8 + "px Arial";
    info.ctx.textAlign = 'center';
    info.ctx.textBaseline = 'top';
    value = [];
    posit = [];
    for (i = 0, _ref = this.legend_x_division.get(); (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      pos = orig[0] + ((width_axis - decal_txt_X - (orig[0] - decal_txt_X)) / this.legend_x_division.get()) * i;
      vve = info.sc_2_rw.pos(pos, 0);
      val = vve[0];
      value.push(val);
      posit.push(pos);
    }
    _ref2 = this.get_min_max_of_array(value), min = _ref2[0], max = _ref2[1];
    for (i = 0, _ref3 = this.legend_x_division.get(); (0 <= _ref3 ? i <= _ref3 : i >= _ref3); (0 <= _ref3 ? i += 1 : i -= 1)) {
      nice_val = this.get_significative_number(value[i], [min, max]);
      info.ctx.fillText(nice_val, posit[i], orig[1] + x_padding_txt);
    }
    info.ctx.textBaseline = 'middle';
    info.ctx.textAlign = 'right';
    value = [];
    posit = [];
    for (i = 0, _ref4 = this.legend_y_division.get(); (0 <= _ref4 ? i <= _ref4 : i >= _ref4); (0 <= _ref4 ? i += 1 : i -= 1)) {
      pos = orig[1] + ((height_axis + decal_txt_Y - (orig[1] + decal_txt_Y)) / this.legend_y_division.get()) * i;
      val_from_screen = info.sc_2_rw.pos(0, pos);
      val = val_from_screen[1];
      value.push(val);
      posit.push(pos);
    }
    _ref5 = this.get_min_max_of_array(value), min = _ref5[0], max = _ref5[1];
    for (i = 0, _ref6 = this.legend_y_division.get(); (0 <= _ref6 ? i <= _ref6 : i >= _ref6); (0 <= _ref6 ? i += 1 : i -= 1)) {
      nice_val = this.get_significative_number(value[i], [min, max]);
      info.ctx.fillText(nice_val, orig[0] - y_padding_txt, posit[i] + decal_txt_Y);
    }
    info.ctx.fill();
    return info.ctx.closePath();
  };
  Graph.prototype.get_min_max_of_array = function(array) {
    var el, max, min, _i, _j, _len, _len2;
    min = array[0];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      el = array[_i];
      if (el < min) {
        min = el;
      }
    }
    max = array[0];
    for (_j = 0, _len2 = array.length; _j < _len2; _j++) {
      el = array[_j];
      if (el > max) {
        max = el;
      }
    }
    return [min, max];
  };
  Graph.prototype.get_significative_number = function(val, _arg) {
    var c, i, max, min, num, number, res, size, _len, _ref;
    min = _arg[0], max = _arg[1];
    size = Math.abs(max - min);
    if (size > 1) {
      res = Math.round(val);
      if (res.toString().length > 4) {
        res = res.toExponential();
      }
    } else {
      num = Math.round(val).toString().length;
      if (num <= 4) {
        res = val.toPrecision(num + 2);
        _ref = val.toString();
        for (i = 0, _len = _ref.length; i < _len; i++) {
          c = _ref[i];
          if (c !== "0" && c !== "." && c !== "-") {
            number = i;
            break;
          }
        }
        if (number > 3) {
          res = parseFloat(res).toExponential();
        }
      } else {
        res = val.toFixed(2);
      }
    }
    return res;
  };
  Graph.prototype.draw_grid = function(info) {
    var height_axis, i, orig, pos, width_axis, _ref, _ref2;
    orig = [0 + info.padding * 0.5, info.h - info.padding / 2, 0];
    width_axis = info.w - info.padding / 2;
    height_axis = -info.h + orig[1] + info.padding;
    info.ctx.beginPath();
    info.ctx.strokeStyle = this.grid_color.to_rgba();
    for (i = 1, _ref = this.legend_x_division.get(); (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      pos = orig[0] + ((width_axis - orig[0]) / this.legend_x_division.get()) * i;
      info.ctx.moveTo(pos, orig[1]);
      info.ctx.lineTo(pos, height_axis);
      info.ctx.stroke();
    }
    for (i = 1, _ref2 = this.legend_y_division.get(); (1 <= _ref2 ? i < _ref2 : i > _ref2); (1 <= _ref2 ? i += 1 : i -= 1)) {
      pos = orig[1] + ((height_axis - orig[1]) / this.legend_y_division.get()) * i;
      info.ctx.moveTo(orig[0], pos);
      info.ctx.lineTo(orig[0] + info.w - info.padding, pos);
    }
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  Graph.prototype.update_min_max = function(x_min, x_max) {
    var d, m, p, _i, _len, _ref, _results;
    _ref = this.points;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      p = m.pos.get();
      _results.push((function() {
        var _results;
        _results = [];
        for (d = 0; d < 3; d++) {
          x_min[d] = Math.min(x_min[d], p[d]);
          _results.push(x_max[d] = Math.max(x_max[d], p[d]));
        }
        return _results;
      })());
    }
    return _results;
  };
  Graph.prototype.on_mouse_move = function(cm, evt, pos, b, old) {
    var d, dx, dy, i, p, proj, res, x, y, _len, _ref;
    res = [];
    x = pos[0];
    y = pos[1];
    if (this.points.length) {
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        proj = cm.cam_info.re_2_sc.proj(p.pos.get());
        dx = x - proj[0];
        dy = y - proj[1];
        d = Math.sqrt(dx * dx + dy * dy);
        if (d <= this.marker_size.get() * 2) {
          res.push({
            item: p,
            dist: d
          });
        }
      }
    }
    if (res.length) {
      res.sort(function(a, b) {
        return b.dist - a.dist;
      });
      if (this._pre_sele.length !== 1 || this._pre_sele[0] !== res[0].item) {
        this._pre_sele.clear();
        this._pre_sele.push(res[0].item);
      }
    } else if (this._pre_sele.length) {
      this._pre_sele.clear();
    }
    return false;
  };
  return Graph;
})();var Background;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Background = (function() {
  __extends(Background, Drawable);
  function Background() {
    Background.__super__.constructor.call(this);
    this.add_attr({
      gradient: new Gradient
    });
    this.gradient.add_color([48, 48, 48, 255], 0);
    this.gradient.add_color([48, 48, 48, 255], 1);
  }
  Background.prototype.z_index = function() {
    return 0;
  };
  Background.prototype.draws_a_background = function() {
    return true;
  };
  Background.prototype.draw = function(info) {
    var array, col, fs, gl, lineargradient, pos, ps, vs, z, _i, _len, _ref;
    if (info.ctx_type === "2d") {
      lineargradient = info.ctx.createLinearGradient(0, 0, 0, info.h);
      _ref = this.gradient.color_stop;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        lineargradient.addColorStop(col.position.get(), col.color.to_rgba());
      }
      info.ctx.fillStyle = lineargradient;
      return info.ctx.fillRect(0, 0, info.w, info.h);
    } else {
      vs = "                precision mediump float;                varying float y;                attribute vec3 pos;                void main( void ) {                    y = 0.5 * ( pos.y + 1.0 );                    gl_Position = vec4( pos, 1.0 );                }            ";
      fs = this.gradient.get_fragment_shader("y");
      ps = info.cm.gl_prog(vs, fs);
      gl = info.ctx;
      if (!(this._points != null)) {
        z = 1.0 - 1e-6;
        array = new Float32Array([1.0, 1.0, z, -1.0, 1.0, z, 1.0, -1.0, z, -1.0, -1.0, z]);
        this._points = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._points);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
      }
      gl.useProgram(ps);
      pos = gl.getAttribLocation(ps, "pos");
      gl.enableVertexAttribArray(pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._points);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
      return gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  };
  return Background;
})();var Element_TetrahedraList;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Element_TetrahedraList = (function() {
  __extends(Element_TetrahedraList, Element);
  function Element_TetrahedraList() {
    Element_TetrahedraList.__super__.constructor.call(this);
    this.add_attr({
      indices: new TypedArray_Int32([4, 0])
    });
  }
  Element_TetrahedraList.prototype.draw_gl = function(info, mesh, points, is_a_sub) {};
  Element_TetrahedraList.prototype.draw = function(info, mesh, proj, is_a_sub) {};
  Element_TetrahedraList.prototype.draw_gl = function(info, mesh, points, is_a_sub) {};
  return Element_TetrahedraList;
})();var Element_Arc;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Element_Arc = (function() {
  __extends(Element_Arc, Element_WithIndices);
  function Element_Arc(indices) {
    Element_Arc.__super__.constructor.call(this, indices);
  }
  Element_Arc.prototype.draw_gl = function(info, mesh, points, is_a_sub, theme) {
    if (theme == null) {
      theme = info.theme.lines;
    }
    return this.draw(info, mesh, points, is_a_sub, theme);
  };
  Element_Arc.prototype.draw = function(info, mesh, proj, is_a_sub, theme) {
    var p, points, wf, _ref;
    if (theme == null) {
      theme = info.theme.lines;
    }
    wf = (_ref = mesh.visualization.display_style.get()) === "Wireframe" || _ref === "Surface with Edges";
    if (wf || !is_a_sub) {
      theme.beg_ctx(info);
      points = (function() {
        var _i, _len, _ref, _results;
        _ref = this.indices;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(mesh.points[p.get()].pos.get());
        }
        return _results;
      }).call(this);
      info.theme.lines.draw_interpolated_arcs(info, points);
      return theme.end_ctx(info);
    }
  };
  Element_Arc.prototype.contour = function(info, mesh, proj, beg, inversion) {
    var p, points;
    points = (function() {
      var _i, _len, _ref, _ref2, _results, _results2;
      if (inversion) {
        _results = [];
        for (p = _ref = this.indices.length - 1; (_ref <= 0 ? p <= 0 : p >= 0); (_ref <= 0 ? p += 1 : p -= 1)) {
          _results.push(mesh.points[this.indices[p].get()].pos.get());
        }
        return _results;
      } else {
        _ref2 = this.indices;
        _results2 = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          _results2.push(mesh.points[p.get()].pos.get());
        }
        return _results2;
      }
    }).call(this);
    return info.theme.lines.contour_interpolated_arcs(info, points, beg);
  };
  Element_Arc.prototype.closest_point_closer_than = function(best, mesh, proj, info, pos) {
    var P0, P1, a, b, d, dist, dx, dy, dz, i, l, p0, p1, px, py, pz, r, _ref, _results;
    if (this.indices.length) {
      _results = [];
      for (i = 0, _ref = this.indices.length - 1; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        p0 = this.indices[i + 0].get();
        p1 = this.indices[i + 1].get();
        a = proj[p0];
        b = proj[p1];
        _results.push(a[0] !== b[0] || a[1] !== b[1] ? (dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], px = pos[0] - a[0], py = pos[1] - a[1], l = dx * dx + dy * dy, d = px * dx + py * dy, l && d >= 0 && d <= l ? (r = d / l, px = a[0] + dx * r, py = a[1] + dy * r, pz = a[2] + dz * r, dist = Math.sqrt(Math.pow(px - pos[0], 2) + Math.pow(py - pos[1], 2)), best.dist >= dist ? (P0 = mesh.points[p0].pos.get(), P1 = mesh.points[p1].pos.get(), best.dist = dist, best.inst = this, best.indi = i, best.curv = r, best.disp = [P0[0] * (1 - r) + P1[0] * r, P0[1] * (1 - r) + P1[1] * r, P0[2] * (1 - r) + P1[2] * r]) : void 0) : void 0) : void 0);
      }
      return _results;
    }
  };
  return Element_Arc;
})();var Element_TriangleList;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Element_TriangleList = (function() {
  __extends(Element_TriangleList, Element);
  function Element_TriangleList() {
    Element_TriangleList.__super__.constructor.call(this);
    this.add_attr({
      indices: new TypedArray_Int32([3, 0])
    });
    this._date_pts = {};
    this._pts_buffer = {};
    this._nor_buffer = {};
    this._lns_buffer = {};
  }
  Element_TriangleList.prototype.draw_gl = function(info, mesh, points, is_a_sub) {
    var col, fs, gl, nor, pos, ps, vs, _ref, _ref2, _ref3, _ref4;
    this._update_bufs(info, mesh, points);
    gl = info.ctx;
    if ((_ref = mesh.visualization.display_style.get()) === "Points" || _ref === "Wireframe" || _ref === "Surface" || _ref === "Surface with Edges") {
      vs = "                precision mediump float;                attribute vec3 pos;                attribute vec3 nor;                varying vec3 norin;                " + (info.cam.gl_attr_vec(info, "can")) + "                " + (info.cam.gl_attr(info, "cam")) + "                void main( void ) {                    gl_Position = vec4( pos, 1.0 );                    " + (info.cam.gl_main_vec(info, "can", "nor", "norin")) + "                    " + (info.cam.gl_main(info, "cam")) + "                }            ";
      fs = "                precision mediump float;                uniform vec4 col;                varying vec3 norin;                void main( void ) {                    float g = abs( norin[ 2 ] );                    gl_FragColor = vec4( g * col[ 0 ], g * col[ 1 ], g * col[ 2 ], col[ 3 ] );                }            ";
      ps = info.cm.gl_prog(vs, fs);
      gl.useProgram(ps);
      pos = gl.getAttribLocation(ps, "pos");
      gl.enableVertexAttribArray(pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._pts_buffer[gl.ctx_id]);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
      nor = gl.getAttribLocation(ps, "nor");
      gl.enableVertexAttribArray(nor);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._nor_buffer[gl.ctx_id]);
      gl.vertexAttribPointer(nor, 3, gl.FLOAT, false, 0, 0);
      col = gl.getUniformLocation(ps, "col");
      gl.uniform4f(col, 0.7, 0.7, 0.7, 1.0);
      info.cam.gl_exec(info, "cam", ps);
      info.cam.gl_exec_vec(info, "can", ps);
      if ((_ref2 = mesh.visualization.display_style.get()) === "Surface" || _ref2 === "Surface with Edges") {
        gl.drawArrays(gl.TRIANGLES, 0, 3 * this.indices.size(1));
      }
    }
    if ((_ref3 = mesh.visualization.display_style.get()) === "Wireframe" || _ref3 === "Surface with Edges") {
      this._draw_lines(info);
    }
    if ((_ref4 = mesh.visualization.display_style.get()) === "Points") {
      return this._draw_points(info);
    }
  };
  Element_TriangleList.prototype.draw = function(info, mesh, proj, is_a_sub) {
    var i, j, lt, p, pl, _i, _len, _ref, _ref2, _ref3;
    if ((_ref = mesh.visualization.display_style.get()) === "Surface" || _ref === "Surface with Edges") {
      lt = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.indices.size(1); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
          _results.push([proj[this.indices.get([0, i])], proj[this.indices.get([1, i])], proj[this.indices.get([2, i])]]);
        }
        return _results;
      }).call(this);
      lt.sort(function(a, b) {
        return (b[0][2] + b[1][2] + b[2][2]) - (a[0][2] + a[1][2] + a[2][2]);
      });
      info.theme.surfaces.beg_ctx(info);
      for (_i = 0, _len = lt.length; _i < _len; _i++) {
        pl = lt[_i];
        info.theme.surfaces.draw(info, __bind(function() {
          info.ctx.moveTo(pl[0][0], pl[0][1]);
          info.ctx.lineTo(pl[1][0], pl[1][1]);
          info.ctx.lineTo(pl[2][0], pl[2][1]);
          return info.ctx.lineTo(pl[0][0], pl[0][1]);
        }, this));
      }
      info.theme.surfaces.end_ctx(info);
    }
    if ((_ref2 = mesh.visualization.display_style.get()) === "Wireframe" || _ref2 === "Surface with Edges") {
      info.theme.lines.beg_ctx(info);
      for (i = 0, _ref3 = this.indices.size(1); (0 <= _ref3 ? i < _ref3 : i > _ref3); (0 <= _ref3 ? i += 1 : i -= 1)) {
        p = (function() {
          var _results;
          _results = [];
          for (j = 0; j < 3; j++) {
            _results.push(proj[this.indices.get([j, i])]);
          }
          return _results;
        }).call(this);
        info.theme.lines.draw_straight_proj(info, p[0], p[1]);
        info.theme.lines.draw_straight_proj(info, p[1], p[2]);
        info.theme.lines.draw_straight_proj(info, p[2], p[0]);
      }
      return info.theme.lines.end_ctx(info);
    }
  };
  Element_TriangleList.prototype.draw_nodal_field_gl = function(info, mesh, points, data, display_style, legend, warp_by, warp_factor, buff_id) {
    var col, fs, gl, nor, pos, ps, tex, vs, wab, warp_buff;
    warp_buff = warp_by != null ? warp_by.warp_gl_buff(info, this, buff_id) : void 0;
    this._update_bufs(info, mesh, points);
    gl = info.ctx;
    if (display_style === "Surface" || display_style === "Surface with Edges") {
      vs = "                precision mediump float;\n                varying float y;\n                varying vec3 norin;\n                uniform float mit;\n                uniform float mat;\n                uniform float waf;\n                attribute vec3 pos;\n                attribute vec3 nor;\n                attribute vec3 wab;\n                attribute float tex;\n                " + (info.cam.gl_attr_vec(info, "can")) + "\n                " + (info.cam.gl_attr(info, "cam")) + "\n                void main( void ) {\n                    y = ( tex - mit ) / ( mat - mit );\n                    gl_Position = vec4( pos + waf * wab, 1.0 );\n                    " + (info.cam.gl_main_vec(info, "can", "nor", "norin")) + "\n                    " + (info.cam.gl_main(info, "cam")) + "\n                }\n            ";
      fs = legend.color_map.get_fragment_shader("y", "col", "norin");
      ps = info.cm.gl_prog(vs, fs);
      gl.useProgram(ps);
      pos = gl.getAttribLocation(ps, "pos");
      gl.enableVertexAttribArray(pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._pts_buffer[gl.ctx_id]);
      gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
      nor = gl.getAttribLocation(ps, "nor");
      gl.enableVertexAttribArray(nor);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._nor_buffer[gl.ctx_id]);
      gl.vertexAttribPointer(nor, 3, gl.FLOAT, false, 0, 0);
      wab = gl.getAttribLocation(ps, "wab");
      gl.enableVertexAttribArray(wab);
      if (warp_buff != null) {
        gl.bindBuffer(gl.ARRAY_BUFFER, warp_buff);
      } else {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._nor_buffer[gl.ctx_id]);
      }
      gl.vertexAttribPointer(wab, 3, gl.FLOAT, false, 0, 0);
      tex = gl.getAttribLocation(ps, "tex");
      if (tex >= 0) {
        gl.enableVertexAttribArray(tex);
        gl.bindBuffer(gl.ARRAY_BUFFER, data);
        gl.vertexAttribPointer(tex, 1, gl.FLOAT, false, 0, 0);
      }
      col = gl.getUniformLocation(ps, "col");
      gl.uniform4f(col, 0.7, 0.7, 0.7, 1.0);
      gl.uniform1f(gl.getUniformLocation(ps, "mit"), legend._min_val.get());
      gl.uniform1f(gl.getUniformLocation(ps, "mat"), legend._max_val.get());
      gl.uniform1f(gl.getUniformLocation(ps, "waf"), warp_factor);
      info.cam.gl_exec(info, "cam", ps);
      info.cam.gl_exec_vec(info, "can", ps);
      gl.drawArrays(gl.TRIANGLES, 0, 3 * this.indices.size(1));
    }
    if (display_style === "Wireframe" || display_style === "Surface with Edges") {
      return this._draw_lines(info);
    }
  };
  Element_TriangleList.prototype.draw_nodal_field = function(info, proj, data, display_style, legend) {
    var a, alpha, b, c, det, det_a, det_b, det_c, div_legend, i, indices, mat_a, mat_b, mat_c, mat_pos, max_legend, min_legend, num_triangle, p0, p0x0, p0y0, p1, p1ieqz, posit, tri, val, vals, x0, x1, x2, y0, y1, y2, _i, _len, _len2, _results;
    max_legend = legend.max_val.get();
    min_legend = legend.min_val.get();
    div_legend = max_legend - min_legend;
    div_legend = 1 / (div_legend + (div_legend === 0));
    indices = (function() {
      var _ref, _results;
      _results = [];
      for (num_triangle = 0, _ref = this.indices.size(1); (0 <= _ref ? num_triangle < _ref : num_triangle > _ref); (0 <= _ref ? num_triangle += 1 : num_triangle -= 1)) {
        _results.push([this.indices.get([0, num_triangle]), this.indices.get([1, num_triangle]), this.indices.get([2, num_triangle])]);
      }
      return _results;
    }).call(this);
    indices.sort(function(a, b) {
      return (proj[b[0]][2] + proj[b[1]][2] + proj[b[2]][2]) - (proj[a[0]][2] + proj[a[1]][2] + proj[a[2]][2]);
    });
    _results = [];
    for (_i = 0, _len = indices.length; _i < _len; _i++) {
      tri = indices[_i];
      vals = [data.get(tri[0]), data.get(tri[1]), data.get(tri[2])];
      for (i = 0, _len2 = vals.length; i < _len2; i++) {
        val = vals[i];
        vals[i] = (max_legend - val) * div_legend;
      }
      posit = (function() {
        var _results;
        _results = [];
        for (i = 0; i < 3; i++) {
          _results.push(proj[tri[i]]);
        }
        return _results;
      })();
      x0 = posit[0][0];
      y0 = posit[0][1];
      x1 = posit[1][0];
      y1 = posit[1][1];
      x2 = posit[2][0];
      y2 = posit[2][1];
      mat_pos = [[1, x0, y0], [1, x1, y1], [1, x2, y2]];
      det = Vec_3.determinant(mat_pos);
      det += det === 0;
      mat_a = [[vals[0], x0, y0], [vals[1], x1, y1], [vals[2], x2, y2]];
      det_a = Vec_3.determinant(mat_a);
      a = det_a / det;
      mat_b = [[1, vals[0], y0], [1, vals[1], y1], [1, vals[2], y2]];
      det_b = Vec_3.determinant(mat_b);
      b = det_b / det;
      mat_c = [[1, x0, vals[0]], [1, x1, vals[1]], [1, x2, vals[2]]];
      det_c = Vec_3.determinant(mat_c);
      c = det_c / det;
      if (b || c) {
        if (Math.abs(b) > Math.abs(c)) {
          p0x0 = -a / b;
          p0y0 = 0;
        } else {
          p0x0 = 0;
          p0y0 = -a / c;
        }
      } else {
        p0x0 = 0;
        p0y0 = 0;
      }
      p0 = [p0x0, p0y0, 0];
      p1ieqz = function(x) {
        return x + (Math.abs(x) < 1e-16);
      };
      alpha = 1 / p1ieqz(b * b + c * c);
      p1 = Vec_3.add(p0, Vec_3.mus(alpha, [b, c, 0]));
      if (display_style === "Surface" || display_style === "Surface with Edges") {
        this._draw_gradient_fill_triangle(info, p0, p1, posit, legend);
      }
      if (display_style === "Surface with Edges" || display_style === "Edges") {
        this._draw_edge_triangle(info, posit);
      }
      _results.push(display_style === "Wireframe" ? this._draw_gradient_stroke_triangle(info, p0, p1, posit, legend) : void 0);
    }
    return _results;
  };
  Element_TriangleList.prototype._draw_lines = function(info) {
    var col, fs, gl, pos, ps, vs;
    vs = "            precision mediump float;            attribute vec3 pos;            " + (info.cam.gl_attr(info, "cam")) + "            void main( void ) {                gl_Position = vec4( pos, 1.0 );                " + (info.cam.gl_main(info, "cam")) + "                gl_Position -= 1e-5;            }        ";
    fs = "            precision mediump float;            uniform vec4 col;            void main( void ) {                gl_FragColor = col;            }        ";
    ps = info.cm.gl_prog(vs, fs);
    gl = info.ctx;
    gl.useProgram(ps);
    pos = gl.getAttribLocation(ps, "pos");
    gl.enableVertexAttribArray(pos);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._lns_buffer[gl.ctx_id]);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    col = gl.getUniformLocation(ps, "col");
    gl.uniform4f(col, 1.0, 1.0, 1.0, 1.0);
    info.cam.gl_exec(info, "cam", ps);
    gl.lineWidth(2);
    return gl.drawArrays(gl.LINES, 0, 6 * this.indices.size(1));
  };
  Element_TriangleList.prototype._draw_points = function(info) {
    var col, fs, gl, pos, ps, vs;
    vs = "            precision mediump float;            attribute vec3 pos;            " + (info.cam.gl_attr(info, "cam")) + "            void main( void ) {                gl_Position = vec4( pos, 1.0 );                " + (info.cam.gl_main(info, "cam")) + "                gl_Position -= 1e-5;            }        ";
    fs = "            precision mediump float;            uniform vec4 col;            void main( void ) {                gl_FragColor = col;            }        ";
    ps = info.cm.gl_prog(vs, fs);
    gl = info.ctx;
    gl.useProgram(ps);
    pos = gl.getAttribLocation(ps, "pos");
    gl.enableVertexAttribArray(pos);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._lns_buffer);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    col = gl.getUniformLocation(ps, "col");
    gl.uniform4f(col, 1.0, 1.0, 1.0, 1.0);
    info.cam.gl_exec(info, "cam", ps);
    gl.lineWidth(2);
    return gl.drawArrays(gl.POINTS, 0, 6 * this.indices.size(1));
  };
  Element_TriangleList.prototype._update_bufs = function(info, mesh, points) {
    var cpl, cpn, cpp, dim, gl, i, lns, nn, nor, p0, p1, p2, pts, v, _i, _j, _k, _l, _len, _len10, _len11, _len12, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _s, _t;
    gl = info.ctx;
    if (!(this._date_pts[gl.ctx_id] != null)) {
      this._date_pts[gl.ctx_id] = -1;
    }
    if (this._date_pts[gl.ctx_id] < mesh._date_last_modification) {
      this._date_pts[gl.ctx_id] = mesh._date_last_modification;
      dim = 3;
      cpp = -1;
      cpn = -1;
      cpl = -1;
      pts = new Float32Array(3 * dim * this.indices.size(1));
      nor = new Float32Array(3 * dim * this.indices.size(1));
      lns = new Float32Array(6 * dim * this.indices.size(1));
      for (i = 0, _ref = this.indices.size(1); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        p0 = points[this.indices.get([0, i])].pos.get();
        p1 = points[this.indices.get([1, i])].pos.get();
        p2 = points[this.indices.get([2, i])].pos.get();
        nn = Vec_3.nor(Vec_3.cro(Vec_3.sub(p1, p0), Vec_3.sub(p2, p0)));
        for (_i = 0, _len = p0.length; _i < _len; _i++) {
          v = p0[_i];
          pts[cpp += 1] = v;
        }
        for (_j = 0, _len2 = p1.length; _j < _len2; _j++) {
          v = p1[_j];
          pts[cpp += 1] = v;
        }
        for (_k = 0, _len3 = p2.length; _k < _len3; _k++) {
          v = p2[_k];
          pts[cpp += 1] = v;
        }
        for (_l = 0, _len4 = nn.length; _l < _len4; _l++) {
          v = nn[_l];
          nor[cpn += 1] = v;
        }
        for (_m = 0, _len5 = nn.length; _m < _len5; _m++) {
          v = nn[_m];
          nor[cpn += 1] = v;
        }
        for (_n = 0, _len6 = nn.length; _n < _len6; _n++) {
          v = nn[_n];
          nor[cpn += 1] = v;
        }
        for (_o = 0, _len7 = p0.length; _o < _len7; _o++) {
          v = p0[_o];
          lns[cpl += 1] = v;
        }
        for (_p = 0, _len8 = p1.length; _p < _len8; _p++) {
          v = p1[_p];
          lns[cpl += 1] = v;
        }
        for (_q = 0, _len9 = p1.length; _q < _len9; _q++) {
          v = p1[_q];
          lns[cpl += 1] = v;
        }
        for (_r = 0, _len10 = p2.length; _r < _len10; _r++) {
          v = p2[_r];
          lns[cpl += 1] = v;
        }
        for (_s = 0, _len11 = p2.length; _s < _len11; _s++) {
          v = p2[_s];
          lns[cpl += 1] = v;
        }
        for (_t = 0, _len12 = p0.length; _t < _len12; _t++) {
          v = p0[_t];
          lns[cpl += 1] = v;
        }
      }
      if (this._pts_buffer[gl.ctx_id] != null) {
        gl.deleteBuffer(this._pts_buffer[gl.ctx_id]);
        gl.deleteBuffer(this._nor_buffer[gl.ctx_id]);
        gl.deleteBuffer(this._lns_buffer[gl.ctx_id]);
      }
      this._pts_buffer[gl.ctx_id] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._pts_buffer[gl.ctx_id]);
      gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
      this._nor_buffer[gl.ctx_id] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._nor_buffer[gl.ctx_id]);
      gl.bufferData(gl.ARRAY_BUFFER, nor, gl.STATIC_DRAW);
      this._lns_buffer[gl.ctx_id] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._lns_buffer[gl.ctx_id]);
      return gl.bufferData(gl.ARRAY_BUFFER, lns, gl.STATIC_DRAW);
    }
  };
  Element_TriangleList.prototype._draw_gradient_stroke_triangle = function(info, p0, p1, posit, legend) {
    var col, lineargradient, _i, _len, _ref;
    info.ctx.beginPath();
    lineargradient = info.ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
    _ref = legend.color_map.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      lineargradient.addColorStop(col.position.get(), col.color.to_rgba());
    }
    info.ctx.strokeStyle = lineargradient;
    info.ctx.moveTo(posit[0][0], posit[0][1]);
    info.ctx.lineTo(posit[1][0], posit[1][1]);
    info.ctx.lineTo(posit[2][0], posit[2][1]);
    info.ctx.lineTo(posit[0][0], posit[0][1]);
    return info.ctx.stroke();
  };
  Element_TriangleList.prototype._draw_gradient_fill_triangle = function(info, p0, p1, posit, legend) {
    var col, lineargradient, _i, _len, _ref;
    info.ctx.beginPath();
    if (isNaN(p0[0]) || isNaN(p0[1]) || isNaN(p1[0]) || isNaN(p1[1])) {
      return;
    }
    if (Math.abs(p0[0]) > 1e40 || Math.abs(p0[1]) > 1e40 || Math.abs(p1[0]) > 1e40 || Math.abs(p1[1]) > 1e40) {
      return;
    }
    lineargradient = info.ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
    _ref = legend.color_map.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      lineargradient.addColorStop(col.position.get(), col.color.to_rgba());
    }
    info.ctx.strokeStyle = lineargradient;
    info.ctx.fillStyle = lineargradient;
    info.ctx.moveTo(posit[0][0], posit[0][1]);
    info.ctx.lineTo(posit[1][0], posit[1][1]);
    info.ctx.lineTo(posit[2][0], posit[2][1]);
    info.ctx.lineTo(posit[0][0], posit[0][1]);
    info.ctx.fill();
    return info.ctx.stroke();
  };
  Element_TriangleList.prototype.draw_elementary_triangle = function(info, proj, data, display_style, legend) {
    var c, col, div_legend, gv, i, max_legend, min_legend, nor, num_triangle, p0, p1, p2, pos, position, tri, value, x, _ref, _results;
    max_legend = legend.max_val.get();
    min_legend = legend.min_val.get();
    div_legend = max_legend - min_legend;
    div_legend = 1 / (div_legend + (div_legend === 0));
    _results = [];
    for (num_triangle = 0, _ref = this.indices.size(1); (0 <= _ref ? num_triangle < _ref : num_triangle > _ref); (0 <= _ref ? num_triangle += 1 : num_triangle -= 1)) {
      tri = [this.indices.get([0, num_triangle]), this.indices.get([1, num_triangle]), this.indices.get([2, num_triangle])];
      value = data.get(num_triangle);
      position = (function() {
        var _results;
        _results = [];
        for (i = 0; i < 3; i++) {
          _results.push(proj[tri[i]]);
        }
        return _results;
      })();
      pos = (max_legend - value) / (max_legend - min_legend);
      col = legend.color_map.get_color_from_pos(pos);
      _results.push(info.ctx_type === "2d" ? (display_style === "Wireframe" ? this._draw_elementary_stroke_triangle(info, position, col) : void 0, display_style === "Surface" || display_style === "Surface with Edges" ? this._draw_elementary_fill_triangle(info, position, col) : void 0, display_style === "Surface with Edges" || display_style === "Edges" ? this._draw_edge_triangle(info, position) : void 0) : (!(this._sf != null) ? this._sf = new SurfaceTheme : void 0, p0 = (function() {
        var _i, _len, _ref, _results;
        _ref = position[0];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(x);
        }
        return _results;
      })(), p1 = (function() {
        var _i, _len, _ref, _results;
        _ref = position[1];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(x);
        }
        return _results;
      })(), p2 = (function() {
        var _i, _len, _ref, _results;
        _ref = position[2];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(x);
        }
        return _results;
      })(), p0[2] *= Math.max(info.w, info.h), p1[2] *= Math.max(info.w, info.h), p2[2] *= Math.max(info.w, info.h), nor = Vec_3.nor(Vec_3.cro(Vec_3.sub(p1, p0), Vec_3.sub(p2, p0))), gv = 0.5 + 0.4 * Math.abs(nor[2]), this._sf.draw_triangle(info, position[0], position[1], position[2], (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = col.length; _i < _len; _i++) {
          c = col[_i];
          _results.push(gv * c / 255.0);
        }
        return _results;
      })())));
    }
    return _results;
  };
  Element_TriangleList.prototype._draw_elementary_stroke_triangle = function(info, position, col) {
    info.ctx.beginPath();
    info.ctx.strokeStyle = "rgba( " + col[0] + ", " + col[1] + ", " + col[2] + ", " + col[3] + " ) ";
    info.ctx.moveTo(position[0][0], position[0][1]);
    info.ctx.lineTo(position[1][0], position[1][1]);
    info.ctx.lineTo(position[2][0], position[2][1]);
    info.ctx.lineTo(position[0][0], position[0][1]);
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  Element_TriangleList.prototype._draw_elementary_fill_triangle = function(info, position, col) {
    info.ctx.beginPath();
    info.ctx.fillStyle = "rgba( " + col[0] + ", " + col[1] + ", " + col[2] + ", " + col[3] + " ) ";
    info.ctx.strokeStyle = "rgba( " + col[0] + ", " + col[1] + ", " + col[2] + ", " + col[3] + " ) ";
    info.ctx.moveTo(position[0][0], position[0][1]);
    info.ctx.lineTo(position[1][0], position[1][1]);
    info.ctx.lineTo(position[2][0], position[2][1]);
    info.ctx.lineTo(position[0][0], position[0][1]);
    info.ctx.fill();
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  Element_TriangleList.prototype._draw_edge_triangle = function(info, posit) {
    info.theme.lines.beg_ctx(info);
    info.theme.lines.draw_straight_proj(info, posit[0], posit[1]);
    info.theme.lines.draw_straight_proj(info, posit[1], posit[2]);
    info.theme.lines.draw_straight_proj(info, posit[2], posit[0]);
    return info.theme.lines.end_ctx(info);
  };
  return Element_TriangleList;
})();var Element_BoundedVolume;
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
};
Element_BoundedVolume = (function() {
  __extends(Element_BoundedVolume, Element);
  function Element_BoundedVolume(boundaries) {
    if (boundaries == null) {
      boundaries = [];
    }
    Element_BoundedVolume.__super__.constructor.call(this);
    this.add_attr({
      boundaries: boundaries
    });
  }
  Element_BoundedVolume.prototype.draw = function(info, mesh, proj, is_a_sub) {};
  Element_BoundedVolume.prototype.draw_gl = function(info, mesh, points, is_a_sub) {};
  Element_BoundedVolume.prototype.update_indices = function(done, n_array) {
    var b, _base, _i, _len, _ref, _results;
    _ref = this.boundaries;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      _results.push(typeof (_base = b.e).update_indices === "function" ? _base.update_indices(done, n_array) : void 0);
    }
    return _results;
  };
  Element_BoundedVolume.prototype.closest_point_closer_than = function(best, mesh, proj, info, pos) {
    return void 0;
  };
  Element_BoundedVolume.prototype.add_sub_element = function(res) {
    var b, _i, _len, _ref, _ref2, _results;
    _ref = this.boundaries;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      _results.push((_ref2 = b.e, __indexOf.call(res, _ref2) < 0) ? res.push(b.e) : void 0);
    }
    return _results;
  };
  return Element_BoundedVolume;
})();var Element_Line;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Element_Line = (function() {
  __extends(Element_Line, Element_WithIndices);
  function Element_Line(indices) {
    if (indices == null) {
      indices = [];
    }
    Element_Line.__super__.constructor.call(this, indices);
    this.cut_with_point_callback = [];
  }
  Element_Line.prototype.draw_gl = function(info, mesh, points, is_a_sub, theme) {
    var i, p, proj;
    if (theme == null) {
      theme = info.theme.lines;
    }
    proj = (function() {
      var _len, _results;
      _results = [];
      for (i = 0, _len = points.length; i < _len; i++) {
        p = points[i];
        _results.push(info.re_2_sc.proj(p.pos.get()));
      }
      return _results;
    })();
    return this.draw(info, mesh, proj, is_a_sub);
  };
  Element_Line.prototype.draw = function(info, mesh, proj, is_a_sub, theme) {
    var i, wf, _ref, _ref2;
    if (theme == null) {
      theme = info.theme.lines;
    }
    wf = (_ref = mesh.visualization.display_style.get()) === "Wireframe" || _ref === "Surface with Edges";
    if (wf || !is_a_sub) {
      theme.beg_ctx(info);
      if (this.indices.length) {
        for (i = 0, _ref2 = this.indices.length - 1; (0 <= _ref2 ? i < _ref2 : i > _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
          theme.draw_straight_proj(info, proj[this.indices[i].get()], proj[this.indices[i + 1].get()]);
        }
      }
      return theme.end_ctx(info);
    }
  };
  Element_Line.prototype.contour = function(info, mesh, proj, beg, inversion) {
    var i, _ref, _ref2, _results, _results2;
    if (this.indices.length >= 2) {
      if (inversion) {
        _results = [];
        for (i = _ref = this.indices.length - 2; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
          _results.push(info.theme.lines.contour_straight_proj(info, proj[this.indices[i + 1].get()], proj[this.indices[i].get()], beg && i === 0));
        }
        return _results;
      } else {
        _results2 = [];
        for (i = 0, _ref2 = this.indices.length - 1; (0 <= _ref2 ? i < _ref2 : i > _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
          _results2.push(info.theme.lines.contour_straight_proj(info, proj[this.indices[i].get()], proj[this.indices[i + 1].get()], beg && i === 0));
        }
        return _results2;
      }
    }
  };
  Element_Line.prototype.closest_point_closer_than = function(best, mesh, proj, info, pos) {
    var P0, P1, a, b, d, dist, dx, dy, dz, i, l, p0, p1, px, py, pz, r, _ref, _results;
    if (this.indices.length) {
      _results = [];
      for (i = 0, _ref = this.indices.length - 1; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        p0 = this.indices[i + 0].get();
        p1 = this.indices[i + 1].get();
        a = proj[p0];
        b = proj[p1];
        _results.push(a[0] !== b[0] || a[1] !== b[1] ? (dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], px = pos[0] - a[0], py = pos[1] - a[1], l = dx * dx + dy * dy, d = px * dx + py * dy, l && d >= 0 && d <= l ? (r = d / l, px = a[0] + dx * r, py = a[1] + dy * r, pz = a[2] + dz * r, dist = Math.sqrt(Math.pow(px - pos[0], 2) + Math.pow(py - pos[1], 2)), best.dist >= dist ? (P0 = mesh.points[p0].pos.get(), P1 = mesh.points[p1].pos.get(), best.dist = dist, best.inst = this, best.indi = i, best.curv = r, best.disp = [P0[0] * (1 - r) + P1[0] * r, P0[1] * (1 - r) + P1[1] * r, P0[2] * (1 - r) + P1[2] * r]) : void 0) : void 0) : void 0);
      }
      return _results;
    }
  };
  Element_Line.prototype.cut_with_point = function(divisions, data, mesh, np, ip) {
    var fun, _i, _len, _ref, _results;
    if (data.inst === this) {
      if (!(divisions[this.model_id] != null)) {
        divisions[this.model_id] = [new Element_Line([this.indices[0].get(), np]), new Element_Line([np, this.indices[1].get()])];
      }
      _ref = this.cut_with_point_callback;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fun = _ref[_i];
        _results.push(fun(mesh, this.indices, np));
      }
      return _results;
    }
  };
  return Element_Line;
})();var Element_BoundedSurf;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
Element_BoundedSurf = (function() {
  __extends(Element_BoundedSurf, Element);
  function Element_BoundedSurf(boundaries) {
    if (boundaries == null) {
      boundaries = [];
    }
    Element_BoundedSurf.__super__.constructor.call(this);
    this.add_attr({
      boundaries: boundaries
    });
  }
  Element_BoundedSurf.prototype.draw = function(info, mesh, proj, is_a_sub) {
    var _ref;
    if ((_ref = mesh.visualization.display_style.get()) === "Surface" || _ref === "Surface with Edges") {
      info.theme.surfaces.beg_ctx(info);
      info.theme.surfaces.draw(info, __bind(function() {
        var b, n, _len, _ref, _results;
        _ref = this.boundaries;
        _results = [];
        for (n = 0, _len = _ref.length; n < _len; n++) {
          b = _ref[n];
          _results.push(b.e.contour(info, mesh, proj, n === 0, b.o < 0));
        }
        return _results;
      }, this));
      return info.theme.surfaces.end_ctx(info);
    }
  };
  Element_BoundedSurf.prototype.draw_gl = function(info, mesh, points, is_a_sub) {
    var i, p, proj;
    proj = (function() {
      var _len, _results;
      _results = [];
      for (i = 0, _len = points.length; i < _len; i++) {
        p = points[i];
        _results.push(info.re_2_sc.proj(p.pos.get()));
      }
      return _results;
    })();
    return this.draw(info, mesh, proj, is_a_sub);
  };
  Element_BoundedSurf.prototype.update_indices = function(done, n_array) {
    var b, _base, _i, _len, _ref, _results;
    _ref = this.boundaries;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      _results.push(typeof (_base = b.e).update_indices === "function" ? _base.update_indices(done, n_array) : void 0);
    }
    return _results;
  };
  Element_BoundedSurf.prototype.closest_point_closer_than = function(best, mesh, proj, info, pos) {
    return void 0;
  };
  Element_BoundedSurf.prototype.cut_with_point = function(divisions, data, mesh, np, ip) {
    var b, d, n, nl, res, _base, _i, _len, _len2, _ref, _ref2, _ref3;
    res = [];
    _ref = this.boundaries;
    for (n = 0, _len = _ref.length; n < _len; n++) {
      b = _ref[n];
      if (typeof (_base = b.e).cut_with_point === "function") {
        _base.cut_with_point(divisions, data, mesh, np, ip);
      }
      if (divisions[b.e.model_id] != null) {
        if (b.o < 0) {
          d = divisions[b.e.model_id];
          if (d.length) {
            for (nl = _ref2 = d.length - 1; (_ref2 <= 0 ? nl <= 0 : nl >= 0); (_ref2 <= 0 ? nl += 1 : nl -= 1)) {
              res.push({
                o: b.o,
                e: d[nl]
              });
            }
          }
        } else {
          _ref3 = divisions[b.e.model_id];
          for (_i = 0, _len2 = _ref3.length; _i < _len2; _i++) {
            nl = _ref3[_i];
            res.push({
              o: b.o,
              e: nl
            });
          }
        }
      } else {
        res.push(b);
      }
    }
    this.boundaries.clear();
    return this.boundaries.set(res);
  };
  Element_BoundedSurf.prototype.add_sub_element = function(res) {
    var b, _i, _len, _ref, _ref2, _results;
    _ref = this.boundaries;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      b = _ref[_i];
      _results.push((_ref2 = b.e, __indexOf.call(res, _ref2) < 0) ? res.push(b.e) : void 0);
    }
    return _results;
  };
  Element_BoundedSurf.prototype.rem_sub_element = function(sel_point) {
    var aft, b, bef, i, new_res, pos, res, unlinked_points, waiting_points, _len, _ref;
    if (this.boundaries != null) {
      res = [];
      unlinked_points = [];
      _ref = this.boundaries;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        b = _ref[i];
        waiting_points = [];
        if (__indexOf.call(b.e.get_point_numbers(), sel_point) >= 0) {
          waiting_points = b.e.get_point_numbers();
          pos = waiting_points.indexOf(sel_point);
          if (waiting_points.length === 2) {
            unlinked_points.push(b.e.indices[1 - pos]);
            new_res = this._link_elements(unlinked_points);
            if (new_res !== false) {
              res.push(new_res);
              unlinked_points = [];
            }
          } else if (waiting_points.length >= 3) {
            bef = b.e.indices.slice(0, pos);
            aft = b.e.indices.slice(pos + 1, b.e.indices.length);
            if (pos === 0) {
              unlinked_points.push(aft[0].get());
            } else if (pos === b.e.indices.length - 1) {
              unlinked_points.push(bef[bef.length - 1].get());
            }
            new_res = this._link_elements(unlinked_points);
            if (new_res !== false) {
              res.push(new_res);
              unlinked_points = [];
            }
            if ((waiting_points.length - 1) === 2) {
              res.push({
                o: 1,
                e: new Element_Line(bef.get().concat(aft.get()))
              });
            } else if ((waiting_points.length - 1) >= 3) {
              res.push({
                o: 1,
                e: new Element_Arc(bef.get().concat(aft.get()))
              });
            }
          } else {
            res.push(b);
          }
        } else {
          res.push(b);
        }
      }
      this.boundaries.clear();
      return this.boundaries.set(res);
    }
  };
  Element_BoundedSurf.prototype.make_curve_line_from_selected = function(sel_point) {
    var b, i, n, np, res, tmp_array, waiting_points, _i, _j, _k, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
    if ((sel_point != null) && (this.boundaries != null)) {
      res = [];
      waiting_points = [];
      _ref = this.boundaries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        if (__indexOf.call(b.e.get_point_numbers(), sel_point) >= 0) {
          np = b.e.get_point_numbers();
          if (b.o < 0) {
            if (np.length) {
              _ref2 = np.slice(np.length - 1, (waiting_points.length > 0 + 1) || 9e9);
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                n = _ref2[_j];
                waiting_points.push(n);
              }
            }
          } else {
            if (waiting_points.length && waiting_points[0] === np[np.length - 1]) {
              tmp_array = [];
              _ref3 = np.slice(0, np.length - 1);
              for (i = 0, _len3 = _ref3.length; i < _len3; i++) {
                n = _ref3[i];
                tmp_array.push(n);
              }
              waiting_points = tmp_array.concat(waiting_points);
            } else {
              _ref4 = np.slice(waiting_points.length > 0);
              for (_k = 0, _len4 = _ref4.length; _k < _len4; _k++) {
                n = _ref4[_k];
                waiting_points.push(n);
              }
            }
          }
        } else {
          if (waiting_points.length >= 3) {
            res.push({
              o: 1,
              e: new Element_Arc(waiting_points)
            });
            waiting_points = [];
          }
          res.push(b);
        }
      }
      if (waiting_points.length >= 3) {
        res.push({
          o: 1,
          e: new Element_Arc(waiting_points)
        });
        waiting_points = [];
      }
      this.boundaries.clear();
      return this.boundaries.set(res);
    }
  };
  Element_BoundedSurf.prototype.break_line_from_selected = function(sel_point) {
    var after, b, l, pos, res, waiting_points, _i, _len, _ref;
    if ((sel_point != null) && (this.boundaries != null)) {
      waiting_points = [];
      res = [];
      _ref = this.boundaries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        if (__indexOf.call(b.e.get_point_numbers(), sel_point) >= 0) {
          waiting_points = b.e.get_point_numbers();
          if (waiting_points.length >= 3) {
            pos = waiting_points.indexOf(sel_point);
            if (pos !== -1) {
              if (pos === 1) {
                res.push({
                  o: 1,
                  e: new Element_Line(waiting_points.slice(0, pos + 1))
                });
              }
              if (pos >= 2) {
                res.push({
                  o: 1,
                  e: new Element_Arc(waiting_points.slice(0, pos + 1))
                });
              }
              l = waiting_points.length - 1;
              after = l - pos;
              if (after === 1) {
                res.push({
                  o: 1,
                  e: new Element_Line(waiting_points.slice(pos, l + 1))
                });
              }
              if (after >= 2) {
                res.push({
                  o: 1,
                  e: new Element_Arc(waiting_points.slice(pos, l + 1))
                });
              }
            }
          } else {
            res.push(b);
          }
        } else {
          res.push(b);
        }
      }
      this.boundaries.clear();
      return this.boundaries.set(res);
    }
  };
  Element_BoundedSurf.prototype._link_elements = function(unlinked_points) {
    var res;
    if (unlinked_points.length === 2) {
      res = {
        o: 1,
        e: new Element_Line(unlinked_points)
      };
      return res;
    }
    return false;
  };
  return Element_BoundedSurf;
})();var FieldSet;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
FieldSet = (function() {
  __extends(FieldSet, Drawable);
  function FieldSet() {
    FieldSet.__super__.constructor.call(this);
    this.add_attr({
      color_by: new Choice,
      warp_by: new Choice,
      warp_factor: 0
    });
  }
  FieldSet.prototype.update_min_max = function(x_min, x_max) {
    var _ref, _ref2;
    return (_ref = this.color_by.lst[0]) != null ? (_ref2 = _ref.data._mesh) != null ? _ref2.update_min_max(x_min, x_max) : void 0 : void 0;
  };
  FieldSet.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["color_by"] = ModelEditorItem_ChoiceWithEditableItems;
  };
  FieldSet.prototype.draw = function(info) {
    var f;
    f = this.color_by.item();
    if (f != null) {
      return f.draw(info, {
        warp_by: this.warp_by.item() != null ? this.warp_by.item().data : void 0,
        warp_factor: this.warp_factor.get()
      });
    }
  };
  FieldSet.prototype.sub_canvas_items = function(additionnal_parameters) {
    var f;
    f = this.color_by.item();
    if (f != null) {
      return f.sub_canvas_items(additionnal_parameters);
    } else {
      return [];
    }
  };
  FieldSet.prototype.z_index = function() {
    return 150;
  };
  return FieldSet;
})();var ImageField;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ImageField = (function() {
  __extends(ImageField, Drawable);
  function ImageField(name, path) {
    ImageField.__super__.constructor.call(this);
    this.add_attr({
      name: name,
      src: ""
    });
    this.rgba = new Image;
    this.rgba.onload = __bind(function() {
      return this._signal_change();
    }, this);
    this.src.bind(__bind(function() {
      if (this.src.length) {
        return this.rgba.src = this.src.get();
      }
    }, this));
    this._date_tex = {};
    this.tex = {};
  }
  ImageField.prototype.get_drawing_parameters = function(model) {
    model.add_attr({
      drawing_parameters: {
        _legend: new Legend("todo")
      }
    });
    return model.drawing_parameters.add_attr({
      color_map: model.drawing_parameters._legend.color_map
    });
  };
  ImageField.prototype.get_min_data = function() {
    return 0;
  };
  ImageField.prototype.get_max_data = function() {
    return 255;
  };
  ImageField.prototype.toString = function() {
    return this.name.get();
  };
  ImageField.prototype.draw = function(info) {
    if (this.rgba.height) {
      return Img._draw_persp_rec(info, this.rgba, 0, 0, [0, this.rgba.height, 0], [1, 0, 0], [0, -1, 0], [0, 0, 1], this._date_tex, this.tex, this.src);
    }
  };
  ImageField.prototype.z_index = function() {
    return 20000;
  };
  return ImageField;
})();var InterpolatedField;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
InterpolatedField = (function() {
  __extends(InterpolatedField, Model);
  function InterpolatedField(name) {
    InterpolatedField.__super__.constructor.call(this);
    this.add_attr({
      _data: []
    });
  }
  InterpolatedField.prototype.get_drawing_parameters = function(model) {
    if (this._data.length) {
      return this._data[0].field.get_drawing_parameters(model);
    }
  };
  InterpolatedField.prototype.get_sub_field = function(info) {
    var n, t, _len, _ref;
    _ref = this._data;
    for (n = 0, _len = _ref.length; n < _len; n++) {
      t = _ref[n];
      if (t.pos[0].axe_name.equals("time")) {
        if (t.pos[0].axe_value.get() >= info.time) {
          return t.field;
        }
      }
    }
    if (this._data.length) {
      return this._data[this._data.length - 1].field;
    }
  };
  InterpolatedField.prototype.get_val = function(info, i) {
    var f;
    f = this.get_sub_field(info);
    if (f != null) {
      return f.get_val(info, i);
    }
  };
  InterpolatedField.prototype.draw = function(info, parameters, additionnal_parameters) {
    var f, _ref, _ref2;
    if (parameters != null ? (_ref = parameters._legend) != null ? (_ref2 = _ref.auto_fit) != null ? _ref2.get() : void 0 : void 0 : void 0) {
      this.actualise_value_legend_all_fields(parameters._legend);
    }
    f = this.get_sub_field(info);
    if (f != null) {
      return f.draw(info, parameters, additionnal_parameters);
    }
  };
  InterpolatedField.prototype.sub_canvas_items = function(additionnal_parameters) {
    if (this._data.length) {
      return this._data[0].field.sub_canvas_items(additionnal_parameters);
    } else {
      return [];
    }
  };
  InterpolatedField.prototype.z_index = function() {
    if (this._data.length) {
      return this._data[0].field.z_index();
    } else {
      return 0;
    }
  };
  InterpolatedField.prototype.warp_gl_buff = function(info, el, buff_id) {
    var f;
    f = this.get_sub_field(info);
    return f.warp_gl_buff(info, el, buff_id);
  };
  InterpolatedField.prototype.actualise_value_legend_all_fields = function(legend) {
    var field, interpo_field, max, maxus, min, minus, _i, _len, _ref;
    max = -Infinity;
    min = Infinity;
    _ref = this._data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interpo_field = _ref[_i];
      field = interpo_field.field;
      maxus = field.get_max_data();
      minus = field.get_min_data();
      if (minus < min) {
        min = minus;
      }
      if (maxus > max) {
        max = maxus;
      }
    }
    legend.min_val.set(min);
    return legend.max_val.set(max);
  };
  return InterpolatedField;
})();var ElementaryField;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ElementaryField = (function() {
  __extends(ElementaryField, Model);
  function ElementaryField(mesh) {
    ElementaryField.__super__.constructor.call(this);
    this.add_attr({
      _mesh: mesh,
      _data: new TypedArray_Float64(mesh != null ? mesh.nb_elements() : void 0)
    });
    this._date_bufs = {};
    this._data_buffer = {};
  }
  ElementaryField.prototype.get_drawing_parameters = function(model) {
    model.add_attr({
      drawing_parameters: {
        _legend: new Legend(model.name)
      }
    });
    return model.drawing_parameters.add_attr({
      display_style: new Choice(1, ["Wireframe", "Surface", "Surface with Edges"]),
      legend: model.drawing_parameters._legend
    });
  };
  ElementaryField.prototype.get_sub_field = function(info) {
    return this;
  };
  ElementaryField.prototype.update_min_max = function(x_min, x_max) {
    return this._mesh.update_min_max(x_min, x_max);
  };
  ElementaryField.prototype.toString = function() {
    return this.name.get();
  };
  ElementaryField.prototype.get = function() {
    return this._data.get();
  };
  ElementaryField.prototype.sub_canvas_items = function() {
    if (this.drawing_parameters != null) {
      return [this.drawing_parameters._legend];
    } else {
      return [];
    }
  };
  ElementaryField.prototype.z_index = function() {
    return 140;
  };
  ElementaryField.prototype.get_val = function(info, i) {
    return this._data.get(i);
  };
  ElementaryField.prototype.draw = function(info, parameters, additionnal_parameters) {
    var el, i, ni, nn, offset_el, p, proj, _i, _j, _len, _len2, _ref, _ref2;
    if (parameters != null) {
      this.actualise_value_legend(parameters._legend);
      if (info.ctx_type === "gl") {
        nn = -1;
        offset_el = 0;
        _ref = this._mesh._elements;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          if (el.indices._data != null) {
            this._update_gl_bufs(info, (nn += 1), el, offset_el);
            ni = nn + "_" + info.ctx.ctx_id;
            if (typeof el.draw_nodal_field_gl === "function") {
              el.draw_nodal_field_gl(info, this._mesh, this._mesh.points, this._data_buffer[ni], parameters.display_style.get(), parameters._legend);
            }
            offset_el += el.indices.size(1);
          }
        }
      } else {
        proj = (function() {
          var _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results, _results2;
          if (((additionnal_parameters != null ? additionnal_parameters.warp_by : void 0) != null) && this._mesh.points.length === ((_ref = additionnal_parameters.warp_by._vector[0]) != null ? (_ref2 = _ref._data[0]) != null ? (_ref3 = _ref2.field) != null ? (_ref4 = _ref3._data.size()) != null ? _ref4[0] : void 0 : void 0 : void 0 : void 0)) {
            _ref5 = this._mesh.points;
            _results = [];
            for (i = 0, _len = _ref5.length; i < _len; i++) {
              p = _ref5[i];
              _results.push(info.re_2_sc.proj(Vec_3.add(p.pos.get(), Vec_3.mus(additionnal_parameters.warp_factor, additionnal_parameters.warp_by.get_val(info, i, 3)))));
            }
            return _results;
          } else {
            _ref6 = this._mesh.points;
            _results2 = [];
            for (i = 0, _len2 = _ref6.length; i < _len2; i++) {
              p = _ref6[i];
              _results2.push(info.re_2_sc.proj(p.pos.get()));
            }
            return _results2;
          }
        }).call(this);
        _ref2 = this._mesh._elements;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          el = _ref2[_j];
          if (typeof el.draw_elementary_triangle === "function") {
            el.draw_elementary_triangle(info, proj, this._data, parameters.display_style.get(), parameters._legend);
          }
        }
      }
      return parameters._legend.draw(info);
    }
  };
  ElementaryField.prototype.actualise_value_legend = function(legend) {
    var max, min;
    if (this._data.has_been_modified() || !legend.is_correct()) {
      min = this.get_min_data();
      legend.min_val.set(min);
      max = this.get_max_data();
      return legend.max_val.set(max);
    }
  };
  ElementaryField.prototype.get_min_data = function() {
    return this._get_min(this._data.get());
  };
  ElementaryField.prototype.get_max_data = function() {
    return this._get_max(this._data.get());
  };
  ElementaryField.prototype._update_gl_bufs = function(info, nn, el, offset_el) {
    var cpe, gl, i, j, ne, ni, val, _ref, _ref2;
    gl = info.ctx;
    ni = nn + "_" + gl.ctx_id;
    if (!(this._date_bufs[ni] != null)) {
      this._date_bufs[ni] = -1;
    }
    if (this._date_bufs[ni] < this._data._date_last_modification || this._date_bufs[ni] < this._mesh._date_last_modification) {
      this._date_bufs[ni] = Model._counter;
      if (this._data_buffer[ni] != null) {
        gl.deleteBuffer(this._data_buffer[ni]);
      }
      this._data_buffer[ni] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._data_buffer[ni]);
      cpe = -1;
      ne = el.indices._data.length;
      val = new Float32Array(ne);
      for (i = 0, _ref = el.indices.size(1); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        for (j = 0, _ref2 = el.indices.size(0); (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
          val[cpe += 1] = this._data._data[i + offset_el];
        }
      }
      return gl.bufferData(gl.ARRAY_BUFFER, val, gl.STATIC_DRAW);
    }
  };
  ElementaryField.prototype._get_max = function(l) {
    var i, max, val, _ref;
    if (l.length > 0) {
      max = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val > max) {
        max = val;
      }
    }
    return max;
  };
  ElementaryField.prototype._get_min = function(l) {
    var i, min, val, _ref;
    if (l.length > 0) {
      min = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val < min) {
        min = val;
      }
    }
    return min;
  };
  return ElementaryField;
})();var NodalField;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
NodalField = (function() {
  __extends(NodalField, Model);
  function NodalField(mesh) {
    NodalField.__super__.constructor.call(this);
    this.add_attr({
      _mesh: mesh,
      _data: new TypedArray_Float64(mesh != null ? typeof mesh.nb_points === "function" ? mesh.nb_points() : void 0 : void 0)
    });
    this._date_bufs = {};
    this._data_buffer = {};
  }
  NodalField.prototype.size = function() {
    return this._data._data.length;
  };
  NodalField.prototype.get_drawing_parameters = function(model) {
    model.add_attr({
      drawing_parameters: {
        _legend: new Legend(model.name)
      }
    });
    return model.drawing_parameters.add_attr({
      display_style: new Choice(1, ["Wireframe", "Surface", "Surface with Edges"]),
      legend: model.drawing_parameters._legend
    });
  };
  NodalField.prototype.get_sub_field = function(info) {
    return this;
  };
  NodalField.prototype.update_min_max = function(x_min, x_max) {
    return this._mesh.update_min_max(x_min, x_max);
  };
  NodalField.prototype.toString = function() {
    return this.name.get();
  };
  NodalField.prototype.draw = function(info, parameters, additionnal_parameters) {
    var el, i, ni, nn, p, proj, w, _i, _j, _len, _len2, _ref, _ref2;
    if (parameters != null) {
      this.actualise_value_legend(parameters._legend);
      if (info.ctx_type === "gl") {
        nn = -1;
        _ref = this._mesh._elements;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          if (el.indices._data != null) {
            this._update_gl_bufs(info, (nn += 1), el);
            ni = nn + "_" + info.ctx.ctx_id;
            w = ((additionnal_parameters != null ? additionnal_parameters.warp_by : void 0) != null) && (additionnal_parameters != null ? additionnal_parameters.warp_factor : void 0) ? additionnal_parameters.warp_by : void 0;
            if (typeof el.draw_nodal_field_gl === "function") {
              el.draw_nodal_field_gl(info, this._mesh, this._mesh.points, this._data_buffer[ni], parameters.display_style.get(), parameters._legend, w, additionnal_parameters.warp_factor, ni);
            }
          }
        }
      } else {
        proj = (function() {
          var _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results, _results2;
          if (((additionnal_parameters != null ? additionnal_parameters.warp_by : void 0) != null) && this._mesh.points.length === ((_ref = additionnal_parameters.warp_by._vector[0]) != null ? (_ref2 = _ref._data[0]) != null ? (_ref3 = _ref2.field) != null ? (_ref4 = _ref3._data.size()) != null ? _ref4[0] : void 0 : void 0 : void 0 : void 0)) {
            _ref5 = this._mesh.points;
            _results = [];
            for (i = 0, _len = _ref5.length; i < _len; i++) {
              p = _ref5[i];
              _results.push(info.re_2_sc.proj(Vec_3.add(p.pos.get(), Vec_3.mus(additionnal_parameters.warp_factor, additionnal_parameters.warp_by.get_val(info, i, 3)))));
            }
            return _results;
          } else {
            _ref6 = this._mesh.points;
            _results2 = [];
            for (i = 0, _len2 = _ref6.length; i < _len2; i++) {
              p = _ref6[i];
              _results2.push(info.re_2_sc.proj(p.pos.get()));
            }
            return _results2;
          }
        }).call(this);
        _ref2 = this._mesh._elements;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          el = _ref2[_j];
          if (typeof el.draw_nodal_field === "function") {
            el.draw_nodal_field(info, proj, this._data, parameters.display_style.get(), parameters._legend);
          }
        }
      }
      return parameters._legend.draw(info);
    }
  };
  NodalField.prototype.sub_canvas_items = function() {
    if (this.drawing_parameters != null) {
      return [this.drawing_parameters._legend];
    } else {
      return [];
    }
  };
  NodalField.prototype.z_index = function() {
    return 150;
  };
  NodalField.prototype.get_val = function(info, i) {
    return this._data.get(i);
  };
  NodalField.prototype.actualise_value_legend = function(legend) {
    var max, min;
    if (this._data.has_been_modified() || !legend.is_correct()) {
      min = this.get_min_data();
      legend.min_val.set(min);
      max = this.get_max_data();
      return legend.max_val.set(max);
    }
  };
  NodalField.prototype.get_min_data = function() {
    return this._get_min(this._data.get());
  };
  NodalField.prototype.get_max_data = function() {
    return this._get_max(this._data.get());
  };
  NodalField.prototype._update_gl_bufs = function(info, nn, el) {
    var gl, i, ne, ni, val;
    gl = info.ctx;
    ni = nn + "_" + gl.ctx_id;
    if (!(this._date_bufs[ni] != null)) {
      this._date_bufs[ni] = -1;
    }
    if (this._date_bufs[ni] < this._data._date_last_modification || this._date_bufs[ni] < this._mesh._date_last_modification) {
      this._date_bufs[ni] = Model._counter;
      if (this._data_buffer[ni] != null) {
        gl.deleteBuffer(this._data_buffer[ni]);
      }
      this._data_buffer[ni] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._data_buffer[ni]);
      ne = el.indices._data.length;
      val = new Float32Array(ne);
      for (i = 0; (0 <= ne ? i < ne : i > ne); (0 <= ne ? i += 1 : i -= 1)) {
        val[i] = this._data._data[el.indices.get(i)];
      }
      return gl.bufferData(gl.ARRAY_BUFFER, val, gl.STATIC_DRAW);
    }
  };
  NodalField.prototype._get_max = function(l) {
    var i, max, val, _ref;
    if (l.length > 0) {
      max = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val > max) {
        max = val;
      }
    }
    return max;
  };
  NodalField.prototype._get_min = function(l) {
    var i, min, val, _ref;
    if (l.length > 0) {
      min = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val < min) {
        min = val;
      }
    }
    return min;
  };
  return NodalField;
})();var VectorialField;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
VectorialField = (function() {
  __extends(VectorialField, Drawable);
  function VectorialField(name, vector, params) {
    if (name == null) {
      name = "";
    }
    if (vector == null) {
      vector = new Lst;
    }
    if (params == null) {
      params = {};
    }
    VectorialField.__super__.constructor.call(this);
    this.add_attr({
      _vector: vector
    });
    this._date_pts = {};
    this._pts_buffer = {};
  }
  VectorialField.prototype.get_drawing_parameters = function(model) {
    if (this._vector.length) {
      model.add_attr({
        drawing_parameters: {
          _legend: new Legend(model.name)
        }
      });
      return model.drawing_parameters.add_attr({
        display_style: new Choice(2, ["Points", "Wireframe", "Surface", "Surface with Edges", "Arrow"]),
        legend: model.drawing_parameters._legend
      });
    }
  };
  VectorialField.prototype.get = function(a, b) {
    if (a != null) {
      if (b != null) {
        return this._vector[a].get(b);
      } else {
        return this._vector[a].get();
      }
    } else {
      return this._vector.get();
    }
  };
  VectorialField.prototype.get_val = function(info, i, n) {
    var j, _results;
    if (n == null) {
      n = 3;
    }
    _results = [];
    for (j = 0; (0 <= n ? j < n : j > n); (0 <= n ? j += 1 : j -= 1)) {
      _results.push(j < this._vector.length ? this._vector[j].get_val(info, i) : 0);
    }
    return _results;
  };
  VectorialField.prototype.dim = function() {
    if (this._vector) {
      return this._vector.length;
    }
    return 0;
  };
  VectorialField.prototype.field_length = function(info) {
    var f;
    if (this._vector[0] != null) {
      f = this._vector[0].get_sub_field(info);
      return f._data.size();
    }
  };
  VectorialField.prototype.add_child = function(child) {
    return this._vector.push(child);
  };
  VectorialField.prototype.rem_child = function(child) {
    var ind;
    ind = this._vector.indexOf(child);
    if (ind > 0) {
      return this._vector.splice(ind, 1);
    }
  };
  VectorialField.prototype.get_norm_value_at_index = function(info, index) {
    var value, vector_value;
    vector_value = this.get_val(info, index);
    return value = Math.sqrt(vector_value[0] * vector_value[0] + vector_value[1] * vector_value[1]);
  };
  VectorialField.prototype.actualise_value_legend = function(info, legend, norm) {
    var i, len, max, min, normalized_val;
    if (norm == null) {
      norm = true;
    }
    if (norm) {
      normalized_val = [];
      len = this.field_length(info);
      for (i = 0; (0 <= len ? i < len : i > len); (0 <= len ? i += 1 : i -= 1)) {
        normalized_val[i] = this.get_norm_value_at_index(info, i);
      }
      max = this._get_max(normalized_val);
      min = this._get_min(normalized_val);
      legend.min_val.set(min);
      return legend.max_val.set(max);
    } else {
      return this._vector[0].actualise_value_legend_all_fields(legend);
    }
  };
  VectorialField.prototype.z_index = function() {
    return 175;
  };
  VectorialField.prototype.draw = function(info, parameters, additionnal_parameters) {
    var sub_field, warp_factor, _ref, _ref2;
    if (parameters != null) {
      this.actualise_value_legend(info, parameters._legend, true);
      if (this.dim() >= 2) {
        warp_factor = 0;
        if ((additionnal_parameters != null ? additionnal_parameters.warp_by : void 0) != null) {
          warp_factor = additionnal_parameters.warp_factor;
        }
        sub_field = this._vector[0].get_sub_field(info);
        if ((((_ref = sub_field._mesh) != null ? _ref.points : void 0) != null) && (((_ref2 = sub_field._data) != null ? _ref2._data : void 0) != null)) {
          this.draw_vectorial_field(info, parameters.display_style.get(), sub_field._mesh.points, sub_field._data._data, parameters._legend, warp_factor);
        }
        return parameters._legend.draw(info);
      }
    }
  };
  VectorialField.prototype.draw_vectorial_field = function(info, display_style, points, values, legend, warp_factor, norm) {
    var arrow_p0, arrow_p1, arrow_reduce, arrow_width_factor, color, data, element, i, ind, int_field, max_legend, min_legend, norm_values, orthogo, p, position, proj_p0, proj_p1, val, _len, _len2, _len3, _ref, _results;
    if (warp_factor == null) {
      warp_factor = 1;
    }
    if (norm == null) {
      norm = true;
    }
    if (display_style === "Arrow") {
      color = "white";
      arrow_reduce = 0.3;
      arrow_width_factor = 0.1;
      _results = [];
      for (ind = 0, _len = points.length; ind < _len; ind++) {
        p = points[ind];
        element = new Lst;
        _ref = this._vector;
        for (i = 0, _len2 = _ref.length; i < _len2; i++) {
          int_field = _ref[i];
          data = int_field.get_sub_field(info)._data._data;
          element.push(data[ind] * warp_factor);
        }
        if (element.length === 2) {
          element.push(0);
        }
        proj_p0 = info.re_2_sc.proj(p.pos.get());
        proj_p1 = info.re_2_sc.proj(Vec_3.add(p.pos.get(), element.get()));
        orthogo = [proj_p0[1] - proj_p1[1], proj_p1[0] - proj_p0[0]];
        arrow_p0 = [(1 - arrow_reduce) * proj_p1[0] + arrow_reduce * proj_p0[0] + arrow_width_factor * orthogo[0], (1 - arrow_reduce) * proj_p1[1] + arrow_reduce * proj_p0[1] + arrow_width_factor * orthogo[1]];
        arrow_p1 = [(1 - arrow_reduce) * proj_p1[0] + arrow_reduce * proj_p0[0] - arrow_width_factor * orthogo[0], (1 - arrow_reduce) * proj_p1[1] + arrow_reduce * proj_p0[1] - arrow_width_factor * orthogo[1]];
        max_legend = legend.max_val.get();
        min_legend = legend.min_val.get();
        if (norm) {
          norm_values = [];
          for (i = 0, _len3 = values.length; i < _len3; i++) {
            val = values[i];
            norm_values[i] = this.get_norm_value_at_index(info, i);
          }
          position = (max_legend - norm_values[ind]) / (max_legend - min_legend);
        } else {
          position = (max_legend - values[ind]) / (max_legend - min_legend);
        }
        color = legend.color_map.get_color_from_pos(position);
        _results.push(this._draw_arrow_colored(info, proj_p0, proj_p1, arrow_p0, arrow_p1, color));
      }
      return _results;
    }
  };
  VectorialField.prototype.warp_gl_buff = function(info, el, buff_id) {
    var cpp, dim, gl, i, ni, nn, pts, _ref, _ref2;
    gl = info.ctx;
    if (!(this._date_pts[buff_id] != null)) {
      this._date_pts[buff_id] = -1;
    }
    if (this._date_pts[buff_id] < this._vector._date_last_modification) {
      this._date_pts[buff_id] = this._vector._date_last_modification;
      dim = 3;
      cpp = -1;
      pts = new Float32Array(el.indices.size(0) * dim * el.indices.size(1));
      for (i = 0, _ref = el.indices.size(1); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        for (nn = 0, _ref2 = el.indices.size(0); (0 <= _ref2 ? nn < _ref2 : nn > _ref2); (0 <= _ref2 ? nn += 1 : nn -= 1)) {
          ni = el.indices.get([nn, i]);
          pts[cpp += 1] = this._vector[0] != null ? this._vector[0].get_sub_field(info).get_val(info, ni) : 0;
          pts[cpp += 1] = this._vector[1] != null ? this._vector[1].get_sub_field(info).get_val(info, ni) : 0;
          pts[cpp += 1] = this._vector[2] != null ? this._vector[2].get_sub_field(info).get_val(info, ni) : 0;
        }
      }
      if (this._pts_buffer[buff_id] != null) {
        gl.deleteBuffer(this._pts_buffer[buff_id]);
      }
      this._pts_buffer[buff_id] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this._pts_buffer[buff_id]);
      gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
    }
    return this._pts_buffer[buff_id];
  };
  VectorialField.prototype._draw_arrow_colored = function(info, p0, p1, arrow_p0, arrow_p1, color) {
    info.ctx.beginPath();
    info.ctx.lineWidth = 1;
    info.ctx.strokeStyle = "rgba( " + color[0] + ", " + color[1] + ", " + color[2] + ", " + color[3] + " ) ";
    info.ctx.moveTo(p0[0], p0[1]);
    info.ctx.lineTo(p1[0], p1[1]);
    info.ctx.stroke();
    info.ctx.fillStyle = "rgba( " + color[0] + ", " + color[1] + ", " + color[2] + ", " + color[3] + " ) ";
    info.ctx.lineWidth = 0.8;
    info.ctx.moveTo(p1[0], p1[1]);
    info.ctx.lineTo(arrow_p0[0], arrow_p0[1]);
    info.ctx.lineTo(arrow_p1[0], arrow_p1[1]);
    info.ctx.lineTo(p1[0], p1[1]);
    info.ctx.fill();
    info.ctx.stroke();
    return info.ctx.closePath();
  };
  VectorialField.prototype._get_max = function(l) {
    var i, max, val, _ref;
    if (l.length > 0) {
      max = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val > max) {
        max = val;
      }
    }
    return max;
  };
  VectorialField.prototype._get_min = function(l) {
    var i, min, val, _ref;
    if (l.length > 0) {
      min = l[0];
    }
    for (i = 1, _ref = l.length; (1 <= _ref ? i < _ref : i > _ref); (1 <= _ref ? i += 1 : i -= 1)) {
      val = l[i];
      if (val < min) {
        min = val;
      }
    }
    return min;
  };
  return VectorialField;
})();var CanvasManager;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
CanvasManager = (function() {
  __extends(CanvasManager, View);
  CanvasManager.ctx_id = -1;
  function CanvasManager(params) {
    var dv, key, val, _base;
    for (key in params) {
      val = params[key];
      this[key] = val;
    }
    dv = __bind(function(field, fun) {
      if (!(this[field] != null)) {
        return this[field] = fun();
      }
    }, this);
    dv("items", function() {
      return new Lst;
    });
    dv("cam", __bind(function() {
      return new Cam(this.want_aspect_ratio);
    }, this));
    dv("allow_gl", function() {
      return false;
    });
    dv("theme", function() {
      return new Theme;
    });
    dv("time", function() {
      return new ConstrainedVal(0, {
        min: 0,
        max: -1,
        div: 0
      });
    });
    dv("padding_ratio", function() {
      return 1.5;
    });
    dv("constrain_zoom", function() {
      return false;
    });
    dv("width", function() {
      return 100;
    });
    dv("auto_fit", function() {
      return false;
    });
    dv("class_name", function() {
      return '';
    });
    CanvasManager.__super__.constructor.call(this, [this.items, this.cam, this.time]);
    this.canvas = new_dom_element({
      style: {
        width: this.width + "%"
      },
      nodeName: "canvas",
      className: this.class_name != null ? this.class_name || '' : void 0,
      parentNode: this.el
    });
    this.canvas.onmousewheel = __bind(function(evt) {
      return this._mouse_wheel(evt);
    }, this);
    this.canvas.onmousedown = __bind(function(evt) {
      return this._mouse_down(evt);
    }, this);
    this.canvas.onmousemove = __bind(function(evt) {
      return this._mouse_move(evt);
    }, this);
    this.canvas.onmouseout = __bind(function(evt) {
      return this._mouse_out(evt);
    }, this);
    this.canvas.ondblclick = __bind(function(evt) {
      return this._dbl_click(evt);
    }, this);
    this.canvas.onmouseup = __bind(function(evt) {
      return this._mouse_up(evt);
    }, this);
    if (typeof (_base = this.canvas).addEventListener === "function") {
      _base.addEventListener("DOMMouseScroll", this.canvas.onmousewheel, false);
    }
    this._init_ctx();
    this.x_min = [0, 0, 0];
    this.x_max = [1, 1, 1];
    this.click_fun = [];
    this.dblclick_fun = [];
    this.select_canvas_fun = [];
    this._buf_list = {
      vert: {
        buf: {},
        del: __bind(function(val) {
          return this.ctx.deleteShader(val);
        }, this)
      },
      frag: {
        buf: {},
        del: __bind(function(val) {
          return this.ctx.deleteShader(val);
        }, this)
      },
      prog: {
        buf: {},
        del: __bind(function(val) {
          return this.ctx.deleteProgram(val);
        }, this)
      }
    };
  }
  CanvasManager.prototype.active_items = function() {
    return this.items;
  };
  CanvasManager.prototype.selected_items = function() {
    return [];
  };
  CanvasManager.prototype.onchange = function() {
    if (this.need_to_redraw()) {
      return this.draw();
    }
  };
  CanvasManager.prototype.need_to_redraw = function() {
    var f, flat, item, s, str_act, str_sel, _base, _base2, _base3, _base4, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3;
    if (typeof (_base = this.items).has_been_directly_modified === "function" ? _base.has_been_directly_modified() : void 0) {
      return true;
    }
    if (typeof (_base2 = this.cam).has_been_modified === "function" ? _base2.has_been_modified() : void 0) {
      return true;
    }
    if (typeof (_base3 = this.theme).has_been_modified === "function" ? _base3.has_been_modified() : void 0) {
      return true;
    }
    if (typeof (_base4 = this.time).has_been_modified === "function" ? _base4.has_been_modified() : void 0) {
      return true;
    }
    str_act = "";
    _ref = this.active_items();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      if (!(typeof s.has_nothing_to_draw === "function" ? s.has_nothing_to_draw() : void 0)) {
        str_act += " " + s.model_id;
      }
    }
    if (this._old_str_act !== str_act) {
      this._old_str_act = str_act;
      return true;
    }
    str_sel = "";
    _ref2 = this.selected_items();
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      s = _ref2[_j];
      if (!(typeof s.has_nothing_to_draw === "function" ? s.has_nothing_to_draw() : void 0)) {
        str_sel += " " + s.model_id;
      }
    }
    if (this._old_str_sel !== str_sel) {
      this._old_str_sel = str_sel;
      return true;
    }
    flat = [];
    _ref3 = this.active_items();
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      item = _ref3[_k];
      CanvasManager._get_flat_list(flat, item);
    }
    for (_l = 0, _len4 = flat.length; _l < _len4; _l++) {
      f = flat[_l];
      if (typeof f.has_been_modified === "function" ? f.has_been_modified() : void 0) {
        return true;
      }
    }
    return false;
  };
  CanvasManager.prototype.bounding_box = function() {
    var get_min_max, item, x_max, x_min, _i, _len, _ref;
    if (this._bounding_box != null) {
      return this._bounding_box;
    }
    get_min_max = function(item, x_min, x_max) {
      var sub_item, _i, _len, _ref, _results;
      if (typeof item.update_min_max === "function") {
        item.update_min_max(x_min, x_max);
      }
      if (item.sub_canvas_items != null) {
        _ref = item.sub_canvas_items();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sub_item = _ref[_i];
          _results.push(get_min_max(sub_item, x_min, x_max));
        }
        return _results;
      }
    };
    x_min = [+1e40, +1e40, +1e40];
    x_max = [-1e40, -1e40, -1e40];
    _ref = this.active_items();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      get_min_max(item, x_min, x_max);
    }
    if (x_min[0] === +1e40) {
      return [[-1, -1, -1], [1, 1, 1]];
    }
    this._bounding_box = [x_min, x_max];
    return this._bounding_box;
  };
  CanvasManager.prototype.fit = function(anim) {
    var O, b, d, dx, dy, h, ip, res, rx, ry, w;
    if (anim == null) {
      anim = 1;
    }
    b = this.bounding_box();
    O = [0.5 * (b[1][0] + b[0][0]), 0.5 * (b[1][1] + b[0][1]), 0.5 * (b[1][2] + b[0][2])];
    d = this.padding_ratio * Math.max(b[1][0] - b[0][0], b[1][1] - b[0][1], b[1][2] - b[0][2]);
    if (d === 0) {
      d = 1;
    }
    if (this.cam.r != null) {
      w = this.canvas.width;
      h = this.canvas.height;
      dx = b[1][0] - b[0][0];
      dy = b[1][1] - b[0][1];
      if (dy === 0) {
        dy = 1;
      }
      ip = 1 / this.padding_ratio;
      if (w > h) {
        rx = (ip * w) / (w - h * (1 - ip));
        this.aset(this.cam.r, rx * (h * dx) / (w * dy), anim);
        d = dy * this.padding_ratio;
      } else {
        ry = (h - w * (1 - ip)) / (ip * h);
        res = ry * (h * dx) / (w * dy);
        this.aset(this.cam.r, res, anim);
        d = dx / res * this.padding_ratio;
      }
    }
    this.aset(this.cam.O, O, anim);
    this.aset(this.cam.d, d, anim);
    return this.aset(this.cam.C, this.cam.O, anim);
  };
  CanvasManager.prototype.aset = function(model, value, anim) {
    if (anim == null) {
      anim = 1;
    }
    return Animation.set(model, value, anim * this.theme.anim_delay.get());
  };
  CanvasManager.prototype.top = function() {
    this.aset(this.cam.X, [1, 0, 0]);
    return this.aset(this.cam.Y, [0, 0, 1]);
  };
  CanvasManager.prototype.bottom = function() {
    this.aset(this.cam.X, [1, 0, 0]);
    return this.aset(this.cam.Y, [0, 0, -1]);
  };
  CanvasManager.prototype.right = function() {
    this.aset(this.cam.X, [0, 0, 1]);
    return this.aset(this.cam.Y, [0, 1, 0]);
  };
  CanvasManager.prototype.left = function() {
    this.aset(this.cam.X, [0, 0, -1]);
    return this.aset(this.cam.Y, [0, 1, 0]);
  };
  CanvasManager.prototype.origin = function() {
    this.aset(this.cam.X, [1, 0, 0]);
    return this.aset(this.cam.Y, [0, 1, 0]);
  };
  CanvasManager.prototype.draw = function() {
    var b, bb, f, has_a_background, has_a_changed_drawable, item, n, s, t, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
    this._flat = [];
    _ref = this.active_items();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      CanvasManager._get_flat_list(this._flat, item);
    }
    has_a_background = false;
    has_a_changed_drawable = false;
    _ref2 = this._flat;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      f = _ref2[_j];
      has_a_background |= typeof f.draws_a_background === "function" ? f.draws_a_background() : void 0;
      has_a_changed_drawable |= typeof f.has_been_modified === "function" ? f.has_been_modified() : void 0;
    }
    if (has_a_changed_drawable) {
      delete this._bounding_box;
      bb = this.bounding_box();
      this.cam._O.set(Vec_3.mus(0.5, Vec_3.add(bb[1], bb[0])));
      this.cam._d.set(Vec_3.len(Vec_3.sub(bb[1], bb[0])));
    }
    if (this.ctx_type === "gl") {
      this.ctx.clear(this.ctx.GL_DEPTH_BUFFER_BIT);
    } else if (!has_a_background) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.sup_canvas_ctx != null) {
      this.sup_canvas_ctx.clearRect(0, 0, this.sup_canvas.width, this.sup_canvas.height);
    }
    if (this.auto_fit && has_a_changed_drawable) {
      if (this.first_fit != null) {
        this.fit(1);
      } else {
        this.first_fit = true;
        this.fit(0);
      }
    }
    _ref3 = this._buf_list;
    for (t in _ref3) {
      b = _ref3[t];
      _ref4 = b.buf;
      for (n in _ref4) {
        s = _ref4[n];
        s.used = false;
      }
    }
    this._mk_cam_info();
    this._flat.sort(function(a, b) {
      if (!(a.z_index != null) || !(b.z_index != null)) {
        console.log(a, b);
      }
      return a.z_index() - b.z_index();
    });
    _ref5 = this._flat;
    for (_k = 0, _len3 = _ref5.length; _k < _len3; _k++) {
      item = _ref5[_k];
      item.draw(this.cam_info);
    }
    this.ctx.finish();
    _ref6 = this._buf_list;
    _results = [];
    for (t in _ref6) {
      b = _ref6[t];
      _results.push((function() {
        var _ref, _results;
        _ref = b.buf;
        _results = [];
        for (n in _ref) {
          s = _ref[n];
          _results.push(!s.used ? (b.del(s.val), delete b.buf[n]) : void 0);
        }
        return _results;
      })());
    }
    return _results;
  };
  CanvasManager.prototype.resize = function(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    if (this.sup_canvas) {
      this.sup_canvas.width = w;
      this.sup_canvas.height = h;
    }
    if (this.ctx_type === "gl") {
      return this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  };
  CanvasManager.prototype.make_sub_canvas = function() {
    if (!(this.sup_canvas != null)) {
      this.sup_canvas = new_dom_element({
        style: {
          pointerEvents: "none",
          position: "absolute",
          zIndex: 1,
          left: 0,
          top: 0
        },
        nodeName: "canvas",
        className: this.class_name != null ? this.class_name || '' : void 0,
        parentNode: this.el
      });
      this.sup_canvas_ctx = this.sup_canvas.getContext('2d');
      this.sup_canvas.width = this.canvas.width;
      return this.sup_canvas.height = this.canvas.height;
    }
  };
  CanvasManager.prototype.fillText = function(t, x, y, f, a, c) {
    var m;
    if (f == null) {
      f = "16pt Arial";
    }
    if (a == null) {
      a = "center";
    }
    if (c == null) {
      c = "White";
    }
    if (this.ctx_type === "2d") {
      this.ctx.font = f;
      this.ctx.textAlign = a;
      return this.ctx.fillText(t, x, y);
    } else {
      this.make_sub_canvas();
      this.sup_canvas_ctx.font = f;
      this.sup_canvas_ctx.fillStyle = c;
      if (a === "center-limited") {
        m = this.sup_canvas_ctx.measureText(t);
        if (x + m.width / 2 + 10 >= this.sup_canvas.width) {
          x = this.sup_canvas.width - 10 - m.width / 2;
        }
        this.sup_canvas_ctx.textAlign = "center";
      } else {
        this.sup_canvas_ctx.textAlign = a;
      }
      return this.sup_canvas_ctx.fillText(t, x, y);
    }
  };
  CanvasManager.prototype.active_items_rec = function(l) {
    var item, res, sub_item, _i, _j, _len, _len2, _ref;
    if (l == null) {
      l = this.active_items();
    }
    res = [];
    for (_i = 0, _len = l.length; _i < _len; _i++) {
      item = l[_i];
      res.push(item);
      if (item.sub_canvas_items != null) {
        _ref = this.active_items_rec(item.sub_canvas_items());
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          sub_item = _ref[_j];
          res.push(sub_item);
        }
      }
    }
    return res;
  };
  CanvasManager.prototype.selected_and_always_active_rec = function() {
    var act, res, _i, _len, _ref;
    res = this.selected_items_rec();
    _ref = this.active_items_rec();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      act = _ref[_i];
      if (typeof act.always_active === "function" ? act.always_active() : void 0) {
        res.push(act);
      }
    }
    return res;
  };
  CanvasManager.prototype.selected_items_rec = function(l) {
    var item, res, sub_item, _i, _j, _len, _len2, _ref;
    if (l == null) {
      l = this.selected_items();
    }
    res = [];
    for (_i = 0, _len = l.length; _i < _len; _i++) {
      item = l[_i];
      res.push(item);
      if (item.sub_canvas_items != null) {
        _ref = this.selected_items_rec(item.sub_canvas_items());
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          sub_item = _ref[_j];
          res.push(sub_item);
        }
      }
    }
    return res;
  };
  CanvasManager.prototype.gl_vert = function(src) {
    return this._get_buf_obj("vert", src, __bind(function() {
      return this._make_gl_shader(src, this.ctx.VERTEX_SHADER);
    }, this));
  };
  CanvasManager.prototype.gl_frag = function(src) {
    return this._get_buf_obj("frag", src, __bind(function() {
      return this._make_gl_shader(src, this.ctx.FRAGMENT_SHADER);
    }, this));
  };
  CanvasManager.prototype.gl_prog = function(vert_src, frag_src) {
    var frag, src, vert;
    vert = this.gl_vert(vert_src);
    frag = this.gl_frag(frag_src);
    src = vert_src + "**" + frag_src;
    return this._get_buf_obj("prog", src, __bind(function() {
      return this._make_gl_program(vert, frag);
    }, this));
  };
  CanvasManager.prototype._get_buf_obj = function(list_name, key, fun) {
    var obj;
    obj = this._buf_list[list_name].buf;
    if (obj[key] != null) {
      obj[key].used = true;
    } else {
      obj[key] = {
        used: true,
        val: fun()
      };
    }
    return obj[key].val;
  };
  CanvasManager.prototype._make_gl_shader = function(src, type) {
    var shader;
    shader = this.ctx.createShader(type);
    this.ctx.shaderSource(shader, src);
    this.ctx.compileShader(shader);
    if (this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
      return shader;
    }
    return alert("An error occurred compiling the shader: " + src + this.ctx.getShaderInfoLog(shader));
  };
  CanvasManager.prototype._make_gl_program = function(vert, frag) {
    var prog;
    prog = this.ctx.createProgram();
    this.ctx.attachShader(prog, vert);
    this.ctx.attachShader(prog, frag);
    this.ctx.linkProgram(prog);
    if (this.ctx.getProgramParameter(prog, this.ctx.LINK_STATUS)) {
      return prog;
    }
    return alert("Unable to initialize the shader program.");
  };
  CanvasManager.prototype._catch_evt = function(evt) {
    if (typeof evt.preventDefault === "function") {
      evt.preventDefault();
    }
    evt.returnValue = false;
    return false;
  };
  CanvasManager.prototype._dbl_click = function(evt) {
    var fun, item, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
    _ref = this.select_canvas_fun;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      fun = _ref[_i];
      fun(this, evt);
    }
    if (!(evt != null)) {
      evt = window.event;
    }
    this.mouse_x = evt.clientX - get_left(this.canvas);
    this.mouse_y = evt.clientY - get_top(this.canvas);
    _ref2 = this.selected_and_always_active_rec();
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      item = _ref2[_j];
      if (typeof item.on_dbl_click === "function" ? item.on_dbl_click(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b) : void 0) {
        return this._catch_evt(evt);
      }
    }
    _ref3 = this.dblclick_fun;
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      fun = _ref3[_k];
      if (fun(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b)) {
        return this._catch_evt(evt);
      }
    }
    return this._catch_evt(evt);
  };
  CanvasManager.prototype._mouse_down = function(evt) {
    var fun, item, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
    this.mouse_has_moved_since_mouse_down = false;
    _ref = this.select_canvas_fun;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      fun = _ref[_i];
      fun(this, evt);
    }
    if (!(evt != null)) {
      evt = window.event;
    }
    this.mouse_b = evt.which != null ? evt.which < 2 ? "LEFT" : evt.which === 2 ? "MIDDLE" : "RIGHT" : evt.button < 2 ? "LEFT" : evt.button === 4 ? "MIDDLE" : "RIGHT";
    this.mouse_x = evt.clientX - get_left(this.canvas);
    this.mouse_y = evt.clientY - get_top(this.canvas);
    _ref2 = this.selected_and_always_active_rec();
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      item = _ref2[_j];
      if (typeof item.on_mouse_down === "function" ? item.on_mouse_down(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b) : void 0) {
        return this._catch_evt(evt);
      }
    }
    _ref3 = this.click_fun;
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      fun = _ref3[_k];
      if (fun(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b)) {
        return this._catch_evt(evt);
      }
    }
    if (this.mouse_b === "RIGHT") {
      this.canvas.oncontextmenu = __bind(function() {
        return false;
      }, this);
      evt.stopPropagation();
      evt.cancelBubble = true;
      document.oncontextmenu = __bind(function() {
        return false;
      }, this);
    }
    return this._catch_evt(evt);
  };
  CanvasManager.prototype._mouse_up = function(evt) {
    var item, _i, _len, _ref;
    if (!this.mouse_has_moved_since_mouse_down) {
      _ref = this.selected_and_always_active_rec();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (typeof item.on_mouse_up_wo_move === "function" ? item.on_mouse_up_wo_move(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b) : void 0) {
          delete this.mouse_b;
          delete this.clk_x;
          delete this.clk_y;
          return this._catch_evt(evt);
        }
      }
    }
    if (typeof this.context_menu === "function") {
      this.context_menu(evt, this.mouse_b === "RIGHT" && !this.mouse_has_moved_since_mouse_down);
    }
    delete this.mouse_b;
    delete this.clk_x;
    return delete this.clk_y;
  };
  CanvasManager.prototype._mouse_out = function(evt) {
    delete this.mouse_b;
    delete this.clk_x;
    return delete this.clk_y;
  };
  CanvasManager.prototype._mouse_wheel = function(evt) {
    var c, cx, cy, delta, item, _i, _len, _ref;
    if (!(evt != null)) {
      evt = window.event;
    }
    this.mouse_x = evt.clientX - get_left(this.canvas);
    this.mouse_y = evt.clientY - get_top(this.canvas);
    delta = 0;
    if (evt.wheelDelta != null) {
      delta = evt.wheelDelta / 120.0;
      if (window.opera) {
        delta = -delta;
      }
    } else if (evt.detail) {
      delta = -evt.detail / 3.0;
    }
    _ref = this.selected_and_always_active_rec();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (typeof item.on_mouse_wheel === "function" ? item.on_mouse_wheel(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b, delta) : void 0) {
        return this._catch_evt(evt);
      }
    }
    c = Math.pow(1.2, delta);
    cx = evt.shiftKey || this.constrain_zoom === "y" ? 1 : c;
    cy = evt.altKey || this.constrain_zoom === "x" ? 1 : c;
    this.cam.zoom(this.mouse_x, this.mouse_y, [cx, cy], this.canvas.width, this.canvas.height);
    return this._catch_evt(evt);
  };
  CanvasManager.prototype._mouse_move = function(evt) {
    var a, h, item, mwh, old_x, old_y, w, x, y, _i, _len, _ref;
    old_x = this.mouse_x;
    old_y = this.mouse_y;
    if (!(evt != null)) {
      evt = window.event;
    }
    this.mouse_has_moved_since_mouse_down = true;
    this.rea_x = evt.clientX - get_left(this.canvas);
    this.rea_y = evt.clientY - get_top(this.canvas);
    if (evt.ctrlKey && this.mouse_b) {
      if (!(this.clk_x != null)) {
        this.clk_x = this.rea_x;
        this.clk_y = this.rea_y;
      }
      this.mouse_x = this.clk_x + (this.rea_x - this.clk_x) / 10;
      this.mouse_y = this.clk_y + (this.rea_y - this.clk_y) / 10;
    } else {
      this.mouse_x = this.rea_x;
      this.mouse_y = this.rea_y;
    }
    _ref = this.selected_and_always_active_rec();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (typeof item.on_mouse_move === "function" ? item.on_mouse_move(this, evt, [this.mouse_x, this.mouse_y], this.mouse_b, [old_x, old_y]) : void 0) {
        return this._catch_evt(evt);
      }
    }
    w = this.canvas.width;
    h = this.canvas.height;
    mwh = Math.min(w, h);
    if (this.mouse_b === "LEFT" && evt.shiftKey) {
      a = Math.atan2(this.mouse_y - 0.5 * h, this.mouse_x - 0.5 * w) - Math.atan2(old_y - 0.5 * h, old_x - 0.5 * w);
      this.cam.rotate(0.0, 0.0, a);
      return this._catch_evt(evt);
    }
    if (this.mouse_b === "MIDDLE" || this.mouse_b === "LEFT" && evt.ctrlKey) {
      x = this.constrain_zoom !== "y";
      y = this.constrain_zoom !== "x";
      this.cam.pan((this.mouse_x - old_x) * x, (this.mouse_y - old_y) * y, w, h);
      return this._catch_evt(evt);
    }
    if (this.mouse_b === "LEFT") {
      x = 2.0 * (this.mouse_x - old_x) / mwh;
      y = 2.0 * (this.mouse_y - old_y) / mwh;
      this.cam.rotate(y, x, 0.0);
      return this._catch_evt(evt);
    }
    return this._catch_evt(evt);
  };
  CanvasManager.prototype._init_ctx = function(opt_attribs) {
    var t, _i, _len, _ref;
    if (this.allow_gl) {
      _ref = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        try {
          if (this.ctx = this.canvas.getContext(t, opt_attribs)) {
            this.ctx_type = "gl";
            this.ctx.enable(this.ctx.DEPTH_TEST);
            this.ctx.depthFunc(this.ctx.LESS);
            this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
            this.ctx.enable(this.ctx.BLEND);
            this.ctx.ctx_id = (CanvasManager.ctx_id += 1);
            return true;
          }
        } catch (error) {
          continue;
        }
      }
    }
    this.ctx_type = "2d";
    return this.ctx = this.canvas.getContext('2d');
  };
  CanvasManager.prototype._get_x_min = function() {
    return this.bounding_box()[0];
  };
  CanvasManager.prototype._get_x_max = function() {
    return this.bounding_box()[1];
  };
  CanvasManager.prototype._mk_cam_info = function() {
    var h, i, item, w, _i, _len, _ref;
    w = this.canvas.width;
    h = this.canvas.height;
    i = {};
    _ref = typeof this.selected_items === "function" ? this.selected_items() : void 0;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      CanvasManager._get_items_in_an_hash_table_rec(i, item);
    }
    return this.cam_info = {
      w: w,
      h: h,
      cm: this,
      mwh: Math.min(w, h),
      ctx: this.ctx,
      cam: this.cam,
      ctx_type: this.ctx_type,
      get_x_min: __bind(function() {
        return this._get_x_min();
      }, this),
      get_x_max: __bind(function() {
        return this._get_x_max();
      }, this),
      re_2_sc: this.cam.re_2_sc(w, h),
      sc_2_rw: this.cam.sc_2_rw(w, h),
      sel_item: i,
      time: this.time.get(),
      time_ref: this.time,
      theme: this.theme,
      padding: (1 - 1 / this.padding_ratio) * Math.min(w, h),
      ctx_2d: __bind(function() {
        if (this.ctx_type === "gl") {
          this.make_sub_canvas();
          return this.sup_canvas_ctx;
        } else {
          return this.ctx;
        }
      }, this)
    };
  };
  CanvasManager._get_flat_list = function(flat, item) {
    var sub_item, _i, _len, _ref;
    if (item.sub_canvas_items != null) {
      _ref = item.sub_canvas_items();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sub_item = _ref[_i];
        CanvasManager._get_flat_list(flat, sub_item);
      }
    }
    if (!(typeof item.has_nothing_to_draw === "function" ? item.has_nothing_to_draw() : void 0)) {
      return flat.push(item);
    }
  };
  CanvasManager._get_items_in_an_hash_table_rec = function(i, item) {
    var n, _i, _len, _ref, _results;
    i[item.model_id] = true;
    if (item.sub_canvas_items != null) {
      _ref = item.sub_canvas_items();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        _results.push(CanvasManager._get_items_in_an_hash_table_rec(i, n));
      }
      return _results;
    }
  };
  return CanvasManager;
})();