let introduce = (name) => {
    console.log(`my name is ${name}`)
}

let outroduce = () => {
    console.log(`was nice meeting you`)
}

// // module.exports = introduce; exports is introduce function

module.exports.intro = introduce; 
// // intro is a property of exports object. it's value is a function
module.exports.outro = outroduce;

// module.exports = {
//     intro: introduce,
//     outro: outroduce
// }




