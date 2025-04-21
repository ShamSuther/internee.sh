import { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import { useAuth } from "../context/authContext";
import { LogoutUser } from "../actions/actions";

import { FaBriefcase } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { FaUser, FaHome, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router";

const admin = [
  { link: "/overview", label: "Overview", icon: FaHome },
  { link: "/jobs", label: "Manage Jobs", icon: FaBriefcase },
  { link: "/applications", label: "Manage Applications", icon: MdAssignment },
  { link: "/users", label: "Manage Users", icon: FaUser },
  { link: "/profile", label: "Profile", icon: CgProfile },
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
  const navigate = useNavigate();

  const data = user?.role === "admin" ? admin : general;
  const disableLinks = user?.role === "intern" || userType === "applicant";

  const links = data.map((item) => (
    <a
      key={item.label}
      href={disableLinks ? "#" : item.link}
      className={`${classes.link} ${disableLinks ? classes.disabled : ""}`}
      data-active={item.label === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        if (!disableLinks) setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

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
