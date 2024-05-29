import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`container-flex-align-center ${styles.navbar_wrapper}`}>
      <div>
        <p className={`montserrat-bold ${styles.navbar_logo}`}>Record Book</p>
      </div>

      <div>
        <button className={styles.add_new_record_btn}>
          <p>Add New Record</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
