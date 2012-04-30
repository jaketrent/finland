define(
  [ 'ViewSwitcher'
  , 'LinkHandler'
  , 'charts/SongsView'
  , 'charts/SongView'
  , 'charts/ArtistsView'
  , 'charts/ArtistView'
  ], function
  ( ViewSwitcher
  , LinkHandler
  , SongsView
  , SongView
  , ArtistsView
  , ArtistView
  ) {
  return Backbone.Router.extend({
    routes: {
      '': 'songs',
      'music/': 'songs',
      'music/song/:title_slug/': 'song',
      'artists/': 'artists',
      'artists/:name_slug/': 'artist'
    },
    initialize: function (options) {
      this.dataLoader = options.dataLoader;
      this.linkHandler = new LinkHandler({
        router: this
      });
      this.viewSwitcher = new ViewSwitcher();
    },
    songs: function () {
      this.viewSwitcher.switchView(new SongsView({
        collection: this.dataLoader.getSongs()
      }));
    },
    song: function (titleSlug) {
      this.viewSwitcher.switchView(new SongView({
        model: this.dataLoader.getSong(titleSlug)
      }));
    },
    artists: function () {
      this.viewSwitcher.switchView(new ArtistsView({
        collection: this.dataLoader.getArtists()
      }));
    },
    artist: function (nameSlug) {
      this.viewSwitcher.switchView(new ArtistView({
        model: this.dataLoader.getArtist(nameSlug)
      }));
    }
  })
});