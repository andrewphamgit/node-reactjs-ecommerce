import React, {useContext} from 'react';
import {assets_images} from "../assets/assets.js";
import {ShopContext} from "../contexts/shop.context.jsx";

const SearchBarComponent = () => {

  const {filterSearchContext, setFilterSearchContext} = useContext(ShopContext);

  if (!filterSearchContext.showSearch) {
    return null;
  }
  return (
    <div className={'border-t border-b bg-gray-50 text-center'}>
      <div className={'inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'}>
        <input onChange={(e) => setFilterSearchContext({...filterSearchContext, contentSearch: e.target.value})}
               value={filterSearchContext.contentSearch}
               className={'flex-1 outline-none bg-inherit text-sm'}
               type={'text'} placeholder={'Search'}
        />
        <img className={'w-4'} src={assets_images.search_icon} alt={''} />
      </div>
      <img onChange={() => setFilterSearchContext({...filterSearchContext, showSearch: false})} className={'inline w-3 cursor-pointer'} src={assets_images.remove_icon} alt={''} />
    </div>
  )
}

export default SearchBarComponent;
