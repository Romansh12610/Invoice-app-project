type FlexAlignment = 'flex-end' | 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export default interface FlexMixinInterface {
    direction?: 'row' | 'column';
    justify?: FlexAlignment;
    alignItems?: 'flex-end' | 'flex-start' | 'center';
    alignContent?: FlexAlignment;
    gap?: string;
}