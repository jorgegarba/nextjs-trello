import { Entry } from '../../interfaces/entry';
import { EntriesState } from './EntriesProvider';

type EntriesActionType =
	| {
			type: '[Entries] - Add';
			payload: Entry;
	  }
	| {
			type: '[Entries] - Update';
			payload: Entry;
	  }
	| {
			type: '[Entries] - Refres data';
			payload: Entry[];
	  };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
) => {
	switch (action.type) {
		case '[Entries] - Refres data':
			return {
				...state,
				entries: [...action.payload]
			};
		case '[Entries] - Update':
			return {
				...state,
				entries: state.entries.map((entry) => {
					if (entry._id === action.payload._id) {
						return { ...action.payload };
					}
					return entry;
				})
			};
		case '[Entries] - Add':
			return {
				...state,
				entries: [...state.entries, action.payload]
			};
		default:
			return state;
	}
};
