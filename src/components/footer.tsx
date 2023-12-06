import { useContext } from "react"
import Section from "./section"
import { ThemeContext } from "@/contexts/themeContext"
import { GetHeaderColor } from "@/utilities/color"

interface FooterInterface {
    footer: { sections: ISection[] };
    socialMedia: ISocialMedia;
}
const GenerateSocialMedia = () => {
    return <div> </div>
}

const FooterBuilder = ({ footer, socialMedia }: FooterInterface) => {
    const { theme } = useContext(ThemeContext)
    const sections = footer.sections
    return <div
        className="flex flex-row items-center justify-center mx-auto px-[100px] py-[20px]"
        style={{
            backgroundColor: theme?.footerBackgroundColor,
            color: GetHeaderColor(theme)
        }}>
        {
            sections.map((section) => <Section key={`section-${section.type}`} section={section} className="footer" isFooter></Section>)
        }
    </div>
}
export default FooterBuilder