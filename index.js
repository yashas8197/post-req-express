const express = require("express");
const app = express();

app.use(express.json());

const cars = [
  { id: 1, make: "Toyota", model: "Carmy", year: 2022 },
  { id: 2, make: "Ford", model: "Mustang", year: 2019 },
  { id: 3, make: "Chevrolet", model: "Silverado", year: 2020 },
  { id: 4, make: "Honda", model: "Accord", year: 2021 },
  { id: 5, make: "BMW", model: "X5", year: 2018 },
  { id: 6, make: "Tesla", model: "Model S", year: 2023 },
  { id: 7, make: "Mercedes-Benz", model: "C-Class", year: 2020 },
  { id: 8, make: "Audi", model: "A4", year: 2019 },
  { id: 9, make: "Lamborghini", model: "Huracan", year: 2022 },
  { id: 10, make: "Ferrari", model: "488 GTB", year: 2021 },
  { id: 11, make: "Porsche", model: "911", year: 2020 },
  { id: 12, make: "Subaru", model: "Outback", year: 2017 },
  { id: 13, make: "Jeep", model: "Wrangler", year: 2022 },
  { id: 14, make: "Volvo", model: "XC90", year: 2021 },
  { id: 15, make: "Nissan", model: "Altima", year: 2020 },
];

app.get("/", (req, res) => {
  res.send("hello, Express");
});

app.post("/cars", (req, res) => {
  const newCar = req.body;

  if (!newCar.make || !newCar.model || !newCar.year) {
    res.status(400).json({ error: "Make, Model and Year are required." });
  } else {
    cars.push(newCar);
    res.status(201).json({ message: "Car added successfully", car: newCar });
  }
});

app.get("/cars", (req, res) => {
  res.send(cars);
});

app.delete("/cars/:id", (req, res) => {
  const carId = req.params.id;

  const index = cars.findIndex((car) => car.id == carId);

  if (index === -1) {
    res.status(404).json({ error: "car not found" });
  } else {
    cars.splice(index, 1);
    res.status(200).json({ message: "cars deleted successfully" });
  }
});

app.post("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCarData = req.body;

  const carToUpdate = cars.find((car) => car.id === carId);

  if (!carToUpdate) {
    res.status(404).json({ error: "Car not found" });
  } else {
    if (!updatedCarData.make || !updatedCarData.model || !updatedCarData.year) {
      res.status(400).json({ error: "Make, Model, and Year are required" });
    } else{
      Object.assign(carToUpdate, updatedCarData);
      res.status(200).json({ message: "Car data updated successfully" });
    }
    
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
