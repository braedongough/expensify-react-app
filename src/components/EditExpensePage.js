import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense)
        this.props.history.push('/')
    }
    onClick = () => {
        this.props.removeExpense(this.props.expense.id)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>Remove</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, expense) => { dispatch(startEditExpense(id, expense)) },
    removeExpense: (id) => { dispatch(startRemoveExpense(id)) }
})

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)