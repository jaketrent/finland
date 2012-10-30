define(function () {
  return {
    canPlayAudio: function () {
      var a = document.createElement('audio');
      return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
    }
  }
});