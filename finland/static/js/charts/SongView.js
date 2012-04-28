define(['charts/Songs', 'tmpl!charts/tmpl/song'], function (Songs, songTmpl) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .play': 'play'
    },
    initialize: function () {
      if (this.$el.find('.pg-song').size() === 0) {
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