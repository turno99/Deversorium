import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_HOSTEL, ERROR } from '../constants/actionTypes'

export default (state = { hostelsLoading: true, hostels: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, hostelsLoading: true }
        case 'END_LOADING':
            return { ...state, hostelsLoading: false }
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, hostels: [...state.hostels, action.payload] };
        case FETCH_HOSTEL:
             return{ ...state, hostels: action.payload.hostel };
        case ERROR:
            return {...state, hostelsLoading:false,hostels: []}
        default:
            return state
    }
}