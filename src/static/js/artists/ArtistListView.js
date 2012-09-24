define(['tmpl!./artistList', './Artists'], function (artistListTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = new Artists();
      this.artists.on('reset', this.renderMarkup, this);
      this.artists.on('error', function () {
        alert('Error retrieving artists');
      });
    },
    render: function () {
      //this.artists.fetch();
      this.artists.reset([
        {
          img: '/awesome.gif',
          name: 'Selja Sini'
        }
      ]);
    },
    renderMarkup: function () {
      this.$el.html(artistListTmpl());
    }
  });
});