import React from 'react'

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const ShareList = ({ name = null, path, title, url = `https://jeffry.in${path}` }) => {
  const cleanedTitle = encodeURIComponent(title)
  return (
    <nav className={`share-list${name ? ` share-list--${name}` : ''}`}>
      <button className='share-list__button' onClick={() => copyToClipboard(url)}>
        Copy Link
      </button>
      <a className='share-list__link share-list__link--facebook' href={`https://www.facebook.com/sharer.php?u=${url}`}>
        Facebook
      </a>
      <a
        className='share-list__link share-list__link--twitter'
        href={`https://twitter.com/intent/tweet?url=${url}&text=${cleanedTitle}&via=@yowainwright`}
      >
        Twitter
      </a>
      <a
        className='share-list__link share-list__link--reddit'
        href={`https://reddit.com/submit?url=${url}&title=${cleanedTitle}`}
      >
        Reddit
      </a>
    </nav>
  )
}

export default ShareList
