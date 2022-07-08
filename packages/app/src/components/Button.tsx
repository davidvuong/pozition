import { PropsWithChildren } from 'react';
import './Button.css';

export default function Button({
  onClick,
  className,
  children,
}: PropsWithChildren<{ onClick: () => void; className?: string }>) {
  return (
    <button onClick={onClick} className={`defaultButton ${className}`}>
      <div className="defaultButtonText">{children}</div>
    </button>
  );
}
