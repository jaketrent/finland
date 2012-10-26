define(
[ './artists/ArtistListView'
, './artists/ArtistDetailView'
, './ViewSwitcher'
], function
( ArtistListView
, ArtistDetailView
, ViewSwitcher
) {
  return Backbone.Router.extend({
    routes: {
      'artists': 'artistList',
      'artists/:artistSlug': 'artistDetail',
      '*path': 'artistList'
    },
    initialize: function () {
      this.viewSwitcher = ViewSwitcher;
    },
    artistList: function () {
      ViewSwitcher.switchToView({
        key: 'artistList',
        viewFn: ArtistListView
      });
    },
    artistDetail: function (artistSlug) {
      ViewSwitcher.switchToView({
        key: 'artistDetail',
        viewFn: ArtistDetailView,
        renderOpts: {
          artistSlug: artistSlug
        }
      });
    }
  });
});