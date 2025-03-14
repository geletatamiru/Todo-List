import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
export default function Home({user}) {
  return (
    <>
      <Header user={user}/>
      <Body />
    </>
  )
}
