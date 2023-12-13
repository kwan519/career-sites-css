import { useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

function MyCombobox() {
    const [selectedState, setSelectedState] = useState<string | undefined>()
    const [query, setQuery] = useState('')
    const [isActive, setIsActive] = useState<boolean>()

    const filteredState =
        query === ''
            ? states
            : states.filter((state) => {
                return state.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className={'relative w-full'} onBlur={() => setIsActive(false)}>
            <Combobox value={selectedState} onChange={(state) => {
                setSelectedState(state)
            }}>
                {({ open }) => (
                    <>
                        <Combobox.Input
                            className="form-control ng-untouched ng-pristine ng-valid ng-star-inserted"
                            onChange={(event) => setQuery(event.target.value)}
                            onBlur={(event) => {
                                if (selectedState === undefined && event.currentTarget.value) {
                                    setSelectedState(event.currentTarget.value)
                                }
                            }}
                            aria-label="Search City and State or Zipcode"
                            placeholder="Search City and State or Zipcode" />
                        <Transition show={open || isActive}>
                            <Combobox.Options className={'absolute left-0 top-[38px] origin-top-left max-h-[30vh] w-full min-w-[120px]  overflow-y-auto overflow-x-hidden no-scrollbar py-4 mt-[1px] z-[11] rounded-[5px]  bg-white shadow-lg ring-1 ring-black ring-opacity-5'}>
                                {filteredState.map((state) => (
                                    <Combobox.Option key={state} value={state} className='px-2 py-2'>
                                        {state}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Transition>
                    </>
                )}

            </Combobox>
        </div>
    )
}

export default MyCombobox