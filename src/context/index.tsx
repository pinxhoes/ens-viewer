'use client'

import { config, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'

// Create Web3Modal
createWeb3Modal({ wagmiConfig: config, projectId })

// Create a client
const queryClient = new QueryClient()

export default function Web3ModalProvider({ children, initialState }: {
    children: React.ReactNode,
    initialState?: any
}) {
    return (
        <WagmiConfig config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiConfig>
    )
}