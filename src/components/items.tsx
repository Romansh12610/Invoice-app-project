import { ChangeEventInputType } from "../hooks/useManageInvoices";
import { StyledFlexWrapper, StyledInputLabelWrapper, Label, TotalValue, ItemsAddButton, RemoveButton } from "../styledComponents/FormInvoiceStyled";
import { InputLabelWrapper, FlexWrapper } from "./FormInvoice";
import { useTheme } from "styled-components";
import Icon from "../Icon/Icon";
import { useGlobalContext } from "./ContextWrapper";

// types
interface ItemsButtonProps {
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ItemProps {
    index: number,
    values: {
        name: string;
        quantity: string;
        price: string;
        total: string;
    };
    handleNameChange: (e: ChangeEventInputType) => void; 
    handleQuantityeChange: (e: ChangeEventInputType) => void; 
    handlePriceChange: (e: ChangeEventInputType) => void; 
}

interface ItemWrapperProps {
    key: number;
    children: React.ReactNode;
}

interface TotalLabelWrapperProps {
    $minWidth: number;
    value: string;
}


// main component  
const Items = () => {

    const { items } = useGlobalContext();

    const renderItems = items.map((item, index) => (
        <Item 
            index={index}
            values={{
                // to cont
            }}
        />
    ))
}

// helper components
const ItemFlexWrapper = (props: ItemWrapperProps) => {
    return (
        <StyledFlexWrapper $col key={props.key}>
            {props.children}
        </StyledFlexWrapper>
    )
}

const TotalLabelWrapper = (props: TotalLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper $minWidth={props.$minWidth}>
            <Label>
                Total
            </Label>
            <TotalValue>
                {props.value}
            </TotalValue>
        </StyledInputLabelWrapper>
    )
}

const ItemsButton = (props: ItemsButtonProps) => {
    return (
        <ItemsAddButton onClick={props.handleClick}>
            <p>+ Add New Item</p>
        </ItemsAddButton>
    )
};

const Item = (props: ItemProps) => {

    const colorTheme = useTheme();

    return (
        <ItemFlexWrapper key={props.index}>
            <InputLabelWrapper 
                labelText="Item Name"
                htmlForID={`item-name${props.index}`}
                inputName="itemName"
                value={props.values.name}
                onChange={props.handleNameChange}
            />
            <FlexWrapper>
                <InputLabelWrapper 
                    labelText="Qty."
                    inputName="quantity"
                    htmlForID={`item-quantity${props.index}`}
                    value={props.values.quantity}
                    onChange={props.handleQuantityeChange}
                    quantity
                />
                <InputLabelWrapper 
                    labelText="Price"
                    inputName="price"
                    htmlForID={`item-price${props.index}`}
                    value={props.values.price}
                    onChange={props.handlePriceChange}
                    price
                />
                <TotalLabelWrapper 
                    value={props.values.total}
                    $minWidth={100}
                />
                <RemoveButton>
                    <Icon 
                        name='delete'
                        size={16}
                        color={colorTheme.general.deleteBtnBg}
                    />
                </RemoveButton>
            </FlexWrapper>
        </ItemFlexWrapper>
    )
};

export default Items;