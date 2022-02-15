type Piece = {
  name: 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn',
  team: 'Light' | 'Dark',
  startPosition: string,
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
  conditions: ('Empty' | 'Kill' | 'FirstMove' | 'ClearPath')[] | 'None'
}

const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const yAxis = ['8', '7', '6', '5', '4', '3', '2', '1']

class Game {
  readonly files:Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  readonly ranks:Array<number> = [8, 7, 6, 5, 4, 3, 2, 1]

  pieces:Array<Piece> = [
    {
      name: 'King',
      team: 'Light',
      startPosition: 'E1',
      img: require('@/assets/chesspieces/King_light.svg'),
      imgAlt: 'Light-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Light',
      startPosition: 'D1',
      img: require('@/assets/chesspieces/Queen_light.svg'),
      imgAlt: 'Light-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      startPosition: 'C1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Light',
      startPosition: 'F1',
      img: require('@/assets/chesspieces/Bishop_light.svg'),
      imgAlt: 'Light-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      startPosition: 'B1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Light',
      startPosition: 'G1',
      img: require('@/assets/chesspieces/Knight_light.svg'),
      imgAlt: 'Light-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      startPosition: 'A1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Light',
      startPosition: 'H1',
      img: require('@/assets/chesspieces/Rook_light.svg'),
      imgAlt: 'Light-Rook',
      status: 'NotMoved'
    },
    {
      name: 'King',
      team: 'Dark',
      startPosition: 'E8',
      img: require('@/assets/chesspieces/King_dark.svg'),
      imgAlt: 'Dark-King',
      status: 'NotMoved'
    },
    {
      name: 'Queen',
      team: 'Dark',
      startPosition: 'D8',
      img: require('@/assets/chesspieces/Queen_dark.svg'),
      imgAlt: 'Dark-Queen',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      startPosition: 'C8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Bishop',
      team: 'Dark',
      startPosition: 'F8',
      img: require('@/assets/chesspieces/Bishop_dark.svg'),
      imgAlt: 'Dark-Bishop',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      startPosition: 'B8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Knight',
      team: 'Dark',
      startPosition: 'G8',
      img: require('@/assets/chesspieces/Knight_dark.svg'),
      imgAlt: 'Dark-Knight',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      startPosition: 'A8',
      img: require('@/assets/chesspieces/Rook_dark.svg'),
      imgAlt: 'Dark-Rook',
      status: 'NotMoved'
    },
    {
      name: 'Rook',
      team: 'Dark',
      startPosition: 'H8',
      img: require('@/assets/chesspieces/Rook_dark.svg'),
      imgAlt: 'Dark-Rook',
      status: 'NotMoved'
    }
  ]

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.pieces.push({
        name: 'Pawn',
        team: 'Light',
        startPosition: `${xAxis[i]}2`,
        img: require('@/assets/chesspieces/Pawn_light.svg'),
        imgAlt: 'Light-Pawn',
        status: 'NotMoved'
      },
      {
        name: 'Pawn',
        team: 'Dark',
        startPosition: `${xAxis[i]}7`,
        img: require('@/assets/chesspieces/Pawn_dark.svg'),
        imgAlt: 'Dark-Pawn',
        status: 'NotMoved'
      })
    }
  }
}

