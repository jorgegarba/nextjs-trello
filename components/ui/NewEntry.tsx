import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

const NewEntry = () => {
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);
	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
	const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onSave = () => {
		addNewEntry(inputValue);
		setIsAddingEntry(false);
		setInputValue('');
		setTouched(false);
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 2 }}
						placeholder="Nueva Entrada"
						autoFocus
						multiline
						label="Nueva Entrada"
						helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
						error={inputValue.length <= 0 && touched}
						value={inputValue}
						onChange={onTextChange}
						onBlur={() => setTouched(true)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" onClick={() => setIsAddingEntry(false)}>
							Cancelar
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							endIcon={<SaveOutlinedIcon />}
							onClick={onSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					startIcon={<AddCircleOutlineOutlinedIcon />}
					fullWidth
					variant="outlined"
					onClick={() => setIsAddingEntry(true)}
					onDrag={() => console.log('drag')}
				>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};

export default NewEntry;
