import React, { useState } from 'react';
import Board from './Board';
import Square from './Square';

function Game() {
    const sizeOfBoard = 5;
    const [size, setSize] = useState(5);
    const [history, setHistory] = useState([{
        squares: Array(sizeOfBoard * sizeOfBoard).fill(null),
        tracking: [],
    }
    ],);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [order, setOrder] = useState(false);

    let handleClick = (i) => {
        const sizeOfBoard = size;
        const historyTemp = history.slice(0, stepNumber + 1);
        const current = historyTemp[historyTemp.length - 1];
        const squares = current.squares.slice();
        const tracking = current.tracking.slice();


        let whoWin = finWinner(squares, sizeOfBoard);
        if (whoWin && whoWin !== 'D' || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        tracking.push(i);

        setSize(sizeOfBoard);
        setHistory(historyTemp.concat([
            {
                squares: squares,
                tracking: tracking
            }
        ]));
        setStepNumber(historyTemp.length);
        setXIsNext(!xIsNext);
        setOrder(order);
    }

    let jumpTo = (step) => {
        setStepNumber(step);

    }


    let finWinner = (squares, sizeOfBoard) => {
        if (squares === null) return null;
        for (let i = 0; i < sizeOfBoard; i++) {
            if (squares[i * sizeOfBoard]) {
                let flag = true;
                for (let j = 0; j < sizeOfBoard - 1; j++)
                    if (squares[i * sizeOfBoard + j] !== squares[i * sizeOfBoard + j + 1]) {
                        flag = false; break;
                    }
                if (flag)
                    return squares[i * sizeOfBoard];
            }
    
            if (squares[i]) {
                let flag = true;
                for (let j = 0; j < sizeOfBoard - 1; j++)
                    if (squares[j * sizeOfBoard + i] !== squares[(j + 1) * sizeOfBoard + i]) {
                        flag = false; break;
                    }
                if (flag)
                    return squares[i];
            }
    
        }
        if (squares[0]) {
            let flag = true;
            for (let j = 1; j < sizeOfBoard; j++)
                if (squares[j * sizeOfBoard + j] !== squares[0]) {
                    flag = false;
                    break;
                }
    
            if (flag) {
                return squares[0];
            }
        }
    
    
        if (squares[sizeOfBoard - 1]) {
            let flag = true;
            for (let j = 0; j < sizeOfBoard - 1; j++)
                if (squares[j * sizeOfBoard + sizeOfBoard - j - 1] !== squares[(j + 1) * sizeOfBoard + sizeOfBoard - j - 2]) {
                    flag = false; break;
                }
            if (flag) {
                return squares[sizeOfBoard - 1];
            }
        }
    
        let draw = true;
        for (let i = 0; i < squares.length; ++i)
            if (!squares[i]) {
                draw = false;
                break;
            }
        if (draw) return 'D';
    
    
        return null;
    }
    const current = history[stepNumber];


    let moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move + '.    Pos = [' + Math.floor(step.tracking[step.tracking.length - 1] / size) + ', ' + step.tracking[step.tracking.length - 1] % size + ']' :
            'Go to game start';
        return (
            <li key={move}>
                <button style={(move === stepNumber ? { fontWeight: 'bold' } : null)} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });


    let result;
    let winner = finWinner(current.squares, size);

    if (!winner)
        result = "Next player: " + (xIsNext ? "X" : "O");
    else {
        if (winner === 'D') {
            result = "Draw";
        } else {
            result = winner + ' win';
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    sizeOfBoard={size}
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{result}</div>
                 <button  style={{ margin: 10, padding: 10}} onClick={() => {setOrder(!order)}}> Order </button>
                <ol>{order ? moves.reverse() : moves}</ol>
            </div>
        </div>
    );
}




export default Game;