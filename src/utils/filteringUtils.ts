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
          currentRecordName === nameSearched &&
          phoneNumberSearched === currentRecordPhoneNumber.toString()
        );
      }
    );
  } else if (nameSearched) {
    return currentRecordsList.filter(({ name: currentRecordName }) => {
      return currentRecordName === nameSearched;
    });
  } else if (phoneNumberSearched) {
    return currentRecordsList.filter(
      ({ phoneNumber: currentRecordPhoneNumber }) => {
        return currentRecordPhoneNumber.toString() === phoneNumberSearched;
      }
    );
  } else {
    return currentRecordsList;
  }
};
