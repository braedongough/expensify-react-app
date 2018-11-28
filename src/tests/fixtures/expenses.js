import moment from 'moment'


export const expenses = [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 1234,
    createdAt: 0
}, {
    id: '2',
    description: 'butt juice',
    note: '',
    amount: 434343434,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'spicy butt juice',
    note: '',
    amount: 666,
    createdAt: moment(0).add(4, 'days').valueOf()
}]