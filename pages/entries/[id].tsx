import {
	Button,
	capitalize,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material';
import React from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Layout from '../../components/layouts/Layout';
import { EntryStatus } from '../../interfaces/entry';

const validStatus: EntryStatus[] = ['finished', 'in-progress', 'pending'];

const EntryPage = () => {
	return (
		<Layout title="">
			<Grid container justifyContent="center" sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title="Entrada:"
							subheader="Cread a hacer ... minutos"
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="Nueva entrada"
								autoFocus
								multiline
								label="Nueva entrada"
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										></FormControlLabel>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'text.secondary'
				}}
			>
				<DeleteOutlineOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

export default EntryPage;
