import { EntriesState } from './EntriesProvider';

type EntriesActionType = {
	type: '[Entries] - Add';
};

export const entriesReducer = (
	state: EntriesState,
	payload: EntriesActionType
) => {
	switch (payload.type) {
		default:
			return state;
	}
};
