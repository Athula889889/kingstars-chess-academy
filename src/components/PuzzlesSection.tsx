import React, { useState, useEffect } from 'react';
import { MATE_IN_1_PUZZLES, MATE_IN_2_PUZZLES } from '../data/puzzles';
import { ChessPuzzle, UserProgress } from '../types';
import { fenToBoard, getPieceSymbol, isWhitePiece, soundFX, applyMoveToFen } from '../utils/chessEngine';
import { Puzzle, Trophy, RotateCcw, ChevronLeft, ChevronRight, HelpCircle, CheckCircle, AlertCircle, Sparkles, Award } from 'lucide-react';

interface PuzzlesProps {
  initialType?: 'mate1' | 'mate2';
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const PuzzlesSection: React.FC<PuzzlesProps> = ({
  initialType = 'mate1',
  progress,
  setProgress,
}) => {
  const [puzzleType, setPuzzleType] = useState<'mate1' | 'mate2'>(initialType);
  const currentList = puzzleType === 'mate1' ? MATE_IN_1_PUZZLES : MATE_IN_2_PUZZLES;
  
  // Current index (0..99)
  const [currentIndex, setCurrentIndex] = useState<number>(
    puzzleType === 'mate1' ? progress.lastActiveMate1 || 0 : progress.lastActiveMate2 || 0
  );

  const activePuzzle: ChessPuzzle = currentList[currentIndex] || currentList[0];

  // Board state: current FEN string
  const [currentFen, setCurrentFen] = useState<string>(activePuzzle.fen);
  
  // Interaction state
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [solutionStepIndex, setSolutionStepIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'none' | 'correct' | 'wrong'; message: string }>({
    type: 'none',
    message: ''
  });
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sync index on type change
  useEffect(() => {
    const idx = puzzleType === 'mate1' ? progress.lastActiveMate1 || 0 : progress.lastActiveMate2 || 0;
    setCurrentIndex(idx);
  }, [puzzleType]);

  // Reset board on puzzle change
  useEffect(() => {
    setCurrentFen(activePuzzle.fen);
    setSelectedSquare(null);
    setSolutionStepIndex(0);
    setFeedback({ type: 'none', message: '' });
    setShowHint(false);

    // Save active puzzle index in progress
    setProgress(prev => {
      const updated = {
        ...prev,
        [puzzleType === 'mate1' ? 'lastActiveMate1' : 'lastActiveMate2']: currentIndex
      };
      localStorage.setItem('kingstars_chess_progress', JSON.stringify(updated));
      return updated;
    });
  }, [currentIndex, activePuzzle.id]);

  const isSolved = (puzzleType === 'mate1' ? progress.mate1Solved : progress.mate2Solved).includes(activePuzzle.number);

  // Restart puzzle
  const handleRestart = () => {
    setCurrentFen(activePuzzle.fen);
    setSelectedSquare(null);
    setSolutionStepIndex(0);
    setFeedback({ type: 'none', message: '' });
    setShowHint(false);
    soundFX.playMove();
  };

  // Previous puzzle
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Next puzzle
  const handleNext = () => {
    if (currentIndex < currentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle Square Click for piece selection & move attempt
  const handleSquareClick = (squareName: string, piece: string | null) => {
    if (feedback.type === 'correct') return; // Puzzle already completed

    const expectedStep = activePuzzle.solution[solutionStepIndex];
    if (!expectedStep) return;

    // 1. If no square selected yet, select a piece matching turn
    if (!selectedSquare) {
      if (piece) {
        const isWhiteTurn = activePuzzle.turn === 'w';
        const isPieceWhite = isWhitePiece(piece);
        if ((isWhiteTurn && isPieceWhite) || (!isWhiteTurn && !isPieceWhite)) {
          setSelectedSquare(squareName);
          soundFX.playMove();
        }
      }
      return;
    }

    // 2. If same square clicked again, deselect
    if (selectedSquare === squareName) {
      setSelectedSquare(null);
      return;
    }

    // 3. Evaluate move attempt from selectedSquare to squareName
    const from = selectedSquare;
    const to = squareName;

    if (from === expectedStep.from && to === expectedStep.to) {
      // CORRECT MOVE!
      soundFX.playMove();

      // Apply White's move to FEN
      const fenAfterWhiteMove = applyMoveToFen(currentFen, from, to);
      setCurrentFen(fenAfterWhiteMove);
      setSelectedSquare(null);

      // Check if more moves required in solution (e.g. Mate in 2)
      if (solutionStepIndex + 1 < activePuzzle.solution.length) {
        // Move 1 complete!
        setSolutionStepIndex(solutionStepIndex + 1);
        setFeedback({
          type: 'none',
          message: 'Great move! Black responds... now find the final checkmate move!'
        });

        // Auto execute Black's response after 600ms if defined
        if (activePuzzle.blackResponse) {
          setTimeout(() => {
            setCurrentFen(prevFen => {
              const fenAfterBlack = applyMoveToFen(prevFen, activePuzzle.blackResponse!.from, activePuzzle.blackResponse!.to);
              return fenAfterBlack;
            });
            soundFX.playCapture();
          }, 600);
        } else {
          setTimeout(() => {
            soundFX.playCapture();
          }, 600);
        }

      } else {
        // FINAL CHECKMATE STEP REACHED!
        soundFX.playCorrect();
        setFeedback({
          type: 'correct',
          message: `CHECKMATE! Excellent tactical vision! +${puzzleType === 'mate1' ? 10 : 20} Points`
        });

        // Update progress & localStorage
        setProgress(prev => {
          const solvedList = puzzleType === 'mate1' ? prev.mate1Solved : prev.mate2Solved;
          if (!solvedList.includes(activePuzzle.number)) {
            const newSolvedList = [...solvedList, activePuzzle.number];
            const pointValue = puzzleType === 'mate1' ? 10 : 20;
            const updated: UserProgress = {
              ...prev,
              score: prev.score + pointValue,
              [puzzleType === 'mate1' ? 'mate1Solved' : 'mate2Solved']: newSolvedList
            };
            localStorage.setItem('kingstars_chess_progress', JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      }

    } else {
      // INCORRECT MOVE
      soundFX.playWrong();
      setSelectedSquare(null);
      setFeedback({
        type: 'wrong',
        message: 'Incorrect move. Try again or click Hint for guidance!'
      });
    }
  };

  const boardMatrix = fenToBoard(currentFen);
  const solvedCount = (puzzleType === 'mate1' ? progress.mate1Solved : progress.mate2Solved).length;
  const progressPercent = Math.round((solvedCount / 100) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Mode Selector */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold text-amber-300">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span>Interactive Chess Tactical Arena</span>
        </div>
        <h2 className="font-serif-title text-2xl font-black text-white sm:text-3xl">
          Chess Puzzles
        </h2>
        
        {/* Mate in 1 / Mate in 2 Toggle Tabs */}
        <div className="flex rounded-2xl border border-amber-500/30 bg-slate-900/90 p-1.5 shadow-lg">
          <button
            onClick={() => setPuzzleType('mate1')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              puzzleType === 'mate1'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>100 Mate in 1</span>
          </button>

          <button
            onClick={() => setPuzzleType('mate2')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              puzzleType === 'mate2'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>100 Mate in 2</span>
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="rounded-2xl border border-slate-800 bg-[#131b2e] p-4 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 text-amber-400">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            {puzzleType === 'mate1' ? 'Mate in 1 Progress' : 'Mate in 2 Progress'}: {solvedCount} / 100 Solved
          </span>
          <span className="text-amber-300 font-extrabold">{progressPercent}% Completed</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* PUZZLE BOARD CONTAINER */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* LEFT / TOP: Puzzle Header Controls & Board (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-4">
          
          <div className="flex w-full max-w-md items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-3">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-extrabold text-amber-400 border border-amber-500/30">
                Puzzle #{activePuzzle.number}
              </span>
              <span className="text-xs font-bold text-white">
                {activePuzzle.turn === 'w' ? '⚪ White to Move' : '⚫ Black to Move'}
              </span>
            </div>

            {/* Jump Selector Dropdown */}
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-amber-300 focus:outline-none"
            >
              {currentList.map((p, idx) => (
                <option key={p.id} value={idx}>
                  #{p.number} {(puzzleType === 'mate1' ? progress.mate1Solved : progress.mate2Solved).includes(p.number) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* 8x8 PUZZLE CHESSBOARD */}
          <div className="w-full max-w-md rounded-2xl border-2 border-amber-500/40 bg-[#131b2e] p-3 shadow-2xl space-y-3">
            
            <div className="grid grid-cols-8 grid-rows-8 gap-0 rounded-xl overflow-hidden border border-slate-700">
              {boardMatrix.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const isLightSquare = (rIdx + cIdx) % 2 === 0;
                  const sqName = cell.square;
                  const isSelected = selectedSquare === sqName;
                  const hintTarget = showHint && activePuzzle.solution[solutionStepIndex]?.from === sqName;

                  return (
                    <div
                      key={sqName}
                      onClick={() => handleSquareClick(sqName, cell.piece)}
                      className={`relative flex aspect-square cursor-pointer items-center justify-center transition-all ${
                        isLightSquare ? 'bg-[#e2e8f0]' : 'bg-[#334155]'
                      } ${isSelected ? 'ring-4 ring-amber-400 ring-inset bg-amber-200/90' : ''} ${
                        hintTarget ? 'ring-4 ring-emerald-400 ring-inset bg-emerald-300/80 animate-pulse' : ''
                      }`}
                    >
                      {/* Coordinates */}
                      {cIdx === 0 && (
                        <span className={`absolute left-0.5 top-0.5 text-[8px] font-bold ${isLightSquare ? 'text-slate-500' : 'text-slate-400'}`}>
                          {8 - rIdx}
                        </span>
                      )}
                      {rIdx === 7 && (
                        <span className={`absolute right-0.5 bottom-0.5 text-[8px] font-bold ${isLightSquare ? 'text-slate-500' : 'text-slate-400'}`}>
                          {String.fromCharCode(97 + cIdx)}
                        </span>
                      )}

                      {/* Piece Symbol */}
                      {cell.piece && (
                        <span
                          className={`text-3xl font-black filter select-none transition-transform active:scale-110 ${
                            isWhitePiece(cell.piece)
                              ? 'text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                              : 'text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]'
                          }`}
                        >
                          {getPieceSymbol(cell.piece)}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Feedback Message Banner */}
            {feedback.message && (
              <div
                className={`flex items-center gap-2 rounded-xl p-3 text-xs font-bold ${
                  feedback.type === 'correct'
                    ? 'border border-emerald-500/40 bg-emerald-950/80 text-emerald-300 shadow-md'
                    : feedback.type === 'wrong'
                    ? 'border border-rose-500/40 bg-rose-950/80 text-rose-300'
                    : 'border border-amber-500/30 bg-amber-950/40 text-amber-300'
                }`}
              >
                {feedback.type === 'correct' ? (
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>

              <button
                onClick={() => setShowHint(true)}
                className="flex items-center justify-center gap-1 rounded-xl border border-amber-500/40 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Hint</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === currentList.length - 1}
                className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT: Puzzle Information, Explanation & Solved Badge (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="rounded-2xl border border-amber-500/30 bg-[#131b2e] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title text-base font-bold text-white">
                {activePuzzle.title}
              </h3>
              {isSolved && (
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-extrabold text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Solved</span>
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                <p className="font-bold text-amber-400">Objective:</p>
                <p>
                  Find the winning sequence for <span className="font-bold text-white">{activePuzzle.turn === 'w' ? 'White' : 'Black'}</span> to deliver Checkmate in {puzzleType === 'mate1' ? '1 Move' : '2 Moves'}!
                </p>
              </div>

              {showHint && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 space-y-1 text-amber-200">
                  <p className="font-bold text-amber-400 flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5" /> Hint:
                  </p>
                  <p>{activePuzzle.hint}</p>
                </div>
              )}

              {feedback.type === 'correct' && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 space-y-1 text-emerald-200">
                  <p className="font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Tactical Breakdown:
                  </p>
                  <p>{activePuzzle.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400 space-y-2">
            <p className="font-bold text-amber-300">💡 Mobile Tip:</p>
            <p>Tap a piece to select it, then tap the target square to make a move. Progress is saved automatically in your phone’s localStorage!</p>
          </div>

        </div>

      </div>

    </div>
  );
};
