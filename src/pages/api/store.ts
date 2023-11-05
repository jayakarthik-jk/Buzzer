export let selectedUserId: number | null = null;

export const setSelectedUserId = (id: number | null) => {
  selectedUserId = id;
  listeners.forEach((listener) => listener(selectedUserId));
};

export type Listener = (newUser: number | null) => void;

const listeners = new Set<Listener>();

export const onUserChange = (listener: Listener) => listeners.add(listener);
