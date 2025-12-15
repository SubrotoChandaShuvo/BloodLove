import axios from "axios";
import React, { useState } from "react";
import useAxios from "../../../hooks/useAxios";

const AddProduct = () => {
  const [showHome, setShowHome] = useState(false);

  const axiosInstance = useAxios()

  const handleAddProduct = (e) => {
    e.preventDefault();

    const form = e.target;

    // Collect form data
    const formData = {
      product_name: form.product_name.value,
      category: form.category.value,
      size: form.size.value,
      color: form.color.value,
      available_quantity: parseInt(form.available_quantity.value),
      selling_quantity: parseInt(form.selling_quantity.value),
      unit_price: parseFloat(form.unit_price.value),
      discount_percent: parseFloat(form.discount_percent.value) || 0,
      customer_name: form.customer_name.value,
      payment_method: form.payment_method.value,
      show_on_home: showHome,
      remarks: form.remarks.value,
      showHome
    };

    // console.log("Product Data to send:", formData);
    axiosInstance.post('/products', formData)
    .then(res=>{
        console.log(res.data);  
        alert(res.data.insertedId)      
    })
    .catch(err=>console.log(err))


    // // Optional: calculate total price
    // const totalPrice =
    //   productData.unit_price * productData.selling_quantity -
    //   (productData.unit_price * productData.selling_quantity * productData.discount_percent) / 100;

    // productData.total_price = totalPrice.toFixed(2);


    // Example POST request to backend
    /*
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error(err));
    */

    // Reset form if needed
    // form.reset();
    // setShowHome(false);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleAddProduct}
        className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-xl p-6 space-y-4"
      >
        <legend className="fieldset-legend text-lg font-semibold">
          Sell Product
        </legend>

        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            type="text"
            name="product_name"
            className="input input-bordered w-full"
            placeholder="Men Cotton T-Shirt"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select Category</option>
            <option value="t_shirt">T-Shirt</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="jacket">Jacket</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="label">Size</label>
          <select name="size" className="select select-bordered w-full" required>
            <option value="">Select Size</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="label">Color</label>
          <input type="text" name="color" className="input input-bordered w-full" placeholder="Black" />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="label">Available Quantity</label>
          <input
            type="number"
            name="available_quantity"
            className="input input-bordered w-full"
            min="0"
            placeholder="200"
            required
          />
        </div>

        {/* Selling Quantity */}
        <div>
          <label className="label">Selling Quantity</label>
          <input
            type="number"
            name="selling_quantity"
            className="input input-bordered w-full"
            min="1"
            placeholder="10"
            required
          />
        </div>

        {/* Unit Price */}
        <div>
          <label className="label">Unit Price</label>
          <input
            type="number"
            name="unit_price"
            className="input input-bordered w-full"
            min="0"
            step="0.01"
            placeholder="15.00"
            required
          />
        </div>

        {/* Discount */}
        <div>
          <label className="label">Discount (%)</label>
          <input
            type="number"
            name="discount_percent"
            className="input input-bordered w-full"
            min="0"
            max="100"
            placeholder="5"
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="label">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            className="input input-bordered w-full"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="label">Payment Method</label>
          <select name="payment_method" className="select select-bordered w-full" required>
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_banking">Mobile Banking</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        {/* Show on Home Page */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="show_on_home"
            id="show_on_home"
            className="checkbox checkbox-primary"
            checked={showHome}
            onChange={() => setShowHome(!showHome)}
          />
          <label htmlFor="show_on_home" className="label cursor-pointer">
            Show on Home Page
          </label>
        </div>

        {/* Remarks */}
        <div>
          <label className="label">Remarks</label>
          <textarea
            name="remarks"
            className="textarea textarea-bordered w-full"
            rows="2"
            placeholder="Optional notes..."
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="reset" className="btn btn-outline" onClick={() => setShowHome(false)}>
            Clear
          </button>
          <button type="submit" className="btn btn-primary">
            Add Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
