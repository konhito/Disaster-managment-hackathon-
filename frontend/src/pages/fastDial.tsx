const FastDial = () => {
  return (
    <div className="flex flex-col items-center bg-[#1d232a] justify-center min-h-screen  dark:bg-gray-900">
      <h2 className="text-2xl font-bold  mb-4 text-gray-800 dark:text-white">
        All Emergency India Numbers
      </h2>
      <div className="relative overflow-x-auto shadow-md rounded-lg max-w-[600px] w-full bg-white dark:bg-gray-800 p-4">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Help Line Number
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { department: "Police", number: "100" },
              { department: "Fire", number: "101" },
              { department: "Ambulance", number: "108" },
              { department: "Emergency", number: "112" },
              { department: "Help Line", number: "18001800550" },
              { department: "Cleaning Issues", number: "18003302550" },
            ].map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-700"
                } border-b dark:border-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {item.department}
                </th>
                <td className="px-6 py-4">{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FastDial;
