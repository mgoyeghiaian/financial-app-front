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
      <div className='expenses-middle'>
        <div><Profitgoal /></div>
        <div><Hero /></div>
      </div>
      <div className='expenses-right'>
        <div><Targetgoal /></div>
      </div>
      <div className='expenses-report'>
        <Report />
      </div>
    </div>
  )
}

export default Expenses