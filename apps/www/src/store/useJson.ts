import { create } from "zustand";

interface JsonActions {
  setJson: (json: string) => void;
  getJson: () => string;
  clear: () => void;
  updateNodeValue: (path: (string | number)[], newValue: any) => void;
}

const initialStates = {
  json: "{}",
  loading: true,
};

export type JsonStates = typeof initialStates;

const useJson = create<JsonStates & JsonActions>()((set, get) => ({
  ...initialStates,
  getJson: () => get().json,
  setJson: json => {
    set({ json, loading: false });
  },
  clear: () => {
    set({ json: "", loading: false });
  },
  updateNodeValue: (path, newValue) => {
    const currentJsonString = get().json;
    try {
      const parsed = JSON.parse(currentJsonString);
      if (path.length === 0) {
        set({ json: JSON.stringify(newValue, null, 2) });
        return;
      }
      let current = parsed;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = newValue;
      set({ json: JSON.stringify(parsed, null, 2) });
    } catch (e) {
      console.error("Failed to update node value", e);
    }
  },
}));

export default useJson;
