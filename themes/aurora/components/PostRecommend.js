import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

export default function PostRecommend({ recommendPosts, siteInfo }) {
  const { locale } = useGlobal()

  if (
    !siteConfig('AURORA_ARTICLE_RECOMMEND', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length === 0
  ) {
    return <></>
  }

  return (
    <section className='pt-8 hidden md:block'>
      <div className='mb-3 px-1 flex items-center'>
        <div className='dark:text-gray-300 text-lg font-bold'>
          <i className='mr-2 fas fa-thumbs-up' />
          {locale.COMMON.RELATE_POSTS}
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {recommendPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail || siteInfo?.pageCover
          return (
            <SmartLink
              key={post?.id}
              title={post?.title}
              href={post?.href}
              passHref
              className='aurora-glass aurora-hover-lift flex h-44 cursor-pointer overflow-hidden'>
              <div className='h-full w-full relative group'>
                <LazyImage
                  src={headerImage}
                  alt={post.title}
                  className='absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/65' />
                <div className='relative z-10 h-full w-full flex items-end p-4'>
                  <div className='text-base font-bold text-white line-clamp-2'>
                    {post.title}
                  </div>
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </section>
  )
}
