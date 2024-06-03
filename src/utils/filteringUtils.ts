import { RecordData } from "@/types";

export const generateFilteredRecordsList = ({
  currentRecordsList,
  nameSearched,
  phoneNumberSearched,
}: {
  currentRecordsList: Array<RecordData>;
  nameSearched: string;
  phoneNumberSearched: string;
}) => {
  if (!nameSearched && !phoneNumberSearched) {
    return currentRecordsList;
  } else if (nameSearched && phoneNumberSearched) {
    return currentRecordsList.filter(
      ({ name: currentRecordName, phoneNumber: currentRecordPhoneNumber }) => {
        return (
          currentRecordName
            .toLowerCase()
            .includes(nameSearched.toLowerCase()) &&
          currentRecordPhoneNumber
            .toLowerCase()
            .includes(phoneNumberSearched.toLowerCase())
        );
      }
    );
  } else if (nameSearched) {
    return currentRecordsList.filter(({ name: currentRecordName }) => {
      return currentRecordName
        .toLowerCase()
        .includes(nameSearched.toLowerCase());
    });
  } else if (phoneNumberSearched) {
    return currentRecordsList.filter(
      ({ phoneNumber: currentRecordPhoneNumber }) => {
        return currentRecordPhoneNumber
          .toLowerCase()
          .includes(phoneNumberSearched.toLowerCase());
      }
    );
  } else {
    return currentRecordsList;
  }
};
