import { useAppContext } from "../context/AppContext"
import Button from "./Button"

const Incrementer = ({ className, ...props }) => {
  const { maxCaseCount, caseCount, setCaseCount } = useAppContext()

  const handleIncrement = () => {
    setCaseCount((prevCount) => Math.min(prevCount + 1, maxCaseCount))
  }

  const handleDecrement = () => {
    setCaseCount((prevCount) => Math.max(0, prevCount - 1))
  }

  const handleValueChange = (e) => {
    const newCaseCount = parseInt(e.target.value)
    if (!isNaN(newCaseCount)) {
      if (newCaseCount <= 0) {
        setCaseCount(0)
      } else if (newCaseCount >= maxCaseCount) {
        setCaseCount(maxCaseCount)
      } else {
        setCaseCount(newCaseCount)
      }
    } else if (e.target.value !== "") {
      e.target.value = caseCount
    } else {
      setCaseCount("")
    }
  }

  return (
    <div className={`flex-col justify-center text-center ${className || ""}`}>
      <span>case count</span>
      <div className="flex-row justify-center text-center">
        <Button
          className="text-center text-tertionary"
          onClick={handleDecrement}
        >
          -
        </Button>
        <input
          className="text-center"
          type="number"
          value={caseCount}
          onChange={(e) => handleValueChange(e)}
        ></input>
        <Button
          className="text-center text-tertionary"
          onClick={handleIncrement}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default Incrementer
