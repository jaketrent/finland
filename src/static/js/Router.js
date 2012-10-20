define(
[ './artists/ArtistListView'
, './artists/ArtistDetailView'
, './artists/Artists'
, './player/Player'
], function
( ArtistListView
, ArtistDetailView
, Artists
, Player
) {
  return Backbone.Router.extend({
    routes: {
      'artists': 'artistList',
      'artists/:artistSlug': 'artistDetail',
      '*path': 'artistList'
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
        if (!this.player) {
          this.player = new Player({
            el: '.player-container'
          });
          this.player.render();
        }
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
    artistDetail: function (artistSlug) {
      if (!this.view) {
        setTimeout(function () {
          Backbone.Events.trigger('openWelcome');
        }, 1500);
        if (!this.player) {
          this.player = new Player({
            el: '.player-container'
          });
          this.player.render();
        }
      } else {
        this.view.close();
      }


      this.view = new ArtistDetailView({
        el: this.$container,
        artists: this.artists,
        artistSlug: artistSlug
      });
      if (this.artistsFetched) {
        console.log('detail rendered');
        this.view.render();
      }
    }
  });
});