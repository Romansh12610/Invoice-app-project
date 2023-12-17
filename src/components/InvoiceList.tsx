import { InvoiceUl, InvoiceDate, InvoiceLink, InvoiceListItem, InvoiceName, InvoicePrice, InvoiceUid, SpanUid } from "../styledComponents/invoiceListStyled";
import { StyledLabel } from "../shared/colorLabels";
import { useGlobalContext } from "./ContextWrapper";
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";
import convertDateFromString from "../utilities/convertDate";
import formatPrice from "../utilities/formatPrice";


const InvoiceList = () => {
    
    const { currentInvoiceList } = useGlobalContext();

    // rendering invoices
    const renderingList = currentInvoiceList.map(invoice => (
        <InvoiceListItem key={invoice.id}>
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
                >{convertDateFromString(invoice.paymentDue)}</InvoiceDate>
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