import React, { Component, MouseEvent, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import routes, { Route } from "../routes/index";

import { Card, withClickOutside, detectElementInDOM } from "ui-neumorphism";

interface SidebarProps {
  dark: boolean;
  open: boolean;
  size: string;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  onOutsideClick: () => void;
}

class Sidebar extends Component<SidebarProps> {
  private get isSmall(): boolean {
    const { size } = this.props;
    return size === "sm" || size === "xs";
  }

  private handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    this.handleClickOutside(event);
    this.props.onClick(event);
  };

  private handleClickOutside = (event: any): void => {
    const { open } = this.props;
    if (open && this.isSmall && !detectElementInDOM(event.path, "button")) {
      this.props.onOutsideClick();
    }
  };

  componentDidMount(): void {
    const listItem1 = document.getElementById(
      "list-item-1"
    ) as HTMLInputElement;
    if (listItem1) {
      listItem1.checked = true;
    }
  }

  render(): ReactElement {
    const { dark, open } = this.props;
    return (
      <Card
        dark={dark}
        flat={!this.isSmall}
        className={`sidebar ${open ? "sidebar--open" : ""} ${
          !this.isSmall ? "sidebar--always" : ""
        }`}
      >
        <div className="sidebar-menu-title">
          <NavLink
            exact
            to="/"
            onClick={this.handleClick}
            activeClassName="sidebar-link-active"
          >
            Home
          </NavLink>
        </div>
        <div className="sidebar-menu-title">
          <NavLink
            exact
            to="/examples"
            onClick={this.handleClick}
            activeClassName="sidebar-link-active"
          >
            Examples
          </NavLink>
        </div>
        <div className="sidebar-menu">
          <input type="checkbox" id="list-item-1" />
          <label htmlFor="list-item-1" className="sidebar-menu-title">
            Components
          </label>
          <ul>
            {routes.map((route: Route, index: number) => {
              const { name, path } = route;
              if (name && path !== "/home") {
                return (
                  <li title={name} key={index}>
                    <NavLink
                      to={path}
                      exact
                      onClick={this.handleClick}
                      activeClassName="sidebar-link-active"
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div className="sidebar-menu-title">
          <NavLink
            exact
            to="/typography"
            onClick={this.handleClick}
            activeClassName="sidebar-link-active"
          >
            Typography
          </NavLink>
        </div>
      </Card>
    );
  }
}

export default withClickOutside(Sidebar);
