(function () {
  "use strict";
  var W = window.WEDDING || {};
  var endpoint = W.wishesEndpoint;
  var form = document.getElementById("wish-form");
  var nameEl = document.getElementById("wish-name");
  var msgEl = document.getElementById("wish-msg");
  var btn = document.getElementById("wish-submit");
  var status = document.getElementById("wish-status");
  var list = document.getElementById("wish-list");
  var count = document.getElementById("wish-count");

  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // Restore an unsent draft
  nameEl.value = storeGet("wish:name") || "";
  msgEl.value = storeGet("wish:draft") || "";
  nameEl.addEventListener("input", function () { storeSet("wish:name", nameEl.value); });
  msgEl.addEventListener("input", function () { storeSet("wish:draft", msgEl.value); });

  if (!endpoint) btn.textContent = "Send blessing on WhatsApp";

  function formatDate(t) {
    var d = new Date(t);
    return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  // Build every wish with textContent so guest input is never treated as HTML
  function renderWish(w) {
    var li = document.createElement("li"); li.className = "wish";
    var n = document.createElement("p"); n.className = "wish__name"; n.textContent = w.name;
    var m = document.createElement("p"); m.className = "wish__msg"; m.textContent = w.message;
    var foot = document.createElement("div"); foot.className = "wish__foot";
    var date = document.createElement("span"); date.textContent = formatDate(w.time);
    var like = document.createElement("button"); like.type = "button"; like.className = "wish__like";
    var liked = storeGet("liked:" + w.id) === "1";
    var likes = Number(w.likes) || 0;
    function paint() {
      like.textContent = (liked ? "♥ " : "♡ ") + likes;
      like.setAttribute("aria-pressed", liked ? "true" : "false");
      like.setAttribute("aria-label", (liked ? "Liked" : "Like") + " this blessing, " + likes + " likes");
    }
    paint();
    like.addEventListener("click", function () {
      if (liked) return;
      liked = true; likes += 1; paint();
      storeSet("liked:" + w.id, "1");
      post({ action: "like", id: w.id }).catch(function () {});
    });
    foot.append(date, like);
    li.append(n, m, foot);
    return li;
  }

  function post(payload) {
    // text/plain avoids a CORS preflight, which Apps Script does not answer
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); });
  }

  function load() {
    if (!endpoint) return;
    fetch(endpoint).then(function (r) { return r.json(); }).then(function (data) {
      var wishes = (data && data.wishes) || [];
      list.textContent = "";
      wishes.forEach(function (w) { list.appendChild(renderWish(w)); });
      if (wishes.length) {
        count.hidden = false;
        count.textContent = wishes.length === 1 ? "1 blessing so far" : wishes.length + " blessings so far";
      }
    }).catch(function () {
      count.hidden = false;
      count.textContent = "Blessings couldn’t load. Check your connection and refresh the page.";
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameEl.value.trim(), message = msgEl.value.trim();
    if (!name || !message) {
      status.textContent = !name ? "Add your name to send a blessing." : "Write a few words before sending.";
      (!name ? nameEl : msgEl).focus();
      return;
    }

    if (!endpoint) {
      var text = "Blessing for Amrutha & Thomson from " + name + ":\n\n" + message;
      window.open("https://wa.me/" + W.contact.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      status.textContent = "WhatsApp opened with your blessing. Tap send there.";
      return;
    }

    btn.disabled = true; status.textContent = "Sending…";
    post({ name: name, message: message }).then(function (res) {
      if (!res || !res.ok) throw new Error();
      msgEl.value = ""; storeSet("wish:draft", "");
      status.textContent = "Blessing sent. Thank you!";
      load();
    }).catch(function () {
      status.textContent = "Your blessing didn’t send. Check your connection and try again.";
    }).then(function () { btn.disabled = false; });
  });

  load();
})();
