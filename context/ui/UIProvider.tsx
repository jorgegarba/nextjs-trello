import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
	isDraggingEntry: boolean;
	setIsAddingEntry: (value: boolean) => void;
}

const UI_INITIAL_STATE: UIState = {
	sidemenuOpen: false,
	isAddingEntry: false,
	isDraggingEntry: false,
	setIsAddingEntry: () => {}
};

const UIProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({ type: 'UI - Open Sidebar' });
	};
	const closeSideMenu = () => {
		dispatch({ type: 'UI - Close Sidebar' });
	};

	const setIsAddingEntry = (value: boolean) => {
		dispatch({ type: 'UI - Set Is Adding Entry', payload: value });
	};

	const setDraggingEntry = (value: boolean) => {
		dispatch({ type: 'UI - Dragging Entry', payload: value });
	};

	return (
		<UIContext.Provider
			value={{
				sidemenuOpen: state.sidemenuOpen,
				isAddingEntry: state.isAddingEntry,
				isDraggingEntry: state.isDraggingEntry,
				setIsAddingEntry,
				setDraggingEntry,
				openSideMenu,
				closeSideMenu
			}}
		>
			{children}
		</UIContext.Provider>
	);
};

export default UIProvider;
