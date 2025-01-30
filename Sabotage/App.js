import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('Playing');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || gameStatus !== 'Playing') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus(`Winner: ${winner}`);
      Alert.alert('Game Over', `Player ${winner} wins!`);
    } else if (!newBoard.includes(null)) {
      setGameStatus('Draw');
      Alert.alert('Game Over', "It's a draw!");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('Playing');
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity 
        style={styles.square} 
        onPress={() => handlePress(index)}
        disabled={gameStatus !== 'Playing'}
      >
        <View style={styles.square}>
          <View style={[
            styles.square,
            board[index] === 'X' ? styles.xSquare : board[index] === 'O' ? styles.oSquare : null
          ]}>
            <Text style={styles.squareText}>{board[index]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SABOTAGE</Text>
      <Text style={styles.status}>{gameStatus}</Text>
      
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
    color: '#7f8c8d',
  },
  board: {
    borderWidth: 2,
    borderColor: '#34495e',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  xSquare: {
    backgroundColor: '#3498db',
    borderRadius: 40,
  },
  oSquare: {
    backgroundColor: '#e74c3c',
    borderRadius: 40,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
