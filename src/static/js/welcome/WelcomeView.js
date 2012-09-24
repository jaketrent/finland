define(['tmpl!./welcome'], function (welcomeTmpl) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'welcome',
    initialize: function () {

    },
    render: function () {
      var self = this;
      this.$el.html(welcomeTmpl());
      setTimeout(function () {
        console.log('timed out');
        self.$el.addClass('opened');
      }, 1000);
      return this;
    }
  })
});