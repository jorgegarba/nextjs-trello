import { createContext } from 'react';

interface ContextProps {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
	isDraggingEntry: boolean;
	// methods
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setIsAddingEntry: (value: boolean) => void;
	setDraggingEntry: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
