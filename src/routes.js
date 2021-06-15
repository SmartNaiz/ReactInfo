import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ToastsComponent from "./utils/toasts";
import { connect } from "react-redux";
import { autoSignIn, logoutUser } from "./store/actions";
import AuthHoc from "./components/hoc/authHoc";
import Header from "./components/header";
import Footer from "./components/footer";
import Contact from "./components/contact";
import Dashboard from "./components/dashboard";
import Messages from "./components/messages";
import HomePage from "./Pages/HomePage";

class Routes extends Component {
  componentDidMount() {
    this.props.dispatch(autoSignIn());
  }

  handleLogout = () => this.props.dispatch(logoutUser());

  app = (auth) => (
    <>
      <BrowserRouter>
        {auth.isAuth ? <Header auth={auth} logout={this.handleLogout} /> : null}

        <Switch>
          <Route path="/contact/messages" component={AuthHoc(Messages)} />
          <Route path="/dashboard" component={AuthHoc(Dashboard)} />
          <Route path="/contact" component={AuthHoc(Contact)} />
          <Route path="/" component={HomePage} />
        </Switch>
        <Footer />
        <ToastsComponent />
      </BrowserRouter>
    </>
  );

  render() {
    const { auth } = this.props;
    return auth.checkingAuth ? this.app(auth) : "...loading";
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Routes);
