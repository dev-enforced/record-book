import { ReactComponent as SortIcon } from "@/assets/SortIcon.svg";
import { MultiParamSortCard } from "@/components/MultiParamSortCard";

const NAME_SORT_CONFIG = [
  {
    label: "Sort A - Z",
    sortIconClassName: "rotate-180",
    searchParamsConfig: [
      {
        searchParamKey: "sort_key_column",
        searchParamValue: "name",
      },
      {
        searchParamKey: "sort_key",
        searchParamValue: "a-z",
      },
    ],
  },
  {
    label: "Sort Z - A",
    searchParamsConfig: [
      {
        searchParamKey: "sort_key_column",
        searchParamValue: "name",
      },
      {
        searchParamKey: "sort_key",
        searchParamValue: "z-a",
      },
    ],
  },
];

const GENDER_SORT_CONFIG = [
  {
    label: "Sort A - Z",
    sortIconClassName: "rotate-180",
    searchParamsConfig: [
      {
        searchParamKey: "sort_key_column",
        searchParamValue: "gender",
      },
      {
        searchParamKey: "sort_key",
        searchParamValue: "a-z",
      },
    ],
  },
  {
    label: "Sort Z - A",
    searchParamsConfig: [
      {
        searchParamKey: "sort_key_column",
        searchParamValue: "gender",
      },
      {
        searchParamKey: "sort_key",
        searchParamValue: "z-a",
      },
    ],
  },
];

export const RECORDS_LISTING_COLUMNS = [
  {
    label: "Name",
    value: "name",
    Icon: SortIcon,
    hasFunctionality: true,
    Functionality: (
      <MultiParamSortCard
        sortConfig={NAME_SORT_CONFIG}
        className={"sort_options_classes"}
      />
    ),
  },
  {
    label: "Company",
    value: "company",
    Icon: null,
    hasFunctionality: false,
    Functionality: null,
  },
  {
    label: "Gender",
    value: "gender",
    Icon: SortIcon,
    hasFunctionality: true,
    Functionality: (
      <MultiParamSortCard
        sortConfig={GENDER_SORT_CONFIG}
        className={"sort_options_classes"}
      />
    ),
  },
  {
    label: "Phone Number",
    value: "phoneNumber",
    Icon: null,
    hasFunctionality: false,
    Functionality: null,
  },
];
