define(['charts/Artist'], function (Artist) {
  return Backbone.Collection.extend({
    model: Artist,
    url: '/api/v1/artist/'
  });
});