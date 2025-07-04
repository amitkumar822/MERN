import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import { filters, singleFilter, sortOptions } from "./FilterData";
import { useLocation, useNavigate } from "react-router";
import {
  ProductCard,
  ProductSkeleton,
} from "../../components/Card/CategoryFilterCard/CategoryFilterCard";
import API from "../../api/axiosInstance";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryFilterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Parse the initial category list from the URL
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  // Convert category list from the URL to an object
  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState(filters);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject); // Initialize with URL data
  const [filterCategoryList, setFilterCategoryList] = useState(
    Object.keys(urlCategoryListObject)
  ); // Initialize with URL data
  const [data, setData] = useState([]);

  // Handle checkbox toggle
  const handleFilterCheckboxButton = (value, sectionId) => {
    setFilter((prevFilters) =>
      prevFilters?.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              options: section.options?.map((option) =>
                option.value === value
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : section
      )
    );

    setSelectCategory((prevSelected) => ({
      ...prevSelected,
      [value]: !prevSelected[value],
    }));
  };

  // Sync filter checkbox UI based on URL categories
  useEffect(() => {
    setFilter((prevFilters) =>
      prevFilters?.map((section) => ({
        ...section,
        options: section.options?.map((option) => ({
          ...option,
          checked: !!urlCategoryListObject[option.value],
        })),
      }))
    );
  }, [filters]);

  // Single Filter Price, discount and stock
  const [selectedSingleFilter, setSelectedSingleFilter] = useState({
    price: null,
    discount: null,
    stock: null,
  });

  const handleRadioFilterChange = (value, sectionId) => {
    setSelectedSingleFilter((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === value ? null : value,
    }));
  };

  // Fetch data based on selected filters
  const fetchData = async () => {
    try {
      const response = await API.post("/product/filter", {
        category: filterCategoryList,
        discount: selectedSingleFilter?.discount,
        price: selectedSingleFilter?.price,
      });

      setData(response?.data?.data || []);
      if (response?.data?.data?.length > 0) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList, selectedSingleFilter]);

  // Sync `selectCategory` state with URL and `filterCategoryList`
  useEffect(() => {
    // Create a list of selected categories
    const arrayOfCategory = Object.keys(selectCategory)
      ?.map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    // Update the URL based on selected categories
    const urlFormat = arrayOfCategory?.map((el) => `category=${el}`);
    navigate("/category-filter?" + urlFormat.join("&"), { replace: true });
  }, [selectCategory]);

  useEffect(() => {
    setSelectCategory(urlCategoryListObject);
  }, []);

  // Filter Sort Handler
  const handleSort = (label) => {
    let sortedData = [...data];

    if (label === "priceLowToHigh") {
      sortedData = sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
    }

    if (label === "priceHighToLow") {
      sortedData = sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }

    setData(sortedData);
  };

  return (
    <div className="w-full">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filter?.map((section, index) => (
                  <Disclosure
                    key={index}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>

                    <DisclosurePanel className="pt-6">
                      <div className="space-y-1">
                        {section.options?.map((option, optionIdx) => (
                          <div key={optionIdx} className="flex items-center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() =>
                                    handleFilterCheckboxButton(
                                      option.value,
                                      section.id
                                    )
                                  }
                                  checked={option.checked}
                                  sx={{
                                    color: "", // Unchecked color
                                    "&.Mui-checked": {
                                      color: "blue", // Checked color
                                    },
                                  }}
                                />
                              }
                              label={option.label}
                            />
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop Filter */}
        <main className="w-full mx-auto px-2">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
            <div className="w-full overflow-hidden whitespace-nowrap">
              <div
                className="inline-block animate-scroll md:text-xl text-sm font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600"
                style={{
                  willChange: "transform",
                  width: "max-content",
                }}
              >
                🎉 New Arrivals at AmiShop! 🚀 Up to 70% OFF on Top Products &
                Accessories. 💥 Shop Now & Save Big! 🛒
              </div>
            </div>

            <div className="flex items-center pl-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions?.map((option, index) => (
                      <MenuItem key={index}>
                        <button
                          onClick={() => handleSort(option.label)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-14 pt-1">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block pl-4">
                <div className="flex justify-between items-center py-2">
                  <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                  <FilterListIcon />
                </div>
                {filter?.map((section, index) => (
                  <Disclosure
                    key={index}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-1">
                        {section?.options?.map((option, optionIdx) => (
                          <div
                            key={option.value + optionIdx}
                            className="flex items-center"
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() =>
                                    handleFilterCheckboxButton(
                                      option.value,
                                      section.id
                                    )
                                  }
                                  checked={option.checked}
                                  sx={{
                                    color: "", // Unchecked color
                                    "&.Mui-checked": {
                                      color: "blue", // Checked color
                                    },
                                  }}
                                />
                              }
                              label={option.label}
                            />
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                {/* Price, Discount and Availability Filter */}
                {singleFilter?.map((section, index) => (
                  <Disclosure
                    key={index}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <FormLabel
                          className="text-gray-900"
                          sx={{ color: "black" }}
                          id="demo-radio-buttons-group-label"
                        >
                          {section.name}
                        </FormLabel>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            {section.options?.map((option, optionIdx) => (
                              <div key={optionIdx}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={
                                        selectedSingleFilter[section.id] ===
                                        option.value
                                      }
                                      onChange={() =>
                                        handleRadioFilterChange(
                                          option.value,
                                          section.id
                                        )
                                      }
                                      sx={{
                                        "&.Mui-checked": {
                                          color: "primary.main",
                                        },
                                        "&:hover": {
                                          color: "primary.light",
                                        },
                                      }}
                                    />
                                  }
                                  label={option.label}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* **********👇 Product Card or Right Side Product Card 👇********** */}
              <div className="lg:col-span-4 col-span-2 w-full pb-10 mx-auto md:px-2 min-h-[85vh] max-h-[120vh] overflow-y-auto bg-gradient-to-r from-rose-100 to-teal-100">
                {filterCategoryList.length === 0 && (
                  <h1 className="text-xl font-bold">
                    Please Select Category😊
                  </h1>
                )}
                <div className="w-full mx-auto flex flex-wrap gap-[6px] mt-2">
                  {filterCategoryList.length === 0 || loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                      ))
                    : data?.map((product, index) => (
                        <ProductCard product={product} index={index} key={product._id} />
                      ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
