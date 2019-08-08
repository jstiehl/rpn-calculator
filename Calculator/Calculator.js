import React, { useState } from 'react'
import './Calculator.scss'

const NUMBERS = ["7","8","9","/","4","5","6","x","1","2","3","-","0",".","enter","+"]
const OPERATORS = ["+","-","x","/"]

const Calculator = () => {
  const [stack, setStack] = useState([])
  const handleOperator = n => {
    let newStack = [...stack]
    if(!newStack[newStack.length-1]) {
      newStack.splice(newStack.length-1)
    }
    if(newStack.length === 1) {
      newStack.push('')
      return setStack(newStack)
    }
    let result
    switch(n) {
      case "+":
        //add last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) + parseFloat(newStack[newStack.length-1])
        newStack.splice(newStack.length-2,2,result.toString())
        newStack.push('')
        setStack(newStack)
        break;
      case "-":
        //subtract last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) - parseFloat(newStack[newStack.length-1])
        newStack.splice(newStack.length-2,2,result.toString())
        newStack.push('')
        setStack(newStack)
        break;
      case "/":
        //divide last two numbers in stack
        result = parseFloat(newStack[newStack.length-2])/parseFloat(newStack[newStack.length-1])
        newStack.splice(newStack.length-2,2,result.toString())
        newStack.push('')
        setStack(newStack)
        break;
      case "x":
        //multiply last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) * parseFloat(newStack[newStack.length-1])
        newStack.splice(newStack.length-2,2,result.toString())
        newStack.push('')
        setStack(newStack)
        break;
      default:
        setStack(newStack)
    }
  }

  const updateDisplay = (n,e) => {
    e.preventDefault();
    let newStack
    if(OPERATORS.includes(n)) {
      //this will be an operation
      handleOperator(n)
      return
    }
    if(!stack.length) {
      newStack=[n]
    } else if(n !== 'enter') {
      newStack = [...stack]
      newStack[newStack.length-1] = newStack[newStack.length-1] + n
    } else {
      newStack = [...stack]
      newStack.push('')
    }

    setStack(newStack)
  }

  return (
    <div className="calculator">
      <h3>RPN Calculator</h3>
      <div className="stack-area">
        {renderStack(stack)}
      </div>
      <button onClick={e=>{ 
        e.preventDefault()
        setStack([])
      }}>Clear</button>
      <div className="pad-area">
        {renderNumberPad(updateDisplay)}
      </div>
    </div>
  )
}

const renderStack = stackArray => {
  return stackArray.map((number, i) => {
    return <div key={i} className="stack-item">{number}</div>
  })
}

const renderNumberPad = handler => {
  return NUMBERS.map(num => {
    return (
      <div className="number-key" key={num} onClick={handler.bind(null, num)}>
        {num}
      </div>
    )
  })
}

export default Calculator