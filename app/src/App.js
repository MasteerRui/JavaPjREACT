import React from 'react';
import axios from 'axios';
import Switch from "react-switch";
import DatePicker from 'react-datepicker';  
import "react-datepicker/dist/react-datepicker.css";  


class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      id:0,
      Name:'',
      feito: false,
      date: new Date(),  
      btnname: 'Adicionar'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange(feito) {
    this.setState({ feito });
  }

  handleChange2(date) {  
    this.setState({ date })  
  }  

  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        todos:res.data,
        id:0,
        name:'',
        feito: false,
        date: new Date(),
        btnname: 'Adicionar'  
      })
    })
  }
  submit(evenet,id){
    console.log(id)
    evenet.preventDefault();
    if(id===0){
      axios.post("http://localhost:8080/api/",{
        name:this.state.name,
        date:this.state.date,
        feito:this.state.feito
      }).then(()=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:id,
        name:this.state.name,
        date:this.state.date,
        feito:this.state.feito
      }).then(()=>{
        this.componentDidMount();
      })
    }
  }
  delete(id){
    axios.delete("http://localhost:8080/api/"+id)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id) {
    axios.get("http://localhost:8080/api/"+id)
      .then((res)=>{
        const formattedDate = new Date(res.data.date);
        this.setState({
          id: res.data.id,
          name: res.data.name,
          date: formattedDate,
          feito: res.data.feito,
          btnname: 'Editar'
        });
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  
  
  


  render(){
    return (
      <div className='main'>
        <div className='teste'>
      <div className="container">
        <div className="AddForm">
          <form onSubmit={(e) => this.submit(e, this.state.id)}>
            <div className="input-field col s12">
              <input placeholder='Tarefa' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type="text" className="autocomplete" />
            </div>
            <DatePicker className='date'
              value={this.state.date}
              selected={this.state.date}
              onChange={this.handleChange2}
              name="date"
              dateFormat="dd/MM/yyyy" />      
              <div className='InputSw'>
                <a>Feito</a>
              <Switch onColor='#B883B8' className='switche' onChange={this.handleChange} checked={this.state.feito} value={this.state.feito} />
            </div>
            <button className="btnsub" type="submit" name="action">{this.state.btnname}
            </button>
          </form>
        </div>
        
        </div>
        <div className='container-table'>
<div className='table'>
    {
    
      this.state.todos.map(todo =>
        <div className='mco'>
          <div className='stodo' key={todo.id}>
          <a className='name'>{todo.name}</a>
          <div className='group'> 
          <a>{new Date(todo.date).toLocaleDateString()}</a>
              <div className='iconn'> {todo.feito === true ? <i class="fa fa-check"></i> : <i class="fa fa-times"> </i>}</div>
              </div>
          </div>
          <a>
                <button onClick={(e)=>this.edit(todo.id)} className="btnedit" type="submit" name="action">
                  <i className="material-icons ">edit</i>
                </button>       
              </a>
              <a>
                <button onClick={(e)=>this.delete(todo.id)} className="btndelete" type="submit" name="action">
                  <i className="material-icons ">delete</i>
                </button>       
              </a>
          </div>
        
        )
    }

</div>
</div>
        </div>

        <div>
        </div>
        </div>
    );
  }
}


export default App;
