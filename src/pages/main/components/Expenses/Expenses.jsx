import Navbar from "../../../../components/Navbar"
import Report from './Report'
import "./Expenses.css"

const Expenses = () => {

  return (
    <div className='expenses-body' >
      <div className='expenses-left'>
        <Navbar />
      </div>
      <div className='expenses-right'>
        <Report />
      </div>
    </div>
  )
}

export default Expenses