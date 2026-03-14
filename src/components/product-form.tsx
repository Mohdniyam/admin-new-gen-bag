"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProductForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // ✅ Multiple image support
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // ✅ Handle image change (single + multiple)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Cleanup old previews
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImageFiles(fileArray);

    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    setImagePreviews(previewArray);
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);

      // 👇 IMPORTANT — append as "media"
      imageFiles.forEach((file) => {
        formDataToSend.append("media", file);
      });

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ngtest.newgeebags.com/api/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      toast({
        title: "Success",
        description: "Product added successfully!",
      });

      // ✅ Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });

      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImageFiles([]);
      setImagePreviews([]);

      window.dispatchEvent(new CustomEvent("productAdded"));
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

  return (
    <Card className="w-full shadow-md my-8 mx-2 p-0 gap-0">
      <div className="border-b flex justify-between py-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mx-6">
            Add New Product
          </h2>
          <p className="text-sm text-muted-foreground mx-6">
            Fill in the details to add a new product to your store
          </p>
        </div>

        <div className="flex items-center justify-center mx-4">
          <Button
            className="rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2"
            onClick={() => setProductDetailsOpen(!isProductDetailsOpen)}
          >
            {isProductDetailsOpen ? "- Hide Form" : "+ Add Product"}
          </Button>
        </div>
      </div>

      <div
        className={`${
          isProductDetailsOpen ? "max-h-300 pt-4" : "max-h-0"
        } overflow-hidden transition-all duration-500`}
      >
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-bold">Product Details</CardTitle>
          <CardDescription>
            Enter the information for your new product
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <Label className="pt-2">Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {/* Price & Stock */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label>Product Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {/* Preview */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-3">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="h-20 w-20 rounded-lg border overflow-hidden"
                    >
                      <img
                        src={src}
                        className="h-full w-full object-cover"
                        alt="Preview"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Upload className="mr-1 h-4 w-4" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
