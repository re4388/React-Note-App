import React from "react";
// 有一些現成的icon 來自 react-icons...
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchNote }) => {
  return (
    <div className="search">
      {/* 放大鏡圖示 */}
      <MdSearch className="search-icons" size="1.3em" />

      <input
        // handleSearchNote is passing from parent
        // so the logic is defined at parent
        // handleSearchNote is directly bind to setSearchText
        onChange={(e) => handleSearchNote(e.target.value)}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
};

export default Search;
