import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
interface Props {
	entry: Entry;
}
const EntryCard: FC<Props> = ({ entry }) => {
	const { setDraggingEntry } = useContext(UIContext);

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id);
		setDraggingEntry(true);
	};

	const onDragEnd = () => {
		setDraggingEntry(false);
	};

	return (
		<Card
			sx={{ marginBottom: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
				>
					<Typography variant="body2">hace 30 minutos</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};

export default EntryCard;
