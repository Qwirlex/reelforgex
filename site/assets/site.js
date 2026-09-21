// Язык: сохранённый выбор → язык браузера → английский
(function () {
  var root = document.documentElement
  var saved = null
  try { saved = localStorage.getItem('rfx-lang') } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en')
  function apply(l) {
    root.setAttribute('data-lang', l)
    root.setAttribute('lang', l)
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === l)) })
  }
  apply(lang)
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang button')
    if (!b) return
    apply(b.dataset.set)
    try { localStorage.setItem('rfx-lang', b.dataset.set) } catch (err) {}
  })
})()

// Кнопки «Скачать»: ссылка на установщик из последнего релиза GitHub
;(function () {
  var fallback = 'https://github.com/Qwirlex/reelforgex/releases/latest'
  var links = document.querySelectorAll('[data-download]')
  links.forEach(function (a) { a.href = fallback })
  fetch('https://api.github.com/repos/Qwirlex/reelforgex/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (rel) {
      if (!rel) return
      var exe = (rel.assets || []).filter(function (x) { return /\.exe$/i.test(x.name) })[0]
      if (!exe) return
      var mb = Math.round(exe.size / 1024 / 1024)
      var v = String(rel.tag_name || '').replace(/^v/, '')
      links.forEach(function (a) { a.href = exe.browser_download_url })
      document.querySelectorAll('[data-version]').forEach(function (el) {
        el.textContent = (el.dataset.version === 'ru' ? 'Версия ' : 'Version ') + v + ' · ' + mb + ' MB'
      })
    })
    .catch(function () {})
})()
