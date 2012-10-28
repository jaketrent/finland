define(['tmpl!./artistDetail'], function (artistDetailTmpl) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    events: {
      "click .play": "playSong",
      "click .add": "addSong",
      "click .info": "toggleBio"
    },
    toggleBio: function () {
      this.$('.bio').toggleClass('expanded');
    },
    render: function (settings) {
      if (settings) {
        this.artistSlug = settings.artistSlug;
      }
      var self = this;
      this.artist = (function findArtist() {
        return _(self.artists.models).find(function (artist) {
          return artist.get('slug') === self.artistSlug;
        });
      })();
      this.$el.html(artistDetailTmpl(this.artist.toJSON()));
    },
    playSong: function (evt) {
      var indx = $('.play').index($(evt.currentTarget));
      Backbone.Events.trigger('playSong', this.artist, indx);
      evt.preventDefault();
    },
    addSong: function (evt) {
      var indx = $('.add').index($(evt.currentTarget));
      Backbone.Events.trigger('addSong', this.artist, indx);
      evt.preventDefault();
    }
  });
});