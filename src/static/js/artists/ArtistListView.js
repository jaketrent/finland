define(['tmpl!./artistList', './Artists'], function (artistListTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    events: {
      'click .card': 'advanceCard'
    },
    advanceCard: function (evt) {
      var $activeCard = $(evt.currentTarget);
      $activeCard.removeClass('center').addClass('before');
      var $nextCard = this.$('.card.after').eq(0);
      $nextCard.removeClass('after').addClass('center');

      var winWidth = $(window).width();
      this.setXTransform($activeCard, -1, winWidth);
      this.setXTransform($nextCard, 1, 0);

    },
    render: function () {
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON()
      }));

      // put 'after' on rhs of the screen
      var $afters = this.$('.card.after');
      var winWidth = $(window).width();
      this.setXTransform($afters, 1, winWidth);
    },
    setXTransform: function ($el, multiplier, Xpx) {
      var direction = (multiplier * Xpx);
      $el.attr('style',
          ' -webkit-transform: translate(' + direction + 'px, 0);'
        + ' -moz-transform: translate(' + direction + 'px, 0);'
        + ' -o-transform: translate(' + direction + 'px, 0);'
        + ' -ms-transform: translate(' + direction + 'px, 0);'
        + ' transform: translate(' + direction + 'px, 0);');
    }
  });
});