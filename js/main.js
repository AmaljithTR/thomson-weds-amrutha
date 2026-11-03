(function () {
  "use strict";
  var W = window.WEDDING || {};
  var body = document.body;

  /* ---------- Gold particles ---------- */
  var particles = document.querySelector(".particles");
  if (particles && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 18; i++) {
      var p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 12 + Math.random() * 14 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      var size = 1.5 + Math.random() * 2.5;
      p.style.width = p.style.height = size + "px";
      particles.appendChild(p);
    }
  }

  /* ---------- Music (MP3 file, or YouTube as a fallback) ---------- */
  var audio = document.getElementById("audio");
  var musicBtn = document.getElementById("music");
  var yt = null, ytReady = false, wantPlay = false, playing = false;

  function setMusic(on) {
    playing = on;
    musicBtn.classList.toggle("is-paused", !on);
    musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  }

  if (W.music) {
    audio.src = W.music;
    musicBtn.hidden = false;
  } else if (W.youtubeId) {
    musicBtn.hidden = false;
    setMusic(false);
    window.onYouTubeIframeAPIReady = function () {
      yt = new YT.Player("yt-player", {
        width: 200, height: 200, videoId: W.youtubeId,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: W.youtubeId, playsinline: 1, rel: 0 },
        events: {
          onReady: function () { ytReady = true; yt.setVolume(60); if (wantPlay) ytPlay(); },
          onStateChange: function (e) {
            if (e.data === YT.PlayerState.PLAYING) setMusic(true);
            else if (e.data === YT.PlayerState.PAUSED) setMusic(false);
          },
          onError: function () { musicBtn.hidden = true; }
        }
      });
    };
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  function ytPlay() { try { yt.unMute(); yt.setVolume(60); yt.playVideo(); } catch (e) {} }

  function playMusic() {
    if (W.music) {
      audio.volume = 0.6;
      var pr = audio.play();
      if (pr && pr.then) pr.then(function () { setMusic(true); }).catch(function () { setMusic(false); });
    } else if (W.youtubeId) {
      wantPlay = true;
      if (ytReady) ytPlay();
    }
  }
  function pauseMusic() {
    if (W.music) audio.pause();
    else if (yt && ytReady) yt.pauseVideo();
    setMusic(false);
  }
  musicBtn.addEventListener("click", function () { playing ? pauseMusic() : playMusic(); });

  var hiddenPause = false;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && playing) { pauseMusic(); hiddenPause = true; }
    else if (!document.hidden && hiddenPause) { playMusic(); hiddenPause = false; }
  });

  /* ---------- Opener ---------- */
  var opener = document.getElementById("opener");
  var opened = false;
  function openInvite() {
    if (opened) return; opened = true;
    opener.classList.add("is-open");
    playMusic();
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(function () {
      opener.classList.add("is-hidden");
      body.classList.remove("is-locked");
    }, reduce ? 300 : 2600);
    setTimeout(function () { opener.remove(); }, reduce ? 1200 : 3500);
  }
  opener.addEventListener("click", openInvite);

  /* ---------- Countdown ---------- */
  var target = new Date(W.countdownTarget).getTime();
  var dayEnd = new Date(W.weddingDayEnd).getTime();
  var grid = document.getElementById("countdown");
  var done = document.getElementById("countdown-done");
  var cells = {};
  grid.querySelectorAll("[data-unit]").forEach(function (el) { cells[el.dataset.unit] = el; });
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var now = Date.now(), diff = target - now;
    if (diff <= 0) {
      grid.hidden = true; done.hidden = false;
      done.textContent = now < dayEnd ? "Today we celebrate" : "Happily married · 22.11.2026";
      return false;
    }
    var s = Math.floor(diff / 1000);
    cells.d.textContent = pad(Math.floor(s / 86400));
    cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.m.textContent = pad(Math.floor(s % 3600 / 60));
    cells.s.textContent = pad(s % 60);
    return true;
  }
  if (tick()) { var t = setInterval(function () { if (!tick()) clearInterval(t); }, 1000); }

  /* ---------- Calendar, map, WhatsApp links ---------- */
  function gcal(ev) {
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(ev.title) +
      "&dates=" + ev.start + "/" + ev.end +
      "&location=" + encodeURIComponent(ev.location || (W.venue.name + ", " + W.venue.address)) +
      "&details=" + encodeURIComponent(ev.details) +
      "&ctz=Asia/Kolkata";
  }
  document.querySelectorAll("[data-gcal]").forEach(function (a) {
    var ev = W.events && W.events[a.dataset.gcal];
    if (ev) a.href = gcal(ev);
  });
  if (W.venue && W.venue.mapUrl) {
    document.querySelectorAll("[data-map]").forEach(function (a) { a.href = W.venue.mapUrl; });
  }
  var waText = encodeURIComponent("Hi Anson, I have a query regarding Thomson & Amrutha’s wedding.");
  ["wa-link", "fab-wa"].forEach(function (id) {
    var a = document.getElementById(id);
    if (a && W.contact) a.href = "https://wa.me/" + W.contact.whatsapp + "?text=" + waText;
  });

  /* ---------- Gallery dots + gentle autoplay ---------- */
  var track = document.getElementById("gallery");
  var dotsWrap = document.getElementById("dots");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var dots = slides.map(function () { var d = document.createElement("span"); dotsWrap.appendChild(d); return d; });
    var current = 0;
    function update() {
      var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = Infinity;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      current = best;
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === best); });
    }
    track.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
    window.addEventListener("resize", update);
    update();

    var userTouched = false;
    ["pointerdown", "touchstart", "wheel", "keydown"].forEach(function (ev) {
      track.addEventListener(ev, function () { userTouched = true; }, { passive: true });
    });
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInterval(function () {
        if (userTouched || document.hidden) return;
        var next = slides[(current + 1) % slides.length];
        track.scrollTo({ left: next.offsetLeft - (track.clientWidth - next.offsetWidth) / 2, behavior: "smooth" });
      }, 4000);
    }
  }

  /* ---------- Share ---------- */
  var share = document.getElementById("share");
  share.addEventListener("click", function () {
    var data = {
      title: "Thomson weds Amrutha",
      text: "You’re warmly invited to the wedding of Thomson & Amrutha on Sunday, 22 November 2026.",
      url: location.href.split("#")[0]
    };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () {
        share.textContent = "Link copied";
        setTimeout(function () { share.textContent = "Share Invitation"; }, 2500);
      });
    }
  });
})();
