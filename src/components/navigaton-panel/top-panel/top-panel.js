import React from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import UserBlock from "../user-block";
import { useLocation } from 'react-router-dom'


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    avatar: {
        position: "absolute",
        right: -20
    },
    addAudioField: {
        position: "absolute",
        right: 75
    },
}));


const getLocationName = (path) => {
    if (path === '/') {
        return 'Тарифы'
    } else if (path === '/audios') {
        return 'Все звуки'
    } else if (path === '/favourite') {
        return 'Избранные звуки'
    } else if (path === '/added') {
        return 'Добавленные звуки'
    } else if (path === '/chart_absolute') {
        return 'Абсолютный чарт'
    } else if (path === '/chart_percent') {
        return 'Процентный чарт'
    }
}


const TopPanel = (props) => {

    const classes = useStyles();
    const location = useLocation()
    const {open, handleDrawerOpen, user, parsTrends, updateStats} = props

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {[classes.hide]: open})}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap>
                    {getLocationName(location.pathname)}
                </Typography>

                <div className={classes.avatar}>
                    <UserBlock user={user} parsTrends={parsTrends} updateStats={updateStats}/>
                </div>

            </Toolbar>
        </AppBar>
    )
}


export default TopPanel
