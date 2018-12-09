import expensesReducer from '../../reducers/expenses'
import { expenses } from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should add expense to state', () => {
    const expense = { description: 'rent', amount: 10, note: '', createdAt: 0 }
    const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense })
    expect(state).toEqual([...expenses, expense])
})
test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should edit expense by id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        update: {
            description: 'butt'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[0]).toEqual({
        id: '1',
        description: 'butt',
        note: '',
        amount: 1234,
        createdAt: 0
    })
})

test('should not edit expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        update: {
            description: 'butt'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should set expenses', () => {
    const initialState = [{
        id: '5',
        description: 'mega butt',
        note: '',
        amount: 6666666,
        createdAt: 20000
    }, {
        id: '6',
        description: 'super butt',
        note: '',
        amount: 857438,
        createdAt: 2309349
    }]
    const action = {
        type: 'SET_EXPENSES',
        expenses: [
            ...expenses
        ]
    }
    const state = expensesReducer(initialState, action)
    expect(state).toEqual(expenses)
    expect(state).not.toEqual(initialState)
})