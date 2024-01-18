import { ChangeEventInputType } from "../hooks/useFormState";
import { StyledFlexWrapper, StyledInputLabelWrapper, Label, TotalValue, ItemsAddButton, RemoveButton } from "../styledComponents/FormInvoiceStyled";
import { InputLabelWrapper, FlexWrapper } from "./FormInvoice";
import { useTheme } from "styled-components";
import Icon from "../Icon/Icon";
import { InitialItemInterface } from "../interfaces/invoiceTypes";
import { FormChangeEventType } from "../hooks/useFormState";

// types
interface ItemsProps {
    itemsState: InitialItemInterface[],
    handleChangeField: FormChangeEventType;
    shouldShowError: boolean;
}

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
    // error logic
    shouldShowError: boolean;
}

interface ItemWrapperProps {
    children: React.ReactNode;
}

interface TotalLabelWrapperProps {
    $minWidth: number;
    value: number;
}

// main component  
const Items = (props: ItemsProps) => {

    const items = props.itemsState;

    const renderItems = items.map((item: InitialItemInterface, index) => {

        const handleNameChange: ItemProps['handleNameChange'] = (e) => props.handleChangeField(e, 'changeItem', null, index);

        const handlePriceChange: ItemProps['handlePriceChange'] = (e) => props.handleChangeField(e, 'changeItem', null, index);

        const handleQuantityChange: ItemProps['handleQuantityChange'] = (e) => props.handleChangeField(e, 'changeItem', null, index);
        
        const handleRemoveItem: ItemProps['handleRemoveItem'] = (e) => props.handleChangeField(e, 'removeItem', null, index);

        return (
            <Item 
                key={index}
                index={index}
                values={{
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total
                }}
                handleNameChange={handleNameChange}
                handlePriceChange={handlePriceChange}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                shouldShowError={props.shouldShowError}
            />
        )
    });

    // render
    return (
        <>
            {renderItems}
            <ItemsButton 
                handleClick={(e) => props.handleChangeField(e, 'addItem')}
            />
        </>
    )
};

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


// Signle Item component
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
                inputType="text"
                required
                value={props.values.name}
                onChange={props.handleNameChange}
                shouldShowError={props.shouldShowError}
            />
            <FlexWrapper>
                <InputLabelWrapper 
                    labelText="Qty."
                    inputName="quantity"
                    required
                    htmlForID={`item-quantity${props.index}`}
                    value={props.values.quantity}
                    onChange={props.handleQuantityChange}
                    onKeyPress={handleKeyDown}
                    quantity
                />
                <InputLabelWrapper 
                    labelText="Price"
                    inputName="price"
                    required
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