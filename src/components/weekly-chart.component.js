import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class weekchartcomponent extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:props.actualTableRows
        }
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
    }
    render() {
        // console.log(this.state.chartData)
        return (
            <div>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Week', 'cashflow (INR crore)', "carry forward (INR crore)",'PO Count'],
                        ['1st week', 1000, 400, 200],
                        ['2nd week', 1170, 460, 250],
                        ['3rd week', 660, 1120, 300],
                        ['4th week', 1030, 540, 350],
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Week MRF Milestone',
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

export default weekchartcomponent;