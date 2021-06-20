import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { isAuth } = props.auth;
  const { UserId } = props.auth.user;
  const UserName = () => {
    switch (UserId) {
      case "BGNUR":
        return <span>Багануур ус</span>;
      case "TSMIN":
        return <span>Цайрт минериалс</span>;
      default:
        return <span>No User</span>;
    }
  };
  return (
    <>
      <header>
        <nav className="site-header sticky-top py-1">
          <div className="container  d-flex flex-column flex-md-row justify-content-between">
            <Link className="logo" to="/" aria-label="Product">
              <UserName />
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
              <Link className="mt-4 header_btn" to="/"></Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
