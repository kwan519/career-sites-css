import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme, GetHeaderColor } from "@/utilities/color"
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, ShareIcon } from "@heroicons/react/20/solid"
import { useContext, useEffect, useState } from "react"
import MyCombobox from "./combobox"
// import { MapIcon } from "./icon/searchIcons"
import DropDown from "./dropdown"
import SearchPanelMobile from "./searchPanelMobile"
import CheckboxGroupDropdown from "./checkboxGroupDropdown"
import { useRouter } from "next/router"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setUserGeoLocation, userGeoLocationItems } from "@/redux/slices/userLocation"
import { useAppSelector } from "@/redux/hoooks"
import { searchFilterItems, updateFilterPath } from "@/redux/slices/searchFilters"

const searchRadiusOption = [
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '12800', label: 'Everywhere' },
]

const searchOrderByOption = [
    { value: 'distance', label: 'Distance' },
    { value: 'jobTitle', label: 'Job Title' },
]

const resultHeader = [{
    key: 'name',
    label: 'Job Title',
},
{
    key: 'type',
    label: 'Job Type',
}, {
    key: 'location',
    label: 'Address'
}, {
    key: 'action',
    label: ''
}]
const SearchBuilder = () => {
    const { theme, siteId } = useContext(ThemeContext)
    const router = useRouter()
    const userLocation = "Your location"
    const dispatch = useDispatch()
    const {latitude, longitude} = useAppSelector(userGeoLocationItems)
    const {filterItems, path: queryPath} = useAppSelector(searchFilterItems)

    const [searchPanelMobile, setSearchPanelMobile] = useState<boolean>(false)
    const [filterJobTitle, setFilterJobTitle] = useState<FilterInterface[]>([])
    const [filterJobType, setFilterJobType] = useState<FilterInterface[]>([])
    const [currentFilters, setCurrentFilters] = useState<SeachFilters>({})

    const [jobList, setJobList] = useState<JobItem[]>([])
    const [totalResult, setTotalResult] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)

    const handleLoadJobs = async () => {
        setSearchPanelMobile(false)
        const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/search/oid/${siteId}?${queryPath}&center=${latitude},${longitude}`
        const result: SearchResponse = await fetch(fetchUrl).then(res => res.json())
        const jobs = result.data
        setJobList(jobs)

        setTotalPage(result.totalPage)
        setTotalResult(result.total)
    }

    const handleLoadFilters = async (filterType: string) => {
        /** Load filters */
        console.log('handleLoadFilters')
        const distance = filterItems['distance'] ?? searchRadiusOption[4].value //999 => everywhere
        const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/search/oid/${siteId}/filter/${filterType}?center=${latitude},${longitude}&distance=${distance}`

        const filterJobResponse = await fetch(fetchUrl).then(res => res.json())
        console.log(filterJobResponse)
        const filterGroup = (filterJobResponse["jobRole"] as {id: string; name: string; count: number}[]).map(({name}) => (
            {
                value: name.toLowerCase().replace(/\s+/g, ''),
                label: name,
            }
        )  )

        if(filterType === 'jobRole') {
            setFilterJobTitle(filterGroup)
        }else {
            setFilterJobType(filterGroup)
        }
    }

    useEffect(() => {
        // Retrieve user geolocation from browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                dispatch(setUserGeoLocation({
                    latitude: latitude,
                    longitude: longitude
                }))
                dispatch(updateFilterPath())
            }, (error => {
                console.log("Unable to retrieve your location");
                console.error(error)
            }));
        } else {
            console.log("Geolocation not supported");
        }
    }, [])

    useEffect(() => {
        // Reload Filter everytime that user location was changed
        handleLoadFilters('jobRole')
        handleLoadFilters('contractType')
    }, [jobList.length, latitude, longitude, filterItems['distance']])
    return <div id="search-job">
        <h3 className="w-full text-center" style={{ color: GetColorFromTheme('headerColor', theme) }}>Open Jobs</h3>
        <div className=" ng-star-inserted">
            <div className="container w-full mx-auto flex justify-between md:space-x-8 ">
                {/* Search input */}
                <div className='w-full lg:w-4/12 flex gap-2'>
                    <form autoComplete="off" id="form-container-left" role="form" className="flex-1 ng-untouched ng-pristine ng-valid">
                        {/* Search inout fleid */}
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon geolocation hidden-xs hidden-sm ng-star-inserted"  >
                                    <div className="mNcDk bpLs1b"> </div></span>
                                <MyCombobox />
                                <span className="input-group-addon ng-star-inserted" style={{ borderRadius: '0 4px 4px 0' }} onClick={handleLoadJobs}>
                                    <MagnifyingGlassIcon className="w-6 h-6" />
                                </span>
                            </div>
                        </div>
                    </form>
                    {/* <div>
                        <span id="job-search-bar-view-toggle">
                            <span ><MapIcon className="w-full p-2" fill='none' /></span>
                        </span>
                    </div> */}
                </div>

                {/* Search filter with radius for Desktop */}
                <div className="w-8/12 hidden lg:flex">
                    <DropDown
                        inputName="searchRadius"
                        defaultValueIndex={searchRadiusOption.length - 1}
                        buttonTitle="Search Radius"
                        buttonClassName="
                    p-3 border border-1 border-r-0 border-gray-800 rounded-l-lg w-full h-[34px] text-start flex justify-between"
                        containerClassName="w-1/2"
                        items={searchRadiusOption}
                        onApply={() => {
                            console.log('Apply')
                        }} />
                    <DropDown
                        inputName="sortBy"
                        defaultValueIndex={0}
                        buttonTitle="Sort by"
                        buttonClassName={`p-3 border border-1 border-gray-800 w-full h-[34px] text-start flex  justify-between ${jobList.length > 0 ? 'rounded-none' : 'rounded-r-lg '}`}
                        containerClassName="w-1/2"
                        items={searchOrderByOption}
                        onApply={() => {
                            console.log('Apply')
                        }} />
                    {
                        jobList.length > 0 && <CheckboxGroupDropdown
                            inputName="jobTitle"
                            items={filterJobTitle}
                            buttonTitle="Job Title"
                            buttonClassName={`p-3 border-y-[1px] border-gray-800 w-full h-[34px] text-start flex  justify-between rounded-none`}
                            containerClassName="w-1/2"
                            onApply={() => {
                                console.log('Apply')
                            }} />
                    }
                    {
                        jobList.length > 0 && <CheckboxGroupDropdown
                            inputName="jobType"
                            items={filterJobType}
                            buttonTitle="Job Type"
                            buttonClassName="p-3 border border-1 border-gray-800 rounded-r-lg w-full h-[34px] text-start flex  justify-between"
                            containerClassName="w-1/2"
                            onApply={() => {
                                console.log('Apply')
                            }} />
                    }


                </div>
            </div>
            {/* Search filter with radius for Mobile */}
            <div className="container w-full mx-auto shadow-md md:shadow-none bg-[#eee] md:bg-transparent ">
                <div className="bg-transparent md:bg-[#eee] h-[40px] flex justify-between">
                    <div className="p-4 font-bold">
                        {jobList.length > 0 ? `${totalResult} jobs` : ''}
                    </div>
                    <div className="p-2 border-l block lg:hidden" onClick={() => setSearchPanelMobile(!searchPanelMobile)}>
                        <AdjustmentsHorizontalIcon className="w-full h-full" />
                    </div>
                </div>
            </div>
            {/* Search filter panel for Mobile */}
            {
                searchPanelMobile && <SearchPanelMobile
                    searchPanelMobile={searchPanelMobile}
                    searchRadiusOption={searchRadiusOption}
                    filterJobTitle={filterJobTitle}
                    filterJobType={filterJobType}
                    searchOrderByOption={searchOrderByOption}
                    onHandleApply={handleLoadJobs} />
            }

            {/* Search Result List */}
            {
                jobList.length === 0 ? <div className="container w-full mx-auto">
                    <div className=" flex flex-col justify-center w-full text-center py-[20px]">
                        <div className="p-4 font-bold text-[24px]">
                            No jobs near {userLocation}
                        </div>
                        <div className="p-2" >
                            Reset your filters, search a new location or check back later for new jobs.
                        </div>
                    </div>
                </div> : <div className="container w-full mx-auto">
                    <table className="w-full">
                        <tr className="hidden md:table-row">
                            {resultHeader.map((column) =>
                                <th key={column.key} className="py-4 px-2 font-bold rounded-none h-[38px]"
                                    style={{
                                        backgroundColor: theme?.headerBackgroundColor ?? theme?.color,
                                        color: GetHeaderColor(theme),
                                        fontSize: '16px'
                                    }}>{column.label}</th>
                            )}
                        </tr>
                        {jobList.map((row, index) =>
                            <tr key={`rs-bd-${index}`} className="hidden md:table-row border-b-[1px] h-full cursor-pointer" onClick={() => { router.push(`${router.asPath}/job/${row.jobId}`) }}>
                                {Object.keys(row).map(columnKey => {
                                    if (columnKey === 'name') return <td className="py-8 font-bold h-full min-w-[200px]"><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                    if (columnKey === 'location') return <td className="py-8 h-full "><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                    if (columnKey === 'type') return <td className="min-w-[150px]"><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                })}
                                <td className="flex justify-end py-8 gap-4">
                                    <button className="p-4 rounded-md"
                                        style={{
                                            color: GetColorFromTheme('headerBackgroundColor', theme),
                                            border: `1px solid ${GetColorFromTheme('headerBackgroundColor', theme)}`
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            console.log('share')
                                        }}>Share</button>
                                    <Link
                                        href={row.applyUrl}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log('share')
                                        }}
                                        target="_blank"
                                        className="p-4 rounded-md no-underline"
                                        style={{ backgroundColor: GetColorFromTheme('headerBackgroundColor', theme), color: GetHeaderColor(theme) }}>Apply</Link>
                                </td>

                            </tr>
                        )}
                        {jobList.map((row, index) => <tr key={`rs-bd-${index}`} className="md:hidden border-b-[1px] h-full cursor-pointer" onClick={() => console.log('click to best page')}>
                            <div className="flex justify-between py-8" onClick={() => console.log('click to best page')}>
                                <div>
                                    {Object.keys(row).map(columnKey => {
                                        if (columnKey === 'name') return <div className="whitespace-pre-wrap font-bold ">{row[columnKey]}</div>
                                        if (columnKey === 'location') return <div className="whitespace-pre-wrap">{row[columnKey]}</div>
                                        if (columnKey === 'type') return <div className="whitespace-pre-wrap">{row[columnKey]}</div>
                                    })}
                                </div>
                                <div onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    console.log('share')
                                }}>
                                    <ShareIcon className="w-10 h-10 fill-slate-400" />
                                </div>
                            </div>
                        </tr>)}
                    </table>
                </div>

            }
        </div>
    </div>
}

export default SearchBuilder
