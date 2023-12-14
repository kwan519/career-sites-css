import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const intialState: UserGeoLocation = {
    latitude: 0,
    longitude: 0
}

export const userGeoLocationSlice = createSlice({
    reducers: {
        setUserGeoLocation: (state, action: PayloadAction<UserGeoLocation>) => {
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
        },
        setUserLocality: (state, action: PayloadAction<string>) => {
            state.locality = action.payload
        },
        updateFilterPath: (state) => {
            if (state.locality) {
                state.locality = ''
            }
        }
    },
    name: 'UserGeoLocationSlice',
    initialState: intialState
})

export const {
    setUserGeoLocation,
    setUserLocality
}= userGeoLocationSlice.actions

export const userGeoLocationItems = (state: RootState) => state.userGeoLocation
export const userGeoLocationReducer = userGeoLocationSlice.reducer