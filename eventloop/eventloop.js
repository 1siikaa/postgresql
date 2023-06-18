queueMicrotask(() => {
    console.log("after completion of any operation of micro task queue (first time)")
    });

console.log("first synchronous");

(()=>{
    console.log("synchronous iife")
})();

process.nextTick(() => {
    setTimeout(()=> {
        console.log(delayII());
        }, 0)
}) 


setTimeout(()=>{
    console.log("Timer queue ...  asynchronously execute after 12 seconds")
},12000)


setImmediate(()=> {
    console.log("check queue  will immediately execute after or before timer queue")
})

process.nextTick(() => {
  console.log("second ..... this will execute after any synchronous operation");              // asynchronously handled
});

queueMicrotask(() => {
    console.log("after completion of any operation of micro task queue (second time)")
    }); 

console.log("third synchronous");

setTimeout(()=> {
console.log(delay());
}, 0)

process.nextTick(() => {
    console.log("second 2 ..... this will execute after any synchronous operation");              // asynchronously handled
  }); 

function delay(){
    return "delaying"
}

process.nextTick(() => {
    setTimeout(()=> {
        console.log(delayII());
        }, 0)
})

function delayII(){
    return "delayingII"
}

setImmediate(()=> {
    console.log("check queueII")
})


// priority 
// synchronous tasks
// process.nextTick();
// timer queue / check queue

// promise : micro task queue(job queue)(high priority task)
const promise= new Promise((res, rej)=>{
    res(7)
    rej()
    })
    promise.then(()=>{
        console.log(7 , "resolving promise")
        })
        .catch(()=> console.log("better luck next time!!"))
    
    // Timer function (Time Queue)(MacroTask Queue)(low priority queue)
    setTimeout(() => {
        console.log(add(1,3), "delaying for 2 seconds")
    }, 2000);
    
    // check queue  // will before any timer (Macro Task queue)
    setImmediate(()=>{
        console.log(add(1,2))
    })
    
    // will execute in the next iteration of the event loop (hight priority task)
    process.nextTick(()=>{
       console.log(add(10,20), "microtask queue")
    })
    
    queueMicrotask(() => {
        console.log("after completion of any operation of micro task queue")
        });
     
    
    
    //console.log(process) // global object of a node.js that contains so many different methods like process.nextTick(), process.exit()
    
    
    const add = (a,b) => { return a+b }
    console.log(add(5,6), "synchronous")  // any high priority asynchronous task will execute after execution of this main function call
    
    
    //-------------------------------------------------------- event loop stages --------------------------------------------------------//               
    // 1. Timers: 
    // 2. I/O callbacks: 
    // 3. Idle, Prepare: 
    // 4. Poll: 
    // 5. Check: 
    // 6. Close callbacks: 
    
    // -------------------------------------------------------- Micro task queue task ( job queue ) //HIGH PRIORITY FIFO QUEUE ------------------------------------------------ //
    // promise 
    // callbacks
    // async await
    // process.nextTick
    // queueMicrotask
    
    // --------------------------------------------------------- Macro task queue task ( task queue ) --------------------------------------------------//
    // setimmidiate 
    // setTimeout 
    // setInterval
    // clearTimeout
    // clearInterval