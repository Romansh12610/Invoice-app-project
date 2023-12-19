// styled components
import { AddressFromWrapper, BillToAddress, BillToField, BillToName, BillToWrapper, CityTextFrom, CountryTextFrom, DescriptionText, GoBackLinkWrapper, GoBackLinkText, InfoSection, InfoWrapperPart, InvoiceDateField, InvoiceDateValue, InvoiceDateWrapper, MainSectionWrapper, PaymentDueField, PaymentDueValue, PaymentDueWrapper, PostCodeFrom, SentToField, SentToValue, SentToWrapper, StatusBarWrapper, StreetTextFrom, UidDescriptionWrapper, UidHashSpan, UidText, StreetTextTo, CityTextTo, PostCodeTo, CountryTextTo, ItemsWrapper, ItemSingleWrapper, ItemTitleText, ItemPriceCountText, TotalWrapper, TotalText, TotalPrice } from '../styledComponents/InvoiceInfoStyled';
// helper components & types
import { StyledLabel } from '../shared/colorLabels';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from './ContextWrapper';
import { LabelColorsType } from '../shared/colorLabels';
// utility functions
import convertDateFromString from '../utilities/convertDate';
import formatPrice from '../utilities/formatPrice';
import Icon from '../Icon/Icon';
import { useTheme } from 'styled-components';


export default function InvoiceView() {
    // we need to know 'status' of current invoice
    const URLparams = useParams();
    const { invoices } = useGlobalContext();
    const colorTheme = useTheme();

    const currentInvoice = invoices.find(i => i.id === URLparams.invoiceId);
    const { status, id, description, clientEmail, clientName, items, total } = currentInvoice;
    const invoiceColor: LabelColorsType = status === 'draft' ? 'gray'
        : status === 'pending' ? 'orange' 
        : 'green'; 
    const { street, city, postCode, country } = currentInvoice.senderAddress;
    const createdAtDate = convertDateFromString(currentInvoice.createdAt);
    const paymentDueDate = convertDateFromString(currentInvoice.paymentDue);
    const itemsToRender = items.map((item, ind) => (
        <ItemSingleWrapper key={ind}>
            <ItemTitleText
                $size='small'
                $weight='medium'
            >{item.name}</ItemTitleText>
            <ItemPriceCountText
                $size='small'
                $weight='medium'
            >{item.quantity} &times; &pound; {formatPrice(item.price)}</ItemPriceCountText>
            <ItemPriceCountText
                $size='small'
                $weight='medium'
            >{formatPrice(item.total)}</ItemPriceCountText>
        </ItemSingleWrapper>
    ))

    // rendering code
    return (
        <MainSectionWrapper>
            <GoBackLinkWrapper to='/'>
                <Icon 
                    name='arrow-left'
                    size={11}
                    color={colorTheme.general.purple}
                />
                <GoBackLinkText>Go back</GoBackLinkText>
            </GoBackLinkWrapper>
            <StatusBarWrapper $flexArgs={{
                justify: 'space-between',
                alignItems: 'center'
            }}>
                Status
                <StyledLabel $color={invoiceColor}>
                    {status}
                </StyledLabel>
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
                            $size='small'
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
                    <TotalPrice>&pound; {total}</TotalPrice>
                </TotalWrapper>
            </InfoSection>
        </MainSectionWrapper>
    )
}