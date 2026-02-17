import FlipCard from '@/components/FlipCard'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

export default function TouchMeCard() {
  if (!JSON.parse(siteConfig('HEO_SOCIAL_CARD', null, CONFIG))) return <></>

  return (
    <div className='relative h-28 text-white flex flex-col'>
      <FlipCard
        className='aurora-glass cursor-pointer lg:p-6 p-4 border'
        frontContent={
          <div className='h-full relative'>
            <h2 className='font-black text-2xl'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_1', null, CONFIG)}
            </h2>
            <h3 className='pt-1 text-sm opacity-90'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_2', null, CONFIG)}
            </h3>
            <div
              className='absolute left-0 top-0 w-full h-full opacity-30'
              style={{
                background:
                  'url(https://bu.dusays.com/2023/05/16/64633c4cd36a9.png) center center no-repeat'
              }}
            />
          </div>
        }
        backContent={
          <SmartLink href={siteConfig('HEO_SOCIAL_CARD_URL', null, CONFIG)}>
            <div className='font-black text-lg h-full flex items-center justify-center'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_3', null, CONFIG)}
            </div>
          </SmartLink>
        }
      />
    </div>
  )
}
