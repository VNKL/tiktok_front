import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";


const AllAudiosPageSkeleton = () => {
    return (
        <Grid container spacing={4} alignItems='center'>

            <Grid item xs={12} sm={12} align='right'>
                <Skeleton variant='rect' height={800}/>
            </Grid>

        </Grid>
    )
}


export default AllAudiosPageSkeleton