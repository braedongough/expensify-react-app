import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import {
    startAddExpense,
    addExpense,
    removeExpense,
    startRemoveExpense,
    editExpense,
    startEditExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses'
import { expenses } from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expense from firebase and store', (done) => {
    const store = createMockStore()
    const id = expenses[0].id
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: id
        })
    })
    database.ref('expenses/1').once('value').then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
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

test('should edit expense from firebase and store', (done) => {
    const store = createMockStore()
    const id = expenses[0].id
    const update = {
        description: 'This expense has been updated'
    }
    store.dispatch(startEditExpense(id, update)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: id,
            update: update
        })
    })
    database.ref(`expenses/${id}`).once('value').then((snapshot) => {
        expect(snapshot.val().description).toBe(update.description)
        done()
    })
})

test('should setup add action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'gum',
        note: 'minty fresh bitch',
        amount: 1234,
        createdAt: 120000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({})
    const defaultExpenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData)
        done()
    })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({})
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})