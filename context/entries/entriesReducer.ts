import { Entry } from '../../interfaces/entry';
import { EntriesState } from './EntriesProvider';

type EntriesActionType = {
	type: '[Entries] - Add';
	payload: Entry;
};

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
) => {
	switch (action.type) {
		case '[Entries] - Add':
			return {
				...state,
				entries: [...state.entries, action.payload]
			};
		default:
			return state;
	}
};
