import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CSVReader from 'react-csv-reader';
// import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";
import { CSVLink } from "react-csv";
import _ from "lodash";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import Monthchart from "./components/month-chart.component";
import Weekchart from "./components/weekly-chart.component";
import Cashflowchart from "./components/cash_flow_chart.compoonent";
import "./styles/dashboard.css"
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let record = [{ "po_number": " 1700001737 - 1", "currency": "EUR", "milestone_amount": 477475.2, "milestone_inr": 39630441.6, "date": "5/20/2020", "actual_date": "7/2/2017", "payment_term_details": "a. 20% payment in advance on presentation of bank guarantee as per format prescribed through our banker in India." }, { "po_number": " 1700001737 - 1", "currency": "EUR", "milestone_amount": 1909900.8, "milestone_inr": 158521766.4, "date": "5/30/2020", "actual_date": "3/13/2018", "payment_term_details": "b. 80% payment by a Letter of Credit will be opened 5 month#s prior to shipping through State Bank of Mysore, Chennai " }, { "po_number": " 1700001757 - 3", "currency": "EUR", "milestone_amount": 479055.2, "milestone_inr": 39761581.6, "date": "2/13/2019", "actual_date": "2/15/2019", "payment_term_details": "a. 20% payment in advance on presentation of bank guarantee as per format prescribed through our banker in India." }, { "po_number": " 1700001757 - 3", "currency": "EUR", "milestone_amount": 1916220.8, "milestone_inr": 159046326.4, "date": "4/3/2020", "actual_date": "4/3/2020", "payment_term_details": "b. 80% payment by a Letter of Credit will be opened 5 month#s prior to shipping through State Bank of Mysore, Chennai " }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 124815.75, "milestone_inr": 10359707.25, "date": "6/20/2020", "actual_date": "7/6/2018", "payment_term_details": "a.15% payment in advance on presentation of bank guarantee as per format prescribed by our banker in India (Citi Bank)." }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 582473.5, "milestone_inr": 48345300.5, "date": "4/9/2019", "actual_date": "4/9/2019", "payment_term_details": "b. 75% payment by a Letter of Credit will be opened 3 month's prior to the shipment" }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 83210.5, "milestone_inr": 6906471.5, "date": "7/29/2019", "actual_date": "7/29/2019", "payment_term_details": "c. 10% after installation & commissioning and factry acceptance" }, { "po_number": " 1700001790 - 1", "currency": "EUR", "milestone_amount": 194200, "milestone_inr": 16118600, "date": "5/10/2020", "actual_date": "1/31/2018", "payment_term_details": "a.20% payment in advance on presentation of a bank guarantee as per format prescribed by our banker in India." }, { "po_number": " 1700001790 - 1", "currency": "EUR", "milestone_amount": 679700, "milestone_inr": 56415100, "date": "09/04/2019", "actual_date": "9/4/2019", "payment_term_details": "b.  80% will be confirmed by an ILC of which 70% will be paid against shipping documents as stated in the LC and  10% will be after  commissioning against Warranty Guarantee for 10% valid throughout the warranty period, payable latest 120 days from shipment date" }, { "po_number": " 1700002036 - 1", "currency": "USD", "milestone_amount": 2000199, "milestone_inr": 152015124, "date": "3/20/2020", "actual_date": "3/25/2019", "payment_term_details": "Payment terms: LC at Sight" }, { "po_number": " 1700002134 - 0", "currency": "EUR", "milestone_amount": 44064.5, "milestone_inr": 3657353.5, "date": "12/06/18", "actual_date": "12/12/2018", "payment_term_details": "a.10% payment in advance on presentation of a bank guarantee as per format prescribed by our banker in India. The ABG should be an advising." }, { "po_number": " 1700002134 - 0", "currency": "EUR", "milestone_amount": 396580.5, "milestone_inr": 32916181.5, "date": "8/10/2019", "actual_date": "8/10/2019", "payment_term_details": "b. 90% against presentation of Shipping documents and receipt of Performance Bank Gurantee (Refer warranty Clause) " }, { "po_number": " 1700002205 - 2", "currency": "USD", "milestone_amount": 11466, "milestone_inr": 871416, "date": "03/25/2019", "actual_date": "3/25/2019", "payment_term_details": "Payment terms : 10% advance and balance by LC." }, { "po_number": " 1700002205 - 2", "currency": "USD", "milestone_amount": 103194, "milestone_inr": 7842744, "date": "6/20/2020", "actual_date": "6/3/2019", "payment_term_details": "Payment terms : 10% advance and balance by LC." }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 6144000, "milestone_inr": 6144000, "date": "01/09/17", "actual_date": "1/9/2017", "payment_term_details": "10% ADVANCE AGAINST SUBMISSION OF BANK GUARANTEE FOR THE ADVANCE AMOUNT VALID TILL DELIVERY OF ALL THE MATERIALS AT OUR SITE,   AND AGAINST SUBMISSION OF PERFORMANCE BANKGUARANTEE FOR 10% BASIC VALUE VALID FOR 1 YEAR FROM THE DATE OF COMMISSIONING.'" }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 98304000, "milestone_inr": 98304000, "date": "4/30/2019", "actual_date": "4/30/2019", "payment_term_details": "80% WITH ALL TAXES IN 30 DAYS FROM DELIVERY" }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 6144000, "milestone_inr": 6144000, "date": "6/29/2019", "actual_date": "6/29/2020", "payment_term_details": "AND BALANCE 10% AFTER COMPLETION OF COMMISSIONING" }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 55141275, "milestone_inr": 55141275, "date": "01/17/2019", "actual_date": "1/17/2019", "payment_term_details": "a. 25% of basic price Rs.5,83,27,875 will be paid as advance on receipt of your order acceptance and submission of Corporate Guarantee valid till completion of supply.',   " }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 286734630, "milestone_inr": 286734630, "date": "9/6/2020", "actual_date": "9/6/2020", "payment_term_details": "b. 65 % with taxes immediately after delivery" }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 22056510, "milestone_inr": 22056510, "date": "11/28/2020", "actual_date": "11/28/2020", "payment_term_details": " and balance 10% after commissioning.'" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 12090000, "milestone_inr": 12090000, "date": "6/02/2020", "actual_date": "2/7/2019", "payment_term_details": "10% ADVANCE AGAINST SUBMISSION OF BANK GUARANTEE FOR THE ADVANCE AMOUNT VALID TILL DELIVERY OF ALL THE MATERIALS AT OUR SITE,  AND AGAINST SUBMISSION OF PERFORMANCE BANKGUARANTEE FOR 10% BASIC VALUE VALID FOR 1 YEAR FROM THE DATE OF COMMISSIONING.'" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 193440000, "milestone_inr": 193440000, "date": "6/10/2020", "actual_date": "12/30/2019", "payment_term_details": "80% WITH ALL TAXES IN 30 DAYS FROM DELIVERY" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 12090000, "milestone_inr": 12090000, "date": "2/28/2020", "actual_date": "2/28/2020", "payment_term_details": " AND BALANCE 10% AFTER COMPLETION OF COMMISSIONING" }, { "po_number": 4300068332, "currency": "INR", "milestone_amount": 107575000, "milestone_inr": 107575000, "date": "03/26/2019", "actual_date": "3/26/2019", "payment_term_details": "a. 25% of basic price Rs.10,75,75,000 will be paid as advance on receipt of your order ." }, { "po_number": 4300068332, "currency": "INR", "milestone_amount": 645450000, "milestone_inr": 645450000, "date": "4/9/2020", "actual_date": "4/15/2020", "payment_term_details": "b. Balance with taxes in 10 days after receipt of materials." }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 42773225, "milestone_inr": 42773225, "date": "01/17/2019", "actual_date": "1/17/2019", "payment_term_details": "a. 25% of basic price Rs.4,39,67,700 will be paid as advance on receipt of your order acceptance and submission of Corporate Guarantee valid till completion of supply.  " }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 222420770, "milestone_inr": 222420770, "date": "12/7/2019", "actual_date": "12/7/2019", "payment_term_details": "b. 65 % with taxes immediately after delivery" }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 17109290, "milestone_inr": 17109290, "date": "2/28/2020", "actual_date": "2/28/2020", "payment_term_details": "and balance 10% after commissioning." }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 193095000, "milestone_inr": 193095000, "date": "02/07/19", "actual_date": "2/7/2019", "payment_term_details": "25% advance agsint submission of corporate Guarantee(already paid).. " }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 1004094000, "milestone_inr": 1004094000, "date": "1/15/2020", "actual_date": "1/15/2020", "payment_term_details": "L/C will be opened for 65% of Basic Order Value on receipt of Order acknowldegement payable in 180 days from the date of despatch. 100% GST will be paid agaisnt depatch" }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 77238000, "milestone_inr": 77238000, "date": "4/7/2020", "actual_date": "4/22/2020", "payment_term_details": "10% will be paid after commissioning." }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 53848084.5, "milestone_inr": 53848084.5, "date": "02/25/2019", "actual_date": "2/25/2019", "payment_term_details": "a. 15% of basic order value as advance against order acknowledgement and submission ABG for 15% of basic order value in the format given by us valid till the completion of supply.  for 10% of basic order value valid for 12 months from date of commissioning or 18 months from sate of supply. PBG shall be submitted along with the last consignment" }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 538480845, "milestone_inr": 538480845, "date": "04/25/20", "actual_date": "4/30/2020", "payment_term_details": "b. 75%with taxes in 15 days after delivery of materials at site on pro-rata basis" }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 35898723, "milestone_inr": 35898723, "date": "3/30/2021", "actual_date": "3/30/2021", "payment_term_details": "c. 10% against submission of PBG" }, { "po_number": 4300068174, "currency": "INR", "milestone_amount": 10150000, "milestone_inr": 10150000, "date": "03/20/2019", "actual_date": "3/20/2019", "payment_term_details": "a. 25% of basic price Rs.1,01,50,000 will be paid as advance on receipt of your order acceptance and receipt of corporate guarantee. " }, { "po_number": 4300068174, "currency": "INR", "milestone_amount": 60900000, "milestone_inr": 60900000, "date": "8/17/2019", "actual_date": "8/17/2019", "payment_term_details": " b. Balance 75% 5 with taxes will be paid on material receipt and submission of" }, { "po_number": 4300068331, "currency": "INR", "milestone_amount": 41231250, "milestone_inr": 41231250, "date": "03/26/2019", "actual_date": "3/26/2019", "payment_term_details": "a. 25% of basic price Rs.4,12,31,250 will be paid as advance on receipt of your order . " }, { "po_number": 4300068331, "currency": "INR", "milestone_amount": 247387500, "milestone_inr": 247387500, "date": "3/2/2020", "actual_date": "4/5/2020", "payment_term_details": "b. Balance with taxes in 10 days after receipt of materials." }]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection', number_of_po: 0, po_milestone: 0,
      sortType: true,
      rowsPerPageOptions: [10, 20, 30],
      currentPage: 1, rowsPerPage: 10, selectAllRow: false,
      tableHeader: ["po_number", "date", "milestone_inr"],
      tableRows: record,
      actualTableRows: record,
      tableTitle: "Cashflow Dashboard"
    }
  }

  handleForce = files => {
    if (files && files[0] && Object.keys(files[0])) {
      let keys = Object.keys(files[0])
      // console.log(JSON.stringify(files))
      // adding id and selected key in table rows

      files.forEach((element, index) => {
        // element.id = index
        element.date = moment(element.date).format("DD/MM/YYYY")
        // element.isSelected = false
      });

      this.setState({ selectAllRow: false, actualTableRows: files, tableHeader: keys, tableRows: files, dateRange: undefined })
    } else {
      alert("No Rows Found!")
    }
    document.getElementById("ObiWan").value = null
  }

  handleDarkSideForce = error => {
    // console.log(error)
  }

  handleChangePage = (event, newPage) => {
    this.setState({ currentPage: newPage + 1 })
    event.target.value = null
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  };

  handleTableRows = (tableRows) => {
    let { currentPage, rowsPerPage } = this.state
    var pg = currentPage || 1,
      pgSize = rowsPerPage || 100,
      offset = (pg - 1) * pgSize;
    tableRows = _.drop(tableRows, offset).slice(0, pgSize);
    return tableRows
  }
  sortTable = (sortBy) => {
    // let { actualTableRows, sortType } = this.state
    // actualTableRows = _.sortBy(actualTableRows, function (o) {
    //   console.log(sortBy)
    //   if (sortBy === "date") {
    //     return moment(o[sortBy]);
    //   } else {
    //     return o[sortBy]
    //   }
    // })
    // if (sortType) {
    // } else {
    //   actualTableRows = actualTableRows.reverse();
    //   this.setState({ actualTableRows })
    // }
    // this.setState({ actualTableRows, tableRows: actualTableRows, sortBy, sortType: !sortType })
  }
  // table sorting
  // filterByDate = (dateObj) => {
  //   this.setState(dateObj, () => {
  //     let { startDate, endDate, actualTableRows } = this.state
  //     console.log(startDate, endDate)
  //     if (startDate && endDate) {
  //       let tableRows = _.filter(actualTableRows, function (o) {
  //         // // console.log(moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(o.date) >= moment(startDate))
  //         // // console.log(new Date(o.date), new Date(startDate), moment(o.date), moment(startDate),
  //         //   moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY"))
  //         if (moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") >= moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY") && moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") <= moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY")) {
  //           return o
  //         }
  //       });
  //       console.log(tableRows.length)
  //       this.setState({ currentPage: 1, tableRows: tableRows })
  //     }
  //   })
  // }

  handleSelect = (row_id, selected) => {
    let { tableRows } = this.state
    if (row_id === 'All') {
      tableRows.forEach(element => {
        element.isSelected = selected
      });
      // this.setState({ selectAllRow: selected })
    } else {
      tableRows.forEach(element => {
        if (row_id === element.id) {
          element.isSelected = selected
        }
      });
    }

    let isAllSelected = _.filter(tableRows, { isSelected: false })
    this.setState({ tableRows, selectAllRow: isAllSelected.length === 0 })
  }

  filterByDate = (dateRange, states) => {
    console.log(moment(dateRange.start, "DD/MM/YYYY"), moment(dateRange.end, "DD/MM/YYYY"))
    let { actualTableRows } = this.state
    if (dateRange.start && dateRange.end) {
      let tableRows = _.filter(actualTableRows, function (o) {
        //console.log(moment(o.date, "MM/DD/YYYY"))
        // if (moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") >= moment(dateRange.start, "DD/MM/YYYY").format("DD/MM/YYYY") &&
        //   moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") <= moment(dateRange.end, "DD/MM/YYYY").format("DD/MM/YYYY")) {
        //   return o
        // }
        // console.log(moment(o.date, "DD/MM/YYYY").isAfter(moment(dateRange.start, "DD/MM/YYYY"),'day'))
        // console.log(moment(dateRange.start, "DD/MM/YYYY").isAfter(moment(o.date, "DD/MM/YYYY"),'day'))
        if ((moment(o.date, "MM/DD/YYYY").isAfter(moment(dateRange.start, "MM/DD/YYYY"), 'day') ||
          moment(o.date, "MM/DD/YYYY").isSame(moment(dateRange.start, "MM/DD/YYYY"), 'day')) &&
          (moment(dateRange.end, "MM/DD/YYYY").isAfter(moment(o.date, "MM/DD/YYYY"), 'day') ||
            moment(dateRange.end, "MM/DD/YYYY").isSame(moment(o.date, "MM/DD/YYYY"), 'day'))) {
          // console.log(o)
          return o
        }
      });
      this.setState({ currentPage: 1, tableRows: tableRows })
    }
    this.setState({ dateRange })
  };

  removeFilter = () => {
    this.setState({
      tableRows: this.state.actualTableRows, dateRange: undefined
    })
  }
  componentDidMount() {
    let totalAmountChash = _.sumBy(this.state.actualTableRows, function (o) { return o["milestone_inr"]; })
    this.setState({ totalAmountChash })
    this.handleMonthChange(new Date())
  }

  handleMonthChange = date => {
    // console.log(date)

    let { actualTableRows } = this.state
    if (date) {
      let tableRows = _.filter(actualTableRows, function (o) {
        let selectedYear = moment(date).year()
        let selectedMonth = moment(date).month()
        let tableRowYear = moment(o.date).year()
        let tableRowMonth = moment(o.date).month()
        if (selectedYear === tableRowYear && selectedMonth === tableRowMonth) {
          // console.log(o)
          return o
        }
      })
      let totalAmount = _.sumBy(tableRows, function (o) { return o["milestone_inr"]; })
      this.setState({ startDate: date, number_of_po: tableRows.length, po_milestone: totalAmount })
    } else {
      this.setState({ startDate: null })
    }
  };

  render() {
    let { tableTitle, dateRange, number_of_po, po_milestone, totalAmountChash, showCalender, tableHeader, actualTableRows, selectAllRow, tableRows, rowsPerPageOptions, currentPage, rowsPerPage, startDate, endDate, key } = this.state
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header =>
        header
          .toLowerCase()
          .replace(/\W/g, '_')
    }
    let totalAmount = 0
    if (tableRows && tableRows.length > 0) {
      totalAmount = _.sumBy(tableRows, function (o) { return o["milestone_inr"]; })
    }

    return (
      <div className=" App">

        <CSVReader
          cssClass="csv-reader-input d-none "
          onFileLoaded={this.handleForce}
          onError={this.handleDarkSideForce}
          parserOptions={papaparseOptions}
          inputId="ObiWan"
          inputStyle={{ color: 'red' }}
        />
        <div className="card-body">
          <h2 className="d-inline">
            {tableTitle}
          </h2>


          <div className="row">
            <div className="col-12">
              <div className="card-header status-card">
                <div className="row">
                  <div className="col-3">
                    {/* <div className="po_nunmber-circle">
                      <lable>{actualTableRows.length}</lable>
                    </div> */}
                    <b className="text-danger">Number of POs: </b>
                    <div className="ml-2">{number_of_po}</div>

                  </div>
                  <div className="col-6">
                    {/* <lable>Select Month </lable> */}
                    <div className="month-picker">
                      <DatePicker className="form-control"
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        selected={this.state.startDate}
                        placeholderText="Select a month"
                        isClearable
                        onChange={this.handleMonthChange}
                      />
                    </div>
                  </div>
                  <div className="col-3  ">
                    {/* <div className="po_nunmber-circle">
                      <lable className="wrap-text">{totalAmountChash && totalAmountChash.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                      })}</lable>
                    </div> */}
                    <b className="text-danger"> PO Milestone: </b>
                    <div className="wrap-text ml-2">{po_milestone && po_milestone.toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                      style: 'currency',
                      currency: 'INR'
                    })}</div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 card">
              <Monthchart actualTableRows={actualTableRows} />
            </div>
            <div className="col-6 card">
              <Cashflowchart actualTableRows={actualTableRows} />
            </div>

            <div className="col-6 card">
              <Weekchart actualTableRows={actualTableRows} />
            </div>
            <div className="col-6 card ">

              {/* <button className="btn btn-primary  float-right" data-toggle="tooltip"
                title="load CSV" onClick={e => { document.getElementById("ObiWan").click(); document.getElementById("ObiWan").value = null }}>
                <i class="fas fa-file-download fa-lg mr-2"></i>
            upload file
            </button> */}
              {tableHeader && tableHeader.length > 0 ?
                < div className="mt-4 custom-table">
                  {tableRows && tableRows.length > 0 ?
                    <div className="float-left" >
                      <CSVLink filename={"MRF.csv"} data={tableRows} id="CSVLink">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning"
                          data-toggle="tooltip"
                          title="Download as a CSV">
                          <i class="fa fa-upload  fa-lg mr-2"></i>
                    Export CSV
              </button>
                      </CSVLink>
                      <lable className="text-bold font-weight-bold text-danger ml-2">Total Milestone Amount is: </lable>
                      <span className="font-weight-bold ">{totalAmount && totalAmount.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                      })}</span>

                      <span className="text-bold font-weight-bold text-danger ml-2">PO count : </span><label>{tableRows && tableRows.length}</label>
                    </div>
                    : null}

                  <span>
                    {/* <div className="date-range-picker">
                    <DatePicker className="form-control"
                      selected={startDate}  
                      onChange={date => this.setState(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <DatePicker className="form-control ml-1"  
                      selected={endDate}
                      onChange={date => this.setState(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                    </div> */}
                    <button className="btn btn-primary  float-right " data-toggle="tooltip"
                      title="Filter by date" onClick={e => this.setState({ showCalender: !showCalender })}>
                      {dateRange ?
                        <lable className="form-control d-inline mr-2 "> {dateRange.start.format("DD-MM-YYYY")
                          + " | " +
                          dateRange.end.format("DD-MM-YYYY")}
                          <button className="btn btn-danger btn-sm ml-2 mb-1" onClick={this.removeFilter}
                          ><i class="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </lable>
                        : null}

                      <i class="fa fa-calendar fa-lg " aria-hidden="true"></i>
                    </button>



                    {showCalender ?
                      <div className="card-body date-picker color-picker-bottom " onMouseLeave={() => this.setState({ showCalender: false })} >
                        <DateRangePicker
                          value={this.state.dateRange}
                          onSelect={this.filterByDate}
                          singleDateRange={true}
                        />
                      </div>
                      : null}

                  </span>


                  <table className="table table-hover ">
                    <thead>
                      <tr>
                        {/* select all rows */}

                        {/* <th>
                      <Checkbox
                        onChange={() => this.handleSelect('All', !selectAllRow)}
                        checked={selectAllRow}
                        inputProps={{ 'aria-labelledby': 1 }}
                      /><span>Select All</span></th> */}
                        {/* {tableHeader && tableHeader.map((header, index) => <th className="c-pointer" key={index} style={{ width: header === "payment_term_details" ? "50%" : "" }} onClick={e => this.sortTable(header)}>{header}</th>)} */}
                        <th className="c-pointer" onClick={e => this.sortTable('po_number')}>PO Number</th>
                        <th className="c-pointer" onClick={e => this.sortTable('date')}>Date</th>
                        <th className="c-pointer" onClick={e => this.sortTable('milestone_inr')}>Milestone INR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows && tableRows.map((rowObj, index) => <tr key={index}>
                        {/* select all individual row */}

                        {/* <td>
                      <Checkbox
                        onChange={() => this.handleSelect(rowObj.id, rowObj.isSelected ? false : true)}
                        checked={rowObj.isSelected ? true : false}
                        inputProps={{ 'aria-labelledby': 1 }}
                      /></td> */}
                        {tableHeader && tableHeader.map((header, i) =>
                          <td key={i}>

                            {header === "date" ? moment(rowObj[header], "MM/DD/YYYY").format("DD/MM/YYYY") : header === "milestone_inr" ?
                             rowObj[header]
                            .toLocaleString('en-IN', {
                              maximumFractionDigits: 2,
                              style: 'currency',
                              currency: 'INR'
                            })
                             : rowObj[header]}</td>
                        )}
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                : null}
            </div>
          </div>



          {/* pagination */}

          {/* {tableRows && tableRows.length ?
            <TablePagination
              refs="tablePagination"
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={tableRows.length}
              rowsPerPage={rowsPerPage}
              page={currentPage - 1}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            /> : null} */}
        </div>

      </div >
    );
  }
}

export default App;


