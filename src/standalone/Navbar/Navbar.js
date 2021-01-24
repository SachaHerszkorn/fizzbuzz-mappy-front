import React from 'react';
import classNames from 'class-names';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.scss';

function Navbar() {
  const location = useLocation();
  const isOnStatsPage = location.pathname === '/stats';

  return (
    <nav className="navbar">
      <div className="nav-items nav-items-left">
        <Link className="home-link" to="/">
          <h1>fizzbuzz 🌊</h1>
        </Link>
      </div>
      <div className="nav-items nav-items-right">
        <Link
          className={classNames('stat-link', { active: isOnStatsPage })}
          to="/stats"
        >
          <h1>
            stats <span>📊</span>
          </h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
