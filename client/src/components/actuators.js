const {useState} = require('react')
const axios = require('axios')

const Actuators = ({actuators, addActuators}) => {
    const [newSensor, setSensor] = useState({
        name: '',
        topic: ''
    })
    const handleChange = (e) => {
        setSensor({...newSensor, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newSensor.name === '' || newSensor.topic === '')
            return;
        localStorage.setItem('actuators', JSON.stringify([...actuators, newSensor]))
        axios.post('/api/actuator', {topic: newSensor.topic, filename: newSensor.name}).then(res => {
            console.log(res.data);
        })
        addActuators([...actuators, newSensor]);
        setSensor({
            name: '',
            topic: '',
        })
    }
    return (
        <div className="container">
            <div className="card p-3">

                <h3>Actuators</h3> 
                <section>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Topic</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            actuators.map((sens) => {
                                return (
                                    <tr key = {sens.name} >
                                        <td>{sens.name}</td>
                                        <td> {sens.topic}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </section>
                <section>
                    <h5>Add a new Actuator</h5>
                    <form onSubmit = {handleSubmit}>
                        <input type="text" name="name" className = "form-control mb-1" placeholder="Name of actuator" value={newSensor.name} onChange = {handleChange} />
                        <input type="text" name="topic" className = "form-control mb-1" placeholder="Topic to subscribe" value={newSensor.topic} onChange = {handleChange}/>
                        <input type="submit" className="btn btn-success"/>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Actuators