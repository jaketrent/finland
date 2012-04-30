define(['tmpl!charts/tmpl/artist'], function (artistTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      var self = this;
      if (this.$el.find('.pg-artists').size() > 0) {
        var $artist = $('.artist[data-id=' + this.model.get('id') + ']');
        $artist.css({
          position: 'absolute',
          top: $artist.position().top,
          left: 0
        }).animate({
          top: 210,
          color: '#fff'
        }, function () {
          self.render();
        });
      } else if (this.$el.find('.pg-artist').size() === 0) {
        this.render();
      }
    },
    render: function () {
      this.$el.html(artistTmpl(this.model.toJSON()));
    },
    onClose: function () {
      this.off();
      this.model.off();
      this.undelegateEvents();
    }
  });
});