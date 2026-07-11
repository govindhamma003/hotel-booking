const ScrollTo = ({ to, onScroll, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(to);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (onScroll) onScroll(e);
  };

  return (
    <a href={`#${to}`} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ScrollTo;