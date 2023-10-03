import React, { useState } from 'react'
import SidePanel from './SidePanel'
import { Backdrop, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NewOrder from './NewOrder';
import store from '../store/store';
import { setOrderSelected } from '../store/reducer';


export default function Orders() {
    const [open, setOpen] = useState(false)
    const [orderDetails, setOrderDetails] = useState(store.getState().store.orders[0])
    
    const headCells = [
        {
            id: 'invoice_id',
            numeric: true,
            disablePadding: true,
            label: 'Invoice ID'
        },
        {
            id: 'date',
            numeric: false,
            disablePadding: false,
            label: 'Date'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: true,
            label: 'Price (in ₹)'
        }
    ]

    const ItemsHeadCells = [
        {
            id: 'item_id',
            numeric: true,
            disablePadding: true,
            label: 'Item ID'
        },
        {
            id: 'item',
            numeric: false,
            disablePadding: false,
            label: 'Item'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: true,
            label: 'Price (in ₹)'
        }
    ]

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <SidePanel />
            <Box sx={{ height: '100%', flex: '1 1 auto' }}>
                <Button onClick={() => setOpen(true)} sx={{ mt: 5, ml: 4 }} color='error' variant='contained' startIcon={<AddShoppingCartIcon />}>New Order</Button>
                {
                    open &&
                    <Backdrop
                        sx={{ color: '#fff', zIndex: 1 }}
                        open={open}
                        >
                        <NewOrder setOpen={setOpen} />
                    </Backdrop>
                }
                
                <Box sx={{ mt: 8, ml: 3, mr: 3, overflowY: 'scroll', maxHeight: '650px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    headCells?.map((headCell, id) => (
                                        <TableCell
                                            key={id}
                                            align='left'
                                            sx={{ fontWeight: 700 }}
                                            padding={headCell.disablePadding ? 'none' : 'normal'}
                                        >
                                            { headCell.label }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                store.getState().store.orders?.map((row, id) => (
                                    <TableRow onClick={ () => setOrderDetails(row) } key={id} hover >
                                        <TableCell scope='row'>{row?.id}</TableCell>
                                        <TableCell>{row?.date}</TableCell>
                                        <TableCell>{row?.price}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Paper sx={{ width: '480px', height: '100%', pl: 3 }} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                ItemsHeadCells?.map((ItemsHeadCell, id) => (
                                    <TableCell
                                        key={id}
                                        align='left'
                                        sx={{ fontWeight: 700 }}
                                        padding={ItemsHeadCell.disablePadding ? 'none' : 'normal'}
                                    >
                                        {ItemsHeadCell?.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderDetails?.items?.map((item, id) => (
                                <TableRow key={id}>
                                    <TableCell>{item?.id}</TableCell>
                                    <TableCell>{item?.title}</TableCell>
                                    <TableCell>{item?.price}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    )
}
