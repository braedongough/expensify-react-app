import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

store.dispatch(addExpense({ description: 'gas bill', amount: 90000 }))
store.dispatch(addExpense({ description: 'rent', amount: 12345, createdAt: 1000 }))
store.dispatch(addExpense({ description: 'water bill', amount: 90300 }))

const state = store.getState()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));