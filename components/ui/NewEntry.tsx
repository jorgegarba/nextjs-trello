import { Box, Button, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const NewEntry = () => {
	return (
		<>
			<Button startIcon={<AddCircleOutlineOutlinedIcon />}></Button>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 2 }}
				placeholder="Nueva Entrada"
				autoFocus
				multiline
				label="Nueva Entrada"
				helperText="Ingrese un valor"
			/>
			<Box display="flex" justifyContent="space-between">
				<Button variant="text">Cancelar</Button>
				<Button
					variant="outlined"
					color="secondary"
					endIcon={<SaveOutlinedIcon />}
				>
					Guardar
				</Button>
			</Box>
		</>
	);
};

export default NewEntry;
