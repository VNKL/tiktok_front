import React from "react";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";
import ChartsTable from "./charts-table";
import NoPermissionsBackdrop from "../../no-permissions-backdrop";


export default class ChartPage extends React.Component {
    state = {
        loading: true,
        url: undefined,
        permError: false
    }
    api = new ApiService()

    componentDidMount() {
        this.api.getUser().then(this.onUserLoaded)
    }

    onUserLoaded = (user) => {
        if (typeof user !== 'undefined') {
            this.setState({loading: false, permError: !user.haveAccess}, () => {
                if (this.state.loading) {}
            })
        }
    }

    render() {
        const {loading, permError} = this.state
        const page = !loading && !permError ? <ChartsTable method={this.props.method}/> : null
        const spinner = loading ? <Spinner /> : null
        const error = permError && !spinner ? <NoPermissionsBackdrop text='У тебя нет доступа' /> : null

        return (
            <div>
                {error}
                {spinner}
                {page}
            </div>
        )
    }
}