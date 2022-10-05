import Square from './Square';

 function Board({ sizeOfBoard, squares, onClick }) {
    let drawBoard = (size) => {
        let board = [];
        for (let index = 0; index < size; ++index) {
            board.push(
                <div className="board-row">
                    {drawRow(index * size, size)}
                </div>
            );
        }
        return board;
    }

    let drawRow = (rowIndex, size) => {
        let row = [];
        for (let index = 0; index < size; ++index) {
            row.push(drawSquare(index + rowIndex));
        }
        return row;
    }

    let drawSquare = (index) => {
        return (
            <Square
                value={squares[index]}
                onClick={() => onClick(index)}
            />
        );
    }


    return (
        <div>{drawBoard(sizeOfBoard)}</div>
    );

}

export default Board;