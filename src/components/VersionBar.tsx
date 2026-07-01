import { HelpCircleIcon, MailIcon } from "./icons";

export default function VersionBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-[9px] text-aegean/40 bg-alabaster border-t border-[#D4AF37]/15">
      <span className="font-mono">v1.0.2</span>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1 hover:text-gold transition-colors cursor-pointer"
          type="button"
        >
          <HelpCircleIcon className="w-3 h-3" />
          <span>help</span>
        </button>
        <button
          className="flex items-center gap-1 hover:text-gold transition-colors cursor-pointer"
          type="button"
        >
          <MailIcon className="w-3 h-3" />
          <span>contact</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="hover:text-gold transition-colors cursor-pointer font-mono"
          type="button"
        >
          English
        </button>
        <button
          className="hover:text-gold transition-colors cursor-pointer font-mono"
          type="button"
        >
          Study Track
        </button>
      </div>
    </div>
  );
}
