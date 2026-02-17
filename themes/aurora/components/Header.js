import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'
import { isBrowser } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import RandomPostButton from './RandomPostButton'
import SearchButton from './SearchButton'
import DarkModeButton from './DarkModeButton'
import SlideOver from './SlideOver'

const Header = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const slideOverRef = useRef()
  const scrollTriggerRef = useRef(null)

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  useEffect(() => {
    const handler = throttle(() => {
      const scrollY = window.scrollY
      setFixedNav(scrollY > 1 || Boolean(document?.querySelector('#post-bg')))
    }, 80)

    scrollTriggerRef.current = handler
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current()
    }
  }, [router])

  useEffect(() => {
    let prevScrollY = 0
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        const current = window.scrollY
        setActiveIndex(current > prevScrollY ? 1 : 0)
        prevScrollY = current
        ticking = false
      })
      ticking = true
    }
    if (isBrowser) window.addEventListener('scroll', handleScroll)
    return () => {
      if (isBrowser) window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {fixedNav && !document?.querySelector('#post-bg') && <div className='h-16' />}

      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full duration-300 transition-all ${
          fixedNav ? 'fixed' : 'relative'
        } ${fixedNav ? 'aurora-glass border-b border-white/25 dark:border-white/10' : 'bg-transparent'}`}>
        <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-4 md:px-6'>
          <Logo {...props} />

          <div className='hidden lg:flex flex-grow flex-col items-center justify-center h-full relative w-full'>
            <div
              className={`absolute transition-all duration-500 ${
                activeIndex === 0 ? 'opacity-100 mt-0' : '-mt-16 opacity-0 invisible'
              }`}>
              <MenuListTop {...props} />
            </div>
            <div
              className={`absolute transition-all duration-500 ${
                activeIndex === 1 ? 'opacity-100 mb-0' : '-mb-16 opacity-0 invisible'
              }`}>
              <h1 className='font-semibold text-center text-sm text-gray-600 dark:text-gray-300'>
                {siteConfig('AUTHOR') || siteConfig('TITLE')}
                {siteConfig('BIO') ? ` | ${siteConfig('BIO')}` : ''}
              </h1>
            </div>
          </div>

          <div className='flex flex-shrink-0 justify-end items-center gap-2 md:gap-3'>
            <RandomPostButton {...props} />
            <SearchButton {...props} />
            {!JSON.parse(siteConfig('THEME_SWITCH')) && (
              <div className='hidden md:block'>
                <DarkModeButton {...props} />
              </div>
            )}

            <button
              type='button'
              onClick={toggleMenuOpen}
              className='aurora-btn flex lg:hidden w-9 justify-center items-center h-9 cursor-pointer aurora-glass'>
              <i className='fas fa-bars' />
            </button>
          </div>

          <SlideOver cRef={slideOverRef} {...props} />
        </div>
      </nav>
    </>
  )
}

export default Header
