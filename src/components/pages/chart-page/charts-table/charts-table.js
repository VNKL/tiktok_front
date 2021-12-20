import React from 'react';
import ApiService from "../../../../services/api-service";
import ChartsTableView from "../../../tables/charts-table-view";
import ChartsPageSkeleton from "../charts-page-skeleton";


class ChartsTable extends React.Component {

    state = {
        data: null,
        currentPage: 0,
    }

    api = new ApiService()

    componentDidMount() {
        this.loadChart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageNumber !== this.state.pageNumber) {
            this.loadChart()
        } else if (prevProps.method !== this.props.method){
            this.loadChart(true)
        }
    }

    loadChart = (isInit) => {
        const offset = isInit ? 0 : this.state.pageNumber * 15
        this.api.getChart(this.props.method, 15, offset).then(this.onDataLoaded)
    }

    onDataLoaded = (data) => {
        if (typeof data !== 'undefined') {
            this.setState({data: data, currentPage: data.currentPage}, () => {if (this.state.data) {}})
        }
    }

    onPageChange = (event, newPageNumber) => {
        this.setState({data: null, pageNumber: newPageNumber}, () => {if (this.state.data) {}})
    }

    render() {
        const {data} = this.state
        const orderBy = this.props.method === 'getAbsoluteChart' ? 'count_delta' : 'count_delta_percent'
        const table = data ? <ChartsTableView data={data}
                                              orderBy={orderBy}
                                              onPageChange={this.onPageChange} /> : null
        const spinner = !data ? <ChartsPageSkeleton /> : null

        return (
            <div className='campaigns-page'>
                {spinner}
                {table}
            </div>
        )
    }

}


export default ChartsTable