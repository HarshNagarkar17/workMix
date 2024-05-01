import app from "../index.js";
import http from "http";
import config from "../config/config.js"

const port = config.PORT || 5000;
const server = http.createServer(app);


server.listen(port);
server.on("error", onError);
server.on("listening",onListening);
  
function onListening(){
    const address = server.address();
    // console.log({address});
    console.log(`SERVER LISTENING ON PORT: ${address.port}`);
}

function onError(error){
    if (error.syscall !== "listen") {
        throw error;
      }
    
      const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
        default:
          throw error;
      }
}

process.on("SIGTERM", () => {
    console.log('SIGTERM')
});
  
  process.on("SIGINT", () => {
    console.log('SIGINT')
});
