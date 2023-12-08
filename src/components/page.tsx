import NavBuilder from "./nav"
import { useContext } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import Image from "next/image";
import parse from 'html-react-parser';
import Link from "next/link";
import Section from "./section";
import FooterBuilder from "./footer";
import Head from "next/head";

const PageBuilder = ({ pages, navigation, siteIntro, settings, footer, socialMedia }: SiteInterface) => {
    const name = pages[0].name
    const section = pages[0].sections
    const { theme } = useContext(ThemeContext)
    const CustomTag = 'customer-site' as keyof JSX.IntrinsicElements;
    const CustomIntroTag = 'customer-site-intro' as keyof JSX.IntrinsicElements;
    return <main contextMenu={name} className={theme?.font.toLocaleLowerCase().replaceAll(' ', '-') ?? 'open-sans'}>
        
        <CustomTag >
            <NavBuilder navData={{ navigation }} settings={{ ...settings }}></NavBuilder>
            <div className="fixed top-0 h-[550px] w-full z-10"
                    style={{ backgroundColor: siteIntro.backgroundColor ?  siteIntro.backgroundColor  : undefined,
                        backgroundImage: siteIntro.backgroundImage?.url && siteIntro.backgroundImage?.url !== null ? `url(${siteIntro?.backgroundImage?.url ?? ''})` : undefined,
                        backgroundSize: siteIntro.backgroundImage?.url && siteIntro.backgroundImage?.url !== null ?"cover" : undefined ,
                        backgroundPosition: siteIntro.backgroundImage?.url && siteIntro.backgroundImage?.url !== null ?"center center" : undefined

                    }}
                >                     
                </div>   
                <div className="min-h-[450px] mt-12 z-20 py-[10%]">
                    {
                        (theme?.logoPosition === 'logo-intro' || theme?.logoPosition === null) && theme?.logo !== null && <Link href={settings.homepageUrl ?? ''}>
                            <Image
                                className="mx-auto"
                                src={theme?.logo.url ?? ''} alt={theme?.logo.altText ?? ''} width={260} height={250} />
                        </Link>
                    }
                    {
                        siteIntro.html && parse(siteIntro.html)
                    }
                    </div>   
            <div className="bg-white z-20">
                {
                    section.map((section, index) => <Section key={`section-${section.type}-${index}`} section={section}></Section>)
                }
            </div>
        </CustomTag>
        {!settings.hideFooter && <FooterBuilder footer={{ sections: footer.sections }} socialMedia={socialMedia} />}
    </main>
}

export default PageBuilder