import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
import Services from './pages/Services.jsx'
import Transactions from './pages/Transactions.jsx'
import Welcome from './pages/Welcome.jsx'

function App(){ 
  return (
    <div className='min-h-screen'>
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default App
