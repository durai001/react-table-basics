import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class monthchartcomponent extends Component {
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
        // console.log(this.state.chartData)
        return (
            <div>
                {/* <label className="x-axis-label">cashflow (INR crore) In Crores</label> */}
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="Bar"
                    lo ader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'cashflow (INR crore)', "carry forward (INR crore)",'PO Count'],
                        ['March', 1000, 400, 200],
                        ['April', 1170, 460, 250],
                        ['May', 660, 1120, 300],
                        ['June', 1030, 540, 350],
                    ]}
                    options={{
                        // Material design options
                        chart: {    
                            title: 'Monthly MRF Milestone',
                            subtitle: 'cashflow (INR crore) In Crores',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
                {/* <Chart
                   width={'100%'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            'Element',
                            'Density',
                            { role: 'style' },
                            {
                                sourceColumn: 0,
                                role: 'annotation',
                                type: 'string',
                                calc: 'stringify',
                            },
                        ],
                        ['Copper', 8.94, '#b87333', null],
                        ['Silver', 10.49, 'silver', null],
                        ['Gold', 19.3, 'gold', null],
                        ['Platinum', 21.45, 'color: #e5e4e2', null],
                    ]}
                    options={{
                        title: 'Density of Precious Metals, in g/cm^3',
                        width: 700,
                        height: 400,
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '6' }}
                />   */}
            </div>
        );
    }
}

export default monthchartcomponent;