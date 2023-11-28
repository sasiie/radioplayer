fetch("https://api.sr.se/api/v2/channels/?format=json")
  .then((response) => response.json())
  .then((data) => {
    data.channels.forEach((channel) => {
      const channelName = channel.name;
      const channelImage = channel.image;
      const liveAudioUrl = channel.liveaudio.url;

      const channelElement = document.createElement("div");
      channelElement.innerHTML = `

        <h2>${channelName}</h2>
        <img src="${channelImage}" alt="${channelName} Image">
        <audio controls>
          <source src="${liveAudioUrl}" type="audio/mpeg" />
        </audio>
      `;

      channelElement.style.backgroundColor = `#${channel.color}`;
      document.getElementById("channels").appendChild(channelElement);
    });
  });
