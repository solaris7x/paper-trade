export interface PositionItemProps {
  /**
   * id is same as index of item in array
   */
  id: number
  type: string
  price: number
  setPositions: React.Dispatch<React.SetStateAction<PositionItemProps[]>>
}

const PositionItem = (props: PositionItemProps) => {
  return (
    <div className="flex">
      <div className="mr-auto">Reliance ({props.type})</div>
      <div className="mx-2">₹ {props.price}</div>
      <button
        className="mx-2"
        onClick={() => {
          // Remove from positions
          props.setPositions((positions) =>
            positions.filter((x) => x.id !== props.id)
          )
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-5"
          viewBox="0 0 20 20"
          fill="red"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default PositionItem
