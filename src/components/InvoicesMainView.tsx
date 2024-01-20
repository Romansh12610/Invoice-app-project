import { MainContainer, HeadingTitle, HeadingSubtitle, HeadingWrapper, TitleWrapper, NewInvoiceButton, NewInvoiceText, NewInvoiceBtnCircleWithSvg, InvoiceQuantityStyled } from "../styledComponents/InvoicesStyled";
import Filter from "./Filter";
import { useGlobalContext } from '../hooks/useGlobalContext';
import InvoiceList from "./InvoiceList/InvoiceList";
import { headerVariants } from "../utilities/variants/mainContentVariants";
import { useEffect } from "react";
import buttonVariants from "../utilities/variants/buttonVariants";
import Icon from "../Icon/Icon";


export default function Main() {

    const { orientation, dispatchAction, globalState } = useGlobalContext();
    const { isInvoiceDeleted, isChangesSaved, isStatusChanged } = globalState;

    // invoices quantity to text output
    const invoiceQuantity = globalState.invoices.length;

    // handler to open form
    const handleFormOpen = (e: React.MouseEvent) => {
        e.stopPropagation();

        dispatchAction({
            type: 'openForm',
        });
    };

    // reset global state flags for animation
    useEffect(() => {
        if (isInvoiceDeleted) {
            dispatchAction({
                type: 'resetDeletedInvoice'
            });
        }
        if (isChangesSaved) {
            dispatchAction({
                type: 'resetSaveChanges'
            });
        }
        if (isStatusChanged) {
            dispatchAction({
                type: 'resetChangeStatus'
            });
        }
    }, [isInvoiceDeleted, isChangesSaved, isStatusChanged]);

    return (
        <MainContainer 
            $flexArgs={{
                direction: 'column',
                alignItems: 'center',
            }}
            whileInView='animate'
            exit='exit'
            key='main'
        >
            <HeadingWrapper
                $flexArgs={{
                    justify: 'space-between',
                    alignItems: 'center'
                }}
                $orientation={orientation}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={headerVariants}
            >
                <TitleWrapper
                    $flexArgs={{
                        direction: 'column'
                    }}
                >
                    <HeadingTitle>Invoices</HeadingTitle>
                    <HeadingSubtitle
                        $size="medium"
                        $weight="thin"
                    >{orientation === 'desktop' && 'There are'} <InvoiceQuantityStyled>
                        {invoiceQuantity}
                    </InvoiceQuantityStyled> total invoices</HeadingSubtitle>
                </TitleWrapper>
                <Filter />
                <NewInvoiceButton 
                    $justify="flex-end"
                    onClick={handleFormOpen}
                    
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                >
                    <NewInvoiceBtnCircleWithSvg>
                        <Icon 
                            name="plus"
                            size={10}
                            color="#8300da"
                        />
                    </NewInvoiceBtnCircleWithSvg>
                    <NewInvoiceText
                        $size="medium"
                        $weight="bold"
                        $letterSpacing="medium"
                    >
                        New {orientation === 'desktop' && 'Invoice'}
                    </NewInvoiceText>
                </NewInvoiceButton>
            </HeadingWrapper>
            
            {/* list of invoices */}
            <InvoiceList />
        </MainContainer>
    )
}