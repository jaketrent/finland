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
      this.translateX($centerCard, {
        fromClzz: 'onstage',
        toClzz: 'offstage',
        multiplier: -1,
        translatePx: winWidth,
        doneMultiplier: 1,
        doneTranslatePx: winWidth
      });

      var $nextCard = this.$cards.eq(this.onStage + 1);
      this.translateX($nextCard, {
        fromClzz: 'offstage',
        toClzz: 'onstage',
        multiplier: 1,
        translatePx: 0
      });

      if (this.onStage === this.$cards.length - 1) {
        this.onStage = 0;
        var $reQueuedFirstCard = this.$cards.eq(this.onStage);
        this.translateX($reQueuedFirstCard, {
          fromClzz: 'offstage',
          toClzz: 'onstage',
          multiplier: 1,
          translatePx: 0
        });
      } else {
        ++this.onStage;
      }
    },
    render: function () {
      var self = this;
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON()
      }));

      this.$cards = this.$('.card');
      this.$names = this.$('.name');
      this.onStage = 0;

      // put 'offstage' on rhs of the screen
      var $offstages = this.$cards.filter('.offstage');
      var winWidth = $(window).width();
      this.translateX($offstages, {
        multiplier: 1,
        translatePx: winWidth
      });
    },
    translateX: function ($el, settings) {
      if (settings.fromClzz && settings.toClzz) {
        $el.removeClass(settings.fromClzz).addClass(settings.toClzz);
      }
      this.setXTransform($el, settings.multiplier, settings.translatePx, settings.doneMultiplier, settings.doneTranslatePx);
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