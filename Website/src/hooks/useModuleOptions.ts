import { useRepos } from "./useRepos";

interface UseModuleOptions {
  isVerified: boolean;
  isHidden: boolean;
}

export const useModuleOptions = (moduleId: string | undefined): UseModuleOptions => {
  const { moduleOptions } = useRepos();

  if (moduleId) {
    return {
      isVerified: moduleOptions[moduleId]?.verified || false,
      isHidden: moduleOptions[moduleId]?.hidden || false,
    };
  } else {
    return {
      isVerified: false,
      isHidden: false,
    };
  }
};
