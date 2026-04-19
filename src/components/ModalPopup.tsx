import React from 'react';

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
      {/* Overlay to close when clicking outside */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div 
        className="relative min-w-[320px] max-w-lg w-full flex flex-col items-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        {title && (
          <div className="absolute -top-6 z-20 w-[63%] h-16 flex items-center justify-center pointer-events-none">
             <img 
              src="/assets/ui/Title_3.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-fill"
            />
            <h2 
              className="relative z-10 text-xl font-black text-white uppercase tracking-wider"
              style={{
                textShadow: `
                  -1px -1px 0 #000,  
                   1px -1px 0 #000,
                  -1px  1px 0 #000,
                   1px  1px 0 #000
                `
              }}
            >
              {title}
            </h2>
          </div>
        )}

        {/* Modal Body with 9-Slice Background */}
        <div 
          style={{
            borderStyle: "solid",
            borderWidth: "40px",
            borderImageSource: "url(/assets/ui/BG_Popup.png)",
            borderImageSlice: "70 fill",
            borderImageWidth: "40px",
            borderImageRepeat: "stretch",
            backgroundColor: "transparent",
          }}
          className="w-full relative flex flex-col h-fit"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-[-26px] right-[-26px] z-30 w-10 h-10 active:scale-95 transition-transform"
            aria-label="Close"
          >
            <img src="/assets/ui/Btn_Close_Pop.png" alt="" className="w-full h-full" />
          </button>

          {/* Internal Content Texture (bg_chat_01.png) */}
          <div 
            style={{
              borderStyle: "solid",
              borderWidth: "12px",
              borderImageSource: "url(/assets/ui/bg_chat_01.png)",
              borderImageSlice: "40 fill",
              borderImageWidth: "12px",
              borderImageRepeat: "stretch",
              backgroundColor: "transparent",
            }}
            className="w-[calc(100%+40px)] -ml-5 mt-6 h-fit"
          >
            <div className="relative z-10">
              {children}
            </div>
          </div>

          {/* Action Buttons Section */}
          {actions && (
            <div className="relative z-10 mt-6 w-full flex justify-center gap-4 px-2 pb-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
