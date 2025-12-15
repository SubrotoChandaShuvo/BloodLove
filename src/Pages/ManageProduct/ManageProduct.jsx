import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosInstance
      .get(`/manager/products/${user?.email}`)
      .then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosInstance, user?.email]);

  // console.log(products);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index}>
                <th>{index+1}</th>
                <td>{product?.product_name}</td>
                <td>{product?.color}</td>
                <td>{product?.size}</td>
                <td>{product?.selling_quantity}</td>
                <td>{product?.unit_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
