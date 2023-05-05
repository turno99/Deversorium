import React, { useState, useEffect } from 'react'
import HostelCard from '../../HostelCard/HosetlCard'
import {Button, Typography,TextField} from '@material-ui/core'
import {  CircularProgress,Rating, Grid,Paper } from '@mui/material';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getHostelByHostelId } from '../../../actions/hostels';
import { createReview, getReviewsByUserAndHostel } from '../../../actions/Reviews';
import { createComplaint } from '../../../actions/Complaints';
import Swal from 'sweetalert2'
import DefaultMessage from '../../DefaultMessage/DefaultMessage';
import * as api from '../../../api/index'
import { styled } from '@mui/material/styles';
function Hostel() {
  const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = useState(5)
  
  const initialState = { comment: '', complaint: '' };
  const [form, setForm] = useState(initialState);

  // const {tenants, tenantsLoading} =  useSelector((state)=>state.tenants)
  // const {hostels, hostelsLoading} = useSelector((state)=> state.hostels)
  // const {reviews} = useSelector((state)=>state.reviews)
  const [tenants, setTenants] = useState([])
  const [hostels, setHostels] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () =>{

    
    const {data} = await api.getTenantsByUserId(user?.result?._id)
    setTenants([...tenants, data])
    if(data.assigned_room)
    {
      const newData = await api.getHostelByHostelId(data.hostel_id)
      setHostels([...hostels,newData.data])
      const rev = await api.getReviewsByUserAndHostel(user?.result?._id, data.hostel_id)
      setReviews([...reviews,rev.data])
    }
    setLoading(false)

  }
  const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }));
  useEffect(()=>{
    fetchData()
  },[])

    const sendReview = ()=> {
      console.log(reviews)
        const title_text = (reviews.length === 0 || !reviews[0]) ? 'Do you want to send this review': 'You have already reviewed this place. Update?'
        const confirm_text = (reviews.length === 0 || !reviews[0]) ? 'Send review' : 'Update review'
        Swal.fire({
        title: title_text,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: confirm_text,
        denyButtonText: `Edit`,
      }).then(async (result) => {
        var date = new Date()
        const curState={
        user_name:user?.result?.name,
        user_id: user?.result?._id,
        hostel_id:tenants[0].hostel_id,
        stars:value,
        comments:form.comment,
        date_posted: date,
        }
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(reviews.length === 0 || !reviews[0])
        {
          await api.createReview(curState)
            Swal.fire({title:'Review sent successfully',icon:'success'} ).then(()=>{
            window.location.reload(false);
          })
          //fire something
        }
        else 
        {
          console.log(reviews[0]._id)
          await api.updateReview(reviews[0]._id,curState )
          Swal.fire({title:'Review Edited successfully',icon:'success'} ).then(()=>{
            window.location.reload(false);
          })
          //here we update
        }
        
        
      }
      }
      )

    }

    const sendComplaint = () =>{
      var date = new Date()
      const curState={    
        tenant_id: user?.result?._id,
        tenant_name: user?.result?.name,
        description:form.complaint,
        hostel_id:tenants[0].hostel_id,
        hostel_name: tenants[0].hostel_name,
        room_number: tenants[0].room_number,
        room_id:tenants[0].room_id,
        date_raised:date,
      }
      Swal.fire({
        title: 'Do you want to send this complaint?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Send complaint',
        denyButtonText: `Edit`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // dispatch(createComplaint(curState)).then(()=>{
          //   Swal.fire('Complaint submitted!', '', 'success')
          //   window.location.reload(false);
          // })
          await api.createComplaint(curState)
          Swal.fire('Complaint submitted!', '', 'success').then(()=>{
            window.location.reload(false);
          })
          
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info').then(()=>{
            window.location.reload(false);
          })
        }
        
      })
      


    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    
    loading?<CircularProgress/>:
    (
      hostels.length !==0 ?(
      <form>
      
        <Grid container spacing={4}>
          <Grid item xs={8} >
            {/* <Item>Hostel card</Item> */}
            <HostelCard currentUser={user} currentHostel={hostels} currentTenant={tenants} />
          </Grid>
          <Grid item xs={4}>
          {/* <Item>Complaint part</Item> */}
            <Button variant='contained' className={classes.cardActions}>
              Join meal system
            </Button>
            <Typography className={classes.crow2}>
              Any complaints ?
            </Typography>
            <TextField
              onChange={handleChange}
              multiline
              minRows={3}
              variant='outlined'
              label='Your Message'
              name='complaint'
              className={classes.complaint}
              type='text'
            >

            </TextField>
            <Button variant='contained' onClick={sendComplaint} className={classes.cardAction2}>
              Send
            </Button>

          </Grid>
          <Grid item xs={6} style={{ display: 'block' }} >
            {/* <Item> Rating place</Item> */}
            <Rating

              className={classes.rating}
              precision={0.5}
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography className={classes.crow}>
              Leave a detailed review
            </Typography>
            <TextField
              onChange={handleChange}
              multiline
              minRows={3}
              variant='outlined'
              label='Your Message'
              name='comment'
              className={classes.textField}
              type='text'
            >

            </TextField>
            <Button variant='contained' onClick={sendReview} className={classes.cardAction}>
              Send
            </Button>


          </Grid>

          {/* <Grid item xs={6}>
            <Item> text field for review</Item>
            <Typography className={classes.crow}>
              Leave a detailed review
            </Typography>
            <TextField
              onChange={handleChange}
              multiline
              minRows={3}
              variant='outlined'
              label='Your Message'
              name='comment'
              className={classes.textField}
              type='text'
            >

            </TextField>
            <Button variant='contained' onClick={sendReview} className={classes.cardAction}>
              Send
            </Button>
          </Grid> */}


      </Grid>
      </form>
      ):
      (
        <DefaultMessage message='You are not part of any hostel right now'/>
      )
    )
    
  )
}

export default Hostel
