import NavBuilder from "./nav"
import { useContext } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import Image from "next/image";
import parse from 'html-react-parser';
import Link from "next/link";
import Section from "./section";
import FooterBuilder from "./footer";

const PageBuilder = ({ pages, navigation, siteIntro, settings, footer, socialMedia }: SiteInterface) => {
    const name = pages[0].name
    const section = pages[0].sections
    const { theme } = useContext(ThemeContext)
    const CustomTag = 'customer-site' as keyof JSX.IntrinsicElements;
    const CustomIntroTag = 'customer-site-intro' as keyof JSX.IntrinsicElements;
    return <main contextMenu={name} className={theme?.font.toLocaleLowerCase().replaceAll(' ', '-') ?? 'open-sans'}>
        <CustomTag >
            <NavBuilder navData={{ navigation }} settings={{ ...settings }}></NavBuilder>
            <CustomIntroTag>
                {
                    siteIntro.backgroundImage?.url && siteIntro.backgroundImage?.url !== null && <Image src={siteIntro?.backgroundImage?.url ?? ''} alt={name} width={1400} height={500}
                        className="fixed top-0 -z-40 h-fit w-full bg-top bg-no-repeat  object-cover" />
                }

                <div className="p-[30px] min-h-[450px]"
                    style={siteIntro.backgroundColor ?{ backgroundColor: siteIntro.backgroundColor } : {}}
                >
                    {/* Logo */}
                    {
                        theme?.logoPosition === 'logo-intro' &&  theme?.logo !== null &&  <Link href={settings.homepageUrl ?? ''}>
                            <Image
                                className="mx-auto"
                                src={theme?.logo.url ?? ''} alt={theme?.logo.altText ?? ''} width={260} height={250} />
                        </Link>
                    }
                    {
                        siteIntro.html && parse(siteIntro.html)
                    }
                </div>
            </CustomIntroTag>
            <div className="bg-white">
                {
                    section.map((section,index) => <Section key={`section-${section.type}-${index}`} section={section}></Section>)
                }
            </div>
        </CustomTag>
       {!settings.hideFooter &&  <FooterBuilder footer={{ sections: footer.sections }} socialMedia={socialMedia} />}
    </main>
}

export default PageBuilder