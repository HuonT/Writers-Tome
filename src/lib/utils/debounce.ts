export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (options.trailing !== false && lastArgs) {
        func(...lastArgs);
        lastArgs = null;
      }
    };

    if (!timeout && options.leading !== false) {
      func(...args);
    } else {
      lastArgs = args;
    }

    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
  };
}