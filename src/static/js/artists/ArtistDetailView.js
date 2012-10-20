define(['tmpl!./artistDetail', './Artists'], function (artistDetailTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
      this.artistSlug = this.options.artistSlug;
    },
    events: {
      "click .play": "play"
    },
    render: function () {
      var self = this;
      this.artist = (function findArtist() {
        return _(self.artists.models).find(function (artist) {
          return artist.get('slug') === self.artistSlug;
        });
      })();
      this.$el.html(artistDetailTmpl(this.artist.toJSON()));
    },
    play: function (evt) {
      var indx = $('.play').index($(evt.currentTarget));
      Backbone.Events.trigger('playSong', this.artist, indx);
    }
  });
});