import React from 'react';
import ApiService from "../../../../services/api-service";
import AllAudiosTableView from "../../../tables/all-audios-table-view";
import AllAudiosPageSkeleton from "../all-audios-page-skeleton";


class AllAudiosTable extends React.Component {

    state = {
        data: null,
        order: 'desc',
        order_by: 'videos_count',
        currentPage: 0,
    }

    api = new ApiService()

    componentDidMount() {
        this.loadAllAudios()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.order !== this.state.order ||
            prevState.order_by !== this.state.order_by ||
            prevState.pageNumber !== this.state.pageNumber ||
            prevState.title !== this.state.title) {
                this.loadAllAudios()
        } else if (prevProps.method !== this.props.method){
            this.loadAllAudios(true)
        }
    }

    loadAllAudios = (isInit) => {
        const offset = isInit ? 0 : this.state.pageNumber * 15
        this.api.getAllAudios(this.props.method, 15, offset, this.state.order, this.state.order_by, this.state.title)
            .then(this.onDataLoaded)
    }

    onDataLoaded = (data) => {
        if (typeof data !== 'undefined') {
            this.setState({data: data, currentPage: data.currentPage}, () => {if (this.state.data) {}})
        }
    }

    onPageChange = (event, newPageNumber) => {
        this.setState({data: null, pageNumber: newPageNumber}, () => {if (this.state.data) {}})
    }

    onOrderChange = (order, orderBy) => {
        this.setState({data: null, order: order, order_by: orderBy}, () => {if (this.state.order) {}})
    }

    onTitleChange = (title) => {
        this.setState({title: title, pageNumber: 0}, () => {if (this.state.title) {}})
    }

    onLike = (audioId) => {
        this.api.like(audioId)
    }

    render() {
        const {data, order, order_by} = this.state
        const table = data ? <AllAudiosTableView data={data}
                                                 order={order}
                                                 orderBy={order_by}
                                                 onLike={this.onLike}
                                                 onPageChange={this.onPageChange}
                                                 onOrderChange={this.onOrderChange}
                                                 onTitleChange={this.onTitleChange}/> : null
        const spinner = !data ? <AllAudiosPageSkeleton /> : null

        return (
            <div className='campaigns-page'>
                {spinner}
                {table}
            </div>
        )
    }

}


export default AllAudiosTable