define(['charts/Song'], function (Song) {
  return Backbone.Collection.extend({
    model: Song,
    url: '/api/v1/song/'
  });
});