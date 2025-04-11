const tracks = [
    "musicas/Black Roses.mp3",
    "musicas/By Grace.mp3",
    "musicas/Holy Ground.mp3"
    
  ];
  
  let currentTrackIndex = 0;
  let isPlaying = true;
  
  const player = document.getElementById("player");
  
  function toggleDropdown() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
  }
  
  function togglePlay() {
    const btn = event.currentTarget;
  
    if (player.paused) {
      player.play();
      btn.textContent = "⏯️";
      isPlaying = true;
    } else {
      player.pause();
      btn.textContent = "▶️";
      isPlaying = false;
    }
  }
  
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    player.src = tracks[currentTrackIndex];
    player.play();
    isPlaying = true;
    document.querySelector(".player-controls button:nth-child(2)").textContent = "⏯️";
  }
  
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    player.src = tracks[currentTrackIndex];
    player.play();
    isPlaying = true;
    document.querySelector(".player-controls button:nth-child(2)").textContent = "⏯️";
  }
  
  document.addEventListener("click", function(e) {
    const dropdown = document.querySelector(".dropdown");
    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdown-menu").classList.add("hidden");
    }
  });
  
  // Inicia a música automaticamente se desejado
  window.addEventListener("DOMContentLoaded", () => {
    player.src = tracks[currentTrackIndex];
  });