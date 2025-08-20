import { useState, useEffect, useCallback } from 'react';

export const useLoadingState = (initialState = true, timeoutMs = 5000) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  // Auto-disable loading after timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        console.warn('Loading timeout reached, forcing completion');
        setLoading(false);
      }, timeoutMs);

      return () => clearTimeout(timer);
    }
  }, [loading, timeoutMs]);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setErrorState = useCallback((errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    setLoading(initialState);
    setError(null);
  }, [initialState]);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    reset
  };
};
