const generateGreeting = name => `Hello ${name}`

test('should greet with correct name', () => {
    const greeting = generateGreeting('bob')
    expect(greeting).toBe('Hello bob')
})