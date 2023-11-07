import DataTable from "react-data-table-component";
import React from "react";
export const TownPrices = ({ prices }) => {
  //   state = { toggledClearRows: false };
  // Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
  // eslint-disable-next-line no-unused-vars
  // const handleClearRows = () => {
  //   this.setState({ toggledClearRows: !this.state.toggledClearRows });
  // };
  // const [selectedRows, setSelectedRows] = useState([]);
  // const navigate = useNavigate();
  // const onRowClicked = (row, event) => {
  //   console.log(event, row);
  //   var li = '/town/' + row.Town;
  //   navigate(li);
  //   // console.log('/town/' + row.Town);
  // };
  // const handleButtonClick = row => {
  //   console.log('clicked', selectedRows);
  // };
  // useEffect(() => {
  //   console.log('state', selectedRows);
  // }, [selectedRows]);
  // const handleChange = useCallback(
  //   state => {
  //     setSelectedRows(state.selectedRows);
  //     console.log(selectedRows);
  //   },
  //   [selectedRows],
  // );

  const columns = [
    {
      name: "Period",
      selector: (row) => row.Price_Period,
    },
    {
      name: "Kerosene",
      selector: (row) => row.Kerosene,
      sortable: true,
    },
    {
      name: "Petrol",
      selector: (row) => row.Super,
      sortable: true,
    },
    {
      name: "Diesel",
      selector: (row) => row.Diesel,
      sortable: true,
    },
  ];

  return (
    <div id="townstable">
      {/* <BuiltinStory theme="default" /> */}
      <DataTable
        title="Fuel Prices "
        columns={columns}
        data={prices}
        fixedHeader={true}
        fixedHeaderScrollHeight={"450px"}
        selectableRows
        pagination
        // onSelectedRowsChange={handleChange}
        defaultSortFieldId={1}
        // onRowClicked={onRowClicked}
        highlightOnHover
        // clearSelectedRows={this.state.toggledClearRows}
      />
    </div>
  );
};
