import { ReactComponent as SortIcon } from "@/assets/SortIconByOrder.svg";
import { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MultiParamSortCard.module.css";
interface Props {
  className?: string;
  sortConfig: Array<{
    label: string;
    sortIconClassName?: string;
    searchParamsConfig: Array<{
      searchParamKey: string;
      searchParamValue: string;
    }>;
  }>;
}

const generateArrayFromString = (inputString: string, separator = "") =>
  inputString.split(separator);

const wordSeparators = ["-", "_"];

const MultiParamSortCard = ({ className, sortConfig }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  /**
   * Why the function generateDatasetAttributes is being used,
   * when we try to attach custom dataset attributes to HTML elements, we can attach them only in lowercase format
   * Using hyphens for better understanding
   * (i.e. data-sort-Ascending is not allowed but data-sort-ascending is allowed)
   *
   * EXAMPLES:
   * generateDatasetAttributes([{'searchParamKey':'sort_key_column','searchParamValue':'eventDate'},{'searchParamKey':'sort_key','searchParamValue':'z-a'}])
   * ==> {data-sort-key-column:'eventDate',data-sort-key:'z-a'}
   */

  const generateDatasetAttributes = (
    searchParamsConfig: Array<{
      searchParamKey: string;
      searchParamValue: string;
    }>
  ) => {
    return searchParamsConfig.reduce(
      (datasetOutput, { searchParamKey, searchParamValue }) => {
        const shouldThePropBeModified = searchParamKey
          .split("")
          .some((everyChar) => wordSeparators.includes(everyChar));
        const wordsArray = searchParamKey.includes("-")
          ? generateArrayFromString(searchParamKey, "-")
          : searchParamKey.includes("_")
          ? generateArrayFromString(searchParamKey, "_")
          : [searchParamKey];

        const modifiedDatasetProp = shouldThePropBeModified
          ? wordsArray.map((everyWord) => everyWord.toLowerCase()).join("-")
          : searchParamKey;

        return {
          ...datasetOutput,
          [`data-${modifiedDatasetProp}`]: searchParamValue,
        };
      },
      {}
    );
  };

  /* ----------------------- To handle the Query Params ----------------------- */
  const handleSort = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const targetDatasetArray = Object.entries(e.target.dataset);
      const targetDetailsInSortConfig = sortConfig.find(
        ({ searchParamsConfig }) => {
          const searchParamsConfigValues = searchParamsConfig.map(
            ({ searchParamValue }) => searchParamValue
          );
          return searchParamsConfigValues.every((everySearchParamValue) =>
            targetDatasetArray.some(
              ([, datasetValue]) => datasetValue === everySearchParamValue
            )
          );
        }
      );
      const currentSearchParamsValues = [];
      for (const [, value] of searchParams.entries()) {
        currentSearchParamsValues.push(value);
      }

      if (currentSearchParamsValues.length === 0) {
        targetDetailsInSortConfig?.searchParamsConfig.forEach(
          ({ searchParamKey, searchParamValue }) => {
            searchParams.set(searchParamKey, searchParamValue);
          }
        );
      } else {
        if (
          targetDetailsInSortConfig?.searchParamsConfig.every(
            ({ searchParamKey, searchParamValue }) => {
              if (searchParams.has(searchParamKey)) {
                return searchParams.get(searchParamKey) === searchParamValue;
              }
            }
          )
        ) {
          targetDetailsInSortConfig?.searchParamsConfig.forEach(
            ({ searchParamKey }) => {
              searchParams.delete(searchParamKey);
            }
          );
        } else {
          targetDetailsInSortConfig?.searchParamsConfig.forEach(
            ({ searchParamKey, searchParamValue }) => {
              searchParams.set(searchParamKey, searchParamValue);
            }
          );
        }
      }

      setSearchParams(searchParams);
    }
  };

  return (
    <ul
      className={`${styles.sort_list_wrapper} ${className}`}
      onClick={handleSort}
    >
      {sortConfig.map(
        ({ label, sortIconClassName, searchParamsConfig }, index) => {
          const currentSearchParamsValues = [];
          for (const [, value] of searchParams.entries()) {
            currentSearchParamsValues.push(value);
          }

          const shouldOptionBeHighlighted =
            currentSearchParamsValues.length === 0
              ? false
              : searchParamsConfig.every(
                  ({ searchParamKey, searchParamValue }) => {
                    if (searchParams.has(searchParamKey)) {
                      return (
                        searchParams.get(searchParamKey) === searchParamValue
                      );
                    }
                  }
                );
          return (
            <li
              key={`${label}-${index}`}
              {...generateDatasetAttributes(searchParamsConfig)}
              className={`${styles.sort_list_wrapper_list_item} ${
                shouldOptionBeHighlighted ? styles.highlighted_list_item : ""
              }`}
            >
              <SortIcon
                className={`${styles.sort_list_wrapper_list_item_icon} ${
                  shouldOptionBeHighlighted
                    ? styles.highlighted_list_item_icon
                    : ""
                } ${sortIconClassName}`}
              />
              {label}
            </li>
          );
        }
      )}
    </ul>
  );
};

export default MultiParamSortCard;
