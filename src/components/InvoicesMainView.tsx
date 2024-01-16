import { MainContainer, HeadingTitle, HeadingSubtitle, HeadingWrapper, TitleWrapper, NewInvoiceButton, NewInvoiceText } from "../styledComponents/InvoicesStyled";
import Filter from "./Filter";
import { useGlobalContext } from "./ContextWrapper";
import InvoiceList from "./InvoiceList/InvoiceList";
import { headerVariants } from "../utilities/mainContentVariants";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";


export default function Main() {

    const { orientation, dispatchAction, globalState } = useGlobalContext();
    const { isInvoiceDeleted } = globalState;

    // invoices quantity to text output
    const invoiceQuantity = globalState.invoices.length;

    // handler to open form
    const handleFormOpen = (e: React.MouseEvent) => {
        e.stopPropagation();

        dispatchAction({
            type: 'openForm',
        });
    };

    // reset deleteInvoiceFlag
    useEffect(() => {
        if (isInvoiceDeleted) {
            dispatchAction({
                type: 'resetDeletedInvoice'
            });
        }
    }, [isInvoiceDeleted]);

    return (
        <AnimatePresence>
            <MainContainer 
                $flexArgs={{
                    direction: 'column',
                    alignItems: 'center',
                }}
                whileInView='animate'
                exit='exit'
            >
                <HeadingWrapper
                    $flexArgs={{
                        justify: 'space-between',
                        alignItems: 'center'
                    }}
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
                        >{orientation === 'desktop' && 'There are'} {invoiceQuantity} total invoices</HeadingSubtitle>
                    </TitleWrapper>
                    <Filter />
                    <NewInvoiceButton 
                        $justify="flex-end"
                        onClick={handleFormOpen}
                    >
                        <NewInvoiceText
                            $size="small"
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
        </AnimatePresence>
    )
}