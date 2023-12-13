type VoidFunc = () => void;

export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFunc;
}