import { InvoiceUl, InvoiceDate, InvoiceLink, InvoiceListItem, InvoiceName, InvoicePrice, InvoiceUid, SpanUid } from "../styledComponents/invoiceListStyled";
import { StyledLabel } from "../shared/colorLabels";
import { useGlobalContext } from "./ContextWrapper";


const InvoiceList = () => {
    
    const { currentInvoiceList } = useGlobalContext();

    // rendering invoices
    const renderingList = currentInvoiceList.map(invoice => (
        <InvoiceListItem key={invoice.id}>
            <InvoiceLink to={`/${invoice.id}`}>
                <InvoiceUid
                    $size='medium'
                    $weight='bold'
                    $letterSpacing='thin'
                    $lineHeight='medium'
                ><SpanUid>#</SpanUid>{invoice.id}</InvoiceUid>
                <InvoiceDate
                    $size='medium'
                    $weight='thin'
                >{invoice.paymentDue}</InvoiceDate>
                <InvoiceName
                    $size='medium'
                    $weight='thin'
                >{invoice.clientName}</InvoiceName>
                <InvoicePrice
                    $size='large'
                    $weight='bold'
                    $letterSpacing='thin'
                    $lineHeight='high'
                >{invoice.total}</InvoicePrice>
                <StyledLabel
                    $color={invoice.status === 'paid' ? 'green' :
                            invoice.status === 'pending' ? 'orange' : 'gray'}       
                >{invoice.status}</StyledLabel>
            </InvoiceLink>
        </InvoiceListItem>
    ));

    return (
        <InvoiceUl
            $flexArgs={{
                direction: 'column',
                gap: '20'
            }}
        >
            {renderingList}
        </InvoiceUl>
    )
}

export default InvoiceList;