define(['tmpl!./artistList'], function (artistListTmpl) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'artist-list',
    render: function () {
      this.$el.html(artistListTmpl());
      return this;
    }
  })
});