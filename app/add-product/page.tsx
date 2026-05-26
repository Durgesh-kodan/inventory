import Sidebar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { Link } from "lucide-react";

export default async function AddProductPage() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <Sidebar currentPath="/add-product" />

        <main className="ml-64 p-8 ">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Add-Product
                </h1>
                <p className="text-sm text-gray-500">
                  Add a new Product to your inventory and start tracking its
                  details and stock levels
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-2xl ">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <form action={createProduct} className="space-y-6 ">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Price *
                    </label>
                    <input
                      type="Number"
                      id="Price"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Quantity *
                    </label>
                    <input
                      type="Number"
                      id="Quantity"
                      name="quantity"
                      min="0"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    SKU (optional)
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lowStockAt"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Low Stock Alert(optional)
                  </label>
                  <input
                    type="Number"
                    id="LowStockAt"
                    name="lowStockAt"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                    placeholder="Enter Low Stock threshold"
                  />
                </div>
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="bg-purple-300 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Add Product
                  </button>
                  <Link
                    href="/inventory"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
