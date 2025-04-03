import { Link } from 'react-router-dom';
import './Navbar.css';
import { Award, BadgeDollarSign, ChartColumn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/"><ChartColumn className="nav-icon" />Overview</Link></li>
        <li><Link to="/transactions"><BadgeDollarSign className="nav-icon" />Transactions</Link></li>
        <li><Link to="/goals"> <Award className="nav-icon" />Goals</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar