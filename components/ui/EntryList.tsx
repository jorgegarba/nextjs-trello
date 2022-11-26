import { List, Paper } from '@mui/material';
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

import { EntryStatus, Entry } from '../../interfaces/entry';
import EntryCard from './EntryCard';

import styles from './EntryList.module.css';
interface Props {
	status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);

	const { isDraggingEntry, setDraggingEntry } = useContext(UIContext);

	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries]
	);
	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('text');
		let entryToUpdate = entries.find((entry) => entry._id === id);
		if (entryToUpdate) {
			entryToUpdate.status = status;
			updateEntry(entryToUpdate);
		}
		setDraggingEntry(false);
	};

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDraggingEntry ? styles.dragging : ''}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 250px)',
					overflow: 'scroll',
					backgroundColor: 'transparent',
					padding: '1px 5px'
				}}
			>
				<List sx={{ opacity: isDraggingEntry ? 0.2 : 1 }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};

export default EntryList;
