const Community = () => {
  const ngos = [
    {
      name: "Helping Hands",
      work: "Providing education for underprivileged children.",
    },
    {
      name: "Green Earth",
      work: "Environmental conservation and tree plantation drives.",
    },
    {
      name: "Food for All",
      work: "Distributing food to the homeless and needy.",
    },
    {
      name: "Women Empowerment Hub",
      work: "Supporting women's rights and skill development.",
    },
    {
      name: "Animal Welfare Trust",
      work: "Rescuing and rehabilitating stray animals.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">NGO Community</h1>
      <p className="text-lg text-gray-300 mb-8">
        Connecting people with organizations making a difference.
      </p>

      <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {ngos.map((ngo, index) => (
          <a href="https://ngodarpan.gov.in/" target="_blank">
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-2xl font-semibold mb-2">{ngo.name}</h2>
              <p className="text-gray-300">{ngo.work}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Community;
