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
// import { useToasts } from "react-toast-notifications";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  "purple-2",
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

const sizeChart = ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "XXXXXL"];

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
  const [rating, setRating] = React.useState();
  const [Category, setCategory] = React.useState();
  const [color, setColor] = React.useState([]);
  const [size, setSize] = React.useState([]);
  const [index, setIndex] = useState(0);
  const [varitaion, setVaritaion] = useState([]);
  const [image, setImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [stoke, setStoke] = useState([]);
  const [Tag, setTag] = React.useState([]);
  const [New, setNew] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, trigger, reset } = useForm();
  const AdminDeatails = useSelector((state) => state.admin.value);
  const ChangeColor = (event) => {
    const {
      target: { value },
    } = event;
    setColor(typeof value === "string" ? value.split(",") : value);
  };
  const ChangeSize = (event) => {
    const {
      target: { value },
    } = event;
    setSize(typeof value === "string" ? value.split(",") : value);
  };

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
  const ChangeNew = () => {
    if (New == true) {
      setNew(false);
    } else {
      setNew(true);
    }
  };
  // const udateStoke = (event, size, colors) => {
  //   color.map((data) => {
  //     if (data == color) {
  //       const obj = {
  //         name: color,
  //         size: [
  //           {
  //             name: size,
  //             stock: event,
  //           },
  //         ],
  //       };
  //     }
  //   });

  //   // setImage((prev) => [
  //   //   ...prev,
  //   //   { url: result.info.url, public_id: result.info.public_id },
  //   // ]);
  // };

  //image uploding function
  const Imageupload = () => {
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: "dk8efhvbn",
        uploadPreset: "z0mb5p1h",
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
        cloudName: "dk8efhvbn",
        uploadPreset: "z0mb5p1h",
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
          stock: data.M,
          Bustline: data.BustlineM,
          Length: data.LengthM,
          Hip: data.HipM,
          Sleeve: data.SleeveM,
        });
      }
      if (data.S > 0) {
        stoke.push({
          name: "S",
          stock: data.S,
          Bustline: data.BustlineS,
          Length: data.LengthS,
          Hip: data.HipS,
          Sleeve: data.SleeveS,
        });
      }
      if (data.L > 0) {
        stoke.push({
          name: "L",
          stock: data.L,
          Bustline: data.BustlineL,
          Length: data.LengthL,
          Hip: data.HipL,
          Sleeve: data.SleeveL,
        });
      }
      if (data.XL > 0) {
        stoke.push({
          name: "XL",
          stock: data.XL,
          Bustline: data.BustlineXL,
          Length: data.LengthXL,
          Hip: data.HipXL,
          Sleeve: data.SleeveXL,
        });
      }
      if (data.XXL > 0) {
        stoke.push({
          name: "XXL",
          stock: data.XXL,
          Bustline: data.BustlineXXL,
          Length: data.LengthXXL,
          Hip: data.HipXXL,
          Sleeve: data.SleeveXXL,
        });
      }
      if (data.XXXL > 0) {
        stoke.push({
          name: "XXXL",
          stock: data.XXXL,
          Bustline: data.BustlineXXXL,
          Length: data.LengthXXXL,
          Hip: data.HipXXXL,
          Sleeve: data.SleeveXXXL,
        });
      }
      if (data.XXXXL > 0) {
        stoke.push({
          name: "XXXXL",
          stock: data.XXXXL,
          Bustline: data.BustlineXXXXL,
          Length: data.LengthXXXXL,
          Hip: data.HipXXXXL,
          Sleeve: data.SleeveXXXXL,
        });
      }
      if (data.XXXXXL > 0) {
        stoke.push({
          name: "XXXXXL",
          stock: data.XXXXXL,
          Bustline: data.BustlineXXXXXL,
          Length: data.LengthXXXXXL,
          Hip: data.HipXXXXXL,
          Sleeve: data.SleeveXXXXXL,
        });
      }
      const obj = {
        color: color[index],
        image: image,
        size: stoke,
      };
      varitaion.push(obj);
      setImage("");
      setStoke([]);

      setIndex(index + 1);
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
          "/api/superAdmin/addProduct",
          {
            name: datas.name,
            sku: "asdf123",
            price: parseInt(datas.price),
            discount: parseInt(datas.discount),
            wholesaler: parseInt(datas.wholsalerPrice),
            new: New,
            rating: parseInt(rating),
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
        navigate("/");
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    } else {
      swal("OOPS!", "Please Update Field!", "info");
    }
  };
  return (
    <>
      <Box
        sx={{
          marginTop: "10px",
          boxShadow: "2px 4px 10px 7px rgba(201, 201, 201, 0.47)",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
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
            <h4 style={{ marginTop: "2%", paddingTop: "35px" }}>
              ADD PRODUCT PAGE
            </h4>
          </div>
          <div className="container">
            <div className="row col-lg-10 text-center">
              <div className="col-lg-4 col-md-6">
                <TextField
                  required
                  id="outlined-uncontrolled"
                  label="Enter Product Name"
                  defaultValue=""
                  {...register("name", {
                    required: "Please enter Product name",
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-uncontrolled"
                  label="Enter Product Price*"
                  {...register("price", {
                    required: "Please enter Product Price",
                  })}
                  onKeyUp={() => {
                    trigger("price");
                  }}
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-password-input"
                  label="Enter Wholesaler Amount*"
                  {...register("wholsalerPrice", {
                    required: "Please enter wholsalerPrice",
                  })}
                  onKeyUp={() => {
                    trigger("wholsalerPrice");
                  }}
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
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Rating*"
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
                  id="outlined-select-currency"
                  select
                  label="Category*"
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
                    UPLOAD IMAGE(Min-2)(600x800)
                  </i>
                </FormControl>
              </div>
              {productImages && (
                <>
                  <div className="row ms-2">
                    {productImages.map((image, index) => {
                      return (
                        <div className="col-md-3">
                          <img
                            src={image.url}
                            style={{ width: "200px", height: "250px" }}
                          ></img>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {color[index] ? (
                " "
              ) : (
                <div className="text-center mt-5 mb-5">
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
            <div className="row">
              <div className="col-10">
                <TableContainer component={Paper} sx={{ marginTop: "5%" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <caption>
                      <i
                        onClick={Imageupload}
                        className="btn btn-primary ms-4"
                        variant="outlined"
                        color="primary"
                      >
                        UPLOAD IMAGE(600x800)
                      </i>

                      {image && (
                        <img
                          className="float-center ms-5"
                          src={image}
                          style={{ width: "200px", height: "250px" }}
                        ></img>
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
