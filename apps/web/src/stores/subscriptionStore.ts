import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Subscription } from "../types/subscription";

interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (updatedSubscription: Subscription) => void;
  removeSubscription: (id: string) => void;
  removeAllSubscriptions: (ids: string[]) => void;
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

      removeAllSubscriptions: (ids) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter(
            (item) => !ids.includes(item.id),
          ),
        })),

      updateSubscription: (updatedSubscription) =>
        set((state) => ({
          subscriptions: state.subscriptions.map((subscription) =>
            subscription.id === updatedSubscription.id
              ? updatedSubscription
              : subscription,
          ),
        })),
    }),

    {
      name: "subscription-storage",
    },
  ),
);
