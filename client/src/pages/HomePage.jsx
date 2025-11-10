import React, { useEffect, useMemo, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import "./HomePage.css";
import { Link } from "react-router-dom";
import IconButton from "../components/IconButton";

const MissionIcon = () => (
  <span className="mission-icon" aria-hidden="true">
    <span className="mission-icon__dot" />
  </span>
);

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(0); // First project expanded by default
  const [carouselIndex, setCarouselIndex] = useState(0); // For mobile carousel
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Dummy carousel data - Client Reviews
  const getCardsToShow = () => {
    if (typeof window === "undefined") {
      return 3;
    }

    const width = window.innerWidth;

    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  };

  const getIsSmallCarouselViewport = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth <= 430;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow);
  const [isSmallCarouselViewport, setIsSmallCarouselViewport] = useState(getIsSmallCarouselViewport);
  const [carouselDataIndex, setCarouselDataIndex] = useState(0);
  const [isCarouselTransitionEnabled, setIsCarouselTransitionEnabled] = useState(true);
  const carouselColors = ['#58EFBA', '#E7A4F7', '#FCA917', '#0794E2']; // Mint Green, Pink, Orange, Blue
  const carouselData = [
    {
      id: 1,
      review: "Working with Arwa was an absolute pleasure! Her attention to detail and creative vision transformed our brand identity completely. The designs exceeded all our expectations.",
      clientName: "Sarah Johnson",
      avatar: "SJ"
    },
    {
      id: 2,
      review: "The team delivered exceptional results. Our new logo and branding perfectly captured our company's essence. Professional, creative, and truly outstanding work!",
      clientName: "Michael Chen",
      avatar: "MC"
    },
    {
      id: 3,
      review: "I couldn't be happier with the design work. Every element was thoughtfully crafted and the final product was beyond what I imagined. Highly recommend!",
      clientName: "Emily Rodriguez",
      avatar: "ER"
    },
    {
      id: 4,
      review: "Outstanding creativity and professionalism throughout the entire process. The designs are modern, fresh, and perfectly aligned with our brand values.",
      clientName: "David Thompson",
      avatar: "DT"
    },
    {
      id: 5,
      review: "Arwa's design expertise brought our vision to life in ways we never expected. The quality of work and attention to detail is truly remarkable.",
      clientName: "Lisa Anderson",
      avatar: "LA"
    },
    {
      id: 6,
      review: "The best design experience we've had! Creative solutions, timely delivery, and beautiful results. Our brand has never looked better.",
      clientName: "James Wilson",
      avatar: "JW"
    }
  ];

  const extendedCarouselData = useMemo(() => {
    if (!carouselData.length) {
      return [];
    }

    const firstCard = carouselData[0];
    const lastCard = carouselData[carouselData.length - 1];
    return [lastCard, ...carouselData, firstCard];
  }, [carouselData.length]);

  const totalCarouselCards = carouselData.length;
  const isSingleCardCarousel = cardsToShow === 1;
  const shouldUseLoopingCarousel = isSingleCardCarousel && !isSmallCarouselViewport && totalCarouselCards > 1;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCol = collection(db, "projects");
        const projectSnapshot = await getDocs(projectsCol);
        const projectList = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  console.log("Fetched projects from Firebase:", projects);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const nextCardsToShow = getCardsToShow();
      const nextIsSmallCarouselViewport = getIsSmallCarouselViewport();

      setCardsToShow((prev) => (prev === nextCardsToShow ? prev : nextCardsToShow));
      setIsSmallCarouselViewport((prev) => (prev === nextIsSmallCarouselViewport ? prev : nextIsSmallCarouselViewport));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isCarouselTransitionEnabled) {
      let raf1;
      let raf2;

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setIsCarouselTransitionEnabled(true));
      });

      return () => {
        if (raf1) cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
  }, [isCarouselTransitionEnabled]);

  useEffect(() => {
    if (isSingleCardCarousel) {
      if (shouldUseLoopingCarousel) {
        setIsCarouselTransitionEnabled(false);
        setCarouselDataIndex(totalCarouselCards ? 1 : 0);
      } else {
        setIsCarouselTransitionEnabled(true);
        setCarouselDataIndex(0);
      }
    } else {
      setIsCarouselTransitionEnabled(true);
      setCarouselDataIndex((prev) => {
        const maxIndex = Math.max(0, totalCarouselCards - cardsToShow);
        return Math.min(prev, maxIndex);
      });
    }
  }, [isSingleCardCarousel, shouldUseLoopingCarousel, totalCarouselCards, cardsToShow]);

  const handleProjectClick = (index) => {
    // Only handle click on desktop
    if (window.innerWidth > 768) {
      setExpandedIndex(index);
    }
  };

  // Show only first 3 projects on desktop
  const displayProjects = projects.slice(0, 3);

  // Show all projects on mobile for carousel
  const mobileProjects = projects;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && carouselIndex < mobileProjects.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
    if (isRightSwipe && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  const slidesData = shouldUseLoopingCarousel ? extendedCarouselData : carouselData;
  const translatePercentage = useMemo(() => {
    if (shouldUseLoopingCarousel) {
      return carouselDataIndex * (100 / cardsToShow);
    }

    if (cardsToShow === 1) {
      const maxIndex = Math.max(0, totalCarouselCards - 1);
      const safeIndex = Math.max(0, Math.min(carouselDataIndex, maxIndex));
      return safeIndex * (100 / cardsToShow);
    }

    const maxIndex = Math.max(0, totalCarouselCards - cardsToShow);
    const safeIndex = Math.max(0, Math.min(carouselDataIndex, maxIndex));
    return safeIndex * (100 / cardsToShow);
  }, [shouldUseLoopingCarousel, carouselDataIndex, cardsToShow, totalCarouselCards]);

  const displayedCarouselIndex = totalCarouselCards
    ? (shouldUseLoopingCarousel
      ? (carouselDataIndex - 1 + totalCarouselCards) % totalCarouselCards
      : Math.min(carouselDataIndex, totalCarouselCards - 1))
    : 0;

  const carouselProgress = isSingleCardCarousel && totalCarouselCards
    ? ((displayedCarouselIndex + 1) / totalCarouselCards) * 100
    : 0;

  const moveCarousel = (direction) => {
    if (isSingleCardCarousel) {
      if (shouldUseLoopingCarousel) {
        if (extendedCarouselData.length <= 1) {
          return;
        }

        setIsCarouselTransitionEnabled(true);
        setCarouselDataIndex((prevIndex) => {
          const nextIndex = prevIndex + direction;

          if (nextIndex < 0 || nextIndex >= extendedCarouselData.length) {
            return prevIndex;
          }

          return nextIndex;
        });
      } else {
        if (totalCarouselCards <= 1) {
          return;
        }

        const lastIndex = totalCarouselCards - 1;
        setCarouselDataIndex((prevIndex) => {
          const nextIndex = prevIndex + direction;
          if (nextIndex < 0) {
            return 0;
          }
          if (nextIndex > lastIndex) {
            return lastIndex;
          }
          return nextIndex;
        });
      }
    } else {
      const maxIndex = Math.max(0, totalCarouselCards - cardsToShow);
      setCarouselDataIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;

        if (nextIndex < 0) {
          return 0;
        }

        if (nextIndex > maxIndex) {
          return maxIndex;
        }

        return nextIndex;
      });
    }
  };

  const handleCarouselTransitionEnd = () => {
    if (!shouldUseLoopingCarousel || extendedCarouselData.length <= 1) {
      return;
    }

    if (carouselDataIndex === extendedCarouselData.length - 1) {
      setIsCarouselTransitionEnabled(false);
      setCarouselDataIndex(1);
    } else if (carouselDataIndex === 0) {
      setIsCarouselTransitionEnabled(false);
      setCarouselDataIndex(extendedCarouselData.length - 2);
    }
  };

  // Carousel swipe/drag handlers
  const [carouselTouchStart, setCarouselTouchStart] = useState(null);
  const [carouselTouchEnd, setCarouselTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const onCarouselTouchStart = (e) => {
    if (isSmallCarouselViewport) {
      return;
    }

    setCarouselTouchEnd(null);
    const clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    setCarouselTouchStart(clientX);
    setIsDragging(true);
  };

  const onCarouselTouchMove = (e) => {
    if (isSmallCarouselViewport || !isDragging) return;

    const clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    setCarouselTouchEnd(clientX);
  };

  const onCarouselTouchEnd = () => {
    if (isSmallCarouselViewport) {
      setIsDragging(false);
      setCarouselTouchStart(null);
      setCarouselTouchEnd(null);
      return;
    }

    if (!carouselTouchStart || !carouselTouchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = carouselTouchStart - carouselTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      moveCarousel(1);
    }
    if (isRightSwipe) {
      moveCarousel(-1);
    }

    setIsDragging(false);
    setCarouselTouchStart(null);
    setCarouselTouchEnd(null);
  };

  // Carousel navigation functions
  const nextCarouselSlide = () => moveCarousel(1);

  const prevCarouselSlide = () => moveCarousel(-1);

  const canNavigatePrev = shouldUseLoopingCarousel || (!shouldUseLoopingCarousel && carouselDataIndex > 0);
  const canNavigateNext = shouldUseLoopingCarousel || (!shouldUseLoopingCarousel && carouselDataIndex < Math.max(0, totalCarouselCards - 1));

  return (
    <>
    <div className="homepage">
    
      {/* ================== Banner Section ================== */}
      <div className="homepage-banner">
        <div className="banner-background"></div>
        <div className="banner-container">
          {/* Mascots Group - Centered in the middle of the screen */}
          <div className="banner-mascots-group">
            {/* Decorative Group */}
            <div className="banner-decorative-group-main">
              <img
                src="/banner-decorative-group-main.svg"
                alt="Decorative"
                className="decorative-image"
              />
            </div>

            {/* MASCOT-15 */}
            <div className="banner-mascot-15-full">
              <img
                src="/banner-mascot-15-full.svg"
                alt="Mascot 15"
                className="mascot-15-image"
              />
            </div>

            {/* MASCOT-12 */}
            <div className="banner-mascot-12-full">
              <img
                src="/banner-mascot-12-full.svg"
                alt="Mascot 12"
                className="mascot-12-image"
              />
            </div>

            {/* MASCOT-13 */}
            <div className="banner-mascot-13-full">
              <img
                src="/banner-mascot-13-full.svg"
                alt="Mascot 13"
                className="mascot-13-image"
              />
            </div>
          </div>

          <div className="Group2085663269">
            {/* Tagline with icon */}
            <div className="EmpoweringAmbitious">
              <div className="Ellipse1">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#E7A4F7" />
                </svg>
                <div className="Thunder1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.8584 20.9506L19.6951 10.6956C19.9637 10.2928 19.8548 9.74846 19.4519 9.47988C19.3079 9.38387 19.1387 9.33263 18.9656 9.33263H13.5901V2.8767C13.5901 2.39251 13.1976 2 12.7134 2C12.4203 2 12.1466 2.1465 11.984 2.39039L5.14733 12.6454C4.87876 13.0482 4.98762 13.5926 5.39049 13.8611C5.5345 13.9571 5.70371 14.0084 5.87679 14.0084H11.2523V20.4643C11.2523 20.9485 11.6448 21.341 12.129 21.341C12.4221 21.341 12.6958 21.1945 12.8584 20.9506Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <span>Empowering Ambitious</span>
            </div>

            {/* Heading */}
            <div className="WhereDesignMeetsAmbition">
              <span className="heading-text-black">Where Design Meets </span>
              <span className="design-n-container">
                {/* <img
                  src="/MASCOT-15.png"
                  alt="Mascot"
                  className="mascot-on-n"
                /> */}
              </span>
              <span className="heading-accent">Ambition</span>
            </div>

            {/* Description */}
            <div className="WhetherYouReBuildingFromScratchOrReimaginingYourBrandIMHereToMakeSureYourIdentityFeelsAuthenticStrategicAndUnforgettable">
              Whether you're building from scratch or reimagining your brand,
              I'm here to make sure your identity feels authentic, strategic,
              and unforgettable.
            </div>

            {/* Actions */}
            <div className="banner-actions">
              <button className="Frame85">
                <div className="DiscoverOurServices">Discover Our Services</div>
              </button>

              <div className="RecentWork">
                <div className="RecentWorkRow">
                  <span>Recent Work</span>
                  <div className="ArrowRight1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                        stroke="#383838"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>
                </div>
                <div className="Line9"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Studio Work Section ================== */}
      <div className="studio-work-section">
        <div className="Group2085663149">
          <div className="StudioWork">Studio Work</div>

          {/* View All Button - Desktop */}
          <div className="Frame88 Frame88-desktop">
            <Link to="/portfolio" className="ViewAllWorks-Link">
              <div className="ViewAllWorks">View All Works</div>
              <div className="ArrowRight1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                    stroke="#383838"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* ================== Projects Gallery ================== */}
        <div className="studio-work-gallery">
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <>
              {/* Desktop: Show first 3 projects with expand/collapse */}
              <div className="studio-work-gallery-desktop">
                {displayProjects.length > 0 ? (
                  displayProjects.map((project, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                      <div
                        className={`studio-work-item ${isExpanded ? 'expanded' : 'collapsed'}`}
                        key={project.id}
                        onClick={() => handleProjectClick(index)}
                      >
                        <div className="studio-work-image">
                          {project.imgURL ? (
                            <img
                              src={project.imgURL}
                              alt={project.title}
                              className="project-image"
                            />
                          ) : (
                            <div className="placeholder-image">No Image</div>
                          )}

                          {/* Overlay info on image bottom - only show when expanded */}
                          {isExpanded && (
                            <div className="project-info-overlay">
                              <div className="studio-work-title">{project.title}</div>
                              <div className="studio-work-divider">
                                <div className="studio-work-category">
                                  {project.category || "Uncategorized"}
                                </div>

                                {/* Case Study Link with Arrow */}
                                {project.link ? (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="studio-work-case-study"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    VIEW CASE STUDY
                                    <svg
                                      className="arrow-icon"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                ) : (
                                  <span className="studio-work-case-study disabled">
                                    VIEW CASE STUDY
                                    <svg
                                      className="arrow-icon"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-projects">No projects found.</div>
                )}
              </div>

              {/* Mobile: Show carousel with swipe */}
              <div
                className="studio-work-gallery-mobile-wrapper"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="studio-work-gallery-mobile"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {mobileProjects.length > 0 ? (
                    mobileProjects.map((project, index) => (
                      <div
                        className="studio-work-item mobile-carousel-item"
                        key={project.id}
                      >
                        <div className="studio-work-image">
                          {project.imgURL ? (
                            <img
                              src={project.imgURL}
                              alt={project.title}
                              className="project-image"
                            />
                          ) : (
                            <div className="placeholder-image">No Image</div>
                          )}

                          {/* Overlay info on image bottom - always show on mobile */}
                          <div className="project-info-overlay">
                            <div className="studio-work-title">{project.title}</div>
                            <div className="studio-work-divider">
                              <div className="studio-work-category">
                                {project.category || "Uncategorized"}
                              </div>

                              {/* Case Study Link with Arrow */}
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="studio-work-case-study"
                                >
                                  VIEW CASE STUDY
                                  <svg
                                    className="arrow-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <span className="studio-work-case-study disabled">
                                  VIEW CASE STUDY
                                  <svg
                                    className="arrow-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-projects">No projects found.</div>
                  )}
                </div>
              </div>

              {/* Carousel Dots - Mobile Only */}
              {mobileProjects.length > 1 && (
                <div className="carousel-dots-mobile">
                  {mobileProjects.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === carouselIndex ? 'active' : ''}`}
                      onClick={() => setCarouselIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* View All Button - Mobile */}
        <div className="Frame88 Frame88-mobile">
          <Link to="/portfolio" className="ViewAllWorks-Link">
            <div className="ViewAllWorks">View All Works</div>
            <div className="ArrowRight1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 12H17.9967M17.9967 12L12.9967 17M17.9967 12L12.9967 7"
                  stroke="#383838"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Mission Section - After Studio Work */}
      <div className="Group2085663263">
        {/* <div className="WePartnerWithVisionaryEntrepreneursToCraftBrandsThatResonateAndInspire">
          <img src="/ILLUSTRATION-23.png" alt="Illustration 23" />
          We partner with <span className="visionary-entrepreneurs-pink">visionary entrepreneurs</span> to craft brands that resonate and inspire
        </div> */}
        <div className="missionsection">
          <img src="/HomeOurMission.png" alt="mission" />
        </div>

        <div className="DesignIsnTJustWhatWeSeeItSHowWeConnectIHelpPassionateFoundersAndCreativesTurnBigIdeasIntoCohesiveImpactfulVisualsThatSpeakStraightToTheHeartOfTheirAudience">
          Design isn't just what we see — it's how we connect. I help passionate founders and creatives turn big ideas into cohesive, impactful visuals that speak straight to the heart of their audience.
        </div>
        {/* <div className="Group2085663185">
          <div className="Group2085663184"> */}
        {/* <div className="Group2085663029">
              <IconButton
                text="Our Mission"
                icon={<MissionIcon />}
                className="mission-icon-button"
              />
            </div> */}
        {/* </div>
        </div> */}
        <div className="Group2085663182">
          <div className="Frame88-services">
            <div className="LogoDesign">Logo Design</div>
          </div>
          <div className="Frame89-services">
            <div className="BrandingDesign">Branding Design</div>
          </div>
          <div className="Frame91-services">
            <div className="GraphicsDesign">Graphics Design</div>
          </div>
        </div>
        <img src="/MASCOT-20.png" alt="Mascot" className="MASCOT-20" />
      </div>

      {/* Dummy Data Carousel Section */}
      <div className="dummy-carousel-section">
        <div className="carousel-section-header">
          <h2 className="carousel-section-title">Words from Clients</h2>
        </div>

        <div className="carousel-container">
          <div
            className="carousel-wrapper"
            onTouchStart={isSmallCarouselViewport ? undefined : onCarouselTouchStart}
            onTouchMove={isSmallCarouselViewport ? undefined : onCarouselTouchMove}
            onTouchEnd={isSmallCarouselViewport ? undefined : onCarouselTouchEnd}
            onMouseDown={isSmallCarouselViewport ? undefined : onCarouselTouchStart}
            onMouseMove={isSmallCarouselViewport ? undefined : onCarouselTouchMove}
            onMouseUp={isSmallCarouselViewport ? undefined : onCarouselTouchEnd}
            onMouseLeave={isSmallCarouselViewport ? undefined : onCarouselTouchEnd}
          >
            <div
              className="carousel-slides"
              style={{
                transform: `translateX(-${translatePercentage}%)`,
                transition: isSingleCardCarousel && !isCarouselTransitionEnabled
                  ? 'none'
                  : 'transform 0.5s ease-in-out'
              }}
              onTransitionEnd={handleCarouselTransitionEnd}
            >
              {slidesData.map((item, index) => {
                const actualIndex = shouldUseLoopingCarousel && totalCarouselCards
                  ? (index - 1 + totalCarouselCards) % totalCarouselCards
                  : index;
                const colorIndex = totalCarouselCards
                  ? actualIndex % carouselColors.length
                  : 0;
                const cardColor = carouselColors[colorIndex];
                const isShort = actualIndex % 2 === 0;
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className={`carousel-slide ${isShort ? 'carousel-slide-short' : ''}`}
                  >
                    <div
                      className={`carousel-slide-content ${isShort ? 'carousel-card-short' : 'carousel-card-long'}`}
                      style={{ backgroundColor: cardColor }}
                    >
                      <div className="carousel-review-content">
                        <p className="carousel-review-text">{item.review}</p>
                        <div className="carousel-client-info">
                          <div className="carousel-avatar">{item.avatar}</div>
                          <div className="carousel-client-name">{item.clientName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {isSingleCardCarousel && totalCarouselCards > 1 && (
            <div className="carousel-controls-mobile">
              <button
                type="button"
                className="carousel-arrow-button prev"
                onClick={canNavigatePrev ? prevCarouselSlide : undefined}
                disabled={!canNavigatePrev}
                aria-label="View previous testimonial"
              >
                <span className="carousel-arrow-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15.5 6.5L9.5 12L15.5 17.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div className="carousel-progress-wrapper">
                <div className="carousel-progress-bar">
                  <div
                    className="carousel-progress-fill"
                    style={{ width: `${carouselProgress}%` }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="carousel-arrow-button next"
                onClick={canNavigateNext ? nextCarouselSlide : undefined}
                disabled={!canNavigateNext}
                aria-label="View next testimonial"
              >
                <span className="carousel-arrow-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8.5 6.5L14.5 12L8.5 17.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section - From Figma */}
      <div className="Group2085663270">
        <div className="Group2085663154">
          <div className="Group2085663153">
            <div className="WhetherYouReJustStartingOutOrReadyForAFullBrandRefreshIdLoveToHearAboutYourProject">
              Whether you're just starting out or ready for a full brand refresh, I'd love to hear about your project.
            </div>
            <img src="/ILLUSTRATION-40.png" alt="Illustration" className="ILLUSTRATION-40" />
            <div className="Group2085663029-contact">
              <div className="Rectangle4542-contact"></div>
              <div className="Ellipse2-contact"></div>
              <div className="Ellipse3-contact"></div>
              <div className="LetsBringYourVisionToLife">Let's Bring Your Vision to Life</div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <img src="/MASCOT-22.png" alt="Mascot" className="MASCOT-22" />

    </>
  );
}

export default HomePage;
