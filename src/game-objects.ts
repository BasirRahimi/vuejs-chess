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
  conditions: ('Empty' | 'Kill' | 'FirstMove' | 'ClearPath')[] | 'None'
}

class Game {
  readonly files:Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  readonly ranks:Array<number> = [8, 7, 6, 5, 4, 3, 2, 1]
  activePlayer = ref(1)
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
    if (piece.name === 'Pawn') {
      const yProgression1 = piece.team === 'Light' ? parseInt(piece.position[1]) + 1 : parseInt(piece.position[1]) - 1
      const yProgression2 = piece.team === 'Light' ? parseInt(piece.position[1]) + 2 : parseInt(piece.position[1]) - 2
      const rankIndex = this.files.findIndex((letter:string) => { return letter === piece.position[0] })

      const pathIsClear = ():boolean => {
        if (
          this.pieces.value.find(x => x.position === `${piece.position[0]}${yProgression1}`) ||
          this.pieces.value.find(x => x.position === `${piece.position[0]}${yProgression2}`)
        ) {
          return false
        }
        return true
      }
      const potentialMoves:Array<Move> = [
        {
          position: `${piece.position[0]}${yProgression1}`,
          conditions: ['Empty']
        },
        {
          position: `${piece.position[0]}${yProgression2}`,
          conditions: ['FirstMove', 'Empty', 'ClearPath']
        },
        {
          position: `${this.files[rankIndex + 1]}${yProgression1}`,
          conditions: ['Kill']
        },
        {
          position: `${this.files[rankIndex - 1]}${yProgression1}`,
          conditions: ['Kill']
        }
      ]

      potentialMoves.forEach(move => {
        const newPos = this.positions.value.find(x => x.name === move.position)
        if (!newPos) return
        const positionHasGamePiece = this.pieces.value.find(x => x.position === newPos.name) !== undefined

        if (move.conditions === 'None') {
          // highlight
          newPos.highlight = true
        } else {
          move.conditions.forEach(condition => {
            if (
              (condition === 'Empty' && !positionHasGamePiece) ||
              (condition === 'FirstMove' && piece.status === 'NotMoved') ||
              (condition === 'Kill' && positionHasGamePiece) ||
              (condition === 'ClearPath' && pathIsClear())
            ) {
              // highlight
              newPos.highlight = true
            }
          })
        }
      })
    }
  }
}
/*
  getValidMoves = (position:Position):Array<Position> => {
    if (!position.gamePiece) return []
    const gamePiece = position.gamePiece

    if (gamePiece.name === 'Pawn') {
      const yProgression1 = gamePiece.team === 'Light' ? parseInt(position.name[1]) + 1 : parseInt(position.name[1]) - 1
      const yProgression2 = gamePiece.team === 'Light' ? parseInt(position.name[1]) + 2 : parseInt(position.name[1]) - 2
      const xAxisIndex = xAxis.findIndex((letter:string) => { return letter === position.name[0] })

      const potentialMoves:Array<Move> = [
        {
          position: `${position.name[0]}${yProgression1}`,
          conditions: ['Empty']
        },
        {
          position: `${position.name[0]}${yProgression2}`,
          conditions: ['FirstMove', 'Empty', 'ClearPath']
        },
        {
          position: `${xAxis[xAxisIndex + 1]}${yProgression1}`,
          conditions: ['Kill']
        },
        {
          position: `${xAxis[xAxisIndex - 1]}${yProgression1}`,
          conditions: ['Kill']
        }
      ]

      const validMoves:Array<Position> = []

      potentialMoves.forEach(move => {
        const movePosition = positions.find(y => y.name === move.position)
        if (!movePosition) return

        const positionHasGamePiece = movePosition.gamePiece !== undefined

        if (move.conditions === 'None') {
          validMoves.push(position)
        } else {
          let validMove = true

          // ClearPath move condition not implemented yet
          move.conditions.forEach(condition => {
            if ((condition === 'Empty' && positionHasGamePiece) ||
              (condition === 'FirstMove' && gamePiece.status === 'Moved') ||
              (condition === 'Kill' && !positionHasGamePiece) ||
              (condition === 'ClearPath' && !pathIsClear(position, movePosition))
            ) {
              validMove = false
            }
          })

          if (validMove) {
            validMoves.push(movePosition)
          }
        }
      })

      return validMoves
    }

    return []
  }
}
*/
/*
const pathIsClear = (startPos:Position, endPos:Position):boolean => {
  let clear = true
  const whitesMove = parseInt(startPos.name[1]) < parseInt(endPos.name[1])

  if (whitesMove) {
    for (let i = parseInt(startPos.name[1]) + 1; i <= parseInt(endPos.name[1]); i++) {
      const position = positions.find(x => x.name === `${startPos.name[0]}${i}`)
      if (position && position.gamePiece) {
        clear = false
      }
    }
  } else {
    for (let i = parseInt(startPos.name[1]) - 1; i >= parseInt(endPos.name[1]); i--) {
      const position = positions.find(x => x.name === `${startPos.name[0]}${i}`)
      if (position && position.gamePiece) {
        clear = false
      }
    }
  }
  return clear
}
*/

/*
const getValidMoves = (position:Position):Array<Position> => {
  if (!position.gamePiece) return []
  const gamePiece = position.gamePiece

  if (gamePiece.name === 'Pawn') {
    const yProgression1 = gamePiece.team === 'Light' ? parseInt(position.name[1]) + 1 : parseInt(position.name[1]) - 1
    const yProgression2 = gamePiece.team === 'Light' ? parseInt(position.name[1]) + 2 : parseInt(position.name[1]) - 2
    const xAxisIndex = xAxis.findIndex((letter:string) => { return letter === position.name[0] })

    const potentialMoves:Array<Move> = [
      {
        position: `${position.name[0]}${yProgression1}`,
        conditions: ['Empty']
      },
      {
        position: `${position.name[0]}${yProgression2}`,
        conditions: ['FirstMove', 'Empty', 'ClearPath']
      },
      {
        position: `${xAxis[xAxisIndex + 1]}${yProgression1}`,
        conditions: ['Kill']
      },
      {
        position: `${xAxis[xAxisIndex - 1]}${yProgression1}`,
        conditions: ['Kill']
      }
    ]

    const validMoves:Array<Position> = []

    potentialMoves.forEach(move => {
      const movePosition = positions.find(y => y.name === move.position)
      if (!movePosition) return

      const positionHasGamePiece = movePosition.gamePiece !== undefined

      if (move.conditions === 'None') {
        validMoves.push(position)
      } else {
        let validMove = true

        // ClearPath move condition not implemented yet
        move.conditions.forEach(condition => {
          if ((condition === 'Empty' && positionHasGamePiece) ||
            (condition === 'FirstMove' && gamePiece.status === 'Moved') ||
            (condition === 'Kill' && !positionHasGamePiece) ||
            (condition === 'ClearPath' && !pathIsClear(position, movePosition))
          ) {
            validMove = false
          }
        })

        if (validMove) {
          validMoves.push(movePosition)
        }
      }
    })

    return validMoves
  }

  return []
}
*/
export { Piece, Position, Game }
