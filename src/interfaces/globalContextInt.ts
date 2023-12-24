import { FilterStatusType, FilterStatusSetterType } from "./filterTypes";
import { InvoiceListType, InvoiceListDispatchType, InitialInvoiceInterface, AddressInterface } from "./invoiceTypes";
import { HandleInvoiceChangeType } from "../hooks/useManageInvoices";

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
    newInvoice: InitialInvoiceInterface;
    senderAddress: AddressInterface;
    clientAddress: AddressInterface;
    items: InitialInvoiceInterface['items'];
    handleInvoiceChange: HandleInvoiceChangeType;
}