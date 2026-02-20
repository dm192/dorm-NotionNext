import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { HashTag } from '@/components/HeroIcons'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'

export default function PostHeader({ post, siteInfo }) {
  if (!post) return <></>

  const headerImage = post?.pageCover || siteInfo?.pageCover
  const analyticsEnabled = siteConfig('ANALYTICS_BUSUANZI_ENABLE')

  return (
    <div id='post-bg' className='w-full relative z-10 mb-2'>
      <div className='aurora-post-hero-frame relative h-[22rem] md:h-[26rem] overflow-hidden'>
        <LazyImage
          id='post-cover'
          className='aurora-post-cover-image absolute inset-0 w-full h-full object-cover'
          src={headerImage}
          alt={post.title}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50' />
        <div className='aurora-post-cover-fade absolute inset-x-0 bottom-0 h-24 md:h-28 pointer-events-none' />

        <div className='absolute inset-x-0 bottom-0 p-4 md:p-6 max-w-[86rem] mx-auto'>
          <div className='aurora-glass px-4 md:px-6 py-4 md:py-5 text-white'>
            <div className='flex justify-center md:justify-start items-center gap-3 flex-wrap mb-3'>
              {post.category && (
                <SmartLink
                  href={`/category/${post.category}`}
                  className='aurora-chip px-3 py-1 text-xs font-bold text-white bg-white/20 hover:bg-white/30'>
                  {post.category}
                </SmartLink>
              )}

              {post.tagItems?.map(tag => (
                <SmartLink
                  key={tag.name}
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  className='inline-flex items-center text-xs text-white/90 hover:text-white'>
                  <HashTag className='w-3 h-3 mr-1 stroke-2' />
                  {tag.name}
                </SmartLink>
              ))}
            </div>

            <div className='max-w-5xl font-black text-2xl md:text-4xl leading-tight flex justify-center md:justify-start'>
              {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
              {post.title}
            </div>

            <section className='flex flex-wrap justify-center md:justify-start mt-4 text-xs md:text-sm text-white/90 gap-3'>
              <div className='mr-1'>
                <WordCount wordCount={post.wordCount} readTime={post.readTime} />
              </div>

              {post?.type !== 'Page' && (
                <SmartLink
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                  className='hover:underline'>
                  <i className='fa-regular fa-calendar mr-1' />
                  {post?.publishDay}
                </SmartLink>
              )}

              <div>
                <i className='fa-regular fa-calendar-check mr-1' />
                {post.lastEditedDay}
              </div>

              {analyticsEnabled && (
                <div className='busuanzi_container_page_pv'>
                  <i className='fa-solid fa-fire-flame-curved mr-1' />
                  <span className='busuanzi_value_page_pv' />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
