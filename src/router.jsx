import { BrowserRouter , Routes, Route } from "react-router-dom"
import Overview from "./pages/Overview"
import Transactions from "./pages/Transactions"
import Goals from "./pages/Goals"
import Navbar from "./components/Navbar/Navbar"


const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>
    </BrowserRouter>
  )
}

export default AppRouter