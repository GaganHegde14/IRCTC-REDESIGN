// Helper function to generate random dates
const getRandomDate = () => {
  const start = new Date("2025-03-23");
  const end = new Date("2025-04-30");
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

// Helper function to generate random train numbers
const generateTrainNumber = (id) => `12${String(id).padStart(3, "0")}`;

// List of train names
const trainNames = [
  "Rajdhani Express",
  "Shatabdi Express",
  "Duronto Express",
  "Garib Rath",
  "Humsafar Express",
  "Tejas Express",
  "Vande Bharat Express",
  "Superfast Express",
  "Mail Express",
  "Intercity Express",
];

// Generate 150 trains
export const trainData = Array.from({ length: 150 }, (_, index) => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
    "Varanasi",
    "Goa",
    "Lucknow",
    "Amritsar",
    "Pune",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan",
    "Vasai",
    "Jabalpur",
    "Ujjain",
    "Gwalior",
    "Howrah",
    "Guwahati",
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Jamshedpur",
    "Ranchi",
    "Dhanbad",
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Vijayawada",
    "Visakhapatnam",
    "Tirupati",
    "Madurai",
    "Coimbatore",
    "Salem",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
  ];

  const sourceIndex = Math.floor(Math.random() * cities.length);
  let destIndex;
  do {
    destIndex = Math.floor(Math.random() * cities.length);
  } while (destIndex === sourceIndex);

  return {
    id: index + 1,
    source: cities[sourceIndex],
    destination: cities[destIndex],
    date: getRandomDate(),
    trainNumber: generateTrainNumber(index + 1),
    trainName: `${trainNames[Math.floor(Math.random() * trainNames.length)]} ${
      cities[sourceIndex]
    } - ${cities[destIndex]}`,
  };
});
