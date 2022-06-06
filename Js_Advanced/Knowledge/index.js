// Use scope right way
const app = (function(){
    const cats = []

    return {
        get(index){
            return cats[index]
        },
        add(cat){
            return cats.push(cat)
        },
        edit(index, cat){
            return cats[index] = cat
        },
        delete(index){
            return cats.splice(index, 1)
        }
    }
})()

// Use IIFE 
;(function(){
    console.log('Hello World!')
})()

// Use Closure
function createCounter(){
    let count = 0

    function increase(){
        return ++count
    }

    return increase
}

const count1 = createCounter()

console.log(count1())
console.log(count1())
console.log(count1())

const count2 = createCounter()

console.log(count2())
console.log(count2())
console.log(count2())

function createLogger(namespace){
    function logger(message){
        console.log(`[${namespace}] ${message}`)
    }

    return logger
}

const infoLogger = createLogger('Info')

infoLogger('Bắt đầu gửi mail')
infoLogger('Gửi mail lỗi lần 1, thử gửi lại...')
infoLogger('Gửi mail thành công cho user xxx')

// Use Hoisting
const counter1 = makeCounter()

console.log(count1()) // What's the output?

function makeCounter(){
    let counter = 0

    return increase

    function increase(){
        return ++counter
    }
}