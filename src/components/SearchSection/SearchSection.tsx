import {ReactComponent as SearchIcon} from "@/assets/SearchIcon.svg";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchSection.module.css";

const SearchSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFormData, setSearchFormData] = useState<{
    name: string;
    phoneNumber: string;
  }>({
    name: searchParams.get("name") ?? "",
    phoneNumber: searchParams.get("phoneNumber") ?? "",
  });

  const applyBtnClickAction = () => {
    Object.keys(searchFormData).forEach((everyKey) => {
      if (
        (searchFormData[everyKey as keyof typeof searchFormData] as string) ===
        ""
      ) {
        searchParams.delete(everyKey);
      } else {
        searchParams.set(
          everyKey,
          searchFormData[everyKey as keyof typeof searchFormData] as string
        );
      }
    });

    setSearchParams(searchParams);
  };
  const resetBtnClickAction = () => {
    setSearchFormData((prev) => ({ ...prev, name: "", phoneNumber: "" }));
  };

  return (
    <section className={styles.search_section_wrapper}>
      <div
        className={`container-flex-column ${styles.search_inputs_container}`}
      >
        <div className={`${styles.search_input_icon_wrapper}`}>
          <div className={styles.search_input_wrapper}>
            <input
              placeholder="Search By Name"
              value={searchFormData.name ?? ""}
              onChange={(event) => {
                setSearchFormData((previousValue) => ({
                  ...previousValue,
                  name: event.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.search_icon_wrapper}>
            <SearchIcon />
          </div>
        </div>
        <div className={`${styles.search_input_icon_wrapper}`}>
          <div className={styles.search_input_wrapper}>
            <input
              placeholder="Search By Phone Number"
              type="number"
              value={searchFormData.phoneNumber ?? ""}
              onChange={(event) => {
                setSearchFormData((previousValue) => ({
                  ...previousValue,
                  phoneNumber: event.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.search_icon_wrapper}>
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className={`container-flex ${styles.search_actions_container}`}>
        <button
          className={`container-flex-center ${styles.search_action_cta} ${styles.search_action_cta_apply}`}
          onClick={applyBtnClickAction}
        >
          Apply
        </button>
        <button
          className={`container-flex-center ${styles.search_action_cta} ${styles.search_action_cta_reset}`}
          onClick={resetBtnClickAction}
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
