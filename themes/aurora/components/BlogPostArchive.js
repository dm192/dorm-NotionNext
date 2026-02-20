import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostArchive = ({ posts = [], archiveTitle, siteInfo }) => {
  if (!posts || posts.length === 0) return <></>

  return (
    <div>
      <div className='pb-4 dark:text-gray-300 text-xl font-bold' id={archiveTitle}>
        {archiveTitle}
      </div>
      <ul className='space-y-3'>
        {posts.map(post => {
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

          return (
            <li
              key={post.id}
              className='aurora-glass aurora-hover-lift cursor-pointer flex flex-row h-24 md:h-28 group w-full transition-all justify-between overflow-hidden p-2'>
              {showPageCover && (
                <SmartLink href={post?.href} passHref legacyBehavior>
                  <LazyImage
                    className='aurora-btn bg-center bg-cover w-40 h-full object-cover'
                    src={post?.pageCoverThumbnail}
                    alt={post.title}
                  />
                </SmartLink>
              )}

              <div className='flex px-3 py-1 flex-col justify-between w-full min-w-0'>
                <div>
                  {post?.category && (
                    <div className='hidden md:block text-xs font-semibold text-gray-500 dark:text-gray-300 mb-1'>
                      <SmartLink passHref href={`/category/${post.category}`} className='aurora-chip px-2 py-1'>
                        {post.category}
                      </SmartLink>
                    </div>
                  )}
                  <SmartLink
                    href={post?.href}
                    passHref
                    className='group-hover:text-indigo-700 dark:group-hover:text-yellow-500 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-lg font-bold leading-tight'>
                    <span className='menu-link'>{post.title}</span>
                  </SmartLink>
                </div>

                <div className='inline-block mt-1'>
                  {post.tagItems?.map(tag => (
                    <TagItemMini key={tag.name} tag={tag} />
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogPostArchive
