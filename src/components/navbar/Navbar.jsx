import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import avatarLogo from "../../assets/img/avatar.svg";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchName, setSearchName] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(false);
  const avatar = currentUser && currentUser.avatar
    ? `http://localhost:5000/${currentUser.avatar}`
    : avatarLogo;
  function searchChangeHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeOut !== false) {
      clearTimeout(searchTimeOut);
    }
    if (e.target.value !== "") {
      setSearchTimeOut(
        setTimeout(
          (value) => {
            dispatch(searchFiles(searchName));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }
  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
          />
        )}
        {!isAuth ? (
          <>
            <div className="navbar__login">
              <NavLink to="/login">Войти</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to="/registration">Регистрация</NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="navbar__login" onClick={() => dispatch(logout())}>
              Выйти
            </div>
            <NavLink to="profile">
              <img className="navbar__avatar" src={avatar} alt="/avatar"></img>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
