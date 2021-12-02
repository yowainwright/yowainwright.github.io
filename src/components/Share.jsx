import React from 'react'

export function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export function Share({ path, title, url = 'https://jeffry.in' }) {
  const shareUrl = path && url ? url + '/' + path : url
  const cleanedTitle = encodeURIComponent(title)

  function onBtnClick() {
    copyToClipboard(url)
  }

  return (
    <section className='share'>
      <h3 className='share__title'>Sharing is caring! 💘</h3>
      <nav className='share__nav'>
        <button className='share__button' onClick={onBtnClick}>
          Copy Link
        </button>
        <a className='share__link share__link--facebook' href={`https://www.facebook.com/sharer.php?u=${shareUrl}}`}>
          Facebook
        </a>
        <a
          className='share__link share__link--twitter'
          href={`https://twitter.com/intent/tweet?url=${shareUrl}}&text=${cleanedTitle}&via=@yowainwright`}
        >
          Twitter
        </a>
        <a
          className='share__link share__link--reddit'
          href={`https://reddit.com/submit?url=${shareUrl}}&title=${cleanedTitle}`}
        >
          Reddit
        </a>
      </nav>
    </section>
  )
}
