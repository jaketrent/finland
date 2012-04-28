define(['charts/Songs', 'charts/Artists'], function (Songs, Artists) {
  return function () {
    return {
      load: function (done) {
        _.bindAll(this, 'checkDataLoaded');
        this.done = done;
        this.songs = new Songs();
//        this.songs.on('reset', this.checkDataLoaded, this);
//        this.songs.on('error', function () { alert('error songs'); });
        this.songs.fetch({
          success: this.checkDataLoaded
        });

        this.artists = new Artists();
//        this.artists.on('reset', this.checkDataLoaded, this);
//        this.artists.on('error', function () { alert('error artists'); });
        this.artists.fetch({
          success: this.checkDataLoaded
        });
      },
      checkDataLoaded: function () {
        if (this.songs.length > 0
          && this.artists.length > 0) {
          this.done();
        }
      },
      getSongs: function () {
        return this.songs;
      },
      getArtists: function () {
        return this.artists;
      }
    }
  };
});