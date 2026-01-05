"use client";

import type React from "react";
import { useState } from "react";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch(
        "https://api.newgeebags.com/api/v1/admin/addProduct",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        });
        setImageFile(null);
        setImagePreview("");

        // Trigger table refresh
        window.dispatchEvent(new CustomEvent("productAdded"));
      } else {
        throw new Error(data.message || "Failed to add product");
      }
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

  const handleOnAddProduct = () => {
    setProductDetailsOpen(!isProductDetailsOpen);
  };

  return (
    <Card className="w-full shadow-md my-8 mx-2 p-0 gap-0">
      <div className="border-b flex justify-between py-6 ">
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
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-500 cursor-pointer px-6 py-2"
            onClick={handleOnAddProduct}
          >
            {isProductDetailsOpen ? "- Hide Form" : "+ Add Product"}
          </Button>
        </div>
      </div>
      <div
        className={`${
          isProductDetailsOpen ? "max-h-250 pt-4" : "max-h-0"
        } overflow-hidden transition-all ease-in-out duration-500`}
      >
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-bold ">Product Details</CardTitle>
          <CardDescription className="mb-4">
            Enter the information for your new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                className="focus-visible:ring-1 focus-visible:ring-blue-600 focus:border-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="focus-visible:ring-1 focus-visible:ring-blue-600 focus:border-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="focus-visible:ring-1 focus-visible:ring-blue-600 focus:border-none"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  className="focus-visible:ring-1 focus-visible:ring-blue-600 focus:border-none"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="">
                Category
              </Label>
              <Input
                id="category"
                placeholder="e.g., photo, laptop, travel"
                className="focus-visible:ring-1 focus-visible:ring-blue-600 focus:border-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                </div>
                {imagePreview && (
                  <div className="h-16 w-16 rounded-lg border border-border overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mx-4 my-12">
              <Button
                type="submit"
                className="w-1/5 h-12 bg-blue-600 rounded-xl hover:bg-blue-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Product...
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
