define(['./artists/ArtistListView'], function (ArtistListView) {
  return Backbone.Router.extend({
    routes: {
      'artists': 'artistList',
      'artist/:artistSlug': 'artistDetail'
    },
    initialize: function () {
      this.$container = $('.content-container');
    },
    artistList: function () {
      var artistListView = new ArtistListView({
        el: this.$container
      });
      artistListView.render();
      setTimeout(function () {
        Backbone.Events.trigger('openWelcome');
      }, 1500);
    },
    artistDetail: function () {

    }
  });
});