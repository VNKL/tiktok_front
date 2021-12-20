import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://vk.com/vnkl_iam">
                VNKL
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(10),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },
}));


export default function MainPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Привет!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Выбери раздел в меню слева и приступай к работе.
                </Typography>
            </Container>
            <Container >
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Все звуки - это все звуки, имеющиеся в базе данных сервсиа на данный момент.
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Избранные звуки - звуки из базы данных сервиса, которые ты добавил в избранное.
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Добавленные звуки - звуки из базы данных сервиса, которые в базу данных добавил ты.
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Абсолютный чарт - чарт звуков по абсолютному приросту количества снятых на них видео.
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Процентный чарт - чарт звуков по приросту количества снятых на них видео в процентах.
                </Typography>
            </Container>
            {/* End hero unit */}
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}