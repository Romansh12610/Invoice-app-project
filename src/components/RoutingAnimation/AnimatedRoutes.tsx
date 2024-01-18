import { useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import InvoicesMainView from '../InvoicesMainView';
import InvoiceInfo from '../InvoiceInfo/InvoiceInfo';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route element={<Layout />}>
                <Route path='/' element={<InvoicesMainView />} />
                <Route path='/:invoiceId' element={<InvoiceInfo />} />
            </Route>
        </Routes>
    );
};

export default AnimatedRoutes;