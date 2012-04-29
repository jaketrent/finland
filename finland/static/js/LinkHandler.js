define(function () {
  return Backbone.View.extend({
    el: 'html',
    events: {
      'click a': 'handleLink'
    },
    initialize: function () {
      this.router = this.options.router
    },
    handleLink: function (evt) {
      var $a = $(evt.currentTarget);
      var href = $a.attr('href');
      if (href.match(/^\w+:\/\//)) {
        return true;
      } else {
        evt.preventDefault();
        this.router.navigate(href.substring(1), {trigger: true});
        return false;
      }

    }
  })
});