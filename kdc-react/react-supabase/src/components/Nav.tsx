// nav.tsx
import React from "react";
import { Link } from "react-router-dom";

export const Nav: React.FC = () => (
  <>
  <h2>Navigation</h2>
  <nav>
    <ul style={{display:'flex', gap:'10px'}}>
      <li style={{ listStyle: 'none' }}>
        <Link to='/'>Home</Link>
      </li>
      <li style={{ listStyle: 'none' }}>
        <Link to='/profile'>Profile</Link>
      </li>
    </ul>
  </nav>
  </>
);
