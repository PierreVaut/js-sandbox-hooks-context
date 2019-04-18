import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext("default");

// Sorry for rubbish variable names!
const ARenderPropsCounterConnectedWithContext = () => 
    <MyContext.Consumer>
        {value => <h3>Counter : {value.count} </h3>}
    </ MyContext.Consumer>

ARenderPropsCounterConnectedWithContext.contextType = MyContext

const AFunctionnalComponentWithHook = () => {
    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const handleChangeField1 = e => setField1(e.target.value)
    const handleChangeField2 = e => setField2(e.target.value)
    
    return <div>
                <h3>Form fields</h3>
                <p>Fields will be updated using a hook : <br/>
                <br/>
                field1: {field1} <br/>
                field2: {field2}</p>
                <input value={field1} onChange={handleChangeField1}></input><br />
                <input value={field2} onChange={handleChangeField2}></input>
            </div>
}

const Button = () => 
    <MyContext.Consumer>
        {value => <button onClick={ value.incrementCounter}> increment me using context ! </button>}
    </ MyContext.Consumer>

Button.contextType = MyContext

class App extends React.Component {
    constructor(props){
        super(props);
        this.incrementCounter = () => {this.setState({count: this.state.count + 1 })}
        this.state = {
            data: {foo: 'bar'},
            count: 0,
            incrementCounter: this.incrementCounter
        }
    }

    render() {
        return <MyContext.Provider value={this.state} >
                    <h1>I love UI !!</h1>  
                    <ARenderPropsCounterConnectedWithContext />
                    <Button />
                    <br />
                    <br />
                    <AFunctionnalComponentWithHook />
                </MyContext.Provider>
    }
  }


// ========================================


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );