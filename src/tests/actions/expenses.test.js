import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('12345', { note: 'hello you' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '12345',
        update: { note: 'hello you' }
    })
})

test('should setup add action object with provided values', () => {
    const expenseData = {
        description: 'data kush money',
        amount: 1010101010101,
        createdAt: 1000,
        note: 'This was boomaclap'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup edit expense action object with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
})