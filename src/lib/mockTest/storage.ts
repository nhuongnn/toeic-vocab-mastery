import { MockTestResult, MockTestSession } from '@/types/mockTest';

const RESULTS_STORAGE_KEY = 'toeic_mock_test_results_v1';
const ACTIVE_SESSION_PREFIX = 'toeic_mock_test_session_';

export function saveMockTestResult(result: MockTestResult): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getMockTestHistory();
    const updated = [result, ...existing.filter((r) => r.sessionId !== result.sessionId)].slice(0, 50);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save mock test result:', err);
  }
}

export function getMockTestHistory(): MockTestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load mock test history:', err);
    return [];
  }
}

export function getMockTestResultById(sessionId: string): MockTestResult | null {
  const history = getMockTestHistory();
  return history.find((r) => r.sessionId === sessionId) || null;
}

export function saveActiveSession(session: MockTestSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${ACTIVE_SESSION_PREFIX}${session.testId}`, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save active test session:', err);
  }
}

export function getActiveSession(testId: string): MockTestSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${ACTIVE_SESSION_PREFIX}${testId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearActiveSession(testId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${ACTIVE_SESSION_PREFIX}${testId}`);
  } catch {
    // ignore
  }
}
