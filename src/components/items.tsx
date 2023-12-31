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
    key: number;
    index: number;
    values: {
        name: string;
        quantity: number;
        price: number;
        total: number;
    };
    handleNameChange: (e: ChangeEventInputType) => void; 
    handleQuantityChange: (e: ChangeEventInputType) => void; 
    handlePriceChange: (e: ChangeEventInputType) => void;
    handleRemoveItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ItemWrapperProps {
    children: React.ReactNode;
}

interface TotalLabelWrapperProps {
    $minWidth: number;
    value: number;
}

// main component  
const Items = () => {

    const { items, handleInvoiceChange } = useGlobalContext();

    const renderItems = items.map((item, index) => (
        <Item 
            key={index}
            index={index}
            values={{
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            }}
            handleNameChange={(e) => handleInvoiceChange(e, 'changeItem', null, index)}
            handlePriceChange={(e) => handleInvoiceChange(e, 'changeItem', null, index)}
            handleQuantityChange={(e) => handleInvoiceChange(e, 'changeItem', null, index)}
            handleRemoveItem={(e) => handleInvoiceChange(e, 'removeItem', null, index)}
        />
    ));

    // render
    return (
        <>
            {renderItems}
            <ItemsButton 
                handleClick={(e) => handleInvoiceChange(e, 'addItem')}
            />
        </>
    )
}

// helper components
const ItemFlexWrapper = (props: ItemWrapperProps) => {
    return (
        <StyledFlexWrapper $col>
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

    // prevent nonNumber value adding
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        } 
    }; 

    return (
        <ItemFlexWrapper>
            <InputLabelWrapper 
                labelText="Item Name"
                htmlForID={`item-name${props.index}`}
                inputName="name"
                value={props.values.name}
                onChange={props.handleNameChange}
            />
            <FlexWrapper>
                <InputLabelWrapper 
                    labelText="Qty."
                    inputName="quantity"
                    htmlForID={`item-quantity${props.index}`}
                    value={props.values.quantity}
                    onChange={props.handleQuantityChange}
                    onKeyPress={handleKeyDown}
                    quantity
                />
                <InputLabelWrapper 
                    labelText="Price"
                    inputName="price"
                    htmlForID={`item-price${props.index}`}
                    value={props.values.price}
                    onChange={props.handlePriceChange}
                    onKeyPress={handleKeyDown}
                    price
                />
                <TotalLabelWrapper 
                    value={props.values.total}
                    $minWidth={50}
                />
                <RemoveButton
                    onClick={props.handleRemoveItem}
                >
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