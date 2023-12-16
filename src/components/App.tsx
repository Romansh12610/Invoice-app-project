import { Routes, Route } from 'react-router-dom';
import 'normalize.css';
import ContextWrapper from './ContextWrapper';
import Layout from './Layout';
import InvoicesMainView from './InvoicesMainView';
import InvoiceInfo from './InvoiceInfo';


export default function App() {
	return (
		<ContextWrapper>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<InvoicesMainView />} />
					<Route path='/:invoiceId' element={<InvoiceInfo />} />
				</Route>
			</Routes>
		</ContextWrapper>
	)
}