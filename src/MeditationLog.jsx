import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {toAnal, toMinSecStr} from './Util';
import Storage from './Storage';

const MeditationLog = ({logUpdated}) => {
  const [data, setData] = useState([])
  useEffect(()=>{
    const meditations = Storage.getMeditations().sort(((a,b)=>(a.date+a.time>b.date+b.time)))
    if (meditations.length==1) {
      meditations.push({date: '\u00A0', duration: meditations[0].duration})
    }
    setData(meditations)
  }, [logUpdated])
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
          className='right-0.05'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={toAnal} domain={[0, (max) => max>=600? max+60 : max+15]} />
          <Tooltip className='text-[#1a1a1a]' 
                labelFormatter={(e)=>e}
                    formatter={(value, name, props) => {
                      if (props.dataKey == "duration") {
                        return toMinSecStr(value);
                      } else if (props.dataKey == "date") {
                        return "date";
                      }
                    }}
                    itemStyle={{ color: "#1a1a1a" }}
                    labelStyle={{color: 'black', textAlign: 'left'}}
                    // labelStyle={{ display: "none" }}
                    contentStyle={{
                      borderRadius: "25px",
                    }} ></Tooltip>
          <Area type="monotone" dataKey="duration" stroke="#6fb551" fill="#6fb551"  connectNulls={true}/>
        </AreaChart>
  </>)
}
export default MeditationLog;