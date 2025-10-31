'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'

type SourceType = 'GRANT' | 'DONATION' | 'CONTRIBUTION' | 'PARTNERSHIP' | 'SALE'

interface ContributionEntry {
  id: string
  memberName: string
  amount: number
}

export default function ResourcesPage() {
  const [sources, setSources] = useState<{ type: SourceType; label: string; total: number }[]>([
    { type: 'GRANT', label: 'Subventions', total: 3500000 },
    { type: 'DONATION', label: 'Dons', total: 1200000 },
    { type: 'CONTRIBUTION', label: 'Cotisations mensuelles', total: 800000 },
    { type: 'PARTNERSHIP', label: 'Partenariats', total: 600000 },
    { type: 'SALE', label: 'Ventes', total: 300000 },
  ])

  const [newSource, setNewSource] = useState<{ type: SourceType; amount: string }>({ type: 'GRANT', amount: '' })

  const [contributions, setContributions] = useState<ContributionEntry[]>([])
  const [newContribution, setNewContribution] = useState<{ memberName: string; amount: string }>({ memberName: '', amount: '' })

  const addSource = () => {
    const amt = Number(newSource.amount)
    if (!amt || amt <= 0) return
    setSources(prev => prev.map(s => s.type === newSource.type ? { ...s, total: s.total + amt } : s))
    setNewSource({ type: newSource.type, amount: '' })
  }

  const addContribution = () => {
    const amt = Number(newContribution.amount)
    if (!newContribution.memberName.trim() || !amt || amt <= 0) return
    setContributions(prev => [
      ...prev,
      { id: crypto.randomUUID(), memberName: newContribution.memberName.trim(), amount: amt }
    ])
    // Maj du total cotisations
    setSources(prev => prev.map(s => s.type === 'CONTRIBUTION' ? { ...s, total: s.total + amt } : s))
    setNewContribution({ memberName: '', amount: '' })
  }

  const removeContribution = (id: string) => {
    const entry = contributions.find(c => c.id === id)
    setContributions(prev => prev.filter(c => c.id !== id))
    if (entry) {
      setSources(prev => prev.map(s => s.type === 'CONTRIBUTION' ? { ...s, total: s.total - entry.amount } : s))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sources de revenus</CardTitle>
            <CardDescription>Ajoutez des montants par type de source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Type</Label>
                  <Select value={newSource.type} onValueChange={(v) => setNewSource({ ...newSource, type: v as SourceType })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GRANT">Subvention</SelectItem>
                      <SelectItem value="DONATION">Don</SelectItem>
                      <SelectItem value="CONTRIBUTION">Cotisation</SelectItem>
                      <SelectItem value="PARTNERSHIP">Partenariat</SelectItem>
                      <SelectItem value="SALE">Vente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Montant</Label>
                  <Input type="number" placeholder="0" value={newSource.amount} onChange={e => setNewSource({ ...newSource, amount: e.target.value })} />
                </div>
                <div className="flex items-end">
                  <Button className="w-full" onClick={addSource}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {sources.map(src => (
                  <div key={src.type} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">{src.label}</span>
                    <span className="font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(src.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cotisations mensuelles</CardTitle>
            <CardDescription>Ajoutez les membres ayant cotisé et les montants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Label>Nom du membre</Label>
                  <Input placeholder="Ex: Aminata Diallo" value={newContribution.memberName} onChange={e => setNewContribution({ ...newContribution, memberName: e.target.value })} />
                </div>
                <div>
                  <Label>Montant</Label>
                  <Input type="number" placeholder="0" value={newContribution.amount} onChange={e => setNewContribution({ ...newContribution, amount: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={addContribution}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter la cotisation
                </Button>
              </div>

              <div className="space-y-2">
                {contributions.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Aucune cotisation ajoutée pour le moment.</p>
                )}
                {contributions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{c.memberName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Montant: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(c.amount)}</p>
                    </div>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => removeContribution(c.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


