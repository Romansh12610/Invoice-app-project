import { InvoiceUl } from "../../styledComponents/InvoiceListStyled";
import { useGlobalContext } from "../ContextWrapper";
// animation
import { AnimatePresence } from "framer-motion";
import { invoiceListVariants } from "../../utilities/variants/invoiceListVariants";
// components
import ListItem from "./InvoiceListItem";

const InvoiceList = () => {
    
    const { globalState, orientation } = useGlobalContext();
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
                $orientation={orientation}
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