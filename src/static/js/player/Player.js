// audio goodies:
// http://www.computerarts.co.uk/tutorials/create-html5-audio-visualisations
define(
[ 'tmpl!./player'
, 'tmpl!./text'
], function
( playerTmpl
, textTmpl
) {
  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, 'displayCurrentText', 'updateCurrentDuration');
      Backbone.Events.on('playSong', this.playSong, this);
      this.browserSupportsAudio = window.Audio != undefined;
      if (this.browserSupportsAudio) {
        this.aud = new Audio();
        this.aud.addEventListener('durationchange', this.updateCurrentDuration);
      }
      this.queue = [];
      this.currIndx = 0;
    },
    insertQueue: function (songDesc) {
      this.queue.splice(this.currentIndex, 0, songDesc);
    },
    appendQueue: function (songDesc) {
      this.queue.push(songDesc);
    },
    updateCurrentDuration: function () {
      var lenInSec = this.aud.seekable.end(0);
      var minsFraction = lenInSec / 60;
      var mins = Math.floor(minsFraction);
      var secs = Math.floor((minsFraction % 1) * 100);
      this.getCurrentSongDesc().songLength = '' + mins + ':' + secs;
      this.displayCurrentText();
    },
    displayCurrentText: function () {
      this.$('.text').html(textTmpl(this.getCurrentSongDesc()));
    },
    getCurrentSongDesc: function () {
      return this.queue[this.currIndx];
    },
    playCurrentInQueue: function () {
      this.aud.src = this.getCurrentSongDesc().file;
      this.aud.play();
      this.displayCurrentText();
    },
    render: function () {
      this.$el.html(playerTmpl());
    },
    mkSongDesc: function (artist, indx) {
      var song = artist.get('songs')[indx];
      song.artist = artist.get('name');
      return song;
    },
    playSong: function (artist, indx) {
      var songDesc = this.mkSongDesc(artist, indx);
      this.insertQueue(songDesc);
      this.playCurrentInQueue();
    }
  });
});