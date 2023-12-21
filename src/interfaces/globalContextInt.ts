import { FilterStatusType, FilterStatusSetterType } from "./filterTypes";
import { InvoiceListType, InvoiceListDispatchType, InitialInvoiceInterface, setNewInvoiceType } from "./invoiceTypes";

// generic helper types
type VoidFuncType = () => void;

// global state interface
export interface GlobalStateInterface {
    invoices: InvoiceListType;
    isFormOpen: boolean;
    isInvoiceEdited: boolean;
    isModalOpen: boolean;
}


// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    setFilterStatus: FilterStatusSetterType;
    orientation: "mobile" | "desktop";
    globalState: GlobalStateInterface;
    dispatchAction: InvoiceListDispatchType;
    newInvoice: InitialInvoiceInterface,
    setNewInvoice: setNewInvoiceType,
}