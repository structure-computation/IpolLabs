var PointTheme,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PointTheme = (function(_super) {

  __extends(PointTheme, _super);

  function PointTheme(color, width, line_color, line_width) {
    if (color == null) color = new Color(255, 255, 255, 255);
    if (width == null) width = 5;
    if (line_color == null) line_color = new Color(200, 200, 200, 255);
    if (line_width == null) line_width = 1;
    PointTheme.__super__.constructor.call(this);
    this.add_attr({
      color: color,
      width: width,
      line_color: line_color,
      line_width: line_width
    });
  }

  PointTheme.prototype.beg_ctx = function(info) {
    var ctx;
    ctx = info.ctx_2d();
    ctx.fillStyle = this.color.to_rgba();
    ctx.lineWidth = this.line_width.get();
    return ctx.strokeStyle = this.line_color.to_rgba();
  };

  PointTheme.prototype.end_ctx = function(info) {};

  PointTheme.prototype.draw_proj = function(info, proj) {
    var ctx;
    ctx = info.ctx_2d();
    ctx.beginPath();
    ctx.arc(proj[0], proj[1], this.width.get(), 0, Math.PI * 2, true);
    ctx.fill();
    return ctx.stroke();
  };

  return PointTheme;

})(Model);
var Theme;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Theme = (function() {
  __extends(Theme, Model);
  function Theme() {
    Theme.__super__.constructor.call(this);
    this.add_attr({
      lines: new LineTheme(new Color(255, 255, 255, 255), 1),
      selected_lines: new LineTheme(new Color(200, 200, 100, 255), 1.5),
      points: new PointTheme(new Color(255, 255, 255, 255), 4, new Color(255, 255, 255, 255), 1),
      editable_points: new PointTheme(new Color(0, 255, 0, 255), 4, new Color(255, 255, 255, 255), 1),
      surfaces: new SurfaceTheme(new Color(150, 150, 150, 255)),
      selected_points: new PointTheme(new Color(255, 0, 0, 255), 4, new Color(255, 255, 255, 255), 1),
      highlighted_points: new PointTheme(new Color(0, 0, 0, 0), 5, new Color(255, 255, 0, 255), 1),
      selected_elements: new LineTheme(new Color(255, 0, 0, 255), 1),
      highlighted_elements: new LineTheme(new Color(255, 255, 0, 255), 1.5),
      constrain_boundary_displacement: new LineTheme(new Color(122, 0, 0, 255), 2),
      constrain_boundary_displacement_hover: new LineTheme(new Color(122, 0, 0, 255), 3),
      constrain_boundary_strain: new LineTheme(new Color(200, 100, 100, 255), 2),
      constrain_boundary_strain_hover: new LineTheme(new Color(200, 100, 100, 255), 3),
      constrain_boundary_pressure: new LineTheme(new Color(50, 0, 0, 255), 2),
      constrain_boundary_pressure_hover: new LineTheme(new Color(50, 0, 0, 255), 3),
      free_boundary: new LineTheme(new Color(0, 122, 0, 255), 2),
      free_boundary_hover: new LineTheme(new Color(0, 122, 0, 255), 3),
      gradient_legend: new Gradient,
      anim_delay: 300,
      zoom_factor: 5
    });
    this.gradient_legend.add_color([255, 255, 255, 255], 0);
    this.gradient_legend.add_color([0, 0, 0, 255], 1);
  }
  return Theme;
})();var LineTheme,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

