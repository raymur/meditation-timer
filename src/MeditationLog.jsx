import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {toAnal, toMinSecStr} from './Util';
import Storage from './Storage';

const DUMMY_DATA = [
  {date: '2025-02-14', duration: 60},
  {date: '2025-02-16', duration: 80},
  {date: '2025-02-15', duration: 70},
  {date: '2025-02-18', duration: 90}, 
]


const MeditationLog = ({logUpdated}) => {
  const [data, setData] = useState([])
  useEffect(()=>{
    const meditations = Storage.getMeditations().sort(((a,b)=>a.date>b.date))
    if (meditations.length==1) {
      meditations.push({date: '\u00A0', duration: meditations[0].duration})
    }
    setData(meditations)
  }, [logUpdated])
  // useEffect(()=>{setData(DUMMY_DATA.sort(((a,b)=>a.date>b.date)))}, [])
  return (<>

    <h3>Your meditation progress: </h3>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={toAnal} domain={[0, (max) => max>=600? 60 : 15]} />
          <Tooltip clasName='text-[#1a1a1a]' 
                labelFormatter={(e)=>'date'}
                    formatter={(value, name, props) => {
                      if (props.dataKey == "duration") {
                        return toMinSecStr(value);
                      } else if (props.dataKey == "date") {
                        return "date";
                      }
                    }}
                    itemStyle={{ color: "#1a1a1a" }}
                    // labelStyle={{ display: "none" }}
                    contentStyle={{
                      borderRadius: "25px",
                      filter: "drop-shadow(8px 8px 10px gray)",
                    }} ></Tooltip>
          <Area type="monotone" dataKey="duration" stroke="#6fb551" fill="#6fb551"  connectNulls={true}/>
        </AreaChart>
  </>)
}
export default MeditationLog;