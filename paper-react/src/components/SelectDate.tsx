interface selectDateProps {
  setselectDate: any
  dates: string[]
}

const SelectDate = ({ setselectDate, dates }: selectDateProps) => {
  return (
    <div className="flex">
      <div className="mr-2">Select Date: </div>
      <select
        name="date"
        id="date-select"
        className="border-2 border-red-500 text-black"
        onChange={(e) => setselectDate(e.target.value)}
      >
        {/* <option value="">--Please Select Date--</option> */}
        {/* <option value="dog">Dog</option> */}
        {dates.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectDate
