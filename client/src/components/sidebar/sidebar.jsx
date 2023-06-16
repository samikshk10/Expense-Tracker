import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyBill,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <FontAwesomeIcon icon={faHome} />,
    to: "/dashboard",
    section: "",
  },
  {
    display: "Expenses",
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    to: "/expenses",
    section: "",
  },
  {
    display: "Income",
    icon: <FontAwesomeIcon icon={faDollar} />,
    to: "/incomes",
    section: "",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Expense Tracker App</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div ref={indicatorRef} className="sidebar__menu__indicator"></div>
        {sidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={() => {
              setActiveIndex(index);
            }}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
