import "./App.css";
import { Navbar, RecordListingTable, SearchSection } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchSection />
      <RecordListingTable />
    </div>
  );
}

export default App;
