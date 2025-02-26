import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toAnal, toMinSecStr } from "./Util";
import Storage from "./Storage";

const SM_BP = 640;


const MeditationLog = ({ logUpdated }) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(250);
  useEffect(() => {
    const meditations = Storage.getMeditations().sort(
      (a, b) => a.date + a.time > b.date + b.time,
    );
    if (meditations.length == 1) {
      meditations.push({ date: "\u00A0", duration: meditations[0].duration });
    }
    setData(meditations);
  }, [logUpdated]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
        setWidth(w < SM_BP ? 350 : 425);
        setHeight(w < SM_BP ? Math.floor(350*0.8) : 425*0.8);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full m-auto sm:w-[95%] flex justify-center flex-col items-center">
      <h2 className="text-center flex mb-2 text-xl">Meditation progress</h2>
      <AreaChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        className="right-0.05"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={toAnal}
          domain={[0, (max) => (max >= 600 ? max + 60 : max + 15)]}
        />
        <Tooltip
          className="text-[#1a1a1a]"
          labelFormatter={(e) => e}
          formatter={(value, name, props) => {
            if (props.dataKey == "duration") {
              return toMinSecStr(value);
            }
          }}
          itemStyle={{ color: "#1a1a1a" }}
          labelStyle={{ color: "black", textAlign: "left" }}
          // labelStyle={{ display: "none" }}
          contentStyle={{
            borderRadius: "25px",
          }}
        ></Tooltip>
        <Area
          type="monotone"
          dataKey="duration"
          stroke="#6fb551"
          fill="#6fb551"
          connectNulls={true}
        />
      </AreaChart>
    </div>
  );
};
export default MeditationLog;
