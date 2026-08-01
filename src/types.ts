/**
 * Types & Interfaces for Trincomalee Kingstars Chess Academy
 */

export type NavigationTab = 
  | 'home' 
  | 'learn' 
  | 'puzzles' 
  | 'mate1' 
  | 'mate2' 
  | 'tournaments' 
  | 'academy' 
  | 'contact';

export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export interface LessonPiece {
  id: PieceType;
  name: string;
  symbol: string;
  colorSymbol: string;
  value: string;
  tagline: string;
  description: string;
  movementRules: string[];
  kidTips: string[];
  demoFen: string;
  demoPieceSquare: string;
  allowedSquares: string[];
}

export interface ChessPuzzle {
  id: string;
  type: 'mate1' | 'mate2';
  number: number;
  title: string;
  fen: string;
  turn: 'w' | 'b';
  solution: { from: string; to: string; promotion?: string }[];
  blackResponse?: { from: string; to: string };
  hint: string;
  explanation: string;
}

export interface UserProgress {
  score: number;
  mate1Solved: number[]; // puzzle numbers solved e.g. [1, 2, 5]
  mate2Solved: number[];
  lessonsCompleted: string[];
  lastActiveMate1: number;
  lastActiveMate2: number;
}

export interface Tournament {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  format: string;
  timeControl: string;
  entryFee: string;
  prizes: string;
  status: 'Upcoming' | 'Registration Open' | 'Completed';
  description: string;
  whatsappContact: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  whatsappDisplay?: string;
  email: string;
  facebook: string;
  address: string;
  workingHours: string;
}
