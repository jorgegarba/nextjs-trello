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
import { useRouter } from 'next/router';
interface Props {
	entry: Entry;
}
const EntryCard: FC<Props> = ({ entry }) => {
	const { setDraggingEntry } = useContext(UIContext);
	const router = useRouter();
	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id);
		setDraggingEntry(true);
	};

	const onDragEnd = () => {
		setDraggingEntry(false);
	};

	const onClickCard = () => {
		router.push(`/entries/${entry._id}`);
	};

	return (
		<Card
			sx={{ marginBottom: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={onClickCard}
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
