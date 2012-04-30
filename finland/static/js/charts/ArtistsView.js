define(['tmpl!charts/tmpl/artists'], function (artistsTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      if (this.$el.find('.pg-artists').size() === 0) {
        this.render();
      }
    },
    render: function () {
      this.$el.html(artistsTmpl(this.collection.toJSON()));
    },
    onClose: function () {
      this.off();
      this.collection.off();
      this.undelegateEvents();
    }
  });
});