import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe MetaMask detection utility
export function isMetaMaskAvailable(): boolean {
  if (typeof window === 'undefined') return false

  // Check if MetaMask is installed
  const { ethereum } = window as any
  return Boolean(ethereum && ethereum.isMetaMask)
}

// Safe MetaMask connection (only call this when actually needed)
export async function connectMetaMask(): Promise<string | null> {
  if (!isMetaMaskAvailable()) {
    console.warn('MetaMask is not available')
    return null
  }

  try {
    const { ethereum } = window as any
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    return accounts[0] || null
  } catch (error) {
    console.error('Failed to connect to MetaMask:', error)
    return null
  }
}

// Utility to check if we're in a browser environment
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
