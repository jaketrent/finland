define(['tmpl!./welcome'], function (welcomeTmpl) {
  return Backbone.View.extend({
    initialize: function () {
      Backbone.Events.on('openWelcome', this.open, this);
      $(window).on('resize', this.sizeWindow);
    },
    sizeWindow: function () {
      var winHeight = $(window).height();
      var winWidth = $(window).width();

      $('.welcome').css({
        height: winHeight,
        width: winWidth
      });

      $('.top').css({
        height: winHeight / 2,
        width: winWidth
      });

      $('.bottom').css({
        height: winHeight / 2,
        width: winWidth,
        top: winHeight / 2
      });
    },
    render: function () {
      this.$el.html(welcomeTmpl());
      this.sizeWindow();
      return this;
    },
    open: function () {
      var self = this;
      var winHeight = $(window).height();

      var $top = this.$('.top');
      var $bottom = this.$('.bottom');
      $top.addClass('transitional');
      $bottom.addClass('transitional');

      // todo: handle other vendors
      $top.attr('style', $top.attr('style') + ' -webkit-transform: translate(0,' + (-1 * (winHeight / 2)) + 'px)');
      $bottom.attr('style', $bottom.attr('style') + ' -webkit-transform: translate(0,' + (winHeight / 2) + 'px)');

      setTimeout(function () {
        console.log('removing welcome');
        self.close();
      }, 1000);
    }
  })
});