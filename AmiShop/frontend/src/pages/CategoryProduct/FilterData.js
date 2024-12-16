export const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { label: "Airpodes", value: "airpodes", checked: false },
      { label: "Camera", value: "camera", checked: false },
      { label: "Earphones", value: "earphones", checked: false },
      { label: "Mobiles", value: "mobiles", checked: false },
      { label: "Mouse", value: "mouse", checked: false },
      { label: "Printers", value: "printers", checked: false },
      { label: "Processor", value: "processor", checked: false },
      { label: "Refrigerator", value: "refrigerator", checked: false },
      { label: "Speakers", value: "speakers", checked: false },
      { label: "Trimmers", value: "trimmers", checked: false },
      { label: "Televisions", value: "televisions", checked: false },
      { label: "Watches", value: "watches", checked: false },
      { label: "Washing Machine", value: "washingmachine", checked: false },
      { label: "Laptop", value: "laptops", checked: false },
    ],
  },
  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "2l", label: "2L", checked: false },
  //     { value: "6l", label: "6L", checked: false },
  //     { value: "12l", label: "12L", checked: false },
  //     { value: "18l", label: "18L", checked: false },
  //     { value: "20l", label: "20L", checked: false },
  //     { value: "40l", label: "40L", checked: true },
  //   ],
  // },
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: true },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To ₹399" },
      { value: "399-999", label: "₹399 To ₹999" },
      { value: "999-1999", label: "₹999 To ₹1999" },
      { value: "1999-2999", label: "₹1999 To ₹2999" },
      { value: "3999-4999", label: "₹3999 To ₹4999" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "inStock", label: "In Stock" },
      { value: "outOfStock", label: "Out Of Stock" },
    ],
  },
];

export const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
