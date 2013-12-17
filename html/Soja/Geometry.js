var Vec_3;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Vec_3 = (function() {
  function Vec_3() {
    Vec_3.__super__.constructor.apply(this, arguments);
  }
  __extends(Vec_3, Vec);
  Vec_3.prototype.static_length = function() {
    return 3;
  };
  Vec_3.sub = function(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  };
  Vec_3.add = function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  };
  Vec_3.mul = function(a, b) {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
  };
  Vec_3.div = function(a, b) {
    return [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
  };
  Vec_3.mus = function(a, b) {
    return [a * b[0], a * b[1], a * b[2]];
  };
  Vec_3.dis = function(a, b) {
    return [a[0] / b, a[1] / b, a[2] / b];
  };
  Vec_3.ads = function(a, b) {
    return [a + b[0], a + b[1], a + b[2]];
  };
  Vec_3.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  };
  Vec_3.cro = function(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  };
  Vec_3.min = function(a) {
    return [-a[0], -a[1], -a[2]];
  };
  Vec_3.len = function(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  };
  Vec_3.nor = function(a) {
    var l;
    l = Vec_3.len(a) + 1e-40;
    return [a[0] / l, a[1] / l, a[2] / l];
  };
  Vec_3.dist = function(a, b) {
    return Math.sqrt((Math.pow(a[0] - b[0], 2)) + (Math.pow(a[1] - b[1], 2)) + (Math.pow(a[2] - b[2], 2)));
  };
  Vec_3.equ = function(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  };
  Vec_3.rot = function(V, R) {
    var a, c, s, x, y, z;
    a = Vec_3.len(R) + 1e-40;
    x = R[0] / a;
    y = R[1] / a;
    z = R[2] / a;
    c = Math.cos(a);
    s = Math.sin(a);
    return [(x * x + (1 - x * x) * c) * V[0] + (x * y * (1 - c) - z * s) * V[1] + (x * z * (1 - c) + y * s) * V[2], (y * x * (1 - c) + z * s) * V[0] + (y * y + (1 - y * y) * c) * V[1] + (y * z * (1 - c) - x * s) * V[2], (z * x * (1 - c) - y * s) * V[0] + (z * y * (1 - c) + x * s) * V[1] + (z * z + (1 - z * z) * c) * V[2]];
  };
  Vec_3.sm = function(x, t) {
    return [x[0] * t, x[1] * t, x[2] * t];
  };
  Vec_3.determinant = function(a) {
    var d, i, j, j1, m, n;
    n = a.length;
    if (n === 1) {
      return a[0][0];
    } else if (n === 2) {
      return a[0][0] * a[1][1] - a[1][0] * a[0][1];
    } else {
      d = 0;
      for (j1 = 0; (0 <= n ? j1 < n : j1 > n); (0 <= n ? j1 += 1 : j1 -= 1)) {
        m = (function() {
          var _results;
          _results = [];
          for (i = 1; (1 <= n ? i < n : i > n); (1 <= n ? i += 1 : i -= 1)) {
            _results.push((function() {
              var _results;
              _results = [];
              for (j = 0; (0 <= n ? j < n : j > n); (0 <= n ? j += 1 : j -= 1)) {
                if (j !== j1) {
                  _results.push(a[i][j]);
                }
              }
              return _results;
            })());
          }
          return _results;
        })();
        d += Math.pow(-1.0, j1) * a[0][j1] * Vec_3.determinant(m);
      }
      return d;
    }
  };
  Vec_3.solve = function(M, B) {
    var c, d, i, j, m, n, r, _results;
    n = B.length;
    if (M[0].length != null) {
      d = Vec_3.determinant(M);
      if (M[0].length !== n) {
        console.log("pb with solve args");
      }
      m = (function() {
        var _results;
        _results = [];
        for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
          _results.push((function() {
            var _results;
            _results = [];
            for (j = 0; (0 <= n ? j < n : j > n); (0 <= n ? j += 1 : j -= 1)) {
              _results.push(0.0);
            }
            return _results;
          })());
        }
        return _results;
      })();
      _results = [];
      for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
        for (r = 0; (0 <= n ? r < n : r > n); (0 <= n ? r += 1 : r -= 1)) {
          for (c = 0; (0 <= n ? c < n : c > n); (0 <= n ? c += 1 : c -= 1)) {
            if (c === i) {
              m[r][c] = B[r];
            } else {
              m[r][c] = M[r][c];
            }
          }
        }
        _results.push(Vec_3.determinant(m) / d);
      }
      return _results;
    } else {
      m = (function() {
        var _results;
        _results = [];
        for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
          _results.push((function() {
            var _results;
            _results = [];
            for (j = 0; (0 <= n ? j < n : j > n); (0 <= n ? j += 1 : j -= 1)) {
              _results.push(M[n * j + i]);
            }
            return _results;
          })());
        }
        return _results;
      })();
      return Vec_3.solve(m, B);
    }
  };
  return Vec_3;
})();