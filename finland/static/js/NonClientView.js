define(function () {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      this.href = this.options.href;
      this.req();
    },
    req: function () {
      var self = this;
      $.ajax({
        url: this.href,
        type: 'GET',
        dataType: 'html',
        success: function (data, textStatus, jqXHR) {
          var all = $('<div></div>');
          all.html(data);
          self.render(all.find('#main').html());
        },
        error: function (a, b, c) {
          alert('problemo');
        }
      });
    },
    render: function (markup) {
      this.$el.html(markup);
    },
    onClose: function () {
      this.off();
      this.undelegateEvents();
    }
  })
});