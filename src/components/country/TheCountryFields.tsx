import { SetCountryInput } from "../form/types";
import { TheTextInput } from "../form/inputs/TheTextInput";
import React, { useState } from "react";
import { getCountries } from "../form/location/location";
import { Country } from "../form/location/types";
import { MapPin } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TheCountryFieldsProps {
  setInput: (props: SetCountryInput) => void;
  editing: boolean;
  country: SetCountryInput;
}

export function TheCountryFields({
  editing,
  setInput,
  country,
}: TheCountryFieldsProps) {
  // console.log("country query  === ",country)
  const [finishedSearch, setFinishedSearch] = useState(false);
  const [keyword, setKeyword] = React.useState({
    word: (country.country as string) ??"",
  });

  const { data, error } = useSuspenseQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    // enabled: (country.country.length !== 0 && keyword.word.length < 1 ),
    // enabled: (!country_query.loading),
    select: (data) => {
      if (Array.isArray(data)) {
        return data.filter((item) => {
          if (editing && !finishedSearch) {
            return item.name.common
              .toLocaleLowerCase()
              .includes(keyword.word.toLocaleLowerCase());
          }
          return (
            item.name.common.toLocaleLowerCase() ===
            keyword.word.toLocaleLowerCase()
          );
        });
      }
      return data;
    },
  });

  // const { data, loading, error } = useHandRolledQuery<Country[]>({
  //   queryKey: ["countries",country.country],
  //   queryFn: getCountries,
  //   // enabled: (country.country.length !== 0 && keyword.word.length < 1 ),
  //   // enabled: (!country_query.loading),
  //   select: (data) => {
  //     if (Array.isArray(data)) {
  //       return data.filter((item) => {
  //         if (editing && !finishedSearch) {
  //           return item.name.common
  //             .toLocaleLowerCase()
  //             .includes(keyword.word.toLocaleLowerCase());
  //         }
  //         return (
  //           item.name.common.toLocaleLowerCase() ===
  //           keyword.word.toLocaleLowerCase()
  //         );
  //       });
  //     }
  //     return data;
  //   },
  // });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setFinishedSearch(false);
    setKeyword({ ...keyword, [e.target.id]: value });
  };

  const finishSearch = (item: Country) => {
    if (editing) {
      setKeyword({ word: item.name.common });
      setInput({
        country: item.name.common,
        city: item?.capital[0] ?? "",
        phone: item.idd.root + item.idd.suffixes[0],
      });

      setFinishedSearch(true);
    }
  };

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-error/5">
        <div className="flex h-full w-[80%] items-center justify-center  text-sm text-error p-5">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-sm flex cursor-pointer flex-col lg:flex-row items-center  gap-2 ">
      <div className="w-full  flex  cursor-pointer flex-col items-center  gap-1 sm:pl-2">
        {editing && (
          <div className="w-full flex flex-col gap-[1px] ">
            <TheTextInput
              field_key={"word"}
              field_name={<MapPin className="w-4 h-4" />}
              autoComplete="off"
              val={keyword.word??""}
              onChange={handleChange}
              container_classname="w-full flex-row items-center "
              className="w-full "
              label_classname=""
              placeholder={"search for country"}
            />
            {country.country === "" && (
              <h2 className="text-sm text-warning">
                click on a country to select
              </h2>
            )}
          </div>
        )}
        {editing && data && data?.length < 1 ? (
          <div className="flex h-full w-full items-center justify-center bg-error/5">
          <div
            className="flex h-full  cursor-pointer break-inside-auto p-7 flex-col items-center
          justify-center text-sm text-error-content
        "
          >
          0 results found{" "}
          </div>
          </div>
        ) : null}
        {/* {!editing&&<div className="flex ">{country.country}</div>} */}

        <div className=" w-full flex flex-wrap items-center justify-center rounded-lg duration-500 animate-in fade-in">
          {data?.slice(0, 10).map((item, idx: number) => {
            return (
              <div
                key={item.name.official + idx}
                onClick={() => finishSearch(item)}
                className="flex min-w-fit items-center justify-center rounded-lg border-2 px-2
                py-1 text-center duration-100 ease-in hover:bg-accent/30"
              >
                <div> {item.name.common} </div>
                <img className="mx-1 h-3 w-5" src={item.flags.svg} />
              </div>
            );
          })}
        </div>
      </div>

      <TheCountryCityPhoneFields
        country={country}
        setCountry={setInput}
        editing={editing}
      />
    </div>
  );
}

interface TheCountryCityPhoneFieldsProps {
  country: SetCountryInput;
  setCountry: (props: SetCountryInput) => void;
  editing?: boolean;
}

export function TheCountryCityPhoneFields({
  country,
  setCountry,
  editing,
}: TheCountryCityPhoneFieldsProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value } = e.target;
    setCountry({ ...country, [e.target.id]: value });
  }
  return (
    <div className="flex  w-fit flex-wrap items-center justify-start gap-2 ">
      {editing ? (
        <TheTextInput
          val={country?.city??""}
          field_key={"city"}
          field_name={"city"}
          container_classname="w-fit flex-row items-center justify-center"
          className="input input-bordered input-sm w-full"
          onChange={handleChange}
          editing={editing}
        />
      ) : (
        <div className="flex gap-2">
          <h3 className="font-bold text-accent">City:</h3>
          {country?.city}
        </div>
      )}

      {editing ? (
        <TheTextInput
          val={country?.phone??""}
          field_key={"phone"}
          type="tel"
          field_name={"phone"}
          container_classname="w-fit flex-row items-center justify-center"
          className="input input-bordered input-sm w-full "
          onChange={handleChange}
          editing={editing}
        />
      ) : (
        <div className="flex gap-2">
          <h3 className="font-bold text-accent">Phone:</h3>
          {country?.phone}
        </div>
      )}
    </div>
  );
}
