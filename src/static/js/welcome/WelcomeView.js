define(['tmpl!./welcome'], function (welcomeTmpl) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'welcome',
    initialize: function () {
      Backbone.Events.on('openWelcome', this.open, this);
    },
    render: function () {
      this.$el.html(welcomeTmpl());
      return this;
    },
    open: function () {
      var self = this;
      this.$el.addClass('opened');
      setTimeout(function () {
        console.log('removing welcome');
        self.close();
      }, 1000);
    }
  })
});