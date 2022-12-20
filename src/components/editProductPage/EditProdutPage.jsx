import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useTheme } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useParams, useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "brown",
  "white",
  "blue",
  "black",
  "orange",
  "yellow",
  "green",
  "pink",
  "gray",
  "silver",
  "maroon",
  "purple",
  "fuchsia",
  "lime",
  "olive",
  "navy",
  "aqua",
  "aliceblue",
  "teal",
  "antiquewhite",
  "violet",
  "wheat",
  "steelblue",
  "springgreen",
  "red",
  "slategrey",
  "silver",
  "sienna",
  "sandybrown",
  "purple",
  "powderblue",
  "yellowgreen",
  "whitesmoke",
  "wheat",
  "turquoise",
  "tomato",
  "thistle",
  "tan",
  "steelblue",
  "springgreen",
  "snow",
  "slategrey",
  "slateblue",
  "skyblue",
  "silver",
  "sienna",
  "seashell",
  "seagreen",
  "sandybrown",
  "salmon",
  "saddlebrown",
  "royalblue",
  "rosybrown",
  "powderblue",
  "plum",
  "pink",
  "peru",
  "peachpuff",
  "papayawhip",
  "palevioletred",
  "paleturquoise",
  "palegreen",
  "palegoldenrod",
  "orchid",
  "orangered",
  "orange",
  "olivedrab",
  "olive",
  "oldlace",
  "navy",
  "navajowhite",
  "moccasin",
  "mistyrose",
  "mintcream",
  "midnightblue",
  "mediumvioletred",
  "mediumturquoise",
  "mediumspringgreen",
  "mediumslateblue",
  "mediumseagreen",
  "mediumpurple",
  "mediumorchid",
  "mediumblue",
  "mediumaquamarine",
  "maroon",
  "magenta",
  "linen",
  "limegreen",
  "lime",
  "lightsteelblue",
  "lightslategrey",
  "lightslategray",
  "lightskyblue",
  "lightsalmon",
  "lightseagreen",
  "lightpink",
  "lightgrey",
  "lightgreen",
  "lightgoldenrodyellow",
  "lightcyan",
  "lightcoral",
  "lightblue",
  "lemonchiffon",
  "lawngreen",
  "lavenderblush",
  "lavender",
  "khaki",
  "ivory",
  "indigo",
  "indianred",
  "hotpink",
  "honeydew",
  "grey",
  "greenyellow",
  "green",
  "gray",
  "goldenrod",
  "gold",
  "ghostwhite",
  "gainsboro",
  "fuchsia",
  "forestgreen",
  "firebrick",
  "dodgerblue",
  "dimgrey",
  "dimgray",
  "deepskyblue",
  "deeppink",
  "darkviolet",
  "darkturquoise",
  "darkslategrey",
  "darkslateblue",
  "darkseagreen",
  "darksalmon",
  "darkred",
  "darkorchid",
  "darkorange",
  "darkolivegreen",
  "darkmagenta",
  "darkkhaki",
  "darkgrey",
  "darkgreen",
  "darkgray",
  "darkgoldenrod",
  "darkcyan",
  "darkblue",
  "cyan",
  "crimson",
  "cornsilk",
  "cornflowerblue",
  "coral",
  "chocolate",
  "chartreuse",
  "cadetblue",
  "burlywood",
  "brown",
  "blueviolet",
  "blue",
  "blanchedalmond",
  "black-1",
  "bisque",
  "beige",
  "azure",
  "aquamarine",
  "aqua",
  "antiquewhite",
  "aliceblue",
];
const tagsName = [
  "ladies",
  "jacket",
  "full sleeve",
  "cloth",
  "sarie",
  "kurthi",
];

const sizeChart = ["S", "M", "L", "XL", "XXL", "XXXL"];

function getStyles(name, personName, theme) {}

