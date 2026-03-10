import { Link } from "react-router-dom";

/**
 * Link that resets scroll to top on click, before navigation.
 * So the new page appears at the top with no visible "scroll back up".
 */
export function ScrollToTopLink({ onClick, ...props }) {
  const handleClick = (e) => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    onClick?.(e);
  };
  return <Link {...props} onClick={handleClick} />;
}
