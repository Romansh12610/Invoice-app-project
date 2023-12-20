import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, InputLabelWrapper } from "../styledComponents/FormInvoiceStyled";
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";

const FormController = () => {

    const URLparams = useParams();
    const { globalState } = useGlobalContext();
    const { isInvoiceEdited } = globalState;
    
    return (
        <>
            <Backdrop />
            <MainWrapper>
                <Title>
                    {isInvoiceEdited ? 'New Invoice' : `Edit &#35;${URLparams.invoiceId}`}
                </Title>
                <Form>
                    <FieldSet $name='user-address'>
                        <Legend>Bill from</Legend>
                        <InputLabelWrapper $gridArea="street">
                            <Label>Street Address</Label>
                            <Input />
                        </InputLabelWrapper>
                    </FieldSet>
                </Form>
            </MainWrapper>
        </>
    )
}

export default FormController;