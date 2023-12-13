import { useContext } from 'react'
import { ThemeContext } from '@/contexts/themeContext'
import { GetColorFromTheme } from '@/utilities/color'
import ColumnBuilder from './column'
import SearchBuilder from './search'

interface SectionBuilderintrface {
    domain: string
    section: ISection
    isFooter?: boolean
    className?: string
    index?: number
}
const Section = ({domain, section, isFooter, className, index }: SectionBuilderintrface) => {
    const columns = section.columns
    const {theme} = useContext(ThemeContext)
    const SectionCustomTag = 'customer-site-section' as keyof JSX.IntrinsicElements;
    if (section.type === "content")
        return <div  className={`${isFooter ? 'section-container-footer' : 'section-container'} section-content sc-${index}`}   style={{
            backgroundImage: section.backgroundImage?.url ? `url(https://cdn.hiringtoday.com/${domain}/${section.backgroundImage?.url})` : undefined,
            backgroundSize: section.backgroundImage?.url  ?"cover" : undefined ,
            backgroundPosition: section.backgroundImage?.url  ?"center center" : undefined,
            backgroundColor: section.backgroundColor ? GetColorFromTheme(section.backgroundColor, theme)  : undefined
        }}>
            <SectionCustomTag >
                {/* Header */}
                {section.header && section.header !== null && <div>
                    <ColumnBuilder column={section.header} totalColumn={1} domain={domain}/>
                    </div>}
                <div
                    className={`${section.fullWidth ? '!p-0' : 'container'} ${className ?? ''}`} >
                        <div className='row'>
                    {
                        columns.map((column, index) => {
                            return <ColumnBuilder key={`column-${column.type}-${index}`} column={column} totalColumn={columns.length} domain={domain}></ColumnBuilder>
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
