import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import NotByAI from '@/components/NotByAI'

export default function PostCopyright() {
  const router = useRouter()
  const [path, setPath] = useState(siteConfig('LINK') + router.asPath)
  const { locale } = useGlobal()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.href)
    }
  }, [])

  if (!siteConfig('AURORA_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }

  return (
    <section className='dark:text-gray-300 mt-6 mx-1'>
      <ul className='aurora-glass overflow-x-auto whitespace-nowrap text-sm p-5 leading-8 border-l-2 border-indigo-500 dark:border-yellow-500'>
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <SmartLink href='/about' className='hover:underline'>
            {siteConfig('AUTHOR')}
          </SmartLink>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a className='whitespace-normal break-words hover:underline' href={path}>
            {path}
          </a>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          {locale.COMMON.COPYRIGHT_NOTICE}
        </li>
        {siteConfig('AURORA_ARTICLE_NOT_BY_AI', false, CONFIG) && (
          <li>
            <NotByAI />
          </li>
        )}
      </ul>
    </section>
  )
}
