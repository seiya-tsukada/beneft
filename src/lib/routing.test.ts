import { describe, expect, it } from 'vitest';
import { resolveScreen } from './routing';

const answered = { q1: 'low_usage', q2: 'engagement', q3: 'remote_work' };
const lead = { company: 'A社', name: '山田', email: 'a@example.com', position: 'その他' };

describe('resolveScreen', () => {
  it('maps known paths', () => {
    expect(resolveScreen('/', {}, null)).toBe('hero');
    expect(resolveScreen('/quiz', {}, null)).toBe('quiz');
    expect(resolveScreen('/result', answered, null)).toBe('result');
    expect(resolveScreen('/thanks', answered, lead)).toBe('thanks');
  });

  it('falls back when the screen is missing its data', () => {
    expect(resolveScreen('/result', { q1: 'low_usage' }, null)).toBe('hero');
    expect(resolveScreen('/thanks', answered, null)).toBe('result');
    expect(resolveScreen('/thanks', {}, null)).toBe('hero');
    expect(resolveScreen('/unknown', answered, lead)).toBe('hero');
  });
});
