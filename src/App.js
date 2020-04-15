import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CSVReader from 'react-csv-reader';
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";
import { CSVLink } from "react-csv";
import _ from "lodash";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      sortType: true,
      rowsPerPageOptions: [10, 20, 30],
      currentPage: 1, rowsPerPage: 10, selectAllRow: false,
      tableHeader: ["po_number", "currency", "milestone_amount", "date", "payment_term_details"],
      tableRows: [{ "po_number": " 1700001737 - 1", "currency": "EUR", "milestone_amount": 477475.2, "date": "01/04/17", "payment_term_details": "a. 20% payment in advance on presentation of bank guarantee as per format prescribed through our banker in India." }, { "po_number": " 1700001737 - 1", "currency": "EUR", "milestone_amount": 1909900.8, "date": "02/04/17", "payment_term_details": "b. 80% payment by a Letter of Credit will be opened 5 month#s prior to shipping through State Bank of Mysore, Chennai " }, { "po_number": " 1700001757 - 3", "currency": "EUR", "milestone_amount": 479055.2, "date": "03/04/17", "payment_term_details": "a. 20% payment in advance on presentation of bank guarantee as per format prescribed through our banker in India." }, { "po_number": " 1700001757 - 3", "currency": "EUR", "milestone_amount": 1916220.8, "date": "04/04/17", "payment_term_details": "b. 80% payment by a Letter of Credit will be opened 5 month#s prior to shipping through State Bank of Mysore, Chennai " }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 124815.75, "date": "05/04/17", "payment_term_details": "a.15% payment in advance on presentation of bank guarantee as per format prescribed by our banker in India (Citi Bank)." }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 582473.5, "date": "06/04/17", "payment_term_details": "b. 75% payment by a Letter of Credit will be opened 3 month's prior to the shipment" }, { "po_number": " 1700001778 - 1", "currency": "EUR", "milestone_amount": 83210.5, "date": "07/04/17", "payment_term_details": "c. 10% after installation & commissioning and factry acceptance" }, { "po_number": " 1700001790 - 1", "currency": "EUR", "milestone_amount": 194200, "date": "08/04/17", "payment_term_details": "a.20% payment in advance on presentation of a bank guarantee as per format prescribed by our banker in India." }, { "po_number": " 1700001790 - 1", "currency": "EUR", "milestone_amount": 679700, "date": "09/04/17", "payment_term_details": "b.  80% will be confirmed by an ILC of which 70% will be paid against shipping documents as stated in the LC and  10% will be after  commissioning against Warranty Guarantee for 10% valid throughout the warranty period, payable latest 120 days from shipment date" }, { "po_number": " 1700002036 - 1", "currency": "USD", "milestone_amount": 2000199, "date": "10/04/17", "payment_term_details": "Payment terms: LC at Sight" }, { "po_number": " 1700002134 - 0", "currency": "EUR", "milestone_amount": 44064.5, "date": "11/04/17", "payment_term_details": "a.10% payment in advance on presentation of a bank guarantee as per format prescribed by our banker in India. The ABG should be an advising." }, { "po_number": " 1700002134 - 0", "currency": "EUR", "milestone_amount": 396580.5, "date": "12/04/17", "payment_term_details": "b. 90% against presentation of Shipping documents and receipt of Performance Bank Gurantee (Refer warranty Clause) " }, { "po_number": " 1700002205 - 2", "currency": "USD", "milestone_amount": 11466, "date": "13/04/17", "payment_term_details": "Payment terms : 10% advance and balance by LC." }, { "po_number": " 1700002205 - 2", "currency": "USD", "milestone_amount": 103194, "date": "14/04/17", "payment_term_details": "Payment terms : 10% advance and balance by LC." }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 6144000, "date": "15/04/17", "payment_term_details": "10% ADVANCE AGAINST SUBMISSION OF BANK GUARANTEE FOR THE ADVANCE AMOUNT VALID TILL DELIVERY OF ALL THE MATERIALS AT OUR SITE,   AND AGAINST SUBMISSION OF PERFORMANCE BANKGUARANTEE FOR 10% BASIC VALUE VALID FOR 1 YEAR FROM THE DATE OF COMMISSIONING.'" }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 98304000, "date": "16/04/17", "payment_term_details": "80% WITH ALL TAXES IN 30 DAYS FROM DELIVERY" }, { "po_number": 4300056603, "currency": "INR", "milestone_amount": 6144000, "date": "17/04/17", "payment_term_details": "AND BALANCE 10% AFTER COMPLETION OF COMMISSIONING" }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 55141275, "date": "18/04/17", "payment_term_details": "a. 25% of basic price Rs.5,83,27,875 will be paid as advance on receipt of your order acceptance and submission of Corporate Guarantee valid till completion of supply.',   " }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 286734630, "date": "19/04/17", "payment_term_details": "b. 65 % with taxes immediately after delivery" }, { "po_number": 4300066650, "currency": "INR", "milestone_amount": 22056510, "date": "20/04/17", "payment_term_details": " and balance 10% after commissioning.'" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 12090000, "date": "21/04/17", "payment_term_details": "10% ADVANCE AGAINST SUBMISSION OF BANK GUARANTEE FOR THE ADVANCE AMOUNT VALID TILL DELIVERY OF ALL THE MATERIALS AT OUR SITE,  AND AGAINST SUBMISSION OF PERFORMANCE BANKGUARANTEE FOR 10% BASIC VALUE VALID FOR 1 YEAR FROM THE DATE OF COMMISSIONING.'" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 193440000, "date": "22/04/17", "payment_term_details": "80% WITH ALL TAXES IN 30 DAYS FROM DELIVERY" }, { "po_number": 4300067152, "currency": "INR", "milestone_amount": 12090000, "date": "23/04/17", "payment_term_details": " AND BALANCE 10% AFTER COMPLETION OF COMMISSIONING" }, { "po_number": 4300068332, "currency": "INR", "milestone_amount": 107575000, "date": "24/04/17", "payment_term_details": "a. 25% of basic price Rs.10,75,75,000 will be paid as advance on receipt of your order ." }, { "po_number": 4300068332, "currency": "INR", "milestone_amount": 645450000, "date": "25/04/17", "payment_term_details": "b. Balance with taxes in 10 days after receipt of materials." }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 42773225, "date": "26/04/17", "payment_term_details": "a. 25% of basic price Rs.4,39,67,700 will be paid as advance on receipt of your order acceptance and submission of Corporate Guarantee valid till completion of supply.  " }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 222420770, "date": "27/04/17", "payment_term_details": "b. 65 % with taxes immediately after delivery" }, { "po_number": 4300066649, "currency": "INR", "milestone_amount": 17109290, "date": "28/04/17", "payment_term_details": "and balance 10% after commissioning." }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 193095000, "date": "29/04/17", "payment_term_details": "25% advance agsint submission of corporate Guarantee(already paid).. " }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 1004094000, "date": "30/04/17", "payment_term_details": "L/C will be opened for 65% of Basic Order Value on receipt of Order acknowldegement payable in 180 days from the date of despatch. 100% GST will be paid agaisnt depatch" }, { "po_number": 4300067158, "currency": "INR", "milestone_amount": 77238000, "date": "01/05/17", "payment_term_details": "10% will be paid after commissioning." }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 53848084.5, "date": "02/05/17", "payment_term_details": "a. 15% of basic order value as advance against order acknowledgement and submission ABG for 15% of basic order value in the format given by us valid till the completion of supply.  for 10% of basic order value valid for 12 months from date of commissioning or 18 months from sate of supply. PBG shall be submitted along with the last consignment" }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 538480845, "date": "03/05/17", "payment_term_details": "b. 75%with taxes in 15 days after delivery of materials at site on pro-rata basis" }, { "po_number": 4300067522, "currency": "INR", "milestone_amount": 35898723, "date": "04/05/17", "payment_term_details": "c. 10% against submission of PBG" }, { "po_number": 4300068174, "currency": "INR", "milestone_amount": 10150000, "date": "05/05/17", "payment_term_details": "a. 25% of basic price Rs.1,01,50,000 will be paid as advance on receipt of your order acceptance and receipt of corporate guarantee. " }, { "po_number": 4300068174, "currency": "INR", "milestone_amount": 60900000, "date": "06/05/17", "payment_term_details": " b. Balance 75% 5 with taxes will be paid on material receipt and submission of" }, { "po_number": 4300068331, "currency": "INR", "milestone_amount": 41231250, "date": "07/05/17", "payment_term_details": "a. 25% of basic price Rs.4,12,31,250 will be paid as advance on receipt of your order . " }, { "po_number": 4300068331, "currency": "INR", "milestone_amount": 247387500, "date": "08/05/17", "payment_term_details": "b. Balance with taxes in 10 days after receipt of materials." }],
      actualTableRows: [],
      tableTitle: "MRF Milestone Payments Dashboard"
    }
  }

  handleForce = files => {
    if (files && files[0] && Object.keys(files[0])) {
      let keys = Object.keys(files[0])
      console.log(JSON.stringify(keys))
      // adding id and selected key in table rows

      // files.forEach((element, index) => {
      //   element.id = index
      //   element.isSelected = false
      // });

      this.setState({ selectAllRow: false, actualTableRows: files, tableHeader: keys, tableRows: files, dateRange: undefined })
    } else {
      alert("No Rows Found!")
    }
    document.getElementById("ObiWan").value = null
  }

  handleDarkSideForce = error => {
    console.log(error)
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
    let { tableRows, sortType } = this.state
    if (sortType) {
      tableRows = _.sortBy(tableRows, sortBy);
    } else {
      tableRows = _.sortBy(tableRows, sortBy).reverse();
    }
    this.setState({ tableRows, sortBy, sortType: !sortType })
  }
  // table sorting
  filterByDate = (dateObj) => {
    this.setState(dateObj, () => {
      let { startDate, endDate, actualTableRows } = this.state
      console.log(startDate, endDate)
      if (startDate && endDate) {
        let tableRows = _.filter(actualTableRows, function (o) {
          // // console.log(moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(o.date) >= moment(startDate))
          // // console.log(new Date(o.date), new Date(startDate), moment(o.date), moment(startDate),
          //   moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY"))
          if (moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") >= moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY") && moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") <= moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY")) {
            return o
          }
        });
        console.log(tableRows.length)
        this.setState({ currentPage: 1, tableRows: tableRows })
      }
    })

  }
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

  onSelect = (dateRange, states) => {
    let { actualTableRows } = this.state
    if (dateRange.start && dateRange.end) {
      let tableRows = _.filter(actualTableRows, function (o) {
        if (moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") >= moment(dateRange.end, "DD/MM/YYYY").format("DD/MM/YYYY") &&
          moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY") <= moment(dateRange.start, "DD/MM/YYYY").format("DD/MM/YYYY")) {
          return o
        }
      });
      this.setState({ currentPage: 1, tableRows: tableRows })
    }
    this.setState({ dateRange })
  };


  render() {
    let { tableTitle, dateRange, showCalender, tableHeader, selectAllRow, tableRows, rowsPerPageOptions, currentPage, rowsPerPage, startDate, endDate, key } = this.state
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header =>
        header
          .toLowerCase()
          .replace(/\W/g, '_')
    }
    // let csvData = []
    // tableRows.forEach(element => {
    //   if (element.isSelected) {
    //     let obj = _.omit(element, ['id', 'isSelected'])
    //     csvData.push(obj)
    //   }
    // });

    return (
      <div className="container-fluid App">
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
          {/* <button className="btn btn-primary  float-right" data-toggle="tooltip"
            title="load CSV" onClick={e => { document.getElementById("ObiWan").click(); document.getElementById("ObiWan").value = null }}>
            <i class="fas fa-file-download fa-lg mr-2"></i>
            upload file
            </button> */}

          {tableHeader && tableHeader.length > 0 ?
            < div className="mt-4">
              {tableRows && tableRows.length > 0 ?
                <CSVLink filename={"MRF.csv"} data={tableRows} className="float-left" id="CSVLink">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning"
                    data-toggle="tooltip"
                    title="Download as a CSV">
                    <i class="fa fa-upload  fa-lg mr-2"></i>
                    Export CSV
              </button>
                </CSVLink>
                : null}
              <button className="btn btn-primary mr-2 float-right " data-toggle="tooltip"
                title="Filter by date" onClick={e => this.setState({ showCalender: !showCalender })}>
                {dateRange ?
                  <lable className="form-control d-inline mr-2"> {dateRange.start.format("DD-MM-YYYY")
                    + " | " +
                    dateRange.end.format("DD-MM-YYYY")}</lable>
                  : null}

                <i class="fa fa-calendar fa-lg" aria-hidden="true"></i>
              </button>
              {showCalender ?
                <div className="card-body date-picker color-picker-bottom" onMouseLeave={() => this.setState({ showCalender: false })} >
                  <DateRangePicker
                    value={this.state.dateRange}
                    onSelect={this.onSelect}
                    singleDateRange={true}
                  />
                </div>
                : null}
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
                    {tableHeader && tableHeader.map((header, index) => <th className="c-pointer" key={index} style={{ width: header === "payment_term_details" ? "50%" : "" }} onClick={e => this.sortTable(header)}>{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {this.handleTableRows(tableRows) && this.handleTableRows(tableRows).map((rowObj, index) => <tr key={index}>
                    {/* select all individual row */}

                    {/* <td>
                      <Checkbox
                        onChange={() => this.handleSelect(rowObj.id, rowObj.isSelected ? false : true)}
                        checked={rowObj.isSelected ? true : false}
                        inputProps={{ 'aria-labelledby': 1 }}
                      /></td> */}
                    {tableHeader && tableHeader.map((header, index) =>
                      <td key={index}>

                        {header === "date" ? moment(rowObj[header], "DD/MM/YYYY").format("DD/MM/YYYY") : rowObj[header]}</td>
                    )}
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
            : null}

          {/* pagination */}

          {tableRows && tableRows.length ?
            <TablePagination
              refs="tablePagination"
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={tableRows.length}
              rowsPerPage={rowsPerPage}
              page={currentPage - 1}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            /> : null}
        </div>

      </div >
    );
  }
}

export default App;


