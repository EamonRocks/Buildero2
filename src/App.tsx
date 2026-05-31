import { useState } from 'react';
import { useLoadout } from './state/LoadoutContext';
import { Dashboard } from './components/Dashboard';
import { ShareModal } from './components/ShareModal';
import { ImportModal } from './components/ImportModal';
import { FeaturedBuildsModal } from './components/FeaturedBuildsModal';
import { PrivacyModal } from './components/PrivacyModal';
import { NineSliceButton } from './components/NineSliceButton';
import { BotView } from './components/BotView';
import { VERSION } from './types';

function App() {
  const { mode, state } = useLoadout();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  if (mode) {
    return <BotView />;
  }

  return (
    <div className="min-h-screen flex justify-center selection:bg-accent selection:text-white bg-[#1a2433] relative overflow-hidden">
      {/* Background Layer with rotation to break the grid */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/ui/ui_bg_dikuai_01_3.png)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1400px',
          backgroundPosition: 'center',
          transform: 'scale(1.5) rotate(-5deg)', // Scale and rotate to hide tiling
        }}
      />
      
      {/* Subtle Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Mobile-constrained container */}
      <div className="w-full max-w-[480px] min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans antialiased relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border-x border-white/5 z-10">
        <header className="py-8 px-6 flex justify-center items-center w-full relative z-50"> 
          <img 
            src={`${import.meta.env.BASE_URL}assets/LOGO_EN.png`} 
            alt="Archero 2 Builder" 
            className="w-full max-w-[200px] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
          />
        </header>

        <main className="pb-32 flex-grow overflow-x-hidden flex flex-col items-center">
          <div className="w-full relative flex flex-col items-center">
            <Dashboard />
          </div>
          
          {/* Main Action Buttons */}
          <div className="flex flex-col gap-3 mt-12 px-6 w-full max-sm">
            <div className="flex gap-3 w-full">
              <NineSliceButton
                imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Blue_S.png`}
                onClick={() => setIsShareOpen(true)}
                className="flex-1 h-12 text-xs font-black uppercase"
              >
                Share Build
              </NineSliceButton>
              <NineSliceButton
                imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Yellow_S.png`}
                onClick={() => setIsImportOpen(true)}
                className="flex-1 h-12 text-xs font-black uppercase"
              >
                Import Build
              </NineSliceButton>
            </div>
            
            <NineSliceButton
              imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Purple_S.png`}
              onClick={() => setIsFeaturedOpen(true)}
              className="w-full h-12 text-xs font-black uppercase"
            >
              <div className="flex items-center justify-center gap-2">
                <img src={`${import.meta.env.BASE_URL}assets/ui/Star_Full.png`} alt="" className="w-5 h-5 object-contain mb-0.5" />
                Featured Builds
              </div>
            </NineSliceButton>
          </div>
        </main>

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
        />
        
        <ImportModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
        />

        <FeaturedBuildsModal
          isOpen={isFeaturedOpen}
          onClose={() => setIsFeaturedOpen(false)}
        />

        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />

        {/* Persistent footer - now relative to the mobile container */}
        <footer className="absolute bottom-0 left-0 right-0 p-6 bg-[#0a0a0c]/80 backdrop-blur-xl border-t border-gray-900 flex flex-col items-center gap-3 z-40">
          <div className="flex gap-6 items-center text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="opacity-40">{state.name}</span>
            <a href='https://ko-fi.com/U7U51Y3955' target='_blank' rel="noreferrer" className="transition-transform hover:scale-110 active:scale-95 flex-shrink-0">
              <img 
                height='28' 
                style={{ border: '0px', height: '28px' }} 
                src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' 
                alt='Buy Me a Coffee at ko-fi.com' 
              />
            </a>
            <span className="opacity-40">v{VERSION}</span>
          </div>
          
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.1em] hover:text-gray-400 transition-colors"
          >
            Privacy & Credits
          </button>
        </footer>
      </div>
    </div>
  )
}

export default App
