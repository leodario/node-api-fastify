import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger:true});

server.register(cors, {
  origin: "*",
  methods:["GET", "POST"]
});

const teams = [
  {id: 1, name: "McLaren", base: "Woking, United Kingdom"},
  {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
  {id: 3, name: "Ferrari", base: "Maranello, Italy"},
  {id: 4, name: "Red Bull", base: "Milton Keynes, United Kingdom"},
  {id: 5, name: "Alpine", base: "Enstone, United Kingdom"},
  {id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom"},
  {id: 7, name: "Haas", base: "Kannapolis, United States"},
  {id: 8, name: "AlphaTauri", base: "Faenza, Italy"},
  {id: 9, name: "Williams", base: "Grove, United Kingdom"},
  {id: 10, name: "Alfa Romeo", base: "Hinwil, Switzerland"}
];

const drivers = [
  {id: 1, name: "Lewis Hamilton", team: "Mercedes"},
  {id: 2, name: "George Russell", team: "Mercedes"},
  {id: 3, name: "Max Verstappen", team: "Red Bull Racing"},
  {id: 4, name: "Sergio Perez", team: "Red Bull Racing"},
  {id: 5, name: "Charles Leclerc", team: "Ferrari"},
  {id: 6, name: "Carlos Sainz", team: "Ferrari"},
  {id: 7, name: "Lando Norris", team: "McLaren"},
  {id: 8, name: "Oscar Piastri", team: "McLaren"},
  {id: 9, name: "Fernando Alonso", team: "Aston Martin"},
  {id: 10, name: "Lance Stroll", team: "Aston Martin"},
  {id: 11, name: "Pierre Gasly", team: "Alpine"},
  {id: 12, name: "Esteban Ocon", team: "Alpine"},
  {id: 13, name: "Valtteri Bottas", team: "Alfa Romeo"},
  {id: 14, name: "Zhou Guanyu", team: "Alfa Romeo"},
  {id: 15, name: "Kevin Magnussen", team: "Haas"},
  {id: 16, name: "Nico Hulkenberg", team: "Haas"},
  {id: 17, name: "Yuki Tsunoda", team: "AlphaTauri"},
  {id: 18, name: "Daniel Ricciardo", team: "AlphaTauri"},
  {id: 19, name: "Alexander Albon", team: "Williams"},
  {id: 20, name: "Logan Sargeant", team: "Williams"}
];

server.get("/teams", async(request, response) => {
  response.type("application/json").code(200)
  return{teams}
})

server.get("/drivers", async(request, response) => {
  response.type("applicaton/json").code(200)
  return{drivers}
})

interface DriverParams{
  id: string
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);

  if(!driver){
    response.type("application/json").code(404);
    return {message: "driver not found"}
  } else {
    response.type("application/json").code(200)
    return {driver};
  }
})

server.listen({port:3333}, ()=>{
  console.log("server is running on port 3333")
})