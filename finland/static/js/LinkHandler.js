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
      /*
        if starts with http
          do nothing let it happen
        else
          prevent default
          substring / off front
          call navigate
          this.router.navigate("help/troubleshooting", {trigger: true});
      */
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