const gamePieces:Array<Piece> = [
  {
    name: 'King',
    team: 'Light',
    startPosition: 'E1',
    img: require('@/assets/chesspieces/King_light.svg'),
    imgAlt: 'Light-King',
    status: 'NotMoved'
  },
  {
    name: 'Queen',
    team: 'Light',
    startPosition: 'D1',
    img: require('@/assets/chesspieces/Queen_light.svg'),
    imgAlt: 'Light-Queen',
    status: 'NotMoved'
  },
  {
    name: 'Bishop',
    team: 'Light',
    startPosition: 'C1',
    img: require('@/assets/chesspieces/Bishop_light.svg'),
    imgAlt: 'Light-Bishop',
    status: 'NotMoved'
  },
  {
    name: 'Bishop',
    team: 'Light',
    startPosition: 'F1',
    img: require('@/assets/chesspieces/Bishop_light.svg'),
    imgAlt: 'Light-Bishop',
    status: 'NotMoved'
  },
  {
    name: 'Knight',
    team: 'Light',
    startPosition: 'B1',
    img: require('@/assets/chesspieces/Knight_light.svg'),
    imgAlt: 'Light-Knight',
    status: 'NotMoved'
  },
  {
    name: 'Knight',
    team: 'Light',
    startPosition: 'G1',
    img: require('@/assets/chesspieces/Knight_light.svg'),
    imgAlt: 'Light-Knight',
    status: 'NotMoved'
  },
  {
    name: 'Rook',
    team: 'Light',
    startPosition: 'A1',
    img: require('@/assets/chesspieces/Rook_light.svg'),
    imgAlt: 'Light-Rook',
    status: 'NotMoved'
  },
  {
    name: 'Rook',
    team: 'Light',
    startPosition: 'H1',
    img: require('@/assets/chesspieces/Rook_light.svg'),
    imgAlt: 'Light-Rook',
    status: 'NotMoved'
  },
  {
    name: 'King',
    team: 'Dark',
    startPosition: 'E8',
    img: require('@/assets/chesspieces/King_dark.svg'),
    imgAlt: 'Dark-King',
    status: 'NotMoved'
  },
  {
    name: 'Queen',
    team: 'Dark',
    startPosition: 'D8',
    img: require('@/assets/chesspieces/Queen_dark.svg'),
    imgAlt: 'Dark-Queen',
    status: 'NotMoved'
  },
  {
    name: 'Bishop',
    team: 'Dark',
    startPosition: 'C8',
    img: require('@/assets/chesspieces/Bishop_dark.svg'),
    imgAlt: 'Dark-Bishop',
    status: 'NotMoved'
  },
  {
    name: 'Bishop',
    team: 'Dark',
    startPosition: 'F8',
    img: require('@/assets/chesspieces/Bishop_dark.svg'),
    imgAlt: 'Dark-Bishop',
    status: 'NotMoved'
  },
  {
    name: 'Knight',
    team: 'Dark',
    startPosition: 'B8',
    img: require('@/assets/chesspieces/Knight_dark.svg'),
    imgAlt: 'Dark-Knight',
    status: 'NotMoved'
  },
  {
    name: 'Knight',
    team: 'Dark',
    startPosition: 'G8',
    img: require('@/assets/chesspieces/Knight_dark.svg'),
    imgAlt: 'Dark-Knight',
    status: 'NotMoved'
  },
  {
    name: 'Rook',
    team: 'Dark',
    startPosition: 'A8',
    img: require('@/assets/chesspieces/Rook_dark.svg'),
    imgAlt: 'Dark-Rook',
    status: 'NotMoved'
  },
  {
    name: 'Rook',
    team: 'Dark',
    startPosition: 'H8',
    img: require('@/assets/chesspieces/Rook_dark.svg'),
    imgAlt: 'Dark-Rook',
    status: 'NotMoved'
  }
]

for (let i = 0; i < 8; i++) {
  gamePieces.push({
    name: 'Pawn',
    team: 'Light',
    startPosition: `${xAxis[i]}2`,
    img: require('@/assets/chesspieces/Pawn_light.svg'),
    imgAlt: 'Light-Pawn',
    status: 'NotMoved'
  })
  gamePieces.push({
    name: 'Pawn',
    team: 'Dark',
    startPosition: `${xAxis[i]}7`,
    img: require('@/assets/chesspieces/Pawn_dark.svg'),
    imgAlt: 'Dark-Pawn',
    status: 'NotMoved'
  })
}

const positions:Array<Position> = []

yAxis.forEach((number) => {
  xAxis.forEach((letter, j) => {
    const evenLetter = (j + 1) % 2 === 0
    const evenNumber = parseInt(number) % 2 === 0

    const colour = () => {
      if ((evenLetter && !evenNumber) || (!evenLetter && evenNumber)) {
        return 'dark'
      } else {
        return 'light'
      }
    }

    positions.push({
      name: `${letter}${number}`,
      colour: colour(),
      highlight: false,
      gamePiece: gamePieces.find(x => x.startPosition === `${letter}${number}`)
    })
  })
})

const getPositions = ():Array<Position> => { return positions }

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

export { getPositions, getValidMoves, xAxis, yAxis, Piece, Position, Game }
