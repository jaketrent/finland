define(['charts/Song'], function (Song) {
  return Backbone.Collection.extend({
    model: Song,
    url: '/ws/song'
  });
});