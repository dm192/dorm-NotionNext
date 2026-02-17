import { useState } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { ChevronDoubleRight } from '@/components/HeroIcons'

const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const { locale } = useGlobal()
  const currentPage = +page
  const showNext = page < totalPage
  const showPrev = currentPage !== 1
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')
  const pages = generatePages(pagePrefix, page, currentPage, totalPage)

  const [value, setValue] = useState('')
  const handleInputChange = event => {
    setValue(event.target.value.replace(/[^0-9]/g, ''))
  }
  const jumpToPage = () => {
    if (!value) return
    router.push(value === '1' ? `${pagePrefix}/` : `${pagePrefix}/page/${value}`)
  }

  return (
    <>
      <div className='hidden lg:flex justify-between items-end mt-8 text-black dark:text-gray-200 pt-3 space-x-2 overflow-x-auto'>
        <SmartLink
          href={{
            pathname:
              currentPage === 2 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='prev'
          className={`${currentPage === 1 ? 'invisible' : 'block'}`}>
          <div className='aurora-glass aurora-btn relative min-w-24 h-10 flex items-center justify-center px-3 cursor-pointer group text-sm font-semibold'>
            <i className='fas fa-angle-left mr-2 transition-all duration-200 transform group-hover:-translate-x-3' />
            <div className='absolute translate-x-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
              {locale.PAGINATION.PREV}
            </div>
          </div>
        </SmartLink>

        <div className='flex items-center space-x-2'>
          {pages}
          <div className='aurora-glass h-10 border flex items-center aurora-btn group'>
            <input
              value={value}
              className='w-0 group-hover:w-20 group-hover:px-3 transition-all duration-200 bg-transparent border-none outline-none h-full'
              onInput={handleInputChange}
            />
            <button
              type='button'
              onClick={jumpToPage}
              className='aurora-btn cursor-pointer px-3 py-2 hover:bg-indigo-600 hover:text-white dark:hover:bg-yellow-600 transition-colors'>
              <ChevronDoubleRight className='w-4 h-4' />
            </button>
          </div>
        </div>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='next'
          className={`${showNext ? 'block' : 'invisible'}`}>
          <div className='aurora-glass aurora-btn relative min-w-24 h-10 flex items-center justify-center px-3 cursor-pointer group text-sm font-semibold'>
            <i className='fas fa-angle-right mr-2 transition-all duration-200 transform group-hover:translate-x-3' />
            <div className='absolute -translate-x-8 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-2'>
              {locale.PAGINATION.NEXT}
            </div>
          </div>
        </SmartLink>
      </div>

      <div className='lg:hidden w-full flex flex-row gap-3 mt-6'>
        <SmartLink
          href={{
            pathname:
              currentPage === 2 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='prev'
          className={`${showPrev ? 'block' : 'hidden'} aurora-glass aurora-btn dark:text-white relative w-full flex-1 h-12 flex items-center justify-center cursor-pointer text-sm font-semibold`}>
          {locale.PAGINATION.PREV}
        </SmartLink>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='next'
          className={`${showNext ? 'block' : 'hidden'} aurora-glass aurora-btn dark:text-white relative w-full flex-1 h-12 flex items-center justify-center cursor-pointer text-sm font-semibold`}>
          {locale.PAGINATION.NEXT}
        </SmartLink>
      </div>
    </>
  )
}

function getPageElement(page, currentPage, pagePrefix) {
  if (!page) return <></>
  const selected = page + '' === currentPage + ''
  return (
    <SmartLink
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      key={page}
      passHref
      className={`aurora-btn px-4 border py-2 text-sm font-semibold transition-colors ${
        selected
          ? 'bg-indigo-600 dark:bg-yellow-600 text-white'
          : 'aurora-glass text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-yellow-600'
      }`}>
      {page}
    </SmartLink>
  )
}

function generatePages(pagePrefix, page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7
  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, page, pagePrefix))
    }
  } else {
    pages.push(getPageElement(1, page, pagePrefix))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) startPage = 2
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) pages.push(<div key={-1}>...</div>)
    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page, pagePrefix))
      }
    }
    if (startPage + dynamicGroupCount < totalPage) pages.push(<div key={-2}>...</div>)
    pages.push(getPageElement(totalPage, page, pagePrefix))
  }
  return pages
}

export default PaginationNumber
