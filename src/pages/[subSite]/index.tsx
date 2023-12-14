import PageBuilder from "@/components/page"
import { ThemeContext } from "@/contexts/themeContext"
import { GetServerSideProps } from "next"
import Head from "next/head"

export const getServerSideProps: GetServerSideProps = async (context) => {
	const subSite = context.params?.subSite
    try {
        const brandName = subSite
        const file = await fetch(`${process.env.NEXT_PUBLIC_ASSET_DOMAIN}${process.env.NEXT_PUBLIC_ASSET_MAINSITE_NAME}${brandName}/${brandName}.json`).then(res => res.text())
        const jsonObject: SiteInterface = JSON.parse(file) as SiteInterface
        return {
            props: {
                site: jsonObject
            },
        }
    } catch (error) {
        return {
            props: {},
        }
    }
}




interface SubSiteInterface {
    site: SiteInterface
}

const SubSite = ({ site }: SubSiteInterface) => {
    //
    return <ThemeContext.Provider value={{theme: site.theme}}>
        <Head>
            <link  rel="stylesheet" href={`/cs${site.domain.replace('nowhiring.com', '')}/style.css`} />
        </Head>
        <PageBuilder {...site}/>
    </ThemeContext.Provider>
}

export default SubSite