import { InvoiceUl, InvoiceDate, InvoiceLink, InvoiceListItem, InvoiceName, InvoicePrice, InvoiceUid, SpanUid } from "../styledComponents/InvoiceListStyled";
import { StyledLabel } from "../shared/colorLabels";
import { useGlobalContext } from "./ContextWrapper";
// utility
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";
import convertDateFromString from "../utilities/convertDate";
import formatPrice from "../utilities/formatPrice";
// animation
import { AnimatePresence } from "framer-motion";
import { invoiceListVariants, invoiceItemVariants } from "../utilities/invoiceListVariants";
import { motion } from "framer-motion";


const InvoiceList = () => {
    
    const { globalState } = useGlobalContext();
    const { invoices } = globalState;

    // rendering invoices
    const renderingList = invoices.map(invoice => (
        <InvoiceListItem key={invoice.id}
            layout
            initial='initial'
            animate='animate'
            exit='exit'
            variants={invoiceItemVariants}
        >
            <InvoiceLink to={`/${invoice.id}`}>
                <InvoiceUid
                    $size='small'
                    $weight='bold'
                    $letterSpacing='thin'
                    $lineHeight='medium'
                ><SpanUid>#</SpanUid>{invoice.id}</InvoiceUid>
                <InvoiceDate
                    $size='small'
                    $weight='thin'
                >{convertDateFromString(invoice.paymentDue, true)}</InvoiceDate>
                <InvoiceName
                    $size='small'
                    $weight='thin'
                >{invoice.clientName}</InvoiceName>
                <InvoicePrice
                    $size='large'
                    $weight='bold'
                    $letterSpacing='thin'
                    $lineHeight='high'
                >&#163; {formatPrice(invoice.total)}</InvoicePrice>
                <StyledLabel
                    $gridArea="status"
                    $justifySelf="end"
                    $color={invoice.status === 'paid' ? 'green' :
                            invoice.status === 'pending' ? 'orange' : 'gray'}       
                >{capitalizeFirstLetter(invoice.status)}</StyledLabel>
            </InvoiceLink>
        </InvoiceListItem>
    ));

    return (
        <AnimatePresence>
            <InvoiceUl
                $flexArgs={{
                    direction: 'column',
                    gap: '20'
                }}
                as={motion.ul}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={
                    invoiceListVariants
                }
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {renderingList}
                </AnimatePresence>
            </InvoiceUl>
        </AnimatePresence>
    )
}

export default InvoiceList;