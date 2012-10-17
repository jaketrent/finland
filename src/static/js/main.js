require({
  paths: {
    text: './vendor/text',
    underscore: './vendor/underscore',
    backbone: './vendor/backbone',
    handlebars: './vendor/handlebars',
    tmpl: './vendor/tmpl',
    jquery: './vendor/jquery',
    require: './vendor/require'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
}, ['require', 'backbone', 'handlebars'], function (require) {

  Backbone.View.prototype.close = function(){
    this.off();
    if (this.onClose) {
      this.onClose();
    }
  };

  require(['./Router', './welcome/WelcomeView'], function (Router, WelcomeView) {

    function sizeWindow() {
      var winHeight = $(window).height();
      var winWidth = $(window).width();

      $('.container').css({
        height: winHeight,
        width: winWidth
      });
    }
    $(window).on('resize', sizeWindow);
    sizeWindow();

    /*var welcomeView = new WelcomeView({
      el: $('.welcome-container')
    });
    welcomeView.render();
*/
    var router = new Router();
    Backbone.history.start();

    setTimeout(function () {
      console.log('timed out!');
      router.navigate('artists', { trigger: true, replace: true });
    }, 1000);
  });



});