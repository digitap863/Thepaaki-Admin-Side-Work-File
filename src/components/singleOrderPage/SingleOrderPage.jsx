import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressPdf from "./AddressPdf";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import BarcodeReader from "react-barcode-reader";
import { useRef } from "react";
import Invoice from "./Invoce";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SingleOrderPage({ invoice }) {
  const [TotalAmount, setTotalAmount] = useState(null);
  const [singleOrder, setSingelOrder] = useState({});
  const [address, setAddress] = useState({});
  const [fromaddress, setFromAddress] = useState({});
  const [produts, setProductDeatails] = useState([]);
  const [date, setDatate] = useState("");
  const [offer, setOffer] = useState("");
  const [wallet, setWallet] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dispatchButton, setDispatchButton] = useState("");
  const [phone, setPhone] = useState("");
  const [barcodeInputValue, updateBarcodeInputValue] = useState("");

  const parms = useParams();
  const navigate = useNavigate();
  const OrderID = parms.id;
  const componentRef = useRef();
  const AdminDeatails = useSelector((state) => state.admin.value);
  var Role;
  useEffect(() => {
    var single = null;
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        if (config) {
          const { data } = await axios.get(
            `/api/superAdmin/view-single-order/${parms.id}`,
            config
          );
          setSingelOrder(data);
          single = data;
          if (!data.user) {
            setFromAddress(data.FromAddress);
          }
          const phone = data.Address.PhoneNumber;
          setPhone(phone);
          setDispatchButton(data.status);
          if (data.Offer) {
            setOffer(data.Offer);
          }
          if (data.wallet) {
            setWallet(data.wallet);
          }

          Role = data.user;
          setDatate(data.Date);
          setTotalAmount(data.Total);
          setAddress(data.Address);
        }

        var singleProductPrice;
        single.Product.map(async (product) => {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                "auth-token": AdminDeatails.Token,
              },
            };
            const { data } = await axios.get(
              `/api/superAdmin/get-sinlge-Produt/${product.ProductID}`,
              config
            );
            var colorImage = null;

            data.variation.map((deatails) => {
              if (deatails.color == product.color) {
                colorImage = deatails.image;
              }
            });
            // if (role) {
            //   singleProductPrice = data.wholesaler;
            // } else {
            //   if (data.discount) {
            //     const discountPrice = (data.price * data.discount) / 100;
            //     singleProductPrice = data.price - discountPrice;
            //   } else {
            //     singleProductPrice = data.price;
            //   }
            // }

            // var finalProductPrice;
            // var finalDiscountedPrice;
            // var wholesaler = false;

            if (Role == true) {
              if (offer) {
                const discountedPrice = (data.price * offer) / 100;
                singleProductPrice = data.price - discountedPrice;
              } else if (data.discount) {
                const discountPrice = (data.price * data.discount) / 100;
                singleProductPrice = data.price - discountPrice;
              } else {
                singleProductPrice = data.price;
              }
            } else {
              singleProductPrice = data.wholesaler;
            }
            setProductDeatails((prev) => [
              ...prev,
              {
                image: colorImage,
                ProductId: product.ProductID,
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                price: singleProductPrice,
                name: data.name,
              },
            ]);
          } catch (eror) {
            swal("OOPS!", "Somthing Went Wrong!", "error");
          }
        });
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);
  const downloadInvoice = async () => {
    let datas = [];
    produts.map((items) => {
      const obj = {
        description: items.name + "-" + items.color,
        quantity: items.quantity,
        price: items.price,
        "tax-rate": 0,
        tax: 2,
      };
      datas.push(obj);
    });

    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        // The invoice background
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "Moffa Clothing",
        address: "1st Floor,62/9112,Convent Road,Ernakulam",
        zip: "682035",
        city: "Ernakulam",
        country: "India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // Your recipient
      client: {
        company: address.Name + "," + address.LastName,
        address: address.StreetAddress,
        zip: address?.Pincode,
        city: address.TownCity,
        country: address.State,
        custom1: address.Email,
        custom2: address.PhoneNumber,

        // address: address.StreetAddress,
        // company:address.Name+","+address.LastName,

        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        // Invoice number
        number: parms.id,
        // Invoice data
        date: date,
        // Invoice due date
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: datas,
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // Settings to customize your invoice
      settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "GST", // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
      },
    };

    window.easyinvoice.createInvoice(data, async function (result) {
      window.easyinvoice.download(`${OrderID}.pdf`);
    });
  };
  //dispatch order function
  const dispatchOrder = async () => {
    var link;
    console.log();
    const Courier = singleOrder.Courier;
    if (Courier == "DTDC") {
      link = "https://trackcourier.io/dtdc-tracking?";
    } else {
      link = "";
    }
    const TrackingId = barcodeInputValue;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };
      const { data } = await axios.post(
        "/api/superAdmin/dispatch-order",
        { TrackingId, OrderID, phone, link, Courier },
        config
      );
      navigate("/all-orders");
    } catch (error) {
      swal("OOPS!", "Somthing Went Wrong!", "error");
    }
  };
  const downloadPdf = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: OrderID,
  });

  function barcodeAutoFocus() {
    document.getElementById("SearchbyScanning").focus();
  }

  function onChangeBarcode(event) {
    updateBarcodeInputValue(event.target.value);
  }

  function onKeyPressBarcode(event) {
    if (event.keyCode === 13) {
      updateBarcodeInputValue(event.target.value);
    }
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "5%",
          boxShadow: "2px 4px 10px 7px rgba(201, 201, 201, 0.47)",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="text-center mb-3">
                <h4>Enter Details</h4>
              </div>
              <input
                autoFocus={true}
                placeholder="Start Scanning"
                value={barcodeInputValue}
                onChange={onChangeBarcode}
                id="SearchbyScanning"
                className="SearchInput form-control"
                onKeyDown={onKeyPressBarcode}
                onBlur={barcodeAutoFocus}
              />
              <label>Scan Tracking ID</label>
              <input
                value={singleOrder.Courier}
                className=" form-control mt-2"
              />
              <label>Service</label>

              <div class="text-center">
                <button
                  className=" btn btn-primary mt-2"
                  onClick={dispatchOrder}
                >
                  Submit
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
        <table className="table " s>
          <thead>
            <tr className="bg-warning">
              <th style={{ textAlign: "center" }} scope="col">
                PRO_ID
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                IMAGE
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                COLOR
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                SIZE
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                QTY
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                PRICE
              </th>
            </tr>
          </thead>
          <tbody>
            {produts.map((items, index) => {
              return (
                <tr
                  style={{ textAlign: "center", verticalAlign: "center" }}
                  key={index}
                >
                  <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {items.ProductId}
                  </th>
                  <td>
                    <img
                      src={items.image}
                      style={{ width: "150px", height: "200px" }}
                    ></img>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {items.color}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {items.size}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {items.quantity}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {items.quantity + "x" + items.price.toFixed(0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <div className="float-end me-5">
            {wallet && (
              <>
                <b>APPLY WALLET AMOUNT: ₹ {wallet}</b>
                <br />
                <b>PAYMENT AMOUNT: ₹ {TotalAmount}</b>
                <br />
              </>
            )}

            <b>
              TOTAL AMOUNT: ₹{" "}
              {wallet ? parseInt(wallet) + TotalAmount : TotalAmount}
            </b>
          </div>
          <div className="ms-3">
            <b>TO:</b>
            <br />
            <p>
              {address?.Name},{address?.Lastname}
              <br />
              {address?.StreetAddress},{address?.TownCity},{address?.Pincode}
              <br />
              {address?.Email}
              <br />
              {address?.PhoneNumber},
              {address?.message && <b>{address?.message}</b>}
            </p>
          </div>
        </div>
        {dispatchButton == "Pending" && (
          <button
            className="float-end btn btn-danger ms-4"
            onClick={handleOpen}
          >
            Dispatch
          </button>
        )}
        {dispatchButton == "Packed" && (
          <button
            className="float-end btn btn-danger ms-4"
            onClick={handleOpen}
          >
            Dispatch
          </button>
        )}
        <button
          className="float-end btn btn-primary ms-4"
          onClick={downloadPdf}
        >
          Download Pdf
        </button>

        <button
          className="float-end btn btn-primary "
          onClick={downloadInvoice}
        >
          Download Invoice
        </button>
      </Box>
      <div class="text-center mb-5"></div>
      <div style={{ marginTop: "5%" }}>
        {/* <AddressPdf
          fromaddress={fromaddress}
          company={componentRef}
          useraddress={address}
        /> */}
        <Invoice order={singleOrder} company={componentRef} />
      </div>
    </>
  );
}

export default SingleOrderPage;
