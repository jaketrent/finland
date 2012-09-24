define(['./Artist'], function (Artist) {
  return Backbone.Collection.extend({
    model: Artist,
    url: '/ws/artist'
  })
});