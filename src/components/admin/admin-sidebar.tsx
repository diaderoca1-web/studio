
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, CreditCard, Users, Settings, Landmark } from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/scratchcards', label: 'Raspadinhas', icon: CreditCard },
    { href: '/admin/users', label: 'Usuários', icon: Users },
    { href: '/admin/withdrawals', label: 'Saques', icon: Landmark },
    { href: '/admin/settings', label: 'Configurações', icon: Settings },
  ]

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="text-lg font-bold">
          Admin Panel
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}