LineTheme = (function(_super) {

  __extends(LineTheme, _super);

  function LineTheme(color, width) {
    if (color == null) color = new Color(255, 255, 255, 255);
    if (width == null) width = 2;
    LineTheme.__super__.constructor.call(this);
    this.add_attr({
      color: color,
      width: width
    });
  }

  LineTheme.prototype.beg_ctx = function(info) {
    var fs, gl, vs;
    if (info.ctx_type === "2d") {
      info.ctx.lineWidth = this.width.get();
      return info.ctx.strokeStyle = this.color.to_rgba();
    } else {
      vs = "                attribute vec3 a_position;                uniform vec4 u_color;                uniform float w;                uniform float h;                void main( void ) {                    gl_Position = vec4(                         2.0 * a_position[ 0 ] / w - 1.0,                        1.0 - 2.0 * a_position[ 1 ] / h,                        a_position[ 2 ] - 1e-5,                        1.0 );                }            ";
      fs = "                precision mediump float;                uniform vec4 u_color;                void main( void ) {                    gl_FragColor = u_color;                }            ";
      gl = info.ctx;
      this.ps = info.cm.gl_prog(vs, fs);
      gl.useProgram(this.ps);
      this.ps.aposAttrib = gl.getAttribLocation(this.ps, "a_position");
      gl.enableVertexAttribArray(this.ps.aposAttrib);
      this.ps.colorUniform = gl.getUniformLocation(this.ps, "u_color");
      this.ps.wUniform = gl.getUniformLocation(this.ps, "w");
      return this.ps.hUniform = gl.getUniformLocation(this.ps, "h");
    }
  };

  LineTheme.prototype.end_ctx = function(info) {};

  LineTheme.prototype.draw_straight_proj = function(info, p0, p1) {
    var gl, ibuf, idx, initBuffer, vbuf, vtx;
    if (info.ctx_type === "2d") {
      info.ctx.beginPath();
      this.contour_straight_proj(info, p0, p1);
      return info.ctx.stroke();
    } else {
      gl = info.ctx;
      vtx = new Float32Array([p0[0], p0[1], p0[2], p1[0], p1[1], p1[2]]);
      idx = new Uint16Array([0, 1]);
      initBuffer = function(glELEMENT_ARRAY_BUFFER, data) {
        var buf;
        buf = gl.createBuffer();
        gl.bindBuffer(glELEMENT_ARRAY_BUFFER, buf);
        gl.bufferData(glELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return buf;
      };
      vbuf = initBuffer(gl.ARRAY_BUFFER, vtx);
      ibuf = initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
      gl.vertexAttribPointer(this.ps.aposAttrib, 3, gl.FLOAT, false, 0, 0);
      gl.lineWidth(this.width.get());
      gl.uniform4f(this.ps.colorUniform, this.color.r.get(), this.color.g.get(), this.color.b.get(), this.color.a.get());
      gl.uniform1f(this.ps.wUniform, info.w);
      gl.uniform1f(this.ps.hUniform, info.h);
      gl.drawElements(gl.LINES, 2, gl.UNSIGNED_SHORT, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.deleteBuffer(vbuf);
      return gl.deleteBuffer(ibuf);
    }
  };

  LineTheme.prototype.contour_straight_proj = function(info, p0, p1, beg) {
    if (beg == null) beg = true;
    if (beg) info.ctx.moveTo(p0[0], p0[1]);
    return info.ctx.lineTo(p1[0], p1[1]);
  };

  LineTheme.prototype.draw_arc = function(info, P0, P1, P2) {
    if (info.ctx_type === "2d") {
      info.ctx.beginPath();
      this.contour_arc(info, P0, P1, P2);
      return info.ctx.stroke();
    } else {
      return this.contour_arc(info, P0, P1, P2);
    }
  };

  LineTheme.prototype.contour_arc = function(info, P0, P1, P2, beg) {
    var a, ai, cr, gl, ibuf, idx, initBuffer, ls, n, p, pt, rca, rsa, vbuf, vtx, _ref;
    if (beg == null) beg = true;
    cr = this._get_center_radius(P0, P1, P2);
    n = Math.ceil(Math.abs(cr.a[2] - cr.a[0]) / 0.1);
    pt = [];
    ls = [];
    for (ai = _ref = 1 - beg; _ref <= n ? ai <= n : ai >= n; _ref <= n ? ai++ : ai--) {
      a = cr.a[0] + (cr.a[2] - cr.a[0]) * ai / n;
      rca = cr.R * Math.cos(a);
      rsa = cr.R * Math.sin(a);
      p = info.re_2_sc.proj([cr.C[0] + rca * cr.P01[0] + rsa * cr.P02[0], cr.C[1] + rca * cr.P01[1] + rsa * cr.P02[1], cr.C[2] + rca * cr.P01[2] + rsa * cr.P02[2]]);
      if (info.ctx_type === "2d") {
        if (ai) {
          info.ctx.lineTo(p[0], p[1]);
        } else {
          info.ctx.moveTo(p[0], p[1]);
        }
      } else {
        pt.push(p[0]);
        pt.push(p[1]);
        pt.push(p[2]);
        if (ai) {
          ls.push(ai - 1);
          ls.push(ai - 0);
        }
      }
    }
    if (info.ctx_type !== "2d") {
      gl = info.ctx;
      vtx = new Float32Array(pt);
      idx = new Uint16Array(ls);
      initBuffer = function(glELEMENT_ARRAY_BUFFER, data) {
        var buf;
        buf = gl.createBuffer();
        gl.bindBuffer(glELEMENT_ARRAY_BUFFER, buf);
        gl.bufferData(glELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return buf;
      };
      vbuf = initBuffer(gl.ARRAY_BUFFER, vtx);
      ibuf = initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
      gl.vertexAttribPointer(this.ps.aposAttrib, 3, gl.FLOAT, false, 0, 0);
      gl.lineWidth(this.width.get());
      gl.uniform4f(this.ps.colorUniform, this.color.r.get(), this.color.g.get(), this.color.b.get(), this.color.a.get());
      gl.uniform1f(this.ps.wUniform, info.w);
      gl.uniform1f(this.ps.hUniform, info.h);
      gl.drawElements(gl.LINES, ls.length, gl.UNSIGNED_SHORT, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
  };

  LineTheme.prototype.draw_interpolated_arcs = function(info, points) {
    if (points.length === 3) {
      return this.draw_arc(info, points[0], points[1], points[2]);
    }
    info.ctx.beginPath();
    this.contour_interpolated_arcs(info, points);
    return info.ctx.stroke();
  };

  LineTheme.prototype.contour_interpolated_arcs = function(info, points, beg) {
    var a0, a1, alpha, ar, i, n, nr, p, p0, p1, pr, res, _ref, _results;
    if (beg == null) beg = true;
    if (points.length === 3) {
      return this.contour_arc(info, points[0], points[1], points[2]);
    }
    res = (function() {
      var _ref, _results;
      _results = [];
      for (i = 0, _ref = points.length - 2; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push(this._get_center_radius(points[i], points[i + 1], points[i + 2]));
      }
      return _results;
    }).call(this);
    p = info.re_2_sc.proj(points[0]);
    if (beg) info.ctx.moveTo(p[0], p[1]);
    for (n = 1; n <= 30; n++) {
      alpha = n / 30.0;
      ar = res[0].a[0] + (res[0].a[1] - res[0].a[0]) * alpha;
      pr = this._get_proj_arc(info, res[0], ar);
      info.ctx.lineTo(pr[0], pr[1]);
    }
    for (i = 0, _ref = points.length - 3; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      for (n = 0; n < 30; n++) {
        alpha = n / 30.0;
        a0 = res[i + 0].a[1] + (res[i + 0].a[2] - res[i + 0].a[1]) * alpha;
        a1 = res[i + 1].a[0] + (res[i + 1].a[1] - res[i + 1].a[0]) * alpha;
        p0 = this._get_proj_arc(info, res[i + 0], a0);
        p1 = this._get_proj_arc(info, res[i + 1], a1);
        pr = Vec_3.add(Vec_3.mus(1 - alpha, p0), Vec_3.mus(alpha, p1));
        info.ctx.lineTo(pr[0], pr[1]);
      }
    }
    nr = res.length - 1;
    _results = [];
    for (n = 0; n <= 30; n++) {
      alpha = n / 30.0;
      ar = res[nr].a[1] + (res[nr].a[2] - res[nr].a[1]) * alpha;
      pr = this._get_proj_arc(info, res[nr], ar);
      _results.push(info.ctx.lineTo(pr[0], pr[1]));
    }
    return _results;
  };

  LineTheme.prototype._get_center_radius = function(P0, P1, P2) {
    var C, P01, P02, R, a0, a1, a2, ma, res, x1, x2, xc, y2, yc;
    P01 = Vec_3.sub(P1, P0);
    P02 = Vec_3.sub(P2, P0);
    x1 = Vec_3.len(P01);
    P01 = Vec_3.mus(1 / x1, P01);
    x2 = Vec_3.dot(P02, P01);
    P02 = Vec_3.sub(P02, Vec_3.mus(x2, P01));
    y2 = Vec_3.len(P02);
    P02 = Vec_3.mus(1 / y2, P02);
    xc = x1 * 0.5;
    yc = (x2 * x2 + y2 * y2 - x2 * x1) / (2.0 * y2);
    C = Vec_3.add(Vec_3.add(P0, Vec_3.mus(xc, P01)), Vec_3.mus(yc, P02));
    R = Vec_3.len(Vec_3.sub(P0, C));
    a0 = Math.atan2(0 - yc, 0 - xc);
    a1 = Math.atan2(0 - yc, x1 - xc);
    a2 = Math.atan2(y2 - yc, x2 - xc);
    ma = 0.5 * (a0 + a2);
    if (Math.abs(a1 - ma) > Math.abs(a0 - ma)) {
      if (a2 < a0) {
        a2 += 2 * Math.PI;
      } else {
        a0 += 2 * Math.PI;
      }
    }
    ma = 0.5 * (a0 + a2);
    if (Math.abs(a1 - ma) > Math.abs(a0 - ma)) a1 += 2 * Math.PI;
    res = {
      xc: xc,
      yx: yc,
      C: C,
      R: R,
      a: [a0, a1, a2],
      P01: P01,
      P02: P02
    };
    return res;
  };

  LineTheme.prototype._get_proj_arc = function(info, arc_info, a) {
    var rca, rsa;
    rca = arc_info.R * Math.cos(a);
    rsa = arc_info.R * Math.sin(a);
    return info.re_2_sc.proj([arc_info.C[0] + rca * arc_info.P01[0] + rsa * arc_info.P02[0], arc_info.C[1] + rca * arc_info.P01[1] + rsa * arc_info.P02[1], arc_info.C[2] + rca * arc_info.P01[2] + rsa * arc_info.P02[2]]);
  };

  return LineTheme;

})(Model);
var SurfaceTheme,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SurfaceTheme = (function(_super) {

  __extends(SurfaceTheme, _super);

  function SurfaceTheme(color) {
    if (color == null) color = new Color(200, 200, 200, 255);
    SurfaceTheme.__super__.constructor.call(this);
    this.add_attr({
      color: color
    });
  }

  SurfaceTheme.prototype.beg_ctx = function(info) {
    if (info.ctx_type === "2d") {
      info.ctx.fillStyle = this.color.to_rgba();
      return info.ctx.strokeStyle = this.color.to_rgba();
    }
  };

  SurfaceTheme.prototype.end_ctx = function(info) {};

  SurfaceTheme.prototype.draw = function(info, func) {
    info.ctx.beginPath();
    func(info);
    info.ctx.fill();
    return info.ctx.stroke();
  };

  SurfaceTheme.prototype.draw_triangle = function(info, p0, p1, p2, col) {
    var array, fs, gl, pcol, points, pos, ps, vs;
    if (col == null) col = [0.9, 0.9, 0.9];
    vs = "            precision mediump float;            attribute vec3 pos;            void main( void ) {                gl_Position = vec4( pos, 1.0 );            }        ";
    fs = "            precision mediump float;'           uniform vec4 col;            void main( void ) {                gl_FragColor = col;            }        ";
    ps = info.cm.gl_prog(vs, fs);
    gl = info.ctx;
    points = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, points);
    array = new Float32Array([2.0 * p0[0] / info.w - 1.0, 1.0 - 2.0 * p0[1] / info.h, p0[2], 2.0 * p1[0] / info.w - 1.0, 1.0 - 2.0 * p1[1] / info.h, p1[2], 2.0 * p2[0] / info.w - 1.0, 1.0 - 2.0 * p2[1] / info.h, p2[2]]);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.useProgram(ps);
    pos = gl.getAttribLocation(ps, "pos");
    gl.enableVertexAttribArray(pos);
    pcol = gl.getUniformLocation(ps, "col");
    gl.uniform4f(pcol, col[0], col[1], col[2], 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, points);
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.deleteBuffer(points);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return gl.disableVertexAttribArray(pos);
  };

  return SurfaceTheme;

})(Model);
