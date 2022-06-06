// Primitive Types (Kiểu nguyên thủy) and Reference Types (Kiểu tham chiếu)
let a = 1
let b = a

a = 2
console.log(b)

let c = {
    name: 'Mercedes'
}
let d = c

c.name = "BMW"
console.log(d)

function sum(e, f){
    e = 0
    f = 0
    console.log(e, f)
}

const g = 1
const h = 2

sum(g, h)

console.log(g, h)

function func(obj){
    obj.name = 'Mercedes'
    console.log(obj)
}

const obj_origin = {
    name: 'BMW'
}

func(obj_origin)

console.log(obj_origin)