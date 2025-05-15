import { useState, useMemo } from "react";
import classes from "../stylesheets/Navbar.module.css";
import { useAuth } from "../context/authContext";
import { LogoutUser } from "../actions/actions";

import { FaBriefcase } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { FaUser, FaHome, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import {
  House,
  Briefcase,
  NotebookText,
  CircleUser,
  UsersRound,
  ListTodo,
} from "lucide-react";

const admin = [
  { to: "/dashboard", label: "Overview", icon: House },
  { to: "/dashboard/manage/jobs", label: "Manage Jobs", icon: Briefcase },
  {
    to: "/dashboard/manage/applications",
    label: "Manage Applications",
    icon: NotebookText,
  },
  {
    to: "/dashboard/manage/interns",
    label: "Manage Interns",
    icon: UsersRound,
  },
  {
    to: "/dashboard/manage/tasks",
    label: "Manage Tasks",
    icon: ListTodo,
  },
  { to: "/dashboard/profile", label: "Profile", icon: CircleUser },
];

const general = [
  { to: "/overview", label: "Overview", icon: FaHome },
  { to: "/tasks", label: "My Task", icon: FaTasks },
  { to: "/applications", label: "My Applications", icon: MdAssignment },
  { to: "/apply", label: "Apply", icon: MdAssignment },
  { to: "/profile", label: "Profile", icon: CgProfile },
];

export function Navbar() {
  const { user, setUser } = useAuth();
  const { pathname } = useLocation();
  const [isActive, setActive] = useState(pathname);

  
  const links = useMemo(() => {
    const routes = user?.role === "admin" ? admin : general;
    return routes.map(({ to, label, icon: Icon }) => {
      return (
        <NavLink
          key={label}
          to={to}
          className={classes.link}
          data-active={to == isActive ? isActive : undefined}
          onClick={() => setActive(to)}
          aria-label={label}
        >
          <Icon strokeWidth={1.75} />
          <span style={{ marginLeft: ".5rem" }}>{label}</span>
        </NavLink>
      );
    });
  }, [isActive, user?.role]);

  const handleLogout = () => {
    LogoutUser(setUser);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <a className={classes.link} onClick={handleLogout}>
          <IoIosLogOut className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
