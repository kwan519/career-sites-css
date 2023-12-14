import { configureStore } from '@reduxjs/toolkit'
import { userGeoLocationReducer } from './slices/userLocation'

export const store = configureStore({
	reducer: {
		userGeoLocation: userGeoLocationReducer,
	}
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch