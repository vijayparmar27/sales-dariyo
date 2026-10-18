import type { SVGProps } from "react";

/**
 * High-fidelity, retina-crisp SVG packaging illustrations for the
 * fictional demonstration brand: NORTH & NOURISH (Artisan Roasters & Providore).
 *
 * Uses warm cream (#FDFBF7), forest green (#1E3A2F), espresso charcoal (#1A1412),
 * and metallic copper/gold (#C87D4B / #D4A373) to create a distinct luxury D2C brand
 * identity clearly differentiated from both Dariyo and the main sales platform.
 */

export function CoffeePouchSvg({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "w-full h-auto"}
      aria-label="North & Nourish Single-Origin Coorg Arabica Coffee Pouch"
      {...props}
    >
      <defs>
        {/* Pouch gradient & lighting */}
        <linearGradient id="pouchBody" x1="40" y1="20" x2="240" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2421" />
          <stop offset="40%" stopColor="#1C1715" />
          <stop offset="100%" stopColor="#0F0C0B" />
        </linearGradient>
        <linearGradient id="pouchHighlight" x1="40" y1="20" x2="80" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="50%" stopColor="white" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="copperFoil" x1="70" y1="100" x2="210" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E29D62" />
          <stop offset="50%" stopColor="#C87D4B" />
          <stop offset="100%" stopColor="#A05A2C" />
        </linearGradient>
        <linearGradient id="forestLabel" x1="60" y1="90" x2="220" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A2F" />
          <stop offset="100%" stopColor="#13271F" />
        </linearGradient>
        <filter id="pouchShadow" x="10" y="10" width="260" height="330" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Main Pouch Silhouette with Gusset */}
      <g filter="url(#pouchShadow)">
        {/* Top Seal Bar */}
        <path
          d="M60 22 C60 18, 64 16, 70 16 L210 16 C216 16, 220 18, 220 22 L224 38 L56 38 Z"
          fill="#1A1513"
          stroke="#3D3430"
          strokeWidth="1"
        />
        {/* Pouch Crimps */}
        <line x1="65" y1="20" x2="215" y2="20" stroke="#3D3430" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="65" y1="25" x2="215" y2="25" stroke="#3D3430" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="65" y1="30" x2="215" y2="30" stroke="#3D3430" strokeWidth="1" strokeDasharray="3 2" />

        {/* Pouch Main Body */}
        <path
          d="M56 38 L224 38 L238 290 C239 306, 228 316, 212 316 L68 316 C52 316, 41 306, 42 290 Z"
          fill="url(#pouchBody)"
        />

        {/* Realistic Highlights */}
        <path
          d="M56 38 L224 38 L238 290 C239 306, 228 316, 212 316 L68 316 C52 316, 41 306, 42 290 Z"
          fill="url(#pouchHighlight)"
        />

        {/* Side Gusset Folds */}
        <path d="M56 38 L72 316" stroke="#0B0908" strokeWidth="2" opacity="0.6" />
        <path d="M224 38 L208 316" stroke="#0B0908" strokeWidth="2" opacity="0.6" />

        {/* Degassing Aroma Valve */}
        <circle cx="140" cy="68" r="8" fill="#1C1816" stroke="#3A322D" strokeWidth="1.5" />
        <circle cx="140" cy="68" r="4" fill="#0E0C0B" />
        <circle cx="140" cy="68" r="1.5" fill="#3A322D" />

        {/* Label Container (Forest Green Craft Paper) */}
        <rect
          x="66"
          y="95"
          width="148"
          height="182"
          rx="6"
          fill="url(#forestLabel)"
          stroke="#C87D4B"
          strokeWidth="1.5"
        />

        {/* Label Inner Inset Border */}
        <rect
          x="72"
          y="101"
          width="136"
          height="170"
          rx="4"
          fill="none"
          stroke="#C87D4B"
          strokeWidth="0.75"
          strokeDasharray="4 2"
          opacity="0.8"
        />

        {/* Label Header */}
        <text
          x="140"
          y="122"
          textAnchor="middle"
          fill="#D4A373"
          fontSize="8"
          fontWeight="bold"
          letterSpacing="2.5"
          fontFamily="system-ui, sans-serif"
        >
          NORTH &amp; NOURISH
        </text>
        <text
          x="140"
          y="132"
          textAnchor="middle"
          fill="#A4C2B0"
          fontSize="6"
          letterSpacing="1.5"
          fontFamily="system-ui, sans-serif"
        >
          ARTISAN ROASTERS · COORG
        </text>

        {/* Decorative Divider */}
        <line x1="88" y1="139" x2="192" y2="139" stroke="#C87D4B" strokeWidth="0.75" opacity="0.6" />
        <polygon points="140,136 143,139 140,142 137,139" fill="#E29D62" />

        {/* Product Title */}
        <text
          x="140"
          y="160"
          textAnchor="middle"
          fill="#FDFBF7"
          fontSize="13"
          fontWeight="800"
          fontFamily="Georgia, serif"
        >
          Coorg Arabica
        </text>
        <text
          x="140"
          y="174"
          textAnchor="middle"
          fill="#E29D62"
          fontSize="8"
          fontWeight="600"
          letterSpacing="1"
          fontFamily="system-ui, sans-serif"
        >
          SINGLE-ORIGIN RESERVE
        </text>

        {/* Roast & Altitude Profile */}
        <rect x="80" y="186" width="120" height="24" rx="3" fill="#13271F" stroke="#2D4D40" strokeWidth="0.75" />
        <text x="96" y="201" fill="#D8E8DF" fontSize="6.5" fontWeight="600" fontFamily="system-ui, sans-serif">
          ELEVATION
        </text>
        <text x="130" y="201" fill="#FDFBF7" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif">
          1,350M
        </text>
        <text x="160" y="201" fill="#D8E8DF" fontSize="6.5" fontWeight="600" fontFamily="system-ui, sans-serif">
          ROAST
        </text>
        <text x="186" y="201" fill="#E29D62" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif">
          MEDIUM
        </text>

        {/* Tasting Notes */}
        <text x="140" y="226" textAnchor="middle" fill="#A4C2B0" fontSize="6.5" fontFamily="system-ui, sans-serif">
          Notes: Wild Honey · Dark Chocolate · Citrus
        </text>

        {/* Bottom Specs: Net Wt & Batch */}
        <line x1="88" y1="237" x2="192" y2="237" stroke="#C87D4B" strokeWidth="0.75" opacity="0.4" />
        <text x="86" y="254" fill="#D4A373" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif">
          NET WT. 250G
        </text>
        <text x="194" y="254" textAnchor="end" fill="#D4A373" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif">
          BATCH #48
        </text>
      </g>
    </svg>
  );
}

