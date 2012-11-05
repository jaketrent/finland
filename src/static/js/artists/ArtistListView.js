define(['tmpl!./artistList', './Artists'], function (artistListTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    events: {
      'click .card': 'advanceCard'
    },
    advanceCard: function () {
      var winWidth = $(window).width();

      var $centerCard = this.$cards.eq(this.onStage);
      $centerCard.removeClass('onstage').addClass('offstage');
      this.setXTransform($centerCard, -1, winWidth, 1, winWidth);

      var $nextCard = this.$cards.eq(this.onStage + 1);
      $nextCard.removeClass('offstage').addClass('onstage');
      this.setXTransform($nextCard, 1, 0);

      if (this.onStage === this.$cards.length - 1) {
        this.onStage = 0;
        var $reQueuedFirstCard = this.$cards.eq(this.onStage);
        $reQueuedFirstCard.removeClass('offstage').addClass('onstage');
        this.setXTransform($reQueuedFirstCard, 1, 0);
      } else {
        ++this.onStage;
      }
    },
    render: function () {
      var self = this;
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON()
      }));

      // put 'after' on rhs of the screen
      this.$cards = this.$('.card');
      this.onStage = 0;

      var $offstage = this.$cards.filter('.offstage');
      var winWidth = $(window).width();
      this.setXTransform($offstage, 1, winWidth);

      // leave time for card style to be set and painted off screen right before turning on animation
      setTimeout(function () {
        self.$cards.addClass('transitional fast');
      }, 1);
    },
    setXTransform: function ($el, multiplier, Xpx, doneMultiplier, doneXpx) {
      var self = this;
      this.setTransformStyle($el, (multiplier * Xpx));
      if (doneMultiplier && doneXpx) {
        setTimeout(function () {
          self.setTransformStyle($el, (doneMultiplier * doneXpx));
        }, 301); // after transition
      }
    },
    setTransformStyle: function ($el, px) {
      $el.attr('style',
          ' -webkit-transform: translate(' + px + 'px, 0);'
        + ' -moz-transform: translate(' + px + 'px, 0);'
        + ' -o-transform: translate(' + px + 'px, 0);'
        + ' -ms-transform: translate(' + px + 'px, 0);'
        + ' transform: translate(' + px + 'px, 0);');
    }

  });
});