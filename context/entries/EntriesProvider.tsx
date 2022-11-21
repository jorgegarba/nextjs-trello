import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: 'pending -lorem ipsum dolor sit amet',
			createdAt: Date.now(),
			status: 'pending'
		},
		{
			_id: uuidv4(),
			description: 'in-progress lorem ipsum dolor sit amet',
			createdAt: Date.now() - 1000,
			status: 'in-progress'
		},
		{
			_id: uuidv4(),
			description: 'finishes lorem ipsum dolor sit amet',
			createdAt: Date.now() - 10000,
			status: 'finished'
		}
	]
};

const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	return (
		<EntriesContext.Provider value={{ entries: state.entries }}>
			{children}
		</EntriesContext.Provider>
	);
};

export default EntriesProvider;
