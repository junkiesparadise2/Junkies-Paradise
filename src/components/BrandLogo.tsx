import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "full-light";
}

export default function BrandLogo({ className = "", size = "md", variant = "full" }: BrandLogoProps) {
  // Height and Width dimensions depending on size
  const dimensions = {
    sm: { iconWidth: 40, iconHeight: 40, fullWidth: 150, fullHeight: 60 },
    md: { iconWidth: 80, iconHeight: 80, fullWidth: 260, fullHeight: 110 },
    lg: { iconWidth: 160, iconHeight: 160, fullWidth: 420, fullHeight: 190 },
  };

  const curr = dimensions[size];
  const isLight = variant === "full-light";
  const mainStroke = isLight ? "#FFFFFF" : "#002347";

  // Shared JP SVG Monogram Drawing
  const renderMockupLogo = (
    <g id="jp-monogram-paths">
      {/* J Character - Serif Typography Style */}
      <path
        d="M 32,23 L 64,23 L 64,28 L 54,28 L 54,64 C 54,73 48,77 41,77 C 33,77 28,73 28,68 C 28,64 31,62 34,62 C 37,62 39,64 41,66 C 43,68 45,69 47,69 C 50,69 51,66 51,61 L 51,28 L 41,28 Z"
        fill={mainStroke}
      />
      
      {/* P Character - Serif Typography Style */}
      <path
        d="M 72,23 L 108,23 C 124,23 133,30 133,40 C 133,50 123,55 107,55 L 85,55 L 85,73 L 90,73 L 90,78 L 68,78 L 68,73 L 72,73 Z M 85,28 L 85,50 L 106,50 C 117,50 122,46 122,39 C 122,31 116,28 106,28 Z"
        fill={mainStroke}
        fillRule="evenodd"
      />

      {/* Golden Yellow Airplane soaring on 'J' with a clean contrast cutout */}
      <g transform="translate(42, 32) rotate(-16) scale(0.66)">
        <path
          d="M 4,14 L 14,14 L 28,1 L 33,1 L 25,14 L 40,14 L 44,9 L 47,9 L 44,16 L 47,23 L 44,23 L 40,18 L 25,18 L 33,31 L 28,31 L 14,18 L 4,18 C 1,18 0,17 0,16 C 0,15 1,14 4,14 Z"
          fill="#FFBF00"
          stroke={isLight ? "#002347" : "#002347"}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Core airplane fill */}
        <path
          d="M 4,14 L 14,14 L 28,1 L 33,1 L 25,14 L 40,14 L 44,9 L 47,9 L 44,16 L 47,23 L 44,23 L 40,18 L 25,18 L 33,31 L 28,31 L 14,18 L 4,18 C 1,18 0,17 0,16 C 0,15 1,14 4,14 Z"
          fill="#FFBF00"
        />
      </g>

      {/* Golden Yellow Pin pointing at the bottom foot of 'P' with cutout */}
      <g transform="translate(85, 75) scale(0.72)">
        <path
          d="M 0,0 C -6,-6 -10,-12 -10,-18 C -10,-24 -5,-28 0,-28 C 5,-28 10,-24 10,-18 C 10,-12 6,-6 0,0 Z"
          fill="#FFBF00"
          stroke={isLight ? "#0d3257" : "#002347"}
          strokeWidth="2"
        />
        <circle cx="0" cy="-18" r="3" fill="#002347" />
      </g>
    </g>
  );

  if (variant === "icon") {
    return (
      <svg
        width={curr.iconWidth}
        height={curr.iconHeight}
        viewBox="26 15 110 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
      >
        {renderMockupLogo}
      </svg>
    );
  }

  return (
    <svg
      width={curr.fullWidth}
      height={curr.fullHeight}
      viewBox="0 0 170 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      {/* Render Monogram inside full layout */}
      {renderMockupLogo}

      {/* "JUNKIES PARADISE" text row */}
      <text
        x="85"
        y="112"
        textAnchor="middle"
        fill={isLight ? "#FFBF00" : "#002347"}
        fontSize="10"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="3.4"
      >
        JUNKIES PARADISE
      </text>

      {/* "Explore more. Worry less." tagline */}
      <text
        x="85"
        y="131"
        textAnchor="middle"
        fill={isLight ? "#F1F5F9" : "#002347"}
        fontSize="8"
        fontStyle="italic"
        fontFamily="serif, Playfair Display"
        letterSpacing="0.8"
      >
        Explore more. Worry less.
      </text>
    </svg>
  );
}
