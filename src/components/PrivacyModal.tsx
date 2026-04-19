import React from 'react';
import ModalPopup from './ModalPopup';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalPopup isOpen={isOpen} onClose={onClose} title="Privacy & Info">
      <div className="p-6 space-y-6 text-sm text-gray-300 leading-relaxed font-medium">
        <section>
          <h3 className="text-white font-bold uppercase tracking-wider mb-2">Data Privacy</h3>
          <p>
            Buildero 2 is a client-side tool. We do not store your loadouts or personal information on any server. 
            All data remains on your device (in LocalStorage) or is encoded within the shareable URLs you generate.
          </p>
        </section>

        <section>
          <h3 className="text-white font-bold uppercase tracking-wider mb-2">Credits & Legal</h3>
          <p>
            This is a fan-made project and is not affiliated with, endorsed by, or associated with Habby or the Archero 2 development team. 
            All game assets, characters, and trademarks are property of their respective owners.
          </p>
        </section>

        <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 text-center uppercase tracking-widest">
          © {new Date().getFullYear()} Buildero 2
        </div>
      </div>
    </ModalPopup>
  );
};

export default PrivacyModal;
