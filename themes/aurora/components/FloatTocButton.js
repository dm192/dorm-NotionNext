import { useState } from 'react'
import Catalog from './Catalog'

export default function FloatTocButton(props) {
  const [tocVisible, changeTocVisible] = useState(false)
  const { post } = props

  const toggleToc = () => changeTocVisible(!tocVisible)
  if (!post || !post.toc || post.toc.length < 1) return <></>

  return (
    <div className='fixed lg:hidden right-4 bottom-24 z-40'>
      <button
        type='button'
        onClick={toggleToc}
        className='aurora-glass aurora-btn w-11 h-11 select-none hover:scale-105 transform duration-200 text-black dark:text-gray-200 flex justify-center items-center'>
        <i id='toc-button' className='fa-list-ol cursor-pointer fas' />
      </button>

      <div
        className={`fixed top-0 right-0 z-40 ${tocVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`aurora-glass w-64 rounded-2xl overflow-hidden duration-200 fixed right-4 bottom-12 p-2 ${
            tocVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
          }`}>
          <div className='dark:text-gray-400 text-gray-600'>
            <Catalog toc={post.toc} />
          </div>
        </div>
      </div>

      <div
        id='right-drawer-background'
        className={(tocVisible ? 'block' : 'hidden') + ' fixed top-0 left-0 z-30 w-full h-full bg-black/20'}
        onClick={toggleToc}
      />
    </div>
  )
}
