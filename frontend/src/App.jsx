import React from "react";
import TransactionState from "./Context/TransactionState";
import TransactionTable from "./Component/TransationTable";
import MonthDropdown from "./Component/MonthDropdown";
import Searchbar from "./Component/SearchBar";
import StatisticsBox from "./Component/StatisticsBox";
import PieChart from "./Component/PieChart";
import BarChart from "./Component/barChart";

export default function App() {
  return (
    <div>
      <TransactionState>
        <div className="container flex flex-col">
          <div className="bg-gray-100">
            <h1
              className="text-xl font-semibold"
              style={{
                textAlign: "center",
                border: "2px solid black",
                width: "min-content",
                margin: "30px auto",
                padding: "32px 25px",
                borderRadius: "50%",
                height: "auto",
                backgroundColor: "white",
              }}
            >
              Transaction Dashboard
            </h1>
          </div>

          <div className="flex justify-around my-8">
            <div>
              <Searchbar />
            </div>
            <div>
              <MonthDropdown />
            </div>
          </div>
          <div>
            <TransactionTable />
          </div>
        </div>

        <div style={{ margin: "20px auto", textAlign: "center" }}>
          <StatisticsBox />
        </div>

        <div style={{ margin: "20px auto", textAlign: "center" }}>
          <BarChart />
        </div>

        <div style={{ margin: "20px auto", textAlign: "center" }}>
          <PieChart />
        </div>
      </TransactionState>
    </div>
  );
}
