import { siteConfig } from '@/lib/config'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import { Fragment, useEffect, useRef, useState } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'
import { useGlobal } from '@/lib/global'
import { createPortal } from 'react-dom'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  const { locale } = useGlobal()
  const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
  const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
  const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')
  const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
  const CONTACT_WEIBO = siteConfig('CONTACT_WEIBO')
  const CONTACT_INSTAGRAM = siteConfig('CONTACT_INSTAGRAM')
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const ENABLE_RSS = siteConfig('ENABLE_RSS')
  const CONTACT_BILIBILI = siteConfig('CONTACT_BILIBILI')
  const CONTACT_YOUTUBE = siteConfig('CONTACT_YOUTUBE')
  const POST_SHARE_BAR_ENABLE = JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE', true))

  const emailIcon = useRef(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById('theme-aurora') || document.body
      : null

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!shareOpen) return
    const onKeyDown = e => {
      if (e.key === 'Escape') setShareOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shareOpen])

  return (
    <div className='w-full justify-center flex-wrap flex'>
      <div className='space-x-12 text-3xl text-gray-600 dark:text-gray-300 '>
        {CONTACT_GITHUB && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'github'}
            href={CONTACT_GITHUB}>
            <i className='transform hover:scale-125 duration-150 fab fa-github dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_TWITTER && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'twitter'}
            href={CONTACT_TWITTER}>
            <i className='transform hover:scale-125 duration-150 fab fa-twitter dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_TELEGRAM && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_TELEGRAM}
            title={'telegram'}>
            <i className='transform hover:scale-125 duration-150 fab fa-telegram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_LINKEDIN && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_LINKEDIN}
            title={'linkIn'}>
            <i className='transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_WEIBO && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'weibo'}
            href={CONTACT_WEIBO}>
            <i className='transform hover:scale-125 duration-150 fab fa-weibo dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_INSTAGRAM && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'instagram'}
            href={CONTACT_INSTAGRAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-instagram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            title='email'
            className='cursor-pointer'
            ref={emailIcon}>
            <i className='transform hover:scale-125 duration-150 fas fa-envelope dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {ENABLE_RSS && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'RSS'}
            href={'/rss/feed.xml'}>
            <i className='transform hover:scale-125 duration-150 fas fa-rss dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {POST_SHARE_BAR_ENABLE && (
          <button
            type='button'
            aria-label='share'
            title={locale?.COMMON?.SHARE || '分享'}
            onClick={() => setShareOpen(true)}>
            <i className='transform hover:scale-125 duration-150 fas fa-share-alt dark:hover:text-indigo-400 hover:text-indigo-600' />
          </button>
        )}
        {CONTACT_BILIBILI && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'bilibili'}
            href={CONTACT_BILIBILI}>
            <i className='transform hover:scale-125 duration-150 fab fa-bilibili dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_YOUTUBE && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'youtube'}
            href={CONTACT_YOUTUBE}>
            <i className='transform hover:scale-125 duration-150 fab fa-youtube dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
      </div>

      {mounted &&
        portalTarget &&
        createPortal(
          <Transition show={shareOpen} as={Fragment}>
        <div className='fixed inset-0 z-[100]'>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity duration-220'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-180'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div
              className='absolute inset-0 bg-black/35 backdrop-blur-[1px]'
              onClick={() => setShareOpen(false)}
            />
          </Transition.Child>

          <div className='absolute inset-0 flex items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='transition duration-260 ease-out'
              enterFrom='opacity-0 translate-y-4 scale-95'
              enterTo='opacity-100 translate-y-0 scale-100'
              leave='transition duration-180 ease-in'
              leaveFrom='opacity-100 translate-y-0 scale-100'
              leaveTo='opacity-0 translate-y-3 scale-95'>
              <div className='aurora-share-modal aurora-glass w-full max-w-xl p-4 md:p-5 rounded-3xl border border-white/55 bg-white/70 dark:border-slate-400/35 dark:bg-slate-900/70 shadow-2xl backdrop-blur-xl'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-base md:text-lg font-bold text-gray-800 dark:text-gray-100'>
                    {locale?.COMMON?.SHARE || '分享'}
                  </h3>
                  <button
                    type='button'
                    onClick={() => setShareOpen(false)}
                    className='aurora-btn aurora-glass px-2.5 py-1 text-sm text-gray-600 dark:text-gray-300'>
                    <i className='fas fa-times' />
                  </button>
                </div>
                <div className='max-h-[55vh] overflow-y-auto py-1'>
                  <div className='flex flex-wrap'>
                    <ShareButtons post={{}} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>,
          portalTarget
        )}
    </div>
  )
}
export default SocialButton
