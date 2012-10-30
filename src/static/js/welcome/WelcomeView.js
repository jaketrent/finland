define(['tmpl!./welcome'], function (welcomeTmpl) {
  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, 'open');
      Backbone.Events.on('openWelcome', this.open, this);
      $(window).on('resize', this.sizeWindow);
      $(window).one('scroll', this.open);
    },
    events: {
      'click': 'open'
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

      $('body').addClass('welcomed');

      var winHeight = $(window).height();

      var $top = this.$('.top');
      var $bottom = this.$('.bottom');
      $top.addClass('transitional');
      $bottom.addClass('transitional');

      var topPx = (-1 * (winHeight / 2));
      var botPx = (winHeight / 2);
      $top.attr('style', $top.attr('style')
        + ' -webkit-transform: translate(0,' + topPx + 'px);'
        + ' -moz-transform: translate(0,' + topPx + 'px);'
        + ' -o-transform: translate(0,' + topPx + 'px);'
        + ' -ms-transform: translate(0,' + topPx + 'px);'
        + ' transform: translate(0,' + topPx + 'px);');
      $bottom.attr('style', $bottom.attr('style')
        + ' -webkit-transform: translate(0,' + botPx + 'px);'
        + ' -moz-transform: translate(0,' + botPx + 'px);'
        + ' -o-transform: translate(0,' + botPx + 'px);'
        + ' -ms-transform: translate(0,' + botPx + 'px);'
        + ' transform: translate(0,' + botPx + 'px);');

      setTimeout(function () {
        Backbone.Events.off('openWelcome', self.open, self);
        $(window).off('resize', self.sizeWindow);
        $(window).off('scroll', self.open);
        self.off();
        self.remove();
      }, 1000); // enough time for transition to complete animation
    }
  })
});