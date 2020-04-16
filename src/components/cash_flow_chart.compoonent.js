import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { NavDropdown, Button } from 'react-bootstrap';

class cashflowcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.actualTableRows,
            thisMonth: (new Date()).getMonth() + 1,
            thisYear: (new Date()).getFullYear(),
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
    }
    render() {
        // console.log(this.state.chartData)
        let { thisMonth, thisYear, po_number, chartData } = { ...this.state }
        let minOffset = 0, maxOffset = 20;
        let allYears = [];
        for (let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear - x)
        }
        let monthCount = 12;
        let allMonth = [];
        for (let x = 1; x <= monthCount; x++) {
            allMonth.push(x)
        }
        const monthList = allMonth.map((x) => { return (<option key={x} value={x}>{x}</option>) });
        const yearList = allYears.map((x) => { return (<option key={x} value={x}>{x}</option>) });
        console.log(chartData)
        return (
            <div>
                <div className="row filter-option">
                    {/* <div className="col-4 mr-2 text-left cash-flow-title">
                    <span className="text-left"> cashflow (INR crore) </span><br></br>
                    <span className="text-left sub-title"> cashflow (INR crore) In Crores </span>
                    </div> */}

                    {/* <button className="btn btn-primary btn-large col-2 mr-2">{yearList}</button> */}
                    {/* <button className="btn btn-primary btn-large col-2 mr-2">Select Month</button> */}
                    {/* <button className="btn btn-primary btn-large col-2 ">Select PO</button> */}
                    <div className="col-4 mr-2">

                    </div>
                    <select className="form-control btn-primary year-select  col-2 mr-2" value={thisYear} onChange={e => { this.setState({ thisYear: e.target.value }) }}>{yearList}</select>
                    <select className="form-control btn-primary year-select  col-2 mr-2" value={thisMonth} onChange={e => { this.setState({ thisMonth: e.target.value }) }} >{monthList}</select>
                    <select className="form-control btn-primary po-select" value={po_number} onChange={e => { this.setState({ po_number: e.target.value }) }} >
                        <option defaultValue={true}   >Select PO</option>
                        {chartData && chartData.map(obj => <option key={obj.po_number} value={obj.po_number}>{obj.po_number}</option>)}
                    </select>

                </div>
                <Chart className=""
                    width={'100%'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'cashflow (INR crore)', "carry forward (INR crore)"],
                        ['March', 1000, 400],
                        ['April', 1170, 460],
                        ['May', 660, 1120],
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'cashflow (INR crore)',
                            subtitle: 'cashflow (INR crore) In Crores',
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