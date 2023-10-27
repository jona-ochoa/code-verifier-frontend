import React from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarCharIcon from '@mui/icons-material/BarChart';


export const MenuItems = (
    <React.Fragment>
        {/* Katas */}
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Katas" />
        </ListItemButton>

        {/* Users */}
        <ListItemButton>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>

        {/* Ranking */}
        <ListItemButton>
            <ListItemIcon>
                <BarCharIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
        </ListItemButton>
    </React.Fragment>
  )
