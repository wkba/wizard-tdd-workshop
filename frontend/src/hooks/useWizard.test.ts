import { renderHook, act } from '@testing-library/react';
import { useWizard } from './useWizard';

describe('useWizard', () => {
  it('初期状態は全フィールドが空文字', () => {
    const { result } = renderHook(() => useWizard());

    expect(result.current.data).toEqual({
      name: '',
      email: '',
      phone: '',
      plan: '',
    });
  });

  it('update で部分的にデータを更新できる', () => {
    const { result } = renderHook(() => useWizard());

    act(() => {
      result.current.update({ name: '山田 太郎' });
    });

    expect(result.current.data.name).toBe('山田 太郎');
    expect(result.current.data.email).toBe('');
  });

  it('update すると sessionStorage に保存される', () => {
    const { result } = renderHook(() => useWizard());

    act(() => {
      result.current.update({ name: '山田 太郎', email: 'taro@example.com' });
    });

    const stored = JSON.parse(sessionStorage.getItem('wizardData')!);
    expect(stored.name).toBe('山田 太郎');
    expect(stored.email).toBe('taro@example.com');
  });

  it('sessionStorage にデータがあれば初期状態として読み込まれる', () => {
    sessionStorage.setItem('wizardData', JSON.stringify({
      name: '佐藤 花子',
      email: 'hanako@example.com',
      phone: '080-9876-5432',
      plan: 'premium',
    }));

    const { result } = renderHook(() => useWizard());

    expect(result.current.data.name).toBe('佐藤 花子');
    expect(result.current.data.plan).toBe('premium');
  });

  it('clear で sessionStorage とデータがリセットされる', () => {
    const { result } = renderHook(() => useWizard());

    act(() => {
      result.current.update({ name: '山田 太郎', plan: 'basic' });
    });
    act(() => {
      result.current.clear();
    });

    expect(result.current.data).toEqual({
      name: '',
      email: '',
      phone: '',
      plan: '',
    });
    expect(sessionStorage.getItem('wizardData')).toBeNull();
  });
});
