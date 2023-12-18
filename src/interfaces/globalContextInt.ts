import { FilterStatusType, FilterStatusSetterType } from "./filterTypes";
import { InvoiceListType, InvoiceListDispatchType } from "./invoiceTypes";

// generic helper types
type VoidFuncType = () => void;


// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    setFilterStatus: FilterStatusSetterType;
    orientation: "mobile" | "desktop";
    invoices: InvoiceListType;
    dispatchInvoices: InvoiceListDispatchType;
}