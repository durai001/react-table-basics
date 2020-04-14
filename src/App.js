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
      tableHeader: [
        //   { id: 'po_number', numeric: false, disablePadding: true, label: 'po_number' },
        // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
        // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
        // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
        // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },

        // { id: 'po_number', numeric: false, disablePadding: false, label: 'po_number' },
        // { id: '"currency"', numeric: false, disablePadding: false, label: '"currency"' },
        // { id: 'milestone_amount', numeric: true, disablePadding: false, label: 'milestone_amount' },
        // { id: 'date', numeric: false, disablePadding: false, label: 'date' },
        // { id: 'payment_term_details', numeric: false, disablePadding: false, label: 'payment_term_details' },

      ],

      tableRows: [
        // { name:'123456', calories:'305', fat:'305', carbs:'305', protein:'305' },

        // { po_number: "1700001737 - 1",
        // currency: "EUR",
        // milestone_amount: 477475.2,
        // date: "6/30/2017",
        // payment_term_details: "a. 20% payment in advance on presentation of bank guarantee as per format prescribed through our banker in India."
        //  }
      ],
      actualTableRows: [],
      tableTitle: "MRF Milestone Payments Dashboard"
    }
  }

  handleForce = files => {
    if (files && files[0] && Object.keys(files[0])) {
      let keys = Object.keys(files[0])
      files.forEach((element, index) => {
        element.id = index
        element.isSelected = false
        // element.date = moment(element.date, "DD/MM/YYYY").format("DD/MM/YYYY")
      });

      // keys.forEach((element, index) => {
      //   if (element) {
      //     if (index === 0) {
      //       headCells.push({ id: element, numeric: false, disablePadding: true, label: element })
      //     } else {
      //       headCells.push({ id: element, numeric: element === "milestone_amount", disablePadding: false, label: element })
      //     }
      //   }

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
        // // console.log(moment(o.date, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(o.date) >= moment(startDate))
        // // console.log(new Date(o.date), new Date(startDate), moment(o.date), moment(startDate),
        //   moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY"), moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY"))
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
    let csvData = []
    tableRows.forEach(element => {
      if (element.isSelected) {
        let obj = _.omit(element, ['id', 'isSelected'])
        csvData.push(obj)
      }
    });

    return (
      <div className="container-fluid App">
        <CSVReader
          cssClass="csv-reader-input d-none "
          onFileLoaded={ this.handleForce}
          onError={this.handleDarkSideForce}
          parserOptions={papaparseOptions}
          inputId="ObiWan"
          inputStyle={{ color: 'red' }}
        />
          <div className="card-body">
          <h2 className="d-inline">
            {tableTitle}
          </h2>
          <button className="btn btn-primary  float-right" data-toggle="tooltip"
            title="load CSV" onClick={e => { document.getElementById("ObiWan").click(); document.getElementById("ObiWan").value = null }}>
            <i class="fas fa-file-download fa-lg mr-2"></i>
            upload file
            </button>

          {tableHeader && tableHeader.length > 0 ?
            < div className="mt-4">
              {csvData && csvData.length > 0 ?
                <CSVLink filename={"MRF.csv"} data={csvData} className="float-left" id="CSVLink">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning"
                    data-toggle="tooltip"
                    title="Download Selected Rows">
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
                    <th>
                      <Checkbox
                        onChange={() => this.handleSelect('All', !selectAllRow)}
                        checked={selectAllRow}
                        inputProps={{ 'aria-labelledby': 1 }}
                      /><span>Select All</span></th>
                    {tableHeader && tableHeader.map((header, index) => <th className="c-pointer" key={index} style={{ width: header === "payment_term_details" ? "50%" : "" }} onClick={e => this.sortTable(header)}>{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {this.handleTableRows(tableRows) && this.handleTableRows(tableRows).map((rowObj, index) => <tr key={index}>
                    <td>
                      <Checkbox
                        onChange={() => this.handleSelect(rowObj.id, rowObj.isSelected ? false : true)}
                        checked={rowObj.isSelected ? true : false}
                        inputProps={{ 'aria-labelledby': 1 }}
                      /></td>
                    {tableHeader && tableHeader.map((header, index) =>
                      <td key={index}>{rowObj[header]}</td>
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


