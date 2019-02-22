import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';


// class Square extends React.Component {

//     render() {
//         return (<button className="square" onClick={() => this.props.onClick()}>{this.props.value}</button>);
//     }
// }

function Square(props) {
    let v;

    if (props.bold === true) {
        // alert(props.bold)
        v = <button className="square buttonbg" onClick={() => props.onClick()} >{props.value}</button>
    } else {

        v = <button className="square" onClick={() => props.onClick()} ><b>{props.value}</b></button>
    }
    return v;
}
function Checkbox(props) {
    return (<input type="checkbox" onChange={() => props.onChange()} />);
}
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} bold={this.props.bold[i]} onClick={() => this.props.onClick(i)} />;
    }
    renderColumn(column) {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr[i] = this.renderSquare((column * 3) + i)
        }
        return arr;
        // return [this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)];
    }
    renderRow() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr[i] = <div className="board-row">
                {this.renderColumn(i)}
            </div>
        }
        return arr
    }
    render() {
        return (
            <div>
                <label className="switch">
                    <Checkbox onChange={() => this.props.onChange()} />
                    <div className="slider round"></div>
                </label>
                {this.renderRow()}</div>

        )
    }

}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.empty = true;
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            accending: true,
            win: [[9].fill(false)],
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // const winner = calculateWinner(current.squares);
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const g = i;
        this.setState({
            history: history.concat([{ squares: squares, }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            column: Math.floor(g / 3),
            row: g % 3,

        });
        if (calculateWinner(squares)) {
            this.setState({ win: calculateWinner(squares).lines })
            ReactDOM.render(<Game />, document.getElementById('root'));
            return;
        }
        this.empty = false;
        for (let l = 0; l < 9; l++) {
            if (!squares[l]) {
                this.empty = true;
            }
        }

    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    toggleB(i) {
        this.state.accending = !this.state.accending
        ReactDOM.render(<Game />, document.getElementById('root'));
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            if (!this.state.accending) {
                if ((this.state.stepNumber - move) >= 0) {
                    move = this.state.stepNumber - move
                }
                // else (
                //     move = 0
                // )
            }
            const decs = move ? 'Go to move #' + move :
                'Go to game start';

            if (move === this.state.stepNumber) {

                return (<li><button onClick={() => this.jumpTo(move)}>
                    <b >{decs}</b>
                </button></li>);
            }
            if (move !== this.state.stepNumber) {

                return (<li><button onClick={() => this.jumpTo(move)}>
                    {decs}
                </button></li>);
            }
        });

        let status;
        if (this.empty) {
            if (winner) {
                status = 'Winner: ' + winner.squares;
                // this.setState ({ win: winner.lines })
            } else {
                status = 'next player : ' + (this.state.xIsNext ? 'X' : 'O');
            }
        } else {
            status = 'Winner:no one wins draw';
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                        bold={this.state.win}
                        onClick={(i) => this.handleClick(i)}
                        onChange={() => this.toggleB()}
                        win={this.state.win} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>);
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            let line = [];
            for (let k = 0; k < 9; k++) {
                line[k] = false;
                for (let j = 0; j < 3; j++) {
                    if (lines[i][j] === k) {
                        line[k] = true
                    }
                }
            }
            return { squares: squares[a], lines: line };
        }
    }
    return null;
}