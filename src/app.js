import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import moment from 'moment'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

store.dispatch(addExpense({ description: 'gas bill', amount: 90000, createdAt: moment().add(1, 'day').valueOf() }))
store.dispatch(addExpense({ description: 'rent', amount: 12345, createdAt: moment().subtract(1, 'day').valueOf() }))
store.dispatch(addExpense({ description: 'water bill', amount: 90300, createdAt: moment().valueOf()}))

const state = store.getState()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));