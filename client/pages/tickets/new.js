import { useState } from 'react';
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title, price
        },
        onSuccess: () => Router.push('/')
    });
    const onSubmit = (event) => {
        event.preventDefault();
        doRequest();
    };
    const onBlur = () => {
        const value = parseFloat(price);
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));
    }
    return(
        <div>
            <h1>Create New Ticket</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group " style={{margin: '15px'}}>
                    <label>Title</label>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control"/>
                </div>
                <div className="form-group " style={{margin: '15px'}}>
                    <label>Price</label>
                    <input value={price} onBlur={onBlur} onChange={(e)=>setPrice(e.target.value)} className="form-control"/>
                </div>
                <button className="btn btn-primary" style={{marginLeft: '15px'}}>Submit</button>
            </form>
            {errors}
        </div>
    );
};

export default NewTicket;