const number = [];
for (let i = 0; i < 20; i++) {
  const obj = {
    value: i,
    label: i,
  };
  number.push(obj);
}
const currencies = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];
const CategoryItems = [
  {
    value: "Maternity outfits",
    label: "Maternity outfits",
  },
  {
    value: "Casual Wears",
    label: "Casual Wears",
  },
  {
    value: "Party Wears",
    label: "Party Wears",
  },
];
const NewItems = [
  {
    value: false,
    label: "Trending",
  },
  {
    value: true,
    label: "New Items",
  },
];

export default function FormPropsTextFields() {
  const theme = useTheme();
  const [product, setProducts] = useState([]);
  const [rating, setRating] = React.useState(null);
  const [Category, setCategory] = React.useState(null);
  const [color, setColor] = React.useState([]);
  const [size, setSize] = React.useState([]);
  const [index, setIndex] = useState(0);
  const [varitaion, setVaritaion] = useState([]);
  const [image, setImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [stoke, setStoke] = useState([]);
  const [Tag, setTag] = React.useState([]);
  const [editStock, setEditStock] = useState([]);
  const [New, setNew] = useState(false);
  const [ColorsImage, setColorsImage] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  var Available = false;
  const { register, handleSubmit, trigger, reset, setValue } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    trigger: trigger2,
    reset: reset2,
    setValue: setValue2,
  } = useForm();
  const AdminDeatails = useSelector((state) => state.admin.value);
  const ChangeColor = (event) => {
    const {
      target: { value },
    } = event;

    setColor(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ChangeSize = (event) => {
    const {
      target: { value },
    } = event;
    setSize(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  var EditprodutDeatails;
  React.useEffect(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": AdminDeatails.Token,
        },
      };
      const { data } = await axios.get(
        `/api/superAdmin/get-sinlge-Produt/${params.id}`,
        config
      );

      data.image.map((item) => {
        productImages.push(item);
      });
      setCategory(data.category[0]);

      if (data.new) {
        setNew(true);
      }
      if (data.rating) {
        setRating(data.rating);
      }
      setProducts(data);
      setValue("wholsalerPrice", data.wholesaler);
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("discount", data.discount);
      setValue("Description", data.shortDescription);

      //   setRating(data.rating);
      //   handleChange(data.rating);
      let color = [];
      const size = [];
      data.variation.map((items) => {
        color.push(items.color);
        ColorsImage.push(items.image);
        items.size.map((sizes) => {
          size.push(sizes.name);

          setValue(`Bustline${sizes.name}`, sizes.Bustline);
          setValue(`Length${sizes.name}`, sizes.Length);
          setValue(`Hip${sizes.name}`, sizes.Hip);
          setValue(`Hip${sizes.name}`, sizes.Hip);
          setValue(`Sleeve${sizes.name}`, sizes.Sleeve);

          editStock.push({
            colors: items.color,
            siz: sizes.name,
            sto: sizes.stock ? sizes.stock : 0,
          });
        });
      });
      setImage(ColorsImage[index]);
      var uniqueArray = Array.from(new Set(size));
      setImage(ColorsImage[index]);
      ChangeSize({ edit: true, target: { value: uniqueArray } });
      ChangeColor({ edit: true, target: { value: color } });
      handleTag({ edit: true, target: { value: data.tag } });
    } catch (error) {}
  }, []);

  //add tag name
  const handleTag = (event) => {
    const {
      target: { value },
    } = event;

    setTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //rating change function
  const handleChange = (event) => {
    setRating(event.target.value);
  };
  //change category function
  const ChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const ChangeNew = (event) => {
    setNew(event.target.value);
  };

  //image uploding function
  const Imageupload = () => {
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: "dq06v1dnz",
        uploadPreset: "thepaaki",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.url);
        }
      }
    );
    myWidget.open();
  };

  //product image upload function
  const PriductImageupload = () => {
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: "dq06v1dnz",
        uploadPreset: "thepaaki",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setProductImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    myWidget.open();
  };

  //stock updation function with size adding included
  const onSubmit = (data) => {
    if (image) {
      if (data.M > 0) {
        stoke.push({
          name: "M",
          stock: parseInt(data.M),
          Bustline: data.BustlineM,
          Length: data.LengthM,
          Hip: data.HipM,
          Sleeve: data.SleeveM,
        });
      }
      if (data.S > 0) {
        stoke.push({
          name: "S",
          stock: parseInt(data.S),
          Bustline: data.BustlineS,
          Length: data.LengthS,
          Hip: data.HipS,
          Sleeve: data.SleeveS,
        });
      }
      if (data.L > 0) {
        stoke.push({
          name: "L",
          stock: parseInt(data.L),
          Bustline: data.BustlineL,
          Length: data.LengthL,
          Hip: data.HipL,
          Sleeve: data.SleeveL,
        });
      }
      if (data.XL > 0) {
        stoke.push({
          name: "XL",
          stock: parseInt(data.XL),
          Bustline: data.BustlineXL,
          Length: data.LengthXL,
          Hip: data.HipXL,
          Sleeve: data.SleeveXL,
        });
      }
      if (data.XXL > 0) {
        stoke.push({
          name: "XXL",
          stock: parseInt(data.XXL),
          Bustline: data.BustlineXXL,
          Length: data.LengthXXL,
          Hip: data.HipXXL,
          Sleeve: data.SleeveXXL,
        });
      }
      if (data.XXXL > 0) {
        stoke.push({
          name: "XXXL",
          stock: parseInt(data.XXXL),
          Bustline: data.BustlineXXXL,
          Length: data.LengthXXXL,
          Hip: data.HipXXXL,
          Sleeve: data.SleeveXXXL,
        });
      }
      const obj = {
        color: color[index],
        image: image,
        size: stoke,
      };
      if (obj.size[0]) {
        varitaion.push(obj);
      } else {
        size.map((availabel) => {
          if (availabel == "M") {
            stoke.push({
              name: "M",
              stock: 0,
              Bustline: data.BustlineM,
              Length: data.LengthM,
              Hip: data.HipM,
              Sleeve: data.SleeveM,
            });
          }
          if (availabel == "S") {
            stoke.push({
              name: "S",
              stock: 0,
              Bustline: data.BustlineS,
              Length: data.LengthS,
              Hip: data.HipS,
              Sleeve: data.SleeveS,
            });
          }
          if (availabel == "L") {
            stoke.push({
              name: "L",
              stock: 0,
              Bustline: data.BustlineL,
              Length: data.LengthL,
              Hip: data.HipL,
              Sleeve: data.SleeveL,
            });
          }
          if (availabel == "XL") {
            stoke.push({
              name: "XL",
              stock: 0,
              Bustline: data.BustlineXL,
              Length: data.LengthXL,
              Hip: data.HipXL,
              Sleeve: data.SleeveXL,
            });
          }
          if (availabel == "XXL") {
            stoke.push({
              name: "XXL",
              stock: 0,
              Bustline: data.BustlineXXL,
              Length: data.LengthXXL,
              Hip: data.HipXXL,
              Sleeve: data.SleeveXXL,
            });
          }
          if (availabel == "XXXL") {
            stoke.push({
              name: "XXXL",
              stock: 0,
              Bustline: data.BustlineXXXL,
              Length: data.LengthXXXL,
              Hip: data.HipXXXL,
              Sleeve: data.SleeveXXXL,
            });
          }
        });
        const objs = {
          color: color[index],
          image: image,
          size: stoke,
        };
        varitaion.push(objs);
      }
      setImage("");
      setStoke([]);
      const inc = index + 1;
      setIndex(inc);
      setImage(ColorsImage[inc]);
    } else {
      swal("OOPS!", "Please Update Image!", "info");  
    }
  };

  const onProduct = async (datas) => {
    if (productImages[1] && varitaion[0] && Tag[0]) {
     
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.post(
          `/api/superAdmin/Edit-Produts/${params.id}`,
          {
            name: datas.name,
            sku: "asdf123",
            price: datas.price,
            discount: datas.discount,
            wholesaler: datas.wholsalerPrice,
            new: true,
            rating: rating,
            saleCount: 10,
            tag: Tag,
            category: [Category],
            variation: varitaion,
            image: productImages,
            fullDescription: "hg",
            shortDescription: datas.Description,
          },
          config
        );
        reset();
        swal("Successfully Added!", {
          icon: "success",
        });
        navigate("/view-all-products");
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    } else {
      swal("OOPS!", "Please Update Field!", "info");
    }
  };

  console.log(size, "dfjcknm");

  const deleteProdutImage = (index) => {
    const test = [...productImages];
    test.splice(index, 1);
    setProductImages(test);
  };

  const single = product[0];

  return (
    <>
      <Box sx={{ marginLeft: "20px", overflowX: "hidden" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onProduct)}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="text-center">
            <h4 style={{ marginTop: "2%" }}>EDIT PRODUCT PAGE</h4>
          </div>
          <div className="container mt-3">
            <div className="row col-lg-10 text-center">
              <div className="col-lg-4 col-md-6">
                <TextField
                  required
                  label="First Name"
                  defaultValue=""
                  {...register("name", {
                    required: "Please enter Product name",
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-uncontrolled"
                  label="Enter Product Price "
                  {...register("price", {
                    required: "Please enter Product Price",
                  })}
                  onKeyUp={() => {
                    trigger("price");
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-password-input"
                  label="Enter Wholesaler Amount"
                  {...register("wholsalerPrice", {
                    required: "Please enter wholsalerPrice",
                  })}
                  onKeyUp={() => {
                    trigger("wholsalerPrice");
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-uncontrolled"
                  label="Enter Offer Percentage"
                  {...register("discount")}
                  onKeyUp={() => {
                    trigger("discount");
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={rating}
                  onChange={handleChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={Category}
                  onChange={ChangeCategory}
                >
                  {CategoryItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="col-lg-4 col-md-6">
                <FormControl sx={{ m: 1, width: "30ch" }}>
                  <InputLabel id="demo-multiple-chip-label">Color</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={color}
                    onChange={ChangeColor}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, color, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-6">
                <FormControl sx={{ m: 1, width: "30ch" }}>
                  <InputLabel id="demo-multiple-chip-label">Size</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={size}
                    onChange={ChangeSize}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {sizeChart.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, size, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-6">
                {/* add tage input field */}
                <FormControl sx={{ m: 1, width: "30ch" }}>
                  <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={Tag}
                    onChange={handleTag}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {tagsName.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, Tag, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-multiline-flexible"
                  label="Add Product Description"
                  multiline
                  maxRows={4}
                  {...register("Description")}
                  onKeyUp={() => {
                    trigger("Description");
                  }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={New}
                  onChange={ChangeNew}
                >
                  {NewItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-lg-4 col-md-6">
                <FormControl sx={{ m: 1, width: "30ch" }}>
                  <i
                    onClick={PriductImageupload}
                    className="btn btn-primary  pt-3 pb-3"
                    variant="outlined"
                    color="primary"
                  >
                    UPLOAD PRODUCT IMAGE(min-3)
                  </i>
                </FormControl>
              </div>
              {productImages && (
                <>
                  <div className="container">
                    <div className="row ms-2">
                      {productImages.map((image, index) => {
                        return (
                          <div className="col-md-4" key={index}>
                            <img
                              src={image.url}
                              style={{ width: "200px", height: "250px" }}
                            ></img>
                            <div className="d-flex justify-content-center mt-3">
                              <i onClick={(row) => deleteProdutImage(index)}>
                                {" "}
                                <CloseIcon
                                  style={{ color: "red", cursor: "pointer" }}
                                />
                              </i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {color[index] ? (
                " "
              ) : (
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary float-center"
                  >
                    SUBMIT
                  </button>
                </div>
              )}
            </div>
          </div>
        </Box>

        {color[index] && (
          <form onSubmit={handleSubmit(onSubmit)} name="data">
            <div className="container">
              <div className="row">
                <TableContainer component={Paper} sx={{ marginTop: "5%" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <caption>
                      <i
                        onClick={Imageupload}
                        className="btn btn-primary ms-4"
                        variant="outlined"
                        color="primary"
                      >
                        UPLOAD IMAGE
                      </i>

                      {image && (
                        <>
                          <img
                            className="float-center ms-5"
                            src={image}
                            style={{ width: "200px", height: "250px" }}
                          ></img>
                        </>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary float-end"
                      >
                        ADD
                      </button>
                    </caption>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Color</TableCell>
                        <TableCell align="center">Size</TableCell>
                        <TableCell align="center">Bustline Size</TableCell>
                        <TableCell align="center">Length</TableCell>
                        <TableCell align="center">Hip Size</TableCell>

                        <TableCell align="center">Sleeve Size</TableCell>
                        <TableCell align="center">Stoke</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {size.map((row, indexs) => {
                        Available = false;
                        return (
                          <TableRow
                            key={indexs}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{color[index]}</TableCell>
                            <TableCell align="center">{row}</TableCell>
                            <TableCell align="center">
                              {" "}
                              <input
                                style={{ width: "60px", height: "40px" }}
                                type="text"
                                key={index}
                                id="outlined-uncontrolled"
                                label="Enter Offer Percentage"
                                {...register(`Bustline${row}`)}
                                onKeyUp={() => {
                                  trigger(`Bustline${row}`);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <input
                                key={index}
                                style={{ width: "60px", height: "40px" }}
                                type="text"
                                id="outlined-uncontrolled"
                                label="Enter Offer Percentage"
                                {...register(`Length${row}`)}
                                onKeyUp={() => {
                                  trigger(`Length${row}`);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              <input
                                key={index}
                                style={{ width: "60px", height: "40px" }}
                                type="text"
                                id="outlined-uncontrolled"
                                label="Enter Offer Percentage"
                                {...register(`Hip${row}`)}
                                onKeyUp={() => {
                                  trigger(`Hip${row}`);
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              <input
                                key={index}
                                style={{ width: "60px", height: "40px" }}
                                type="text"
                                id="outlined-uncontrolled"
                                label="Enter Offer Percentage"
                                {...register(`Sleeve${row}`)}
                                onKeyUp={() => {
                                  trigger(`Sleeve${row}`);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {editStock.map((status) => {
                                if (
                                  status.colors == color[index] &&
                                  status.siz == row
                                ) {
                                  Available = true;
                                  setValue(row, status.sto ? status.sto : 0);

                                  return (
                                    <input
                                      key={index}
                                      style={{ width: "60px", height: "40px" }}
                                      type="text"
                                      id="outlined-uncontrolled"
                                      label="Enter Offer Percentage"
                                      {...register(row, {
                                        required: "Invalid Number",
                                      })}
                                      onKeyUp={() => {
                                        trigger(row);
                                      }}
                                    />
                                  );
                                } else {
                                  if (
                                    status.colors == color[index] &&
                                    status.siz != row &&
                                    !Available
                                  ) {
                                    setValue(row, 0);
                                  }
                                }
                              })}

                              {!Available && (
                                <input
                                  key={index}
                                  style={{ width: "60px", height: "40px" }}
                                  type="text"
                                  id="outlined-uncontrolled"
                                  {...register(row, {
                                    required: "Invalid Number",
                                  })}
                                  onKeyUp={() => {
                                    trigger(row);
                                  }}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </form>
        )}
      </Box>
    </>
  );
}
