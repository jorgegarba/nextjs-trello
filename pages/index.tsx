import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import Layout from '../components/layouts/Layout';
import EntryList from '../components/ui/EntryList';
import NewEntry from '../components/ui/NewEntry';

const Home: NextPage = () => {
	return (
		<Layout title="Home - Open Trello">
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="Pendientes" />
						<CardContent>
							<NewEntry />
							<EntryList status="pending" />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="En Progreso" />
						<CardContent>
							<EntryList status="in-progress" />
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="Completado" />
						<CardContent>
							<EntryList status="finished" />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default Home;
