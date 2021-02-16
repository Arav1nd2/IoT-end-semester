# IoT End Semester Project

## Tech Stack Used:
- React.JS for web client
- Node.JS for backend server
- Mosca as MQTT wrapper 
- MQTT broker

## Simulation Tools
- Contiki Cooja


## How to run cooja simulation 
- Open cmd and type `contiker cooja`
- In a new terminal type `docker ps`
- Copy the docker container id
- Type `docker exec -it <insert_container_id> /bin/bash`
- Create the border router and start the serial_sensor in port `60001`
- Right click the mote -> mote tools -> serial_io(server)
- Come back to terminal and type `cd tools/serial-io/`
- Type `sudo ./tunslip6 -a 127.0.0.1 aaaa::1/64`