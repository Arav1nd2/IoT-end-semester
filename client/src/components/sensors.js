const {useState} = require('react')
const axios = require('axios')

const Sensors = ({sensors, addSensors}) => {
    const [newSensor, setSensor] = useState({
        name: '',
        topic: '',
        sample: ''
    })
    const handleChange = (e) => {
        setSensor({...newSensor, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newSensor.name === '' || newSensor.sample === '' || newSensor.topic === '')
            return;
        axios.post('/api/sensor', {topic: newSensor.topic, sample: newSensor.sample}).then(res => {
            console.log(res.data);
        })
        localStorage.setItem('sensors', JSON.stringify([...sensors, newSensor]))
        addSensors([...sensors, newSensor]);
        setSensor({
            name: '',
            topic: '',
            sample: ''
        })
    }
    return (
        <div className="container">
            <div className="card p-3">

                <h3>Sensors</h3> 
                <section>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Topic</th>
                                <th scope="col">Sample</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            sensors.map((sens) => {
                                return (
                                    <tr key = {sens.name} >
                                        <td>{sens.name}</td>
                                        <td> {sens.topic}</td>
                                        <td> {sens.sample}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </section>
                <section>
                    <h5>Add a new sensor</h5>
                    <form onSubmit = {handleSubmit}>
                        <input type="text" name="name" className = "form-control mb-1" placeholder="Name of sensor" value={newSensor.name} onChange = {handleChange} />
                        <input type="text" name="topic" className = "form-control mb-1" placeholder="Topic to publish" value={newSensor.topic} onChange = {handleChange}/>
                        <input type="text" name="sample" className = "form-control mb-1" placeholder="Sample value" value={newSensor.sample} onChange = {handleChange}/>
                        <input type="submit" className="btn btn-success"/>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Sensors