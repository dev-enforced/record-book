import { INITIAL_RECORDS_LIST } from "@/data";
import { RecordData } from "@/types";
import {
  generateFilteredRecordsList,
  generateSortedRecordsList,
} from "@/utils";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

interface RecordsContextType {
  recordsList: Array<RecordData>;
  setRecordsList: Dispatch<SetStateAction<Array<RecordData>>>;
  filteredOrSortedRecordsList: Array<RecordData>;
  isAddNewRecord: boolean;
  setIsAddNewRecord: Dispatch<SetStateAction<boolean>>;
}

const RecordsContext = createContext<RecordsContextType>(
  {} as RecordsContextType
);

const RecordsContextProvider = ({ children }: { children: ReactNode }) => {
  const [recordsList, setRecordsList] =
    useState<Array<RecordData>>(INITIAL_RECORDS_LIST);

  const [isAddNewRecord, setIsAddNewRecord] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const nameSearched = searchParams.get("name") ?? "",
    phoneNumberSearched = searchParams.get("phoneNumber") ?? "",
    sortingColumn = searchParams.get("sort_key_column") ?? "",
    sortingOrder = searchParams.get("sort_key") ?? "";

  const filteredOrSortedRecordsList: Array<RecordData> =
    generateSortedRecordsList({
      currentRecordsList: generateFilteredRecordsList({
        currentRecordsList: recordsList,
        nameSearched,
        phoneNumberSearched,
      }),
      sortingColumn,
      sortingOrder,
    });

  return (
    <RecordsContext.Provider
      value={{
        recordsList,
        setRecordsList,
        isAddNewRecord,
        setIsAddNewRecord,
        filteredOrSortedRecordsList,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

const useRecords = () => useContext(RecordsContext);

export { RecordsContextProvider, useRecords };
