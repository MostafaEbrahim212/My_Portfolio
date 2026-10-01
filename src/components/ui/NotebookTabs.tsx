export function NotebookTabs({ isAr, nav }: { isAr: boolean, nav: any }) {
  const tabs = [
    { id: 'about', label: nav.about || 'About', color: 'bg-emerald-300 dark:bg-emerald-800 border-emerald-500' },
    { id: 'skills', label: nav.skills || 'Skills', color: 'bg-amber-300 dark:bg-amber-800 border-amber-500' },
    { id: 'experience', label: nav.experience || 'Exp', color: 'bg-blue-300 dark:bg-blue-800 border-blue-500' },
    { id: 'projects', label: nav.projects || 'Projects', color: 'bg-red-300 dark:bg-red-800 border-red-500' },
    { id: 'contact', label: nav.contact || 'Contact', color: 'bg-purple-300 dark:bg-purple-800 border-purple-500' }
  ];

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 ${isAr ? 'left-0 translate-x-2' : 'right-0 -translate-x-2'} z-[150] flex flex-col gap-3 hidden lg:flex`}>
      {tabs.map((t) => (
        <a 
          key={t.id} 
          href={`#${t.id}`} 
          className={`
            ${t.color} px-3 py-4 border-2 border-pencil text-pencil font-bold shadow-hard transition-all duration-300
            ${isAr ? 'rounded-r-2xl hover:translate-x-4 pr-6 -ml-4 hover:-ml-0' : 'rounded-l-2xl hover:-translate-x-4 pl-6 -mr-4 hover:-mr-0'}
            hover:z-10 relative flex items-center justify-center
          `}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: `rotate(${isAr ? '180deg' : '180deg'})`
          }}
          title={t.label}
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}
