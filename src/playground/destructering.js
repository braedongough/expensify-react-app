//Object destructuring

const person = {
    name: 'braedon',
    age: 303,
    fuck: ['boob, zebra'],
    bobL: {
        zibby: undefined
    }

}

const { zibby: fuckYou = 'boosy' } = person.bobL

console.log(fuckYou)

//Array destructuring 

const address = [' 19', 'Copenhagen', 'Denmark', 2440]

const [jibby, , , hotdog] = address
console.log(`a ${jibby} costs ${hotdog}`)