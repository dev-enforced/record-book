import { RECORDS_LISTING_COLUMNS } from "@/data/recordsListing.config";
import { useOnClickOutside } from "@/hooks";
import { useRef, useState } from "react";
import styles from "./RecordListingTable.module.css";

const mock_data = [
  {
    id: "p1",
    name: "Kartik Aryan",
    company: "Frontpoint Partners",
    gender: "Male",
    number: 7101920048,
  },
  {
    id: "p2",
    name: "Kiara Advani",
    company: "Brownfield Fund",
    gender: "Female",
    number: 9101921048,
  },
  {
    id: "p3",
    name: "Ayushman Khurana",
    company: "Scion Capital",
    gender: "Male",
    number: 7000921048,
  },
  {
    id: "p4",
    name: "Kriti Sanon",
    company: "Milenium",
    gender: "Female",
    number: 7000921048,
  },
  {
    id: "p5",
    name: "Varun Dhawan",
    company: "Milenium",
    gender: "Female",
    number: 7000921048,
  },
];

interface RecordListingTableRowProps {
  recordData: {
    id: string;
    name: string;
    company: string;
    gender: string;
    number: number;
  };
}

const RecordListingTableColumns = () => {
  const [currentOpenedFilter, setCurrentOpenedFilters] = useState<
    Array<string>
  >([]);

  /* ------------------- To handle which filters are openend ------------------ */
  const handleFilters = (currentFilter: string) => {
    setCurrentOpenedFilters((oldOpenFilter) => {
      if (oldOpenFilter.includes(currentFilter))
        return oldOpenFilter.filter((filter) => filter !== currentFilter);
      return [...currentOpenedFilter, currentFilter];
    });
  };

  /* ------ Closing all the Filters when clicked outside the table header ----- */
  const tableHeaderRef = useRef<HTMLTableSectionElement>(null);
  useOnClickOutside(
    tableHeaderRef,
    () => setCurrentOpenedFilters([]),
    currentOpenedFilter.length > 0
  );

  return (
    <thead className={styles.record_listing_table_header} ref={tableHeaderRef}>
      <tr className={styles.record_listing_table_header_row}>
        {RECORDS_LISTING_COLUMNS.map(
          ({ label, value, Icon, hasFunctionality, Functionality }) => {
            const isFilterOpen = currentOpenedFilter.includes(value!);
            return (
              <th
                key={`${label}-${value}`}
                className={styles.record_listing_table_header_column_wrapper}
              >
                <span
                  className={`${hasFunctionality ? "cursor-pointer" : ""} ${
                    isFilterOpen
                      ? styles.record_listing_table_header_column_wrapper_span_active
                      : ""
                  }`}
                  onClick={() => {
                    if (hasFunctionality) {
                      handleFilters(value);
                    }
                  }}
                >
                  {label}
                  {Icon && (
                    <Icon
                      className={
                        styles.record_listing_table_header_column_wrapper_icon
                      }
                    />
                  )}
                </span>

                {hasFunctionality && isFilterOpen && Functionality}
              </th>
            );
          }
        )}
      </tr>
    </thead>
  );
};

const RecordListingTableRow = ({ recordData }: RecordListingTableRowProps) => {
  return (
    <tr className={styles.record_listing_table_data_row}>
      {Object.entries(recordData).reduce((elements, [key, value]) => {
        if (key !== "id") {
          elements.push(<td key={value}>{value}</td>);
        }
        return elements;
      }, [] as Array<JSX.Element>)}
    </tr>
  );
};

const RecordListingTable = () => {
  return (
    <section className={styles.record_listing_table_wrapper}>
      <table className={styles.record_listing_table}>
        <RecordListingTableColumns />
        <tbody>
          {mock_data.map((record) => {
            return (
              <RecordListingTableRow recordData={record} key={record.id} />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default RecordListingTable;
