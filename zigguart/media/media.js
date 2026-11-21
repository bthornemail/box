
      const t = document.querySelector('track');
      const track = t.track
      const textTracks = t.textTracks;
      console.debug(t.kind);
      console.debug(track);
      console.debug(textTracks);
      console.debug(t.readyState);

      track.mode = "showing";
      console.debug(t.kind);
      console.debug(track);
      console.debug(t.readyState);
      console.log(track.cues);
      
      t.addEventListener("cuechange", (event) => {
	  let cues = event.target.track.activeCues;
	  console.log(cues)
      });
      
      t.onaddtrack = updateTrackCount;
      t.onremovetrack = updateTrackCount;
      function updateTrackCount(event) {
	  trackCount = textTracks.length;
	  console.log('update',trackCount);
      }
      t.addEventListener("addtrack", (event) => {
	  console.log(`Text track: ${event.track.label} added`);
      });
      track.addCue(new VTTCue(0, 0.9, "Hildy!"));
      track.addCue(new VTTCue(1, 1.4, "How are you?"));
      track.addCue(
	  new VTTCue(1.5, 2.9, "Tell me, is the <u>lord of the universe</u> in?"),
      );
      track.addCue(new VTTCue(3, 4.2, "Yes, he's in - in a bad humor"));
      track.addCue(
	  new VTTCue(4.3, 6, "Somebody must've <b>stolen</b> the crown jewels"),
      );
      const article = document.querySelector("#electric-cars");
      // The following would also work:
      // const article = document.getElementById("electric-cars")

      article.dataset.columns; // "3"
      article.dataset.indexNumber; // "12314"
      article.dataset.parent; // "cars"
      // Find all elements with a data-columns attribute
      const articles = document.querySelectorAll("[data-columns]");

      // Find all elements with data-columns="3"
      const threeColumnArticles = document.querySelectorAll('[data-columns="3"]');
      // You can then iterate over the results
      threeColumnArticles.forEach((article) => {
	  console.log('3colu,n',article.dataset);
      });
      console.log(articles);
      console.log(threeColumnArticles);