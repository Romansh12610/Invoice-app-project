import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useGlobalContext } from "./ContextWrapper";
import FormController from "./FormInvoice";

export default function() {

    const { globalState } = useGlobalContext();
	const { isFormOpen} = globalState;
    
    return (
        <>
            {isFormOpen && <FormController />}
            <Header />
            <Outlet />
        </>
    )
}