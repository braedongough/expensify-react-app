import React from 'react'
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses'
import totalExpenses from '../selectors/expenses-total'
import numeral from 'numeral'

export const ExpenseSummary = ({ expenses }) => {
    const total = numeral(totalExpenses(expenses) / 100).format('$0,0.00')
    const expenseCount = expenses.length === 1 ? '1 expense' : `${expenses.length} expenses`
    return (
        <div>
            <p>{`Viewing ${expenseCount}, totaling ${total}`}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)