var test_0;

test_0 = function() {
  var m;
  m = new Model({
    a: 10,
    b: ["yop", "yap"]
  });
  bind(m, function() {
    return document.body.innerHTML = "<H1>" + (m.a.get()) + " " + (m.b[0].get()) + "</H1>";
  });
  return setTimeout((function() {
    return m.a.set(13);
  }), 1000);
};
