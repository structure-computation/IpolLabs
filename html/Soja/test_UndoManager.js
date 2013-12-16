var test_UndoManager;

test_UndoManager = function() {
  var a, add_butt, m;
  add_butt = function(txt, fun) {
    return new_dom_element({
      parentNode: document.body,
      nodeName: "input",
      type: "button",
      value: txt,
      onclick: fun
    });
  };
  m = new Model({
    l: [666],
    t: new ConstrainedVal(1, {
      min: 0,
      max: 10
    })
  });
  a = new UndoManager(m);
  add_butt("undo", function() {
    return a.undo();
  });
  add_butt("redo", function() {
    return a.redo();
  });
  add_butt("crea", function() {
    a.snapshot();
    return m.l.push(m.l.length);
  });
  return new_model_editor({
    el: document.body,
    model: m,
    label: "test model",
    undo_manager: a
  });
};
