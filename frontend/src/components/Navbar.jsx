import { useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "@/stylesheets/Navbar.module.css";
import { useAuth } from "@/context/AuthContext";
import { LogoutUser } from "@/actions";
import { Title } from "@mantine/core";

import {
  House,
  Briefcase,
  NotebookText,
  CircleUser,
  UsersRound,
  ListTodo,
  LogOut,
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
    to: "/dashboard/manage/users",
    label: "Manage Users",
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
  { to: "/dashboard", label: "Overview", icon: House },
  { to: "/dashboard/tasks", label: "My Tasks", icon: ListTodo },
  { to: "/dashboard/applications", label: "My Applications", icon: NotebookText },
  { to: "/dashboard/jobs", label: "My Jobs", icon: Briefcase },
  { to: "/dashboard/profile", label: "Profile", icon: CircleUser },
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
          <Icon strokeWidth={2} />
          <span style={{ fontWeight: 600, marginLeft: ".5rem" }}>{label}</span>
        </NavLink>
      );
    });
  }, [isActive, user?.role]);

  const handleLogout = () => {
    LogoutUser(setUser);
  };

  return (
    <nav className={classes.navbar}>
      <Title order={1} className={classes.header}>
        internee.sh
      </Title>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <a
          style={{ cursor: "pointer" }}
          className={classes.link}
          onClick={handleLogout}
        >
          <LogOut strokeWidth={2} />
          <span style={{ fontWeight: 600, marginLeft: ".5rem" }}>LOGOUT</span>
        </a>
      </div>
    </nav>
  );
}
