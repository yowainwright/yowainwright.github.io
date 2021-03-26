import React from 'react'

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const Share = ({ name = null, path, title, url = `https://jeffry.in${path}` }) => {
  const cleanedTitle = encodeURIComponent(title)
  return (
    <section className="share">
      <h3 className="share__title">Share!</h3>
    <nav className='share__nav'>
      <button className='share__button' onClick={() => copyToClipboard(url)}>
        Copy Link
      </button>
      <a className='share__link share__link--facebook' href={`https://www.facebook.com/sharer.php?u=${url}`}>
        Facebook
      </a>
      <a
        className='share__link share__link--twitter'
        href={`https://twitter.com/intent/tweet?url=${url}&text=${cleanedTitle}&via=@yowainwright`}
      >
        Twitter
      </a>
      <a
        className='share__link share__link--reddit'
        href={`https://reddit.com/submit?url=${url}&title=${cleanedTitle}`}
      >
        Reddit
      </a>
    </nav>
    </section>
  )
}
