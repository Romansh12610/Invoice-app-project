// styled components
import { AddressFromWrapper, BillToAddress, BillToField, BillToName, BillToWrapper, CityTextFrom, CountryTextFrom, DescriptionText, InfoSection, InfoWrapperPart, InvoiceDateField, InvoiceDateValue, InvoiceDateWrapper, MainSectionWrapper, PaymentDueField, PaymentDueValue, PaymentDueWrapper, PostCodeFrom, SentToField, SentToValue, SentToWrapper, StatusBarWrapper, StreetTextFrom, UidDescriptionWrapper, UidHashSpan, UidText, StreetTextTo, CityTextTo, PostCodeTo, CountryTextTo, ItemsWrapper, TotalWrapper, TotalText, TotalPrice, FooterWrapper, EditBtn, DeleteBtn, MarkBtn } from '../../styledComponents/InvoiceInfoStyled';
// helper components & types
import { StyledLabel } from '../../shared/colorLabels';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../ContextWrapper';
import { LabelColorsType } from '../../shared/colorLabels';
import GoBackLink from '../../shared/goBackLink';
import InfoListItem from './InvoiceInfoListItem';
// utility functions
import convertDateFromString from '../../utilities/convertDateOutput';
import formatPrice from '../../utilities/formatPrice';
import buttonVariants from '../../utilities/variants/buttonVariants';
import { useEffect, useMemo, useState } from 'react';
import { InitialItemInterface } from '../../interfaces/invoiceTypes';
import Modal from '../Modal';
import ConfirmDeletion from './ConfirmDeletion';

export default function InvoiceView() {
    // we need to know 'status' of current invoice
    const URLparams = useParams();
    const { globalState, orientation, dispatchAction } = useGlobalContext();
    const { invoices, isModalOpen, isInvoiceDeleted } = globalState;

    // case where it is deleted
    if (isInvoiceDeleted) {
        return (
            <ConfirmDeletion />
        )
    };

    // retrieve invoice that gets opened
    const currentInvoice = useMemo(() => {
        return invoices.find(invoice => invoice.id === URLparams.invoiceId);
    }, [invoices, URLparams.invoiceId]);

    // retrieve properties of that invoice
    const { status, id, description, clientEmail, clientName, items, total } = currentInvoice;

    const invoiceColor: LabelColorsType = status === 'draft' ? 'gray'
        : status === 'pending' ? 'orange' 
        : 'green'; 
    const { street, city, postCode, country } = currentInvoice.senderAddress;


    // use memo
    const createdAtDate = useMemo(() => convertDateFromString(currentInvoice.createdAt), [currentInvoice.createdAt]);
    const paymentDueDate = useMemo(() => convertDateFromString(currentInvoice.paymentDue), [currentInvoice.paymentDue]);
    const totalPrice = useMemo(() => {
        return formatPrice(total);
    }, [total]);


    // button event listeners and state + effect
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
    
    const handleDeleteBtnClick = () => {
        setIsDeleteOpen(true);
        dispatchAction({
            type: 'openModal'
        });
    };

    const handleChangeStatusBtnClick = () => {
        setIsChangeStatusOpen(true);
        dispatchAction({
            type: 'openModal'
        });
    };

    useEffect(() => {
        if (!isModalOpen && isDeleteOpen) {
            setIsDeleteOpen(false);
        }
        else if (!isModalOpen && isChangeStatusOpen) {
            setIsChangeStatusOpen(false);
        }
    }, [isModalOpen]);
    
    // render items
    const itemsToRender = items.map((item: InitialItemInterface, ind) => <InfoListItem key={ind} item={item} />);

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
                                $needShift={status === 'paid'}
                                onClick={handleDeleteBtnClick}
                            >Delete</DeleteBtn>
                            {status === 'pending' && 
                            <MarkBtn 
                                whileHover='hover'
                                whileTap='tap'
                                variants={buttonVariants}

                                onClick={handleChangeStatusBtnClick}
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
                        {/* Render Items */}
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
                        <TotalPrice>&pound; {totalPrice}</TotalPrice>
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
                    onClick={handleDeleteBtnClick}
                >Delete</DeleteBtn>
                {status === 'pending' && <MarkBtn 
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                    onClick={handleChangeStatusBtnClick}
                >Mark as Paid</MarkBtn>}
            </FooterWrapper>}
            {/* Modal open */}
            {isDeleteOpen && <Modal mod='DELETE' id={URLparams.invoiceId} />}
            {isChangeStatusOpen && <Modal mod='CHANGE_STATUS' id={URLparams.invoiceId} />}
        </>
    )
};