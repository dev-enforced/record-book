import { useRecords } from "@/context";
import styles from "./Navbar.module.css";
import { AddNewRecordModal } from "../AddNewRecordModal";

const Navbar = () => {
  const { isAddNewRecord, setIsAddNewRecord } = useRecords();
  return (
    <>
      <nav className={`container-flex-align-center ${styles.navbar_wrapper}`}>
        <div>
          <p className={`montserrat-bold ${styles.navbar_logo}`}>Record Book</p>
        </div>

        <div>
          <button
            className={styles.add_new_record_btn}
            onClick={() => setIsAddNewRecord(true)}
          >
            <p>Add New Record</p>
          </button>
        </div>
      </nav>
      {isAddNewRecord && <AddNewRecordModal />}
    </>
  );
};

export default Navbar;
