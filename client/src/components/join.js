import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
const {useState, useEffect} = require("react")
const axios = require('axios')

const Joins = ({sensors, actuators, joins, addJoins}) => {
    const [selectedSensors, addSensors] = useState([])
    const [selectedActuator, addActuator] = useState([])
    const [joinName, setJoinName] = useState('joinName')
    const [code, changeCode] = useState(`async function ${joinName}() {

}`)
    useEffect(() => {
        const temp = `async function ${joinName}(${selectedSensors.map(ss => ss.topic).join(" , ")}) {

}`
    changeCode(temp)
    }, [joinName, selectedSensors])

    useEffect(() => {
        // console.log("I am called")
        if(selectedActuator.length > 0) {
            console.log(selectedActuator[0].topic)
            setJoinName(selectedActuator[0].topic)
        }
    }, [selectedActuator])
    const handleSensorChange = (e) => {
        if(e.target.value === '-')
            return;
        const s = sensors.find(ss => ss.name === e.target.value)
        let found = selectedSensors.find(el => el.name === e.target.value);
        if(found === undefined) {
            addSensors([...selectedSensors,s])
        }        
    }
    const handleActuatorChange = (e) => {
        if(e.target.value === '-')
            return;
        const s = actuators.find(ss => ss.name === e.target.value)
        let found = selectedActuator.find(el => el.name === e.target.value);
        if(found === undefined) {
            addActuator([s])
        }        
    }
    const createJoin = () => {
        if(joinName === 'joinName' || selectedSensors.length === 0) {
            return;
        }
        let newCode = code.split('\n').slice(1, code.split('\n').length-1).join('\n')
        let newJoin = {code: newCode, joinId: joinName, sensors: selectedSensors.map(ss => ss.topic).join(":")}
        localStorage.setItem('joins', JSON.stringify([...joins, newJoin]))
        addJoins([...joins, newJoin])
        axios.post('/api/join', newJoin).then(res => console.log(res.data))
        addActuator([]);
        addSensors([])
        setJoinName('joinName')
        changeCode(`async function joinName() {

}`)
    }
    return (
        <div className=" m-3">
            <div className="card p-4">
                <h3>Joins</h3>
                <hr />
                <div className="d-flex flex-row">
                    <section className="container">

                        <h6>Select Sensors</h6>
                        <div className="p-2">
                            {
                                selectedSensors.map(ss => <span className="badge badge-danger mr-1" key = {ss.name}>{ss.name}</span>)
                            }
                        </div>
                        <select className = "custom-select" onChange = {handleSensorChange}>
                            <option selected={true} value="-">-</option>
                            {
                                sensors.filter((ss) => selectedSensors.indexOf(ss) === -1).map(({name}) => (
                                <option key = {name} value = {name}>{name}</option>
                                ))
                            }
                        </select>
                    </section>
                    <section className="container">
                    <h6>Select Actuator</h6>
                        <div className="p-2">
                            {
                                selectedActuator.map(ss => <span className="badge badge-danger mr-1" key = {ss.name}>{ss.name}</span>)
                            }
                        </div>
                        <select className = "custom-select" onChange = {handleActuatorChange}>
                            <option selected={true} value="-">-</option>
                            {
                                actuators.filter((ss) => selectedActuator.indexOf(ss) === -1).map(({name}) => (
                                <option key = {name} value = {name}>{name}</option>
                                ))
                            }
                        </select>
                    </section>
                </div>
                <div>
                    <h6>Code : </h6>
                    <AceEditor mode="javascript"
                        theme="github"
                        onChange={(value) => changeCode(value)}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        disabled = {!(selectedSensors.length > 0 && selectedActuator.length > 0)}
                        value= {code}
                        fontSize={20}
                    />
                </div>
                <button className="btn btn-success mt-3 " onClick = {createJoin}>Create Join</button>
            </div>
        </div>
    )
}

export default Joins