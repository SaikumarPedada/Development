import {useState} from 'react'
import {Link} from 'react-router-dom'


function Login(){
    let [email,setEmail]=useState('');
    let [password, setPassword]=useState('');
    return(
        <>
        <div className='card'>
            <h2 className=' card-title text-primary text-center'>User Login</h2>
            <div className='card-body'>
                <div className=' form-group'>
                    <label className='d-flex'>Email:</label>
                    <input type='email' className='form-control' value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}></input>
                </div>
                <div className='form-group mt-3'>
                    <label className='d-flex'>Password:</label>
                    <input type='password' className='form-control' value={password} onChange={(p)=>{
                        setPassword(p.target.value);
                    }}></input>
                </div>
                <div className='mt-3'>
                    <Link to='/Todo' className='btn btn-primary' >Login</Link>
                </div>
            </div>
        </div>
    </>
    )
}
export default Login;