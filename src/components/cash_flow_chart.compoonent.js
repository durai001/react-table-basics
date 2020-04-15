import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { NavDropdown, Button } from 'react-bootstrap';

class cashflowcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.actualTableRows
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {
        console.log(this.state.chartData)
        return (
            <div>
                <div className="row">
                    <label className="col-3 text-left mr-2"> Cash Flow </label>
                    <button className="btn btn-primary btn-large col-2 mr-2">Select Year</button>
                    <button className="btn btn-primary btn-large col-2 mr-2">Select Month</button>
                    <button className="btn btn-primary btn-large col-2 ">Select PO</button>

                </div>
                <Chart className="mt-4"
                    width={'800px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Cash Flow', "Due Amount"],
                        ['March', 1000, 400],
                        ['April', 1170, 460],
                        ['May', 660, 1120],
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            // title: 'Cash Flow',
                            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
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