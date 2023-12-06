import { useContext } from 'react'
import { ThemeContext } from '@/contexts/themeContext'
import { GetColorFromTheme } from '@/utilities/color'
import ColumnBuilder from './column'

interface SectionBuilderintrface {
    section: ISection
    isFooter?: boolean
    className?: string
}
const Section = ({ section, isFooter, className }: SectionBuilderintrface) => {
    const columns = section.columns
    const {theme} = useContext(ThemeContext)
    const SectionCustomTag = 'customer-site-section' as keyof JSX.IntrinsicElements;
    if (section.type === "content")
        return <div  className={`${isFooter ? 'section-container-footer' : 'section-container'}`} style={{
            backgroundImage: section.backgroundImage?.url ? `url(${section.backgroundImage?.url})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundColor: section.backgroundColor ? GetColorFromTheme(section.backgroundColor, theme) :  isFooter ? 'black' : undefined
        }}>
            <SectionCustomTag>
                <div
                    className={`flex flex-row items-center justify-center mx-auto px-[100px] section-content container ${className ?? ''}`}>
                    {
                        columns.map((column, index) => {
                            return <ColumnBuilder key={`column-${column.type}-${index}`} column={column}></ColumnBuilder>
                        })
                    }
                </div>
            </SectionCustomTag>
        </div>
}

export default Section
