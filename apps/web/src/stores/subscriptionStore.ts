import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Subscription } from "../types/subscription";

interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
  removeSubscription: (id: string) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      subscriptions: [],

      addSubscription: (subscription) =>
        set((state) => ({
          subscriptions: [...state.subscriptions, subscription],
        })),

      removeSubscription: (id) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter(
            (subscription) => subscription.id !== id,
          ),
        })),
    }),
    {
      name: "subscription-storage",
    },
  ),
);
