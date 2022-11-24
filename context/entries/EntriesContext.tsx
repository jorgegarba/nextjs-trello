import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface ContextProps {
	entries: Entry[];
	addNewEntry: (description: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
