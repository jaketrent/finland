define(['charts/Songs', 'tmpl!charts/tmpl/song'], function (Songs, songTmpl) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .play': 'play'
    },
    initialize: function () {
      var self = this;
      if (this.$el.find('.pg-songs').size() > 0) {
        var $song = $('.song[data-id=' + this.model.get('id') + ']');
        $song.css({
          position: 'absolute',
          top: $song.position().top,
          left: 0
        }).animate({
          top: 210,
          color: '#fff'
        }, function () {
          self.render();
        });
      } else if (this.$el.find('.pg-song').size() === 0) {
        this.render();
      }
    },
    render: function () {
      this.$el.html(songTmpl(this.model.toJSON()));
    },
    play: function (evt) {
      var $playBtn = $(evt.currentTarget);
      $playBtn.replaceWith('<audio src="' + $playBtn.attr('href') + '" controls="" preload="auto" autobuffer=""></audio>');
      return false;
    },
    onClose: function () {
      this.off();
      this.model.off();
      this.undelegateEvents();
    }
  });
});