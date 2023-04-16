import React from 'react'

export function copyToClipboard(str: string) {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

interface ShareProps {
  path: string
  url?: string
};

export function Share({ path, url = 'https://jeffry.in' }: ShareProps) {
  const shareUrl = path && url ? `${url}${path}` : url

  function onBtnClick() {
    copyToClipboard(shareUrl)
  }

  return (
    <section className='share'>
      <h3 className='share__title'>Sharing is caring! 💘</h3>
      <nav className='share__nav'>
        <button className='share__button' onClick={onBtnClick}>
          Copy Link
        </button>
      </nav>
    </section>
  )
}
