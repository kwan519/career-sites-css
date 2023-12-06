import PageBuilder from "@/components/page"
import { ThemeContext } from "@/contexts/themeContext"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {

    // const htmlContent = GeneratePage(jsonObject)
    try {
        const brandName = 'wlcareers'
        const file = await fetch(`https://nowhiring.com/api/career-live-sites/nowhiring.com%2F${brandName}`).then(res => res.text())
        // console.log(file)
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
        <PageBuilder {...site}/>
    </ThemeContext.Provider>
}

export default SubSite