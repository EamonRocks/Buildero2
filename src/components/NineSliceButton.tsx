import React from 'react';

/**
 * Configuration for specific 9-slice assets.
 * slice: The pixel distance from the edges to slice the 3x3 grid.
 * borderWidth: The display width of the border (corners).
 */
export interface NineSliceConfig {
  slice: number | string;
  borderWidth: string;
}

/**
 * Registry of known UI assets and their optimal 9-slice settings.
 */
export const UI_ASSETS_CONFIG: Record<string, NineSliceConfig> = {
  '/assets/ui/Btn_Blue_L.png': { slice: 40, borderWidth: "20px" },
  '/assets/ui/Btn_Yellow_L.png': { slice: 40, borderWidth: "20px" },
  '/assets/ui/Btn_Green_S.png': { slice: 35, borderWidth: "16px" },
  '/assets/ui/Btn_Red_S.png': { slice: 35, borderWidth: "16px" },
  '/assets/ui/Btn_Purple_S.png': { slice: 35, borderWidth: "16px" },
  '/assets/ui/Btn_Gray_S.png': { slice: 35, borderWidth: "16px" },
  '/assets/ui/BG_Selected.png': { slice: 25, borderWidth: "12px" },
  '/assets/ui/BGTop_Popup.png': { slice: 40, borderWidth: "24px" },
  '/assets/ui/bg_chat_01.png': { slice: 40, borderWidth: "24px" },
  '/assets/ui/Btn_Yellow_S.png': { slice: 35, borderWidth: "16px" },
  '/assets/ui/tab_weixuanzhong_2.png': { slice: 30, borderWidth: "12px" },
  '/assets/ui/tab_xuanzhong_3.png': { slice: 30, borderWidth: "12px" },
};

interface NineSliceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc: string;
  slice?: number | string; // Optional override
  borderWidth?: string; // Optional override
  children: React.ReactNode;
}

export const NineSliceButton: React.FC<NineSliceButtonProps> = ({ 
  imageSrc, 
  slice, 
  borderWidth, 
  children, 
  className = "", 
  style,
  ...props 
}) => {
  // Use registered config if it exists, otherwise fallback to defaults or props
  const config = UI_ASSETS_CONFIG[imageSrc];
  
  const finalSlice = slice ?? config?.slice ?? 30;
  const finalBorderWidth = borderWidth ?? config?.borderWidth ?? "12px";

  // If finalSlice is a number, we append 'fill' to keep the center.
  // If it's a string, we assume the user might have provided multiple values, 
  // so we append 'fill' at the end.
  const sliceValue = `${finalSlice} fill`;

  return (
    <button
      {...props}
      style={{
        ...style,
        borderStyle: "solid",
        borderWidth: finalBorderWidth,
        borderImageSource: `url(${imageSrc})`,
        borderImageSlice: sliceValue,
        borderImageWidth: finalBorderWidth,
        borderImageRepeat: "stretch",
        backgroundColor: "transparent",
      }}
      className={`inline-flex items-center justify-center transition-all active:scale-95 text-white font-black uppercase tracking-widest ${className}`}
    >
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </button>
  );
};
