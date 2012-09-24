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
    }
  }
}, ['backbone'], function () {
  $(function () {
    setTimeout(function () {
      console.log('timed out');
      $('.welcome').addClass('opened');
    }, 1000);
  });
});