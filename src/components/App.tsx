import { Routes, Route } from 'react-router-dom';
import 'normalize.css';
import ContextWrapper from './ContextWrapper';
import Layout from './Layout';
import Invoices from './Invoices';
import InvoiceView from './InvoiceView';


export default function App() {
	return (
		<ContextWrapper>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Invoices />} />
					<Route path='/:invoiceId' element={<InvoiceView />} />
				</Route>
			</Routes>
		</ContextWrapper>
	)
}