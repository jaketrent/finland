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
      _.bindAll(this, 'displayCurrentText', 'updateCurrentDuration', 'updateCurrentTimePoint', 'togglePlayQueueCurrent', 'playQueuePrevious', 'playQueueNext');
      Backbone.Events.on('playSong', this.playSong, this);
      Backbone.Events.on('addSong', this.addSong, this);
      this.browserSupportsAudio = window.Audio != undefined;
      if (this.browserSupportsAudio) {
        this.aud = new Audio();
        this.aud.addEventListener('durationchange', this.updateCurrentDuration);
        this.aud.addEventListener('timeupdate', this.updateCurrentTimePoint);
        this.aud.addEventListener('ended', this.playQueueNext);
      }
      this.queue = [];
      this.currIndx = 0;
    },
    events: {
      'click .play-btn': 'togglePlayQueueCurrent',
      'click .back-btn': 'playQueuePrevious',
      'click .fwd-btn': 'playQueueNext'
    },
    insertQueue: function (songDesc) {
      this.queue.splice(this.currentIndex, 0, songDesc);
    },
    appendQueue: function (songDesc) {
      this.queue.push(songDesc);
    },
    updateCurrentDuration: function () {
      var time = this.secsToDisplayTime(this.aud.seekable.end(0));
      var songDesc = this.getCurrentSongDesc();
      songDesc.songLength = time;
      this.$('.duration').html(songDesc.songLength);
    },
    updateCurrentTimePoint: function () {
      var time = this.secsToDisplayTime(this.aud.currentTime);
      this.$('.current-time').html(time);
    },
    secsToDisplayTime: function (secs) {
      var minsFraction = secs / 60;
      var mins = Math.floor(minsFraction);
      var secs = Math.floor((minsFraction % 1) * 60);
      var pad = secs < 10 ? '0' : '';
      return '' + mins + ':' + pad + secs;
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
    },
    addSong: function (artist, indx) {
      var songDesc = this.mkSongDesc(artist, indx);
      this.appendQueue(songDesc);
      console.log(this.queue);
    },
    togglePlayQueueCurrent: function () {
      if (this.aud.paused || this.aud.ended) {
        this.aud.play();
      } else {
        this.aud.pause();
      }
    },
    playQueueNext: function () {
      if (this.currIndx < this.queue.length - 1) {
        ++this.currIndx;
        this.playCurrentInQueue();
      }
    },
    playQueuePrevious: function () {
      if (this.currIndx > 0) {
        --this.currIndx;
        this.playCurrentInQueue();
      }
    }
  });
});