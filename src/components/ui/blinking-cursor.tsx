export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <span
      className={`animate-cursor-blink select-none${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      _
    </span>
  );
}
