define(
[ './artists/ArtistListView'
, './artists/ArtistDetailView'
, './viewSwitcher'
], function
( ArtistListView
, ArtistDetailView
, viewSwitcher
) {
  return Backbone.Router.extend({
    routes: {
      'artists': 'artistList',
      'artists/:artistSlug': 'artistDetail',
      '*path': 'artistList'
    },
    initialize: function () {
      this.viewSwitcher = viewSwitcher;
    },
    artistList: function () {
      viewSwitcher.switchToView({
        key: 'artistList',
        viewFn: ArtistListView
      });
    },
    artistDetail: function (artistSlug) {
      viewSwitcher.switchToView({
        key: 'artistDetail',
        viewFn: ArtistDetailView,
        renderOpts: {
          artistSlug: artistSlug
        }
      });
    }
  });
});