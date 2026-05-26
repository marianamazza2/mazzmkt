import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Check, ChevronDown, Search, Grid3X3, List, X } from "lucide-react";
import { ProjectCard } from "./project-card";
import { TransitionLink } from "@/components/transition/transition-link";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

type ViewMode = "showcase" | "grid" | "bento" | "list";

const mobileLabel: Record<string, string> = {
  WebApp: "Webapp",
  Web: "Web",
  "Branding Digital": "Branding",
  "Redes Sociales": "Redes",
};

const filterLabel: Record<string, string> = {
  Web: "Diseño y Desarrollo Web",
  "Redes Sociales": "Redes Sociales",
  "Branding Digital": "Branding",
};

const getFilterSortLabel = (category: string) => filterLabel[category] ?? category;

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("showcase");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats).sort((a, b) =>
      getFilterSortLabel(a).localeCompare(getFilterSortLabel(b), "es", {
        sensitivity: "base",
      })
    );
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

      const matchesCategory =
        activeCategory === null || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  const selectCategory = useCallback((category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  }, []);

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
    setIsMobileFilterOpen(false);
  };

  const hasActiveFilters = searchQuery !== "" || activeCategory !== null;
  const mobileFilterOptions = useMemo(
    () => [
      { value: null, label: "Todos", count: projects.length },
      ...categories.map((category) => ({
        value: category,
        label: mobileLabel[category] ?? category,
        count: projects.filter((p) => p.category === category).length,
      })),
    ],
    [categories, projects]
  );
  const mobileBtnLabel =
    activeCategory === null
      ? "Todos"
      : (mobileLabel[activeCategory] ?? activeCategory);

  return (
    <div className="space-y-5 md:space-y-9">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="hidden md:flex items-center gap-2">
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

      {/* Mobile Category Filter */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen((open) => !open)}
          aria-expanded={isMobileFilterOpen}
          className="flex w-full items-center justify-between rounded-sm border border-[#f1ede11a] bg-[#f1ede10a] px-3 py-2.5 text-left text-[#f1ede1] shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors hover:border-[#f1ede133]"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f1ede1]" />
            <span className="truncate font-geist text-[12px] font-semibold uppercase tracking-[0.08em]">
              {mobileBtnLabel}
            </span>
          </span>
          <span className="flex items-center gap-2 text-[#f1ede199]">
            <span className="font-geist text-[11px]">{filteredProjects.length}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-sm border border-[#f1ede11f] bg-[#1b1b1b] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              {mobileFilterOptions.map((option) => {
                const isActive =
                  option.value === null
                    ? activeCategory === null
                    : activeCategory === option.value;

                return (
                  <button
                    key={option.value ?? "todos"}
                    type="button"
                    onClick={() => {
                      if (option.value === null) {
                        setActiveCategory(null);
                        setIsMobileFilterOpen(false);
                      } else {
                        selectCategory(option.value);
                        setIsMobileFilterOpen(false);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-[#f1ede1] text-[#141414]"
                        : "text-[#f1ede1cc] hover:bg-[#f1ede10d] hover:text-[#ffffff]"
                    }`}
                  >
                    <span className="font-geist text-[12px] font-semibold uppercase tracking-[0.08em]">
                      {option.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-geist text-[11px] opacity-70">{option.count}</span>
                      {isActive && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Category Filters */}
      <div className="hidden md:flex gap-2 flex-wrap overflow-x-visible">
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
          <span>Todos ({projects.length})</span>
        </motion.button>
        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              onClick={() => selectCategory(category)}
              className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase transition-all duration-300 cursor-pointer font-geist rounded-sm md:text-sm ${
                isActive
                  ? "bg-[#141414] text-[#f1ede1] md:bg-[#f1ede1] md:text-[#141414]"
                  : "border border-[#14141430] text-[#141414] hover:border-[#141414] md:border-[#f1ede14d] md:text-[#f1ede1] md:hover:border-[#f1ede1]"
              }`}
              style={{ letterSpacing: "0.09em" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{filterLabel[category] ?? category} ({count})</span>
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
            className="flex items-center gap-3 text-sm text-[#f1ede1aa] md:font-geist"
          >
            <span>
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </span>
            <button
              onClick={clearFilters}
              className="text-[#f1ede1] underline hover:no-underline"
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
            <p className="text-[#f1ede1aa] text-lg mb-4">No se encontraron proyectos</p>
            <button onClick={clearFilters} className="text-[#f1ede1] underline hover:no-underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <MobileProjectsCarousel
            key={`${searchQuery}-${activeCategory ?? ""}`}
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
                        showFloatingImage={false}
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
  const [current, setCurrent] = useState(0);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 && current < projects.length - 1) setCurrent(current + 1);
    else if (info.offset.x > 50 && current > 0) setCurrent(current - 1);
  };

  return (
    <div className="w-full">
      {/* Track */}
      <div className="overflow-hidden">
        <motion.div
          className="flex touch-pan-y"
          animate={{ x: `${-current * 100}%` }}
          transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full shrink-0">
              <TransitionLink
                to="/proyectos/$slug"
                params={{ slug: project.slug }}
                className="block"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-sm">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
                  )}
                </div>
                <div className="flex flex-col gap-[3px] mt-3">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#f1ede1aa] font-geist">
                    {project.category}
                    {!project.client.toLowerCase().startsWith("proyecto propio") && ` · ${project.client}`}
                  </span>
                  <h3 className="text-[14px] font-semibold text-[#ffffff] leading-[1.2]">
                    {project.title}
                  </h3>
                </div>
              </TransitionLink>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots — ventana de 3 */}
      {(() => {
        const visibleCount = Math.min(3, projects.length);
        const windowStart = Math.min(Math.max(current - 1, 0), projects.length - visibleCount);
        const dots = Array.from({ length: visibleCount }, (_, i) => windowStart + i);
        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", paddingTop: "10px" }}>
            {dots.map((dotIndex) => (
              <span
                key={dotIndex}
                onClick={() => setCurrent(dotIndex)}
                style={{
                  display: "block",
                  width: dotIndex === current ? "18px" : "4px",
                  height: "4px",
                  borderRadius: "9999px",
                  backgroundColor: dotIndex === current ? "#F1EDE1" : "rgba(241,237,225,0.32)",
                  transition: "width 300ms ease-out, background-color 300ms ease-out",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        );
      })()}
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
