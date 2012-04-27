define(['charts/Songs'], function (Songs) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'click .play': 'play'
    },
    initialize: function () {
      if (this.$el.find('.pg-song').size() === 0) {
        this.collection = new Songs();
        this.collection.on('reset', this.render, this);
        this.collection.on('error', function () {
          alert('error');
        });
      }
    },
    render: function () {
      this.$el.html('homeliness');
    },
    play: function (evt) {
      var $playBtn = $(evt.currentTarget);
      $playBtn.replaceWith('<audio src="' + $playBtn.attr('href') + '" controls="" preload="auto" autobuffer=""></audio>');
      return false;
    },
    onClose: function () {
      this.off();
      this.collection.off();
      this.unDelegateEvents();
    }
  });
});