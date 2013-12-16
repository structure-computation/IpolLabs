var test_Animation;

test_Animation = function() {
  var add_butt, m, v, _results;
  add_butt = function(txt, fun) {
    return new_dom_element({
      parentNode: document.body,
      nodeName: "input",
      type: "button",
      value: txt,
      onclick: fun
    });
  };
  m = new ConstrainedVal(0, {
    min: 0,
    max: 100,
    div: 100
  });
  new_model_editor({
    el: document.body,
    model: m
  });
  _results = [];
  for (v = 0; v <= 10; v++) {
    _results.push((function(v) {
      return add_butt(String(10 * v), function() {
        return Animation.set(m, 10 * v);
      });
    })(v));
  }
  return _results;
};
