import { Box } from '@mui/material';
import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import Navbar from '../ui/Navbar';
import Sidebar from '../ui/Sidebar';

interface Props {
	title?: string;
}
const Layout: FC<PropsWithChildren<Props>> = ({
	title = 'OpenTrello',
	children
}) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Head>
				<title>{title}</title>
			</Head>
			<Navbar />
			<Sidebar />

			<Box sx={{ padding: '10px 20px' }}>{children}</Box>
		</Box>
	);
};

export default Layout;
