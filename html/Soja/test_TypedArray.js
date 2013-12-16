var test_TypedArray;

test_TypedArray = function() {
  var a;
  a = new TypedArray_Float64([3, 2]);
  a.set_val([1, 0], 2);
  a.set_val([0, 1], 1);
  new_model_editor({
    el: document.body,
    model: a
  });
  return new_model_editor({
    el: document.body,
    model: a
  });
};
