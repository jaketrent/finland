define(['charts/Songs', 'charts/Artists'], function (Songs, Artists) {
  return function () {
    return {
      load: function (done) {
        _.bindAll(this, 'checkDataLoaded');
        this.done = done;
        this.songs = new Songs();
        this.songs.fetch({
          success: this.checkDataLoaded
        });

        this.artists = new Artists();
        this.artists.fetch({
          success: this.checkDataLoaded
        });
      },
      checkDataLoaded: function () {
        if (this.songs.length > 0
          && this.artists.length > 0) {
          this.combineData();
          this.done();
        }
      },
      combineData: function () {
        var self = this;
        _(this.songs.models).each(function (song) {
          song.set({
            artist: _(self.artists.models).find(function (artist) {
              return artist.get('resource_uri') === song.get('artist_uri');
            }).toJSON()
          });
        });
        _(this.artists.models).each(function (artist) {
          artist.set({
            songs: _(self.songs.models).find(function (song) {
              return _.include(artist.get('song_uris'), song.get('resource_uri'))
            }).toJSON()
          });
        });
      },
      getSongs: function () {
        return this.songs;
      },
      getSong: function (titleSlug) {
        return _(this.songs.models).find(function (song) {
          return song.get('title_slug') === titleSlug;
        });
      },
      getArtists: function () {
        return this.artists;
      },
      getArtist: function (nameSlug) {
        return _(this.artists.models).find(function (artist) {
          return artist.get('name_slug') === nameSlug;
        });
      }
    }
  };
});