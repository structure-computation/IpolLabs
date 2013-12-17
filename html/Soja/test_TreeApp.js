var test_TreeApp;
test_TreeApp = function() {
  var m, v;
  m = new TreeAppData;
  m.modules.push(new TreeAppModule_PanelManager);
  m.modules.push(new TreeAppModule_UndoManager);
  m.modules.push(new TreeAppModule_Sketch);
  v = new TreeApp(document.body, m);
  return m.new_session("Session 1");
};