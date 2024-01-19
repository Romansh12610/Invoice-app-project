import { memo, useMemo } from 'react';
// types
import { InitialItemInterface } from '../../interfaces/invoiceTypes';
// styles comps
import { ItemSingleWrapper, ItemTitleText, ItemPriceCountText, ItemPriceText } from '../../styledComponents/InvoiceInfoStyled';
// util functins
import formatPrice from '../../utilities/formatPrice';


interface InfoListItemProps {
    item: InitialItemInterface;
}

const InfoListItem = memo(({ item }: InfoListItemProps) => {

        const formattedPrice = useMemo(() => formatPrice(item.price), [item.price]);
        const formattedTotal = useMemo(() => formatPrice(item.total), [item.total]);
    
        return (
            <ItemSingleWrapper>
                <ItemTitleText
                    $size='small'
                    $weight='medium'
                >{item.name}
                </ItemTitleText>

                <ItemPriceCountText
                    $size='small'
                    $weight='medium'
                >{item.quantity} &times; &pound; {formattedPrice}
                </ItemPriceCountText>

                <ItemPriceText
                    $size='medium'
                    $weight='bold'
                >
                    &pound; {formattedTotal}
                </ItemPriceText>
            </ItemSingleWrapper>
        )
});

export default InfoListItem;