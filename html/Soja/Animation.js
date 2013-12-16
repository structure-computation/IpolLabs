var Animation;
Animation = (function() {
  function Animation() {}
  Animation.period_ms = 2;
  Animation._curan = {};
  Animation._timer = void 0;
  Animation.linear = function(rat) {
    return rat;
  };
  Animation.easing = function(rat) {
    return Math.pow(rat, 0.33);
  };
  Animation.set = function(model, value, delay, curve) {
    var dt, i, m, ms, vs, _len, _results;
    if (delay == null) {
      delay = 300;
    }
    if (curve == null) {
      curve = Animation.linear;
    }
    value = Model.conv(value);
    ms = model.size();
    vs = value.size();
    if (ms.length) {
      if (ms.length === 1 && vs.length === 1 && ms[0] === vs[0]) {
        _results = [];
        for (i = 0, _len = model.length; i < _len; i++) {
          m = model[i];
          _results.push(Animation.set(m, value[i], delay, curve));
        }
        return _results;
      } else {
        return model.set(value);
      }
    } else {
      dt = (new Date).getTime();
      Animation._curan[model.model_id] = {
        mod: model,
        old: model.get(),
        val: value,
        beg: dt,
        end: dt + delay,
        crv: curve
      };
      if (delay <= 0) {
        return Animation._timeout_func();
      } else if (!(Animation._timer != null)) {
        return Animation._timer = setTimeout(Animation._timeout_func, Animation.period_ms);
      }
    }
  };
  Animation._timeout_func = function() {
    var dt, key, obj, rat, remaining_anim, rm, _i, _len, _ref;
    dt = (new Date).getTime();
    rm = [];
    remaining_anim = false;
    _ref = Animation._curan;
    for (key in _ref) {
      obj = _ref[key];
      rat = (dt - obj.beg) / (obj.end - obj.beg);
      if (rat >= 1) {
        obj.mod.set(obj.val);
        rm.push(key);
      } else {
        obj.mod.set(obj.old + (obj.val - obj.old) * obj.crv(rat));
        remaining_anim = true;
      }
    }
    for (_i = 0, _len = rm.length; _i < _len; _i++) {
      key = rm[_i];
      delete Animation._curan[key];
    }
    if (remaining_anim) {
      return Animation._timer = setTimeout(Animation._timeout_func, Animation.period_ms);
    } else {
      return Animation._timer = void 0;
    }
  };
  return Animation;
})();