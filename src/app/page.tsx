'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useState } from 'react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      await open()
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">ENS Viewer</h1>
      {!isConnected ? (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Connected Address: {address}</p>
          <p className="mb-4">ENS Name: {ensName || 'No ENS name found'}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </main>
  )
}