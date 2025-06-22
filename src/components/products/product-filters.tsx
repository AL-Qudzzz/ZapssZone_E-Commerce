"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/placeholder-data";

type ProductFiltersProps = {
  filters: {
    price: number;
  };
  selectedCategories: string[];
  selectedRatings: number[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onPriceChange: (value: number[]) => void;
  onRatingChange: (rating: number, checked: boolean) => void;
};

export function ProductFilters({
  filters,
  selectedCategories,
  selectedRatings,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["category", "price"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.name}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked) => onCategoryChange(category.name, !!checked)}
                  />
                  <Label htmlFor={`cat-${category.name}`} className="flex-1 font-normal cursor-pointer">
                    {category.name}
                  </Label>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="p-1">
              <Slider
                value={[filters.price]}
                onValueChange={onPriceChange}
                max={1000}
                step={10}
              />
               <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>${filters.price}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger className="text-base font-semibold">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => onRatingChange(rating, !!checked)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="font-normal cursor-pointer">
                    {rating} star & up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
