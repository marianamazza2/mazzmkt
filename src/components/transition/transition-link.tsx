import { Link } from "@tanstack/react-router";
import { useTransition } from "./transition-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LinkProps = any;

export function TransitionLink({ children, onClick, ...props }: LinkProps) {
  const { navigateWithTransition, isTransitioning } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning) return;

    const to = props.to as string;
    const params = props.params as Record<string, string> | undefined;
    navigateWithTransition(to, params);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
