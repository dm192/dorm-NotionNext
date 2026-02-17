import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import SocialButton from './SocialButton'

const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')
  const BIO = siteConfig('BIO')

  return (
    <footer className='relative flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm text-gray-700 dark:text-gray-100 mt-8'>
      <div id='color-transition' className='h-16' />

      <div className='w-full max-w-[86rem] mx-auto px-5 pb-4'>
        <div className='aurora-glass py-4 px-4 md:px-6'>
          <SocialButton />
        </div>
      </div>

      <div className='w-full max-w-[86rem] mx-auto px-5 pb-6'>
        <div
          id='footer-bottom'
          className='aurora-glass w-full flex flex-col p-4 lg:flex-row justify-between px-6 items-center gap-3'>
          <div id='footer-bottom-left' className='text-center lg:text-start'>
            <PoweredBy />
            <div className='flex gap-x-1 flex-wrap justify-center lg:justify-start'>
              <CopyRightDate />
              <SmartLink href='/about' className='underline font-semibold dark:text-gray-300'>
                {siteConfig('AUTHOR')}
              </SmartLink>
              {BIO && <span className='mx-1'> | {BIO}</span>}
            </div>
          </div>

          <div id='footer-bottom-right' className='text-center lg:text-right'>
            {BEI_AN && (
              <>
                <i className='fas fa-shield-alt' />{' '}
                <a href={BEI_AN_LINK} className='mr-2'>
                  {siteConfig('BEI_AN')}
                </a>
              </>
            )}
            <BeiAnGongAn />

            <span className='hidden busuanzi_container_site_pv'>
              <i className='fas fa-eye' />
              <span className='px-1 busuanzi_value_site_pv'> </span>
            </span>
            <span className='pl-2 hidden busuanzi_container_site_uv'>
              <i className='fas fa-users' />
              <span className='px-1 busuanzi_value_site_uv'> </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
