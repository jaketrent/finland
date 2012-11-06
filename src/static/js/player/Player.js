// audio goodies:
// http://www.computerarts.co.uk/tutorials/create-html5-audio-visualisations
define(
[ 'tmpl!./player'
, 'tmpl!./text'
, './../audioDetector'
], function
( playerTmpl
, textTmpl
, audioDetector
) {
  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, 'render', 'displayCurrentText', 'updateCurrentDuration', 'updateCurrentTimePoint', 'togglePlayQueueCurrent', 'playQueuePrevious', 'playQueueNext', 'updateSongStatus');
      Backbone.Events.on('playSong', this.playSong, this);
      Backbone.Events.on('addSong', this.addSong, this);
      this.browserSupportsAudio = window.Audio != undefined;
      if (this.browserSupportsAudio) {
        this.aud = new Audio();

        this.aud.addEventListener('loadstart', this.updateSongStatus);
        this.aud.addEventListener('progress', this.updateSongStatus);
        this.aud.addEventListener('suspend', this.updateSongStatus);
        this.aud.addEventListener('abort', this.updateSongStatus);
        this.aud.addEventListener('error', this.updateSongStatus);
        this.aud.addEventListener('stalled', this.updateSongStatus);
        this.aud.addEventListener('loadeddata', this.updateSongStatus);
        this.aud.addEventListener('waiting', this.updateSongStatus);
        this.aud.addEventListener('canplaythrough', this.updateSongStatus);

        this.aud.addEventListener('loadedmetadata', this.updateCurrentDuration);
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
      this.queue.splice(this.currIndx + 1, 0, songDesc);
      this.$('.btn').removeClass('disabled');
      this.displayQueueText();
    },
    appendQueue: function (songDesc) {
      this.queue.push(songDesc);
      this.$('.btn').removeClass('disabled');
      this.displayQueueText();
    },
    updateSongStatus: function (evt) {
      var type = evt && evt.type ? evt.type : 'default';
      var msgs = {
        "loadstart": "Loading...",
        "progress": "Buffering...",
        "suspend": "", // has enough, not seeking
        "abort": "Aborted",
        "error": "Error",
        "stalled": "Buffering...",
        "loadeddata": "",
        "waiting": "Buffering...",
        "canplaythrough": "",
        "default": ""
      };
      this.$('.song-status').html(msgs[type]);
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
    playCurrentInQueue: function (checkSrcBeforeReload) {
      if (checkSrcBeforeReload) {
        if (!this.aud.src) {
          this.aud.src = this.getCurrentSongDesc().file;
        }
      } else {
        this.aud.src = this.getCurrentSongDesc().file;
      }
      this.aud.play();
      this.$('.play-btn').addClass('pausable');
      this.displayCurrentText();
      this.displayQueueText();
    },
    render: function () {
      if (audioDetector.canPlayAudio()) {
        this.$el.html(playerTmpl());
      }
    },
    mkSongDesc: function (artist, indx) {
      var song = artist.get('songs')[indx];
      song.artist = artist.get('name');
      return song;
    },
    playSong: function (artist, indx) {
      var songDesc = this.mkSongDesc(artist, indx);
      this.insertQueue(songDesc);
      if (this.queue.length > 1) {
        this.playQueueNext();
      } else {
        this.playCurrentInQueue();
      }
    },
    addSong: function (artist, indx) {
      var songDesc = this.mkSongDesc(artist, indx);
      this.appendQueue(songDesc);
      console.log(this.queue);
    },
    togglePlayQueueCurrent: function (evt) {
      if (this.aud.paused || this.aud.ended) {
        this.playCurrentInQueue(true);
      } else {
        this.aud.pause();
      }
      this.$('.play-btn').toggleClass('pausable', !(this.aud.paused || this.aud.ended));
      evt.preventDefault();
    },
    playQueueNext: function (evt) {
      if (this.currIndx < this.queue.length - 1) {
        this.incrementIndx();
        this.playCurrentInQueue();
      } else {
        this.aud.pause();
        this.$('.play-btn').removeClass('pausable');
      }
      if (evt) {
        evt.preventDefault();
      }
    },
    playQueuePrevious: function (evt) {
      if (this.currIndx > 0) {
        this.decrementIndx();
        this.playCurrentInQueue();
      }
      evt.preventDefault();
    },
    incrementIndx: function () {
      this.addToIndx(1);
    },
    decrementIndx: function () {
      this.addToIndx(-1);
    },
    addToIndx: function (num) {
      this.currIndx += num;
    },
    displayQueueText: function () {
      this.$('.queue-status').html('' + (this.currIndx + 1) + '/' + this.queue.length + ' queued');
    }
  });
});