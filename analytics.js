/* Proximity analytics: Google Analytics 4 plus click tracking for the actions that matter.
   Setup: replace GA_ID below with the Measurement ID from GA4 (Admin > Data streams > your web stream),
   which looks like G-ABC123XYZ. Until then this file does nothing, so the site is safe to publish. */
(function () {
  var GA_ID = 'G-0N023KZYET';
  if (!GA_ID || /^G-X+$/.test(GA_ID)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Visitors in the EEA, UK and Switzerland are not tracked unless they opt in. There is no banner on this site,
  // so for those regions analytics stays off. Everywhere else it is on by default.
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
  });
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  function track(name, params) {
    params = params || {};
    params.page_path = location.pathname;
    params.transport_type = 'beacon';
    gtag('event', name, params);
  }

  // The links we care about. Matching on the URL keeps this working if a button moves or changes wording.
  var RULES = [
    { match: /reclaim\.ai/i, event: 'book_call' },
    { match: /buy\.stripe\.com\/9B6fZh8t5fDiddQ9JrfrW01/i, event: 'start_teardown' },
    { match: /buy\.stripe\.com\/3cI14n5gTezec9M8FnfrW00/i, event: 'claim_roadmap' },
    { match: /^mailto:/i, event: 'email_click' },
    { match: /linkedin\.com/i, event: 'social_click', extra: { network: 'linkedin' } },
    { match: /tiktok\.com/i, event: 'social_click', extra: { network: 'tiktok' } }
  ];

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i].match.test(href)) {
        var p = { link_url: href, link_text: (a.textContent || '').trim().slice(0, 60) };
        var x = RULES[i].extra;
        if (x) for (var k in x) p[k] = x[k];
        track(RULES[i].event, p);
        return;
      }
    }
  }, true);

  // Which FAQ questions get opened tells you what people are wondering about.
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.tagName === 'DETAILS' && d.open && d.closest('.faq')) {
      var q = d.querySelector('summary');
      track('faq_open', { question: q ? q.textContent.trim().slice(0, 90) : '' });
    }
  }, true);
})();
