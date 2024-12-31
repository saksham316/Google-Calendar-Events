import { FaDoorOpen } from "react-icons/fa";
import "./header.css";
import { useAppDispatch } from "../../../redux/store";
import { purgeStore } from "../../../modules/auth/redux/actions/authAction";
import { logout } from "../../../modules/auth/redux/slices/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left-icon">
          <img src={"/images/calendarIcon.png"} />
        </div>
        <h2 className="header__left-title">Event Calendar</h2>
      </div>
      <div className="header__right">
        <p
          className="header__right-logout-text"
          onClick={async () => {
            dispatch(logout());
            await purgeStore();
          }}
        >
          Logout
        </p>
        <FaDoorOpen
          className="header__right-logout-icon"
          onClick={async () => {
            dispatch(logout());
            await purgeStore();
          }}
        />
        <div className="header__right-avatar">
          <img src={"/images/authCard2.jpg"} />
        </div>
      </div>
    </div>
  );
};
