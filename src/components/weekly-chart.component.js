import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import _ from "lodash";
import moment from "moment";
class weekchartcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.actualTableRows,
            chartValueCash: [], chartValuePO: []
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.getCurrentFourWeekData()
    }

    getCurrentFourWeekData = () => {
        let { chartData } = { ...this.state }
        let currentYear = moment().year()
        let currentMonth = moment().month()+1
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
            let tableRowMonth = moment(o.date).month()+1
            let tableRowdate = moment(o.date,"MM/DD/YYYY").date()
            if (currentMonth === tableRowMonth && currentYear === tableRowYear) {
                if (1 <= tableRowdate && 7 >= tableRowdate) {
                    o.week = "1st Week"
                    temp.push(o)
                }
                if (8 <= tableRowdate && 14 >= tableRowdate) {
                    o.week = "2nd Week"
                    temp.push(o)
                }
                if (15 <= tableRowdate && 21 >= tableRowdate) {
                    o.week = "3rd Week"
                    temp.push(o)
                }
                if (22 <= tableRowdate && 31 >= tableRowdate) {
                    o.week = "4th Week"
                    temp.push(o)
                }
            }

        })
        let obj = _.groupBy(temp, 'week')
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                chartValuePO.push([key, obj[key].length])
                let total = _.sumBy(obj[key], "milestone_inr")
                chartValueCash.push([key, total])
            }
        }
        this.setState({ chartValueCash, chartValuePO })
    }


    render() {
        let { chartValueCash, chartValuePO } = { ...this.state }
        return (
            <div className="row col-12  ">
                <div className="col-6">
                    <Chart className="mt-3"
                        width={'100%'}
                        height={'380px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Week', 'cashflow  INR'],
                            ...chartValueCash
                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: 'April Milestone',
                                // subtitle: 'cashflow (INR crore) In Crores',
                            },

                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
                <div className="col-6">
                    <Chart className="mt-3"
                        width={'100%'}
                        height={'386px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Week', 'POs count'],
                            ...chartValuePO
                        ]}
                        options={{
                            hAxis: {
                                minValue: 1,
                              },
                            // Material design options
                            chart: {
                                
                                title: 'April POs count',
                                minValue: 1,
                                // subtitle: 'cashflow (INR crore) In Crores',
                            },
                            colors: ['#ffc107']
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>
        );
    }
}

export default weekchartcomponent;