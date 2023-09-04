import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link, Navigate } from 'react-router-dom'
// import { useUserContext } from '../context/user_context'

const CheckoutPage = () => {

  return <main>
    <PageHero title="checkout"/>
    <Wrapper className='page'>
      <h1>Test</h1>
    </Wrapper>
  </main>
}
const Wrapper = styled.div``
export default CheckoutPage
