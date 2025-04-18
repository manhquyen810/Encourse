"use client";
export const SearchForm = ({onChange}) => {
    return (
        <input
            type="search"
            className="w-full p-2 border-2 border-gray-200 rounded-xl md:border-gray-200 "
            placeholder="Từ khóa"
            onChange={onChange}/>
    );
};
