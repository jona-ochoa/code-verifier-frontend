import React from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarCharIcon from '@mui/icons-material/BarChart';

import { useNavigate } from 'react-router-dom';

const MenuItems = () => {
    const navigate = useNavigate();
    return (

        <React.Fragment>
            {/* Katas */}
            <ListItemButton onClick={() => navigate('/katas')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Katas" />
            </ListItemButton>

            {/* Users */}
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            {/* Ranking */}
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <BarCharIcon />
                </ListItemIcon>
                <ListItemText primary="Ranking" />
            </ListItemButton>
        </React.Fragment>
    )
}

export default MenuItems;