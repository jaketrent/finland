define(
  [ 'ViewSwitcher'
  , 'charts/SongsView'
  ], function
  ( ViewSwitcher
  , SongsView
  ) {
  return Backbone.Router.extend({
    routes: {
      '': 'home'
    },
    initialize: function () {
      viewSwitcher = new ViewSwitcher();
    },
    home: function () {
      viewSwitcher.switchView(new SongsView());
    }
  })
});