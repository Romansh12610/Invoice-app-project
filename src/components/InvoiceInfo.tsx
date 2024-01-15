// styled components
import { AddressFromWrapper, BillToAddress, BillToField, BillToName, BillToWrapper, CityTextFrom, CountryTextFrom, DescriptionText, InfoSection, InfoWrapperPart, InvoiceDateField, InvoiceDateValue, InvoiceDateWrapper, MainSectionWrapper, PaymentDueField, PaymentDueValue, PaymentDueWrapper, PostCodeFrom, SentToField, SentToValue, SentToWrapper, StatusBarWrapper, StreetTextFrom, UidDescriptionWrapper, UidHashSpan, UidText, StreetTextTo, CityTextTo, PostCodeTo, CountryTextTo, ItemsWrapper, ItemSingleWrapper, ItemTitleText, ItemPriceCountText, ItemPriceText, TotalWrapper, TotalText, TotalPrice, FooterWrapper, EditBtn, DeleteBtn, MarkBtn } from '../styledComponents/InvoiceInfoStyled';
// helper components & types
import { StyledLabel } from '../shared/colorLabels';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from './ContextWrapper';
import { LabelColorsType } from '../shared/colorLabels';
import GoBackLink from '../shared/goBackLink';
// utility functions
import convertDateFromString from '../utilities/convertDateOutput';
import formatPrice from '../utilities/formatPrice';
import buttonVariants from '../utilities/buttonVariants';

import { useMemo } from 'react';

