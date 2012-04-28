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
    initialize: function (options) {
      this.dataLoader = options.dataLoader;
      this.viewSwitcher = new ViewSwitcher();
    },
    home: function () {
      this.viewSwitcher.switchView(new SongsView({
        collection: this.dataLoader.getSongs()
      }));
    },
    song: function () {
      this.viewSwitcher.switchView(new SongView());
    }
  })
});