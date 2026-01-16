/**
 * Utility functions for tournament bracket generation and management
 */

/**
 * Organize matches by round (QF, SF, FINAL)
 */
export const organizeByRound = (matches) => {
  const organized = {
    QF: [],
    SF: [],
    FINAL: [],
  };

  matches.forEach((match) => {
    if (match.round === "QF") organized.QF.push(match);
    else if (match.round === "SF") organized.SF.push(match);
    else if (match.round === "FINAL") organized.FINAL.push(match);
  });

  return organized;
};

/**
 * Get winner team details
 */
export const getWinner = (match) => {
  if (match.winner) {
    return match.winner;
  }
  return null;
};

/**
 * Determine next round participants based on winners
 */
export const determineNextRound = (currentRoundMatches, nextRound) => {
  // QF winners go to SF
  // SF winners go to FINAL
  const nextRoundTeams = [];

  currentRoundMatches.forEach((match) => {
    if (match.winner) {
      nextRoundTeams.push(match.winner);
    }
  });

  return nextRoundTeams;
};

/**
 * Format bracket display
 */
export const formatBracketRound = (roundName) => {
  const names = {
    QF: "Quarter Finals",
    SF: "Semi Finals",
    FINAL: "Final",
  };
  return names[roundName] || roundName;
};

/**
 * Check if bracket is complete
 */
export const isBracketComplete = (matches) => {
  const byRound = organizeByRound(matches);
  
  // Must have final match with winner
  if (byRound.FINAL.length === 0) return false;
  return byRound.FINAL[0].winner !== null;
};
