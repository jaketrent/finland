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

      this.artists.on('reset', function () {
        this.artistsFetched = true;
        if (this.currentView) {
          var cachedView = this.findViewInCache(this.currentView);
          cachedView.view.render(cachedView.renderOpts);
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
    cacheNewView: function (key, viewFn, opts, renderOpts) {
      var viewInstance = new viewFn(_.extend({}, this.defaultOpts, opts));
      this.viewCache[key] = {};
      this.viewCache[key].view = viewInstance;
      this.viewCache[key].renderOpts = renderOpts;
      return viewInstance;
    },
    closeWelcome: function () {
      if (!this.currentView) {
        setTimeout(function () {
          Backbone.Events.trigger('openWelcome');
        }, 1500);
        setTimeout(this.player.render, 3000);
//        this.player.render();
      }
    },
    switchToView: function (settings) {
      this.closeWelcome();
      this.currentView = settings.key;

      var cachedView = this.findViewInCache(settings.key);
      var view = cachedView
        ? cachedView.view
        : this.cacheNewView(settings.key, settings.viewFn, settings.opts, settings.renderOpts);

      if (this.artistsFetched) {
        view.render(settings.renderOpts);
      }
    }
  };
  viewSwitcher.init();
  return viewSwitcher;
});