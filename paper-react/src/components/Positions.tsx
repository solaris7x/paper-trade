import { useState } from "react"
import { mongoDataProps } from "../App"
import Chart from "./Chart"
import PositionItem, { PositionItemProps } from "./PositionItem"

interface PositionsProps {
  date: string
  currentPrice: number
  mongoData: mongoDataProps[]
}

const Positions = (props: PositionsProps) => {
  const [positions, setPositions] = useState<PositionItemProps[]>([])

  const pnl = calpnl(positions, props.currentPrice)

  return (
    <div className="mt-4 md:flex w-full">
      <div className="md:w-1/2 bg-gray-700 rounded p-4">
        <div className="font-bold pb-2 border-b-2 border-gray-400">
          Stratergy Positions
        </div>
        <div className="ml-2 mt-2 pb-2 border-b-2 border-gray-400 ">
          {positions.length > 0
            ? positions.map((i) => <PositionItem key={i.id} {...i} />)
            : "No positions yet"}
          {/* <PositionItem type="Sell" price={"999"} /> */}
        </div>
        <div className="mt-2 mr-10 text-right">PnL: ₹ {pnl}</div>
        <div className="mt-6 flex justify-around">
          <button
            className="px-4 py-1 text-2xl font-bold bg-green-600 rounded-md"
            onClick={() => {
              setPositions((positions) => [
                ...positions,
                {
                  id: positions.length,
                  type: "Buy",
                  price: props.currentPrice,
                  setPositions,
                },
              ])
            }}
          >
            Buy
          </button>
          <button
            className="px-4 py-1 text-2xl font-bold bg-red-600 rounded-md"
            onClick={() => {
              setPositions((positions) => [
                ...positions,
                {
                  id: positions.length,
                  type: "Sell",
                  price: props.currentPrice,
                  setPositions,
                },
              ])
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <Chart {...props} positions={positions} />
    </div>
  )
}

export default Positions

export const calpnl = (
  positions: PositionItemProps[],
  currentPrice: number
) => {
  const buyPositionsSum =
    currentPrice * positions.filter((x) => x.type === "Buy").length -
    positions.reduce((acc, curr) => {
      if (curr.type === "Buy") {
        return acc + curr.price
      }
      return acc
    }, 0)

  const sellPositionsSum =
    positions.reduce((acc, curr) => {
      if (curr.type === "Sell") {
        return acc + curr.price
      }
      return acc
    }, 0) -
    currentPrice * positions.filter((x) => x.type === "Sell").length

  const pnl = buyPositionsSum + sellPositionsSum
  return Math.round(pnl * 100) / 100
}
