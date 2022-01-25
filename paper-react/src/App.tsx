import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import SelectDate from "./components/SelectDate"
import CurrentBar from "./components/CurrentBar"
import Positions from "./components/Positions"

export interface mongoDataProps {
  price: number
  date: string
}

const App = () => {
  const [mongoData, setMongoData] = useState<mongoDataProps[]>()

  useEffect(() => {
    if (!process.env.REACT_APP_DATABASE_URL) {
      throw new Error("REACT_APP_DATABASE_URL is not defined")
    }
    fetch(process.env.REACT_APP_DATABASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setMongoData(data)
      })
  }, [])

  const [selectDate, setselectDate] = useState("2021-10-24T18:30:00.000Z")

  console.log("Selected Date", selectDate)

  if (mongoData === undefined) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <div className="md:text-xl mx-4 mt-2 text-white">
        <SelectDate
          dates={mongoData.map((i) => i.date)}
          setselectDate={setselectDate}
        />
        <CurrentBar
          date={selectDate}
          price={mongoData.find((i) => i.date === selectDate)?.price || 0}
          mongoData={mongoData}
          setselectDate={setselectDate}
        />

        <Positions
          date={selectDate}
          currentPrice={
            mongoData.find((i) => i.date === selectDate)?.price || 0
          }
          mongoData={mongoData}
        />
        <div className="p-2">
          <div className="">
            Tip : Add a position by clicking on the Buy or Sell button and
            change day to see the PnL graph.
          </div>
          <div className="">
            The last point in graph is today (current) price.
          </div>
        </div>
      </div>
    </>
  )
}

export default App
