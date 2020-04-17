import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import _ from "lodash";
import moment from "moment";


class monthchartcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.actualTableRows,
            chartValueCash: [], chartValuePO: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.getCurrentFourMonthData()
    }
    getCurrentFourMonthData = () => {
        let { chartData } = { ...this.state }
        let currentYear = moment().year()
        let currentMonth = moment().month()
        let chartValueCash = []
        let chartValuePO = []
        let temp = []
        chartData=chartData.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateA - dateB;
          });

        _.filter(chartData, function (o) {
            let tableRowYear = moment(o.date).year()
            let tableRowMonth = moment(o.date).month()
            if ((currentMonth - 1) <= tableRowMonth && (currentMonth + 2) >= tableRowMonth && currentYear === tableRowYear) {
                o.month = moment(o.date).format("MMMM")
                temp.push(o)
            }
        })
        let obj = _.groupBy(temp, 'month')
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                chartValuePO.push([key, obj[key].length])
                let total = _.sumBy(obj[key], "milestone_inr")
                chartValueCash.push([key, total/10000000])
            }
        }
        this.setState({ chartValueCash, chartValuePO })
    }


    render() {
        let { chartValueCash, chartValuePO } = { ...this.state }

        return (
            <div className="row col-12  ">
                <div className="col-6">
                    <Chart className="mt-1"
                        width={'100%'}
                        height={'380px'}
                        chartType="Bar"
                        lo ader={<div>Loading Chart</div>}
                        data={[
                            ['Month', 'Cashflow (INR Crore)'],
                            ...chartValueCash,
                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: 'Monthly Cashflow Plan',
                                // subtitle: 'cashflow (INR crore) In Crores',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
                <div className="col-6">
                    <Chart className="mt-1"
                        width={'100%'}
                        height={'380px'}
                        chartType="Bar"
                        lo ader={<div>Loading Chart</div>}
                        data={[
                            ['Month', 'Number of PO'],
                            ...chartValuePO,
                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: 'Monthly PO',
                                // subtitle: 'cashflow (INR crore) In Crores',
                            },
                            colors: ['#ffc107']
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>



                {/* <label className="x-axis-label">cashflow (INR crore) In Crores</label> */}

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