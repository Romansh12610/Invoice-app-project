import { FilterStatusType, FilterStatusSetterType } from "./filterTypes";
import { InvoiceListType, InvoiceListDispatchType } from "./invoiceTypes";

// generic helper types
type VoidFuncType = () => void;

// global state interface
export interface GlobalStateInterface {
    invoices: InvoiceListType;
    isFormOpen: boolean;
    isInvoiceEdited: boolean;
    isModalOpen: boolean;
    isBackdropOpen: boolean;
    isInvoiceDeleted: boolean;
}

export type OrientationType = "mobile" | "tablet" | "desktop";

// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    setFilterStatus: FilterStatusSetterType;
    orientation: OrientationType;
    globalState: GlobalStateInterface;
    dispatchAction: InvoiceListDispatchType;
}