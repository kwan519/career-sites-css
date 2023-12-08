import { ThemeContext } from "@/contexts/themeContext";
import { GetHeaderColor } from "@/utilities/color";
import { Transition } from "@headlessui/react";
import { useContext } from "react";
import RadioOptionGroup from "./radioOptionGroup";
import CheckboxGroup from "./checkboxGroup";

const transitionClasses = {
    enter: 'transform transition ease-in-out duration-500 sm:duration-700',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-500 sm:duration-700',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
};
interface ISearchPanelMobile {
    searchRadiusOption: FilterInterface[]
    searchOrderByOption: FilterInterface[]
    filterJobTitle?: FilterInterface[]
    filterJobType?: FilterInterface[]
    searchPanelMobile: boolean

    onHandleApply: () => void
}
const SearchPanelMobile = ({ searchRadiusOption, searchOrderByOption, filterJobTitle, filterJobType, searchPanelMobile, onHandleApply }: ISearchPanelMobile) => {
    const { theme } = useContext(ThemeContext)

    return <Transition as="div" show={searchPanelMobile} {...transitionClasses}>
        <div className="fixed w-screen h-full top-0 left-0 z-50 bg-white">
            <div className="h-6 bg-slate-300" style={{ backgroundColor: theme?.headerBackgroundColor }}></div>
            <div className=" border-t-[1px] border-slate-300 mt-10 p-8">
                <div>Seach Radius</div>
                <RadioOptionGroup
                    items={searchRadiusOption}
                    inputName="searchRadius"
                    defaultValueIndex={searchRadiusOption.length - 1} />
            </div>
            <div className=" border-t-[1px] border-slate-300 mt-10 p-8">
                <div>Sort By</div>
                <RadioOptionGroup
                    items={searchOrderByOption}
                    inputName="searchOrderBy"
                    defaultValueIndex={0} />
            </div>
            {
                filterJobTitle && <div className=" border-t-[1px] border-slate-300 mt-10 p-8">
                    <div>Job Title</div>
                    <CheckboxGroup
                        items={filterJobTitle}
                        inputName="searchOrderBy" />
                </div>
            }
            {filterJobType && <div className=" border-t-[1px] border-slate-300 mt-10 p-8">
                <div>Job Type</div>
                <CheckboxGroup
                    items={filterJobType}
                    inputName="searchOrderBy" />
            </div>}
            <div className="fixed bottom-0 w-full border border-y-1 border-slate-300 mt-10 p-8">
                <div>
                    <div className="flex justify-between gap-4">
                        <div className="cursor-pointer w-full border border-slate-800 rounded-lg text-center p-4"
                            onClick={() => onHandleApply()}>Reset Filters</div>
                        <div className="cursor-pointer w-full border rouded-lg text-center p-4 "
                            style={{ backgroundColor: theme?.headerBackgroundColor, color: GetHeaderColor(theme) }}
                            onClick={() => onHandleApply()}>Apply Filters</div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
}
export default SearchPanelMobile