define(
[ './artists/ArtistListView'
, './artists/ArtistDetailView'
, './artists/Artists'
], function
( ArtistListView
, ArtistDetailView
, Artists
) {
  return Backbone.Router.extend({
    routes: {
      'artists': 'artistList',
      'artist/:artistSlug': 'artistDetail'
    },
    initialize: function () {
      this.$container = $('.content-container');
      this.artists = new Artists();
      this.artists.on('reset', function () {
        this.artistsFetched = true;
        if (this.view) {
          this.view.render({
            el: this.$container,
            artists: this.artists
          });
        }
      }, this);
      this.artists.on('error', function () {
        alert('Error loading artists');
      });
      this.artists.fetch();
    },
    artistList: function () {
      if (!this.view) {
        setTimeout(function () {
          Backbone.Events.trigger('openWelcome');
        }, 1500);
      } else {
        this.view.close();
      }

      this.view = new ArtistListView({
        el: this.$container,
        artists: this.artists
      });

      if (this.artistsFetched) {
        this.view.render();
      }
    },
    artistDetail: function () {
      this.view = ArtistDetailView;
    }
  });
});