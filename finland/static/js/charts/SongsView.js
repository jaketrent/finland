define(['charts/Songs'], function (Songs) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      if (this.$el.find('.pg-songs').size() === 0) {
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
    onClose: function () {
      this.off();
      this.collection.off();
      this.unDelegateEvents();
    }
  });
});