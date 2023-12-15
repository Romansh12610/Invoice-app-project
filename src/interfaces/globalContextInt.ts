type VoidFuncType = () => void;

export type FilterStatusType = {
    all: boolean,
    draft: boolean,
    pending: boolean,
    paid: boolean,
};

export interface CustomHTMLButtonElement extends HTMLButtonElement {
    filterType: 'pending' | 'draft' | 'paid';
    $checked: boolean;
};

type FilterHandleType = (e: React.MouseEvent<CustomHTMLButtonElement>) => void;


export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    handleFilterChange: FilterHandleType;
    orientation: "mobile" | "desktop";
}