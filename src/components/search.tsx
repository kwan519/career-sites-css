import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme, GetHeaderColor } from "@/utilities/color"
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useContext, useState } from "react"
import MyCombobox from "./combobox"
import { MapIcon } from "./icon/searchIcons"
import DropDown from "./dropdown"
import SearchPanelMobile from "./searchPanelMobile"
import CheckboxGroupDropdown from "./checkboxGroupDropdown"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table"

const searchRadiusOption = [
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '999', label: 'Everywhere' },
]

const searchOrderByOption = [
    { value: 'distance', label: 'Distance' },
    { value: 'jobTitle', label: 'Job Title' },
]

const resultHeader = [{
    key: 'name',
    label: 'Job Title',
}, {
    key: 'fullLocation',
    label: 'Address'
},
{
    key: 'shift',
    label: 'Job Type',
}, {
    key: 'action',
    label: ''
}]
const SearchBuilder = () => {
    const { theme } = useContext(ThemeContext)
    const userLocation = "Pattaya, 20"
    const [searchPanelMobile, setSearchPanelMobile] = useState<boolean>(false)
    const [filterJobTitle, setFilterJobTitle] = useState<FilterInterface[]>([
        { value: 'distance', label: 'Distance' },
        { value: 'jobTitle', label: 'Job Title' },
        { value: '5', label: '5 miles' },
        { value: '25', label: '25 miles' },
        { value: '50', label: '50 miles' },
        { value: '999', label: 'Everywhere' },
    ])
    const [filterJobType, setFilterJobType] = useState<FilterInterface[]>([
        { value: 'distance', label: 'Distance' },
        { value: 'jobTitle', label: 'Job Title' },
    ])
    const [jobList, setJobList] = useState<{[key:string] : string | undefined}[]>([])
    const handleLoadJobs = () => {
        setSearchPanelMobile(false)
        const jobMockupData = [
            {
                name: 'Software Engineer',
                fullLocation: '2136 Declaration Dr Independence, KY, 41051',
                shift: 'Full Time',
            }, {
                name: 'Software Engineer',
                fullLocation: 'Pattaya, 20',
                shift: 'Full Time',
            }, {
                name: 'Software Engineer',
                fullLocation: 'Pattaya, 20',
                shift: 'Full Time',
            }
        ]
        setJobList(jobMockupData)
        console.log('do searching....')
    }
    return <div>
        <h3 className="w-full text-center" style={{ color: GetColorFromTheme('headerColor', theme) }}>Open Jobs</h3>
        <div className="row ng-star-inserted">
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
                                <span className="input-group-addon ng-star-inserted" style={{ borderRadius: '0 4px 4px 0' }}>
                                    <MagnifyingGlassIcon className="w-6 h-6" />
                                </span>
                            </div>
                        </div>
                    </form>
                    <div>
                        <span id="job-search-bar-view-toggle">
                            <span ><MapIcon className="w-full p-2" fill='none' /></span>
                        </span>
                    </div>
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
                        buttonClassName={`p-3 border border-1 border-gray-800 w-full h-[34px] text-start flex  justify-between ${jobList ? 'rounded-none' : 'rounded-r-lg '}`}
                        containerClassName="w-1/2"
                        items={searchOrderByOption}
                        onApply={() => {
                            console.log('Apply')
                        }} />
                    {
                        filterJobTitle && filterJobTitle.length > 0 && <CheckboxGroupDropdown
                            inputName="jobType"
                            items={filterJobTitle}
                            buttonTitle="Job Type"
                            buttonClassName={`p-3 border border-1 border-gray-800 w-full h-[34px] text-start flex  justify-between rounded-none`}
                            containerClassName="w-1/2"
                            onApply={() => {
                                console.log('Apply')
                            }} />
                    }
                    {
                        filterJobType && filterJobType.length > 0 && <CheckboxGroupDropdown
                            inputName="jobTitle"
                            items={filterJobType}
                            buttonTitle="Job Title"
                            buttonClassName="p-3 border border-1 border-gray-800 rounded-r-lg w-full h-[34px] text-start flex  justify-between"
                            containerClassName="w-1/2"
                            onApply={() => {
                                console.log('Apply')
                            }} />
                    }


                </div>
            </div>
            {/* Search filter with radius for Mobile */}
            <div className="container w-full mx-auto">
                <div className="bg-[#eee] h-[40px] flex justify-between">
                    <div className="p-4 font-bold">
                        {jobList.length > 0 ? `${jobList.length} jobs` : ''}
                    </div>
                    <div className="p-2 border-l" onClick={() => setSearchPanelMobile(!searchPanelMobile)}>
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
                    <tr >
                        {resultHeader.map((column) =>
                            <th key={column.key} className="py-4 px-2 font-bold rounded-none h-[38px]"
                                style={{
                                    backgroundColor: theme?.headerBackgroundColor,
                                    color: GetHeaderColor(theme),
                                    fontSize: '16px'
                                }}>{column.label}</th>
                        )}
                    </tr>
                        {jobList.map((row, index) =>
                            <tr key={`rs-bd-${index}`} className="border-b-1 h-full cursor-pointer" onClick={() => console.log('click to best page')}>
                                {Object.keys(row).map(columnKey => {
                                    if(columnKey === 'name') return <td className="py-8 font-bold h-full min-w-[200px]"><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                    if(columnKey === 'fullLocation') return <td className="py-8 h-full "><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                    if(columnKey === 'shift') return <td className="min-w-[150px]"><div className="whitespace-pre-wrap">{row[columnKey]}</div></td>
                                })}
                                <td className="flex justify-end py-8 gap-4">
                                    <button className="p-4 rounded-md" 
                                        style={{color: GetColorFromTheme('headerBackgroundColor', theme), 
                                        border: `1px solid ${GetColorFromTheme('headerBackgroundColor', theme)}`}}
                                        onClick={(e) =>{
                                            e.preventDefault()
                                            e.stopPropagation()
                                            console.log('share')
                                        }}>Share</button>
                                    <button className="p-4 rounded-md" style={{backgroundColor: GetColorFromTheme('headerBackgroundColor', theme), color: GetHeaderColor(theme)}}>Apply</button>
                                </td>
        
                            </tr>
                        )}
                </table>
            </div>

            }
        </div>
    </div>
}

export default SearchBuilder