export default function InvoiceView() {
    // we need to know 'status' of current invoice
    const URLparams = useParams();
    const { globalState, orientation } = useGlobalContext();
    const { invoices } = globalState;

    const currentInvoice = useMemo(() => {
        return invoices.find(invoice => invoice.id === URLparams.id);
    }, [invoices]);
    const { status, id, description, clientEmail, clientName, items, total } = currentInvoice;
    const invoiceColor: LabelColorsType = status === 'draft' ? 'gray'
        : status === 'pending' ? 'orange' 
        : 'green'; 
    const { street, city, postCode, country } = currentInvoice.senderAddress;
    // use memo
    const createdAtDate = useMemo(() => convertDateFromString(currentInvoice.createdAt), [currentInvoice.createdAt]);
    const paymentDueDate = useMemo(() => convertDateFromString(currentInvoice.paymentDue), [currentInvoice.paymentDue]);
    
    
    // render items
    const itemsToRender = items.map((item, ind) => {
        const formattedPrice = useMemo(() => formatPrice(item.price), [item.price]);
        const formattedTotal = useMemo(() => formatPrice(item.total), [item.total]);

        return (
            <ItemSingleWrapper key={ind}>
                <ItemTitleText
                    $size='small'
                    $weight='medium'
                >{item.name}</ItemTitleText>
                <ItemPriceCountText
                    $size='small'
                    $weight='medium'
                >{item.quantity} &times; &pound; {formattedPrice}</ItemPriceCountText>
                <ItemPriceText
                    $size='medium'
                    $weight='bold'
                >
                    &pound; {formattedTotal}
                </ItemPriceText>
            </ItemSingleWrapper>
        )
    });

    // rendering code
    return (
        <>
            <MainSectionWrapper>
                <GoBackLink to='/' />
                <StatusBarWrapper $flexArgs={{
                    justify: orientation === 'mobile' ? 'space-between'
                        : 'flex-start',
                    alignItems: 'center',
                    gap: orientation === 'mobile' ? '0' : '15'
                }}>
                    Status
                    <StyledLabel $color={invoiceColor}>
                        {status}
                    </StyledLabel>
                    {orientation === 'desktop' &&
                        <>
                            {status !== 'paid' && 
                            <EditBtn 
                                whileHover='hover'
                                whileTap='tap'
                                variants={buttonVariants}
                            >Edit</EditBtn>}
                            <DeleteBtn 
                                whileHover='hover'
                                whileTap='tap'
                                variants={buttonVariants}
                            >Delete</DeleteBtn>
                            {status === 'pending' && 
                            <MarkBtn 
                                whileHover='hover'
                                whileTap='tap'
                                variants={buttonVariants}
                            >Mark as Paid</MarkBtn>}
                        </>     
                    }
                </StatusBarWrapper>
                <InfoSection
                    $flexArgs={{
                        direction: 'column',
                        alignItems: 'flex-start',
                        justify: 'center',
                    }}
                >
                    <InfoWrapperPart>
                        <UidDescriptionWrapper>
                            <UidText
                                $size='medium'
                                $weight='bold'
                            ><UidHashSpan>&#35;</UidHashSpan>{id}</UidText>
                            <DescriptionText
                                $size='small'
                                $weight='thin'
                            >{description}</DescriptionText>
                        </UidDescriptionWrapper>
                        <AddressFromWrapper>
                            <StreetTextFrom $size='tiny' $weight='thin' $lineHeight='medium'>
                                {street}
                            </StreetTextFrom>
                            <CityTextFrom $size='tiny' $weight='thin' $lineHeight='medium'>
                                {city}
                            </CityTextFrom>
                            <PostCodeFrom $size='tiny' $weight='thin' $lineHeight='medium'>
                                {postCode}
                            </PostCodeFrom>
                            <CountryTextFrom $size='tiny' $weight='thin' $lineHeight='medium'>
                                {country}
                            </CountryTextFrom>
                        </AddressFromWrapper>
                        <InvoiceDateWrapper>
                            <InvoiceDateField
                                $size='small'
                                $weight='thin'
                            >
                                Invoice Date
                            </InvoiceDateField>
                            <InvoiceDateValue
                                $size='large'
                                $weight='bold'
                            >
                                {createdAtDate}
                            </InvoiceDateValue>
                        </InvoiceDateWrapper>
                        <PaymentDueWrapper>
                            <PaymentDueField
                                $size='small'
                                $weight='thin'
                            >Payment Due</PaymentDueField>
                            <PaymentDueValue
                                $size='large'
                                $weight='bold' 
                            >{paymentDueDate}</PaymentDueValue>
                        </PaymentDueWrapper>
                        <SentToWrapper>
                            <SentToField
                                $size='small'
                                $weight='thin'
                            >Sent to</SentToField>
                            <SentToValue
                                $size='large'
                                $weight='bold' 
                            >
                                {clientEmail}
                            </SentToValue>
                        </SentToWrapper>
                        <BillToWrapper>
                            <BillToField
                                $size='medium'
                                $weight='thin'
                            >
                                Bill to
                            </BillToField>
                            <BillToName
                                $size='medium'
                                $weight='bold'
                                $lineHeight='high'
                            >
                                {clientName}
                            </BillToName>
                            <BillToAddress>
                                <StreetTextTo $size='tiny' $weight='thin' $lineHeight='medium'>
                                    {street}
                                </StreetTextTo>
                                <CityTextTo $size='tiny' $weight='thin' $lineHeight='medium'>
                                    {city}
                                </CityTextTo>
                                <PostCodeTo $size='tiny' $weight='thin' $lineHeight='medium'>
                                    {postCode}
                                </PostCodeTo>
                                <CountryTextTo $size='tiny' $weight='thin' $lineHeight='medium'>
                                    {country}
                                </CountryTextTo>
                            </BillToAddress>
                        </BillToWrapper>
                    </InfoWrapperPart>
                    <ItemsWrapper
                        $flexArgs={{
                            direction: 'column',
                            gap: '15'
                        }}
                    >
                        {itemsToRender}
                    </ItemsWrapper>
                    <TotalWrapper
                        $flexArgs={{
                            justify: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TotalText
                            $size='small'
                            $weight='thin'
                        >Amount Due</TotalText>
                        <TotalPrice>&pound; {formatPrice(total)}</TotalPrice>
                    </TotalWrapper>
                </InfoSection>
            </MainSectionWrapper>
            {orientation === 'mobile' && 
            <FooterWrapper
                $flexArgs={{
                    justify: 'center',
                    alignItems: 'center',
                    gap: '15' 
                }}
            >
                {status !== 'paid' && <EditBtn 
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                >Edit</EditBtn>}
                <DeleteBtn 
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                >Delete</DeleteBtn>
                {status === 'pending' && <MarkBtn 
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                >Mark as Paid</MarkBtn>}
            </FooterWrapper>}
        </>
    )
}