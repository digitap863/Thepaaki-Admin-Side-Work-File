import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Address.css";
function Invoice({ company, order }) {
  var subToatal;
  if (order?.user) {
    subToatal = order?.Total - order?.DeliveyCharge;
  } else {
    if (order?.wallet) {
      subToatal =
        parseInt(order?.Total) +
        parseInt(order?.wallet) -
        parseInt(order?.DeliveyCharge);
    } else {
      subToatal = parseInt(order?.Total) - parseInt(order?.DeliveyCharge);
    }
  }
  return (
    <div
      ref={company}
      style={{ width: "100%", height: window.innerHeight, display: "flex" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <table className="anandhu">
          {order?.user && (
            <th colSpan="12" style={{ paddingTop: "30" }}>
              <span style={{ fontSize: "28px", fontWeight: 800 }}>
                {" "}
                MOFFA CLOTHING
              </span>
              <br />
              Convent Road Ernakulam <br />
              Tel: 8848572454,GSTIN:32ACQPF6742G1ZM
            </th>
          )}

          <tr>
            <th colSpan="12">ORDER BILL</th>
          </tr>
          <tr>
            <th colSpan="5">Date of Invoice: {order.Date}</th>
            <th colSpan="7">Invoice No:{order.InvoceNO}</th>
          </tr>
          <tr>
            <th colSpan="12">
              Deliver to:{" "}
              <span style={{ textTransform: "uppercase" }}>
                {" "}
                {order.Address?.Name} {order.Address?.LastName}
              </span>
            </th>
          </tr>
          <tr>
            <th colSpan="12">
              <br />
              <div style={{ display: "flex" }}>
                <div style={{ textAlign: "start" }}>
                  {order?.user ? (
                    <>
                      <span style={{ marginRight: "25%" }}>FROM:</span>
                      <br />
                      <span style={{ textTransform: "uppercase" }}>
                        {" "}
                        1st FLOOR,67/9112,CONVENT ROAD
                      </span>
                      <br />
                      <span style={{ textTransform: "uppercase" }}>
                        {" "}
                        682035,Kerala,Ernakulam
                      </span>{" "}
                      <br />
                      MOBILE: 8848572454
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: "25%" }}>FROM:</span>
                      <br />
                      <span style={{ textTransform: "uppercase" }}>
                        {" "}
                        {order.FromAddress?.FromName}{" "}
                        {order.FromAddress?.FromLastName} <br />
                        {order.FromAddress?.FromStreetAddress}
                      </span>
                      <br />
                      <span style={{ textTransform: "uppercase" }}>
                        {" "}
                        {order.FromAddress?.FromPincode},
                        {order.FromAddress?.FromTownCity},
                        {order.FromAddress?.FromState}
                      </span>{" "}
                      <br />
                      MOBILE: {order.FromAddress?.FromPhoneNumber}
                    </>
                  )}
                </div>
                <div style={{ marginLeft: "auto", textAlign: "end" }}>
                  <span style={{ marginRight: "100%" }}>TO:</span>
                  <br />
                  <span style={{ textTransform: "uppercase" }}>
                    {" "}
                    {order.Address?.StreetAddress}
                    {"  "}
                  </span>
                  <br />
                  <span style={{ textTransform: "uppercase" }}>
                    {" "}
                    {order.Address?.Pincode},{order.Address?.TownCity},
                    {order.Address?.State}
                  </span>{" "}
                  <br />
                  MOBILE: {order.Address?.PhoneNumber}
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th rowspan="2">Sl.No</th>
            <th rowspan="2">Product Code</th>
            <th rowspan="2">Color</th>
            <th rowspan="2">Size</th>
            <th rowspan="2">Quantity</th>
            <th rowspan="2">Price</th>
            <th rowspan="2">Net Total</th>
            <th colSpan="2">CGST</th>
            <th colSpan="2">SGST</th>
            <th rowspan="2">Total</th>
          </tr>

          <tr>
            <th>Rate</th>
            <th>Amt.</th>
            <th>Rate</th>
            <th>Amt.</th>
          </tr>
          {order.Product?.map((items, index) => {
            let price;
            if (order?.user) {
              if (items.dicount) {
                const less =
                  (parseInt(items.Price) / 100) *
                  parseInt(items.dicount).toFixed(0);

                price = parseInt(items.Price) - less;
              } else {
                price = items.Price;
              }
            } else {
              price = parseInt(items?.wholeSalerPrice);
            }
            const Total = parseInt(items?.quantity) * price;
            const singlegst = (parseInt(price) / 100) * 2.5;
            const Rate = parseInt(items?.quantity) * singlegst.toFixed(0);
            return (
              <>
                <tr>
                  <th rowspan="2">{index + 1}</th>
                  <th rowspan="2">{items?.ProductID}</th>
                  <th rowspan="2">{items?.color}</th>
                  <th rowspan="2">{items?.size}</th>
                  <th rowspan="2">{items?.quantity}</th>
                  <th rowspan="2">{parseInt(price).toFixed(0)}</th>
                  <th rowspan="2">{parseInt(Total).toFixed(0)}</th>
                  <th rowspan="2">2.50</th>
                </tr>

                <tr>
                  <th>{Rate}</th>
                  <th>2.50</th>
                  <th>{Rate}</th>
                  <th>{Total.toFixed(0)}</th>
                </tr>
              </>
            );
          })}
          <tr>
            <th colSpan="5">Sub Total</th>
            <th colSpan="7" style={{ textAlign: "end" }}>
              {subToatal} Rs
            </th>
          </tr>
          <tr>
            <th colSpan="5">Packing & Delivery Charges</th>
            <th colSpan="7" style={{ textAlign: "end" }}>
              {order?.DeliveyCharge} Rs
            </th>
          </tr>
          <tr>
            <th colSpan="5">Total Amount</th>
            <th colSpan="7" style={{ textAlign: "end" }}>
              {subToatal + order?.DeliveyCharge} Rs
            </th>
          </tr>
          {/* <tr>
            <th colSpan="12">
              BARCODE <br />
              Anumon 2523
            </th>
          </tr> */}
        </table>
      </div>
    </div>
  );
}

export default Invoice;
