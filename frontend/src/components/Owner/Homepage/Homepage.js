import React, {useEffect, useState} from 'react'
import {Route, Routes} from "react-router"
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HostelForm from '../HostelForm/HostelForm'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, Button, Card, CardContent, Typography,CircularProgress } from '@material-ui/core';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getRoomRequestsByHostelId } from '../../../actions/RoomRequests';
import RoomRequestList from '../../RoomRequests/RoomRequestList'; 
import { getComplaintsByHostel } from '../../../actions/Complaints';
function Homepage({ setCurrentId }) {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  //console.log(user?.result.name)
  const dispatch = useDispatch();
  const { isLoading, hostels } = useSelector((state) => state.hostels);
  //const {isLoading,roomRequests} = useSelector((state) => state.roomRequests)
  //console.log('owner homepage rendered')
  const queryHostel = (item, dispatch) => new Promise((resolve, reject) => {
  // do anything here
  console.log('dispatch korram')
  dispatch(getHostelByOwnerId(user?.result?._id))  
  resolve();
  
  })
  useEffect(()=>{
    console.log('ya re ba')
    // dispatch(getHostelByOwnerId(user?.result?._id))
    queryHostel({},dispatch).then(()=>{
        console.log(hostels._id)
    })
    
  },[])
  useEffect(()=>{
        console.log('owner homepage useEffect')
        // if( hostels.length ===0)     
        if(hostels !== null )
        {
          //console.log('TEST')
          //console.log(hostels._id)
          dispatch(getComplaintsByHostel(hostels._id))
          dispatch(getRoomRequestsByHostelId(hostels._id))    
        } 
    },[hostels])

  return (
    <div>
    {
      isLoading? <CircularProgress/>:(
        
          !hostels ||hostels.length === 0? <h2>You do not have any hostels right now, go to hostel page to make one</h2>:<RoomRequestList/>    
      )
    }
    </div>
    
  )
}

export default Homepage
