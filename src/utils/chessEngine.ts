/**
 * Chess Utility & Engine Helper for Trincomalee Kingstars Chess Academy
 * Includes FEN parsing, move validation helpers, and Web Audio API sounds.
 */

export interface BoardSquare {
  square: string; // e.g. "a8", "e4"
  piece: string | null; // e.g. "P", "p", "K", "q", null
  row: number; // 0..7
  col: number; // 0..7
}

// Convert FEN string to 8x8 BoardSquare matrix (row 0 = rank 8, col 0 = file a)
export function fenToBoard(fen: string): BoardSquare[][] {
  const board: BoardSquare[][] = [];
  const fenPieces = fen.split(' ')[0];
  const rows = fenPieces.split('/');

  for (let r = 0; r < 8; r++) {
    const rowSquares: BoardSquare[] = [];
    const rowStr = rows[r] || '8';
    let c = 0;

    for (let char of rowStr) {
      if (/\d/.test(char)) {
        const count = parseInt(char, 10);
        for (let i = 0; i < count; i++) {
          const square = `${String.fromCharCode(97 + c)}${8 - r}`;
          rowSquares.push({ square, piece: null, row: r, col: c });
          c++;
        }
      } else {
        const square = `${String.fromCharCode(97 + c)}${8 - r}`;
        rowSquares.push({ square, piece: char, row: r, col: c });
        c++;
      }
    }
    board.push(rowSquares);
  }

  return board;
}

// Convert square notation to row & col (e.g. "e4" -> row 4, col 4)
export function squareToCoords(sq: string): { row: number; col: number } | null {
  if (!sq || sq.length < 2) return null;
  const file = sq[0].toLowerCase();
  const rank = parseInt(sq[1], 10);
  const col = file.charCodeAt(0) - 97;
  const row = 8 - rank;
  if (col < 0 || col > 7 || row < 0 || row > 7) return null;
  return { row, col };
}

// Convert row & col to square notation (e.g. row 4, col 4 -> "e4")
export function coordsToSquare(row: number, col: number): string {
  const file = String.fromCharCode(97 + col);
  const rank = 8 - row;
  return `${file}${rank}`;
}

// Get piece unicode symbol or clean representation
export function getPieceSymbol(piece: string | null): string {
  if (!piece) return '';
  const symbols: Record<string, string> = {
    'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };
  return symbols[piece] || '';
}

// Re-encode board matrix back to standard FEN string
export function boardToFen(board: BoardSquare[][], activeTurn: 'w' | 'b' = 'w'): string {
  const rowStrings: string[] = [];

  for (let r = 0; r < 8; r++) {
    let rowStr = '';
    let emptyCount = 0;

    for (let c = 0; c < 8; c++) {
      const p = board[r][c].piece;
      if (!p) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          rowStr += emptyCount.toString();
          emptyCount = 0;
        }
        rowStr += p;
      }
    }
    if (emptyCount > 0) {
      rowStr += emptyCount.toString();
    }
    rowStrings.push(rowStr);
  }

  return `${rowStrings.join('/')} ${activeTurn} - - 0 1`;
}

// Apply move (from -> to) on a FEN string and return new FEN
export function applyMoveToFen(fen: string, fromSq: string, toSq: string): string {
  const board = fenToBoard(fen);
  let movingPiece: string | null = null;

  // Step 1: Find piece at fromSq and clear it
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c].square === fromSq) {
        movingPiece = board[r][c].piece;
        board[r][c].piece = null;
      }
    }
  }

  // Step 2: Set piece at toSq
  if (movingPiece) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c].square === toSq) {
          board[r][c].piece = movingPiece;
        }
      }
    }
  }

  // Flip turn
  const currentTurn = fen.split(' ')[1] === 'b' ? 'b' : 'w';
  const nextTurn = currentTurn === 'w' ? 'b' : 'w';

  return boardToFen(board, nextTurn);
}

// Check if piece is white
export function isWhitePiece(piece: string | null): boolean {
  if (!piece) return false;
  return piece === piece.toUpperCase();
}

// Web Audio API Synthesizer for rich mobile sound feedback
class SoundFX {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMove() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      /* Audio Context muted or restricted */
    }
  }

  playCapture() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      /* ignore */
    }
  }

  playCorrect() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.3, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.18);
      });
    } catch {
      /* ignore */
    }
  }

  playWrong() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [220, 196].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.2);
      });
    } catch {
      /* ignore */
    }
  }
}

export const soundFX = new SoundFX();
