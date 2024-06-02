import { RECORDS_LISTING_COLUMNS } from "@/data/recordsListing.config";
import styles from "./RecordListingTable.module.css";

const RecordListingTableColumns = () => {
  return (
    <thead className={styles.record_listing_table_header}>
      <tr className={styles.record_listing_table_header_row}>
        {RECORDS_LISTING_COLUMNS.map(({ label, value }) => {
          return (
            <th
              key={`${label}-${value}`}
              className={styles.record_listing_table_header_column_wrapper}
            >
              <span>{label}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const RecordListingTable = () => {
  return (
    <section className={styles.record_listing_table_wrapper}>
      <table className={styles.record_listing_table}>
        <RecordListingTableColumns />
        <tbody></tbody>
      </table>
    </section>
  );
};

export default RecordListingTable;
