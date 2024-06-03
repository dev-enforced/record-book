import { RECORDS_LISTING_COLUMNS } from "@/data";
import { useOnClickOutside } from "@/hooks";
import { useRef, useState } from "react";
import styles from "./RecordListingTable.module.css";
import { RecordData } from "@/types";
import { useRecords } from "@/context";
import { ReactComponent as DeleteRecord } from "@/assets/Delete.svg";
import { ReactComponent as EmptyList } from "@/assets/NoDataFound.svg";

interface RecordListingTableRowProps {
  recordData: RecordData;
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
        <th className={styles.record_listing_table_header_column_wrapper}>
          <span>Actions</span>
        </th>
      </tr>
    </thead>
  );
};

const RecordListingTableRow = ({ recordData }: RecordListingTableRowProps) => {
  const { removeSelectedRecord } = useRecords();
  return (
    <tr className={styles.record_listing_table_data_row}>
      {Object.entries(recordData).reduce((elements, [key, value]) => {
        if (key === "id") {
          elements.push(
            <td key={value}>
              <DeleteRecord
                onClick={() => {
                  removeSelectedRecord(recordData);
                }}
                className={styles.record_listing_table_data_row_delete_icon}
              />
            </td>
          );
        } else {
          elements.push(<td key={value}>{value}</td>);
        }
        return elements;
      }, [] as Array<JSX.Element>)}
    </tr>
  );
};

const RecordListingTable = () => {
  const { filteredOrSortedRecordsList } = useRecords();
  return (
    <section className={styles.record_listing_table_wrapper}>
      {filteredOrSortedRecordsList.length !== 0 ? (
        <table className={styles.record_listing_table}>
          <RecordListingTableColumns />
          <tbody>
            {filteredOrSortedRecordsList.map((record) => {
              return (
                <RecordListingTableRow recordData={record} key={record.id} />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={`container-flex-center ${styles.empty_list_container}`}>
          <EmptyList />
        </div>
      )}
    </section>
  );
};

export default RecordListingTable;
