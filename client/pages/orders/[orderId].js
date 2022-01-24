import { useEffect, useState } from 'react'
import StripeCheckOut from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request';
import Router from 'next/router'
const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders')
    });
    useEffect(()=> {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft/1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [order]);
    if(timeLeft < 0){
        return <div>Order Expired</div>
    }
    
    return <div>
        time left to pay: {timeLeft} seconds.
        <StripeCheckOut 
        token={({ id }) => doRequest({ token: id })}
        stripeKey='pk_test_51KL7ilSDUmWkYaAtC0KWMGZ6YQMO15Af2fo2JcrtsPpzwbUh5D1qo6D2kDXndEaTOU6cEKfFggAzXOVBjdMK1Rgw00uePlIWEX'
        amount={order.ticket.price * 100}
        email={currentUser.email}
        />
        {errors}
        </div>
};

OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`)
    return { order: data };
};

export default OrderShow