export function CardamomJarSvg({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "w-full h-auto"}
      aria-label="North & Nourish Wild Kerala Cardamom Glass Jar"
      {...props}
    >
      <defs>
        <linearGradient id="glassBody" x1="45" y1="80" x2="235" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="20%" stopColor="#F4EADB" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#EAD8BE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4BA95" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="corkLid" x1="80" y1="30" x2="200" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C89666" />
          <stop offset="50%" stopColor="#B07D4F" />
          <stop offset="100%" stopColor="#966439" />
        </linearGradient>
        <filter id="jarShadow" x="15" y="20" width="250" height="310" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#jarShadow)">
        {/* Cork Stopper / Wooden Lid */}
        <path d="M85 45 C85 36, 95 32, 140 32 C185 32, 195 36, 195 45 L190 74 L90 74 Z" fill="url(#corkLid)" />
        <ellipse cx="140" cy="45" rx="52" ry="9" fill="#DDB284" />
        <line x1="94" y1="58" x2="186" y2="58" stroke="#7A4E2A" strokeWidth="1" strokeDasharray="4 2" />

        {/* Jar Neck Ring */}
        <rect x="80" y="74" width="120" height="14" rx="4" fill="#E8DEC8" stroke="#D1BEA4" strokeWidth="1" />

        {/* Amber Glass Body */}
        <rect x="52" y="88" width="176" height="216" rx="20" fill="url(#glassBody)" stroke="#E8DEC8" strokeWidth="1.5" />
        <rect x="56" y="92" width="12" height="208" rx="6" fill="white" fillOpacity="0.25" />

        {/* Visible Floating Cardamom Pods inside jar */}
        <g opacity="0.85">
          <ellipse cx="90" cy="240" rx="14" ry="8" transform="rotate(-30 90 240)" fill="#4A7545" stroke="#33562F" strokeWidth="1" />
          <ellipse cx="125" cy="255" rx="15" ry="9" transform="rotate(15 125 255)" fill="#5C8A56" stroke="#3D6438" strokeWidth="1" />
          <ellipse cx="160" cy="235" rx="16" ry="8" transform="rotate(-45 160 235)" fill="#436F40" stroke="#2F532B" strokeWidth="1" />
          <ellipse cx="190" cy="260" rx="13" ry="8" transform="rotate(35 190 260)" fill="#54824F" stroke="#395E35" strokeWidth="1" />
          <ellipse cx="105" cy="275" rx="15" ry="9" transform="rotate(65 105 275)" fill="#3F683B" stroke="#294A26" strokeWidth="1" />
          <ellipse cx="145" cy="280" rx="14" ry="8" transform="rotate(-15 145 280)" fill="#5A8954" stroke="#3C6337" strokeWidth="1" />
          <ellipse cx="175" cy="282" rx="13" ry="7" transform="rotate(40 175 282)" fill="#4A7545" stroke="#33562F" strokeWidth="1" />
        </g>

        {/* Artisan Label (Warm Linen Cream) */}
        <rect x="74" y="118" width="132" height="126" rx="4" fill="#FDFBF7" stroke="#1E3A2F" strokeWidth="1.2" />
        <rect x="78" y="122" width="124" height="118" rx="2" fill="none" stroke="#C87D4B" strokeWidth="0.6" strokeDasharray="3 2" />

        <text x="140" y="142" textAnchor="middle" fill="#1E3A2F" fontSize="8" fontWeight="bold" letterSpacing="2" fontFamily="system-ui, sans-serif">
          NORTH &amp; NOURISH
        </text>
        <text x="140" y="151" textAnchor="middle" fill="#C87D4B" fontSize="6" letterSpacing="1" fontFamily="system-ui, sans-serif">
          WILD SPICE COLLECTION
        </text>

        <line x1="94" y1="157" x2="186" y2="157" stroke="#1E3A2F" strokeWidth="0.5" opacity="0.3" />

        <text x="140" y="176" textAnchor="middle" fill="#1E3A2F" fontSize="12" fontWeight="800" fontFamily="Georgia, serif">
          Kerala Cardamom
        </text>
        <text x="140" y="188" textAnchor="middle" fill="#3D6438" fontSize="7" fontWeight="bold" letterSpacing="0.8" fontFamily="system-ui, sans-serif">
          GRADE A · EXTRA BOLD 8MM+
        </text>

        <rect x="88" y="196" width="104" height="18" rx="2" fill="#F3EFE6" />
        <text x="140" y="208" textAnchor="middle" fill="#1E3A2F" fontSize="6.5" fontFamily="system-ui, sans-serif">
          Hand-Harvested · Idukki Valley
        </text>

        <text x="88" y="230" fill="#75827A" fontSize="6" fontWeight="bold" fontFamily="system-ui, sans-serif">
          NET 100G
        </text>
        <text x="192" y="230" textAnchor="end" fill="#75827A" fontSize="6" fontWeight="bold" fontFamily="system-ui, sans-serif">
          ESTATE CROP 2026
        </text>
      </g>
    </svg>
  );
}

