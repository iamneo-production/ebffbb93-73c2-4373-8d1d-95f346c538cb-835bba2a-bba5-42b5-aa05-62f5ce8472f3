import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Divider, Typography, createTheme } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import store from '../store/store';
import { deleteWorker } from '../store/reducer';

export default function Workers({ defaultAvatar }) {

    // const [expanded, setExpanded] = useState(false)

    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // }

    const [workers, setWorkers] = useState(store.getState().store.workers)

    const handleDeleteWorker = (worker) => {
        store.dispatch(deleteWorker(worker))
        setWorkers(store.getState().store.workers)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex' }}>
            <SidePanel />
            <Box sx={{ height: '100%', flex: '1 1 auto' }}>
                <Button sx={{ mt: 5, ml: 4 }} variant='contained' startIcon={<PersonAddIcon />}>Add Worker</Button>

                <Box sx={{ mt: 8, ml: 3, overflowY: 'scroll', maxHeight: '700px' }}>
                    {
                        workers?.map((worker, id) => (
                            !worker?.isAdmin &&
                            <Accordion key={id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    // aria-controls={`panel${id}bh-content`}
                                    // id={`panel${id}bh-header`}
                                >

                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '33%', flexShrink: 0 }}>
                                        <Avatar src={defaultAvatar} />
                                        {worker?.username}
                                    </Typography>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography color={worker?.present ? 'green' : 'red'}>{worker?.present ? 'In Duty' : 'Off Duty'}</Typography>
                                        <Typography sx={{ mr: 32, color: 'text.secondary' }} >{worker?.present ? `Logged in at: ${worker?.time}` : `Logged out at: ${worker?.time}`}</Typography>
                                    </Box>
                                    </AccordionSummary>
                                    <Divider />
                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', gap: 10 }}>
                                        <img style={{ width: 320, height: 320 }} src={defaultAvatar} alt='avatar' />
                                        <Box>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Name:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker?.username}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Email-ID:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker?.email}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Contact:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{worker?.contact}</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Gender:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{ worker?.gender === 'M' ? 'Male' : 'Female' }</Typography>
                                            </Typography>
                                            <Typography sx={{ display: 'flex', gap: 3, mr: 2, ml: 2, mt: 1, mb: 1 }} fontWeight={600} letterSpacing='.1rem'>Salary:
                                                <Typography fontWeight={500} letterSpacing='.05rem'>{ `₹ ${worker?.salaray}` }</Typography>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button onClick={() => handleDeleteWorker(worker)} variant='outlined' color='error' endIcon={<DeleteIcon />}>delete</Button>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}
