import React from 'react'
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '../store/store';
import { setIsLogin, setWorker } from '../store/reducer';


export default function SidePanel(props) {
    
    const navigate = useNavigate()
    const worker = store.getState().store.worker

    return (
        <Paper sx={{ position: 'static', height: '100%', width: '275px', display: 'flex', flex: '0 0 auto', flexDirection: 'column', justifyContent: 'space-between' }} elevation={3}>
            <List sx={{ mt: 6 }}>
                {/* dashboard */}
                <ListItem sx={{ mt: 1 }} selected={ window.location.pathname === '/dashboard' }>
                    <ListItemButton component={Link} to='/dashboard'>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItemButton>
                </ListItem>

                {/* orders */}
                <ListItem sx={{ mt: 1 }} selected={window.location.pathname === '/orders'}>
                    {/* <div style={{ width: '4px', height: 'auto', background: 'red' }} /> */}
                    <ListItemButton component={Link} to='/orders'>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary='Orders' />
                    </ListItemButton>
                </ListItem>

                {/* workers */}
                {
                    worker.isAdmin &&
                    <ListItem sx={{ mt: 1 }} selected={window.location.pathname === '/workers'}>
                        <ListItemButton component={Link} to='/workers'>
                            <ListItemIcon>
                                <EngineeringIcon />
                            </ListItemIcon>
                            <ListItemText primary='Workers' />
                        </ListItemButton>
                    </ListItem>
                }

                {/* users */}
                <ListItem sx={{ mt: 1 }} selected={window.location.pathname === '/users'}>
                    <ListItemButton component={Link} to='/users'>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary='Users' />
                    </ListItemButton>
                </ListItem>

                {/* reports */}
                <ListItem sx={{ mt: 1 }} selected={window.location.pathname === '/reports'}>
                    <ListItemButton component={Link} to='/reports'>
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary='Report & Analytics' />
                    </ListItemButton>
                </ListItem>

                {/* settings */}
                {/* <ListItem sx={{ mt: 1 }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItemButton>
                </ListItem> */}
            </List>

            {/* logout */}
            <Button startIcon={<LogoutIcon />} sx={{ width: '100%', mb: 12, textTransform: 'capitalize', letterSpacing: '.15rem', color: 'red' }}
                onClick={() => {
                    store.dispatch(setWorker({ ...store.getState().store.worker, present: false, time: new Date(new Date().toUTCString()).toLocaleString("en-us", { timeZone: 'Asia/Kolkata' }) }))
                    store.dispatch(setIsLogin(false))
                    navigate('/')
            }}>Logout</Button>
        </Paper>
    )
}
