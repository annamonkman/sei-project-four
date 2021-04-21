import React from 'react'

const Checkout = () => {
  return (
    <>
      <div className="checkout-wrapper">
        <div className="shipping-container">
          <form action="">
            <h1>
              <i className="fas fa-shipping-fast"></i>
                  Shipping Details
            </h1>
            <div className="name">
              <div>
                <label htmlFor="f-name">First</label>
                <input type="text" name="f-name" />
              </div>
              <div>
                <label htmlFor="l-name">Last</label>
                <input type="text" name="l-name" />
              </div>
            </div>
            <div className="street">
              <label htmlFor="name">Street</label>
              <input type="text" name="address" />
            </div>
            <div className="address-info">
              <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input type="text" name="state" />
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <input type="text" name="zip" />
              </div>
            </div>
            <h1>
              <i className="far fa-credit-card"></i> Payment Information
            </h1>
            <div className="cc-num">
              <label htmlFor="card-num">Credit Card No.</label>
              <input type="text" name="card-num" />
            </div>
            <div className="cc-info">
              <div>
                <label htmlFor="card-num">Exp</label>
                <input type="text" name="expire" />
              </div>
              <div>
                <label htmlFor="card-num">CCV</label>
                <input type="text" name="security" />
              </div>
            </div>
            <div className="btns">
              <button>Purchase</button>
              <button>Back to cart</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Checkout
