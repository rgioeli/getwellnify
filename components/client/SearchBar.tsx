"use client";

import { debounce } from "@/utils/debounce";
import { NextPage } from "next";
import { ChangeEvent, useRef, useEffect, FormEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchExternalApi } from "@/utils/fetchExternalApi";
import { flattenNestedArray } from "@/utils/flattenNestedArray";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { store } from "@/zustand/store";

interface Props {}

const SearchBar: NextPage<Props> = ({}) => {
  //* useRef
  const inputRef = useRef<HTMLInputElement>(null);

  //* useState

  //* zustand store
  const { searchError, setSearchError, searchTerms, setSearchTerms } = store();

  const handleDebounce = debounce(() => {
    setSearchError(false);
    // call the database for search terms
    if (inputRef.current?.value === "") return;
    fetchExternalApi(
      `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${inputRef.current?.value}`
    ).then((data) => {
      data = flattenNestedArray(data);
      if (!data.length) {
        setSearchTerms(null);
        return setSearchError(true);
      }

      setSearchError(false);
      setSearchTerms(data);
    });
  }, 500);

  const handleClickOnSearchTerm = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const searchTerm = e.currentTarget.getAttribute("data-value");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }

    if (inputRef.current?.value === "") {
      setSearchTerms(null);
    }

    handleDebounce(e);
  };

  return (
    <div
      className={`bg-primary flex items-center relative ${
        searchTerms || searchError ? "rounded-none" : "rounded-full"
      }`}
    >
      <BsSearch color={"#fff"} size={18} className="mx-3" />
      <input
        className={`${
          searchTerms || searchError ? "rounded-none" : "rounded-full"
        } w-full p-3 outline-none rounded-full bg-gradient-to-r from-[#5ebbc0] to-[#4b9599] text-white placeholder-white text-lg"`}
        placeholder="Search channels (i.e. medical term)"
        type="search"
        ref={inputRef}
        onChange={handleChange}
      />
      {searchTerms && searchTerms.length > 0 ? (
        <div className="absolute top-full left-0 w-full bg-white rounded-b-md p-3 z-10 flex flex-col items-start text-slate-500 gap-y-3 border-2 border-[#5ebbc0]">
          {searchTerms.map((searchTerm) => (
            <Link
              key={searchTerm}
              href={`/dashboard/timeline?channel=${searchTerm}`}
              onClick={() => {
                setSearchError(false);
                setSearchTerms(null);
              }}
            >
              {searchTerm}
            </Link>
          ))}
        </div>
      ) : (
        searchError && (
          <div className="absolute top-full left-0 w-full bg-white rounded-b-md p-3 z-10 flex flex-col items-start text-slate-500 gap-y-3 border-2 border-[#5ebbc0]">
            <p className="font-medium">
              No results for {inputRef.current?.value.trim()}
            </p>
            <p>Would you like us to verify and add this medical diagnosis?</p>
            <div className="flex items-center space-x-3">
              <CustomButton type="button" text="Yes" additionalStyling="py-1" />
              <p
                onClick={() => setSearchError(false)}
                className="text-sm slate-500 cursor-pointer"
              >
                No thanks
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
