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
import { House,Briefcase,NotebookText,CircleUser,UsersRound,ListTodo } from "lucide-react";

const admin = [
  { link: "/dashboard", label: "Overview", icon: House },
  { link: "/dashboard/manage/jobs", label: "Manage Jobs", icon: Briefcase },
  {
    link: "/dashboard/manage/applications",
    label: "Manage Applications",
    icon: NotebookText,
  },
  {
    link: "/dashboard/manage/interns",
    label: "Manage Interns",
    icon: UsersRound,
  },
  {
    link: "/dashboard/manage/tasks",
    label: "Manage Tasks",
    icon: ListTodo,
  },
  { link: "/dashboard/profile", label: "Profile", icon: CircleUser },
];

const general = [
  { link: "/overview", label: "Overview", icon: FaHome },
  { link: "/tasks", label: "My Task", icon: FaTasks },
  { link: "/applications", label: "My Applications", icon: MdAssignment },
  { link: "/apply", label: "Apply", icon: MdAssignment },
  { link: "/profile", label: "Profile", icon: CgProfile },
];

export function Navbar() {
  const { user, setUser } = useAuth();
  const [active, setActive] = useState("Overview");

  const data = user?.role === "admin" ? admin : general;

  const links = data.map((item) => (
    <NavLink
      key={item.label}
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon strokeWidth={1.75} />
      <span style={{marginLeft:".15rem"}}>{item.label}</span>
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
