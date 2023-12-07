import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react'

interface IDropdown {
  inputName: string;
  buttonTitle: string;
  buttonClassName?: string;
  containerClassName?: string;
  items: { value: string; label: string }[]
  onApply: () => void
  defaultValueIndex: number
}

const DropDown = ({ inputName, defaultValueIndex, buttonTitle, buttonClassName, containerClassName, items, onApply }: IDropdown) => {
  const [currentItem, setCurrentItem] = useState<string>(items[defaultValueIndex].value)

  return (
    <Menu as="div" className={`relative inline-block w-full text-left ${containerClassName}`}>
      <input type="hidden" name={inputName} value={currentItem} ></input>
      <Menu.Button className={buttonClassName}>{buttonTitle}  <ChevronDownIcon className='w-6 h-6' /></Menu.Button>

      <Menu.Items
        className={`absolute w-full min-w-[120px] flex flex-col overflow-y-auto  overflow-x-hidden whitespace-nowrap z-20 mt-2 rounded-md  bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        {items.map((item) => (
          <Menu.Item
            as="div"
            key={item.value}
            className="flex items-center mb-4 cursor-pointer w-full hover:bg-slate-200 px-2 py-2"
            onClick={() => setCurrentItem(item.value)}
          >
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              checked={currentItem === item.value}
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              style={{ margin: '0' }} />
            <label className="ms-2 font-medium text-gray-900 dark:text-gray-300 cursor-pointer" style={{ marginBottom: '0' }}>{item.label}</label>
          </Menu.Item>
        ))}
        <div className='flex justify-between px-2'>
          <div className='cursor-pointer underline underline-offset-2 text-slate-400' onClick={() => setCurrentItem(items[defaultValueIndex].value)}>Reset</div>
          <div className='cursor-pointer underline underline-offset-2 text-blue-500' onClick={() => onApply()}>Apply</div>
        </div>

      </Menu.Items>
    </Menu>
  )
}

export default DropDown