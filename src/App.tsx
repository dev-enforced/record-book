import "./App.css";
import { Navbar, RecordListingTable, SearchSection } from "@/components";
import { RecordsContextProvider } from "./context";
function App() {
  return (
    <div className="App">
      <RecordsContextProvider>
        <Navbar />
        <SearchSection />
        <RecordListingTable />
      </RecordsContextProvider>
    </div>
  );
}

export default App;
