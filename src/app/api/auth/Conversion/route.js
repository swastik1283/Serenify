import { NextResponse } from "next/server";

export  async function GET(req){
const {searchParams}=new URL(req.url);
const inrAmount=searchParams.get("inrAmount");
const symbol=searchParams.get("symbol")||"matic";

    if(!inrAmount){
        return new Response("inr amount not found",{
            status:400
        })
    };

    const idMap={
        matic:'polygon',
        eth:'ethereum',
    }

    if(!idMap[symbol]){
        return new Response("no such symbol exist ",{
            status:405
        })
    };

    try{
      const response=await fetch(
       `https://api.coingecko.com/api/v3/simple/price?ids=${idMap[symbol]}&vs_currencies=inr`
      )
      if(!response.ok){
        return new Response(
        "Api not working",{
            status:401
        })
      }
       const data =await response.json()
       const priceinr=data[idMap[symbol]]?.inr;
       if(!priceinr){
        return new Response("no inramount",{
            status:400
        })
       };

       const cryptoamount=Number(inrAmount)/priceinr
       return new Response(JSON.stringify({
        amount:cryptoamount.toFixed(6),
        symbol:symbol.toUpperCase(),

       }),{
    status:200,
    headers:{
        'Content-Type':'application/json'
    },
       }

       )
    }

    catch(err){
        console.error(" server error")
        return new Response("server error sikeeh",{
            status:500
        })
    };
}