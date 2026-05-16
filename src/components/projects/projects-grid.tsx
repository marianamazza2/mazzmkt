import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Search, Grid3X3, List, X, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "./project-card";
import { TransitionLink } from "@/components/transition/transition-link";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

type ViewMode = "showcase" | "grid" | "bento" | "list";

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("showcase");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !activeCategory || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  // Calculate bento sizes - featured get large, others vary
  const getCardSize = useCallback(
    (project: Project, index: number): "small" | "medium" | "large" => {
      if (project.featured) return "large";
      // Create visual rhythm: medium, small, small, medium pattern
      const pattern = index % 4;
      if (pattern === 0 || pattern === 3) return "medium";
      return "small";
    },
    []
  );

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
  };

  const mobileLabel: Record<string, string> = {
    "WebApp": "Webapp",
    "Diseño y Desarrollo Web": "Web",
    "Branding Digital": "Branding",
    "Gestión de Redes Sociales": "Redes",
  };

  const hasActiveFilters = searchQuery !== "" || activeCategory !== null;

  return (
    <div className="space-y-8 md:space-y-9">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input + mobile filter button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#141414aa] md:text-[#f1ede1aa]" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-transparent border border-[#14141420] text-[#141414] placeholder:text-[#141414aa] focus:border-[#141414] focus:outline-none transition-colors text-sm rounded-sm md:border-[#f1ede14d] md:text-[#f1ede1] md:placeholder:text-[#f1ede1aa] md:focus:border-[#f1ede1] md:font-geist"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#141414aa] hover:text-[#141414] transition-colors md:text-[#f1ede1aa] md:hover:text-[#f1ede1]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            className="md:hidden w-11 h-11 shrink-0 border border-[#14141420] rounded-sm flex items-center justify-center text-[#141414aa] hover:text-[#141414] hover:border-[#141414] transition-colors"
            aria-label="Opciones de filtro"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* View Mode Toggle — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 border border-[#f1ede14d] p-1 rounded-sm">
          <button
            onClick={() => setViewMode("showcase")}
            className={`p-2 transition-colors ${
              viewMode === "showcase"
                ? "bg-[#f1ede1] text-[#141414]"
                : "text-[#f1ede1aa] hover:text-[#f1ede1]"
            }`}
            title="Vista Showcase"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="16" height="6" />
              <rect x="0" y="8" width="16" height="6" rx="0" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("bento")}
            className={`p-2 transition-colors ${
              viewMode === "bento"
                ? "bg-[#f1ede1] text-[#141414]"
                : "text-[#f1ede1aa] hover:text-[#f1ede1]"
            }`}
            title="Vista Bento"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="7" height="7" />
              <rect x="9" y="0" width="7" height="3" />
              <rect x="9" y="5" width="7" height="7" />
              <rect x="0" y="9" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-[#f1ede1] text-[#141414]"
                : "text-[#f1ede1aa] hover:text-[#f1ede1]"
            }`}
            title="Vista Grid"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "bg-[#f1ede1] text-[#141414]"
                : "text-[#f1ede1aa] hover:text-[#f1ede1]"
            }`}
            title="Vista Lista"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-x-visible">
        <motion.button
          onClick={() => setActiveCategory(null)}
          className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase transition-all duration-300 cursor-pointer font-geist rounded-sm md:text-sm ${
            activeCategory === null
              ? "bg-[#141414] text-[#f1ede1] md:bg-[#f1ede1] md:text-[#141414]"
              : "border border-[#14141430] text-[#141414] hover:border-[#141414] md:border-[#f1ede14d] md:text-[#f1ede1] md:hover:border-[#f1ede1]"
          }`}
          style={{ letterSpacing: "0.09em" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="md:hidden">Todos</span>
          <span className="hidden md:inline">Todos ({projects.length})</span>
        </motion.button>
        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
              className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase transition-all duration-300 cursor-pointer font-geist rounded-sm md:text-sm ${
                activeCategory === category
                  ? "bg-[#141414] text-[#f1ede1] md:bg-[#f1ede1] md:text-[#141414]"
                  : "border border-[#14141430] text-[#141414] hover:border-[#141414] md:border-[#f1ede14d] md:text-[#f1ede1] md:hover:border-[#f1ede1]"
              }`}
              style={{ letterSpacing: "0.09em" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="md:hidden">{mobileLabel[category] ?? category}</span>
              <span className="hidden md:inline">{category} ({count})</span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Filters Indicator */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-sm text-[#141414aa] md:text-[#f1ede1aa] md:font-geist"
          >
            <span>
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </span>
            <button
              onClick={clearFilters}
              className="text-[#141414] underline hover:no-underline md:text-[#f1ede1]"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#141414aa] text-lg mb-4">No se encontraron proyectos</p>
            <button onClick={clearFilters} className="text-[#141414] underline hover:no-underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <MobileProjectsCarousel
            key={`${searchQuery}-${activeCategory}`}
            projects={filteredProjects}
          />
        )}
      </div>

      {/* Desktop: Grid / Showcase / List / Bento */}
      <div className="hidden md:block">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className={
                  viewMode === "list"
                    ? "flex flex-col gap-4"
                    : viewMode === "showcase"
                    ? "flex flex-col gap-5"
                    : viewMode === "grid"
                    ? "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    : "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"
                }
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={
                      viewMode === "bento" && getCardSize(project, index) === "large"
                        ? "col-span-2"
                        : ""
                    }
                  >
                    {viewMode === "list" ? (
                      <ProjectListItem
                        project={project}
                        index={index}
                        total={filteredProjects.length}
                        onMouseEnter={setHoveredProject}
                        onMouseLeave={() => setHoveredProject(null)}
                      />
                    ) : viewMode === "showcase" ? (
                      <ProjectShowcaseItem
                        project={project}
                        index={index}
                        onMouseEnter={setHoveredProject}
                        onMouseLeave={() => setHoveredProject(null)}
                      />
                    ) : (
                      <ProjectCard
                        project={project}
                        index={index}
                        size={viewMode === "grid" ? "medium" : getCardSize(project, index)}
                        onMouseEnter={setHoveredProject}
                        onMouseLeave={() => setHoveredProject(null)}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-[#f1ede1aa] text-lg mb-4">No se encontraron proyectos</p>
                <button onClick={clearFilters} className="text-[#f1ede1] underline hover:no-underline">
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {/* Load More - for future pagination */}
        {filteredProjects.length >= 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pt-8"
          >
            <button className="px-8 py-[15px] border border-[#f1ede14d] text-[#f1ede1] text-sm font-semibold uppercase hover:border-[#f1ede1] transition-colors duration-300 rounded-sm font-geist" style={{ letterSpacing: "0.09em" }}>
              Cargar más proyectos
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating image preview */}
      <FloatingPreview project={hoveredProject} />
    </div>
  );
}

function MobileProjectsCarousel({ projects }: { projects: Project[] }) {
  const [[current, direction], setPage] = useState([0, 0]);

  const paginate = (newDir: number) => {
    const next = current + newDir;
    if (next < 0 || next >= projects.length) return;
    setPage([next, newDir]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const project = projects[current];

  return (
    <div className="w-full overflow-hidden">
      {/* Slide container */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragEnd={handleDragEnd}
            className="w-full touch-pan-y"
          >
            <TransitionLink
              to="/proyectos/$slug"
              params={{ slug: project.slug }}
              className="block"
            >
              {/* 16/9 image — igual que la home */}
              <div className="aspect-[16/9] relative overflow-hidden rounded-sm">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
                )}
              </div>
              {/* Texto debajo — igual que la home */}
              <div className="flex flex-col gap-1 mt-3">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#141414aa] font-geist">
                  {project.category}
                  {!project.client.toLowerCase().startsWith("proyecto propio") && ` · ${project.client}`}
                </span>
                <h3
                  className="font-bold text-[#141414] leading-[1.05]"
                  style={{ fontSize: "clamp(18px, 5vw, 28px)" }}
                >
                  {project.title}
                </h3>
              </div>
            </TransitionLink>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "8px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > current ? 1 : -1])}
              aria-label={`Proyecto ${i + 1}`}
              style={{ minHeight: "unset", minWidth: "unset", padding: "6px 4px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <span
                style={{
                  display: "block",
                  width: i === current ? "18px" : "3px",
                  height: "3px",
                  borderRadius: "1.5px",
                  backgroundColor: i === current ? "#141414" : "#D3D1C7",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              />
            </button>
          ))}
        </div>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "1px",
            color: "#B4B2A9",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// Showcase view item — same wide card treatment used on the home desktop section.
function ProjectShowcaseItem({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  index: number;
  onMouseEnter: (project: Project) => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <ProjectCard project={project} index={index} size="wide" />
    </div>
  );
}

// List view item component
function ProjectListItem({
  project,
  index,
  total,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  index: number;
  total: number;
  onMouseEnter: (project: Project) => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.a
      href={`/proyectos/${project.slug}`}
      className="group flex items-center gap-6 p-6 border border-[#f1ede14d] hover:border-[#f1ede1] transition-all duration-300 rounded-sm"
      whileHover={{ x: 8 }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      {/* Number */}
      <span className="text-4xl font-bold text-[#f1ede130] group-hover:text-[#f1ede1] transition-colors w-16 shrink-0">
        {String(total - index).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#f1ede1aa] group-hover:text-[#f1ede1] transition-colors font-geist">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-[#ffffff] truncate transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#f1ede1aa] group-hover:text-[#f1ede1] transition-colors">
          {project.client}
        </p>
      </div>

      {/* Results */}
      <div className="hidden lg:flex items-center gap-8">
        {project.results.slice(0, 2).map((result) => (
          <div key={result.metric} className="text-right">
            <p className="text-lg font-bold text-[#ffffff] transition-colors">
              {result.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#f1ede1aa] group-hover:text-[#f1ede1] transition-colors">
              {result.metric}
            </p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <span className="text-[#f1ede1] text-2xl transition-colors">
        →
      </span>
    </motion.a>
  );
}

// Floating image preview that follows the cursor
function FloatingPreview({ project }: { project: Project | null }) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <AnimatePresence>
      {project?.image && (
        <motion.div
          key={project.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            x,
            y,
            translateX: "20px",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="w-64 h-44 overflow-hidden shadow-2xl border border-[#14141415]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
