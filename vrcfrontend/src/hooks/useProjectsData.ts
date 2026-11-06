import { useState, useEffect, useMemo } from 'react';
import { Project, Category } from '@/components/data/types';
import { projectService } from '@/services/projectService';

const PROJECTS_CACHE_KEY = 'vrc_projects_list_cache';
const PROJECT_CATS_CACHE_KEY = 'vrc_project_cats_cache';

let memoryProjectsCache: Project[] | null = null;
let memoryCategoriesCache: Category[] | null = null;

const getInitialProjects = (): Project[] => {
  if (memoryProjectsCache) return memoryProjectsCache;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          memoryProjectsCache = parsed;
          return parsed;
        }
      }
    } catch {
      // ignore storage error
    }
  }
  return [];
};

const getInitialCategories = (): Category[] => {
  if (memoryCategoriesCache) return memoryCategoriesCache;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(PROJECT_CATS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          memoryCategoriesCache = parsed;
          return parsed;
        }
      }
    } catch {
      // ignore storage error
    }
  }
  return [];
};

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>(getInitialProjects);
  const [categories, setCategories] = useState<Category[]>(getInitialCategories);
  const [isLoading, setIsLoading] = useState<boolean>(
    () => projects.length === 0 && categories.length === 0
  );
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          projectService.getProjects(),
          projectService.getProjectCategories()
        ]);

        if (isMounted) {
          if (projRes.success && projRes.data) {
            memoryProjectsCache = projRes.data;
            setProjects(projRes.data);
            try {
              localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(projRes.data));
            } catch {
              // ignore storage error
            }
          }
          if (catRes.success && catRes.data) {
            memoryCategoriesCache = catRes.data;
            setCategories(catRes.data);
            try {
              localStorage.setItem(PROJECT_CATS_CACHE_KEY, JSON.stringify(catRes.data));
            } catch {
              // ignore storage error
            }
          }
        }
      } catch (err) {
        console.error('Failed to load projects data:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesFilter =
        selectedFilter === 'all'
          ? true
          : selectedFilter === 'featured'
          ? Boolean(proj.is_featured)
          : proj.category_id === selectedFilter ||
            (typeof proj.category === 'object' && (proj.category as any)?.slug === selectedFilter);

      if (!matchesFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const catName =
        typeof proj.category === 'object' && proj.category
          ? ((proj.category as any).name || '').toLowerCase()
          : '';
      return (
        proj.name.toLowerCase().includes(q) ||
        (proj.client && proj.client.toLowerCase().includes(q)) ||
        (proj.description && proj.description.toLowerCase().includes(q)) ||
        catName.includes(q)
      );
    });
  }, [projects, selectedFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: projects.length,
      featured: projects.filter((p) => p.is_featured).length
    };
    categories.forEach((c) => {
      counts[c.id] = projects.filter((p) => p.category_id === c.id).length;
    });
    return counts;
  }, [projects, categories]);

  return {
    projects,
    categories,
    filteredProjects,
    categoryCounts,
    isLoading,
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery
  };
};
