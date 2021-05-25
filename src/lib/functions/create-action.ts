
  export function createAction<T>(type: string, p?: () => T) {
    const ac = (props?: T) => ({ ...p?.(), ...props, type } as T);
    ac.type = type;
    return ac;
  };