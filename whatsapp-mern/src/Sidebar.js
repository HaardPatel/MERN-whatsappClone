import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton, Input } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">

    {/* SIDEBAR HEADER */}
      <div className="sidebar__header">
        <Avatar src="" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    {/* SIDEBAR HEADER ENDS */}

    {/*SIDEBAR SEARCH*/}
    <div className="sidebar__search">
        <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input placeholder="Seacrh or start a new chat" type="text" />
        </div>
    </div>
    {/*SIDEBAR SEARCH END*/}

    {/* SIDEBAR CHAT*/}
    <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />

    </div>

    </div>
  );
}

export default Sidebar;
