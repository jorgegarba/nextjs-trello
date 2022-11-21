import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
	sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = { sidemenuOpen: false };

const UIProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({ type: 'UI - Open Sidebar' });
	};
	const closeSideMenu = () => {
		dispatch({ type: 'UI - Close Sidebar' });
	};

	return (
		<UIContext.Provider
			value={{ sidemenuOpen: state.sidemenuOpen, openSideMenu, closeSideMenu }}
		>
			{children}
		</UIContext.Provider>
	);
};

export default UIProvider;
