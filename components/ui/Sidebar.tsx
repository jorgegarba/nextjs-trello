import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';

const menuItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];

const Sidebar = () => {
	const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
			<Box sx={{ width: 250 }}>
				<Box sx={{ padding: '5px 10px' }}>
					<Typography variant="h4">Menú</Typography>
				</Box>
				<List>
					{menuItems.map((item, index) => (
						<ListItem button key={item}>
							<ListItemIcon>
								{index % 2 == 0 ? (
									<MailOutlinedIcon />
								) : (
									<ArchitectureOutlinedIcon />
								)}
							</ListItemIcon>
							<ListItemText>{item}</ListItemText>
						</ListItem>
					))}
				</List>
				<Divider />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
