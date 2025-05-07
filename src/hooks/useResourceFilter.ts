import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useParams } from "react-router";
import { IntResource } from "../types";

interface UseResourceFilterProps {
  resources: IntResource[];
  themes: readonly string[];
  resourceTypes: readonly string[];
}

export const useResourceFilter = ({
  resources,
  themes,
  resourceTypes,
}: UseResourceFilterProps) => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTheme = searchParams.get("theme") || themes[0];
  const initialResourceTypes = searchParams
    .get("resourceTypes")
    ?.split(",") || [resourceTypes[0]];
  const searchQuery = searchParams.get("search") || "";
  const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
  const [selectedResourceTypes, setSelectedResourceTypes] =
    useState<string[]>(initialResourceTypes);

  useEffect(() => {
    if (category) {
      setSelectedResourceTypes([...resourceTypes]);
    }
  }, [category, resourceTypes]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTheme) {
      params.set("theme", selectedTheme);
    }
    if (
      selectedResourceTypes.length > 0 &&
      selectedResourceTypes.some((type) => type.trim() !== "")
    ) {
      params.set("resourceTypes", selectedResourceTypes.join(","));
    }
    if (!params.has("search") && searchQuery) {
      params.set("search", searchQuery);
    }
    setSearchParams(params);
  }, [selectedTheme, selectedResourceTypes, searchQuery, setSearchParams]);

  const resetTheme = () => {
    setSelectedTheme(() => themes[0]);
  };
  const filteredResources = useMemo(() => {
    if (!resources || !category) return [];

    return resources.filter((resource) => {
      const categoryMatch = !category || resource.category === category;
      const themeMatch =
        selectedTheme === "Todos" || resource.theme === selectedTheme;
      const typeMatch =
        selectedResourceTypes.length === 0 ||
        selectedResourceTypes.some(
          (selectedType) => resource.type === selectedType,
        );
      const searchMatch =
        !searchQuery ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && themeMatch && typeMatch && searchMatch;
    });
  }, [resources, category, selectedTheme, selectedResourceTypes, searchQuery]);

  return {
    filteredResources,
    selectedTheme,
    setSelectedTheme,
    selectedResourceTypes,
    setSelectedResourceTypes,
    resetTheme,
  };
};
