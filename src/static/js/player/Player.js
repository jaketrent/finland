// audio goodies:
// http://www.computerarts.co.uk/tutorials/create-html5-audio-visualisations
define(
[ 'tmpl!./player'
, 'tmpl!./text'
, 'vendor/BufferLoader'
], function
( playerTmpl
, textTmpl
) {
  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, 'onAudioLoaded');
      Backbone.Events.on('playSong', this.playSong, this);
      this.context = new webkitAudioContext();
      this.audioElems = [];
      this.currentSongIndx = 0;
    },
    loadAudio: function () {
      this.bufferLoader = new BufferLoader(this.context, this.audioFiles, this.onAudioLoaded);
      this.bufferLoader.load();
    },
    resetAudioFiles: function (files) {
      this.currentSongIndx = 0;
      this.audioElems = [];
      this.audioFiles = files;
    },
    onAudioLoaded: function (bufferList) {
      var i = 0;
      var j = 0;

      for (i; i < bufferList.length; ++i) {
        var bufferSource = this.context.createBufferSource();
        bufferSource.buffer = bufferList[i];
        bufferSource.loop = false;

        var gainNode = this.context.createGainNode();
        bufferSource.connect(gainNode);
        gainNode.connect(this.context.destination);
        gainNode.gain.value = 1;

        var audioElem = {
          source: bufferSource,
          gainNode: gainNode
        };

        this.audioElems.push(audioElem);
      }

      this.audioElems[this.currentSongIndx].source.noteOn(0);

    },
    render: function () {
      this.$el.html(playerTmpl());
    },
    playSong: function (artist, indx) {
      var song = artist.get('songs')[indx];

      this.$('.text').html(textTmpl({
        artist: artist.toJSON(),
        song: song
      }));

      this.resetAudioFiles([song.file]);

      this.loadAudio();


    }
  });
});