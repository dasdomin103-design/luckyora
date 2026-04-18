"use client";

export default function AdBanner() {
  return (
    <div className="py-8 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center">
          <span className="absolute top-2 right-4 text-xs text-slate-600 uppercase tracking-wider">
            Advertisement
          </span>
          <p className="text-slate-500 text-sm">
            Ad Space - Your brand could be here
          </p>
          <div className="mt-4 w-full h-24 bg-slate-800/50 rounded-lg flex items-center justify-center">
            <span className="text-slate-600 text-lg font-medium">728x90 Ad Banner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
