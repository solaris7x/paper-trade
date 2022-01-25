import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { mongoDataProps } from "../App"
import { PositionItemProps } from "./PositionItem"
import { calpnl } from "./Positions"

// import data from "../data"

interface ChartProps {
  date: string
  currentPrice: number
  mongoData: mongoDataProps[]
  positions: PositionItemProps[]
}

const Chart = (props: ChartProps) => {
  // Find current date index in mongoData
  const currentDateIndex = props.mongoData.findIndex(
    (i) => i.date === props.date
  )

  // 5 days before current date
  let fiveDaysBefore = currentDateIndex - 5
  if (fiveDaysBefore < 0) {
    fiveDaysBefore = 0
  }

  const chartData = []

  for (let i = fiveDaysBefore; i <= currentDateIndex; i++) {
    chartData.push({
      x: props.mongoData[i].price,
      y: calpnl(props.positions, props.mongoData[i].price),
    })
  }

  console.log(chartData)

  const data = chartData
  // const data = [
  //   { name: "Page A", uv: 400, pv: 2400, amt: 2500 },
  //   { name: "Page B", uv: -500, pv: 2100, amt: 2100 },
  //   //   { name: "Page C", uv: -300, pv: 2200, amt: 2500 },
  //   //   { name: "Page D", uv: -600, pv: 2400, amt: 2100 },
  //   //   { name: "Page E", uv: 400, pv: 2400, amt: 2700 },
  //   //   { name: "Page F", uv: -200, pv: 2500, amt: 2100 },
  //   //   { name: "Page G", uv: 400, pv: 2100, amt: 2400 },
  //   //   { name: "Page G", uv: 0, pv: 2100, amt: 2400 },
  // ]

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.y))
    const dataMin = Math.min(...data.map((i) => i.y))

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }

    return dataMax / (dataMax - dataMin)
  }

  const off = gradientOffset()

  return (
    <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4 pt-2 bg-gray-700">
      <div className="font-bold pl-4 pb-2">Chart</div>
      <ResponsiveContainer width="100%" aspect={2}>
        <AreaChart
          // width={500}
          // height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="x" />
          <YAxis dataKey="y" />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="y"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
