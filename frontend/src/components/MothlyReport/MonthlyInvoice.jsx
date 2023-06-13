import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import axios from "axios";

function MonthlyInvoice() {
  const [data, setData] = useState([]);
  const [updatedDetails, setUpdatedDeatails] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const AdminDeatails = useSelector((state) => state.admin.value);

  const columns = [
    {
      name: "ID",
      selector: "Id",
      sortable: true,
    },
    {
      name: "Date",
      selector: "Date",
      sortable: true,
    },
    {
      name: "Invoice No",
      selector: "InvoceNO",
      sortable: true,
      //   cell: (d) => <span>{d.genres.join(", ")}</span>,
    },
    {
      name: "HSN",
      selector: "HSN",
      sortable: true,
    },

    {
      name: "State",
      selector: "Address.State",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "totalQuantity",
      sortable: true,
    },
    {
      name: "PRODUCT AMOUNT",
      selector: "Amount",
      sortable: true,
    },

    {
      name: "CGST",
      selector: "CGST",
      sortable: true,
    },
    {
      name: "SGST",
      selector: "SGST",
      sortable: true,
    },
    {
      name: "IGST",
      selector: "IGST",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "Total",
      sortable: true,
    },
  ];
  const tableData = {
    columns,
    data,
  };
  const takemonthlyreport = async () => {
    const start =
      new Date(startDate).getMonth() +
      1 +
      "/" +
      new Date(startDate).getDate() +
      "/" +
      new Date(startDate).getFullYear();

    const end =
      new Date(endDate).getMonth() +
      1 +
      "/" +
      new Date(endDate).getDate() +
      "/" +
      new Date(endDate).getFullYear();
    if (start && end) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.post(
          "/api/superAdmin/view-all-monthlyways-report",
          { start, end },
          config
        );
        {
          data.map((items) => {
            let quantity=0;
            if (items.wallet) {
              items.Total = items.Total + parseInt(items.wallet);
            }
            items.Product.map((value)=>{
              quantity=value.quantity+quantity
            })
      
            items.Total = items.Total - items.DeliveyCharge;
            items["HSN"] = 6204;
            items['totalQuantity']=quantity;
            const Total = items.Total;
            if (items.Address.State == "Kerala") {
              const amount1 = ((parseInt(Total) / 105) * 100).toFixed(2);
              const amount2 = parseInt(Total);
              const amount3 = ((amount2 - amount1) / 2).toFixed(2);
              items["CGST"] = amount3;
              items["SGST"] = amount3;
              items["IGST"] = (
                parseInt(Total) -
                (parseInt(Total) / 105) * 100
              ).toFixed(2);
              items["Amount"] = ((parseInt(Total) / 105) * 100).toFixed(2);
              items["IGST"] = 0;
            } else {
              items["CGST"] = 0;
              items["SGST"] = 0;
              items["IGST"] = (
                parseInt(Total) -
                (parseInt(Total) / 105) * 100
              ).toFixed(2);
              items["Amount"] = ((parseInt(Total) / 105) * 100).toFixed(2);
            }
            updatedDetails.push(items);
          });
          setData(updatedDetails);
        }
      } catch (error) {
        swal({
          title: "NO RECODES",
          text: "Once deleted, you will not be able to recover this data file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
    } else {
      swal({
        title: "Please Select Date",
        text: "Please Select Valid Date!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-3">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="col-md-3">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div className="col-md-3 mt-4">
            <a className="btn btn-primary" onClick={takemonthlyreport}>
              Search
            </a>
          </div>
        </div>
      </div>

      <DataTableExtensions {...tableData}>
        <DataTable
          title={"Monthly Report"}
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}

export default MonthlyInvoice;
