import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './User Pages/Homepage'
import Shop from './User Pages/Shop'
import New from './User Pages/New'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App