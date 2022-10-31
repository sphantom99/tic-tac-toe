import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const initialArray = [[null,null,null],[null,null,null],[null,null,null]]
  const [board, setBoard] = useState(initialArray)
  const [isTie, setIsTie] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [isGameOver, setIsGameOver] = useState(false)
  const resetGame = () => {
    setBoard([...initialArray])
    setCurrentPlayer("X")
    setIsGameOver(false)
  }
  const checkTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
      if(board[i][j] === null) {
        return false
      }        
      }
    }
    return true;
  }
  const checkWinConditions = () => {
    // check rows
    for(let i=0; i<3; i++){
      // console.log(i,"th row")
      // console.log(board[i][0],board[i][1],board[i][2])
      if((board[i][0]===board[i][1]) && (board[i][0]===board[i][2]) && (board[i][0] !== null)){
        console.log("row: ",i,"is correct")
        return true
      }
    }
    //check columns
    for(let i=0; i<3; i++){
      // console.log(i,"th row")
      // console.log(board[i][0],board[i][1],board[i][2])
      if((board[0][i]===board[1][i]) && (board[0][i]===board[2][i]) && (board[0][i] !== null)){
        console.log("column: ",i,"is correct")
        return true
      }
    }
    // check L - R Diag
    if((board[2][0]===board[1][1]) && (board[0][2]===board[2][0]) && (board[2][0]!== null)){
      return true
    }
    if((board[2][2]===board[1][1]) && (board[2][2]===board[0][0]) && (board[2][2]!== null)){
      return true
    }
    return false
  }
  const handleClick = (i,j) => {
    console.log("row: ",i," column :",j)
    if(board[i][j]!==null){
      return
    }
    let newBoard = [...board];
    newBoard[i][j] = currentPlayer;
    setBoard(newBoard)
    console.log(board)
    if(checkWinConditions()){
      setIsGameOver(true)
      return
    }
    console.log("tie: ", checkTie())
    if(checkTie()){
      setIsGameOver(true)
      setIsTie(true)
      return
    }
    setCurrentPlayer(currentPlayer !== "X" ? "X" : "O")
  }
  return (
    <div style={{display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column"}}>
      
      {isGameOver ? <><h3>Game Over!</h3>{isTie ?<h4>It&apos;s A Tie!!!</h4> : <h4>{currentPlayer} has won!</h4>} <button onClick={()=> resetGame()}>Play Again</button></> :
       <><h3>Welcome</h3><h4>Let&apos;s play tic-tac-toe!</h4>
       <h4>Player {currentPlayer}&apos;s Turn!</h4>
      <table>
        <tbody>
      {board.map((row,rIdx) => (<tr  key={`r${rIdx}`} style={{display: "flex", flexWrap: "nowrap", }}>{row.map((cell, cellIdx)=><td key={`c${cellIdx}`} onClick={()=> handleClick(rIdx,cellIdx)} style={{ borderStyle: "solid", borderWidth: "2px", borderColor: "black", maxWidth:"3em", maxHeight: "3em", fontSize: "2em", padding: "1.5em 2em 2.5em 1.5em",}}>{cell}</td>)}</tr>))}
      </tbody>
      </table>
      </>}
      </div>
    )
}
