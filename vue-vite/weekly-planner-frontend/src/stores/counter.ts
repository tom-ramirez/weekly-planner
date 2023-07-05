import { defineStore } from "pinia";

export type State = {
  count: number;
};

export const useCounterStore = defineStore("countStore", {
  state: (): State => ({ count: 1 }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
