import { createStore } from 'redux'

const incrementGenerator = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementGenerator = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
})


store.dispatch(incrementGenerator({ incrementBy: 5 }))

console.log(store.getState())
store.dispatch(decrementGenerator({ decrementBy: 1 }))

store.dispatch(setCount({count: 77}))

console.log(store.getState())

store.dispatch(resetCount())
console.log(store.getState())

//ask Will if there is a way to more gracefully present an error for the set action, instead of simply returning undefined. 