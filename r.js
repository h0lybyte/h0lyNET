var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
	  var current;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '10',
          width: '50',
          videoId: 'yyqdG89zz58',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
       // event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
	  var force = 0;
      function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PAUSED && force == 1)
		{
		event.target.playVideo();
		}
		if (event.data == YT.PlayerState.ENDED)
		{
		changeVideo();
		}
      //  if (event.data == YT.PlayerState.PLAYING && !done) {
      //    setTimeout(stopVideo, 6000);
      //    done = true;
      //  }
	
      }
	  function changeVideo()
	  {
	  
	 
	  
	  player.loadVideoById('wuCK-oiE3rM');
	  
	  }
	  
	  function loadAPIVideo(user)
	  {
	   $.getJSON( "https://kbve.com/api/radio/radio.php?", {
		radio: "mount rainier",
		tagmode: "any",
		format: "json"
	  })
		.done(function( data ) {
		 current = data.video;
		});
	  }
      function stopVideo() {
        player.stopVideo();
      }
	  function forceUPlay()
	  {
		player.playVideo();
		force = 1;
	  }
	  function forceUPause()
	  {
		force = 0;
		player.pauseVideo();
	  }