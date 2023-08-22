import { useState } from 'react'
import './App.css'
import { Square } from './componet/square'
import { TURNS, WINNER_COMBOS } from './const'


function App() {

  const [board,setBoard] = useState(Array(9).fill(null)) 

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) =>{
    if(board[index] || winner ) return

    const newBoard=[...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

 

 return (
  <main className='board'>
    <h1>Ta Te Ti</h1>
    <button onClick={resetGame}>Resetear Game</button>
    <section className='game' >
    {
      board.map((square, index) =>{
        return(
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
             {square}
            </Square>
        )
      })
    }

  </section>

  <section className='turn'>
    <Square isSelected={turn === TURNS.X}>
      {TURNS.X}
    </Square>
    <Square isSelected={turn === TURNS.O}>
      {TURNS.O}
    </Square>
  </section>

    {
      winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false
                ? 'El Juego Terminó en Empate'
                : 'Ganó' 
              }
            </h2>
            
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>

          </div>
        </section>
      )
    }
</main>
  )
}

export default App
