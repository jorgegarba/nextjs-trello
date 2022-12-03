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
import { GetServerSideProps } from 'next';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Layout from '../../components/layouts/Layout';
import { EntryStatus } from '../../interfaces/entry';
import { useState, useMemo, useContext } from 'react';
import { getEntryById } from '../../db/dbEntries';
import { IEntry } from '../../models/EntryModel';
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
	entry: IEntry;
}

const validStatus: EntryStatus[] = ['finished', 'in-progress', 'pending'];

const EntryPage: React.FC<Props> = (props) => {
	const { entry } = props;
	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);
	const { updateEntry } = useContext(EntriesContext);

	const onSave = () => {
		updateEntry({
			...entry,
			description: inputValue,
			status
		});
	};

	const showError = useMemo(
		() => touched && inputValue.trim().length === 0,
		[touched, inputValue]
	);

	return (
		<Layout title={inputValue.substring(0, 20) + '...'}>
			<Grid container justifyContent="center" sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada:`}
							subheader="Cread a hacer ... minutos"
						/>
						<CardContent>
							<TextField
								onChange={(e) => setInputValue(e.target.value)}
								value={inputValue}
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="Nueva entrada"
								autoFocus
								multiline
								label="Nueva entrada"
								helperText={showError && 'Ingrese un valor'}
								error={showError}
								onBlur={() => setTouched(true)}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={(e) => setStatus(e.target.value as EntryStatus)}
								>
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
								onClick={onSave}
								disabled={showError || inputValue.trim().length === 0}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.params as { id: string };
	const entry = await getEntryById(id);
	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}
	return {
		props: {
			entry
		}
	};
};

export default EntryPage;
