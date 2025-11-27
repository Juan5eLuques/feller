import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: string
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'text-[#b71c1c]',
}: StatCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#b71c1c]/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400">{icon}</div>
        {trend && (
          <span
            className={`text-sm ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