export function CocoaTinSvg({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "w-full h-auto"}
      aria-label="North & Nourish Single-Origin Malabar Cocoa Tin"
      {...props}
    >
      <defs>
        <linearGradient id="tinMetal" x1="50" y1="50" x2="230" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E1C14" />
          <stop offset="50%" stopColor="#1E120D" />
          <stop offset="100%" stopColor="#140B07" />
        </linearGradient>
        <linearGradient id="tinCopperLid" x1="50" y1="20" x2="230" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DF9C65" />
          <stop offset="50%" stopColor="#C87D4B" />
          <stop offset="100%" stopColor="#9E5B2E" />
        </linearGradient>
        <filter id="tinShadow" x="15" y="15" width="250" height="320" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="15" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#tinShadow)">
        {/* Tin Cylinder Lid (Embossed Copper) */}
        <ellipse cx="140" cy="50" rx="82" ry="16" fill="url(#tinCopperLid)" stroke="#E8B07D" strokeWidth="1" />
        <ellipse cx="140" cy="48" rx="74" ry="13" fill="#D68D54" />
        <text x="140" y="52" textAnchor="middle" fill="#693310" fontSize="7" fontWeight="bold" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
          NORTH &amp; NOURISH
        </text>

        {/* Cylinder Body */}
        <path
          d="M58 50 L58 274 C58 283, 95 290, 140 290 C185 290, 222 283, 222 274 L222 50 Z"
          fill="url(#tinMetal)"
          stroke="#42291E"
          strokeWidth="1"
        />

        {/* Metal Reflection Highlights */}
        <rect x="70" y="50" width="14" height="228" fill="white" fillOpacity="0.06" />
        <rect x="196" y="50" width="8" height="228" fill="white" fillOpacity="0.04" />

        {/* Embossed Label Band */}
        <rect x="62" y="105" width="156" height="145" fill="#24150F" stroke="#C87D4B" strokeWidth="1" />
        <line x1="62" y1="110" x2="218" y2="110" stroke="#C87D4B" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="62" y1="245" x2="218" y2="245" stroke="#C87D4B" strokeWidth="0.5" strokeDasharray="3 3" />

        <text x="140" y="132" textAnchor="middle" fill="#E29D62" fontSize="7.5" fontWeight="bold" letterSpacing="2" fontFamily="system-ui, sans-serif">
          SINGLE-ESTATE RESERVE
        </text>

        <text x="140" y="160" textAnchor="middle" fill="#FDFBF7" fontSize="13" fontWeight="800" fontFamily="Georgia, serif">
          Malabar Cocoa
        </text>
        <text x="140" y="174" textAnchor="middle" fill="#D98A52" fontSize="7.5" fontWeight="600" letterSpacing="1" fontFamily="system-ui, sans-serif">
          100% PURE DUTCH-PROCESSED
        </text>

        <circle cx="140" cy="198" r="14" fill="#361E14" stroke="#C87D4B" strokeWidth="1" />
        <text x="140" y="202" textAnchor="middle" fill="#E29D62" fontSize="8" fontWeight="bold" fontFamily="system-ui, sans-serif">
          22%
        </text>
        <text x="140" y="222" textAnchor="middle" fill="#A89488" fontSize="6" fontFamily="system-ui, sans-serif">
          Rich Cocoa Butter Content
        </text>

        {/* Net wt */}
        <text x="140" y="238" textAnchor="middle" fill="#D98A52" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif">
          NET WEIGHT 200G TIN
        </text>
      </g>
    </svg>
  );
}

