"use client"
// app/page.tsx

// import { useEffect, useState } from "react"

// export default function Page() {

//   const getData = async () => {
//     await fetch('/api/get_users')
//     .then( res => res.json() )
//     .then( data => {
//       console.log(data.data.rows);
//     })
//     .catch( err => console.log(err) )
//     .finally( () => {
//       // set loading to false
//     })
//   }

//   useEffect(() => {
//     getData();
//   }, [])

//   return (
//     <main>
//     </main>
//   )
// }


export default function Page() {
  return (
    <div>
    <iframe src="/landing_page.html" width="100%" style={{height: "100vh"}} />
    </div>
   
  );
}
