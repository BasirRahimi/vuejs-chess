import { ref } from 'vue'

type Piece = {
  name: 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn',
  team: 'Light' | 'Dark',
  position: string,
  img: string,
  imgAlt: string,
  status: 'NotMoved' | 'Moved' | 'Dead',
}

type Position = {
  name: string,
  colour: string,
  highlight: boolean
}

type Move = {
  position: string,
  conditions: ('Empty' | 'Kill' | 'FirstMove' | 'ClearPath' | 'AvoidCheck')[] | 'None'
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'up-right' | 'up-left' | 'down-right' | 'down-left'

class Game {
  readonly files:Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  readonly ranks:Array<number> = [8, 7, 6, 5, 4, 3, 2, 1]
  activePlayer = ref(1)
  activePiece = ref<Piece>()
  positions = ref<Array<Position>>([])

  pieces = ref<Array<Piece>>([
    {
      name: 'King',
      team: 'Light',
      position: 'E1',
      img: require('@/assets/chesspieces/King_light.svg'),
      imgAlt: 'Light-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Light',
      position: 'D1',
      img: require('@/assets/chesspieces/Queen_light.svg'),
      imgAlt: 'Light-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      position: 'C1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      position: 'F1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      position: 'B1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      position: 'G1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      position: 'A1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      position: 'H1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'King',
      team: 'Dark',
      position: 'E8',
      img: require('@/assets/chesspieces/King_dark.svg'),
      imgAlt: 'Dark-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Dark',
      position: 'D8',
      img: require('@/assets/chesspieces/Queen_dark.svg'),
      imgAlt: 'Dark-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      position: 'C8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      position: 'F8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      position: 'B8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      position: 'G8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      position: 'A8',
      img: require('@/assets/chesspieces/Rook_dark.svg'),
      imgAlt: 'Dark-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      position: 'H8',
      img: require('@/assets/chesspieces/Rook_dark.svg'),
      imgAlt: 'Dark-Rook',
      status: 'NotMoved'
    }
  ])

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.pieces.value.push({
        name: 'Pawn',
        team: 'Light',
        position: `${this.files[i]}2`,
        img: require('@/assets/chesspieces/Pawn_light.svg'),
        imgAlt: 'Light-Pawn',
        status: 'NotMoved'
      },
      {
        name: 'Pawn',
        team: 'Dark',
        position: `${this.files[i]}7`,
        img: require('@/assets/chesspieces/Pawn_dark.svg'),
        imgAlt: 'Dark-Pawn',
        status: 'NotMoved'
      })
    }

    this.ranks.forEach(number => {
      this.files.forEach((letter, j) => {
        const evenLetter = (j + 1) % 2 === 0
        const evenNumber = number % 2 === 0

        this.positions.value.push({
          name: `${letter}${number}`,
          colour: (evenLetter && !evenNumber) || (!evenLetter && evenNumber) ? 'dark' : 'light',
          highlight: false
        })
      })
    })
  }

  clearHighlights = ():void => {
    this.positions.value.forEach(pos => {
      pos.highlight = false
    })
  }

  switchTurn = ():void => {
    if (this.activePlayer.value === 1) {
      this.activePlayer.value = 2
    } else {
      this.activePlayer.value = 1
    }
  }

  highLightValidMoves = (piece:Piece):void => {
    this.validMoves(piece).forEach(move => {
      const pos = this.positions.value.find(pos => pos.name === move)
      if (pos) pos.highlight = true
    })
  }

  progressiveMoves = (direction:Direction, piece:Piece):Array<string> => {
    // A valid move is one where the space is not occupied by a friendly piece
    const moves = []

    if (direction === 'down') {
      let rank = parseInt(piece.position[1]) - 1
      while (rank >= 1) {
        const newPos = `${piece.position[0]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        rank--

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'up') {
      let rank = parseInt(piece.position[1]) + 1
      while (rank <= 8) {
        const newPos = `${piece.position[0]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        rank++

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'left') {
      let fileIndex = this.files.indexOf(piece.position[0]) - 1
      while (fileIndex >= 0) {
        const newPos = `${this.files[fileIndex]}${piece.position[1]}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex--

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'right') {
      let fileIndex = this.files.indexOf(piece.position[0]) + 1
      while (fileIndex <= 7) {
        const newPos = `${this.files[fileIndex]}${piece.position[1]}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex++

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'up-left') {
      let fileIndex = this.files.indexOf(piece.position[0]) - 1
      let rank = parseInt(piece.position[1]) + 1

      while (fileIndex >= 0 || rank <= 8) {
        const newPos = `${this.files[fileIndex]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex--
        rank++

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'up-right') {
      let fileIndex = this.files.indexOf(piece.position[0]) + 1
      let rank = parseInt(piece.position[1]) + 1

      while (fileIndex <= 7 || rank <= 8) {
        const newPos = `${this.files[fileIndex]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex++
        rank++

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'down-left') {
      let fileIndex = this.files.indexOf(piece.position[0]) - 1
      let rank = parseInt(piece.position[1]) - 1

      while (fileIndex >= 0 || rank >= 1) {
        const newPos = `${this.files[fileIndex]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex--
        rank--

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    } else if (direction === 'down-right') {
      let fileIndex = this.files.indexOf(piece.position[0]) + 1
      let rank = parseInt(piece.position[1]) - 1

      while (fileIndex <= 7 || rank >= 1) {
        const newPos = `${this.files[fileIndex]}${rank}`
        const newPosHasPiece = this.pieces.value.find(x => x.position === newPos)

        fileIndex++
        rank--

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== piece.team) {
          moves.push(newPos)
        } else {
          break
        }
      }
    }

    return moves
  }

  validMoves = (piece:Piece):Array<string> => {
    const enemyTeam = piece.team === 'Light' ? 'Dark' : 'Light'
    const fileIndex = this.files.findIndex((letter:string) => { return letter === piece.position[0] })
    const rank = parseInt(piece.position[1])

    let validMoves:Array<string> = []

    if (piece.name === 'Pawn') {
      const rankProgression1 = piece.team === 'Light' ? rank + 1 : rank - 1
      const rankProgression2 = piece.team === 'Light' ? rank + 2 : rank - 2

      const progression1Empty = this.pieces.value.find(x => x.position === `${piece.position[0]}${rankProgression1}`) === undefined
      const progression2Empty = this.pieces.value.find(x => x.position === `${piece.position[0]}${rankProgression2}`) === undefined
      const pathIsClear = progression1Empty && progression2Empty

      const potentialMoves:Array<Move> = [
        {
          position: `${piece.position[0]}${rankProgression1}`,
          conditions: ['Empty']
        },
        {
          position: `${piece.position[0]}${rankProgression2}`,
          conditions: ['FirstMove', 'Empty', 'ClearPath']
        },
        {
          position: `${this.files[fileIndex + 1]}${rankProgression1}`,
          conditions: ['Kill']
        },
        {
          position: `${this.files[fileIndex - 1]}${rankProgression1}`,
          conditions: ['Kill']
        }
      ]

      potentialMoves.forEach(move => {
        const newPos = this.positions.value.find(x => x.name === move.position)
        if (!newPos) return
        const positionHasGamePiece = this.pieces.value.find(x => x.position === newPos.name)
        const positionHasEnemyPiece = positionHasGamePiece ? positionHasGamePiece.team === enemyTeam : false

        if (move.conditions === 'None') {
          validMoves.push(newPos.name)
        } else {
          let conditionsMet = true
          move.conditions.forEach(condition => {
            if (
              (condition === 'Empty' && positionHasGamePiece) ||
              (condition === 'FirstMove' && piece.status !== 'NotMoved') ||
              (condition === 'Kill' && (!positionHasGamePiece || !positionHasEnemyPiece)) ||
              (condition === 'ClearPath' && !pathIsClear)
            ) {
              conditionsMet = false
            }
          })

          if (conditionsMet) {
            validMoves.push(newPos.name)
          }
        }
      })
    } else if (piece.name === 'Queen') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up', piece),
        ...this.progressiveMoves('down', piece),
        ...this.progressiveMoves('left', piece),
        ...this.progressiveMoves('right', piece),
        ...this.progressiveMoves('up-left', piece),
        ...this.progressiveMoves('up-right', piece),
        ...this.progressiveMoves('down-left', piece),
        ...this.progressiveMoves('down-right', piece)
      ]
    } else if (piece.name === 'Rook') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up', piece),
        ...this.progressiveMoves('down', piece),
        ...this.progressiveMoves('left', piece),
        ...this.progressiveMoves('right', piece)
      ]
    } else if (piece.name === 'Knight') {
      const potentialMoves:Array<string> = [
        `${this.files[fileIndex + 1]}${rank + 2}`,
        `${this.files[fileIndex + 1]}${rank - 2}`,
        `${this.files[fileIndex - 1]}${rank + 2}`,
        `${this.files[fileIndex - 1]}${rank - 2}`,
        `${this.files[fileIndex + 2]}${rank + 1}`,
        `${this.files[fileIndex - 2]}${rank + 1}`,
        `${this.files[fileIndex + 2]}${rank - 1}`,
        `${this.files[fileIndex - 2]}${rank - 1}`
      ]
      validMoves = [
        ...validMoves,
        ...potentialMoves.filter(move => {
          const newPos = this.positions.value.find(x => x.name === move)
          if (!newPos) return false
          const positionHasGamePiece = this.pieces.value.find(x => x.position === newPos.name)
          const positionHasEnemyPiece = positionHasGamePiece ? positionHasGamePiece.team === enemyTeam : false

          if (!positionHasGamePiece) {
            return true
          } else if (positionHasEnemyPiece) {
            return true
          }
        })
      ]
    } else if (piece.name === 'Bishop') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up-left', piece),
        ...this.progressiveMoves('up-right', piece),
        ...this.progressiveMoves('down-left', piece),
        ...this.progressiveMoves('down-right', piece)
      ]
    } else if (piece.name === 'King') {
      const potentialMoves:Array<string> = [
        `${piece.position[0]}${rank + 1}`,
        `${piece.position[0]}${rank - 1}`,
        `${this.files[fileIndex + 1]}${rank}`,
        `${this.files[fileIndex - 1]}${rank}`,
        `${this.files[fileIndex + 1]}${rank + 1}`,
        `${this.files[fileIndex + 1]}${rank - 1}`,
        `${this.files[fileIndex - 1]}${rank + 1}`,
        `${this.files[fileIndex - 1]}${rank - 1}`
      ]
      validMoves = [
        ...validMoves,
        ...potentialMoves.filter(move => {
          const newPos = this.positions.value.find(x => x.name === move)
          if (!newPos) return false
          const positionHasGamePiece = this.pieces.value.find(x => x.position === newPos.name)
          const positionHasEnemyPiece = positionHasGamePiece ? positionHasGamePiece.team === enemyTeam : false

          if (!positionHasGamePiece) {
            return true
          } else if (positionHasEnemyPiece) {
            return true
          }
        })
      ]
    }

    return validMoves
  }

  moveActivePiece = (pos:Position):void => {
    if (!this.activePiece.value) return

    this.activePiece.value.position = pos.name
  }
}

export { Piece, Position, Game }
