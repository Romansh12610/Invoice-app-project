const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const convertDateOutput = (inputDate: string | Date, due?: true): string => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${due ? 'Due' : ''} ${day} ${month} ${year}`;
};


export default convertDateOutput;