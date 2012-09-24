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
      var artistListView = new ArtistListView();
      this.$container.html(artistListView.render().el);
      Backbone.Events.trigger('openWelcome');
    },
    artistDetail: function () {

    }
  });
});