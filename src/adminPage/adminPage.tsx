import { ProductForm } from "@/components/product-form"
import { ProductTable } from "@/components/product-table"
import { Package } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">NewGee Bags Admin</h1>
            <p className="text-sm text-muted-foreground">Manage your product inventory</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Product Section */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
              <p className="text-muted-foreground">Fill in the details to add a new product to your store</p>
            </div>
            <ProductForm />
          </section>

          {/* Product List Section */}
          <section className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Product Inventory</h2>
              <p className="text-muted-foreground">View and manage all your products</p>
            </div>
            <ProductTable />
          </section>
        </div>
      </main>
      <Toaster />
    </div>
  )
}
