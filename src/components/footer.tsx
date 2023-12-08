import { useContext } from "react"
import Section from "./section"
import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme, GetHeaderColor } from "@/utilities/color"
import Link from "next/link";
import { FacebookIcon , InstagramIcon , LinkedInIcon, TwitterXIcon, YoutubeIcon } from "./icon/socialMediaIcon";

interface FooterInterface {
    footer: { sections: ISection[] };
    socialMedia: ISocialMedia;
}
const GenerateSocialMedia = () => {
    return <div> </div>
}

const FooterBuilder = ({ footer, socialMedia }: FooterInterface) => {
    console.log('socialMedia',socialMedia)
    const { theme } = useContext(ThemeContext)
    const sections = footer.sections
    console.log('theme',theme)
    return <div
        className="relative flex flex-col items-center justify-center mx-auto px-[100px] py-[20px] z-20"
        style={{
            backgroundColor: theme?.footerBackgroundColor ? GetColorFromTheme(theme?.footerBackgroundColor, theme) : 'black',
            color: GetHeaderColor(theme)
        }}>
        <div className="flex flex-row gap-10 footerSocialMedia mt-[20px]">
            {   socialMedia.facebook.link && <Link href={socialMedia.facebook.link} target='_blank'><FacebookIcon className="w-10 h-10" fill={GetHeaderColor(theme)}></FacebookIcon></Link> }
            {   socialMedia.instagram.link && <Link href={socialMedia.instagram.link} target='_blank'><InstagramIcon className="w-10 h-10"  fill={GetHeaderColor(theme)}></InstagramIcon></Link> }
            {   socialMedia.linkedin.link && <Link href={socialMedia.linkedin.link} target='_blank'><LinkedInIcon className="w-10 h-10"  fill={GetHeaderColor(theme)}></LinkedInIcon></Link> }
            {   socialMedia.twitter.link && <Link href={socialMedia.twitter.link} target='_blank'><TwitterXIcon className="w-10 h-10"  fill={GetHeaderColor(theme)}></TwitterXIcon></Link> }
            {   socialMedia.youtube.link && <Link href={socialMedia.youtube.link} target='_blank'><YoutubeIcon className="w-10 h-10"  fill={GetHeaderColor(theme)}></YoutubeIcon></Link> }
        </div>
        
        {
            sections.map((section) => <Section key={`section-${section.type}`} section={section} className="footer" isFooter></Section>)
        }
    </div>
}
export default FooterBuilder