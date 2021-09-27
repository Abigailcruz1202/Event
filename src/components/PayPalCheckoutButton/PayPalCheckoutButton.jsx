import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import paypal from "paypal-checkout";
import { resetShopping } from "../../actions/actions";

const PayPalCheckoutButton = ({ order, resetShopping }) => {
  const history = useHistory();
  const redirec = (dir) => {
    history.push(dir);
  };


  const paypalConf = {
    currency: "MXN",
    env: "sandbox",
    client: {
      sandbox:
        "ARgkUwNOsDQhVAfoPMo5E0ipCVLaJYDam3xZapytQ_eziCJrOuEDTCxPXQbfE0voPJGS8Q2_FqxEjLfU",
      production: "--id--",
    },
    style: {
      label: "pay",
      size: "medium",
      shape: "rect",
      color: "gold",
    },
  };

  const PaypalButton = paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: "Compra en Event",
          custom: order.customer || "",
          item_list: {
            items: order.items,
          },
        },
      ],
      note_to_payer: 'Contactacons para cualquier aclaración'
    };
    return actions.payment.create({ payment });
  };

  const onAuthorize = ( data, actions) => {
      return actions.payment.execute()
      .then(response => {
          console.log(response)
          alert(`el pago se realizo correctamente, ID: ${response.id}`)
            redirec("/");
          resetShopping()
      })
      .catch(error => {
        console.log(error)
        alert('Ocurrio un error')
    }) 
  }
  const onError = (error) => {
    console.log(error)
    alert('No se pudo realizar el pago')
  };
  const onCancel = (data, actions) => {
    alert('Pago cancelado')
  };
  return (
      <PaypalButton 
        env={paypalConf.env}
        client={paypalConf.client}
        payment={(data, actions) => payment(data, actions)}
        onAuthorize={(data, actions) => onAuthorize(data, actions)}
        onCancel={(data, actions) => onCancel(data, actions)}
        onError={(data, actions) => onError(data, actions)}
        style={paypalConf.style}
        commit
        locale='es_MX'
      />
  )
};


export default connect(null, { resetShopping })(PayPalCheckoutButton);