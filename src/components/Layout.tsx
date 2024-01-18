import { Outlet } from "react-router-dom";
import Header from "./Header";
import FormController from "./FormInvoice";
import Backdrop from "../shared/Backdrop";
import { useGlobalContext } from "./ContextWrapper";

export default function Layout() {

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