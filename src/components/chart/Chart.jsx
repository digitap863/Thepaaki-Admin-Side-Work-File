import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const Chart = ({ aspect, title }) => {
  const [month, setMonth] = useState([]);
  const [Api, setApi] = useState([]);
  const [datas, setDatas] = useState([]);
  const [origina, setOriginal] = useState([]);
  
  const totalMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const AdminDeatails = useSelector((state) => state.admin.value);
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.get(
          "/api/superAdmin/get-mothly-sales",
          config
        );
        console.log(data);
        data.map((frist) => {
          //  const y=frist._id.getMonth()
          const month = new Date(frist._id).getMonth();

          const obj = {
            name: totalMonth[month],
            Total: frist.totalAmount,
          };
          datas.push(obj);
        });
       

        const rev = datas.reverse();
        setOriginal(rev);
      } catch (error) {
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={origina}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
