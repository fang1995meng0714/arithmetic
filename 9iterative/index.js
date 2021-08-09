// 阶乘
// function factorial(n) {
//     console.trace()
//     if(n === 1 || n === 0) {
//         return 1;
//     }
//     return n * factorial(n - 1);
// }

// console.log(factorial(3))



// 迭代斐波那契数
// function fibonacciIterative(n) {
//     if(n < 1) return 0;
//     if(n < 2) return 1;

//     let fibNMinus2 = 0;
//     let fibNMinus1 = 1;
//     let finbN = n;

//     for (let i = 2; i <= n; i++) {
//        finbN = fibNMinus1 + fibNMinus2;
//        fibNMinus2 = fibNMinus1;
//        fibNMinus1 = finbN;
//     }
//     return finbN;
// }

// console.log(fibonacciIterative(8))


//递归
// function fibonacci(n) {
//     if(n < 1) return 0;
//     if(n <= 2) return 1;

//     return fibonacci(n - 1) + fibonacci(n - 1);
// }
// console.log(fibonacci(5));


// 缓存递归
// function fibonacciMemoization(n) {
//     const fibonacci = (n, memo = [0, 1]) => {
//         if(memo[n] != null) return memo[n];
//         return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
//     } 

//     return fibonacci;
// }

// fibonacciMemoization()(3)


// 1-00求和
// function sum(n) {
//     if(n == 1) return 1;
//     return sum(n -1) + n;
// }
// console.log(sum(100))
