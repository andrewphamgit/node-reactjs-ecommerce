import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../../contexts/shop.context.jsx";
import {assets_images} from "../../assets/assets.js";
import TitleComponent from "../../components/title.component.jsx";
import ProductItemComponent from "../../components/product-item.component.jsx";
import ProductService from "../../services/product.service.js";
import {toast} from "react-toastify";

const CollectionPage = () => {

  const {filterSearchContext} = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(true);
  const [paramsFilter, setParamsFilter] = useState({
    categories: [],
    subCategories: [],
    sortPrice: "",
    pageSize: 0,
    rowsPerPage: 25,
  });
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    applyFilter();
  }, [paramsFilter, filterSearchContext.contentSearch]);

  function applyFilter() {
    let buildParams = {
      ...paramsFilter,
      categories: JSON.stringify(paramsFilter.categories),
      subCategories: JSON.stringify(paramsFilter.subCategories),
      contentSearch: filterSearchContext.contentSearch || '',
    }
    ProductService.getList(buildParams).then(res => {
      if (res?.success) {
        setFilterProducts(res.products);
      } else {
        toast.error(res?.message);
      }
    }).catch(error => {
      toast.error(error.message);
      console.log(error);
    });
    // let tmpProducts = products;
    // if (paramsFilter.categories.length > 0 && paramsFilter.sizes.length > 0) {
    //   tmpProducts = tmpProducts.filter(item => paramsFilter.categories.includes(item.category) && paramsFilter.sizes.includes(item.size));
    // } else if (paramsFilter.categories.length > 0) {
    //   tmpProducts = tmpProducts.filter(item => paramsFilter.categories.includes(item.category));
    // } else if (paramsFilter.sizes.length > 0) {
    //   tmpProducts = tmpProducts.filter(item => paramsFilter.sizes.includes(item.size));
    // }
    //
    // if (filterSearchContext.showSearch && filterSearchContext.contentSearch !== '') {
    //   tmpProducts = tmpProducts.filter(item => item.name.toLowerCase().includes(filterSearchContext.contentSearch.toLowerCase()));
    // }
    //
    // setFilterProducts(tmpProducts);
  }

  function toggleCategory(event) {
    const value = event.target.value;
    let tmpCategories = paramsFilter.categories;
    if (tmpCategories.includes(value)) {
      tmpCategories = tmpCategories.filter(cate => cate !== value);
    } else {
      tmpCategories = [...tmpCategories, value];
    }
    setParamsFilter({
      ...paramsFilter,
      categories: tmpCategories,
    });
  }

  function toggleSubCategories(event) {
    const value = event.target.value;
    let tmpSubCategories = paramsFilter.subCategories;
    if (tmpSubCategories.includes(value)) {
      tmpSubCategories = tmpSubCategories.filter(cate => cate !== value);
    } else {
      tmpSubCategories = [...tmpSubCategories, value];
    }
    setParamsFilter({
      ...paramsFilter,
      subCategories: tmpSubCategories,
    });
  }

  function sortPrice(event) {
    setParamsFilter({
      ...paramsFilter,
      sortPrice: event.target.value,
    });
  }

  return (
    <div className={'flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'}>
      {/* Filter Options */}
      <div className={'min-w-60'}>
        <p onClick={() => setShowFilter(!showFilter)} className={'my-2 text-xl flex items-center cursor-pointer gap-2'}>FILTERS
          <img src={assets_images.back_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-270' : 'rotate-180'}`} />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
          <p className={'mb-3 text-sm font-medium'}>CATEGORIES</p>
          <div className={'flex flex-col gap-2 text-sm font-light text-gray-700'}>
            <p className={'flex gap-2'}>
              <input onChange={toggleCategory} className={'w-3'} type={'checkbox'} value={'Clothes'} /> Clothes
            </p>
            <p className={'flex gap-2'}>
              <input onChange={toggleCategory} className={'w-3'} type={'checkbox'} value={'Shoes'} /> Shoes
            </p>
            <p className={'flex gap-2'}>
              <input onChange={toggleCategory} className={'w-3'} type={'checkbox'} value={'Bags'} /> Bags
            </p>
            <p className={'flex gap-2'}>
              <input onChange={toggleCategory} className={'w-3'} type={'checkbox'} value={'Perfume'} /> Perfume
            </p>
          </div>
        </div>

        {/* Size Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
          <p className={'mb-3 text-sm font-medium'}>SUB CATEGORIES</p>
          <div className={'flex flex-col gap-2 text-sm font-light text-gray-700'}>
            <p className={'flex gap-2'}>
              <input onChange={toggleSubCategories} className={'w-3'} type={'checkbox'} value={'Shirt'} /> Shirt
            </p>
            <p className={'flex gap-2'}>
              <input onChange={toggleSubCategories} className={'w-3'} type={'checkbox'} value={'T-Shirt'} /> T-Shirt
            </p>
            <p className={'flex gap-2'}>
              <input onChange={toggleSubCategories} className={'w-3'} type={'checkbox'} value={'Polo'} /> Polo
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={'flex-1'}>
        {/* Product Sort */}
        <div className={'flex justify-between text-base sm:text-2xl mb-4'}>
          <TitleComponent text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={sortPrice} className={'border-2 border-gray-300 text-sm px-2'}>
            <option value={''}>Sort by: Relavent</option>
            <option value={'low-high'}>Sort by: Low to High</option>
            <option value={'high-low'}>Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'}>
          {filterProducts.map((item, index) => <ProductItemComponent key={index+'_'+item.id} product={item} /> )}
        </div>
      </div>

    </div>
  )
}

export default CollectionPage;
