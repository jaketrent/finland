define(['tmpl!./artistDetail', './Artists'], function (artistDetailTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
      this.artistSlug = this.options.artistSlug;
    },
    render: function () {
      var self = this;
      var artist = (function findArtist() {
        return _(self.artists.models).find(function (artist) {
          return artist.get('slug') === self.artistSlug;
        });
      })();
      this.$el.html(artistDetailTmpl(artist.toJSON()));
    }
  });
});