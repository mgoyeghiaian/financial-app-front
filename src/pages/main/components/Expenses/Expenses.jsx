import Navbar from "../../../../components/Navbar"
import Profitgoal from '../../../../components/Profitgoal'
import Hero from './Hero'
import Report from './Report'
import Targetgoal from './Targetgoal'
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