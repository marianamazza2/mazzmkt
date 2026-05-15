import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
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
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input + mobile filter button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#141414aa]" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-transparent border border-[#14141420] text-[#141414] placeholder:text-[#141414aa] focus:border-[#141414] focus:outline-none transition-colors text-sm rounded-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#141414aa] hover:text-[#141414] transition-colors"
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
        <div className="hidden md:flex items-center gap-2 border border-[#14141420] p-1 rounded-sm">
          <button
            onClick={() => setViewMode("showcase")}
            className={`p-2 transition-colors ${
              viewMode === "showcase"
                ? "bg-[#141414] text-[#f1ede1]"
                : "text-[#141414aa] hover:text-[#141414]"
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
                ? "bg-[#141414] text-[#f1ede1]"
                : "text-[#141414aa] hover:text-[#141414]"
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
                ? "bg-[#141414] text-[#f1ede1]"
                : "text-[#141414aa] hover:text-[#141414]"
            }`}
            title="Vista Grid"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "bg-[#141414] text-[#f1ede1]"
                : "text-[#141414aa] hover:text-[#141414]"
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
          className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer font-geist rounded-sm ${
            activeCategory === null
              ? "bg-[#141414] text-[#f1ede1]"
              : "border border-[#14141430] text-[#141414] hover:border-[#141414]"
          }`}
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
              className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer font-geist rounded-sm ${
                activeCategory === category
                  ? "bg-[#141414] text-[#f1ede1]"
                  : "border border-[#14141430] text-[#141414] hover:border-[#141414]"
              }`}
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
            className="flex items-center gap-3 text-sm text-[#141414aa]"
          >
            <span>
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </span>
            <button
              onClick={clearFilters}
              className="text-[#141414] underline hover:no-underline"
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
                    ? "flex flex-col divide-y divide-[#14141415]"
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
                <p className="text-[#141414aa] text-lg mb-4">No se encontraron proyectos</p>
                <button onClick={clearFilters} className="text-[#141414] underline hover:no-underline">
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
            <button className="px-8 py-4 border border-[#141414] text-[#141414] text-sm font-semibold uppercase tracking-wider hover:bg-[#141414] hover:text-[#f1ede1] transition-all duration-300 rounded-sm">
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
    <div>
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
            dragElastic={0.12}
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

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => paginate(-1)}
          disabled={current === 0}
          className="w-9 h-9 flex items-center justify-center border border-[#14141420] rounded-sm text-sm text-[#141414] disabled:opacity-25 transition-colors"
          aria-label="Proyecto anterior"
        >
          ←
        </button>

        {/* Dots — span inside button para evitar que el botón se expanda */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > current ? 1 : -1])}
              aria-label={`Proyecto ${i + 1}`}
              className="flex items-center justify-center p-1.5"
            >
              <span
                style={{
                  display: "block",
                  width: i === current ? "16px" : "6px",
                  height: "3px",
                  borderRadius: i === current ? "2px" : "50%",
                  backgroundColor: i === current ? "#141414" : "#14141440",
                  transition: "all 0.3s",
                  flexShrink: 0,
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={current === projects.length - 1}
          className="w-9 h-9 flex items-center justify-center border border-[#14141420] rounded-sm text-sm text-[#141414] disabled:opacity-25 transition-colors"
          aria-label="Proyecto siguiente"
        >
          →
        </button>
      </div>

      <p className="text-center mt-2 text-[10px] text-[#141414aa] font-geist tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </p>
    </div>
  );
}

function ShowcaseImage({ project }: { project: Project }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: false, margin: "-25% 0px -25% 0px" });
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 150 };
  const gradientX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={imageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group/img w-full md:w-[58%] aspect-[16/10] relative shrink-0"
    >
      {/* Inner clipped container */}
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
        )}

        {/* Dark overlay — igual que ProjectCard */}
        <div className="absolute inset-0 bg-[#141414]/60 group-hover/img:bg-[#141414]/50 transition-colors duration-300 pointer-events-none" />

        {/* Radial gradient que sigue el cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(241, 237, 225, 0.15) 0%, transparent 50%)`
            ),
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#f1ede1] group-hover/img:h-16 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#f1ede1] group-hover/img:w-16 transition-all duration-300" />
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 border border-[#f1ede100] group-hover/img:border-[#f1ede130] transition-colors duration-300 z-20 pointer-events-none" />

        {/* Clickable overlay */}
        <TransitionLink
          to="/proyectos/$slug"
          params={{ slug: project.slug }}
          className="absolute inset-0 z-30 cursor-pointer"
          aria-label={`Ver proyecto ${project.title}`}
        />
      </div>

      {/* Small card centrada sobre la imagen, aparece al hacer scroll */}
      <AnimatePresence>
        {isInView && project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[65%] h-[65%] shadow-xl border border-[#14141410] overflow-hidden pointer-events-none rounded-sm"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Showcase view item — full width, horizontal split
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
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
      className="group py-5 md:py-14 relative"
    >
      <div className={`flex flex-col md:flex-row gap-3 md:gap-12 md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
        {/* Image */}
        <ShowcaseImage project={project} />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          {/* Category + client label */}
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#141414aa] font-geist">
            {project.category}{!project.client.toLowerCase().startsWith("proyecto propio") && ` · ${project.client}`}
          </span>

          {/* Title */}
          <h3
            className="font-bold text-[#141414] leading-[1.05]"
            style={{ fontSize: "clamp(18px, 3.5vw, 52px)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="hidden md:block text-sm text-[#141414bb] leading-relaxed line-clamp-2 max-w-md">
              {project.description}
            </p>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="hidden md:flex gap-8 pt-4 border-t border-[#14141415]">
              {project.results.slice(0, 3).map((result) => (
                <div key={result.metric}>
                  <p className="text-xl font-bold text-[#141414]">{result.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#141414aa]">
                    {result.metric}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <TransitionLink
            to="/proyectos/$slug"
            params={{ slug: project.slug }}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#141414] hover:gap-4 transition-all duration-300 mt-2 w-fit"
          >
            VER PROYECTO
            <span className="text-lg">→</span>
          </TransitionLink>
        </div>
      </div>

    </motion.div>
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
      className="group flex items-center gap-6 p-6 border border-[#14141420] hover:border-[#141414] hover:bg-[#141414] transition-all duration-300 rounded-sm"
      whileHover={{ x: 8 }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      {/* Number */}
      <span className="text-4xl font-bold text-[#14141420] group-hover:text-[#f1ede130] transition-colors w-16 shrink-0">
        {String(total - index).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#141414aa] group-hover:text-[#f1ede1aa] transition-colors font-geist">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-[#141414] group-hover:text-[#f1ede1] truncate transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#141414aa] group-hover:text-[#f1ede1aa] transition-colors">
          {project.client}
        </p>
      </div>

      {/* Results */}
      <div className="hidden lg:flex items-center gap-8">
        {project.results.slice(0, 2).map((result) => (
          <div key={result.metric} className="text-right">
            <p className="text-lg font-bold text-[#141414] group-hover:text-[#f1ede1] transition-colors">
              {result.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#141414aa] group-hover:text-[#f1ede1aa] transition-colors">
              {result.metric}
            </p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <span className="text-[#141414] group-hover:text-[#f1ede1] text-2xl transition-colors">
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
