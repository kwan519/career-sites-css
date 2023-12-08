import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme, GetHeaderColor } from "@/utilities/color"
import parse from "html-react-parser"
import { useContext } from "react"
import ReactPlayer from "react-player"
import Image from 'next/image'
import { GetColumnsClassFromTotal } from "@/utilities/columnsClass"

const ColumnBuilder = ({ column, totalColumn }: { column: IColumn; totalColumn: number }) => {
    const { theme } = useContext(ThemeContext)
    const CustomVideoTag = 'customer-site-column-video' as keyof JSX.IntrinsicElements;
    return <div className={`relative ${GetColumnsClassFromTotal(totalColumn)} ${column.type === 'cta' ? '!p-0' : ''}`}>
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
                src={column.image?.url ?? ''} 
                alt={column.image?.altText ?? ''} width={400} height={400} />
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
        {
            column.type === 'cta' && <div className='mx-auto h-[330px] flex flex-col justify-center p-[10px] '
                style={{
                    backgroundColor: column.backgroundColor ? GetColorFromTheme(column.backgroundColor, theme) : 'gray',
                    backgroundImage: column.backgroundImage?.url ? `url(${column.backgroundImage?.url})` : undefined,
                    backgroundPosition: column.backgroundImage?.url ? "center center" : undefined,
                    backgroundSize: column.backgroundImage?.url ? "cover" : undefined,
                }}>
                {
                    parse(column.html)
                }
                {
                    column.buttonLink && <div 
                    className="mx-auto"
                    > <a href={column.buttonLink?.url} 
                    className="p-4 w-fit !no-underline cursor-pointer rounded-lg mx-auto hover:brightness-50"
                    style={{
                        backgroundColor: GetColorFromTheme('headerBackgroundColor', theme),
                        color: GetHeaderColor(theme)
                    }}>{column.buttonLink?.text}</a></div>
                }
            </div>
        }

    </div>
}

export default ColumnBuilder