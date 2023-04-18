import React, { useEffect, useState } from 'react'

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
  const shareLinkText = 'Share Article Link'
  const copied = 'Copied!'
  const [copyText, setCopyText] = useState(shareLinkText)
  const [isCopied, setIsCopied] = useState(false)
  const shareUrl = `${url}${path}`
  function onBtnClick() {
    copyToClipboard(shareUrl)
    setIsCopied(true)
    setCopyText(copied)
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isCopied && copyText !== shareLinkText) {
      setCopyText(shareLinkText)
    }
  }, [copyText, isCopied, setIsCopied, setCopyText, shareLinkText])

  return (
    <section className='share'>
      <nav className='share__nav'>
        <button className='share__button' onClick={onBtnClick}>
          {copyText}
        </button>
      </nav>
    </section>
  )
}
