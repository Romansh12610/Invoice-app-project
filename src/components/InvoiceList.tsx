import { InvoiceUl } from "../styledComponents/InvoiceListStyled";
import { useGlobalContext } from "./ContextWrapper";
// animation
import { AnimatePresence } from "framer-motion";
import { invoiceListVariants } from "../utilities/invoiceListVariants";
// components
import ListItem from "./InvoiceListItem";

const InvoiceList = () => {
    
    const { globalState } = useGlobalContext();
    const { invoices } = globalState;

    // rendering invoices
    const renderingList = invoices.map(invoice => <ListItem invoice={invoice} key={invoice.id} />);

    return (
        <AnimatePresence>
            <InvoiceUl
                $flexArgs={{
                    direction: 'column',
                    gap: '20'
                }}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={
                    invoiceListVariants
                }
            >
                <AnimatePresence mode='sync' initial={false}>
                    {renderingList}
                </AnimatePresence>
            </InvoiceUl>
        </AnimatePresence>
    )
}

export default InvoiceList;