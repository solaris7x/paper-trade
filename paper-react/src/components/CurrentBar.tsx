import { mongoDataProps } from "../App"

interface CurrentBarProps {
  date: string
  price: number
  mongoData: mongoDataProps[]
  setselectDate: any
}

const CurrentBar = ({
  date,
  price,
  mongoData,
  setselectDate,
}: CurrentBarProps) => {
  return (
    <div className="mt-4 text-center flex justify-between">
      <button
        className="px-2 md:py-1 font-bold bg-zinc-700 rounded-md"
        onClick={() => {
          // Find current date index in mongoData
          const currentDateIndex = mongoData.findIndex((i) => i.date === date)
          // If current date index is not 0, then set selectDate to previous date
          if (currentDateIndex !== 0) {
            setselectDate(mongoData[currentDateIndex - 1].date)
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        1 Day
      </button>
      <div className="">
        <div className="">Current Date</div>
        <div className="">{date}</div>
      </div>
      <div className="">
        <div className="">Current Price</div>
        <div className="">₹ {price}</div>
      </div>
      <button
        className="px-2 md:py-1 font-bold bg-zinc-700 rounded-md"
        onClick={() => {
          // Find current date index in mongoData
          const currentDateIndex = mongoData.findIndex((i) => i.date === date)
          // If current date index is not last index, then set selectDate to next date
          if (currentDateIndex !== mongoData.length - 1) {
            setselectDate(mongoData[currentDateIndex + 1].date)
          }
        }}
      >
        1 Day
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  )
}

export default CurrentBar
