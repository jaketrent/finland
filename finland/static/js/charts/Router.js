define(
  [ 'ViewSwitcher'
  , 'LinkHandler'
  , 'charts/SongsView'
  , 'charts/SongView'
  ], function
  ( ViewSwitcher
  , LinkHandler
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
      this.linkHandler = new LinkHandler({
        router: this
      });
      this.viewSwitcher = new ViewSwitcher();
    },
    home: function () {
      this.viewSwitcher.switchView(new SongsView({
        collection: this.dataLoader.getSongs()
      }));
    },
    song: function (titleSlug) {
      this.viewSwitcher.switchView(new SongView({
        model: this.dataLoader.getSong(titleSlug)
      }));
    }
  })
});