import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav className="navbar navbar-expand-lg bg-dark text-uppercase">
        <div className="container">
            <a className="navbar-brand text-white">Readable</a>
            <button className="navbar-toggler navbar-toggler-right text-uppercase text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white rounded" to="/"> <strong>Página Inicial</strong> </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default NavBar;