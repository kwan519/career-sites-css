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

const resultHeader = ['Job Title', 'Address', 'Job Type', '']
const SearchBuilder = () => {
    const { theme } = useContext(ThemeContext)
    const [searchPanelMobile, setSearchPanelMobile] = useState<boolean>(false)
    const [filterJobTitle, setFilterJobTitle] = useState<FilterInterface[]>([
        { value: 'distance', label: 'Distance' },
        { value: 'jobTitle', label: 'Job Title' },
        { value: '5', label: '5 miles' },
        { value: '10', label: '10 miles' },
        { value: '25', label: '25 miles' },
        { value: '50', label: '50 miles' },
        { value: '999', label: 'Everywhere' },
        { value: '5', label: '5 miles' },
        { value: '10', label: '10 miles' },
        { value: '25', label: '25 miles' },
        { value: '50', label: '50 miles' },
        { value: '999', label: 'Everywhere' },
    ])
    const [filterJobType, setFilterJobType] = useState<FilterInterface[]>([
        { value: 'distance', label: 'Distance' },
        { value: 'jobTitle', label: 'Job Title' },
    ])
    const [jobList, setJobList] = useState<string[]>(['d', 'a'])
    const handleLoadJobs = () => {
        setSearchPanelMobile(false)
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
                        {jobList.length} jobs
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
            <div className="container w-full mx-auto">
                <Table removeWrapper aria-label="Example table with dynamic content">
                    <TableHeader>
                        {resultHeader.map((column, index) =>
                            <TableColumn key={`rs-hd-${index}`} className="p-4 font-bold justify-between rounded-none"
                                style={{
                                    backgroundColor: theme?.headerBackgroundColor,
                                    color: GetHeaderColor(theme),
                                    fontSize: '18px'
                                }}>{column}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {jobList.map((row, index) =>
                            <TableRow key={`rs-bd-${index}`}>
                                {(columnKey) => <TableCell>TESTING</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    </div>
}

export default SearchBuilder