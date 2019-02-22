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
    if (props.bold) { v = <button className="square" onClick={() => props.onClick()}><b>{props.value}</b></button> }
    else { v = <button className="square" onClick={() => props.onClick()}>{props.value}</button> }
    return (v);
}
function Checkbox(props) {
    return (<input type="checkbox" onChange={() => props.onChange()} />);
}
class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i].value} onClick={() => this.props.onClick(i)} bold={i % 2} />;
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
class sqar {
    value
    high
}
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares:sqar[9]=[{
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }, {
                            value: null,
                            high: false
                        }],
                    }],

            stepNumber: 0,
            xIsNext: true,
            accending: true,
            win: [],
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current;
        current = history[history.length -1]
        // for (let i = 0; i < 9; i++) {
        //     if (history[i].value) {
        //         current = history[i]
        //     } else {
        //         break
        //     }
        // }
        // const winner = calculateWinner(current.squares);
        alert(current.squares[0].value)
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i].value = this.state.xIsNext ? 'X' : 'O';
        const g = i;
        // let stp;
        // for (let i = 0; i < 9; i++) {
        //     if (history[i].value) {
        //         stp = i
        //     } else {
        //         break
        //     }
        // }
        this.setState({
            history: history.concat([{ squares: squares, }]),
            stepNumber: (history.length),
            xIsNext: !this.state.xIsNext,
            column: Math.floor(g / 3),
            row: g % 3,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    toggleB(i) {
        this.setState = ({ state: !this.state.accending })
        ReactDOM.render(<Game />, document.getElementById('root'));
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            if (!this.state.accending) {
                if ((this.state.stepNumber - move.value) >= 0) {
                    move = this.state.stepNumber - move.value
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


            return (<li><button onClick={() => this.jumpTo(move)}>
                {decs}
            </button></li>);

        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner.squares;
            this.setState = ({ win: winner.lines })
        } else {
            status = 'next player : ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
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
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
            return { squares: squares[a].value, lines: lines[i] };
        }
    }
    return null;
}