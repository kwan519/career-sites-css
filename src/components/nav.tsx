import { ThemeContext } from "@/contexts/themeContext";
import { GetColorFromTheme, GetHeaderColor } from "@/utilities/color";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

interface INav {
    navigation: {
        name: string;
        page: string;
    }[]
}
interface NavBuilderInterface {
    navData: INav
    settings: {
        homepageUrl?: string;
        name: string;
        hideFooter: boolean;
        excludeFromSiteMap: boolean;
    };
    isDetailPage?: boolean;
}
const NavBuilder = ({ navData, settings, isDetailPage }: NavBuilderInterface) => {
    const router = useRouter()
    const navigation = navData.navigation
    const { theme } = useContext(ThemeContext)
    return <div className="fixed w-full flex justify-between px-4 h-[52px] z-50"
        style={{
            backgroundColor: theme?.headerBackgroundColor ? GetColorFromTheme(theme?.headerBackgroundColor, theme) : theme?.color ? theme.color : 'black',
            color: GetHeaderColor(theme)
        }}>
        {isDetailPage ? <div className="flex gap-2"> 
        <div
                    className="capitalize header-button no-underline! h-fit my-auto"
                    style={{
                        color: GetHeaderColor(theme),
                        textDecoration: 'none'
                    }}
                    onClick={() => router.back()}>Back</div> </div> :
            <div className="flex gap-2">
                {
                    settings.homepageUrl && navigation.map((navData) => {
                        return <Link key={navData.name}
                            href={navData.name === 'home' ? settings.homepageUrl ?? '' : navData.page}
                            className="capitalize header-button no-underline! h-fit my-auto"
                            style={{
                                color: GetHeaderColor(theme),
                                backgroundColor: GetColorFromTheme("buttonColor",theme),
                                textDecoration: 'none'
                            }}>{navData.name}</Link>
                    })
                }
            </div>}
        {isDetailPage ? <div
            onClick={() => {
                console.log(router.asPath)
                const currentPath = router.asPath
                router.push(`/${currentPath.split('/')[1]}#search-job`)
            }}
            className="flex gap-2 justify-start flex-row font-bold items-center my-auto no-underline w-fit px-[10px] py-[15px] cursor-pointer"
            style={{ color: GetHeaderColor(theme), textDecoration: 'none' }}>
            <MagnifyingGlassIcon className="w-8 h-8"></MagnifyingGlassIcon>
            <div>
                Search Jobs
            </div>
        </div> :
            <div
                onClick={() => {
                    const elem = document.getElementById('search-job')
                    window.scrollTo({
                        top: elem?.offsetTop,
                        behavior: "smooth",
                    })
                }}
                className="flex gap-2 justify-start flex-row font-bold items-center my-auto no-underline w-fit px-[10px] py-[15px] cursor-pointer"
                style={{ color: GetHeaderColor(theme), textDecoration: 'none' }}>
                <MagnifyingGlassIcon className="w-8 h-8"></MagnifyingGlassIcon>
                <div>
                    Search Jobs
                </div>
            </div>}
    </div>
}

export default NavBuilder