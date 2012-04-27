require.config({
  paths: {
    'order': 'vendor/order',
    'text': 'vendor/text',
    'handlebars': 'vendor/handlebars-1.0.0.beta.6'
  }
});

require(['require', 'webstack'], function (require) {
  if (!window.JSON) {
    require(['vendor/json2'], function () {
      /*for old browsers*/
    });
  }
  require(['charts/Router'], function (ChartsRouter) {
    new ChartsRouter();
    Backbone.history.start({ pushState: true });
  });

  function adjustHeight() {
    $('.full-height').each(function () {
      $(this).css('height', $(window).height() - $(this).css('padding-top').replace('px', ''));
    });
  }
  $(window).resize(adjustHeight);
  adjustHeight();

});