import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar(props){
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">{props.title}</a>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
