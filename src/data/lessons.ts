import { LessonPiece } from '../types';

export const CHESS_LESSONS: LessonPiece[] = [
  {
    id: 'king',
    name: 'The King',
    symbol: '♔',
    colorSymbol: '♚',
    value: 'Priceless (Game Over if Checkmated)',
    tagline: 'The most important piece on the board!',
    description: 'The King is the most vital piece in chess. If your King is trapped and attacked with no escape, the game ends in Checkmate! Protect your King at all costs.',
    movementRules: [
      'Moves 1 square in ANY direction (up, down, left, right, or diagonal).',
      'Can capture any enemy piece that is on an adjacent square.',
      'Can NEVER move onto a square that is being attacked by an enemy piece.',
      'Special Move: Castling! The King can jump 2 squares towards a Rook if neither piece has moved yet.'
    ],
    kidTips: [
      '👑 Think of the King as a wise ruler—he stays protected in his castle!',
      '🛡️ Keep pawns in front of your King to shield him early in the game.',
      '🚨 If your King is in "Check", you MUST move him, block the attack, or capture the attacker immediately!'
    ],
    demoFen: '8/8/8/8/3K4/8/8/8 w - - 0 1',
    demoPieceSquare: 'd4',
    allowedSquares: ['c5', 'd5', 'e5', 'c4', 'e4', 'c3', 'd3', 'e3']
  },
  {
    id: 'queen',
    name: 'The Queen',
    symbol: '♕',
    colorSymbol: '♛',
    value: '9 Points (Most Powerful Piece)',
    tagline: 'The supreme commander of the chessboard!',
    description: 'The Queen is the strongest piece on the board. She combines the powers of the Rook and the Bishop, giving her incredible range and control.',
    movementRules: [
      'Moves ANY number of squares in ANY straight line (horizontal, vertical, or diagonal).',
      'Cannot jump over other pieces.',
      'Captures an enemy piece by moving onto its square.',
      'Great for double attacks and controlling the center of the board.'
    ],
    kidTips: [
      '⚡ The Queen is your super-hero piece—use her carefully!',
      '⚠️ Don’t bring your Queen out too early, or enemy pieces will chase her around.',
      '🎯 Look for forks where the Queen attacks two enemy pieces at the same time.'
    ],
    demoFen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
    demoPieceSquare: 'd4',
    allowedSquares: [
      'd8', 'd7', 'd6', 'd5', 'd3', 'd2', 'd1',
      'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
      'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
      'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8'
    ]
  },
  {
    id: 'rook',
    name: 'The Rook',
    symbol: '♖',
    colorSymbol: '♜',
    value: '5 Points (Major Piece)',
    tagline: 'The heavy castle tower that controls straight lines!',
    description: 'The Rook looks like a castle tower. It marches across open files and ranks, dominating straight lines across the whole board.',
    movementRules: [
      'Moves ANY number of squares along rows (ranks) or columns (files).',
      'Moves strictly horizontally or vertically.',
      'Cannot jump over other pieces.',
      'Special Move: Partners with the King for Castling!'
    ],
    kidTips: [
      '🏰 Rooks love open roads (files with no pawns in front of them)!',
      '🤝 Two Rooks working together on the same file are unstoppable.',
      '7️⃣ Place your Rook on the 7th rank to attack opponent pawns.'
    ],
    demoFen: '8/8/8/8/3R4/8/8/8 w - - 0 1',
    demoPieceSquare: 'd4',
    allowedSquares: [
      'd8', 'd7', 'd6', 'd5', 'd3', 'd2', 'd1',
      'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4'
    ]
  },
  {
    id: 'bishop',
    name: 'The Bishop',
    symbol: '♗',
    colorSymbol: '♝',
    value: '3 Points (Minor Piece)',
    tagline: 'The diagonal sniper of the board!',
    description: 'Each player starts with two Bishops: one on light squares and one on dark squares. A Bishop stays on its starting square color for the entire game!',
    movementRules: [
      'Moves ANY number of squares diagonally.',
      'Must ALWAYS remain on squares of its starting color (light-squared or dark-squared).',
      'Cannot jump over other pieces.'
    ],
    kidTips: [
      '🎨 Light-squared Bishop only visits light squares; Dark-squared Bishop only visits dark squares!',
      '🎯 Place Bishops on long open diagonals to strike from far away.',
      '🧩 Pair both Bishops together (Bishop Pair) to control all color complexes!'
    ],
    demoFen: '8/8/8/8/3B4/8/8/8 w - - 0 1',
    demoPieceSquare: 'd4',
    allowedSquares: [
      'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
      'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8'
    ]
  },
  {
    id: 'knight',
    name: 'The Knight',
    symbol: '♘',
    colorSymbol: '♞',
    value: '3 Points (Minor Piece)',
    tagline: 'The jumping horse that moves in an "L" shape!',
    description: 'The Knight is the only piece in chess that can jump over other pieces! It moves in an "L" pattern and always lands on a square of the opposite color.',
    movementRules: [
      'Moves in an "L" shape: 2 squares in one direction, then 1 square perpendicular (2 up/down + 1 left/right, OR 2 left/right + 1 up/down).',
      'CAN JUMP over both friendly and enemy pieces!',
      'Always changes square color on every jump (light square to dark square, or dark to light).'
    ],
    kidTips: [
      '🐴 "A Knight on the rim is dim"—keep Knights near the center where they control 8 squares!',
      '🦘 Use Knights for tricky "Forks", attacking two high-value pieces at once.',
      '🧱 Obstacles don’t stop the Knight—it just jumps right over them!'
    ],
    demoFen: '8/8/8/8/3N4/8/8/8 w - - 0 1',
    demoPieceSquare: 'd4',
    allowedSquares: ['c6', 'e6', 'b5', 'f5', 'b3', 'f3', 'c2', 'e2']
  },
  {
    id: 'pawn',
    name: 'The Pawn',
    symbol: '♙',
    colorSymbol: '♟',
    value: '1 Point (Foot Soldier)',
    tagline: 'The brave foot soldier with promotion potential!',
    description: 'Pawns start in front of all your pieces. They move forward step-by-step, but capture diagonally. Reaching the end of the board turns a Pawn into a Queen!',
    movementRules: [
      'Moves FORWARD 1 square at a time.',
      'On its VERY FIRST move, a Pawn can choose to move 2 squares forward.',
      'Captures 1 square DIAGONALLY forward.',
      'Cannot move or capture backward.',
      'Special Rules: Promotion (turns into Queen/Rook/Bishop/Knight at 8th rank) and En Passant!'
    ],
    kidTips: [
      '👑 A Pawn that marches all the way to the other side can transform into a Queen!',
      '🧱 Pawns can form strong diagonal chains to lock down territory.',
      '⚔️ Pawns march forward—they never take a step back!'
    ],
    demoFen: '8/8/8/8/8/8/3P4/8 w - - 0 1',
    demoPieceSquare: 'd2',
    allowedSquares: ['d3', 'd4']
  }
];
