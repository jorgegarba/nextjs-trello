import { UIState } from './UIProvider';

type UIActionType =
	| {
			type: 'UI - Open Sidebar' | 'UI - Close Sidebar';
	  }
	| {
			type: 'UI - Set Is Adding Entry';
			payload: boolean;
	  }
	| {
			type: 'UI - Dragging Entry';
			payload: boolean;
	  };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case 'UI - Dragging Entry':
			return {
				...state,
				isDraggingEntry: action.payload
			};
		case 'UI - Set Is Adding Entry':
			return {
				...state,
				isAddingEntry: action.payload
			};
		case 'UI - Open Sidebar':
			return {
				...state,
				sidemenuOpen: true
			};
		case 'UI - Close Sidebar':
			return {
				...state,
				sidemenuOpen: false
			};
		default:
			return state;
	}
};
