const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const convertDateFromString = (stringDate: string, due?: true): string => {
    const date = new Date(stringDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${due ? 'Due' : ''} ${day} ${month} ${year}`;
};


export default convertDateFromString;