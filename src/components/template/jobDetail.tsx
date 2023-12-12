import { ThemeContext } from '@/contexts/themeContext'
import parse from 'html-react-parser'
import { useContext } from 'react'
import FooterBuilder from '../footer'
import NavBuilder from '../nav'
import { GetColorFromTheme, GetHeaderColor } from '@/utilities/color'
import Link from 'next/link'
interface Props {
    site: SiteInterface
    jobDetail: JobDetailType
}
const JobDetailPageBuilder = ({ site, jobDetail }: Props) => {
    const { pages, navigation, siteIntro, settings, footer, socialMedia } = site
    const name = pages[0].name
    const { theme } = useContext(ThemeContext)
    const CustomTag = 'customer-site' as keyof JSX.IntrinsicElements;
    return <main contextMenu={name} className={theme?.font.toLocaleLowerCase().replaceAll(' ', '-') ?? 'open-sans'}>

        <CustomTag >
            <NavBuilder navData={{ navigation }} settings={{ ...settings }} isDetailPage></NavBuilder>
            <div className='container mt-[58px] text-center py-[16px] space-y-2'>
                <div className='font-bold text-[24px] job-detail-title'>{jobDetail.name}</div>
                <div className=''>{jobDetail.location.streetAddress} {jobDetail.location.addressLocality} {jobDetail.location.addressRegion} {jobDetail.location.postcode}</div>
                <div className=''>{jobDetail.type}</div>
            </div>
            <div className='container mt-[16px] border-t-[1px] job-detail'>
                <div className='font-semibold text-[18px] mb-[10px]'>Job description</div>
                {parse(jobDetail.detailHTML ?? '')}
            </div>
        </CustomTag>
        {/* apply section will be here */}
        <div className='flex justify-center p-[16px] gap-4 border-t-[1px] job-detail-action'>
            <button className="p-4 rounded-md min-w-[160px]"
                style={{
                    color: GetColorFromTheme('headerBackgroundColor', theme),
                    border: `1px solid ${GetColorFromTheme('headerBackgroundColor', theme)}`
                }}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('share')
                }}>Share</button>
            <Link href={jobDetail.applyUrl} target='_blank' className="p-4 rounded-md min-w-[160px] font-semibold text-center" style={{ backgroundColor: GetColorFromTheme('headerBackgroundColor', theme), color: GetHeaderColor(theme) }}>Apply Now</Link>
        </div>
        {!settings.hideFooter && <FooterBuilder footer={{ sections: footer.sections }} socialMedia={socialMedia} />}
    </main>
}

export default JobDetailPageBuilder