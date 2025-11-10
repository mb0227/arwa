import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import "./Portfolio.css"; // Make sure this path is correct
import { Link } from "react-router-dom";

export default function PortfolioGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded header content as seen in the image
  const headerContent = {
    welcome: "Welcome",
    toThe: "to the",
    goodStuff: "good stuff",
    description: "Here's a peek at some of my favorite projects - full of passion, creativity, and a whole lot of personality. Scroll through, get inspired, and see what I've been up to."
  };

  // Hardcoded example projects to match the image layout
  const exampleProjects = [
    {
      imgURL: 'https://i.imgur.com/your-image-for-kal-e.png', // Replace with actual image URL for KAL & E
      title: 'KAL & E',
      description: 'Where little hands can build the future.',
      link: '#' // Replace with actual project link
    },
    {
      imgURL: 'https://i.imgur.com/your-image-for-yaya.png', // Replace with actual image URL for YAYA
      title: 'YAYA',
      description: 'A boutique in full bloom.',
      link: '#' // Replace with actual project link
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCol = collection(db, "projects");
        const projectSnapshot = await getDocs(projectsCol);
        const projectList = projectSnapshot.docs.map(doc => doc.data());
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment the line below if you want to use data from Firebase
    fetchProjects();

    // For now, we'll use exampleProjects to match the image
    setProjects(exampleProjects);
    setLoading(false);
  }, []);
  console.log("Fetched projects from Firebase.");
  console.log(projects);
  if (loading) return <p className="loading-message">Loading projects...</p>;

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <div className="header-title">
          <span className="welcome-text">{headerContent.welcome}</span>{" "}
          <span className="to-the-text">{headerContent.toThe}</span>
          <br />
          <span className="good-stuff-text">{headerContent.goodStuff}</span>
        </div>
        <img src="./MASCOT-15.png" alt="Brain icon" className="brain-icon-top-right" />
        <img src="./MASCOT-23.png" alt="Brain icon" className="brain-icon-bottom-left" />
        <div className="header-description">
          <p>{headerContent.description}</p>
        </div>
      </header>


      {projects.length === 0 && !loading && <p className="no-projects-message">No projects found.</p>}

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.imgURL} alt={project.title} className="project-image" />
            <div className="project-info">

              <h3>{project.title}</h3>
              <div className="project-info-text">
                <p>{project.description}</p>

                {project.link && (
                  <div className="view-project-link-container">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-link">
                      VIEW PROJECT <span className="arrow">→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loving the vibe? Let's make something awesome together. */}
      <div className="call-to-action-section">
        <h2 className="call-to-action-title">
          Loving the vibe? <span className="kunkun-regular">Let's make something awesome together.</span>
        </h2>
        <Link to="/book-a-call">
          <button className="enquire-now-button">
            Enquire Now <span className="arrow">→</span>
          </button>
        </Link>
        <img src="./MASCOT-10.png" alt="Brain icon" className="MASCOT-10" />
        <img src="./MASCOT-12.png" alt="Brain icon" className="MASCOT-12" />
        <img src="./MASCOT-13.png" alt="Brain icon" className="MASCOT-13" />
      </div>
    </div>
  );
}

