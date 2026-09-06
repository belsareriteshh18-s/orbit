'use client'

import { useMemo, useState } from 'react'
import {
  Archive,
  ArrowLeft,
  ArrowUpDown,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  Grid2X2,
  Heart,
  LayoutDashboard,
  List,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Product = {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'Active' | 'Draft' | 'Archived'
  description: string
  updated: string
  color: string
  favorite?: boolean
}

const initialProducts: Product[] = [
  { id: '1', name: 'Orbit Pro', sku: 'ORB-PRO-001', category: 'Software', price: 149, stock: 999, status: 'Active', description: 'Advanced workspace automation for teams that move fast.', updated: '2 hours ago', color: 'from-sky-500/25 to-indigo-500/10', favorite: true },
  { id: '2', name: 'Launch Kit', sku: 'LCH-KIT-204', category: 'Templates', price: 79, stock: 245, status: 'Active', description: 'Everything you need to launch a polished product experience.', updated: 'Yesterday', color: 'from-violet-500/25 to-fuchsia-500/10' },
  { id: '3', name: 'Signal Analytics', sku: 'SIG-ANA-019', category: 'Software', price: 249, stock: 84, status: 'Active', description: 'Turn customer signals into your next best decision.', updated: '3 days ago', color: 'from-emerald-500/25 to-teal-500/10' },
  { id: '4', name: 'Founder Pack', sku: 'FND-PCK-088', category: 'Bundles', price: 399, stock: 32, status: 'Draft', description: 'A focused toolkit for building your first 100 customers.', updated: '5 days ago', color: 'from-amber-500/25 to-orange-500/10' },
  { id: '5', name: 'API Access', sku: 'API-ACC-400', category: 'Services', price: 59, stock: 1200, status: 'Active', description: 'Reliable, secure access to the Orbit platform API.', updated: '1 week ago', color: 'from-cyan-500/25 to-blue-500/10' },
  { id: '6', name: 'Legacy Reports', sku: 'LEG-RPT-120', category: 'Software', price: 29, stock: 0, status: 'Archived', description: 'Historical reporting tools for archived workspaces.', updated: '2 weeks ago', color: 'from-slate-500/25 to-slate-500/10' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Products', icon: Package, active: true },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Customers', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
]

function Logo() {
  return <div className="flex items-center gap-2.5"><div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background"><Sparkles className="size-4" /></div><span className="text-sm font-semibold tracking-tight">orbit<span className="text-muted-foreground">/</span>commerce</span></div>
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card/40 px-3 py-5">
    <div className="px-3"><Logo /></div>
    <div className="mt-10 flex flex-1 flex-col gap-1">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
      {navItems.map(({ label, icon: Icon, active }) => <button key={label} onClick={onClose} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors', active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground')}><Icon className="size-4" />{label}{label === 'Orders' && <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">12</span>}</button>)}
      <p className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Manage</p>
      {[['Billing', CreditCard], ['Reports', FileText], ['Shipping', Truck]].map(([label, Icon]) => <button key={label as string} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"><Icon className="size-4" />{label as string}</button>)}
    </div>
    <div className="flex flex-col gap-1 border-t border-border pt-4"><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"><Settings className="size-4" />Settings</button><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"><CircleHelp className="size-4" />Help center</button><div className="mt-3 flex items-center gap-3 rounded-lg bg-secondary/50 p-3"><div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-semibold text-white">JD</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">Jordan Davis</p><p className="truncate text-[11px] text-muted-foreground">Admin</p></div><MoreHorizontal className="size-4 text-muted-foreground" /></div></div>
  </aside>
}

function StatusBadge({ status }: { status: Product['status'] }) {
  return <Badge variant="outline" className={cn('gap-1.5 border-current/20 font-normal', status === 'Active' && 'text-emerald-400', status === 'Draft' && 'text-amber-400', status === 'Archived' && 'text-muted-foreground')}><span className={cn('size-1.5 rounded-full bg-current')} />{status}</Badge>
}

function ProductArt({ product, compact = false }: { product: Product; compact?: boolean }) {
  return <div className={cn('relative flex overflow-hidden rounded-xl border border-border bg-gradient-to-br', product.color, compact ? 'h-12 w-12 shrink-0 items-center justify-center' : 'h-40 items-center justify-center')}><Package className={cn('relative text-foreground/70', compact ? 'size-5' : 'size-12')} /><div className="absolute -right-4 -top-7 size-24 rounded-full border border-foreground/10" /><div className="absolute -bottom-8 -left-3 size-28 rounded-full border border-foreground/10" /></div>
}

function ProductCard({ product, onSelect, onEdit, onDelete, onFavorite }: { product: Product; onSelect: () => void; onEdit: () => void; onDelete: () => void; onFavorite: () => void }) {
  return <article className="group overflow-hidden rounded-xl border border-border bg-card/60 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card"><button className="block w-full text-left" onClick={onSelect}><ProductArt product={product} /></button><div className="flex flex-col gap-4 p-4"><div className="flex items-start justify-between gap-3"><button onClick={onSelect} className="min-w-0 text-left"><h3 className="truncate text-sm font-semibold group-hover:text-foreground">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground">{product.sku}</p></button><button aria-label={`Favorite ${product.name}`} onClick={onFavorite} className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"><Heart className={cn('size-4', product.favorite && 'fill-foreground text-foreground')} /></button></div><div className="flex items-center justify-between"><StatusBadge status={product.status} /><span className="text-sm font-medium">${product.price}<span className="text-xs font-normal text-muted-foreground"> / item</span></span></div><div className="flex items-center justify-between border-t border-border pt-3"><span className="text-xs text-muted-foreground">{product.stock > 0 ? `${product.stock.toLocaleString()} in stock` : 'Out of stock'}</span><div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"><Button variant="ghost" size="icon" aria-label="Edit product" onClick={onEdit}><Settings className="size-3.5" /></Button><Button variant="ghost" size="icon" aria-label="Delete product" onClick={onDelete}><Trash2 className="size-3.5" /></Button></div></div></div></article>
}

function ProductForm({ product, onCancel, onSave }: { product?: Product; onCancel: () => void; onSave: (data: Omit<Product, 'id' | 'updated' | 'color'>) => void }) {
  const [name, setName] = useState(product?.name ?? '')
  const [sku, setSku] = useState(product?.sku ?? '')
  const [category, setCategory] = useState(product?.category ?? 'Software')
  const [price, setPrice] = useState(String(product?.price ?? ''))
  const [stock, setStock] = useState(String(product?.stock ?? ''))
  const [description, setDescription] = useState(product?.description ?? '')
  const [status, setStatus] = useState<Product['status']>(product?.status ?? 'Active')
  const [error, setError] = useState('')
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!name.trim() || !sku.trim() || !price || !description.trim()) { setError('Complete all required fields before saving.'); return }; setError(''); onSave({ name: name.trim(), sku: sku.trim(), category, price: Number(price), stock: Number(stock) || 0, description: description.trim(), status }) }
  return <form onSubmit={submit} className="flex flex-col gap-6"><div className="grid gap-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Product name <span className="text-rose-400">*</span></span><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Orbit Pro" /></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">SKU <span className="text-rose-400">*</span></span><Input value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. ORB-PRO-001" /></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Category</span><select value={category} onChange={e => setCategory(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Software</option><option>Templates</option><option>Bundles</option><option>Services</option></select></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Status</span><select value={status} onChange={e => setStatus(e.target.value as Product['status'])} className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Active</option><option>Draft</option><option>Archived</option></select></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Price <span className="text-rose-400">*</span></span><Input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" /></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Inventory</span><Input type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} placeholder="0" /></label></div><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Description <span className="text-rose-400">*</span></span><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe what makes this product valuable..." rows={4} /></label>{error && <p role="alert" className="text-sm text-rose-400">{error}</p>}<div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit">{product ? 'Save changes' : 'Create product'}</Button></div></form>
}

export default function Page() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [status, setStatus] = useState('All statuses')
  const [sort, setSort] = useState('Recently updated')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<Product | null>(null)
  const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => { const result = products.filter(p => { const matchesQuery = `${p.name} ${p.sku} ${p.description}`.toLowerCase().includes(query.toLowerCase()); return matchesQuery && (category === 'All categories' || p.category === category) && (status === 'All statuses' || p.status === status) }); return [...result].sort((a, b) => sort === 'Name A-Z' ? a.name.localeCompare(b.name) : sort === 'Price: low to high' ? a.price - b.price : new Date(b.updated).getTime() - new Date(a.updated).getTime()) }, [products, query, category, status, sort])
  const saveProduct = (data: Omit<Product, 'id' | 'updated' | 'color'>) => { if (formMode === 'edit' && selected) { setProducts(current => current.map(p => p.id === selected.id ? { ...p, ...data } : p)); toast.success('Product updated successfully'); setSelected(null) } else { setProducts(current => [{ ...data, id: String(Date.now()), updated: 'Just now', color: 'from-sky-500/25 to-indigo-500/10' }, ...current]); toast.success('Product created successfully') }; setFormMode(null) }
  const confirmDelete = () => { if (!deleteTarget) return; setProducts(current => current.filter(p => p.id !== deleteTarget.id)); setDeleteTarget(null); setSelected(null); toast.success('Product deleted') }
  const retry = () => { setLoading(true); setTimeout(() => setLoading(false), 700) }
  const clearFilters = () => { setQuery(''); setCategory('All categories'); setStatus('All statuses') }

  if (formMode) return <div className="min-h-screen bg-background"><header className="flex h-16 items-center border-b border-border px-5 lg:px-8"><Button variant="ghost" size="icon" onClick={() => setFormMode(null)} aria-label="Back"><ArrowLeft /></Button><div className="ml-3"><p className="text-sm font-semibold">{formMode === 'edit' ? 'Edit product' : 'Add product'}</p><p className="text-xs text-muted-foreground">{formMode === 'edit' ? 'Update product details and availability.' : 'Create a new product for your catalog.'}</p></div></header><main className="mx-auto max-w-3xl px-5 py-10 lg:px-8"><div className="mb-8"><p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Catalog / Products</p><h1 className="text-3xl font-semibold tracking-tight">{formMode === 'edit' ? 'Edit product' : 'Add a product'}</h1></div><div className="rounded-xl border border-border bg-card/60 p-5 sm:p-8"><ProductForm product={formMode === 'edit' ? selected ?? undefined : undefined} onCancel={() => setFormMode(null)} onSave={saveProduct} /></div></main></div>

  if (selected) return <div className="min-h-screen bg-background"><header className="flex h-16 items-center justify-between border-b border-border px-5 lg:px-8"><Button variant="ghost" onClick={() => setSelected(null)}><ArrowLeft data-icon="inline-start" />Back to products</Button><div className="flex gap-2"><Button variant="outline" onClick={() => setFormMode('edit')}>Edit</Button><Button variant="destructive" onClick={() => setDeleteTarget(selected)}><Trash2 data-icon="inline-start" />Delete</Button></div></header><main className="mx-auto max-w-5xl px-5 py-8 lg:px-8"><div className="mb-8 flex items-start gap-5"><ProductArt product={selected} compact /><div><div className="mb-2 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-semibold tracking-tight">{selected.name}</h1><StatusBadge status={selected.status} /></div><p className="text-sm text-muted-foreground">{selected.sku} · {selected.category}</p></div></div><div className="grid gap-5 lg:grid-cols-[1fr_300px]"><section className="rounded-xl border border-border bg-card/60 p-6"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">About this product</p><p className="max-w-2xl leading-7 text-muted-foreground">{selected.description}</p><div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-3"><div><p className="text-xs text-muted-foreground">Price</p><p className="mt-1 text-xl font-semibold">${selected.price}</p></div><div><p className="text-xs text-muted-foreground">Inventory</p><p className="mt-1 text-xl font-semibold">{selected.stock.toLocaleString()}</p></div><div><p className="text-xs text-muted-foreground">Last updated</p><p className="mt-1 text-sm font-medium">{selected.updated}</p></div></div></section><aside className="rounded-xl border border-border bg-card/60 p-6"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Product details</p><div className="flex flex-col gap-4 text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Category</span><span>{selected.category}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">SKU</span><span>{selected.sku}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Availability</span><span>{selected.stock > 0 ? 'In stock' : 'Out of stock'}</span></div></div></aside></div></main>{deleteTarget && <DeleteModal product={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}</div>

  return <div className="flex min-h-screen bg-background"><div className={cn('fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden', mobileNav ? 'block' : 'hidden')} onClick={() => setMobileNav(false)} /><div className={cn('fixed inset-y-0 left-0 z-50 transition-transform lg:static lg:block', mobileNav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}><Sidebar onClose={() => setMobileNav(false)} /></div><div className="min-w-0 flex-1"><header className="flex h-16 items-center justify-between border-b border-border px-5 lg:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><List /></Button><div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><span>Catalog</span><ChevronRight className="size-3" /><span className="text-foreground">Products</span></div><div className="sm:hidden"><Logo /></div></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button><div className="hidden size-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-semibold text-white sm:flex">JD</div></div></header><main className="mx-auto max-w-[1480px] px-5 py-8 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Catalog</p><h1 className="text-3xl font-semibold tracking-tight">Products</h1><p className="mt-2 text-sm text-muted-foreground">Manage your product catalog and inventory.</p></div><Button onClick={() => { setSelected(null); setFormMode('create') }}><Plus data-icon="inline-start" />Add product</Button></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><Stat label="Total products" value={products.length.toString()} change="+12.5%" icon={Package} /><Stat label="Active products" value={products.filter(p => p.status === 'Active').length.toString()} change="+8.2%" icon={Tag} /><Stat label="Low stock" value={products.filter(p => p.stock < 50).length.toString()} change="Needs attention" icon={Archive} /></div><div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-3 lg:flex-row lg:items-center"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0" /></div><Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal data-icon="inline-start" />Filters</Button><div className={cn('flex flex-col gap-2 lg:flex-row', showFilters ? 'flex' : 'hidden lg:flex')}><select value={category} onChange={e => setCategory(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring"><option>All categories</option><option>Software</option><option>Templates</option><option>Bundles</option><option>Services</option></select><select value={status} onChange={e => setStatus(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring"><option>All statuses</option><option>Active</option><option>Draft</option><option>Archived</option></select><select value={sort} onChange={e => setSort(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring"><option>Recently updated</option><option>Name A-Z</option><option>Price: low to high</option></select><div className="flex rounded-md border border-input p-0.5"><Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => setView('grid')} aria-label="Grid view"><Grid2X2 /></Button><Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => setView('list')} aria-label="List view"><List /></Button></div></div></div><div className="mb-4 mt-6 flex items-center justify-between"><p className="text-sm text-muted-foreground">Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> of {products.length} products</p><Button variant="ghost" size="sm" className="hidden text-muted-foreground sm:flex" onClick={retry}><ArrowUpDown data-icon="inline-start" />Sort by {sort}</Button></div>{loading ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /></div> : filteredProducts.length === 0 ? <EmptyState hasFilters={Boolean(query || category !== 'All categories' || status !== 'All statuses')} onClear={clearFilters} onCreate={() => setFormMode('create')} /> : view === 'grid' ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map(product => <ProductCard key={product.id} product={product} onSelect={() => setSelected(product)} onEdit={() => { setSelected(product); setFormMode('edit') }} onDelete={() => setDeleteTarget(product)} onFavorite={() => setProducts(current => current.map(p => p.id === product.id ? { ...p, favorite: !p.favorite } : p))} />)}</div> : <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card/60">{filteredProducts.map(product => <div key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><ProductArt product={product} compact /><button onClick={() => setSelected(product)} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.sku} · {product.category}</p></button><StatusBadge status={product.status} /><span className="text-sm font-medium">${product.price}</span><Button variant="ghost" size="icon" onClick={() => setDeleteTarget(product)} aria-label={`Delete ${product.name}`}><Trash2 /></Button></div>)}</div>}<div className="mt-8 flex items-center justify-between border-t border-border pt-5"><p className="text-xs text-muted-foreground">Page 1 of 1</p><div className="flex gap-2"><Button variant="outline" size="sm" disabled><ChevronLeft data-icon="inline-start" />Previous</Button><Button variant="outline" size="sm" disabled>Next<ChevronRight data-icon="inline-end" /></Button></div></div></main></div>{deleteTarget && <DeleteModal product={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}</div>
}

function Stat({ label, value, change, icon: Icon }: { label: string; value: string; change: string; icon: typeof Package }) { return <div className="rounded-xl border border-border bg-card/40 p-4"><div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{label}</span><Icon className="size-4 text-muted-foreground" /></div><div className="mt-3 flex items-end justify-between"><span className="text-2xl font-semibold tracking-tight">{value}</span><span className="text-xs text-muted-foreground">{change}</span></div></div> }
function EmptyState({ hasFilters, onClear, onCreate }: { hasFilters: boolean; onClear: () => void; onCreate: () => void }) { return <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/20 px-6 text-center"><div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary"><Search className="size-5 text-muted-foreground" /></div><h2 className="text-sm font-semibold">{hasFilters ? 'No matching products' : 'Your catalog is empty'}</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">{hasFilters ? 'Try adjusting your search or filters to find what you are looking for.' : 'Add your first product to start building your catalog.'}</p><Button variant={hasFilters ? 'outline' : 'default'} className="mt-5" onClick={hasFilters ? onClear : onCreate}>{hasFilters ? 'Clear filters' : <><Plus data-icon="inline-start" />Add product</>}</Button></div> }
function DeleteModal({ product, onCancel, onConfirm }: { product: Product; onCancel: () => void; onConfirm: () => void }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive"><Trash2 className="size-5" /></div><Button variant="ghost" size="icon" onClick={onCancel} aria-label="Close"><X /></Button></div><h2 id="delete-title" className="mt-5 text-lg font-semibold">Delete {product.name}?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Are you sure you want to delete this product? This action cannot be undone and will remove it from your catalog.</p><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button variant="outline" onClick={onCancel}>Cancel</Button><Button variant="destructive" onClick={onConfirm}><Trash2 data-icon="inline-start" />Delete product</Button></div></div></div> }
