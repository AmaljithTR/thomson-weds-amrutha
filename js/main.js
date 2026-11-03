(function () {
  "use strict";
  var W = window.WEDDING || {};
  var body = document.body;

  /* ---------- Music ---------- */
  var audio = document.getElementById("audio");
  var musicBtn = document.getElementById("music");
  if (W.music) {
    audio.src = W.music;
    musicBtn.hidden = false;
  }
  function setMusicState(playing) {
    musicBtn.classList.toggle("is-paused", !playing);
    musicBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  }
  function playMusic() {
    if (!W.music) return;
    audio.volume = 0;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () {
        setMusicState(true);
        var v = 0, fade = setInterval(function () {
          v = Math.min(0.6, v + 0.05); audio.volume = v;
          if (v >= 0.6) clearInterval(fade);
        }, 150);
      }).catch(function () { setMusicState(false); });
    }
  }
  musicBtn.addEventListener("click", function () {
    if (audio.paused) { audio.play(); audio.volume = 0.6; setMusicState(true); }
    else { audio.pause(); setMusicState(false); }
  });
  var pausedByHide = false;
  document.addEventListener("visibilitychange", function () {
    if (!W.music) return;
    if (document.hidden && !audio.paused) { audio.pause(); pausedByHide = true; }
    else if (!document.hidden && pausedByHide) { audio.play(); pausedByHide = false; }
  });

  /* ---------- Chapel doors ---------- */
  var doors = document.getElementById("doors");
  var enter = document.getElementById("enter");
  function openDoors() {
    doors.classList.add("is-open");
    body.classList.remove("is-locked");
    playMusic();
    setTimeout(function () { doors.remove(); }, 2000);
  }
  enter.addEventListener("click", openDoors);
  doors.addEventListener("click", function (e) { if (e.target !== enter) openDoors(); });

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
      done.textContent = now < dayEnd ? "Today we celebrate" : "Happily married since 22.11.2026";
      return false;
    }
    var s = Math.floor(diff / 1000);
    cells.d.textContent = Math.floor(s / 86400);
    cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.m.textContent = pad(Math.floor(s % 3600 / 60));
    cells.s.textContent = pad(s % 60);
    return true;
  }
  if (tick()) { var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000); }

  /* ---------- Calendar + map links ---------- */
  function gcal(ev) {
    var q = [
      "action=TEMPLATE",
      "text=" + encodeURIComponent(ev.title),
      "dates=" + ev.start + "/" + ev.end,
      "location=" + encodeURIComponent(W.venue.name + ", " + W.venue.address),
      "details=" + encodeURIComponent(ev.details),
      "ctz=Asia/Kolkata"
    ];
    return "https://calendar.google.com/calendar/render?" + q.join("&");
  }
  document.querySelectorAll("[data-gcal]").forEach(function (a) {
    var ev = W.events && W.events[a.dataset.gcal];
    if (ev) a.href = gcal(ev);
  });
  if (W.venue && W.venue.mapUrl) {
    document.querySelectorAll("[data-map]").forEach(function (a) { a.href = W.venue.mapUrl; });
  }
  var wa = document.getElementById("wa-link");
  if (wa && W.contact) {
    wa.href = "https://wa.me/" + W.contact.whatsapp + "?text=" +
      encodeURIComponent("Hi Anson, I have a question about Amrutha & Thomson’s wedding.");
  }

  /* ---------- Braid draw-in ---------- */
  var braid = document.querySelector(".braid");
  if (braid && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { braid.classList.add("is-drawn"); obs.disconnect(); }
      });
    }, { threshold: 0.6 }).observe(braid);
  } else if (braid) { braid.classList.add("is-drawn"); }

  /* ---------- Gallery dots ---------- */
  var track = document.getElementById("gallery");
  var dotsWrap = document.getElementById("gallery-dots");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var dots = slides.map(function () {
      var d = document.createElement("span"); dotsWrap.appendChild(d); return d;
    });
    function updateDots() {
      var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bestDist = Infinity;
      slides.forEach(function (s, i) {
        var c = s.offsetLeft + s.offsetWidth / 2, dist = Math.abs(c - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === best); });
    }
    track.addEventListener("scroll", function () { requestAnimationFrame(updateDots); }, { passive: true });
    window.addEventListener("resize", updateDots);
    updateDots();
  }

  /* ---------- Share ---------- */
  var share = document.getElementById("share");
  share.addEventListener("click", function () {
    var data = {
      title: "Amrutha & Thomson · Wedding Invitation",
      text: "You’re invited to the wedding of Amrutha & Thomson on 22 November 2026.",
      url: location.href.split("#")[0]
    };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () {
        share.textContent = "Link copied";
        setTimeout(function () { share.textContent = "Share this invitation"; }, 2500);
      });
    }
  });
})();
