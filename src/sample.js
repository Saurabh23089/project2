import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Sample(){

    const navigate=useNavigate();
    const[value,setvalue] = useState('');
    const[answer,setanswer]=useState('');
    const[showanswer,setshowanswer]=useState('false');

    const handlefindbutton=(e)=> {
        e.preventDefault();
        setvalue('');
        setanswer(3);
        navigate('/', { state: { fromSample: true } });
    }


    return (
        <>
        <input type='text' value='1+2'/>
        <button onClick={handlefindbutton}>Find</button>
        {answer&&<h1>The answer is {answer}</h1>}
        </>
    )
}

export default Sample;