import React, { useState } from 'react'
import './Calculator.scss'

const NUMBERS = ["7","8","9","/","4","5","6","x","1","2","3","-","0",".","=","+"]
const OPERATORS = ["+","-","x","/"]

const Calculator = () => {
  const [stack, setStack] = useState([])
  const [operation, setOperation] = useState(null)

  const handleOperator = () => {
    let newStack = [...stack]
    if(!newStack[newStack.length-1]) {
      newStack.splice(newStack.length-1)
    }
    if(newStack.length === 1) {
      newStack.push('')
      return newStack
    }
    let result
    switch(operation) {
      case "+":
        //add last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) + parseFloat(newStack[newStack.length-1])
        break;
      case "-":
        //subtract last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) - parseFloat(newStack[newStack.length-1])
        break;
      case "/":
        //divide last two numbers in stack
        result = parseFloat(newStack[newStack.length-2])/parseFloat(newStack[newStack.length-1])
        break;
      case "x":
        //multiply last two numbers in stack
        result = parseFloat(newStack[newStack.length-2]) * parseFloat(newStack[newStack.length-1])
        break;
      default:
        //do nothing
    }
    newStack = [result.toString()]
    return newStack
  }

  const updateDisplay = (n,e) => {
    e.preventDefault();
    let newStack
    if(n === "=") {
      //this will be an operation
      newStack = handleOperator()
      setOperation(null)
      // return
    } else if(!stack.length) {
      newStack=[n]
    } else if(OPERATORS.includes(n)) {
      newStack = [...stack]
      newStack.push('')
      setOperation(n)
    } else {
      newStack = [...stack]
      newStack[newStack.length-1] = newStack[newStack.length-1] + n
    }

    setStack(newStack)
  }

  return (
    <div className="calculator">
      <h3>Calculator</h3>
      <div className="stack-area stack-area-reg">
        {renderStack(stack)}
      </div>
      <button className="number-key" onClick={e=>{ 
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
  return <div className="stack-item">{stackArray[stackArray.length-1] || stackArray[0]}</div>
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