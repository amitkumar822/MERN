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
import axios from "axios";
import SearchVerticalCart from "../../components/Card/SearchVerticalCart/SearchVerticalCart";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryFilterPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
      prevFilters.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              options: section.options.map((option) =>
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
    // Update checkbox checked state in filters
    setFilter((prevFilters) =>
      prevFilters.map((section) => ({
        ...section,
        options: section.options.map((option) => ({
          ...option,
          checked: !!urlCategoryListObject[option.value],
        })),
      }))
    );
  }, [filters]);

  // Fetch data based on selected filters
  const fetchData = async () => {
    try {
      const response = await axios.post("/api/product/filter", {
        category: filterCategoryList,
      });

      setData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  // Sync `selectCategory` state with URL and `filterCategoryList`
  useEffect(() => {
    // Create a list of selected categories
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    // Update the URL based on selected categories
    const urlFormat = arrayOfCategory.map((el) => `category=${el}`);
    navigate("/category-filter?" + urlFormat.join("&"), { replace: true });
  }, [selectCategory]);

  // Sync URL categories with checkbox state on initial render
  useEffect(() => {
    setSelectCategory(urlCategoryListObject); // Set initial category state from URL
  }, []);

  return (
    <div className="w-full bg-white">
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
                {filter.map((section, index) => (
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
                        {section.options.map((option, optionIdx) => (
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
            <h1 className="md:text-2xl font-semibold tracking-tight text-gray-900">
              Discover What's New
            </h1>

            <div className="flex items-center">
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
                    {sortOptions.map((option, index) => (
                      <MenuItem key={index}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
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
              <form className="hidden lg:block">
                <div className="flex justify-between items-center py-2">
                  <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                  <FilterListIcon />
                </div>
                {filter.map((section, index) => (
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
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value + optionIdx} className="flex items-center">
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
                {singleFilter.map((section, index) => (
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
                            {section.options.map((option, optionIdx) => (
                              <div key={optionIdx}>
                                <FormControlLabel
                                  onChange={(e) =>
                                    handleRadioFilterChange(e, section.id)
                                  }
                                  value={option.value}
                                  control={<Radio />}
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
              <div className="lg:col-span-4 col-span-2 w-full mx-auto p-4 bg-red-500">
                <div className=" flex flex-wrap gap-4 md:gap-6">
                  {data?.length &&
                    data.map((product, index) => (
                      <ProductCard product={product} key={index} />
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
