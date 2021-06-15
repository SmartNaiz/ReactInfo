import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { isAuth } = props.auth;
  return (
    <>
      <header>
        <nav className="site-header sticky-top py-1">
          <div className="container  d-flex flex-column flex-md-row justify-content-between">
            <Link className="logo" to="/" aria-label="Product">
              {/* SMART<span>NAIZ</span> */}
            </Link>
            {isAuth ? (
              <>
                <Link className="mt-4 header_btn" to="/contact">
                  Санал хүсэлт
                </Link>
                <Link className="mt-4 header_btn" to="/dashboard">
                  Мэдээ тайлан
                </Link>
                <div className="mt-4 header_btn" onClick={props.logout}>
                  Гарах
                </div>
              </>
            ) : (
              <Link className="mt-4 header_btn" to="/login"></Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
