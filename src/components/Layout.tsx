import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useGlobalContext } from "./ContextWrapper";
import FormController from "./FormInvoice";
import Backdrop from "../shared/Backdrop";

export default function() {

    const { globalState } = useGlobalContext();
	const { isFormOpen, isBackdropOpen } = globalState;
    
    return (
        <>
            {isFormOpen && <FormController />}
            {isBackdropOpen && <Backdrop />}
            <Header />
            <Outlet />
        </>
    )
}