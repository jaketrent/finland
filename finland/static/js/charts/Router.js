define(
  [ 'ViewSwitcher'
  , 'charts/SongsView'
  , 'charts/SongView'
  ], function
  ( ViewSwitcher
  , SongsView
  , SongView
  ) {
  return Backbone.Router.extend({
    routes: {
      '': 'home',
      'song/:title_slug/': 'song'
    },
    initialize: function () {
      viewSwitcher = new ViewSwitcher();
    },
    home: function () {
      viewSwitcher.switchView(new SongsView());
    },
    song: function () {
      viewSwitcher.switchView(new SongView());
    }
  })
});