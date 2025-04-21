import { useState } from "react";
import classes from "../stylesheets/Navbar.module.css";
import { useAuth } from "../context/authContext";
import { LogoutUser } from "../actions/actions";

import { FaBriefcase } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { FaUser, FaHome, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";

const admin = [
  { link: "/dashboard", label: "Overview", icon: FaHome },
  { link: "/dashboard/manage/jobs", label: "Manage Jobs", icon: FaBriefcase },
  {
    link: "/dashboard/manage/applications",
    label: "Manage Applications",
    icon: MdAssignment,
  },
  {
    link: "/dashboard/manage/interns",
    label: "Manage Interns",
    icon: FaUser,
  },
  {
    link: "/dashboard/manage/tasks",
    label: "Manage Tasks",
    icon: FaTasks,
  },
  { link: "/dashboard/profile", label: "Profile", icon: CgProfile },
];

const general = [
  { link: "/overview", label: "Overview", icon: FaHome },
  { link: "/tasks", label: "My Task", icon: FaTasks },
  { link: "/applications", label: "My Applications", icon: MdAssignment },
  { link: "/apply", label: "Apply", icon: MdAssignment },
  { link: "/profile", label: "Profile", icon: CgProfile },
];

export function Navbar() {
  const { user, setUser, userType } = useAuth();
  const [active, setActive] = useState("Overview");

  const data = user?.role === "admin" ? admin : general;
  const disableLinks = user?.role === "intern" || userType === "applicant";

  const links = data.map((item) => (
    <NavLink
      key={item.label}
      to={disableLinks ? "/dashboard" : item.link}
      className={`${classes.link} ${disableLinks ? classes.disabled : ""}`}
      data-active={item.label === active || undefined}
      onClick={(event) => {
        if (disableLinks) {
          event.preventDefault();
        } else {
          setActive(item.label);
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <a className={classes.link} onClick={() => LogoutUser(setUser)}>
          <IoIosLogOut className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
