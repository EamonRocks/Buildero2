import React from 'react';
import ModalPopup from './ModalPopup';
import { NineSliceButton } from './NineSliceButton';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'error' | 'info' | 'success';
}

export const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose, 
  title = 'Alert', 
  message,
  type = 'info'
}) => {
  const getButtonImage = () => {
    switch (type) {
      case 'error': return `${import.meta.env.BASE_URL}assets/ui/Btn_Red_S.png`;
      case 'success': return `${import.meta.env.BASE_URL}assets/ui/Btn_Green_S.png`;
      default: return `${import.meta.env.BASE_URL}assets/ui/Btn_Blue_S.png`;
    }
  };

  return (
    <ModalPopup 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      actions={
        <div className="flex justify-center w-full">
          <NineSliceButton
            imageSrc={getButtonImage()}
            onClick={onClose}
            className="h-10 px-8 text-[12px] font-black"
          >
            OK
          </NineSliceButton>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="text-sm font-bold text-[#4a3424] opacity-90 leading-relaxed">
          {message}
        </p>
      </div>
    </ModalPopup>
  );
};
