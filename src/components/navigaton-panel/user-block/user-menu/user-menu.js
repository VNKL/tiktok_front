import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ApiService from "../../../../services/api-service";
import AddAudioAlert from "../../../add-audio-alert";


const useStyles = makeStyles(() => ({
    userMenu: {
        color: 'white'
    }
}));


const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload()
}


const UserMenu = (props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [alert, setAlert] = React.useState(false);
    const [alertText, setAlertText] = React.useState('!');
    const [alertType, setAlertType] = React.useState('success');
    const {user} = props
    const api = new ApiService()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const parsTrends = () => {
        api.parsTrends().then((response) => {
            const text = response ? 'Парсинг трендов запускается' : 'Ошибка запуска парсинга трендов'
            const type = response ? 'success' : 'error'
            setAlertText(text)
            setAlertType(type)
            setAlert(true)
        })
    }

    const updateStats = () => {
        api.updateStats().then((response) => {
            const text = response ? 'Обновление статы запускается' : 'Ошибка запуска обновления статы'
            const type = response ? 'success' : 'error'
            setAlertText(text)
            setAlertType(type)
            setAlert(true)
        })
    }

    const closeAlert = () => {
        setAlert(false)
    }

    return (

        <div>

            <Button className={classes.userMenu}
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
            >
                <Avatar > {user.username.slice(0, 1)} </Avatar>
            </Button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logOut}>Выйти</MenuItem>
                { user.isAdmin ? <MenuItem onClick={parsTrends}>Спарсить тренды</MenuItem> : null}
                { user.isAdmin ? <MenuItem onClick={updateStats}>Обновить стату</MenuItem> : null}
            </Menu>

            { alert ? <AddAudioAlert type={alertType} text={alertText} closeAlert={closeAlert}/> : null }

        </div>
    );
}

export default UserMenu