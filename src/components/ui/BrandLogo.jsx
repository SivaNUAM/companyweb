/**
 * Crisp vector Nuam lockup — icon + wordmark (no raster blur).
 * @param {"light"|"dark"} tone - light = white (on dark UI), dark = ink (on light UI)
 * @param {"header"|"footer"|"loader"} size
 */
const BrandLogo = ({ tone = "dark", size = "header", className = "" }) => {
  const fill = tone === "light" ? "#ffffff" : "#0b0b0b";
  const sizeClass =
    size === "loader"
      ? "h-28 w-auto md:h-36 lg:h-40"
      : size === "footer"
        ? "h-16 w-auto md:h-20"
        : "h-[3.25rem] w-auto md:h-16";

  // Manual letter positions — avoids SVG letterSpacing clipping the first glyph
  const letters = [
    { char: "N", x: 28 },
    { char: "U", x: 78 },
    { char: "A", x: 128 },
    { char: "M", x: 178 },
  ];

  return (
    <svg
      viewBox="0 0 240 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} shrink-0 overflow-visible ${className}`}
      role="img"
      aria-label="Nuam"
    >
      <title>Nuam</title>

      {/* Icon — centered */}
      <g fill={fill} transform="translate(120 6)">
        <path d="M0 2L26 26.5H18.8L0 10.4L-18.8 26.5H-26L0 2Z" />
        <path d="M0 20L26 44.5H18.8L0 28.4L-18.8 44.5H-26L0 20Z" />
        <path d="M0 48L8.2 56.2L0 64.4L-8.2 56.2L0 48Z" />
      </g>

      {/* Wordmark — per-letter so nothing clips */}
      {letters.map(({ char, x }) => (
        <text
          key={char}
          x={x}
          y="118"
          textAnchor="middle"
          fill={fill}
          fontFamily="Syne, DM Sans, Arial Black, Arial, sans-serif"
          fontWeight="800"
          fontSize="40"
        >
          {char}
        </text>
      ))}
    </svg>
  );
};

export default BrandLogo;
