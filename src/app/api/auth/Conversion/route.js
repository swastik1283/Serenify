export default async function handler(req,res){
    const{inrAmount,symbol='matic'}=req.query;

    if(!inrAmount){
        res.status(400).json({error:'No inrAmount Available'});
    }

    const idMap={
        matic:'polygon',
        eth:'ethereum',
    }

    if(!idMap[symbol]){
        return res.status(400).json({error:"No such symbol exist"})
    }

    try{
      const response=await fetch(
       `https://api.coingecko.com/api/v3/simple/price?ids=${idMap[symbol]}&vs_currencies=inr`
      )
      if(!response){
        return res.status(400).json({ error:
        "Api not working"
        })
      }
       const data =await res.json()
       const priceinr=data[idMap[symbol]]?.inr;
       if(!priceinr){
        return res.status(400).json({error:"price inr misiing"})

       }
       const cryptoamount=Number(inrAmount)/priceinr
       return res.status(200).json({
        amount:cryptoamount.toFixed(6),
        symbol:symbol.toUpperCase(),

       });

    }

    catch(err){
        console.error(" server error")
        return res.status(500).json({error:"Server error sikeee"})

    }
}