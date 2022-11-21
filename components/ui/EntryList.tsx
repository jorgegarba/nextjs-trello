import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';

import { EntryStatus } from '../../interfaces/entry';
import EntryCard from './EntryCard';

interface Props {
	status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
	const { entries } = useContext(EntriesContext);
	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries]
	);

	return (
		<div>
			<Paper
				sx={{
					height: 'calc(100vh - 250px)',
					overflow: 'scroll',
					backgroundColor: 'transparent',
					padding: '1px 5px'
				}}
			>
				{/* cambiará dependiendo de si se hace drag o no  */}
				<List sx={{ opacity: 1 }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};

export default EntryList;
