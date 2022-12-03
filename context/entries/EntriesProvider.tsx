import { FC, PropsWithChildren, useReducer, useEffect } from 'react';

import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import entriesApi from '../../apis/entriesApi';
import { useSnackbar } from 'notistack';

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: []
};

const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();
	const addNewEntry = async (description: string) => {
		try {
			const { data } = await entriesApi.post<Entry>('/entries', {
				description
			});
			dispatch({ type: '[Entries] - Add', payload: data });
		} catch (error) {
			console.log(error);
		}
	};

	const updateEntry = async ({ _id, description, status }: Entry) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status
			});
			dispatch({ type: '[Entries] - Update', payload: data });
			enqueueSnackbar('Entrada actualizada', {
				variant: 'success',
				autoHideDuration: 5000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right'
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const refresEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: '[Entries] - Refres data', payload: data });
	};

	useEffect(() => {
		refresEntries();
	}, []);

	return (
		<EntriesContext.Provider
			value={{ entries: state.entries, addNewEntry, updateEntry }}
		>
			{children}
		</EntriesContext.Provider>
	);
};

export default EntriesProvider;
