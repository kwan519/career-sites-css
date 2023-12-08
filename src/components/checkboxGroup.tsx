import { useState } from "react"

interface ICheckboxGroup {
    inputName: string
    buttonClassName?: string
    containerClassName?: string
    items: { value: string; label: string }[]
}
const CheckboxGroup = ({ inputName, items }: ICheckboxGroup) => {
    const [currentItem, setCurrentItem] = useState<string[]>([])
    return  <div className="flex flex-col justify-start">
        <input type="hidden" name={inputName} value={currentItem} ></input>
        {items.map((item, index) => (
        <div
          key={item.value}
          className="flex items-start cursor-pointer hover:bg-slate-200 px-2 py-2"
          onClick={() => {
            if(currentItem.includes(item.value)) {
                setCurrentItem(currentItem.filter(i => i !== item.value))
            } else {
                setCurrentItem([...currentItem, item.value])
            }
          }}
        >
         <input
              id={`default-checkbox-${index}`}
              type="checkbox"
              value={item.value}
              name="default-radio"
              checked={currentItem.includes(item.value)}
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              style={{ margin: '0' }} />
            <label className="ms-2 font-medium text-gray-900 dark:text-gray-300 cursor-pointer" style={{ marginBottom: '0' }}>{item.label}</label>
        </div>
      ))}
    </div>
}

export default CheckboxGroup