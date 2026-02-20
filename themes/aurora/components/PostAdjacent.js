import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

export default function PostAdjacent({ prev, next }) {
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()
  const { locale } = useGlobal()

  useEffect(() => {
    setIsShow(false)
  }, [router])

  useEffect(() => {
    const articleEnd = document.getElementById('article-end')
    const footerBottom = document.getElementById('footer-bottom')

    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.target === articleEnd && entry.isIntersecting) setIsShow(true)
        if (entry.target === footerBottom && entry.isIntersecting) setIsShow(false)
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    })
    if (articleEnd) observer.observe(articleEnd)
    if (footerBottom) observer.observe(footerBottom)
    return () => {
      if (articleEnd) observer.unobserve(articleEnd)
      if (footerBottom) observer.unobserve(footerBottom)
      observer.disconnect()
    }
  }, [])

  if (!prev || !next || !siteConfig('AURORA_ARTICLE_ADJACENT', null, CONFIG)) {
    return <></>
  }

  return (
    <div id='article-end'>
      <section className='lg:hidden pt-8 text-xs md:text-sm flex flex-col m-1 gap-2'>
        <SmartLink
          href={`/${prev.slug}`}
          passHref
          className='aurora-glass aurora-hover-lift px-5 py-5 items-start dark:text-white flex flex-col w-full'>
          <div className='text-xs text-gray-500 dark:text-gray-300'>{locale.COMMON.PREV_POST}</div>
          <div className='text-base font-bold mt-1'>{prev.title}</div>
        </SmartLink>
        <SmartLink
          href={`/${next.slug}`}
          passHref
          className='aurora-glass aurora-hover-lift px-5 py-5 items-start dark:text-white flex flex-col w-full'>
          <div className='text-xs text-gray-500 dark:text-gray-300'>{locale.COMMON.NEXT_POST}</div>
          <div className='text-base font-bold mt-1'>{next.title}</div>
        </SmartLink>
      </section>

      <div
        id='pc-next-post'
        className={`${isShow ? 'mb-5 opacity-100' : '-mb-24 opacity-0'} hidden md:block fixed z-40 right-8 bottom-4 duration-200 transition-all`}>
        <SmartLink
          href={`/${next.slug}`}
          className='aurora-glass aurora-hover-lift text-sm block p-4 w-80 min-h-28 cursor-pointer dark:text-gray-200'>
          <div className='font-semibold'>{locale.COMMON.NEXT_POST}</div>
          <hr className='mt-2 mb-3 border-white/25 dark:border-white/10' />
          <div className='line-clamp-2'>{next?.title}</div>
        </SmartLink>
      </div>
    </div>
  )
}
