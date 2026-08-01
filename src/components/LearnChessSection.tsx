import React, { useState } from 'react';
import { CHESS_LESSONS } from '../data/lessons';
import { LessonPiece, PieceType } from '../types';
import { fenToBoard, squareToCoords, soundFX } from '../utils/chessEngine';
import { Crown, Sparkles, HelpCircle, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export const LearnChessSection: React.FC = () => {
  const [selectedPieceId, setSelectedPieceId] = useState<PieceType>('king');
  
  const currentLesson: LessonPiece = CHESS_LESSONS.find(l => l.id === selectedPieceId) || CHESS_LESSONS[0];
  
  // Interactive test board state
  const [activeSquare, setActiveSquare] = useState<string>(currentLesson.demoPieceSquare);

  const handleSelectPiece = (pieceId: PieceType) => {
    setSelectedPieceId(pieceId);
    const lesson = CHESS_LESSONS.find(l => l.id === pieceId);
    if (lesson) {
      setActiveSquare(lesson.demoPieceSquare);
    }
  };

  const handleSquareClick = (square: string) => {
    // If clicked on current allowed destination, move piece there with sound!
    if (currentLesson.allowedSquares.includes(square)) {
      setActiveSquare(square);
      soundFX.playMove();
    }
  };

  const resetBoard = () => {
    setActiveSquare(currentLesson.demoPieceSquare);
    soundFX.playMove();
  };

  // Build 8x8 demo board matrix
  const baseBoard = fenToBoard(currentLesson.demoFen);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Interactive Academy Curriculum</span>
        </div>
        <h2 className="font-serif-title text-2xl font-black text-white sm:text-3xl">
          Learn How the Chess Pieces Move
        </h2>
        <p className="mx-auto max-w-xl text-xs text-slate-300 sm:text-sm">
          Select any piece below to explore its movement rules, strategic value, and test it live on the interactive chessboard!
        </p>
      </div>

      {/* PIECE SELECTOR TABS */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {CHESS_LESSONS.map((lesson) => {
          const isSelected = lesson.id === selectedPieceId;
          return (
            <button
              key={lesson.id}
              onClick={() => handleSelectPiece(lesson.id)}
              className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/40'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-3xl sm:text-4xl">{lesson.symbol}</span>
              <span className="mt-1 text-xs font-bold">{lesson.name}</span>
            </button>
          );
        })}
      </div>

      {/* LESSON DISPLAY CARD & INTERACTIVE BOARD GRID */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Piece Rules & Kid Tips (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Piece Header Info */}
          <div className="rounded-2xl border border-amber-500/30 bg-[#131b2e] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-slate-900 text-4xl text-amber-400 shadow-md">
                  {currentLesson.symbol}
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-extrabold text-white sm:text-2xl">
                    {currentLesson.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-300">
                    Value: {currentLesson.value}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/20">
                {currentLesson.tagline}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
              {currentLesson.description}
            </p>
          </div>

          {/* Movement Rules */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <h4 className="flex items-center gap-2 font-serif-title text-sm font-bold text-amber-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>How {currentLesson.name} Moves:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
              {currentLesson.movementRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kid Friendly Explanations */}
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-5 space-y-3">
            <h4 className="flex items-center gap-2 font-serif-title text-sm font-bold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>Simple Tips for Kids:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-200 sm:text-sm">
              {currentLesson.kidTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Board (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-[#131b2e] p-4 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif-title text-sm font-bold text-white">
                  Interactive Test Board
                </h4>
                <p className="text-[10px] text-slate-400">
                  Tap highlighted gold squares to test moves!
                </p>
              </div>

              <button
                onClick={resetBoard}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* 8x8 CHESSBOARD */}
            <div className="grid grid-cols-8 grid-rows-8 gap-0 rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-inner">
              {baseBoard.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const isLightSquare = (rIdx + cIdx) % 2 === 0;
                  const sqName = cell.square;
                  const isPieceHere = sqName === activeSquare;
                  const isAllowedSquare = currentLesson.allowedSquares.includes(sqName);

                  return (
                    <div
                      key={sqName}
                      onClick={() => handleSquareClick(sqName)}
                      className={`relative flex aspect-square items-center justify-center transition-all ${
                        isLightSquare ? 'bg-[#e2e8f0]' : 'bg-[#334155]'
                      } ${isAllowedSquare ? 'cursor-pointer hover:bg-amber-300/80 ring-2 ring-amber-400 ring-inset' : ''}`}
                    >
                      {/* Square Coordinate Label */}
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

                      {/* Render Piece or Highlight Dot */}
                      {isPieceHere ? (
                        <span className="text-3xl font-black text-slate-950 drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] select-none">
                          {currentLesson.symbol}
                        </span>
                      ) : isAllowedSquare ? (
                        <div className="h-3.5 w-3.5 rounded-full bg-amber-500 animate-pulse ring-2 ring-amber-300 shadow-md"></div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>

            {/* Board Instruction Footer */}
            <div className="rounded-xl bg-slate-900/80 p-3 text-center text-[11px] text-amber-300/90 font-medium">
              ✨ Gold pulsing dots highlight legal movement squares for the <span className="font-bold text-amber-400">{currentLesson.name}</span>.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
