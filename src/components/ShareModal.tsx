import React, { useState, useEffect, useRef, useMemo } from 'react';
import ModalPopup from './ModalPopup';
import ModalSubsection from './ModalSubsection';
import { NineSliceButton } from './NineSliceButton';
import { useLoadout } from '../state/LoadoutContext';
import { exportLoadout } from '../state/serialization';
import * as htmlToImage from 'html-to-image';
import { GearItem } from './GearItem';
import { RuneItem } from './RuneItem';
import { CharacterItem } from './CharacterItem';
import { initialState } from '../state/loadoutReducer';
import type { GearType, RuneCategory, Loadout } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const GameCheckbox = ({ checked, label, onChange }: { checked: boolean, label: string, onChange: () => void }) => (
  <div 
    onClick={onChange}
    className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-all"
  >
    <div className="relative w-7 h-7 flex items-center justify-center pointer-events-none">
      <img src="/assets/ui/bg_siliao_tianjia.png" alt="" className="absolute inset-0 w-full h-full object-contain" />
      {checked && (
        <img src="/assets/ui/duihao.png" alt="" className="relative z-10 w-[80%] h-[80%] object-contain mb-1 ml-1 drop-shadow-sm" />
      )}
    </div>
    <span className="text-[11px] font-black uppercase text-[#4a3424] opacity-80 tracking-wide pointer-events-none">{label}</span>
  </div>
);

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useLoadout();
  const [buildName, setBuildName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareGear, setShareGear] = useState(true);
  const [shareRunes, setShareRunes] = useState(true);
  
  const captureRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize values ONLY when modal opens
  useEffect(() => {
    if (isOpen) {
      setBuildName(state.name === 'New Build' ? '' : state.name);
      setShareGear(true);
      setShareRunes(true);
      setCopied(false);
      if (state.name === 'New Build') {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [isOpen]);

  const getFilteredLoadout = (nameOverride?: string): Loadout => {
    return {
      ...state,
      name: nameOverride || buildName.trim() || 'New Build',
      gear: shareGear ? state.gear : {},
      runes: shareRunes ? state.runes : JSON.parse(JSON.stringify(initialState.runes))
    };
  };

  // Memorize the export code calculation
  const exportCode = useMemo(() => {
    if (!isOpen) return '';
    return exportLoadout(getFilteredLoadout());
  }, [isOpen, shareGear, shareRunes, buildName, state]);

  const isNameValid = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length > 40) return false;
    const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{}|;':",./<>?]*$/;
    return regex.test(trimmed);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 40) {
      setBuildName(val);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    const finalName = buildName.trim() || 'New Build';
    dispatch({ type: 'SET_NAME', payload: finalName });
    const finalCode = exportLoadout(getFilteredLoadout(finalName));
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(finalCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(finalCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      fallbackCopy(finalCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareSheet = async () => {
    const finalName = buildName.trim() || 'New Build';
    dispatch({ type: 'SET_NAME', payload: finalName });
    const finalCode = exportLoadout(getFilteredLoadout(finalName));
    
    const shareData = {
      title: 'Archero 2 Build',
      text: `Check out ${finalName} at ${window.location.href}! Import code: ${finalCode}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        fallbackCopy(shareData.text);
        alert('Native share is only available over HTTPS. Share info has been copied to your clipboard instead!');
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      fallbackCopy(shareData.text);
      alert('Native share is only available over HTTPS. Share info has been copied to your clipboard instead!');
    }
  };

  const handleDownloadImage = async () => {
    const finalName = buildName.trim() || 'New Build';
    dispatch({ type: 'SET_NAME', payload: finalName });
    
    if (!captureRef.current) return;
    setIsGeneratingImage(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const dataUrl = await htmlToImage.toPng(captureRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#0a0a0c',
        cacheBust: true,
        includeQueryParams: true,
      });
      
      const link = document.createElement('a');
      link.download = `archero2-build-${finalName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Image generation failed:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const renderCaptureTemplate = () => {
    const leftGear: { type: GearType; id: keyof typeof state.gear }[] = [
      { type: 'weapon', id: 'weapon' },
      { type: 'amulet', id: 'amulet' },
      { type: 'ring', id: 'ring' },
    ];
    const rightGear: { type: GearType; id: keyof typeof state.gear }[] = [
      { type: 'helmet', id: 'helmet' },
      { type: 'armor', id: 'armor' },
      { type: 'boots', id: 'boots' },
    ];

    const enhancementCoords = [
      { x: (294/1608)*100, y: (238/1259)*100 },
      { x: (170/1608)*100, y: (475/1259)*100 },
      { x: (155/1608)*100, y: (743/1259)*100 },
      { x: (287/1608)*100, y: (967/1259)*100 },
    ];
    const abilityCoords = [
      { x: (1291/1608)*100, y: (237/1259)*100 },
      { x: (1416/1608)*100, y: (455/1259)*100 },
      { x: (1427/1608)*100, y: (729/1259)*100 },
      { x: (1297/1608)*100, y: (966/1259)*100 },
    ];
    const blessingCoords = [
      { x: (423/1608)*100, y: (595/1259)*100 },
      { x: (1163/1608)*100, y: (595/1259)*100 },
    ];
    const etchedCoords = [
      { x: (538/1608)*100, y: (1094/1259)*100 },
      { x: (791/1608)*100, y: (1094/1259)*100 },
      { x: (1044/1608)*100, y: (1094/1259)*100 },
    ];

    const renderRuneSlot = (category: RuneCategory, index: number, coords: {x: number, y: number}, isEtched: boolean = false) => {
      const slot = state.runes[category][index];
      if (!slot?.item) return null;
      return (
        <div 
          key={`${category}-${index}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${coords.y}%`, left: `${coords.x}%`, width: isEtched ? '14.5%' : '13.5%', height: isEtched ? '18.5%' : '17.3%' }}
        >
          {isEtched && <img src="/assets/ui/Frame_4.png" alt="" className="absolute inset-0 w-full h-full object-contain opacity-60" />}
          <RuneItem item={slot.item} enchantId={slot.enchantId} enchantRarity={slot.enchantRarity} className="w-full h-full" />
        </div>
      );
    };

    return (
      <div className="fixed top-0 left-[-9999px] pointer-events-none opacity-0 -z-50 overflow-hidden">
        <img src="/assets/ui/Title_Boss.png" alt="" className="hidden" />
        <div ref={captureRef} className="flex flex-col bg-[#0a0a0c] p-6 gap-0 w-[480px] text-white">
          <div className="flex flex-col items-center gap-2 mb-6">
            <img src="/assets/LOGO_EN.png" alt="" className="w-48 h-auto" />
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Buildero 2 Loadout</span>
          </div>

          {shareGear && (
            <div className="relative aspect-[1608/1259] w-full flex items-stretch overflow-hidden rounded-t-2xl border-x border-t border-white/10 shadow-2xl">
              <img src="/assets/ui/rank_bg_zhuxian_01.png" className="absolute inset-0 w-full h-full object-cover z-0" alt="" />
              <div className="flex-[0_0_28%] flex flex-col items-center justify-around h-full z-10 py-2">
                  {leftGear.map(slot => (
                    <div key={slot.id} className="w-20 h-20">
                      {state.gear[slot.id] && <GearItem item={state.gear[slot.id]!} hideEmptySkins={true} className="w-full h-full scale-110" />}
                    </div>
                  ))}
              </div>
              <div className="flex-[0_0_44%] flex flex-col items-center justify-center gap-2 z-10 p-1">
                  <CharacterItem character={state.character} hideEmptySkins={true} className="w-[120px]" />
                  <div className="flex flex-col gap-1 w-full items-center scale-90">
                    {state.resonances.map((r, i) => r && (
                      <CharacterItem key={i} character={r} size="small" hideEmptySkins={true} />
                    ))}
                  </div>
              </div>
              <div className="flex-[0_0_28%] flex flex-col items-center justify-around h-full z-10 py-2">
                  {rightGear.map(slot => (
                    <div key={slot.id} className="w-20 h-20">
                      {state.gear[slot.id] && <GearItem item={state.gear[slot.id]!} hideEmptySkins={true} className="w-full h-full scale-110" />}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className={`relative z-50 ${shareGear && shareRunes ? 'h-2' : 'h-0'}`} />

          {shareRunes && (
            <div className={`relative aspect-[1608/1259] w-full overflow-hidden border-x border-white/10 bg-black/40 shadow-2xl ${!shareGear ? 'rounded-t-2xl border-t' : ''} rounded-b-2xl border-b`}>
              <img src="/assets/rune_bg.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
              {enhancementCoords.map((pos, i) => renderRuneSlot('enhancement', i, pos))}
              {abilityCoords.map((pos, i) => renderRuneSlot('ability', i, pos))}
              {blessingCoords.map((pos, i) => renderRuneSlot('blessing', i, pos))}
              {etchedCoords.map((pos, i) => renderRuneSlot('etched', i, pos, true))}
            </div>
          )}

          {!shareGear && !shareRunes && (
            <div className="w-full flex flex-col items-center p-8 bg-black/20 rounded-2xl border border-white/10 shadow-2xl">
               <CharacterItem character={state.character} hideEmptySkins={true} className="w-[140px]" />
               <div className="flex gap-2 mt-4">
                  {state.resonances.map((r, i) => r && (
                    <CharacterItem key={i} character={r} size="small" hideEmptySkins={true} />
                  ))}
                </div>
            </div>
          )}

          <div className="flex justify-between items-center opacity-30 text-[8px] font-black uppercase tracking-tighter mt-4">
            <span>{buildName.trim() || 'New Build'}</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    );
  };

  const nameIsValid = isNameValid(buildName);
  const anyOptionChecked = shareGear || shareRunes;

  const actionButtons = (
    <div className="grid grid-cols-2 gap-3 w-full">
      <NineSliceButton
        imageSrc="/assets/ui/Btn_Blue_S.png"
        onClick={handleShareSheet}
        disabled={!anyOptionChecked}
        className={`h-12 text-[10px] font-black uppercase ${!anyOptionChecked ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center">
          <ShareIcon />
          Share
        </div>
      </NineSliceButton>
      
      <NineSliceButton
        imageSrc="/assets/ui/Btn_Yellow_S.png"
        onClick={handleDownloadImage}
        disabled={isGeneratingImage || !anyOptionChecked}
        className={`h-12 text-[10px] font-black uppercase ${(!anyOptionChecked || isGeneratingImage) ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center">
          <ImageIcon />
          {isGeneratingImage ? 'Exporting...' : 'Export as Image'}
        </div>
      </NineSliceButton>
    </div>
  );

  return (
    <ModalPopup 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Share Build"
      actions={actionButtons}
    >
      <div className="flex flex-col gap-4 p-1">
        <ModalSubsection title="Build Settings">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <input
                ref={inputRef}
                type="text"
                value={buildName}
                onChange={handleNameChange}
                placeholder="New Build"
                className={`w-full bg-white/50 border rounded-lg p-3 text-sm font-bold text-[#4a3424] outline-none transition-all placeholder-[#4a3424]/30 ${
                  buildName.trim() !== '' && !nameIsValid ? 'border-red-400 focus:border-red-500' : 'border-[#4a3424]/20 focus:border-accent/50'
                }`}
              />
              {buildName.trim() !== '' && !nameIsValid && (
                <p className="text-[10px] text-red-600 font-bold px-1">
                  1-20 characters, letters/numbers only
                </p>
              )}
            </div>

            <div className="flex gap-6 px-1 pt-1">
              <GameCheckbox 
                checked={shareGear} 
                label="Share Gear" 
                onChange={() => setShareGear(!shareGear)} 
              />
              <GameCheckbox 
                checked={shareRunes} 
                label="Share Runes" 
                onChange={() => setShareRunes(!shareRunes)} 
              />
            </div>
          </div>
        </ModalSubsection>

        <ModalSubsection title="Build Code">
          <div className="flex flex-col gap-2 opacity-80">
            <div className="relative">
              <textarea
                readOnly
                value={exportCode}
                className={`w-full h-16 bg-black/10 border border-[#4a3424]/20 rounded-lg p-2 text-[9px] font-mono break-all resize-none text-[#4a3424] focus:outline-none ${!anyOptionChecked ? 'opacity-30' : ''}`}
              />
              <div className="absolute bottom-1.5 right-1.5">
                <NineSliceButton
                  imageSrc={copied ? "/assets/ui/Btn_Green_S.png" : "/assets/ui/Btn_Yellow_S.png"}
                  onClick={handleCopy}
                  disabled={!anyOptionChecked}
                  className={`h-7 px-3 text-[9px] ${!anyOptionChecked ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </NineSliceButton>
              </div>
            </div>
          </div>
        </ModalSubsection>
        
        {renderCaptureTemplate()}
      </div>
    </ModalPopup>
  );
};
