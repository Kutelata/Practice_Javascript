// const iPhone7 = {
//     // Thuộc tính - Property
//     name: 'iPhone 7',
//     color: 'Pink',
//     weight: 300,

//     // Phương thức - Method
//     takePhoto() {
//         console.log(this)
//     },

//     objChild: {
//         name: 'Child Object',
//         methodChild() {
//             console.log(this)
//         }
//     }
// }

// iPhone7.objChild.methodChild()

// function Car(name, color, weight) {
//     this.name = name
//     this.color = color
//     this.weight = weight

//     // this.run = function(){
//     //     console.log('Running...', this)
//     // }
// }

// Car.prototype.run = function () {
//     // Context
//     // Arrow function không có this, 
//     // khi gọi đến this thì sẽ gọi thằng ở ngoài
//     // const test = () => {
//     //     console.log(this)
//     // }
//     function test() {
//         console.log(this)
//     }
//     test()
// }

// const mercedesS450 = new Car('Mercedes S450', 'black', 1200)

// console.log(mercedesS450.run())

// // const button = document.querySelector('button')

// // button.onclick = function(){
// //     console.dir(this.innerText)
// // }

// // Đối tượng global - Window
// // console.log(this) 
// function myFunc() {
//     console.log(this) // trong strict mode this trả về undefined
// }

// Fn.bind() with Delegate Pattern
// this.firstName = "Minh"
// this.lastName = "Thu"

// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thảo',
//     getFullName(data1, data2) {
//         // console.log(data1, data2)
//         console.log(this.firstName, this.lastName)
//         // return `${this.firstName} ${this.lastName}`
//     }
// }

// const student = {
//     firstName: 'Dang',
//     lastName: 'Son'
// }

// // Case 1:
// // console.log(teacher.getFullName()) // Minh Thảo

// // Case 2: 
// const getTeacherName = teacher.getFullName.bind(student, 'Test 1', 'Test 2') // Ưu tiên đối số trong bind

// console.log(getTeacherName('Test 3', 'Test 4')) // Minh Thu

// const button = document.querySelector('button')

// button.onclick = teacher.getFullName.bind(teacher)

// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)

// const app = (() => {
//     const cars = ['BMW']

//     const root = $('#root')
//     const input = $('#input')
//     const submit = $('#submit')

//     return {
//         add(car) {
//             cars.push(car)
//         },
//         delete(index) {
//             cars.splice(index, 1)
//         },
//         render() {
//             const html = cars.map((car, index) => `
//                 <li>
//                     ${car}
//                     <span class="delete" data-index="${index}">&times</span>
//                 </li>
//             `)
//                 .join('')

//             root.innerHTML = html
//         },
//         handleDelete(event) {
//             const deleteBtn = e.target.closest('.delete')
//             if (deleteBtn) {
//                 const index = deleteBtn.dataset.index
//                 this.delete(index)
//                 this.render()
//             }
//         },
//         init() {
//             // Handle DOM events
//             submit.onclick = () => {
//                 const car = input.value
//                 this.add(car)
//                 this.render()

//                 input.value = null
//                 input.focus()
//             }

//             root.onclick = this.handleDelete.bind(this)

//             this.render()
//         }
//     }
// })()

// app.init()

// Fn.call()
// function random(){
//     console.log(Math.random())
// }

// random.call()

// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thu'
// }

// const me = {
//     firstName: 'Son',
//     lastName: 'Dang',
//     showFullName(){
//         console.log(`${this.firstName} ${this.lastName}`)
//         // console.log
//     }
// }

// me.showFullName().call(me)

// this.firstName = 'Son'
// this.lastName = 'Dang'

// function showFullName() {
//     console.log(`${this.firstName} ${this.lastName}`)
// }

// showFullName.call(this)

// function Animal(name, weight) {
//     this.name = name
//     this.weight = weight
// }

// function Chicken(name, weight, legs) {
//     Animal.call(this, name, weight)
//     this.legs = legs
// }

// const sonDang = new Chicken('Son Dang', 66, 2)

// console.log(sonDang)

// function logger() {
//     Array.prototype.forEach.call(arguments, item => {
//         console.log(item)
//     })

//     const arr = Array.prototype.slice.call(arguments) // [...arguments] | Array.from(arguments)
//     arr.forEach(item => console.log(item))
// }

// logger(1, 2, 3, 4, 5)

// Fn.apply()
// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thu',
// }
// function greet(greeting, message){
//     return `${greeting} ${this.firstName} ${this.lastName}. ${message}`
// }

// let result = greet.apply(teacher, ['Em chào cô', 'Cô dạy môn gì thế ạ? (Đã xem cô live stream 1 tiếng)'])

// console.log(result)

// const teacher = {
//     firstName: 'Minh',
//     lastName: 'Thảo',
//     isOnline: false,
//     goOnline() {
//         this.isOnline = true
//         console.log(`${this.firstName} ${this.lastName} is Online`)
//     },
//     goOffline() {
//         this.isOffline = false
//         console.log(`${this.firstName} ${this.lastName} is Offline`)
//     }
// }

// const me = {
//     firstName: 'Son',
//     lastName: 'Dang',
//     isOnline: false,
// }

// console.log('teacher: ', teacher.isOnline)
// teacher.goOnline()
// console.log('teacher: ', teacher.isOnline)

// console.log('---------')

// console.log('student: ', me.isOnline)
// teacher.goOnline.apply(me)
// console.log('student: ', me.isOnline)

function Animal(name, weight){
    this.name = name
    this.weight = weight
}

function Parrot(){
    Animal.apply(this, arguments)
    this.speak = function(){
        console.log('Nhà có khách!')
    }
}

const conVet = new Parrot('Vẹt, 300')
conVet.speak()