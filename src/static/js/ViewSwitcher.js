define(['./player/Player', './artists/Artists'], function (Player, Artists) {
  var viewSwitcher = {
    init: function () {
      this.viewCache = {};
      this.$container = $('.content-container');
      this.artists = new Artists();
      this.defaultOpts = {
        el: this.$container,
        artists: this.artists
      };

      this.player = new Player({
        el: '.player-container'
      });
      this.player.render();

      this.artists.on('reset', function () {
        this.artistsFetched = true;
        if (this.currentView) {
          this.findViewInCache(this.currentView).render();
        }
      }, this);
      this.artists.on('error', function () {
        alert('Error loading artists');
      });
      this.artists.fetch();
    },
    findViewInCache: function (key) {
      return this.viewCache[key];
    },
    cacheNewView: function (key, viewFn, opts) {
      var viewInstance = new viewFn(_.extend({}, this.defaultOpts, opts));
      this.viewCache[key] = viewInstance;
      return viewInstance;
    },
    closeWelcome: function () {
      if (!this.currentView) {
        setTimeout(function () {
          Backbone.Events.trigger('openWelcome');
        }, 1500);
      }
    },
    switchToView: function (settings) {
      this.closeWelcome();
      this.currentView = settings.key;

      var cachedViewInstance = this.findViewInCache(settings.key);
      var view = cachedViewInstance
        ? cachedViewInstance
        : this.cacheNewView(settings.key, settings.viewFn, settings.opts);

      if (this.artistsFetched) {
        view.render();
      }
    }
  };
  viewSwitcher.init();
  return viewSwitcher;
});