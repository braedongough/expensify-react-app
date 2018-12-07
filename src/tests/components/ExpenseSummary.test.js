import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseSummary } from '../../components/ExpenseSummary'
import { expenses } from '../fixtures/expenses'

test('should match ExpenseSummary snapshot for single expense', () => {
    const wrapper = shallow(
        <ExpenseSummary
            expenses={[expenses[0]]}
        />)
    expect(wrapper).toMatchSnapshot()
})

test('should match ExpenseSummary snapshot for multiple expenses', () => {
    const wrapper = shallow(
        <ExpenseSummary
            expenses={expenses}
        />)
    expect(wrapper).toMatchSnapshot()
})