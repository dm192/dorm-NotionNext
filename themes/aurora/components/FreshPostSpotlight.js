import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

export default function FreshPostSpotlight({ latestPosts, siteInfo }) {
  const post = latestPosts?.[0]
  if (!post) return null

  const cover = post?.pageCoverThumbnail || siteInfo?.pageCover || '/favicon.ico'
  const views =
    Number(
      post?.views ??
        post?.view ??
        post?.visits ??
        post?.visit ??
        post?.pagePv ??
        post?.page_pv ??
        post?.pv ??
        0
    ) || 0

  return (
    <section className='mb-5'>
      <SmartLink href={post?.href} passHref className='block'>
        <article className='aurora-glass aurora-spotlight group overflow-hidden p-4 md:p-6 border transition-all'>
          <div className='flex flex-col md:flex-row md:items-stretch gap-4'>
            <div className='flex-1 min-w-0 flex flex-col justify-between'>
              <div>
                <div className='inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'>
                  <span className='inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
                  新鲜出炉
                </div>
                <h2 className='text-2xl md:text-3xl font-black leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-yellow-400'>
                  {post.title}
                </h2>
                <p className='mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300 line-clamp-2 font-medium'>
                  新鲜出炉的文章，快来看啊
                </p>
              </div>
              <div className='mt-3 flex items-center gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400'>
                <span>{post?.publishDay || post?.lastEditedDay || ''}</span>
                {views > 0 && (
                  <span className='inline-flex items-center px-2 py-0.5 rounded-full bg-white/50 dark:bg-slate-800/70 text-xs font-semibold'>
                    <i className='fas fa-fire mr-1' />
                    热度 {views}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full md:w-72 h-40 md:h-44 rounded-2xl overflow-hidden shrink-0'>
              <LazyImage
                src={cover}
                alt={post.title}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
            </div>
          </div>
        </article>
      </SmartLink>
    </section>
  )
}
