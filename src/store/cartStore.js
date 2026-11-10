import { create } from 'zustand'

const STORAGE_KEY = 'assignment7-cart'

function readItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved) && saved.every((item) =>
      item && Number.isInteger(item.id) && typeof item.title === 'string'
      && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0
    )) {
      return saved
    }
  } catch {
    // A missing or unreadable cart starts empty.
  }
  return []
}

export const useCartStore = create((set, get) => ({
  items: readItems(),

  addItem(product) {
    const { id, title, price } = product
    set(({ items }) => {
      if (items.some((item) => item.id === id)) {
        return {
          items: items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }
      return { items: [...items, { id, title, price, quantity: 1 }] }
    })
  },

  removeItem(id) {
    set(({ items }) => ({ items: items.filter((item) => item.id !== id) }))
  },

  setQuantity(id, quantity) {
    if (quantity < 1) {
      get().removeItem(id)
      return
    }

    set(({ items }) => ({
      items: items.map((item) => item.id === id ? { ...item, quantity } : item),
    }))
  },

  clear() {
    set({ items: [] })
  },
}))

useCartStore.subscribe((state, previousState) => {
  if (state.items === previousState.items) return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  } catch {
    // The in-memory cart remains usable if storage is unavailable.
  }
})
