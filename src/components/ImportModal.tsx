import React, { useState } from 'react';
import ModalPopup from './ModalPopup';
import ModalSubsection from './ModalSubsection';
import { NineSliceButton } from './NineSliceButton';
import { useLoadout } from '../state/LoadoutContext';
import { importLoadout } from '../state/serialization';
import { initialState } from '../state/loadoutReducer';
import { AlertModal } from './AlertModal';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useLoadout();
  const [importCode, setImportCode] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleImport = () => {
    try {
      const trimmedCode = importCode.trim();
      if (!trimmedCode) return;

      const imported = importLoadout(trimmedCode);
      
      // Basic validation: if it returns initialState and code wasn't empty, it likely failed
      if (imported === initialState || JSON.stringify(imported) === JSON.stringify(initialState)) {
        setShowErrorModal(true);
        return;
      }

      dispatch({ type: 'LOAD_LOADOUT', payload: imported });
      onClose();
    } catch (err) {
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <ModalPopup isOpen={isOpen} onClose={onClose} title="Import Build">
        <div className="flex flex-col gap-4 p-1">
          <ModalSubsection title="Paste Build Code">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-[#4a3424] font-bold uppercase tracking-wider opacity-70 px-1">
                Paste a build code here to load it
              </p>
              <textarea
                value={importCode}
                onChange={(e) => {
                  setImportCode(e.target.value);
                  setError('');
                }}
                placeholder="Paste code here..."
                className="w-full h-32 bg-white/50 border border-[#4a3424]/20 rounded-lg p-2 text-[10px] font-mono break-all resize-none text-[#4a3424] focus:border-accent/50 outline-none placeholder-[#4a3424]/30"
              />
              {error && <p className="text-[10px] text-red-600 font-bold px-1">{error}</p>}
              <div className="flex justify-end mt-2">
                <NineSliceButton
                  imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Blue_L.png`}
                  onClick={handleImport}
                  className="h-10 px-8 text-[12px] font-black"
                  disabled={!importCode.trim()}
                >
                  Load Build
                </NineSliceButton>
              </div>
            </div>
          </ModalSubsection>
        </div>
      </ModalPopup>

      <AlertModal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)} 
        title="Import Failed"
        message="The provided build code is invalid or corrupted. Please check the code and try again."
        type="error"
      />
    </>
  );
};
