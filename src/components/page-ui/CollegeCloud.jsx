"use client";

export default function CollegeCloud() {
  const colleges = [
    { name: "IIT Delhi", logo: "IIT" },
    { name: "MIT", logo: "MIT" },
    { name: "Stanford", logo: "Stanford" },
    { name: "NIT", logo: "NIT" },
    { name: "BITS Pilani", logo: "BITS" },
    { name: "IIIT", logo: "IIIT" },
    { name: "VIT", logo: "VIT" },
  ];

  return (
    <section className="relative bg-black py-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-10 font-semibold">
          The #1 Multi-College Tech Network Trusted By
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
          {colleges.map((college, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-400 hover:text-gray-200 transition-colors cursor-default grayscale hover:grayscale-0"
            >
              {college.name === "IIT Delhi" && (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
              {college.name === "MIT" && (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 3.8L18.5 20h-13L12 5.8z"/>
                </svg>
              )}
              <span className="tracking-tight">{college.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-gray-500 text-sm">
          <span className="mr-2">Or register your</span>
          <a href="#" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
            College Chapter
          </a>
        </div>
      </div>
    </section>
  );
}