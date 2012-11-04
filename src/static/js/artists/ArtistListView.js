define(['tmpl!./artistList', './Artists'], function (artistListTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    render: function () {
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON()
      }));
    }
  });
});