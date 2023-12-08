import { useContext } from 'react'
import { ThemeContext } from '@/contexts/themeContext'
import { GetColorFromTheme } from '@/utilities/color'
import ColumnBuilder from './column'
import SearchBuilder from './search'

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
        return <div  className={`${isFooter ? 'section-container-footer' : 'section-container'} section-content `}   style={{
            backgroundImage: section.backgroundImage?.url ? `url(${section.backgroundImage?.url})` : undefined,
            backgroundSize: section.backgroundImage?.url  ?"cover" : undefined ,
            backgroundPosition: section.backgroundImage?.url  ?"center center" : undefined,
            backgroundColor: section.backgroundColor ? GetColorFromTheme(section.backgroundColor, theme)  : undefined
        }}>
            <SectionCustomTag >
                <div
                    className={`${section.fullWidth ? '!p-0' : 'container'} ${className ?? ''}`} >
                        <div className='row'>
                    {
                        columns.map((column, index) => {
                            return <ColumnBuilder key={`column-${column.type}-${index}`} column={column} totalColumn={columns.length}></ColumnBuilder>
                        })
                    }
                    </div>
                </div>
            </SectionCustomTag>
        </div>
    if(section.type === 'job-search') {
        return <SearchBuilder />
    }
}

export default Section
