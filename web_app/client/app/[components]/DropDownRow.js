import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

// Function to create option objects
const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const categoryOptions = [
  createOption('Fridge'),
  createOption('Washing Machine'),
  createOption('Air Conditioner'),
];

const companyOptions = [
  createOption('Whirlpool'),
  createOption('Samsung'),
  createOption('LG'),
];

const modelOptions = [
  createOption('Model A'),
  createOption('Model B'),
  createOption('Model C'),
];

export default function DropDownRow() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [companyValue, setCompanyValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);

  // Handle creation of new options
  const handleCreate = (inputValue, type) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      if (type === 'category') {
        setCategoryValue(newOption);
        console.log('Created Category:', newOption); // Log the newly created category
      } else if (type === 'company') {
        setCompanyValue(newOption);
        console.log('Created Company:', newOption); // Log the newly created company
      } else if (type === 'model') {
        setModelValue(newOption);
        console.log('Created Model:', newOption); // Log the newly created model
      }
    }, 1000);
  };

  // Log the selected values to the console whenever they change
  const handleCategoryChange = (newValue) => {
    setCategoryValue(newValue);
    console.log('Selected Category:', newValue); // Log selected category
  };

  const handleCompanyChange = (newValue) => {
    setCompanyValue(newValue);
    console.log('Selected Company:', newValue); // Log selected company
  };

  const handleModelChange = (newValue) => {
    setModelValue(newValue);
    console.log('Selected Model:', newValue); // Log selected model
  };

  return (
    <div className="mt-24 flex gap-4 mx-6 flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap bg-white ">
  {/* Category Dropdown */}
  <div className="w-full sm:w-full md:w-1/2 lg:w-1/3">
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleCategoryChange}
      onCreateOption={(inputValue) => handleCreate(inputValue, 'category')}
      options={categoryOptions}
      value={categoryValue}
      placeholder="Select or create category"
    />
  </div>

  {/* Company Dropdown */}
  <div className="w-full sm:w-full md:w-1/2 lg:w-1/3">
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleCompanyChange}
      onCreateOption={(inputValue) => handleCreate(inputValue, 'company')}
      options={companyOptions}
      value={companyValue}
      placeholder="Select or create company"
    />
  </div>

  {/* Model Dropdown */}
  <div className="w-full sm:w-full md:w-1/2 lg:w-1/3">
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleModelChange}
      onCreateOption={(inputValue) => handleCreate(inputValue, 'model')}
      options={modelOptions}
      value={modelValue}
      placeholder="Select or create model"
    />
  </div>
</div>

  )
}
