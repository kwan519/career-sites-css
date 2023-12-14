import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const intialState: SearchFilterType = {
    filterItems: {},
    path: 'orderBy=1'
}

export const searchFilterSlice = createSlice({
    reducers: {
        updateFilterPath: (state) => {
            const keys = Object.keys(state.filterItems)
            const values = keys.map(key => {
                const value = state.filterItems[key]
                if(typeof value === 'number') {
                    return `${key}=${value}`
                }else if(typeof value === 'object') {
                    const valueArr = value as SearchFilterItem[]
                    return valueArr.map(item => `${key}[]=${item.value}`).join('&')
                }else return ''
            }).filter(x => x != '')
            state.path = `${values.join('&')}`
            console.log(state.path)
        },
        updateFilterItems: (state, action: PayloadAction<SeachFilters>) => {
            state.filterItems = action.payload
        }
    },
    name: 'SearchFilterSlice',
    initialState: intialState
})

export const {
    updateFilterItems,
    updateFilterPath
}= searchFilterSlice.actions

export const searchFilterItems = (state: RootState) => state.searchFilter
export const searchFilterReducer = searchFilterSlice.reducer