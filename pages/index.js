import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        
        <link href="csss/main.css" rel="stylesheet"/>
    
      </head>
    <body>
    <h1 class="country">
          Country List 
        </h1>
      <div class="search">
      <input type="text" class="form-control" placeholder="Search here..." required id="input"/>
      <div class="button">
        <button class="input-group-text" id="search">Search</button>
      </div>
    </div>
    </body>
    </div>
   )
}