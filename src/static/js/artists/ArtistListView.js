define(['tmpl!./artistList', './Artists', '../audioDetector'], function (artistListTmpl, Artists, audioDetector) {
  return Backbone.View.extend({
    initialize: function () {
      this.artists = this.options.artists;
    },
    events: {
      "click .card": "advance",
      "click .name": "advance",
      "click .play": "playSong",
      "click .add": "addSong",
      "click .explore": "exploreSongs"
    },
    advance: function () {
      this.$('.explore').hide();
      this.cardIndx = this.advanceObj(this.$cards, this.cardIndx);
      this.nameIndx = this.advanceObj(this.$names, this.nameIndx);
      this.contentIndx = this.advanceObj(this.$content, this.contentIndx);
    },
    advanceObj: function ($el, indx) {
      var winWidth = $(window).width();

      var $center = $el.eq(indx);
      this.translateX($center, {
        fromClzz: 'onstage',
        toClzz: 'offstage',
        xPx: -1 * winWidth,
        doneXpx: winWidth
      });

      var $next = $el.eq(indx + 1);
      this.translateX($next, {
        fromClzz: 'offstage',
        toClzz: 'onstage',
        xPx: 0
      });

      if (indx === $el.length - 1) {
        indx = 0;
        var $reQueuedFirst = $el.eq(indx);
        this.translateX($reQueuedFirst, {
          fromClzz: 'offstage',
          toClzz: 'onstage',
          xPx: 0
        });
      } else {
        ++indx;
      }
      return indx;
    },
    render: function () {
      var self = this;
      this.$el.html(artistListTmpl({
        artists: this.artists.toJSON(),
        canPlayAudio: audioDetector.canPlayAudio()
      }));

      this.$cards = this.$('.card');
      this.$names = this.$('.name');
      this.$content = this.$('.content-area');
      this.cardIndx = 0;
      this.nameIndx = 0;
      this.contentIndx = 0;

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
        }, 401); // after transition
      }
    },
    setTransformStyle: function ($el, px) {
      $el.attr('style',
          ' -webkit-transform: translate(' + px + 'px, 0);'
        + ' -moz-transform: translate(' + px + 'px, 0);'
        + ' -o-transform: translate(' + px + 'px, 0);'
        + ' -ms-transform: translate(' + px + 'px, 0);'
        + ' transform: translate(' + px + 'px, 0);');
    },
    getCurrentArtist: function () {
      return this.artists.at(this.cardIndx - 1); // minus one for welcome card
    },
    playSong: function (evt) {
      var $targetRow = $(evt.currentTarget).closest('.song');
      var indx = $targetRow.parent().children('.song').index($targetRow);
      Backbone.Events.trigger('playSong', this.getCurrentArtist(), indx);
      evt.preventDefault();
    },
    addSong: function (evt) {
      var $targetRow = $(evt.currentTarget).closest('.song');
      var indx = $targetRow.parent().children('.song').index($targetRow);
      Backbone.Events.trigger('addSong', this.getCurrentArtist(), indx);
      evt.preventDefault();
    },
    exploreSongs: function (evt) {
      this.advance();
      this.$('.artist-songs').eq(0).find('.add').click();
      $('.play-btn').click();
      evt.preventDefault();
    }

  });
});