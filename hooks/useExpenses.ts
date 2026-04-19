// Hook for fetching and managing expenses

export function useExpenses() {
  // TODO: Implement with SWR or React Query
  // Fetch from /api/expenses
  return {
    expenses: [],
    isLoading: false,
    error: null,
    refresh: () => {},
  };
}
