import { Outlet } from "react-router-dom";
import Header from "./Header";
import FormController from "./FormInvoice";
import Backdrop from "../shared/Backdrop";
import { useGlobalContext } from '../hooks/useGlobalContext';
import { FormControllerProps } from "./FormInvoice";

export default function Layout() {

    const { globalState } = useGlobalContext();
	const { isFormOpen, isBackdropOpen, isInvoiceEdited, invoiceEditPayload } = globalState;

    // form mode
    let formProps: FormControllerProps = {
        invoiceEditPayload: null,
    }
    if (isInvoiceEdited == true) {
        formProps = {
            invoiceEditPayload: invoiceEditPayload
        }
    };
    
    return (
        <>
            {isFormOpen && (
            <FormController {...formProps} />
            )}
            {isBackdropOpen && <Backdrop />}
            <Header />
            <Outlet />
        </>
    )
}