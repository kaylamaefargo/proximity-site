/* Footer newsletter signup. Posts to the Kit form "Newsletter site" (id 9743128). */
(function () {
  var KIT_URL = 'https://app.kit.com/forms/9743128/subscriptions';
  var form = document.getElementById('news-form');
  if (!form) return;
  var email = document.getElementById('news-email');
  var btn = document.getElementById('news-btn');
  var msg = document.getElementById('news-msg');
  function say(t) { msg.textContent = t; msg.classList.add('show'); }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return say('Add a valid email.');
    var data = new FormData();
    data.append('email_address', v);
    data.append('fields[updates_optin]', 'yes');
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(KIT_URL, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok || (res.body && res.body.status === 'error')) throw new Error('fail');
        if (window.gtag) window.gtag('event', 'newsletter_signup', { page_path: location.pathname });
        form.querySelectorAll('input,button').forEach(function (el) { el.style.display = 'none'; });
        say('Thanks. Check your email and click the confirmation link so I can reach you. If it is not there, look in spam or promotions.');
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Subscribe';
        say('Something went wrong. Try again, or email kayla@byproximity.com.');
      });
  });
})();
