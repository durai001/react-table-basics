import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class monthchartcomponent extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:props.actualTableRows
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    render() {
        console.log(this.state.chartData)
        return (
            <div>
                <Chart
                    width={'800px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Cash Flow', "Due Amount",'Po Counts'],
                        ['March', 1000, 400, 200],
                        ['April', 1170, 460, 250],
                        ['May', 660, 1120, 300],
                        ['June', 1030, 540, 350],
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Monthly MRF mailstone',
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

export default monthchartcomponent;