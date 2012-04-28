define(['charts/Songs', 'tmpl!charts/tmpl/songs'], function (Songs, songsTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
//      if (this.$el.find('.pg-songs').size() === 0) {
        this.collection.on('reset', this.render, this);
        this.collection.on('error', function () {
          alert('error');
        });
        this.collection.fetch();
//      }
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