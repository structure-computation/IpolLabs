var test_ModelEditor;
test_ModelEditor = function() {
  var docbod, editor, focus, model, spacing;
  focus = new Val(-1);
  docbod = new_dom_element({
    parentNode: document.body,
    style: {
      width: 500
    }
  });
  spacing = function() {
    var i, _results;
    _results = [];
    for (i = 0; i < 2; i++) {
      _results.push(new_dom_element({
        parentNode: docbod,
        nodeName: "br"
      }));
    }
    return _results;
  };
  model = new Model({
    simple_aggregate: {
      bool: true,
      val: 1,
      str: "toto",
      choice: new Choice(0, ["a", "b", "c"]),
      constrVal: new ConstrainedVal(7, {
        min: 0,
        max: 15
      }),
      vec: new Vec([1, 2, 3]),
      color: new Color(150, 0, 0),
      gradient: new Gradient,
      sa: {
        a: 10,
        b: 20
      }
    },
    simple_matrix: [[1, 2, 3], [4, 5, 6]]
  });
  model.simple_aggregate.add_attr({
    const_or_not: new ConstOrNotModel(model.simple_aggregate.bool, model.simple_aggregate.sa),
    testst: new ConstOrNotModel(model.simple_aggregate.bool, model.simple_aggregate.val)
  });
  model.simple_aggregate.gradient.add_color([255, 255, 255, 255], 0);
  model.simple_aggregate.gradient.add_color([0, 0, 0, 255], 1);
  editor = new_model_editor({
    el: docbod,
    model: model,
    focus: focus
  });
  editor = new_model_editor({
    el: docbod,
    model: model,
    focus: focus
  });
  editor.label_ratio = 0.2;
  spacing();
  new_model_editor({
    el: docbod,
    model: focus
  });
  editor = new_model_editor({
    el: docbod,
    model: model.simple_aggregate,
    label: "Simple aggregate model with item_width at 48",
    item_width: 48,
    focus: focus,
    legend_focus: false
  });
  spacing();
  editor = new_model_editor({
    el: docbod,
    model: model.simple_aggregate,
    label: "Some sample alternate editors",
    focus: focus
  });
  editor.label_ratio = 0.2;
  editor.default_types.push(function(model) {
    if (model instanceof Choice) {
      return ModelEditorItem_Choice_Roll;
    }
  });
  return editor.default_types.push(function(model) {
    if (model instanceof Bool) {
      return ModelEditorItem_Bool_Img;
    }
  });
};