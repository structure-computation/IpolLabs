var test_Soca;
test_Soca = function() {
  var fs;
  fs = new FileSystem;
  return fs.load("/pouet", function(dir, err) {
    return console.log(dir.get(0));
  });
};