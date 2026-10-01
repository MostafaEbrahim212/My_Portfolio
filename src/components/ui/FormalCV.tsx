import React from 'react';

interface FormalCVProps {
  data: any;
  isAr: boolean;
}

export const FormalCV = React.forwardRef<HTMLDivElement, FormalCVProps>(({ data, isAr }, ref) => {
  const { hero, about, experience, projects, skills, contact } = data;

  return (
    <div 
      ref={ref} 
      dir={isAr ? 'rtl' : 'ltr'} 
      className={`bg-white text-black p-10 max-w-[800px] w-[800px] ${isAr ? 'font-sans' : 'font-sans'} text-left`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{hero.name} {hero.lastName}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{hero.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{contact.email}</span>
          <span>•</span>
          <span>{contact.github}</span>
          <span>•</span>
          <span>{contact.linkedin}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1 text-gray-800">{about.title}</h3>
        <p className="text-sm leading-relaxed text-gray-700">{hero.description.replace(/\*\*/g, '')}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-800">{experience.title}</h3>
        <div className="space-y-4">
          {experience.jobs.map((job: any, idx: number) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-900">{job.title}</h4>
                <span className="text-sm text-gray-500 font-medium">{job.period}</span>
              </div>
              <div className="text-gray-700 text-sm italic mb-2">{job.company}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-800">{projects.title}</h3>
        <div className="space-y-4">
          {projects.items.map((project: any, idx: number) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-900">{project.title}</h4>
                {project.link && <a href={project.link} className="text-sm text-blue-600 underline">Link</a>}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-1">{project.description}</p>
              <div className="text-xs text-gray-500">
                {project.tags?.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-800">{skills.title}</h3>
        
        <div className="mb-3">
          <h4 className="font-bold text-sm text-gray-800 mb-1">{skills.backend}</h4>
          <p className="text-sm text-gray-600">{(skills.laravel || []).concat(skills.mysql || []).join(' • ')}</p>
        </div>

        <div className="mb-3">
          <h4 className="font-bold text-sm text-gray-800 mb-1">{skills.frontend}</h4>
          <p className="text-sm text-gray-600">{(skills.frontendBullets || []).join(' • ')}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-1">{skills.tools}</h4>
          <p className="text-sm text-gray-600">{skills.toolsList.map((t: any) => t.name).join(' • ')}</p>
        </div>
      </div>
    </div>
  );
});

FormalCV.displayName = 'FormalCV';
