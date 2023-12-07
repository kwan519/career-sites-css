import { useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

function MyCombobox() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
                className="form-control ng-untouched ng-pristine ng-valid ng-star-inserted"
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search City and State or Zipcode"
                placeholder="Search City and State or Zipcode" />
            <Combobox.Options className={'absolute z-10 mt-14 min-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                {filteredPeople.map((person) => (
                    <Combobox.Option key={person} value={person}>
                        {person}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}

export default MyCombobox