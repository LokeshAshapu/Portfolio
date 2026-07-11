import React from 'react';

export default function ContactCard({ theme }) {
  const contacts = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ashapu-lokesh-25159a298" },
    { name: "GitHub", url: "https://github.com/LokeshAshapu" },
    { name: "Portfolio Code", url: "https://github.com/LokeshAshapu/Portfolio" }
  ];

  return (
    <div className={`w-full border rounded-3xl p-6 md:p-8 mb-6 shadow-sm flex flex-col items-stretch text-left transition-colors duration-500 ${
      theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-100' : 'bg-[#f8f9fa] border-slate-200/60 text-slate-800'
    }`}>
      {/* Title block */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
          theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
        }`}>
          Contact
        </h2>
        <span className={`text-sm md:text-base font-semibold ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
          @LokeshAshapu
        </span>
      </div>

      <hr className={`mb-6 transition-colors duration-500 ${
        theme === 'dark' ? 'border-zinc-800/60' : 'border-slate-200/80'
      }`} />

      {/* Direct phone and email links */}
      <div className="flex flex-col gap-3 mb-8">
        <a
          href="mailto:lokeshashapu@gmail.com"
          className="text-blue-500 hover:text-blue-600 font-semibold text-lg md:text-xl transition-colors self-start"
        >
          lokeshashapu@gmail.com
        </a>
        <a
          href="tel:+916301451462"
          className={`font-semibold text-lg md:text-xl transition-colors self-start hover:text-blue-500 ${
            theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'
          }`}
        >
          +91 6301451462
        </a>
      </div>

      {/* Button Links */}
      <div className="flex flex-wrap gap-2.5">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
