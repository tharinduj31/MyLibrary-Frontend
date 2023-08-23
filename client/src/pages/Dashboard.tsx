import { Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useLibraryDataContext } from '../hooks/contextHooks/useLibraryDataContext'
import BarChart from '../data/charts/BarChart';
import { useCallback, useEffect, useMemo } from 'react';

import { fetchAllBookCountsByAuthor, fetchAllBookCountsByCategory, fetchAllBookCountsByStat } from '../apis/statApi';
import React from 'react';
import PieChart from '../data/charts/PieChart';
import DougnutChart from '../data/charts/DougnutChart';

export default function Dashboard() {
    //Hooks & Context
    const { books, categories } = useLibraryDataContext();
    const [bookCountByAuthor,setBookCountByAuthor] = React.useState<any>();
    const [bookCountByCategory,setBookCountByCategory] = React.useState<any>();
    const [bookCountByStat,setBookCountByStat] = React.useState<any>();
    //UseCallBack 
    const fetchData = useCallback(async () => {
        const resBook = await fetchAllBookCountsByAuthor();
        const resCategory = await fetchAllBookCountsByCategory();
        const resStat = await fetchAllBookCountsByStat();
        setBookCountByAuthor(resBook.slice(0,10));
        setBookCountByCategory(resCategory.slice(0,10));
        setBookCountByStat(resStat);
    }, [books]);

    //UseEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {bookCountByAuthor && <BarChart chartData={bookCountByAuthor} />}
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Stack spacing={2} divider={<Divider />}  >
                            <Typography variant='h6' color={'primary'}> {books.length} Books </Typography>
                            <Typography variant='h6' color={'secondary'}>  Authors </Typography>
                            <Typography variant='h6' color={'primary'}> {categories.length} Categories</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {bookCountByAuthor && <PieChart chartData={bookCountByCategory} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Stack spacing={2} divider={<Divider />}  >
                            <div>
                            <DougnutChart chartData={bookCountByStat}/> 
                            </div>
                           
                        </Stack>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
