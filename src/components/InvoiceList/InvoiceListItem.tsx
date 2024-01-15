import { memo, useMemo } from 'react';
// styled components
import { InvoiceDate, InvoiceLink, InvoiceListItem, InvoiceName, InvoicePrice, InvoiceUid, SpanUid } from '../../styledComponents/InvoiceListStyled' /* '.../styledComponents/InvoiceListStyled'; */
import { StyledLabel } from "../../shared/colorLabels";
import { invoiceItemVariants } from "../../utilities/invoiceListVariants";
// types
import { InitialInvoiceInterface } from '../../interfaces/invoiceTypes';
// utils
import convertDateOutput from '../../utilities/convertDateOutput';
import formatPrice from '../../utilities/formatPrice';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';

interface ListItemProps {
    invoice: InitialInvoiceInterface;
}

const ListItem = memo(({ invoice }: ListItemProps) => {
    const dateOutput = useMemo(() => {
        return convertDateOutput(invoice.paymentDue, true);
    }, [invoice.paymentDue]);

    const formattedPrice = useMemo(() => {
        return formatPrice(invoice.total);
    }, [invoice.total]);

    return (
        <InvoiceListItem
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
                >{dateOutput}</InvoiceDate>
                <InvoiceName
                    $size='small'
                    $weight='thin'
                >{invoice.clientName}</InvoiceName>
                <InvoicePrice
                    $size='large'
                    $weight='bold'
                    $letterSpacing='thin'
                    $lineHeight='high'
                >&#163; {formattedPrice}</InvoicePrice>
                <StyledLabel
                    $gridArea="status"
                    $justifySelf="end"
                    $color={invoice.status === 'paid' ? 'green' :
                            invoice.status === 'pending' ? 'orange' : 'gray'}       
                >{capitalizeFirstLetter(invoice.status)}</StyledLabel>
            </InvoiceLink>
        </InvoiceListItem>
    );
});


export default ListItem;