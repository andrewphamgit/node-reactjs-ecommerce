import React, {createContext, useState} from "react";

export const ShopContext = createContext({});

const ShopContextProvider = (props) => {

  const [filterSearchContext, setFilterSearchContext] = useState({
    showSearch: false,
    contentSearch: "",
  });

  const value = {
    filterSearchContext, setFilterSearchContext,
    products: [
      {
        "id": "1",
        "name": "Women's Round Neck Cotton Top",
        "description": "A lightweight, usually knitted, pullover shirt, close-fitting",
        "price": 200,
        "currencyCode": "USD",
        "category": "Women",
        "images": ["https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/12/ao-cardigan-whoau-steve-r-neck-cardigan-whckf1121f-mau-trang-phoi-xanh-6764d59bba317-20122024092531.jpg","https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/08/ao-polo-nam-ralph-lauren-slim-fit-rlneunavy-mau-xanh-navy-size-s-64e437aa2f58d-22082023112058.jpg"],
        "sizes": ["S", "M", "L"],
        "bestSeller": true
      },
      {
        "id": "2",
        "name": "Men's Straight Leg Jeans",
        "description": "Men's jeans with a straight leg style, comfortable to wear",
        "price": 350,
        "category": "Men",
        "images": ["https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2025/02/bo-quan-ao-coc-tay-nam-adidas-arsenal-tiro-24-training-jersey-mau-tim-dam-size-s-67b951e3e415e-22022025112611.jpg", "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/11/ao-khoac-phao-mlb-basic-hood-short-padding-new-york-yankees-3adjb1146-50bks-mau-den-size-s-6729de855873d-05112024155949.jpg"],
        "sizes": ["S", "M", "L"],
        "bestSeller": false
      },
      {
        "id": "3",
        "name": "Floral Print Flared Dress",
        "description": "Flared dress with a floral print, suitable for summer",
        "price": 280,
        "category": "Women",
        "images": [],
        "sizes": ["S", "M", "L"],
        "bestSeller": true
      },
      {
        "id": "4",
        "name": "Men's Long Sleeve Dress Shirt",
        "description": "Men's long sleeve dress shirt, elegant and classy",
        "price": 320,
        "category": "Men",
        "images": [],
        "sizes": ["M", "L", "XL"],
        "bestSeller": false
      },
      {
        "id": "5",
        "name": "Women's Leather Jacket",
        "description": "Women's leather jacket, stylish and edgy",
        "price": 550,
        "category": "Women",
        "images": [],
        "sizes": ["S", "M", "L"],
        "bestSeller": true
      },
      {
        "id": "6",
        "name": "Men's Dress Pants",
        "description": "Men's dress pants, formal and sophisticated",
        "price": 400,
        "category": "Men",
        "images": [],
        "sizes": ["30", "32", "34"],
        "bestSeller": false
      },
      {
        "id": "7",
        "name": "Beach Maxi Dress",
        "description": "Long maxi dress, perfect for beach vacations",
        "price": 300,
        "category": "Women",
        "images": [],
        "sizes": ["S", "M", "L"],
        "bestSeller": true
      },
      {
        "id": "8",
        "name": "Men's Crew Neck T-Shirt",
        "description": "Men's crew neck t-shirt, simple and comfortable",
        "price": 180,
        "category": "Men",
        "images": [],
        "sizes": ["M", "L", "XL"],
        "bestSeller": false
      },
      {
        "id": "9",
        "name": "A-Line Skirt",
        "description": "A-line skirt, easy to mix and match",
        "price": 250,
        "category": "Women",
        "images": [],
        "sizes": ["S", "M", "L"],
        "bestSeller": true
      },
      {
        "id": "10",
        "name": "Men's Winter Jacket",
        "description": "Men's winter jacket, warm and stylish",
        "price": 450,
        "category": "Men",
        "images": [],
        "sizes": ["M", "L", "XL"],
        "bestSeller": false
      },
    ],
  };

  return(
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;