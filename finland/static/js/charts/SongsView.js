define(['charts/Songs', 'tmpl!charts/tmpl/songs'], function (Songs, songsTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      if (this.$el.find('.pg-songs').size() === 0) {
        this.render();
      }
    },
    render: function () {
      this.$el.html(songsTmpl(this.collection.toJSON()));
    },
    onClose: function () {
      this.off();
      this.collection.off();
      this.unDelegateEvents();
    }
  });
});