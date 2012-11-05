define(['tmpl!./artistList', './Artists'], function (artistListTmpl, Artists) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    events: {
      'click .card': 'advanceCard'
    },
    advanceCard: function (evt) {
      var self = this;
      var $centerCard = $(evt.currentTarget);
      var winWidth = $(window).width();
      var movedLastCardToBefore = false;

      $centerCard.removeClass('center').addClass('before');
      var $nextCard = this.$('.card.after').eq(0);

      // put all cards back in queue
      if ($nextCard.length === 0) {

        movedLastCardToBefore = true;
        var $befores = this.$('.card.before');
        $befores.removeClass('before').addClass('after');
        this.setXTransform($befores, 1, winWidth);

        // re-enable animation
        var $afters = this.$('.card.after');

        // re-find next card
        $nextCard = $afters.eq(0);
      }

      $nextCard.removeClass('after').addClass('center');

      if (movedLastCardToBefore) {

        // after transition ended
        setTimeout(function () {

          // re-put on right hand side
          self.setXTransform($centerCard, 1, winWidth);
        }, 301);

      }

      this.setXTransform($centerCard, -1, winWidth);
      this.setXTransform($nextCard, 1, 0);

    },
    render: function () {
      var self = this;
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON()
      }));

      // put 'after' on rhs of the screen
      this.$cards = this.$('.card');
      var $afters = this.$cards.filter('.after');
      var winWidth = $(window).width();
      this.setXTransform($afters, 1, winWidth);

      // leave time for card style to be set and painted off screen right before turning on animation
      setTimeout(function () {
        self.$cards.addClass('transitional fast');
      }, 1);
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