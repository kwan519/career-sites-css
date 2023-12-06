import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme } from "@/utilities/color"
import parse from "html-react-parser"
import { useContext } from "react"
import ReactPlayer from "react-player"
import Image from 'next/image'
import { GetColumnsClassFromTotal } from "@/utilities/columnsClass"

const ColumnBuilder = ({ column, totalColumn }: { column: IColumn; totalColumn: number }) => {
    const { theme } = useContext(ThemeContext)
    const CustomVideoTag = 'customer-site-column-video' as keyof JSX.IntrinsicElements;
    return <div className={`${GetColumnsClassFromTotal(totalColumn)}`}>
        {
            column.backgroundImage && <Image
                className="mx-auto"
                src={column.backgroundImage.url ?? ''} alt={column.backgroundImage.altText ?? ''} width={1400} height={500} />
        }
        {
            column.type === 'text' && <div className='mx-auto customer-site-column-text-content'
                style={{
                    backgroundColor: column.backgroundColor ? GetColorFromTheme(column.backgroundColor, theme) : undefined,
                    backgroundImage: column.backgroundImage?.url ? `url(${column.backgroundImage?.url})` : undefined,
                }}>
                {
                    parse(column.html)
                }
            </div>
        }
        {
            column.type === 'testimonial' && <div className='mx-auto'
                style={{
                    backgroundColor: column.backgroundColor ? GetColorFromTheme(column.backgroundColor, theme) : undefined,
                    backgroundImage: column.backgroundImage?.url ? `url(${column.backgroundImage?.url})` : undefined,
                }}>
                {
                    parse(column.html)
                }
            </div>
        }
        {
            column.type === 'image' && <Image
                className="w-full h-full object-cover"
                src={column.image?.url ?? ''} alt={column.image?.altText ?? ''} width={400} height={400} />
        }
        {
            column.type === 'video' && <CustomVideoTag>
                <div className="column-video">
                    <ReactPlayer
                        style={{ margin: '0 auto' }}
                        width='100%'
                        url={column.videoUrl ?? ''}
                        light={false}
                        controls
                        config={
                            {
                                youtube: {
                                    playerVars: {
                                        autoplay: 1,
                                        enablejsapi: 0
                                    }
                                },
                                vimeo: {
                                    playerOptions: {
                                        autoplay: 1
                                    }
                                }
                            }} />
                </div>
            </CustomVideoTag>

        }

    </div>
}

export default ColumnBuilder