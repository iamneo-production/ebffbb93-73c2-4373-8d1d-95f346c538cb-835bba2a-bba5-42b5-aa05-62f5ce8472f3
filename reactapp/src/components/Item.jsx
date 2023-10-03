import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import store from '../store/store'
import { setProductStock } from '../store/reducer'

export default function Item({ item }) {
    // const [changeStock, setChangeStock] = useState(false)

    // const handleSubmit = () => {
    //     const updateItem = { ...item, stock: document.getElementById('product-stock-change').value }
    //     console.log(updateItem)
    //     store.dispatch(setProductStock(updateItem))
    //     alert('Product details updated successfully')
    //     setChangeStock(false)
    // }

    return (
        <>
            <Card>
                <CardMedia
                    sx={{ height: 200, width: 250 }}
                    image={item?.img}
                    title={item?.title}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {item?.title}
                        </Typography>
                        <CardActions>
                            <Button variant='contained' sx={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'white', color: 'black' }, borderRadius: 2 }}>Add</Button>
                        </CardActions>
                    </Box>
                    <Typography variant='body2'>Stock: { item?.stock }</Typography>
                </CardContent>
            </Card>

            {/* {
                changeStock &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: 1 }}
                    open={changeStock}
                >
                    <Box component='form' onSubmit={handleSubmit} sx={{ backgroundColor: 'white' }}>
                        <TextField id='product-stock-change' size='small' type='number' defaultValue={item?.stock} />
                        <Button type='submit'>Change</Button>
                    </Box>
                </Backdrop>
            } */}
        </>
    )
}
