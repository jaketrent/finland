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
  require(['charts/DataLoader', 'charts/Router'], function (DataLoader, ChartsRouter) {
    var dataLoader = new DataLoader();
    dataLoader.load(function () {
      new ChartsRouter({
        dataLoader: dataLoader
      });
      Backbone.history.start({ pushState: true });
    });
  });

  function adjustHeight() {
    $('.full-height').each(function () {
      $(this).css('height', $(window).height() - $(this).css('padding-top').replace('px', ''));
    });
    $('.rh').css('width', $(window).width() - $('.lh').width() - $('.vert-stripe').width());
  }
  $(window).resize(adjustHeight);
  adjustHeight();

});