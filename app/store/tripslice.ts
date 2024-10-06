import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Trip {
  id: number;
  name: string;
  activities: string[];
}

interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: [],
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTrip: (state, action: PayloadAction<string>) => {
      const newTrip = {
        id: state.trips.length + 1,
        name: action.payload,  
        activities: [],        
      };
      state.trips.push(newTrip);
    },
    addActivity: (state, action: PayloadAction<{ tripName: string, activity: string }>) => {
      const { tripName, activity } = action.payload;
      const trip = state.trips.find(t => t.name.toLowerCase() === tripName.toLowerCase()); 
      if (trip) {
        trip.activities.push(activity); 
      }
    },
  },
});

export const { addTrip, addActivity } = tripsSlice.actions;
export default tripsSlice.reducer;
