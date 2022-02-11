import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function Profile(props) {

    return (
        <Card sx={{ width: 327, height: 200 }} className='card' >
            <CardMedia className='cardimg'
                component="img"
                sx={{ width: 268.19, height: 170.38 }}
                image='../../Images/Open Peeps.png'
                alt="Profile img"

            />
            <CardContent className='cardcontent'>
                <Typography gutterBottom className='vacation-title' >
                    settings
                </Typography>
                <Typography variant="caption" gutterBottom >
                    History
                </Typography>


            </CardContent>

        </Card>

    );


}

export default Profile;