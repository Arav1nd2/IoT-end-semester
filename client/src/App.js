const { default: Sensors } = require("./components/sensors");
const { default: Actuators } = require("./components/actuators");

const {useState} = require('react');
const { default: Joins } = require("./components/join");

function App() {
  const [sensors, addSensors] = useState(JSON.parse(localStorage.getItem('sensors')) === null ? [] : JSON.parse(localStorage.getItem('sensors')))
  const [actuators, addActuators] = useState(JSON.parse(localStorage.getItem('actuators')) === null ? [] : JSON.parse(localStorage.getItem('actuators')))
  const [joins, addJoins] = useState(JSON.parse(localStorage.getItem('joins')) === null ? [] : JSON.parse(localStorage.getItem('joins')))
  // console.log(JSON.stringify(localStorage.getItem('joins')))
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand">IotSpeak</p>
      </nav>
      <br />
      <div className="d-flex flex-row">
        <Sensors sensors = {sensors} addSensors = {addSensors}/>
        <Actuators actuators = {actuators} addActuators = {addActuators} />       
      </div>
      <Joins sensors = {sensors} actuators = {actuators} joins = {joins} addJoins = {addJoins}/>
    </div>
  );
}

export default App;
