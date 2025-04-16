import React, {useRef, useState} from "react";
import UploadImagesComponent from "../components/upload-images.component.jsx";
import ProductService from "../services/product.service.js";
import {toast} from "react-toastify";

const initProductState = {
  name: "",
  description: "",
  category: "Clothes",
  subCategory: "Shirt",
  gender: "Men",
  price: "",
  bestseller: false,
  sizes: [],
}

const AddPage = () => {

  const refUploadImage = useRef(null);
  const [formProduct, setFormProduct] = useState(initProductState);

  function onChangeForm(event) {
      setFormProduct({
        ...formProduct,
        [event.target.name]: event.target.value,
      });
  }

  function onSelectedSizes(value) {
    let tmpFormProduct = {...formProduct};
    if (tmpFormProduct.sizes.includes(value)) {
      setFormProduct({
        ...tmpFormProduct,
        sizes: tmpFormProduct.sizes.filter(s => s !== value),
      });
    } else {
      tmpFormProduct.sizes.push(value);
      setFormProduct(tmpFormProduct);
    }
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      const formSubmitData = new FormData();
      Object.keys(formProduct).forEach(field => {
        if ("string" === typeof formProduct[field]) {
          formSubmitData.append(field, formProduct[field]);
        } else {
          formSubmitData.append(field, JSON.stringify(formProduct[field]));
        }
      });

      const uploadedImages = refUploadImage.current?.getFileList() || [];
      uploadedImages.forEach(file => formSubmitData.append("uploadedImages", file.originFileObj));

      const response = await ProductService.update(formSubmitData);
      if (response.success) {
        setFormProduct({...initProductState});
        refUploadImage.current?.resetFileList();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className={'flex flex-col w-full items-start gap-3'}>
      <div className={'w-full max-w-[500px]'}>
        <p className={'mb-2'}>Upload Image</p>
        <UploadImagesComponent ref={refUploadImage} />
      </div>

      <div className={'w-full max-w-[500px]'}>
        <p className={'mb-2'}>Product name</p>
        <input type={"text"} placeholder={'Type here'} required={true}
               className={'w-full max-w-[500px] px-3 py-2'}
               value={formProduct.name} name={"name"}
               onChange={onChangeForm}
        />
      </div>

      <div className={'w-full max-w-[500px]'}>
        <p className={'mb-2'}>Description</p>
        <textarea placeholder={'Write content here'} required={true}
                  className={'w-full h-[100px] px-3 py-2'}
                  value={formProduct.description} name={"description"}
                  onChange={onChangeForm}
        />
      </div>

      <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[500px] sm:gap-8'}>
        <div className={'w-full'}>
          <p className={'mb-2'}>Category</p>
          <select className={'w-full px-3 py-2'}
                  value={formProduct.category} name={"category"}
                  onChange={onChangeForm}
          >
            <option value={"Clothes"}>Clothes</option>
            <option value={"Shoes"}>Shoes</option>
            <option value={"Bags"}>Bags</option>
            <option value={"Perfume"}>Perfume</option>
          </select>
        </div>
        <div className={'w-full max-w-[500px]'}>
          <p className={'mb-2'}>Sub Category</p>
          <select className={'w-full px-3 py-2'}
                  value={formProduct.subCategory} name={"subCategory"}
                  onChange={onChangeForm}
          >
            <option value={"Shirt"}>Shirt</option>
            <option value={"T-Shirt"}>T-Shirt</option>
            <option value={"Polo"}>Polo</option>
          </select>
        </div>
      </div>

      <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[500px] sm:gap-8'}>
        <div>
          <p className={'mb-2'}>Gender</p>
          <select className={'w-full px-3 py-2'}
                  value={formProduct.gender} name={"gender"}
                  onChange={onChangeForm}
          >
            <option value={"Men"}>Men</option>
            <option value={"Women"}>Women</option>
            <option value={"Kids"}>Kids</option>
            <option value={"Unisex"}>Unisex</option>
          </select>
        </div>

        <div>
          <p className={'mb-2'}>Price</p>
          <input type={"number"} placeholder={'1'} required={true}
                 className={'w-full px-3 py-2'}
                 value={formProduct.price} name={"price"}
                 onChange={onChangeForm}
          />
        </div>
      </div>

      <div className={'w-full max-w-[500px]'}>
        <p className={'mb-2'}>Sizes</p>
        <div className={'flex gap-3'}>
          <div onClick={() => onSelectedSizes("S")}>
            <p className={`${formProduct.sizes.includes("S") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => onSelectedSizes("M")}>
            <p className={`${formProduct.sizes.includes("M") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => onSelectedSizes("L")}>
            <p className={`${formProduct.sizes.includes("L") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => onSelectedSizes("XL")}>
            <p className={`${formProduct.sizes.includes("XL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
        </div>
      </div>

      <div className={'flex gap-2 mt-2'}>
        <input onChange={() => setFormProduct({...formProduct, bestseller: !formProduct.bestseller})} checked={formProduct.bestseller} type={"checkbox"} id={"bestseller"} />
        <label className={'cursor-pointer'} htmlFor={'bestseller'}>Add to bestseller</label>
      </div>

      <button className={'w-28 py-3 mt-4 bg-black text-white'} type={"submit"}>ADD</button>

    </form>
  )
}

export default AddPage;