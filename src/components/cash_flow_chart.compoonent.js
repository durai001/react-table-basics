import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";
import _ from "lodash";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";


class cashflowcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actualTableRows: props.actualTableRows,
            chartData: props.tableRows,
            chartValue: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
    }
    componentDidMount() {
        this.handleMonthChange(new Date())
    }

    handleMonthChange = date => {
        let { actualTableRows } = this.state
        if (date) {
            let chartData = _.filter(actualTableRows, function (o) {
                let selectedYear = moment(date).year()
                let selectedMonth = moment(date).month()
                let tableRowYear = moment(o.date).year()
                let tableRowMonth = moment(o.date).month()
                if (selectedYear === tableRowYear && selectedMonth === tableRowMonth) {
                    return o
                }
            })
            this.setState({ startDate: date, cu9iurrentPage: 1, chartData }, () => this.handleFilter(chartData && chartData[0] && chartData[0].po_number || 0))
        } else {
            this.setState({ chartData: actualTableRows, startDate: null }, () => this.handleFilter(0))
        }
    };  
    handleFilter = (po_number) => {
        let { chartData ,actualTableRows} = { ...this.state }
        console.log(chartData)
        let chartValue = []
        console.log( po_number)
        _.filter(actualTableRows, (o) => {
            if (o.po_number.toString() ===  po_number.toString()) {
                let xAxis=  moment(o.date,"MM/DD/YYYY").format("MMM-YYYY")
                console.log(o[["milestone_inr"]]/10000000) 
                chartValue.push([xAxis, o[["milestone_inr"]]/10000000])
            }
        })
        this.setState({ chartValue, po_number })
    }
    
    render() {
        let { po_number, chartValue, chartData, startDate } = { ...this.state }
        chartData = _.uniqBy(chartData, 'po_number')
        return (
            <div>
                <div className="row filter-option">
                    <div className=" month-year-picker">
                        <DatePicker className="form-control "
                            showMonthYearPicker
                            dateFormat="MM/yyyy"
                            selected={this.state.startDate}
                            placeholderText="Select a month"
                            isClearable
                            onChange={this.handleMonthChange}
                        />
                    </div>
                    <select className="form-control po-select ml-1" value={po_number} onChange={e => { this.handleFilter(e.target.value) }} >
                        {startDate ? chartData && chartData.map(obj => <option key={obj.po_number} value={obj.po_number}>{obj.po_number}</option>) : null}
                    </select>
                </div>
                <div></div>

                <Chart className="mt-1"
                    width={'80%'}
                    height={'380px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Cashflow (INR Crore)'],
                        ...chartValue

                    ]}
                   
                    options={{
                        

                        // Material design options
                        chart: {
                            title: 'Cashflow plan by PO',
                            language:'hi_IN',
                            // subtitle: 'cashflow (INR crore) In Crores',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        );
    }
}

export default cashflowcomponent;