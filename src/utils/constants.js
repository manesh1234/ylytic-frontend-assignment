
export const API = 'https://dev.ylytic.com/ylytic/test';

export const filterData = (text, allData) => {
    return allData.filter((item) => {
        return (item.author.toLowerCase().includes(text.toLowerCase()) || item.text.toLowerCase().includes(text.toLowerCase()));
    })
}

export const timeSortHandler = (data, condition) => {
    return data.sort((a, b) => {
        if (condition === 'ascen') return new Date(a.at) - new Date(b.at);
        return new Date(b.at) - new Date(a.at);
    })
}

export const textSortHandler = (data, condition, selection) => {
    return data.sort((a, b) => {
        let a1,b1;
        if(selection==='author'){
            a1 = a.author; b1 = b.author;
        }
        else {
            a1 = a.text; b1 = b.text;
        }
        if (condition === 'ascen') {
            if (a1 < b1) {
                return -1;
            }
            if (a1 > b1) {
                return 1;
            }
            return 0;
        }
        if (a1 < b1) {
            return 1;
        }
        if (a1 > b1) {
            return -1;
        }
        return 0;
    })
}

