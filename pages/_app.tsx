import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme } from '../themes/dark-theme';
import { lightTheme } from '../themes/light-theme';
import UIProvider from '../context/ui/UIProvider';
import EntriesProvider from '../context/entries/EntriesProvider';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<UIProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</EntriesProvider>
		</SnackbarProvider>
	);
}
