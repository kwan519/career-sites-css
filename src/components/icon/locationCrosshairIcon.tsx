export const LocationCrosshair = ({ className, fill }: { className?: string; fill?: string }) => {
	return (
        <svg className={`${className}`} fill={fill ?? 'currentColor'}  viewBox="0 0 512 512">
            <path d="M256,0c17.7,0,32,14.3,32,32v34.7c80.4,13.4,143.9,76.9,157.3,157.3H480c17.7,0,32,14.3,32,32s-14.3,32-32,32h-34.7
            c-13.4,80.4-76.9,143.9-157.3,157.3V480c0,17.7-14.3,32-32,32s-32-14.3-32-32v-34.7C143.6,431.9,80.1,368.4,66.7,288H32
            c-17.7,0-32-14.3-32-32s14.3-32,32-32h34.7C80.1,143.6,143.6,80.1,224,66.7V32C224,14.3,238.3,0,256,0z M128,256
            c0,70.69,57.31,128,128,128s128-57.31,128-128s-57.31-128-128-128S128,185.31,128,256z M256,176c44.18,0,80,35.82,80,80
            s-35.82,80-80,80s-80-35.82-80-80S211.82,176,256,176z"/>
        </svg>
	)
}
