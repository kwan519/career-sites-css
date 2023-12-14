import { configureStore } from '@reduxjs/toolkit'
import { userGeoLocationReducer } from './slices/userLocation'
import { searchFilterReducer } from './slices/searchFilters'

export const store = configureStore({
	reducer: {
		userGeoLocation: userGeoLocationReducer,
		searchFilter: searchFilterReducer
	}
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch