(function () {
'use strict';

  let app = { }

  app.videoIds = ['logoVideo', 'backgroundVideo']

  app.monitorInterval = 5

  app.begin = () => {
    app.videoIds.forEach(videoId => app.autoPlayVideoWhenCreated(videoId), app.monitorInterval)
  }




      app.autoPlayVideoWhenCreated = (videoId) => {
        app[`intervalFor_${ videoId }`] = setInterval(()=> app.searchForVideoObject(videoId))
      }




          app.searchForVideoObject = (videoId) => {
            var videoObject = document.getElementById(videoId)
            if (videoObject) videoObject.oncanplaythrough = app.playVideo({ videoId: videoId, videoObject: videoObject })
          }




              app.playVideo = (params) => {
                clearInterval(app[`intervalFor_${ params.videoId }`])
                params.videoObject.muted = true
                params.videoObject.play()
              }




  app.begin()

})();

