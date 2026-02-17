import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, className } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  const author = siteConfig('AUTHOR')
  const bio = siteConfig('BIO')

  return (
    <Card
      className={`${className || ''} aurora-glass wow fadeInUp text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden relative`}>
      <div className='flex justify-between items-start gap-3'>
        <div className='min-w-0 space-y-3'>
          <div className='aurora-float-panel inline-flex'>
            <GreetingsWords />
          </div>
          <div className='aurora-float-panel px-3 py-2'>
            <h2 className='text-2xl md:text-3xl font-black truncate'>{author}</h2>
          </div>
          <div className='aurora-float-panel px-3 py-2'>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-6'>
              {bio}
            </p>
          </div>
        </div>

        <div
          className={`${isSlugPage ? 'absolute right-0 -mt-8 -mr-6 hover:opacity-80 hover:scale-110' : 'cursor-pointer'} justify-center items-center flex transform transitaion-all duration-200`}>
          <div className='aurora-float-panel p-1.5'>
            <LazyImage
              src={siteInfo?.icon || '/avatar.svg'}
              className='rounded-2xl border border-white/40 shadow-md'
              width={isSlugPage ? 104 : 72}
              height={isSlugPage ? 104 : 72}
              alt={author}
            />
          </div>
        </div>
      </div>

      <div className='mt-4 aurora-float-panel px-3 py-2'>
        <Announcement post={props.notice} />
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex space-x-3'>
          {/* 两个社交按钮 */}
          {url1 && (
            <div className='aurora-float-panel w-10 text-center bg-white/55 dark:bg-slate-800/65 p-2 rounded-lg transition-colors duration-200 hover:bg-white dark:hover:bg-black'>
              <SmartLink href={url1}>
                <i className={icon1} />
              </SmartLink>
            </div>
          )}
          {url2 && (
            <div className='aurora-float-panel bg-white/55 dark:bg-slate-800/65 p-2 rounded-lg w-10 items-center flex justify-center transition-colors duration-200 hover:bg-white dark:hover:bg-black'>
              <SmartLink href={url2}>
                <i className={icon2} />
              </SmartLink>
            </div>
          )}
        </div>
        {/* 第三个按钮 */}
        <MoreButton />
      </div>
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <SmartLink href={url3}>
      <div
        className={
          'aurora-float-panel group bg-white/55 dark:bg-slate-800/65 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-lg space-x-1'
        }>
        <ArrowRightCircle
          className={
            'group-hover:stroke-black dark:group-hover:stroke-white w-5 h-5 transition-all duration-100'
          }
        />
        <div className='font-bold'>{text3}</div>
      </div>
    </SmartLink>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className='select-none inline-flex cursor-pointer py-1 px-2 bg-white/55 dark:bg-slate-800/65 hover:bg-white dark:hover:text-white dark:hover:bg-black text-sm rounded-lg duration-200 transition-colors'>
      {greeting}
    </div>
  )
}
