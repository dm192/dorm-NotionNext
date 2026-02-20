import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/**
 * 分享栏
 * @param {} param0
 * @returns
 */
const ShareBar = ({ post }) => {
  const { locale } = useGlobal()
  const [open, setOpen] = useState(false)
  const ENABLE_RSS = siteConfig('ENABLE_RSS')

  if (
    !JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) ||
    !post ||
    post?.type !== 'Post'
  ) {
    return <></>
  }

  return (
    <>
      <div className='m-1 overflow-x-auto'>
        <div className='flex w-full md:justify-end items-center gap-2'>
          {ENABLE_RSS && (
            <a
              className='aurora-btn aurora-glass inline-flex items-center px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200'
              title='RSS'
              href='/rss/feed.xml'
              target='_blank'
              rel='noreferrer'>
              <i className='fas fa-rss mr-2' />
              {locale?.NAV?.RSS || locale?.COMMON?.RSS || 'RSS'}
            </a>
          )}
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='aurora-btn aurora-glass inline-flex items-center px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200'>
            <i className='fas fa-share-alt mr-2' />
            {locale?.COMMON?.SHARE || '分享'}
          </button>
        </div>
      </div>

      <Transition show={open} as={Fragment}>
        <div className='fixed inset-0 z-[90]'>
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
              onClick={() => setOpen(false)}
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
              <div className='aurora-glass w-full max-w-xl p-4 md:p-5'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-base md:text-lg font-bold text-gray-800 dark:text-gray-100'>
                    {locale?.COMMON?.SHARE || '分享'}
                  </h3>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='aurora-btn aurora-glass px-2.5 py-1 text-sm text-gray-600 dark:text-gray-300'>
                    <i className='fas fa-times' />
                  </button>
                </div>
                <div className='max-h-[55vh] overflow-y-auto py-1'>
                  <div className='flex flex-wrap'>
                    <ShareButtons post={post} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </>
  )
}
export default ShareBar
