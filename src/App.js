import { useState } from 'react';
import './App.css';

function App() {

  const initialValues = {name: '', lastname: '', mail: '',  age: 0, gender: ''}
  const [formValues, SetFormValues] = useState(initialValues)
  const [users, setUsers] = useState([])
  const [formErrors, setFormErrors] = useState({})


  const handleChange = (e) =>{
    const {name, value} = e.target
    SetFormValues((prevState)=>({...prevState, [name]: value}))
  }

  const validate = (values) =>{
    const errors = {}
    
    if(!values.name){
      errors.name = 'name required'
    }else if(values.name < 4){
      errors.name = 'name must be at least 4 charecters'
    }

    if(!values.lastname){
      errors.name = 'lastname required'
    }else if(values.lastname < 4){
      errors.name = 'lastname must be at least 4 charecters'
    }

    if(!values.mail.includes('@gmail.com')){
      errors.mail = 'try another mail'
    }

    if(values.age < 18){
      errors.age = 'you must be 18'
    }

    if(!values.gender){
      errors.gender = 'gender required'
    }
  }


  const onSubmit = (e) =>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    console.log(formErrors)
    console.log(formValues)
    setUsers((prevUsers) =>{
      return [...prevUsers,{...formValues ,id: new Date().toString()}]
    })

  
    
  }

  return (
    <div className="App">
      <form>
        <input 
        placeholder="Name"
        type='text'
        name='name'
        value={formValues.name}
        onChange={handleChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
        <input 
        placeholder="LastName"
        type='text'
        name='lastname'
        value={formValues.lastname}
        onChange={handleChange}
        />
        {formErrors.lastname && <p>{formErrors.lastname}</p>}
        <input 
        placeholder="mial"
        type='mail'
        name='mail'
        value={formValues.mail}
        onChange={handleChange}
        />
        {formErrors.mail && <p>{formErrors.mail}</p>}
        <input 
        placeholder="age"
        type='number'
        name='age'
        value={formValues.age}
        onChange={handleChange}
        />
        {formErrors.age && <p>{formErrors.age}</p>}
        <select value={formValues.gender} onChange={handleChange} name='gender'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        {formErrors.gender && <p>{formErrors.gender}</p>}

        <button onClick={onSubmit} type='submit'>submit</button>

        {users.map(({name,lastname, age, id})=>(
          <div key={id}>
            <h1>{name}</h1>
            <h1>{lastname}</h1>
            <h1>{age}</h1>
            <button>edit</button>
            <button>delete</button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default App;
