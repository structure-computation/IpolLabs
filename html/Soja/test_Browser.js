var test_Browser;
test_Browser = function() {
  var fs;
  fs = new FileSystem;
  FileSystem._disp = false;
  return fs.load("/test_browser", function(m, err) {
    if (err) {
      return fs.load("/", function(d, err) {
        var t;
        m = new Directory;
        d.add_file("test_browser", m);
        t = new Directory;
        m.add_file("Result", t);
        t.add_file("Steel", new Directory);
        t.add_file("Steel", new Lst([1, 2]));
        m.add_file("Mesh", new Lst([1, 2]));
        m.add_file("Work", new Lst([1, 2]));
        return new_model_editor({
          el: document.body,
          model: m
        });
      });
    } else {
      return new_model_editor({
        el: document.body,
        model: m
      });
    }
  });
};