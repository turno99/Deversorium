import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Paper,Grid, Button, Card, CardContent, Typography } from '@material-ui/core';
import Input from '../../Input/Input';
import { getHostelByOwnerId } from '../../../actions/hostels';
import {createRoom} from '../../../actions/Rooms'
import Axios from 'axios';
import moment from 'moment';
import ReviewCard from '../../ReviewCard/ReviewCard';
function Hostel() {

    const initialState = { number: '', area: '', rent: '' };
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = { padding: '30px 20px', width: 400, margin: "20px auto", float:"left" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { hostels } = useSelector((state) => state.hostels);
    const handleSubmit =  (e) => {
        //Query to find hostelID using ownerID 
        e.preventDefault()
        var date = new Date()
        dispatch(createRoom({room_number:form.number, hostel_id:hostels._id, hostel_name:hostels.name,area:form.area,rent:form.rent, next_vacancy_date:date}))
        setForm(initialState)
        window.location.reload(false)

    }
    useEffect(()=>{
        dispatch(getHostelByOwnerId(user?.result?._id))
    },[])
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
        {
            hostels.length !== 0?(
                  <Grid container alignItems="stretch" spacing={1} style={{display:'flex'}}>
                      <Grid item xs={6}>
                        <ReviewCard/>
                        <ReviewCard/>
                        <ReviewCard/>
                      </Grid>
                      <Grid item xs={6}>
                          <Paper elevation={20} style={paperStyle}>
                              <Grid align='center'>
                                  <Typography variant="h5">
                                      Add a new Room
                                  </Typography>
                                  <Typography variant='caption' gutterBottom>
                                      Rent is for every individual per month
                                  </Typography>
                              </Grid>
                              <form onSubmit={handleSubmit}>
                                  <Grid container spacing={2}>
                                      <Input name="number" label="number" handleChange={handleChange} type="number" />
                                      <Input name="area" label="area" handleChange={handleChange} type="number" />
                                      <Input name="rent" label="rent" handleChange={handleChange} type="number" />
                                  </Grid>
                                  <Button
                                      style={{ marginTop: "20px", backgroundColor: '#0C21C1', color: 'white' }}
                                      type='submit'
                                      variant='contained'
                                  >Add
                                  </Button>
                              </form>
                          </Paper>
                      </Grid>

                  </Grid>
            ):
            (
                <Grid>
                    <h2> You do not have a hostel right now</h2>
                    <Link to="/HostelForm">
                    <Button variant="contained" startIcon={<AddIcon/>} >Create your hostel
                    </Button>
                    </Link>
                </Grid>
                
            )

        }
      
    </div>
  )
}

export default Hostel
