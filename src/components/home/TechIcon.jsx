/**
 * Brand marks for the stack marquee.
 * Consistent 24 viewBox, currentColor, crisp at small sizes.
 */
const TechIcon = ({ id, className = "" }) => {
  const props = {
    className: `site-tech-svg ${className}`.trim(),
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: "false",
  };

  switch (id) {
    case "react":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="2.15" fill="currentColor" />
          <g
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            fill="none"
          >
            <ellipse cx="12" cy="12" rx="9.5" ry="3.65" />
            <ellipse
              cx="12"
              cy="12"
              rx="9.5"
              ry="3.65"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="9.5"
              ry="3.65"
              transform="rotate(120 12 12)"
            />
          </g>
        </svg>
      );

    case "typescript":
      return (
        <svg {...props}>
          <rect
            x="3.25"
            y="3.25"
            width="17.5"
            height="17.5"
            rx="2.25"
            fill="currentColor"
            opacity="0.14"
          />
          <rect
            x="3.25"
            y="3.25"
            width="17.5"
            height="17.5"
            rx="2.25"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            fill="currentColor"
            d="M7.9 15.35V9.15h3.05v1.15H9.15v5.05H7.9zm5.05.2c-1.12 0-1.88-.48-2.28-1.22l1.18-.68c.22.4.58.66 1.08.66.5 0 .82-.24.82-.62 0-.4-.26-.58-1.08-.88l-.38-.14c-1.2-.42-1.98-1.06-1.98-2.2 0-1.18.94-2.04 2.28-2.04 1 0 1.72.36 2.18 1.06l-1.12.72c-.22-.34-.52-.5-.98-.5-.44 0-.72.22-.72.54 0 .36.26.54 1.02.82l.38.14c1.36.48 2.1 1.12 2.1 2.3 0 1.34-1.02 2.14-2.42 2.14z"
          />
        </svg>
      );

    case "nodejs":
      return (
        <svg {...props}>
          <path
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
            d="M12 2.85 4.35 7.2v9.6L12 21.15l7.65-4.35V7.2L12 2.85z"
          />
          <path
            fill="currentColor"
            d="M10.85 8.55h1.7v5.85c0 1.05-.42 1.7-1.55 1.7-.48 0-.9-.1-1.22-.28l.38-1.28c.18.1.4.16.65.16.42 0 .7-.22.7-.78V8.55z"
          />
        </svg>
      );

    case "python":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M12.05 3.2c-2.55 0-2.4 1.1-2.4 1.1v1.15h2.45v.35H7.55S5.2 5.65 5.2 9.2s1.65 3.55 1.65 3.55h1v-1.7s0-1.65 1.8-1.65h3.1s1.75 0 1.75-1.7V4.7s.1-1.5-2.45-1.5zm-1.45 1.15c.38 0 .68.3.68.68s-.3.68-.68.68-.68-.3-.68-.68.3-.68.68-.68z"
          />
          <path
            fill="currentColor"
            opacity="0.72"
            d="M11.95 20.8c2.55 0 2.4-1.1 2.4-1.1v-1.15h-2.45v-.35h4.55s2.35.15 2.35-3.4-1.65-3.55-1.65-3.55h-1v1.7s0 1.65-1.8 1.65h-3.1s-1.75 0-1.75 1.7v3.1s-.1 1.4 2.45 1.4zm1.45-1.15c-.38 0-.68-.3-.68-.68s.3-.68.68-.68.68.3.68.68-.3.68-.68.68z"
          />
        </svg>
      );

    case "nextjs":
      return (
        <svg {...props}>
          <circle
            cx="12"
            cy="12"
            r="9.15"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            fill="currentColor"
            d="M9.05 7.35h1.7l4.85 9.35h-1.85L9.05 7.35z"
          />
          <path fill="currentColor" d="M15.55 7.35H17.2v9.35h-1.65z" />
        </svg>
      );

    case "flutter":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="m14.35 2.9-9.1 9.1 3.25 3.25L17.75 5.95 20.1 2.9H14.35z"
          />
          <path
            fill="currentColor"
            opacity="0.7"
            d="m14.35 12.35-3.4 3.4 3.4 3.4h6.45l-3.25-3.25 3.25-3.55H14.35z"
          />
        </svg>
      );

    case "aws":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M6.55 7.1h1.6l1.1 4.55 1.4-4.55h1.55l1.5 4.6 1.15-4.6H16.5l-2.35 7.4h-1.55l-1.55-4.75-1.55 4.75H7.95L6.55 7.1zm10.7 0H22v1.3h-3.05v1.6h2.75v1.25h-2.75V13h3.15v1.3h-4.85V7.1z"
          />
          <path
            fill="currentColor"
            d="M7.35 15.55c.95.6 2.2 1.05 3.55 1.05 1.65 0 3-.55 3.75-1.35.12-.12.28-.1.25.1-.4 2.1-2.1 3.05-4.05 3.05-1.8 0-3.35-.75-4.1-1.85-.1-.14.05-.28.2-.2.15.08.28.18.4.35z"
          />
          <path
            fill="currentColor"
            d="M17.55 14.95c-.38-.12-.65-.05-.75.12-.1.14-.14.38-.1.6.1.38.28.7.6.92.6.42 1.55.58 2.35.32.22-.08.38.12.22.26-.9.75-2.4.9-3.45.38-.9-.42-1.42-1.28-1.32-2.28.08-.75.52-1.22 1.28-1 .58.16 1.12.48 1.28.9.08.2-.05.38-.24.28l-.87-.5z"
          />
        </svg>
      );

    case "docker":
      return (
        <svg {...props}>
          <g fill="currentColor">
            <rect x="3.8" y="12.05" width="2.15" height="2.15" rx="0.25" />
            <rect x="6.4" y="12.05" width="2.15" height="2.15" rx="0.25" />
            <rect x="9" y="12.05" width="2.15" height="2.15" rx="0.25" />
            <rect x="11.6" y="12.05" width="2.15" height="2.15" rx="0.25" />
            <rect x="6.4" y="9.45" width="2.15" height="2.15" rx="0.25" />
            <rect x="9" y="9.45" width="2.15" height="2.15" rx="0.25" />
            <rect x="11.6" y="9.45" width="2.15" height="2.15" rx="0.25" />
            <rect x="14.2" y="9.45" width="2.15" height="2.15" rx="0.25" />
            <rect x="9" y="6.85" width="2.15" height="2.15" rx="0.25" />
            <rect x="11.6" y="6.85" width="2.15" height="2.15" rx="0.25" />
          </g>
          <path
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            d="M3.4 15.05c.35 2.05 1.95 3.55 4.85 3.55 3.95 0 6.85-1.7 8.2-4.7"
          />
          <path
            fill="currentColor"
            d="M19.95 11.05c-.35-.2-.95-.22-1.35-.1-.08-.55-.32-1.05-.72-1.42l-.22-.18-.18.22c-.38.48-.48 1.25-.25 1.82-.28.14-.5.38-.5.72 0 .55.6.98 1.55 1.12 1.2.18 2.32-.18 2.65-1.02.05-.12.05-.22 0-.28-.05-.1-.12-.15-.18-.18-.25-.15-.52-.22-.8-.28z"
          />
        </svg>
      );

    case "kubernetes":
      return (
        <svg {...props}>
          <path
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            d="M12 2.9 5.1 6.35v6.85c0 2.7 2.45 5.2 6.9 7.05 4.45-1.85 6.9-4.35 6.9-7.05V6.35L12 2.9z"
          />
          <circle cx="12" cy="12" r="1.45" fill="currentColor" />
          <g
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          >
            <path d="M12 7.2v1.85M12 15v1.85M8.1 9.55l1.6.95M14.3 13.5l1.6.95M15.9 9.55l-1.6.95M9.7 13.5l-1.6.95" />
          </g>
        </svg>
      );

    case "postgres":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M12.7 3.35c-2.15 0-3.9 1-4.4 2.45-.15.4-.2.8-.2 1.15v1.25c.55-.32 1.5-.65 2.75-.65 2.75 0 4.55 1.15 4.55 3.4 0 .12 0 .28-.02.42h1c.9 0 1.5-.52 1.5-1.4 0-2.75-2.25-4.85-5.18-5.62z"
          />
          <path
            fill="currentColor"
            opacity="0.8"
            d="M8.2 8.35c-1.78.15-3.05 1.1-3.05 2.72 0 1.95 1.62 3.05 4.35 3.4l.52.05v1.75c0 .9.38 1.35 1.15 1.35.32 0 .65-.1.9-.28v-4.65c0-1.78-1-2.85-2.95-3.05-.3-.05-.62-.1-.92-.1v-.19z"
          />
          <path
            fill="currentColor"
            d="M13.5 11.05c-1.48 0-2.45.68-2.45 1.88v5.1c.32.18.75.32 1.25.32 1.48 0 2.35-.8 2.35-2.45v-3.15c0-.92-.48-1.7-1.15-1.7z"
          />
        </svg>
      );

    case "mongodb":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M12.4 2.7s3.85 3.25 3.85 8.15c0 3.45-1.65 5.55-3.25 6.65l-.55.4.05-15.2h-.1z"
          />
          <path
            fill="currentColor"
            opacity="0.65"
            d="M11.6 2.7S7.75 5.95 7.75 10.85c0 3.45 1.65 5.55 3.25 6.65l.55.4V2.7h.05z"
          />
          <path
            fill="currentColor"
            d="M12 20.35v1.05c0 .18-.08.28-.22.22-.32-.12-.65-.5-.85-1.05.32.08.7.12 1.07-.22z"
          />
        </svg>
      );

    case "tailwind":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M12 6.35c-2.35 0-3.8 1.15-4.4 3.45.9-1.15 1.9-1.58 3.05-1.3.66.16 1.14.64 1.68 1.16.85.88 1.85 1.9 4.02 1.9 2.35 0 3.8-1.15 4.4-3.45-.9 1.15-1.9 1.58-3.05 1.3-.66-.16-1.14-.64-1.68-1.16C14.17 7.37 13.17 6.35 12 6.35zM7.65 12.35c-2.35 0-3.8 1.15-4.4 3.45.9-1.15 1.9-1.58 3.05-1.3.66.16 1.14.64 1.68 1.16.85.88 1.85 1.9 4.02 1.9 2.35 0 3.8-1.15 4.4-3.45-.9 1.15-1.9 1.58-3.05 1.3-.66-.16-1.14-.64-1.68-1.16-.85-.88-1.85-1.9-4.02-1.9z"
          />
        </svg>
      );

    case "figma":
      return (
        <svg {...props}>
          <path fill="currentColor" d="M8.35 2.85h3.55v5.55H8.35a2.775 2.775 0 1 1 0-5.55z" />
          <path
            fill="currentColor"
            opacity="0.78"
            d="M12 2.85h3.55a2.775 2.775 0 1 1 0 5.55H12V2.85z"
          />
          <path
            fill="currentColor"
            opacity="0.88"
            d="M8.35 8.4h3.55v5.55H8.35a2.775 2.775 0 0 1 0-5.55z"
          />
          <path
            fill="currentColor"
            opacity="0.62"
            d="M12 8.4h3.55a2.775 2.775 0 1 1 0 5.55H12V8.4z"
          />
          <path
            fill="currentColor"
            opacity="0.72"
            d="M8.35 13.95h3.55v2.775a2.775 2.775 0 1 1-3.55-2.775z"
          />
        </svg>
      );

    case "openai":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M21.05 10.45a4.9 4.9 0 0 0-2.65-5.7 4.95 4.95 0 0 0-5.3-1.1 4.95 4.95 0 0 0-7.45 1.5 4.9 4.9 0 0 0-3.25 4.7 4.9 4.9 0 0 0 1.82 5.7 4.95 4.95 0 0 0 5.3 1.1 4.95 4.95 0 0 0 7.45-1.5 4.9 4.9 0 0 0 4.08-4.7zm-8.35 7.55c-.85 0-1.65-.28-2.3-.8l.12-.07 2.55-1.48a.42.42 0 0 0 .2-.36v-3.55l2.25 1.3v2.7c0 1.58-1.25 2.88-2.82 3.26zm-6.3-2.7a2.9 2.9 0 0 1-1.08-3.85l.12.08 2.55 1.48c.13.07.28.07.4 0l3.1-1.78v2.62l-2.55 1.48a2.9 2.9 0 0 1-2.54.05zm-.7-5.85c.42-.75 1.12-1.28 1.98-1.42v2.95c0 .14.07.28.2.36l3.1 1.78-2.25 1.3-2.55-1.48a2.9 2.9 0 0 1-.48-4.49zm10.55 2.45-3.1-1.78 2.25-1.3 2.55 1.48c1.28.74 1.7 2.35.95 3.62-.42.75-1.12 1.28-1.98 1.42v-2.95a.42.42 0 0 0-.2-.36zm1.28-3.9-.12-.08-2.55-1.48a.42.42 0 0 0-.4 0l-3.1 1.78V5.5l2.55-1.48a2.9 2.9 0 0 1 3.95 1.28c.48.85.48 1.85-.05 2.7zM10.05 12.65l-2.25-1.3v-2.7c0-1.6 1.32-2.9 2.95-2.9.8 0 1.55.28 2.12.8l-.12.07-2.55 1.48a.42.42 0 0 0-.2.36v3.55l-.95.64z"
            clipRule="evenodd"
          />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle
            cx="12"
            cy="12"
            r="8.2"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        </svg>
      );
  }
};

export default TechIcon;
