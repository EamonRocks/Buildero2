import React from 'react';

interface ModalSubsectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A specialized 12-slice-like container that uses the two-toned bar_dafuweng_libao.png texture.
 * It splits the texture into a Header and a Body section, allowing both to scale independently
 * while maintaining the crisp color transition line.
 */
const ModalSubsection: React.FC<ModalSubsectionProps> = ({ title, children, className = "" }) => {
  const imageSrc = `${import.meta.env.BASE_URL}assets/ui/bar_dafuweng_libao.png`;
  
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Top Section (Header) */}
      {title && (
        <div 
          style={{
            borderStyle: "solid",
            borderWidth: "12px 12px 0px 12px", // No bottom border
            borderImageSource: `url(${imageSrc})`,
            // Slice the top 85px of the image. 271 - 85 = 186px from the bottom is the "cut" line.
            borderImageSlice: "40 40 186 40 fill", 
            borderImageWidth: "12px 12px 0px 12px",
            borderImageRepeat: "stretch",
          }}
          className="relative z-10 w-full flex justify-start items-center py-1 px-2"
        >
          <span className="text-[17px] font-bold text-[#4a3424] capitalize">
            {title}
          </span>
        </div>
      )}

      {/* Bottom Section (Content) */}
      <div 
        style={{
          borderStyle: "solid",
          borderWidth: title ? "0px 12px 12px 12px" : "12px", // If no title, use full 9-slice
          borderImageSource: `url(${imageSrc})`,
          // If we have a title, we slice from the 86px line down.
          borderImageSlice: title ? "86 40 40 40 fill" : "40 fill",
          borderImageWidth: title ? "0px 12px 12px 12px" : "12px",
          borderImageRepeat: "stretch",
          marginTop: title ? "-1px" : "0", // Micro-overlap to prevent seams
        }}
        className="relative z-0"
      >
        <div className="p-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalSubsection;
