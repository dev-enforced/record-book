import { RecordData } from "@/types";

export const ascendingOrderSort = (
  item_one: string | number,
  item_two: string | number
) => {
  if (item_one < item_two) {
    return -1;
  } else if (item_one > item_two) {
    return 1;
  } else {
    return 0;
  }
};

export const descendingSort = (
  item_one: string | number,
  item_two: string | number
) => {
  if (item_one < item_two) {
    return 1;
  } else if (item_one > item_two) {
    return -1;
  } else {
    return 0;
  }
};
export const generateSortedRecordsList = ({
  currentRecordsList,
  sortingColumn,
  sortingOrder,
}: {
  currentRecordsList: Array<RecordData>;
  sortingColumn: string;
  sortingOrder: string;
}) => {
  if (sortingColumn && sortingOrder) {
    if (sortingOrder === "a-z") {
      return currentRecordsList.sort((record1, record2) => {
        const record_one_name = record1[sortingColumn as keyof RecordData];
        const record_two_name = record2[sortingColumn as keyof RecordData];
        return ascendingOrderSort(record_one_name, record_two_name);
      });
    } else if (sortingOrder === "z-a") {
      return currentRecordsList.sort((record1, record2) => {
        const record_one_name = record1[sortingColumn as keyof RecordData];
        const record_two_name = record2[sortingColumn as keyof RecordData];
        return descendingSort(record_one_name, record_two_name);
      });
    } else {
      return currentRecordsList;
    }
  } else {
    return currentRecordsList;
  }
};
