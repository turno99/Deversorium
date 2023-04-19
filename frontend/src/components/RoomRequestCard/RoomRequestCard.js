import React from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../images/Order Placed.png'
function RoomRequestCard({ roomRequest, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const allow = ()=>{

        //When allow is called,
        //we want to allocate the room from next month to the user 
        // user_id: {type: String, required: true},
        // user_name: String,
        // room_id: {type: String, required: true},
        // room_number: String,
        // hostel_id: {type: String, required: true},
        // hostel_name: String,
        // date_issued: Date

        // roomRequest.user_id is to be queried to find the tenant 
        // then that user needs to be updated so their room_id is roomRequest.room_id 

    }
    
  return (
    <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        <Card raised elevation={6}>
            <CardMedia
                component="img"
                height='200'
                image={cardImage}
            >

            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                This is where the card title will be
                </Typography>
                <Typography variant='body2' >
                Weee wooo wee wooo
                </Typography>
                <Typography variant='body2' >
                wooo weee wooo weee
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={allow}>Allow tenant</Button>
            </CardActions>
        </Card>
    </Box>
    
  )
}

export default RoomRequestCard
