export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Prev State: ', prevState)
        console.log('Action Arguments: ', args)

        const nextState = reducer(prevState, action, args)
        console.log('Next State: ', nextState)
        console.groupEnd()

        // var x = 200, y = 300, z = 100;
        // var o1 = { x: { y: 42 }, z: { y: z } };

        // ({ y: x = { y: y } } = o1 );
        // ({ z: y = { y: z } } = o1 );
        // ({ x: z = { y: x } } = o1 );

        // console.log(x.y, y.y, z.y); // 300  100 42

        
       
        return nextState
    }
}