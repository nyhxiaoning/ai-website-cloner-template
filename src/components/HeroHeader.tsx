export default function HeroHeader() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700 text-white p-8 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full animate-float">
          <div
            className="w-full h-full opacity-20"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'cloud\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'rgba(255,255,255,0.3)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23cloud)\'/%3E%3C/svg%3E")',
              backgroundRepeat: "repeat",
            }}
          />
        </div>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow-lg">
          🐒 西游记取经路线图 🏛️
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          跟随唐僧师徒四人的传奇西行之路，体验八十一难的奇幻冒险
        </p>
      </div>
    </div>
  );
}
