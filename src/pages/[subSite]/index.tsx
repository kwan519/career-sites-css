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

        //Retrieve Site Id
        const siteDataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oid/${jsonObject.owner.id}/id`).then(res => res.json())
        return {
            props: {
                site: jsonObject,
                siteId: siteDataRes['data']
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {},
        }
    }
}


interface SubSiteInterface {
    site: SiteInterface
    siteId: string
}

const SubSite = (props: SubSiteInterface) => {
    const { site, siteId } = props
    if(props)
    return <ThemeContext.Provider value={{theme: site.theme, siteId}}>
        <Head>
            <link  rel="stylesheet" href={`/cs${site.domain.replace('nowhiring.com', '')}/style.css`} />
        </Head>
        <PageBuilder {...site}/>
    </ThemeContext.Provider>
    else 
    return <div> FAILED TO LOAD SETTING FOR THIS SITE</div>
}

export default SubSite