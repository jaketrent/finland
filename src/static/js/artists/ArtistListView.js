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
        xPx: -1 * winWidth,
        doneXpx: winWidth
      });

      var $nextCard = this.$cards.eq(this.onStage + 1);
      this.translateX($nextCard, {
        fromClzz: 'offstage',
        toClzz: 'onstage',
        xPx: 0
      });

      if (this.onStage === this.$cards.length - 1) {
        this.onStage = 0;
        var $reQueuedFirstCard = this.$cards.eq(this.onStage);
        this.translateX($reQueuedFirstCard, {
          fromClzz: 'offstage',
          toClzz: 'onstage',
          xPx: 0
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
        xPx: winWidth
      });
    },
    translateX: function ($el, settings) {
      if (settings.fromClzz && settings.toClzz) {
        $el.removeClass(settings.fromClzz).addClass(settings.toClzz);
      }
      this.setXTransform($el, settings.xPx, settings.doneXpx);
    },
    setXTransform: function ($el, Xpx, doneXpx) {
      var self = this;
      this.setTransformStyle($el, Xpx);
      if (doneXpx) {
        setTimeout(function () {
          self.setTransformStyle($el, doneXpx);
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