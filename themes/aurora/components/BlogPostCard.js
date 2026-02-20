import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import NotionIcon from './NotionIcon'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('AURORA_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap

  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('AURORA_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }

  const showPageCover =
    siteConfig('AURORA_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const POST_TWO_COLS = siteConfig('AURORA_HOME_POST_TWO_COLS', true, CONFIG)
  const COVER_HOVER_ENLARGE = siteConfig(
    'AURORA_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article className={`aurora-post-card ${COVER_HOVER_ENLARGE ? 'aurora-hover-lift' : ''}`}>
      <div
        data-wow-delay='.2s'
        className={`aurora-glass wow fadeInUp border flex mb-4 flex-col h-[23rem] md:h-52 md:flex-row group w-full duration-300 transition-all justify-between overflow-hidden ${
          POST_TWO_COLS ? '2xl:h-96 2xl:flex-col' : ''
        }`}>
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div
              className={`w-full md:w-5/12 overflow-hidden cursor-pointer select-none relative ${
                POST_TWO_COLS ? '2xl:w-full' : ''
              }`}>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500 ease-in-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-40 pointer-events-none' />
            </div>
          </SmartLink>
        )}

        <div
          className={`flex p-5 md:p-6 flex-col justify-between h-48 md:h-full w-full md:w-7/12 ${
            POST_TWO_COLS ? '2xl:p-4 2xl:h-48 2xl:w-full' : ''
          }`}>
          <header>
            {post?.category && (
              <div className='flex mb-2 items-center hidden md:block flex-wrap text-gray-500 dark:text-gray-300'>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='aurora-chip cursor-pointer text-sm font-semibold'>
                  {post.category}
                </SmartLink>
              </div>
            )}

            <SmartLink
              href={post?.href}
              passHref
              className='group-hover:text-indigo-700 dark:group-hover:text-yellow-500 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-xl font-black leading-tight'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className='aurora-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]'
                />
              )}
              <span className='menu-link'>{post.title}</span>
            </SmartLink>
          </header>

          {(!showPreview || showSummary) && (
            <main className='line-clamp-2 replace text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-2'>
              {post.summary}
            </main>
          )}

          <div className='md:flex-nowrap flex-wrap md:justify-start inline-block mt-2'>
            <div>
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
