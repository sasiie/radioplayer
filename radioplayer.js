// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
fetch("https://api.sr.se/api/v2/channels/?format=json")
  .then((response) => response.json())
  .then((data) => {
    const channelsContainer = document.createElement("div");
    channelsContainer.classList.add("channels-container");

    data.channels.forEach((channel) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("music-player");

      const image = document.createElement("img");
      image.src = channel.image;
      image.alt = channel.name;
      playerDiv.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = channel.name;
      playerDiv.appendChild(title);

      const audio = document.createElement("audio");
      const source = document.createElement("source");
      source.src = channel.liveaudio.url;
      source.type = "audio/mpeg";
      audio.appendChild(source);
      playerDiv.appendChild(audio);

      const playButton = document.createElement("button");
      playButton.textContent = "Play";
      playButton.addEventListener("click", function () {
        if (audio.paused) {
          audio.play();
          playButton.textContent = "Pause";
        } else {
          audio.pause();
          playButton.textContent = "Play";
        }
      });
      playerDiv.appendChild(playButton);

      channelsContainer.appendChild(playerDiv);
    });

    document.body.appendChild(channelsContainer);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
