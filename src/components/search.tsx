import { ThemeContext } from "@/contexts/themeContext"
import { GetColorFromTheme } from "@/utilities/color"
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useContext } from "react"
import MyCombobox from "./combobox"
import { MapIcon } from "./icon/searchIcons"
import DropDown from "./dropdown"

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
const SearchBuilder = () => {
    const { theme } = useContext(ThemeContext)
    return <div>
        <h3 className="w-full text-center" style={{ color: GetColorFromTheme('headerColor', theme) }}>Open Jobs</h3>
        <div className="row ng-star-inserted">
            <div className="container w-full mx-auto flex justify-between md:space-x-8 ">
                {/* Search input */}
                <div className='w-full md:w-4/12 flex gap-2'>
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
                <div className="w-8/12 sm:hidden md:block">
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
                        }}/>
                    <DropDown 
                        inputName="sortBy" 
                        defaultValueIndex={0}
                        buttonTitle="Sort by"
                        buttonClassName="
                    p-3 border border-1 border-gray-800 rounded-r-lg w-full h-[34px] text-start flex  justify-between"
                        containerClassName="w-1/2"
                        items={searchOrderByOption} 
                        onApply={() => {
                            console.log('Apply')
                        }}/>
                </div>
            </div>
            {/* Search filter with radius for Mobile */}
            <div className="container w-full mx-auto">
                <div className="bg-[#eee] h-[40px] flex justify-end">
                    <div className="p-2 border-l">
                        <AdjustmentsHorizontalIcon className="w-full h-full" />
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default SearchBuilder