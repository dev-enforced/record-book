import { FormEvent, useState } from "react";
import styles from "./AddNewRecordModal.module.css";
import { RecordData } from "@/types";
import { useRecords } from "@/context";
import { ReactComponent as CloseIcon } from "@/assets/Close.svg";
const AddNewRecordModal = () => {
  const { recordsList, setIsAddNewRecord, addNewRecord } = useRecords();
  const [formData, setFormData] = useState<RecordData>({
    name: "",
    company: "",
    gender: "",
    phoneNumber: "",
    id: `p${recordsList.length + 1}`,
  });

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (
      formData.name &&
      formData.gender &&
      formData.company &&
      formData.phoneNumber
    ) {
      if (formData.phoneNumber.length === 10) {
        addNewRecord(formData);
      }else{
        alert("Phone number should be of 10 digits.");  
      }
    } else {
      alert("All the fields must be filled");
    }
    setIsAddNewRecord(false);
    setFormData({
      name: "",
      gender: "",
      company: "",
      phoneNumber: "",
      id: `p${recordsList.length + 1}`,
    });
  };
  return (
    <div className={`container-flex ${styles.modal_overlay}`}>
      <div className={styles.modal_content_wrapper}>
        <div className={styles.modal_header}>
          <p className={styles.modal_header_text}>ADD NEW RECORD</p>
          <button
            className={styles.close_modal}
            onClick={() => {
              setIsAddNewRecord(false);
            }}
          >
            <CloseIcon className={styles.close_modal_icon} />
          </button>
        </div>
        <form
          className={`container-flex-column ${styles.add_new_record_form}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.add_new_record_form_input_label_wrapper}>
            <label htmlFor="name" className={styles.add_new_record_form_label}>
              Name
            </label>
            <input
              id="name"
              name={"name"}
              type="text"
              value={formData.name}
              onChange={(changeEvent) => {
                setFormData((currentValue) => ({
                  ...currentValue,
                  name: changeEvent.target.value,
                }));
              }}
              placeholder="Enter name"
              className={styles.add_new_record_form_input}
            />
          </div>

          <div className={styles.add_new_record_form_input_label_wrapper}>
            <label
              htmlFor="company"
              className={styles.add_new_record_form_label}
            >
              Company
            </label>
            <input
              id="company"
              name={"company"}
              type="text"
              value={formData.company}
              onChange={(changeEvent) => {
                setFormData((currentValue) => ({
                  ...currentValue,
                  company: changeEvent.target.value,
                }));
              }}
              placeholder="Enter Company name"
              className={styles.add_new_record_form_input}
            />
          </div>

          <div className={styles.add_new_record_form_input_label_wrapper}>
            <label
              htmlFor="phoneNumber"
              className={styles.add_new_record_form_label}
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name={"phoneNumber"}
              type="text"
              value={formData.phoneNumber}
              onChange={(changeEvent) => {
                setFormData((currentValue) => ({
                  ...currentValue,
                  phoneNumber: changeEvent.target.value,
                }));
              }}
              placeholder="Enter 10 digit mobile number"
              className={styles.add_new_record_form_input}
              maxLength={10}
            />
          </div>

          <div className={styles.add_new_record_form_input_label_wrapper}>
            <label
              htmlFor="gender"
              className={styles.add_new_record_form_label}
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              aria-placeholder="Select a value"
              value={formData.gender}
              onChange={(changeEvent) =>
                setFormData((currentValue) => ({
                  ...currentValue,
                  gender: changeEvent.target.value,
                }))
              }
            >
              <option value="">Select a value</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className={styles.btn_wrapper}>
            <button
              type="submit"
              className={styles.add_new_record_form_submit_btn}
            >
              CREATE NEW RECORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRecordModal;
