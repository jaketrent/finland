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
  require(['./welcome/WelcomeView'], function (WelcomeView) {
    var welcomeView = new WelcomeView();
    $('.container').html(welcomeView.render().el);
  });
});