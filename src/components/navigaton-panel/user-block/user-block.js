import React from "react";
import UserMenu from "./user-menu";
import Toolbar from "@material-ui/core/Toolbar";


const UserBlock = (props) => {

    const {user} = props

    return (
        <Toolbar>
            <UserMenu user={user} />
        </Toolbar>
    )

}

export default UserBlock