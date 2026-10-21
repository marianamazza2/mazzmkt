import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import { Check, ChevronDown, Search, Grid3X3, List, X } from "lucide-react";
import { ProjectTile } from "./project-tile";
import { Molinillo } from "@/components/brand/molinillo";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

type ViewMode = "showcase" | "grid" | "list";

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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/67 md:text-light/67" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-transparent border border-dark/13 text-dark placeholder:text-dark/67 focus:border-dark focus:outline-none transition-colors text-[13px] rounded-sm md:border-light/30 md:text-light md:placeholder:text-light/67 md:focus:border-light font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-dark/67 hover:text-dark transition-colors md:text-light/67 md:hover:text-light"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* View Mode Toggle — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 border border-light/30 p-1 rounded-sm">
          <button
            onClick={() => setViewMode("showcase")}
            className={`p-2 transition-colors ${
              viewMode === "showcase"
                ? "bg-light text-dark"
                : "text-light/67 hover:text-light"
            }`}
            title="Vista un proyecto por fila"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="16" height="6" />
              <rect x="0" y="9" width="16" height="6" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-light text-dark"
                : "text-light/67 hover:text-light"
            }`}
            title="Vista cuadrícula"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "bg-light text-dark"
                : "text-light/67 hover:text-light"
            }`}
            title="Vista lista"
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
          className="flex w-full items-center justify-between rounded-sm border border-light/10 bg-light/4 px-3 py-2.5 text-left text-light shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors hover:border-light/20"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-light" />
            <span className="truncate font-mono text-[12px] font-semibold uppercase tracking-[0.08em]">
              {mobileBtnLabel}
            </span>
          </span>
          <span className="flex items-center gap-2 text-light/60">
            <span className="font-mono text-[11px]">{filteredProjects.length}</span>
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
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-sm border border-light/12 bg-[#1b1b1b] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
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
                        ? "bg-light text-dark"
                        : "text-light/80 hover:bg-light/5 hover:text-[#ffffff]"
                    }`}
                  >
                    <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em]">
                      {option.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[11px] opacity-70">{option.count}</span>
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
          className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase transition-all duration-300 cursor-pointer font-mono rounded-sm md:text-[13px] ${
            activeCategory === null
              ? "bg-dark text-light md:bg-light md:text-dark"
              : "border border-dark/19 text-dark hover:border-dark md:border-light/30 md:text-light md:hover:border-light"
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
              className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase transition-all duration-300 cursor-pointer font-mono rounded-sm md:text-[13px] ${
                isActive
                  ? "bg-dark text-light md:bg-light md:text-dark"
                  : "border border-dark/19 text-dark hover:border-dark md:border-light/30 md:text-light md:hover:border-light"
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
            className="flex items-center gap-3 text-[13px] text-light/67 font-mono"
          >
            <span>
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </span>
            <button
              onClick={clearFilters}
              className="text-light underline hover:no-underline"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados: misma tarjeta en móvil y escritorio; el selector de vista es solo para escritorio */}
      <div>
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className={
                  viewMode === "list"
                    ? "flex flex-col gap-4"
                    : viewMode === "showcase"
                    ? "flex flex-col gap-8 md:gap-14"
                    : "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 md:gap-y-12"
                }
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    {viewMode === "list" ? (
                      <ProjectListItem
                        project={project}
                        index={index}
                        total={filteredProjects.length}
                        onMouseEnter={setHoveredProject}
                        onMouseLeave={() => setHoveredProject(null)}
                      />
                    ) : (
                      <ProjectTile project={project} index={index} wide={viewMode === "showcase"} />
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
                <p className="text-body text-light/67 mb-4">No se encontraron proyectos</p>
                <button onClick={clearFilters} className="text-light underline hover:no-underline">
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
            <button className="px-8 py-[15px] border border-light/30 text-light text-[13px] font-semibold uppercase hover:border-light transition-colors duration-300 rounded-sm font-mono" style={{ letterSpacing: "0.09em" }}>
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
      className="group flex items-center gap-6 p-6 border border-light/30 hover:border-light transition-all duration-300 rounded-sm"
      whileHover={{ x: 8 }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      {/* Number */}
      <span className="font-mono text-[13px] text-light/50 group-hover:text-light transition-colors w-10 shrink-0">
        {String(total - index).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-light/67 group-hover:text-light transition-colors font-mono">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-[#ffffff] truncate transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-light/67 group-hover:text-light transition-colors">
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
            <p className="text-[10px] uppercase tracking-wider text-light/67 group-hover:text-light transition-colors">
              {result.metric}
            </p>
          </div>
        ))}
      </div>

      <Molinillo className="h-[18px] w-[18px] text-light" />
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
          <div className="w-64 h-44 overflow-hidden shadow-2xl border border-dark/8">
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
