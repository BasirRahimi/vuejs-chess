import { ref } from 'vue'

type Piece = {
  name: 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn',
  team: 'Light' | 'Dark',
  startPos: string,
  img: string,
  imgAlt: string,
  status: 'NotMoved' | 'Moved' | 'Dead',
}

type Position = {
  name: string,
  colour: string,
  highlight: boolean,
  gamePiece: Piece | undefined
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
  activePos = ref<Position>()
  positions = ref<Array<Position>>([])

  pieces = ref<Array<Piece>>([
    {
      name: 'King',
      team: 'Light',
      startPos: 'E1',
      img: require('@/assets/chesspieces/King_light.svg'),
      imgAlt: 'Light-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Light',
      startPos: 'D1',
      img: require('@/assets/chesspieces/Queen_light.svg'),
      imgAlt: 'Light-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      startPos: 'C1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      startPos: 'F1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      startPos: 'B1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      startPos: 'G1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      startPos: 'A1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      startPos: 'H1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'King',
      team: 'Dark',
      startPos: 'E8',
      img: require('@/assets/chesspieces/King_dark.svg'),
      imgAlt: 'Dark-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Dark',
      startPos: 'D8',
      img: require('@/assets/chesspieces/Queen_dark.svg'),
      imgAlt: 'Dark-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      startPos: 'C8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      startPos: 'F8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      startPos: 'B8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      startPos: 'G8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      startPos: 'A8',
      img: require('@/assets/chesspieces/Rook_dark.svg'),
      imgAlt: 'Dark-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      startPos: 'H8',
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
        startPos: `${this.files[i]}2`,
        img: require('@/assets/chesspieces/Pawn_light.svg'),
        imgAlt: 'Light-Pawn',
        status: 'NotMoved'
      },
      {
        name: 'Pawn',
        team: 'Dark',
        startPos: `${this.files[i]}7`,
        img: require('@/assets/chesspieces/Pawn_dark.svg'),
        imgAlt: 'Dark-Pawn',
        status: 'NotMoved'
      })
    }

    this.ranks.forEach(number => {
      this.files.forEach((letter, j) => {
        const evenLetter = (j + 1) % 2 === 0
        const evenNumber = number % 2 === 0
        const posName = `${letter}${number}`
        this.positions.value.push({
          name: posName,
          colour: (evenLetter && !evenNumber) || (!evenLetter && evenNumber) ? 'dark' : 'light',
          highlight: false,
          gamePiece: this.pieces.value.find(x => x.startPos === posName)
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

  highLightValidMoves = (pos:Position):void => {
    this.validMoves(pos).forEach(position => {
      if (position) position.highlight = true
    })
  }

  progressiveMoves = (direction:Direction, pos:Position):Array<Position> => {
    // A valid move is one where the space is not occupied by a friendly piece
    const moves:Array<Position> = []

    if (direction === 'down') {
      let rank = parseInt(pos.name[1]) - 1
      while (rank >= 1) {
        const newPos = this.positions.value.find(x => x.name === `${pos.name[0]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        rank--
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'up') {
      let rank = parseInt(pos.name[1]) + 1
      while (rank <= 8) {
        const newPos = this.positions.value.find(x => x.name === `${pos.name[0]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        rank++
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'left') {
      let fileIndex = this.files.indexOf(pos.name[0]) - 1
      while (fileIndex >= 0) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${pos.name[1]}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex--
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'right') {
      let fileIndex = this.files.indexOf(pos.name[0]) + 1
      while (fileIndex <= 7) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${pos.name[1]}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex++
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'up-left') {
      let fileIndex = this.files.indexOf(pos.name[0]) - 1
      let rank = parseInt(pos.name[1]) + 1

      while (fileIndex >= 0 || rank <= 8) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex--
        rank++
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'up-right') {
      let fileIndex = this.files.indexOf(pos.name[0]) + 1
      let rank = parseInt(pos.name[1]) + 1

      while (fileIndex <= 7 || rank <= 8) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex++
        rank++
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'down-left') {
      let fileIndex = this.files.indexOf(pos.name[0]) - 1
      let rank = parseInt(pos.name[1]) - 1

      while (fileIndex >= 0 || rank >= 1) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex--
        rank--
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    } else if (direction === 'down-right') {
      let fileIndex = this.files.indexOf(pos.name[0]) + 1
      let rank = parseInt(pos.name[1]) - 1

      while (fileIndex <= 7 || rank >= 1) {
        const newPos = this.positions.value.find(x => x.name === `${this.files[fileIndex]}${rank}`)
        const newPosHasPiece = newPos?.gamePiece

        fileIndex++
        rank--
        if (!newPos) continue

        if (newPosHasPiece === undefined) {
          moves.push(newPos)
        } else if (newPosHasPiece.team !== pos.gamePiece?.team) {
          moves.push(newPos)
          break
        } else {
          break
        }
      }
    }

    return moves
  }

  validMoves = (pos:Position):Array<Position> => {
    if (pos.gamePiece === undefined) return []

    const enemyTeam = pos.gamePiece.team === 'Light' ? 'Dark' : 'Light'
    const fileIndex = this.files.findIndex((letter:string) => { return letter === pos.name[0] })
    const rank = parseInt(pos.name[1])

    let validMoves:Array<Position> = []

    if (pos.gamePiece.name === 'Pawn') {
      const rankProgression1 = pos.gamePiece.team === 'Light' ? rank + 1 : rank - 1
      const rankProgression2 = pos.gamePiece.team === 'Light' ? rank + 2 : rank - 2
      const progression1Empty = this.positions.value.find(x => x.name === `${pos.name[0]}${rankProgression1}`)?.gamePiece === undefined
      const progression2Empty = this.positions.value.find(x => x.name === `${pos.name[0]}${rankProgression2}`)?.gamePiece === undefined
      const pathIsClear = progression1Empty && progression2Empty

      const potentialMoves:Array<Move> = [
        {
          position: `${pos.name[0]}${rankProgression1}`,
          conditions: ['Empty']
        },
        {
          position: `${pos.name[0]}${rankProgression2}`,
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
        const positionHasGamePiece = newPos.gamePiece !== undefined
        const positionHasEnemyPiece = positionHasGamePiece ? newPos.gamePiece?.team === enemyTeam : false

        if (move.conditions === 'None') {
          validMoves.push(newPos)
        } else {
          let conditionsMet = true
          move.conditions.forEach(condition => {
            if (condition === 'FirstMove') {
              console.log(pos.gamePiece?.status && condition === 'FirstMove')
            }
            if (
              (condition === 'Empty' && positionHasGamePiece) ||
              (condition === 'FirstMove' && pos.gamePiece?.status === 'Moved') ||
              (condition === 'Kill' && (!positionHasGamePiece || !positionHasEnemyPiece)) ||
              (condition === 'ClearPath' && !pathIsClear)
            ) {
              conditionsMet = false
            }
          })

          if (conditionsMet) {
            validMoves.push(newPos)
          }
        }
      })
    } else if (pos.gamePiece.name === 'Queen') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up', pos),
        ...this.progressiveMoves('down', pos),
        ...this.progressiveMoves('left', pos),
        ...this.progressiveMoves('right', pos),
        ...this.progressiveMoves('up-left', pos),
        ...this.progressiveMoves('up-right', pos),
        ...this.progressiveMoves('down-left', pos),
        ...this.progressiveMoves('down-right', pos)
      ]
    } else if (pos.gamePiece.name === 'Rook') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up', pos),
        ...this.progressiveMoves('down', pos),
        ...this.progressiveMoves('left', pos),
        ...this.progressiveMoves('right', pos)
      ]
    } else if (pos.gamePiece.name === 'Knight') {
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
      potentialMoves.forEach(move => {
        const newPos = this.positions.value.find(x => x.name === move)
        if (!newPos) return
        const positionHasGamePiece = newPos.gamePiece !== undefined
        const positionHasEnemyPiece = positionHasGamePiece ? newPos.gamePiece?.team === enemyTeam : false

        if (!positionHasGamePiece || positionHasEnemyPiece) {
          validMoves.push(newPos)
        }
      })
    } else if (pos.gamePiece.name === 'Bishop') {
      validMoves = [
        ...validMoves,
        ...this.progressiveMoves('up-left', pos),
        ...this.progressiveMoves('up-right', pos),
        ...this.progressiveMoves('down-left', pos),
        ...this.progressiveMoves('down-right', pos)
      ]
    } else if (pos.gamePiece.name === 'King') {
      const potentialMoves:Array<string> = [
        `${pos.name[0]}${rank + 1}`,
        `${pos.name[0]}${rank - 1}`,
        `${this.files[fileIndex + 1]}${rank}`,
        `${this.files[fileIndex - 1]}${rank}`,
        `${this.files[fileIndex + 1]}${rank + 1}`,
        `${this.files[fileIndex + 1]}${rank - 1}`,
        `${this.files[fileIndex - 1]}${rank + 1}`,
        `${this.files[fileIndex - 1]}${rank - 1}`
      ]

      potentialMoves.filter(move => {
        const newPos = this.positions.value.find(x => x.name === move)
        if (!newPos) return false
        const positionHasGamePiece = newPos.gamePiece !== undefined
        const positionHasEnemyPiece = positionHasGamePiece ? newPos.gamePiece?.team === enemyTeam : false

        if (!positionHasGamePiece || positionHasEnemyPiece) {
          return newPos
        }
      })
    }

    return validMoves
  }

  movePiece = (pos:Position):void => {
    if (!this.activePos.value) return
    if (pos.gamePiece) {
      pos.gamePiece.status = 'Dead'
    }
    pos.gamePiece = this.activePos.value.gamePiece
    this.activePos.value.gamePiece = undefined

    if (pos.gamePiece && pos.gamePiece.status === 'NotMoved') {
      pos.gamePiece.status = 'Moved'
    }
  }
}

export { Piece, Position, Game }
