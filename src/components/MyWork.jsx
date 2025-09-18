import React from "react";

const MyWork = ({ data, theme }) => {
  return (
    <section id="mywork" className="relative min-h-screen bg-white text-black">
      {/* Content */}
      <div className="flex items-center justify-center py-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">{data.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg bg-gray-100 text-black border border-gray-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <a href={project.link} className="text-accent1 hover:underline">
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWork;
