import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Grid3X3, List, X } from "lucide-react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

type ViewMode = "grid" | "bento" | "list";

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("bento");

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

  const hasActiveFilters = searchQuery !== "" || activeCategory !== null;

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#141414aa]" />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent border border-[#14141420] text-[#141414] placeholder:text-[#141414aa] focus:border-[#141414] focus:outline-none transition-colors text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#141414aa] hover:text-[#141414] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 border border-[#14141420] p-1">
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
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            activeCategory === null
              ? "bg-[#141414] text-[#f1ede1]"
              : "border border-[#14141430] text-[#141414] hover:border-[#141414]"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Todos ({projects.length})
        </motion.button>
        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-[#141414] text-[#f1ede1]"
                  : "border border-[#14141430] text-[#141414] hover:border-[#141414]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category} ({count})
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

      {/* Projects Grid */}
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className={
                viewMode === "list"
                  ? "flex flex-col gap-4"
                  : viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
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
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  {viewMode === "list" ? (
                    <ProjectListItem project={project} index={index} />
                  ) : (
                    <ProjectCard
                      project={project}
                      index={index}
                      size={viewMode === "grid" ? "medium" : getCardSize(project, index)}
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
              <p className="text-[#141414aa] text-lg mb-4">
                No se encontraron proyectos
              </p>
              <button
                onClick={clearFilters}
                className="text-[#141414] underline hover:no-underline"
              >
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
          <button className="px-8 py-4 border border-[#141414] text-[#141414] text-sm font-semibold uppercase tracking-wider hover:bg-[#141414] hover:text-[#f1ede1] transition-all duration-300">
            Cargar más proyectos
          </button>
        </motion.div>
      )}
    </div>
  );
}

// List view item component
function ProjectListItem({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={`/proyectos/${project.slug}`}
      className="group flex items-center gap-6 p-6 border border-[#14141420] hover:border-[#141414] hover:bg-[#141414] transition-all duration-300"
      whileHover={{ x: 8 }}
    >
      {/* Number */}
      <span className="text-4xl font-bold text-[#14141420] group-hover:text-[#f1ede130] transition-colors w-16 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#141414aa] group-hover:text-[#f1ede1aa] transition-colors">
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
