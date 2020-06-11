import Server from "./classes/server";
import { SERVER_PORT } from "./globals/environment";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = Server.instance;

//bodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({ origin: true, credentials: true }));

//rutas de setvicios
server.app.use("/", router);

server.start(() => {
  console.log(`Server corriendo en el puerto ${SERVER_PORT} `);
});
